import React from "react";

function Product() {
    return (
        <div className="w-full min-h-screen bg-gris p-8 flex flex-col gap-8 text-negro justify-center">
            {/* CONTENIDO */}
            <div className="flex gap-10 justify-center">
                {/* FOTO */}
                <div className=" w-[40%] border-2 border-negro rounded-xl flex items-center justify-center bg-blanco">
                    <img src="" alt="" />
                </div>

                {/* INFO */}
                <div className="flex flex-col gap-4 w-[50%]">
                    {/* TÍTULO */}
                    <h1 className="text-2xl font-bold text-center">
                        INVENTARIO LIMPIEZA
                    </h1>

                    {/* NOMBRE */}
                    <h2 className="text-xl font-bold border-b pb-2">FAIRY</h2>

                    {/* DATOS */}
                    <div className="text-sm flex flex-col gap-1">
                        <p>
                            <span className="font-semibold">
                                Cantidad en stock:
                            </span>{" "}
                            2
                        </p>
                        <p>
                            <span className="font-semibold">Proveedor:</span>{" "}
                            Domus del Limpio
                        </p>
                        <p>
                            <span className="font-semibold">Contacto:</span>{" "}
                            proveedor@gmail.com
                        </p>
                        <p>
                            <span className="font-semibold">
                                Cantidad pedido esperada:
                            </span>{" "}
                            4
                        </p>
                        <p>
                            <span className="font-semibold">
                                Última entrada:
                            </span>{" "}
                            20/10/25
                        </p>
                        <p>
                            <span className="font-semibold">Caducidad:</span> —
                        </p>
                    </div>

                    {/* BOTONES */}
                    <div className="flex flex-col gap-2 mt-4">
                        <button className="border cursor-pointer border-negro rounded-lg py-2 hover:bg-gris transition">
                            Editar
                        </button>
                        <button className="border cursor-pointer border-negro rounded-lg py-2 hover:bg-gris transition">
                            Hacer pedido
                        </button>
                        <button className="border cursor-pointer border-negro rounded-lg py-2 hover:bg-gris transition">
                            Estadísticas
                        </button>
                        <button className="border cursor-pointer border-rojo text-rojo rounded-lg py-2 hover:bg-rojo hover:text-blanco transition">
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
