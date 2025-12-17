
function ItemListClients({ className, nombre, ultimaReserva }: { className?: string; nombre: string; ultimaReserva: string }) {
    return (
        <div className={`w-full px-4 flex justify-between items-center ${className}`}>
            <p>{nombre}</p>
            <p>{ultimaReserva}</p>
            <button className="cursor-pointer">Contacto</button>
            <button className="cursor-pointer">Estadísticas</button>
            <button className="cursor-pointer">Datos Factura</button>
            <button className="cursor-pointer">Editar</button>
        </div>
    )
}

export default ItemListClients