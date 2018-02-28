/*
 * jQuery(Zepto) Plug-in
 *    name: Simple Switch Tab
 * version: 0.0.3
 *  author: Zheng Chaoping 
 */

(function ($) {
    $.extend($.fn, {
        SimpleSwitchTab: function (evt, fn, live) {
            var nop = function () {};
            if ("function" === typeof evt) {
                fn = evt;
                evt = "click";
            }
            evt = (evt || "click").toString();
            fn = "function" === typeof fn ? fn : nop;

            var ACT = "st-active", PANEL = "st-panel-cls";

            var $tabs = $(this),
                panelCLS = $tabs.data(PANEL),
                $panel = $("." + panelCLS);
            $tabs.on(evt, function __(event) {
                if (live) {
                    $tabs.off(evt, __);
                    $tabs = $('[data-' + PANEL + '="' + panelCLS + '"]');
                    $panel = $("." + panelCLS);
                    $tabs.on(evt, __);
                }
                var idx = $tabs.index(this);
                $tabs.data(ACT, false), $(this).data(ACT, true);
                $($panel.hide().get(idx)).show();
                return fn.call(this, event, $tabs, $panel);
            }).filter('[data-' + ACT + '="true"]').trigger(evt);

            return this;
        }
    });
}($));
