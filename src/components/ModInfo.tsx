import "./ModInfo.css";

import { Component, For } from "solid-js";
import { Author, Mod } from "../manifest/schema";

export interface AuthorInfo {
  name: string;
  info: Author;
}

export interface ModInfo {
  namespace: string;
  authors: AuthorInfo[];
  info: Mod;
}

export const ModInfo: Component<ModInfo> = (mod) => {
  return (
    <>
      <article class="ModInfo canvas">
        <header>
          <h2><a href={`/mod/${mod.namespace}`}>{mod.info.name}</a></h2>
          <span class="author">
            by{" "}
            <For each={mod.authors}>
              {(author) => <a href={author.info.url}>{author.name}</a>}
            </For>
          </span>
          <span class="category">{mod.info.category}</span>
        </header>
        <p>{mod.info.description}</p>
      </article>
    </>
  );
};
