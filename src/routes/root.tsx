import { Component, For, createMemo, createSignal } from "solid-js";
import { ModInfo } from "../components/ModInfo";

import "./root.css";
import { categories, mods } from "./data";

const searchIndex = mods.map((mod) => [
	mod.namespace,
	...[
		mod.info.name,
		mod.info.category,
		mod.info.description,
		...(mod.info.tags ?? []),
		...(mod.info.platforms ?? []),
		...mod.authors.map((author) => author.name),
	].map((text) => text.toLocaleLowerCase()),
]);

// the search isn't really optimized but it's fine for now
export const Root: Component = () => {
	type Categories = Record<string, boolean>;

	const [searchText, setSearchText] = createSignal("");
	const [searchCategories, setSearchCategories] = createSignal<Categories>({});

	const enabledCategories = createMemo(() =>
		Object.entries(searchCategories())
			.filter((a) => a[1])
			.map((a) => a[0])
	);

	const searchedMods = createMemo(() => {
		const normalizedSearch = searchText().toLocaleLowerCase();
		return searchIndex
			.filter((items) => items.some((item) => item.includes(normalizedSearch)))
			.map((item) => item[0]);
	});

	const filteredMods = createMemo(() => {
		return mods
			.filter(
				(mod) =>
					enabledCategories().length == 0 ||
					enabledCategories().includes(mod.info.category)
			)
			.filter((mod) => searchedMods().includes(mod.namespace));
	});

	const setCategory = (category: string, state: boolean) =>
		setSearchCategories((categories) => ({
			...categories,
			[category]: state,
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
				<aside class="filters canvas">
					<section class="vertical-layout">
						<h3>Categories</h3>
						<For each={[...categories.keys()]}>
							{(category) => (
								<label>
									<input
										type="checkbox"
										onChange={(e) =>
											setCategory(category, e.currentTarget.checked)
										}
									/>{" "}
									{category}
								</label>
							)}
						</For>
					</section>
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
