#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour tracer des courbes de fonctions mathématiques
"""

import matplotlib.pyplot as plt
import numpy as np
import re
from math import *
import warnings
import sympy as sp
from sympy import symbols, diff, integrate, limit, solve, oo

# Ignorer les avertissements de division par zéro
warnings.filterwarnings('ignore')

class TraceurCourbe:
    def __init__(self):
        """Initialise le traceur de courbes"""
        self.fonctions = []
        self.couleurs = ['blue', 'red', 'green', 'orange', 'purple', 'brown', 'pink', 'gray']
        
    def evaluer_fonction(self, expression, x):
        """
        Évalue une expression mathématique pour une valeur x donnée
        """
        try:
            # Remplacer les expressions mathématiques par leurs équivalents Python
            expression = expression.replace('^', '**')
            expression = expression.replace('sin', 'np.sin')
            expression = expression.replace('cos', 'np.cos')
            expression = expression.replace('tan', 'np.tan')
            expression = expression.replace('log', 'np.log')
            expression = expression.replace('ln', 'np.log')
            expression = expression.replace('exp', 'np.exp')
            expression = expression.replace('sqrt', 'np.sqrt')
            expression = expression.replace('abs', 'np.abs')
            
            # Évaluer l'expression
            return eval(expression)
        except:
            return np.nan
    
    def tracer_fonction(self, expression, x_min=-10, x_max=10, nb_points=1000, couleur=None):
        """
        Trace une fonction mathématique
        """
        try:
            # Générer les points x
            x = np.linspace(x_min, x_max, nb_points)
            
            # Calculer les valeurs y
            y = []
            for xi in x:
                y_val = self.evaluer_fonction(expression, xi)
                y.append(y_val)
            
            y = np.array(y)
            
            # Filtrer les valeurs valides (non-NaN et non-inf)
            mask = np.isfinite(y)
            x_valid = x[mask]
            y_valid = y[mask]
            
            if len(x_valid) > 0:
                # Choisir une couleur
                if couleur is None:
                    couleur = self.couleurs[len(self.fonctions) % len(self.couleurs)]
                
                # Tracer la courbe
                plt.plot(x_valid, y_valid, color=couleur, linewidth=2, label=f'y = {expression}')
                
                # Ajouter la fonction à la liste
                self.fonctions.append({
                    'expression': expression,
                    'couleur': couleur,
                    'x_min': x_min,
                    'x_max': x_max
                })
                
                # Analyser la fonction mathématiquement
                print(f"\n🔍 Analyse de la fonction: y = {expression}")
                analyse = self.analyser_fonction(expression)
                if analyse:
                    self.afficher_analyse(analyse)
                    # Stocker l'analyse pour l'afficher sur le graphique
                    self.fonctions[-1]['analyse'] = analyse
                
                return True
            else:
                print(f"❌ Impossible de tracer la fonction: {expression}")
                return False
                
        except Exception as e:
            print(f"❌ Erreur lors du tracé de {expression}: {str(e)}")
            return False
    
    def analyser_fonction(self, expression):
        """
        Analyse mathématique complète d'une fonction
        """
        try:
            # Créer le symbole x
            x = symbols('x')
            
            # Convertir l'expression pour SymPy
            expr_sympy = self.convertir_pour_sympy(expression)
            
            if expr_sympy is None:
                return None
            
            # Analyser la fonction
            analyse = {}
            analyse['expression'] = expression
            analyse['expression_sympy'] = expr_sympy
            
            # Domaine de définition
            analyse['domaine'] = self.analyser_domaine(expr_sympy, x)
            
            # Dérivée
            try:
                derivee = diff(expr_sympy, x)
                analyse['derivee'] = str(derivee)
            except:
                analyse['derivee'] = "Impossible de calculer"
            
            # Primitive
            try:
                primitive = integrate(expr_sympy, x)
                analyse['primitive'] = str(primitive)
            except:
                analyse['primitive'] = "Impossible de calculer"
            
            # Parité
            analyse['parite'] = self.analyser_parite(expr_sympy, x)
            
            # Monotonie
            analyse['monotonie'] = self.analyser_monotonie(expr_sympy, x)
            
            # Zéros de la fonction
            analyse['zeros'] = self.trouver_zeros(expr_sympy, x)
            
            # Limites
            analyse['limites'] = self.calculer_limites(expr_sympy, x)
            
            return analyse
            
        except Exception as e:
            print(f"❌ Erreur lors de l'analyse de {expression}: {str(e)}")
            return None
    
    def convertir_pour_sympy(self, expression):
        """
        Convertit une expression mathématique pour SymPy
        """
        try:
            # Remplacer les expressions mathématiques
            expr = expression.replace('^', '**')
            expr = expr.replace('sin', 'sp.sin')
            expr = expr.replace('cos', 'sp.cos')
            expr = expr.replace('tan', 'sp.tan')
            expr = expr.replace('log', 'sp.log')
            expr = expr.replace('ln', 'sp.log')
            expr = expr.replace('exp', 'sp.exp')
            expr = expr.replace('sqrt', 'sp.sqrt')
            expr = expr.replace('abs', 'sp.Abs')
            expr = expr.replace('arctan', 'sp.atan')
            expr = expr.replace('arcsin', 'sp.asin')
            expr = expr.replace('arccos', 'sp.acos')
            
            # Évaluer avec SymPy
            x = symbols('x')
            return eval(expr)
        except:
            return None
    
    def analyser_domaine(self, expr_sympy, x):
        """
        Analyse le domaine de définition
        """
        try:
            # Vérifier les points problématiques
            domaines = []
            
            # Division par zéro
            denominateurs = sp.solve(sp.denom(expr_sympy), x)
            if denominateurs:
                domaines.append(f"x ≠ {', '.join(map(str, denominateurs))}")
            
            # Logarithme de valeurs négatives ou nulles
            if 'log' in str(expr_sympy) or 'ln' in str(expr_sympy):
                domaines.append("x > 0")
            
            # Racine carrée de valeurs négatives
            if 'sqrt' in str(expr_sympy):
                domaines.append("x ≥ 0")
            
            # Arcsin et arccos
            if 'asin' in str(expr_sympy):
                domaines.append("-1 ≤ x ≤ 1")
            if 'acos' in str(expr_sympy):
                domaines.append("-1 ≤ x ≤ 1")
            
            if not domaines:
                return "ℝ (tous les réels)"
            else:
                return " et ".join(domaines)
                
        except:
            return "ℝ (tous les réels)"
    
    def analyser_parite(self, expr_sympy, x):
        """
        Analyse la parité de la fonction
        """
        try:
            # Calculer f(-x)
            expr_neg = expr_sympy.subs(x, -x)
            
            # Simplifier
            expr_neg = sp.simplify(expr_neg)
            expr_sympy = sp.simplify(expr_sympy)
            
            if expr_neg == expr_sympy:
                return "Paire (f(-x) = f(x))"
            elif expr_neg == -expr_sympy:
                return "Impaire (f(-x) = -f(x))"
            else:
                return "Ni paire ni impaire"
        except:
            return "Impossible de déterminer"
    
    def analyser_monotonie(self, expr_sympy, x):
        """
        Analyse la monotonie de la fonction
        """
        try:
            derivee = diff(expr_sympy, x)
            derivee = sp.simplify(derivee)
            
            # Résoudre f'(x) = 0
            points_critiques = sp.solve(derivee, x)
            
            if not points_critiques:
                # Pas de points critiques, fonction monotone
                if derivee > 0:
                    return "Strictement croissante sur ℝ"
                elif derivee < 0:
                    return "Strictement décroissante sur ℝ"
                else:
                    return "Constante"
            else:
                return f"Points critiques en x = {', '.join(map(str, points_critiques))}"
                
        except:
            return "Impossible de déterminer"
    
    def trouver_zeros(self, expr_sympy, x):
        """
        Trouve les zéros de la fonction
        """
        try:
            zeros = sp.solve(expr_sympy, x)
            if not zeros:
                return "Aucun zéro réel"
            else:
                return f"x = {', '.join(map(str, zeros))}"
        except:
            return "Impossible de déterminer"
    
    def calculer_limites(self, expr_sympy, x):
        """
        Calcule les limites en +∞ et -∞
        """
        try:
            limite_plus_inf = limit(expr_sympy, x, oo)
            limite_moins_inf = limit(expr_sympy, x, -oo)
            
            return {
                "+∞": str(limite_plus_inf),
                "-∞": str(limite_moins_inf)
            }
        except:
            return {"+∞": "Impossible de calculer", "-∞": "Impossible de calculer"}
    
    def afficher_analyse(self, analyse):
        """
        Affiche l'analyse mathématique de manière formatée
        """
        if analyse is None:
            print("❌ Impossible d'analyser cette fonction")
            return
        
        print("\n" + "=" * 70)
        print("📊 ANALYSE MATHÉMATIQUE COMPLÈTE")
        print("=" * 70)
        print(f"🎯 Fonction: y = {analyse['expression']}")
        print("-" * 70)
        
        print(f"📐 Domaine de définition: {analyse['domaine']}")
        print(f"🔢 Dérivée: y' = {analyse['derivee']}")
        print(f"📈 Primitive: ∫y dx = {analyse['primitive']}")
        print(f"🔄 Parité: {analyse['parite']}")
        print(f"📊 Monotonie: {analyse['monotonie']}")
        print(f"🎯 Zéros de la fonction: {analyse['zeros']}")
        
        print("\n🌌 Limites:")
        for direction, valeur in analyse['limites'].items():
            print(f"   lim(x→{direction}) = {valeur}")
        
        print("=" * 70)
    
    def afficher_analyse_sur_graphique(self, analyses, x_min, x_max):
        """
        Affiche l'analyse mathématique de toutes les fonctions sur le graphique
        """
        if not analyses:
            return
        
        # Créer un texte formaté pour toutes les analyses
        texte_complet = "📊 ANALYSE MATHÉMATIQUE COMPLÈTE\n\n"
        
        for i, analyse in enumerate(analyses):
            if analyse is None:
                continue
                
            couleur = self.couleurs[i % len(self.couleurs)]
            texte_complet += f"🎯 {i+1}. y = {analyse['expression']}\n"
            texte_complet += f"📐 Domaine: {analyse['domaine']}\n"
            texte_complet += f"🔢 Dérivée: y' = {analyse['derivee']}\n"
            texte_complet += f"📈 Primitive: ∫y dx = {analyse['primitive']}\n"
            texte_complet += f"🔄 Parité: {analyse['parite']}\n"
            texte_complet += f"📊 Monotonie: {analyse['monotonie']}\n"
            texte_complet += f"🎯 Zéros: {analyse['zeros']}\n"
            texte_complet += f"🌌 Limites: x→+∞: {analyse['limites']['+∞']}, x→-∞: {analyse['limites']['-∞']}\n"
            texte_complet += "─" * 50 + "\n\n"
        
        # Positionner le texte en bas à gauche du graphique
        plt.figtext(0.02, 0.02, texte_complet, 
                   fontsize=8, 
                   fontfamily='monospace',
                   bbox=dict(boxstyle="round,pad=0.5", 
                           facecolor="lightblue", 
                           alpha=0.9,
                           edgecolor="navy"),
                   verticalalignment='bottom',
                   horizontalalignment='left')
    
    def tracer_plusieurs_fonctions(self, expressions, x_min=-10, x_max=10):
        """
        Trace plusieurs fonctions sur le même graphique
        """
        plt.figure(figsize=(12, 8))
        
        print(f"\n🎯 Traçage de {len(expressions)} fonction(s)...")
        
        for i, expr in enumerate(expressions):
            print(f"\n📊 Fonction {i+1}/{len(expressions)}")
            self.tracer_fonction(expr, x_min, x_max, couleur=self.couleurs[i % len(self.couleurs)])
        
        self.configurer_graphique(x_min, x_max)
        plt.show()
    
    def configurer_graphique(self, x_min, x_max):
        """
        Configure l'apparence du graphique
        """
        # Grille
        plt.grid(True, alpha=0.3)
        
        # Axes
        plt.axhline(y=0, color='black', linewidth=0.5)
        plt.axvline(x=0, color='black', linewidth=0.5)
        
        # Labels
        plt.xlabel('x', fontsize=12)
        plt.ylabel('y', fontsize=12)
        plt.title('Tracé de courbes mathématiques', fontsize=14, fontweight='bold')
        
        # Légende
        if self.fonctions:
            plt.legend(loc='best')
        
        # Limites des axes
        plt.xlim(x_min, x_max)
        
        # Ajuster automatiquement les limites y
        plt.autoscale(axis='y')
        
        # Afficher l'analyse de toutes les fonctions sur le graphique
        analyses = [f.get('analyse') for f in self.fonctions if 'analyse' in f]
        if analyses:
            self.afficher_analyse_sur_graphique(analyses, x_min, x_max)
    
    def afficher_menu(self):
        """
        Affiche le menu principal
        """
        print("\n" + "=" * 60)
        print("🎯 TRACEUR DE COURBES MATHÉMATIQUES")
        print("=" * 60)
        print("1. Tracer une fonction simple")
        print("2. Tracer plusieurs fonctions")
        print("3. Tracer avec paramètres personnalisés")
        print("4. Analyser une fonction (sans tracé)")
        print("5. Exemples de fonctions")
        print("6. Quitter")
        print("=" * 60)
    
    def afficher_exemples(self):
        """
        Affiche des exemples de fonctions
        """
        exemples = [
            "x^2",           # Parabole
            "sin(x)",        # Sinusoïde
            "cos(x)",        # Cosinusoïde
            "exp(x)",        # Exponentielle
            "log(x)",        # Logarithme
            "1/x",           # Hyperbole
            "x^3",           # Cubique
            "sqrt(x)",       # Racine carrée
            "tan(x)",        # Tangente
            "abs(x)",        # Valeur absolue
            "x^2 + 2*x + 1", # Polynôme du second degré
            "sin(x) * cos(x)" # Produit de fonctions
        ]
        
        print("\n📚 EXEMPLES DE FONCTIONS:")
        print("-" * 40)
        for i, exemple in enumerate(exemples, 1):
            print(f"{i:2d}. y = {exemple}")
        print("-" * 40)
        print("💡 Conseils:")
        print("   - Utilisez '^' pour les puissances (ex: x^2)")
        print("   - Utilisez 'sin', 'cos', 'tan' pour les fonctions trigonométriques")
        print("   - Utilisez 'log' ou 'ln' pour les logarithmes")
        print("   - Utilisez 'exp' pour l'exponentielle")
        print("   - Utilisez 'sqrt' pour la racine carrée")
        print("   - Utilisez 'abs' pour la valeur absolue")
    
    def saisir_fonction(self):
        """
        Demande à l'utilisateur de saisir une fonction
        """
        print("\n📝 Saisissez votre fonction (ex: x^2, sin(x), exp(x)):")
        print("   Format: y = [expression en x]")
        
        while True:
            try:
                expression = input("   Fonction: ").strip()
                
                if not expression:
                    print("   ❌ Veuillez saisir une fonction valide.")
                    continue
                
                # Nettoyer l'expression
                expression = expression.lower()
                if expression.startswith('y='):
                    expression = expression[2:].strip()
                
                # Vérifier que l'expression contient 'x'
                if 'x' not in expression:
                    print("   ❌ La fonction doit contenir la variable 'x'.")
                    continue
                
                return expression
                
            except KeyboardInterrupt:
                print("\n\n👋 Au revoir!")
                exit()
            except Exception as e:
                print(f"   ❌ Erreur: {str(e)}")
    
    def saisir_parametres(self):
        """
        Demande à l'utilisateur de saisir les paramètres de tracé
        """
        print("\n⚙️  Paramètres de tracé:")
        
        try:
            x_min = float(input("   x minimum (défaut: -10): ") or -10)
            x_max = float(input("   x maximum (défaut: 10): ") or 10)
            nb_points = int(input("   Nombre de points (défaut: 1000): ") or 1000)
            
            if x_min >= x_max:
                print("   ❌ x_min doit être inférieur à x_max. Utilisation des valeurs par défaut.")
                x_min, x_max = -10, 10
            
            if nb_points < 100:
                print("   ❌ Nombre de points trop faible. Utilisation de 1000 points.")
                nb_points = 1000
                
            return x_min, x_max, nb_points
            
        except ValueError:
            print("   ❌ Valeurs invalides. Utilisation des valeurs par défaut.")
            return -10, 10, 1000
    
    def executer(self):
        """
        Exécute le programme principal
        """
        while True:
            self.afficher_menu()
            
            try:
                choix = input("\n🎯 Votre choix (1-5): ").strip()
                
                if choix == '1':
                    # Tracer une fonction simple
                    expression = self.saisir_fonction()
                    x_min, x_max, nb_points = self.saisir_parametres()
                    
                    plt.figure(figsize=(12, 8))
                    if self.tracer_fonction(expression, x_min, x_max, nb_points):
                        self.configurer_graphique(x_min, x_max)
                        plt.show()
                
                elif choix == '2':
                    # Tracer plusieurs fonctions
                    print("\n📝 Saisissez vos fonctions (ligne vide pour terminer):")
                    expressions = []
                    
                    while True:
                        expr = input(f"   Fonction {len(expressions)+1}: ").strip()
                        if not expr:
                            break
                        
                        if 'x' in expr.lower():
                            if expr.lower().startswith('y='):
                                expr = expr[2:].strip()
                            expressions.append(expr)
                        else:
                            print("   ❌ La fonction doit contenir la variable 'x'.")
                    
                    if expressions:
                        x_min, x_max, nb_points = self.saisir_parametres()
                        self.tracer_plusieurs_fonctions(expressions, x_min, x_max)
                    else:
                        print("   ❌ Aucune fonction valide saisie.")
                
                elif choix == '3':
                    # Tracer avec paramètres personnalisés
                    expression = self.saisir_fonction()
                    x_min, x_max, nb_points = self.saisir_parametres()
                    
                    plt.figure(figsize=(12, 8))
                    if self.tracer_fonction(expression, x_min, x_max, nb_points):
                        self.configurer_graphique(x_min, x_max)
                        plt.show()
                
                elif choix == '4':
                    # Analyser une fonction sans la tracer
                    expression = self.saisir_fonction()
                    print(f"\n🔍 Analyse de la fonction: y = {expression}")
                    analyse = self.analyser_fonction(expression)
                    if analyse:
                        self.afficher_analyse(analyse)
                    input("\n   Appuyez sur Entrée pour continuer...")
                
                elif choix == '5':
                    # Afficher les exemples
                    self.afficher_exemples()
                    input("\n   Appuyez sur Entrée pour continuer...")
                
                elif choix == '6':
                    print("\n👋 Merci d'avoir utilisé le traceur de courbes!")
                    break
                
                else:
                    print("   ❌ Choix invalide. Veuillez choisir entre 1 et 6.")
                
            except KeyboardInterrupt:
                print("\n\n👋 Au revoir!")
                break
            except Exception as e:
                print(f"   ❌ Erreur: {str(e)}")

def main():
    """
    Fonction principale
    """
    print("🚀 Démarrage du traceur de courbes...")
    
    try:
        traceur = TraceurCourbe()
        traceur.executer()
    except Exception as e:
        print(f"❌ Erreur fatale: {str(e)}")
        print("💡 Vérifiez que matplotlib et numpy sont installés.")

if __name__ == "__main__":
    main()
