import { Route, Router } from "@solidjs/router";
import { Component } from "solid-js";

import "./NotFound.css";

export const NotFound: Component = () => {
	return (
		<div class="NotFound">
			<Router>
				<Route
					path="/mod/*namespace"
					component={() => <h1>404 : Mod Not Found</h1>}
				/>
				<Route path="*" component={() => <h1>404 : Not Found</h1>} />
			</Router>
		</div>
	);
};
