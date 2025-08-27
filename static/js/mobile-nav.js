// Navigation mobile simplifiée et efficace
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Navigation mobile initialisée');
    
    // Éléments DOM
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (!hamburger || !navMenu) {
        console.error('❌ Éléments de navigation non trouvés');
        return;
    }
    
    // Gestion du menu hamburger
    hamburger.addEventListener('click', function() {
        console.log('🍔 Hamburger cliqué');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Empêcher le scroll du body quand le menu est ouvert
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Fermer le menu en cliquant sur un lien (sauf dropdown)
    document.querySelectorAll('.nav-link:not(.dropdown .nav-link)').forEach(link => {
        link.addEventListener('click', () => {
            console.log('🔗 Lien cliqué, fermeture du menu');
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Gestion des dropdowns
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        const dropdownLink = dropdown.querySelector('.nav-link');
        
        if (dropdownMenu && dropdownLink) {
            // Desktop : hover
            if (window.innerWidth > 768) {
                dropdown.addEventListener('mouseenter', function() {
                    dropdownMenu.style.display = 'block';
                    dropdown.classList.add('active');
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    dropdownMenu.style.display = 'none';
                    dropdown.classList.remove('active');
                });
            }
            
            // Mobile : clic
            if (window.innerWidth <= 768) {
                dropdownLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('📱 Dropdown mobile cliqué');
                    
                    // Fermer tous les autres dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                            const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                            if (otherMenu) {
                                otherMenu.style.display = 'none';
                            }
                        }
                    });
                    
                    // Toggle du dropdown actuel
                    dropdown.classList.toggle('active');
                    if (dropdown.classList.contains('active')) {
                        dropdownMenu.style.display = 'block';
                    } else {
                        dropdownMenu.style.display = 'none';
                    }
                });
            }
        }
    });
    
    // Gestion du redimensionnement
    window.addEventListener('resize', function() {
        console.log('📱 Redimensionnement détecté:', window.innerWidth);
        
        // Réinitialiser les états
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.style.display = 'none';
            }
        });
        
        // Fermer le menu mobile si on passe en desktop
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                console.log('🖱️ Clic à l\'extérieur, fermeture du menu');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Debug : afficher la taille de l'écran
    console.log('📱 Taille de l\'écran:', window.innerWidth, 'x', window.innerHeight);
    console.log('🍔 Hamburger trouvé:', !!hamburger);
    console.log('📋 Menu trouvé:', !!navMenu);
    console.log('🔽 Dropdowns trouvés:', dropdowns.length);
});
