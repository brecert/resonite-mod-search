import { Component, For, createMemo, createSignal } from "solid-js";
import { CleanBreak, ModInfo } from "../components/ModInfo";

import "./root.css";
import { categories, flags, mods, tags, SOURCE_URL } from "./data";
import { Flag } from "../manifest/schema";
import { SidebarSection } from "../components/SidebarSection";
import { Outline } from "../icons";

const searchIndex = mods.map((mod) => [
	mod.namespace,
	...[
		mod.info.name,
		mod.info.category,
		mod.info.description,
		...(mod.info.tags ?? []),
		...(mod.info.flags ?? []),
		...(mod.info.platforms ?? []),
		...mod.authors.map((author) => author.name),
	].map((text) => text.toLocaleLowerCase()),
]);

// the search isn't really optimized but it's fine for now
export const Root: Component = () => {
	type Categories = Record<string, boolean>;
	type Flags = Partial<Record<Flag, boolean>>;
	type Tags = Record<string,	boolean>

	const [searchText, setSearchText] = createSignal("");
	const [searchCategories, setSearchCategories] = createSignal<Categories>({});
	const [searchFlags, setSearchFlags] = createSignal<Flags>({});
	const [searchTags, setSearchTags] = createSignal<Tags>({});

	const enabledCategories = createMemo(() =>
		Object.entries(searchCategories())
			.filter((a) => a[1])
			.map((a) => a[0])
	);

	const enabledFlags = createMemo(() =>
		Object.entries(searchFlags())
			.filter((a) => a[1])
			.map((a) => a[0])
	);

	const enabledTags = createMemo(() =>
		Object.entries(searchTags())
			.filter((a) => a[1])
			.map((a) => a[0])
	);

	const searchedMods = createMemo(() => {
		const normalizedSearch = searchText().toLocaleLowerCase();
		return searchIndex
			.filter((items) => items.some((item) => item.includes(normalizedSearch)))
			.map((item) => item[0]);
	});

	// all of this is pretty inefficient, it's fine for now.
	const filteredMods = createMemo(() => {
		return mods
			.filter(
				(mod) =>
					enabledCategories().length == 0 ||
					enabledCategories().includes(mod.info.category)
			)
			.filter(
				(mod) =>
			 		(enabledFlags().length == 0 && !mod.info.flags?.includes("deprecated")) ||
					mod.info.flags?.some(flag => enabledFlags().includes(flag))
			)
			.filter(
				(mod) =>
			 		enabledTags().length == 0 ||
					mod.info.tags?.some(tag => enabledTags().includes(tag))
			)
			.filter((mod) => searchedMods().includes(mod.namespace));
	});

	const setCategory = (category: string, state: boolean) =>
		setSearchCategories((categories) => ({
			...categories,
			[category]: state,
		}));

	const setFlag = (flag: string, state: boolean) =>
		setSearchFlags((flags) => ({
			...flags,
			[flag]: state,
		}));

	const setTag = (tag: string, state: boolean) =>
		setSearchTags((tags) => ({
			...tags,
			[tag]: state,
		}));


	// none of this is needed, but I thought I'd have some fun
	const _intBuf = new Uint32Array(1);
	// technically not correct but it's funny
	const randomFloat = (min: number, max: number) => min + crypto.getRandomValues(new Uint32Array(1))[0] * ((max - min) / 4294967295);
	const randomInt = (min: number, max: number) => Math.round(randomFloat(min, max));
	const sample = <T,>(array: T[]) => array[randomInt(0, array.length-1)]
	function sampleWeighted<T>(array: [weight: number, T][]) {
		const sum = array.reduce((a, b) => a + b[0], 0)
		let probability = randomFloat(0, sum)
		for (let i = 0; i < array.length; i++) {
			const element = array[i]
			const weight = element[0]
			if(probability <= weight) {
				return element[1]
			}
      probability -= weight
		}
		throw "unreachable"
	}

	const motd = sampleWeighted([
		[4.00, () => <span>created by <a href="//bree.dev" target="_blank">bree</a></span>],
		[4.00, () => <span>data from <a href="https://github.com/resonite-modding-group/resonite-mod-manifest" target="_blank">the resonite mod manifest</a></span>],
		[0.33, () => <span>woof</span>],
		[0.33, () => <span>meow</span>],
		[0.33, () => <span>baaa</span>],
		[0.33, () => <span>bzzz</span>],
		[0.33, () => <span>ribbit</span>],
		[0.33, () => <span>hallo!</span>],
		[0.33, () => <span>hello!</span>],
		[0.33, () => <span>こんにちは</span>],
		[0.33, () => <span>FrooxEngine x Unity {"</3"}</span>],
		[1.85, () => <span>check out <a href="https://go.resonite.com/">{"go.resonite.com"}</a></span>],
		[0.10, () => <span style={{ rotate: "0.25turn" }}>:)</span>],
		[0.50, () => <span>use <a href="https://wiki.resonite.com/Component:ValueTag"><code>{"ValueTag<T>"}</code></a>!</span>],
		[0.50, () => <span>use <a href="https://wiki.resonite.com/Component:ReferenceTag"><code>{"ReferenceTag<T>"}</code></a>!</span>],
		[1.56, () => {
			const mod = sample(mods)
			return <span>have you looked at <a href={`/mod/${encodeURIComponent(mod.namespace)}`}>{mod.info.name}</a>?</span>
		}],
	])

	return (
		<>
			<div class="Main panel">
				<section class="header">
					<h1>Resonite Mod Search</h1>
					{motd()}
					<a href={SOURCE_URL} class="icon-label source" target="_blank">
						<Outline.Code width="1em" height="1em" /> Source
					</a>
				</section>
				<search class="search vertical-layout">
					<input
						value={searchText()}
						onInput={(e) => setSearchText(e.currentTarget.value)}
						type="search"
						placeholder="Search..."
					/>
				</search>
				<aside class="filters">
					<SidebarSection name="Categories" keys={[...categories.keys()]} onChange={setCategory} open={true} />
					<SidebarSection name="Flags" keys={[...flags.keys()]} onChange={setFlag}	/>
					<SidebarSection name="Tags" keys={[...tags.keys()]} onChange={setTag} />
				</aside>
				<ul class="ModList vertical-layout">
					<For each={filteredMods()}>
						{(mod) => (
							<li>
								<ModInfo {...mod} />
							</li>
						)}
					</For>
				</ul>
			</div>
		</>
	);
};

// solid-js doesn't have the `search` element currently so we add it
declare module "solid-js" {
	namespace JSX {
		interface IntrinsicElements {
			search: HTMLAttributes<HTMLElement>;
		}
	}
}
