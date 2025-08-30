/**
 * Calculatrice Graphique Avancée - Petit Prof
 * Version 100% frontend avec bibliothèques mathématiques avancées
 * INCLUT : Quadrillage, graduations, zoom, déplacement, analyse mathématique
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
    
    // Créer le canvas pour le graphique
    const canvas = document.createElement('canvas');
    canvas.id = 'graph';
    canvas.width = 800;
    canvas.height = 400;
    canvas.style.border = '1px solid #ccc';
    canvas.style.cursor = 'crosshair';
    canvas.style.maxWidth = '100%';
    canvas.style.borderRadius = '12px';
    canvas.style.boxShadow = '0 2px 8px #aaa';
    
    // Remplacer le contenu du resultDiv par le canvas
    resultDiv.innerHTML = '';
    resultDiv.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let funcExpr;
    let scale = 40; // pixels par unité
    let offsetX = canvas.width / 2;
    let offsetY = canvas.height / 2;
    
    // Variables pour le drag
    let dragging = false, lastX, lastY;
    
    /**
     * Dessine les axes du graphique avec quadrillage et graduations
     */
    function drawAxes() {
        // QUADRILLAGE LÉGER EN ARRIÈRE-PLAN
        ctx.strokeStyle = "#f0f0f0";
        ctx.lineWidth = 0.5;
        
        // Quadrillage vertical (lignes parallèles à l'axe Y)
        for (let x = -1000; x <= 1000; x++) {
            const px = offsetX + x * scale;
            if (px >= 0 && px <= canvas.width) {
                ctx.beginPath();
                ctx.moveTo(px, 0);
                ctx.lineTo(px, canvas.height);
                ctx.stroke();
            }
        }
        
        // Quadrillage horizontal (lignes parallèles à l'axe X)
        for (let y = -1000; y <= 1000; y++) {
            const py = offsetY - y * scale;
            if (py >= 0 && py <= canvas.height) {
                ctx.beginPath();
                ctx.moveTo(0, py);
                ctx.lineTo(canvas.width, py);
                ctx.stroke();
            }
        }
        
        // Couleur et style des axes principaux
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.fillStyle = "#333";
        
        // Axe X (horizontal)
        ctx.beginPath();
        ctx.moveTo(0, offsetY);
        ctx.lineTo(canvas.width, offsetY);
        ctx.stroke();
        
        // Axe Y (vertical)
        ctx.beginPath();
        ctx.moveTo(offsetX, 0);
        ctx.lineTo(offsetX, canvas.height);
        ctx.stroke();
        
        // GRADUATIONS SUR L'AXE X
        ctx.fillStyle = "#666";
        ctx.font = "12px Arial";
        for (let x = -1000; x <= 1000; x++) {
            const px = offsetX + x * scale;
            if (px >= 0 && px <= canvas.width) {
                ctx.beginPath();
                ctx.moveTo(px, offsetY - 5);
                ctx.lineTo(px, offsetY + 5);
                ctx.stroke();
                ctx.fillText(x.toString(), px - 5, offsetY + 20);
            }
        }
        
        // GRADUATIONS SUR L'AXE Y
        for (let y = -1000; y <= 1000; y++) {
            const py = offsetY - y * scale;
            if (py >= 0 && py <= canvas.height) {
                ctx.beginPath();
                ctx.moveTo(offsetX - 5, py);
                ctx.lineTo(offsetX + 5, py);
                ctx.fillText(y.toString(), offsetX + 10, py + 5);
            }
        }
    }
    
    /**
     * Évalue la fonction pour une valeur de x donnée
     * @param {number} x - La valeur de x
     * @returns {number} - Le résultat de l'évaluation
     */
    function f(x) {
        try {
            return funcExpr.evaluate({x: x});
        } catch (e) { 
            return NaN; 
        }
    }
    
    /**
     * Valide une expression mathématique
     */
    function validerExpression(expr) {
        if (!expr || !expr.trim()) {
            return { valide: false, erreur: "Expression vide" };
        }
        
        // Vérifier les caractères autorisés
        const caracteresAutorises = /^[0-9x+\-*/().,^a-zA-Z\s]+$/;
        if (!caracteresAutorises.test(expr)) {
            return { valide: false, erreur: "Caractères non autorisés détectés" };
        }
        
        // Vérifier la syntaxe mathématique
        try {
            math.parse(expr);
            return { valide: true };
        } catch (e) {
            return { valide: false, erreur: "Syntaxe mathématique invalide" };
        }
    }
    
    /**
     * Trace la fonction sur le canvas
     */
    function plotFunction() {
        const input = document.getElementById('fonction1').value;
        if (!input.trim()) {
            alert("Veuillez entrer une fonction");
            return;
        }
        
        // Validation de l'expression
        const validation = validerExpression(input);
        if (!validation.valide) {
            alert(`Erreur de validation: ${validation.erreur}`);
            return;
        }
        
        try {
            funcExpr = math.parse(input);
        } catch (e) {
            alert("Erreur de syntaxe dans la fonction");
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAxes();

        // Couleur aléatoire pour chaque tracé
        const color = `hsl(${Math.random() * 360}, 70%, 50%)`;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        ctx.beginPath();
        let first = true;
        for (let px = 0; px < canvas.width; px++) {
            const x = (px - offsetX) / scale;
            const y = f(x);
            if (!isNaN(y) && isFinite(y)) {
                const py = offsetY - y * scale;
                if (first) {
                    ctx.moveTo(px, py);
                    first = false;
                } else {
                    ctx.lineTo(px, py);
                }
            } else {
                first = true; // discontinuité
            }
        }
        ctx.stroke();

        analyseFunction(input);
    }
    
    /**
     * Trace plusieurs fonctions avec des couleurs différentes
     */
    function plotMultipleFunctions() {
        const functions = [];
        const inputs = ['fonction1', 'fonction2', 'fonction3', 'fonction4', 'fonction5'];
        
        // Collecter toutes les fonctions valides
        inputs.forEach((id, index) => {
            const input = document.getElementById(id).value.trim();
            if (input) {
                const validation = validerExpression(input);
                if (validation.valide) {
                    try {
                        functions.push({
                            expr: math.parse(input),
                            input: input,
                            color: `hsl(${index * 72}, 70%, 50%)`
                        });
                    } catch (e) {
                        console.warn(`Fonction ${index + 1} ignorée: ${e.message}`);
                    }
                }
            }
        });
        
        if (functions.length === 0) {
            alert("Aucune fonction valide à tracer");
            return;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAxes();
        
        // Tracer chaque fonction
        functions.forEach(func => {
            ctx.strokeStyle = func.color;
            ctx.lineWidth = 2;
            
            ctx.beginPath();
            let first = true;
            for (let px = 0; px < canvas.width; px++) {
                const x = (px - offsetX) / scale;
                const y = func.expr.evaluate({x: x});
                if (!isNaN(y) && isFinite(y)) {
                    const py = offsetY - y * scale;
                    if (first) {
                        ctx.moveTo(px, py);
                        first = false;
                    } else {
                        ctx.lineTo(px, py);
                    }
                } else {
                    first = true;
                }
            }
            ctx.stroke();
        });
        
        // Afficher la légende
        displayLegend(functions);
        analyseMultipleFunctions(functions);
    }
    
    /**
     * Affiche une légende pour les fonctions tracées
     */
    function displayLegend(functions) {
        const legendDiv = document.getElementById('legend-div') || createLegendDiv();
        legendDiv.innerHTML = '<h4>🎨 Légende des fonctions :</h4>';
        
        functions.forEach((func, index) => {
            const legendItem = document.createElement('div');
            legendItem.style.cssText = `
                display: flex;
                align-items: center;
                margin: 5px 0;
                padding: 5px;
                background: #f8f9fa;
                border-radius: 4px;
            `;
            
            const colorBox = document.createElement('div');
            colorBox.style.cssText = `
                width: 20px;
                height: 20px;
                background: ${func.color};
                margin-right: 10px;
                border-radius: 3px;
            `;
            
            const label = document.createElement('span');
            label.textContent = `f${index + 1}(x) = ${func.input}`;
            
            legendItem.appendChild(colorBox);
            legendItem.appendChild(label);
            legendDiv.appendChild(legendItem);
        });
    }
    
    /**
     * Crée le div de légende s'il n'existe pas
     */
    function createLegendDiv() {
        const legendDiv = document.createElement('div');
        legendDiv.id = 'legend-div';
        legendDiv.style.cssText = `
            margin: 20px auto;
            max-width: 800px;
            padding: 15px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px #ddd;
        `;
        resultDiv.parentNode.insertBefore(legendDiv, resultDiv.nextSibling);
        return legendDiv;
    }
    
    /**
     * Analyse mathématique avancée de la fonction
     * @param {string} input - L'expression de la fonction
     */
    function analyseFunction(input) {
        let deriv, prim, zeros;
        
        try { 
            deriv = nerdamer(`diff(${input}, x)`).toString(); 
        } catch(e){ 
            deriv = "Erreur"; 
        }
        
        try { 
            prim = nerdamer(`integrate(${input}, x)`).toString(); 
        } catch(e){ 
            prim = "Erreur"; 
        }
        
        try { 
            zeros = nerdamer.solveEquations([`${input}=0`]).toString(); 
        } catch(e){ 
            zeros = "Erreur"; 
        }

        // Approximation des intervalles de monotonie
        let mono = [];
        try {
            const d = math.parse(deriv);
            let last = null;
            for (let X = -5; X <= 5; X += 0.5) {
                let val = d.evaluate({x: X});
                let sign = val > 0 ? '+' : (val < 0 ? '-' : '0');
                if (sign !== last) {
                    mono.push(`x≈${X}: dérivée ${sign}`);
                    last = sign;
                }
            }
        } catch(e){ 
            mono = ["Erreur"]; 
        }

        analyseDiv.innerHTML = `
            <div class="analyse-math-block">
                <h3>📊 Analyse mathématique avancée</h3>
                <div class="analyse-fonction">
                    <b>🎯 Fonction : f(x) = ${input}</b>
                    <ul>
                        <li><b>📐 Dérivée f'(x):</b> ${deriv}</li>
                        <li><b>📈 Primitive F(x):</b> ${prim}</li>
                        <li><b>🎯 Zéros de f(x):</b> ${zeros}</li>
                        <li><b>📊 Monotonie:</b> ${mono.join(', ')}</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    /**
     * Analyse mathématique pour plusieurs fonctions
     */
    function analyseMultipleFunctions(functions) {
        analyseDiv.innerHTML = `
            <div class="analyse-math-block">
                <h3>📊 Analyse mathématique - ${functions.length} fonction(s)</h3>
                ${functions.map((func, index) => `
                    <div class="analyse-fonction" style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                        <b>🎯 f${index + 1}(x) = ${func.input}</b>
                        <div style="color: ${func.color}; font-weight: bold;">● ${func.color}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    /**
     * Sauvegarde le graphique en PNG
     */
    function saveImage() {
        const link = document.createElement('a');
        link.download = 'graph-petitprof.png';
        link.href = canvas.toDataURL();
        link.click();
    }
    
    // Ajouter le bouton de sauvegarde
    const saveButton = document.createElement('button');
    saveButton.textContent = '💾 Sauvegarder le graphe';
    saveButton.style.cssText = `
        background: linear-gradient(90deg, #6366f1, #764ba2);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        margin: 10px;
        font-weight: 500;
    `;
    saveButton.onclick = saveImage;
    
    // Insérer le bouton après le formulaire
    const formContainer = form.parentNode;
    formContainer.appendChild(saveButton);
    
    // Gestionnaire de soumission du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (document.getElementById('fonction2').value.trim() || 
            document.getElementById('fonction3').value.trim() || 
            document.getElementById('fonction4').value.trim() || 
            document.getElementById('fonction5').value.trim()) {
            plotMultipleFunctions();
        } else {
            plotFunction();
        }
    });
    
    // Hover tooltip
    canvas.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left - offsetX) / scale;
        const y = f(x);
        if (!isNaN(y) && isFinite(y) && funcExpr) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawAxes();
            plotFunction();
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(e.clientX - rect.left, offsetY - y * scale, 4, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = "black";
            ctx.fillText(`x=${x.toFixed(2)}, y=${y.toFixed(2)}`, 10, 15);
        }
    });

    // Zoom avec molette
    canvas.addEventListener('wheel', e => {
        e.preventDefault();
        if (e.deltaY < 0) scale *= 1.1; else scale /= 1.1;
        if (funcExpr) plotFunction();
    });

    // Drag pour déplacement
    canvas.addEventListener('mousedown', e => { 
        dragging = true; 
        lastX = e.clientX; 
        lastY = e.clientY; 
    });
    
    canvas.addEventListener('mouseup', () => dragging = false);
    
    canvas.addEventListener('mousemove', e => {
        if (dragging) {
            offsetX += e.clientX - lastX;
            offsetY += e.clientY - lastY;
            lastX = e.clientX; 
            lastY = e.clientY;
            if (funcExpr) plotFunction();
        }
    });
    
    // Initialisation
    drawAxes();
    
    // Message d'information
    console.log('🧮 Calculatrice graphique avancée initialisée !');
    
    // Instructions d'utilisation
    analyseDiv.innerHTML = `
        <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px; margin: 20px 0;">
            <h3>🎯 Instructions d'utilisation</h3>
            <p><strong>1.</strong> Entrez votre fonction dans le champ (ex: x^3-3*x+1)</p>
            <p><strong>2.</strong> Cliquez sur "TRACER" pour afficher la courbe</p>
            <p><strong>3.</strong> Utilisez la molette pour zoomer/dézoomer</p>
            <p><strong>4.</strong> Cliquez et glissez pour déplacer la vue</p>
            <p><strong>5.</strong> Survolez la courbe pour voir les coordonnées</p>
            <p><strong>6.</strong> Cliquez sur "Sauvegarder" pour télécharger le graphique</p>
            <p><strong>7.</strong> Entrez plusieurs fonctions pour les comparer</p>
            <p><strong>8.</strong> Le quadrillage et les graduations s'adaptent au zoom</p>
        </div>
    `;
});