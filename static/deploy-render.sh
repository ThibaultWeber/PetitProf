#!/bin/bash
# Script de déploiement Render
# Usage: ./deploy-render.sh

echo "🚀 Déploiement sur Render"
echo "======================="

# Vérification de la configuration
echo "🔍 Vérification de la configuration..."

if [ -f "_render.yaml" ]; then
    echo "✅ Configuration Render trouvée"
else
    echo "❌ Configuration Render manquante"
    exit 1
fi

if [ -f "render-build.sh" ]; then
    echo "✅ Script de build Render trouvé"
else
    echo "❌ Script de build Render manquant"
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
    read -p "💬 Message de commit (default: 'Configuration Render mise à jour'): " commit_message
    if [ -z "$commit_message" ]; then
        commit_message="Configuration Render mise à jour"
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
echo "1. Allez sur https://render.com"
echo "2. Connectez-vous à votre compte"
echo "3. Vérifiez que le service 'petit-prof-site' est actif"
echo "4. Le déploiement se fera automatiquement"
echo "5. Votre site sera disponible sur :"
echo "   https://petit-prof-site.onrender.com"
echo ""
echo "💡 Le déploiement prend généralement 2-5 minutes"
echo "📊 Surveillez les logs de build dans l'interface Render"


