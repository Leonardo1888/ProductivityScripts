// ==UserScript==
// @name         YouTube - Redirect to Subscription page when Home and Shorts are opened
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Redirect homepage and shorts to subscriptions feed
// @author       Leo
// @match        https://www.youtube.com/*
// @match        https://youtube.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    function checkAndRedirect() {
        const path = window.location.pathname;

        // Redirect homepage
        if (path === '/' || path === '') {
            window.location.replace('https://www.youtube.com/feed/subscriptions');
            return;
        }

        // Redirect shorts
        if (path.startsWith('/shorts/')) {
            window.location.replace('https://www.youtube.com/feed/subscriptions');
            return;
        }
    }

    // Run immediately
    checkAndRedirect();

    // Watch for URL changes (YouTube SPA)
    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            checkAndRedirect();
        }
    }).observe(document, {subtree: true, childList: true});

})();