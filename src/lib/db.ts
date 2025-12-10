import { invoke } from '@tauri-apps/api/core';

export const db = {
	// Para las consultas que devuelven datos
	async select<T>(query: string): Promise<T[]> {
		try {
			const response = await invoke<string>('execute_sql', { sql: query });

			if (!response || response === '[]') return [];

			return JSON.parse(response) as T[];
		} catch (error) {
			console.error("Error en DB (SELECT):", error);
			throw error;
		}
	},

	// Para las consultas que no devuelven datos (update, delete, etc)
	async execute(query: string): Promise<boolean> {
		try {
			const response = await invoke<string>('execute_sql', { sql: query });
			return response === 'OK';
		} catch (error) {
			console.error("Error en DB (EXECUTE):", error);
			throw error;
		}
	}
};