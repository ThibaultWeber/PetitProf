# 🚀 Guide de Déploiement Render - Site Petit Prof

## 📋 **Prérequis**

- Un compte Render (gratuit sur [render.com](https://render.com))
- Un dépôt GitHub avec votre code
- Git installé sur votre machine

## 🔧 **Configuration Automatique**

Votre projet est **déjà configuré** pour Render ! Les fichiers suivants sont en place :

- ✅ **`_render.yaml`** - Configuration du service
- ✅ **`render-build.sh`** - Script de build et vérification
- ✅ **`_redirects`** - Redirections et routes
- ✅ **Structure des dossiers** - CSS, JS, images organisés

## 🚀 **Déploiement en 3 Étapes**

### **Étape 1 : Vérifier la Configuration**
```bash
# Vérifier que tout est prêt
python verify-render.py
```

### **Étape 2 : Pousser sur GitHub**
```bash
# Ajouter tous les fichiers
git add .

# Commiter les changements
git commit -m "Configuration Render mise à jour"

# Pousser vers GitHub
git push origin main
```

### **Étape 3 : Déployer sur Render**
1. Allez sur [render.com](https://render.com)
2. Connectez-vous à votre compte
3. Cliquez sur **"New +"** → **"Static Site"**
4. Connectez votre dépôt GitHub
5. Render détectera automatiquement la configuration
6. Cliquez sur **"Create Static Site"**

## ⚡ **Déploiement Rapide avec Scripts**

### **Windows (PowerShell)**
```powershell
.\deploy-render.ps1
```

### **Unix/Mac (Bash)**
```bash
./deploy-render.sh
```

## 🌐 **Configuration Automatique Détectée**

Render détectera automatiquement :

- **Type de service :** Static Site
- **Nom :** petit-prof-site
- **Branche :** main
- **Build command :** `./render-build.sh`
- **Publish directory :** `.` (racine)

## 📊 **Suivi du Déploiement**

### **Dans l'Interface Render :**
- **Dashboard** → Voir le statut du service
- **Logs** → Suivre le processus de build
- **Events** → Historique des déploiements

### **Temps Typique :**
- **Build :** 1-2 minutes
- **Déploiement :** 1-2 minutes
- **Total :** 2-4 minutes

## 🔍 **Vérification du Déploiement**

### **URL du Site :**
```
https://petit-prof-site.onrender.com
```

### **Tests à Effectuer :**
1. ✅ **Page d'accueil** se charge
2. ✅ **Navigation** fonctionne
3. ✅ **Images et CSS** s'affichent
4. ✅ **Calculatrice graphique** fonctionne
5. ✅ **Toutes les pages** sont accessibles

## 🛠️ **Dépannage**

### **Problème : Build Échoue**
- Vérifiez les logs dans Render
- Exécutez `python verify-render.py` localement
- Vérifiez que tous les fichiers sont dans le dépôt

### **Problème : Site ne S'affiche Pas**
- Vérifiez que le service est "Live" dans Render
- Attendez 2-3 minutes après le déploiement
- Vérifiez l'URL exacte dans Render

### **Problème : Images/CSS Manquants**
- Vérifiez que les dossiers `css/`, `js/`, `images/` sont présents
- Vérifiez les chemins relatifs dans le code
- Exécutez le script de vérification

## 📱 **Avantages de Render**

- ✅ **Gratuit** pour les sites statiques
- ✅ **Déploiement automatique** depuis GitHub
- ✅ **HTTPS automatique**
- ✅ **CDN global** pour de meilleures performances
- ✅ **Interface simple** et intuitive
- ✅ **Logs détaillés** pour le débogage

## 🔄 **Mise à Jour Continue**

À chaque fois que vous poussez sur GitHub :
1. Render détecte automatiquement les changements
2. Lance un nouveau build
3. Déploie la nouvelle version
4. Votre site est mis à jour en quelques minutes

## 📞 **Support**

- **Documentation Render :** [docs.render.com](https://docs.render.com)
- **Interface Render :** [dashboard.render.com](https://dashboard.render.com)
- **Logs de build :** Disponibles dans l'interface Render

---

**🎉 Votre site Petit Prof est maintenant déployé sur Render !**

Pour toute question, consultez les logs de build dans l'interface Render ou exécutez `python verify-render.py` localement.


