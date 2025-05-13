/* @license GNU-GPL-2.0-or-later https://git.drupalcode.org/project/once/-/raw/v1.0.1/LICENSE.md */
/*! @drupal/once - v1.0.1 - 2021-06-12 */
var once = function() {
    "use strict";
    var n = /[\11\12\14\15\40]+/,
        e = "data-once",
        t = document;

    function r(n, t, r) {
        return n[t + "Attribute"](e, r)
    }

    function o(e) {
        if ("string" != typeof e) throw new TypeError("once ID must be a string");
        if ("" === e || n.test(e)) throw new RangeError("once ID must not be empty or contain spaces");
        return '[data-once~="' + e + '"]'
    }

    function u(n) {
        if (!(n instanceof Element)) throw new TypeError("The element must be an instance of Element");
        return !0
    }

    function i(n, e) {
        void 0 === e && (e = t);
        var r = n;
        if (null === n) r = [];
        else {
            if (!n) throw new TypeError("Selector must not be empty");
            "string" != typeof n || e !== t && !u(e) ? n instanceof Element && (r = [n]) : r = e.querySelectorAll(n)
        }
        return Array.prototype.slice.call(r)
    }

    function c(n, e, t) {
        return e.filter((function(e) {
            var r = u(e) && e.matches(n);
            return r && t && t(e), r
        }))
    }

    function f(e, t) {
        var o = t.add,
            u = t.remove,
            i = [];
        r(e, "has") && r(e, "get").trim().split(n).forEach((function(n) {
            i.indexOf(n) < 0 && n !== u && i.push(n)
        })), o && i.push(o);
        var c = i.join(" ");
        r(e, "" === c ? "remove" : "set", c)
    }

    function a(n, e, t) {
        return c(":not(" + o(n) + ")", i(e, t), (function(e) {
            return f(e, {
                add: n
            })
        }))
    }
    return a.remove = function(n, e, t) {
        return c(o(n), i(e, t), (function(e) {
            return f(e, {
                remove: n
            })
        }))
    }, a.filter = function(n, e, t) {
        return c(o(n), i(e, t))
    }, a.find = function(n, e) {
        return i(n ? o(n) : "[data-once]", e)
    }, a
}();

;
/* @license GNU-GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function() {
    const settingsElement = document.querySelector('head > script[type="application/json"][data-drupal-selector="drupal-settings-json"], body > script[type="application/json"][data-drupal-selector="drupal-settings-json"]');
    window.drupalSettings = {};
    if (settingsElement !== null) window.drupalSettings = JSON.parse(settingsElement.textContent);
})();;
window.Drupal = {
    behaviors: {},
    locale: {}
};
(function(Drupal, drupalSettings, drupalTranslations, console, Proxy, Reflect) {
    Drupal.throwError = function(error) {
        setTimeout(() => {
            throw error;
        }, 0);
    };
    Drupal.attachBehaviors = function(context, settings) {
        context = context || document;
        settings = settings || drupalSettings;
        const behaviors = Drupal.behaviors;
        Object.keys(behaviors || {}).forEach((i) => {
            if (typeof behaviors[i].attach === 'function') try {
                behaviors[i].attach(context, settings);
            } catch (e) {
                Drupal.throwError(e);
            }
        });
    };
    Drupal.detachBehaviors = function(context, settings, trigger) {
        context = context || document;
        settings = settings || drupalSettings;
        trigger = trigger || 'unload';
        const behaviors = Drupal.behaviors;
        Object.keys(behaviors || {}).forEach((i) => {
            if (typeof behaviors[i].detach === 'function') try {
                behaviors[i].detach(context, settings, trigger);
            } catch (e) {
                Drupal.throwError(e);
            }
        });
    };
    Drupal.checkPlain = function(str) {
        str = str.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        return str;
    };
    Drupal.formatString = function(str, args) {
        const processedArgs = {};
        Object.keys(args || {}).forEach((key) => {
            switch (key.charAt(0)) {
                case '@':
                    processedArgs[key] = Drupal.checkPlain(args[key]);
                    break;
                case '!':
                    processedArgs[key] = args[key];
                    break;
                default:
                    processedArgs[key] = Drupal.theme('placeholder', args[key]);
                    break;
            }
        });
        return Drupal.stringReplace(str, processedArgs, null);
    };
    Drupal.stringReplace = function(str, args, keys) {
        if (str.length === 0) return str;
        if (!Array.isArray(keys)) {
            keys = Object.keys(args || {});
            keys.sort((a, b) => a.length - b.length);
        }
        if (keys.length === 0) return str;
        const key = keys.pop();
        const fragments = str.split(key);
        if (keys.length) {
            for (let i = 0; i < fragments.length; i++) fragments[i] = Drupal.stringReplace(fragments[i], args, keys.slice(0));
        }
        return fragments.join(args[key]);
    };
    Drupal.t = function(str, args, options) {
        options = options || {};
        options.context = options.context || '';
        if (typeof drupalTranslations !== 'undefined' && drupalTranslations.strings && drupalTranslations.strings[options.context] && drupalTranslations.strings[options.context][str]) str = drupalTranslations.strings[options.context][str];
        if (args) str = Drupal.formatString(str, args);
        return str;
    };
    Drupal.url = function(path) {
        return drupalSettings.path.baseUrl + drupalSettings.path.pathPrefix + path;
    };
    Drupal.url.toAbsolute = function(url) {
        const urlParsingNode = document.createElement('a');
        try {
            url = decodeURIComponent(url);
        } catch (e) {}
        urlParsingNode.setAttribute('href', url);
        return urlParsingNode.cloneNode(false).href;
    };
    Drupal.url.isLocal = function(url) {
        let absoluteUrl = Drupal.url.toAbsolute(url);
        let {
            protocol
        } = window.location;
        if (protocol === 'http:' && absoluteUrl.indexOf('https:') === 0) protocol = 'https:';
        let baseUrl = `${protocol}//${window.location.host}${drupalSettings.path.baseUrl.slice(0,-1)}`;
        try {
            absoluteUrl = decodeURIComponent(absoluteUrl);
        } catch (e) {}
        try {
            baseUrl = decodeURIComponent(baseUrl);
        } catch (e) {}
        return absoluteUrl === baseUrl || absoluteUrl.indexOf(`${baseUrl}/`) === 0;
    };
    Drupal.formatPlural = function(count, singular, plural, args, options) {
        args = args || {};
        args['@count'] = count;
        const pluralDelimiter = drupalSettings.pluralDelimiter;
        const translations = Drupal.t(singular + pluralDelimiter + plural, args, options).split(pluralDelimiter);
        let index = 0;
        if (typeof drupalTranslations !== 'undefined' && drupalTranslations.pluralFormula) index = count in drupalTranslations.pluralFormula ? drupalTranslations.pluralFormula[count] : drupalTranslations.pluralFormula.default;
        else {
            if (args['@count'] !== 1) index = 1;
        }
        return translations[index];
    };
    Drupal.encodePath = function(item) {
        return window.encodeURIComponent(item).replace(/%2F/g, '/');
    };
    Drupal.deprecationError = ({
        message
    }) => {
        if (drupalSettings.suppressDeprecationErrors === false && typeof console !== 'undefined' && console.warn) console.warn(`[Deprecation] ${message}`);
    };
    Drupal.deprecatedProperty = ({
        target,
        deprecatedProperty,
        message
    }) => {
        if (!Proxy || !Reflect) return target;
        return new Proxy(target, {
            get: (target, key, ...rest) => {
                if (key === deprecatedProperty) Drupal.deprecationError({
                    message
                });
                return Reflect.get(target, key, ...rest);
            }
        });
    };
    Drupal.theme = function(func, ...args) {
        if (func in Drupal.theme) return Drupal.theme[func](...args);
    };
    Drupal.theme.placeholder = function(str) {
        return `<em class="placeholder">${Drupal.checkPlain(str)}</em>`;
    };
})(Drupal, window.drupalSettings, window.drupalTranslations, window.console, window.Proxy, window.Reflect);;
if (window.jQuery) jQuery.noConflict();
document.documentElement.className += ' js';
(function(Drupal, drupalSettings) {
    const domReady = (callback) => {
        const listener = () => {
            callback();
            document.removeEventListener('DOMContentLoaded', listener);
        };
        if (document.readyState !== 'loading') setTimeout(callback, 0);
        else document.addEventListener('DOMContentLoaded', listener);
    };
    domReady(() => {
        Drupal.attachBehaviors(document, drupalSettings);
    });
})(Drupal, window.drupalSettings);;
/* @license MIT https://raw.githubusercontent.com/focus-trap/tabbable/v6.1.2/LICENSE */
/*!
 * tabbable 6.1.2
 * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
 */
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : (t = "undefined" != typeof globalThis ? globalThis : t || self, function() {
        var n = t.tabbable,
            o = t.tabbable = {};
        e(o), o.noConflict = function() {
            return t.tabbable = n, o
        }
    }())
}(this, (function(t) {
    "use strict";
    var e = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"],
        n = e.join(","),
        o = "undefined" == typeof Element,
        r = o ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector,
        i = !o && Element.prototype.getRootNode ? function(t) {
            var e;
            return null == t || null === (e = t.getRootNode) || void 0 === e ? void 0 : e.call(t)
        } : function(t) {
            return null == t ? void 0 : t.ownerDocument
        },
        a = function t(e, n) {
            var o;
            void 0 === n && (n = !0);
            var r = null == e || null === (o = e.getAttribute) || void 0 === o ? void 0 : o.call(e, "inert");
            return "" === r || "true" === r || n && e && t(e.parentNode)
        },
        l = function(t, e, o) {
            if (a(t)) return [];
            var i = Array.prototype.slice.apply(t.querySelectorAll(n));
            return e && r.call(t, n) && i.unshift(t), i = i.filter(o)
        },
        u = function t(e, o, i) {
            for (var l = [], u = Array.from(e); u.length;) {
                var d = u.shift();
                if (!a(d, !1))
                    if ("SLOT" === d.tagName) {
                        var c = d.assignedElements(),
                            f = t(c.length ? c : d.children, !0, i);
                        i.flatten ? l.push.apply(l, f) : l.push({
                            scopeParent: d,
                            candidates: f
                        })
                    } else {
                        r.call(d, n) && i.filter(d) && (o || !e.includes(d)) && l.push(d);
                        var s = d.shadowRoot || "function" == typeof i.getShadowRoot && i.getShadowRoot(d),
                            p = !a(s, !1) && (!i.shadowRootFilter || i.shadowRootFilter(d));
                        if (s && p) {
                            var h = t(!0 === s ? d.children : s.children, !0, i);
                            i.flatten ? l.push.apply(l, h) : l.push({
                                scopeParent: d,
                                candidates: h
                            })
                        } else u.unshift.apply(u, d.children)
                    }
            }
            return l
        },
        d = function(t, e) {
            return t.tabIndex < 0 && (e || /^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || function(t) {
                var e, n = null == t || null === (e = t.getAttribute) || void 0 === e ? void 0 : e.call(t, "contenteditable");
                return "" === n || "true" === n
            }(t)) && isNaN(parseInt(t.getAttribute("tabindex"), 10)) ? 0 : t.tabIndex
        },
        c = function(t, e) {
            return t.tabIndex === e.tabIndex ? t.documentOrder - e.documentOrder : t.tabIndex - e.tabIndex
        },
        f = function(t) {
            return "INPUT" === t.tagName
        },
        s = function(t) {
            return function(t) {
                return f(t) && "radio" === t.type
            }(t) && ! function(t) {
                if (!t.name) return !0;
                var e, n = t.form || i(t),
                    o = function(t) {
                        return n.querySelectorAll('input[type="radio"][name="' + t + '"]')
                    };
                if ("undefined" != typeof window && void 0 !== window.CSS && "function" == typeof window.CSS.escape) e = o(window.CSS.escape(t.name));
                else try {
                    e = o(t.name)
                } catch (t) {
                    return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", t.message), !1
                }
                var r = function(t, e) {
                    for (var n = 0; n < t.length; n++)
                        if (t[n].checked && t[n].form === e) return t[n]
                }(e, t.form);
                return !r || r === t
            }(t)
        },
        p = function(t) {
            var e = t.getBoundingClientRect(),
                n = e.width,
                o = e.height;
            return 0 === n && 0 === o
        },
        h = function(t, e) {
            var n = e.displayCheck,
                o = e.getShadowRoot;
            if ("hidden" === getComputedStyle(t).visibility) return !0;
            var a = r.call(t, "details>summary:first-of-type") ? t.parentElement : t;
            if (r.call(a, "details:not([open]) *")) return !0;
            if (n && "full" !== n && "legacy-full" !== n) {
                if ("non-zero-area" === n) return p(t)
            } else {
                if ("function" == typeof o) {
                    for (var l = t; t;) {
                        var u = t.parentElement,
                            d = i(t);
                        if (u && !u.shadowRoot && !0 === o(u)) return p(t);
                        t = t.assignedSlot ? t.assignedSlot : u || d === t.ownerDocument ? u : d.host
                    }
                    t = l
                }
                if (function(t) {
                        var e, n, o, r, a = t && i(t),
                            l = null === (e = a) || void 0 === e ? void 0 : e.host,
                            u = !1;
                        if (a && a !== t)
                            for (u = !!(null !== (n = l) && void 0 !== n && null !== (o = n.ownerDocument) && void 0 !== o && o.contains(l) || null != t && null !== (r = t.ownerDocument) && void 0 !== r && r.contains(t)); !u && l;) {
                                var d, c, f;
                                u = !(null === (c = l = null === (d = a = i(l)) || void 0 === d ? void 0 : d.host) || void 0 === c || null === (f = c.ownerDocument) || void 0 === f || !f.contains(l))
                            }
                        return u
                    }(t)) return !t.getClientRects().length;
                if ("legacy-full" !== n) return !0
            }
            return !1
        },
        v = function(t, e) {
            return !(e.disabled || a(e) || function(t) {
                return f(t) && "hidden" === t.type
            }(e) || h(e, t) || function(t) {
                return "DETAILS" === t.tagName && Array.prototype.slice.apply(t.children).some((function(t) {
                    return "SUMMARY" === t.tagName
                }))
            }(e) || function(t) {
                if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
                    for (var e = t.parentElement; e;) {
                        if ("FIELDSET" === e.tagName && e.disabled) {
                            for (var n = 0; n < e.children.length; n++) {
                                var o = e.children.item(n);
                                if ("LEGEND" === o.tagName) return !!r.call(e, "fieldset[disabled] *") || !o.contains(t)
                            }
                            return !0
                        }
                        e = e.parentElement
                    }
                return !1
            }(e))
        },
        b = function(t, e) {
            return !(s(e) || d(e) < 0 || !v(t, e))
        },
        m = function(t) {
            var e = parseInt(t.getAttribute("tabindex"), 10);
            return !!(isNaN(e) || e >= 0)
        },
        y = function t(e) {
            var n = [],
                o = [];
            return e.forEach((function(e, r) {
                var i = !!e.scopeParent,
                    a = i ? e.scopeParent : e,
                    l = d(a, i),
                    u = i ? t(e.candidates) : a;
                0 === l ? i ? n.push.apply(n, u) : n.push(a) : o.push({
                    documentOrder: r,
                    tabIndex: l,
                    item: e,
                    isScope: i,
                    content: u
                })
            })), o.sort(c).reduce((function(t, e) {
                return e.isScope ? t.push.apply(t, e.content) : t.push(e.content), t
            }), []).concat(n)
        },
        g = e.concat("iframe").join(",");
    t.focusable = function(t, e) {
        return (e = e || {}).getShadowRoot ? u([t], e.includeContainer, {
            filter: v.bind(null, e),
            flatten: !0,
            getShadowRoot: e.getShadowRoot
        }) : l(t, e.includeContainer, v.bind(null, e))
    }, t.isFocusable = function(t, e) {
        if (e = e || {}, !t) throw new Error("No node provided");
        return !1 !== r.call(t, g) && v(e, t)
    }, t.isTabbable = function(t, e) {
        if (e = e || {}, !t) throw new Error("No node provided");
        return !1 !== r.call(t, n) && b(e, t)
    }, t.tabbable = function(t, e) {
        var n;
        return n = (e = e || {}).getShadowRoot ? u([t], e.includeContainer, {
            filter: b.bind(null, e),
            flatten: !1,
            getShadowRoot: e.getShadowRoot,
            shadowRootFilter: m
        }) : l(t, e.includeContainer, b.bind(null, e)), y(n)
    }, Object.defineProperty(t, "__esModule", {
        value: !0
    })
}));

