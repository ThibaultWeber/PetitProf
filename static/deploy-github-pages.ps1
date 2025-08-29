# Script de déploiement GitHub Pages
# Usage: .\deploy-github-pages.ps1

Write-Host "🚀 Déploiement sur GitHub Pages" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# Vérification de la configuration
Write-Host "🔍 Vérification de la configuration..." -ForegroundColor Yellow

if (Test-Path ".nojekyll") {
    Write-Host "✅ Fichier .nojekyll trouvé" -ForegroundColor Green
} else {
    Write-Host "❌ Fichier .nojekyll manquant" -ForegroundColor Red
    exit 1
}

if (Test-Path ".github/workflows/deploy-pages.yml") {
    Write-Host "✅ Workflow GitHub Actions trouvé" -ForegroundColor Green
} else {
    Write-Host "❌ Workflow GitHub Actions manquant" -ForegroundColor Red
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
    $commitMessage = Read-Host "💬 Message de commit (default: 'Configuration GitHub Pages mise à jour')"
    if (-not $commitMessage) {
        $commitMessage = "Configuration GitHub Pages mise à jour"
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
Write-Host "1. Allez sur votre dépôt GitHub" -ForegroundColor White
Write-Host "2. Cliquez sur Settings > Pages" -ForegroundColor White
Write-Host "3. Sélectionnez 'GitHub Actions' comme source" -ForegroundColor White
Write-Host "4. Attendez le déploiement (Actions tab)" -ForegroundColor White
Write-Host "5. Votre site sera disponible sur :" -ForegroundColor White
Write-Host "   https://[username].github.io/[repo-name]" -ForegroundColor Cyan
Write-Host ""
