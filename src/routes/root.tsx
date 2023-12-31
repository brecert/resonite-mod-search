import "./root.css";
import manifest from "../assets/manifest.json";

import { Component, For, createMemo, createSignal } from "solid-js";
import { ModInfo } from "../components/ModInfo";

const mods: ModInfo[] = Object.values(manifest.objects).flatMap((object) => {
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

const searchIndex = mods.map((mod) => [
  mod.namespace,
  mod.info.category,
  mod.info.description,
  ...(mod.info.tags ?? []),
  ...(mod.info.platforms ?? []),
  ...mod.authors.map((author) => author.name),
]);

// the search isn't really optimized but it's fine for now
export const Root: Component = () => {
  const [searchText, setSearchText] = createSignal("");
  const filteredMods = createMemo(() =>
    searchIndex
      .filter((data) =>
        data.some((text) =>
          text.toLocaleLowerCase().includes(searchText().toLocaleLowerCase())
        )
      )
      .flatMap((data) => mods.find((mod) => mod.namespace === data[0]) ?? [])
  );

  return (
    <>
      <div class="Root">
        <search>
          <input
            value={searchText()}
            onInput={(e) => setSearchText(e.currentTarget.value)}
            type="search"
            placeholder="Search..."
          />
        </search>
        <div class="ModList">
          <For each={filteredMods()}>{(mod) => <ModInfo {...mod} />}</For>
        </div>
      </div>
    </>
  );
};

// solid-js doesn't have the `search` element currently so we add it
declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      search: HTMLAttributes<HTMLElement>;
    }
  }
}
