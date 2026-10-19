import { SITE } from '../config/site';

/**
 * Données structurées schema.org (JSON-LD).
 * Elles aident Google (résultats enrichis) et les moteurs IA à comprendre
 * précisément ce qu'est Econoris : une application, gratuite, de finances.
 */

export const abs = (path: string, site: URL | undefined) => new URL(path, site).href;

export function organization(site: URL | undefined) {
  return {
    '@type': 'Organization',
    '@id': abs('/#organization', site),
    name: SITE.name,
    url: abs('/', site),
    logo: abs('/icons/icon-512.png', site),
    email: SITE.author.email,
    founder: person(),
    sameAs: [SITE.appUrl, SITE.github.app, SITE.github.server, SITE.github.extension],
  };
}

export function person() {
  return {
    '@type': 'Person',
    name: SITE.author.name,
    url: SITE.author.url,
  };
}

export function website(site: URL | undefined) {
  return {
    '@type': 'WebSite',
    '@id': abs('/#website', site),
    name: SITE.name,
    url: abs('/', site),
    description: SITE.description,
    inLanguage: 'fr-FR',
    publisher: { '@id': abs('/#organization', site) },
  };
}

/**
 * @param screenshots ImageObject of the real screenshots already added
 *   (see getScreenshotImageObjects); the property is omitted when there is none.
 */
export function softwareApplication(site: URL | undefined, screenshots: Record<string, unknown>[] = []) {
  return {
    '@type': 'SoftwareApplication',
    '@id': abs('/#app', site),
    name: SITE.name,
    alternateName: ['Éconoris', 'Econoris budget'],
    description:
      "Econoris est une application gratuite de gestion de budget personnel. Elle calcule en temps réel le « reste à dépenser » du mois à partir des revenus, des dépenses prévues et des abonnements, pour savoir ce que l'on peut dépenser avant de dépenser.",
    url: SITE.appUrl,
    applicationCategory: 'FinanceApplication',
    applicationSubCategory: 'Gestion de budget personnel',
    operatingSystem: 'Web, Android, iOS, Windows, macOS, Linux',
    browserRequirements: 'Navigateur web récent (Chrome, Firefox, Safari, Edge)',
    inLanguage: 'fr-FR',
    isAccessibleForFree: true,
    ...(SITE.mobile.playStore || SITE.mobile.appStore
      ? { downloadUrl: [SITE.mobile.playStore, SITE.mobile.appStore].filter(Boolean) }
      : {}),
    license: SITE.licenseUrl,
    image: abs('/og-image.png', site),
    ...(screenshots.length > 0 ? { screenshot: screenshots } : {}),
    author: person(),
    publisher: { '@id': abs('/#organization', site) },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/OnlineOnly',
    },
    featureList: [
      'Calcul du reste à dépenser du mois',
      'Mois financier aligné sur la date de paie',
      'Dépenses et revenus à venir',
      'Suivi des abonnements (mensuel, trimestriel, semestriel, annuel)',
      "Indice de gestion d'argent",
      'Plus de 50 catégories de dépenses et revenus',
      'Connexion sans mot de passe par code email',
      'Déconnexion à distance de tous les appareils',
      'Aucune connexion bancaire requise',
      'Thème clair et sombre',
      'Extension navigateur Chrome et Firefox',
      'Code source ouvert (GPL-3.0)',
    ],
  };
}

export function breadcrumbs(site: URL | undefined, items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Accueil', path: '/' }, ...items].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path, site),
    })),
  };
}

export function faqPage(faqs: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
