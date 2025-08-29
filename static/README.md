# 📚 Site Petit Prof - Version Frontend Complète

## 🎯 **Description**

Site web pédagogique 100% frontend pour les cours de mathématiques et sciences physiques. Développé pour offrir une expérience utilisateur moderne et responsive sans dépendances backend.

## ✨ **Fonctionnalités Principales**

### 🏠 **Pages du Site**
- **Accueil** : Présentation et navigation principale
- **Cours Particuliers** : Services et tarifs
- **Cours en Ligne** : Ressources pédagogiques par niveau
- **Calculatrice Graphique** : Outil mathématique avancé
- **Chaîne YouTube** : Intégration des vidéos pédagogiques
- **Contact** : Informations et localisation

### 🧮 **Calculatrice Graphique Avancée**
- **Tracé de courbes** en temps réel avec Canvas HTML5
- **Bibliothèques mathématiques** : mathjs, nerdamer, algebrite
- **Analyse mathématique** : dérivée, primitive, zéros, monotonie
- **Interactions avancées** : zoom, déplacement, survol
- **Export PNG** des graphiques
- **100% frontend** - aucun serveur requis

### 📱 **Design et UX**
- **Responsive design** mobile/desktop
- **Navigation intuitive** avec menu hamburger
- **Animations CSS** et transitions fluides
- **Lazy loading** des images
- **Accessibilité** optimisée

## 🚀 **Technologies Utilisées**

### **Frontend**
- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes et animations
- **JavaScript ES6+** : Interactivité et logique
- **Canvas HTML5** : Rendu graphique

### **Bibliothèques Mathématiques**
- **MathJS** : Calculs mathématiques
- **Nerdamer** : Algèbre et calcul différentiel
- **Algebrite** : Manipulation d'expressions

### **Outils de Développement**
- **Git** : Versioning
- **GitHub** : Hébergement du code source
- **Render** : Déploiement et hébergement du site

## 📁 **Structure du Projet**

```
PetitProf/
├── 📄 HTML Files (21 pages)
├── 🎨 CSS/
│   ├── consolidated.css
│   ├── calculatrice-graphique.css
│   └── [autres styles spécifiques]
├── ⚡ JavaScript/
│   ├── script.js (fonctionnalités générales)
│   ├── mobile-nav.js (navigation mobile)
│   └── calculatrice-graphique.js (calculatrice)
├── 🖼️ Images/ (40+ ressources)
├── 📚 Documents/ (132 PDFs)
├── 📊 Graph/ (graphiques)
└── 🔧 Configuration/
    ├── render.yaml (configuration Render)
    ├── _redirects (redirections)
    ├── package.json (métadonnées)
    └── .gitignore
```

## 🌐 **Déploiement**

### **Render (Recommandé)**
Le site est configuré pour être déployé sur Render, une plateforme moderne et fiable.

**URL de déploiement :** `https://petit-prof-site.onrender.com`

**Configuration Render** :
- Fichier `_render.yaml` configuré pour le déploiement statique
- Script de build `render-build.sh` pour la vérification
- Redirections configurées dans `_redirects`
- Déploiement automatique depuis GitHub

**Étapes de déploiement** :
1. Connectez-vous sur [render.com](https://render.com)
2. Créez un nouveau "Static Site"
3. Connectez votre dépôt GitHub
4. Render détectera automatiquement la configuration
5. Le site sera déployé en quelques minutes

**Configuration Render** :
- Fichier `render.yaml` configuré pour le déploiement statique
- Redirections configurées dans `_redirects`

### **Déploiement Local**
1. Clonez le dépôt : `git clone https://github.com/ThibaultWeber/PetitProf.git`
2. Ouvrez `index.html` dans votre navigateur
3. Ou utilisez un serveur local : `python -m http.server 8000`

## 🔧 **Installation et Utilisation**

### **Prérequis**
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Aucune installation de serveur requise

### **Utilisation de la Calculatrice**
1. Accédez à la page "Calculatrice Graphique"
2. Entrez votre fonction (ex: `x^3-3*x+1`)
3. Cliquez sur "TRACER"
4. Utilisez la molette pour zoomer
5. Cliquez et glissez pour déplacer la vue
6. Survolez la courbe pour voir les coordonnées

## 📚 **Niveaux de Cours Disponibles**

- **Seconde** : Découverte des sciences physiques
- **1ère ES** : Mathématiques appliquées
- **1ère Physique-Chimie** : Spécialité scientifique
- **1ère STI2D** : Sciences et technologies
- **Terminale ES** : Mathématiques avancées
- **Terminale Physique-Chimie** : Spécialité approfondie
- **Terminale STI2D** : Applications technologiques
- **CAPES** : Préparation concours enseignement
- **Classe Préparatoire** : Ressources CPGE

## 🤝 **Contribution**

Ce projet est ouvert aux contributions ! Pour contribuer :

1. Forkez le dépôt
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Créez une Pull Request

## 📄 **Licence**

Ce projet est sous licence libre. Tous les contenus pédagogiques sont la propriété de Petit Prof.

## 👨‍🏫 **Auteur**

**Petit Prof** - Professeur certifié en Physique-Chimie et Mathématiques
- 📧 Email : t.weber.ac@gmail.com
- 📱 Téléphone : 07 45 10 66 71
- 📍 Localisation : Strasbourg et visio
- 🎥 YouTube : [@PetitProf67](https://www.youtube.com/@PetitProf67)

## 🆕 **Changelog**

### **Version Frontend Finale (2025)**
- ✅ Conversion complète en frontend
- ✅ Calculatrice graphique avancée
- ✅ Suppression des dépendances Python
- ✅ Configuration Render pour déploiement
- ✅ Redirections et routes optimisées

---

**🌟 Merci d'utiliser le site Petit Prof !**
