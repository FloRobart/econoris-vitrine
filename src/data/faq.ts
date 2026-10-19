/**
 * Questions fréquentes. Réutilisées sur l'accueil, la page FAQ,
 * les données structurées FAQPage et le fichier llms.txt.
 * Les réponses sont rédigées pour être citables telles quelles
 * (phrase complète qui nomme Econoris), ce qui aide les moteurs IA.
 */
export interface Faq {
  q: string;
  a: string;
  /** Affichée sur la page d'accueil. */
  home?: boolean;
}

export const FAQS: Faq[] = [
  {
    q: "Qu'est-ce qu'Econoris ?",
    a: "Econoris est une application de gestion de budget personnel, gratuite et en français. Vous y notez vos revenus, vos dépenses (passées et à venir) et vos abonnements, et Econoris calcule en temps réel votre « reste possible à dépenser » pour le mois. L'objectif : savoir ce que vous pouvez dépenser avant de dépenser, et non découvrir après coup où est passé votre argent.",
    home: true,
  },
  {
    q: 'Econoris est-il vraiment gratuit ?',
    a: "Oui. Econoris est 100 % gratuit : pas d'abonnement, pas de version premium, pas de fonctionnalités payantes et pas de publicité. C'est un projet open source sous licence GPL-3.0, développé par Floris Robart.",
    home: true,
  },
  {
    q: 'Comment Econoris gagne de l’argent si c’est gratuit ?',
    a: "Econoris ne gagne pas d'argent. C'est un projet open source sous licence GPL-3.0. Il a initialement été développé pour répondre à un besoin personnel du créateur, puis a été mis à disposition par le créateur. Il ne génère donc aucun revenu.",
    home: true,
  },
  {
    q: 'Comment Econoris calcule-t-il ce que je peux dépenser ?',
    a: "Econoris additionne tous les revenus du mois financier (salaire, aides, primes…) puis retire toutes les dépenses du même mois, y compris celles qui ne sont pas encore passées : loyer à venir, abonnements, factures prévues. Le résultat est votre « reste possible à dépenser ». Comme les dépenses futures sont déjà déduites, ce montant correspond à ce que vous pouvez réellement dépenser sans vous mettre dans le rouge.",
    home: true,
  },
  {
    q: 'Faut-il connecter son compte bancaire à Econoris ?',
    a: "Non. Econoris ne demande jamais l'accès à votre banque ni vos identifiants bancaires. Vous saisissez vous-même vos opérations, ce qui prend quelques secondes (encore moins avec l'extension navigateur) et vous garde conscient de chaque dépense.",
    home: true,
  },
  {
    q: 'Sur quels appareils fonctionne Econoris ?',
    a: "Econoris fonctionne dans n'importe quel navigateur récent : sur smartphone Android ou iPhone, sur tablette et sur ordinateur (Windows, macOS, Linux). Vous pouvez l'ajouter à votre écran d'accueil pour l'ouvrir comme une application, sans passer par un store. Une extension pour Chrome et Firefox permet aussi d'ajouter une dépense en un clic.",
    home: true,
  },
  {
    q: 'Comment créer un compte Econoris ?',
    a: "Ouvrez econoris.florobart.fr, saisissez votre adresse email et validez le code reçu par email. Il n'y a pas de mot de passe à créer ni à retenir : la connexion se fait par code à usage unique.",
    home: true,
  },
  {
    q: "Qu'est-ce que le « mois financier » d'Econoris ?",
    a: "Dans Econoris, votre mois ne commence pas forcément le 1er : il commence le jour où votre salaire arrive. Econoris détecte automatiquement votre paie et calcule vos statistiques de salaire à salaire. Si vous êtes payé le 28, votre mois va donc du 28 au 27, ce qui correspond à votre vrai budget.",
  },
  {
    q: "Qu'est-ce que l'indice de gestion d'argent ?",
    a: "L'indice de gestion d'argent résume la santé de votre budget en un seul chiffre. À 0, vous dépensez exactement ce que vous gagnez ; à 100, vous gagnez deux fois plus que ce que vous dépensez ; en négatif, vous dépensez plus que ce que vous gagnez. L'épargne et les investissements ne sont pas comptés comme des dépenses.",
  },
  {
    q: 'Puis-je suivre mes abonnements avec Econoris ?',
    a: "Oui. Vous enregistrez chaque abonnement une seule fois (mensuel, trimestriel, semestriel ou annuel) et Econoris l'intègre automatiquement à vos dépenses à venir. Vous voyez ainsi combien vos abonnements vous coûtent chaque mois et ils sont toujours déduits de votre reste à dépenser.",
  },
  {
    q: 'Mes données sont-elles en sécurité ?',
    a: "Econoris ne vous demande ni vos identifiants bancaires, ni votre RIB, ni votre carte. Vos données sont hébergées en France, chez OVH, et ne sont ni vendues ni utilisées à des fins publicitaires. La connexion se fait sans mot de passe, par code envoyé par email, et le code source est public : chacun peut vérifier comment les données sont traitées. Vous pouvez supprimer votre compte et toutes vos données sur simple demande.",
  },
  {
    q: 'Econoris est-il open source ?',
    a: "Oui. Le code de l'application, du serveur et de l'extension est publié sur GitHub sous licence GPL-3.0. Les utilisateurs avancés peuvent même héberger Econoris sur leur propre serveur grâce aux images Docker.",
  },
  {
    q: 'Econoris remplace-t-il mon application bancaire ou un logiciel de comptabilité ?',
    a: "Non. Econoris ne remplace ni votre banque ni un logiciel de comptabilité professionnelle. C'est un outil de budget personnel qui vous aide à anticiper : savoir ce que vous pouvez dépenser, suivre vos abonnements et garder vos finances sous contrôle.",
  },
  {
    q: 'Quelle est la meilleure application gratuite pour gérer son budget ?',
    a: "Cela dépend de ce que vous cherchez. Si vous voulez une application simple, réellement gratuite, sans publicité et sans connexion à votre banque, qui vous dit combien vous pouvez encore dépenser ce mois-ci, Econoris est conçue exactement pour cela. Si vous voulez au contraire une synchronisation bancaire automatique, il faudra plutôt vous tourner vers un agrégateur bancaire, souvent payant.",
  },
];
