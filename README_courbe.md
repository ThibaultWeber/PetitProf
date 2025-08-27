# 🎯 Traceur de Courbes Mathématiques

Le script `courbe.py` est un outil interactif pour tracer des courbes de fonctions mathématiques avec une interface conviviale.

## ✨ Fonctionnalités

- **Interface interactive** avec menu à choix multiples
- **Support de nombreuses fonctions mathématiques** :
  - Fonctions polynomiales (x², x³, etc.)
  - Fonctions trigonométriques (sin, cos, tan)
  - Fonctions exponentielles et logarithmiques
  - Fonctions racine carrée et valeur absolue
  - Expressions complexes combinant plusieurs fonctions

- **Personnalisation avancée** :
  - Choix des limites x (x_min, x_max)
  - Nombre de points de tracé ajustable
  - Couleurs automatiques pour chaque courbe
  - Grille et axes de référence

- **Tracé multiple** : Possibilité de tracer plusieurs fonctions sur le même graphique

## 🚀 Installation

1. **Installer les dépendances** :
   ```bash
   pip install -r requirements.txt
   ```

2. **Lancer le script** :
   ```bash
   python courbe.py
   ```

## 📖 Utilisation

### Menu Principal

Le script propose 5 options principales :

1. **Tracer une fonction simple** - Trace une seule fonction avec paramètres par défaut
2. **Tracer plusieurs fonctions** - Trace plusieurs fonctions sur le même graphique
3. **Tracer avec paramètres personnalisés** - Personnalise les limites et la précision
4. **Exemples de fonctions** - Affiche des exemples prêts à utiliser
5. **Quitter** - Ferme le programme

### Syntaxe des Fonctions

Le script accepte une syntaxe mathématique intuitive :

- **Puissances** : `x^2`, `x^3` (utilisez `^` au lieu de `**`)
- **Fonctions trigonométriques** : `sin(x)`, `cos(x)`, `tan(x)`
- **Fonctions exponentielles** : `exp(x)`, `e^x`
- **Logarithmes** : `log(x)` ou `ln(x)`
- **Racine carrée** : `sqrt(x)`
- **Valeur absolue** : `abs(x)`
- **Expressions complexes** : `x^2 + 2*x + 1`, `sin(x) * cos(x)`

### Exemples de Fonctions

| Fonction | Description | Exemple de saisie |
|----------|-------------|-------------------|
| Parabole | Fonction du second degré | `x^2` |
| Sinusoïde | Fonction sinus | `sin(x)` |
| Exponentielle | Croissance exponentielle | `exp(x)` |
| Logarithme | Fonction log | `log(x)` |
| Polynôme | Expression complexe | `x^3 - 2*x^2 + x - 1` |
| Rationnelle | Fraction | `1/x` |
| Composée | Combinaison de fonctions | `sin(x^2)` |

## 🎨 Personnalisation

### Paramètres de Tracé

- **Limites x** : Définissez l'intervalle d'affichage (ex: -5 à 5)
- **Nombre de points** : Ajustez la précision du tracé (défaut: 1000)
- **Couleurs** : Chaque fonction reçoit automatiquement une couleur différente

### Apparence du Graphique

- **Grille** : Grille de référence avec transparence
- **Axes** : Axes x et y clairement marqués
- **Légende** : Identification automatique de chaque courbe
- **Titre** : Titre descriptif du graphique

## 🔧 Fonctionnalités Techniques

### Gestion des Erreurs

- **Validation des entrées** : Vérification de la syntaxe des fonctions
- **Gestion des singularités** : Filtrage automatique des valeurs infinies
- **Messages d'erreur clairs** : Indication précise des problèmes rencontrés

### Performance

- **Calcul vectorisé** : Utilisation de NumPy pour des calculs rapides
- **Filtrage intelligent** : Suppression des points invalides avant affichage
- **Mémoire optimisée** : Gestion efficace des grandes quantités de points

## 💡 Conseils d'Utilisation

1. **Commencez simple** : Testez d'abord avec des fonctions basiques comme `x^2`
2. **Utilisez les exemples** : L'option 4 du menu fournit des exemples prêts à l'emploi
3. **Ajustez les limites** : Pour des fonctions avec des singularités, réduisez l'intervalle x
4. **Augmentez la précision** : Plus de points = courbe plus lisse
5. **Combinez les fonctions** : Comparez plusieurs fonctions sur le même graphique

## 🐛 Résolution de Problèmes

### Erreurs Courantes

- **"La fonction doit contenir la variable 'x'"** : Assurez-vous d'utiliser 'x' comme variable
- **"Impossible de tracer la fonction"** : Vérifiez la syntaxe et les domaines de définition
- **Graphique vide** : Ajustez les limites x ou vérifiez la fonction

### Dépendances Manquantes

Si vous obtenez une erreur d'import :
```bash
pip install matplotlib numpy
```

## 📁 Structure du Code

- **Classe `TraceurCourbe`** : Gestion principale du tracé
- **Méthode `evaluer_fonction`** : Évaluation des expressions mathématiques
- **Méthode `tracer_fonction`** : Création des courbes
- **Interface utilisateur** : Menu interactif et saisie des données

## 🎓 Cas d'Usage

- **Éducation** : Visualisation des concepts mathématiques
- **Recherche** : Analyse rapide de fonctions
- **Développement** : Test de fonctions mathématiques
- **Présentation** : Création de graphiques pour rapports

---

**Profitez de votre exploration mathématique ! 🚀📊**
