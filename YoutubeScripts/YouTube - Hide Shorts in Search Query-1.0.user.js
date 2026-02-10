// ==UserScript==
// @name         YouTube - Hide Shorts in Search Query
// @version      1.0
// @description  Hide short videos from search results
// @author       Leo
// @match        https://www.youtube.com/results?search_query=*
// @match        https://youtube.com/results?search_query=*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    function hideShorts() {
        // Remove grid-shelf-view-model (main shorts container)
        document.querySelectorAll('grid-shelf-view-model').forEach(el => {
            el.remove();
        });

        // Remove ytd-reel-shelf-renderer
        document.querySelectorAll('ytd-reel-shelf-renderer').forEach(el => {
            el.remove();
        });

        // Remove ytd-reel-item-renderer
        document.querySelectorAll('ytd-reel-item-renderer').forEach(el => {
            el.remove();
        });

        // Remove video renderers that link to shorts
        document.querySelectorAll('ytd-video-renderer').forEach(video => {
            const link = video.querySelector('a#thumbnail');
            if (link && link.href && link.href.includes('/shorts/')) {
                video.remove();
            }
        });

        // Remove by shorts badge
        document.querySelectorAll('ytd-video-renderer').forEach(video => {
            const badge = video.querySelector('span[aria-label*="Shorts"], span[aria-label*="SHORT"]');
            if (badge) {
                video.remove();
            }
        });

        // Remove rich-item-renderer with shorts
        document.querySelectorAll('ytd-rich-item-renderer').forEach(item => {
            const link = item.querySelector('a');
            if (link && link.href && link.href.includes('/shorts/')) {
                item.remove();
            }
        });
    }

    // Run immediately
    hideShorts();

    // Run after delays
    setTimeout(hideShorts, 500);
    setTimeout(hideShorts, 1000);
    setTimeout(hideShorts, 2000);

    // Keep checking
    setInterval(hideShorts, 1000);

    // Watch for new content
    const observer = new MutationObserver(hideShorts);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();