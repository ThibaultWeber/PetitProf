#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour analyser la fréquence des éléments dans une liste
"""

from collections import Counter
import pandas as pd
import matplotlib.pyplot as plt

def frequence_avec_counter(liste):
    """
    Utilise Counter pour compter les fréquences
    """
    return Counter(liste)

def frequence_avec_dict(liste):
    """
    Utilise un dictionnaire classique pour compter les fréquences
    """
    frequences = {}
    for element in liste:
        if element in frequences:
            frequences[element] += 1
        else:
            frequences[element] = 1
    return frequences

def frequence_avec_pandas(liste):
    """
    Utilise pandas pour créer un DataFrame avec les fréquences
    """
    df = pd.DataFrame(liste, columns=['Element'])
    frequences = df['Element'].value_counts().reset_index()
    frequences.columns = ['Element', 'Frequence']
    return frequences

def afficher_resultats(liste):
    """
    Affiche tous les résultats de manière formatée
    """
    print("=" * 50)
    print("ANALYSE DE FRÉQUENCE DES ÉLÉMENTS")
    print("=" * 50)
    
    print(f"\nListe originale: {liste}")
    print(f"Nombre total d'éléments: {len(liste)}")
    
    # Méthode 1: Counter
    print("\n" + "-" * 30)
    print("MÉTHODE 1: Utilisation de Counter")
    print("-" * 30)
    counter_result = frequence_avec_counter(liste)
    for element, freq in counter_result.most_common():
        print(f"'{element}': {freq} fois")
    
    # Méthode 2: Dictionnaire classique
    print("\n" + "-" * 30)
    print("MÉTHODE 2: Dictionnaire classique")
    print("-" * 30)
    dict_result = frequence_avec_dict(liste)
    # Trier par fréquence décroissante, puis par élément pour éviter les erreurs de comparaison
    for element, freq in sorted(dict_result.items(), key=lambda x: (-x[1], str(x[0]))):
        print(f"'{element}': {freq} fois")
    
    # Méthode 3: Pandas DataFrame
    print("\n" + "-" * 30)
    print("MÉTHODE 3: DataFrame Pandas")
    print("-" * 30)
    df_result = frequence_avec_pandas(liste)
    print(df_result.to_string(index=False))
    
    return counter_result, dict_result, df_result

def creer_graphique(liste):
    """
    Crée un graphique en barres des fréquences
    """
    try:
        counter_result = frequence_avec_counter(liste)
        
        elements = list(counter_result.keys())
        frequences = list(counter_result.values())
        
        plt.figure(figsize=(10, 6))
        plt.bar(elements, frequences, color='skyblue', edgecolor='navy')
        plt.title('Fréquence des éléments dans la liste', fontsize=14, fontweight='bold')
        plt.xlabel('Éléments', fontsize=12)
        plt.ylabel('Fréquence', fontsize=12)
        plt.xticks(rotation=45)
        plt.grid(axis='y', alpha=0.3)
        
        # Ajouter les valeurs sur les barres
        for i, v in enumerate(frequences):
            plt.text(i, v + 0.1, str(v), ha='center', va='bottom', fontweight='bold')
        
        plt.tight_layout()
        plt.savefig('frequence_elements.png', dpi=300, bbox_inches='tight')
        print("\nGraphique sauvegardé dans 'frequence_elements.png'")
        plt.show()
        
    except ImportError:
        print("\nMatplotlib n'est pas installé. Impossible de créer le graphique.")

# Exemples d'utilisation
if __name__ == "__main__":
    # Exemple 1: Liste simple
    print("EXEMPLE 1: Liste simple")
    liste_simple = ['a', 'b', 'a', 'c', 'b', 'a', 'd']
    resultats1 = afficher_resultats(liste_simple)
    
    # Exemple 2: Liste avec des nombres
    print("\n\n" + "=" * 50)
    print("EXEMPLE 2: Liste avec des nombres")
    print("=" * 50)
    liste_nombres = [1, 2, 3, 1, 2, 1, 4, 5, 2, 1, 3]
    resultats2 = afficher_resultats(liste_nombres)
    
    # Exemple 3: Liste mixte
    print("\n\n" + "=" * 50)
    print("EXEMPLE 3: Liste mixte")
    print("=" * 50)
    liste_mixte = ['chat', 42, 'chat', 'chien', 42, 'poisson', 'chat', 100]
    resultats3 = afficher_resultats(liste_mixte)
    
    # Créer un graphique pour le premier exemple
    print("\n\n" + "=" * 50)
    print("CRÉATION DU GRAPHIQUE")
    print("=" * 50)
    creer_graphique(liste_simple)
    
    print("\n" + "=" * 50)
    print("ANALYSE TERMINÉE!")
    print("=" * 50)
