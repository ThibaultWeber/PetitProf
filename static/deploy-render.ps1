# Script de déploiement Render
# Usage: .\deploy-render.ps1

Write-Host "🚀 Déploiement sur Render" -ForegroundColor Green
Write-Host "=======================" -ForegroundColor Green

# Vérification de la configuration
Write-Host "🔍 Vérification de la configuration..." -ForegroundColor Yellow

if (Test-Path "_render.yaml") {
    Write-Host "✅ Configuration Render trouvée" -ForegroundColor Green
} else {
    Write-Host "❌ Configuration Render manquante" -ForegroundColor Red
    exit 1
}

if (Test-Path "render-build.sh") {
    Write-Host "✅ Script de build Render trouvé" -ForegroundColor Green
} else {
    Write-Host "❌ Script de build Render manquant" -ForegroundColor Red
    exit 1
}

if (Test-Path "index.html") {
    Write-Host "✅ Page d'accueil trouvée" -ForegroundColor Green
} else {
    Write-Host "❌ Page d'accueil manquante" -ForegroundColor Red
    exit 1
}

# Vérification Git
Write-Host "🔧 Vérification Git..." -ForegroundColor Yellow

$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "📝 Modifications détectées, ajout au commit..." -ForegroundColor Yellow
    git add .
    $commitMessage = Read-Host "💬 Message de commit (default: 'Configuration Render mise à jour')"
    if (-not $commitMessage) {
        $commitMessage = "Configuration Render mise à jour"
    }
    git commit -m $commitMessage
} else {
    Write-Host "✅ Aucune modification à commiter" -ForegroundColor Green
}

# Déploiement
Write-Host "📤 Push vers GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "🎉 Déploiement terminé !" -ForegroundColor Green
Write-Host "📋 Prochaines étapes :" -ForegroundColor Yellow
Write-Host "1. Allez sur [render.com](https://render.com)" -ForegroundColor White
Write-Host "2. Connectez-vous à votre compte" -ForegroundColor White
Write-Host "3. Vérifiez que le service 'petit-prof-site' est actif" -ForegroundColor White
Write-Host "4. Le déploiement se fera automatiquement" -ForegroundColor White
Write-Host "5. Votre site sera disponible sur :" -ForegroundColor White
Write-Host "   https://petit-prof-site.onrender.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Le déploiement prend généralement 2-5 minutes" -ForegroundColor Yellow
Write-Host "📊 Surveillez les logs de build dans l'interface Render" -ForegroundColor Yellow


