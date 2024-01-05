from os import mkdir, remove, rmdir
import shutil
from typing import NamedTuple, Dict
from jinja2 import Environment, FileSystemLoader, filters
from schema import Manifest, Author, Mod

enviroment = Environment(
    loader = FileSystemLoader("templates")
)

mod_page_template = enviroment.get_template("mod_page.html.jinja")
mods_list_template = enviroment.get_template("mods_list.html.jinja")

with open("manifest.json") as f:
	manifest = Manifest.model_validate_json(f.read())

class ModInfo(Mod):
	authors: Dict[str, Author]
	namespace: str

mods: list[ModInfo] = []

for object in manifest.objects.values():
	for namespace, mod in object.entries.items():
		mod_info = ModInfo(**mod.model_dump(), authors=object.authors, namespace=namespace)
		mods.append(mod_info)

def find_mod(namespace: str):
	return next(mod for mod in mods if mod.namespace == namespace)

def make_valid_path(str: str):
	return str.replace("/", "-")

enviroment.globals['find_mod'] = find_mod
enviroment.filters['make_valid_path'] = make_valid_path

with open("site/index.html", 'w+') as f:
	f.write(mods_list_template.render(mods=mods))

shutil.rmtree("site/mod")
mkdir("site/mod")

for mod in mods:
	with open(f"site/mod/{make_valid_path(mod.namespace)}.html", 'w+') as f:
		f.write(mod_page_template.render(mod=mod))
