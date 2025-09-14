import { observer } from "mobx-react-lite";
import { useStore } from "../stores/StoreContext.jsx";

const Footer = observer(function Footer() {
	const { app } = useStore();
	return (
		<footer
			style={{
				marginTop: 40,
				padding: "16px 20px",
				borderTop: "1px solid #ccc",
				fontSize: 12,
				color: "#555",
			}}
		>
			<p style={{ margin: 0 }}>{app.footerText || "..."}</p>
		</footer>
	);
});

export default Footer;
