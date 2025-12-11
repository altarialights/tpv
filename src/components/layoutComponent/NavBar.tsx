import NavBarItem from "./NavBarItem";
import { ReactComponent as MesaSVG } from "../../assets/svg/MesaSVG.svg";
import { ReactComponent as MenuOpen } from "../../assets/svg/MenuOpen.svg";
import { ReactComponent as MenuClose } from "../../assets/svg/MenuClose.svg";
import Logo from "../../assets/img/logo.png";

function NavBar({ rol }: { rol: string }) {
    if (rol == "admin") {
        return (
            <section>
                <header>
                    <img src={Logo} alt="" />
                    <MenuOpen width={32} height={32} />
                    <MenuClose width={32} height={32} />
                    <svg></svg>
                </header>
                <nav>
                    <div>
                        <NavBarItem pagina="Mesas" svg={MesaSVG}></NavBarItem>
                        <NavBarItem
                            pagina="Inventario"
                            svg={MesaSVG}
                        ></NavBarItem>
                        <NavBarItem
                            pagina="Reservas"
                            svg={MesaSVG}
                        ></NavBarItem>
                        <NavBarItem
                            pagina="Trabajadores"
                            svg={MesaSVG}
                        ></NavBarItem>
                        <NavBarItem
                            pagina="Proveedores"
                            nombre="Proveedores y Pedidos"
                            svg={MesaSVG}
                        ></NavBarItem>
                        <NavBarItem
                            pagina="Clientes"
                            svg={MesaSVG}
                        ></NavBarItem>
                        <NavBarItem
                            pagina="Estadisticas"
                            svg={MesaSVG}
                        ></NavBarItem>
                    </div>
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
