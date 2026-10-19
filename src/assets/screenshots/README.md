# Captures d'écran de l'application

Déposez ici les captures avec **exactement** ces noms (extension `.png`, `.jpg` ou `.webp`).
Tant qu'un fichier est absent, la capture n'est simplement pas affichée : le site se construit quand même.
Astro les optimise au build (WebP, plusieurs tailles) : fournissez-les en pleine résolution.

La liste, les textes alternatifs et le type de chaque capture sont dans `src/lib/screenshots.ts`.

| Fichier | Capture | Affichée sur |
| --- | --- | --- |
| `accueil` | Téléphone, portrait, thème clair : écran d'accueil complet (indice, statistiques du mois, reste possible à dépenser, opérations à venir) | Accueil (remplace la maquette HTML), Fonctionnalités › Reste à dépenser |
| `ajout-operation` | Téléphone, portrait : formulaire d'ajout d'une opération rempli, avec une date future | Fonctionnalités › Opérations passées et à venir |
| `abonnements` | Téléphone, portrait : liste des abonnements (plusieurs récurrences) avec le coût mensuel total | Fonctionnalités › Abonnements |
| `categories` | Téléphone, portrait : sélecteur de catégories ouvert | Fonctionnalités › Catégories |
| `theme-sombre` | Téléphone, portrait, thème sombre : écran d'accueil | Fonctionnalités › Simple, clair, agréable |
| `connexion` | Téléphone, portrait : écran de saisie du code reçu par email | Installer › Créer son compte |
| `ordinateur` | Ordinateur, paysage : l'app installée, dans sa propre fenêtre (fenêtre seule, pas tout l'écran) | Installer › Ordinateur |
| `extension` | Navigateur : popup de l'extension ouverte, formulaire d'ajout rempli (popup seule, recadrée) | Fonctionnalités › Extension, Installer › Extension |

## Règles communes

- **Compte de démonstration uniquement** : aucune vraie donnée personnelle (email, montants, libellés).
- Données réalistes et cohérentes d'une capture à l'autre (même salaire, mêmes abonnements…).
- Téléphone : résolution native, barre d'état propre (batterie pleine, pas de notifications) ou recadrée.
- Pas de bordure ni de cadre de téléphone : le site ajoute le sien.
