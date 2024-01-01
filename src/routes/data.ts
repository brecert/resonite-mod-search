import manifest from "../assets/manifest.json";
import { ModInfo } from "../components/ModInfo";

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
