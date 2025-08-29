#!/bin/bash
# Script de déploiement GitHub Pages
# Usage: ./deploy-github-pages.sh

echo "🚀 Déploiement sur GitHub Pages"
echo "================================"

# Vérification de la configuration
echo "🔍 Vérification de la configuration..."

if [ -f ".nojekyll" ]; then
    echo "✅ Fichier .nojekyll trouvé"
else
    echo "❌ Fichier .nojekyll manquant"
    exit 1
fi

if [ -f ".github/workflows/deploy-pages.yml" ]; then
    echo "✅ Workflow GitHub Actions trouvé"
else
    echo "❌ Workflow GitHub Actions manquant"
    exit 1
fi

if [ -f "index.html" ]; then
    echo "✅ Page d'accueil trouvée"
else
    echo "❌ Page d'accueil manquante"
    exit 1
fi

# Vérification Git
echo "🔧 Vérification Git..."

if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Modifications détectées, ajout au commit..."
    git add .
    read -p "💬 Message de commit (default: 'Configuration GitHub Pages mise à jour'): " commit_message
    if [ -z "$commit_message" ]; then
        commit_message="Configuration GitHub Pages mise à jour"
    fi
    git commit -m "$commit_message"
else
    echo "✅ Aucune modification à commiter"
fi

# Déploiement
echo "📤 Push vers GitHub..."
git push origin main

echo ""
echo "🎉 Déploiement terminé !"
echo "📋 Prochaines étapes :"
echo "1. Allez sur votre dépôt GitHub"
echo "2. Cliquez sur Settings > Pages"
echo "3. Sélectionnez 'GitHub Actions' comme source"
echo "4. Attendez le déploiement (Actions tab)"
echo "5. Votre site sera disponible sur :"
echo "   https://[username].github.io/[repo-name]"
echo ""
