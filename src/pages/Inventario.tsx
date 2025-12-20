import Category from "../components/InventaryComponents/Category";
import ListProducts from "../components/InventaryComponents/ListProducts";
import ItemListProduct from "../components/InventaryComponents/ItemListProduct";
import { Link } from "react-router-dom";
import { ReactComponent as LapizSVG } from "../assets/svg/LapizSVG.svg";
import { db } from "../lib/db";
import { useState, useEffect } from 'react';
import { convertFileSrc, invoke } from "@tauri-apps/api/core"; // <--- IMPORTS CLAVE
import { join } from "@tauri-apps/api/path"; // Opcional, pero haremos la unión manual para evitar dependencias extra si no tienes el plugin de path

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
                // 1. Obtener ruta base
                const appDataPath = await invoke<string>("get_app_data_path");

                // Función auxiliar para normalizar rutas (Convierte todo \ a /)
                const normalizePath = (path: string) => path.replace(/\\/g, '/');

                const result = await db.select<Categoria>('SELECT * FROM Categorias_Producto ORDER BY Nombre ASC;');

                if (result && result.length > 0) {
                    const categoriasProcesadas = result.map((cat) => {
                        // A. Limpiamos la ruta base (quitamos barras al final y convertimos a /)
                        let cleanBase = normalizePath(appDataPath);
                        if (cleanBase.endsWith('/')) cleanBase = cleanBase.slice(0, -1);

                        // B. Limpiamos la parte de la imagen (quitamos barras al inicio y convertimos a /)
                        let imgPart = normalizePath(cat.Ruta_Imagen);
                        if (imgPart.startsWith('/')) imgPart = imgPart.substring(1);

                        // C. (OPCIONAL) Reconstruimos si faltan carpetas, usando siempre /
                        if (!imgPart.includes("images") && !imgPart.includes("categorias")) {
                            imgPart = `images/categorias/${imgPart}`;
                        }

                        // D. Unimos todo. AHORA LA RUTA SERÁ PURA con '/'
                        const finalPath = `${cleanBase}/${imgPart}`;

                        console.log("Ruta FINAL limpia:", finalPath); // <--- Verifica que aquí solo salgan barras /

                        // E. Convertimos a asset URL
                        const assetUrl = convertFileSrc(finalPath);

                        return {
                            ...cat,
                            urlImagen: assetUrl
                        };
                    });
                    setData(categoriasProcesadas);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        cargarDatos();
    }, []);

    return (
        <div className="w-full min-h-full bg-gris flex flex-col p-10 pt-5 gap-4 items-center">
            {/* ... (Cabecera y Buscador igual que antes) ... */}
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
                {/* Input buscar... */}
            </div>

            {/* GRID DE CATEGORÍAS */}
            <div className="grid w-full gap-4 grid-cols-[repeat(auto-fill,minmax(200px,max-content))] self-center justify-between bg-blanco rounded-xl p-4 shadow-xs">
                {data.map((item) => (
                    <Category
                        key={item.ID_Categoria}
                        // Pasamos la URL generada con asset://
                        img={item.urlImagen}
                        name={item.Nombre_Imagen}
                    />
                ))}
            </div>

            {/* ... Resto de listas ... */}
            <ListProducts title="MÁS PRÓXIMO A CADUCAR">
                {/* Aquí van los productos que están más próximos a caducar */}
                <ItemListProduct
                    className="font-bold"
                    cantidad="Cantidad"
                    nombre="Nombre"
                    caducidad="Caducidad"
                    lote="Lote"
                    precio="Precio"
                />
                <ItemListProduct
                    cantidad="Cantidad"
                    nombre="Nombre"
                    caducidad="Caducidad"
                    lote="Lote"
                    precio="Precio"
                />
                <ItemListProduct
                    cantidad="Cantidad"
                    nombre="Nombre"
                    caducidad="Caducidad"
                    lote="Lote"
                    precio="Precio"
                />
                <ItemListProduct
                    cantidad="Cantidad"
                    nombre="Nombre"
                    caducidad="Caducidad"
                    lote="Lote"
                    precio="Precio"
                />
                <ItemListProduct
                    cantidad="Cantidad"
                    nombre="Nombre"
                    caducidad="Caducidad"
                    lote="Lote"
                    precio="Precio"
                />
                <ItemListProduct
                    cantidad="Cantidad"
                    nombre="Nombre"
                    caducidad="Caducidad"
                    lote="Lote"
                    precio="Precio"
                />
                <ItemListProduct
                    cantidad="Cantidad"
                    nombre="Nombre"
                    caducidad="Caducidad"
                    lote="Lote"
                    precio="Precio"
                />
            </ListProducts>

            <ListProducts title="MENOS CANTIDAD EN INVENTARIO">
                {/* Aquí van los productos que menos cantidad haya */}
                <ItemListProduct
                    className="font-bold"
                    cantidad="Cantidad"
                    nombre="Nombre"
                    caducidad="Caducidad"
                    lote="Lote"
                    precio="Precio"
                />
            </ListProducts>
        </div>
    );
}

export default Inventario;