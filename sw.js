/**
 * SERVICE WORKER - PETIT PROF
 * Cache intelligent et gestion offline
 * Version: 1.0.0
 */

const CACHE_NAME = 'petit-prof-v1.0.0';
const STATIC_CACHE = 'petit-prof-static-v1.0.0';
const DYNAMIC_CACHE = 'petit-prof-dynamic-v1.0.0';
const IMAGES_CACHE = 'petit-prof-images-v1.0.0';

// Ressources critiques à mettre en cache immédiatement
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/youtube-page.html',
    '/contact-page.html',
    '/cours-particuliers-page.html',
    '/cours-en-ligne-page.html',
    '/css/base.css',
    '/css/responsive.css',
    '/css/course-pages.css',
    '/css/mobile-nav-improvements.css',
    '/css/youtube-page.css',
    '/css/contact.css',
    '/css/cours-particuliers.css',
    '/js/script.js',
    '/js/mobile-nav.js',
    '/js/pyodide-service.js',
    '/images/hero-maths.avif',
    '/images/chimie.webp',
    '/images/groupe.webp',
    '/images/petitprof.webp',
    '/images/contact1.webp',
    '/images/robot.webp',
    '/images/enseignant.webp',
    '/images/equations.webp',
    '/images/labo1.webp',
    '/images/labo2.webp',
    '/images/meca.webp',
    '/images/energie.webp'
];

// Ressources dynamiques (pages de cours)
const DYNAMIC_PATTERNS = [
    /^\/.*\.html$/,
    /^\/css\/.*\.css$/,
    /^\/js\/.*\.js$/
];

// Images et médias
const IMAGE_PATTERNS = [
    /^\/images\/.*\.(webp|avif|jpg|jpeg|png|svg)$/,
    /^\/documents\/.*\.pdf$/
];

/**
 * Installation du Service Worker
 */
self.addEventListener('install', event => {
    console.log('🔧 Service Worker: Installation en cours...');
    
    event.waitUntil(
        Promise.all([
            // Cache des ressources statiques
            caches.open(STATIC_CACHE).then(cache => {
                console.log('📦 Cache statique: Mise en cache des ressources critiques');
                return cache.addAll(STATIC_ASSETS);
            }),
            // Cache des images
            caches.open(IMAGES_CACHE).then(cache => {
                console.log('🖼️ Cache images: Préparation du cache des images');
                return Promise.resolve();
            }),
            // Cache dynamique
            caches.open(DYNAMIC_CACHE).then(cache => {
                console.log('🔄 Cache dynamique: Préparation du cache des pages');
                return Promise.resolve();
            })
        ]).then(() => {
            console.log('✅ Service Worker: Installation terminée');
            // Prendre le contrôle immédiatement
            return self.skipWaiting();
        })
    );
});

/**
 * Activation du Service Worker
 */
self.addEventListener('activate', event => {
    console.log('🚀 Service Worker: Activation en cours...');
    
    event.waitUntil(
        Promise.all([
            // Nettoyer les anciens caches
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && 
                            cacheName !== DYNAMIC_CACHE && 
                            cacheName !== IMAGES_CACHE) {
                            console.log('🗑️ Suppression ancien cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            // Prendre le contrôle de tous les clients
            self.clients.claim()
        ]).then(() => {
            console.log('✅ Service Worker: Activation terminée');
        })
    );
});

/**
 * Interception des requêtes
 */
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Ignorer les requêtes non-HTTP
    if (!request.url.startsWith('http')) {
        return;
    }
    
    // Stratégie selon le type de ressource
    if (isStaticAsset(request.url)) {
        event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
    } else if (isImageAsset(request.url)) {
        event.respondWith(cacheFirstStrategy(request, IMAGES_CACHE));
    } else if (isDynamicAsset(request.url)) {
        event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE));
    } else {
        event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE));
    }
});

/**
 * Stratégie Cache First (pour les ressources statiques)
 */
async function cacheFirstStrategy(request, cacheName) {
    try {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            console.log('📦 Cache hit:', request.url);
            return cachedResponse;
        }
        
        console.log('🌐 Cache miss, récupération réseau:', request.url);
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('❌ Erreur cache first:', error);
        return new Response('Ressource non disponible', { status: 404 });
    }
}

/**
 * Stratégie Network First (pour les pages dynamiques)
 */
async function networkFirstStrategy(request, cacheName) {
    try {
        console.log('🌐 Tentative réseau:', request.url);
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
            console.log('✅ Mise en cache:', request.url);
        }
        
        return networkResponse;
    } catch (error) {
        console.log('📦 Réseau indisponible, recherche en cache:', request.url);
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            console.log('✅ Trouvé en cache:', request.url);
            return cachedResponse;
        }
        
        // Page de fallback pour les pages HTML
        if (request.destination === 'document') {
            return caches.match('/index.html');
        }
        
        console.error('❌ Ressource non trouvée:', request.url);
        return new Response('Ressource non disponible', { status: 404 });
    }
}

/**
 * Vérifier si c'est une ressource statique
 */
function isStaticAsset(url) {
    return STATIC_ASSETS.includes(new URL(url).pathname) ||
           url.includes('/css/') ||
           url.includes('/js/') ||
           url.includes('/fonts/');
}

/**
 * Vérifier si c'est une image
 */
function isImageAsset(url) {
    return IMAGE_PATTERNS.some(pattern => pattern.test(url));
}

/**
 * Vérifier si c'est une ressource dynamique
 */
function isDynamicAsset(url) {
    return DYNAMIC_PATTERNS.some(pattern => pattern.test(url));
}

/**
 * Gestion des messages du client
 */
self.addEventListener('message', event => {
    const { action, data } = event.data;
    
    switch (action) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
            
        case 'CACHE_URLS':
            cacheUrls(data.urls);
            break;
            
        case 'CLEAR_CACHE':
            clearAllCaches();
            break;
            
        case 'GET_CACHE_STATUS':
            getCacheStatus().then(status => {
                event.ports[0].postMessage({ action: 'CACHE_STATUS', data: status });
            });
            break;
    }
});

/**
 * Mettre en cache des URLs spécifiques
 */
async function cacheUrls(urls) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const promises = urls.map(url => 
        fetch(url).then(response => {
            if (response.ok) {
                cache.put(url, response);
                console.log('✅ URL mise en cache:', url);
            }
        }).catch(error => {
            console.error('❌ Erreur cache URL:', url, error);
        })
    );
    
    await Promise.all(promises);
}

/**
 * Vider tous les caches
 */
async function clearAllCaches() {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('🗑️ Tous les caches vidés');
}

/**
 * Obtenir le statut des caches
 */
async function getCacheStatus() {
    const cacheNames = await caches.keys();
    const status = {};
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        status[cacheName] = keys.length;
    }
    
    return status;
}

/**
 * Gestion des notifications push (pour futures fonctionnalités)
 */
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/images/petitprof.webp',
            badge: '/images/petitprof.webp',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            }
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

/**
 * Gestion des clics sur les notifications
 */
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});

console.log('🔧 Service Worker: Script chargé');
