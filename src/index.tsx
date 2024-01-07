/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";

import "./css/global.css";
import "./css/tooltip.css";
import "./css/uis.css";

import { Root } from "./routes/root";
import { Mod } from "./routes/mod/[id].tsx";
import { mods } from "./routes/data.ts";
import { NotFound } from "./routes/NotFound.tsx";

const root = document.getElementById("root");

render(
	() => (
		<Router preload={false}>
			<Route
				path="/mod/:namespace"
				component={Mod}
				matchFilters={{
					namespace: mods.map((mod) => encodeURIComponent(mod.namespace)),
				}}
			/>
			<Route path="/" component={Root} />
			<Route path="*" component={NotFound} />
		</Router>
	),
	root!
);
