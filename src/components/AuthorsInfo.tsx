import { Component, For, Show } from "solid-js";
import { Outline } from "../icons";
import * as ModInfo from "./ModInfo";

import "./AuthorsInfo.css";

const proxyURL = (url: string) =>
	`https://proxy.bree.workers.dev/proxy?url=${encodeURIComponent(url)}`;

export const AuthorInfo: Component<{ author: ModInfo.AuthorInfo }> = (
	props
) => {
	return (
		<article class="AuthorInfo canvas horizontal-layout">
			<Show when={props.author.info.icon}>
				<img
					src={proxyURL(props.author.info.icon!)}
					width="40px"
					height="40px"
					class="avatar"
					aria-hidden="true"
				/>
			</Show>
			{/* todo: grid this */}
			<div class="main vertical-layout">
				<h3 class="name">{props.author.name}</h3>
				<footer>
					<ul class="links vertical-layout">
						<a href={props.author.info.url} class="icon-label">
							<Outline.ExternalLink width="1em" height="1em" />
							{props.author.name}
						</a>
						<Show when={props.author.info.website}>
							<a href={props.author.info.website} class="icon-label">
								<Outline.GlobeAlt width="1em" height="1em" />
								Website
							</a>
						</Show>
						<Show when={props.author.info.support}>
							<a href={props.author.info.support} class="icon-label">
								<Outline.Heart width="1em" height="1em" />
								Support
							</a>
						</Show>
					</ul>
				</footer>
			</div>
		</article>
	);
};

export const AuthorsInfo: Component<{ authors: ModInfo.AuthorInfo[] }> = (
	props
) => {
	return (
		<article class="AuthorsInfo canvas vertical-layout">
			<h2>Authors</h2>
			<ul class="vertical-layout">
				<For each={props.authors}>
					{(author) => (
						<li>
							<AuthorInfo author={author} />
						</li>
					)}
				</For>
			</ul>
		</article>
	);
};
