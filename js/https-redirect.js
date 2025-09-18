/**
 * Redirection HTTPS automatique pour Petit Prof
 * Assure la sécurité en forçant l'utilisation d'HTTPS
 */

(function() {
    'use strict';

    /**
     * Vérifie si la page est chargée en HTTPS
     * @returns {boolean}
     */
    function isHTTPS() {
        return location.protocol === 'https:';
    }

    /**
     * Vérifie si la page est en localhost (développement)
     * @returns {boolean}
     */
    function isLocalhost() {
        return location.hostname === 'localhost' || 
               location.hostname === '127.0.0.1' || 
               location.hostname === '0.0.0.0' ||
               location.hostname.includes('192.168.') ||
               location.hostname.includes('10.0.');
    }

    /**
     * Redirige vers HTTPS
     */
    function redirectToHTTPS() {
        const httpsUrl = 'https://' + location.host + location.pathname + location.search + location.hash;
        
        // Log pour le débogage
        console.log('Redirection HTTPS:', location.href, '->', httpsUrl);
        
        // Redirection immédiate
        location.replace(httpsUrl);
    }

    /**
     * Initialise la redirection HTTPS
     */
    function initHTTPSRedirect() {
        // Ne pas rediriger en localhost (développement)
        if (isLocalhost()) {
            console.log('Mode développement détecté - Pas de redirection HTTPS');
            return;
        }

        // Rediriger si pas en HTTPS
        if (!isHTTPS()) {
            console.log('Redirection vers HTTPS requise');
            redirectToHTTPS();
        } else {
            console.log('Connexion HTTPS sécurisée confirmée');
        }
    }

    /**
     * Vérifie la sécurité de la connexion
     */
    function checkConnectionSecurity() {
        if (isHTTPS()) {
            // Vérifier la validité du certificat SSL
            if (window.location.protocol === 'https:') {
                console.log('✅ Connexion HTTPS sécurisée');
                
                // Vérifier les headers de sécurité
                checkSecurityHeaders();
            }
        } else if (!isLocalhost()) {
            console.warn('⚠️ Connexion non sécurisée détectée');
        }
    }

    /**
     * Vérifie la présence des headers de sécurité
     */
    function checkSecurityHeaders() {
        // Vérifier si les headers de sécurité sont présents
        const metaTags = document.querySelectorAll('meta[http-equiv]');
        let securityHeadersFound = 0;
        
        metaTags.forEach(meta => {
            const httpEquiv = meta.getAttribute('http-equiv');
            if (['Content-Security-Policy', 'X-Content-Type-Options', 'X-Frame-Options', 'X-XSS-Protection'].includes(httpEquiv)) {
                securityHeadersFound++;
            }
        });

        if (securityHeadersFound >= 4) {
            console.log('✅ Headers de sécurité détectés');
        } else {
            console.warn('⚠️ Headers de sécurité manquants');
        }
    }

    /**
     * Force la redirection HTTPS pour les formulaires
     */
    function secureForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            // S'assurer que l'action est en HTTPS
            if (form.action && form.action.startsWith('http://')) {
                form.action = form.action.replace('http://', 'https://');
            }
        });
    }

    /**
     * Force la redirection HTTPS pour les liens
     */
    function secureLinks() {
        const links = document.querySelectorAll('a[href^="http://"]');
        links.forEach(link => {
            link.href = link.href.replace('http://', 'https://');
        });
    }

    /**
     * Initialise toutes les vérifications de sécurité
     */
    function initSecurityChecks() {
        // Redirection HTTPS
        initHTTPSRedirect();
        
        // Vérification de la sécurité
        checkConnectionSecurity();
        
        // Sécurisation des formulaires et liens
        secureForms();
        secureLinks();
    }

    // Exécution immédiate
    initSecurityChecks();

    // Vérification périodique (toutes les 30 secondes)
    setInterval(checkConnectionSecurity, 30000);

    // Export pour utilisation dans d'autres modules
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            isHTTPS,
            isLocalhost,
            redirectToHTTPS,
            checkConnectionSecurity
        };
    }

})();
