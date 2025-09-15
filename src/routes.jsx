import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Auth from "./pages/Auth.jsx";
import NotFound from "./pages/NotFound.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const routes = [
	{ path: "/", element: <Home /> },
	{ path: "/about", element: <About /> },
	{ path: "/auth", element: <Auth /> },
	{ path: "/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
	{ path: "*", element: <NotFound /> },
];

export default routes;