;
/* @license GNU-GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function() {
    Drupal.behaviors.dataLayer = {
        langPrefixes: function langPrefixes() {
            var languages = Drupal.settings.dataLayer.languages,
                langList = [];
            for (var lang in languages)
                if (languages[lang].prefix !== '') langList.push(languages[lang].prefix);
            return langList;
        },
        attach: function() {
            return;
        }
    };
})();;
/* @license MIT https://raw.githubusercontent.com/js-cookie/js-cookie/v3.0.5/LICENSE */
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self, function() {
        var n = e.Cookies,
            o = e.Cookies = t();
        o.noConflict = function() {
            return e.Cookies = n, o;
        };
    }());
}(this, (function() {
    "use strict";

    function e(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n) e[o] = n[o];
        }
        return e;
    }
    var t = function t(n, o) {
        function r(t, r, i) {
            if ("undefined" != typeof document) {
                "number" == typeof(i = e({}, o, i)).expires && (i.expires = new Date(Date.now() + 864e5 * i.expires)), i.expires && (i.expires = i.expires.toUTCString()), t = encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
                var c = "";
                for (var u in i) i[u] && (c += "; " + u, !0 !== i[u] && (c += "=" + i[u].split(";")[0]));
                return document.cookie = t + "=" + n.write(r, t) + c;
            }
        }
        return Object.create({
            set: r,
            get: function(e) {
                if ("undefined" != typeof document && (!arguments.length || e)) {
                    for (var t = document.cookie ? document.cookie.split("; ") : [], o = {}, r = 0; r < t.length; r++) {
                        var i = t[r].split("="),
                            c = i.slice(1).join("=");
                        try {
                            var u = decodeURIComponent(i[0]);
                            if (o[u] = n.read(c, u), e === u) break;
                        } catch (e) {}
                    }
                    return e ? o[e] : o;
                }
            },
            remove: function(t, n) {
                r(t, "", e({}, n, {
                    expires: -1
                }));
            },
            withAttributes: function(n) {
                return t(this.converter, e({}, this.attributes, n));
            },
            withConverter: function(n) {
                return t(e({}, this.converter, n), this.attributes);
            }
        }, {
            attributes: {
                value: Object.freeze(o)
            },
            converter: {
                value: Object.freeze(n)
            }
        });
    }({
        read: function(e) {
            return '"' === e[0] && (e = e.slice(1, -1)), e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
        },
        write: function(e) {
            return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
        }
    }, {
        path: "/"
    });
    return t;
}));;
/* @license GNU-GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function($, Drupal) {
    Drupal.theme.progressBar = function(id) {
        return (`<div id="${id}" class="progress" aria-live="polite">` + '<div class="progress__label">&nbsp;</div>' + '<div class="progress__track"><div class="progress__bar"></div></div>' + '<div class="progress__percentage"></div>' + '<div class="progress__description">&nbsp;</div>' + '</div>');
    };
    Drupal.ProgressBar = function(id, updateCallback, method, errorCallback) {
        this.id = id;
        this.method = method || 'GET';
        this.updateCallback = updateCallback;
        this.errorCallback = errorCallback;
        this.element = $(Drupal.theme('progressBar', id));
    };
    $.extend(Drupal.ProgressBar.prototype, {
        setProgress(percentage, message, label) {
            if (percentage >= 0 && percentage <= 100) {
                $(this.element).find('div.progress__bar').css('width', `${percentage}%`);
                $(this.element).find('div.progress__percentage').html(`${percentage}%`);
            }
            $('div.progress__description', this.element).html(message);
            $('div.progress__label', this.element).html(label);
            if (this.updateCallback) this.updateCallback(percentage, message, this);
        },
        startMonitoring(uri, delay) {
            this.delay = delay;
            this.uri = uri;
            this.sendPing();
        },
        stopMonitoring() {
            clearTimeout(this.timer);
            this.uri = null;
        },
        sendPing() {
            if (this.timer) clearTimeout(this.timer);
            if (this.uri) {
                const pb = this;
                let uri = this.uri;
                if (uri.indexOf('?') === -1) uri += '?';
                else uri += '&';
                uri += '_format=json';
                $.ajax({
                    type: this.method,
                    url: uri,
                    data: '',
                    dataType: 'json',
                    success(progress) {
                        if (progress.status === 0) {
                            pb.displayError(progress.data);
                            return;
                        }
                        pb.setProgress(progress.percentage, progress.message, progress.label);
                        pb.timer = setTimeout(() => {
                            pb.sendPing();
                        }, pb.delay);
                    },
                    error(xmlhttp) {
                        const e = new Drupal.AjaxError(xmlhttp, pb.uri);
                        pb.displayError(`<pre>${e.message}</pre>`);
                    }
                });
            }
        },
        displayError(string) {
            const error = $('<div class="messages messages--error"></div>').html(string);
            $(this.element).before(error).hide();
            if (this.errorCallback) this.errorCallback(this);
        }
    });
})(jQuery, Drupal);;
/* @license GNU-GPL-2.0-or-later https://raw.githubusercontent.com/jquery-form/form/master/LICENSE */
/*!
 * jQuery Form Plugin
 * version: 4.3.0
 * Requires jQuery v1.7.2 or later
 * Project repository: https://github.com/jquery-form/form

 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup

 * Dual licensed under the LGPL-2.1+ or MIT licenses
 * https://github.com/jquery-form/form#license

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */
! function(r) {
    "function" == typeof define && define.amd ? define(["jquery"], r) : "object" == typeof module && module.exports ? module.exports = function(e, t) {
        return void 0 === t && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), r(t), t
    } : r(jQuery)
}(function(q) {
    "use strict";
    var m = /\r?\n/g,
        S = {};
    S.fileapi = void 0 !== q('<input type="file">').get(0).files, S.formdata = void 0 !== window.FormData;
    var _ = !!q.fn.prop;

    function o(e) {
        var t = e.data;
        e.isDefaultPrevented() || (e.preventDefault(), q(e.target).closest("form").ajaxSubmit(t))
    }

    function i(e) {
        var t = e.target,
            r = q(t);
        if (!r.is("[type=submit],[type=image]")) {
            var a = r.closest("[type=submit]");
            if (0 === a.length) return;
            t = a[0]
        }
        var n, o = t.form;
        "image" === (o.clk = t).type && (void 0 !== e.offsetX ? (o.clk_x = e.offsetX, o.clk_y = e.offsetY) : "function" == typeof q.fn.offset ? (n = r.offset(), o.clk_x = e.pageX - n.left, o.clk_y = e.pageY - n.top) : (o.clk_x = e.pageX - t.offsetLeft, o.clk_y = e.pageY - t.offsetTop)), setTimeout(function() {
            o.clk = o.clk_x = o.clk_y = null
        }, 100)
    }

    function N() {
        var e;
        q.fn.ajaxSubmit.debug && (e = "[jquery.form] " + Array.prototype.join.call(arguments, ""), window.console && window.console.log ? window.console.log(e) : window.opera && window.opera.postError && window.opera.postError(e))
    }
    q.fn.attr2 = function() {
        if (!_) return this.attr.apply(this, arguments);
        var e = this.prop.apply(this, arguments);
        return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments)
    }, q.fn.ajaxSubmit = function(M, e, t, r) {
        if (!this.length) return N("ajaxSubmit: skipping submit process - no element selected"), this;
        var O, a, n, o, X = this;
        "function" == typeof M ? M = {
            success: M
        } : "string" == typeof M || !1 === M && 0 < arguments.length ? (M = {
            url: M,
            data: e,
            dataType: t
        }, "function" == typeof r && (M.success = r)) : void 0 === M && (M = {}), O = M.method || M.type || this.attr2("method"), n = (n = (n = "string" == typeof(a = M.url || this.attr2("action")) ? q.trim(a) : "") || window.location.href || "") && (n.match(/^([^#]+)/) || [])[1], o = /(MSIE|Trident)/.test(navigator.userAgent || "") && /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank", M = q.extend(!0, {
            url: n,
            success: q.ajaxSettings.success,
            type: O || q.ajaxSettings.type,
            iframeSrc: o
        }, M);
        var i = {};
        if (this.trigger("form-pre-serialize", [this, M, i]), i.veto) return N("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
        if (M.beforeSerialize && !1 === M.beforeSerialize(this, M)) return N("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
        var s = M.traditional;
        void 0 === s && (s = q.ajaxSettings.traditional);
        var u, c, C = [],
            l = this.formToArray(M.semantic, C, M.filtering);
        if (M.data && (c = q.isFunction(M.data) ? M.data(l) : M.data, M.extraData = c, u = q.param(c, s)), M.beforeSubmit && !1 === M.beforeSubmit(l, this, M)) return N("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
        if (this.trigger("form-submit-validate", [l, this, M, i]), i.veto) return N("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
        var f = q.param(l, s);
        u && (f = f ? f + "&" + u : u), "GET" === M.type.toUpperCase() ? (M.url += (0 <= M.url.indexOf("?") ? "&" : "?") + f, M.data = null) : M.data = f;
        var d, m, p, h = [];
        M.resetForm && h.push(function() {
            X.resetForm()
        }), M.clearForm && h.push(function() {
            X.clearForm(M.includeHidden)
        }), !M.dataType && M.target ? (d = M.success || function() {}, h.push(function(e, t, r) {
            var a = arguments,
                n = M.replaceTarget ? "replaceWith" : "html";
            q(M.target)[n](e).each(function() {
                d.apply(this, a)
            })
        })) : M.success && (q.isArray(M.success) ? q.merge(h, M.success) : h.push(M.success)), M.success = function(e, t, r) {
            for (var a = M.context || this, n = 0, o = h.length; n < o; n++) h[n].apply(a, [e, t, r || X, X])
        }, M.error && (m = M.error, M.error = function(e, t, r) {
            var a = M.context || this;
            m.apply(a, [e, t, r, X])
        }), M.complete && (p = M.complete, M.complete = function(e, t) {
            var r = M.context || this;
            p.apply(r, [e, t, X])
        });
        var v = 0 < q("input[type=file]:enabled", this).filter(function() {
                return "" !== q(this).val()
            }).length,
            g = "multipart/form-data",
            x = X.attr("enctype") === g || X.attr("encoding") === g,
            y = S.fileapi && S.formdata;
        N("fileAPI :" + y);
        var b, T = (v || x) && !y;
        !1 !== M.iframe && (M.iframe || T) ? M.closeKeepAlive ? q.get(M.closeKeepAlive, function() {
            b = w(l)
        }) : b = w(l) : b = (v || x) && y ? function(e) {
            for (var r = new FormData, t = 0; t < e.length; t++) r.append(e[t].name, e[t].value);
            if (M.extraData) {
                var a = function(e) {
                    var t, r, a = q.param(e, M.traditional).split("&"),
                        n = a.length,
                        o = [];
                    for (t = 0; t < n; t++) a[t] = a[t].replace(/\+/g, " "), r = a[t].split("="), o.push([decodeURIComponent(r[0]), decodeURIComponent(r[1])]);
                    return o
                }(M.extraData);
                for (t = 0; t < a.length; t++) a[t] && r.append(a[t][0], a[t][1])
            }
            M.data = null;
            var n = q.extend(!0, {}, q.ajaxSettings, M, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: O || "POST"
            });
            M.uploadProgress && (n.xhr = function() {
                var e = q.ajaxSettings.xhr();
                return e.upload && e.upload.addEventListener("progress", function(e) {
                    var t = 0,
                        r = e.loaded || e.position,
                        a = e.total;
                    e.lengthComputable && (t = Math.ceil(r / a * 100)), M.uploadProgress(e, r, a, t)
                }, !1), e
            });
            n.data = null;
            var o = n.beforeSend;
            return n.beforeSend = function(e, t) {
                M.formData ? t.data = M.formData : t.data = r, o && o.call(this, e, t)
            }, q.ajax(n)
        }(l) : q.ajax(M), X.removeData("jqxhr").data("jqxhr", b);
        for (var j = 0; j < C.length; j++) C[j] = null;
        return this.trigger("form-submit-notify", [this, M]), this;

        function w(e) {
            var t, r, l, f, o, d, m, p, a, n, h, v, i = X[0],
                g = q.Deferred();
            if (g.abort = function(e) {
                    p.abort(e)
                }, e)
                for (r = 0; r < C.length; r++) t = q(C[r]), _ ? t.prop("disabled", !1) : t.removeAttr("disabled");
            (l = q.extend(!0, {}, q.ajaxSettings, M)).context = l.context || l, o = "jqFormIO" + (new Date).getTime();
            var s = i.ownerDocument,
                u = X.closest("body");
            if (l.iframeTarget ? (n = (d = q(l.iframeTarget, s)).attr2("name")) ? o = n : d.attr2("name", o) : (d = q('<iframe name="' + o + '" src="' + l.iframeSrc + '" />', s)).css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                }), m = d[0], p = {
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: "n/a",
                    getAllResponseHeaders: function() {},
                    getResponseHeader: function() {},
                    setRequestHeader: function() {},
                    abort: function(e) {
                        var t = "timeout" === e ? "timeout" : "aborted";
                        N("aborting upload... " + t), this.aborted = 1;
                        try {
                            m.contentWindow.document.execCommand && m.contentWindow.document.execCommand("Stop")
                        } catch (e) {}
                        d.attr("src", l.iframeSrc), p.error = t, l.error && l.error.call(l.context, p, t, e), f && q.event.trigger("ajaxError", [p, l, t]), l.complete && l.complete.call(l.context, p, t)
                    }
                }, (f = l.global) && 0 == q.active++ && q.event.trigger("ajaxStart"), f && q.event.trigger("ajaxSend", [p, l]), l.beforeSend && !1 === l.beforeSend.call(l.context, p, l)) return l.global && q.active--, g.reject(), g;
            if (p.aborted) return g.reject(), g;
            (a = i.clk) && (n = a.name) && !a.disabled && (l.extraData = l.extraData || {}, l.extraData[n] = a.value, "image" === a.type && (l.extraData[n + ".x"] = i.clk_x, l.extraData[n + ".y"] = i.clk_y));
            var x = 1,
                y = 2;

            function b(t) {
                var r = null;
                try {
                    t.contentWindow && (r = t.contentWindow.document)
                } catch (e) {
                    N("cannot get iframe.contentWindow document: " + e)
                }
                if (r) return r;
                try {
                    r = t.contentDocument ? t.contentDocument : t.document
                } catch (e) {
                    N("cannot get iframe.contentDocument: " + e), r = t.document
                }
                return r
            }
            var c = q("meta[name=csrf-token]").attr("content"),
                T = q("meta[name=csrf-param]").attr("content");

            function j() {
                var e = X.attr2("target"),
                    t = X.attr2("action"),
                    r = X.attr("enctype") || X.attr("encoding") || "multipart/form-data";
                i.setAttribute("target", o), O && !/post/i.test(O) || i.setAttribute("method", "POST"), t !== l.url && i.setAttribute("action", l.url), l.skipEncodingOverride || O && !/post/i.test(O) || X.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }), l.timeout && (v = setTimeout(function() {
                    h = !0, A(x)
                }, l.timeout));
                var a = [];
                try {
                    if (l.extraData)
                        for (var n in l.extraData) l.extraData.hasOwnProperty(n) && (q.isPlainObject(l.extraData[n]) && l.extraData[n].hasOwnProperty("name") && l.extraData[n].hasOwnProperty("value") ? a.push(q('<input type="hidden" name="' + l.extraData[n].name + '">', s).val(l.extraData[n].value).appendTo(i)[0]) : a.push(q('<input type="hidden" name="' + n + '">', s).val(l.extraData[n]).appendTo(i)[0]));
                    l.iframeTarget || d.appendTo(u), m.attachEvent ? m.attachEvent("onload", A) : m.addEventListener("load", A, !1), setTimeout(function e() {
                        try {
                            var t = b(m).readyState;
                            N("state = " + t), t && "uninitialized" === t.toLowerCase() && setTimeout(e, 50)
                        } catch (e) {
                            N("Server abort: ", e, " (", e.name, ")"), A(y), v && clearTimeout(v), v = void 0
                        }
                    }, 15);
                    try {
                        i.submit()
                    } catch (e) {
                        document.createElement("form").submit.apply(i)
                    }
                } finally {
                    i.setAttribute("action", t), i.setAttribute("enctype", r), e ? i.setAttribute("target", e) : X.removeAttr("target"), q(a).remove()
                }
            }
            T && c && (l.extraData = l.extraData || {}, l.extraData[T] = c), l.forceSync ? j() : setTimeout(j, 10);
            var w, S, k, D = 50;

            function A(e) {
                if (!p.aborted && !k) {
                    if ((S = b(m)) || (N("cannot access response document"), e = y), e === x && p) return p.abort("timeout"), void g.reject(p, "timeout");
                    if (e === y && p) return p.abort("server abort"), void g.reject(p, "error", "server abort");
                    if (S && S.location.href !== l.iframeSrc || h) {
                        m.detachEvent ? m.detachEvent("onload", A) : m.removeEventListener("load", A, !1);
                        var t, r = "success";
                        try {
                            if (h) throw "timeout";
                            var a = "xml" === l.dataType || S.XMLDocument || q.isXMLDoc(S);
                            if (N("isXml=" + a), !a && window.opera && (null === S.body || !S.body.innerHTML) && --D) return N("requeing onLoad callback, DOM not available"), void setTimeout(A, 250);
                            var n = S.body ? S.body : S.documentElement;
                            p.responseText = n ? n.innerHTML : null, p.responseXML = S.XMLDocument ? S.XMLDocument : S, a && (l.dataType = "xml"), p.getResponseHeader = function(e) {
                                return {
                                    "content-type": l.dataType
                                }[e.toLowerCase()]
                            }, n && (p.status = Number(n.getAttribute("status")) || p.status, p.statusText = n.getAttribute("statusText") || p.statusText);
                            var o, i, s, u = (l.dataType || "").toLowerCase(),
                                c = /(json|script|text)/.test(u);
                            c || l.textarea ? (o = S.getElementsByTagName("textarea")[0]) ? (p.responseText = o.value, p.status = Number(o.getAttribute("status")) || p.status, p.statusText = o.getAttribute("statusText") || p.statusText) : c && (i = S.getElementsByTagName("pre")[0], s = S.getElementsByTagName("body")[0], i ? p.responseText = i.textContent ? i.textContent : i.innerText : s && (p.responseText = s.textContent ? s.textContent : s.innerText)) : "xml" === u && !p.responseXML && p.responseText && (p.responseXML = F(p.responseText));
                            try {
                                w = E(p, u, l)
                            } catch (e) {
                                r = "parsererror", p.error = t = e || r
                            }
                        } catch (e) {
                            N("error caught: ", e), r = "error", p.error = t = e || r
                        }
                        p.aborted && (N("upload aborted"), r = null), p.status && (r = 200 <= p.status && p.status < 300 || 304 === p.status ? "success" : "error"), "success" === r ? (l.success && l.success.call(l.context, w, "success", p), g.resolve(p.responseText, "success", p), f && q.event.trigger("ajaxSuccess", [p, l])) : r && (void 0 === t && (t = p.statusText), l.error && l.error.call(l.context, p, r, t), g.reject(p, "error", t), f && q.event.trigger("ajaxError", [p, l, t])), f && q.event.trigger("ajaxComplete", [p, l]), f && !--q.active && q.event.trigger("ajaxStop"), l.complete && l.complete.call(l.context, p, r), k = !0, l.timeout && clearTimeout(v), setTimeout(function() {
                            l.iframeTarget ? d.attr("src", l.iframeSrc) : d.remove(), p.responseXML = null
                        }, 100)
                    }
                }
            }
            var F = q.parseXML || function(e, t) {
                    return window.ActiveXObject ? ((t = new ActiveXObject("Microsoft.XMLDOM")).async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" !== t.documentElement.nodeName ? t : null
                },
                L = q.parseJSON || function(e) {
                    return window.eval("(" + e + ")")
                },
                E = function(e, t, r) {
                    var a = e.getResponseHeader("content-type") || "",
                        n = ("xml" === t || !t) && 0 <= a.indexOf("xml"),
                        o = n ? e.responseXML : e.responseText;
                    return n && "parsererror" === o.documentElement.nodeName && q.error && q.error("parsererror"), r && r.dataFilter && (o = r.dataFilter(o, t)), "string" == typeof o && (("json" === t || !t) && 0 <= a.indexOf("json") ? o = L(o) : ("script" === t || !t) && 0 <= a.indexOf("javascript") && q.globalEval(o)), o
                };
            return g
        }
    }, q.fn.ajaxForm = function(e, t, r, a) {
        if (("string" == typeof e || !1 === e && 0 < arguments.length) && (e = {
                url: e,
                data: t,
                dataType: r
            }, "function" == typeof a && (e.success = a)), (e = e || {}).delegation = e.delegation && q.isFunction(q.fn.on), e.delegation || 0 !== this.length) return e.delegation ? (q(document).off("submit.form-plugin", this.selector, o).off("click.form-plugin", this.selector, i).on("submit.form-plugin", this.selector, e, o).on("click.form-plugin", this.selector, e, i), this) : (e.beforeFormUnbind && e.beforeFormUnbind(this, e), this.ajaxFormUnbind().on("submit.form-plugin", e, o).on("click.form-plugin", e, i));
        var n = {
            s: this.selector,
            c: this.context
        };
        return !q.isReady && n.s ? (N("DOM not ready, queuing ajaxForm"), q(function() {
            q(n.s, n.c).ajaxForm(e)
        })) : N("terminating; zero elements found by selector" + (q.isReady ? "" : " (DOM not ready)")), this
    }, q.fn.ajaxFormUnbind = function() {
        return this.off("submit.form-plugin click.form-plugin")
    }, q.fn.formToArray = function(e, t, r) {
        var a = [];
        if (0 === this.length) return a;
        var n, o, i, s, u, c, l, f, d, m, p = this[0],
            h = this.attr("id"),
            v = (v = e || void 0 === p.elements ? p.getElementsByTagName("*") : p.elements) && q.makeArray(v);
        if (h && (e || /(Edge|Trident)\//.test(navigator.userAgent)) && (n = q(':input[form="' + h + '"]').get()).length && (v = (v || []).concat(n)), !v || !v.length) return a;
        for (q.isFunction(r) && (v = q.map(v, r)), o = 0, c = v.length; o < c; o++)
            if ((m = (u = v[o]).name) && !u.disabled)
                if (e && p.clk && "image" === u.type) p.clk === u && (a.push({
                    name: m,
                    value: q(u).val(),
                    type: u.type
                }), a.push({
                    name: m + ".x",
                    value: p.clk_x
                }, {
                    name: m + ".y",
                    value: p.clk_y
                }));
                else if ((s = q.fieldValue(u, !0)) && s.constructor === Array)
            for (t && t.push(u), i = 0, l = s.length; i < l; i++) a.push({
                name: m,
                value: s[i]
            });
        else if (S.fileapi && "file" === u.type) {
            t && t.push(u);
            var g = u.files;
            if (g.length)
                for (i = 0; i < g.length; i++) a.push({
                    name: m,
                    value: g[i],
                    type: u.type
                });
            else a.push({
                name: m,
                value: "",
                type: u.type
            })
        } else null != s && (t && t.push(u), a.push({
            name: m,
            value: s,
            type: u.type,
            required: u.required
        }));
        return e || !p.clk || (m = (d = (f = q(p.clk))[0]).name) && !d.disabled && "image" === d.type && (a.push({
            name: m,
            value: f.val()
        }), a.push({
            name: m + ".x",
            value: p.clk_x
        }, {
            name: m + ".y",
            value: p.clk_y
        })), a
    }, q.fn.formSerialize = function(e) {
        return q.param(this.formToArray(e))
    }, q.fn.fieldSerialize = function(n) {
        var o = [];
        return this.each(function() {
            var e = this.name;
            if (e) {
                var t = q.fieldValue(this, n);
                if (t && t.constructor === Array)
                    for (var r = 0, a = t.length; r < a; r++) o.push({
                        name: e,
                        value: t[r]
                    });
                else null != t && o.push({
                    name: this.name,
                    value: t
                })
            }
        }), q.param(o)
    }, q.fn.fieldValue = function(e) {
        for (var t = [], r = 0, a = this.length; r < a; r++) {
            var n = this[r],
                o = q.fieldValue(n, e);
            null == o || o.constructor === Array && !o.length || (o.constructor === Array ? q.merge(t, o) : t.push(o))
        }
        return t
    }, q.fieldValue = function(e, t) {
        var r = e.name,
            a = e.type,
            n = e.tagName.toLowerCase();
        if (void 0 === t && (t = !0), t && (!r || e.disabled || "reset" === a || "button" === a || ("checkbox" === a || "radio" === a) && !e.checked || ("submit" === a || "image" === a) && e.form && e.form.clk !== e || "select" === n && -1 === e.selectedIndex)) return null;
        if ("select" !== n) return q(e).val().replace(m, "\r\n");
        var o = e.selectedIndex;
        if (o < 0) return null;
        for (var i = [], s = e.options, u = "select-one" === a, c = u ? o + 1 : s.length, l = u ? o : 0; l < c; l++) {
            var f = s[l];
            if (f.selected && !f.disabled) {
                var d = (d = f.value) || (f.attributes && f.attributes.value && !f.attributes.value.specified ? f.text : f.value);
                if (u) return d;
                i.push(d)
            }
        }
        return i
    }, q.fn.clearForm = function(e) {
        return this.each(function() {
            q("input,select,textarea", this).clearFields(e)
        })
    }, q.fn.clearFields = q.fn.clearInputs = function(r) {
        var a = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var e = this.type,
                t = this.tagName.toLowerCase();
            a.test(e) || "textarea" === t ? this.value = "" : "checkbox" === e || "radio" === e ? this.checked = !1 : "select" === t ? this.selectedIndex = -1 : "file" === e ? /MSIE/.test(navigator.userAgent) ? q(this).replaceWith(q(this).clone(!0)) : q(this).val("") : r && (!0 === r && /hidden/.test(e) || "string" == typeof r && q(this).is(r)) && (this.value = "")
        })
    }, q.fn.resetForm = function() {
        return this.each(function() {
            var t = q(this),
                e = this.tagName.toLowerCase();
            switch (e) {
                case "input":
                    this.checked = this.defaultChecked;
                case "textarea":
                    return this.value = this.defaultValue, !0;
                case "option":
                case "optgroup":
                    var r = t.parents("select");
                    return r.length && r[0].multiple ? "option" === e ? this.selected = this.defaultSelected : t.find("option").resetForm() : r.resetForm(), !0;
                case "select":
                    return t.find("option").each(function(e) {
                        if (this.selected = this.defaultSelected, this.defaultSelected && !t[0].multiple) return t[0].selectedIndex = e, !1
                    }), !0;
                case "label":
                    var a = q(t.attr("for")),
                        n = t.find("input,select,textarea");
                    return a[0] && n.unshift(a[0]), n.resetForm(), !0;
                case "form":
                    return "function" != typeof this.reset && ("object" != typeof this.reset || this.reset.nodeType) || this.reset(), !0;
                default:
                    return t.find("form,input,label,select,textarea").resetForm(), !0
            }
        })
    }, q.fn.enable = function(e) {
        return void 0 === e && (e = !0), this.each(function() {
            this.disabled = !e
        })
    }, q.fn.selected = function(r) {
        return void 0 === r && (r = !0), this.each(function() {
            var e, t = this.type;
            "checkbox" === t || "radio" === t ? this.checked = r : "option" === this.tagName.toLowerCase() && (e = q(this).parent("select"), r && e[0] && "select-one" === e[0].type && e.find("option").selected(!1), this.selected = r)
        })
    }, q.fn.ajaxSubmit.debug = !1
});

;
/* @license MIT https://raw.githubusercontent.com/muicss/loadjs/4.2.0/LICENSE.txt */
loadjs = function() {
    var h = function() {},
        c = {},
        u = {},
        f = {};

    function o(e, n) {
        if (e) {
            var r = f[e];
            if (u[e] = n, r)
                for (; r.length;) r[0](e, n), r.splice(0, 1)
        }
    }

    function l(e, n) {
        e.call && (e = {
            success: e
        }), n.length ? (e.error || h)(n) : (e.success || h)(e)
    }

    function d(r, t, s, i) {
        var c, o, e = document,
            n = s.async,
            u = (s.numRetries || 0) + 1,
            f = s.before || h,
            l = r.replace(/[\?|#].*$/, ""),
            a = r.replace(/^(css|img)!/, "");
        i = i || 0, /(^css!|\.css$)/.test(l) ? ((o = e.createElement("link")).rel = "stylesheet", o.href = a, (c = "hideFocus" in o) && o.relList && (c = 0, o.rel = "preload", o.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(l) ? (o = e.createElement("img")).src = a : ((o = e.createElement("script")).src = r, o.async = void 0 === n || n), !(o.onload = o.onerror = o.onbeforeload = function(e) {
            var n = e.type[0];
            if (c) try {
                o.sheet.cssText.length || (n = "e")
            } catch (e) {
                18 != e.code && (n = "e")
            }
            if ("e" == n) {
                if ((i += 1) < u) return d(r, t, s, i)
            } else if ("preload" == o.rel && "style" == o.as) return o.rel = "stylesheet";
            t(r, n, e.defaultPrevented)
        }) !== f(r, o) && e.head.appendChild(o)
    }

    function r(e, n, r) {
        var t, s;
        if (n && n.trim && (t = n), s = (t ? r : n) || {}, t) {
            if (t in c) throw "LoadJS";
            c[t] = !0
        }

        function i(n, r) {
            ! function(e, t, n) {
                var r, s, i = (e = e.push ? e : [e]).length,
                    c = i,
                    o = [];
                for (r = function(e, n, r) {
                        if ("e" == n && o.push(e), "b" == n) {
                            if (!r) return;
                            o.push(e)
                        }--i || t(o)
                    }, s = 0; s < c; s++) d(e[s], r, n)
            }(e, function(e) {
                l(s, e), n && l({
                    success: n,
                    error: r
                }, e), o(t, e)
            }, s)
        }
        if (s.returnPromise) return new Promise(i);
        i()
    }
    return r.ready = function(e, n) {
        return function(e, r) {
            e = e.push ? e : [e];
            var n, t, s, i = [],
                c = e.length,
                o = c;
            for (n = function(e, n) {
                    n.length && i.push(e), --o || r(i)
                }; c--;) t = e[c], (s = u[t]) ? n(t, s) : (f[t] = f[t] || []).push(n)
        }(e, function(e) {
            l(n, e)
        }), r
    }, r.done = function(e) {
        o(e, [])
    }, r.reset = function() {
        c = {}, u = {}, f = {}
    }, r.isDefined = function(e) {
        return e in c
    }, r
}();;
/* @license GNU-GPL-2.0-or-later https://www.drupal.org/licensing/faq */
Drupal.debounce = function(func, wait, immediate) {
    let timeout;
    let result;
    return function(...args) {
        const context = this;
        const later = function() {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(context, args);
        return result;
    };
};;
(function(Drupal, debounce) {
    let liveElement;
    const announcements = [];
    Drupal.behaviors.drupalAnnounce = {
        attach(context) {
            if (!liveElement) {
                liveElement = document.createElement('div');
                liveElement.id = 'drupal-live-announce';
                liveElement.className = 'visually-hidden';
                liveElement.setAttribute('aria-live', 'polite');
                liveElement.setAttribute('aria-busy', 'false');
                document.body.appendChild(liveElement);
            }
        }
    };

    function announce() {
        const text = [];
        let priority = 'polite';
        let announcement;
        const il = announcements.length;
        for (let i = 0; i < il; i++) {
            announcement = announcements.pop();
            text.unshift(announcement.text);
            if (announcement.priority === 'assertive') priority = 'assertive';
        }
        if (text.length) {
            liveElement.innerHTML = '';
            liveElement.setAttribute('aria-busy', 'true');
            liveElement.setAttribute('aria-live', priority);
            liveElement.innerHTML = text.join('\n');
            liveElement.setAttribute('aria-busy', 'false');
        }
    }
    Drupal.announce = function(text, priority) {
        announcements.push({
            text,
            priority
        });
        return debounce(announce, 200)();
    };
})(Drupal, Drupal.debounce);;
((Drupal) => {
    Drupal.Message = class {
        constructor(messageWrapper = null) {
            if (!messageWrapper) this.messageWrapper = Drupal.Message.defaultWrapper();
            else this.messageWrapper = messageWrapper;
        }
        static defaultWrapper() {
            let wrapper = document.querySelector('[data-drupal-messages]');
            if (!wrapper) {
                wrapper = document.querySelector('[data-drupal-messages-fallback]');
                wrapper.removeAttribute('data-drupal-messages-fallback');
                wrapper.setAttribute('data-drupal-messages', '');
                wrapper.classList.remove('hidden');
            }
            return wrapper.innerHTML === '' ? Drupal.Message.messageInternalWrapper(wrapper) : wrapper.firstElementChild;
        }
        static getMessageTypeLabels() {
            return {
                status: Drupal.t('Status message'),
                error: Drupal.t('Error message'),
                warning: Drupal.t('Warning message')
            };
        }
        add(message, options = {}) {
            if (!options.hasOwnProperty('type')) options.type = 'status';
            if (typeof message !== 'string') throw new Error('Message must be a string.');
            Drupal.Message.announce(message, options);
            options.id = options.id ? String(options.id) : `${options.type}-${Math.random().toFixed(15).replace('0.','')}`;
            if (!Drupal.Message.getMessageTypeLabels().hasOwnProperty(options.type)) {
                const {
                    type
                } = options;
                throw new Error(`The message type, ${type}, is not present in Drupal.Message.getMessageTypeLabels().`);
            }
            this.messageWrapper.appendChild(Drupal.theme('message', {
                text: message
            }, options));
            return options.id;
        }
        select(id) {
            return this.messageWrapper.querySelector(`[data-drupal-message-id^="${id}"]`);
        }
        remove(id) {
            return this.messageWrapper.removeChild(this.select(id));
        }
        clear() {
            Array.prototype.forEach.call(this.messageWrapper.querySelectorAll('[data-drupal-message-id]'), (message) => {
                this.messageWrapper.removeChild(message);
            });
        }
        static announce(message, options) {
            if (!options.priority && (options.type === 'warning' || options.type === 'error')) options.priority = 'assertive';
            if (options.announce !== '') Drupal.announce(options.announce || message, options.priority);
        }
        static messageInternalWrapper(messageWrapper) {
            const innerWrapper = document.createElement('div');
            innerWrapper.setAttribute('class', 'messages__wrapper');
            messageWrapper.insertAdjacentElement('afterbegin', innerWrapper);
            return innerWrapper;
        }
    };
    Drupal.theme.message = ({
        text
    }, {
        type,
        id
    }) => {
        const messagesTypes = Drupal.Message.getMessageTypeLabels();
        const messageWrapper = document.createElement('div');
        messageWrapper.setAttribute('class', `messages messages--${type}`);
        messageWrapper.setAttribute('role', type === 'error' || type === 'warning' ? 'alert' : 'status');
        messageWrapper.setAttribute('data-drupal-message-id', id);
        messageWrapper.setAttribute('data-drupal-message-type', type);
        messageWrapper.setAttribute('aria-label', messagesTypes[type]);
        messageWrapper.innerHTML = `${text}`;
        return messageWrapper;
    };
})(Drupal);;
(function($, window, Drupal, drupalSettings, loadjs, {
    isFocusable,
    tabbable
}) {
    Drupal.behaviors.AJAX = {
        attach(context, settings) {
            function loadAjaxBehavior(base) {
                const elementSettings = settings.ajax[base];
                if (typeof elementSettings.selector === 'undefined') elementSettings.selector = `#${base}`;
                once('drupal-ajax', $(elementSettings.selector)).forEach((el) => {
                    elementSettings.element = el;
                    elementSettings.base = base;
                    Drupal.ajax(elementSettings);
                });
            }
            Object.keys(settings.ajax || {}).forEach(loadAjaxBehavior);
            Drupal.ajax.bindAjaxLinks(document.body);
            once('ajax', '.use-ajax-submit').forEach((el) => {
                const elementSettings = {};
                elementSettings.url = $(el.form).attr('action');
                elementSettings.setClick = true;
                elementSettings.event = 'click';
                elementSettings.progress = {
                    type: 'throbber'
                };
                elementSettings.base = el.id;
                elementSettings.element = el;
                Drupal.ajax(elementSettings);
            });
        },
        detach(context, settings, trigger) {
            if (trigger === 'unload') Drupal.ajax.expired().forEach((instance) => {
                Drupal.ajax.instances[instance.instanceIndex] = null;
            });
        }
    };
    Drupal.AjaxError = function(xmlhttp, uri, customMessage) {
        let statusCode;
        let statusText;
        let responseText;
        if (xmlhttp.status) statusCode = `\n${Drupal.t('An AJAX HTTP error occurred.')}\n${Drupal.t('HTTP Result Code: !status',{'!status':xmlhttp.status})}`;
        else statusCode = `\n${Drupal.t('An AJAX HTTP request terminated abnormally.')}`;
        statusCode += `\n${Drupal.t('Debugging information follows.')}`;
        const pathText = `\n${Drupal.t('Path: !uri',{'!uri':uri})}`;
        statusText = '';
        try {
            statusText = `\n${Drupal.t('StatusText: !statusText',{'!statusText':xmlhttp.statusText.trim()})}`;
        } catch (e) {}
        responseText = '';
        try {
            responseText = `\n${Drupal.t('ResponseText: !responseText',{'!responseText':xmlhttp.responseText.trim()})}`;
        } catch (e) {}
        responseText = responseText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, '');
        responseText = responseText.replace(/[\n]+\s+/g, '\n');
        const readyStateText = xmlhttp.status === 0 ? `\n${Drupal.t('ReadyState: !readyState',{'!readyState':xmlhttp.readyState})}` : '';
        customMessage = customMessage ? `\n${Drupal.t('CustomMessage: !customMessage',{'!customMessage':customMessage})}` : '';
        this.message = statusCode + pathText + statusText + customMessage + responseText + readyStateText;
        this.name = 'AjaxError';
        if (!Drupal.AjaxError.messages) Drupal.AjaxError.messages = new Drupal.Message();
        Drupal.AjaxError.messages.add(Drupal.t("Oops, something went wrong. Check your browser's developer console for more details."), {
            type: 'error'
        });
    };
    Drupal.AjaxError.prototype = new Error();
    Drupal.AjaxError.prototype.constructor = Drupal.AjaxError;
    Drupal.ajax = function(settings) {
        if (arguments.length !== 1) throw new Error('Drupal.ajax() function must be called with one configuration object only');
        const base = settings.base || false;
        const element = settings.element || false;
        delete settings.base;
        delete settings.element;
        if (!settings.progress && !element) settings.progress = false;
        const ajax = new Drupal.Ajax(base, element, settings);
        ajax.instanceIndex = Drupal.ajax.instances.length;
        Drupal.ajax.instances.push(ajax);
        return ajax;
    };
    Drupal.ajax.instances = [];
    Drupal.ajax.expired = function() {
        return Drupal.ajax.instances.filter((instance) => instance && instance.element !== false && !document.body.contains(instance.element));
    };
    Drupal.ajax.bindAjaxLinks = (element) => {
        once('ajax', '.use-ajax', element).forEach((ajaxLink) => {
            const $linkElement = $(ajaxLink);
            const elementSettings = {
                progress: {
                    type: 'throbber'
                },
                dialogType: $linkElement.data('dialog-type'),
                dialog: $linkElement.data('dialog-options'),
                dialogRenderer: $linkElement.data('dialog-renderer'),
                base: $linkElement.attr('id'),
                element: ajaxLink
            };
            const href = $linkElement.attr('href');
            if (href) {
                elementSettings.url = href;
                elementSettings.event = 'click';
            }
            const httpMethod = $linkElement.data('ajax-http-method');
            if (httpMethod) elementSettings.httpMethod = httpMethod;
            Drupal.ajax(elementSettings);
        });
    };
    Drupal.Ajax = function(base, element, elementSettings) {
        const defaults = {
            httpMethod: 'POST',
            event: element ? 'mousedown' : null,
            keypress: true,
            selector: base ? `#${base}` : null,
            effect: 'none',
            speed: 'none',
            method: 'replaceWith',
            progress: {
                type: 'throbber',
                message: Drupal.t('Please wait...')
            },
            submit: {
                js: true
            }
        };
        $.extend(this, defaults, elementSettings);
        this.commands = new Drupal.AjaxCommands();
        this.instanceIndex = false;
        if (this.wrapper) this.wrapper = `#${this.wrapper}`;
        this.element = element;
        this.elementSettings = elementSettings;
        if (this.element && this.element.form) this.$form = $(this.element.form);
        if (!this.url) {
            const $element = $(this.element);
            if ($element.is('a')) this.url = $element.attr('href');
            else {
                if (this.element && element.form) this.url = this.$form.attr('action');
            }
        }
        const originalUrl = this.url;
        this.url = this.url.replace(/\/nojs(\/|$|\?|#)/, '/ajax$1');
        if (drupalSettings.ajaxTrustedUrl[originalUrl]) drupalSettings.ajaxTrustedUrl[this.url] = true;
        const ajax = this;
        ajax.options = {
            url: ajax.url,
            data: ajax.submit,
            isInProgress() {
                return ajax.ajaxing;
            },
            beforeSerialize(elementSettings, options) {
                return ajax.beforeSerialize(elementSettings, options);
            },
            beforeSubmit(formValues, elementSettings, options) {
                ajax.ajaxing = true;
                return ajax.beforeSubmit(formValues, elementSettings, options);
            },
            beforeSend(xmlhttprequest, options) {
                ajax.ajaxing = true;
                return ajax.beforeSend(xmlhttprequest, options);
            },
            success(response, status, xmlhttprequest) {
                if (typeof response === 'string') response = $.parseJSON(response);
                if (response !== null && !drupalSettings.ajaxTrustedUrl[ajax.url])
                    if (xmlhttprequest.getResponseHeader('X-Drupal-Ajax-Token') !== '1') {
                        const customMessage = Drupal.t('The response failed verification so will not be processed.');
                        return ajax.error(xmlhttprequest, ajax.url, customMessage);
                    }
                return (Promise.resolve(ajax.success(response, status)).then(() => {
                    ajax.ajaxing = false;
                    $(document).trigger('ajaxSuccess', [xmlhttprequest, this]);
                    $(document).trigger('ajaxComplete', [xmlhttprequest, this]);
                    if (--$.active === 0) $(document).trigger('ajaxStop');
                }));
            },
            error(xmlhttprequest, status, error) {
                ajax.ajaxing = false;
            },
            complete(xmlhttprequest, status) {
                if (status === 'error' || status === 'parsererror') return ajax.error(xmlhttprequest, ajax.url);
            },
            dataType: 'json',
            jsonp: false,
            method: ajax.httpMethod
        };
        if (elementSettings.dialog) ajax.options.data.dialogOptions = elementSettings.dialog;
        if (ajax.options.url.indexOf('?') === -1) ajax.options.url += '?';
        else ajax.options.url += '&';
        let wrapper = `drupal_${elementSettings.dialogType||'ajax'}`;
        if (elementSettings.dialogRenderer) wrapper += `.${elementSettings.dialogRenderer}`;
        ajax.options.url += `${Drupal.ajax.WRAPPER_FORMAT}=${wrapper}`;
        $(ajax.element).on(elementSettings.event, function(event) {
            if (!drupalSettings.ajaxTrustedUrl[ajax.url] && !Drupal.url.isLocal(ajax.url)) throw new Error(Drupal.t('The callback URL is not local and not trusted: !url', {
                '!url': ajax.url
            }));
            return ajax.eventResponse(this, event);
        });
        if (elementSettings.keypress) $(ajax.element).on('keypress', function(event) {
            return ajax.keypressResponse(this, event);
        });
        if (elementSettings.prevent) $(ajax.element).on(elementSettings.prevent, false);
    };
    Drupal.ajax.WRAPPER_FORMAT = '_wrapper_format';
    Drupal.Ajax.AJAX_REQUEST_PARAMETER = '_drupal_ajax';
    Drupal.Ajax.prototype.execute = function() {
        if (this.ajaxing) return;
        try {
            this.beforeSerialize(this.element, this.options);
            return $.ajax(this.options);
        } catch (e) {
            this.ajaxing = false;
            window.alert(`An error occurred while attempting to process ${this.options.url}: ${e.message}`);
            return $.Deferred().reject();
        }
    };
    Drupal.Ajax.prototype.keypressResponse = function(element, event) {
        const ajax = this;
        if (event.which === 13 || (event.which === 32 && element.type !== 'text' && element.type !== 'textarea' && element.type !== 'tel' && element.type !== 'number')) {
            event.preventDefault();
            event.stopPropagation();
            $(element).trigger(ajax.elementSettings.event);
        }
    };
    Drupal.Ajax.prototype.eventResponse = function(element, event) {
        event.preventDefault();
        event.stopPropagation();
        const ajax = this;
        if (ajax.ajaxing) return;
        try {
            if (ajax.$form) {
                if (ajax.setClick) element.form.clk = element;
                ajax.$form.ajaxSubmit(ajax.options);
            } else {
                ajax.beforeSerialize(ajax.element, ajax.options);
                $.ajax(ajax.options);
            }
        } catch (e) {
            ajax.ajaxing = false;
            window.alert(`An error occurred while attempting to process ${ajax.options.url}: ${e.message}`);
        }
    };
    Drupal.Ajax.prototype.beforeSerialize = function(element, options) {
        if (this.$form && document.body.contains(this.$form.get(0))) {
            const settings = this.settings || drupalSettings;
            Drupal.detachBehaviors(this.$form.get(0), settings, 'serialize');
        }
        options.data[Drupal.Ajax.AJAX_REQUEST_PARAMETER] = 1;
        const pageState = drupalSettings.ajaxPageState;
        options.data['ajax_page_state[theme]'] = pageState.theme;
        options.data['ajax_page_state[theme_token]'] = pageState.theme_token;
        options.data['ajax_page_state[libraries]'] = pageState.libraries;
    };
    Drupal.Ajax.prototype.beforeSubmit = function(formValues, element, options) {};
    Drupal.Ajax.prototype.beforeSend = function(xmlhttprequest, options) {
        if (this.$form) {
            options.extraData = options.extraData || {};
            options.extraData.ajax_iframe_upload = '1';
            const v = $.fieldValue(this.element);
            if (v !== null) options.extraData[this.element.name] = v;
        }
        $(this.element).prop('disabled', true);
        if (!this.progress || !this.progress.type) return;
        const progressIndicatorMethod = `setProgressIndicator${this.progress.type.slice(0,1).toUpperCase()}${this.progress.type.slice(1).toLowerCase()}`;
        if (progressIndicatorMethod in this && typeof this[progressIndicatorMethod] === 'function') this[progressIndicatorMethod].call(this);
    };
    Drupal.theme.ajaxProgressThrobber = (message) => {
        const messageMarkup = typeof message === 'string' ? Drupal.theme('ajaxProgressMessage', message) : '';
        const throbber = '<div class="throbber">&nbsp;</div>';
        return `<div class="ajax-progress ajax-progress-throbber">${throbber}${messageMarkup}</div>`;
    };
    Drupal.theme.ajaxProgressIndicatorFullscreen = () => '<div class="ajax-progress ajax-progress-fullscreen">&nbsp;</div>';
    Drupal.theme.ajaxProgressMessage = (message) => `<div class="message">${message}</div>`;
    Drupal.theme.ajaxProgressBar = ($element) => $('<div class="ajax-progress ajax-progress-bar"></div>').append($element);
    Drupal.Ajax.prototype.setProgressIndicatorBar = function() {
        const progressBar = new Drupal.ProgressBar(`ajax-progress-${this.element.id}`, $.noop, this.progress.method, $.noop);
        if (this.progress.message) progressBar.setProgress(-1, this.progress.message);
        if (this.progress.url) progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
        this.progress.element = $(Drupal.theme('ajaxProgressBar', progressBar.element));
        this.progress.object = progressBar;
        $(this.element).after(this.progress.element);
    };
    Drupal.Ajax.prototype.setProgressIndicatorThrobber = function() {
        this.progress.element = $(Drupal.theme('ajaxProgressThrobber', this.progress.message));
        if ($(this.element).closest('[data-drupal-ajax-container]').length) $(this.element).closest('[data-drupal-ajax-container]').after(this.progress.element);
        else $(this.element).after(this.progress.element);
    };
    Drupal.Ajax.prototype.setProgressIndicatorFullscreen = function() {
        this.progress.element = $(Drupal.theme('ajaxProgressIndicatorFullscreen'));
        $('body').append(this.progress.element);
    };
    Drupal.Ajax.prototype.commandExecutionQueue = function(response, status) {
        const ajaxCommands = this.commands;
        return Object.keys(response || {}).reduce((executionQueue, key) => executionQueue.then(() => {
            const {
                command
            } = response[key];
            if (command && ajaxCommands[command]) return ajaxCommands[command](this, response[key], status);
        }), Promise.resolve());
    };
    Drupal.Ajax.prototype.success = function(response, status) {
        if (this.progress.element) $('.' + $(this.progress.element).attr('class').replace(/\s/g, '.')).remove();
        if (this.progress.object) this.progress.object.stopMonitoring();
        $(this.element).prop('disabled', false);
        const elementParents = $(this.element).parents('[data-drupal-selector]').addBack().toArray();
        const focusChanged = Object.keys(response || {}).some((key) => {
            const {
                command,
                method
            } = response[key];
            return (command === 'focusFirst' || (command === 'invoke' && method === 'focus'));
        });
        return (this.commandExecutionQueue(response, status).then(() => {
            if (!focusChanged && this.element && !$(this.element).data('disable-refocus')) {
                let target = false;
                for (let n = elementParents.length - 1; !target && n >= 0; n--) target = document.querySelector(`[data-drupal-selector="${elementParents[n].getAttribute('data-drupal-selector')}"]`);
                if (target) $(target).trigger('focus');
            }
            if (this.$form && document.body.contains(this.$form.get(0))) {
                const settings = this.settings || drupalSettings;
                Drupal.attachBehaviors(this.$form.get(0), settings);
            }
            this.settings = null;
        }).catch((error) => console.error(Drupal.t('An error occurred during the execution of the Ajax response: !error', {
            '!error': error
        }))));
    };
    Drupal.Ajax.prototype.getEffect = function(response) {
        const type = response.effect || this.effect;
        const speed = response.speed || this.speed;
        const effect = {};
        if (type === 'none') {
            effect.showEffect = 'show';
            effect.hideEffect = 'hide';
            effect.showSpeed = '';
        } else if (type === 'fade') {
            effect.showEffect = 'fadeIn';
            effect.hideEffect = 'fadeOut';
            effect.showSpeed = speed;
        } else {
            effect.showEffect = `${type}Toggle`;
            effect.hideEffect = `${type}Toggle`;
            effect.showSpeed = speed;
        }
        return effect;
    };
    Drupal.Ajax.prototype.error = function(xmlhttprequest, uri, customMessage) {
        if (this.progress.element) $(this.progress.element).remove();
        if (this.progress.object) this.progress.object.stopMonitoring();
        $(this.wrapper).show();
        $(this.element).prop('disabled', false);
        if (this.$form && document.body.contains(this.$form.get(0))) {
            const settings = this.settings || drupalSettings;
            Drupal.attachBehaviors(this.$form.get(0), settings);
        }
        throw new Drupal.AjaxError(xmlhttprequest, uri, customMessage);
    };
    Drupal.theme.ajaxWrapperNewContent = ($newContent, ajax, response) => (response.effect || ajax.effect) !== 'none' && $newContent.filter((i) => !(($newContent[i].nodeName === '#comment' || ($newContent[i].nodeName === '#text' && /^(\s|\n|\r)*$/.test($newContent[i].textContent))))).length > 1 ? Drupal.theme('ajaxWrapperMultipleRootElements', $newContent) : $newContent;
    Drupal.theme.ajaxWrapperMultipleRootElements = ($elements) => $('<div></div>').append($elements);
    Drupal.AjaxCommands = function() {};
    Drupal.AjaxCommands.prototype = {
        insert(ajax, response) {
            const $wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
            const method = response.method || ajax.method;
            const effect = ajax.getEffect(response);
            const settings = response.settings || ajax.settings || drupalSettings;
            let $newContent = $($.parseHTML(response.data, document, true));
            $newContent = Drupal.theme('ajaxWrapperNewContent', $newContent, ajax, response);
            switch (method) {
                case 'html':
                case 'replaceWith':
                case 'replaceAll':
                case 'empty':
                case 'remove':
                    Drupal.detachBehaviors($wrapper.get(0), settings);
                    break;
                default:
                    break;
            }
            $wrapper[method]($newContent);
            if (effect.showEffect !== 'show') $newContent.hide();
            const $ajaxNewContent = $newContent.find('.ajax-new-content');
            if ($ajaxNewContent.length) {
                $ajaxNewContent.hide();
                $newContent.show();
                $ajaxNewContent[effect.showEffect](effect.showSpeed);
            } else {
                if (effect.showEffect !== 'show') $newContent[effect.showEffect](effect.showSpeed);
            }
            if ($newContent.parents('html').length) $newContent.each((index, element) => {
                if (element.nodeType === Node.ELEMENT_NODE) Drupal.attachBehaviors(element, settings);
            });
        },
        remove(ajax, response, status) {
            const settings = response.settings || ajax.settings || drupalSettings;
            $(response.selector).each(function() {
                Drupal.detachBehaviors(this, settings);
            }).remove();
        },
        changed(ajax, response, status) {
            const $element = $(response.selector);
            if (!$element.hasClass('ajax-changed')) {
                $element.addClass('ajax-changed');
                if (response.asterisk) $element.find(response.asterisk).append(` <abbr class="ajax-changed" title="${Drupal.t('Changed')}">*</abbr> `);
            }
        },
        alert(ajax, response, status) {
            window.alert(response.text);
        },
        announce(ajax, response) {
            if (response.priority) Drupal.announce(response.text, response.priority);
            else Drupal.announce(response.text);
        },
        redirect(ajax, response, status) {
            window.location = response.url;
        },
        css(ajax, response, status) {
            $(response.selector).css(response.argument);
        },
        settings(ajax, response, status) {
            const ajaxSettings = drupalSettings.ajax;
            if (ajaxSettings) Drupal.ajax.expired().forEach((instance) => {
                if (instance.selector) {
                    const selector = instance.selector.replace('#', '');
                    if (selector in ajaxSettings) delete ajaxSettings[selector];
                }
            });
            if (response.merge) $.extend(true, drupalSettings, response.settings);
            else ajax.settings = response.settings;
        },
        data(ajax, response, status) {
            $(response.selector).data(response.name, response.value);
        },
        focusFirst(ajax, response, status) {
            let focusChanged = false;
            const container = document.querySelector(response.selector);
            if (container) {
                const tabbableElements = tabbable(container);
                if (tabbableElements.length) {
                    tabbableElements[0].focus();
                    focusChanged = true;
                } else {
                    if (isFocusable(container)) {
                        container.focus();
                        focusChanged = true;
                    }
                }
            }
            if (ajax.hasOwnProperty('element') && !focusChanged) ajax.element.focus();
        },
        invoke(ajax, response, status) {
            const $element = $(response.selector);
            $element[response.method](...response.args);
        },
        restripe(ajax, response, status) {
            $(response.selector).find('> tbody > tr:visible, > tr:visible').removeClass('odd even').filter(':even').addClass('odd').end().filter(':odd').addClass('even');
        },
        update_build_id(ajax, response, status) {
            document.querySelectorAll(`input[name="form_build_id"][value="${response.old}"]`).forEach((item) => {
                item.value = response.new;
            });
        },
        add_css(ajax, response, status) {
            if (typeof response.data === 'string') {
                Drupal.deprecationError({
                    message: 'Passing a string to the Drupal.ajax.add_css() method is deprecated in 10.1.0 and is removed from drupal:11.0.0. See https://www.drupal.org/node/3154948.'
                });
                $('head').prepend(response.data);
                return;
            }
            const allUniqueBundleIds = response.data.map(function(style) {
                const uniqueBundleId = style.href + ajax.instanceIndex;
                loadjs(style.href, uniqueBundleId, {
                    before(path, styleEl) {
                        Object.keys(style).forEach((attributeKey) => {
                            styleEl.setAttribute(attributeKey, style[attributeKey]);
                        });
                    }
                });
                return uniqueBundleId;
            });
            return new Promise((resolve, reject) => {
                loadjs.ready(allUniqueBundleIds, {
                    success() {
                        resolve();
                    },
                    error(depsNotFound) {
                        const message = Drupal.t(`The following files could not be loaded: @dependencies`, {
                            '@dependencies': depsNotFound.join(', ')
                        });
                        reject(message);
                    }
                });
            });
        },
        message(ajax, response) {
            const messages = new Drupal.Message(document.querySelector(response.messageWrapperQuerySelector));
            if (response.clearPrevious) messages.clear();
            messages.add(response.message, response.messageOptions);
        },
        add_js(ajax, response, status) {
            const parentEl = document.querySelector(response.selector || 'body');
            const settings = ajax.settings || drupalSettings;
            const allUniqueBundleIds = response.data.map((script) => {
                const uniqueBundleId = script.src + ajax.instanceIndex;
                loadjs(script.src, uniqueBundleId, {
                    async: false,
                    before(path, scriptEl) {
                        Object.keys(script).forEach((attributeKey) => {
                            scriptEl.setAttribute(attributeKey, script[attributeKey]);
                        });
                        parentEl.appendChild(scriptEl);
                        return false;
                    }
                });
                return uniqueBundleId;
            });
            return new Promise((resolve, reject) => {
                loadjs.ready(allUniqueBundleIds, {
                    success() {
                        Drupal.attachBehaviors(parentEl, settings);
                        resolve();
                    },
                    error(depsNotFound) {
                        const message = Drupal.t(`The following files could not be loaded: @dependencies`, {
                            '@dependencies': depsNotFound.join(', ')
                        });
                        reject(message);
                    }
                });
            });
        },
        scrollTop(ajax, response) {
            const offset = $(response.selector).offset();
            let scrollTarget = response.selector;
            while ($(scrollTarget).scrollTop() === 0 && $(scrollTarget).parent()) scrollTarget = $(scrollTarget).parent();
            if (offset.top - 10 < $(scrollTarget).scrollTop()) $(scrollTarget).animate({
                scrollTop: offset.top - 10
            }, 500);
        }
    };
    const stopEvent = (xhr, settings) => {
        return (xhr.getResponseHeader('X-Drupal-Ajax-Token') === '1' && settings.isInProgress && settings.isInProgress());
    };
    $.extend(true, $.event.special, {
        ajaxSuccess: {
            trigger(event, xhr, settings) {
                if (stopEvent(xhr, settings)) return false;
            }
        },
        ajaxComplete: {
            trigger(event, xhr, settings) {
                if (stopEvent(xhr, settings)) {
                    $.active++;
                    return false;
                }
            }
        }
    });
})(jQuery, window, Drupal, drupalSettings, loadjs, window.tabbable);;
(function(Drupal) {
    Drupal.theme.ajaxProgressBar = function($element) {
        return $element.addClass('ajax-progress ajax-progress-bar');
    };
})(Drupal);;
(function($, Drupal) {
    'use strict';
    Drupal.behaviors.marketoMunchkin = {
        attach: function(context, settings) {
            const init = function() {
                let config = getMunchkinID();
                if (typeof Munchkin !== 'undefined') {
                    Munchkin.init(config);
                    var associator = document.location.hash.substring(1);
                    if (associator && typeof associator != 'undefined' && associator.length > 110) Munchkin.munchkinFunction.apply(Munchkin, JSON.parse(atob(associator)));
                }
            };
            const getMunchkinID = function() {
                if (typeof(settings.marketoForms) != 'undefined' && typeof(settings.marketoForms.munchkinId) != 'undefined' && settings.marketoForms.munchkinId) return settings.marketoForms.munchkinId;
                return false;
            };
            init();
        }
    };
})(jQuery, Drupal);;
(function(Drupal) {
    'use strict';
    Drupal.behaviors.lazy = {
        attach: function(context, settings) {
            var utils = {
                extend: function(obj, src) {
                    Object.keys(src).forEach(function(key) {
                        obj[key] = src[key];
                    });
                    return obj;
                },
                once: function(selector, context) {
                    return (context || document).querySelector(selector);
                },
                loadScript: function(url) {
                    if (document.querySelectorAll('script[src="' + url + '"]').length == 0) {
                        var script = document.createElement('script'),
                            scripts = document.getElementsByTagName('script')[0];
                        script.src = url;
                        script.async = true;
                        scripts.parentNode.insertBefore(script, scripts);
                    }
                }
            };
            if (utils.once('body', context)) {
                var lazysizes = settings.lazy.lazysizes || {};
                if (!settings.lazy.preferNative) {
                    window.lazySizesConfig = window.lazySizesConfig || {};
                    window.lazySizesConfig = utils.extend(window.lazySizesConfig, lazysizes);
                    if (!Object.entries) Object.entries = function(obj) {
                        var ownProps = Object.keys(obj),
                            i = ownProps.length,
                            resArray = new Array(i);
                        while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];
                        return resArray;
                    };
                    var min = settings.lazy.minified ? '.min' : '';
                    Object.entries(lazysizes.plugins).forEach(function(path) {
                        utils.loadScript(settings.lazy.libraryPath + '/plugins/' + path[1] + min + '.js');
                    });
                    utils.loadScript(settings.lazy.libraryPath + '/lazysizes' + min + '.js');
                }
            }
        }
    };
})(Drupal);;
(function($, Drupal, drupalSettings) {
    'use strict';
    Drupal.behaviors.stickynav = {
        breakpoint: 0,
        compensation: 0,
        originalPadding: 0,
        attach: function(context) {
            var selector = drupalSettings.stickynav.selector;
            var $menu = $(once('stickynav', selector)).eq(0);
            var offset = 0;
            if ($menu.length) {
                setTimeout(function() {
                    Drupal.behaviors.stickynav.originalPadding = $('body').find('.stickynav-active').length > 0 ? 0 : $('body').css('paddingTop');
                }, 100);
                offset += parseInt(drupalSettings.stickynav.offsets.custom_offset);
                offset = offset || 0;
                $(drupalSettings.stickynav.offsets.selector).each(function() {
                    offset += $(this).outerHeight();
                });
                Drupal.behaviors.stickynav.breakpoint = $menu.offset().top - offset;
                Drupal.behaviors.stickynav.compensation = $menu.outerHeight();
                $(window).scroll(function() {
                    if ($(window).scrollTop() > Drupal.behaviors.stickynav.breakpoint) {
                        $menu.addClass('stickynav-active');
                        if (offset) $menu.css({
                            top: offset + 'px'
                        });
                        $('body').css('padding-top', Drupal.behaviors.stickynav.compensation);
                    } else {
                        $menu.removeClass('stickynav-active');
                        $menu.css({
                            top: ''
                        });
                        $('body').css('padding-top', Drupal.behaviors.stickynav.originalPadding);
                    }
                });
            }
        }
    };
})(jQuery, Drupal, drupalSettings);;
(function($, Drupal, drupalSettings) {
    'use strict';
    Drupal.behaviors.regionSwitcher = {
        attach: function(context, settings) {
            const init = function() {
                let autoRedirect = localStorage.getItem('automaticRedirect');
                if (autoRedirect) initRedirectReset(autoRedirect);
            };
            const initRedirectReset = function(autoRedirect) {
                $('.region-redirect-reset-link').removeClass('hidden');
                $('.modal-redirect-reset-copy').text(settings.clearRedirectSettings[autoRedirect]);
                $('.clear-preference-link').click(function(e) {
                    e.preventDefault();
                    localStorage.removeItem('automaticRedirect');
                });
            };
            init();
        }
    };
}(jQuery, Drupal, window.drupalSettings));;
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = a(require("jquery")) : a(jQuery);
}(function(a) {
    a.extend(a.fn, {
        validate: function(b) {
            if (!this.length) return void(b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var c = a.data(this[0], "validator");
            return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.on("click.validate", ":submit", function(b) {
                c.submitButton = b.currentTarget, a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0);
            }), this.on("submit.validate", function(b) {
                function d() {
                    var d, e;
                    return c.submitButton && (c.settings.submitHandler || c.formSubmitted) && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), !(c.settings.submitHandler && !c.settings.debug) || (e = c.settings.submitHandler.call(c, c.currentForm, b), d && d.remove(), void 0 !== e && e);
                }
                return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1);
            })), c);
        },
        valid: function() {
            var b, c, d;
            return a(this[0]).is("form") ? b = this.validate().form() : (d = [], b = !0, c = a(this[0].form).validate(), this.each(function() {
                b = c.element(this) && b, b || (d = d.concat(c.errorList));
            }), c.errorList = d), b;
        },
        rules: function(b, c) {
            var d, e, f, g, h, i, j = this[0],
                k = "undefined" != typeof this.attr("contenteditable") && "false" !== this.attr("contenteditable");
            if (null != j && (!j.form && k && (j.form = this.closest("form")[0], j.name = this.attr("name")), null != j.form)) {
                if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {
                    case "add":
                        a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
                        break;
                    case "remove":
                        return c ? (i = {}, a.each(c.split(/\s/), function(a, b) {
                            i[b] = f[b], delete f[b];
                        }), i) : (delete e[j.name], f);
                }
                return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({
                    required: h
                }, g)), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, {
                    remote: h
                })), g;
            }
        }
    });
    var b = function(a) {
        return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    };
    a.extend(a.expr.pseudos || a.expr[":"], {
        blank: function(c) {
            return !b("" + a(c).val());
        },
        filled: function(c) {
            var d = a(c).val();
            return null !== d && !!b("" + d);
        },
        unchecked: function(b) {
            return !a(b).prop("checked");
        }
    }), a.validator = function(b, c) {
        this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init();
    }, a.validator.format = function(b, c) {
        return 1 === arguments.length ? function() {
            var c = a.makeArray(arguments);
            return c.unshift(b), a.validator.format.apply(this, c);
        } : void 0 === c ? b : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function(a, c) {
            b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function() {
                return c;
            });
        }), b);
    }, a.extend(a.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: a([]),
            errorLabelContainer: a([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(a) {
                this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a)));
            },
            onfocusout: function(a) {
                this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a);
            },
            onkeyup: function(b, c) {
                var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === c.which && "" === this.elementValue(b) || a.inArray(c.keyCode, d) !== -1 || (b.name in this.submitted || b.name in this.invalid) && this.element(b);
            },
            onclick: function(a) {
                a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode);
            },
            highlight: function(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d);
            },
            unhighlight: function(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d);
            }
        },
        setDefaults: function(b) {
            a.extend(a.validator.defaults, b);
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: a.validator.format("Please enter no more than {0} characters."),
            minlength: a.validator.format("Please enter at least {0} characters."),
            rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
            range: a.validator.format("Please enter a value between {0} and {1}."),
            max: a.validator.format("Please enter a value less than or equal to {0}."),
            min: a.validator.format("Please enter a value greater than or equal to {0}."),
            step: a.validator.format("Please enter a multiple of {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function b(b) {
                    var c = "undefined" != typeof a(this).attr("contenteditable") && "false" !== a(this).attr("contenteditable");
                    if (!this.form && c && (this.form = a(this).closest("form")[0], this.name = a(this).attr("name")), d === this.form) {
                        var e = a.data(this.form, "validator"),
                            f = "on" + b.type.replace(/^validate/, ""),
                            g = e.settings;
                        g[f] && !a(this).is(g.ignore) && g[f].call(e, this, b);
                    }
                }
                this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var c, d = this.currentForm,
                    e = this.groups = {};
                a.each(this.settings.groups, function(b, c) {
                    "string" == typeof c && (c = c.split(/\s/)), a.each(c, function(a, c) {
                        e[c] = b;
                    });
                }), c = this.settings.rules, a.each(c, function(b, d) {
                    c[b] = a.validator.normalizeRule(d);
                }), a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b), this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler);
            },
            form: function() {
                return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid();
            },
            checkForm: function() {
                this.prepareForm();
                for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);
                return this.valid();
            },
            element: function(b) {
                var c, d, e = this.clean(b),
                    f = this.validationTargetFor(e),
                    g = this,
                    h = !0;
                return void 0 === f ? delete this.invalid[e.name] : (this.prepareElement(f), this.currentElements = a(f), d = this.groups[f.name], d && a.each(this.groups, function(a, b) {
                    b === d && a !== f.name && (e = g.validationTargetFor(g.clean(g.findByName(a))), e && e.name in g.invalid && (g.currentElements.push(e), h = g.check(e) && h));
                }), c = this.check(f) !== !1, h = h && c, c ? this.invalid[f.name] = !1 : this.invalid[f.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), a(b).attr("aria-invalid", !c)), h;
            },
            showErrors: function(b) {
                if (b) {
                    var c = this;
                    a.extend(this.errorMap, b), this.errorList = a.map(this.errorMap, function(a, b) {
                        return {
                            message: a,
                            element: c.findByName(b)[0]
                        };
                    }), this.successList = a.grep(this.successList, function(a) {
                        return !(a.name in b);
                    });
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors();
            },
            resetForm: function() {
                a.fn.resetForm && a(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
                var b = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(b);
            },
            resetElements: function(a) {
                var b;
                if (this.settings.unhighlight)
                    for (b = 0; a[b]; b++) this.settings.unhighlight.call(this, a[b], this.settings.errorClass, ""), this.findByName(a[b].name).removeClass(this.settings.validClass);
                else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass);
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid);
            },
            objectLength: function(a) {
                var b, c = 0;
                for (b in a) void 0 !== a[b] && null !== a[b] && a[b] !== !1 && c++;
                return c;
            },
            hideErrors: function() {
                this.hideThese(this.toHide);
            },
            hideThese: function(a) {
                a.not(this.containers).text(""), this.addWrapper(a).hide();
            },
            valid: function() {
                return 0 === this.size();
            },
            size: function() {
                return this.errorList.length;
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").trigger("focus").trigger("focusin");
                } catch (b) {}
            },
            findLastActive: function() {
                var b = this.lastActive;
                return b && 1 === a.grep(this.errorList, function(a) {
                    return a.element.name === b.name;
                }).length && b;
            },
            elements: function() {
                var b = this,
                    c = {};
                return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                    var d = this.name || a(this).attr("name"),
                        e = "undefined" != typeof a(this).attr("contenteditable") && "false" !== a(this).attr("contenteditable");
                    return !d && b.settings.debug && window.console && console.error("%o has no name assigned", this), e && (this.form = a(this).closest("form")[0], this.name = d), this.form === b.currentForm && (!(d in c || !b.objectLength(a(this).rules())) && (c[d] = !0, !0));
                });
            },
            clean: function(b) {
                return a(b)[0];
            },
            errors: function() {
                var b = this.settings.errorClass.split(" ").join(".");
                return a(this.settings.errorElement + "." + b, this.errorContext);
            },
            resetInternals: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]);
            },
            reset: function() {
                this.resetInternals(), this.currentElements = a([]);
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers);
            },
            prepareElement: function(a) {
                this.reset(), this.toHide = this.errorsFor(a);
            },
            elementValue: function(b) {
                var c, d, e = a(b),
                    f = b.type,
                    g = "undefined" != typeof e.attr("contenteditable") && "false" !== e.attr("contenteditable");
                return "radio" === f || "checkbox" === f ? this.findByName(b.name).filter(":checked").val() : "number" === f && "undefined" != typeof b.validity ? b.validity.badInput ? "NaN" : e.val() : (c = g ? e.text() : e.val(), "file" === f ? "C:\\fakepath\\" === c.substr(0, 12) ? c.substr(12) : (d = c.lastIndexOf("/"), d >= 0 ? c.substr(d + 1) : (d = c.lastIndexOf("\\"), d >= 0 ? c.substr(d + 1) : c)) : "string" == typeof c ? c.replace(/\r/g, "") : c);
            },
            check: function(b) {
                b = this.validationTargetFor(this.clean(b));
                var c, d, e, f, g = a(b).rules(),
                    h = a.map(g, function(a, b) {
                        return b;
                    }).length,
                    i = !1,
                    j = this.elementValue(b);
                "function" == typeof g.normalizer ? f = g.normalizer : "function" == typeof this.settings.normalizer && (f = this.settings.normalizer), f && (j = f.call(b, j), delete g.normalizer);
                for (d in g) {
                    e = {
                        method: d,
                        parameters: g[d]
                    };
                    try {
                        if (c = a.validator.methods[d].call(this, j, b, e.parameters), "dependency-mismatch" === c && 1 === h) {
                            i = !0;
                            continue;
                        }
                        if (i = !1, "pending" === c) return void(this.toHide = this.toHide.not(this.errorsFor(b)));
                        if (!c) return this.formatAndAdd(b, e), !1;
                    } catch (k) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", k), k instanceof TypeError && (k.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."), k;
                    }
                }
                if (!i) return this.objectLength(g) && this.successList.push(b), !0;
            },
            customDataMessage: function(b, c) {
                return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg");
            },
            customMessage: function(a, b) {
                var c = this.settings.messages[a];
                return c && (c.constructor === String ? c : c[b]);
            },
            findDefined: function() {
                for (var a = 0; a < arguments.length; a++)
                    if (void 0 !== arguments[a]) return arguments[a];
            },
            defaultMessage: function(b, c) {
                "string" == typeof c && (c = {
                    method: c
                });
                var d = this.findDefined(this.customMessage(b.name, c.method), this.customDataMessage(b, c.method), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c.method], "<strong>Warning: No message defined for " + b.name + "</strong>"),
                    e = /\$?\{(\d+)\}/g;
                return "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), d;
            },
            formatAndAdd: function(a, b) {
                var c = this.defaultMessage(a, b);
                this.errorList.push({
                    message: c,
                    element: a,
                    method: b.method
                }), this.errorMap[a.name] = c, this.submitted[a.name] = c;
            },
            addWrapper: function(a) {
                return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a;
            },
            defaultShowErrors: function() {
                var a, b, c;
                for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                if (this.settings.unhighlight)
                    for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show();
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements());
            },
            invalidElements: function() {
                return a(this.errorList).map(function() {
                    return this.element;
                });
            },
            showLabel: function(b, c) {
                var d, e, f, g, h = this.errorsFor(b),
                    i = this.idOrName(b),
                    j = a(b).attr("aria-describedby");
                h.length ? (h.removeClass(this.settings.validClass).addClass(this.settings.errorClass), h.html(c)) : (h = a("<" + this.settings.errorElement + ">").attr("id", i + "-error").addClass(this.settings.errorClass).html(c || ""), d = h, this.settings.wrapper && (d = h.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, d, a(b)) : d.insertAfter(b), h.is("label") ? h.attr("for", i) : 0 === h.parents("label[for='" + this.escapeCssMeta(i) + "']").length && (f = h.attr("id"), j ? j.match(new RegExp("\\b" + this.escapeCssMeta(f) + "\\b")) || (j += " " + f) : j = f, a(b).attr("aria-describedby", j), e = this.groups[b.name], e && (g = this, a.each(g.groups, function(b, c) {
                    c === e && a("[name='" + g.escapeCssMeta(b) + "']", g.currentForm).attr("aria-describedby", h.attr("id"));
                })))), !c && this.settings.success && (h.text(""), "string" == typeof this.settings.success ? h.addClass(this.settings.success) : this.settings.success(h, b)), this.toShow = this.toShow.add(h);
            },
            errorsFor: function(b) {
                var c = this.escapeCssMeta(this.idOrName(b)),
                    d = a(b).attr("aria-describedby"),
                    e = "label[for='" + c + "'], label[for='" + c + "'] *";
                return d && (e = e + ", #" + this.escapeCssMeta(d).replace(/\s+/g, ", #")), this.errors().filter(e);
            },
            escapeCssMeta: function(a) {
                return void 0 === a ? "" : a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1");
            },
            idOrName: function(a) {
                return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name);
            },
            validationTargetFor: function(b) {
                return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0];
            },
            checkable: function(a) {
                return /radio|checkbox/i.test(a.type);
            },
            findByName: function(b) {
                return a(this.currentForm).find("[name='" + this.escapeCssMeta(b) + "']");
            },
            getLength: function(b, c) {
                switch (c.nodeName.toLowerCase()) {
                    case "select":
                        return a("option:selected", c).length;
                    case "input":
                        if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length;
                }
                return b.length;
            },
            depend: function(a, b) {
                return !this.dependTypes[typeof a] || this.dependTypes[typeof a](a, b);
            },
            dependTypes: {
                "boolean": function(a) {
                    return a;
                },
                string: function(b, c) {
                    return !!a(b, c.form).length;
                },
                "function": function(a, b) {
                    return a(b);
                }
            },
            optional: function(b) {
                var c = this.elementValue(b);
                return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch";
            },
            startRequest: function(b) {
                this.pending[b.name] || (this.pendingRequest++, a(b).addClass(this.settings.pendingClass), this.pending[b.name] = !0);
            },
            stopRequest: function(b, c) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], a(b).removeClass(this.settings.pendingClass), c && 0 === this.pendingRequest && this.formSubmitted && this.form() && 0 === this.pendingRequest ? (a(this.currentForm).trigger("submit"), this.submitButton && a("input:hidden[name='" + this.submitButton.name + "']", this.currentForm).remove(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1);
            },
            previousValue: function(b, c) {
                return c = "string" == typeof c && c || "remote", a.data(b, "previousValue") || a.data(b, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(b, {
                        method: c
                    })
                });
            },
            destroy: function() {
                this.resetForm(), a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur").find(".validate-lessThan-blur").off(".validate-lessThan").removeClass("validate-lessThan-blur").find(".validate-lessThanEqual-blur").off(".validate-lessThanEqual").removeClass("validate-lessThanEqual-blur").find(".validate-greaterThanEqual-blur").off(".validate-greaterThanEqual").removeClass("validate-greaterThanEqual-blur").find(".validate-greaterThan-blur").off(".validate-greaterThan").removeClass("validate-greaterThan-blur");
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(b, c) {
            b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b);
        },
        classRules: function(b) {
            var c = {},
                d = a(b).attr("class");
            return d && a.each(d.split(" "), function() {
                this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this]);
            }), c;
        },
        normalizeAttributeRule: function(a, b, c, d) {
            /min|max|step/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d), isNaN(d) && (d = void 0)), d || 0 === d ? a[c] = d : b === c && "range" !== b && (a["date" === b ? "dateISO" : c] = !0);
        },
        attributeRules: function(b) {
            var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), this.normalizeAttributeRule(e, g, c, d);
            return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e;
        },
        dataRules: function(b) {
            var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), "" === d && (d = !0), this.normalizeAttributeRule(e, g, c, d);
            return e;
        },
        staticRules: function(b) {
            var c = {},
                d = a.data(b.form, "validator");
            return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c;
        },
        normalizeRules: function(b, c) {
            return a.each(b, function(d, e) {
                if (e === !1) return void delete b[d];
                if (e.param || e.depends) {
                    var f = !0;
                    switch (typeof e.depends) {
                        case "string":
                            f = !!a(e.depends, c.form).length;
                            break;
                        case "function":
                            f = e.depends.call(c, c);
                    }
                    f ? b[d] = void 0 === e.param || e.param : (a.data(c.form, "validator").resetElements(a(c)), delete b[d]);
                }
            }), a.each(b, function(a, d) {
                b[a] = "function" == typeof d && "normalizer" !== a ? d(c) : d;
            }), a.each(["minlength", "maxlength"], function() {
                b[this] && (b[this] = Number(b[this]));
            }), a.each(["rangelength", "range"], function() {
                var a;
                b[this] && (Array.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (a = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(a[0]), Number(a[1])]));
            }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b;
        },
        normalizeRule: function(b) {
            if ("string" == typeof b) {
                var c = {};
                a.each(b.split(/\s/), function() {
                    c[this] = !0;
                }), b = c;
            }
            return b;
        },
        addMethod: function(b, c, d) {
            a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b));
        },
        methods: {
            required: function(b, c, d) {
                if (!this.depend(d, c)) return "dependency-mismatch";
                if ("select" === c.nodeName.toLowerCase()) {
                    var e = a(c).val();
                    return e && e.length > 0;
                }
                return this.checkable(c) ? this.getLength(b, c) > 0 : void 0 !== b && null !== b && b.length > 0;
            },
            email: function(a, b) {
                return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a);
            },
            url: function(a, b) {
                return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})+(?::(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a);
            },
            date: function() {
                var a = !1;
                return function(b, c) {
                    return a || (a = !0, this.settings.debug && window.console && console.warn("The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`.")), this.optional(c) || !/Invalid|NaN/.test(new Date(b).toString());
                };
            }(),
            dateISO: function(a, b) {
                return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a);
            },
            number: function(a, b) {
                return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a);
            },
            digits: function(a, b) {
                return this.optional(b) || /^\d+$/.test(a);
            },
            minlength: function(a, b, c) {
                var d = Array.isArray(a) ? a.length : this.getLength(a, b);
                return this.optional(b) || d >= c;
            },
            maxlength: function(a, b, c) {
                var d = Array.isArray(a) ? a.length : this.getLength(a, b);
                return this.optional(b) || d <= c;
            },
            rangelength: function(a, b, c) {
                var d = Array.isArray(a) ? a.length : this.getLength(a, b);
                return this.optional(b) || d >= c[0] && d <= c[1];
            },
            min: function(a, b, c) {
                return this.optional(b) || a >= c;
            },
            max: function(a, b, c) {
                return this.optional(b) || a <= c;
            },
            range: function(a, b, c) {
                return this.optional(b) || a >= c[0] && a <= c[1];
            },
            step: function(b, c, d) {
                var e, f = a(c).attr("type"),
                    g = "Step attribute on input type " + f + " is not supported.",
                    h = ["text", "number", "range"],
                    i = new RegExp("\\b" + f + "\\b"),
                    j = f && !i.test(h.join()),
                    k = function(a) {
                        var b = ("" + a).match(/(?:\.(\d+))?$/);
                        return b && b[1] ? b[1].length : 0;
                    },
                    l = function(a) {
                        return Math.round(a * Math.pow(10, e));
                    },
                    m = !0;
                if (j) throw new Error(g);
                return e = k(d), (k(b) > e || l(b) % l(d) !== 0) && (m = !1), this.optional(c) || m;
            },
            equalTo: function(b, c, d) {
                var e = a(d);
                return this.settings.onfocusout && e.not(".validate-equalTo-blur").length && e.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
                    a(c).valid();
                }), b === e.val();
            },
            remote: function(b, c, d, e) {
                if (this.optional(c)) return "dependency-mismatch";
                e = "string" == typeof e && e || "remote";
                var f, g, h, i = this.previousValue(c, e);
                return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), i.originalMessage = i.originalMessage || this.settings.messages[c.name][e], this.settings.messages[c.name][e] = i.message, d = "string" == typeof d && {
                    url: d
                } || d, h = a.param(a.extend({
                    data: b
                }, d.data)), i.old === h ? i.valid : (i.old = h, f = this, this.startRequest(c), g = {}, g[c.name] = b, a.ajax(a.extend(!0, {
                    mode: "abort",
                    port: "validate" + c.name,
                    dataType: "json",
                    data: g,
                    context: f.currentForm,
                    success: function(a) {
                        var d, g, h, j = a === !0 || "true" === a;
                        f.settings.messages[c.name][e] = i.originalMessage, j ? (h = f.formSubmitted, f.resetInternals(), f.toHide = f.errorsFor(c), f.formSubmitted = h, f.successList.push(c), f.invalid[c.name] = !1, f.showErrors()) : (d = {}, g = a || f.defaultMessage(c, {
                            method: e,
                            parameters: b
                        }), d[c.name] = i.message = g, f.invalid[c.name] = !0, f.showErrors(d)), i.valid = j, f.stopRequest(c, j);
                    }
                }, d)), "pending");
            }
        }
    });
    var c, d = {};
    return a.ajaxPrefilter ? a.ajaxPrefilter(function(a, b, c) {
        var e = a.port;
        "abort" === a.mode && (d[e] && d[e].abort(), d[e] = c);
    }) : (c = a.ajax, a.ajax = function(b) {
        var e = ("mode" in b ? b : a.ajaxSettings).mode,
            f = ("port" in b ? b : a.ajaxSettings).port;
        return "abort" === e ? (d[f] && d[f].abort(), d[f] = c.apply(this, arguments), d[f]) : c.apply(this, arguments);
    }), a;
});;
let form_submitted = false;
(function($, Drupal, drupalSettings) {
    let prev_email = '';
    Drupal.behaviors.cventMarketoFramework = {
        attach: function(context, settings) {
            assignCookieValDom();
            var url_param = $_GET();
            utm_Parameter_Dom(url_param);
            setQueryStringValues();
            loadMarketoForm();
            prePopulateFields();
            let submit_cta_element = $("#cvent_mrkto_button");
            $("#cvent_mrkto_form").on("focusout", "#cvent_mrkto_email", function(e) {
                let entered_email = $("#cvent_mrkto_email").val();
                if (entered_email === '' || entered_email === undefined || entered_email === null) return;
                let domainEntered = entered_email.replace(/.*@/, "");
                if (domainEntered === 'marketotesting.com') {
                    $('#cvent_mrkto_email').attr("email-validated", "true");
                    return;
                }
                let valildated_attr = $('#cvent_mrkto_form').attr('email-validated');
                if (prev_email === entered_email && valildated_attr !== 'false' && valildated_attr !== 'true') return;
                $("#cvent_mrkto_email").removeAttr("email-validated");
                let start_time = new Date().getTime();
                try {
                    $.ajax({
                        url: Drupal.url('marketo/qev/qev_email_validate'),
                        async: true,
                        cache: false,
                        data: {
                            qev_email: entered_email,
                            format: 'json'
                        },
                        dataType: 'json',
                        success: function(data) {
                            if (data.result === 'valid') $('#cvent_mrkto_email').attr("email-validated", "true");
                            else if (data.result === 'invalid') $("#cvent_mrkto_email").attr("email-validated", "false");
                            else $("#cvent_mrkto_email").attr("email-validated", "unknown");
                            prev_email = entered_email;
                        },
                        type: 'POST'
                    });
                } catch (error) {
                    prev_email = '';
                    console.log(error);
                }
            });
            let domains = '';
            let isHighValue = false;
            isHighValue = drupalSettings.isHighValue;
            if (isHighValue) {
                domains = drupalSettings.region_domains;
                regionDomainExclusion(domains);
            }
            if ($("#cvent_mrkto_product_specific_domain_exclusion").length) {
                let products = $("#cvent_mrkto_product_specific_domain_exclusion").val();
                domainExclusionListGenerator(products);
            }

            function sleepForCertainTime(element) {
                if ($(element).attr("email-validated") === "false") return false;
                return true;
            }
            $("#cvent_mrkto_form").validate({
                normalizer: function(value) {
                    return $.trim(value);
                },
                rules: {
                    Email: {
                        required: true,
                        checkDomain: true,
                        checkBadWords: true,
                        eMail: true
                    },
                    email_address: {
                        checkDomain: true,
                        checkBadWords: true,
                        eMail: true
                    },
                    FirstName: {
                        checkBadWords: true,
                        checkForNumbers: true
                    },
                    LastName: {
                        checkBadWords: true,
                        checkForNumbers: true
                    },
                    last_name: {
                        checkBadWords: true,
                        checkForNumbers: true
                    },
                    first_name: {
                        checkBadWords: true,
                        checkForNumbers: true
                    },
                    Company: {
                        checkBadWords: true,
                        org: true
                    },
                    company: {
                        checkBadWords: true,
                        org: true
                    },
                    Phone: {
                        phoneNo: true
                    },
                    work_phone: {
                        phoneNo: true
                    }
                },
                messages: {
                    FirstName: {
                        required: Drupal.t("Please enter your first name."),
                        checkForNumbers: Drupal.t("Please enter valid first name."),
                        checkBadWords: Drupal.t("Please enter valid first name.")
                    },
                    LastName: {
                        required: Drupal.t("Please enter your last name."),
                        checkForNumbers: Drupal.t("Please enter valid last name."),
                        checkBadWords: Drupal.t("Please enter valid last name.")
                    },
                    first_name: {
                        required: Drupal.t("Please enter your first name."),
                        checkForNumbers: Drupal.t("Please enter valid first name."),
                        checkBadWords: Drupal.t("Please enter valid first name.")
                    },
                    last_name: {
                        required: Drupal.t("Please enter your last name."),
                        checkForNumbers: Drupal.t("Please enter valid last name."),
                        checkBadWords: Drupal.t("Please enter valid last name.")
                    },
                    Email: {
                        required: Drupal.t("This field is required."),
                        checkDomain: Drupal.t("Please enter a valid work email address."),
                        checkBadWords: Drupal.t("Please enter a valid email address."),
                        eMail: Drupal.t("Please enter a valid email address.")
                    },
                    email_address: Drupal.t("Please enter a valid email address."),
                    Phone: Drupal.t("Please enter a valid phone number."),
                    work_phone: Drupal.t("Please enter a valid phone number."),
                    Company: Drupal.t("Please enter your organization."),
                    company: Drupal.t("Please enter your organization."),
                    title: Drupal.t("Please enter your job title."),
                    Country: Drupal.t("Please select an option."),
                    work_country: Drupal.t("Please select an option."),
                    State: Drupal.t("Please select an option."),
                    usertype: Drupal.t("Please select an option."),
                    work_state_code: Drupal.t("Please select an option."),
                    PostalCode: Drupal.t("Please enter your postal code."),
                    formComments: Drupal.t("Please let us know how we can help."),
                    Referredby__c: Drupal.t("Please enter your full name."),
                    Referrer_s_Email__c: Drupal.t("Please enter your email address."),
                    contactusproductselection: Drupal.t("Please select at least one product"),
                    contactUsformProductSelection: Drupal.t("Please select at least one product"),
                    ProductInfo: Drupal.t("Please select one product below"),
                    newsletter_signup_choice: Drupal.t("Please select at least one interest"),
                    Product_Desired__c: Drupal.t("Please select at least one product"),
                    "csn-cert-checkbox": Drupal.t("Please select at least one checkbox option"),
                    promoTermsChk: Drupal.t("Please agree to terms and conditions"),
                    Whichtype: Drupal.t("Please select at least one survey type"),
                    "cvt-amex-LearnMore": Drupal.t("Please select an option"),
                    "csn-cert-checkbox-certified": Drupal.t("Please select at least one option"),
                    survey_hospitality: Drupal.t("Please select at least one option"),
                    csnLearnMore: Drupal.t("Please select at least one option"),
                    Charge_Fee_for_Events__c: Drupal.t("Please select an option"),
                    eventOpt: Drupal.t("Please select an option")
                },
                errorPlacement: function(error, element) {
                    if (element.attr("type") === "radio" || element.attr("type") === "checkbox") error.insertBefore($(".productinfo.error"));
                    else error.insertAfter(element);
                },
                submitHandler: function(form) {
                    let result = sleepForCertainTime($("#cvent_mrkto_email"));
                    if (!result) {
                        this.showErrors({
                            "Email": Drupal.t("Please enter a valid email address")
                        });
                        this.focusInvalid();
                        return false;
                    }
                    var formData = $("#cvent_mrkto_form").serializeArray();
                    if ($(".web-survey-hospitality #cvent_mrkto_survey_hospitality_div").length > 0) {
                        if ($("#cvent_mrkto_survey_hospitality").val().length < 1) $("#cvent_mrkto_error").hide().html(Drupal.t("This field is required")).stop(true, true).slideDown(350);
                        else $("#cvent_mrkto_error").slideUp(350);
                        if (!$("#cvent_mrkto_error").is(':hidden')) return false;
                    }
                    unlockGatedResource();
                    $("#cvent_mrkto_submit").attr('disabled', 'disabled');
                    if ($("#cvent_mrkto_form").hasClass("id-confirm")) {
                        var g_token = $("#g_token").val();
                        var idc_data = handleIDConfirmData();
                        var capcha_response = verify_post_request_gv3(g_token);
                        $.when(capcha_response).done(function(data) {
                            idc_data.reCAPTCHAScore = data.output.score;
                            MktoForms2.whenReady(function(form) {
                                form.addHiddenFields(idc_data);
                                form.submit();
                                form.onSuccess(function(values, followUpUrl) {
                                    console.log(values);
                                    console.log(followUpUrl);
                                    return false;
                                });
                            });
                            $("#cvent_mrkto_form").attr("action", "//www.cvent.com/Events/APIs/Reg.aspx");
                            form.submit();
                        });
                    } else {
                        var g_token = $("#g_token").val();
                        var form_post_data = serializePostData(formData);
                        var capcha_response = verify_post_request_gv3(g_token);
                        $.when(capcha_response).done(function(data) {
                            form_post_data.reCAPTCHAScore = data.output.score;
                            MktoForms2.whenReady(function(form) {
                                form.addHiddenFields(form_post_data);
                                if (!form_submitted) try {
                                    form.submit();
                                    form_submitted = true;
                                } catch (error) {
                                    console.log(error);
                                    $("#cvent_mrkto_submit").removeAttr('disabled');
                                }
                                form.onSuccess(function(values, followUpUrl) {
                                    var ty_url = $("#cvent_mrkto_ty_url").val();
                                    var ot = $("#cvent_mrkto_offer_type").val();
                                    let is_content_track = drupalSettings.is_content_track;
                                    if (is_content_track) {
                                        let target_link = returnTYURLVal(ty_url, ot);
                                        if (!document.hasOwnProperty('form_submitted') || !document.form_submitted) {
                                            document.form_submitted = true;
                                            showThankyouMessageContentTrack(target_link);
                                        }
                                        return false;
                                    }
                                    window.location.href = returnTYURLVal(ty_url, ot);
                                    return false;
                                });
                            });
                        });
                    }
                }
            });
        }
    };
}(jQuery, Drupal, drupalSettings));;
(function(e) {
    var a = [],
        d = /^url\(["']?([^"'\)]*)["']?\);?$/i,
        c = /\.png$/i,
        b = !!window.createPopup && document.documentElement.currentStyle.minWidth == "undefined";

    function f() {
        e.each(a, function() {
            this.refresh(true);
        });
    }
    e(window).resize(f);
    e.Poshytip = function(h, g) {
        this.$elm = e(h);
        this.opts = e.extend({}, e.fn.poshytip.defaults, g);
        this.$tip = e(['<div class="', this.opts.className, '">', '<div class="tip-inner tip-bg-image"></div>', '<div class="tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left"></div>', "</div>"].join("")).appendTo(document.body);
        this.$arrow = this.$tip.find("div.tip-arrow");
        this.$inner = this.$tip.find("div.tip-inner");
        this.disabled = false;
        this.content = null;
        this.init();
    };
    e.Poshytip.prototype = {
        init: function() {
            a.push(this);
            var g = this.$elm.attr("title");
            this.$elm.data("title.poshytip", g !== undefined ? g : null).data("poshytip", this);
            if (this.opts.showOn != "none") {
                this.$elm.bind({
                    "mouseenter.poshytip": e.proxy(this.mouseenter, this),
                    "mouseleave.poshytip": e.proxy(this.mouseleave, this)
                });
                switch (this.opts.showOn) {
                    case "hover":
                        if (this.opts.alignTo == "cursor") this.$elm.bind("mousemove.poshytip", e.proxy(this.mousemove, this));
                        if (this.opts.allowTipHover) this.$tip.hover(e.proxy(this.clearTimeouts, this), e.proxy(this.mouseleave, this));
                        break;
                    case "focus":
                        this.$elm.bind({
                            "focus.poshytip": e.proxy(this.showDelayed, this),
                            "blur.poshytip": e.proxy(this.hideDelayed, this)
                        });
                        break;
                }
            }
        },
        mouseenter: function(g) {
            if (this.disabled) return true;
            this.$elm.attr("title", "");
            if (this.opts.showOn == "focus") return true;
            this.showDelayed();
        },
        mouseleave: function(g) {
            if (this.disabled || this.asyncAnimating && (this.$tip[0] === g.relatedTarget || jQuery.contains(this.$tip[0], g.relatedTarget))) return true;
            if (!this.$tip.data("active")) {
                var h = this.$elm.data("title.poshytip");
                if (h !== null) this.$elm.attr("title", h);
            }
            if (this.opts.showOn == "focus") return true;
            this.hideDelayed();
        },
        mousemove: function(g) {
            if (this.disabled) return true;
            this.eventX = g.pageX;
            this.eventY = g.pageY;
            if (this.opts.followCursor && this.$tip.data("active")) {
                this.calcPos();
                this.$tip.css({
                    left: this.pos.l,
                    top: this.pos.t
                });
                if (this.pos.arrow) this.$arrow[0].className = "tip-arrow tip-arrow-" + this.pos.arrow;
            }
        },
        show: function() {
            if (this.disabled || this.$tip.data("active")) return;
            this.reset();
            this.update();
            if (!this.content) return;
            this.display();
            if (this.opts.timeOnScreen) this.hideDelayed(this.opts.timeOnScreen);
        },
        showDelayed: function(g) {
            this.clearTimeouts();
            this.showTimeout = setTimeout(e.proxy(this.show, this), typeof g == "number" ? g : this.opts.showTimeout);
        },
        hide: function() {
            if (this.disabled || !this.$tip.data("active")) return;
            this.display(true);
        },
        hideDelayed: function(g) {
            this.clearTimeouts();
            this.hideTimeout = setTimeout(e.proxy(this.hide, this), typeof g == "number" ? g : this.opts.hideTimeout);
        },
        reset: function() {
            this.$tip.queue([]).detach().css("visibility", "hidden").data("active", false);
            this.$inner.find("*").poshytip("hide");
            if (this.opts.fade) this.$tip.css("opacity", this.opacity);
            this.$arrow[0].className = "tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left";
            this.asyncAnimating = false;
        },
        update: function(j, k) {
            if (this.disabled) return;
            var i = j !== undefined;
            if (i) {
                if (!k) this.opts.content = j;
                if (!this.$tip.data("active")) return;
            } else j = this.opts.content;
            var h = this,
                g = typeof j == "function" ? j.call(this.$elm[0], function(l) {
                    h.update(l);
                }) : j == "[title]" ? this.$elm.data("title.poshytip") : j;
            if (this.content !== g) {
                this.$inner.empty().append(g);
                this.content = g;
            }
            this.refresh(i);
        },
        refresh: function(h) {
            if (this.disabled) return;
            if (h) {
                if (!this.$tip.data("active")) return;
                var k = {
                    left: this.$tip.css("left"),
                    top: this.$tip.css("top")
                };
            }
            this.$tip.css({
                left: 0,
                top: 0
            }).appendTo(document.body);
            if (this.opacity === undefined) this.opacity = this.$tip.css("opacity");
            var l = this.$tip.css("background-image").match(d),
                m = this.$arrow.css("background-image").match(d);
            if (l) {
                var i = c.test(l[1]);
                if (b && i) {
                    this.$tip.css("background-image", "none");
                    this.$inner.css({
                        margin: 0,
                        border: 0,
                        padding: 0
                    });
                    l = i = false;
                } else this.$tip.prepend('<table class="tip-table" border="0" cellpadding="0" cellspacing="0"><tr><td class="tip-top tip-bg-image" colspan="2"><span></span></td><td class="tip-right tip-bg-image" rowspan="2"><span></span></td></tr><tr><td class="tip-left tip-bg-image" rowspan="2"><span></span></td><td></td></tr><tr><td class="tip-bottom tip-bg-image" colspan="2"><span></span></td></tr></table>').css({
                    border: 0,
                    padding: 0,
                    "background-image": "none",
                    "background-color": "transparent"
                }).find(".tip-bg-image").css("background-image", 'url("' + l[1] + '")').end().find("td").eq(3).append(this.$inner);
                if (i && !e.support.opacity) this.opts.fade = false;
            }
            if (m && !e.support.opacity) {
                if (b && c.test(m[1])) {
                    m = false;
                    this.$arrow.css("background-image", "none");
                }
                this.opts.fade = false;
            }
            var o = this.$tip.find("> table.tip-table");
            if (b) {
                this.$tip[0].style.width = "";
                o.width("auto").find("td").eq(3).width("auto");
                var n = this.$tip.width(),
                    j = parseInt(this.$tip.css("min-width")),
                    g = parseInt(this.$tip.css("max-width"));
                if (!isNaN(j) && n < j) n = j;
                else {
                    if (!isNaN(g) && n > g) n = g;
                }
                this.$tip.add(o).width(n).eq(0).find("td").eq(3).width("100%");
            } else {
                if (o[0]) o.width("auto").find("td").eq(3).width("auto").end().end().width(document.defaultView && document.defaultView.getComputedStyle && parseFloat(document.defaultView.getComputedStyle(this.$tip[0], null).width) || this.$tip.width()).find("td").eq(3).width("100%");
            }
            this.tipOuterW = this.$tip.outerWidth();
            this.tipOuterH = this.$tip.outerHeight();
            this.calcPos();
            if (m && this.pos.arrow) {
                this.$arrow[0].className = "tip-arrow tip-arrow-" + this.pos.arrow;
                this.$arrow.css("visibility", "inherit");
            }
            if (h && this.opts.refreshAniDuration) {
                this.asyncAnimating = true;
                var p = this;
                this.$tip.css(k).animate({
                    left: this.pos.l,
                    top: this.pos.t
                }, this.opts.refreshAniDuration, function() {
                    p.asyncAnimating = false;
                });
            } else this.$tip.css({
                left: this.pos.l,
                top: this.pos.t
            });
        },
        display: function(h) {
            var i = this.$tip.data("active");
            if (i && !h || !i && h) return;
            this.$tip.stop();
            if ((this.opts.slide && this.pos.arrow || this.opts.fade) && (h && this.opts.hideAniDuration || !h && this.opts.showAniDuration)) {
                var n = {},
                    m = {};
                if (this.opts.slide && this.pos.arrow) {
                    var l, g;
                    if (this.pos.arrow == "bottom" || this.pos.arrow == "top") {
                        l = "top";
                        g = "bottom";
                    } else {
                        l = "left";
                        g = "right";
                    }
                    var k = parseInt(this.$tip.css(l));
                    n[l] = k + (h ? 0 : (this.pos.arrow == g ? -this.opts.slideOffset : this.opts.slideOffset));
                    m[l] = k + (h ? (this.pos.arrow == g ? this.opts.slideOffset : -this.opts.slideOffset) : 0) + "px";
                }
                if (this.opts.fade) {
                    n.opacity = h ? this.$tip.css("opacity") : 0;
                    m.opacity = h ? 0 : this.opacity;
                }
                this.$tip.css(n).animate(m, this.opts[h ? "hideAniDuration" : "showAniDuration"]);
            }
            h ? this.$tip.queue(e.proxy(this.reset, this)) : this.$tip.css("visibility", "inherit");
            if (i) {
                var j = this.$elm.data("title.poshytip");
                if (j !== null) this.$elm.attr("title", j);
            }
            this.$tip.data("active", !i);
        },
        disable: function() {
            this.reset();
            this.disabled = true;
        },
        enable: function() {
            this.disabled = false;
        },
        destroy: function() {
            this.reset();
            this.$tip.remove();
            delete this.$tip;
            this.content = null;
            this.$elm.unbind(".poshytip").removeData("title.poshytip").removeData("poshytip");
            a.splice(e.inArray(this, a), 1);
        },
        clearTimeouts: function() {
            if (this.showTimeout) {
                clearTimeout(this.showTimeout);
                this.showTimeout = 0;
            }
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = 0;
            }
        },
        calcPos: function() {
            var n = {
                    l: 0,
                    t: 0,
                    arrow: ""
                },
                h = e(window),
                k = {
                    l: h.scrollLeft(),
                    t: h.scrollTop(),
                    w: h.width(),
                    h: h.height()
                },
                p, j, m, i, q, g;
            if (this.opts.alignTo == "cursor") {
                p = j = m = this.eventX;
                i = q = g = this.eventY;
            } else {
                var o = this.$elm.offset(),
                    l = {
                        l: o.left,
                        t: o.top,
                        w: this.$elm.outerWidth(),
                        h: this.$elm.outerHeight()
                    };
                p = l.l + (this.opts.alignX != "inner-right" ? 0 : l.w);
                j = p + Math.floor(l.w / 2);
                m = p + (this.opts.alignX != "inner-left" ? l.w : 0);
                i = l.t + (this.opts.alignY != "inner-bottom" ? 0 : l.h);
                q = i + Math.floor(l.h / 2);
                g = i + (this.opts.alignY != "inner-top" ? l.h : 0);
            }
            switch (this.opts.alignX) {
                case "right":
                case "inner-left":
                    n.l = m + this.opts.offsetX;
                    if (this.opts.keepInViewport && n.l + this.tipOuterW > k.l + k.w) n.l = k.l + k.w - this.tipOuterW;
                    if (this.opts.alignX == "right" || this.opts.alignY == "center") n.arrow = "left";
                    break;
                case "center":
                    n.l = j - Math.floor(this.tipOuterW / 2);
                    if (this.opts.keepInViewport)
                        if (n.l + this.tipOuterW > k.l + k.w) n.l = k.l + k.w - this.tipOuterW;
                        else {
                            if (n.l < k.l) n.l = k.l;
                        }
                    break;
                default:
                    n.l = p - this.tipOuterW - this.opts.offsetX;
                    if (this.opts.keepInViewport && n.l < k.l) n.l = k.l;
                    if (this.opts.alignX == "left" || this.opts.alignY == "center") n.arrow = "right";
            }
            switch (this.opts.alignY) {
                case "bottom":
                case "inner-top":
                    n.t = g + this.opts.offsetY;
                    if (!n.arrow || this.opts.alignTo == "cursor") n.arrow = "top";
                    if (this.opts.keepInViewport && n.t + this.tipOuterH > k.t + k.h) {
                        n.t = i - this.tipOuterH - this.opts.offsetY;
                        if (n.arrow == "top") n.arrow = "bottom";
                    }
                    break;
                case "center":
                    n.t = q - Math.floor(this.tipOuterH / 2);
                    if (this.opts.keepInViewport)
                        if (n.t + this.tipOuterH > k.t + k.h) n.t = k.t + k.h - this.tipOuterH;
                        else {
                            if (n.t < k.t) n.t = k.t;
                        }
                    break;
                default:
                    n.t = i - this.tipOuterH - this.opts.offsetY;
                    if (!n.arrow || this.opts.alignTo == "cursor") n.arrow = "bottom";
                    if (this.opts.keepInViewport && n.t < k.t) {
                        n.t = g + this.opts.offsetY;
                        if (n.arrow == "bottom") n.arrow = "top";
                    }
            }
            this.pos = n;
        }
    };
    e.fn.poshytip = function(h) {
        if (typeof h == "string") {
            var g = arguments,
                l = h;
            Array.prototype.shift.call(g);
            if (l == "destroy") this.die ? this.die("mouseenter.poshytip").die("focus.poshytip") : e(document).undelegate(this.selector, "mouseenter.poshytip").undelegate(this.selector, "focus.poshytip");
            return this.each(function() {
                var m = e(this).data("poshytip");
                if (m && m[l]) m[l].apply(m, g);
            });
        }
        var j = e.extend({}, e.fn.poshytip.defaults, h);
        if (!e("#poshytip-css-" + j.className)[0]) e(['<style id="poshytip-css-', j.className, '" type="text/css">', "div.", j.className, "{visibility:hidden;position:absolute;top:0;left:0;}", "div.", j.className, " table.tip-table, div.", j.className, " table.tip-table td{margin:0;font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;font-variant:inherit;vertical-align:middle;}", "div.", j.className, " td.tip-bg-image span{display:block;font:1px/1px sans-serif;height:", j.bgImageFrameSize, "px;width:", j.bgImageFrameSize, "px;overflow:hidden;}", "div.", j.className, " td.tip-right{background-position:100% 0;}", "div.", j.className, " td.tip-bottom{background-position:100% 100%;}", "div.", j.className, " td.tip-left{background-position:0 100%;}", "div.", j.className, " div.tip-inner{background-position:-", j.bgImageFrameSize, "px -", j.bgImageFrameSize, "px;}", "div.", j.className, " div.tip-arrow{visibility:hidden;position:absolute;overflow:hidden;font:1px/1px sans-serif;}", "</style>"].join("")).appendTo("head");
        if (j.liveEvents && j.showOn != "none") {
            var i, k = e.extend({}, j, {
                liveEvents: false
            });
            switch (j.showOn) {
                case "hover":
                    i = function() {
                        var m = e(this);
                        if (!m.data("poshytip")) m.poshytip(k).poshytip("mouseenter");
                    };
                    this.live ? this.live("mouseenter.poshytip", i) : e(document).delegate(this.selector, "mouseenter.poshytip", i);
                    break;
                case "focus":
                    i = function() {
                        var m = e(this);
                        if (!m.data("poshytip")) m.poshytip(k).poshytip("showDelayed");
                    };
                    this.live ? this.live("focus.poshytip", i) : e(document).delegate(this.selector, "focus.poshytip", i);
                    break;
            }
            return this;
        }
        return this.each(function() {
            new e.Poshytip(this, j);
        });
    };
    e.fn.poshytip.defaults = {
        content: "[title]",
        className: "tip-yellow",
        bgImageFrameSize: 10,
        showTimeout: 500,
        hideTimeout: 100,
        timeOnScreen: 0,
        showOn: "hover",
        liveEvents: false,
        alignTo: "cursor",
        alignX: "right",
        alignY: "top",
        offsetX: -22,
        offsetY: 18,
        keepInViewport: true,
        allowTipHover: true,
        followCursor: false,
        fade: true,
        slide: true,
        slideOffset: 8,
        showAniDuration: 300,
        hideAniDuration: 300,
        refreshAniDuration: 200
    };
})(jQuery);;
var query_string_values = {};
var marketoDtoFields;
const defaultOptinEnabledCountries = ["GB", "IE", "SE", "FR", "BE", "PL", "HU", "FI", "PT"];
var ipinfo_object;
const selectPrefillFieldsList = ["Job_Function__c"];
const prod_region_domain = ['www.cvent.com', 'cvent.com'];

