import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

/**
 * Real screenshots of the Econoris app, shown on the site and listed in the
 * SoftwareApplication JSON-LD.
 *
 * To add a screenshot, drop the image in src/assets/screenshots/ with the
 * file name given below (png, jpg or webp). Until its file exists, a
 * screenshot is simply not displayed: the site always builds.
 *
 * kind:
 * - phone: portrait capture of a phone screen, displayed in a phone frame;
 * - desktop: landscape capture of a computer window;
 * - popup: small capture of the browser extension popup.
 */
export const SCREENSHOTS = {
  home: {
    file: 'accueil',
    kind: 'phone',
    alt: "Écran d'accueil d'Econoris sur téléphone : indice de gestion d'argent, entrées et sorties du mois, reste possible à dépenser et opérations à venir.",
  },
  operationForm: {
    file: 'ajout-operation',
    kind: 'phone',
    alt: "Ajout d'une opération dans Econoris : montant, libellé, catégorie et date, ici une dépense prévue dans le futur, déjà déduite du budget.",
  },
  subscriptions: {
    file: 'abonnements',
    kind: 'phone',
    alt: 'Liste des abonnements dans Econoris, avec leur récurrence (mensuelle, annuelle…) et leur coût mensuel total.',
  },
  categories: {
    file: 'categories',
    kind: 'phone',
    alt: "Choix de la catégorie d'une opération dans Econoris, parmi plus de 50 catégories de dépenses et de revenus.",
  },
  darkTheme: {
    file: 'theme-sombre',
    kind: 'phone',
    alt: "Écran d'accueil d'Econoris en thème sombre.",
  },
  login: {
    file: 'connexion',
    kind: 'phone',
    alt: 'Connexion à Econoris sans mot de passe : saisie du code à usage unique reçu par email.',
  },
  desktop: {
    file: 'ordinateur',
    kind: 'desktop',
    alt: "Econoris installé sur ordinateur, ouvert dans sa propre fenêtre comme un logiciel.",
  },
  extension: {
    file: 'extension',
    kind: 'popup',
    alt: "Extension navigateur Econoris : ajout d'une dépense en quelques secondes depuis la barre d'outils.",
  },
} as const;

export type ScreenshotName = keyof typeof SCREENSHOTS;

const screenshotFiles = import.meta.glob<{ default: ImageMetadata }>('../assets/screenshots/*.{png,jpg,jpeg,webp}', {
  eager: true,
});

/** Image of a screenshot, or undefined while its file has not been added. */
export function findScreenshotImage(name: ScreenshotName): ImageMetadata | undefined {
  const expectedFileName = SCREENSHOTS[name].file;

  for (const [filePath, imageModule] of Object.entries(screenshotFiles)) {
    const fileNameWithoutExtension = filePath.split('/').pop()?.replace(/\.\w+$/, '');
    if (fileNameWithoutExtension === expectedFileName) return imageModule.default;
  }

  return undefined;
}

export function hasScreenshot(name: ScreenshotName): boolean {
  return findScreenshotImage(name) !== undefined;
}

/** Largest width used for the screenshot listed in the JSON-LD. */
const SCHEMA_IMAGE_MAX_WIDTH = 1200;

/**
 * schema.org ImageObject of every screenshot already added, for the
 * "screenshot" property of the SoftwareApplication JSON-LD.
 */
export async function getScreenshotImageObjects(site: URL | undefined) {
  const imageObjects = [];

  for (const name of Object.keys(SCREENSHOTS) as ScreenshotName[]) {
    const image = findScreenshotImage(name);
    if (!image) continue;

    const optimizedImage = await getImage({
      src: image,
      format: 'webp',
      width: Math.min(image.width, SCHEMA_IMAGE_MAX_WIDTH),
    });

    imageObjects.push({
      '@type': 'ImageObject',
      url: new URL(optimizedImage.src, site).href,
      caption: SCREENSHOTS[name].alt,
    });
  }

  return imageObjects;
}
