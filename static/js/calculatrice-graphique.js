/**
 * Calculatrice Graphique Avancée - Petit Prof
 * Version 100% frontend avec bibliothèques mathématiques avancées
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
     * Dessine les axes du graphique
     */
    function drawAxes() {
        ctx.strokeStyle = "#888";
        ctx.lineWidth = 1;
        
        // Axe X
        ctx.beginPath();
        ctx.moveTo(0, offsetY);
        ctx.lineTo(canvas.width, offsetY);
        ctx.stroke();
        
        // Axe Y
        ctx.beginPath();
        ctx.moveTo(offsetX, 0);
        ctx.lineTo(offsetX, canvas.height);
        ctx.stroke();
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
     * Trace la fonction sur le canvas
     */
    function plotFunction() {
        const input = document.getElementById('fonction1').value;
        if (!input.trim()) {
            alert("Veuillez entrer une fonction");
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
        plotFunction();
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
        </div>
    `;
});