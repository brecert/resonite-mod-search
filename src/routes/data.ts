import manifest from "../assets/manifest.json";

export const mods = Object.values(manifest.objects).flatMap((object) => {
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
