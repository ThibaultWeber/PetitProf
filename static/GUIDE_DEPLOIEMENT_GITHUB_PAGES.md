# 🚀 Guide de Déploiement sur GitHub Pages

## 📋 **Prérequis**

- Un compte GitHub
- Un dépôt GitHub public (GitHub Pages gratuit nécessite un dépôt public)
- Git installé sur votre machine locale

## 🔧 **Configuration Initiale**

### **1. Préparer le Dépôt Local**

```bash
# Cloner le dépôt (si pas déjà fait)
git clone https://github.com/[username]/[nom-du-depot].git
cd [nom-du-depot]

# Vérifier la branche principale
git branch -a
# Assurez-vous d'être sur main ou master
```

### **2. Vérifier la Configuration**

Assurez-vous que ces fichiers sont présents dans votre projet :
- `.github/workflows/static.yml` (workflow de déploiement)
- `.nojekyll` (désactive Jekyll)
- `index.html` (page d'accueil)

### **3. Pousser les Modifications**

```bash
# Ajouter tous les fichiers
git add .

# Commiter les changements
git commit -m "Configuration GitHub Pages ajoutée"

# Pousser vers GitHub
git push origin main
```

## 🌐 **Configuration GitHub Pages**

### **1. Activer GitHub Pages**

1. Allez sur votre dépôt GitHub
2. Cliquez sur **Settings** (⚙️)
3. Dans le menu de gauche, cliquez sur **Pages**
4. Dans **Source**, sélectionnez **GitHub Actions**

### **2. Vérifier le Déploiement**

1. Allez dans l'onglet **Actions** de votre dépôt
2. Vous devriez voir le workflow "Deploy static site to Pages" en cours
3. Attendez que le déploiement soit terminé (✅)

### **3. Accéder au Site**

Une fois le déploiement terminé, votre site sera accessible à :
```
https://[username].github.io/[nom-du-depot]
```

## 🔄 **Déploiement Automatique**

### **Comment ça Marche**

- **À chaque push** sur la branche `main` ou `master`
- **GitHub Actions** se déclenche automatiquement
- **Le site est déployé** sur GitHub Pages
- **Aucune action manuelle** requise

### **Vérifier le Statut**

1. **Actions** : Voir l'historique des déploiements
2. **Settings > Pages** : Voir l'URL et le statut
3. **Environments** : Voir les déploiements en cours

## 🛠️ **Dépannage**

### **Problème : Site ne se Déploie Pas**

**Vérifications :**
- Le dépôt est-il public ?
- La branche principale est-elle `main` ou `master` ?
- Le workflow GitHub Actions s'est-il exécuté ?

**Solutions :**
```bash
# Vérifier la branche actuelle
git branch

# Si nécessaire, changer de branche
git checkout main

# Pousser les changements
git push origin main
```

### **Problème : Erreur 404**

**Vérifications :**
- Le fichier `index.html` existe-t-il à la racine ?
- Le fichier `.nojekyll` est-il présent ?
- L'URL est-elle correcte ?

### **Problème : Styles CSS Manquants**

**Vérifications :**
- Les chemins CSS sont-ils relatifs ?
- Les fichiers CSS sont-ils dans le dépôt ?
- Pas de chemins absolus ?

## 📁 **Structure Recommandée**

```
votre-depot/
├── .github/
│   └── workflows/
│       └── static.yml
├── css/
├── js/
├── images/
├── index.html
├── .nojekyll
└── README.md
```

## 🔒 **Sécurité**

### **Headers de Sécurité**

Le workflow inclut des headers de sécurité :
- `X-Frame-Options: DENY` (empêche l'embedding)
- `X-Content-Type-Options: nosniff` (sécurité MIME)
- `X-XSS-Protection: 1; mode=block` (protection XSS)

### **Permissions**

Le workflow utilise les permissions minimales nécessaires :
- `contents: read` (lecture du code)
- `pages: write` (écriture sur Pages)
- `id-token: write` (authentification)

## 📱 **Test du Site**

### **Test Local**

```bash
# Démarrer un serveur local
python -m http.server 8000
# ou
npx serve .

# Ouvrir http://localhost:8000
```

### **Test après Déploiement**

1. Vérifier que toutes les pages se chargent
2. Tester la navigation mobile
3. Vérifier les images et CSS
4. Tester la calculatrice graphique

## 🎯 **Avantages de GitHub Pages**

- ✅ **Gratuit** et illimité
- ✅ **Déploiement automatique** depuis Git
- ✅ **HTTPS** automatique
- ✅ **CDN global** pour de meilleures performances
- ✅ **Intégration parfaite** avec GitHub
- ✅ **Pas de configuration serveur** requise

## 🔄 **Migration depuis Render**

Si vous migrez depuis Render :

1. **Garder** les fichiers de configuration Render
2. **Ajouter** la configuration GitHub Pages
3. **Tester** le déploiement GitHub Pages
4. **Désactiver** Render si nécessaire
5. **Mettre à jour** les URLs dans votre documentation

---

**🎉 Votre site est maintenant déployé sur GitHub Pages !**

Pour toute question ou problème, consultez la [documentation officielle GitHub Pages](https://docs.github.com/en/pages).
