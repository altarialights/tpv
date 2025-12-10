import NavBarItem from "./NavBarItem";
function NavBar({ rol }: { rol: string }) {
    if (rol == "admin") {
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
