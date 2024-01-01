import "./ModMeta.css";
import { Component, For, Show, createMemo } from "solid-js";
import { ModInfo } from "./ModInfo";
import { Version } from "../manifest/schema";
import { mods } from "../routes/data";

function getFilename(uri: string) {
  return new URL(uri).pathname.split("/").pop();
}

const VersionMeta: Component<{
  version: string;
  info: Version;
  first: boolean;
}> = (props) => {
  return (
    <article class="VersionMeta canvas version">
      <header>
        <h3>{props.version}</h3>
        <Show when={props.info.releaseUrl}>
          <a href={props.info.releaseUrl} class="release-url">
            Release Page
          </a>
        </Show>
      </header>
      <details open={props.first}>
        <summary>Files</summary>
        <ul class="artifacts">
          <For each={props.info.artifacts}>
            {(artifact) => (
              <li class="canvas">
                <a href={artifact.url}>
                  {artifact.filename ?? getFilename(artifact.url)}
                </a>
                <hr />
                <dl class="metadata">
                  <dt>sha256</dt>
                  <dd>{artifact.sha256}</dd>
                  <Show when={artifact.installLocation != null}>
                    <dt>path</dt>
                    <dd>{artifact.installLocation}</dd>
                  </Show>
                </dl>
              </li>
            )}
          </For>
        </ul>
      </details>
      <Show when={props.info.dependencies != null}>
        <details open={props.first}>
          <summary>Dependencies</summary>
          <dl class="dependencies metadata">
            <For each={Object.entries(props.info.dependencies ?? {})}>
              {([namespace, info]) => {
                const inManifest = createMemo(() =>
                  mods.some((mod) => mod.namespace === namespace)
                );
                return (
                  <div class="dependency canvas">
                    <dt>
                      <Show when={inManifest()} fallback={namespace}>
                        <a href={`/mod/${namespace}`}>{namespace}</a>
                      </Show>
                    </dt>
                    <dd>{info.version}</dd>
                  </div>
                );
              }}
            </For>
          </dl>
        </details>
      </Show>
      <Show when={props.info.conflicts != null}>
        <details open={props.first}>
          <summary>
            {Object.keys(props.info.conflicts!).length} conflict
          </summary>
          <dl class="dependencies">
            <For each={Object.entries(props.info.conflicts ?? {})}>
              {([namespace, info]) => {
                const inManifest = createMemo(() =>
                  mods.some((mod) => mod.namespace === namespace)
                );
                return (
                  <div class="dependency canvas">
                    <dt>
                      <Show when={inManifest()} fallback={namespace}>
                        <a href={`/mod/${namespace}`}>{namespace}</a>
                      </Show>
                    </dt>
                    <dd>{info.version}</dd>
                  </div>
                );
              }}
            </For>
          </dl>
        </details>
      </Show>
      <Show when={props.info.changelog}>
        <pre>{props.info.changelog}</pre>
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
          {([version, info], i) => (
            <VersionMeta version={version} info={info} first={i() === 0} />
          )}
        </For>
      </article>
    </>
  );
};
