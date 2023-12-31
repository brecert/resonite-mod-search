import htm from './libs/htm.js';
import { h } from './html.js';
import type { Author, Manifest, Mod } from './schema.js';
const html = htm.bind(h)

/** @type {document['querySelector']} */
const $ = document.querySelector.bind(document)

const $status = $("#status")
const $search = $("#search")
const $modListings = $("#modListings")

interface AuthorInfo {
  name: string
  info: Author
}

interface ModInfo {
  namespace: string,
  authors: AuthorInfo[]
  info: Mod,
}

const ModListing = ({ info: mod, authors }: ModInfo) => html`
  <article class="ModListing canvas">
    <header>
      <h2>${mod.name}</h2>
      <span class="author">by ${authors.map(author => html`<a href=${author.info.url}>${author.name}</a>`)}</span>
      <span class="category">${mod.category}</span>
    </header>
    <p>${mod.description}</p>
  </article>
`

// only display if it's taking a while
const timeout = setTimeout(() => $status.textContent = 'Fetching Manifest...', 120)

const manifest: Manifest = await fetch('./assets/manifest.json ')
  .then(res => res.json())
  .catch(err => $status.textContent = err)

clearTimeout(timeout)

if (!manifest.schemaVersion.startsWith('1.0')) {
  $status.textContent = 'current manifest schema is not supported\ncontinuing anyways.'
}

const mods = Object.values(manifest.objects)
  .flatMap(object => {
    const authors = Object.entries(object.author).map((([name, info]) => ({ name, info })))
    return Object.entries(object.entries).map(([namespace, mod]) => ({ namespace, info: mod, authors }))
  })

$modListings.append(...mods.map(ModListing))