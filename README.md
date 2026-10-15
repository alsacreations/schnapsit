# Schnapsum

**Générateur de Lorem Ipsum, avec une touche alsacienne !**

_Yeuh, t'en as marre de tous ces knèkes et de leurs Lorem Ipsum en latin, gal ? Alors profite du Schnapsum en alsacien, le langage moderne et tendance pour créer tes faux textes et remplir tes pages de contenu. Hopla !_

Schnapsum est un outil en ligne qui te propose le _Schnapsum®_, un générateur de faux-texte (Lorem Ipsum) en alsacien : https://schnapsum.alsacreations.com/

## Fonctionnalités

- **Quantité** : en paragraphes ou en mots.
- **Dose d’alsacien** : de « Un doigt » (surtout du latin) à « Cul sec » (100 % alsacien).
- **Options** : commencer par « Lorem Elsass ipsum », ajouter un intertitre et une liste.
- **Copie** en texte brut ou en HTML, **lecture à voix haute** (synthèse vocale du navigateur).
- **Thème clair / sombre**, mémorisé.

## Développement

HTML, CSS et JavaScript natifs, sans dépendance ni étape de build. Ouvrir `index.html` avec Live Server (port 5501, voir `.vscode/settings.json`).

```
index.html
assets/
  css/
    app.css            point d’entrée : @layer config, base, components, utilities
    reset.css          (layer config)
    theme.css          @font-face, primitives et tokens sémantiques en light-dark()
    styles.css         (layer base)
    utilities.css
    components/        un fichier par composant, isolé avec @scope
  js/global.js         générateur, copie, lecture à voix haute, thème
  fonts/               Chelsea Market (woff2, auto-hébergée, via Fontsource)
```

Le code suit les [guidelines Kiwipedia](https://kiwipedia.fr) d’Alsacréations (HTML, CSS, accessibilité).

## Yeuh, mais c'est quoi le secret ?

Schnapsum est réalisé par l'agence web [Alsacréations](https://www.alsacreations.fr) grâce à l'algorithme savant _Schnapsum®_, le lorem ipsum alsacien.

Alsacréations, Générateur de faux textes since 1664

## En savoir plus

Schnapsum fait partie d'un écosystème d'outils et bonnes pratiques CSS, les ressources suivantes vous seront fort utiles :

- [Guidelines CSS d'Alsacréations](https://kiwipedia.fr),
- [Reset d'Alsacréations](https://reset.alsacreations.com),
- [Bretzel (Layouts d'Alsacréations)](https://bretzel.alsacreations.com),
- [KNACSS (Natives d'Alsacréations)](https://knacss.alsacreations.com),
- [Schnapsum (Lorem Ipsum alsacien)](https://schnapsum.alsacreations.com)
