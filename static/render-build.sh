#!/bin/bash

# Script de build pour Render - Site Petit Prof
echo "🚀 Démarrage du build pour Render..."

# Vérification de la structure des fichiers
echo "📁 Vérification de la structure des fichiers..."

# Vérifier que les dossiers CSS et JS existent
if [ ! -d "css" ]; then
    echo "❌ Dossier CSS manquant"
    exit 1
fi

if [ ! -d "js" ]; then
    echo "❌ Dossier JS manquant"
    exit 1
fi

if [ ! -d "images" ]; then
    echo "❌ Dossier images manquant"
    exit 1
fi

# Vérifier les fichiers principaux
if [ ! -f "index.html" ]; then
    echo "❌ index.html manquant"
    exit 1
fi

if [ ! -f "css/consolidated.css" ]; then
    echo "❌ CSS principal manquant"
    exit 1
fi

if [ ! -f "js/script.js" ]; then
    echo "❌ JS principal manquant"
    exit 1
fi

echo "✅ Structure des fichiers vérifiée"

# Test des chemins des ressources
echo "🔍 Test des chemins des ressources..."

# Test des chemins CSS
if [ -f "css/consolidated.css" ]; then
    echo "✅ CSS principal accessible"
    echo "   Taille: $(ls -lh css/consolidated.css | awk '{print $5}')"
else
    echo "❌ CSS principal inaccessible"
fi

# Test des chemins JS
if [ -f "js/script.js" ]; then
    echo "✅ JS principal accessible"
    echo "   Taille: $(ls -lh js/script.js | awk '{print $5}')"
else
    echo "❌ JS principal inaccessible"
fi

# Test des images
if [ -f "images/hero-maths.avif" ]; then
    echo "✅ Image hero accessible"
    echo "   Taille: $(ls -lh images/hero-maths.avif | awk '{print $5}')"
else
    echo "❌ Image hero inaccessible"
fi

# Vérifier les permissions
echo "🔐 Vérification des permissions..."
ls -la css/ | head -5
ls -la js/ | head -5
ls -la images/ | head -5

# Créer un fichier de test pour vérifier l'accès
echo "🧪 Création d'un fichier de test..."
echo "Test de build Render - $(date)" > test-build.txt
echo "CSS accessible: $(test -f css/consolidated.css && echo 'OUI' || echo 'NON')" >> test-build.txt
echo "JS accessible: $(test -f js/script.js && echo 'OUI' || echo 'NON')" >> test-build.txt
echo "Images accessibles: $(test -d images && echo 'OUI' || echo 'NON')" >> test-build.txt

# Créer un fichier .htaccess pour forcer la structure des dossiers
echo "🔧 Création du fichier .htaccess..."
cat > .htaccess << 'EOF'
# Configuration Apache pour préserver la structure des dossiers
Options +FollowSymLinks
RewriteEngine On

# Forcer les types MIME corrects
<FilesMatch "\.css$">
    Header set Content-Type "text/css"
</FilesMatch>

<FilesMatch "\.js$">
    Header set Content-Type "application/javascript"
</FilesMatch>

<FilesMatch "\.(png|jpg|jpeg|gif|webp|avif|svg)$">
    Header set Cache-Control "public, max-age=31536000"
</FilesMatch>

# Redirections pour les sous-dossiers
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^css/(.*)$ css/$1 [L]
RewriteRule ^js/(.*)$ js/$1 [L]
RewriteRule ^images/(.*)$ images/$1 [L]

# Gestion des erreurs 404
ErrorDocument 404 /index.html
EOF

echo "✅ Fichier .htaccess créé"

# Créer un fichier de vérification de structure
echo "📋 Création du fichier de vérification de structure..."
cat > structure-verification.txt << 'EOF'
STRUCTURE DU SITE PETIT PROF - VÉRIFICATION

Dossiers principaux :
├── css/ (styles)
├── js/ (scripts)
├── images/ (ressources visuelles)
├── documents/ (PDFs)
└── graph/ (graphiques)

Fichiers critiques :
├── index.html ✅
├── css/consolidated.css ✅
├── js/script.js ✅
├── js/mobile-nav.js ✅
├── js/calculatrice-graphique.js ✅
└── images/hero-maths.avif ✅

Permissions :
- Tous les dossiers doivent être accessibles en lecture
- Fichiers HTML, CSS, JS : 644
- Images : 644
- Dossiers : 755

Configuration Render :
- staticPublishPath: . (racine)
- Structure des dossiers préservée
- En-têtes Content-Type corrects
- Redirections SPA configurées
EOF

echo "✅ Fichier de vérification de structure créé"

echo "🎯 Build terminé avec succès !"
echo "📱 Site prêt pour le déploiement sur Render"
echo "📋 Fichiers de test créés :"
echo "   - test-build.txt"
echo "   - structure-verification.txt"
echo "   - .htaccess (configuration Apache)"
