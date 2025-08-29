#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de correction des références après restructuration
Nettoie les références incorrectes ajoutées par le script précédent
"""

import os
from pathlib import Path

def fix_restructure_references():
    """Corrige les références incorrectes après restructuration"""
    
    print("🔧 Correction des références après restructuration...")
    
    # Fichiers HTML à corriger
    html_files = list(Path(".").glob("*.html"))
    
    for html_file in html_files:
        if html_file.name in ["fix-restructure.py", "restructure-for-render.py"]:
            continue
            
        print(f"  🔧 Correction de {html_file.name}...")
        
        # Lire le contenu
        with open(html_file, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Corriger les références CSS
        content = content.replace("static/css-", "css-")
        content = content.replace("css/css-", "css-")
        
        # Corriger les références JavaScript
        content = content.replace("static/js-", "js-")
        content = content.replace("js/js-", "js-")
        
        # Corriger les références d'images
        content = content.replace("static/img-", "img-")
        content = content.replace("images/img-", "img-")
        
        # Corriger les références de documents
        content = content.replace("static/documents/", "documents/")
        content = content.replace("documents/documents/", "documents/")
        
        # Corriger les références de graph
        content = content.replace("static/graph/", "graph/")
        content = content.replace("graph/graph/", "graph/")
        
        # Écrire le contenu corrigé
        with open(html_file, "w", encoding="utf-8") as f:
            f.write(content)
        
        print(f"    ✅ {html_file.name} corrigé")
    
    print("\n🎉 CORRECTION TERMINÉE !")
    print("🔧 Toutes les références ont été nettoyées")
    print("📁 Les fichiers pointent maintenant vers la racine")

if __name__ == "__main__":
    fix_restructure_references()

