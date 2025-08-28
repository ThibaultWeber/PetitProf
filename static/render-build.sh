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

# Créer un fichier de test pour vérifier les chemins
echo "🔍 Test des chemins des ressources..."

# Test des chemins CSS
if [ -f "css/consolidated.css" ]; then
    echo "✅ CSS principal accessible"
else
    echo "❌ CSS principal inaccessible"
fi

# Test des chemins JS
if [ -f "js/script.js" ]; then
    echo "✅ JS principal accessible"
else
    echo "❌ JS principal inaccessible"
fi

# Test des images
if [ -f "images/hero-maths.avif" ]; then
    echo "✅ Image hero accessible"
else
    echo "❌ Image hero inaccessible"
fi

echo "🎯 Build terminé avec succès !"
echo "📱 Site prêt pour le déploiement sur Render"
