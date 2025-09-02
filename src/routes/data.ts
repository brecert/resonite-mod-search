import { ModInfo } from "../components/ModInfo";
import { ModManifest } from "../manifest/schema";

const MANIFEST_URL = "https://raw.githubusercontent.com/resonite-modding-group/resonite-mod-manifest/refs/heads/main/manifest.json"

function groupBy<T, K, V>(iter: Iterable<T>, fn: (item: T, i: number) => [K, V]): Map<K, V[]> {
	const result: Map<K, V[]> = new Map()

	let i = 0;
	for (const item of iter) {
		const [k, v] = fn(item, i++)
		result.get(k)?.push(v) ?? result.set(k, [v])
	}

	return result
}

const manifest: ModManifest = await fetch(MANIFEST_URL).then(res => res.json())

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
