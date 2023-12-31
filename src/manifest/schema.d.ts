export type uri = string;

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
  category: string;
  description: string;
  flags?: string[];
  id: string;
  name: string;
  platforms?: string[];
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
