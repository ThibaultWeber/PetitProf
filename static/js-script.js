/**
 * 🚀 SCRIPT PRINCIPAL - Petit Prof
 * Fonctionnalités générales du site (sans navigation mobile)
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Site Petit Prof initialisé avec succès !');
    
    // Initialisation des animations de scroll
    initScrollAnimations();
    
    // Initialisation du lazy loading
    initLazyLoading();
    
    // Initialisation des formulaires
    initForms();
    
    // Mesure du temps de chargement
    measureLoadTime();
    
    // Initialisation terminée
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

/**
 * 🎬 Animations au scroll
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    document.querySelectorAll('.section-card, .niveau-card, .video-card').forEach(el => {
        observer.observe(el);
    });
}

/**
 * 🖼️ Lazy loading des images
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.classList.add('lazy-image');
            imageObserver.observe(img);
        });
        
        console.log(`Lazy loading activé pour ${lazyImages.length} images`);
    } else {
        console.log('Intersection Observer non supporté, fallback au lazy loading natif');
    }
}

/**
 * 📝 Gestion des formulaires
 */
function initForms() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

/**
 * 📧 Gestion du formulaire de contact
 */
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const nom = formData.get('nom');
    const email = formData.get('email');
    const sujet = formData.get('sujet');
    const message = formData.get('message');
    
    // Validation
    if (!nom || !email || !sujet || !message) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Veuillez entrer une adresse email valide', 'error');
        return;
    }
    
    // Simulation d'envoi
    showNotification('Envoi en cours...', 'info');
    setTimeout(() => {
        showNotification('Message envoyé avec succès !', 'success');
        this.reset();
    }, 2000);
}

/**
 * 📧 Validation d'email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * 🔔 Affichage des notifications
 */
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Créer la nouvelle notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'apparition
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-suppression
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Bouton de fermeture
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

/**
 * 📊 Mesure du temps de chargement
 */
function measureLoadTime() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('Temps de chargement:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                }
            }, 0);
        });
    }
}

/**
 * 🎯 Navigation fluide vers les ancres
 */
function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

/**
 * 🎨 Gestion de la navigation au clavier
 */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

/**
 * 🚀 Gestion des erreurs globales
 */
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    showNotification('Une erreur est survenue. Veuillez rafraîchir la page.', 'error');
});

/**
 * 📈 Compteurs animés
 */
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

/**
 * 🔝 Bouton retour en haut
 */
function initBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.title = 'Retour en haut';
    
    document.body.appendChild(backToTopButton);
    
    // Affichage/masquage
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Clic
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialisation du bouton retour en haut
initBackToTop();
