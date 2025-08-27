/**
 * Calculatrice Graphique - Petit Prof
 * Gestion du formulaire et des interactions utilisateur
 */

document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const form = document.getElementById('graph-form');
    const resultDiv = document.getElementById('graph-result');
    let analyseDiv = document.getElementById('analyse-math-div');
    
    // Créer le div d'analyse s'il n'existe pas
    if (!analyseDiv) {
        analyseDiv = document.createElement('div');
        analyseDiv.id = 'analyse-math-div';
        analyseDiv.style.margin = '40px auto 0 auto';
        analyseDiv.style.maxWidth = '900px';
        analyseDiv.style.width = '100%';
        analyseDiv.style.textAlign = 'left';
        resultDiv.parentNode.insertBefore(analyseDiv, resultDiv.nextSibling);
    }
    
    /**
     * Affiche une erreur pour un champ de fonction
     * @param {number} idx - Index de la fonction (0-4)
     * @param {string} message - Message d'erreur à afficher
     */
    function setFieldError(idx, message) {
        const input = document.getElementById('fonction' + (idx + 1));
        const errId = 'fonction-error-' + (idx + 1);
        const oldError = document.getElementById(errId);
        
        // Supprimer l'ancienne erreur
        if (oldError) {
            oldError.remove();
        }
        
        // Afficher la nouvelle erreur si elle existe
        if (message) {
            const errorDiv = document.createElement('div');
            errorDiv.id = errId;
            errorDiv.className = 'fonction-error';
            errorDiv.textContent = message;
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }
    }
    
    /**
     * Valide une fonction mathématique
     * @param {string} fonction - La fonction à valider
     * @returns {boolean} - True si valide, false sinon
     */
    function validateFunction(fonction) {
        if (!fonction.trim()) return true; // Champ vide = valide
        
        // Vérifications basiques
        const hasX = fonction.includes('x');
        const hasOperators = /[\+\-\*\/\^]/.test(fonction);
        const hasValidChars = /^[0-9x\+\-\*\/\^\(\)\s\.]+$/.test(fonction);
        
        if (!hasX) {
            return { valid: false, error: 'La fonction doit contenir la variable x' };
        }
        
        if (!hasOperators) {
            return { valid: false, error: 'La fonction doit contenir des opérations' };
        }
        
        if (!hasValidChars) {
            return { valid: false, error: 'Caractères non autorisés dans la fonction' };
        }
        
        return { valid: true };
    }
    
    /**
     * Affiche un message de chargement
     */
    function showLoading() {
        resultDiv.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="color: #6366f1; font-size: 2rem; margin-bottom: 16px;">⏳</div>
                <p style="color: #6366f1; font-weight: 500;">Génération du graphique...</p>
                <p style="color: #64748b; font-size: 0.9rem;">Veuillez patienter, cela peut prendre quelques secondes.</p>
            </div>
        `;
        analyseDiv.innerHTML = '';
    }
    
    /**
     * Affiche un message d'erreur
     * @param {string} message - Message d'erreur
     */
    function showError(message) {
        resultDiv.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <div style="color: #ef4444; font-size: 2rem; margin-bottom: 16px;">❌</div>
                <p style="color: #ef4444; font-weight: 500;">${message}</p>
            </div>
        `;
        analyseDiv.innerHTML = '';
    }
    
    /**
     * Affiche le graphique généré
     * @param {string} imageUrl - URL de l'image du graphique
     */
    function showGraph(imageUrl) {
        resultDiv.innerHTML = `
            <img src="${imageUrl}?t=${Date.now()}" 
                 alt="Courbe tracée" 
                 style="max-width:100%; border:1px solid #ccc; box-shadow:0 2px 8px #aaa; border-radius: 12px;">
        `;
    }
    
    // Gestionnaire de soumission du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les fonctions saisies
        const fonctions = [];
        for (let i = 1; i <= 5; i++) {
            setFieldError(i - 1, ''); // Effacer les erreurs précédentes
            const val = document.getElementById('fonction' + i).value.trim();
            if (val) {
                // Valider la fonction
                const validation = validateFunction(val);
                if (!validation.valid) {
                    setFieldError(i - 1, validation.error);
                    return;
                }
                fonctions.push(val);
            }
        }
        
        // Vérifier qu'au moins une fonction est saisie
        if (fonctions.length === 0) {
            showError('Veuillez saisir au moins une fonction.');
            return;
        }
        
        // Récupérer les paramètres de fenêtre
        const x_min = document.getElementById('x_min').value;
        const x_max = document.getElementById('x_max').value;
        const y_min = document.getElementById('y_min').value;
        const y_max = document.getElementById('y_max').value;
        
        // Préparer les paramètres
        const params = { fonctions: fonctions };
        if (x_min !== '') params.x_min = parseFloat(x_min);
        if (x_max !== '') params.x_max = parseFloat(x_max);
        if (y_min !== '') params.y_min = parseFloat(y_min);
        if (y_max !== '') params.y_max = parseFloat(y_max);
        
        // Afficher le chargement
        showLoading();
        
        // Envoyer la requête au serveur
        fetch('/api/trace-courbe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur serveur: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Afficher le graphique
                showGraph(data.image_url);
                
                // Afficher l'analyse si disponible
                if (data.analyse_html) {
                    analyseDiv.innerHTML = data.analyse_html;
                } else {
                    analyseDiv.innerHTML = '';
                }
                
                // Gérer les erreurs de courbes individuelles
                if (data.courbes_status) {
                    let champIdx = 0;
                    for (let i = 1; i <= 5; i++) {
                        const val = document.getElementById('fonction' + i).value.trim();
                        if (!val) continue;
                        
                        const status = data.courbes_status[champIdx];
                        if (status && !status.success) {
                            setFieldError(i - 1, status.error);
                        }
                        champIdx++;
                    }
                }
            } else {
                showError(data.error || 'Erreur inconnue lors de la génération du graphique.');
            }
        })
        .catch(err => {
            console.error('Erreur:', err);
            showError(`Erreur de connexion: ${err.message}`);
        });
    });
    
    // Amélioration de l'UX : validation en temps réel
    const functionInputs = document.querySelectorAll('#graph-form input[type="text"]');
    functionInputs.forEach((input, index) => {
        input.addEventListener('blur', function() {
            const val = this.value.trim();
            if (val) {
                const validation = validateFunction(val);
                if (!validation.valid) {
                    setFieldError(index, validation.error);
                } else {
                    setFieldError(index, '');
                }
            }
        });
    });
    
    // Amélioration de l'UX : focus sur le premier champ
    document.getElementById('fonction1').focus();
});