function setQueryStringValues() {
    $.each($("#cvent_mrkto_form input").not("#cvent_mrkto_submit"), function(index, element) {
        var nameAttr = $(this).attr("name");
        switch (nameAttr) {
            case "txtFirstName":
                query_string_values['txtFirstName'] = returnQueryComponent('f');
                $(this).attr("value", query_string_values['txtFirstName']);
                break;
            case "txtLastName":
                query_string_values['txtLastName'] = returnQueryComponent('l');
                $(this).attr("value", query_string_values['txtLastName']);
                break;
            case "Email":
                query_string_values['Email'] = returnQueryComponent('email');
                $(this).attr("value", query_string_values['Email']);
                break;
            case "txtCompany":
                query_string_values['txtCompany'] = returnQueryComponent('c');
                $(this).attr("value", query_string_values['txtCompany']);
                break;
            case "txtJobTitle":
                query_string_values['txtJobTitle'] = returnQueryComponent('t');
                $(this).attr("value", query_string_values['txtJobTitle']);
                break;
            case "txtPhone":
                query_string_values['txtPhone'] = returnQueryComponent('p');
                $(this).attr("value", query_string_values['txtPhone']);
                break;
            case "txtPostalCode":
                query_string_values["txtPostalCode"] = returnQueryComponent('z');
                $(this).attr("value", query_string_values["txtPostalCode"]);
                break;
            case "Country":
                query_string_values['Country'] = returnQueryComponent('r');
                $(this).attr("value", query_string_values['Country']);
                break;
            case "ddlStateCode":
                query_string_values['ddlStateCode'] = returnQueryComponent('s');
                $(this).attr("value", query_string_values['ddlStateCode']);
                break;
            case "first_name":
                query_string_values['first_name'] = returnQueryComponent('f');
                $(this).attr("value", query_string_values['first_name']);
                break;
            case "last_name":
                query_string_values['last_name'] = returnQueryComponent('l');
                $(this).attr("value", query_string_values['last_name']);
                break;
            case "email_address":
                query_string_values['email_address'] = returnQueryComponent('email');
                $(this).attr("value", query_string_values['email_address']);
                break;
            case "company":
                query_string_values['company'] = returnQueryComponent('c');
                $(this).attr("value", query_string_values['company']);
                break;
            case "title":
                query_string_values['title'] = returnQueryComponent('t');
                $(this).attr("value", query_string_values['title']);
                break;
            case "work_phone":
                query_string_values['work_phone'] = returnQueryComponent('p');
                $(this).attr("value", query_string_values['work_phone']);
                break;
            case "work_postal_code":
                query_string_values['work_postal_code'] = returnQueryComponent('z');
                $(this).attr("value", query_string_values['work_postal_code']);
                break;
            case "work_country":
                query_string_values['work_country'] = returnQueryComponent('r');
                $(this).attr("value", query_string_values['work_country']);
                break;
            case "work_state_code":
                query_string_values['work_state_code'] = returnQueryComponent('s');
                $(this).attr("value", query_string_values['work_state_code']);
                break;
            case "queryStringLS":
                query_string_values['queryStringLS'] = returnQueryComponent('LS');
                $(this).attr("value", query_string_values['queryStringLS']);
                break;
            case "lead_source":
                query_string_values['lead_source'] = returnQueryComponent('lead_source');
                $(this).attr("value", query_string_values['lead_source']);
                break;
            case "target":
                query_string_values['target'] = returnQueryComponent('target');
                $(this).attr("value", query_string_values['target']);
                break;
            case "ref_id":
                query_string_values['ref_id'] = returnQueryComponent('refID');
                $(this).attr("value", query_string_values['ref_id']);
                break;
            case "ecode":
                query_string_values['ecode'] = returnQueryComponent('ecode');
                $(this).attr("value", query_string_values['ecode']);
                break;
            case "meetingKey":
                query_string_values['meetingKey'] = returnQueryComponent('meetingKey');
                $(this).attr("value", query_string_values['meetingKey']);
                break;
            case "cventEventName":
                query_string_values['cventEventName'] = returnQueryComponent('etitle');
                $(this).attr("value", query_string_values['cventEventName']);
                break;
            case "reg_code":
                query_string_values['reg_code'] = returnQueryComponent('reg_code');
                $(this).attr("value", query_string_values['reg_code']);
                break;
            case "scode":
                query_string_values['scode'] = returnQueryComponent('scode');
                $(this).attr("value", returnQueryComponent('scode'));
                break;
            case "field1":
                var query = returnQueryComponent('gb');
                query_string_values['field1'] = query;
                $(this).attr("value", query);
                if (typeof query !== "undefined" && query.toLowerCase() === 'true') $(this).attr('checked', true);
                break;
            case "field2":
                var query = returnQueryComponent('me');
                query_string_values['field2'] = query;
                $(this).attr("value", query);
                if (typeof query !== "undefined" && query.toLowerCase() === 'true') $(this).attr('checked', true);
                break;
            case "field3":
                var query = returnQueryComponent('hm');
                query_string_values['field3'] = query;
                $(this).attr("value", query);
                if (typeof query !== "undefined" && query.toLowerCase() === 'true') $(this).attr('checked', true);
                break;
            case "field4":
                var query = returnQueryComponent('niq');
                query_string_values['field4'] = query;
                $(this).attr("value", query);
                if (typeof query !== "undefined" && query.toLowerCase() === 'true') $(this).attr('checked', true);
                break;
            case "field5":
                var query = returnQueryComponent('em');
                query_string_values['field5'] = query;
                $(this).attr("value", query);
                if (typeof query !== "undefined" && query.toLowerCase() === 'true') $(this).attr('checked', true);
                break;
            case "field6":
                var query = returnQueryComponent('ma');
                query_string_values['field6'] = query;
                $(this).attr("value", query);
                if (typeof query !== "undefined" && query.toLowerCase() === 'true') $(this).attr('checked', true);
                break;
            case "field7":
                var query = returnQueryComponent('smm');
                query_string_values['field7'] = query;
                $(this).attr("value", query);
                if (typeof query !== "undefined" && query.toLowerCase() === 'true') $(this).attr('checked', true);
                break;
            case "field8":
                var query = returnQueryComponent('sn');
                query_string_values['field8'] = query;
                $(this).attr("value", query);
                if (typeof query !== "undefined" && query.toLowerCase() === 'true') $(this).attr('checked', true);
                break;
            case "field9":
                var query = returnQueryComponent('ciq');
                query_string_values['field9'] = query;
                $(this).attr("value", query);
                if (typeof query !== "undefined" && query.toLowerCase() === 'true') $(this).attr('checked', true);
                break;
            case "field10":
                var query = returnQueryComponent('emi');
                query_string_values['field10'] = query;
                $(this).attr("value", query);
                if (typeof query !== "undefined" && query.toLowerCase() === 'true') $(this).attr('checked', true);
                break;
            case "FirstName":
                query_string_values['FirstName'] = returnQueryComponent('f');
                $(this).attr("value", query_string_values['FirstName']);
                break;
            case "LastName":
                query_string_values['LastName'] = returnQueryComponent('l');
                $(this).attr("value", query_string_values['LastName']);
                break;
            case "Company":
                query_string_values['Company'] = returnQueryComponent('c');
                $(this).attr("value", query_string_values['Company']);
                break;
            case "Title":
                query_string_values['Title'] = returnQueryComponent('t');
                $(this).attr("value", query_string_values['Title']);
                break;
            case "Phone":
                query_string_values['Phone'] = returnQueryComponent('p');
                $(this).attr("value", query_string_values['Phone']);
                break;
            case "PostalCode":
                query_string_values['PostalCode'] = returnQueryComponent('z');
                $(this).attr("value", query_string_values['PostalCode']);
                break;
            case "State":
                query_string_values['State'] = returnQueryComponent('s');
                $(this).attr("value", query_string_values['State']);
                break;
            case "eOYOffer":
                query_string_values['eOYOffer'] = returnQueryComponent('promo');
                $(this).attr("value", returnQueryComponent('promo'));
                break;
        }
    });
}

