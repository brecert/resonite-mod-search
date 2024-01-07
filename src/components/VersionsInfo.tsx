import { Component, For, Show, createMemo } from "solid-js";
import { ModInfo } from "./ModInfo";
import { Artifact, Dependency, Version } from "../manifest/schema";
import { mods } from "../routes/data";

import "./VersionsInfo.css";

function getFilename(uri: string) {
	return new URL(uri).pathname.split("/").pop();
}

export const ArtifactInfo: Component<{ artifact: Artifact }> = (props) => {
	return (
		<article class="ArtifactInfo canvas">
			<header>
				<h4 class="name">
					<a href={props.artifact.url}>
						{props.artifact.filename ?? getFilename(props.artifact.url)}
					</a>
				</h4>
			</header>
			<hr />
			<dl class="info faded">
				<dt>sha256</dt>
				<dd>{props.artifact.sha256}</dd>
				<Show when={props.artifact.installLocation != null}>
					<dt>path</dt>
					<dd>{props.artifact.installLocation}</dd>
				</Show>
			</dl>
		</article>
	);
};

export const DependencyList: Component<{
	dependencies: Record<string, Dependency>;
}> = (props) => {
	return (
		<dl class="dependency-list vertical-layout canvas">
			<For each={Object.entries(props.dependencies)}>
				{([namespace, dependency]) => {
					const inManifest = createMemo(() =>
						mods.some((mod) => mod.namespace === namespace)
					);

					// todo: use grid layout instead of this
					return (
						<div class="dependency horizontal-layout">
							<dt>
								<Show when={inManifest()} fallback={namespace}>
									<a href={`/mod/${encodeURIComponent(namespace)}`}>
										{namespace}
									</a>
								</Show>
							</dt>
							<dd>{dependency.version}</dd>
						</div>
					);
				}}
			</For>
		</dl>
	);
};

const VersionInfo: Component<{
	version: string;
	info: Version;
	is_primary_version: boolean;
}> = (props) => {
	return (
		<article class="VersionInfo canvas vertical-layout">
			<header class="horizontal-layout">
				<h3>{props.version}</h3>
				<Show when={props.info.releaseUrl}>
					<a href={props.info.releaseUrl} class="release">
						Release Page
					</a>
				</Show>
			</header>
			<details class="artifacts" open={props.is_primary_version}>
				<summary>Files</summary>
				<ul class="vertical-layout">
					<For each={props.info.artifacts}>
						{(artifact) => (
							<li>
								<ArtifactInfo artifact={artifact} />
							</li>
						)}
					</For>
				</ul>
			</details>
			<Show when={props.info.dependencies != null}>
				<details class="dependencies" open={props.is_primary_version}>
					<summary>Dependencies</summary>
					<DependencyList dependencies={props.info.dependencies!} />
				</details>
			</Show>
			<Show when={props.info.conflicts != null}>
				<details class="conflicts" open={props.is_primary_version}>
					<summary>Conflicts</summary>
					<DependencyList dependencies={props.info.conflicts!} />
				</details>
			</Show>
			<Show when={props.info.changelog}>
				<section>
					<h4>Changelog</h4>
					<pre>{props.info.changelog}</pre>
				</section>
			</Show>
		</article>
	);
};

export const VersionsInfo: Component<ModInfo> = (mod) => {
	const versions = createMemo(() =>
		Object.entries(mod.info.versions).reverse()
	);

	return (
		<>
			<article class="VersionsInfo canvas">
				<h2>Versions</h2>
				<ul class="versions vertical-layout">
					<For each={versions()}>
						{([version, info], i) => (
							<li>
								<VersionInfo
									version={version}
									info={info}
									is_primary_version={i() === 0}
								/>
							</li>
						)}
					</For>
				</ul>
			</article>
		</>
	);
};
