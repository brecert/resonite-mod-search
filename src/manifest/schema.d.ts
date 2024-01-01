export type uri = string;

export type Category =
  | 'Asset Importing'
  | 'Audio'
  | 'Bug Workaround'
  | 'Context Menu'
  | 'Controls'
  | 'Dashboard'
  | 'Hardware Integration'
  | 'Inspectors'
  | 'Libraries'
  | 'Memes'
  | 'Misc'
  | 'Optimization'
  | 'Plugins'
  | 'Protoflux'
  | 'Technical Tweaks'
  | 'Template'
  | 'Visual Tweaks'
  | 'Wizards'

export type Platform =
  | 'android'
  | 'headless'
  | 'linux'
  | 'linux-native'
  | 'linux-wine'
  | 'windows'
  | 'other'

export type Flag =
  | 'deprecated'
  | 'plugin'
  | 'file'

export interface Manifest {
  objects: { [namespace: string]: ManifestObject }
  schemaVersion: string
}

export interface ManifestObject {
  author: { [name: string]: Author },
  entries: { [namespace: string]: Mod }
}

export interface Author {
  url: uri
  icon?: uri
  website?: uri
  support?: uri
}

export interface AuthorSchema {
  author: Record<string, Author>
}

export interface Mod {
  additionalAuthors?: string[];
  category: Category;
  description: string;
  flags?: Flag[];
  id: string;
  name: string;
  platforms?: Platform[];
  sourceLocation?: string;
  tags?: string[];
  versions: Record<string, Version>;
  website?: string;
}

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
