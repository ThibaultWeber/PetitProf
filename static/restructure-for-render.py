#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de restructuration pour Render
Déplace tous les fichiers à la racine et modifie les références HTML
"""

import os
import shutil
import re
from pathlib import Path

def restructure_for_render():
    """Restructure le site pour Render en aplatissant la structure"""
    
    print("🚀 Restructuration du site pour Render...")
    
    # Créer un dossier de sauvegarde
    backup_dir = "backup-before-restructure"
    if not os.path.exists(backup_dir):
        os.makedirs(backup_dir)
        print(f"📁 Dossier de sauvegarde créé : {backup_dir}")
    
    # Déplacer tous les fichiers CSS à la racine
    print("🎨 Déplacement des fichiers CSS...")
    css_files = []
    for css_file in Path("css").glob("*.css"):
        new_name = f"css-{css_file.name}"
        shutil.copy2(css_file, new_name)
        css_files.append((css_file.name, new_name))
        print(f"  ✅ {css_file.name} → {new_name}")
    
    # Déplacer tous les fichiers JS à la racine
    print("⚡ Déplacement des fichiers JavaScript...")
    js_files = []
    for js_file in Path("js").glob("*.js"):
        new_name = f"js-{js_file.name}"
        shutil.copy2(js_file, new_name)
        js_files.append((js_file.name, new_name))
        print(f"  ✅ {js_file.name} → {new_name}")
    
    # Déplacer toutes les images à la racine
    print("🖼️ Déplacement des images...")
    image_files = []
    for image_file in Path("images").glob("*"):
        if image_file.is_file():
            new_name = f"img-{image_file.name}"
            shutil.copy2(image_file, new_name)
            image_files.append((image_file.name, new_name))
            print(f"  ✅ {image_file.name} → {new_name}")
    
    # Créer un fichier de mapping
    mapping_file = "render-file-mapping.txt"
    with open(mapping_file, "w", encoding="utf-8") as f:
        f.write("MAPPING DES FICHIERS POUR RENDER\n")
        f.write("=" * 40 + "\n\n")
        
        f.write("FICHIERS CSS :\n")
        for old, new in css_files:
            f.write(f"  {old} → {new}\n")
        
        f.write("\nFICHIERS JAVASCRIPT :\n")
        for old, new in js_files:
            f.write(f"  {old} → {new}\n")
        
        f.write("\nIMAGES :\n")
        for old, new in image_files:
            f.write(f"  {old} → {new}\n")
    
    print(f"📋 Fichier de mapping créé : {mapping_file}")
    
    # Modifier tous les fichiers HTML
    print("🔧 Modification des références dans les fichiers HTML...")
    html_files = list(Path(".").glob("*.html"))
    
    for html_file in html_files:
        if html_file.name == "restructure-for-render.py":
            continue
            
        print(f"  🔧 Modification de {html_file.name}...")
        
        # Lire le contenu
        with open(html_file, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Remplacer les références CSS
        for old, new in css_files:
            old_ref = f"css/{old}"
            content = content.replace(old_ref, new)
        
        # Remplacer les références JavaScript
        for old, new in js_files:
            old_ref = f"js/{old}"
            content = content.replace(old_ref, new)
        
        # Remplacer les références d'images
        for old, new in image_files:
            old_ref = f"images/{old}"
            content = content.replace(old_ref, new)
        
        # Écrire le contenu modifié
        with open(html_file, "w", encoding="utf-8") as f:
            f.write(content)
        
        print(f"    ✅ {html_file.name} modifié")
    
    # Créer un fichier render.yaml simplifié
    print("📝 Création d'un render.yaml simplifié...")
    render_yaml = """services:
  - type: web
    name: petit-prof-site
    env: static
    buildCommand: echo "Site restructuré pour Render"
    startCommand: echo "Site statique déployé avec succès"
    staticPublishPath: .
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
    headers:
      - path: /*
        name: Cache-Control
        value: "public, max-age=31536000"
      - path: *.css
        name: Content-Type
        value: "text/css"
      - path: *.js
        name: Content-Type
        value: "application/javascript"
      - path: *.png
        name: Content-Type
        value: "image/png"
      - path: *.jpg
        name: Content-Type
        value: "image/jpeg"
      - path: *.webp
        name: Content-Type
        value: "image/webp"
      - path: *.avif
        name: Content-Type
        value: "image/avif"
      - path: *.svg
        name: Content-Type
        value: "image/svg+xml"
      - path: *.html
        name: Content-Type
        value: "text/html"
      - path: *.pdf
        name: Content-Type
        value: "application/pdf"
"""
    
    with open("render-simple.yaml", "w", encoding="utf-8") as f:
        f.write(render_yaml)
    
    print("✅ render-simple.yaml créé")
    
    # Créer un fichier de vérification
    verification_file = "verification-restructure.txt"
    with open(verification_file, "w", encoding="utf-8") as f:
        f.write("VÉRIFICATION DE LA RESTRUCTURATION\n")
        f.write("=" * 40 + "\n\n")
        
        f.write("FICHIERS À LA RACINE :\n")
        for file in sorted(os.listdir(".")):
            if file.endswith(('.html', '.css', '.js', '.png', '.jpg', '.webp', '.avif', '.svg')):
                f.write(f"  ✅ {file}\n")
        
        f.write(f"\nTOTAL : {len(css_files)} CSS, {len(js_files)} JS, {len(image_files)} images\n")
        f.write("Tous les fichiers sont maintenant à la racine pour Render !\n")
    
    print(f"📋 Fichier de vérification créé : {verification_file}")
    
    print("\n🎉 RESTRUCTURATION TERMINÉE !")
    print("📁 Tous les fichiers sont maintenant à la racine")
    print("🔧 Les références HTML ont été mises à jour")
    print("📝 Utilisez render-simple.yaml pour le déploiement")
    print(f"💾 Sauvegarde dans : {backup_dir}")

if __name__ == "__main__":
    restructure_for_render()



