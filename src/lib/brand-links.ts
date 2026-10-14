import { SITE } from '../config/site';

/**
 * Transforme chaque « Econoris » écrit dans le texte visible d'une page HTML
 * en lien vers l'application (SITE.appUrl).
 *
 * Les éléments où un lien serait invalide ou gênant sont ignorés :
 * <head> (title, meta, JSON-LD), liens existants, boutons, <summary> (le clic
 * doit ouvrir la question de la FAQ), textes réservés aux lecteurs d'écran
 * (<figcaption> du mockup), code, SVG…
 */
const SKIP = new Set([
  'head',
  'a',
  'button',
  'summary',
  'figcaption',
  'label',
  'select',
  'option',
  'textarea',
  'code',
  'pre',
  'svg',
  'noscript',
  'title',
]);

/** Contenu brut : on saute directement à la balise fermante. */
const RAW = new Set(['script', 'style']);

const TOKEN = /<!--[\s\S]*?-->|<\/?[a-zA-Z][^\s/>]*(?:"[^"]*"|'[^']*'|[^'">])*>/g;
const WORD = /(?<![\p{L}\p{N}_\-./@])[EÉ]conoris(?![\p{L}\p{N}_\-@]|\.[\p{L}\p{N}])/gu;
const LINK = `<a href="${SITE.appUrl}" class="app-link">$&</a>`;

export function linkBrand(html: string): string {
  const stack: string[] = [];
  let out = '';
  let last = 0;

  TOKEN.lastIndex = 0;
  for (let m = TOKEN.exec(html); m; m = TOKEN.exec(html)) {
    const text = html.slice(last, m.index);
    out += stack.length ? text : text.replace(WORD, LINK);

    const tag = m[0];
    out += tag;
    last = TOKEN.lastIndex;

    const parsed = /^<(\/?)([a-zA-Z][^\s/>]*)/.exec(tag);
    if (!parsed) continue;
    const [, closing, rawName] = parsed;
    const name = rawName.toLowerCase();

    if (!closing && RAW.has(name)) {
      const end = html.toLowerCase().indexOf(`</${name}`, last);
      const stop = end === -1 ? html.length : end;
      out += html.slice(last, stop);
      last = TOKEN.lastIndex = stop;
      continue;
    }

    if (!SKIP.has(name)) continue;
    if (closing) {
      const i = stack.lastIndexOf(name);
      if (i !== -1) stack.length = i;
    } else if (!tag.endsWith('/>')) {
      stack.push(name);
    }
  }

  const rest = html.slice(last);
  return out + (stack.length ? rest : rest.replace(WORD, LINK));
}
