import { Link, To } from "react-router-dom";

function NavBarItem({
    pagina,
    nombre,
    svg: SvgIcon,
    abierto,
}: {
    pagina: string;
    nombre?: string;
    svg: React.FC<React.SVGProps<SVGSVGElement>>;
    abierto: boolean;
}) {
    const ruta: To = "../" + pagina;

    return (
        <Link to={ruta} className="w-fit">
            <div className="flex gap-3 items-center">
                <SvgIcon width={32} height={32} />

                <h4
                    className={`
                        whitespace-nowrap
                        transition-all duration-300 ease-in-out
                        ${
                            abierto
                                ? "opacity-100 translate-x-0 delay-200"
                                : "opacity-0 -translate-x-4 delay-0"
                        }
                    `}
                >
                    {nombre || pagina}
                </h4>
            </div>
        </Link>
    );
}

export default NavBarItem;
