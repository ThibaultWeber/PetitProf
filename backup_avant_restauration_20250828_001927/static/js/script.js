// Script principal du site Petit Prof
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Site Petit Prof initialisé avec succès !');
    
    // Initialisation du lazy loading
    initLazyLoading();
    
    // Mesure du temps de chargement
    measureLoadTime();
    
    // Initialisation des formulaires
    initForms();
});

// ========================================
// LAZY LOADING DES IMAGES
// ========================================

function initLazyLoading() {
    // Vérifier si l'Intersection Observer est supporté
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                    observer.unobserve(img);
                }
            });
        });

        // Observer toutes les images avec data-src
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
        
        console.log(`Lazy loading activé pour ${lazyImages.length} images`);
    } else {
        // Fallback pour les navigateurs plus anciens
        loadAllImages();
    }
}

function loadImage(img) {
    if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    }
    
    // Ajouter une classe pour l'animation
    img.classList.add('loaded');
    
    // Gérer les erreurs de chargement
    img.onerror = function() {
        this.style.display = 'none';
        console.warn('Image non trouvée:', this.src);
    };
}

function loadAllImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        loadImage(img);
    });
}

// ========================================
// MESURE DES PERFORMANCES
// ========================================

function measureLoadTime() {
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('Temps de chargement:', loadTime / 1000, 'ms');
    }
}

// ========================================
// GESTION DES FORMULAIRES
// ========================================

function initForms() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validation basique
    if (!data.nom || !data.email || !data.sujet || !data.message) {
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    // Simulation d'envoi (remplacer par votre logique d'envoi)
    console.log('Formulaire soumis:', data);
    alert('Message envoyé avec succès !');
    e.target.reset();
}

// ========================================
// UTILITAIRES
// ========================================

// Fonction pour faire défiler en douceur vers une section
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Fonction pour ajouter des animations au scroll
function initScrollAnimations() {
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
    
    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialisation des animations au scroll
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
});
