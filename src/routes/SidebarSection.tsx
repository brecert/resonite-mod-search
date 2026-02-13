import { Component, For } from "solid-js";

type Props = {
	open?: boolean;
	name: string;
	keys: string[];
	onChange: (key: string, state: boolean) => { [x: string]: boolean; };
};
/* this isn't an ideal separation but it's fine for now. */
export const SidebarSection: Component<Props> = ({ open, name, keys, onChange }) => <section class="canvas vertical-layout">
	<details open={open}>
		<summary><h3>{name}</h3></summary>
		<ul class="vertical-layout">
			<For each={keys}>
				{(key) => (
					<li>
						<label>
							<input
								type="checkbox"
								onChange={(e) => onChange(key, e.currentTarget.checked)} />
							{key}
						</label>
					</li>
				)}
			</For>
		</ul>
	</details>
</section>;
