#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de déploiement automatisé pour GitHub et Render
Guide l'utilisateur à travers toutes les étapes du déploiement
"""

import os
import subprocess
import sys
from pathlib import Path

def print_header(title):
    """Afficher un en-tête stylisé"""
    print("\n" + "=" * 80)
    print(f"🚀 {title}")
    print("=" * 80)

def print_step(step_num, title):
    """Afficher une étape numérotée"""
    print(f"\n📋 Étape {step_num} : {title}")
    print("-" * 60)

def check_file_exists(filename, description):
    """Vérifier qu'un fichier existe"""
    if Path(filename).exists():
        print(f"  ✅ {filename} - {description}")
        return True
    else:
        print(f"  ❌ {filename} - {description} (MANQUANT)")
        return False

def run_command(command, description):
    """Exécuter une commande et afficher le résultat"""
    print(f"\n🔧 {description}")
    print(f"Commande : {command}")
    
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            print("  ✅ Commande exécutée avec succès")
            if result.stdout:
                print(f"  📤 Sortie : {result.stdout.strip()}")
        else:
            print(f"  ❌ Erreur lors de l'exécution")
            if result.stderr:
                print(f"  📤 Erreur : {result.stderr.strip()}")
        return result.returncode == 0
    except Exception as e:
        print(f"  ❌ Erreur : {e}")
        return False

def check_git_status():
    """Vérifier le statut Git"""
    print_step(1, "Vérification de Git")
    
    # Vérifier si Git est installé
    if not run_command("git --version", "Vérifier la version de Git"):
        print("\n❌ Git n'est pas installé ou accessible")
        print("📥 Installez Git depuis : https://git-scm.com/")
        return False
    
    # Vérifier si c'est un repository Git
    if Path(".git").exists():
        print("  ✅ Dossier Git détecté")
        
        # Vérifier le statut
        run_command("git status", "Vérifier le statut Git")
        
        # Vérifier les remotes
        run_command("git remote -v", "Vérifier les remotes configurés")
    else:
        print("  ⚠️ Pas de repository Git détecté")
        print("  📝 Initialisation nécessaire")
    
    return True

def check_project_files():
    """Vérifier que tous les fichiers nécessaires sont présents"""
    print_step(2, "Vérification des Fichiers du Projet")
    
    required_files = [
        ("app.py", "Application Flask principale"),
        ("courbe.py", "Module de tracé de courbes"),
        ("requirements.txt", "Dépendances Python"),
        ("Procfile", "Configuration Render"),
        ("runtime.txt", "Version Python"),
        (".gitignore", "Fichiers à ignorer"),
        ("README.md", "Documentation du projet"),
        ("static/", "Dossier des fichiers statiques")
    ]
    
    all_files_present = True
    for filename, description in required_files:
        if not check_file_exists(filename, description):
            all_files_present = False
    
    if all_files_present:
        print("\n✅ Tous les fichiers requis sont présents !")
    else:
        print("\n❌ Certains fichiers requis sont manquants")
        print("📝 Vérifiez que tous les fichiers sont bien présents")
    
    return all_files_present

def setup_git_repository():
    """Configurer le repository Git"""
    print_step(3, "Configuration du Repository Git")
    
    # Vérifier si Git est déjà initialisé
    if Path(".git").exists():
        print("  ℹ️ Repository Git déjà initialisé")
        choice = input("  🔄 Voulez-vous le réinitialiser ? (o/n) : ").lower()
        if choice == 'o':
            print("  🗑️ Suppression du repository Git existant...")
            import shutil
            shutil.rmtree(".git")
            print("  ✅ Repository Git supprimé")
        else:
            print("  ℹ️ Utilisation du repository Git existant")
            return True
    
    # Initialiser Git
    if not run_command("git init", "Initialiser le repository Git"):
        return False
    
    # Ajouter tous les fichiers
    if not run_command("git add .", "Ajouter tous les fichiers au staging"):
        return False
    
    # Premier commit
    if not run_command('git commit -m "🚀 Initial commit - Site Petit Prof ultra-optimisé"', "Créer le premier commit"):
        return False
    
    print("\n✅ Repository Git configuré avec succès !")
    return True

