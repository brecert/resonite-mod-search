import "./ModMeta.css";
import { Component, For, Show, createMemo } from "solid-js";
import { ModInfo } from "./ModInfo";
import { mods } from "../routes/data";
import { Version } from "../manifest/schema";

const VersionMeta: Component<{ version: string; info: Version }> = (props) => {
  return (
    <article class="canvas version">
      <h3>{props.version}</h3>
      <section>
        <h4>artifacts</h4>
        <For each={props.info.artifacts}>
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
      <Show when={props.info.dependencies != null}>
        <section>
          <h4>dependencies</h4>
          <ul class="metadata">
            <For each={Object.entries(props.info.dependencies!)}>
              {([name, info]) => {
                const inManifest = createMemo(() =>
                  mods.some((mod) => mod.namespace === name)
                );

                return (
                  <li>
                    <dl class="metadata">
                      <dt>name</dt>
                      <dd>
                        <Show when={inManifest()} fallback={name}>
                          <a href={`/mod/${name}`}>{name}</a>
                        </Show>
                      </dd>
                      <dt>version</dt>
                      <dd>{info.version}</dd>
                    </dl>
                  </li>
                );
              }}
            </For>
          </ul>
        </section>
      </Show>
    </article>
  );
};

export const ModMeta: Component<ModInfo> = (mod) => {
  const versions = createMemo(() =>
    Object.entries(mod.info.versions).reverse()
  );

  return (
    <>
      <article class="ModMeta canvas">
        <h2>Versions</h2>
        <For each={versions()}>
          {([version, info]) => <VersionMeta version={version} info={info} />}
        </For>
      </article>
    </>
  );
};
