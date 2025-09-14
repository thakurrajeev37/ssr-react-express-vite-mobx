import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";
import Auth from "./pages/Auth.jsx";

const routes = [
	{ path: "/", element: <Home /> },
	{ path: "/about", element: <About /> },
	{ path: "/auth", element: <Auth /> },
	{ path: "*", element: <NotFound /> },
];

export default routes;
