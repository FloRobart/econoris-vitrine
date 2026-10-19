/**
 * Configuration centrale du site vitrine.
 *
 * Tout ce qui peut changer (URL, liens des stores, hébergeur…) est ici,
 * pour ne jamais avoir à le chercher dans les pages.
 */
export const SITE = {
  name: 'Econoris',
  /** Titre par défaut, utilisé sur la page d'accueil. */
  title: 'Econoris — Application gratuite de gestion de budget',
  tagline: 'Sachez ce que vous pouvez dépenser, avant de le dépenser.',
  description:
    "Econoris, l'application de budget 100 % gratuite et simple : notez revenus, dépenses prévues et abonnements, et sachez combien vous pouvez dépenser ce mois-ci.",
  lang: 'fr',
  locale: 'fr_FR',
  themeColor: '#FCB82A',

  /** Application web (là où les utilisateurs se connectent). */
  appUrl: 'https://econoris.florobart.fr',

  author: {
    name: 'Floris Robart',
    url: 'https://florobart.fr',
    email: 'florobart.github@gmail.com',
  },

  github: {
    app: 'https://github.com/FloRobart/econoris_app',
    server: 'https://github.com/FloRobart/Econoris_server',
    extension: 'https://github.com/FloRobart/econoris-extension',
  },

  /** Laisser à null tant que l'extension n'est pas publiée sur le store. */
  extension: {
    chrome: 'https://chromewebstore.google.com/detail/gihpedfefdokbgjolodmcfpcjkeclhcc?utm_source=item-share-cb',
    firefox: 'https://addons.mozilla.org/en-US/firefox/addon/econoris/',
    releases: 'https://github.com/FloRobart/econoris-extension/releases',
  },

  /** Laisser à null tant que l'application n'est pas publiée sur le store. */
  mobile: {
    playStore: null as string | null,
    appStore: null as string | null,
  },

  dockerImage: 'florobart/econoris-app-web',
  license: 'GPL-3.0',
  licenseUrl: 'https://www.gnu.org/licenses/gpl-3.0.html',

  /** Obligatoire dans les mentions légales (LCEN, art. 6). À compléter. */
  host: {
    name: 'OVH NET',
    address: '140 Quai du Sartel, 59100 Roubaix, France',
    contact: 'https://www.ovhcloud.com/fr/',
  },
} as const;

export const NAV = [
  { href: '/fonctionnalites/', label: 'Fonctionnalités' },
  { href: '/installer/', label: 'Installer' },
  { href: '/guides/', label: 'Guides budget' },
  { href: '/faq/', label: 'FAQ' },
] as const;
