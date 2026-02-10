// ==UserScript==
// @name         YouTube - Remove Recommendations from Video
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove recommended videos sidebar on watch pages
// @author       Leo
// @match        https://www.youtube.com/watch?v=*
// @match        https://youtube.com/watch?v=*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Remove recommended videos on watch pages
    function removeRecommendations() {
        // Remove the secondary column (recommendations sidebar)
        const secondary = document.querySelector('#secondary');
        if (secondary) {
            secondary.remove();
        }

        // Expand the primary video column to full width
        const primary = document.querySelector('#primary');
        if (primary) {
            primary.style.maxWidth = '100%';
            primary.style.width = '100%';
        }

        // Ensure columns container uses full width
        const columns = document.querySelector('#columns');
        if (columns) {
            columns.style.display = 'block';
        }
    }

    // Initial removal
    setTimeout(removeRecommendations, 1000);

    // Keep checking and removing
    setInterval(removeRecommendations, 1000);

    // Watch for DOM changes
    const observer = new MutationObserver(removeRecommendations);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();