def configure_github_remote():
    """Configurer le remote GitHub"""
    print_step(4, "Configuration du Remote GitHub")
    
    print("📝 Pour continuer, vous devez :")
    print("1. Créer un repository sur GitHub")
    print("2. Me donner l'URL du repository")
    
    github_url = input("\n🔗 URL du repository GitHub (ex: https://github.com/username/site-petit-prof.git) : ").strip()
    
    if not github_url:
        print("❌ URL GitHub requise pour continuer")
        return False
    
    # Ajouter le remote
    if not run_command(f'git remote add origin "{github_url}"', "Ajouter le remote GitHub"):
        return False
    
    # Pousser vers GitHub
    if not run_command("git branch -M main", "Renommer la branche en main"):
        return False
    
    if not run_command("git push -u origin main", "Pousser vers GitHub"):
        print("\n⚠️ Erreur lors du push vers GitHub")
        print("📝 Vérifiez que :")
        print("  - L'URL GitHub est correcte")
        print("  - Vous avez les permissions d'écriture")
        print("  - Le repository existe sur GitHub")
        return False
    
    print("\n✅ Repository GitHub configuré avec succès !")
    return True

def render_deployment_guide():
    """Afficher le guide de déploiement Render"""
    print_step(5, "Guide de Déploiement Render")
    
    print("🌐 Maintenant, déployez votre site sur Render :")
    print("\n📋 Étapes à suivre :")
    print("1. 🌍 Allez sur https://render.com")
    print("2. 👤 Créez un compte (recommandé avec GitHub)")
    print("3. ➕ Cliquez sur 'New +' → 'Web Service'")
    print("4. 🔗 Connectez votre repository GitHub")
    print("5. ⚙️ Configurez le service :")
    print("   - Name: site-petit-prof")
    print("   - Environment: Python 3")
    print("   - Build Command: pip install -r requirements.txt")
    print("   - Start Command: gunicorn app:app")
    print("6. 🚀 Cliquez sur 'Create Web Service'")
    
    print("\n⏱️ Le déploiement prendra 2-5 minutes")
    print("🔗 Votre site sera accessible sur : https://votre-app.onrender.com")
    
    input("\n⏸️ Appuyez sur Entrée quand le déploiement Render est terminé...")

def test_deployment():
    """Tester le déploiement"""
    print_step(6, "Test du Déploiement")
    
    print("🧪 Testez votre site déployé :")
    print("\n📱 Tests à effectuer :")
    print("1. 🌐 Accédez à l'URL de votre site")
    print("2. 📄 Vérifiez que toutes les pages se chargent")
    print("3. 🖼️ Vérifiez que les images s'affichent")
    print("4. 📱 Testez le responsive design sur mobile")
    print("5. 🧮 Testez la calculatrice graphique")
    print("6. 📥 Testez le téléchargement des PDFs")
    
    print("\n📊 Tests de performance :")
    print("- Google PageSpeed Insights")
    print("- GTmetrix")
    print("- WebPageTest")
    
    input("\n⏸️ Appuyez sur Entrée quand les tests sont terminés...")

def final_instructions():
    """Instructions finales"""
    print_step(7, "Instructions Finales")
    
    print("🎉 Félicitations ! Votre site est maintenant en ligne !")
    
    print("\n📋 Prochaines étapes :")
    print("1. 🔄 Mettre à jour le site :")
    print("   git add .")
    print("   git commit -m '📝 Mise à jour'")
    print("   git push origin main")
    print("2. 📊 Monitorer les performances")
    print("3. 🌍 Partager l'URL avec vos utilisateurs")
    print("4. 📈 Améliorer en continu")
    
    print("\n🛠️ Maintenance :")
    print("- Render redéploie automatiquement")
    print("- Logs disponibles dans le dashboard Render")
    print("- Variables d'environnement configurables")
    
    print("\n📞 Support :")
    print("- GitHub Issues pour les bugs")
    print("- Documentation Render : docs.render.com")
    print("- Communauté Flask et Python")

def main():
    """Fonction principale"""
    print_header("DÉPLOIEMENT AUTOMATISÉ - SITE PETIT PROF")
    
    print("🎯 Ce script vous guide à travers le déploiement de votre site")
    print("📋 Assurez-vous d'avoir créé un repository GitHub avant de commencer")
    
    input("\n⏸️ Appuyez sur Entrée pour commencer...")
    
    # Vérifications préliminaires
    if not check_git_status():
        return
    
    if not check_project_files():
        return
    
    # Configuration Git
    if not setup_git_repository():
        return
    
    if not configure_github_remote():
        return
    
    # Guide Render
    render_deployment_guide()
    
    # Tests
    test_deployment()
    
    # Instructions finales
    final_instructions()
    
    print_header("DÉPLOIEMENT TERMINÉ AVEC SUCCÈS ! 🎉")
    print("🚀 Votre site Petit Prof est maintenant en ligne et accessible partout dans le monde !")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⏹️ Déploiement interrompu par l'utilisateur")
        print("📝 Vous pouvez relancer le script plus tard")
    except Exception as e:
        print(f"\n❌ Erreur inattendue : {e}")
        print("📞 Contactez le support si le problème persiste")
