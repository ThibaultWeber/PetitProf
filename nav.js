// Script de navigation partagé
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu hamburger mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fermer le menu en cliquant sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Gestion du menu déroulant - Version améliorée pour mobile et desktop
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        const dropdownLink = dropdown.querySelector('.nav-link');
        
        if (dropdownMenu && dropdownLink) {
            // Gestion desktop avec hover
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
            
            // Gestion mobile avec clic
            if (window.innerWidth <= 768) {
                dropdownLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
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

    // Gestion du redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        // Réinitialiser les dropdowns lors du redimensionnement
        dropdowns.forEach(dropdown => {
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdown.classList.remove('active');
                dropdownMenu.style.display = 'none';
            }
        });
        
        // Fermer le menu mobile si on passe en desktop
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Navigation sticky au scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        });
    }

    // Animation des éléments au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observer les éléments avec la classe 'animate-on-scroll'
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Gestion des liens d'exercices et projets
    const exerciseLinks = document.querySelectorAll('.exercise-link, .project-link');
    exerciseLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Simulation d'ouverture d'exercice/projet
            alert('Fonctionnalité en cours de développement');
        });
    });

    // Gestion des liens de devoirs
    const assignmentLinks = document.querySelectorAll('.assignment-link');
    assignmentLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Simulation d'ouverture de devoir
            alert('Fonctionnalité en cours de développement');
        });
    });

    // Gestion des liens de ressources
    const resourceLinks = document.querySelectorAll('.resource-link');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Simulation d'ouverture de ressource
            alert('Fonctionnalité en cours de développement');
        });
    });
});
