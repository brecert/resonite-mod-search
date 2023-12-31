import "./App.css";
import manifest from "./assets/manifest.json";

import { For } from "solid-js";
import { ModInfo } from "./components/ModInfo";

const mods = Object.values(manifest.objects).flatMap((object) => {
  const authors = Object.entries(object.author).map(([name, info]) => ({
    name,
    info,
  }));
  return Object.entries(object.entries).map(([namespace, mod]) => ({
    namespace,
    info: mod,
    authors,
  }));
});

function App() {
  return (
    <>
      <div class="App">
        <div class="ModList">
          <For each={mods}>{(mod) => <ModInfo {...mod} />}</For>
        </div>
      </div>
    </>
  );
}

export default App;
