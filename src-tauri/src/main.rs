// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use libsql::{Builder, Connection, Value}; // Importamos Value para manejar los tipos de datos
use serde_json::{json, Map};
use std::sync::Arc;
use tauri::State;
use tokio::sync::Mutex; // Necesario para construir el JSON dinámico

// 1. Definimos el Estado: Una conexión segura compartida
struct AppState {
    db: Arc<Mutex<Connection>>,
}

// 2. El Comando Mágico: React llama a esto para ejecutar SQL
#[tauri::command]
async fn execute_sql(state: State<'_, AppState>, sql: String) -> Result<String, String> {
    // Obtenemos la conexión (bloqueamos el mutex)
    let db = state.db.lock().await;

    // Detectamos si es un SELECT (ignorando mayúsculas/minúsculas y espacios)
    if sql.trim().to_uppercase().starts_with("SELECT") {
        // Ejecutamos la consulta
        let mut rows = db.query(&sql, ()).await.map_err(|e| e.to_string())?;

        // Aquí guardaremos todas las filas convertidas a JSON
        let mut results: Vec<serde_json::Value> = Vec::new();

        // Obtenemos el número de columnas para saber cuánto iterar
        let column_count = rows.column_count();

        // Iteramos fila por fila
        while let Ok(Some(row)) = rows.next().await {
            // Creamos un mapa (un objeto JSON {}) para esta fila específica
            let mut row_json = Map::new();

            // Iteramos por cada columna de la fila (0, 1, 2...)
            for i in 0..column_count {
                // 1. Obtenemos el nombre de la columna (ej: "precio", "nombre")
                let col_name = rows.column_name(i).unwrap_or("unknown").to_string();

                // 2. Obtenemos el valor crudo de LibSQL
                let sql_value = row.get_value(i).map_err(|e| e.to_string())?;

                // 3. Traducimos el tipo de SQL a JSON
                let json_value = match sql_value {
                    Value::Null => serde_json::Value::Null,
                    Value::Integer(n) => json!(n),
                    Value::Real(n) => json!(n),
                    Value::Text(s) => json!(s),
                    Value::Blob(b) => json!(b), // Los bytes se convierten en un array de números
                };

                // 4. Insertamos en el objeto: { "nombre_columna": valor }
                row_json.insert(col_name, json_value);
            }

            // Añadimos el objeto completo a la lista de resultados
            results.push(serde_json::Value::Object(row_json));
        }

        // Convertimos todo el vector a un String JSON para enviarlo al Frontend
        return Ok(serde_json::to_string(&results).map_err(|e| e.to_string())?);
    }

    // Si NO es un SELECT (INSERT, UPDATE, DELETE, CREATE...)
    // Usamos execute_batch para permitir múltiples sentencias separadas por ;
    db.execute_batch(&sql).await.map_err(|e| e.to_string())?;

    Ok("OK".to_string())
}

#[tokio::main]
async fn main() {
    // 1. Inicialización de la DB (ignora esto en el gitignore para evitar bucles)
    let db = Builder::new_local("data.db").build().await.unwrap();
    let conn = db.connect().unwrap();

    // 2. Ejecutar el esquema inicial
    let schema = include_str!("../schema.sql");
    match conn.execute_batch(schema).await {
        Ok(_) => println!("Base de datos inicializada correctamente."),
        Err(e) => eprintln!("Error inicializando DB: {}", e),
    }

    // 3. Guardar conexión en el estado
    let app_state = AppState {
        db: Arc::new(Mutex::new(conn)),
    };

    // 4. Arrancar Tauri
    tauri::Builder::default()
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![execute_sql])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
