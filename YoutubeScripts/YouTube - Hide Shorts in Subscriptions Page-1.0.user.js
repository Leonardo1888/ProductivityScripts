// ==UserScript==
// @name         YouTube - Hide Shorts in Subscriptions Page
// @version      1.0
// @description  Hide short videos from subscriptions feed
// @author       Leo
// @match        https://www.youtube.com/feed/subscriptions
// @match        https://youtube.com/feed/subscriptions
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    function hideShorts() {
        // Remove ytd-rich-shelf-renderer (shorts shelf container)
        document.querySelectorAll('ytd-rich-shelf-renderer').forEach(shelf => {
            // Check if it contains shorts
            const title = shelf.querySelector('#title-container, #shelf-title');
            if (title && title.textContent.toLowerCase().includes('short')) {
                shelf.remove();
            }
        });

        // Remove ytd-reel-shelf-renderer
        document.querySelectorAll('ytd-reel-shelf-renderer').forEach(el => {
            el.remove();
        });

        // Remove grid-shelf-view-model
        document.querySelectorAll('grid-shelf-view-model').forEach(el => {
            el.remove();
        });

        // Remove individual shorts in rich-item-renderer
        document.querySelectorAll('ytd-rich-item-renderer').forEach(item => {
            const link = item.querySelector('a');
            if (link && link.href && link.href.includes('/shorts/')) {
                item.remove();
            }
        });

        // Remove ytd-reel-item-renderer
        document.querySelectorAll('ytd-reel-item-renderer').forEach(el => {
            el.remove();
        });

        // Remove video-renderer with shorts links
        document.querySelectorAll('ytd-video-renderer').forEach(video => {
            const link = video.querySelector('a#thumbnail');
            if (link && link.href && link.href.includes('/shorts/')) {
                video.remove();
            }
        });
    }

    // Run immediately
    hideShorts();

    // Run after delays
    setTimeout(hideShorts, 500);
    setTimeout(hideShorts, 1000);
    setTimeout(hideShorts, 2000);

    // Keep checking every 2 seconds
    setInterval(hideShorts, 2000);

    // Watch for new content
    const observer = new MutationObserver(hideShorts);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();