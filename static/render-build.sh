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

echo "🎯 Build terminé avec succès !"
echo "📱 Site prêt pour le déploiement sur Render"
echo "📋 Fichier de test créé: test-build.txt"
