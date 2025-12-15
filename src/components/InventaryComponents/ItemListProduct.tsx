
function ItemListProduct({ className, cantidad, nombre, caducidad, lote, precio }: { className?: string; cantidad: string; nombre: string; caducidad: string; lote: string; precio: string }) {
    return (
        <div className={`w-full px-4 flex justify-between items-center ${className}`}>
            <p>{cantidad}</p>
            <p>{nombre}</p>
            <p>{caducidad}</p>
            <p>{lote}</p>
            <p>{precio}</p>
        </div>
    )
}

export default ItemListProduct