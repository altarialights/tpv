import { createBrowserRouter } from 'react-router-dom'
import App from './App';
import Mesas from './pages/Mesas';

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/Mesas", element: <Mesas /> },
		]
	}
]);