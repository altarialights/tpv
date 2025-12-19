import { useState } from "react";
import NavBarItem from "./NavBarItem";
import { ReactComponent as MesaSVG } from "../../assets/svg/MesaSVG.svg";
import { ReactComponent as MenuOpen } from "../../assets/svg/MenuOpen.svg";
import { ReactComponent as MenuClose } from "../../assets/svg/MenuClose.svg";
import { ReactComponent as ReservasSVG } from "../../assets/svg/ReservasSVG.svg";
import { ReactComponent as TrabajadoresSVG } from "../../assets/svg/TrabajadoresSVG.svg";
import { ReactComponent as ClienteSVG } from "../../assets/svg/ClienteSVG.svg";
import { ReactComponent as ConfiguracionSVG } from "../../assets/svg/ConfiguracionSVG.svg";
import { ReactComponent as LogoutSVG } from "../../assets/svg/LogoutSVG.svg";
import { ReactComponent as InventarioSVG } from "../../assets/svg/InventarioSVG.svg";
import { ReactComponent as EstadisticasSVG } from "../../assets/svg/EstadisticasSVG.svg";
import { ReactComponent as ProveedoresSVG } from "../../assets/svg/ProveedoresSVG.svg";
import Logo from "../../assets/img/logo.png";

function NavBar({ rol }: { rol: string }) {
    const [open, setOpen] = useState(false);

    const actualizarApertura = () => {
        setOpen((prev) => !prev);
    };

    if (rol == "admin") {
        return (
            <section
                className={`flex flex-col h-full gap-3 transition-all duration-500 bg-blanco sticky top-0 ${open ? "w-60" : "w-12"
                    }`}
            >
                <header className="flex items-center p-2 justify-between w-full">
                    <img
                        src={Logo}
                        className={`size-8 cursor-pointer ${open ? "" : "hidden"
                            }`}
                    />
                    <MenuOpen
                        width={32}
                        height={32}
                        className={`cursor-pointer ${open ? "hidden" : ""}`}
                        onClick={actualizarApertura}
                    />
                    <MenuClose
                        width={32}
                        height={32}
                        className={`cursor-pointer ${open ? "" : "hidden"}`}
                        onClick={actualizarApertura}
                    />
                </header>

                <nav className="flex flex-col justify-between h-full w-fit p-2">
                    <div className="flex flex-col gap-3 w-fit">
                        <NavBarItem
                            pagina="Mesas"
                            svg={MesaSVG}
                            abierto={open}
                        />
                        <NavBarItem
                            pagina="Inventario"
                            svg={InventarioSVG}
                            abierto={open}
                        />
                        <NavBarItem
                            pagina="Reservas"
                            svg={ReservasSVG}
                            abierto={open}
                        />
                        <NavBarItem
                            pagina="Trabajadores"
                            svg={TrabajadoresSVG}
                            abierto={open}
                        />
                        <NavBarItem
                            pagina="Proveedores"
                            nombre="Proveedores y Pedidos"
                            svg={ProveedoresSVG}
                            abierto={open}
                        />
                        <NavBarItem
                            pagina="Clientes"
                            svg={ClienteSVG}
                            abierto={open}
                        />
                        <NavBarItem
                            pagina="Estadisticas"
                            svg={EstadisticasSVG}
                            abierto={open}
                        />
                    </div>
                    <div className="flex flex-col gap-3 w-fit">
                        <NavBarItem
                            pagina="Configuracion"
                            nombre="Configuración"
                            svg={ConfiguracionSVG}
                            abierto={open}
                        />
                        <NavBarItem
                            pagina="Logout"
                            nombre="Cerrar Sesión"
                            svg={LogoutSVG}
                            abierto={open}
                        />
                    </div>
                </nav>
            </section>
        );
    } else if (rol == "camarero") {
        return (
            <section>
                <header>
                    <img src="" alt="" />
                    <svg></svg>
                    <svg></svg>
                </header>
                <nav>
                    <div></div>
                    <div>
                        <div>
                            <svg></svg>
                            <h4>Configuración</h4>
                        </div>
                        <div>
                            <svg></svg>
                            <h4>Cerrar sesión</h4>
                        </div>
                    </div>
                </nav>
            </section>
        );
    } else if (rol == "cocinero") {
        return (
            <section>
                <header>
                    <img src="" alt="" />
                    <svg></svg>
                    <svg></svg>
                </header>
                <nav>
                    <div></div>
                    <div>
                        <div>
                            <svg></svg>
                            <h4>Configuración</h4>
                        </div>
                        <div>
                            <svg></svg>
                            <h4>Cerrar sesión</h4>
                        </div>
                    </div>
                </nav>
            </section>
        );
    }
}

export default NavBar;
