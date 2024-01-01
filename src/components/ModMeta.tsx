import "./ModMeta.css";
import { Component, For, Show, createMemo } from "solid-js";
import { ModInfo } from "./ModInfo";

export const ModMeta: Component<ModInfo> = (mod) => {
  const versions = createMemo(() =>
    Object.entries(mod.info.versions).reverse()
  );

  return (
    <>
      <article class="ModMeta canvas">
        <h2>Versions</h2>
        <For each={versions()}>
          {([version, info]) => (
            <article class="canvas version">
              <h3>{version}</h3>
              <section>
                <h4>artifacts</h4>
                <For each={info.artifacts}>
                  {(artifact) => (
                    <dl class="metadata">
                      <dt>url</dt>
                      <dd>
                        <a href={artifact.url}>{artifact.url}</a>
                      </dd>
                      <dt>sha256</dt>
                      <dd>{artifact.sha256}</dd>
                      <Show when={artifact.installLocation != null}>
                        <dt>install location</dt>
                        <dd>{artifact.installLocation}</dd>
                      </Show>
                    </dl>
                  )}
                </For>
              </section>
              <Show when={info.dependencies != null}>
                <section>
                  <h4>dependencies</h4>
                  <ul class="metadata">
                    <For each={Object.entries(info.dependencies!)}>
                      {([name, info]) => (
                        <>
                          <li>
                            <dl class="metadata">
                              <dt>name</dt>
                              <dd>{name}</dd>
                              <For each={Object.entries(info)}>
                                {([key, value]) => (
                                  <>
                                    <dt>{key}</dt>
                                    <dd>{`${value}`}</dd>
                                  </>
                                )}
                              </For>
                            </dl>
                          </li>
                        </>
                      )}
                    </For>
                  </ul>
                </section>
              </Show>
            </article>
          )}
        </For>
      </article>
    </>
  );
};
