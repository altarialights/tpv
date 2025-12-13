import { createBrowserRouter } from 'react-router-dom'
import App from './App';
import Mesas from './pages/Mesas';
import Inventario from './pages/Inventario'
import Reservas from './pages/Reservas'
import Trabajadores from './pages/Trabajadores'
import Proveedores from './pages/Proveedores';
import Clientes from './pages/Clientes';
import Estadisticas from './pages/Estadisticas';
import Configuracion from './pages/Configuracion';
import Logout from './pages/Logout';

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/Mesas", element: <Mesas /> },
			{ path: "/Inventario", element: <Inventario /> },
			{ path: "/Reservas", element: <Reservas /> },
			{ path: "/Trabajadores", element: <Trabajadores /> },
			{ path: '/Proveedores', element: <Proveedores /> },
			{ path: '/Clientes', element: <Clientes /> },
			{ path: '/Estadisticas', element: <Estadisticas /> },
			{ path: '/Configuracion', element: <Configuracion /> },
			{ path: '/Logout', element: <Logout /> }
		]
	}
]);