function checkMktoFrames(mktoContentWindow) {
    try {
        if (mktoContentWindow.frames.hasOwnProperty('SimpleDTO')) return true;
    } catch (e) {
        marketoDtoFields = [];
        console.log(e.message);
    }
    return false;
}

function isQueryParamsEmpty(query_param_values) {
    for (var [key, value] of Object.entries(query_param_values))
        if (typeof value !== 'undefined') return false;
    return true;
}

function handleMessage(event) {
    if (event.origin === 'https://hello.cvent.com' && (typeof event.data) === 'object' && event.data.hasOwnProperty('Country')) {
        console.log("Received a message for the prefill from " + event.origin + ".");
        var messageFromSender = event.data;
        marketoDtoFields = messageFromSender;
    }
    return;
}

function loadMarketoDtoFields() {
    let marketo_lp_src = "https://hello.cvent.com/MKTO-form-prefill-dev.html";
    if (document.domain === 'cvent.com' || document.domain === "www.cvent.com") marketo_lp_src = "https://hello.cvent.com/MKT-form-prefill.html";
    try {
        let iframe_source = marketo_lp_src;
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', iframe_source);
        iframe.setAttribute('id', 'mktoPrefillIframe');
        iframe.setAttribute('style', "display:none;");
        iframe.style.width = 450 + 'px';
        iframe.style.height = 200 + 'px';
        document.body.appendChild(iframe);
        if (window.addEventListener) window.addEventListener("message", handleMessage);
        else window.attachEvent("onmessage", handleMessage);
    } catch (err) {
        marketoDtoFields = [];
    }
}

function getUserCountryCode() {
    if (drupalSettings.hasOwnProperty('region_consolidation'))
        if (drupalSettings.region_consolidation.actual_country !== '' && drupalSettings.region_consolidation.actual_country !== null) return drupalSettings.region_consolidation.actual_country;
    return 'US';
}

function prefillStateValue() {
    let state_form_element = $('#cvent_mrkto_form').find("[name='State']");
    if (typeof(marketoDtoFields) === 'object' && marketoDtoFields.hasOwnProperty('State') && marketoDtoFields.State !== "" && $(state_form_element).length) $(state_form_element).val(marketoDtoFields.State);
}

function manageOptinValue(country) {
    if (typeof(MktoForms2) !== 'object') {
        setTimeout('populateOptinDefaultValue(' + country + ')', 250);
        return;
    }
    MktoForms2.whenReady(function(form) {
        if (country === 'US') {
            $("input[name='tempImplicitOptin']").val("Yes");
            return;
        }
        let is_optin_yes = isTempImplicitOptinYes();
        if (is_optin_yes) {
            $("input[name='tempImplicitOptin']").val("Yes");
            jQuery('#cvent_mrkto_form').find('.opt-in-box .not-opted-in-prefill').hide();
            jQuery('#cvent_mrkto_form').find('.opt-in-box .opted-in-prefill').show();
            jQuery('#cvent_mrkto_form').find('#cvent_mrkto_chkopt_ch').prop("checked", true);
            jQuery('#cvent_mrkto_form').find('#cvent_mrkto_chkopt_ch').hide();
            jQuery('#cvent_mrkto_form').find('#cvent_mrkto_chkopt_ch').prop("disabled", true);
        } else if (defaultOptinEnabledCountries.includes(country)) {
            $("input[name='tempImplicitOptin']").val("Yes");
            jQuery('#cvent_mrkto_form').find('.opt-in-box .not-opted-in-prefill').show();
            jQuery('#cvent_mrkto_form').find('.opt-in-box .opted-in-prefill').hide();
            jQuery('#cvent_mrkto_form').find('#cvent_mrkto_chkopt_ch').prop("checked", true);
            jQuery('#cvent_mrkto_form').find('#cvent_mrkto_chkopt_ch').hide();
            jQuery('#cvent_mrkto_form').find('#cvent_mrkto_chkopt_ch').prop("disabled", true);
        } else {
            $("input[name='tempImplicitOptin']").val("No");
            jQuery('#cvent_mrkto_form').find('.opt-in-box .not-opted-in-prefill').show();
            jQuery('#cvent_mrkto_form').find('.opt-in-box .opted-in-prefill').hide();
            jQuery('#cvent_mrkto_form').find('#cvent_mrkto_chkopt_ch').prop("checked", false);
            jQuery('#cvent_mrkto_form').find('#cvent_mrkto_chkopt_ch').show();
            jQuery('#cvent_mrkto_form').find('#cvent_mrkto_chkopt_ch').prop("disabled", false);
        }
    });
}

function getTempImplicitOptinValue() {
    if (typeof marketoDtoFields === 'object' && marketoDtoFields !== null && marketoDtoFields.hasOwnProperty('tempImplicitOptin')) return marketoDtoFields.tempImplicitOptin;
    return false;
}

function isTempImplicitOptinYes() {
    if (getTempImplicitOptinValue() === 'Yes') return true;
    return false;
}

function prepopulateProgressiveForms() {
    optin_value = getTempImplicitOptinValue();
    if (optin_value === 'Yes' && jQuery("#marketo-forms-2-opt-in").length) {
        jQuery("#marketo-forms-2-opt-in").prop("checked", true);
        jQuery("#marketo-forms-2-opt-in").val(optin_value);
        jQuery("#marketo-forms-2-opt-in").prop("disabled", true);
        jQuery(".paragraph--type--form-marketo-2 input[name='tempImplicitOptin']").val(optin_value);
    }
    if (optin_value === 'No' && jQuery("#marketo-forms-2-opt-in").length) {
        jQuery("#marketo-forms-2-opt-in").prop("checked", false);
        jQuery("#marketo-forms-2-opt-in").val(optin_value);
        jQuery("#marketo-forms-2-opt-in").prop("disabled", false);
        jQuery(".paragraph--type--form-marketo-2 input[name='tempImplicitOptin']").val(optin_value);
    }
}

function prePopulateFields() {
    if (typeof(MktoForms2) !== 'object') {
        setTimeout('prePopulateFields()', 250);
        return;
    }
    MktoForms2.whenReady(function(form) {
        if (!isQueryParamsEmpty(query_string_values)) {
            console.log('query params not empty, cancelling marketo prepopulation');
            return;
        }
        form.addHiddenFields(marketoDtoFields);
        for (var mkto_field in marketoDtoFields) {
            if (mkto_field === 'tempImplicitOptin') continue;
            let current_form_element = jQuery('#cvent_mrkto_form').find("[name=" + mkto_field + "]");
            if ($(current_form_element).length) {
                if ($(current_form_element).is('input')) $(current_form_element).val(marketoDtoFields[mkto_field]);
                if ($(current_form_element).is('select') && $.inArray(mkto_field, selectPrefillFieldsList) !== -1) $(current_form_element).val(marketoDtoFields[mkto_field]);
            }
        }
    });
}
loadMarketoDtoFields();;
var mainStateList = [],
    postState = '',
    postCountry = '',
    prefillState = false;
(function($) {
    $(function() {
        $.getJSON("/modules/custom/cvent_marketo/js/statelist.js", function(data) {
            $.each(data.stateList, function(text, value) {
                mainStateList.push({
                    val: TrimString(value.stateCode.toUpperCase()),
                    text: TrimString(value.stateName),
                    title: TrimString(value.countryCode.toUpperCase())
                });
            });
            mainStateList.sort(function(a, b) {
                if (a.text > b.text) return 1;
                else if (a.text === b.text) return 0;
                else return -1;
            });
        });
    });
}(jQuery));

function TrimString(sInString) {
    if (sInString) {
        sInString = sInString.replace(/^\s+/g, "");
        return sInString.replace(/\s+$/g, "");
    }
}

function populateCountry(defaultCountry) {
    if (postCountry !== '') defaultCountry = postCountry;
    var countryFavorite = [],
        country = [],
        mainCountryList = [];
    var lang = drupalSettings.path.currentLanguage;
    if (lang === 'en' || lang === 'en-GB' || lang === 'en-AU' || lang === 'en-SG' || lang === 'en-AE' || lang === 'en-IN') lang = '';
    else {
        if (lang !== '') lang = '_' + lang;
    }
    var countryListFilename = 'countrylist' + lang + '.js';
    $.getJSON("/modules/custom/cvent_marketo/js/" + countryListFilename, function(data) {
        processCountry(data);
    }).fail(function() {
        $.getJSON("/modules/custom/cvent_marketo/js/countrylist.js", function(data) {
            processCountry(data);
        });
    });

    function processCountry(data) {
        $.each(data.countryList, function(text, value) {
            if (value.countryFavorite.length > 0) countryFavorite.push({
                val: TrimString(value.countryCode.toUpperCase()),
                text: TrimString(value.countryName)
            });
            else country.push({
                val: TrimString(value.countryCode.toUpperCase()),
                text: TrimString(value.countryName)
            });
        });
        country.sort(function(a, b) {
            if (a.text > b.text) return 1;
            else if (a.text === b.text) return 0;
            else return -1;
        });
        countryFavorite.sort(function(a, b) {
            if (a.text > b.text) return 1;
            else if (a.text === b.text) return 0;
            else return -1;
        });
        countryFavorite.push({
            val: 'DIVIDER',
            text: '----------'
        });
        mainCountryList = countryFavorite.concat(country);
        var selObj = document.getElementById('cvent_mrkto_country_select');
        var selObjProgressive = document.getElementById('Country');
        if (selObj) countryList(selObj);
        if (selObjProgressive) countryList(selObjProgressive);

        function countryList(cont) {
            cont.options[0] = new Option('Select Country', '');
            cont.selectedIndex = 0;
            for (var loop = 0; loop < mainCountryList.length; loop++) {
                if (mainCountryList[loop].val !== '')
                    if (mainCountryList[loop].val === 'DIVIDER')(cont.options[loop + 1] = new Option('--------------------------------------------------', mainCountryList[loop].val)).setAttribute('disabled', true);
                    else cont.options[loop + 1] = new Option(mainCountryList[loop].text, mainCountryList[loop].val);
                if (typeof defaultCountry !== 'undefined' && defaultCountry.toUpperCase() === mainCountryList[loop].val) cont.selectedIndex = loop + 1;
            }
        }
    }
}

function populateState() {
    var stl = document.getElementById('cvent_mrkto_state_select');
    if (stl) {
        var foundState = false;
        if (stl.type === 'select-one') {
            for (var i = 0; i < stl.options.length; i++) stl.options[i] = null;
            stl.options.length = null;
            stl.options[0] = new Option('Select state / province', '');
            stl.selectedIndex = 0;
        }
        var optionCntr = 1;
        for (var loop = 0; loop < mainStateList.length; loop++)
            if (document.getElementById('cvent_mrkto_country_select').value === mainStateList[loop].title && mainStateList[loop].title !== '') {
                if (stl.type === 'text') {
                    parentObj = document.getElementById('cvent_mrkto_state_select').parentNode;
                    parentObj.removeChild(stl);
                    var inputSel = document.createElement("SELECT");
                    inputSel.setAttribute("name", "state");
                    inputSel.setAttribute("id", "cvent_mrkto_state_select");
                    parentObj.appendChild(inputSel);
                    stl = document.getElementById('cvent_mrkto_state_select');
                    stl.options[0] = new Option('Select state / province', '');
                    stl.selectedIndex = 0;
                }
                if (mainStateList[loop].val !== '') stl.options[optionCntr] = new Option(mainStateList[loop].text, mainStateList[loop].val);
                foundState = true;
                optionCntr++;
            }
        if (!foundState) {
            $("[name='State']").val("null");
            document.getElementById('cvent_mrkto_state_select').disabled = true;
            $(".marketo-state-w").addClass('hide-state-w');
            $("#cvent_mrkto_state_select").removeClass("required");
            $("#cvent_mrkto_state_select").removeAttr("aria-required");
        } else {
            document.getElementById('cvent_mrkto_state_select').disabled = false;
            prefillState = true;
            $("#cvent_mrkto_state_select").addClass("required");
            $(".marketo-state-w").removeClass('hide-state-w');
            $("#cvent_mrkto_state_select").attr("aria-required", "true");
        }
    }
}

function initCountry(country) {
    let total_delay = 0;
    let delay_time = 300;
    var initiateCountry = setInterval(function() {
        total_delay = total_delay + delay_time;
        if ((typeof marketoDtoFields === 'object' && typeof MktoForms2 === 'object') || total_delay >= 4000) {
            if (typeof(marketoDtoFields) === 'object' && marketoDtoFields.hasOwnProperty('Country') && marketoDtoFields.Country !== "") {
                country = marketoDtoFields.Country;
                document.userKnownInMarketo = true;
            } else {
                country = getUserCountryCode();
                document.userKnownInMarketo = false;
            }
            populateCountry(country);
            setTimeout(function() {
                populateState();
                prefillStateValue();
            }, 1800);
            clearInterval(initiateCountry);
        }
    }, delay_time);
};
var productDomainExclusionSitesArray = [];
let regionDomainExclusionSitesArray = [];

function regionDomainExclusion(domains) {
    regionDomainExclusionSitesArray = domains;
}

function domainExclusionListGenerator(products) {
    if (typeof products === "undefined") return;
    var product = products.split(",");
    for (var index = 0; product.length > index; index++) switch (product[index]) {
        case "Event":
            productDomainExclusionSitesArray[product[index]] = sExcludedListEvent;
            break;
        case "CrowdCompass":
            productDomainExclusionSitesArray[product[index]] = sExcludedListCrowdCompass;
            break;
        case "CSN":
            productDomainExclusionSitesArray[product[index]] = sExcludedListCsn;
            break;
        case "Survey":
            productDomainExclusionSitesArray[product[index]] = sExcludedListSurvey;
            break;
    }
}

function domainExclusion(products) {
    if (typeof products === "undefined") return;
    else {
        var product = products.split(",");
        for (var index = 0; product.length > index; index++) switch (product[index]) {
            case "Event":
                $.getScript('/modules/custom/cvent_marketo/js/event-ex-domain-list.js');
                $(".domainExcList").attr("src", "/modules/custom/cvent_marketo/js/event-ex-domain-list.js");
                break;
            case "CrowdCompass":
                $.getScript('/modules/custom/cvent_marketo/js/cc-ex-domain-list.js');
                $(".domainExcList").attr("src", "/modules/custom/cvent_marketo/js/cc-ex-domain-list.js");
                break;
            case "CrowdTorch":
                $.getScript('/modules/custom/cvent_marketo/js/ct-tm-ex-domain-list.js');
                $(".domainExcList").attr("src", "/modules/custom/cvent_marketo/js/ct-tm-ex-domain-list.js");
                break;
            case "CT-Ticketing":
                $.getScript('/modules/custom/cvent_marketo/js/ct-tm-ex-domain-list.js');
                $(".domainExcList").attr("src", "/modules/custom/cvent_marketo/js/ct-tm-ex-domain-list.js");
                break;
            case "CSN":
                $.getScript('/modules/custom/cvent_marketo/js/csn-ex-domain-list.js');
                $(".domainExcList").attr("src", "/modules/custom/cvent_marketo/js/csn-ex-domain-list.js");
                break;
            case "Survey":
                $.getScript('/modules/custom/cvent_marketo/js/survey-ex-domain-list.js');
                $(".domainExcList").attr("src", "/modules/custom/cvent_marketo/js/survey-ex-domain-list.js");
                break;
        }
    }
}

