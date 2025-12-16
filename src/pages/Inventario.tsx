import Category from "../components/InventaryComponents/Category";
import ListProducts from "../components/InventaryComponents/ListProducts";
import ItemListProduct from "../components/InventaryComponents/ItemListProduct";
import { Link, To } from "react-router-dom";

function Inventario() {
	return (
		<div className="w-full min-h-full bg-gris flex flex-col mt-5 pb-5 gap-4 items-center">
			<div className="flex gap-10">
				<h2 className="text-2xl font-bold">INVENTARIO (CATEGORÍAS)</h2>
				<Link to="/Inventario/nueva-categoria"><button className="border-2 border-verde rounded-xl px-3 text-verde cursor-pointer">+ AÑADIR NUEVA CATEGORÍA</button></Link>
			</div>

			<div className="flex gap-2 w-full justify-center">
				<input
					className="
							border
							border-negro
							rounded-xl
							pl-3 pr-15 py-1
							w-[50%]
							focus:border-morado
							focus:ring-0
							focus:outline-none
						"
					type="text"
					placeholder="BUSCAR..."
				/>

				<button>Buscar</button>
			</div>

			<div
				className="
					grid
					w-[90%]
					gap-4
					grid-cols-[repeat(auto-fill,minmax(200px,max-content))]
					self-center
					justify-between
				"
			>
				{/* Aquí van las categorias*/}

				<Category img="bebidas.webp" name="Bebidas" />
				<Category img="comidas.png" name="Comidas" />
				<Category img="bebidas.webp" name="Bebidas" />
				<Category img="bebidas.webp" name="Bebidas" />
				<Category img="bebidas.webp" name="Bebidas" />
				<Category img="bebidas.webp" name="Bebidas" />

			</div>



			<ListProducts title="MÁS PRÓXIMO A CADUCAR">
				{/* Aquí van los productos que están más próximos a caducar */}
				<ItemListProduct className="font-bold" cantidad="Cantidad" nombre="Nombre" caducidad="Caducidad" lote="Lote" precio="Precio" />
				<ItemListProduct cantidad="Cantidad" nombre="Nombre" caducidad="Caducidad" lote="Lote" precio="Precio" />
				<ItemListProduct cantidad="Cantidad" nombre="Nombre" caducidad="Caducidad" lote="Lote" precio="Precio" />
				<ItemListProduct cantidad="Cantidad" nombre="Nombre" caducidad="Caducidad" lote="Lote" precio="Precio" />
				<ItemListProduct cantidad="Cantidad" nombre="Nombre" caducidad="Caducidad" lote="Lote" precio="Precio" />
				<ItemListProduct cantidad="Cantidad" nombre="Nombre" caducidad="Caducidad" lote="Lote" precio="Precio" />
				<ItemListProduct cantidad="Cantidad" nombre="Nombre" caducidad="Caducidad" lote="Lote" precio="Precio" />
			</ListProducts>

			<ListProducts title="MENOS CANTIDAD EN INVENTARIO">
				{/* Aquí van los productos que menos cantidad haya */}
				<ItemListProduct className="font-bold" cantidad="Cantidad" nombre="Nombre" caducidad="Caducidad" lote="Lote" precio="Precio" />
			</ListProducts>

		</div>
	)
}

export default Inventario