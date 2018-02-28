(function (window, undefined) {

"use strict";

var GFC = {
    isArray: function (arr) {
        return Array.isArray ? Array.isArray(arr) : ("[object Array]" === {}.toString.call(arr));
    },
    isEmpty: function (obj) {
        for (var name in obj) {
            if (obj.hasOwnProperty(name)) return false;
        }
        return true;
    },
    filter: function (arr, obj) {
        if (!this.isArray(arr)) {
            return [];
        }
        if (this.isEmpty(obj)) {
            return arr.slice(0);
        }
        var new_arr = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            var item = arr[i], isMatch = true;
            for (var key in obj) {
                if (!obj.hasOwnProperty(key)) continue;
                if (!item.hasOwnProperty(key) || (obj[key] !== item[key])) {
                    isMatch = false;
                    break;
                }
            }
            if (isMatch) {
                new_arr.push(item);
            }
        }
        return new_arr;
    },
    groupBy: function (arr, name) {
        if (!this.isArray(arr)) {
            return {};
        }

        var obj = {};
        for (var i = 0, len = arr.length; i < len; i++) {
            var _obj = arr[i], tmp = {};
            for (var key in _obj) {
                if (!_obj.hasOwnProperty(key)) continue;
                var value = _obj[key];
                if (name === key) {
                    obj.hasOwnProperty(value) || (obj[value] = []);
                    obj[value].push(tmp);
                } else {
                    tmp[key] = value;
                }
            }
        }
        return obj;
    },
    pluck: function (arr, name) {

    },
    keys: function (obj) {
        var arr = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                arr.push(key);
            }
        }
        return arr;
    }
};


function SKUSelector(data, config, views) {
    if (!(this instanceof SKUSelector)) {
        return new SKUSelector(data, config);
    }

    this.data = GFC.isArray(data) ? data : [];
    this.properties = {};

    this.config = $.extend({
        cls_disabled: "feature-disabled",
        cls_enabled: "feature-enabled",
        cls_selected: "feature-selected",
        dataset_anchor_name: "anchor-name",
        dataset_value: "value",
        evt_change: "feature-change",
        evt_click: "click"
    }, config);

    var self = this;
    this["$elems"] = $("[data-" + self.config.dataset_anchor_name + "]").each(function (idx, el) {
        var name = $(el).data(self.config.dataset_anchor_name);
        var keys = GFC.keys(GFC.groupBy(self.data, name));
        if (Object.prototype.hasOwnProperty.call(views, name)) {
            "function" === typeof views[name] && views[name].call(self, el, keys);
        }
    });
}
SKUSelector.prototype.fn = function (target) {
    var self = this;
    $(target).on(self.config.evt_click, function (evt) {
        self.handler(evt);
    }).on(self.config.evt_change, function (evt, detail) {
        self.change(evt, detail);
    });
};
SKUSelector.prototype.handler = function (evt) {
    var config = this.config;
    var $el = $(evt.target).closest("[data-" + config.dataset_value + "]"),
        el = $el[0];
    var value = $el.data(config.dataset_value);
    if (!value) return;
    if ($el.hasClass(config.cls_disabled)) return;

    var $parent = $el.closest("[data-" + config.dataset_anchor_name + "]");
    var $elems = $parent.find("[data-" + config.dataset_value + "]");
    $elems.each(function (idx, _el) {
        var $_el = $(_el);
        if (_el === el) {
            $_el.toggleClass(config.cls_selected);
        } else {
            $_el.removeClass(config.cls_selected);
        }
    });
    var type = $parent.data(config.dataset_anchor_name);

    var property = null;
    if ($el.hasClass(config.cls_selected)) {
        this.properties[type] = value;
        property = {};
        property[type] = value;
    } else {
        delete this.properties[type];
    }

    this.dispatch({
        target: $parent[0],
        property: property
    });
};
SKUSelector.prototype.change = function (evt, detail) {
    var self = this;
    var config = this.config;

    var el = evt.target, $el = $(el);

    var type = $el.data(config.dataset_anchor_name);

    var properties = $.extend({}, this.properties);
    delete properties[type];
    
    var obj = GFC.groupBy(GFC.filter(self.data, properties), type);

    var $elems = $el.find("[data-" + config.dataset_value + "]");

    $elems.each(function (idx, _el) {
        var $_el = $(_el);
        if (obj.hasOwnProperty($_el.data(config.dataset_value))) {
            $_el.removeClass(config.cls_disabled);
        } else {
            $_el.addClass(config.cls_disabled);
        }
    });
};
SKUSelector.prototype.dispatch = function (obj) {
    var self = this;
    self["$elems"].each(function (idx, el) {
        if (el !== obj.target) {
            $(el).trigger(self.config.evt_change, {
                property: obj.property
            });
        }
    });
};

    SKUSelector.prototype.GFC = GFC;
    window.SKUSelector = SKUSelector;
})(window);
