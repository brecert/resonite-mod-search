import { Component, For, Match, Show, Switch, createMemo } from "solid-js";
import { Author, Mod } from "../manifest/schema";
import { Outline } from "../icons";

import "./ModInfo.css";

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
		<For each={parts()}>
			{([text]) => (
				<>
					<wbr />
					{text}
				</>
			)}
		</For>
	);
};

export const ModInfo: Component<ModInfo> = (mod) => {
	return (
		<>
			<article class="ModInfo canvas">
				<header class="horizontal-layout">
					<h2>
						<a href={`/mod/${encodeURIComponent(mod.namespace)}`}>
							<CleanBreak text={mod.info.name} />
						</a>
					</h2>
					<address class="authors horizontal-layout">
						<span aria-label="created by">by </span>
						<ul class="horizontal-layout join">
							<For each={mod.authors}>
								{(author) => (
									<li>
										<a href={author.info.url}>{author.name}</a>
									</li>
								)}
							</For>
						</ul>
					</address>
					<span class="category faded">{mod.info.category}</span>
				</header>
				<p>{mod.info.description}</p>
				<footer class="horizontal-layout">
					<ul class="links horizontal-layout muted">
						<Show when={mod.info.sourceLocation != null}>
							<li>
								<a href={mod.info.sourceLocation} class="icon-label">
									<Outline.Code width="1em" height="1em" /> Source
								</a>
							</li>
						</Show>
						<Show when={mod.info.website}>
							<li>
								<a href={mod.info.website} class="icon-label">
									<Outline.GlobeAlt width="1em" height="1em" /> Website
								</a>
							</li>
						</Show>
					</ul>
					<ul class="tags horizontal-layout join faded">
						<For each={mod.info.tags}>{(tag) => <li>{tag}</li>}</For>
					</ul>
					{/* todo: determine accessibility semantics of not adding elements like this */}
					<Show
						when={mod.info.platforms != null && mod.info.platforms.length > 0}
					>
						<ul class="platforms faded">
							<For each={mod.info.platforms}>
								{(platform) => (
									<li class="horizontal-layout">
										<Switch fallback={platform}>
											<Match when={platform == "headless"}>
												<span class="aria-tooltip tip:^<" aria-label="headless">
													<Outline.Server
														width="1em"
														height="1em"
														aria-hidden="true"
													/>
												</span>
											</Match>
										</Switch>
									</li>
								)}
							</For>
						</ul>
					</Show>
				</footer>
			</article>
		</>
	);
};
