import "./ModInfo.css";

import { Component, For, Show, createMemo } from "solid-js";
import { Author, Mod } from "../manifest/schema";
import { Outline } from "../icons";

export interface AuthorInfo {
  name: string;
  info: Author;
}

export interface ModInfo {
  namespace: string;
  authors: AuthorInfo[];
  info: Mod;
}

export const CleanBreak: Component<{ text: string }> = (props) => {
  const parts = createMemo(() =>
    Array.from(
      props.text.matchAll(/\p{Uppercase}*[^\p{Uppercase}]*/gu),
      (item) => item
    )
  );
  return (
    <>
      <For each={parts()}>
        {([text]) => (
          <>
            <wbr />
            {text}
          </>
        )}
      </For>
    </>
  );
};

export const ModInfo: Component<ModInfo> = (mod) => {
  return (
    <>
      <article class="ModInfo canvas">
        <header>
          <h2>
            <a href={`/mod/${encodeURIComponent(mod.namespace)}`}>
              <CleanBreak text={mod.info.name} />
            </a>
          </h2>
          <span class="authors">
            by{" "}
            <ul>
              <For each={mod.authors}>
                {(author) => (
                  <li>
                    <a href={author.info.url}>{author.name}</a>
                  </li>
                )}
              </For>
            </ul>
          </span>
          <span class="category">{mod.info.category}</span>
        </header>
        <p>{mod.info.description}</p>
        <footer class="links">
          <Show when={mod.info.sourceLocation != null}>
            <a href={mod.info.sourceLocation} class="icon">
              <Outline.Code width="1em" height="1em" /> Source
            </a>
          </Show>
          <Show when={mod.info.website}>
            <a href={mod.info.website} class="icon">
              <Outline.GlobeAlt width="1em" height="1em" /> Website
            </a>
          </Show>
        </footer>
      </article>
    </>
  );
};
