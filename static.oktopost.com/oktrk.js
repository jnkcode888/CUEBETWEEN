! function() {
    "use strict";
    var o, i, a, t, u, r, s, B, l, c = {
            domain: "okt.to",
            paths: {
                convert: "/c",
                ping: "/ping",
                lead: "/ping/form"
            }
        },
        f = window.OktopostTrackerObject || "_oktrk",
        e = window[f].q || [],
        d = [];
    t = "oktrkCallback_", a = function(o) {
        var a = this,
            i = o.debug,
            l = function() {
                return t + Math.floor(1e3 * Math.random() + 1)
            },
            c = function(t, e) {
                if ("function" == typeof e || i.isDebugSet()) {
                    var n, r, o = function() {
                        for (var t = l(); void 0 !== window[f][t];) t = l();
                        return t
                    }();
                    n = o, r = e, window[f][n] = function(t) {
                        window[f][n] = void 0, delete window[f][n], i.debug(t), "function" == typeof r && r(t)
                    }, t.callback = f + "." + o
                }
            };
        a.getCacheBuster = function() {
            return (new Date).getTime().toString()
        }, a.getArrayFromHtmlCollection = function(t) {
            var e, n = [];
            for (e = 0; e < t.length; e++) n.push(t[e]);
            return n
        }, a.isInArray = function(t, e) {
            return -1 !== a.indexInArray(t, e)
        }, a.indexInArray = function(t, e) {
            var n;
            for (n = t.length - 1; 0 <= n; n--)
                if (t[n] === e) return n;
            return -1
        }, a.getQueryParam = function(t) {
            var e, n = "";
            for (e in t) t.hasOwnProperty(e) && (n = n + "&" + encodeURIComponent(e) + "=" + encodeURIComponent(t[e]));
            return 0 < n.length && (n = n.substr(1)), n
        }, a.getProtocol = function() {
            return "https://"
        }, a.attachFile = function(t, e, n) {
            var r = a.getProtocol() + o.domain + e;
            t.readyState ? t.onreadystatechange = function() {
                "loaded" !== t.readyState && "complete" !== t.readyState || (t.onreadystatechange = null, t.parentNode.removeChild(t))
            } : t.onload = function() {
                t.parentNode.removeChild(t)
            }, t.src = r, n.appendChild(t)
        }, a.loadImage = function(t) {
            var e = document.createElement("img");
            e.height = "1", e.width = "1", e.onerror && (e.onerror = function() {
                e.parentNode.removeChild(e)
            }), a.attachFile(e, t, document.getElementsByTagName("body")[0])
        }, a.loadScript = function(t, e, n) {
            n = "boolean" != typeof n || n;
            var r = document.createElement("script"),
                o = function(t, e) {
                    var n, r = {};
                    if ("object" != typeof t) c(r);
                    else {
                        for (n in t) t.hasOwnProperty(n) && "callback" !== n && (r[n] = t[n]);
                        c(r, t.callback)
                    }
                    return e && (r.ts = a.getCacheBuster()), r
                }(e, n),
                i = a.getQueryParam(o);
            t = 0 < i.length ? t + "?" + i : t, r.type = "application/javascript", a.attachFile(r, t, document.getElementsByTagName("head")[0])
        }
    }, r = {
        tag: !0,
        value: !0,
        url: !0,
        firstName: !0,
        lastName: !0,
        email: !0,
        phone: !0,
        company: !0,
        country: !0,
        state: !0,
        city: !0,
        zip: !0
    }, u = function(o) {
        var i = o.accountId,
            a = (o.debug, o.utils);
        this.convert = function(t) {
            t = t || {}, a.loadImage(function(t, e) {
                e = "boolean" != typeof e || e;
                var n, r = o.convertPath + "/" + i + "/global";
                return e && (t.ts = a.getCacheBuster()), r = 0 < (n = a.getQueryParam(t)).length ? r + "?" + n : r
            }(function(t) {
                var e, n = {};
                for (e in t) t.hasOwnProperty(e) && void 0 !== r[e] && (n[e] = t[e]);
                return n
            }(t)))
        }
    }, B = {
        interval: {
            time: 200,
            maxRetries: 10
        },
        initInterval: {
            time: 500,
            maxRetries: 600
        },
        tests: {
            wpGravityForms: /input_[0-9]{1,2}/,
            sitefinity: /(^ctl00\$)|(\$ctl00\$)/,
            sitefinityFormField: /^FormFields\[[0-9]{1,2}\]\.Field$/i,
            pardot: /[0-9]{3,4}(pi_)/,
            netResults: /^ma-form-element-yui/,
            uuid: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            wufooForms: /^Field[0-9]{1,3}$/,
            dfbForms: /^dfbForm\$FormElement_/,
            silverpopForms: /^COLUMN[0-9]{1,2}$/,
            dynamicForms: /^dnn\$ctr[0-9]{1,5}\$DynamicForms\$/,
            ninjaForms: /^ninja_forms_field/,
            formidableForms: /^item\_meta\[[0-9]+\]$/,
            tfaForms: /^tfa\_[0-9]+$/,
            sitecore: /^wffm/,
            cvent: /^text-answer-[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            clickdimensionsForm: /^(f_)[a-z0-9]{32}$/
        },
        regex: {
            removeSpecialChars: /[^a-z0-9\s\-\_]/gim,
            trim: /^\s+|\s+$/gm,
            multipleSpaces: /\s+/g
        }
    }, s = function(a) {
        var l = a.accountId,
            c = a.debug,
            u = a.utils,
            s = !1,
            o = [],
            r = [],
            t = {},
            i = function(t) {
                var e;
                return 0 === t.length ? t : (e = t.replace(B.regex.removeSpecialChars, ""), e = (e = "function" == typeof String.prototype.trim ? e.trim() : e.replace(B.regex.trim, "")).replace(B.regex.multipleSpaces, " "))
            },
            n = function(t) {
                return "object" == typeof t.parentElement && null !== t.parentElement && "LABEL" === t.parentElement.tagName ? t.parentElement : "string" == typeof t.id && 0 < t.id.length ? function(t) {
                    var e, n, r = document.getElementsByTagName("label");
                    for (e = 0; e < r.length; e++)
                        if ("string" == typeof(n = r[e].getAttribute("for")) && n === t) return r[e];
                    return null
                }(t.id) : null
            },
            f = function(t, e) {
                return "object" != typeof t || null === t || "FORM" === t.tagName ? null : t.tagName === e ? t : f(t.parentElement, e)
            },
            d = function(t) {
                return g(null !== (e = f(t.parentElement, "TD")) ? e.previousElementSibling : null);
                var e
            },
            m = function(t, e) {
                var n = t.getAttribute(e);
                return "string" == typeof n ? n : ""
            },
            g = function(t) {
                return "object" != typeof t || null === t ? "" : "string" == typeof t.textContent && 0 < t.textContent.length ? t.textContent : "string" == typeof t.innerText && 0 < t.innerText.length ? t.innerText : ""
            },
            p = function(t) {
                var e;
                return 0 < (e = i(g(n(t)))).length ? e : 0 < (e = i(g(t.previousElementSibling))).length ? e : 0 < (e = i(d(t))).length ? e : 0 < (e = i(m(t, "placeholder"))).length ? e : e = i(m(t, "leadfield"))
            },
            v = function(t) {
                var e = t.getAttribute("type"),
                    n = t.getAttribute("name");
                if ("string" == typeof e) {
                    if ("email" === (e = e.toLowerCase())) return "Email";
                    if ("tel" === e) return "Phone"
                }
                return "string" != typeof n || 0 === n.length || B.tests.pardot.test(n) || B.tests.sitefinity.test(n) || B.tests.sitefinityFormField.test(n) || B.tests.wpGravityForms.test(n) || B.tests.wufooForms.test(n) || B.tests.dfbForms.test(n) || B.tests.uuid.test(n) || B.tests.netResults.test(n) || B.tests.silverpopForms.test(n) || B.tests.dynamicForms.test(n) || B.tests.ninjaForms.test(n) || B.tests.formidableForms.test(n) || B.tests.tfaForms.test(n) || B.tests.sitecore.test(n) || B.tests.cvent.test(n) || B.tests.clickdimensionsForm.test(n) ? p(t) : i(n)
            },
            h = function(t) {
                "object" == typeof t && t.UrlSet && (s = !0)
            },
            y = function(t, e) {
                if ("" !== e && "" !== t) {
                    var n, r, o, i = {
                        aid: l,
                        var: t,
                        val: e
                    };
                    n = i, s || (r = (r = document.location.href).split("?"), n.url = r[0]), o = i, s || (o.callback = h), u.loadScript(a.leadPath, i)
                } else c.debug("Passed empty field name: %O or field value: %O", t, e)
            },
            b = function(t) {
                y(v(t.srcElement), t.srcElement.value)
            },
            F = function() {
                y(v(this), this.value)
            },
            w = function(t) {
                var e, n;
                (I(t) || A(t)) && (n = "change", void 0 !== (e = t).addEventListener ? (0 < e.value.length && y(v(e), e.value), e.addEventListener(n, F)) : void 0 !== e.attachEvent && (0 < e.value.length && y(v(e), e.value), e.attachEvent("on" + n, b)))
            },
            E = function(t) {
                var e, n;
                (I(t) || A(t)) && (n = "change", void 0 !== (e = t).removeEventListener ? e.removeEventListener(n, F) : void 0 !== e.detachEvent && e.detachEvent("on" + n, b))
            },
            A = function(t) {
                return "SELECT" === t.nodeName
            },
            I = function(t) {
                if ("INPUT" !== t.nodeName) return !1;
                var e = t.getAttribute("type");
                return "string" == typeof e && ("text" === (e = e.toLowerCase()) || "email" === e || "number" === e || "tel" === e)
            },
            C = function(t) {
                var e = t.getElementsByTagName("input"),
                    n = t.getElementsByTagName("select");
                return 0 === n.length ? e : 0 === e.length ? n : u.getArrayFromHtmlCollection(e).concat(u.getArrayFromHtmlCollection(n))
            },
            S = function(t) {
                var e = C(t);
                return 0 < e.length && (function(t) {
                    var e;
                    for (e = 0; e < t.length; e++) w(t[e])
                }(e), !0)
            },
            k = function(t) {
                var e;
                0 < (e = C(t)).length && function(t) {
                    var e;
                    for (e = 0; e < t.length; e++) E(t[e])
                }(e)
            },
            x = function(t, e) {
                var n;
                if (n = t, !u.isInArray(o, n)) return 0 < S(t) ? (N(e), void o.push(t)) : void(r[e].counter < B.interval.maxRetries ? r[e].counter = r[e].counter + 1 : N(e));
                N(e)
            },
            N = function(t) {
                window.clearInterval(r[t].id), r[t].isActive = !1
            },
            T = function(t) {
                var e = r.length;
                r.push({
                    id: window.setInterval($(t, e), B.interval.time),
                    counter: 0,
                    isActive: !0
                })
            },
            $ = function(t, e) {
                return function() {
                    x(t, e)
                }
            },
            e = function() {
                var t, e = document.getElementsByTagName("form");
                for (t = 0; t < e.length; t++) T(e[t])
            },
            P = function(t, e) {
                var n, r;
                u.isInArray(o, t) ? e.isForce && (n = t, -1 !== (r = u.indexInArray(o, n)) && (k(n), o.splice(r, 1)), T(t)) : T(t)
            },
            L = function(t) {
                t.isForce && function() {
                        var t;
                        for (t = 0; t < o.length; t++) k(o[t]);
                        o = []
                    }(),
                    function() {
                        var t;
                        for (t = 0; t < r.length; t++) r[t].isActive && N(t);
                        r = []
                    }(), e()
            },
            j = function() {
                if ("complete" === document.readyState || "loaded" === document.readyState) return window.clearInterval(t.id), void e();
                t.counter < B.initInterval.maxRetries ? t.counter = t.counter + 1 : window.clearInterval(t.id)
            };
        this.track = function(t, e) {
            t instanceof HTMLElement ? P(t, e) : "string" == typeof t && 0 < t.length ? (t = document.getElementById(t)) instanceof HTMLElement && P(t, e) : L(e)
        }, t = {
            id: window.setInterval(j, B.initInterval.time),
            counter: 0
        }
    }, l = function(e) {
        var n, r, o = e.accountId || "",
            t = e.debug,
            i = e.utils,
            a = function() {
                var t = {
                    uri: document.location.pathname + document.location.search + document.location.hash,
                    aid: o
                };
                i.loadScript(e.paths.ping, t)
            },
            l = function() {
                n = new u({
                    accountId: o,
                    convertPath: e.paths.convert,
                    utils: i,
                    debug: t
                })
            },
            c = function() {
                r = new s({
                    accountId: o,
                    leadPath: e.paths.lead,
                    utils: i,
                    debug: t
                })
            };
        this.convert = function(t) {
            n.convert(t)
        }, this.track = function(t, e) {
            e = "boolean" == typeof e && e, r.track(t, {
                isForce: e
            })
        }, l(), c(), a()
    }, i = new function() {
        var e = this,
            n = !1,
            r = function() {},
            o = function() {
                console.log.apply(window.console, Array.prototype.slice.call(arguments))
            };
        e.debug = r, e.setDebug = function(t) {
            t !== n && (e.debug = t ? (n = !0, o) : (n = !1, r))
        }, e.isDebugSet = function() {
            return n
        }
    };
    window[f] = function() {
            var t = Array.prototype.slice.call(arguments),
                e = t.length,
                n = {
                    debug: i,
                    domain: c.domain
                };
            if (0 !== t.length) {
                if (3 <= e && "object" == typeof t[e - 1]) {
                    var r = t[e - 1];
                    void 0 !== n.domain && (n.domain = r.domain)
                }
                switch (o = new a(n), t.shift()) {
                    case "create":
                        return void
                        function(t) {
                            d.push(new l({
                                accountId: t,
                                debug: i,
                                utils: o,
                                paths: c.paths
                            }))
                        }.apply(null, t);
                    case "send":
                        return void
                        function(t) {
                            0 !== d.length && d[0].convert(t)
                        }.apply(null, t);
                    case "track":
                        return void
                        function(t, e) {
                            0 !== d.length && d[0].track(t, e)
                        }.apply(null, t);
                    case "setDebug":
                        return void i.setDebug.apply(null, t);
                    default:
                        return
                }
            }
        },
        function() {
            for (; 0 < e.length;) window[f].apply(null, Array.prototype.slice.call(e.shift()))
        }()
}();