#!/usr/bin/env python3
"""
Script de vérification pour la configuration GitHub Pages
Vérifie que tous les fichiers nécessaires sont présents et corrects
"""

import os
import sys
from pathlib import Path

def check_file_exists(file_path, description):
    """Vérifie qu'un fichier existe et affiche le statut"""
    exists = os.path.exists(file_path)
    status = "✅" if exists else "❌"
    print(f"{status} {description}: {file_path}")
    return exists

def check_directory_structure():
    """Vérifie la structure des dossiers"""
    print("🔍 Vérification de la structure du projet...")
    print("=" * 50)
    
    required_files = [
        ("index.html", "Page d'accueil"),
        (".nojekyll", "Fichier de désactivation Jekyll"),
        (".github/workflows/static.yml", "Workflow GitHub Actions"),
        ("css/consolidated.css", "CSS principal"),
        ("js/script.js", "JavaScript principal"),
        ("nav.html", "Navigation"),
        ("footer.html", "Pied de page")
    ]
    
    all_good = True
    for file_path, description in required_files:
        if not check_file_exists(file_path, description):
            all_good = False
    
    return all_good

def check_github_config():
    """Vérifie la configuration GitHub"""
    print("\n🔧 Vérification de la configuration GitHub...")
    print("=" * 50)
    
    # Vérifier le .gitignore
    gitignore_exists = check_file_exists(".gitignore", "Fichier .gitignore")
    
    # Vérifier package.json
    package_exists = check_file_exists("package.json", "Package.json")
    
    return gitignore_exists and package_exists

def check_html_files():
    """Vérifie les fichiers HTML principaux"""
    print("\n📄 Vérification des pages HTML...")
    print("=" * 50)
    
    html_files = [
        "calculatrice-graphique.html",
        "cours-en-ligne-page.html",
        "cours-particuliers-page.html",
        "contact-page.html",
        "youtube-page.html"
    ]
    
    all_good = True
    for html_file in html_files:
        if not check_file_exists(html_file, f"Page {html_file}"):
            all_good = False
    
    return all_good

def check_images():
    """Vérifie la présence des images importantes"""
    print("\n🖼️ Vérification des images...")
    print("=" * 50)
    
    image_files = [
        "images/hero-maths.avif",
        "images/contact.avif",
        "images/cours-en-ligne.avif"
    ]
    
    all_good = True
    for image_file in image_files:
        if not check_file_exists(image_file, f"Image {image_file}"):
            all_good = False
    
    return all_good

def generate_deployment_instructions():
    """Génère les instructions de déploiement"""
    print("\n📋 Instructions de déploiement GitHub Pages")
    print("=" * 50)
    
    instructions = """
1. Assurez-vous que votre dépôt GitHub est PUBLIC
2. Poussez ces modifications sur GitHub :
   git add .
   git commit -m "Configuration GitHub Pages ajoutée"
   git push origin main

3. Sur GitHub, allez dans Settings > Pages
4. Sélectionnez "GitHub Actions" comme source
5. Le site sera déployé automatiquement

URL du site : https://[username].github.io/[nom-du-depot]
"""
    print(instructions)

def main():
    """Fonction principale"""
    print("🚀 Vérification de la configuration GitHub Pages")
    print("=" * 60)
    
    # Vérifications
    structure_ok = check_directory_structure()
    github_ok = check_github_config()
    html_ok = check_html_files()
    images_ok = check_images()
    
    # Résumé
    print("\n📊 Résumé des vérifications")
    print("=" * 50)
    
    all_checks = [structure_ok, github_ok, html_ok, images_ok]
    passed = sum(all_checks)
    total = len(all_checks)
    
    print(f"✅ Vérifications réussies : {passed}/{total}")
    
    if passed == total:
        print("\n🎉 Toutes les vérifications sont passées !")
        print("Votre projet est prêt pour le déploiement GitHub Pages.")
        generate_deployment_instructions()
    else:
        print("\n⚠️ Certaines vérifications ont échoué.")
        print("Veuillez corriger les problèmes avant de déployer.")
        sys.exit(1)

if __name__ == "__main__":
    main()
