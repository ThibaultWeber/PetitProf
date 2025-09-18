/**
 * Gestionnaire de cookies sécurisés pour Petit Prof
 * Implémente les meilleures pratiques de sécurité pour les cookies
 */

class SecureCookieManager {
    constructor() {
        this.defaultOptions = {
            secure: true,           // Cookie uniquement via HTTPS
            httpOnly: false,        // Accessible via JavaScript (pour les préférences)
            sameSite: 'Strict',     // Protection CSRF
            path: '/',              // Disponible sur tout le site
            maxAge: 30 * 24 * 60 * 60 // 30 jours par défaut
        };
    }

    /**
     * Définit un cookie sécurisé
     * @param {string} name - Nom du cookie
     * @param {string} value - Valeur du cookie
     * @param {Object} options - Options de sécurité
     */
    setCookie(name, value, options = {}) {
        const cookieOptions = { ...this.defaultOptions, ...options };
        
        // Validation des options
        if (cookieOptions.secure && !this.isSecureContext()) {
            console.warn('Cookie sécurisé défini en contexte non-HTTPS');
        }

        let cookieString = `${name}=${encodeURIComponent(value)}`;
        
        // Ajout des options de sécurité
        if (cookieOptions.maxAge) {
            cookieString += `; Max-Age=${cookieOptions.maxAge}`;
        }
        
        if (cookieOptions.expires) {
            cookieString += `; Expires=${cookieOptions.expires.toUTCString()}`;
        }
        
        if (cookieOptions.path) {
            cookieString += `; Path=${cookieOptions.path}`;
        }
        
        if (cookieOptions.domain) {
            cookieString += `; Domain=${cookieOptions.domain}`;
        }
        
        if (cookieOptions.secure) {
            cookieString += `; Secure`;
        }
        
        if (cookieOptions.httpOnly) {
            cookieString += `; HttpOnly`;
        }
        
        if (cookieOptions.sameSite) {
            cookieString += `; SameSite=${cookieOptions.sameSite}`;
        }

        document.cookie = cookieString;
    }

    /**
     * Récupère un cookie
     * @param {string} name - Nom du cookie
     * @returns {string|null} - Valeur du cookie ou null
     */
    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }
        return null;
    }

    /**
     * Supprime un cookie
     * @param {string} name - Nom du cookie
     * @param {string} path - Chemin du cookie
     */
    deleteCookie(name, path = '/') {
        this.setCookie(name, '', {
            expires: new Date(0),
            path: path,
            secure: this.isSecureContext(),
            sameSite: 'Strict'
        });
    }

    /**
     * Vérifie si le contexte est sécurisé (HTTPS)
     * @returns {boolean}
     */
    isSecureContext() {
        return window.isSecureContext || location.protocol === 'https:';
    }

    /**
     * Définit les préférences utilisateur de manière sécurisée
     * @param {Object} preferences - Préférences à sauvegarder
     */
    setUserPreferences(preferences) {
        const preferencesString = JSON.stringify(preferences);
        this.setCookie('user_preferences', preferencesString, {
            maxAge: 365 * 24 * 60 * 60, // 1 an
            httpOnly: false, // Accessible via JavaScript
            secure: this.isSecureContext(),
            sameSite: 'Strict'
        });
    }

    /**
     * Récupère les préférences utilisateur
     * @returns {Object} - Préférences utilisateur
     */
    getUserPreferences() {
        const preferences = this.getCookie('user_preferences');
        if (preferences) {
            try {
                return JSON.parse(preferences);
            } catch (e) {
                console.error('Erreur lors du parsing des préférences:', e);
                return {};
            }
        }
        return {};
    }

    /**
     * Définit un cookie de session sécurisé
     * @param {string} sessionId - ID de session
     */
    setSessionCookie(sessionId) {
        this.setCookie('session_id', sessionId, {
            maxAge: 24 * 60 * 60, // 24 heures
            httpOnly: true, // Non accessible via JavaScript
            secure: this.isSecureContext(),
            sameSite: 'Strict'
        });
    }

    /**
     * Définit un cookie de consentement RGPD
     * @param {Object} consent - Consentement utilisateur
     */
    setConsentCookie(consent) {
        this.setCookie('consent', JSON.stringify(consent), {
            maxAge: 365 * 24 * 60 * 60, // 1 an
            httpOnly: false,
            secure: this.isSecureContext(),
            sameSite: 'Strict'
        });
    }

    /**
     * Récupère le consentement RGPD
     * @returns {Object|null} - Consentement ou null
     */
    getConsentCookie() {
        const consent = this.getCookie('consent');
        if (consent) {
            try {
                return JSON.parse(consent);
            } catch (e) {
                console.error('Erreur lors du parsing du consentement:', e);
                return null;
            }
        }
        return null;
    }

    /**
     * Nettoie tous les cookies non essentiels
     */
    clearNonEssentialCookies() {
        const essentialCookies = ['consent', 'user_preferences'];
        const allCookies = document.cookie.split(';');
        
        allCookies.forEach(cookie => {
            const cookieName = cookie.split('=')[0].trim();
            if (!essentialCookies.includes(cookieName)) {
                this.deleteCookie(cookieName);
            }
        });
    }
}

// Instance globale du gestionnaire de cookies
window.secureCookieManager = new SecureCookieManager();

// Initialisation des préférences par défaut
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier le consentement RGPD
    const consent = window.secureCookieManager.getConsentCookie();
    if (!consent) {
        // Afficher la bannière de consentement si nécessaire
        console.log('Consentement RGPD requis');
    }

    // Charger les préférences utilisateur
    const preferences = window.secureCookieManager.getUserPreferences();
    if (Object.keys(preferences).length === 0) {
        // Définir les préférences par défaut
        window.secureCookieManager.setUserPreferences({
            theme: 'light',
            language: 'fr',
            notifications: true
        });
    }
});

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SecureCookieManager;
}
