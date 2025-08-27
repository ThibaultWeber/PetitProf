# 🚀 Guide de Déploiement - Site Petit Prof

Ce guide vous accompagne dans la mise en ligne de votre site web Petit Prof.

## 📋 Prérequis

- Tous les fichiers du site créés et testés localement
- Un nom de domaine (optionnel mais recommandé)
- Un hébergement web ou une plateforme de déploiement

## 🌐 Options d'Hébergement

### 1. GitHub Pages (Gratuit)

#### Étapes :
1. **Créer un repository GitHub** :
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Site Petit Prof"
   git remote add origin https://github.com/votre-username/petit-prof-site.git
   git push -u origin main
   ```

2. **Activer GitHub Pages** :
   - Aller dans Settings > Pages
   - Source : Deploy from a branch
   - Branch : main
   - Folder : / (root)
   - Cliquer sur Save

3. **URL du site** :
   ```
   https://votre-username.github.io/petit-prof-site
   ```

#### Avantages :
- ✅ Gratuit
- ✅ Intégration Git automatique
- ✅ HTTPS automatique
- ✅ Déploiement automatique

#### Inconvénients :
- ❌ URL avec github.io
- ❌ Fonctionnalités limitées

### 2. Netlify (Gratuit avec limitations)

#### Étapes :
1. **Créer un compte** sur [netlify.com](https://netlify.com)
2. **Connecter votre repository GitHub**
3. **Configurer le déploiement** :
   - Build command : (laisser vide pour site statique)
   - Publish directory : ./
4. **Cliquer sur Deploy site**

#### Avantages :
- ✅ Déploiement automatique
- ✅ HTTPS automatique
- ✅ CDN global
- ✅ Formulaires intégrés

#### Inconvénients :
- ❌ Limitation de bande passante gratuite
- ❌ Fonctionnalités avancées payantes

### 3. Vercel (Gratuit avec limitations)

#### Étapes :
1. **Créer un compte** sur [vercel.com](https://vercel.com)
2. **Importer votre projet GitHub**
3. **Configurer le projet** :
   - Framework Preset : Other
   - Root Directory : ./
4. **Cliquer sur Deploy**

#### Avantages :
- ✅ Performance excellente
- ✅ Déploiement automatique
- ✅ Analytics intégrés
- ✅ Edge functions

#### Inconvénients :
- ❌ Limitation de bande passante gratuite
- ❌ Fonctionnalités avancées payantes

### 4. Hébergement Traditionnel (Payant)

#### Étapes :
1. **Acheter un hébergement** (OVH, Hostinger, etc.)
2. **Configurer le domaine** :
   - Pointer le DNS vers votre hébergeur
   - Attendre la propagation (24-48h)
3. **Uploader les fichiers** via FTP/SFTP
4. **Configurer le serveur web** (Apache/Nginx)

#### Avantages :
- ✅ Contrôle total
- ✅ Support technique
- ✅ Fonctionnalités avancées
- ✅ Base de données possible

#### Inconvénients :
- ❌ Coût mensuel
- ❌ Maintenance requise
- ❌ Configuration technique

## 🔧 Configuration Avant Déploiement

### 1. Vérifier les URLs

Assurez-vous que tous les liens pointent vers les bonnes URLs :

```html
<!-- Dans tous les fichiers HTML -->
<a href="outils-maths.html">Outils Mathématiques</a>
<a href="fiches-methodes.html">Fiches Méthodes</a>
<!-- etc. -->
```

### 2. Optimiser les Images

```bash
# Installer ImageOptim (Mac) ou FileOptimizer (Windows)
# Ou utiliser des outils en ligne :
# - TinyPNG
# - Compressor.io
# - Squoosh.app
```

### 3. Minifier le CSS et JavaScript

```bash
# CSS
npm install -g cssnano
cssnano style.css style.min.css

