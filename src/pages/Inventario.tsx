import Category from "../components/InventaryComponents/Category";
import ListProducts from "../components/InventaryComponents/ListProducts";
import ItemListProduct from "../components/InventaryComponents/ItemListProduct";
import { Link } from "react-router-dom";
import { ReactComponent as LapizSVG } from "../assets/svg/LapizSVG.svg";
import { db } from "../lib/db";
import { useState, useEffect } from 'react';
import { convertFileSrc } from "@tauri-apps/api/core";
import { appDataDir, join } from "@tauri-apps/api/path";

interface Categoria {
    ID_Categoria: number;
    Nombre: string;
    Nombre_Imagen: string;
    Ruta_Imagen: string;
}

interface CategoriaDisplay extends Categoria {
    urlImagen: string;
}

function Inventario() {
    const [data, setData] = useState<CategoriaDisplay[]>([]);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const appDataDirPath = await appDataDir();

                // Hacemos la llamada. 
                // IMPORTANTE: TypeScript a veces no infiere bien el tipo genérico de librerías externas.
                // Lo guardamos en 'rawResult' primero.
                const rawResult = await db.select('SELECT * FROM Categorias_Producto ORDER BY Nombre ASC;');

                // --- BLOQUE DE SEGURIDAD PARA TYPESCRIPT Y DATOS ---
                // 1. Si db.select devuelve un string (json), lo parseamos. Si ya es objeto, lo dejamos.
                let parsedResult: Categoria[] = [];

                if (typeof rawResult === 'string') {
                    parsedResult = JSON.parse(rawResult);
                } else if (Array.isArray(rawResult)) {
                    // Forzamos el tipo con 'as unknown' para callar al compilador
                    parsedResult = rawResult as unknown as Categoria[];
                }
                // ---------------------------------------------------

                if (parsedResult && parsedResult.length > 0) {

                    const categoriasProcesadas = await Promise.all(parsedResult.map(async (cat) => {
                        // Al haber tipado parsedResult arriba, 'cat' ya es de tipo Categoria.
                        // El spread operator (...cat) YA NO DEBERÍA FALLAR.

                        let finalPath = "";
                        const rutaDB = cat.Ruta_Imagen ? cat.Ruta_Imagen.trim() : "";

                        if (!rutaDB) {
                            return { ...cat, urlImagen: "" };
                        }

                        // Lógica para detectar si es ruta completa o solo nombre de archivo
                        if (rutaDB.includes(":") || rutaDB.startsWith("/") || rutaDB.startsWith("\\")) {
                            finalPath = rutaDB;
                        } else {
                            // Si solo guardaste "imagen.png", aquí la unimos con la carpeta AppData
                            // Si guardaste "images/categorias/img.png", asegúrate de que esa carpeta existe en AppData
                            finalPath = await join(appDataDirPath, rutaDB);
                        }

                        // Debug rápido por si acaso
                        console.log("Cargando:", finalPath);

                        const assetUrl = convertFileSrc(finalPath);

                        return {
                            ...cat,
                            urlImagen: assetUrl
                        };
                    }));

                    setData(categoriasProcesadas);
                }
            } catch (error) {
                console.error("Error cargando inventario:", error);
            }
        };

        cargarDatos();
    }, []);

    return (
        <div className="w-full min-h-full bg-gris flex flex-col p-10 pt-5 gap-4 items-center">
            <div className="flex flex-col gap-4 bg-blanco w-full p-4 rounded-xl shadow-xs justify-center items-center">
                <div className="w-full flex justify-center gap-4 items-center">
                    <h2 className="text-2xl font-bold">INVENTARIO (CATEGORÍAS)</h2>
                    <Link to="/Inventario/nueva-categoria">
                        <div className="group flex gap-2 w-fit items-center cursor-pointer border-2 border-verde rounded-xl px-3 py-1 text-verde transition-all duration-300 ease-out hover:bg-verde hover:text-white hover:shadow-md">
                            <LapizSVG width={24} height={24} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6" />
                            <p className="font-medium">Añadir Nueva Categoría</p>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="grid w-full gap-4 grid-cols-[repeat(auto-fill,minmax(200px,max-content))] self-center justify-between bg-blanco rounded-xl p-4 shadow-xs">
                {data.map((item) => (
                    <Category
                        key={item.ID_Categoria}
                        img={item.urlImagen}
                        name={item.Nombre} // He cambiado Nombre_Imagen por Nombre, asumiendo que es lo que quieres mostrar
                    />
                ))}
            </div>

            {/* Listas de productos (sin cambios) */}
            <ListProducts title="MÁS PRÓXIMO A CADUCAR">
                <ItemListProduct className="font-bold" cantidad="Cantidad" nombre="Nombre" caducidad="Caducidad" lote="Lote" precio="Precio" />
            </ListProducts>
            <ListProducts title="MENOS CANTIDAD EN INVENTARIO">
                <ItemListProduct className="font-bold" cantidad="Cantidad" nombre="Nombre" caducidad="Caducidad" lote="Lote" precio="Precio" />
            </ListProducts>
        </div>
    );
}

export default Inventario;