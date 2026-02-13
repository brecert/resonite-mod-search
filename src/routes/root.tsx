import { Component, For, createMemo, createSignal } from "solid-js";
import { ModInfo } from "../components/ModInfo";

import "./root.css";
import { categories, flagName, flags, mods, tags } from "./data";
import { Flag } from "../manifest/schema";
import { SidebarSection } from "./SidebarSection";

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

	return (
		<>
			<div class="Main panel">
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
