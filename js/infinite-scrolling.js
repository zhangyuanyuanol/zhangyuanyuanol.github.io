/*
 * version: 0.0.4
 *
 * infiniteScrolling(document.querySelector("ul"), function (el, done) {
 *     // 在此可通过 ajax 去获取分页的数据，然后可以把数据插入到 el 内（el 即是 document.querySelector("ul")）
 *     // 当插入数据完成后，如果不是最后一页，必须调用 done()。
 * }, 100); // 100 表示 ul 距离视口 100px 触发 callback 函数，此参数可以省略，如果省略，则距离 ul 的最后一个元素
 */

;(function (root, factory) {
    "use strict";
    if ("object" === typeof module && "object" === typeof module.exports) {
        module.exports = factory();
    } else if ("function" === typeof define && define.amd) {
        define(function () {
            return factory();
        });
    } else {
        factory(root);
    }
})("undefined" !== typeof window ? window : this, function (root) {
    if (root) {
        var $ = root.JQuery || root.Zepto;
        if ($) {
            $.fn.infiniteScrolling = function (callback, offset) {
                var el = this[0];
                if ("[object Object]" === ({}).toString.call(callback)) {
                    offset = callback.offset;
                    callback = callback.handler;
                }
                infiniteScrolling(el, callback, offset);
            };
        }
        root.infiniteScrolling = infiniteScrolling;
        return;
    }

    return infiniteScrolling;

    function infiniteScrolling(el, callback, offset) {
        if ("[object Object]" === ({}).toString.call(el)) {
            offset = el.offset;
            callback = el.handler;
            el = el.container;
        }

        if (!(el instanceof Element)) {
            throw "Error!";
        }
        if ("function" !== typeof callback) {
            callback = function (done) {
                done();
            };
        }
        if (offset instanceof Element) {
            offset = offset.offsetHeight || offset.clientHeight;
        }
        window.addEventListener("scroll", (function () {
            var tid, timestamp, TIMEOUT = 80;
            var ch = document.documentElement.clientHeight;

            var hold = false;

            var sTop = document.documentElement.scrollTop || document.body.scrollTop;

            var mh = offset || (el.lastElementChild ? (el.lastElementChild.offsetHeight || el.lastElementChild.clientHeight) : 0);

            return function throttle(evt) {
                var now = Date.now();

                clearTimeout(tid);

                if (!timestamp || now - timestamp >= TIMEOUT) {
                    timestamp = fn();
                } else {
                    tid = trail(fn, TIMEOUT - (now - timestamp));
                }

                function trail(fn, timeout) {
                    if (undefined === timeout) {
                        timeout = 1000 / 60;
                    }
                    return setTimeout(function () {
                        timestamp = fn();
                    }, timeout);
                }
                function fn() {
                    handler();
                    return Date.now();
                }
            };

            function handler() {
                if (hold) return;

                var dTop = document.documentElement.scrollTop || document.body.scrollTop;

                if ([sTop, sTop = dTop][0] >= dTop) {
                    return;
                }

                var rect = el.getBoundingClientRect();
                if (rect.bottom <= ch + mh && rect.bottom >= ch) {
                    hold = true;
                    callback(el, function () {
                        hold = false;
                    });
                }
            }
        }()), false);
    }
});

