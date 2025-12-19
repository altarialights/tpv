import Category from "../components/InventaryComponents/Category";
import ListProducts from "../components/InventaryComponents/ListProducts";
import ItemListProduct from "../components/InventaryComponents/ItemListProduct";
import { Link } from "react-router-dom";
import { ReactComponent as LapizSVG } from "../assets/svg/LapizSVG.svg";
import { db } from "../lib/db";
import { useState, useEffect } from 'react'

interface Categoria {
    ID_Categoria: number;
    Nombre: string;
    Nombre_Imagen: string;
    Ruta_Imagen: string;
}

function Inventario() {
    const [data, setData] = useState<Categoria[]>([])

    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                const result = await db.select<Categoria>('SELECT * FROM Categorias_Producto ORDER BY Nombre ASC;');
                if (result) {
                    setData(result)
                }

                return result
            } catch (error) {
                console.error("Error cargando categorías:", error);
            }
        };
        cargarCategorias()
    }, [])


    return (
        <div className="w-full min-h-full bg-gris flex flex-col p-10 pt-5 gap-4 items-center">
            <div className="flex flex-col gap-4 bg-blanco w-full p-4 rounded-xl shadow-xs justify-center items-center">
                <div className="w-full flex justify-center gap-4 items-center">
                    <h2 className="text-2xl font-bold">
                        INVENTARIO (CATEGORÍAS)
                    </h2>
                    <Link to="/Inventario/nueva-categoria">
                        <div
                            className="
							group
							flex gap-2 w-fit items-center
							cursor-pointer
							border-2 border-verde
							rounded-xl
							px-3 py-1
							text-verde
							transition-all duration-300 ease-out
							hover:bg-verde
							hover:text-white
							hover:shadow-md
							"
                        >
                            <LapizSVG
                                width={24}
                                height={24}
                                className="
								transition-transform duration-300
								group-hover:-translate-y-1
								group-hover:rotate-6
							"
                            />

                            <p className="font-medium">
                                Añadir Nueva Categoría
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="flex gap-2 w-full justify-center">
                    <input
                        className="
							border-2
							border-negro
							rounded-xl
							pl-3 pr-15 py-1
							w-[50%]
							
							focus:ring-0
							focus:outline-none
						"
                        type="text"
                        placeholder="BUSCAR..."
                    />

                    <button>Buscar</button>
                </div>
            </div>

            <div
                className="
					grid
					w-full
					gap-4
					grid-cols-[repeat(auto-fill,minmax(200px,max-content))]
					self-center
					justify-between
					bg-blanco
					rounded-xl
					p-4
					shadow-xs
				"
            >

                {data.map((item) => {
                    return <Category img={item.Ruta_Imagen + item.Nombre_Imagen} name={item.Nombre} key={item.ID_Categoria} />
                })}
            </div>

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
