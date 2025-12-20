// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use base64::prelude::*;
use libsql::{Builder, Connection, Value};
use serde_json::{json, Map};
use std::fs;
use std::path::PathBuf;
use std::sync::Arc;
use tauri::{AppHandle, Manager, State};
use tokio::sync::Mutex;

// 1. Definimos el Estado
struct AppState {
    db: Arc<Mutex<Connection>>,
}

// 2. Comando para Guardar Imágenes
#[tauri::command]
async fn save_image(
    app: AppHandle,
    subfolder: String,
    filename: String,
    base64_data: String,
) -> Result<String, String> {
    let app_data_dir = app
        .path()
        .app_data_dir()
        .map_err(|e| format!("Error obteniendo ruta AppData: {}", e))?;

    let file_path = app_data_dir.join("images").join(&subfolder).join(&filename);

    let image_bytes = BASE64_STANDARD
        .decode(&base64_data)
        .map_err(|e| format!("Error al decodificar Base64: {}", e))?;

    fs::write(&file_path, image_bytes)
        .map_err(|e| format!("Error escribiendo el archivo en {:?}: {}", file_path, e))?;

    Ok("Imagen guardada correctamente".to_string())
}

// 3. El Comando SQL
#[tauri::command]
async fn execute_sql(state: State<'_, AppState>, sql: String) -> Result<String, String> {
    let db = state.db.lock().await;

    if sql.trim().to_uppercase().starts_with("SELECT") {
        let mut rows = db.query(&sql, ()).await.map_err(|e| e.to_string())?;
        let mut results: Vec<serde_json::Value> = Vec::new();
        let column_count = rows.column_count();

        while let Ok(Some(row)) = rows.next().await {
            let mut row_json = Map::new();
            for i in 0..column_count {
                let col_name = rows.column_name(i).unwrap_or("unknown").to_string();
                let sql_value = row.get_value(i).map_err(|e| e.to_string())?;
                let json_value = match sql_value {
                    Value::Null => serde_json::Value::Null,
                    Value::Integer(n) => json!(n),
                    Value::Real(n) => json!(n),
                    Value::Text(s) => json!(s),
                    Value::Blob(b) => json!(b),
                };
                row_json.insert(col_name, json_value);
            }
            results.push(serde_json::Value::Object(row_json));
        }
        return Ok(serde_json::to_string(&results).map_err(|e| e.to_string())?);
    }

    db.execute_batch(&sql).await.map_err(|e| e.to_string())?;
    Ok("OK".to_string())
}

// 4. NUEVA FUNCIÓN: Recuperar ruta base
#[tauri::command]
fn get_app_data_path(app: AppHandle) -> Result<String, String> {
    let app_data_dir = app
        .path()
        .app_data_dir()
        .map_err(|e| format!("Error obteniendo ruta AppData: {}", e))?;

    Ok(app_data_dir.to_string_lossy().to_string())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .setup(|app| {
            // ... (Toda tu lógica de setup igual que antes) ...
            let app_data_dir = app.path().app_data_dir().expect("Error");

            // ... creación de carpetas ...
            let folders = vec![
                app_data_dir.clone(),
                app_data_dir.join("images").join("categorias"),
                // ... resto de carpetas
            ];
            for f in folders {
                if !f.exists() {
                    fs::create_dir_all(&f).unwrap();
                }
            }

            // ... DB setup ...
            let db_path = app_data_dir.join("data.db");
            let db_path_str = db_path.to_str().unwrap();

            let conn = tauri::async_runtime::block_on(async {
                let db = Builder::new_local(db_path_str).build().await.unwrap();
                let c = db.connect().unwrap();
                let schema = include_str!("../schema.sql");
                c.execute_batch(schema).await.unwrap();
                c
            });

            app.manage(AppState {
                db: Arc::new(Mutex::new(conn)),
            });
            Ok(())
        })
        // IMPORTANTE: Añade get_app_data_path aquí abajo
        .invoke_handler(tauri::generate_handler![
            execute_sql,
            save_image,
            get_app_data_path
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
