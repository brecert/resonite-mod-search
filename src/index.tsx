/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";

import "./uix.css";
import "./index.css";

import { Root } from "./routes/root";
import { Mod } from "./routes/mod/[id].tsx";
import { mods } from "./routes/data.ts";

const root = document.getElementById("root");

render(
  () => (
    <Router preload={false}>
      <Route
        path="/mod/:namespace"
        component={Mod}
        matchFilters={{ namespace: mods.map((mod) => mod.namespace) }}
      />
      <Route path="/" component={Root} />
    </Router>
  ),
  root!
);
