import { SITE } from '../config/site';

/**
 * Turns the first "Econoris" written in the visible text of an HTML page
 * into a link to the app (SITE.appUrl). The following mentions stay plain
 * text: one link per page is enough, and a page full of identical links
 * is confusing for visitors and dilutes the internal linking for Google.
 *
 * Elements where a link would be invalid or annoying are ignored:
 * <head> (title, meta, JSON-LD), headings, existing links, buttons, <summary>
 * (a click must open the FAQ question), screen-reader-only texts
 * (<figcaption> of the mockup), code, SVG…
 */
const SKIP = new Set([
  'head',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
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

/** Raw content: jump straight to the closing tag. */
const RAW = new Set(['script', 'style']);

const TOKEN = /<!--[\s\S]*?-->|<\/?[a-zA-Z][^\s/>]*(?:"[^"]*"|'[^']*'|[^'">])*>/g;
const WORD = /(?<![\p{L}\p{N}_\-./@])[EÉ]conoris(?![\p{L}\p{N}_\-@]|\.[\p{L}\p{N}])/u;

export function linkBrand(html: string): string {
  const stack: string[] = [];
  let isBrandLinked = false;
  let out = '';
  let last = 0;

  /** Links the first brand mention found in a text node, if no link was added yet. */
  const linkFirstMention = (text: string): string => {
    if (isBrandLinked || stack.length > 0) return text;

    const mention = WORD.exec(text);
    if (!mention) return text;

    isBrandLinked = true;
    const before = text.slice(0, mention.index);
    const after = text.slice(mention.index + mention[0].length);
    return `${before}<a href="${SITE.appUrl}" class="app-link">${mention[0]}</a>${after}`;
  };

  TOKEN.lastIndex = 0;
  for (let m = TOKEN.exec(html); m; m = TOKEN.exec(html)) {
    out += linkFirstMention(html.slice(last, m.index));

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

  return out + linkFirstMention(html.slice(last));
}
