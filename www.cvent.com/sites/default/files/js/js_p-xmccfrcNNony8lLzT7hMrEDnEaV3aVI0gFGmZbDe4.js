/* @license GNU-GPL-2.0-or-later https://www.drupal.org/licensing/faq */ ! function(e, t, n) {
    function r(e, t) {
        return typeof e === t;
    }

    function s() {
        var e, t, n, s, o, i, a;
        for (var l in S)
            if (S.hasOwnProperty(l)) {
                if (e = [], t = S[l], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
                    for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
                for (s = r(t.fn, "function") ? t.fn() : t.fn, o = 0; o < e.length; o++) i = e[o], a = i.split("."), 1 === a.length ? Modernizr[a[0]] = s : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = s), C.push((s ? "" : "no-") + a.join("-"));
            }
    }

    function o(e) {
        var t = w.className,
            n = Modernizr._config.classPrefix || "";
        if (b && (t = t.baseVal), Modernizr._config.enableJSClass) {
            var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
            t = t.replace(r, "$1" + n + "js$2");
        }
        Modernizr._config.enableClasses && (t += " " + n + e.join(" " + n), b ? w.className.baseVal = t : w.className = t);
    }

    function i() {
        return "function" != typeof t.createElement ? t.createElement(arguments[0]) : b ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments);
    }

    function a() {
        var e = t.body;
        return e || (e = i(b ? "svg" : "body"), e.fake = !0), e;
    }

    function l(e, n, r, s) {
        var o, l, u, f, c = "modernizr",
            d = i("div"),
            p = a();
        if (parseInt(r, 10))
            for (; r--;) u = i("div"), u.id = s ? s[r] : c + (r + 1), d.appendChild(u);
        return o = i("style"), o.type = "text/css", o.id = "s" + c, (p.fake ? p : d).appendChild(o), p.appendChild(d), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(t.createTextNode(e)), d.id = c, p.fake && (p.style.background = "", p.style.overflow = "hidden", f = w.style.overflow, w.style.overflow = "hidden", w.appendChild(p)), l = n(d, e), p.fake ? (p.parentNode.removeChild(p), w.style.overflow = f, w.offsetHeight) : d.parentNode.removeChild(d), !!l;
    }

    function u(e, t) {
        return !!~("" + e).indexOf(t);
    }

    function f(e) {
        return e.replace(/([a-z])-([a-z])/g, function(e, t, n) {
            return t + n.toUpperCase();
        }).replace(/^-/, "");
    }

    function c(e, t) {
        return function() {
            return e.apply(t, arguments);
        };
    }

    function d(e, t, n) {
        var s;
        for (var o in e)
            if (e[o] in t) return n === !1 ? e[o] : (s = t[e[o]], r(s, "function") ? c(s, n || t) : s);
        return !1;
    }

    function p(e) {
        return e.replace(/([A-Z])/g, function(e, t) {
            return "-" + t.toLowerCase();
        }).replace(/^ms-/, "-ms-");
    }

    function m(t, n, r) {
        var s;
        if ("getComputedStyle" in e) {
            s = getComputedStyle.call(e, t, n);
            var o = e.console;
            if (null !== s) r && (s = s.getPropertyValue(r));
            else {
                if (o) {
                    var i = o.error ? "error" : "log";
                    o[i].call(o, "getComputedStyle returning null, its possible modernizr test results are inaccurate");
                }
            }
        } else s = !n && t.currentStyle && t.currentStyle[r];
        return s;
    }

    function v(t, r) {
        var s = t.length;
        if ("CSS" in e && "supports" in e.CSS) {
            for (; s--;)
                if (e.CSS.supports(p(t[s]), r)) return !0;
            return !1;
        }
        if ("CSSSupportsRule" in e) {
            for (var o = []; s--;) o.push("(" + p(t[s]) + ":" + r + ")");
            return o = o.join(" or "), l("@supports (" + o + ") { #modernizr { position: absolute; } }", function(e) {
                return "absolute" == m(e, null, "position");
            });
        }
        return n;
    }

    function h(e, t, s, o) {
        function a() {
            c && (delete A.style, delete A.modElem);
        }
        if (o = r(o, "undefined") ? !1 : o, !r(s, "undefined")) {
            var l = v(e, s);
            if (!r(l, "undefined")) return l;
        }
        for (var c, d, p, m, h, g = ["modernizr", "tspan", "samp"]; !A.style && g.length;) c = !0, A.modElem = i(g.shift()), A.style = A.modElem.style;
        for (p = e.length, d = 0; p > d; d++)
            if (m = e[d], h = A.style[m], u(m, "-") && (m = f(m)), A.style[m] !== n) {
                if (o || r(s, "undefined")) return a(), "pfx" == t ? m : !0;
                try {
                    A.style[m] = s;
                } catch (y) {}
                if (A.style[m] != h) return a(), "pfx" == t ? m : !0;
            }
        return a(), !1;
    }

    function g(e, t, n, s, o) {
        var i = e.charAt(0).toUpperCase() + e.slice(1),
            a = (e + " " + E.join(i + " ") + i).split(" ");
        return r(t, "string") || r(t, "undefined") ? h(a, t, s, o) : (a = (e + " " + N.join(i + " ") + i).split(" "), d(a, t, n));
    }

    function y(e, t, r) {
        return g(e, n, n, t, r);
    }
    var C = [],
        S = [],
        x = {
            _version: "3.6.0",
            _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0
            },
            _q: [],
            on: function(e, t) {
                var n = this;
                setTimeout(function() {
                    t(n[e]);
                }, 0);
            },
            addTest: function(e, t, n) {
                S.push({
                    name: e,
                    fn: t,
                    options: n
                });
            },
            addAsyncTest: function(e) {
                S.push({
                    name: null,
                    fn: e
                });
            }
        },
        Modernizr = function() {};
    Modernizr.prototype = x, Modernizr = new Modernizr();
    var w = t.documentElement,
        b = "svg" === w.nodeName.toLowerCase(),
        T = x._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
    x._prefixes = T;
    var _ = "CSS" in e && "supports" in e.CSS,
        z = "supportsCSS" in e;
    Modernizr.addTest("supports", _ || z);
    var P = x.testStyles = l;
    Modernizr.addTest("touchevents", function() {
        var n;
        if ("ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch) n = !0;
        else {
            var r = ["@media (", T.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
            P(r, function(e) {
                n = 9 === e.offsetTop;
            });
        }
        return n;
    });
    var j = "Moz O ms Webkit",
        E = x._config.usePrefixes ? j.split(" ") : [];
    x._cssomPrefixes = E;
    var N = x._config.usePrefixes ? j.toLowerCase().split(" ") : [];
    x._domPrefixes = N;
    var k = {
        elem: i("modernizr")
    };
    Modernizr._q.push(function() {
        delete k.elem;
    });
    var A = {
        style: k.elem.style
    };
    Modernizr._q.unshift(function() {
        delete A.style;
    }), x.testAllProps = g, x.testAllProps = y, Modernizr.addTest("cssanimations", y("animationName", "a", !0)), Modernizr.addTest("backgroundcliptext", function() {
        return y("backgroundClip", "text");
    }), Modernizr.addTest("cssfilters", function() {
        if (Modernizr.supports) return y("filter", "blur(2px)");
        var e = i("a");
        return e.style.cssText = T.join("filter:blur(2px); "), !!e.style.length && (t.documentMode === n || t.documentMode > 9);
    }), Modernizr.addTest("csstransforms", function() {
        return -1 === navigator.userAgent.indexOf("Android 2.") && y("transform", "scale(1)", !0);
    }), Modernizr.addTest("csstransforms3d", function() {
        return !!y("perspective", "1px", !0);
    }), Modernizr.addTest("csstransitions", y("transition", "all", !0)), Modernizr.addTest("cors", "XMLHttpRequest" in e && "withCredentials" in new XMLHttpRequest()), s(), o(C), delete x.addTest, delete x.addAsyncTest;
    for (var q = 0; q < Modernizr._q.length; q++) Modernizr._q[q]();
    e.Modernizr = Modernizr;
}(window, document);;