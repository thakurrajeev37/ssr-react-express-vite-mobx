import React from "react";
import { observer } from "mobx-react";
import { useAboutStore } from "../stores/rootStores.js";

const About = observer(function About() {
	const aboutStore = useAboutStore();
	// About store now fully initialized on server; no client effect needed
	return (
		<div>
			<h2>About</h2>
			<p>This is an SSR React + Express + Vite template with routing.</p>
			<p>
				<strong>Info:</strong> {aboutStore.info}
			</p>
			<p>
				<strong>Loaded:</strong> {aboutStore.loaded ? "Yes" : "No"}
			</p>
		</div>
	);
});

export default About;