function checkDomainValidator(value, element) {
    var filteredDomain = liftDomain();
    var domainEntered = value.replace(/.*@/, "");
    domainEntered = domainEntered.toLowerCase();
    var isAcceptableDomain = true;
    if ($.inArray(domainEntered, filteredDomain) >= 0) isAcceptableDomain = false;
    return isAcceptableDomain;
}

function checkBadWordsValidator(value, element) {
    let blockedWords = badWords;
    let valEntered = value.toLowerCase();
    let nameEntered = $.trim(valEntered);
    let isAcceptableName = true;
    let substrings = [];
    let domPart = [];
    if (typeof(nameEntered) === 'string')
        if (nameEntered.includes('@')) {
            substrings = nameEntered.split('@', 2);
            if (substrings[1].includes('.')) domPart = substrings[1].split('.', 2);
        }
    if ($.inArray(nameEntered, blockedWords) >= 0 || $.inArray(substrings[0], blockedWords) >= 0 || $.inArray(domPart[0], blockedWords) >= 0) {
        isAcceptableName = false;
        return isAcceptableName;
    }
    return isAcceptableName;
}

function liftDomain() {
    var filteredBlockedDomain = [];
    if (typeof sExcludedList2 === "undefined") var blockedDomain = sExcludedList1.map((arr) => arr.toLowerCase());
    else {
        var blockedDomain = sExcludedList1.map((arr) => arr.toLowerCase());
        blockedDomain = blockedDomain.concat(sExcludedList2);
    }
    for (var item in productDomainExclusionSitesArray) blockedDomain = blockedDomain.concat(productDomainExclusionSitesArray[item]);
    if (Array.isArray(regionDomainExclusionSitesArray) && regionDomainExclusionSitesArray.length) blockedDomain = blockedDomain.concat(regionDomainExclusionSitesArray);
    if (typeof domainExclusionArray === "undefined") var addedBlockedDomain = blockedDomain;
    else var addedBlockedDomain = blockedDomain.concat(domainExclusionArray);
    return addedBlockedDomain;
};
var ip_data;
var country_iso;

function getPageQueryVariable(variable) {
    var query = decodeURIComponent(window.location.search.substring(1));
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) return pair[1];
    }
}

function serializePostData(formData) {
    var len = formData.length;
    var dataObj = {};
    for (i = 0; i < len; i++)
        if (formData[i].name != 'token' && formData[i].name != 'action') dataObj[formData[i].name] = formData[i].value;
    return dataObj;
}

function returnQueryComponent(variableName) {
    var query = getPageQueryVariable(variableName);
    if (typeof query !== "undefined") query = decodeURIComponent(query);
    return query;
}

function returnTYURLVal(ty_url, offerTypeVal) {
    if (offerTypeVal.length > 0) {
        var tyurlParts = ty_url.split('?');
        if (tyurlParts.length > 1) {
            var queryVars = tyurlParts[1].split('&');
            var finalQueryVars = [];
            var hasExistingOTValue = false;
            for (var n = 0; n < queryVars.length; n++) {
                var queryValue = queryVars[n].split('=');
                if (queryValue.length === 2) {
                    finalQueryVars.push(queryValue[0] + '=' + queryValue[1]);
                    if (queryValue[0] === 'ot') hasExistingOTValue = true;
                }
            }
            if (!hasExistingOTValue) finalQueryVars.push('ot=' + offerTypeVal);
            if (finalQueryVars.length > 0) ty_url = tyurlParts[0] + '?' + finalQueryVars.join('&');
            else ty_url = tyurlParts[0];
        } else ty_url = ty_url + '?ot=' + offerTypeVal;
    }
    return ty_url;
}

function verify_post_request_gv3(token) {
    var res_data = $.ajax({
        url: Drupal.url('marketo/captcha-validity'),
        async: false,
        cache: false,
        data: {
            token,
            format: 'json'
        },
        dataType: 'json',
        success: function(data) {
            console.log(data);
            return data;
        },
        type: 'POST'
    });
    return res_data;
}

function get_IP_data(data) {
    ip_data = data;
    var client_ip = ip_data.ip;
    jQuery('#cvent_mrkto_form').append('<input type="hidden" id="client_ip" name="client_ip" value="' + client_ip + '">');
}

function rederGoogleToken() {
    grecaptcha.ready(function() {
        grecaptcha.execute('6Lcl5L4aAAAAAGWPzbmmT1BDUeWSpeZFwkUMhsKP', {
            action: 'validate_captcha'
        }).then(function(token) {
            jQuery('#cvent_mrkto_form').prepend('<input type="hidden" id="g_token" name="token" value="' + token + '">');
            jQuery('#cvent_mrkto_form').prepend('<input type="hidden" name="action" value="validate_captcha">');
        });
    });
}

function utm_Parameter_Dom(url_param) {
    if (typeof url_param['utm_source'] != 'undefined' && url_param['utm_source'] != '') jQuery('#cvent_mrkto_form').append('<input type="hidden" id="utm_source" name="utm_source" value="' + url_param['utm_source'] + '">');
    if (typeof url_param['utm_campaign'] != 'undefined' && url_param['utm_campaign'] != '') jQuery('#cvent_mrkto_form').append('<input type="hidden" id="utm_campaign" name="utm_campaign" value="' + url_param['utm_campaign'] + '">');
    if (typeof url_param['utm_medium'] != 'undefined' && url_param['utm_medium'] != '') jQuery('#cvent_mrkto_form').append('<input type="hidden" id="utm_medium" name="utm_medium" value="' + url_param['utm_medium'] + '">');
    if (typeof url_param['utm_term'] != 'undefined' && url_param['utm_term'] != '') jQuery('#cvent_mrkto_form').append('<input type="hidden" id="utm_term" name="utm_term" value="' + url_param['utm_term'] + '">');
    if (typeof url_param['utm_content'] != 'undefined' && url_param['utm_content'] != '') jQuery('#cvent_mrkto_form').append('<input type="hidden" id="utm_content" name="utm_content" value="' + url_param['utm_content'] + '">');
    if (typeof url_param['gclid'] != 'undefined' && url_param['gclid'] != '') jQuery('#cvent_mrkto_gclid').attr('value', url_param['gclid']);
    jQuery('#cvent_mrkto_form').append('<input type="hidden" id="page_url" name="page_url" value="' + window.location.href + '">');
    jQuery('#cvent_mrkto_form').append('<input type="hidden" id="user_agent" name="user_agent" value="' + navigator.userAgent + '">');
}

function assignCookieValDom() {
    if (typeof cventOneTrust.getCookie("_mkto_trk") !== "undefined") {
        var mkto_trk = cventOneTrust.getCookie("_mkto_trk");
        var mkto_split = mkto_trk.split("&");
        var mkto_id_split = mkto_split[0];
        var mkto_id_split2 = mkto_id_split.split(":");
        var mkto_id = mkto_id_split2[1];
        var mkto_token_split = mkto_split[1];
        var mkto_token_split2 = mkto_token_split.split(":");
        var mkto_token = mkto_token_split2[1];
        $("#cvent_mrkto_mkto_id").attr("value", mkto_id);
        $("#cvent_mrkto_mkto_token").attr("value", mkto_token);
        $("#cvent_mrkto_mkto_trk").attr("value", mkto_trk);
    }
}

function loadMarketoForm() {
    setTimeout(function() {
        var f_id = $('#cvent_mrkto_form_id').val();
        MktoForms2.loadForm("//hello.cvent.com/", "006-LRT-285", f_id);
        rederGoogleToken();
    }, 2000);
}

function handleIDConfirmData() {
    var id_confirm_data = {};
    var firstName = $("#cvent_mrkto_first_name").val();
    var lastName = $("#cvent_mrkto_last_name").val();
    var email = $("#cvent_mrkto_email").val();
    var organization = $("#cvent_mrkto_company").val();
    var job_title = $("#cvent_mrkto_job_title").val();
    var phoneNum = $("#cvent_mrkto_phone").val();
    var countrySelect = $("#cvent_mrkto_country_select").val();
    var stateSelect = $("#cvent_mrkto_state_select").val();
    var ecode = $("#cvent_mrkto_ecode").val();
    var zipCode = $("#cvent_mrkto_postal_code").val();
    var comments = $("#comments").val();
    var optIn = $("#cvent_mrkto_chkopt").val();
    var cventEventName = $("#cvent_mrkto_event_name").val();
    var lead_source = $("#cvent_mrkto_query_string_ls").val();
    var catering_system = $("#cvent_mrkto_sales_catering").val();
    var catering_system_other = $("#cvent_mrkto_sales_other").val();
    var fpt = $("#cvent_mrkto_form_program_type").val();
    var acv1 = $("#cvent_mrkto_readytoindtroduce1").val();
    var acv2 = $("#cvent_mrkto_readytoindtroduce2").val();
    var reCAPTCHAScore = $("input[name='reCAPTCHAScore']").val();
    var web_sdfc_campaign = $("#cvent_mrkto_campaign_name").val();
    var formID = $("#cvent_mrkto_form_id").val();
    var munchkinID = $("#cvent_mrkto_munchkin_id").val();
    var mkto_cookie = $("#cvent_mrkto_mkto_trk").val();
    var campProd = $("#cvent_mrkto_id_confirm_campaign_prod").val();
    var campType = $("#cvent_mrkto_id_confirm_campaign_type").val();
    var utm_source = $("#utm_source").val();
    var utm_campaign = $("#utm_campaign").val();
    var utm_medium = $("#utm_medium").val();
    var utm_term = $("#utm_term").val();
    var utm_content = $("#utm_content").val();
    var gclid = $("#cvent_mrkto_gclid").val();
    id_confirm_data = {
        "reCAPTCHAScore": reCAPTCHAScore,
        "FirstName": firstName,
        "LastName": lastName,
        "Email": email,
        "formid": formID,
        "Company": organization,
        "Title": job_title,
        "Phone": phoneNum,
        "Country": countrySelect,
        "State": stateSelect,
        "munchkinId": munchkinID,
        "_mkt_trk": mkto_cookie,
        "iDConfirmCampaignProduct": campProd,
        "iDConfirmCampaignType": campType,
        "eventStub": ecode,
        "queryStringLS": lead_source,
        "PostalCode": zipCode,
        "tempImplicitOptin": optIn,
        "cventEventName": cventEventName,
        "Sales_Catering_System__c": catering_system,
        "formComments": catering_system_other,
        "formProgramType": fpt,
        "booleantest": acv1,
        "booleantest": acv2,
        "utm_content": utm_content,
        "utm_term": utm_term,
        "utm_medium": utm_medium,
        "utm_campaign": utm_campaign,
        "utm_source": utm_source,
        "GCLID__c": gclid,
        "webSFDCCampaign": web_sdfc_campaign
    };
    return id_confirm_data;
}

function unlockGatedResource() {
    var resource_id = $('[resource-id]').attr('resource-id');
    var unlockUrl = drupalSettings.path.baseUrl + drupalSettings.path.pathPrefix + 'marketo/unlock_gated_content';
    if (resource_id !== undefined) $.ajax({
        method: 'POST',
        url: unlockUrl,
        data: {
            unlocked_content: resource_id
        }
    });
}

function countrySpecificOptin(country) {
    var countryArray = ["US", "CA"];
    var defaultOptinEnabledCountries = ["GB", "IE", "SE", "FR", "BE", "PL", "HU", "FI", "PT"];
    if (country === "US" && $.inArray(country, countryArray) > -1) {
        $(".opt-in-box, .c-address").hide();
        $(".optin-ca-address").remove();
    } else if (country === "CA" && $.inArray(country, countryArray) > -1) {
        $(".opt-in-box").show().removeClass('opt-in-no-input');
        $(".opt-in-box").find("#cvent_mrkto_chkopt_ch").show();
        if ($('.opt-in-box.read-terms').length) $(".opt-in-box.read-terms").find("label").each(function() {
            let optInLabelCopy = $(this).html();
            $(this).html(optInLabelCopy + "<p class='optin-ca-address'>Cvent, Inc. 1765 Greensboro Station Place<br>7th Floor, Tysons Corner, VA 22102</p>");
        });
        else $(".opt-in-box").find("label").each(function() {
            let optInLabelCopy = $(this).html();
            $(this).html(optInLabelCopy + "<p class='optin-ca-address'>Cvent, Inc. 1765 Greensboro Station Place<br>7th Floor, Tysons Corner, VA 22102</p>");
        });
    } else if (defaultOptinEnabledCountries.includes(country)) {
        $(".opt-in-box").show().addClass('opt-in-no-input');
        $(".opt-in-box").find("#cvent_mrkto_chkopt_ch").hide();
        $(".c-address").hide();
        $(".optin-ca-address").remove();
    } else {
        $(".opt-in-box").show().removeClass('opt-in-no-input');
        $(".opt-in-box").find("#cvent_mrkto_chkopt_ch").show();
        $(".c-address").hide();
        $(".optin-ca-address").remove();
    }
    manageOptinValue(country);
}

function optIn(optIn) {
    if (typeof optIn === "undefined") return;
    else if (optIn === true) {
        var countryArray = ["US", "CA"];
        var country_optin_interval = setInterval(function() {
            if (typeof marketoDtoFields === 'object' && typeof MktoForms2 === 'object') {
                if (marketoDtoFields.hasOwnProperty('Country') && marketoDtoFields.Country !== "") country = marketoDtoFields.Country;
                else country = getUserCountryCode();
                countrySpecificOptin(country);
                $("#cvent_mrkto_country_select").on("change", function(e) {
                    let selected_country = $(this).val();
                    countrySpecificOptin(selected_country);
                });
                clearInterval(country_optin_interval);
            }
        }, 100);
    } else $(".opt-in-box, .c-address").remove();
}

function $_GET(param) {
    var vars = {};
    window.location.href.replace(location.hash, '').replace(/[?&]+([^=&]+)=?([^&]*)?/gi, function(m, key, value) {
        vars[key] = value !== undefined ? value : '';
    });
    if (param) return vars[param] ? vars[param] : null;
    return vars;
}

function removeFieldName(field) {
    if (this.showFieldsArray.indexOf(field) === -1) {
        var $element = $('#' + field);
        if ($element.length > 0) {
            $element.parent().prev(".contact-label").remove();
            $element.parent().parent(".contact-us").remove();
            $element.parent(".contact-us").remove();
            $element.remove();
        }
    } else {
        var $element = $('#' + field);
        if ($element.length > 0) {
            $element.parent().parent(".contact-us").show();
            $element.parent(".contact-us").show();
            $element.show();
        }
    }
}

