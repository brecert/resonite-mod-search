from typing import Any, Optional, List, Dict
from pydantic import BaseModel
from pydantic.fields import Field

# Author Schema
class Author(BaseModel):
    url: str
    icon: Optional[str] = None
    support: Optional[str] = None
    website: Optional[str] = None

# Mod Schema
class Artifact(BaseModel):
    sha256: str
    url: str
    filename: Optional[str] = None
    installLocation: Optional[str] = None


class Conflict(BaseModel):
    version: str


class Dependency(BaseModel):
    version: str


class Version(BaseModel):
    artifacts: List[Artifact]
    changelog: Optional[str] = None
    conflicts: Optional[Dict[str, Conflict]] = None
    dependencies: Optional[Dict[str, Dependency]] = None
    releaseUrl: Optional[str] = None


class Mod(BaseModel):
    category: str
    description: str
    # required in the schema but no mod abides by it
    id: Optional[str] = None
    name: str
    versions: Dict[str, Version]
    # should be an Optional[List[str]] but the only mod that uses the field doesn't abide by it
    additionalAuthors: Optional[Dict[str, Any]] = None
    flags: Optional[List[str]] = None
    platforms: Optional[List[str]] = None
    sourceLocation: Optional[str] = None
    tags: Optional[List[str]] = None
    website: Optional[str] = None

# Manifest Schema
class ManifestObject(BaseModel):
    authors: Dict[str, Author] = Field(alias="author")
    entries: Dict[str, Mod]

class Manifest(BaseModel):
    objects: Dict[str, ManifestObject]
    schemaVersion: str
