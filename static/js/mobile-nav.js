/**
 * 🍔 NAVIGATION MOBILE - Petit Prof
 * Gestion complète du menu hamburger et des dropdowns
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Navigation mobile initialisée');
    
    // Éléments DOM
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    // Vérification des éléments
    if (!hamburger || !navMenu) {
        console.error('❌ Éléments de navigation mobile non trouvés');
        return;
    }
    
    console.log('🍔 Hamburger trouvé:', !!hamburger);
    console.log('📋 Menu trouvé:', !!navMenu);
    console.log('🔽 Dropdowns trouvés:', document.querySelectorAll('.dropdown').length);
    
    // Détection de la page d'accueil
    const isHomePage = window.location.pathname.includes('index.html') || 
                      window.location.pathname === '/' || 
                      window.location.pathname === '';
    
    console.log('🏠 Page d\'accueil:', isHomePage);
    
    // Gestion du menu hamburger
    hamburger.addEventListener('click', function() {
        console.log('🍔 Clic sur hamburger');
        
        // Toggle des classes
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Gestion mobile spécifique
        if (window.innerWidth <= 768) {
            navMenu.classList.toggle('mobile-active');
        }
        
        // Fermer les dropdowns si ouverts
        if (dropdown) {
            dropdown.classList.remove('active');
        }
    });
    
    // Gestion des liens de navigation (fermer le menu)
    document.querySelectorAll('.nav-link:not(.dropdown .nav-link)').forEach(link => {
        link.addEventListener('click', () => {
            console.log('🔗 Clic sur lien de navigation');
            closeMobileMenu();
        });
    });
    
    // Gestion des dropdowns
    if (dropdown && dropdownMenu) {
        const dropdownToggle = dropdown.querySelector('.nav-link');
        
        dropdownToggle.addEventListener('click', function(e) {
            console.log('🔽 Clic sur dropdown');
            
            // Sur mobile, toggle le dropdown
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                console.log('📱 Dropdown toggle sur mobile');
            }
            // Sur desktop, navigation normale
        });
        
        // Fermer le dropdown en cliquant sur les liens
        dropdownMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                console.log('🔗 Clic sur lien dropdown');
                closeMobileMenu();
                if (dropdown) dropdown.classList.remove('active');
            });
        });
    }
    
    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Gestion du redimensionnement de la fenêtre
    let resizeTimer;
    window.addEventListener('resize', function() {
        console.log('📱 Redimensionnement détecté:', window.innerWidth);
        
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                // Sur desktop, réinitialiser l'état mobile
                closeMobileMenu();
                if (dropdown) dropdown.classList.remove('active');
            }
        }, 250);
    });
    
    // Fonction de fermeture du menu mobile
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navMenu.classList.remove('mobile-active');
        console.log('🔒 Menu mobile fermé');
    }
    
    // Gestion des liens d'ancrage (page d'accueil uniquement)
    if (isHomePage) {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    console.log('🎯 Navigation vers:', this.getAttribute('href'));
                }
            });
        });
    }
    
    // Initialisation terminée
    console.log('✅ Navigation mobile initialisée avec succès');
});

// Gestion des erreurs
window.addEventListener('error', function(e) {
    console.error('❌ Erreur dans mobile-nav.js:', e.error);
});
