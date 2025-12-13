import { Link, To } from "react-router-dom"

function NavBarItem({
    pagina,
    nombre,
    svg: SvgIcon,
    abierto,
}: {
    pagina: string
    nombre?: string
    svg: React.FC<React.SVGProps<SVGSVGElement>>
    abierto: boolean
}) {
    const ruta: To = "../" + pagina

    return (
        <Link to={ruta} className='w-fit'>
            <div className="flex gap-3 items-center whitespace-nowrap">
                <SvgIcon width={32} height={32} />
                <h4 className={`${abierto ? "block" : "hidden"}`}>{nombre || pagina}</h4>
            </div>
        </Link >
    )
}

export default NavBarItem
