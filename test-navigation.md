# 🧪 Guide de Test - Site Petit Prof

## 📋 Checklist de Test

### 1. Test des Images ✅
- [x] Images SVG créées pour toutes les sections principales
- [x] Images optimisées et libres de droits
- [x] Styles CSS ajoutés pour les images
- [x] Effets de survol (hover) implémentés

### 2. Test de la Page d'Accueil 🏠
- [ ] Vérifier que `index.html` s'ouvre correctement
- [ ] Vérifier que toutes les images s'affichent
- [ ] Tester la navigation fixe en haut
- [ ] Vérifier le menu déroulant "Cours en ligne"
- [ ] Tester les boutons d'action (Cours Particuliers, Vidéos)

### 3. Test de Navigation 📱
- [ ] Tester le menu hamburger sur mobile
- [ ] Vérifier que tous les liens fonctionnent
- [ ] Tester le défilement fluide (smooth scroll)
- [ ] Vérifier la navigation sticky au scroll

### 4. Test des Pages Individuelles 📄
- [ ] `outils-maths.html` - Outils Mathématiques
- [ ] `fiches-methodes.html` - Fiches Méthodes
- [ ] `seconde.html` - Seconde
- [ ] `premiere-es.html` - 1ère ES
- [ ] `terminale-es.html` - Terminale ES
- [ ] `premiere-sti2d.html` - 1ère STI2D
- [ ] `terminale-sti2d.html` - Terminale STI2D
- [ ] `premiere-physique.html` - 1ère Physique-Chimie
- [ ] `terminale-physique.html` - Terminale Physique-Chimie

### 5. Test de Responsivité 📱💻
- [ ] Tester sur desktop (1200px+)
- [ ] Tester sur tablette (768px - 1199px)
- [ ] Tester sur mobile (320px - 767px)
- [ ] Vérifier l'orientation paysage sur mobile

### 6. Test des Fonctionnalités ⚡
- [ ] Formulaire de contact
- [ ] Menu déroulant
- [ ] Animations au scroll
- [ ] Mode sombre/clair (si implémenté)
- [ ] Bouton retour en haut

## 🚀 Comment Tester

### Étape 1: Test des Images
1. Ouvrir `test-images.html` dans le navigateur
2. Vérifier que toutes les images SVG s'affichent
3. Vérifier les dimensions et couleurs

### Étape 2: Test du Site Principal
1. Ouvrir `index.html` dans le navigateur
2. Tester la navigation sur desktop
3. Tester la navigation sur mobile (redimensionner la fenêtre)
4. Vérifier tous les liens du menu

### Étape 3: Test des Pages Individuelles
1. Cliquer sur chaque lien du menu "Cours en ligne"
2. Vérifier que chaque page se charge correctement
3. Tester la navigation entre les pages
4. Vérifier le bouton retour à l'accueil

### Étape 4: Test de Responsivité
1. Utiliser les outils de développement du navigateur
2. Tester différentes tailles d'écran
3. Vérifier que le menu hamburger fonctionne sur mobile
4. Tester l'orientation paysage sur mobile

## 🐛 Problèmes Courants et Solutions

### Images qui ne s'affichent pas
- Vérifier que le dossier `images/` existe
- Vérifier les chemins dans le HTML
- Vérifier que les fichiers SVG sont valides

### Navigation qui ne fonctionne pas
- Vérifier que `script.js` est chargé
- Vérifier la console du navigateur pour les erreurs
- Vérifier que les IDs correspondent dans le HTML et CSS

### Styles qui ne s'appliquent pas
- Vérifier que `style.css` et `responsive.css` sont chargés
- Vérifier la console pour les erreurs CSS
- Vérifier que les classes CSS correspondent

## 📱 Test sur Différents Appareils

### Desktop
- Chrome, Firefox, Safari, Edge
- Résolutions: 1920x1080, 1366x768, 1440x900

### Tablette
- iPad (768x1024)
- Android (800x1280)
- Test en mode portrait et paysage

### Mobile
- iPhone (375x667)
- Android (360x640)
- Test en mode portrait et paysage

## 🎯 Critères de Réussite

Le site est considéré comme fonctionnel si :
- ✅ Toutes les images s'affichent correctement
- ✅ La navigation fonctionne sur tous les appareils
- ✅ Toutes les pages se chargent sans erreur
- ✅ Le design est responsive et adaptatif
- ✅ Les animations et interactions fonctionnent
- ✅ Aucune erreur dans la console du navigateur

## 🔧 Outils de Test Recommandés

- **Chrome DevTools** - Test responsive et debug
- **Firefox Developer Tools** - Test cross-browser
- **Lighthouse** - Audit de performance
- **W3C Validator** - Validation HTML/CSS
- **Mobile-Friendly Test** - Test Google

---

**Note:** Ce guide doit être suivi étape par étape pour garantir un test complet du site.
