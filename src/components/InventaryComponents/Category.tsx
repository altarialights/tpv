import { Link, To } from "react-router-dom"


function Category({ img, name }: { img: string; name: string }) {

    return (
        <Link to={"../category/" + name} className='w-fit'>
            <div className="bg-blanco p-6 rounded-xl shadow-xs w-[200px]">
                <img className="rounded-base" src={img} alt={name} />
                <h5 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading">{name}</h5>
                <div className="flex items-center">
                    <p>Ver Productos</p>
                    <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" /></svg>
                </div>
            </div>


        </Link>
    )
}

export default Category