import "./AuthorInfo.css";

import { Component, For, Show } from "solid-js";
import { Outline, Solid } from "../icons";
import * as ModInfo from "./ModInfo";

export const AuthorInfo: Component<{ authors: ModInfo.AuthorInfo[] }> = (
  props
) => {
  const authors = props.authors;

  return (
    <>
      <article class="AuthorInfo canvas">
        <h2>Authors</h2>
        <For each={authors}>
          {(author) => (
            <>
              <article class="author canvas">
                <Show when={author.info.icon}>
                  <img
                    src={`https://proxy.bree.workers.dev/proxy?url=${encodeURIComponent(author.info.icon!)}`}
                    width="48px"
                    height="48px"
                    class="avatar"
                  />
                </Show>
                <h3 class="name">{author.name}</h3>
                <footer class="links">
                  <a href={author.info.url} class="icon">
                    <Outline.ExternalLink width="1em" height="1em" />
                    {author.name}
                  </a>
                  <Show when={author.info.website}>
                    <a href={author.info.website} class="icon">
                      <Outline.GlobeAlt width="1em" height="1em" />
                      Website
                    </a>
                  </Show>
                  <Show when={author.info.support}>
                    <a href={author.info.support} class="icon">
                      <Outline.Heart width="1em" height="1em" />
                      Support
                    </a>
                  </Show>
                </footer>
              </article>
            </>
          )}
        </For>
      </article>
    </>
  );
};
