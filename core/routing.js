// ====================================================================
// ROUTING CLIENT-SIDE POUR GITHUB PAGES
// ====================================================================
// Ce fichier gère le routage côté client car GitHub Pages ne peut pas
// exécuter de routage serveur (pas de Worker).

(function() {
    'use strict';

    // Vérifier si on est sur la racine et si le site est déjà installé
    async function checkAndRoute() {
        const pathname = window.location.pathname;
        
        // Si on est à la racine (/) ou /index.html
        if (pathname === '/' || pathname === '/index.html') {
            try {
                // Vérifier si config.json existe (site installé)
                const configRes = await fetch('/config.json');
                if (configRes.ok) {
                    const config = await configRes.json();
                    // Si backendUrl existe, le site est installé
                    if (config.backendUrl) {
                        // Rediriger vers frontend/index.html
                        window.location.href = '/frontend/index.html';
                        return;
                    }
                }
            } catch (e) {
                // Si config.json n'existe pas, c'est normal (installation non terminée)
                // On reste sur index.html (formulaire d'installation)
                console.log('Site not installed yet, showing installation form');
            }
        }
    }

    // Exécuter au chargement
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAndRoute);
    } else {
        checkAndRoute();
    }
})();

