#!/usr/bin/env python3
"""
Script de vérification pour la configuration Render
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

def check_render_config():
    """Vérifie la configuration Render"""
    print("🔍 Vérification de la configuration Render...")
    print("=" * 50)
    
    required_files = [
        ("_render.yaml", "Configuration Render"),
        ("render-build.sh", "Script de build Render"),
        ("_redirects", "Fichier de redirections"),
        ("index.html", "Page d'accueil"),
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

def check_directory_structure():
    """Vérifie la structure des dossiers"""
    print("\n📁 Vérification de la structure des dossiers...")
    print("=" * 50)
    
    required_dirs = [
        ("css", "Dossier CSS"),
        ("js", "Dossier JavaScript"),
        ("images", "Dossier Images"),
        ("documents", "Dossier Documents")
    ]
    
    all_good = True
    for dir_path, description in required_dirs:
        if os.path.isdir(dir_path):
            print(f"✅ {description}: {dir_path}")
            # Compter les fichiers dans le dossier
            file_count = len([f for f in os.listdir(dir_path) if os.path.isfile(os.path.join(dir_path, f))])
            print(f"   📄 {file_count} fichiers trouvés")
        else:
            print(f"❌ {description}: {dir_path}")
            all_good = False
    
    return all_good

def check_html_files():
    """Vérifie les fichiers HTML principaux"""
    print("\n📄 Vérification des pages HTML...")
    print("=" * 50)
    
    html_files = [
        "calculatrice-graphique.html",
        "cours-en-ligne-page.html",
        "cours-particuliers-page.html",
        "contact-page.html",
        "youtube-page.html",
        "seconde.html",
        "premiere-es.html",
        "premiere-physique.html",
        "premiere-sti2d.html",
        "terminale-es.html",
        "terminale-physique.html",
        "terminale-sti2d.html"
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
        "images/cours-en-ligne.avif",
        "images/enseignant.webp",
        "images/equations.webp"
    ]
    
    all_good = True
    for image_file in image_files:
        if not check_file_exists(image_file, f"Image {image_file}"):
            all_good = False
    
    return all_good

def check_render_yaml():
    """Vérifie la configuration Render YAML"""
    print("\n🔧 Vérification du fichier _render.yaml...")
    print("=" * 50)
    
    if not os.path.exists("_render.yaml"):
        print("❌ Fichier _render.yaml manquant")
        return False
    
    try:
        with open("_render.yaml", 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Vérifications basiques
        checks = [
            ("type: web", "Type de service"),
            ("name: petit-prof-site", "Nom du service"),
            ("env: static", "Environnement statique"),
            ("staticPublishPath: .", "Chemin de publication"),
            ("buildCommand:", "Commande de build"),
            ("startCommand:", "Commande de démarrage")
        ]
        
        all_good = True
        for check_text, description in checks:
            if check_text in content:
                print(f"✅ {description}: {check_text}")
            else:
                print(f"❌ {description}: {check_text}")
                all_good = False
        
        return all_good
        
    except Exception as e:
        print(f"❌ Erreur lors de la lecture du fichier: {e}")
        return False

def generate_deployment_instructions():
    """Génère les instructions de déploiement Render"""
    print("\n📋 Instructions de déploiement Render")
    print("=" * 50)
    
    instructions = """
1. Assurez-vous que votre dépôt GitHub est connecté à Render
2. Poussez ces modifications sur GitHub :
   git add .
   git commit -m "Configuration Render mise à jour"
   git push origin main

3. Sur Render, vérifiez que le service est configuré en "Static Site"
4. Le déploiement se fera automatiquement après le push
5. Vérifiez les logs de build dans l'interface Render

URL du site : https://petit-prof-site.onrender.com
"""
    print(instructions)

def main():
    """Fonction principale"""
    print("🚀 Vérification de la configuration Render")
    print("=" * 60)
    
    # Vérifications
    render_ok = check_render_config()
    structure_ok = check_directory_structure()
    html_ok = check_html_files()
    images_ok = check_images()
    yaml_ok = check_render_yaml()
    
    # Résumé
    print("\n📊 Résumé des vérifications")
    print("=" * 50)
    
    all_checks = [render_ok, structure_ok, html_ok, images_ok, yaml_ok]
    passed = sum(all_checks)
    total = len(all_checks)
    
    print(f"✅ Vérifications réussies : {passed}/{total}")
    
    if passed == total:
        print("\n🎉 Toutes les vérifications sont passées !")
        print("Votre projet est prêt pour le déploiement Render.")
        generate_deployment_instructions()
    else:
        print("\n⚠️ Certaines vérifications ont échoué.")
        print("Veuillez corriger les problèmes avant de déployer.")
        sys.exit(1)

if __name__ == "__main__":
    main()
