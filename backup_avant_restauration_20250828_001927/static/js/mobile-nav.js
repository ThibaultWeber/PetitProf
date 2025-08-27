// Navigation mobile simplifiée - Uniquement l'essentiel
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
    
    // Gestion du menu hamburger - SIMPLE
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
    
    // Fermer le menu en cliquant sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                console.log('🔗 Lien cliqué, fermeture du menu');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Gestion des dropdowns - SIMPLE
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        const dropdownLink = dropdown.querySelector('.nav-link');
        
        if (dropdownMenu && dropdownLink) {
            // Desktop : hover
            if (window.innerWidth > 768) {
                dropdown.addEventListener('mouseenter', function() {
                    dropdownMenu.style.display = 'block';
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    dropdownMenu.style.display = 'none';
                });
            }
            
            // Mobile : clic simple
            if (window.innerWidth <= 768) {
                dropdownLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('📱 Dropdown mobile cliqué');
                    
                    // Toggle simple
                    if (dropdownMenu.style.display === 'block') {
                        dropdownMenu.style.display = 'none';
                    } else {
                        dropdownMenu.style.display = 'block';
                    }
                });
            }
        }
    });
    
    // Gestion du redimensionnement - SIMPLE
    window.addEventListener('resize', function() {
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
    
    // Debug minimal
    console.log('🍔 Hamburger trouvé:', !!hamburger);
    console.log('📋 Menu trouvé:', !!navMenu);
    console.log('🔽 Dropdowns trouvés:', dropdowns.length);
});
