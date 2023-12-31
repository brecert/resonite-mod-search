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

export const ModInfo: Component<ModInfo> = (props) => {
  return (
    <>
      <article class="ModInfo canvas">
        <header>
          <h2>{props.info.name}</h2>
          <span class="author">
            by{" "}
            <For each={props.authors}>
              {(author) => <a href={author.info.url}>{author.name}</a>}
            </For>
          </span>
          <span class="category">{props.info.category}</span>
        </header>
        <p>{props.info.description}</p>
      </article>
    </>
  );
};
