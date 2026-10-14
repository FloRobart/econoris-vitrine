# Econoris – site vitrine

Site vitrine d'[Econoris](https://econoris.florobart.fr), l'application gratuite de gestion de budget.
Construit avec [Astro](https://astro.build) : 100 % statique, quasiment sans JavaScript (seul le calculateur en utilise), sans cookie ni traceur.

## Développement

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # génère dist/
npm run preview   # sert dist/ en local
npm run og        # régénère public/og-image.png et l'icône Apple (si le logo ou le slogan change)
```

## Docker

Copier `.env.example` vers `.env` (`SITE_URL`, `APP_PORT`, 26004 par défaut). Le réseau externe `flower-garden-net` doit exister.

```bash
# Production : build Astro puis nginx non-root, conteneur en lecture seule
docker compose up -d --build

# Développement : serveur Astro avec rechargement à chaud, sources montées en volume
npm install        # une fois, sur la machine hôte : le conteneur réutilise ces node_modules
npm run dev-docker # http://localhost:26004
```

Le conteneur de dev tourne avec l'UID/GID 1000 (propriétaire des sources). Si le vôtre est différent, définissez `HOST_UID` et `HOST_GID` dans `.env`.

`SITE_URL` est utilisée **au build** de l'image : changer de domaine impose de reconstruire (`--build`).
La configuration nginx est dans `nginx.conf` (cache, compression, 404) et `nginx/security-headers.conf` (CSP et en-têtes de sécurité).

## Structure

| Chemin | Rôle |
| --- | --- |
| `src/config/site.ts` | **Toute la configuration** : URL de l'app, liens GitHub, stores de l'extension, hébergeur |
| `src/pages/` | Pages (accueil, fonctionnalités, installer, FAQ, guides, à propos, légal) |
| `src/content/guides/*.md` | Guides SEO en Markdown (ajouter un fichier = nouvelle page) |
| `src/data/faq.ts` | FAQ réutilisée sur l'accueil, la page FAQ, le JSON-LD et `llms.txt` |
| `src/lib/schema.ts` | Données structurées schema.org (SoftwareApplication, FAQPage, Article…) |
| `src/lib/llms.ts` | Génère `/llms.txt` et `/llms-full.txt` pour les moteurs IA |
| `src/pages/robots.txt.ts` | `robots.txt` (autorise explicitement les robots IA) |

## Déploiement

L'URL publique du site **doit** être fournie au build (canonical, sitemap, Open Graph) :

```bash
SITE_URL=https://www.mon-domaine.fr npm run build
```

Sans variable, la valeur par défaut de `astro.config.mjs` est utilisée. Le dossier `dist/` se déploie tel quel sur n'importe quel hébergement statique (Nginx, GitHub Pages, Cloudflare Pages, Netlify…).

## SEO : ce qui est en place

- Balises title/description uniques par page, canonical, Open Graph, Twitter Card, `lang="fr"`.
- Sitemap automatique, `robots.txt`, `llms.txt` + `llms-full.txt`.
- JSON-LD : `Organization`, `WebSite`, `SoftwareApplication` (prix 0 €), `FAQPage`, `HowTo`, `Article`, `BreadcrumbList`.
- Contenu éditorial ciblant les recherches budget (« comment gérer son budget », « reste à vivre », « 50/30/20 », « application budget gratuite »…), avec maillage interne vers l'app.
- Réponses rédigées pour être citées telles quelles par les IA (phrase complète, chiffres, « Econoris est… »).
- Performance : HTML statique, police auto-hébergée, images optimisées, CSS minimal.

## SEO : à faire après la mise en ligne

Le code ne suffit pas à apparaître dans les premiers résultats : la réputation externe compte autant.

1. **Google Search Console** : ajouter le domaine, soumettre `sitemap-index.xml`.
2. **Bing Webmaster Tools** : idem. Bing alimente ChatGPT Search et Copilot, c'est prioritaire pour les IA.
3. **Liens entrants** : ajouter le lien du site dans les README GitHub, sur econoris.florobart.fr (page de connexion, `index.html`), sur florobart.github.io.
4. **Annuaires et communautés** : AlternativeTo, Framalibre, Product Hunt, Reddit (r/vosfinances), forums budget. Les IA citent surtout ce qui est mentionné ailleurs.
5. **Stores de l'extension** : une fois publiée, renseigner `SITE.extension.chrome` / `firefox` dans `src/config/site.ts`.
6. **Publier régulièrement** un nouveau guide dans `src/content/guides/` (un fichier Markdown suffit).
