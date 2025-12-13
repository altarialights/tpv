// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use libsql::{Builder, Connection};
use std::sync::Arc;
use tauri::State;
use tokio::sync::Mutex;

// 1. Definimos el Estado: Una conexión segura compartida
struct AppState {
    db: Arc<Mutex<Connection>>,
}

// 2. El Comando Mágico: React llama a esto para ejecutar SQL
#[tauri::command]
async fn execute_sql(state: State<'_, AppState>, sql: String) -> Result<String, String> {
    // Obtenemos la conexión
    let db = state.db.lock().await;

    // Ejecutamos la consulta (query)

    // Si es un SELECT, queremos datos
    if sql.trim().to_uppercase().starts_with("SELECT") {
        let mut rows = db.query(&sql, ()).await.map_err(|e| e.to_string())?;

        let results: Vec<serde_json::Value> = Vec::new();

        while let Ok(Some(row)) = rows.next().await {
            // AQUÍ FALTARÍA LA LÓGICA DE CONVERSIÓN REAL
            // LibSQL devuelve filas crudas y hay que convertirlas a JSON columna por columna.
            // Como esto requiere saber los nombres de las columnas y tipos,
            // para este paso inicial dejaremos que compile sin error,
            // pero en el futuro aquí irá el mapeo.

            // Ejemplo temporal para que veas que funciona si hay filas:
            // results.push(serde_json::json!({ "status": "fila_encontrada" }));
        }

        // Devolvemos el array convertido a String JSON real
        return Ok(serde_json::to_string(&results).map_err(|e| e.to_string())?);
    }

    // Si es INSERT/UPDATE/CREATE
    db.execute_batch(&sql).await.map_err(|e| e.to_string())?;
    Ok("OK".to_string())
}

#[tokio::main]
async fn main() {
    let db = Builder::new_local("data.db").build().await.unwrap();
    let conn = db.connect().unwrap();

    let schema = include_str!("../schema.sql");

    match conn.execute_batch(schema).await {
        Ok(_) => println!("Base de datos inicializada correctamente."),
        Err(e) => eprintln!("Error inicializando DB: {}", e),
    }

    // Guardamos la conexión en un estado seguro para hilos
    let app_state = AppState {
        db: Arc::new(Mutex::new(conn)),
    };

    tauri::Builder::default()
        .manage(app_state) // Inyectamos la base de datos
        .invoke_handler(tauri::generate_handler![execute_sql]) // Exponemos el comando
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
