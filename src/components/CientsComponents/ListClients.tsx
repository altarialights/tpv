import React from 'react'

function ListClients({ children, title }: { children: React.ReactNode; title: string }) {
    return (
        <div className="bg-blanco w-[90%] p-4 rounded-xl shadow-xs">
            <h3 className="font-xl font-bold text-center mb-4">{title}</h3>

            <div className="flex flex-col gap-2">
                {children || "No hay productos"}
            </div>
            <div className='w-full flex justify-end mt-4'>
                <button className="border-2 border-morado rounded-xl px-3 py-1 text-morado cursor-pointer 
                   transition-all duration-300 ease-in-out
                   hover:bg-morado hover:text-white">
                    Cargar Más
                </button>

            </div>
        </div>
    )
}

export default ListClients