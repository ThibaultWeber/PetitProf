// Script pour automatiser la mise à jour des ressources de cours
// Ce script peut être utilisé dans un navigateur pour mettre à jour automatiquement les liens

function updateResourceLinks() {
    // Sélectionner tous les anciens liens de ressources
    const oldLinks = document.querySelectorAll('.resource-link');
    
    oldLinks.forEach(link => {
        const parent = link.parentElement;
        const text = link.textContent.trim();
        const href = link.getAttribute('href');
        
        // Créer la nouvelle structure
        const newLink = document.createElement('a');
        newLink.href = href;
        newLink.className = 'resource-item';
        
        const iconDiv = document.createElement('div');
        iconDiv.className = 'resource-icon';
        
        const iconContent = document.createElement('div');
        const titleSpan = document.createElement('span');
        titleSpan.className = 'resource-title';
        titleSpan.textContent = text;
        
        // Déterminer le type d'icône basé sur le contenu
        if (text.toLowerCase().includes('exercice') && !text.toLowerCase().includes('correction')) {
            iconContent.className = 'exercise-icon';
            iconContent.innerHTML = '<i class="fas fa-tasks"></i>';
        } else if (text.toLowerCase().includes('correction')) {
            iconContent.className = 'correction-icon';
            iconContent.innerHTML = '<i class="fas fa-clipboard-check"></i>';
        } else if (text.toLowerCase().includes('résumé')) {
            iconContent.className = 'summary-icon';
            iconContent.innerHTML = '<i class="fas fa-file-alt"></i>';
        } else if (text.toLowerCase().includes('venir')) {
            iconContent.className = 'coming-soon-icon';
            iconContent.innerHTML = '<i class="fas fa-clock"></i>';
            newLink.classList.add('coming-soon');
        } else {
            // Par défaut : PDF
            iconContent.className = 'pdf-icon';
        }
        
        iconDiv.appendChild(iconContent);
        newLink.appendChild(iconDiv);
        newLink.appendChild(titleSpan);
        
        // Remplacer l'ancien lien
        parent.replaceChild(newLink, link);
    });
    
    console.log('Mise à jour terminée! Vous pouvez maintenant copier le HTML mis à jour.');
}

// Instructions d'utilisation :
console.log(`
Instructions pour utiliser ce script :
1. Ouvrez une page de cours dans votre navigateur
2. Ouvrez la console développeur (F12)
3. Copiez et collez ce script complet
4. Exécutez updateResourceLinks()
5. Copiez le HTML mis à jour depuis l'inspecteur
`);


