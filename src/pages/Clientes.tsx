import ItemListClients from "../components/CientsComponents/ItemListClients";
import { ReactComponent as LapizSVG } from "../assets/svg/LapizSVG.svg";
import { Link } from "react-router-dom";
import ListClients from "../components/CientsComponents/ListClients";
function Clientes() {
    return (
        <div className="w-full min-h-full bg-gris flex flex-col p-10 pt-5 gap-4 items-center">
            <div className="flex flex-col gap-4 bg-blanco w-full p-4 rounded-xl shadow-xs justify-center items-center">
                <div className="w-full flex justify-center gap-4 items-center">
                    <h2 className="text-2xl font-bold">CLIENTES</h2>
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

                            <p className="font-medium">Añadir Nuevo Cliente</p>
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
            <ListClients title="Todos los Clientes">
                <ItemListClients
                    className="font-bold"
                    nombre="Nombre de Cliente"
                    ultimaReserva="Última Reserva"
                />
                <ItemListClients
                    nombre="Nombre de Cliente"
                    ultimaReserva="Última Reserva"
                />
                <ItemListClients
                    nombre="Nombre de Cliente"
                    ultimaReserva="Última Reserva"
                />
                <ItemListClients
                    nombre="Nombre de Cliente"
                    ultimaReserva="Última Reserva"
                />
            </ListClients>
            <ListClients title="Mejores Clientes">
                <ItemListClients
                    className="font-bold"
                    nombre="Nombre de Cliente"
                    ultimaReserva="Última Reserva"
                />
                <ItemListClients
                    nombre="Nombre de Cliente"
                    ultimaReserva="Última Reserva"
                />
                <ItemListClients
                    nombre="Nombre de Cliente"
                    ultimaReserva="Última Reserva"
                />
                <ItemListClients
                    nombre="Nombre de Cliente"
                    ultimaReserva="Última Reserva"
                />
            </ListClients>
        </div>
    );
}

export default Clientes;
