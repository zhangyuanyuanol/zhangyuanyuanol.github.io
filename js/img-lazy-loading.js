/*
 * name: images lazy loading
 * author: aps
 */

(function () {
    var images = (function (images) {
        for (var _images = document.images, len = _images.length, i = 0; i < len; i++) {
            var img = _images[i];
            if (img.getAttribute("data-original-src")) {
                images.push(img);
            }
            if (img.dataset) {
                var aspectRatio = img.dataset.aspectRatio;
            } else {
                var aspectRatio = img.getAttribute("data-aspect-ratio");
            }
            if (aspectRatio) {
                img.height = img.width / aspectRatio;
            }
        }
        return images;
    })([]);
    var clientHeight = document.documentElement.clientHeight;
    var loading = throttle(250, function () {
        var newImages = [];
        for (var i = 0, len = images.length; i < len; i++) {
            var img = images[i];
            var rect = img.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < (clientHeight + 25) || rect.top < 0 && rect.bottom > -25) {
                if (img.dataset) {
                    img.src = img.dataset.originalSrc;
                } else {
                    img.src = img.getAttribute("data-original-src");
                }
            } else {
                newImages.push(img);
            }
        }
        images = newImages;
    });
    if ("addEventListener" in window) {
        window.addEventListener("scroll", loading, false);
        window.addEventListener("touchmove", loading, false);
    } else {
        window.attachEvent("onscroll", loading);
    }
    loading();


    /*!
     * throttle function
     * jQuery throttle / debounce - v1.1 - 3/7/2010
     * http://benalman.com/projects/jquery-throttle-debounce-plugin/
     * 
     * Copyright (c) 2010 "Cowboy" Ben Alman
     * Dual licensed under the MIT and GPL licenses.
     * http://benalman.com/about/license/
     */
    function throttle( delay, no_trailing, callback, debounce_mode ) {
      var timeout_id,
        
        // Keep track of the last time `callback` was executed.
        last_exec = 0;
      
      // `no_trailing` defaults to falsy.
      if ( typeof no_trailing !== 'boolean' ) {
        debounce_mode = callback;
        callback = no_trailing;
        no_trailing = undefined;
      }
      
      // The `wrapper` function encapsulates all of the throttling / debouncing
      // functionality and when executed will limit the rate at which `callback`
      // is executed.
      function wrapper() {
        var that = this,
          elapsed = +new Date() - last_exec,
          args = arguments;
        
        // Execute `callback` and update the `last_exec` timestamp.
        function exec() {
          last_exec = +new Date();
          callback.apply( that, args );
        };
        
        // If `debounce_mode` is true (at_begin) this is used to clear the flag
        // to allow future `callback` executions.
        function clear() {
          timeout_id = undefined;
        };
        
        if ( debounce_mode && !timeout_id ) {
          // Since `wrapper` is being called for the first time and
          // `debounce_mode` is true (at_begin), execute `callback`.
          exec();
        }
        
        // Clear any existing timeout.
        timeout_id && clearTimeout( timeout_id );
        
        if ( debounce_mode === undefined && elapsed > delay ) {
          // In throttle mode, if `delay` time has been exceeded, execute
          // `callback`.
          exec();
          
        } else if ( no_trailing !== true ) {
          // In trailing throttle mode, since `delay` time has not been
          // exceeded, schedule `callback` to execute `delay` ms after most
          // recent execution.
          // 
          // If `debounce_mode` is true (at_begin), schedule `clear` to execute
          // after `delay` ms.
          // 
          // If `debounce_mode` is false (at end), schedule `callback` to
          // execute after `delay` ms.
          timeout_id = setTimeout( debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay );
        }
      };
      
      // Return the wrapper function.
      return wrapper;
    };
})();
