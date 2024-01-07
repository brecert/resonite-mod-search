import manifest from "../assets/manifest.json";
import { ModInfo } from "../components/ModInfo";

function groupBy<T, K, V>(iter: Iterable<T>, fn: (item: T, i: number) => [K, V]): Map<K, V[]> {
	const result: Map<K, V[]> = new Map()

	let i = 0;
	for (const item of iter) {
		const [k, v] = fn(item, i++)
		result.get(k)?.push(v) ?? result.set(k, [v])
	}

	return result
}

export const mods: ModInfo[] = Object.values(manifest.objects).flatMap((object) => {
	const authors = Object.entries(object.author).map(([name, info]) => ({
		name,
		info,
	}));
	return Object.entries(object.entries).map(([namespace, mod]) => ({
		namespace,
		info: mod,
		authors,
	}));
});

export const categories: Map<string, string[]> = groupBy(mods, mod => [mod.info.category, mod.namespace])
