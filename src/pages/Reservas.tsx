import { Link } from "react-router-dom";
import { ReactComponent as LapizSVG } from "../assets/svg/LapizSVG.svg"

function Reservas() {
	return (
		<div className='w-full min-h-full bg-gris flex flex-col p-10 pt-5 gap-4 items-center'>
			<div className="flex gap-10">
				<h2 className="text-2xl font-bold">RESERVAS</h2>
				<Link to="/Inventario/nueva-categoria">
					<div
						className="
							group
							flex gap-2 mb-5 w-fit items-center
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
							Añadir Nueva Reserva
						</p>
					</div>
				</Link>

			</div>

			<div className="w-full h-full bg-blanco rounded-xl p-10 shadow-xs">
			</div>
		</div>
	)
}

export default Reservas