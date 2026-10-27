// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

loadLocalEnvFile();

// URL publique du site vitrine. Indispensable au SEO (canonical, sitemap,
// Open Graph). À surcharger au build : SITE_URL=https://mon-domaine.fr npm run build
const SITE_URL = process.env.SITE_URL ?? readSiteUrlFallback();

/**
 * Astro does not expose the .env file to its own config file: load it into
 * process.env so a local `npm run build` gets SITE_URL. Variables already set
 * in the environment (Docker ARG/ENV, CI) keep priority over the file.
 * The file is optional: it is not copied into the Docker build context.
 */
function loadLocalEnvFile() {
  const envFilePath = fileURLToPath(new URL('./.env', import.meta.url));

  try {
    process.loadEnvFile(envFilePath);
  } catch (error) {
    const isMissingFile = /** @type {NodeJS.ErrnoException} */ (error).code === 'ENOENT';
    if (!isMissingFile) throw error;
  }
}

/**
 * Without SITE_URL, a production build would publish broken canonical URLs,
 * sitemap and Open Graph tags: stop the build with a clear message instead.
 * The dev server and preview fall back to the local address.
 */
function readSiteUrlFallback() {
  const isBuild = process.argv.includes('build');
  if (isBuild) {
    throw new Error('SITE_URL is required to build the site, e.g. SITE_URL=https://econoris.fr npm run build');
  }
  return 'http://localhost:4321';
}

const GUIDES_DIRECTORY = new URL('./src/content/guides/', import.meta.url);

/**
 * Reads the last modification date of each guide from its front matter
 * (updatedDate, or pubDate when the guide was never updated).
 * @returns {Map<string, string>} guide path (e.g. "/guides/regle-50-30-20/") -> ISO date
 */
function readGuideLastModifiedDates() {
  const lastModifiedDates = new Map();

  for (const fileName of readdirSync(GUIDES_DIRECTORY)) {
    if (!fileName.endsWith('.md')) continue;

    const fileContent = readFileSync(new URL(fileName, GUIDES_DIRECTORY), 'utf8');
    const frontMatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(fileContent)?.[1] ?? '';
    const readDate = (/** @type {string} */ key) =>
      new RegExp(`^${key}:\\s*["']?([0-9-]+)`, 'm').exec(frontMatter)?.[1];

    const lastModified = readDate('updatedDate') ?? readDate('pubDate');
    if (!lastModified) continue;

    const guidePath = `/guides/${fileName.replace(/\.md$/, '')}/`;
    lastModifiedDates.set(guidePath, new Date(lastModified).toISOString());
  }

  return lastModifiedDates;
}

const guideLastModifiedDates = readGuideLastModifiedDates();

// The guide list changes whenever one of its guides changes.
const latestGuideDate = [...guideLastModifiedDates.values()].sort().at(-1);
if (latestGuideDate) guideLastModifiedDates.set('/guides/', latestGuideDate);

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR' } },
      // Only pages with a reliable date get a lastmod: a date that changes on
      // every build teaches Google to ignore the field for the whole site.
      // No changefreq either: Google ignores it.
      serialize(item) {
        const lastModified = guideLastModifiedDates.get(new URL(item.url).pathname);
        return lastModified ? { ...item, lastmod: lastModified } : item;
      },
    }),
  ],
});
