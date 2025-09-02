export interface ModManifest {
	objects: { [authorName: string]: AuthorEntry };
	schemaVersion: string;
}

export interface Author {
	icon?: string;
	support?: string;
	url: string;
	website?: string;
}

export interface AuthorEntry {
	author: Record<string, Author>;
	entries: Record<string, Mod>;
}

export interface Mod {
	additionalAuthors?: Record<string, Partial<Author>>;
	category: Category;
	description: string;
	flags?: Flag[];
	name: string;
	platforms?: Platform[];
	sourceLocation?: string;
	tags?: string[];
	versions: Record<string, Version>;
	website?: string;
}

export type Category =
	| "Asset Importing"
	| "Audio"
	| "Bug Workaround"
	| "Context Menu"
	| "Controls"
	| "Dashboard"
	| "Hardware Integration"
	| "Inspectors"
	| "Libraries"
	| "Memes"
	| "Misc"
	| "Optimization"
	| "Plugins"
	| "Protoflux"
	| "Technical Tweaks"
	| "Template"
	| "Visual Tweaks"
	| "Wizards";

export type Flag =
	| "deprecated"
	| "plugin"
	| "file";

export type Platform =
	| "android"
	| "headless"
	| "linux"
	| "linux-native"
	| "linux-wine"
	| "windows"
	| "other";

export interface Version {
	artifacts: Artifact[];
	changelog?: string;
	conflicts?: Record<string, Conflict>;
	dependencies?: Record<string, Dependency>;
	releaseUrl?: string;
}

export interface Artifact {
	filename?: string;
	installLocation?: string;
	sha256: string;
	url: string;
}

export interface Conflict {
	version: string;
	[property: string]: unknown;
}

export interface Dependency {
	version: string;
	[property: string]: unknown;
}