# JavaScript
npm install -g uglify-js
uglifyjs script.js -o script.min.js
```

### 4. Vérifier la Responsivité

- Tester sur différents appareils
- Vérifier les breakpoints CSS
- Tester la navigation mobile

## 📱 Test Post-Déploiement

### 1. Vérifications Techniques

- [ ] Toutes les pages se chargent
- [ ] Navigation fonctionne
- [ ] Images s'affichent
- [ ] CSS et JavaScript chargent
- [ ] Responsive sur mobile
- [ ] Liens externes fonctionnent

### 2. Vérifications SEO

- [ ] Meta tags présents
- [ ] Sitemap accessible
- [ ] Robots.txt présent
- [ ] Structure HTML valide
- [ ] Images avec alt text
- [ ] URLs propres

### 3. Vérifications Performance

- [ ] PageSpeed Insights
- [ ] GTmetrix
- [ ] WebPageTest
- [ ] Lighthouse

## 🔍 Configuration SEO

### 1. Google Search Console

1. **Ajouter votre propriété** :
   - Aller sur [search.google.com/search-console](https://search.google.com/search-console)
   - Ajouter votre domaine
   - Vérifier la propriété (DNS, fichier HTML, etc.)

2. **Soumettre le sitemap** :
   - Sitemaps > Ajouter un sitemap
   - URL : `https://votre-domaine.com/sitemap.xml`

### 2. Google Analytics

1. **Créer un compte** sur [analytics.google.com](https://analytics.google.com)
2. **Ajouter le code de suivi** dans le `<head>` de toutes les pages :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 3. Meta Tags

Vérifiez que chaque page a ses meta tags :

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Titre de la page - Petit Prof</title>
    <meta name="description" content="Description de la page">
    <meta name="keywords" content="mots-clés, séparés, par, des, virgules">
    <meta name="author" content="Petit Prof">
    
    <!-- Open Graph -->
    <meta property="og:title" content="Titre de la page">
    <meta property="og:description" content="Description de la page">
    <meta property="og:image" content="https://votre-domaine.com/image.jpg">
    <meta property="og:url" content="https://votre-domaine.com/page.html">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Titre de la page">
    <meta name="twitter:description" content="Description de la page">
    <meta name="twitter:image" content="https://votre-domaine.com/image.jpg">
</head>
```

## 🚨 Résolution de Problèmes

### Problème : Pages 404
**Solution** : Vérifier les URLs et la configuration du serveur

### Problème : CSS/JS ne charge pas
**Solution** : Vérifier les chemins relatifs et la structure des dossiers

### Problème : Images cassées
**Solution** : Vérifier les chemins et optimiser les images

### Problème : Site lent
**Solution** : Optimiser les images, minifier CSS/JS, utiliser un CDN

## 📈 Maintenance Post-Déploiement

### 1. Mises à Jour Régulières

- **Contenu** : Ajouter de nouveaux exercices, méthodes
- **Technique** : Mettre à jour les dépendances
- **Sécurité** : Vérifier les vulnérabilités

### 2. Monitoring

- **Uptime** : Surveiller la disponibilité du site
- **Performance** : Vérifier régulièrement les métriques
- **Erreurs** : Surveiller les logs d'erreur

### 3. Sauvegardes

- **Code** : Sauvegarder sur Git
- **Fichiers** : Sauvegarder sur un autre serveur
- **Base de données** : Si applicable

## 🎯 Prochaines Étapes

1. **Déployer le site** selon l'option choisie
2. **Configurer le domaine** (si acheté)
3. **Tester toutes les fonctionnalités**
4. **Configurer Google Analytics et Search Console**
5. **Promouvoir le site** sur les réseaux sociaux
6. **Collecter les retours** des utilisateurs
7. **Itérer et améliorer** selon les besoins

## 📞 Support

En cas de problème ou question :
- **Documentation** : Consulter ce guide et le README
- **Communauté** : Forums de développement web
- **Professionnel** : Développeur web local

---

*Bonne chance pour votre déploiement ! 🚀*
