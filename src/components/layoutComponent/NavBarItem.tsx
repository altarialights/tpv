import { Link, To } from "react-router-dom";
function NavBarItem({
    pagina,
    nombre,
    svg: SvgIcon,
}: {
    pagina: string;
    nombre?: string;
    svg: React.FC<React.SVGProps<SVGSVGElement>>;
}) {
    const ruta: To = "../" + pagina;

    return (
        <Link to={ruta}>
            <div>
                <SvgIcon width={32} height={32} />
                <h4>{nombre || pagina}</h4>
            </div>
        </Link>
    );
}

export default NavBarItem;
