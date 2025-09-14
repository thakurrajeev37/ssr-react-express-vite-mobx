import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes.jsx";
import { observer } from "mobx-react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function AppImpl() {
	React.useEffect(() => setIsClient(true), []);
	const element = useRoutes(routes);
	return (
		<div
			style={{
				fontFamily:
					"system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif",
				padding: 24,
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<Header />
			<main style={{ flex: 1 }}>
				<div>{element}</div>
			</main>
			<Footer />
		</div>
	);
}

const App = observer(AppImpl);
export default App;