function addHiddenFieldMappingChangeHandler(mappedFieldName) {
    mappedFieldName = mappedFieldName.replace(/^#/, '');
    mappedFieldName = '#' + mappedFieldName;
    var elementName = this.elementName;
    var domElementType = $(mappedFieldName).prop('nodeName');
    if (domElementType === 'SELECT' || domElementType === 'INPUT') $(mappedFieldName).change({
        elementName
    }, function(passedObj) {
        setHiddenFieldMappingValue(passedObj.data.elementName);
    });
    else {
        if (domElementType === 'DIV') {
            var inputs = $(mappedFieldName).find(':input');
            inputs.map(function() {
                $(this).change({
                    elementName
                }, function(passedObj) {
                    setHiddenFieldMappingValue(passedObj.data.elementName);
                });
            });
        }
    }
}

function setHiddenFieldMappingValue(key) {
    var values = hiddenFieldMapping[key];
    var fieldValues = values.map(function(mappedFieldName) {
        mappedFieldName = mappedFieldName.replace(/^#/, '');
        mappedFieldName = '#' + mappedFieldName;
        var domElementType = $(mappedFieldName).prop('nodeName');
        if (domElementType === 'SELECT' || domElementType === 'INPUT') return $(mappedFieldName).val();
        else {
            if (domElementType === 'DIV') {
                var inputs = $(mappedFieldName).find(':input');
                var fieldVal = [];
                for (var n = 0; n < inputs.length; n++)
                    if ($(inputs[n]).is(':checked')) fieldVal.push($(inputs[n]).val());
                return fieldVal.join();
            }
        }
    });
    var elementId = key.replace(/^#/, '');
    elementId = '#' + elementId;
    fieldValues = fieldValues.filter(Boolean);
    $(elementId).val(fieldValues.join());
}

function thankYou(product, url) {
    if (typeof product === "undefined") return;
    else {
        switch (product) {
            case "General":
                url = "/en/get-in-touch-thank-you";
                break;
            case "Event":
                url = "/en/event-management-software/get-in-touch-thank-you";
                break;
            case "Mobile":
                url = "/en/mobile-event-apps/get-in-touch-thank-you";
                break;
            case "Ticketing":
                url = "/en/ticketing/get-in-touch-thank-you";
                break;
            case "CSN":
                url = "/en/supplier-network/get-in-touch-thank-you";
                break;
            case "SMM":
                url = "/en/strategic-meetings-management/get-in-touch-thank-you";
                break;
            case "Survey":
                url = "/en/web-survey-software/get-in-touch-thank-you";
                break;
        }
        var resource_id = $('[resource-id]').attr('resource-id');
        if (resource_id !== undefined) url = url + "?refURL=thank-you&ot=asset";
        else url = url + "?refURL=" + window.location.pathname;
        $("#cvent_mrkto_ty_url").attr("value", url);
        var avoid = "https://www.cvent.com";
        var avoid_url = url.replace(avoid, '');
        $("#ReturnURL").attr("value", avoid_url + "&ot=free-trial");
    }
}

function mktoSettings(munchID_dev, formID_dev, munchID_prod, formID_prod) {
    var host = window.location.host;
    if (typeof munchID_dev === "undefined" || typeof formID_dev === "undefined" || typeof munchID_prod === "undefined" || typeof formID_prod === "undefined") return;
    else if (host === "hqwww02") {
        if (munchID_dev.length > 0 && formID_dev.length > 0) {
            $("#cvent_mrkto_munchkin_id").attr("value", munchID_dev);
            $("#cvent_mrkto_form_id").attr("value", formID_dev);
        }
    } else {
        if (munchID_prod.length > 0 && formID_prod.length > 0) {
            $("#cvent_mrkto_munchkin_id").attr("value", munchID_prod);
            $("#cvent_mrkto_form_id").attr("value", formID_prod);
        }
    }
}

function switchFormDetails(switchFormid, switchFormProgramType, changeMsg) {
    if (typeof switchFormid === "undefined" || typeof switchFormProgramType === "undefined" || typeof changeMsg === "undefined") {} else {
        $("#cvent_mrkto_switch_form_id").val(switchFormid);
        $("#cvent_mrkto_switch_form_program_type").val(switchFormProgramType);
        $("#cvent_mrkto_change_msg").val(changeMsg);
    }
}

function submitButton(text, color, size, onclickTxt) {
    var onclickLen = onclickTxt.length;
    if (typeof text === "undefined" || typeof color === "undefined" || typeof size === "undefined") return;
    else {
        $("#cvent_mrkto_submit").parent(".button").addClass(color + " " + size);
        $("#cvent_mrkto_submit").attr("value", text);
    }
}

function joinMeeting(webex) {
    if (typeof webex === "undefined") return;
    else if (webex === true) {
        $("body").addClass('webex');
        $("#cvent_mrkto_form").addClass('webex');
    } else {
        $("#cvent_mrkto_form").removeClass('webex');
        $("body").removeClass('webex');
    }
}

function layoutType(layOut) {
    if (typeof layOut === "undefined") return;
    else if (layOut.length > 0) switch (layOut) {
        case "1":
            $("#cvent_mrkto_left_panel, #right-panel").addClass("one-col");
            break;
        case "2":
            $("#cvent_mrkto_left_panel, #right-panel").addClass("two-col");
            break;
        default:
            $("#cvent_mrkto_left_panel, #right-panel").addClass("one-col");
    } else {}
}

function appendFormID(cls, form_id) {
    $('.' + cls).attr('id', 'mktoForm_' + form_id);
}

function removeFields(fieldArray, showFieldsArray) {
    var allFieldsArray = ['cvent_mrkto_event_session', 'cvent_mrkto_offer_type_choice', 'cvent_mrkto_newsletter_checkbox', 'cvent_mrkto_products_div', 'cvent_mrkto_customer_reference', 'cvent_mrkto_first_name', 'cvent_mrkto_last_name', 'cvent_mrkto_company', 'cvent_mrkto_jobfunction_new', 'cvent_mrkto_website', 'cvent_mrkto_email', 'cvent_mrkto_phone', 'cvent_mrkto_job_title', 'cvent_mrkto_country_select', 'cvent_mrkto_state_select', 'cvent_mrkto_postal_code', 'cvent_mrkto_city', 'cvent_mrkto_address', 'cvent_mrkto_formAdHocQuestion', 'cvent_mrkto_which_product', 'cvent_mrkto_org_type', 'cvent_mrkto_tool_interest', 'cvent_mrkto_job_function', 'cvent_mrkto_integration_type', 'cvent_mrkto_sales_catering', 'cvent_mrkto_sales_other', 'cvent_mrkto_largest_event', 'cvent_mrkto_meeting_space', 'cvent_mrkto_hotels_drop_down', 'cvent_mrkto_convention_center', 'cvent_mrkto_attendee_info', 'cvent_mrkto_benchmark_attendees', 'cvent_mrkto_newsletter_wrap', 'cvent_mrkto_industry_opt', 'cvent_mrkto_how_many_employees', 'cvent_mrkto_survey_tool', 'cvent_mrkto_survey_tool_wrap', 'cert-box', 'cvent_mrkto_gmsinterested_in', 'cvent_mrkto_cacinterested_in', 'cvent_mrkto_cacinterested_inwitoutwed', 'cvent_mrkto_hwsinterested_in', 'cvent_mrkto_gssinterested_in', 'cvent_mrkto_gosinterested_in', 'cvent_mrkto_tsinterested_in', 'cvent_mrkto_chkopt_gdpr', 'cvent_mrkto_chkopt_term', 'cvent_mrkto_comments', 'cvent_mrkto_product_announcement', 'cvent_mrkto_survey_hospitality_div', 'cvent_mrkto_tsnn_suppliers', 'cvent_mrkto_user_type', 'cvent_mrkto_promo_terms_opt_in_box', 'cvent_mrkto_cert_box_certified', 'cvent_mrkto_cvt_amex_intrst', 'cvent_mrkto_c_address', 'cvent_mrkto_partner_type', 'cvent_mrkto_useropt', 'cvent_mrkto_chkopt_trm', 'cvent_mrkto_chkopt_gdpr', 'contact-us-product-selection', 'cvent_org_type', 'cvent_mrkto_org_other_type', 'cvent_mrkto_partnership_type', 'cvent_mrkto_typeofPartnership', 'cvent_mrkto_planner_or_exhibitor', 'cvent_mrkto_what_task', 'cvent_mrkto_how_want_to_attend', 'cvent_mrkto_interested_in', 'cvent_mrkto_how_many_venues', 'cvent_mrkto_renewal_campaign', 'cvent_mrkto_ref_first_name', 'cvent_mrkto_ref_email', 'cvent_mrkto_csn_rfp_access', 'cvent_mrkto_csn_venue_access', 'cvent_mrkto_csnvenuename', 'cvent_mrkto_rfpcode', 'cvent_mrkto_csnrfpresponseduedate', 'cvent_mrkto_csnorgname', 'cvent_mrkto_tradeshow_div', 'cvent_mrkto_hospitality_solution_myp_div', 'cvent_mrkto_interestedin_usertype', 'cvent_mrkto_existing_uname', 'cvent_mrkto_rfp_venues', 'cvent_mrkto_venue_name', 'cvent_mrkto_org_type_spl', 'cvent_mrkto_org_name', 'cvent_mrkto_learn_more_about_packages', 'cvent_mrkto_experiences_interested_in', 'cvent_mrkto_hotel_type_selection', 'cvent_mrkto_csn_cert_checkbox_wrap', 'cvent_mrkto_organization_type', 'cvent_mrkto_gift_selected_drop_down', 'cvent_mrkto_participate_ways', 'cvent_mrkto_participate_ways_cvent_connect', 'cvent_marketo_data_consent', 'cvent_sponsorship_opportunities_page', 'cvent_mrkto_intend_connect', 'cvent_mrkto_Next_steps', 'cvent_marketo_TandC_Consent', 'cvent_mrkto_What_help_type1_div', 'cvent_mrkto_What_help_type2_div', 'cvent_mrkto_What_help_type3_div', 'cvent_mrkto_What_help_type4', 'cvent_mrkto_What_help_type5_div', 'cvent_mrkto_four_Venue', 'cvent_mrkto_csn_rfp_access_Type1'];
    if (typeof hiddenFieldMapping === 'undefined') hiddenFieldMapping = {};
    var hiddenFieldKeys = Object.keys(hiddenFieldMapping).map(function(element) {
        return element.replace(/^#/, '');
    });
    if (showFieldsArray.length > 0 && allFieldsArray.length > 0) {
        showFieldsArray = showFieldsArray.map(function(value) {
            return value.replace(/^#/, '');
        });
        allFieldsArray.map(removeFieldName, {
            showFieldsArray: showFieldsArray.concat(hiddenFieldKeys)
        });
    } else $.map(fieldArray, function(element, index) {
        $(element).parent().prev(".contact-label").remove();
        $(element).parent().parent(".contact-us").remove();
        $(element).remove();
        switch (element) {
            case "#cvent_mrkto_which_product":
                $("#cvent_mrkto_which_product, #cvent_mrkto_products_div").remove();
                break;
        }
    });
    Object.keys(hiddenFieldMapping).map(function(element) {
        var values = hiddenFieldMapping[element];
        var elementId = element.replace(/^#/, '');
        elementId = '#' + elementId;
        $(elementId).parent().prev(".contact-label").remove();
        $(elementId).parent().parent(".contact-us").hide();
        $(elementId).hide();
        values.map(addHiddenFieldMappingChangeHandler, {
            elementName: element
        });
    });
}

function checkProdSel() {
    if ($('#cvent_mrkto_product_event').is(':checked') === false && $('#cvent_mrkto_product_cc').is(':checked') === false && $('#product-ct').is(':checked') === false && $('#cvent_mrkto_product_csn').is(':checked') === false && $('#product-ticketing').is(':checked') === false && $('#cvent_mrkto_product_survey').is(':checked') === false && $('#cvent_mrkto_product_onsite').is(':checked') === false && $('#cvent_mrkto_product_attendee_tracking').is(':checked') === false && $('#cvent_mrkto_product_lead_capture').is(':checked') === false && $('#social-amplification').is(':checked') === false && $('#cvent_mrkto_product_metrics_analytics').is(':checked') === false && $('#cvent_mrkto_product_support_education').is(':checked') === false) {
        showhidePlbl('inline');
        bFlag = false;
    } else {
        showhidePlbl('none');
        bFlag = true;
    }
    return bFlag;
}

function selectUtype() {
    getFinalProd();
    bFlag = checkProdSel();
    if ($("#cvent_mrkto_user_type_div").css('display') === 'block')
        if ($('#cvent_mrkto_opt_user_type_1').is(':checked') === false && $('#cvent_mrkto_opt_user_type_2').is(':checked') === false) {
            showhideUlbl('inline');
            bFlag = false;
        } else {
            showhideUlbl('none');
            bFlag = true;
        }
    return bFlag;
}
var sProdEvent = '',
    sProdCC = '',
    sProdCT = '',
    sProdCSN = '',
    sProdTicketing = '',
    sProdSurvey = '',
    bFlag = false;

function initializeProd(x) {
    checkProdSel();
    if ($(x).is(':checked') === true) {
        var sProdSel = $(x).val();
        switch (sProdSel) {
            case 'Event':
                sProdEvent = 'Event';
                break;
            case 'CrowdCompass':
                sProdCC = 'CrowdCompass';
                break;
            case 'CrowdTorch':
                sProdCT = 'CrowdTorch';
                break;
            case 'CSN':
                sProdCSN = 'CSN';
                break;
            case 'Ticketing':
                sProdTicketing = 'Ticketing';
                break;
            case 'Survey':
                sProdSurvey = 'Survey';
                break;
            default:
        }
    } else {
        var sProdSel = $(x).val();
        switch (sProdSel) {
            case 'Event':
                sProdEvent = '';
                break;
            case 'CrowdCompass':
                sProdCC = '';
                break;
            case 'CrowdTorch':
                sProdCT = '';
                break;
            case 'CSN':
                sProdCSN = '';
                $('#cvent_mrkto_opt_user_type_1').prop('checked', false);
                $('#cvent_mrkto_opt_user_type_2').prop('checked', false);
                break;
            case 'Ticketing':
                sProdTicketing = '';
                break;
            case 'Survey':
                sProdSurvey = '';
                break;
            default:
        }
    }
}

function getFinalProd() {
    if (sProdEvent !== '') {
        $('#cvent_mrkto_txt_main_product').val('Event');
        return;
    } else if (sProdEvent === '' && sProdCC !== '') {
        $('#cvent_mrkto_txt_main_product').val('CrowdCompass');
        return;
    } else if (sProdEvent === '' && sProdCC === '' && sProdCT !== '') {
        $('#cvent_mrkto_txt_main_product').val('CrowdTorch');
        return;
    } else if (sProdEvent === '' && sProdCC === '' && sProdCT === '' && sProdCSN !== '' && $('#cvent_mrkto_opt_user_type_1').is(':checked') === true && sProdTicketing !== '' && sProdSurvey !== '') {
        $('#cvent_mrkto_txt_main_product').val('CSN Supplier');
        return;
    } else if (sProdEvent === '' && sProdCC === '' && sProdCT === '' && sProdCSN !== '' && $('#cvent_mrkto_opt_user_type_1').is(':checked') === true && sProdTicketing !== '' && sProdSurvey === '') {
        $('#cvent_mrkto_txt_main_product').val('CSN Supplier');
        return;
    } else if (sProdEvent === '' && sProdCC === '' && sProdCT === '' && sProdCSN !== '' && $('#cvent_mrkto_opt_user_type_1').is(':checked') === true && sProdTicketing === '' && sProdSurvey === '') {
        $('#cvent_mrkto_txt_main_product').val('CSN Supplier');
        return;
    } else if (sProdEvent === '' && sProdCC === '' && sProdCT === '' && sProdCSN === '' && sProdSurvey !== '') {
        $('#cvent_mrkto_txt_main_product').val('Survey');
        return;
    } else if (sProdEvent === '' && sProdCC === '' && sProdCT === '' && sProdCSN !== '' && $('#cvent_mrkto_opt_user_type_2').is(':checked') === true && sProdSurvey !== '' && sProdTicketing !== '') {
        $('#cvent_mrkto_txt_main_product').val('Survey');
        return;
    } else if (sProdEvent === '' && sProdCC === '' && sProdCT === '' && sProdCSN !== '' && $('#cvent_mrkto_opt_user_type_2').is(':checked') === true && sProdSurvey !== '' && sProdTicketing === '') {
        $('#cvent_mrkto_txt_main_product').val('Survey');
        return;
    } else if (sProdEvent === '' && sProdCC === '' && sProdCT === '' && sProdTicketing === '' && sProdCSN !== '' && $('#cvent_mrkto_opt_user_type_1').is(':checked') === true && sProdSurvey !== '') {
        $('#cvent_mrkto_txt_main_product').val('CSN Supplier & Survey');
        return;
    } else if (sProdEvent === '' && sProdCC === '' && sProdCT === '' && sProdCSN === '' && sProdSurvey === '' && sProdTicketing !== '') {
        $('#cvent_mrkto_txt_main_product').val('Ticketing');
        return;
    } else if (sProdEvent === '' && sProdCC === '' && sProdCT === '' && sProdCSN !== '' && $('#cvent_mrkto_opt_user_type_2').is(':checked') === true && sProdSurvey === '' && sProdTicketing !== '') {
        $('#cvent_mrkto_txt_main_product').val('Ticketing');
        return;
    } else if (sProdEvent === '' && sProdCC === '' && sProdCT === '' && sProdSurvey === '' && sProdTicketing === '' && sProdCSN !== '' && $('#cvent_mrkto_opt_user_type_2').is(':checked') === true) {
        $('#cvent_mrkto_txt_main_product').val('CSN Planner');
        return;
    } else $('#cvent_mrkto_txt_main_product').val('');
}

function showhideUlbl(x) {
    $("#cvent_mrkto_label_u_type").css('display', x);
}

function showhidePlbl(x) {
    $("#cvent_mrkto_label_p_type").css('display', x);
}

function comments(title, label) {
    if ($("body").hasClass("onsite_solution_homepage")) {} else if (typeof title === "undefined" || typeof label === "undefined") return;
    else if (title.length > 0 || label.length > 0) {
        $("#cvent_mrkto_comment_header").html(title);
        $("#cvent_mrkto_comment_label").html(label);
    } else {
        $("#cvent_mrkto_comment_header").html("");
        $("#cvent_mrkto_comment_label").html("");
    }
}

function reqField(msg) {
    if (typeof msg === "undefined") return;
    else {
        var msg = true;
        if (msg === true) $(".req-msg").show();
        else $(".req-msg").hide();
    }
}

function mapMultipleCheckboxSelection(x) {
    var parentElement = $($(x).parent());
    while (parentElement.prop('nodeName') != 'FIELDSET') parentElement = $($(parentElement).parent());
    var hiddenField = Object.keys(hiddenFieldMapping).find((key) => hiddenFieldMapping[key] == "#" + (parentElement[0].id));
    if (hiddenField == '' || hiddenField == undefined) hiddenField = '#cvent_mrkto_contact_us_product_selection';
    if ($(x).is(':checked') === true) $(hiddenField)[0].value = ($(hiddenField)[0].value) != '' ? (($(hiddenField)[0].value) + "," + (x.value)) : (x.value);
    else {
        var checkboxValues = ($(hiddenField)[0].value).split(',');
        var index = checkboxValues.indexOf($(x)[0].value);
        if (index > -1) checkboxValues.splice(index, 1);
        $(hiddenField)[0].value = checkboxValues.join(",");
    }
}

function hiddenFields(fieldsObj) {
    if (typeof fieldsObj === "undefined") return;
    else {
        for (var key in fieldsObj)
            if (fieldsObj.hasOwnProperty(key)) switch (key) {
                case "mk_ls":
                    if (fieldsObj[key].length > 0) $("#cvent_mrkto_lead_source_most_recent").val(fieldsObj[key]);
                    break;
                case "product_name":
                    if (fieldsObj[key].length > 0) $("#cvent_mrkto_product_name").val(fieldsObj[key]);
                    break;
                case "formProgramType":
                    if (fieldsObj[key].length > 0) $("#cvent_mrkto_form_program_type").val(fieldsObj[key]);
                    break;
                case "webSFDCCampaign":
                    if (fieldsObj[key].length > 0) $("#cvent_mrkto_campaign_name").val(fieldsObj[key]);
                    break;
                case "iDConfirmCampaignProduct":
                    if (fieldsObj[key].length > 0) $("#cvent_mrkto_id_confirm_campaign_prod").val(fieldsObj[key]);
                    break;
                case "iDConfirmCampaignType":
                    if (fieldsObj[key].length > 0) $("#cvent_mrkto_id_confirm_campaign_type").val(fieldsObj[key]);
                    break;
                case "newsletterProductSelection":
                    if (fieldsObj[key].length > 0) $("#cvent_mrkto_sign_me_up_for").val(fieldsObj[key]);
                    break;
                case "session":
                    if (fieldsObj[key].length > 0) $("#cvent_mrkto_psrequested_date_time_location").val(fieldsObj[key]);
                    break;
                case "city":
                    if (fieldsObj[key].length > 0) $("#cvent_mrkto_session_city").val(fieldsObj[key]);
                    break;
                case "meetingKey":
                    if (fieldsObj[key].length > 0) $("#cvent_mrkto_meeting_key").val(fieldsObj[key]);
                    break;
                case "ecode":
                    if (fieldsObj[key].length > 0) $("#cvent_mrkto_ecode").val(fieldsObj[key]);
                    break;
                case "scode":
                    if (fieldsObj[key].length > 0) $("#scode").val(fieldsObj[key]);
                    break;
                case "target":
                    if (fieldsObj[key].length > 0) $("#cvent_mrkto_target").val(fieldsObj[key]);
                    break;
                case "offerType":
                    if (fieldsObj[key].length > 0) $("#cvent_mrkto_offer_type").val(fieldsObj[key]);
                    break;
            }
    }
}

function showThankyouMessageContentTrack(thankyou_url) {
    $("#close_m_btn").trigger("click");
    $('.field--type-link .button-blue').addClass("disabled-f-cta");
    if ($(".not-allow-form-dismis").length) {
        $(".not-allow-form-dismis").removeClass("not-allow-form-dismis");
        $('.paragraph--type--cvent-marketo-form').removeClass('active');
        $('.page-form–spacer').removeClass('active');
        $('.marketo-form-wrapper').height('auto');
        $('.form-modal--overlay').remove();
        $('body').removeClass('form-open');
    }
    if (drupalSettings.ct_form_data.thankyou_page_nid) {
        let callback_url = Drupal.url('thankyou-callback-page') + '/' + drupalSettings.ct_form_data.thankyou_page_nid;
        const thankyou_page_dialog = Drupal.ajax({
            dialog: {},
            dialogType: 'modal',
            selector: '.field-p-sidebar-item-marketo-form',
            url: callback_url,
            progress: {
                type: 'fullscreen'
            }
        });
        thankyou_page_dialog.execute();
    }
}(function($) {
    var isAcceptableDomain = false;
    var host = window.location.host;
    var countryArray = ["AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AQ", "AM", "AU", "AT", "AZ", "BH", "BD", "BY", "BE", "BJ", "BT", "BA", "BW", "BV", "IO", "BN", "BN", "BG", "BF", "BI", "KH", "CM", "CV", "CF", "TD", "CN", "CX", "CC", "KM", "CD", "CG", "CK", "CI", "HR", "CY", "CZ", "DK", "DJ", "EG", "England", "GQ", "ER", "EE", "ET", "FO", "FJ", "FI", "FR", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GU", "GU", "GG", "GN", "GW", "HM", "HK", "HU", "IS", "IN", "ID", "IQ", "IE", "IL", "IT", "JP", "JE", "JO", "KZ", "KE", "KI", "KO", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MR", "MU", "YT", "FM", "MD", "MC", "MN", "ME", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NC", "NZ", "NE", "NG", "NU", "NF", "NorthernI", "NO", "OM", "PK", "PW", "PS", "PG", "PH", "PN", "PL", "PT", "QA", "RE", "RO", "RU", "RW", "SH", "WS", "SM", "ST", "SA", "Scotland", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "KR", "SS", "ES", "LK", "SJ", "SZ", "SE", "CH", "TW", "TJ", "TZ", "TH", "TP", "TP", "TG", "TK", "TO", "TN", "TR", "TM", "TV", "UG", "UA", "AE", "GB", "UZ", "VU", "VA", "VN", "Wales", "WF", "EH", "YE", "ZM", "ZW"];
    $('#cvent_mrkto_email').change(function() {
        $(this).val($(this).val().trim());
    });
    var actualUrl = window.location.pathname;
    if (actualUrl.indexOf('hospitality-leadership-summit-london') > 0) $('#cvent_mrkto_promo_terms_opt_in_box1').show();
    else {
        if (actualUrl.indexOf('hospitality-cloud-leadership-summit-berlin') > 0) $('#cvent_mrkto_promo_terms_opt_in_box2').show();
    }
    jQuery.validator.addMethod("checkDomain", function(value, element) {
        return checkDomainValidator(value, element);
    }, "");
    jQuery.validator.addMethod("checkBadWords", function(value, element) {
        return checkBadWordsValidator(value, element);
    }, "");
    $.validator.addMethod("eMail", function(value, element) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,35}$/i.test(value);
    }, "");
    $.validator.addMethod("checkForNumbers", function(value, element) {
        console.log(value);
        return !(/[0-9]/.test(value));
    }, "");
    $.validator.addMethod("phoneNo", function(value, element) {
        return this.optional(element) || /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/im.test(value);
    }, "");
    $.validator.addMethod("org", function(value, element) {
        return this.optional(element) || /^[.@&]?[a-zA-Z0-9 ]+[ !.@&()]?[ a-zA-Z0-9!()]+/.test(value);
    }, "");
})(jQuery);;
var sExcludedListEvent = ["bookking.ca", "bookwhen.com", "ciclt.net", "associationsplus.ca", "globalconf.co.za", " eventioz.com", "123signup.com", "3waystreet.com", "aanmelder.nl", "abcsignup.com", "abstrak.com", "acceptiva.com", "accureg.com", "actcorporate.com", "acteva.com", "acteva.in", "actifield.com", "activenetwork.au", "activenetwork.co.uk", "activenetwork.fr", "activenetwork.ie", "activenetwork.sg", "adminesolutions.com", "advsol.com", "afficient.com", "agora.techwerks.net", "amaevents.co.uk", "ambassadors.com", "amiando.com", "andar360.com", "approvedevents.com", "aptify.com", "arcaneo.com", "arinextechnology.com.au", "arsystemsweb.com", "artegis.com", "asnevents.com.au", "associationforce.com", "associationonline.com.au", "atendy.com", "attendeeinteractive.com", "attendeenet.com", "attendstar.com", "attrahent.com", "attregistration.com", "auctionpay.com", "avectra.com", "ayojak.com", "bartizan.com", "baystateevents.com", "bestmeetings.com", "bidpalnetwork.com", "blackbaud.com", "blacktie-colorado.com", "blaquetech.co.za", "blaxx.co.uk", "blueskyz.com", "bocsticketing.com.au", "boothtracker.com", "borbala.com", "brownpapertickets.com", "brushfiresoftware.com", "busyevent.com", "campagne.com", "campbrain.com", "camperreg.com", "capitolimpact.com", "capturepoint.com", "ccmcme.com", "cdsreg.com", "ceosoft.com", "chambermaster.com", "circdata.com", "cistems.com", "civicrm.org", "clickandpledge.com", "clicktoattend.com", "clubexpress.com", "clubrunner.ca", "clubsonline.com.au", "clubspaces.com", "cmrus.com", "communityseason.com", "compete-at.com", "completereg.com", "completevent.com", "condorregistration.com", "conexsys.com", "conexsysregistration.com", "conference.co.nz", "conferencemax.com", "conferenceonline.co.nz", "conferenceonline.com", "conferenceware.net", "conferon.com", "confexsys.com", "confreg.com", "conftool.net", "consensus.co.uk", "constantcontact.com", "con-trac.com", "conveneit.com", "conventiondataservices.com", "conventionregistrar.com", "coresoft.com.au", "corpmeetings.com", "countmein.com", "covr.be", "cremsol.com", "cresctech.com", "crgevents.com", "crosstechpartners.com", "crystal-ware.com", "csvep.com", "cteusa.com", "cyber-grad.com", "dataflowevents.co.uk", "datahive.ca", "daxko.com", "dea.com", "delegateplanner.com", "delegateselect.com", "delegia.se", "demosphere.com", "devron.net", "dietze-inc.com", "digitalconcourse.com", "directorsdesk.com", "doattend.com", "documatix.com", "dojiggy.com", "donorpro.com", "dotcomyourevent.com", "dtgbiz.com", "dwalliance.com", "e2.co.za", "e7sports.com", "easychair.org", "easy-eventsuite.com", "echovisionllc.com", "econferencemanager.ca", "econferenceregistration.com", "eegweb.com", "eevent.com", "effectiveregistration.com", "efficient-frontiers.com", "ekeba.com", "elandregistration.com", "electricarrow.com", "eliance.com", "emailroi.com", "emarksolutions.com", "ennect.com", "enternow.co.nz", "ephibian.com", "epicreg.com", "eregnow.com", "eroievent.com", "ersvp.com", "eshow2000.com", "etapestry.com", "etaxia.eu", "etix.com", "eveni.com", "eventalpha.com", "eventarc.com", "eventavenue.com", "eventbee.com", "e-ventcentral.com", "eventchampion.com", "event-connections.co.uk", "eventers.nl", "eventespresso.com", "eventgate.com.au", "eventgo.biz", "eventhq.co.uk", "eventilo.com", "eventimsports.de", "eventish.com", "eventkeeper.com", "eventlink.co.nz", "eventmethod.com", "eventnu.com", "evento.ae", "eventobjects.com", "eventoffice.com", "eventoffice.com.au", "eventpro.net", "eventpro-planner.com", "eventripple.com", "event-roi.com", "events.org", "eventsbot.com", "eventsforce.co.uk", "eventsforce.com", "eventsmanagerserver.com", "eventsoft.com", "eventsoft.pro", "event-software.com", "eventsonline.ca", "eventsource.com", "event-ticketingsoftware.com", "eventure.eu", "eventville.com", "eventznet.com", "evetos.com", "evite.com", "evocos.co.uk", "eworld.com.sg", "exgenex.com", "exhibitforce.com", "exhibitormanual.com", "expectnation.com", "expocharger.com", "expoexchange.com", "expofusion.com", "expologic.com", "expomapper.com", "expoplanner.com", "exporeg.co.uk", "exposoft.com", "expoworld.net", "expressplanner.com", "exware.com", "ez-eventsuite.com", "ezfacility.com", "ezregister.com", "eztix.co", "fellowshipone.com", "figleaf.com", "Fikket.com", "firstgiving.com", "flatspin.co.za", "formstack.com", "fortesoftwaredesign.com.au", "frogwaresoftware.com", "fueldog.com", "g2planet.com", "gemsregistration.com", "getmeregistered.com", "getrfp.com", "gifttool.com", "giftworkslive.com", "globalcloud.net", "global-ics.co.za", "globalpark.co.uk", "globalpark.com", "globalsignin.com", "gohere2rsvp.com", "goldreg.com", "gomembers.com", "gosignmeup.com", "greatergiving.com", "greenwichtech.net", "groople.com", "groundspring.org", "groupforce.com", "gtrmeetings.com", "guestlistapp.com", "gvisions.com", "hangastar.com", "hbceventservices.com", "heiexpo.com", "hemko.com", "hireznetwork.com", "housingregistration.com", "htg.ca", "htgsports.net", "icontact.com", "ideastar.com", "ievents.org", "imgstg.com", "imis.com", "imodules.com", "impactsolutions", "impactsolutions.com", "impakweb.com", "imperisoft.com", "informz.com", "infosalons.com", "infosalons.com.au", "inorbital.com", "instinctive.co.uk", "intellagence.eu", "intellivolve.com", "interactiveticketing.com", "intercall.com", "interlogy.com", "inviteright.com", "ionom.com", "iontechnologies.com", "ironfly.com", "isign-up.com", "ismart.co.uk", "ismartsoftware.com", "isummation.com", "it-em.co.za", "itinio.com", "itn-international.com", "itsportsnet.com", "jackrabbitclass.com", "jollytech.com", "jspargo.com", "karelo.com", "kavi.com", "kenthouse.com", "kintera.com", "kinterainc.com", "kldltd.com", "knowledge4you.com", "knowledgeconnex.com", "laser-registration.com", "leaguelineup.com", "leaguepro.com", "lookingcube.com", "maccinc.com", "madeit.com", "maestrosoft.com", "maknet.com", "managementsoftware.net.au", "mapyourshow.com", "marketingpilot.com", "matrixgroup.net", "meetingaideinc.com", "meetingdesigner.com", "meetingdesk.com", "meetingmaster.com", "meetingready.com", "meeting-resources.com", "meetings.com", "meetingsit.com", "meetingsoft.com", "meetingware.com", "meetmax.com", "melvilledata.com", "memberclicks.com", "memberize.com", "memberize.net", "microspec.com", "midwestevents.us", "miesoftware.com", "ministrycentered.com", "mobius-it.com", "mollyguard.com", "momentum-events.com", "monetime.com", "motorsportreg.com", "mtci.com.au", "mybookingmanager.com", "mylaps.nl", "mysignup.com", "mysmartreg.com", "mysolutionmanager.com", "netprocity.com", "netsimplicity.com", "neworg.com", "notjustsurveys.com", "okctickets.com", "oncorr.com", "on-course.epsb.net", "online-event-registration.net", "online-reg.com", "onlineregistrationcenter.com", "onlinesignup.org", "onsightreg.com", "ootoweb.com", "openconf.org", "openplatform.co.uk", "orchidesolutions.com", "parrimark.com", "parrimark.com.au", "parthen.com", "parthen.nl", "passkey.com", "payandreserve.com", "paydro.net", "payitsquare.com", "paypaq.com", "pencilneck.net", "penevents.co.uk", "peoplecube.com", "peoplelogic.com.au", "pepevent.com", "perfecttableplan.com", "picatic.com", "pioneerreg.com", "pi-squared.co.za", "plan2attend.com", "planetreg.com", "planion.com", "pnmi.com", "poweredbyblackpants.com", "prairiev.com", "preciscentral.com", "premcor.net", "premicesoft.com", "premierpos.com.au", "prestoregister.com", "primo-solutions.co.uk", "profitsys.sk.ca", "profitsystems.net", "promesaweb.com", "pronestoronline.com", "proreg.ca", "ptfassociates.com", "publiceye.com.au", "pulseware.com.au", "qgiv.com", "qms.com", "quickenrollment.com", "quintregistration.com", "r2it.com", "raceit.com", "rcsreg.com", "readytalk.com", "realmagnet.com", "redballoon.biz", "redskyit.com", "redstick.com", "reftech.co.uk", "reg4.com", "regbox.co.uk", "regclick.com", "reggiesoftware.com", "registermychapter.com", "registernation.com", "registernow.com.au", "registerToAttend.com", "registerwithease.com", "registration123.com", "registrationassistant.com", "registrationonline.com", "regisys.com", "reservation-highway.co.uk", "reservix.de", "respondnow.co.za", "resrunner.com", "ress-by-imus.com", "revolutionmarketing.com", "rezware.com", "rowebots.com", "rsvpbook.com", "rtcgroup.com", "rubin-onlineservicecenter.de", "runmyclub.com", "rushmore-digital.com", "salcecolada.com", "salsalabs.com", "satdat.co.uk", "satdat.com", "sbsiinc.com", "seattletech.com", "securegs.com", "securewebcc.com", "seedcornsoftware.com", "seiservices.com", "semarca.com", "sensiblerez.com", "serviceu.com", "shocklogic.com", "showtools.com", "signmeup.com", "simpleeventsignup.com", "sitesolutionsworldwide.com", "slatteryit.com.au", "smartevents.com", "smart-reg.com", "snapregistration.com", "snap-solutions.com", "socialwalk.com", "socious.com", "softconf.com", "softcongres.com", "spltrak.com", "sporg.com", "sportability.com", "sportspilot.com", "sportssignup.com", "ssl-locked.com", "stagehq.com", "starchapter.com", "streampoint.biz", "streampoint.com", "stsoloevents.com", "summitsoftware.co.za", "suretomeet.com", "suvisoft.com", "symphonyem.co.uk", "tamesystems.com", "targetx.com", "tcssoftware.com", "teameventmanagement.com", "telspan.com", "tendenci.com", "teraeon.com", "thedatabank.com", "themeetingedge.com", "themultisoftgroup.com", "thepulsenetwork.com", "theregistrationsystem.com", "thestudiodirector.com", "thinkreg.com", "thriva.com", "ticketannex.com", "ticketbud.com", "time2reg.com", "timesaversoftware.com", "tix123.com", "tixsa.co.za", "tlasoftware.com", "tmiexpos.com", "tmiexpos.com/es360.php", "tournakit.com", "tradevent.com.au", "transformyx.com", "treefrogeventplanning.com", "trippus.com", "trippus.se", "truesport.com", "trumba.com", "trustevent.com", "ubiqus.co.uk", "ubiqus.fr", "uevent.com", "ungerboeck.com", "universalles.com", "vancoservices.com", "vcorrespond.com", "velvetsoftware.co.uk", "vendini.com", "venuewest.com", "verus.com.tr", "viethconsulting.com", "visualpoint.com", "vivid-event-management.co.uk", "webcastgroup.com", "webconnex.com", "weblinkinternational.com", "webmart.com.au", "webstracts.com", "weidelt.de", "wepay.com", "whindo.com", "whoscoming.com", "wildapricot.com", "wineasi.com", "wingateweb.com", "wizevents.com", "worldregistrationsystems.com", "wufoo.com", "wwrs.net", "wyndhamjade.com", "x-cd.com", "yesevents.com", "youreventmanagement.com", "z2systems.com", "zapevent.com", "redmethod.com", "eventsforce.net", "axaco.se", "kenes.com", "boothboss.com", "evenium.com", "eventprouk.com", "meraevents.com", "ministrysync.com", "adventsource.org", "centeqevents.co.za", "conventionwise.com.au", "conferences.foundation.co.za", "conferencesolutionz.com", "eventpalette.com", "eventcore.com", "eventleap.com", "livebuzz.co.uk", "lilregie.com", "aptean.com", "lanyon.com", "participant.co.uk", "evolero.com", "lyyti.com", "vivenio.de", "eventclou.de", "uniiverse.com", "eboardsolutions.com", "eventdynamics.co.za", "crowdrise.com", "epsilonregistration.com", "signup4.com", "signupguy.com", "signupmaster.com", "aardcom.net", "amlinkevents.com", "apesnap.com", "badgeguys.com", "associationsonline.com", "bizrelations.com", "certain.com", "conferenceonlineuk.co.uk", "confmanager.com", "conform.tv", "contactmanager.biz", "convio.com", "customreg.com", "datapartnerssolutions.com", "easyreg.co.za", "easyreg.org", "econgresos.com", "eazybook.com", "esxinc.com", "etouches.com", "ettend.com", "eventcredentials.com", "eventdirector.net", "eventdrive.eu", "eventek.com", "eventelephant.com", "entango.com", "entegrica.co.uk", "entelectactive.co.za", "enteract.com.au", "enteractive.com.au", "entrinsik.com", "entrytickets.co.za", "eply.ca", "eply.com", "eplyevents.com", "eplyservices.com", "e-reg.org", "eregisternow.com", "e-registernow.com", "eventora.com", "eventosdenegocios.com", "eventpartners.nl", "eventproplanner.com.au", "eventprosoftware.com.au", "eventrebels.com", "eventregistration.com", "event-registration.online-web-software.com", "eventrelay.com", "eventbookings.com", "eventbrite.com", "eventbrite.fr", "eventbrite.ie", "eventbrite.sg", "eventbuilder.com", "eventbuildersinc.com", "eventcatalyst.com", "eventinfotech.com.au", "eventinterface.com", "eventiq.com", "event-man.com", "eventmanagement360.com", "eventmanagementsystems.co.uk", "eventmanagementsystems.com", "event-master.com", "eventsregister.net", "events-registration.com", "eventsregistrationonline.co.uk", "eventstart.com", "exposystems.co.uk", "expotrac.com", "expotrust.com", "eventware.co.uk", "eventwax.com", "event-wizard.com", "eventxcel.co.uk", "eventzi.com", "eventzilla.net", "givezooks.com", "gobigevent.com", "goeshow", "goeshow.", "greenexhibitions.co.za", "ilexservices.net", "hg3.co.uk", "inmeetpro.com.sg", "ivt.com.au", "ivvy.com", "kineticsolutions.co.uk", "kineticsolutions.net", "meetingevolution.net", "meetingform.com", "meetinghitech.com", "membermanager.com.au", "membersandevents.com", "n200.com", "onlinetrainingschool.com", "peoplepulse.com.au", "peopleware.com", "peopleware.net", "pocketrsvp.co.za", "regmeup.com", "regodirect.com.au", "regonline.ca", "regonline.co.uk", "regonline.com", "regonline.com.es", "regonline.fr", "regonline.ie", "regplace.com", "regresources.com", "reg-services.com", "rhq.com", "register123.com", "registeramerica.net", "registereasy.org", "registermefast.com", "scenovia.com", "scolars.com", "survs.com", "valuedot.com", "vibrantmedia.co.za", "vibrantmedia.com", "webeventplanner.com", "webeventsglobal.com", "webges.com", "webitcentral.com", "webitonline.com", "weboom.com", "webregnow.com", "webregonline.com", "webregpro.com", "webropol.com", "ustechs.com", "voxsolutions.com", "yoopay.cn", "conference.com", "on-cue.co.nz", "eventplanners.com.au", "registropremier.com", "enga.com.mx", "pcm411.com", "powwowsmart.com", "registrationlogic.com", "boomset.com", "easyconferences.org", "irisreg.com", "eventray.com", "converia.net", "conrego.com", "centiumsoftware.com", "hart-soft.de", "showmyevent.com", "showrunner.net", "xorbia.com", "xpressreg.net", "eventnook.com", "event411.com", "eventact.com", "eventadv.com", "opentable.com", "prereg.net", "starcite.com", "confpeople.co.uk", "congrex.com", "xentelevents.com", "american-tradeshow.com", "amplifyllc.com", "coladalive.com", "computersosinc.com", "computility.com", "emeetingexperts.com", "emeetingsonline.com", "integratedid.com", "moduspartners.com", "oquest.com", "sellyourevents.com", "tbccom.com", "teltonestore.com", "gevme.com", "mylosolutions.com", "ultracamp.com", "globalmeetingsgroup.com", "vmrtechnologies.net", "stonealley.com", "eventscribe.com", "ticketforevent.com", "ticketleap.com", "meetings-etc.com", "meetings-hotels.com", "domain.com", "rpsmartseeds.com", "qq.com"];;
var sExcludedListCrowdCompass = ['appstrakt.be', 'mobile-event-guide.com', 'guidebookapp.com', 'bloodhound.com', 'sched.org', 'apperian.com', 'eventpilot.co.uk', 'webspiders.com', 'boothtag.com', 'goomeoevents.com', 'insideguidance.com', 'epromeetingapps.com', 'confplusapp.com', 'redmethod.com', 'silvertouch.com', 'texterity.com', 'unsocial.mobi', 'skiwildcat.com', 'womzit.com', 'woodstocktech.com', 'xcosoftware.com', 'conferencehop.com', 'expojunkie.com', 'itmmobile.com', 'eventasaur.us', 'mobilematic.net', 'boothboss.com', 'eventbase.com', 'attendify.com', 'shindig.io', 'feathr.co', 'shoutem.com', 'attenderapp.com', 'at-event.com', 'trifork.com', 'livecube.co', 'como.com', 'conduit.com', 'appnetwork.com.au', 'nmnmobi.com', 'bizzabo.com', 'showca.se', 'conference4me.psnc.pl', 'eventmobile.co.uk', 'qriousapp.com', 'tapcrowd.com', 'prismtechnologiesinc.com', 'apprisor.com', 'nov8rix.com', 'avai.com', 'countermarch.com', 'dublabs.com', 'poweredbydub.com', 'memoryreel.com', 'mobileoninc.com', 'quicktaplead.com', 'showcodepartners.com', 'ncitmobile.com', 'parliant.com', 'match.presdo.com', 'verivo.com', 'gtxcel.com', 'yapp.us', 'ombiel.com', 'eventscribe.com', 'domain.com', 'rpsmartseeds.com'];;
var sExcludedListCsn = ["agoda.com", "arcaneo.com", "bidstork.com", "conference-hotel.com", "confpeople.com", "conventionplanit.com", "conventions.net", "cyberwebhotels.com", "eprodirect.com", "eved.com", "eventconnect.com.au", "eventsinamerica.com", "getrfp.com", "groupize.com", "hotelbeds.com", "hotelplanner.com", "i-meet.com", "meetingrfp.com", "meetinguniverse.com", "mpoint.com", "omfg.com", "planitonline.com", "rfpmarketplace.com", "sabrehospitality.com", "uversa.com", "venuechooser.com", "venuemirror.com", "worktopia.com", "zentila.com", "eventconnect.com", "eventparadise.com", "fodors.com", "froomz.com", "gayot.com", "groupdyne.com", "meetingsin.com", "nycvenueguide.com", "venuefinder.com", "venuehire.com", "venuetastic.com", "v-rated.com", "yelp.com", "zagat.com", "boothboss.com", "elitemeetings.com", "empowermint.com", "eventective.com", "eventup.com", "gatheringguide.com", "imeet.com", "ariba.com", "abcevents.com", "meetings-conventions.com", "lanyon.com", "signup4.com", "eventoplus.com", "eventspacebazaar.com", "meetingfocus.com", "meetingforce.com", "bedouk.com", "simpleviewinc.com", "en.eventown.com.cn", "meetingmart.com", "meetingseasy.ca", "meetingsource.com", "micemedia.es", "savored.com", "tripadvisor.in", "uniquevenues.com", "venuesonline.com", "weddingwire.com", "zvents.com", "10best.com", "abcconnection.com", "backbid.com", "bizbash.com", "opentable.com", "perfectweddingguide.com", "privatedining.in", "speedrfp.com", "starcite.com", "theknot.com", "toptable.co.uk", "tripleseat.com", "venuedirectory.com", "confpeople.co.uk", "agendaonline.com", "emeetingsonline.com", "lenos.com", "1000meetings.com", "theabcconnection.com", "azavista.com", "eventplannerspain.com", "eventown.com.cn", "fivestaralliance.com", "hotelzone.com", "liquidspace.com", "meetingsmaker.com", "meetpie.com", "tagungshotel.com", "meetingselect.com", "meetings-hotels.com", "domain.com", "rpsmartseeds.com", "qq.com"];;
var sExcludedList2 = ["abstractscorecard.com", "submittable.com", "appendee.com", "atanto.com", "blispa.com", "boabee.com", "duuzra.com", "eventwo.com", "eventxp.it", "eventzebra.com", "glisser.com", "lineupr.com", "loquiz.com", "meet.mready.net", "meetappevent.com", "networkapp.eu", "nodily.com", "aidaio.com", "angage.com", "appandmap.com", "b2meet.com", "beekast.com", "concisegroup.com", "digivents.com", "drugs.com", "eventapp360.com", "eventicious.com", "events365.com", "grip.events", "moozup.com", "swapcard.com", "twebcast.com", "vevox.com", "core-apps.com", "mobileeventguide.de", "eprodirect.com", "a2zinc.net", "ativsoftware.com", "grupio.com", "guidebook.com", "spotme.com", "showgizmo.com", "sherpa-solutions.com", "eventmobi.com", "attendify.com", "bravuratech.com", "greencopper.com", "persource.com", "sched.org", "zwoor.com", "crowdcomms.com", "event2mobile.com", "boothtag.com", "eventkaddy.com", "gatherdigital.com", "goomeoevents.com", "insideguidance.com", "zerista.com", "conference-compass.com", "confplusapp.com", "appburst.com", "appsforevents.com", "cadmiumcd.com", "parliant.com", "pathable.com", "propellermobile.com", "itmmobile.com", "eventapps.com.au", "eventedge.co", "eventmethod.com", "invisage.net", "qriousapp.com", "tapcrowd.com", "lumimobile.com", "yapp.us", "cdsreg.com", "aloompa.com", "eventbase.com", "shindig.io", "feathr.co", "attenderapp.com", "at-event.com", "livecube.co", "conduit.com", "noodlelive.com", "clickmeeting.com", "avodigy.com", "vivastream.com", "bizvento.com", "jujama.com", "busyconf.com", "appswith.us", "conferize.com", "confrenz.com", "eventtus.com", "meetingplay.com", "mobile-event-app.com", "moblee.net", "myqaa.com", "polleverywhere.com", "bcom.psideo.com", "sli.do", "superevent.com", "townscript.com", "info.triqle.eu", "whova.com", "eventory.cc", "showtimemobileapp.com", "openconceptsystems.com", "hellocrowd.net", "netronix.io", "miceapps.com", "123signup.com", "aardcom.net", "abcsignup.com", "activenetwork.co.uk", "attregistration.com", "aetherquest.com", "amlinkevents.com", "amiando.com", "amplifyllc.com", "artegis.com", "associationsonline.com", "attendeeinteractive.com", "attendeenet.com", "attendstar.com", "attrahent.com", "greatergiving.com", "eventavenue.com", "badgeguys.com", "bartizan.com", "bestmeetings.com", "bizrelations.com", "blackbaud.com", "blueskyz.com", "bookwhen.com", "brownpapertickets.com", "capitolimpact.com", "certain.com", "circdata.com", "cistems.com", "csvep.com", "clickandpledge.com", "cmrus.com", "completereg.com", "compusystems.com", "approvedevents.com", "conexsys.com", "conexsysregistration.com", "conferenceonlineuk.co.uk", "conferenceonline.com", "experient-inc.com", "confreg.com", "conftool.net", "constantcontact.com", "convio.com", "customreg.com", "dataflowevents.co.uk", "dea.com", "delegateselect.com", "delegia.se", "dotcomyourevent.com", "dwalliance.com", "easyreg.org", "eazybook.com", "econferenceregistration.com", "eventosdenegocios.com", "effectiveregistration.com", "ennect.com", "epicreg.com", "eplyservices.com", "eregnow.com", "ersvp.com", "eshow2000.com", "etix.com", "aventri.com", "etouches.com.au", "evenium.com", "eventcatalyst.com", "e-ventcentral.com", "event-connections.co.uk", "eventsforce.net", "event-wizard.com", "eventact.com", "eventbee.com", "eventbrite.com", "eventcredentials.com", "eventers.nl", "eventinterface.com", "evento.ae", "eventpartners.nl", "eventrebels.com", "eventsonline.ca", "tmiexpos.com", "eventure.eu", "eventzilla.net", "eventznet.com", "exposoft.com", "exware.com", "ezregister.com", "getmeregistered.com", "gifttool.com", "globalsignin.com", "goeshow", "gtrmeetings.com", "guestlistapp.com", "hemko.com", "memberize.com", "infosalons.com", "mybookingmanager.com", "intellivolve.com", "conference.com", "inviteright.com", "ivvy.com", "karelo.com", "confmanager.com", "lookingcube.com", "gosignmeup.com", "meetingexpectations.com", "meetmax.com", "memberclicks.com", "microspec.com", "miesoftware.com", "oncorr.com", "tbccom.com", "online-reg.com", "onlineregistrationcenter.com", "bookking.ca", "picatic.com", "planetreg.com", "proreg.ca", "ptfassociates.com", "qgiv.com", "quickenrollment.com", "regbox.co.uk", "registernow.com.au", "registertoattend.com", "rhq.com", "resrunner.com", "rsvpbook.com", "rushmore-digital.com", "scolars.com", "shocklogic.com", "showcare.com", "signmeup.com", "mysmartreg.com", "smart-reg.com", "snapregistration.com", "softcongres.com", "spltrak.com", "starchapter.com", "streampoint.biz", "summitpro.co.za", "suretomeet.com", "eventmanagementsystems.com", "telspan.com", "tendenci.com", "confpeople.co.uk", "themeetingedge.com", "thinkreg.com", "thriva.com", "tix123.com", "tradevent.com.au", "trippus.com", "trustevent.com", "ungerboeck.com", "vendini.com", "webconnex.com", "webeventsglobal.com", "weboom.com", "wildapricot.com", "xorbia.com", "yesevents.com", "z2systems.com", "registration123.com", "wufoo.com", "asnevents.com.au", "prereg.net", "events-registration.com", "parthen.nl", "meetingsoft.com", "chambermaster.com", "weblinkinternational.com", "esxinc.com", "verus.com.tr", "eztix.co", "meetingevolution.net", "vibrantmedia.co.za", "eventzi.com", "respondnow.co.za", "entrytickets.co.za", "it-em.co.za", "n200.com", "eventgate.com.au", "promesaweb.com", "symphonyem.co.uk", "orchideventsolutions.com", "eventora.com", "eventilo.com", "x-cd.com", "themultisoftgroup.com", "brushfiresoftware.com", "uevent.com", "softconf.com", "yoopay.cn", "ciclt.net", "aanmelder.nl", "regodirect.com.au", "easychair.org", "axaco.se", "simpleeventsignup.com", "arinextechnology.com.au", "webges.com", "ticketleap.com", "ticketbud.com", "capturepoint.com", "registernation.com", "expologic.com", "eventprouk.com", "eventripple.com", "evetos.com", "teameventmanagement.com", "meetings-etc.com", "hg3.co.uk", "eventready.com", "meraevents.com", "ministrysync.com", "eventespresso.com", "easyconferences.org", "boothboss.com", "campbrain.com", "irisreg.com", "converia.net", "conrego.com", "kineticsolutions.co.uk", "eventcore.com", "eventleap.com", "livebuzz.co.uk", "lilregie.com", "centiumsoftware.com", "splashthat.com", "eventnook.com", "gevme.com", "stonealley.com", "associationsplus.ca", "eventscribe.com", "signupmaster.com", "lyyti.com", "vivenio.de", "eventclou.de", "participant.co.uk", "floktu.com", "conferencesolutionsinc.com", "conference-service.com", "doubleknot.com", "eventsoftwaresolutions.com", "desystems.com", "eventilla.com", "exhibitionandeventservices.com", "regmadeeasy.com", "yourconferencesolution.com", "succevo.com", "trybooking.com", "eventsair.com", "azavista.com", "arlo.co", "rsvpagency.co.za", "regfox.com", "eventyco.com", "messageblocks.com", "coladaservices.com", "goeshow.com", "ilexservices.com", "eventproducers.events", "kenes.com", "eventregist.com", "bizzabo.com", "meetinghand.com", "eventfarm.com", "lenos.com", "cendynevents.com", "advsol.com", "conventionregistrar.com", "easyreg.co.za", "ejoinme.org", "ettend.com", "etglatam.com", "eventelephant.com", "silverbear.com", "regtix.com", "showdata.com", "ticketforevent.com", "wizevents.com", "tpni.com", "regpacks.com", "regstep.com", "eventpower.com", "simplesignup.ca", "attendease.com", "snapuptickets.com", "eved.com", "veritix.com", "memberleap.com", "qondor.com", "travefy.com", "eventpoint.com", "eventbank.com", "cteusa.com", "xing-events.com", "swoogo.com", "yourmembership.com", "myworldofexpo.com", "eventxtra.com", "memlin.com", "eeginc.com", "eventgrid.com", "eventpro.net", "brushfireapp.com", "eventsolutions.co.nz", "planningpod.com", "ticketebo.com.au", "stickytickets.com.au", "ts-solutions.net", "confbay.com", "eventtia.com", "currinda.com", "expoplatform.co.uk", "eventadv.com", "explara.com", "swiftdigital.com.au", "trumba.com", "seattletech.com", "ti.to", "eventsmart.com", "hubilo.com", "4agoodcause.com", "eventsquid.com", "groupize.com", "infusionsoft.com", "cyberbia.com.au", "exbo.co.za", "eventleaf.com", "rightlabs.com", "halito.com", "spingo.com", "arkadyas.com", "pouchnation.com", "pheedloop.com", "eventscase.com", "growtix.com", "expopass.com", "crystalinteractive.net", "eventdex.com", "flockplatform.com", "billetto.dk", "clearevent.com", "connect.space", "dryfta.com", "evenzu.com", "geniusmeetings.com", "mitingu.com", "myconferencesuite.com", "oveit.com", "10times.com", "accelevents.com", "accredion.com", "allcal.com", "digitevent.com", "eventboost.com", "eventcloud.co", "eventcreate.com", "eventerp.com", "eventmaker.io", "eventree.co.uk", "exordo.com", "idloom.com", "inor.com", "jotform.com", "konfeo.com", "momice.com", "my-trs.com", "simpletix.com", "ticketsauce.com", "tickettailor.com", "universe.com", "visitbyges.com", "socio.events", "brushfire.com", "naylor.com", "atxes.com", "168tickets.com", "24tix.com", "2mev.com", "aceticket.com", "activitytickets.com", "admission.com", "admitoneproducts.com", "agiletix.com", "agileticketing.net", "alliancetickets.com", "alt-tickets.co.uk", "ampedandalive.com", "applause-tickets.com", "artistarena.com", "artsman.com", "arts-people.com", "arttix.org", "aspenshowtix.com", "atgtickets.com", "athleteguild.com", "attractionsuite.com", "audienceview.com", "awesomeseating.com", "barrystickets.com", "bctboxoffice.com", "beticketing.com", "bidpalnetwork.com", "bigtix.com.au", "bigstub.com", "bikereg.com", "blueticket.com.br", "boldtypetickets.com", "bookeo.com", "bookitbee.com", "bookitzone.com", "booktix.com", "boxofficexpress.com", "buytix.net", "buzztix.com", "capitalcitytickets.com", "capitaltickets.ca", "carnivalticketsnow.com", "carolinatix.org", "centeredgesoftware.com", "chirrpy.com", "choiceticketing.com", "cincyticket.com", "cityboxoffice.com", "clearthunder.com", "click4tix.com", "clicknprint.com", "clubtickets.com", "completeticketsolutions.com", "compuscore.com", "computicket.com", "convergence.net", "cravetickets.com", "cuetoems.com", "darktickets.com", "databarevents.com", "demosphere.com", "digitick.com", "digitickets.co.uk", "diyobo.com", "downtowntickets.com", "dynamicticketsolutions.com", "foliotickets.com", "thepointofsale.com", "enter2run.com", "ents24.com", "greateventseats.com", "esportsdesk.com", "etickets.to", "etixnow.com", "evenko.ca", "eventdatasolutions.com", "eventgenius.co.uk", "eventmaster.ie", "eventfolio.com", "eventim.co.uk", "eventmasters.co.uk", "eventopia.co", "eventsprout.com", "exposites.com", "expressoticketing.com", "extremetix.com", "ezevent.com", "fandango.com", "fanfueled.com", "fareharbor.com", "fatsoma.com", "flavorus.com", "flynntix.org", "fnactickets.com", "freshtix.com", "frontgatetickets.com", "frontrowtickets.com", "fullonsport.co.uk", "gatemaster.com", "gatewayticketing.com", "gemininext.com", "georgialinatix.com", "getmein.com", "gettickets.ca", "gigantic.com", "gigstix.com", "goalline.ca", "go-greenevents.com", "goldcoasttickets.com", "gotickets.com", "gotsport.com", "hauntpay.com", "holdmyticket.com", "ictickets.com", "imathlete.com", "inticketing.com", "inktickets.com", "instantseats.com", "interactiveticketing.com", "interticket.com", "advancedticketing.co.uk", "itickets.com", "itsracetime.com", "itsyourrace.com", "itsmyseat.com", "iwannaticket.com.au", "iwantregistered.com", "jambasetickets.com", "kmitsolutions.com", "knoxvilletickets.com", "kodintickets.com", "livenation.co.uk", "loop1tickets.com", "mainentrancetickets.com", "tytix.com", "mdtix.com", "metaltix.com", "metrotix.com", "midwestix.com", "mikestickets.com", "minttix.com", "missiontix.com", "modtickets.com", "monadsoftware.com", "moshtix.com.au", "motoregistry.com", "movietickets.com", "musicglue.com", "myonlinecamp.com", "mynorthtickets.com", "myonlinecamps.com", "neptix.com", "neweratickets.com", "oasyssports.com", "osconcert.com", "outhousetickets.com", "ovationtix.com", "ozarkraces.com", "oztix.com.au", "paciolan.com", "panhandletickets.com", "patrontechnology.com", "patronbase.com", "peatix.com", "pleasant-tickets.com", "porttix.com", "preferredfan.com", "prekindle.com", "premiertickets.ie", "preptix.com", "primesport.com", "protixonline.com", "pulsemob.com", "puntoticket.com", "purchasetix.com", "purplepass.com", "q-buster.co.uk", "quaytickets.com", "quickmobile.com", "rccal.com", "racedayeventservices.com", "raceentry.com", "raceforum.com", "raceit.com", "raceroster.com", "raceonline.ca", "raceplanner.com", "racepro.ca", "racerpal.com", "raceregister.net", "races2run.com", "racesonline.com", "rainiersoftware.com", "razorgator.com", "recitalticketing.com", "redpodium.com", "red61.com", "redtrucktickets.com", "reg2run.com", "regevent.co.uk", "register-wizard.com", "renregister.com", "reservatech.net", "rezgo.com", "riderhq.com", "runtheday.com", "runtheeast.com", "runccrs.com", "runnercard.com", "runreg.com", "runsignup.com", "savannahboxoffice.com", "savoysystems.co.uk", "seatengine.com", "seatyourself.biz", "seatadvisor.com", "seatcrunch.com", "seetickets.com", "selectaticket.com", "selectyourtickets.com", "sellingticket.com", "sharpseating.com", "showare.com", "showclix.com", "sientries.co.uk", "signupgenius.com", "simplyregister.net", "siriusware.com", "skiddle.com", "softix.com", "software4schools.com", "spektrix.com", "sportoften.com", "starboardsuite.com", "startickets.com", "strangertickets.com", "streamintickets.com", "stubs.net", "stubwire.com", "superbillets.com", "supremeticket.com", "tcutickets.ca", "telecharge.com", "tempotickets.com", "tessituranetwork.com", "thedriven.net", "theelectronicboxoffice.com", "thefoat.com", "thelittleboxoffice.com", "theticketbox.com", "theticketfactory.com", "theticketfairy.com", "theatermania.com", "theticketexperience.com", "theticketsellers.co.uk", "thundertix.com", "tickeri.com", "ticketabc.com", "ticketalternative.com", "ticketamerica.com", "ticketarena.co.uk", "ticketatlantic.com", "ticketcentral.com", "ticketcostars.com", "ticketevolution.com", "ticketluck.com", "ticketmaster.ca", "ticketmonster.com", "ticketomaha.com", "ticketphiladelphia.org", "ticketpicket.com", "ticketpro.ca", "ticketquarter.co.uk", "ticketreturn.com", "ticketriver.com", "ticketseller.ca", "ticketstaronline.com", "tickettomato.com", "ticketzone.com", "ticketbooth.com.sg", "ticketbreak.com", "ticketcity.com", "ticketdriver.com", "ticketea.com", "ticketek.com.au", "ticketforce.com", "ticketgateway.com", "ticketgroup.ie", "altitudetickets.com", "ticketingboxoffice.com", "ticketkingonline.com", "ticketingsolutions.com", "ticketino.com", "ticketleader.ca", "ticketline.co.uk", "ticketliquidator.com", "ticketmanager.com", "ticketmatic.com", "ticketnetwork.com", "ticketon.com", "ticketone.it", "ticketor.com", "ticketpal.com", "ticketpeak.com", "ticketrink.com", "ticketssantafe.org", "tickets-scotland.com", "ticketswirral.com", "tickets.com", "tickets.ie", "ticketsage.com", "ticketscene.com", "ticketscript.co.uk", "ticketshop.com.co", "ticketsnashville.com", "ticketsnow.com", "ticketsocket.com", "ticketsolve.com", "ticketsource.com", "ticketsparati.com", "ticketsrv.co.uk", "ticketstage.com", "ticketstobuy.com", "ticketstorm.com", "ticketsreview.com", "ticketweb.ca", "ticketwindow.ca", "ticketwise.ca", "ticketwiz.us", "ticketwood.com", "ticketzoom.com", "tickit.ca", "tickoweb.be", "tickster.com", "ticnet.se", "tikly.co", "titantechgroup.com", "tix.com", "tixonthesquare.ca", "tixonlinenow.com", "tixr.com", "tixx.ca", "tockify.com", "topboxtickets.com", "tristateracer.com", "tututix.com", "tygtickets.com", "ubitix.com", "ueaticketbookings.co.uk", "ultrasignup.com", "universitytickets.com", "unlvtickets.com", "unmtickets.com", "vallitix.com", "vbotickets.com", "vettix.org", "viagogo.com", "visrez.com", "vividseats.com", "vtix.com", "wantickets.com", "tickets.wcs.org", "webscorer.com", "webticketmanager.com", "webtickets.co.za", "webtixs.com", "weezevent.com", "wegottickets.com", "whistletix.com", "wiztix.com", "ticketpro.com", "yapsody.com", "yeglive.ca", "zaui.com", "zerve.com", "zippyreg.com", "zone4.ca", "zoobis.com", "eventconnect.com", "1000meetings.com", "eventplannerspain.com", "eventlokale.com", "venuedirectory.com", "eventective.com", "conventionplanit.com", "hotelplanner.com", "mpi.multiview.com", "venuefinder.com", "meetingsbooker.com", "bedouk.com", "eventparadise.com", "meetpie.com", "eventup.com", "meetingselect.com", "liquidspace.com", "eventoplus.com", "theabcconnection.com", "meetingsmaker.com", "meetingmastersinc.com", "nycvenueguide.com", "hrs.de", "eventonline.se", "tagungshotel.com", "findmeaconference.com", "squaremeal.co.uk", "headbox.com", "splacer.co", "venuevortex.com", "newmarketinc.com", "alliancereservations.com", "zentila.com", "bookingarea.com", "seminaire-troyes.com", "profitsword.com", "pros.com", "canvas-events.co.uk", "hotelmeetingdirectory.com", "tripleseat.com", "uniquevenues.com", "venuebook.com", "smartmeetings.com", "bizly.com", "conferencehotelgroup.com", "zipcube.com", "amadeus.com", "junebugweddings.com", "meetingmax.cc", "rfpmaker.com", "roomkeypms.com", "sabrehospitality.com", "tripbam.com", "3deventdesigner.com", "allseated.com", "caterease.com", "herecomestheguide.com", "hotelmap.com", "idemhospitality.com", "marthastewartweddings.com", "onpeak.com", "salesandcatering.com", "smartdraw.com", "theknot.com", "venuereport.com", "weddingchicks.com", "weddingwire.in", "zola.com", "boomset.com", "zkipster.com", "rainfocus.com", "american-tradeshow.com", "reftech.co.uk", "attend.com", "jifflenow.com", "validar.com", "leadature.com", "diobox.com", "thuzi.com", "boothleads.com", "conferencenational.com.au", "qmeeto.com", "positiveproximity.com", "meeting-mojo.com", "kenexa.com", "scantron.com", "surveywriter.com", "surveyconnect.com", "surveyfactory.com", "surveymonkey.com", "activecampaign.com", "servicetick.com", "inquisitive.net.au", "smartsurvey.co.uk", "questback.com", "dataillusion.com", "nooro.com", "surveylab.co.uk", "opinionlab.com", "activewebsurvey.com", "goglobal.com", "visioncritical.com", "zoomerang.com", "responsetek.com", "statpac.com", "foreseeresults.com", "clientsurveys.ca", "livesurveys.com", "surveystar.com", "vista-survey.com", "surveygizmo.com", "elliance.com", "zipsurvey.com", "websitegear.com", "kwiksurveys.com", "survio.com", "apian.com", "datstat.com", "grapevinesurveys.com", "instantsurvey.com", "sawtoothsoftware.com", "medallia.com", "livepoll.com", "esurveycreator.com", "encuestafacil.com", "imagicsurveysoftware.com", "novisystems.com", "snapsurveys.com", "therealisegroup.com.au", "custominsight.com", "formsite.com", "raosoft.com", "polldaddy.com", "questionpro.com", "onlinesurveysolution.com", "surveyandballotsystems.com", "survey-design-and-analysis.com", "surveymethods.com", "vovici.com", "focusvision.com", "metrixlab.com", "verint.com", "confirmit.com", "feedbackserver.com", "mzinga.com", "qualtrics.com", "userzoom.com", "safecount.net", "iperceptions.com", "voxco.com", "esurveyspro.com", "keysurvey.com", "peoplepulse.com.au", "askia.com", "star360feedback.com", "digivey.com", "freeonlinesurveys.com", "limesurvey.org", "toluna.com", "questionform.com", "enalyzer.com", "surveysystem.com", "survelum.com", "surveyshare.com", "worldapp.com", "maritzcx.com", "marcresearch.com", "e-research-global.com", "checkbox.com", "intellisurvey.com", "stellarsurvey.com", "truscore.com", "foresee.com", "voicefive.com", "amplituderesearch.com", "endsolutions.net", "papayapolls.com", "zarca.com", "opinionbar.com", "surveygold.com", "communispace.com", "cci4360.com", "limeservice.com", "questionmark.com", "objectplanet.com", "objectplanet.com/opinio", "6connex.com", "inxpo.com", "heysummit.com", "on24.com", "vfairs.com", "brella.io", "bevy.com", "hopin.to", "get.bigmarker.com", "virtualsummits.com", "corp.kaltura.com", "influitive.com", "runtheworld.today", "eventify.io", "virtualtradeshowhosting.com", "localist.com", "intellum.com", "personifycorp.com", "eventinsight.io", "networktables.com", "digitellinc.com", "evia.events", "letsgetdigital.io", "inevent.com", "brazen.com", "airmeet.com", "allintheloop.com", "engagez.com", "ez-xpo.com", "hexafair.com", "tocca.io", "nunify.com", "info.workcast.com", "educationalmeasures.com", "remo.co", "teooh.com", "hubb.me", "freeman.com", "mediasite.com", "webex.com", "gotomeeting.com", "zoom.com", "adobe.com", "pathfactory.com", "highattendance.com", "nextechar.com", "getopenwater.com", "soapboxengage.com", "gdsgroup.com", "outlookcreative.uk", "eventcadence.com", "canapii.com", "converve.com", "crowdpurr.com", "epsilonregistration.com", "info.eventrebels.com", "evenito.com", "bizzyou.io", "online-events.co.uk", "conbop.com", "the.connect.space", "eventdrive.com", "eventee.co", "circa.co", "eventmaker.com", "eventsforce.com", "gruupmeet.com", "gtrnow.com", "b2b-wizard.com", "fanomena.io", "events.grenadine.co", "app.meetme.pro", "mixtroz.com", "turnoutnow.com", "perenso.com", "pigeonholelive.com", "podiobox.com", "sparkup.app", "speakerengage.com", "landing.eventhub.net", "virtwayevents.com", "eventeyeapp.com", "ticketspice.com", "ugovirtual.com", "eventtechsoftware.com", "expodirect.com.au", "zoho.com", "social27.com", "tripbuildermedia.com", "login.10times.com", "zeacon.com", "encoreglobal.com", "inceptioncompany.com", "worktankwebcasts.com", "ironhorse.io", "expoline.jp", "shanon.co.jp", "experiencewelcome.com", "junolive.com", "pgi.com", "venu-iq.com", "thymebase.com", "intrado.com", "ampslide.com", "abila.com", "brighttalk.com", "stratacreate.com", "communitybrands.com", "d2isystems.comengage", "eply.com", "expoplatform.com", "touchcast.com", "virtualtechfrontier.com", "doo.net", "fastlane-gmbh.de", "expo-ip.com", "brightspot.email", "e-destinaccess.com", "sonicfoundry.com", "fielddrive.eu", "linkedtech.net", "vconfex.com", "modesttree.com", "parallel.live", "ibentos.com", "matchboxvirtual.com", "nfstechnology.co.uk", "eventcombo.com", "meltingspot.io", "buzzcast.com", "zuddl.com", "convene.com", "eventgurusoftware.com", "logmeininc.com", "liveunion.co.uk", "ffair.co.uk", "extentia.com", "virtualeventplatform.asia", "vconferenceonline.com", "meeting15.com", "gather.town", "rallyup.com", "rsvpify.com", "mootup.com", "choruscall.com", "typeform.com", "eseminar.tv", "onlive.io", "expertshare.live", "eventplus.io", "expressvirtualmeetings.com", "wasivirtual.com", "vii.events", "optimiser.com", "scoocs.co", "weinvite.com", "meetinga.com", "filo.co", "eventstub.co", "thola.events", "laaveo.com", "msgbroadcast.com", "nextiz.com", "virtuwox.io", "goto.com", "apps4meetings.com", "beams.pro", "virtrio.com", "sarcontech.com", "konduko.com", "eventsx.com", "streamontech.com", "expouse.com", "coact.co.in", "opsgility.com", "mixhubb.com", "crowdsol.com", "jakomeet.com", "bettercast.io", "crowdpass.co", "bravuratechnologies.com", "balluun.com", "banzai.io", "brandlive.com", "eattendglobal.com", "gatherly.io", "goldcast.io", "ivent-hq.com", "letsgetdigital.com", "parcy.co", "reattendance.com", "secondstage.events", "shindig.com", "socialhour.com", "wearetotem.io", "virtualtables.com", "zenevent.com", "helloendless.com", "momentosolutions.com", "pine.events", "eventfinity.co", "virnew.com", "evessio.com", "entegy.com.au", "livestorm.co", "eventx.io", "meetyoo.com", "livestream.com", "webinarjam.com", "dreamcast.in", "getbanzai.com", "delegateconnect.co", "key4events.com", "ctimeetingtech.com", "tame.events", "twentythree.net", "confex.com", "yello.co", "key4.events", "meethub.in", "eventlink.com", "pronestor.com", "vancoevents.com", "mustexpo.com", "zoho.com", "samaaro.com", "captello.com", "bizbash.com", "fivestaralliance.com", "maritzglobalevents.com", "meetingsfocus.com", "meetings.com", "peerspace.com", "stova.io", "avenevv.com", "eventinc.nl", "execspace.co.uk", "fiylo.com", "meetingecongressi.comen", "web.meetingselect.comen", "miceportal.com", "location-finder.at", "seminargo.com", "spacebase.comen", "tagungsplaner.de", "upbooking.com", "venuelook.com", "squaremealfoods.com", "tagvenue.com", "venuenow.com", "lodginglogistics.com", "rategain.com", "str.com", "navan.com", "eventdraw.com", "bemerri.com", "spazious.com", "visual-planning.comen", "resiada.com", "sendsites.com", "mywedding.com", "issuerdirect.com", "bigmarker.com", "broadcastmed.com"];;
var sExcludedListSurvey = ["123-survey.com", "websurveyor.com", "2020insight.net", "2020research.com", "abacusbridge.com", "abextrasurvey.com", "activewebsoftwares.com", "activewebsurvey.com", "advpossys.com", "alertus.com", "allegiance.com", "amaesoftware.com", "apian.com", "appforce.net", "ballotbin.com", "beelinersurveys.com", "bluesql.com", "capterra.com", "cbxsoftware.com", "cci4360.com", "censeocorp.com", "cfmc.com", "checkbox.com", "checkmarket.com", "chumpsoft.com", "cicerosurveys.com", "clarity.ca", "classapps.com", "clicksurvey.com", "clientsurveys.ca", "cogix.com", "collectdatanow.com", "communispace.com", "constantcontact.com", "convenemachine.com", "crescentgroup.ca", "customersat.com", "customfaqs.net", "dash.ca", "datacurious.com", "datstat.com", "decipherinc.com", "digipop.com", "digivey.com", "ebrain.com", "ejustice.org", "enalyzer.com", "encuestafacil.com", "enetrix.com", "e-research-global.com", "evalandgo.com", "everyonecounts.com", "ewwwtek.com", "exhibitsurveys.com", "explorance.com", "expressdb.com", "factortg.com", "feedbackserver.com", "feedbacktoday.com", "firstwave.net", "fluidsurveys.com", "foreseeresults.com", "formbinder.com", "formsite.com", "formspring.com", "freesurveytoday.com", "gelfondgroup.com", "globalsurveygroup.com", "gmi-mr.com", "goglobal.com", "grapevinesurveys.com", "gravic.com", "groupquality.com", "h2insight.com", "halogensoftware.com", "harrisinteractive.com", "healthactchq.com", "hoganassessments.com", "hr-survey.com", "idecideonline.com", "imagicsurveysoftware.com", "inetsurvey.com", "infocounts.com", "informz.com", "infostep.com", "infosurv.com", "insightexpress.com", "insitefulsurveys.com", "instantsurvey.com", "intellisurvey.com", "inviewsion.com", "ioxphere.com", "i-replies.com", "iresearch.com", "isalient.com", "isrinsight.com", "ithinkinc.com", "itracks.com", "johnmillerevents.com", "kampyle.com", "keysurvey.co.uk", "keysurvey.com", "knightsoft.com", "kopel.com", "lgisoftware.com", "limeservice.com", "limesurvey.org", "livepoll.com", "livesurveys.com", "logicdepot.com", "lokilogic.com", "magicsurveytool.com", "makemysurvey.com", "meetingmonitor.net", "mindsharetech.net", "mineful.com", "modernsurvey.com", "mshare.net", "myonlineforms.com", "mysurveybuilder.com", "nbrii.com", "netbasecorp.com", "netreflector.com", "nfocus.com", "nooro.com", "novisystems.com", "nsurvey.org", "nursesurveys.com", "odtools.com", "officeseries.com", "onlineglobalrecruiting.com", "onlinesurveysolution.com", "opinionmeter.com", "opquest.com", "outsidesoftware.ro", "papayapolls.com", "pcyber.net", "pearsoned.com", "pearsonncs.com", "pelegray.com", "perceptiongap.com", "perennialsurvey.com", "perseus.com", "pizzazzsurveys.com", "poll.websitegear.com", "polldaddy.com", "pollstream.com", "powerfeedback.com", "prezzatech.com", "principiaproducts.com", "professionalquest.com", "qstation.com", "qualtrics.com", "quantisoft.com", "quask.com", "questionbuilder.com", "questionform.com", "questionpro.com", "quicksense.com", "raosoft.com", "rapidsurvey.com", "ratedbyme.com", "ratepoint.com", "realmagnet.com", "researchexec.com", "researchnow.com", "researchresolutions.com", "ridgecrestsurveys.com", "sampleczar.com", "satistrack.com", "sawtoothsoftware.com", "scantron.com", "selfsurveys.com", "sgizmo.com", "showbite.com", "simplesurvey.ca", "smartask.biz", "smartlinegroup.co.uk", "smart-survey.co.uk", "smart-survey.net", "smartsurveys.net", "solucionesnetquest.com", "stanard.com", "statpac.com", "statsurvey.com", "stellarsurvey.com", "strategyinasecond.com", "sumquest.com", "supersurvey.com", "surcon.com", "survelum.com", "survey.com", "surveyall.com", "surveyanalytics.com", "surveyandballotsystems.com", "surveyandmore.com", "surveyanywhere.com", "surveyfactory.com", "surveyforms.net", "surveygizmo.com", "surveygold.com", "survey-hosting.com", "surveykey.com", "surveylink.com", "surveylogistics.com", "surveylogix.com", "surveymethods.com", "surveysupport.com", "surveysystem.com", "surveytool.net", "surveytracker.com", "surveyus.org", "surveyview.com", "surveywerks.com", "surveywriter.com", "surveyz.com", "syncsurvey.com", "talentsmart.com", "techneos.com", "techsys.tv", "telesage.com", "thepublicvotes.com", "toluna.com", "touchpolltulsa.com", "trybooking.com", "unclegroup.com", "userzoom.com", "varitools.com", "videlicet.com", "visioncritical.com", "vista-survey.com", "vovici.com", "wiscosurvey.com", "workforceengage.com", "x-act.com", "yoursurvey.org", "zapsurvey.com", "zarca.com", "zoho.com", "zoomerang.com", "ztelligence.com", "elliance.com", "hostedsurvey.com", "insitesurveys.com", "zipsurvey.com", "boothboss.com", "bulletsurvey.com", "dynaportal.com", "explorecommerce.com", "freesurveysonline.com", "infopoll.com", "witness.com", "clicktools.com", "mindshareworld.com", "safecount.net", "premiersurvey.com", "surveylab.co.uk", "medallia.com", "foresee.com", "iperceptions.com", "opinionbar.com", "opinionlab.com", "nice.com", "survey.bris.ac.uk", "servicetick.com", "aytm.com", "confirmit.com", "custominsight.com", "custvox.com", "dataillusion.com", "datarevolution.net", "endsolutions.net", "esurveycreator.com", "esurveys.com", "esurveyspro.com", "freeonlinesurveys.com", "freepolls.com", "greenfield.com", "inquisite.com", "kinesissurvey.com", "memolink.com", "mzinga.com", "online-web-software.com", "peoplepulse.com.au", "snapsurveys.com", "surveyatwork.com", "surveybob.com", "surveycaster.com", "surveycomplete.com", "surveyconnect.com", "surveyconsole.com", "surveycrafter.com", "surveydaddy.com", "survey-design-and-analysis.com", "surveydevelopers.com", "surveyetc.com", "surveymonkey.com", "surveynews.com", "surveypirate.com", "surveypro.com", "surveysaid.com", "surveysatsci.com", "surveyscholar.com", "surveyshare.com", "surveysite.com", "surveystar.com", "survsoft.com", "verint.com", "webpoll.sparklit.com", "xwebservices.com", "xzamcorp.com", "voxco.com", "activecampaign.com", "conference.com", "rationalsurvey.com", "roiresearch.com", "voicefive.com", "rantandrave.com", "cicero-group.com", "star360feedback.com", "coolsurveys.com", "surveycompany.com", "advancedsurvey.com", "applynet.net", "objectplanet.com", "questionmark.com", "amplituderesearch.com", "eformit.com", "mapilab.com", "sitecentric.com", "truscore.com", "vevs.com", "wiredsurvey.com", "scarlettsurveys.com", "fizzback.com", "vutu.re", "easyinsites.com", "exhibitsurveys.net", "researchmetrics.com", "domain.com", "rpsmartseeds.com", "qq.com"];;
var sExcludedList1 = ["boom.com", "furnitureprovider.com", "general-hospital.com", "123.com", "123box.net", "123india.com", "123mail.cl", "123qwe.co.uk", "126.com", "websurfer.co.za", "webtopmail.com", "150ml.com", "15meg4free.com", "163.com", "1coolplace.com", "1freeemail.com", "1funplace.com", "1internetdrive.com", "1mail.net", "1me.net", "1mum.com", "1musicrow.com", "1netdrive.com", "1nsyncfan.com", "1under.com", "1webave.com", "1webhighway.com", "212.com", "24horas.com", "2911.net", "2bmail.co.uk", "2d2i.com", "2die4.com", "3000.it", "37.com", "3ammagazine.com", "3email.com", "3xl.net", "444.net", "4advice", "4email.com", "4email.net", "4mg.com", "4newyork.com", "4x4man.com", "5iron.com", "88.am", "8848.net", "888.nu", "8manafter.com", "aaronkwok.net", "abbeyroadlondon.co.uk", "abdulnour.com", "aberystwyth.com", "about.com", "absamail.co.za", "academycougars.com", "acceso.or.cr", "access4less.net", "ace-of-base.com", "acmemail.net", "acninc.net", "address.com", "adelphia.net", "adexec.com", "adios.net", "adoption.com", "ados.fr", "adrenalinefreak.com", "aeiou.pt", "aemail4u.com", "aeneasmail.com", "afreeinternet.com", "africamail.com", "agoodmail.com", "ahaa.dk", "ahmegami.net", "ahmegamisama.com", "aichi.com", "airpost.net", "ajacied.com", "ak47.hu", "aknet.kg", "al.com", "albawaba.com", "alex4all.com", "alexandria.cc", "algeria.com", "alhilal.net", "alibaba.com", "alive.cz", "allmail.net", "alloymail.com", "allsaintsfan.com", "alltel.net", "alskens.dk", "altavista.com", "altavista.net", "altavista.se", "alter.to", "alternativagratis.com", "alumnidirector.com", "alvilag.hu", "alwaysoncall.net", "amele.com", "america.hm", "amnetsal.com", "amrer.net", "ancestry.com", "andylau.net", "anfmail.com", "angelfan.com", "angelfire.com", "animail.net", "animalwoman.net", "anime.ro", "animeart.cc", "animeboards.com", "animeinn.net", "animelab.com", "animenut.com", "animepitstop.com", "animespider.com", "animetarot.com", "anjungcafe.com", "anonymous.to", "another.com", "antisocial.com", "antongijsen.com", "antwerpen.com", "anymoment.com", "anytimenow.com", "apollo.lv", "approvers.net", "arabia.com", "arabtop.net", "archaeologist.com", "arcor.de", "arcotronics.bg", "arcthelad.net", "argentina.com", "arnet.com.ar", "artlover.com", "artlover.com.au", "asean-mail", "asean-mail.com", "asheville.com", "asia.com", "asia-links.com", "asianavenue.com", "asiancityweb.com", "asiansonly.net", "asianwired.net", "asiapoint.net", "as-if.com", "assala.com", "assamesemail.com", "astroboymail.com", "astrolover.com", "asurfer.com", "athenachu.net", "atina.cl", "atlanticbbn.net", "atlaswebmail.com", "atozasia.com", "attglobal.net", "aug.com", "aurabattlerdunbine.com", "ausi.com", "aussiemail.com.au", "austin.rr.com", "australia.edu", "australiamail.com", "austrosearch.net", "autoescuelanerja.com", "avh.hu", "axoskate.com", "ayashinoceres.cc", "ayna.com", "azimiweb.com", "bachelorboy.com", "bachelorgal.com", "backstreet-boys.com", "backstreetboysclub.com", "bagherpour.com", "bakuretsuhunter.net", "balle.every1.net", "baptistmail.com", "baptized.com", "barcelona.com", "basara.cc", "baseballmail.com", "basketballmail.com", "batelco.com.bh", "battlearenatoshinden.com", "batuta.net", "baudoinconsulting.com", "bcvibes.com", "beachin.net", "beeebank.com", "beenhad.com", "beep.ru", "beer.com", "beethoven.com", "belgacom.be", "belice.com", "belizehome.com", "bellatlantic.net", "bellsouth.net", "berlin.com", "berlin.de", "berlinexpo.de", "bestmail.us", "bettiemail.com", "bgc.cc", "bgc2040.com", "bharatmail.com", "bigblue.net.au", "bigboab.com", "bigfoot.com", "bigfoot.de", "bigger.com", "biggerbadder.com", "bigmailbox.com", "bigpond.com", "bigpond.net.au", "bigramp.com", "BigString.com", "bikemechanics.com", "bikeracers.net", "bikerider.com", "bimamail.com", "bimla.net", "birch.net", "birdmail.com", "birdowner.net", "bishoujosenshi.com", "bitpage.net", "bizhosting.com", "bla-bla.com", "blackburnmail.com", "blackplanet.com", "blademail.net", "blazemail.com", "blipmail.net", "bluehyppo.com", "bluemail.ch", "bluemail.dk", "bluemoon.net", "bluesubmarine.net", "bluewin.ch", "blushmail.com", "bmlsports.net", "boardermail.com", "bokunochikyuuomamotte.com", "bol.com.br", "bolando.com", "bold.to", "bollywoodz.com", "bolt.com", "boltonfans.com", "bonbon.net", "bootmail.com", "bornnaked.com", "bostonoffice.com", "bounce.net", "box.az", "boxbg.com", "boxemail.com", "boxfrog.com", "bradfordfans.com", "brainpowerd.com", "brainpowerd.net", "brasilia.net", "brazilmail.com.br", "breathe.com", "bresnan.net", "brfree.com.br", "brightok.net", "britneyclub.com", "brittonsign.com", "brmemc.net", "broadcastmusic.com", "btinternet.com", "btopenworld.co.uk", "btopenworld.com", "bubbles.com.br", "bughunt.net", "bullsfan.com", "bullsgame.com", "bumerang.ro", "bumrap.com", "buryfans.com", "business-man.com", "businessman.net", "bustamail.com", "bvimailbox.com", "c2i.net", "c3.hu", "c4.com", "cable.net.co", "cablelynx.com", "cableone.net", "cairomail.com", "callnetuk.com", "caltanet.it", "camasnet.com", "camidge.com", "canada.com", "canada-11.com", "canadianmail.com", "canoemail.com", "cardcaptors.cc", "care2.com", "carioca.net", "cartero.dk", "cartestraina.ro", "catcha.com", "catchamail.com", "catlover.com", "cd2.com", "cdc.net", "celineclub.com", "centoper.it", "centralpets.com", "centrum.cz", "centrum.sk", "centurytel.net", "cephiro.com", "cgac.es", "chaiyomail.com", "chance2mail.com", "chandrasekar.net", "charter.net", "charterinternet.com", "charterinternet.net", "chartertn.net", "chat.ru", "chattown.com", "chauhanweb.com", "check1check.com", "cheerful.com", "chemist.com", "chequemail.com", "chickmail.com", "china.com", "china.net.vg", "chirk.com", "chocaholic.com.au", "choiceonemail.com", "chorus.net", "chronocross.cc", "cia.hu", "cia-agent.com", "ciaoweb.it", "cicciociccio.com", "citlink.net", "city2city.com", "citynetwork.com", "city-of-bath.org", "city-of-birmingham.com", "city-of-brighton.org", "city-of-cambridge.com", "cityofcardiff.net", "city-of-coventry.com", "city-of-edinburgh.com", "city-of-lichfield.com", "city-of-lincoln.com", "city-of-liverpool.com", "cityoflondon.org", "city-of-manchester.com", "city-of-nottingham.com", "city-of-oxford.com", "city-of-swansea.com", "city-of-westminster.com", "city-of-westminster.net", "city-of-york.net", "ciudad.com.ar", "claramail.com", "classicmail.co.za", "clerk.com", "clnk.com", "close2you.net", "cloud.to", "club4x4.net", "clubalfa.com", "clubbers.net", "clubducati.com", "clubhonda.net", "cluemail.com", "cmsinter.net", "cnnsimail.com", "cnymail.com", "coastaccess.com", "codec.ro", "coder.hu", "cogeco.net", "coid.biz", "colleges.com", "columnist.com", "comic.com", "comic-geek.com", "comicmail.com", "comicsfan.net", "communityconnect.com", "compuserve.com", "computer-freak.com", "computermail.net", "concentric.net", "conexcol.com", "connect4free.net", "connectbox.com", "conwaycorp.net", "cookiemonster.com", "cool.br", "coolgoose.ca", "coolgoose.com", "coolkiwi.com", "coollist.com", "coolmail.com", "coolmail.net", "coolsend.com", "cooooool.com", "cooperation.net", "cooperationtogo.net", "copacabana.com", "cornerpub.com", "corporatedirtbag.com", "correo.terra.com.gt", "cortinet.com", "coruscant.net", "cotas.net", "counsellor.com", "counterstriker.dk", "countrylover.com", "cox.net", "coxinet.net", "cracker.hu", "crazedanddazed.com", "crazysexycool.com", "crimsonguard.net", "critterpost.com", "croeso.com", "crosspaths.net", "crosswinds.net", "cruel.co.uk", "cry4helponline.com", "crystal-tokyo.com", "crystania.com", "cs.com", "csinibaba.hu", "cstn.net", "curio-city.com", "cutey.com", "cvinet.com", "cww.de", "cyberbabies.com", "cybercityoedo.com", "cyberdude.com", "cyberforeplay.net", "cybergal.com", "cybergrrl.com", "cyberinbox.com", "cyberleports.com", "cybernet.it", "d3h.ca", "dabsol.net", "dadacasa.com", "dailypioneer.com", "dangerous-minds.com", "dansegulvet.com", "darkhorsefan.net", "darkhorsemail.net", "data54.com", "davegracey.com", "dazedandconfused.com", "dbzmail.com", "dcemail.com", "deadlymob.org", "dearriba.com", "death-star.com", "deliveryman.com", "dellsnet.com", "demon.co.uk", "desertmail.com", "desilota.com", "deskpilot.com", "detik.com", "devotedcouples.com", "dfwatson.com", "dhmail.net", "dia.net", "diplomats.com", "disinfo.net", "di-ve.com", "dmailman.com", "dn-angel.com", "dnsmadeeasy.com", "doctor.com", "doglover.com", "dogmail.co.uk", "dogsnob.net", "doityourself.com", "doneasy.com", "donjuan.com", "dontgotmail.com", "dontmesswithtexas.com", "doramail.com", "dostmail.com", "dotcom.fr", "dotnet.com", "dott.it", "dplanet.ch", "dr.com", "dragonball.ro", "dragoncon.net", "dragonslave.com", "dropzone.com", "drsend.com", "dteightron.com", "dubaimail.com", "dublin.com", "dublin.ie", "dwebtech.com", "dygo.com", "dynamitemail.com", "dyndns.org", "e-apollo.lv", "earthalliance.com", "earthdome.com", "earthling.net", "earthlink.com", "earthlink.net", "eastcoast.co.za", "eastmail.com", "eburg.com", "ecbsolutions.net", "echina.com", "ednatx.com", "educacao.te.pt", "edumail.vic.gov.au", "ehmail.com", "ehrgeiz.com", "eircom.net", "elhazard.net", "elsitio.com", "elvis.com", "email.com", "email.cz", "e-mail.dk", "email.ee", "email.it", "email.nu", "email.ro", "email.ru", "e-mail.ru", "email.si", "email2me.net", "emailacc.com", "emailaccount.com", "e-mailanywhere.com", "emailchoice.com", "emailcorner.net", "emailengine.net", "emailforyou.net", "emailgirl.net", "emailgroups.net", "email-london.co.uk", "emailmeback.net", "emailpinoy.com", "emailplanet.com", "emails.ru", "e-mails.ru", "emailuser.net", "emailx.net", "ematic.com", "embarqmail.com", "emirates.net.ae", "endlesswaltz.cc", "engineer.com", "england.com", "england.edu", "epatra.com", "epix.net", "eqqu.com", "eramail.co.za", "eresmas.com", "eriga.lv", "escaflowne.cc", "estranet.it", "e-tapaal.com", "etoast.com", "eudoramail.com", "europe.com", "euroseek.com", "eurosport.com", "evamail.i-p.com", "evangelion.com", "evangelion.ro", "every1.net", "everyday.com.kh", "everyone.net", "examnotes.net", "excite.co.jp", "excite.com", "excite.it", "execpc.com", "execs.com", "expressasia.com", "extended.com", "extreme.to", "ezcybersearch.com", "ezmail.egine.com", "ezmail.ru", "ezrs.com", "f1fans.net", "facehugger.com", "fan.com", "fanboy.org", "fanboyz.com", "fantasticmail.com", "faroweb.com", "fastem.com", "fastemail.us", "fastemailer.com", "fastermail.com", "fastimap.com", "fastmail.ca", "fastmail.fm", "fastmailbox.net", "fastmessaging.com", "fastwebnet.it", "fatalfury.net", "fatcock.net", "fathersrightsne.org", "fbi.hu", "fbi-agent.com", "federalcontractors.com", "fell2earth.com", "femenino.com", "feyenoorder.com", "ff8.cc", "ffanet.com", "fiberia.com", "figure.to", "filipinolinks.com", "finalfantasy.ro", "financemail.net", "financier.com", "findmail.com", "finebody.com", "fire-brigade.com", "fishburne.org", "fivestarstories.net", "flameofrecca.cc", "flash.net", "flashmail.com", "flipcode.com", "fltg.net", "fmail.co.uk", "fmailbox.com", "fmgirl.com", "fmguy.com", "fnbmail.co.za", "fnmail.com", "foothills.net", "forfree.at", "forpresident.com", "for-president.com", "fortuncity.com", "forum.dk", "free.com.pe", "free.fr", "freeaccess.nl", "freeandsingle.com", "freedomlover.com", "freegates.be", "freeghana.com", "freeler.nl", "freemail.com.au", "freemail.com.pk", "freemail.de", "freemail.et", "freemail.gr", "freemail.hu", "freemail.it", "freemail.lt", "freemail.nl", "freemail.org.mk", "freeserve.co.uk", "freestart.hu", "freesurf.fr", "freesurf.nl", "freeuk.com", "freeuk.net", "freeukisp.co.uk", "freeweb.org", "freewebemail.com", "freeyellow.com", "freeze.com", "freezone.co.uk", "fresnomail.com", "friendsfan.com", "from-africa.com", "fromalabama.com", "fromalaska.com", "from-america.com", "from-argentina.com", "fromarizona.com", "fromarkansas.com", "from-asia.com", "from-australia.com", "from-belgium.com", "from-brazil.com", "fromcalifornia.com", "from-canada.com", "from-china.net", "fromcolorado.com", "fromconnecticut.com", "fromdelaware.com", "from-england.com", "from-europe.com", "fromflorida.net", "from-france.net", "fromgeorgia.com", "from-germany.net", "fromhawaii.net", "from-holland.com", "fromidaho.com", "fromillinois.com", "fromindiana.com", "fromiowa.com", "from-israel.com", "from-italy.net", "from-japan.net", "fromjupiter.com", "fromkansas.com", "fromkentucky.com", "from-korea.com", "fromlouisiana.com", "frommaine.net", "frommaryland.com", "frommassachusetts.com", "from-mexico.com", "frommiami.com", "frommichigan.com", "fromminnesota.com", "frommississippi.com", "frommissouri.com", "frommontana.com", "fromnebraska.com", "fromnevada.com", "fromnewhampshire.com", "fromnewjersey.com", "fromnewmexico.com", "fromnewyork.net", "fromnorthcarolina.com", "fromnorthdakota.com", "fromohio.com", "fromoklahoma.com", "fromoregon.net", "from-outerspace.com", "frompennsylvania.com", "fromrhodeisland.com", "fromru.com", "from-russia.com", "fromsouthcarolina.com", "fromsouthdakota.com", "from-spain.net", "fromtennessee.com", "fromtexas.com", "fromthestates.com", "fromutah.com", "fromvermont.com", "fromvirginia.com", "fromwashington.com", "fromwashingtondc.com", "fromwestvirginia.com", "fromwisconsin.com", "fromwyoming.com", "front.ru", "frontiernet.net", "frostbyte.uk.net", "fsmail.net", "ftml.net", "fumanokojiro.com", "fuorissimo.com", "furinkanhigh.com", "fuse.net", "fushigiyugi.com", "fushigiyuugi.cc", "fut.es", "fxsmails.com", "galaxy5.com", "galaxypolice.com", "gamebox.net", "gardener.com", "gasaraki.cc", "gawab.com", "gaza.net", "gazeta.pl", "gazibooks.com", "ge999.com", "geek.hu", "geeklife.com", "generatorgawl.net", "geopia.com", "ghostmail.net", "giga4u.de", "glay.org", "glendale.net", "globalfree.it", "globalpagan.com", "globalsite.com.br", "gmx.at", "gmx.li", "gmx.net", "go.com", "go.ro", "go.ru", "go2net.com", "goddessmail.com", "gofree.co.uk", "goldenmail.ru", "goldmail.ru", "golfemail.com", "golfmail.be", "googlegroups.com", "googlemail.co.uk", "googlemail.com", "goplay.com", "gorontalo.net", "gospeedgo.com", "gothere.uk.com", "gotmail.com", "gotomy.com", "gowcaizer.net", "gportal.hu", "graffiti.net", "gratisweb.com", "gravitoncity.net", "gravitoncity.org", "grendelfan.com", "gte.net", "guessmail.com", "guitar-players.co.uk", "guju.net", "gulftel.com", "gundam.com", "gundam.ro", "gundammail.com", "gundamw.cc", "gundamwing.net", "gundamwing.org", "gunsmithcats.com", "gunsmithcats.org", "gurlmail.com", "guy.com", "guy2.com", "guyanafriends.com", "gyorsposta.com", "gyorsposta.hu", "hackermail.net", "hailmail.net", "hairdresser.net", "hamilton.net", "hamptonroads.com", "hanayoridango.cc", "handbag.com", "hang-ten.com", "hanmail.net", "happemail.com", "happycounsel.com", "hardcorefreak.com", "hareluyaboy.com", "harlock.net", "hauntedjunction.net", "heartthrob.com", "heerschap.com", "heesun.net", "hehe.com", "hellboyfan.com", "hello.hu", "hellteachernube.com", "helter-skelter.com", "henderson.net", "herediano.com", "herono1.com", "hierophantgreen.com", "hiflmall.com", "highmilton.com", "highquality.com", "highveldmail.co.za", "hispavista.com", "hkstarphoto.com", "hockeymail.com", "hollywoodkids.com", "home.no.net", "home.ro", "home.se", "homelocator.com", "homestead.com", "hongkong.com", "hookup.net", "hoopsmail.com", "horrormail.com", "hot.ee", "hotbot.com", "hotbrev.com", "hotfire.net", "hotletter.com", "hotpop.com", "hotpop3.com", "hotrpg.net", "hot-shot.com", "hotvoice.com", "houshinengi.c", "houshinengi.net", "hovac.com", "hsuchi.net", "hug.to", "hughes.net", "hunsa.com", "hurricanepolymar.com", "hushmail.com", "hutmail.net", "i12.com", "iamawoman.com", "iamwaiting.com", "iamwasted.com", "iamyours.com", "i-c.net", "icehouse.net", "icestorm.com", "iCloud.com", "icmsconsultants.com", "icq.com", "icqmail.com", "icrazy.com", "icx.net", "ididitmyway.com", "idirect.com", "iespana.es", "i-france.com", "ignazio.it", "ignmail.com", "ihateclowns.com", "iinet.net.au", "ijustdontcare.com", "ilovechocolate.com", "ilovetocollect.net", "ilse.nl", "i-mail.com.au", "imail.ru", "imailbox.com", "imel.org", "imneverwrong.com", "imposter.co.uk", "imstressed.com", "imtoosexy.com", "iname.com", "inbox.com", "inbox.net", "in-box.net", "inbox.ru", "incamail.com", "incredimail.com", "indexa.fr", "india.com", "indiatimes.com", "indosat.net.id", "infohq.com", "infomail.es", "infomart.or.jp", "inicia.es", "innocent.com", "inorbit.com", "insightbb.com", "insurer.com", "interfree.it", "interia.pl", "interlap.com.ar", "intermail.co.il", "internetbiz.com", "internetdrive.com", "internetegypt.com", "internetemails.net", "internetmailing.net", "internet-police.com", "invocon.com", "inwind.it", "iobox.com", "iobox.fi", "iol.it", "ionex.net", "i-p.com", "ip3.com", "ipa.net", "iqemail.com", "irangate.net", "iraqmail.com", "irj.hu", "isaac.net", "iscandar.com", "isellcars.com", "iserv.net", "islamonline.net", "ismart.net", "isonfire.com", "isp9.net", "itloox.com", "itmom.com", "ivebeenframed.com", "ivillage.com", "iwan-fals.com", "iwon.com", "izadpanah.com", "jakuza.hu", "japan.com", "japoness.com", "jaydemail.com", "jazzandjava.com", "jazzgame.com", "jetemail.net", "jigokusenseinube.com", "jippii.fi", "jmail.co.za", "joinme.com", "jojonokimyounabouken.com", "jojosbizarreadventure.com", "jojosventure.com", "jordanmail.com", "journalist.com", "jovem.te.pt", "joymail.com", "jpopmail.com", "jubiipost.dk", "jumpy.it", "juno.com", "jusenkyo.com", "justemail.net", "kaazoo.com", "kaikanphrase.com", "kaixo.com", "kalpoint.com", "kanatakara.com", "kapoorweb.com", "karachian.com", "karachioye.com", "karbasi.com", "kare-kano.net", "kareshikanojonojijou.com", "katamail.com", "kayafmmail.co.za", "kci.net", "keg-party.com", "keko.com.ar", "kellychen.com", "kenshin.cc", "keromail.com", "keythemetalidol.com", "kgb.hu", "khosropour.com", "kickassmail.com", "killermail.com", "kimo.com", "kinki-kids.com", "kittymail.com", "kiwibox.com", "kiwitown.com", "krunis.com", "kukamail.com", "kumarweb.com", "kuwait-mail.com", "ladymail.cz", "lagerlouts.com", "lahoreoye.com", "lakmail.com", "lamer.hu", "land.ru", "lankamail.com", "lanset.com", "laposte.net", "latinmail.com", "lawyer.com", "ldlmail.com", "leehom.net", "legalactions.com", "legislator.com", "leonlai.net", "level.to", "levele.com", "levele.hu", "lex.bg", "liberomail.com", "linainverse.net", "linkmaster.com", "linuxfreemail.com", "linuxmail.org", "lionsfan.com.au", "liontrucks.com", "list.ru", "liverpoolfans.com", "llandudno.com", "llangollen.com", "lle.inc.com", "lmxmail.sk", "lnnw.net", "lobbyist.com", "localbar.com", "lodoss.org", "login.net", "london.com", "looksmart.co.uk", "looksmart.com", "looksmart.com.au", "lopezclub.com", "louiskoo.com", "love.cz", "loveable.com", "lovelygirl.net", "lovemail.com", "lover-boy.com", "lovergirl.com", "lovingjesus.com", "lsbg.net", "luckymail.com", "luso.pt", "luukku.com", "lycos.co.uk", "lycos.com", "lycos.es", "lycos.it", "lycos.ne.jp", "lycosmail.com", "mac.com", "machinecandy.com", "macmail.com", "macrosscity.com", "madmanmail.com", "madrid.com", "maffia.hu", "magicgirl.com", "magicmail.co.za", "mahmoodweb.com", "m-a-i-l.com", "mail15.com", "mail2007.com", "mail2aaron.com", "mail2abby.com", "mail2abc.com", "mail2actor.com", "mail2admiral.com", "mail2adorable.com", "mail2adoration.com", "mail2adore.com", "mail2adventure.com", "mail2aeolus.com", "mail2aether.com", "mail2affection.com", "mail2afghanistan.com", "mail2africa.com", "mail2agent.com", "mail2aha.com", "mail2ahoy.com", "mail2aim.com", "mail2air.com", "mail2airbag.com", "mail2airforce.com", "mail2airport.com", "mail2alabama.com", "mail2alan.com", "mail2alaska.com", "mail2albania.com", "mail2alcoholic.com", "mail2alec.com", "mail2alexa.com", "mail2algeria.com", "mail2alicia.com", "mail2alien.com", "mail2allan.com", "mail2allen.com", "mail2allison.com", "mail2alpha.com", "mail2alyssa.com", "mail2amanda.com", "mail2amazing.com", "mail2amber.com", "mail2america.com", "mail2american.com", "mail2andorra.com", "mail2andrea.com", "mail2andy.com", "mail2anesthesiologist.com", "mail2angela.com", "mail2angola.com", "mail2ann.com", "mail2anna.com", "mail2anne.com", "mail2anthony.com", "mail2anything.com", "mail2aphrodite.com", "mail2apollo.com", "mail2april.com", "mail2aquarius.com", "mail2arabia.com", "mail2arabic.com", "mail2architect.com", "mail2ares.com", "mail2argentina.com", "mail2aries.com", "mail2arizona.com", "mail2arkansas.com", "mail2armenia.com", "mail2army.com", "mail2arnold.com", "mail2art.com", "mail2artemus.com", "mail2arthur.com", "mail2artist.com", "mail2ashley.com", "mail2ask.com", "mail2astronomer.com", "mail2athena.com", "mail2athlete.com", "mail2atlas.com", "mail2atom.com", "mail2attitude.com", "mail2auction.com", "mail2aunt.com", "mail2australia.com", "mail2austria.com", "mail2azerbaijan.com", "mail2baby.com", "mail2bahamas.com", "mail2bahrain.com", "mail2ballerina.com", "mail2ballplayer.com", "mail2band.com", "mail2bangladesh.com", "mail2bank.com", "mail2banker.com", "mail2bankrupt.com", "mail2baptist.com", "mail2bar.com", "mail2barbados.com", "mail2barbara.com", "mail2barter.com", "mail2basketball.com", "mail2batter.com", "mail2beach.com", "mail2beast.com", "mail2beatles.com", "mail2beauty.com", "mail2becky.com", "mail2beijing.com", "mail2belgium.com", "mail2belize.com", "mail2ben.com", "mail2bernard.com", "mail2beth.com", "mail2betty.com", "mail2beverly.com", "mail2beyond.com", "mail2biker.com", "mail2bill.com", "mail2billionaire.com", "mail2billy.com", "mail2bio.com", "mail2biologist.com", "mail2black.com", "mail2blackbelt.com", "mail2blake.com", "mail2blind.com", "mail2blonde.com", "mail2blues.com", "mail2bob.com", "mail2bobby.com", "mail2bolivia.com", "mail2bombay.com", "mail2bonn.com", "mail2bookmark.com", "mail2boreas.com", "mail2bosnia.com", "mail2boston.com", "mail2botswana.com", "mail2bradley.com", "mail2brazil.com", "mail2breakfast.com", "mail2brian.com", "mail2bride.com", "mail2brittany.com", "mail2broker.com", "mail2brook.com", "mail2bruce.com", "mail2brunei.com", "mail2brunette.com", "mail2brussels.com", "mail2bryan.com", "mail2bug.com", "mail2bulgaria.com", "mail2business.com", "mail2buy.com", "mail2ca.com", "mail2california.com", "mail2calvin.com", "mail2cambodia.com", "mail2cameroon.com", "mail2canada.com", "mail2cancer.com", "mail2capeverde.com", "mail2capricorn.com", "mail2cardinal.com", "mail2cardiologist.com", "mail2care.com", "mail2caroline.com", "mail2carolyn.com", "mail2casey.com", "mail2cat.com", "mail2caterer.com", "mail2cathy.com", "mail2catlover.com", "mail2catwalk.com", "mail2cell.com", "mail2chad.com", "mail2champaign.com", "mail2charles.com", "mail2chef.com", "mail2chemist.com", "mail2cherry.com", "mail2chicago.com", "mail2chile.com", "mail2china.com", "mail2chinese.com", "mail2chocolate.com", "mail2christian.com", "mail2christie.com", "mail2christmas.com", "mail2christy.com", "mail2chuck.com", "mail2cindy.com", "mail2clark.com", "mail2classifieds.com", "mail2claude.com", "mail2cliff.com", "mail2clinic.com", "mail2clint.com", "mail2close.com", "mail2club.com", "mail2coach.com", "mail2coastguard.com", "mail2colin.com", "mail2college.com", "mail2colombia.com", "mail2color.com", "mail2colorado.com", "mail2columbia.com", "mail2comedian.com", "mail2composer.com", "mail2computer.com", "mail2computers.com", "mail2concert.com", "mail2congo.com", "mail2connect.com", "mail2connecticut.com", "mail2consultant.com", "mail2convict.com", "mail2cook.com", "mail2cool.com", "mail2cory.com", "mail2costarica.com", "mail2country.com", "mail2courtney.com", "mail2cowboy.com", "mail2cowgirl.com", "mail2craig.com", "mail2crave.com", "mail2crazy.com", "mail2create.com", "mail2croatia.com", "mail2cry.com", "mail2crystal.com", "mail2cuba.com", "mail2culture.com", "mail2curt.com", "mail2customs.com", "mail2cute.com", "mail2cutey.com", "mail2cynthia.com", "mail2cyprus.com", "mail2czechrepublic.com", "mail2dad.com", "mail2dale.com", "mail2dallas.com", "mail2dan.com", "mail2dana.com", "mail2dance.com", "mail2dancer.com", "mail2danielle.com", "mail2danny.com", "mail2darlene.com", "mail2darling.com", "mail2darren.com", "mail2daughter.com", "mail2dave.com", "mail2dawn.com", "mail2dc.com", "mail2dealer.com", "mail2deanna.com", "mail2dearest.com", "mail2debbie.com", "mail2debby.com", "mail2deer.com", "mail2delaware.com", "mail2delicious.com", "mail2demeter.com", "mail2democrat.com", "mail2denise.com", "mail2denmark.com", "mail2dennis.com", "mail2dentist.com", "mail2derek.com", "mail2desert.com", "mail2devoted.com", "mail2devotion.com", "mail2diamond.com", "mail2diana.com", "mail2diane.com", "mail2diehard.com", "mail2dilemma.com", "mail2dillon.com", "mail2dinner.com", "mail2dinosaur.com", "mail2dionysos.com", "mail2diplomat.com", "mail2director.com", "mail2dirk.com", "mail2disco.com", "mail2dive.com", "mail2diver.com", "mail2divorced.com", "mail2djibouti.com", "mail2doctor.com", "mail2doglover.com", "mail2dominic.com", "mail2dominica.com", "mail2dominicanrepublic.com", "mail2don.com", "mail2donald.com", "mail2donna.com", "mail2doris.com", "mail2dorothy.com", "mail2doug.com", "mail2dough.com", "mail2douglas.com", "mail2dow.com", "mail2downtown.com", "mail2dream.com", "mail2dreamer.com", "mail2dude.com", "mail2dustin.com", "mail2dyke.com", "mail2dylan.com", "mail2earl.com", "mail2earth.com", "mail2eastend.com", "mail2eat.com", "mail2economist.com", "mail2ecuador.com", "mail2eddie.com", "mail2edgar.com", "mail2edwin.com", "mail2egypt.com", "mail2electron.com", "mail2eli.com", "mail2elizabeth.com", "mail2ellen.com", "mail2elliot.com", "mail2elsalvador.com", "mail2elvis.com", "mail2emergency.com", "mail2emily.com", "mail2engineer.com", "mail2english.com", "mail2environmentalist.com", "mail2eos.com", "mail2eric.com", "mail2erica.com", "mail2erin.com", "mail2erinyes.com", "mail2eris.com", "mail2eritrea.com", "mail2ernie.com", "mail2eros.com", "mail2estonia.com", "mail2ethan.com", "mail2ethiopia.com", "mail2eu.com", "mail2europe.com", "mail2eurus.com", "mail2eva.com", "mail2evan.com", "mail2evelyn.com", "mail2everything.com", "mail2exciting.com", "mail2expert.com", "mail2fairy.com", "mail2faith.com", "mail2fanatic.com", "mail2fancy.com", "mail2fantasy.com", "mail2farm.com", "mail2farmer.com", "mail2fashion.com", "mail2fat.com", "mail2feeling.com", "mail2female.com", "mail2fever.com", "mail2fighter.com", "mail2fiji.com", "mail2filmfestival.com", "mail2films.com", "mail2finance.com", "mail2finland.com", "mail2fireman.com", "mail2firm.com", "mail2fisherman.com", "mail2flexible.com", "mail2florence.com", "mail2florida.com", "mail2floyd.com", "mail2fly.com", "mail2fond.com", "mail2fondness.com", "mail2football.com", "mail2footballfan.com", "mail2found.com", "mail2france.com", "mail2frank.com", "mail2frankfurt.com", "mail2franklin.com", "mail2fred.com", "mail2freddie.com", "mail2free.com", "mail2freedom.com", "mail2french.com", "mail2freudian.com", "mail2friendship.com", "mail2from.com", "mail2fun.com", "mail2gabon.com", "mail2gabriel.com", "mail2gail.com", "mail2galaxy.com", "mail2gambia.com", "mail2games.com", "mail2gary.com", "mail2gavin.com", "mail2gemini.com", "mail2gene.com", "mail2genes.com", "mail2geneva.com", "mail2george.com", "mail2georgia.com", "mail2gerald.com", "mail2german.com", "mail2germany.com", "mail2ghana.com", "mail2gilbert.com", "mail2gina.com", "mail2girl.com", "mail2glen.com", "mail2gloria.com", "mail2goddess.com", "mail2gold.com", "mail2golfclub.com", "mail2golfer.com", "mail2gordon.com", "mail2government.com", "mail2grab.com", "mail2grace.com", "mail2graham.com", "mail2grandma.com", "mail2grandpa.com", "mail2grant.com", "mail2greece.com", "mail2green.com", "mail2greg.com", "mail2grenada.com", "mail2gsm.com", "mail2guard.com", "mail2guatemala.com", "mail2guy.com", "mail2hades.com", "mail2haiti.com", "mail2hal.com", "mail2handhelds.com", "mail2hank.com", "mail2hannah.com", "mail2harold.com", "mail2harry.com", "mail2hawaii.com", "mail2headhunter.com", "mail2heal.com", "mail2heather.com", "mail2heaven.com", "mail2hebe.com", "mail2hecate.com", "mail2heidi.com", "mail2helen.com", "mail2hell.com", "mail2help.com", "mail2helpdesk.com", "mail2henry.com", "mail2hephaestus.com", "mail2hera.com", "mail2hercules.com", "mail2herman.com", "mail2hermes.com", "mail2hespera.com", "mail2hestia.com", "mail2highschool.com", "mail2hindu.com", "mail2hip.com", "mail2hiphop.com", "mail2holland.com", "mail2holly.com", "mail2hollywood.com", "mail2homer.com", "mail2honduras.com", "mail2honey.com", "mail2hongkong.com", "mail2hope.com", "mail2horse.com", "mail2hot.com", "mail2hotel.com", "mail2houston.com", "mail2howard.com", "mail2hugh.com", "mail2human.com", "mail2hungary.com", "mail2hungry.com", "mail2hygeia.com", "mail2hyperspace.com", "mail2hypnos.com", "mail2ian.com", "mail2ice-cream.com", "mail2iceland.com", "mail2idaho.com", "mail2idontknow.com", "mail2illinois.com", "mail2imam.com", "mail2in.com", "mail2india.com", "mail2indian.com", "mail2indiana.com", "mail2indonesia.com", "mail2infinity.com", "mail2intense.com", "mail2iowa.com", "mail2iran.com", "mail2iraq.com", "mail2ireland.com", "mail2irene.com", "mail2iris.com", "mail2irresistible.com", "mail2irving.com", "mail2irwin.com", "mail2isaac.com", "mail2israel.com", "mail2italian.com", "mail2italy.com", "mail2jackie.com", "mail2jacob.com", "mail2jail.com", "mail2jaime.com", "mail2jake.com", "mail2jamaica.com", "mail2james.com", "mail2jamie.com", "mail2jan.com", "mail2jane.com", "mail2janet.com", "mail2janice.com", "mail2japan.com", "mail2japanese.com", "mail2jasmine.com", "mail2jason.com", "mail2java.com", "mail2jay.com", "mail2jazz.com", "mail2jed.com", "mail2jeffrey.com", "mail2jennifer.com", "mail2jenny.com", "mail2jeremy.com", "mail2jerry.com", "mail2jessica.com", "mail2jessie.com", "mail2jesus.com", "mail2jew.com", "mail2jeweler.com", "mail2jim.com", "mail2jimmy.com", "mail2joan.com", "mail2joann.com", "mail2joanna.com", "mail2jody.com", "mail2joe.com", "mail2joel.com", "mail2joey.com", "mail2john.com", "mail2join.com", "mail2jon.com", "mail2jonathan.com", "mail2jones.com", "mail2jordan.com", "mail2joseph.com", "mail2josh.com", "mail2joy.com", "mail2juan.com", "mail2judge.com", "mail2judy.com", "mail2juggler.com", "mail2julian.com", "mail2julie.com", "mail2jumbo.com", "mail2junk.com", "mail2justin.com", "mail2justme.com", "mail2kansas.com", "mail2karate.com", "mail2karen.com", "mail2karl.com", "mail2karma.com", "mail2kathleen.com", "mail2kathy.com", "mail2katie.com", "mail2kay.com", "mail2kazakhstan.com", "mail2keen.com", "mail2keith.com", "mail2kelly.com", "mail2kelsey.com", "mail2ken.com", "mail2kendall.com", "mail2kennedy.com", "mail2kenneth.com", "mail2kenny.com", "mail2kentucky.com", "mail2kenya.com", "mail2kerry.com", "mail2kevin.com", "mail2kim.com", "mail2kimberly.com", "mail2king.com", "mail2kirk.com", "mail2kiss.com", "mail2kosher.com", "mail2kristin.com", "mail2kurt.com", "mail2kuwait.com", "mail2kyle.com", "mail2kyrgyzstan.com", "mail2la.com", "mail2lacrosse.com", "mail2lance.com", "mail2lao.com", "mail2larry.com", "mail2latvia.com", "mail2laugh.com", "mail2laura.com", "mail2lauren.com", "mail2laurie.com", "mail2lawrence.com", "mail2lawyer.com", "mail2lebanon.com", "mail2lee.com", "mail2leo.com", "mail2leon.com", "mail2leonard.com", "mail2leone.com", "mail2leslie.com", "mail2letter.com", "mail2liberia.com", "mail2libertarian.com", "mail2libra.com", "mail2libya.com", "mail2liechtenstein.com", "mail2life.com", "mail2linda.com", "mail2linux.com", "mail2lionel.com", "mail2lipstick.com", "mail2liquid.com", "mail2lisa.com", "mail2lithuania.com", "mail2litigator.com", "mail2liz.com", "mail2lloyd.com", "mail2lois.com", "mail2lola.com", "mail2london.com", "mail2looking.com", "mail2lori.com", "mail2lost.com", "mail2lou.com", "mail2louis.com", "mail2louisiana.com", "mail2lovable.com", "mail2love.com", "mail2lucky.com", "mail2lucy.com", "mail2lunch.com", "mail2lust.com", "mail2luxembourg.com", "mail2luxury.com", "mail2lyle.com", "mail2lynn.com", "mail2madagascar.com", "mail2madison.com", "mail2madrid.com", "mail2maggie.com", "mail2mail4.com", "mail2maine.com", "mail2malawi.com", "mail2malaysia.com", "mail2maldives.com", "mail2mali.com", "mail2malta.com", "mail2mambo.com", "mail2man.com", "mail2mandy.com", "mail2manhunter.com", "mail2mankind.com", "mail2many.com", "mail2marc.com", "mail2marcia.com", "mail2margaret.com", "mail2margie.com", "mail2marhaba.com", "mail2maria.com", "mail2marilyn.com", "mail2marines.com", "mail2mark.com", "mail2marriage.com", "mail2married.com", "mail2marries.com", "mail2mars.com", "mail2marsha.com", "mail2marshallislands.com", "mail2martha.com", "mail2martin.com", "mail2marty.com", "mail2marvin.com", "mail2mary.com", "mail2maryland.com", "mail2mason.com", "mail2massachusetts.com", "mail2matt.com", "mail2matthew.com", "mail2maurice.com", "mail2mauritania.com", "mail2mauritius.com", "mail2max.com", "mail2maxwell.com", "mail2maybe.com", "mail2mba.com", "mail2me4u.com", "mail2mechanic.com", "mail2medieval.com", "mail2megan.com", "mail2mel.com", "mail2melanie.com", "mail2melissa.com", "mail2melody.com", "mail2member.com", "mail2memphis.com", "mail2methodist.com", "mail2mexican.com", "mail2mexico.com", "mail2mgz.com", "mail2miami.com", "mail2michael.com", "mail2michelle.com", "mail2michigan.com", "mail2mike.com", "mail2milan.com", "mail2milano.com", "mail2mildred.com", "mail2milkyway.com", "mail2millennium.com", "mail2millionaire.com", "mail2milton.com", "mail2mime.com", "mail2mindreader.com", "mail2mini.com", "mail2minister.com", "mail2minneapolis.com", "mail2minnesota.com", "mail2miracle.com", "mail2missionary.com", "mail2mississippi.com", "mail2missouri.com", "mail2mitch.com", "mail2model.com", "mail2moldova.commail2molly.com", "mail2mom.com", "mail2monaco.com", "mail2money.com", "mail2mongolia.com", "mail2monica.com", "mail2montana.com", "mail2monty.com", "mail2moon.com", "mail2morocco.com", "mail2morpheus.com", "mail2mors.com", "mail2moscow.com", "mail2moslem.com", "mail2mouseketeer.com", "mail2movies.com", "mail2mozambique.com", "mail2mp3.com", "mail2mrright.com", "mail2msright.com", "mail2museum.com", "mail2music.com", "mail2musician.com", "mail2muslim.com", "mail2my.com", "mail2myboat.com", "mail2mycar.com", "mail2mycell.com", "mail2mygsm.com", "mail2mylaptop.com", "mail2mymac.com", "mail2mypager.com", "mail2mypalm.com", "mail2mypc.com", "mail2myphone.com", "mail2myplane.com", "mail2namibia.com", "mail2nancy.com", "mail2nasdaq.com", "mail2nathan.com", "mail2nauru.com", "mail2navy.com", "mail2neal.com", "mail2nebraska.com", "mail2ned.com", "mail2neil.com", "mail2nelson.com", "mail2nemesis.com", "mail2nepal.com", "mail2netherlands.com", "mail2network.com", "mail2nevada.com", "mail2newhampshire.com", "mail2newjersey.com", "mail2newmexico.com", "mail2newyork.com", "mail2newzealand.com", "mail2nicaragua.com", "mail2nick.com"];
var badWords = ["a55", "a55hole", "aeolus", "ahole", "anal", "analprobe", "anilingus", "anus", "areola", "areole", "arian", "aryan", "ass", "assbang", "assbanged", "assbangs", "asses", "assfuck", "assfucker", "assh0le", "asshat", "assho1e", "ass hole", "assholes", "assmaster", "assmunch", "asswipe", "asswipes", "azazel", "azz", "b1tch", "babes", "ballsack", "banger", "barf", "bastard", "bastards", "bawdy", "beardedclam", "beastiality", "beatch", "beaver", "beeyotch", "beotch", "biatch", "bigtits", "big tits", "bimbo", "bitch", "bitched", "bitches", "bitchy", "blow job", "blowjob", "blowjobs", "bod", "bodily", "boink", "bollock", "bollocks", "bollok", "bone", "boned", "boner", "boners", "bong", "boob", "boobies", "boobs", "booby", "booger", "bookie", "bootee", "bootie", "booty", "boozy", "bosom", "bosomy", "bowels", "bra", "brassiere", "breast", "breasts", "bugger", "bukkake", "bullshit", "bull shit", "bullshits", "bullshitted", "bullturds", "bung", "busty", "butt fuck", "buttfuck", "buttfucker", "buttfucker", "buttplug", "c.0.c.k", "c.o.c.k.", "c.u.n.t", "c0ck", "c-0-c-k", "caca", "cahone", "cameltoe", "carpetmuncher", "cawk", "cervix", "chinc", "chincs", "chink", "chink", "chode", "chodes", "cl1t", "climax", "clit", "clitoris", "clitorus", "clits", "clitty", "cocain", "cock", "c-o-c-k", "cockblock", "cockholster", "cockknocker", "cocks", "cocksmoker", "cocksucker", "cock sucker", "coital", "commie", "condom", "coon", "coons", "corksucker", "crabs", "crack", "crackwhore", "crap", "crappy", "cum", "cumming", "cumshot", "cumshots", "cumslut", "cumstain", "cunilingus", "cunnilingus", "cunny", "cunt", "cunt", "c-u-n-t", "cuntface", "cunthunter", "cuntlick", "cuntlicker", "cunts", "d0ng", "d0uch3", "d0uche", "d1ck", "d1ld0", "d1ldo", "dago", "dagos", "dammit", "damn", "damned", "damnit", "dawgie-style", "dickbag", "dickdipper", "dickface", "dickflipper", "dickhead", "dickheads", "dickish", "dick-ish", "dickripper", "dicksipper", "dickweed", "dickwhipper", "dickzipper", "diddle", "dike", "dildo", "dildos", "diligaf", "dillweed", "dimwit", "dingle", "dipship", "doggie-style", "doggy-style", "doofus", "doosh", "dopey", "douch3", "douche", "douchebag", "douchebags", "douchey", "drunk", "dumass", "dumbass", "dumbasses", "dummy", "dyke", "dykes", "ejaculate", "enlargement", "erect", "erection", "erotic", "essohbee", "extacy", "extasy", "f.u.c.k", "fack", "fag", "fagg", "fagged", "faggit", "faggot", "fagot", "fags", "faig", "faigt", "fannybandit", "fart", "fartknocker", "fat", "felch", "felching", "fellate", "fellatio", "feltch", "feltcher", "fisted", "fisting", "fisty", "floozy", "foad", "fondle", "foobar", "foreskin", "freex", "frigg", "frigga", "fubar", "fuck", "f-u-c-k", "fuckass", "fucked", "fucked", "fucker", "fuckface", "fuckin", "fucking", "fucknugget", "fucknut", "fuckoff", "fucks", "fucktard", "fuck-tard", "fuckup", "fuckwad", "fuckwit", "fudgepacker", "fuk", "fvck", "fxck", "gae", "ganja", "gfy", "ghay", "ghey", "gigolo", "glans", "goatse", "godamn", "godamnit", "goddam", "goddammit", "goddamn", "goldenshower", "gonad", "gonads", "gooks", "gringo", "gspot", "g-spot", "gtfo", "h0m0", "h0mo", "handjob", "hard on", "he11", "hebe", "heeb", "hell", "hemp", "herp", "herpy", "hitler", "hiv", "hobag", "hom0", "homey", "homo", "homoey", "honky", "hooch", "hookah", "hoor", "horny", "hump", "humped", "humping", "hussy", "hymen", "inbred", "incest", "injun", "j3rk0ff", "jackass", "jackhole", "jackoff", "jap", "japs", "jerk", "jerk0ff", "jerked", "jerkoff", "jism", "jiz", "jizm", "jizz", "jizzed", "junkie", "junky", "kike", "kikes", "kill", "kinky", "kkk", "klan", "knobend", "kooch", "kooches", "kootch", "kraut", "kyke", "labia", "lech", "leper", "lesbians", "lesbo", "lesbos", "lez", "lezbian", "lezbians", "lezbo", "lezbos", "lezzie", "lezzies", "lezzy", "lmao", "lmfao", "loins", "lube", "lusty", "mams", "massa", "masterbate", "masterbating", "masterbation", "masturbate", "masturbating", "masturbation", "maxi", "menses", "menstruate", "menstruation", "meth", "m-fucking", "mofo", "molest", "moolie", "moron", "motherfucka", "motherfucker", "motherfucking", "mtherfucker", "mthrfucker", "mthrfucking", "muff", "muffdiver", "murder", "muthafuckaz", "muthafucker", "mutherfucker", "mutherfucking", "muthrfucking", "nad", "nads", "napalm", "nappy", "nazi", "nazism", "nigga", "niggah", "niggas", "niggaz", "nigger", "nigger", "niggers", "niggle", "niglet", "nimrod", "ninny", "nipple", "nooky", "nympho", "opiate", "oral", "orally", "orgasm", "orgasmic", "orgies", "orgy", "ovary", "ovum", "ovums", "p.u.s.s.y.", "paki", "pantie", "panties", "panty", "pastie", "pasty", "pcp", "pecker", "pedo", "pedophile", "pedophilia", "pedophiliac", "peepee", "penetrate", "penetration", "penial", "penile", "penis", "perversion", "peyote", "phalli", "phallic", "phuck", "pillowbiter", "pimp", "pinko", "piss", "pissed", "pissoff", "piss-off", "polack", "pollock", "poon", "poontang", "porn", "porno", "pornography", "potty", "prick", "prig", "prostitute", "prude", "pube", "pubic", "pubis", "punkass", "punky", "puss", "pussies", "pussy", "pussypounder", "puto", "queaf", "queef", "queef", "queer", "queero", "queers", "quim", "racy", "rape", "raped", "raper", "rapist", "raunch", "rectal", "rectum", "rectus", "reefer", "reetard", "retard", "retarded", "revue", "rimjob", "ritard", "rtard", "r-tard", "rum", "rump", "rumprammer", "ruski", "s.h.i.t.", "s.o.b.", "s0b", "sadism", "sadist", "scag", "scantily", "schizo", "schlong", "screw", "screwed", "scrog", "scrot", "scrote", "scrotum", "scrud", "scum", "seduce", "semen", "sexual", "sh1t", "s-h-1-t", "shamedame", "shit", "s-h-i-t", "shite", "shiteater", "shitface", "shithead", "shithole", "shithouse", "shits", "shitt", "shitted", "shitter", "shitty", "shiz", "sissy", "skag", "skank", "slave", "sleaze", "sleazy", "slut", "slutdumper", "slutkiss", "sluts", "smegma", "smut", "smutty", "snatch", "sniper", "snuff", "s-o-b", "sodom", "souse", "soused", "sperm", "spic", "spick", "spik", "spiks", "spooge", "spunk", "stfu", "stiffy", "stoned", "strip", "stupid", "suck", "sucked", "sucking", "sumofabiatch", "t1t", "tampon", "tard", "tawdry", "teabagging", "teat", "terd", "teste", "testee", "testes", "testicle", "testis", "thrust", "thug", "tinkle", "tit", "titfuck", "titi", "tits", "tittiefucker", "titties", "titty", "tittyfuck", "tittyfucker", "toots", "tramp", "transsexual", "trashy", "tubgirl", "turd", "tush", "twat", "twats", "ugly", "undies", "unwed", "urinal", "urine", "uterus", "uzi", "vag", "vagina", "viagra", "vixen", "vomit", "voyeur", "vulgar", "vulva", "wad", "wank", "wanker", "wazoo", "wedgie", "weenie", "weewee", "weirdo", "wench", "wetback", "wh0re", "wh0reface", "whiz", "whoralicious", "whore", "whorealicious", "whored", "whoreface", "whorehopper", "whorehouse", "whores", "whoring", "wigger", "womb", "wop", "wtf", "x-rated", "xxx", "yeasty", "yobbo", "zoophile", "domain.com", "rpsmartseeds.com"];;
! function($) {
    "use strict";
    Drupal.behaviors.vidyard_play = {
        attach: function(context, settings) {
            $(".play-btn-custom").on("click", function(e) {
                let embed_slector = $(this).find('.play-button').attr('data-embed_id');
                let height = $('#' + embed_slector).find(".vidyard-video-embed").height();
                $('#' + embed_slector).css({
                    'max-height': height + 'px'
                });
                let disable_analytics = $(this).find('.play-button').attr("data-disable_analytics");
                let video_uuid = $(this).find('.play-button').attr('data-video_uuid');
                try {
                    vidyardEmbed.api.renderPlayer({
                        uuid: video_uuid,
                        container: document.getElementById(embed_slector),
                        type: 'inline',
                        autoplay: 1,
                        disable_analytics
                    }).then((player) => {
                        $('#' + embed_slector).find(".vidyard-video-embed").remove();
                    });
                } catch (error) {
                    $('#' + embed_slector).find(".vidyard-video-embed").show();
                }
            });
        }
    };
}(jQuery);;