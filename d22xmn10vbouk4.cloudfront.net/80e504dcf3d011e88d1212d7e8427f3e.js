if (typeof tiMonitor == "undefined") {
    var tiMonitor = tiMonitor || {};
    (function() {
        Function.prototype.bind = Function.prototype.bind || function(a) {
            var c = this;
            return function() {
                return c.apply(a, arguments)
            }
        }
    })();
    var EMPTY_FUN = function() {},
        UNDEF;
    (function() {
        function a() {}
        var c = null;
        try {
            c = function() {
                return this
            }()
        } catch (b) {}
        a.global = function() {
            return c
        };
        a.namespace = function(b, d, f, h) {
            b = b.split(".");
            var g = a.NAMESPACE_BASE || a.global(),
                m = null,
                k = null,
                g = f || g;
            for (f = 0; f < b.length - 1; f += 1) k = b[f], g[k] = g[k] || {}, g = g[k];
            m = g;
            k = b[b.length - 1];
            c.TAGSDK_NS_OVERRIDE && (h = !1);
            void 0 !== d ? void 0 !== m[k] && h || (m[k] = d) : m[k] = m[k] || {};
            return m[k]
        };
        a.clazz = function(b, d, c, h, g) {
            a.namespace(b, d, h, !0);
            "function" === typeof c && (d.superclass = c, d.prototype = new d.superclass(g));
            d.prototype &&
                (b = b.split("."), d.prototype.CLASS_NAME = b[b.length - 1], b.splice(b.length - 1, 1), d.prototype.PACKAGE_NAME = b.join("."));
            return d
        };
        a.clazz("taginspector.Define", a)
    })();
    (function() {
        function a(b) {}
        for (var c = {}, b = 0; 93 > b; b++) c["abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*!-#$&+()@'%./:<>?[\"]^_`{|}~\\;=".charAt(b)] = b;
        taginspector.Define.clazz("taginspector.Cookie", a);
        a.cookieAlphabet = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*!-#$&+()@'%./:<>?[\"]^_`{|}~\\;=";
        a.cookieAlphabetMap = c;
        a.decode = function(b) {
            return decodeURIComponent(b)
        };
        a.encode = function(b) {
            return encodeURIComponent(b)
        };
        a.set = function(b, d, c, h, g) {
            if (c) {
                var m = new Date;
                m.setTime(m.getTime() + 864E5 * c);
                c = "; expires=" + m.toGMTString()
            } else c = "";
            g && (b = a.encode(b), d = a.encode(d));
            b = b + "=" + d + c + "; path=/;";
            h && (b += " domain=" + h);
            document.cookie = b
        };
        a.get = function(b, c) {
            for (var f = b + "=", h = document.cookie.split(";"), g = 0; g < h.length; g++) {
                for (var m = h[g];
                    " " === m.charAt(0);) m = m.substring(1, m.length);
                if (0 === m.indexOf(f)) return f = m.substring(f.length, m.length), c && (f = a.decode(f)), f
            }
            return null
        };
        a.getAll = function(b, c) {
            for (var f = b + "=", h = document.cookie.split(";"), g = [], m = 0; m < h.length; m++) {
                for (var k =
                        h[m];
                    " " === k.charAt(0);) k = k.substring(1, k.length);
                0 === k.indexOf(f) && (k = k.substring(f.length, k.length), c && (k = a.decode(k)), g.push(k))
            }
            return g
        };
        a.rm = function(b, c) {
            a.set(b, "", -1, c)
        }
    })();
    (function() {
        function a(a) {
            if (a)
                if (a.alphabet)
                    for (this.alphabet = a.alphabet, this.dict = {}, a = 0; a < this.alphabet.length; a++) this.dict[this.alphabet[a]] = a;
                else this.alphabet = b, this.dict = f
        }

        function c(b, a) {
            for (var c in a)
                if (b === a[c]) return c;
            return null
        }
        for (var b = [], e = Math.pow(2, 8), d = 0; d < e; d++) b.push(String.fromCharCode(d));
        for (var f = {}, e = 0; e < b.length; e++) f[b[e]] = e;
        taginspector.Define.clazz("taginspector.compression.LZW", a);
        a.prototype.encode = function(b) {
            for (var a = this.alphabet.length, c = {}, d = [], e = 0, n = b.charAt(e++),
                    p, l = this.dict; p = b.charAt(e++);) {
                var r = n + p;
                if (l.hasOwnProperty(r) || c.hasOwnProperty(r)) n = r;
                else {
                    var f = l.hasOwnProperty(n) ? l[n] : c[n];
                    if (void 0 === f) throw "Dictionary base is to small for those contents: " + n;
                    d.push(f);
                    c[r] = a++;
                    n = p
                }
            }
            "" !== n && d.push(c.hasOwnProperty(n) ? c[n] : l[n]);
            return d
        };
        a.prototype.decode = function(b) {
            for (var a = this.dict, d = this.alphabet.length, e, f = {}, n = c(b[0], a), p = n, l = [n], r = 1; r < b.length; r++) {
                var x = b[r];
                e = c(x, a);
                null === e && (f.hasOwnProperty(x) && (e = f[x]), null === e && (e = p + n));
                l.push(e);
                n = e.charAt(0);
                f[d++] = p + n;
                p = e
            }
            return l.join("")
        }
    })();
    (function() {
        function a(b) {}
        for (var c = {}, b = 0; 45 > b; b++) c["abcdefghijklmnopqrstuvwxyz0123456789'%./:<>?[".charAt(b)] = b;
        for (var e = {}, b = 0; 45 > b; b++) e['ABCDEFGHIJKLMNOPQRSTUVWXYZ*!-+()@{|}"]^_`~$&#'.charAt(b)] = b;
        for (var d = {}, b = 0; 45 > b; b++) d["abcdefghijklmnopqrstuvwxyz0123456789'%./:<>?[".charAt(b)] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ*!-+()@{|}"]^_`~$&#'.charAt(b);
        var f = "abcdefghijklmnopqrstuvwxyz0123456789'%./:<>?[".split(""),
            h = f.length,
            g = new taginspector.compression.LZW({});
        taginspector.Define.clazz("taginspector.compression.Compressor",
            a);
        a.prototype.compress = function(b, a) {
            for (var c = (a || g).encode(b), n = [], p = 0; p < c.length; p++) n.push(String.fromCharCode(c[p]));
            return n.join("")
        };
        a.prototype.compressAnsi = function(b, a) {
            for (var c = (a || g).encode(b), n = [], p = 0; p < c.length; p++) {
                var l;
                l = c[p];
                var r = 0,
                    e = 0 > l;
                e && (l = -l);
                var s = "",
                    v = !0;
                do r = l % h, v ? (s = d[f[r]], v = !1) : s = f[r] + s, l = (l - r) / h; while (0 < l);
                l = e ? "-" + s : s;
                n.push(l)
            }
            return n.join("")
        };
        a.prototype.decompressAnsi = function(b, a) {
            for (var d = [], n = "", p = 0; p < b.length; p++) {
                var l = b.charAt(p);
                if (e.hasOwnProperty(l)) {
                    for (var l =
                            n + l, n = "", r = 0, f = 0, s = !0, v = 0; v < l.length; v++) {
                        var y = l.charAt(l.length - 1 - v);
                        s && (s = !1, y = "abcdefghijklmnopqrstuvwxyz0123456789'%./:<>?[".charAt(e[y]));
                        r += c[y] * Math.pow(h, f++)
                    }
                    l = r;
                    d.push(l)
                } else n += l
            }
            return (a || g).decode(d)
        };
        a.prototype.decompress = function(b, a) {
            for (var c = [], n = 0; n < b.length; n++) c.push(b.charCodeAt(n));
            return (a || g).decode(c)
        }
    })();
    (function() {
        function a() {}

        function c(b, a) {
            for (var l = h.length, c = 0; c < l; c++)
                if (b === h[c][0]) return h[c][1];
            h[h.length] = [b, a];
            return !1
        }

        function b(a, p, l, r, d) {
            var e = !1,
                g = !1,
                k = !1,
                m = !1,
                q = !1,
                q = !1;
            p && (e = (q = !!p.all) || p.nodes, m = q || p.win, g = q, k = p.noFunctions && !q, void 0 !== p.noOwn && (g = !!p.noOwn), void 0 !== p.noFunctions && (k = !!p.noFunctions), void 0 !== p.win && (m = !!p.win), void 0 !== p.nodes && (e = !!p.nodes), q = !!p.copyReference);
            if (void 0 === l || l) {
                void 0 !== l && l--;
                if (!(a && a instanceof Object)) return a;
                if (!e) {
                    try {
                        if (a instanceof Node) return a
                    } catch (A) {
                        if (a instanceof ActiveXObject && void 0 !== a.nodeType) return a
                    }
                    if (a === document) return a
                }
                if (!m && a === f) return a;
                e = a instanceof Array ? [] : {};
                a instanceof Date && (e = new Date(a));
                !k && a instanceof Function && (k = String(a).replace(/\s+/g, ""), e = k.indexOf("{[nativecode]}") + 14 === k.length ? function() {
                    return a.apply(d || this, arguments)
                } : function() {
                    return a.apply(this, arguments)
                });
                void 0 === r && (h = [], r = 0);
                if (k = c(a, e)) return k;
                if (e instanceof Array)
                    for (k = 0; k < a.length; k++) e[e.length] = a[k] === a[k] ? b(a[k],
                        p, l, r + 1, a) : a[k];
                else {
                    var k = 0,
                        u;
                    for (u in a) {
                        if (g || a.hasOwnProperty(u)) e[u] = a[u] === a[u] ? b(a[u], p, l, r + 1, a) : a[u];
                        k++
                    }
                }
                p.proto && (e.prototype = b(a.prototype, p, l, r + 1, a));
                q && (e.___copy_ref = a);
                return e
            }
        }

        function e(b, a, l, c, d, k, h) {
            l = l || {};
            void 0 === l.hasOwn && (l.hasOwn = !0);
            if (!l.objectsOnly || b instanceof Object)
                if (void 0 === l.maxDeep || l.maxDeep) {
                    void 0 !== l.maxDeep && l.maxDeep--;
                    if (!l || !l.nodes) try {
                        if (b instanceof Node) return
                    } catch (m) {
                        if (b instanceof ActiveXObject && void 0 !== b.nodeType) return
                    }
                    if (b !== f) {
                        void 0 === c &&
                            (g = [], c = 0);
                        var q;
                        a: {
                            for (q = 0; q < c && q < g.length; q++)
                                if (b === g[q]) {
                                    q = !0;
                                    break a
                                }
                            q = !1
                        }
                        if (!(q || (g[c] = b, d = d || b, d && k && d[k] !== d[k] || a(b, d, k, h)))) {
                            k = 0;
                            q = "";
                            for (var w in b) {
                                if (!l.hasOwn || b.hasOwnProperty(w)) try {
                                    var A = b[w];
                                    l.track && (q = h ? h + "." + w : w);
                                    e(A, a, l, c + 1, d, w, q)
                                } catch (u) {}
                                k++
                            }
                        }
                    }
                }
        }
        var d = taginspector.Define,
            f = d.global();
        d.clazz("taginspector.datapulse.Utils", a);
        a.global = d.global;
        a.namespace = d.namespace;
        a.clazz = d.clazz;
        a.getObjectUsingPath = function(b, a) {
            a = a || f;
            for (var l = b.split("."), c = 0; c < l.length; c++) a && l[c] &&
                (a = a[l[c]]);
            return a
        };
        a.variableExists = function(b) {
            return void 0 !== b && null !== b && "" !== b
        };
        a.ANON_VARS = [];
        a.getAnonymousAcessor = function(b) {
            var c = a.indexInArray(b, a.ANON_VARS); - 1 === c && (c = a.addToArrayIfNotExist(a.ANON_VARS, b));
            return "taginspector.datapulse.Utils.ANON_VARS[" + c + "]"
        };
        a.replaceAll = function(b, a, l) {
            return b.replace(new RegExp(a.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), "g"), l)
        };
        a.isInt = function(b) {
            if (isNaN(b)) return !1;
            b = parseFloat(b);
            return (b | 0) === b
        };
        a.secureText = function(b) {
            "string" !==
            typeof b && (b += "");
            b = b.replace(/</g, "&lt;");
            return b = b.replace(/>/g, "&gt;")
        };
        a.getUrl = function() {
            return document.location.href
        };
        a.getQueryParam = function(b) {
            var c, l, d, e;
            c = a.getUrl();
            if (0 < c.indexOf("?"))
                for (e = c.substring(c.indexOf("?") + 1).split("&"), c = 0, l = e.length; c < l; c += 1)
                    if (d = e[c], 0 < d.indexOf("=") && (d = d.split("="), 2 === d.length && d[0] === b)) return d[1];
            return null
        };
        a.getElementValue = function(b) {
            return (b = document.getElementById(b)) ? b.textContent || b.innerText : null
        };
        var h = [];
        a.objectCopy = function(a, c) {
            c =
                c || {};
            var l = b(a, c, c.maxDeep);
            h = [];
            return l
        };
        var g = [];
        a.traverse = function(b, a, c) {
            e(b, a, c)
        };
        a.prepareQuotedString = function(b) {
            return "string" === typeof b ? '"' + b.replace(/\"/g, '\\"') + '"' : b
        };
        a.expressionToFunction = function(b, c) {
            return a.gevalAndReturn("function (" + (c || "") + ") {" + b + "}").result
        };
        a.defineClass = function(b, c, l) {
            var d = b.split("."),
                d = a.gevalAndReturn("(function " + d[d.length - 1] + "() {  if (" + b + "._CONSTRUCTOR) {    return " + b + "._CONSTRUCTOR.apply(this, arguments);  } else {    if (" + b + ".superclass) {      return " +
                    b + ".superclass.apply(this, arguments);    }  }})").result;
            d._CONSTRUCTOR = l.CONSTRUCTOR;
            d.superclass = c;
            a.clazz(b, d, c);
            for (var e in l) l.hasOwnProperty(e) && "CONSTRUCTOR" !== e && (d.prototype[e] = l[e]);
            return d
        };
        a.keys = function(b) {
            if (b instanceof Object) {
                if (Object.keys) return Object.keys(b);
                var a = [],
                    c;
                for (c in b) b.hasOwnProperty(c) && (a[a.length] = c);
                return a
            }
            throw "keys() called on non-object!";
        };
        a.getSrcElement = function(b) {
            var a;
            b = b || window.event;
            b.srcElement ? a = b.srcElement : b.target && (a = b.target);
            return a
        };
        a.addToArrayIfNotExist = function(b, a) {
            for (var c = 0, d = !1; c < b.length; c += 1)
                if (b[c] === a) {
                    d = !0;
                    break
                }
            d || (b[b.length] = a, c = -1);
            return c
        };
        a.indexInArray = function(b, a) {
            for (var c = 0, d = !1; c < b.length; c++)
                if (b[c] === a) {
                    d = !0;
                    break
                }
            return d ? c : -1
        };
        a.removeFromArray = function(b, a) {
            for (var c = 0; c < b.length; c += 1) b[c] === a && b.splice(c, 1)
        };
        a.addClass = function(b, c) {
            var d;
            try {
                b.classList.add(c)
            } catch (e) {
                null === b.className ? b.className = c : (d = b.className.split(" "), a.addToArrayIfNotExist(d, c), b.className = d.join(" "))
            }
        };
        a.removeClass =
            function(b, c) {
                var d;
                try {
                    b.classList.remove(c)
                } catch (e) {
                    null === b.className ? b.className = "" : (d = b.className.split(" "), a.removeFromArray(d, c), b.className = d.join(" "))
                }
            };
        a.gevalAndReturn = function(b) {
            a.gevalAndReturn.___var_test___ = void 0;
            a.gevalAndReturn.___var_test___error = void 0;
            a.geval("try{taginspector.datapulse.Utils.gevalAndReturn.___var_test___=(" + b + ");}catch(ex){taginspector.datapulse.Utils.gevalAndReturn.___var_test___error = ex;}");
            return {
                result: a.gevalAndReturn.___var_test___,
                error: a.gevalAndReturn.___var_test___error
            }
        };
        a.trim = function(b) {
            try {
                return String(b).trim()
            } catch (a) {
                return String(b).replace(/^\s+|\s+$/g, "")
            }
        };
        a.setIfUnset = function(b, a) {
            if (b && a)
                for (var c in a) a.hasOwnProperty(c) && !b.hasOwnProperty(c) && (b[c] = a[c])
        };
        a.geval = function(b) {
            window && window.execScript ? window.execScript(b) : f.eval.call(f, b)
        };
        var m = [],
            k = !1;
        a.bodyReady = function(b) {
            if (k) return b && b(), !0;
            if (k = !(!document.body || "complete" !== document.readyState)) {
                for (var a = 0; a < m.length; a++) try {
                    m[a]()
                } catch (c) {}
                b && b()
            } else b && m.push(b);
            return k
        };
        var q = f.onload;
        f.onload = function(b) {
            a.bodyReady();
            q && q(b)
        }
    })();
    (function() {
        function a(b) {
            this.config = {
                order: 0,
                include: !0,
                name: "Filter-" + c++,
                uniqueId: "Filter-" + c++,
                script: void 0,
                session: void 0
            };
            this.session = null;
            if (b) {
                for (var a in b) b.hasOwnProperty(a) && (this.config[a] = b[a]);
                b.session && this.setSession(b.session)
            }
            this.uniqueId = this.config.uniqueId
        }
        var c = 0;
        taginspector.datapulse.Utils.clazz("taginspector.datapulse.filter.BaseFilter", a);
        a.state = {
            DISABLED: -3,
            SESSION: -2,
            PASS: -1,
            FAIL: 0
        };
        a.prototype.reset = function() {
            this.enable()
        };
        a.prototype.disable = function() {
            this.config.disabled = !0
        };
        a.prototype.enable = function() {
            this.config.disabled = !1
        };
        a.prototype.match = function() {
            return !0
        };
        a.prototype.setSession = function(b) {
            this.session = b
        };
        a.prototype.getSession = function() {
            return this.session
        };
        a.prototype.getState = function() {
            var b = a.state.PASS;
            if (this.config.disabled) return a.state.DISABLED;
            this.config.script && (b = this.config.script.call(this, b));
            isNaN(+b) && (b = a.state.FAIL);
            this.lastState = +b;
            return b
        }
    })();
    (function() {
        function a(b) {
            this.config = {};
            this.parameters = null;
            this.reportValue = !1;
            if (b) {
                this.uniqueId = b.uniqueId;
                this.reportValue = b.reportValue;
                a.ALL_VARIABLES[this.uniqueId] = this;
                for (var c in b) this.config[c] = b[c];
                void 0 !== b.value && (this.value = b.value);
                void 0 !== b.defaultValue && (this.defaultValue = b.defaultValue);
                return a.register(this)
            }
        }
        var c = taginspector.datapulse.Utils;
        c.clazz("taginspector.datapulse.pagevariable.BaseVariable", a);
        a.ALL_VARIABLES = {};
        a.pageVariables = [];
        a.clearCache = function() {
            pageVars =
                a.pageVariables;
            for (i = 0; i < pageVars.length; i++) t = pageVars[i], t.isCachedValueSet = !1
        };
        a.register = function(b) {
            return b instanceof a ? (a.pageVariables.push(b), b) : null
        };
        a.prototype.getValue = function() {
            return this.value
        };
        a.prototype.setValue = function(b) {
            this.value = b
        };
        a.prototype.getDefaultValue = function() {
            return this.defaultValue
        };
        a.prototype.setDefaultValue = function(b) {
            this.defaultValue = b
        };
        a.prototype.exists = function(b) {
            var a = c.variableExists(this.getValue());
            b && (a = a || c.variableExists(this.getDefaultValue()));
            return a
        };
        a.prototype.getRelativeValue = function(b, a) {
            var d = this.getValue();
            c.variableExists(d) || (d = a);
            var f;
            b && !c.variableExists(d) && (f = this.getDefaultValue(), c.variableExists(f) && (d = f));
            return d
        };
        a.prototype.replaceToken = function(b, a, d, f) {
            var h = this.exists();
            d = h ? this.getValue() : d;
            b = "\\$\\{" + b + "\\}";
            return f || d instanceof Array ? (f = h ? this.getValueAccessorString() : c.getAnonymousAcessor(d), a.replace(new RegExp(b, "g"), f)) : a.replace(new RegExp(b, "g"), d)
        };
        a.prototype.getAccessorString = function() {
            return "taginspector.datapulse.pagevariable.BaseVariable.ALL_VARIABLES." +
                this.uniqueId
        };
        a.prototype.getValueAccessorString = function() {
            return this.getAccessorString() + ".getValue()"
        }
    })();
    (function() {
        function a(b) {
            this.config = {
                name: "Trigger-" + c++,
                uniqueId: "Trigger-" + c++,
                triggerScript: void 0,
                rules: []
            };
            this.currentState = a.state.WAITING;
            if (b) {
                for (var e in b) b.hasOwnProperty(e) && (this.config[e] = b[e]);
                this.uniqueId = this.config.uniqueId;
                b.session && this.setSession(b.session);
                return a.register(this)
            }
        }
        var c = 0;
        taginspector.datapulse.Utils.clazz("taginspector.datapulse.trigger.BaseTrigger", a);
        a.pageTriggers = [];
        a.resetFiredTriggers = function() {
            pageTriggers = a.pageTriggers;
            for (i = 0; i < pageTriggers.length; i++) {
                t =
                    pageTriggers[i];
                t.config.triggerFired = !1;
                t.currentState = a.state.WAITING;
                for (var b = 0; b < t.config.rules.length; b++) rule = t.config.rules[b], rule.hitSent = !1
            }
        };
        a.register = function(b) {
            return b instanceof a ? (a.pageTriggers.push(b), b) : null
        };
        a.state = {
            WAITING: 0,
            FIRED: 1
        };
        a.prototype.checkRules = function() {
            for (var b = 0; b < this.config.rules.length; b++) rule = this.config.rules[b], rule.checkFiltersIfTriggersFired()
        };
        a.prototype.triggerCallback = function() {
            this.currentState = a.state.FIRED;
            this.checkRules()
        };
        a.prototype.initTrigger =
            function(b) {
                cb = this.triggerCallback;
                cb = cb.bind(this);
                triggerFired = this.config.triggerFired;
                !1 == triggerFired && this.config.triggerScript(cb, triggerFired);
                this.config.triggerFired = !0;
                b(this.config.triggerFired)
            };
        a.prototype.getState = function() {
            return this.currentState
        };
        a.prototype.addRule = function(b) {
            this.config.rules.push(b)
        };
        a.prototype.setTriggerScript = function(b) {
            this.config.triggerScript = b
        }
    })();
    (function() {
        function a(b) {
            this.config = {};
            this.uniqueId = "BR" + d++;
            this.ruleVersion = 1;
            this.triggerTiming = "";
            if (b) {
                this.uniqueId = b.uniqueId;
                this.ruleVersion = b.ruleVersion;
                this.triggerTiming = b.triggerTiming;
                this.dataCollector = b.dataCollector;
                for (var a in b) this.config[a] = b[a]
            }
            this.filters = [];
            this.session = void 0;
            this.triggers = [];
            this.hitSent = !1
        }
        var c = taginspector.datapulse.filter.BaseFilter,
            b = taginspector.datapulse.trigger.BaseTrigger,
            e = taginspector.datapulse.pagevariable.BaseVariable,
            d = 0;
        taginspector.datapulse.Utils.clazz("taginspector.datapulse.BaseRule",
            a);
        a.prototype.getFilters = function() {
            return this.filters
        };
        a.prototype.addFilter = function(b) {
            this.filters.push(b)
        };
        a.prototype.addTrigger = function(b) {
            this.triggers.push(b)
        };
        a.prototype.hasHitBeenSent = function() {
            return this.hitSent
        };
        var f = b.state.WAITING,
            h = b.state.FIRED,
            g = c.state.PASS,
            m = c.state.FAIL;
        a.prototype.getFailedFilters = function() {
            filters = this.filters;
            failedFilters = [];
            for (var b = 0; b < filters.length; b++) filter = filters[b], filter.match() || failedFilters.push(filter.uniqueId + "|" + filter.config.sourceVariable.uniqueId);
            return failedFilters
        };
        a.prototype.checkFiltersIfTriggersFired = function(b) {
            b = tiMonitor.dataCollector.timeOnPage();
            triggersRun = this.triggersState();
            if (triggersRun == h && !1 == this.hitSent)
                if (this.hitSent = !0, validationResults = this.filtersState(), validationResults == m) {
                    failedFilters = this.getFailedFilters();
                    qsPageVariables = [];
                    pageVariables = e.pageVariables;
                    for (i = 0; i < pageVariables.length; i++) try {
                        pageVariable = pageVariables[i], pageVariable instanceof e && !0 == pageVariable.reportValue && (variableId = pageVariable.uniqueId,
                            (variableValue = pageVariable.getValue()) ? 1E3 < variableValue.length && (variableValue = variableValue.substring(0, 1E3)) : variableValue = "*undefined*", combinedVariableValue = encodeURIComponent(variableId) + "=" + encodeURIComponent(variableValue), qsPageVariables.push(combinedVariableValue))
                    } catch (a) {
                        errMessage = "Error with variable " + variableId + ": " + a.message, console.log(errMessage), jeErrorObj = {
                            message: errMessage
                        }, tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror")
                    }
                    failedRuleObject = {
                        failedConditions: failedFilters.toString(),
                        pageMacros: qsPageVariables.toString(),
                        failedRule: this.uniqueId,
                        validationTime: b,
                        ruleVersion: this.ruleVersion,
                        triggerTiming: this.triggerTiming
                    };
                    this.dataCollector.queueRequest(failedRuleObject, "validationerror")
                } else passedRuleObject = {
                    passedRule: this.uniqueId,
                    ruleVersion: this.ruleVersion,
                    validationTime: b,
                    triggerTiming: this.triggerTiming
                }, this.dataCollector.queueRequest(passedRuleObject, "validationsuccess")
        };
        a.prototype.triggersState = function() {
            for (var b = h, a = 0; a < this.triggers.length; a++)
                if (trigger =
                    this.triggers[a], trigger.getState() == f) {
                    b = f;
                    break
                }
            return b
        };
        a.prototype.filtersState = function() {
            filters = this.filters;
            session = this.session;
            filters = filters.sort(function(b, a) {
                try {
                    return a.config.order - b.config.order
                } catch (c) {
                    return 0
                }
            });
            var b = g;
            if (!filters || 0 === filters.length) return b;
            for (var a, c = 0; c < filters.length; c++)
                if (a = filters[c], a.setSession(session), !1 == a.match()) {
                    b = m;
                    break
                }
            return b
        }
    })();
    (function() {
        function a(a) {
            this.config = {
                siteID: "",
                pixelHost: "",
                tagDefinitions: []
            };
            this.session = null;
            if (a)
                for (var b in a) a.hasOwnProperty(b) && (this.config[b] = a[b]);
            this.pixelHost = this.config.pixelHost;
            this.siteID = this.config.siteID;
            this.tagDefinitions = this.config.tagDefinitions;
            this.startTime = Date.now();
            this.resourceCounter = this.offsetTime = 0;
            this.pageId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(b) {
                var a = 16 * Math.random() | 0;
                return ("x" == b ? a : a & 3 | 8).toString(16)
            });
            this.pendingRequests = [];
            this.currentlySendingData = !1;
            this.identifiedRequests = {}
        }
        taginspector.datapulse.Utils.clazz("taginspector.datapulse.DataCollector", a);
        a.prototype.timeOnPage = function() {
            return performance.now() - this.offsetTime
        };
        a.prototype.adjustTimeForOffset = function(a) {
            return !1 == isNaN(a) ? (fts = parseFloat(a).toFixed(2), fts = parseFloat(a), fts -= this.offsetTime, 0 > fts && (fts = 0), fts.toString()) : a
        };
        a.prototype.getPageCurrentTime = function() {
            return Date.now()
        };
        a.prototype.getPageStartTime = function() {
            return this.startTime
        };
        a.prototype.isBeaconSupported = function() {
            return "sendBeacon" in navigator ? !0 : !1
        };
        a.prototype.getMaxBodySize = function() {
            isSendBeaconRequest = this.isBeaconSupported();
            return 5E3
        };
        a.prototype.createRequestBody = function() {
            for (var a = {
                    requestList: []
                }, b = 0, e = this.getMaxBodySize(), d = 0; 0 < this.pendingRequests.length;) {
                var f = this.pendingRequests[0];
                if (void 0 != f || null != f)
                    if (b += encodeURIComponent(f).length, b > e && 0 != d) break;
                    else a.requestList.push(this.pendingRequests.shift()), d += 1;
                else this.pendingRequests.shift()
            }
            return a
        };
        a.prototype.createPixelRequest = function(a) {
            reqPixel = new Image;
            reqPixel.src = this.pixelHost + "?" + a
        };
        a.prototype.createAjaxPostRequest = function(a) {
            XMLHttpRequest.prototype.sendAsBinary || (XMLHttpRequest.prototype.sendAsBinary = function(b) {
                for (var a = b.length, c = new Uint8Array(a), e = 0; e < a; e++) c[e] = b.charCodeAt(e) & 255;
                this.send(c)
            });
            if (window.fetch && window.Request) e = "----" + Date.now().toString(16), fetch(this.pixelHost, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "multipart/form-data; boundary=" + e
                },
                body: "--" +
                    e + '\r\nContent-Disposition: form-data; name="beaconreq"\r\n\r\n' + a + "\r\n--" + e + "--\r\n"
            });
            else {
                var b = new XMLHttpRequest;
                b.open("POST", this.pixelHost, !0);
                var e = "----" + Date.now().toString(16);
                b.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + e);
                b.setRequestHeader("Access-Control-Allow-Origin", "*");
                b.sendAsBinary("--" + e + '\r\nContent-Disposition: form-data; name="beaconreq"\r\n\r\n' + a + "\r\n--" + e + "--\r\n")
            }
        };
        a.prototype.createSendBeaconRequest = function(a) {
            var b = new FormData;
            b.append("beaconreq",
                a);
            result = navigator.sendBeacon(this.pixelHost, b);
            !1 == result && this.createAjaxPostRequest(a)
        };
        a.prototype.b64EncodeUnicode = function(a) {
            return btoa(encodeURIComponent(a).replace(/%([0-9A-F]{2})/g, function(b, a) {
                return String.fromCharCode("0x" + a)
            }))
        };
        a.prototype.identifyRequest = function(a) {
            for (var b = !1, e = 0; e < this.tagDefinitions.length; e++) {
                var d = this.tagDefinitions[e];
                if (!0 == d.regex.test(a.name)) {
                    !1 == this.identifiedRequests.hasOwnProperty(d.id) && (this.identifiedRequests[d.id] = []);
                    "384" == d.id ? (!1 == this.identifiedRequests.hasOwnProperty("291") &&
                        (this.identifiedRequests["291"] = []), this.identifiedRequests["291"].push(a)) : "291" == d.id && (!1 == this.identifiedRequests.hasOwnProperty("384") && (this.identifiedRequests["384"] = []), this.identifiedRequests["384"].push(a));
                    this.identifiedRequests[d.id].push(a);
                    b = !0;
                    break
                }
            }
            return b
        };
        a.prototype.resetIdentifiedRequests = function() {
            try {
                currentTs = performance.now();
                newIdentifiedRequests = {};
                for (var a in this.identifiedRequests)
                    if (this.identifiedRequests.hasOwnProperty(a))
                        for (z = 0; z < this.identifiedRequests[a].length; z++) foundTag =
                            this.identifiedRequests[a][z], 350 > Math.abs(currentTs - foundTag.startTime) && (!1 == newIdentifiedRequests.hasOwnProperty(a) && (newIdentifiedRequests[a] = []), newIdentifiedRequests[a].push(foundTag));
                this.identifiedRequests = newIdentifiedRequests
            } catch (b) {
                console.log(b.message)
            }
        };
        a.prototype.sendRequests = function(a) {
            if (!1 == tiMonitor.dataCollector.currentlySendingData) {
                tiMonitor.dataCollector.currentlySendingData = !0;
                for (base_req_data = "pid=" + this.pageId + "&sid=" + this.siteID + "&purl=" + encodeURIComponent(tiMonitor.sendData.currentUrl) +
                    "&pst=" + encodeURIComponent(this.getPageStartTime()) + "&pct=" + encodeURIComponent(this.getPageCurrentTime()) + "&sblf=" + encodeURIComponent(tiMonitor.sendData.sampleblackListFlag) + "&sr=" + encodeURIComponent(tiMonitor.sendData.sampleRate) + "&mts=" + encodeURIComponent(this.getPageCurrentTime()); 0 < this.pendingRequests.length;) requestBody = this.createRequestBody(), encodedRequestString = encodeURIComponent(this.b64EncodeUnicode(JSON.stringify(requestBody))), req_data = base_req_data + "&taginfo=" + encodedRequestString +
                    "&b64=1", !0 != this.isBeaconSupported() || !0 != a && !0 != tiMonitor.sendData.windowUnloadEvent ? this.createAjaxPostRequest(req_data) : this.createSendBeaconRequest(req_data);
                tiMonitor.dataCollector.currentlySendingData = !1
            }
        };
        a.prototype.isValidResourceStartTime = function(a) {
            var b = !0;
            try {
                if (a = parseFloat(a), this.timeOnPage() < a || 36E5 < a) b = !1
            } catch (e) {
                console.log(e.message)
            }
            return b
        };
        a.prototype.queueRequest = function(a, b) {
            if ("validationerror" != b && "validationsuccess" != b || !("complete" != document.readyState || 3E3 > performance.now() -
                    tiMonitor.dataCollector.offsetTime) || "DOM Load" == a.triggerTiming) {
                try {
                    if ("resource" == b)
                        if (!0 == this.isValidResourceStartTime(this.adjustTimeForOffset(a.startTime))) reqName = a.name, req = "rt=" + b + "&ce=" + encodeURIComponent(this.adjustTimeForOffset(a.connectEnd)) + "&cs=" + encodeURIComponent(this.adjustTimeForOffset(a.connectStart)) + "&dle=" + encodeURIComponent(this.adjustTimeForOffset(a.domainLookupEnd)) + "&dls=" + encodeURIComponent(this.adjustTimeForOffset(a.domainLookupStart)) + "&d=" + encodeURIComponent(a.duration.toFixed(2)) +
                            "&et=" + encodeURIComponent(a.entryType) + "&fs=" + encodeURIComponent(this.adjustTimeForOffset(a.fetchStart)) + "&it=" + encodeURIComponent(a.initiatorType) + "&n=" + encodeURIComponent(a.name) + "&rde=" + encodeURIComponent(this.adjustTimeForOffset(a.redirectEnd)) + "&rds=" + encodeURIComponent(this.adjustTimeForOffset(a.redirectStart)) + "&reqs=" + encodeURIComponent(this.adjustTimeForOffset(a.requestStart)) + "&rse=" + encodeURIComponent(this.adjustTimeForOffset(a.responseEnd)) + "&rss=" + encodeURIComponent(this.adjustTimeForOffset(a.responseStart)) +
                            "&scc=&st=" + encodeURIComponent(this.adjustTimeForOffset(a.startTime)) + "&sz=" + encodeURIComponent(this.adjustTimeForOffset(a.decodedBodySize)), this.resourceCounter += 1;
                        else return;
                    else if ("pageload" == b) {
                        dom_complete = dom_content_load = dom_interactive = page_size = "";
                        try {
                            var e = performance.timing;
                            0 != e.domInteractive && (dom_interactive = e.domInteractive - e.fetchStart);
                            0 != e.domContentLoadedEventEnd && (dom_content_load = e.domContentLoadedEventEnd - e.fetchStart);
                            0 != e.domComplete && (dom_complete = e.domComplete - e.fetchStart)
                        } catch (d) {
                            console.log(d.message)
                        }
                        conn_type =
                            conn_downlink = conn_roundtrip = conn_downlinkMax = conn_effType = "";
                        req = "rt=" + b + "&ref=&top=" + encodeURIComponent(this.timeOnPage()) + "&domint=" + encodeURIComponent(dom_interactive) + "&domcl=" + encodeURIComponent(dom_content_load) + "&domcom=" + encodeURIComponent(dom_complete) + "&condl=" + encodeURIComponent(conn_downlink) + "&conrt=" + encodeURIComponent(conn_roundtrip) + "&coneff=" + encodeURIComponent(conn_effType) + "&psz=" + +encodeURIComponent(page_size)
                    } else if ("validationerror" == b && !1 == tiMonitor.sendData.preventFiringValidationRules) req =
                        "rt=" + b + "&fr=" + encodeURIComponent(a.failedRule) + "&rv=" + encodeURIComponent(a.ruleVersion) + "&pm=" + encodeURIComponent(a.pageMacros) + "&fc=" + encodeURIComponent(a.failedConditions) + "&vt=" + encodeURIComponent(a.validationTime);
                    else if ("validationsuccess" == b && !1 == tiMonitor.sendData.preventFiringValidationRules) req = "rt=" + b + "&pr=" + encodeURIComponent(a.passedRule) + "&rv=" + encodeURIComponent(a.ruleVersion) + "&vt=" + encodeURIComponent(a.validationTime);
                    else if ("jserror" == b) req = "rt=" + b + "&msg=" + a.message;
                    else if ("pageBeforeUnload" ==
                        b) {
                        e = performance.timing;
                        dom_interactive = e.domInteractive - e.fetchStart;
                        dom_content_load = e.domContentLoadedEventEnd - e.fetchStart;
                        dom_complete = e.domComplete - e.fetchStart;
                        dom_content_load_end = e.domContentLoadedEventEnd;
                        response_end = e.responseEnd;
                        navigation_start = e.navigationStart;
                        firstContentfulPaint = first_paint = timeToFirstPaint = void 0;
                        if (window.performance) {
                            var f = window.performance.getEntriesByType("paint");
                            void 0 != f && 0 < f.length && (timeToFirstPaint = parseInt(1E3 * f[0].startTime), first_paint = navigation_start +
                                timeToFirstPaint, firstContentfulPaint = parseInt(1E3 * f[1].startTime))
                        }
                        req = "rt=" + b + "&ref=&top=" + encodeURIComponent(performance.now()) + "&domint=" + encodeURIComponent(dom_interactive) + "&domcl=" + encodeURIComponent(dom_content_load) + "&domcom=" + encodeURIComponent(dom_complete) + "&domcle=" + encodeURIComponent(dom_content_load_end) + "&rse=" + encodeURIComponent(response_end) + "&navs=" + encodeURIComponent(navigation_start) + "&fpt=" + encodeURIComponent(first_paint) + "&tfpt=" + encodeURIComponent(timeToFirstPaint) + "&fcpt=" +
                            encodeURIComponent(firstContentfulPaint)
                    }
                } catch (h) {
                    console.log(h.message), jeErrorObj = {
                        message: h.message
                    }, tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror")
                }
                "pageload" == b ? (this.pendingRequests.push(req), this.sendRequests(!0)) : 0 < this.resourceCounter && (this.pendingRequests.push(req), "validationerror" != b && "validationsuccess" != b || this.sendRequests(!0))
            }
        }
    })();
    (function() {
        function a(b) {
            for (var a = [], c = 0; c < b.length; c++) {
                var e = d(b[c][0]);
                a.push([new RegExp(e, "g"), "*" + b[c][1]])
            }
            return a
        }

        function c(b, a) {
            for (var c = 0; c < a.length; c++)
                if (a[c][1] === b) return a[c][0];
            return null
        }

        function b(b) {
            this._regexDefs = k;
            this._defs = m;
            b && b.definitions && (this._regexDefs = a(b.definitions), this._defs = b.definitions)
        }

        function e(b, a) {
            for (var c = [], d = 0; d < b.length; d++) {
                var e = !0;
                a && (e = b.charCodeAt(d) <= a);
                var f = g.cookieAlphabetMap.hasOwnProperty(b.charAt(d));
                e && !f ? c.push("*" + b.charCodeAt(d) +
                    ".") : c.push(b.charAt(d))
            }
            return c.join("")
        }

        function d(b) {
            return b.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
        }

        function f(b) {
            for (var a = {}, c = "", d = 0; d < b.length; d++) {
                var e = b.charAt(d);
                switch (e) {
                    case "=":
                    case "&":
                    case "?":
                    case "/":
                    case "*":
                    case ",":
                    case ":":
                        isNaN(a[c]) && (a[c] = b.split(c).length - 1);
                        c = "";
                        break;
                    default:
                        c += e
                }
            }
            b = [];
            for (var f in a) a.hasOwnProperty(f) && (c = a[f], c >= n && f.length >= q && b.push([f, c]));
            return b = b.sort(function(b, a) {
                return b[0].length === a[0].length ? 0 : a[0].length > b[0].length ? 1 : -1
            })
        }
        var h =
            taginspector.Define,
            g = taginspector.Cookie,
            m = [
                ['","referrer":[{"url":"http://', "1-"],
                ['","referrer":[{"url":"https://', "2-"],
                [',"referrer":[{"url":"http://', "3-"],
                [',"referrer":[{"url":"https://', "4-"],
                [',"sessionStartTime":', "5-"],
                ['":{}}', "6-"],
                ["www.google.com", "7-"],
                ["www.google.co.uk", "8-"],
                ["www.google.", "9-"],
                ['"landing":"', "Z"],
                ['"landing":', "L"],
                ['"time":', "A"],
                ['"sessionStartTime":', "S"],
                ['"pageViews":', "P"],
                ['"sessionCount":', "B"],
                ['"sessionLandingPage":', "E"],
                ['"referrer":', "R"],
                ['"url":"http://www.',
                    "J"
                ],
                ['"url":"https://www.', "M"],
                ['"url":"', "I"],
                ['"url":', "U"],
                ["http://www.", "W"],
                ["https://www.", "V"],
                ["%2Fen%2Ftsuk%2F", "K"],
                ["http%3A%2F%2Fwww", "F"],
                ["http%3A%2F%2F", "D"],
                ["http://", "H"],
                ["https://", "X"],
                ['""', "O"],
                ['",', "Y"]
            ],
            k = a(m);
        h.clazz("taginspector.datapulse.compression.Encoder", b);
        b.prototype.encode = function(b, a) {
            for (var c = b.replace(/\*/g, "**"), g = 0; g < this._regexDefs.length; g++) var h = this._regexDefs[g],
                c = c.replace(h[0], h[1]);
            for (var c = c.replace(/;/g, "*-"), c = c.replace(/&/g, "*."), c = c.replace(/\\/g,
                    "*/"), c = c.replace(/=/g, "*+"), c = c.replace(/\n/g, "*N"), c = c.replace(/ /g, "*_"), c = c.replace(/\t/g, "*T"), c = c.replace(/,/g, "*C"), c = c.replace(/"/g, "*Q"), g = f(c), h = c.replace(/\$/g, "$$$"), k = [], m = 0, n = 0; m < g.length; m++) {
                var q = new RegExp(d(g[m][0]), "g"),
                    q = h.replace(q, "$" + n + "-");
                q !== h && (k.push(g[m][0]), n++, h = q)
            }
            g = [h, k];
            h = g[1];
            (k = 0 < h.length) && (c = g[0]);
            c = a ? e(c, a) : e(c);
            return k ? "Y" + h.join("*") + "?" + c : "N" + c
        };
        var q = 4,
            n = 2;
        b.prototype.decode = function(b) {
            var a = null;
            if ("N" === b.charAt(0)) b = b.substring(1);
            else if ("Y" === b.charAt(0)) {
                var d =
                    b.indexOf("?");
                if (0 <= d && (a = b.substring(1, d), a = a.split("*"), b = b.substring(d + 1), a && 0 !== a.length && b)) {
                    for (var d = "", e = !1, f = !1, g = "", h = 0; h < b.length; h++) {
                        var k = b.charAt(h);
                        "$" === k || e || f ? e || f ? (e = !1, "$" === k ? d += "$" : isNaN(+("-" + k)) ? f ? (d = a && "-" === k && a[+g] ? d + a[+g] : d + ("$" + g + k), g = "", f = !1) : d += "$" + k : (f = !0, g += k)) : e = !0 : d += k
                    }
                    g && (d += "$" + g);
                    e && (d += "$");
                    b = d
                }
            }
            a = "";
            e = d = !1;
            f = "";
            for (g = 0; g < b.length; g++) h = b.charAt(g), "*" === h || d || e ? d || e ? (d = !1, isNaN(+("-" + h)) ? e ? (a = "." === h ? a + String.fromCharCode(+f) : "-" === h && c(f + "-", this._defs) ?
                a + c(f + "-", this._defs) : a + ("*" + f + h), f = "", e = !1) : "*" === h ? a += "*" : "-" === h ? a += ";" : "/" === h ? a += "\\" : "." === h ? a += "&" : "+" === h ? a += "=" : "N" === h ? a += "\n" : "_" === h ? a += " " : "T" === h ? a += "\t" : "C" === h ? a += "," : "Q" === h ? a += '"' : null !== c(h, this._defs) ? (h = c(h, this._defs), a += h) : a += "*" + h : (f += h, e = !0)) : d = !0 : a += h;
            f && (a += "*" + f);
            d && (a += "*");
            return a
        }
    })();
    (function() {
        function a(a) {
            this.testBinary = !1;
            this.binSupported = e;
            a && (this.compressor = new taginspector.compression.Compressor, this.encoder = new taginspector.datapulse.compression.Encoder({}), void 0 !== a.binSupported && (this.binSupported = !!a.binSupported))
        }
        var c = taginspector.Define,
            b = taginspector.Cookie;
        c.global();
        var e = !1;
        c.clazz("taginspector.datapulse.compression.CookieCompressor", a);
        a.prototype.compress = function(a, c) {
            if ("string" !== typeof a || "" === a) return a;
            var e = this.encoder.encode(a),
                g;
            if (this.binSupported ||
                this.testBinary) {
                g = this.compressor.compress(e);
                g = '"B' + this.encoder.encode(g, 128) + '"';
                b.set("__qtag_test_bin__", g);
                var m = b.get("__qtag_test_bin__");
                b.rm("__qtag_test_bin__");
                m && m !== g && (g = null)
            }
            m = this.encoder.encode(this.compressor.compressAnsi(e));
            e = !c && e.length <= m.length ? '"E' + e + '"' : '"C' + m + '"';
            return g && g.length < e.length ? g : e
        };
        a.prototype.decompress = function(a) {
            if ("string" !== typeof a || "" === a) return a;
            '"' === a.charAt(0) && (a = a.substring(1, a.length - 1));
            var b = a.charAt(0);
            a = a.substring(1);
            switch (b) {
                case "E":
                    return this.encoder.decode(a);
                case "C":
                    return a = this.compressor.decompressAnsi(this.encoder.decode(a)), this.encoder.decode(a);
                case "B":
                    return a = this.compressor.decompress(this.encoder.decode(a)), this.encoder.decode(a);
                default:
                    throw "This code is not supported! Code: " + b;
            }
        }
    })();
    (function() {
        var a = taginspector.Cookie,
            c = taginspector.datapulse.Utils,
            b = function() {};
        c.clazz("taginspector.datapulse.Session", b);
        var e = new taginspector.datapulse.compression.CookieCompressor({});
        b.readCompressedCookie = function(b) {
            b = a.get(b);
            return e.decompress(b)
        };
        b.setupSession = function(d) {
            var f, h, g, m, k;
            f = {};
            k = "tm_" + d.containerId;
            var q = "x_tm_" + d.containerId;
            g = a.get(k, !0);
            var n = !!g;
            null === g && (g = a.get(q), g = e.decompress(g));
            if (g) try {
                g = JSON.parse(g)
            } catch (p) {
                g = {
                    sc: 0,
                    sessionCount: 0,
                    pageViews: 0,
                    sessionStartTime: 0,
                    referrer: [],
                    sessionLandingPage: "",
                    __v: {}
                }
            } else g = {
                sc: 0,
                sessionCount: 0,
                pageViews: 0,
                sessionStartTime: 0,
                referrer: [],
                sessionLandingPage: "",
                __v: {}
            };
            h = (new Date).getTime();
            f.sessionCount !== parseInt(g.sc, 10) ? (g.sessionStartTime = h, g.sc = f.sessionCount, g.sessionCount += 1, g.referrer.push({
                url: b.getReferrer(),
                landing: c.getUrl().substring(0, 300),
                time: h
            }), g.sessionLandingPage = c.getUrl().substring(0, 300)) : b.isReferrerDifferent() && !b.referrerIsSameAsPrevious(g.referrer, h, 18E5) && (g.referrer.push({
                url: b.getReferrer(),
                landing: c.getUrl().substring(0, 300),
                time: h
            }), g.sessionLandingPage = c.getUrl().substring(0, 300), g.sessionStartTime = h, g.sessionCount += 1);
            f.sessionCount = g.sessionCount;
            f.sessionStartTime = g.sessionStartTime;
            f.pageStartTime = h;
            g.pageViews += 1;
            f.pageViews = g.pageViews;
            f.sessionLandingPage = g.sessionLandingPage;
            f.referrer = g.referrer;
            5 < f.referrer.length && f.referrer.splice(2, f.referrer.length - 5);
            m = JSON.stringify(g);
            for (h = 0; e.compress(m).length > d.maxCookieLength && 5 > h;) 3 <= g.referrer.length ? g.referrer.splice(2, 1) :
                2 === g.referrer.length ? g.referrer = [g.referrer[0]] : 1 === g.referrer.length && (g.referrer = []), m = JSON.stringify(g), h += 1;
            f.referrer = g.referrer;
            n && a.rm(k);
            k = e.compress(m);
            a.rm(q);
            a.set(q, k, 365, d.cookieDomain);
            f.setVariable = function(b, c, f) {
                g.__v[b] = [c, f ? f : 0];
                b = e.compress(JSON.stringify(g));
                a.set(q, b, 365, d.cookieDomain)
            };
            f.getCookie = function(b, c) {
                var d = a.get(b);
                if (d && (c || 0 === b.indexOf("x_"))) try {
                    d = e.decompress(d)
                } catch (f) {} else d = a.decode(d);
                return d
            };
            f.getVariable = function(a) {
                var b;
                if (a = g.__v[a])
                    if (b = a[1],
                        0 === b || b > (new Date).getTime()) return a[0];
                return null
            };
            f.on = function(a, b, c) {
                b.attachEvent ? b.attachEvent("on" + a, c) : b.addEventListener && b.addEventListener(a, c, !1)
            };
            f.getTagCookie = function() {
                return b.readCompressedCookie(q)
            };
            return b.lastSession = f
        };
        b.referrerIsSameAsPrevious = function(a, e, h) {
            var g, m;
            return 0 < a.length ? (g = b.getReferrer(), m = c.getUrl().substring(0, 300), a = a[a.length - 1], a.url === g && a.landing === m && a.time + h > e) : !1
        };
        b.isReferrerDifferent = function() {
            var a, c;
            c = b.getReferrer();
            a = c.indexOf("://");
            if (-1 ===
                a) return !0;
            try {
                return 0 !== c.substring(a + 3).indexOf(b.getDomain()) ? !0 : !1
            } catch (e) {
                return !0
            }
        };
        b.getReferrer = function() {
            return document.referrer ? document.referrer.substring(0, 300) : "direct"
        };
        b.getDomain = function() {
            return document.location.host
        }
    })();
    (function() {
        taginspector.datapulse.Utils.namespace("taginspector.datapulse.filter.pattern.PatternType", {
            CONTAINS: "Contains",
            MATCHES_EXACTLY: "Matches Exactly",
            STARTS_WITH: "Starts With",
            ENDS_WITH: "Ends With",
            REGULAR_EXPRESSION: "Regular Expression",
            ALL_URLS: "All URLs",
            EQUALS: "Equals",
            DOES_NOT_EQUAL: "Does not Equal",
            DOES_NOT_CONTAIN: "Does not Contain",
            DOES_NOT_STARTS_WITH: "Does not Start With",
            DOES_NOT_END_WITH: "Does not End With",
            MATCHES_REGEX: "Matches Regex",
            DOES_NOT_MATCH_REGEX: "Does not Match Regex",
            LESS_THAN: "Less Than",
            GREATER_THAN: "Greater Than"
        })
    })();
    (function() {
        function a(c) {
            this._lockObject = {};
            var d = {
                comparisonType: b.CONTAINS,
                sourceVariable: void 0,
                comparisonVariable: void 0
            };
            if (c)
                for (var f in c) c.hasOwnProperty(f) && (d[f] = c[f]);
            a.superclass.call(this, d)
        }
        var c = taginspector.datapulse.Utils,
            b = taginspector.datapulse.filter.pattern.PatternType;
        c.clazz("taginspector.datapulse.filter.JsExpressionFilter", a, taginspector.datapulse.filter.BaseFilter);
        a.prototype.match = function() {
            var a = !0,
                d = this.config.sourceVariable.getValue();
            if ("object" == typeof this.config.comparisonVariable) var f =
                this.config.comparisonVariable.getValue();
            else if ("string" == typeof this.config.comparisonVariable || "number" == typeof this.config.comparisonVariable) f = this.config.comparisonVariable;
            else return !1;
            switch (this.config.comparisonType) {
                case b.LESS_THAN:
                case b.GREATER_THAN:
                    if (!1 == c.isInt(f)) return !1;
                    f = parseInt(f)
            }
            switch (this.config.comparisonType) {
                case b.DOES_NOT_CONTAIN:
                case b.CONTAINS:
                    a = 0 <= d.toLowerCase().indexOf(f.toLowerCase());
                    break;
                case b.EQUALS:
                case b.DOES_NOT_EQUAL:
                case b.MATCHES_EXACTLY:
                    a = d.toLowerCase() ===
                        f.toLowerCase();
                    break;
                case b.STARTS_WITH:
                case b.DOES_NOT_STARTS_WITH:
                    a = 0 === d.toLowerCase().indexOf(f.toLowerCase());
                    break;
                case b.ENDS_WITH:
                case b.DOES_NOT_END_WITH:
                    a = d.toLowerCase().substr(-f.length) === f.toLowerCase();
                    break;
                case b.MATCHES_REGEX:
                case b.REGULAR_EXPRESSION:
                case b.DOES_NOT_MATCH_REGEX:
                    a = (new RegExp(f, "i")).test(d);
                    break;
                case b.LESS_THAN:
                    a = d < f;
                    break;
                case b.GREATER_THAN:
                    a = d > f;
                    break;
                case b.ALL_variableValueS:
                    a = !0
            }
            switch (this.config.comparisonType) {
                case b.DOES_NOT_EQUAL:
                case b.DOES_NOT_CONTAIN:
                case b.DOES_NOT_STARTS_WITH:
                case b.DOES_NOT_END_WITH:
                case b.DOES_NOT_MATCH_REGEX:
                    a = !a
            }
            return a
        }
    })();
    (function() {
        function a(b) {
            this._lockObject = {};
            var e = {
                uniqueId: "Macro-" + c++
            };
            if (b)
                for (var d in b) e[d] = b[d];
            this.reportValue = !1;
            b && (this.uniqueId = b.uniqueId, this.reportValue = b.reportValue);
            this.valueSetTimestamp = 0;
            this.isCachedValueSet = !1;
            this.cachedValue = "";
            a.superclass.call(this, e)
        }
        var c = 0;
        taginspector.datapulse.Utils.clazz("taginspector.datapulse.pagevariable.JsExpression", a, taginspector.datapulse.pagevariable.BaseVariable);
        a.prototype.getValue = function() {
            return !0 == this.isCachedValueSet && 3 >= performance.now() -
                this.valueSetTimestamp ? this.cachedValue : this.value(!0) ? (this.isCachedValueSet = !0, this.valueSetTimestamp = performance.now(), this.cachedValue = this.value(!0).toString()) : ""
        }
    })();


    //version: v2.0
    tiMonitor.dataCollector = new taginspector.datapulse.DataCollector({
        siteID: "80e504dcf3d011e88d1212d7e8427f3e",
        pixelHost: "https://collect.analyze.ly",
        tagDefinitions: []
    });
    tiMonitor.sendData = {
        pageId: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }),
        sentUnload: false,
        currentlyIterating: false,
        pageBeingSampled: true,
        externalTagStartTimes: [],
        internalTagStartTimes: [],
        currentUrl: window.location.href,
        minimumBeforeUnloadRestriction: 5,
        pageTitle: '',
        sampleRate: 80000000,
        sampleBlackList: new RegExp('.*'),
        sampleBlackListEnabled: false,
        sampleblackListFlag: false,
        createFakeReq: function(reqUrl) {
            fakeHit = {
                connectEnd: 0,
                connectStart: 0,
                decodedBodySize: 0,
                domainLookupEnd: 0,
                domainLookupStart: 0,
                duration: 0,
                entryType: "resource",
                fetchStart: 0,
                initiatorType: "script",
                name: "",
                redirectEnd: 0,
                redirectStart: 0,
                requestStart: 0,
                responseEnd: 0,
                responseStart: 0,
                startTime: 0
            };
            fetchStart = performance.now()
            fakeDuration = 10.47999999905005;

            fakeHit.fetchStart = fetchStart;
            fakeHit.startTime = fetchStart;
            fakeHit.duration = fakeDuration;
            fakeHit.responseEnd = fetchStart + fakeDuration;
            fakeHit.name = reqUrl + "&post=1";
            tiMonitor.dataCollector.identifyRequest(fakeHit);
            tiMonitor.dataCollector.queueRequest(fakeHit, "resource");

        },
        isSinglePageApp: function() {
            if (window.angular) {
                return true;
            } else {
                return false;
            }
        },
        isPerformanceObserverSupported: function() {
            if (window.PerformanceObserver) {
                return true;
            } else {
                return false;
            }
        },
        isInIframe: function() {
            try {
                return window.self !== window.top;
            } catch (e) {
                return true;
            }
        },
        isPerformanceObserverInitialized: false,
        performanceObserverCallback: function(list) {
            if (tiMonitor.sendData.pageBeingSampled == false) {
                var perfEntries = list.getEntries();
                for (var i = 0; i < perfEntries.length; i++) {
                    var req = perfEntries[i];
                    if (tiMonitor.sendData.isValidRequest(req) == true) {
                        tiMonitor.sendData.externalTagStartTimes.push(tiMonitor.sendData.getUniqueReqKey(req));
                        tiMonitor.dataCollector.queueRequest(req, "resource");
                    } else {
                        tiMonitor.sendData.internalTagStartTimes.push(tiMonitor.sendData.getUniqueReqKey(req));
                    }
                }

                tiMonitor.sendData.isPerformanceObserverInitialized = true;
            }
        },
        suportedBrowser: function() {
            var isSupported = true;
            ua = navigator.userAgent;
            var isNativeAndroid = ((ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('Android ') > -1 && ua.indexOf('AppleWebKit') > -1) && (ua.indexOf('Version') > -1));
            var isIE = ((ua.indexOf('Trident') > -1) || (ua.indexOf('MSIE') > -1));
            var perfMonSupport = false;
            var isEventSupported = false;
            if (typeof Event == "function") {
                isEventSupported = true;
            }
            if ('performance' in window) {
                if ('getEntries' in performance) {
                    perfMonSupport = true;
                }
            }
            if (isNativeAndroid == true || perfMonSupport == false || isIE == true || isEventSupported == false) {
                isSupported = false;
            }
            return isSupported;
        },
        blackList: new RegExp('http(s)?:\/\/(col\.eum-appdynamics\.com|((.*)\.|)mouseflow.com|akstat.io)'),
        lastPerformanceObjLength: 0,
        areTriggersActivated: false,
        isDuplicateRequest: function(req) {
            lt = tiMonitor.sendData.getUniqueReqKey(req);
            return !(tiMonitor.sendData.externalTagStartTimes.indexOf(lt) == -1 && tiMonitor.sendData.internalTagStartTimes.indexOf(lt) == -1);
        },
        isBlacklistedRequest: function(req) {
            return this.blackList.test(req.name) == true;
        },
        isExternalRequest: function(req) {
            externalReq = true;
            windowOrigin = window.location.protocol + '//' + window.location.hostname;
            if (req.name.length >= windowOrigin.length) {
                truncReqName = (req.name).substr(0, windowOrigin.length);
                externalReq = (truncReqName).indexOf(windowOrigin) == -1;
            }
            return externalReq;
        },
        isTIRequest: function(req) {
            return !((req.name).indexOf(tiMonitor.dataCollector.pixelHost) == -1);
        },
        isValidRequest: function(req) {
            var validReq = false;
            var identifiedTag = tiMonitor.dataCollector.identifyRequest(req);
            if (this.isTIRequest(req) == false && (this.isExternalRequest(req) == true || identifiedTag == true) && this.isBlacklistedRequest(req) == false) {
                validReq = true;
            }
            return validReq;
        },
        getUniqueReqKey: function(req) {
            return (req.startTime).toString() + "-" + (req.responseEnd).toString();
        },
        isBufferFull: function() {
            bufferFull = false;
            if (window.performance.getEntriesByType("resource").length == 150 || window.performance.getEntriesByType("resource").length == 250 || window.performance.getEntriesByType("resource").length == 400) {
                bufferFull = true;
            }
            return bufferFull;
        },
        iteratePerformance: function() {
            if (this.currentlyIterating == false) {
                this.currentlyIterating = true;

                var pe = performance.getEntriesByType("resource");
                if (this.lastPerformanceObjLength != pe.length) {
                    this.lastPerformanceObjLength = pe.length;
                    for (var i = 0; i < pe.length; i++) {
                        var req = pe[i];
                        if (this.isDuplicateRequest(req) == false) {
                            if (tiMonitor.sendData.isValidRequest(req) == true) {
                                tiMonitor.sendData.externalTagStartTimes.push(tiMonitor.sendData.getUniqueReqKey(req));
                                tiMonitor.dataCollector.queueRequest(req, "resource");
                            } else {
                                tiMonitor.sendData.internalTagStartTimes.push(tiMonitor.sendData.getUniqueReqKey(req));
                            }
                        }
                    }
                }
                if (this.areTriggersActivated == false) {
                    this.areTriggersActivated = true;
                    tiMonitor.validationRules(true);
                }
                this.currentlyIterating = false;
            }
        },
        domLoadCompleteEvent: (document.readyState == 'complete'),
        windowUnloadEvent: false,
        preventFiringValidationRules: false,
        pageVariableFiredEvents: {},
        fire: function() {
            tiMonitor.dataCollector.sendRequests(false);
        },
        clearBuffer: function() {
            if (window.performance.clearResourceTimings) {
                startBufferLength = window.performance.getEntriesByType("resource").length;
                tiMonitor.sendData.iteratePerformance();
                window.performance.clearResourceTimings();
                endBufferLength = window.performance.getEntriesByType("resource").length;

                if (startBufferLength == endBufferLength) {
                    this.preventFiringValidationRules = true;
                }
            }
        },
        handleUnload: function() {
            tiMonitor.windowUnloadEvent = true;
            if (tiMonitor.sendData.isPerformanceObserverSupported() == false) {
                tiMonitor.sendData.iteratePerformance();
            }
            tiMonitor.sendData.fire();
        },
        fullBufferEventListener: function() {
            if ("clearResourceTimings" in window.performance) {
                if ("addEventListener" in window.performance) {
                    window.performance.addEventListener("resourcetimingbufferfull", function() {
                        tiMonitor.sendData.clearBuffer();
                    });
                } else {
                    if ("onresourcetimingbufferfull" in window.performance) {
                        window.performance.onresourcetimingbufferfull = function(event) {
                            tiMonitor.sendData.clearBuffer();
                        };
                    }
                }
            }
        },
        initialized: false
    };

    tiMonitor.ruleVariableCache = {
        spaRulesFiring: false,
        _cachedVariableValues: {},
        censor: function(n) {
            var o = 0;
            return function(r, t) {
                if (0 !== o && "object" == typeof n && "object" == typeof t && n == t) {
                    return "[Circular]"
                } else if (o >= 500) {
                    return "[Unknown]"
                } else {
                    return (++o, t)
                }
            }
        },
        updateCache: function(maxCacheTime) {
            globalVars = tiMonitor.getGlobalJsVars();
            for (var p = 0; p < globalVars.length; p++) {
                this.getVariableValue(globalVars[p], maxCacheTime)
            }
        },
        getVariableValue: function(variableName, maxCacheTime) {
            retVal = '';
            if (this._cachedVariableValues.hasOwnProperty(variableName)) {
                if (this._cachedVariableValues[variableName]["cacheTime"] > performance.now() || this.spaRulesFiring == true) {
                    this._cachedVariableValues[variableName]["cacheTime"] = this._cachedVariableValues[variableName]["cacheTime"] + 30;
                    return this._cachedVariableValues[variableName]["val"];
                }
            }
            try {
                try {
                    var tmpVarVal = eval(variableName);
                } catch (err) {
                    console.log(err.message);
                    var tmpVarVal = window[variableName];
                }
                if (typeof tmpVarVal === 'object') {
                    try {
                        if (tmpVarVal.hasOwnProperty('length')) {
                            tmpArray = [];
                            objStart = tiMonitor.spaRuleObjectLengthTracker.getLastValidatedObjectLength(tmpVarVal, variableName);
                            for (z = objStart; z < tmpVarVal.length; z++) {
                                try {
                                    tmpArray.push(JSON.stringify(tmpVarVal[z]));
                                } catch (err) {}
                            }
                            retVal = tmpArray.toString();
                        } else {
                            retVal = JSON.stringify(tmpVarVal);
                        }
                    } catch (err) {
                        retVal = JSON.stringify(tmpVarVal, this.censor(tmpVarVal));
                        console.log(err.message);
                    }
                } else if (typeof tmpVarVal !== 'undefined') {
                    retVal = tmpVarVal;
                }
                this._cachedVariableValues[variableName] = {
                    "val": retVal,
                    "cacheTime": performance.now() + maxCacheTime
                }

            } catch (err) {
                console.log(err.message);
            }

            return retVal;
        }
    };

    tiMonitor.spaRuleObjectLengthTracker = {
        spaPageCounter: 0,
        spaRuleObjectLengths: {
            0: {}
        },
        _checkIfObject: function(obj) {
            return typeof(obj) == 'object';
        },
        isTrackable: function(obj) {
            if (this._checkIfObject(obj)) {
                return obj.hasOwnProperty("length")
            } else {
                return false;
            }
        },
        _trackObjectLength: function(obj, objName) {
            if (this.isTrackable(obj)) {
                objLen = obj.length;
                this.spaRuleObjectLengths[this.spaPageCounter][objName] = objLen;
            }
        },
        getLastValidatedObjectLength: function(obj, objName) {
            if (this.isTrackable(obj)) {
                if (this.spaRuleObjectLengths[this.spaPageCounter].hasOwnProperty(objName) == false) {
                    this._trackObjectLength(obj, objName);
                }

                lastValidationLength = 0;
                if (this.spaRuleObjectLengths[this.spaPageCounter - 1].hasOwnProperty(objName)) {
                    lastValidationLength = this.spaRuleObjectLengths[this.spaPageCounter - 1][objName]
                }
                return lastValidationLength;
            }
        },
        incrimentSpaPageview: function() {
            this.spaPageCounter = this.spaPageCounter + 1;
            this.spaRuleObjectLengths[this.spaPageCounter] = {};
        }
    };

    tiMonitor.getGlobalJsVars = function() {
        try {
            var tiGlobalJsVars = [];
            return tiGlobalJsVars;
        } catch (err) {
            console.log(err.message);
            jeErrorObj = {
                message: err.message
            };
            tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
            return [];
        }
    };

    tiMonitor.validationRules = function() {
        try {




            function _asyncFireTrigger(tgr) {
                return new Promise(function(resolve, reject) {
                    tgr.initTrigger(resolve);
                });
            }

            function initUnloadTriggers() {
                var tiTriggerListInit = [];
                tiMonitor.ruleVariableCache.updateCache(100);

                Promise.all(tiTriggerListInit).then(function(values) {});
            }

            window.addEventListener("unload", function(event) {
                tiMonitor.sendData.fire();
            });

            window.addEventListener("pagehide", function(event) {
                tiMonitor.fireValidationRules();
            });

            window.addEventListener("beforeunload", function(event) {
                tiMonitor.fireValidationRules();
            });

            document.addEventListener('tiSimulateUnload', function(e) {
                initUnloadTriggers();
            }, false);



        } catch (err) {
            console.log(err.message);
            jeErrorObj = {
                message: err.message
            };
            tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
        }
    };

    tiMonitor.fireValidationRules = function() {
        try {
            //fire unload triggers:
            if (typeof Event == "function" && tiMonitor.sendData.pageBeingSampled == false) {
                var event = new Event("tiSimulateUnload");
                tiMonitor.sendData.handleUnload();
                document.dispatchEvent(event);
            }
        } catch (err) {
            console.log(err.message);
            jeErrorObj = {
                message: err.message
            };
            tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
        }
    };

    tiMonitor.enableEnhancedTagSupport = function() {
        try {
            scInterval = 0;
            var tiScPostSupport = setInterval(function() {
                scInterval = scInterval + 100;
                if (scInterval >= 20000) {
                    clearInterval(tiScPostSupport);
                }
                if (typeof(s) != "undefined") {
                    if (s.hasOwnProperty("registerPostTrackCallback")) {
                        s.registerPostTrackCallback(function(requestUrl) {
                            if (requestUrl.length > 2048 || navigator.userAgent.indexOf("iPhone") > -1) {
                                tiMonitor.sendData.createFakeReq(requestUrl);
                            }
                        });
                        clearInterval(tiScPostSupport);
                    }
                }
            }, 100);
            fbInterval = 0;
            var tiFbPostSupport = setInterval(function() {
                fbInterval = fbInterval + 100;
                if (fbInterval >= 20000) {
                    clearInterval(tiFbPostSupport);
                }
                if (typeof(fbq) != "undefined") {
                    if (fbq.hasOwnProperty("on")) {
                        clearInterval(tiFbPostSupport);
                        fbq.on("fired", function(reqMethod, reqData) {
                            if (reqMethod == "POST") {
                                params = []
                                for (x = 1; x < reqData["_params"].length; x++) {
                                    param = reqData["_params"][x];
                                    params.push(encodeURIComponent(param.name) + '=' + encodeURIComponent(param.value));
                                }
                                fbUrl = "https://www.facebook.com/tr/?" + params.join('&');
                                tiMonitor.sendData.createFakeReq(fbUrl);
                            }
                        });
                    }
                }
            }, 100);

        } catch (err) {
            console.log(err.message);
            jeErrorObj = {
                message: err.message
            };
            tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
        }
    };

    tiMonitor.initializeNewPage = function() {
        try {
            tiMonitor.windowUnloadEvent = false; // Looks unused
            tiMonitor.sendData.sentUnload = false; // Looks unused
            newPageId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            tiMonitor.sendData.pageId = newPageId;
            tiMonitor.dataCollector.pageId = newPageId;

            tiMonitor.dataCollector.startTime = Date.now();
            // tiMonitor.dataCollector.identifiedRequests = {};
            tiMonitor.dataCollector.resetIdentifiedRequests();
            tiMonitor.dataCollector.offsetTime = performance.now();
            tiMonitor.sendData.currentUrl = window.location.href;
            tiMonitor.sendData.preventFiringValidationRules = false;
            tiMonitor.dataCollector.resource_size = 0;
            taginspector.datapulse.trigger.BaseTrigger.resetFiredTriggers();
            taginspector.datapulse.pagevariable.BaseVariable.clearCache();
            tiMonitor.spaRuleObjectLengthTracker.incrimentSpaPageview();
        } catch (err) {
            console.log(err.message);
            jeErrorObj = {
                message: err.message
            };
            tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
        }
    };

    tiMonitor.enableSpaSupport = function() {
        var portRegex = /:[0-9]+$/;
        var kd = {};
        ld = function(a, b) {
            kd[a] = kd[a] || [];
            kd[a][b] = !0
        }
        getWindowParam = function(a, b, c) {
            b && (void 0 === window[a] || c && !window[a]) && (window[a] = b);
            return window[a]
        }
        getUrl = function() {
            return document.location.href;
        }

        getUrlwithoutFragment = function(a) {
            return stripFragmentFromUrl(getUrlDict(a))
        }
        stripFragmentFromUrl = function(a) {
            var b = "";
            if (a && a.href) {
                var c = a.href.indexOf("#");
                b = 0 > c ? a.href : a.href.substr(0, c)
            }
            return b
        }
        getUrlDict = function(a) {
            var b = document.createElement("a");
            a && (b.href = a);
            var c = b.pathname;
            "/" !== c[0] && (a || ld("TAGGING", 1), c = "/" + c);
            var d = b.hostname.replace(portRegex, "");
            return {
                href: b.href,
                protocol: b.protocol,
                host: b.host,
                hostname: d,
                pathname: c,
                search: b.search,
                hash: b.hash,
                port: b.port
            }
        }
        getUrlComponent = function(urlDict, uriComponent, c, d, e) {
            uriComponent && (uriComponent = String(uriComponent).toLowerCase());
            if ("protocol" === uriComponent || "port" === uriComponent) {
                urlDict.protocol = stripSemicolon(urlDict.protocol) || stripSemicolon(document.location.protocol);
            }
            "port" === uriComponent ? urlDict.port = String(Number(urlDict.hostname ? urlDict.port : document.location.port) || ("http" == urlDict.protocol ? 80 : "https" == urlDict.protocol ? 443 : "")) : "host" === uriComponent && (urlDict.hostname = (urlDict.hostname || document.location.hostname).replace(portRegex, "").toLowerCase());
            var uriComponentCopy = uriComponent,
                h, k = stripSemicolon(urlDict.protocol);
            uriComponentCopy && (uriComponentCopy = String(uriComponentCopy).toLowerCase());
            switch (uriComponentCopy) {
                case "url_no_fragment":
                    result = stripFragmentFromUrl(a);
                    break;
                case "protocol":
                    result = k;
                    break;
                case "host":
                    result = urlDict.hostname.replace(portRegex, "").toLowerCase();
                    if (c) {
                        var l = /^www\d*\./.exec(result);
                        l && l[0] && (result = result.substr(l[0].length))
                    }
                    break;
                case "port":
                    result = String(Number(urlDict.port) || ("http" == k ? 80 : "https" == k ? 443 : ""));
                    break;
                case "path":
                    urlDict.pathname || urlDict.hostname || ld("TAGGING", 1);
                    result = "/" == urlDict.pathname.substr(0, 1) ? urlDict.pathname : "/" + urlDict.pathname;
                    var m = result.split("/");
                    0 <= n(d || [], m[m.length - 1]) && (m[m.length - 1] = "");
                    result = m.join("/");
                    break;
                case "query":
                    result = urlDict.search.replace("?", "");
                    e && (result = getQueryparameters(result, e, void 0));
                    break;
                case "extension":
                    var q = urlDict.pathname.split(".");
                    result = 1 < q.length ? q[q.length - 1] : "";
                    result = result.split("/")[0];
                    break;
                case "fragment":
                    result = urlDict.hash.replace("#", "");
                    break;
                default:
                    result = a && urlDict.href
            }
            return result
        }
        getUrlFragment = function(a) {
            return getUrlComponent(getUrlDict(a), "fragment")
        }
        stripSemicolon = function(a) {
            return a ? a.replace(":", "").toLowerCase() : ""
        }
        isFunction = function(a) {
            return "function" == typeof a
        }
        getQueryparameters = function(a, b, c) {
            for (var d = a.split("&"), e = 0; e < d.length; e++) {
                var f = d[e].split("=");
                if (decodeURIComponent(f[0]).replace(/\+/g, " ") === b) {
                    var h = f.slice(1).join("=");
                    return c ? h : decodeURIComponent(h).replace(/\+/g, " ")
                }
            }
        }
        addListener = function(a, b, c, d) {
            a.addEventListener ? a.addEventListener(b, c, !!d) : a.attachEvent && a.attachEvent("on" + b, c)
        }
        var avb = function() {
            function getNewUrlOnEventCallback(event) {
                return event.target && event.target.location && event.target.location.href ? event.target.location.href : getUrl()
            }

            function listenToHashChangeEvents(winObj, histObj) {
                addListener(winObj, "hashchange", function(event) {
                    var newUrl = getNewUrlOnEventCallback(event);
                    histObj({
                        source: "hashchange",
                        state: null,
                        url: getUrlwithoutFragment(newUrl),
                        L: getUrlFragment(newUrl)
                    })
                })
            }

            function listenToPopstateEvents(winObj, histObj) {
                addListener(winObj, "popstate", function(event) {
                    var newUrl = getNewUrlOnEventCallback(event);
                    histObj({
                        source: "popstate",
                        state: event.state,
                        url: getUrlwithoutFragment(newUrl),
                        L: getUrlFragment(newUrl)
                    })
                })
            }

            function bindToHistoryEvent(eventName, windowObj, historyObj) {
                var windowHistoryObj = windowObj.history;
                var eventType = windowHistoryObj[eventName];
                if (isFunction(eventType))
                    try {
                        windowHistoryObj[eventName] = function(q, r, u) {
                            eventType.apply(windowHistoryObj, [].slice.call(arguments, 0));
                            historyObj({
                                source: eventName,
                                state: q,
                                url: getUrlwithoutFragment(getUrl()),
                                L: getUrlFragment(getUrl())
                            })
                        }
                    } catch (q) {}
            }

            function orgHistoryObj() {
                var historyDict = {
                    source: null,
                    state: getWindowParam("history").state || null,
                    url: getUrlwithoutFragment(getUrl()),
                    L: getUrlFragment(getUrl())
                };
                return function(winObj) {
                    var l = {};
                    l[historyDict.source] = !0;
                    l[winObj.source] = !0;
                    if (!l.popstate || !l.hashchange || historyDict.L != winObj.L) {
                        if (historyDict.url !== undefined && winObj.url !== undefined) {
                            var historyDictUrlNoQs = (historyDict.url).split("?")[0];
                            var winObjUrlNoQs = (winObj.url).split("?")[0];
                            if (historyDictUrlNoQs !== winObjUrlNoQs) {
                                historyDict = winObj;
                                if (performance.now() - tiMonitor.dataCollector.offsetTime > 200) {
                                    tiMonitor.ruleVariableCache.updateCache(100);
                                    tiMonitor.ruleVariableCache.spaRulesFiring = true;
                                    setTimeout(function() {

                                        if (tiMonitor.sendData.pageBeingSampled == false) {
                                            tiMonitor.fireValidationRules();
                                            tiMonitor.sendData.iteratePerformance();
                                            tiMonitor.sendData.fire();
                                        }
                                        tiMonitor.ruleVariableCache.spaRulesFiring = false;

                                        var pageBeingSampled = true;
                                        tiMonitor.sendData.pageBeingSampled = true;
                                        var randomInt = Math.floor(Math.random() * (tiMonitor.sendData.sampleRate - 1 + 1)) + 1;
                                        if (1 == randomInt) {
                                            tiMonitor.initializeNewPage();
                                            pageBeingSampled = false;
                                            tiMonitor.sendData.pageBeingSampled = false;
                                        } else if (tiMonitor.sendData.sampleBlackListEnabled == true) {
                                            if (tiMonitor.sendData.sampleBlackList.test(tiMonitor.sendData.currentUrl) == true) {
                                                tiMonitor.initializeNewPage();
                                                tiMonitor.sendData.sampleblackListFlag = true;
                                                pageBeingSampled = false;
                                                tiMonitor.sendData.pageBeingSampled = false;
                                            }
                                        }

                                        if (pageBeingSampled == false) {
                                            tiMonitor.dataCollector.queueRequest(null, "pageload");
                                            tiMonitor.sendData.iteratePerformance();
                                            tiMonitor.sendData.fire();
                                            tiMonitor.sendData.sentUnload = true;
                                        }
                                    }, 200);
                                }
                            }
                        }
                    }
                }
            }(function(f) {
                f()
            })(function() {
                var winObj = getWindowParam("self");
                var histObj = orgHistoryObj();
                listenToHashChangeEvents(winObj, histObj);
                listenToPopstateEvents(winObj, histObj);
                bindToHistoryEvent("pushState", winObj, histObj);
                bindToHistoryEvent("replaceState", winObj, histObj);
            })
        }();
    };

    tiMonitor.patchPostRequests = function() {
        var SCHEDULE = 'schedule';
        var INVOKE = 'invoke';
        var ADD_EVENT_LISTENER_STR = 'addEventListener';
        var XMLHTTPREQUEST = 'xmlhttprequest';
        var FETCH = 'fetch';
        var SENDBEACON = 'navigator.sendBeacon';
        var ERROR = 'error';
        var BEFORE_EVENT = ':before';
        var AFTER_EVENT = ':after';
        var gaRegex = new RegExp('(^http(s)?:\\/\\/(([a-zA-Z0-9\\-\\.]*)\\.|)stats\\.g\\.doubleclick\\.net(\\/[a-z])?\\/collect|^http(s)?:\\/\\/(([a-zA-Z0-9\\-\\.]*)\\.|)(google-analytics|google)\\.com(\\/[a-z])?\\/collect|gtag\\/js\\?id\\=(G|g)\\-|\\/g\\/collect\\?v=2)', 'i');

        var globalState = {
            fetchInProgress: false
        };

        function convertHitToGetRequest(tagUrl, bodyParams) {
            if ('URL' in window) {
                var parsedTagUrl = new URL(tagUrl);
                if (parsedTagUrl.search != "") {
                    //has qstring
                    tagUrl = tagUrl + "&"
                } else {
                    tagUrl = tagUrl + "?"
                }
            }

            tagUrl = tagUrl + bodyParams.join('&');
            return tagUrl;
        }

        function shouldCollectPostBody(tagUrl, method, body) {
            if (method == 'POST') {
                if (body && body != "") {
                    return gaRegex.test(tagUrl);
                }
            }
            return false;
        }

        var EventHandler = function() {
            function EventHandler() {
                this.observers = {};
            }

            var _proto = EventHandler.prototype;

            _proto.observe = function observe(name, fn) {
                var _this = this;

                if (typeof fn === 'function') {
                    if (!this.observers[name]) {
                        this.observers[name] = [];
                    }

                    this.observers[name].push(fn);
                    return function() {
                        var index = _this.observers[name].indexOf(fn);

                        if (index > -1) {
                            _this.observers[name].splice(index, 1);
                        }
                    };
                }
            };

            _proto.sendOnly = function sendOnly(name, args) {
                var obs = this.observers[name];

                if (obs) {
                    obs.forEach(function(fn) {
                        try {
                            fn.apply(undefined, args);
                        } catch (error) {
                            console.log(error, error.stack);
                        }
                    });
                }
            };

            _proto.send = function send(name, args) {
                this.sendOnly(name + BEFORE_EVENT, args);
                this.sendOnly(name, args);
                this.sendOnly(name + AFTER_EVENT, args);
            };

            return EventHandler;
        }();

        function apmSymbol(name) {
            return '__apm_symbol__' + name;
        }

        function isPropertyWritable(propertyDesc) {
            if (!propertyDesc) {
                return true;
            }

            if (propertyDesc.writable === false) {
                return false;
            }

            return !(typeof propertyDesc.get === 'function' && typeof propertyDesc.set === 'undefined');
        }

        function attachOriginToPatched(patched, original) {
            patched[apmSymbol('OriginalDelegate')] = original;
        }

        function patchMethod(target, name, patchFn) {
            var proto = target;

            while (proto && !proto.hasOwnProperty(name)) {
                proto = Object.getPrototypeOf(proto);
            }
            if (!proto && target[name]) {
                proto = target;
            }
            var delegateName = apmSymbol(name);
            var delegate;

            if (proto && !(delegate = proto[delegateName])) {
                delegate = proto[delegateName] = proto[name];
                var desc = proto && Object.getOwnPropertyDescriptor(proto, name);

                if (isPropertyWritable(desc)) {
                    var patchDelegate = patchFn(delegate, delegateName, name);

                    proto[name] = function() {
                        return patchDelegate(this, arguments);
                    };

                    attachOriginToPatched(proto[name], delegate);
                }
            }

            return delegate;
        }
        var XHR_IGNORE = apmSymbol('xhrIgnore');
        var XHR_SYNC = apmSymbol('xhrSync');
        var XHR_URL = apmSymbol('xhrURL');
        var XHR_METHOD = apmSymbol('xhrMethod');

        function patchXMLHttpRequest(callback) {
            var XMLHttpRequestPrototype = XMLHttpRequest.prototype;

            if (!XMLHttpRequestPrototype || !XMLHttpRequestPrototype[ADD_EVENT_LISTENER_STR]) {
                return;
            }

            var READY_STATE_CHANGE = 'readystatechange';
            var LOAD = 'load';
            var ERROR = 'error';
            var TIMEOUT = 'timeout';
            var ABORT = 'abort';

            function invokeTask(task, status) {
                if (task.state !== INVOKE) {
                    task.state = INVOKE;
                    task.data.status = status;
                    callback(INVOKE, task);
                }
            }

            function scheduleTask(task) {
                if (task.state === SCHEDULE) {
                    return;
                }

                task.state = SCHEDULE;
                callback(SCHEDULE, task);
                var target = task.data.target;

                function addListener(name) {
                    target[ADD_EVENT_LISTENER_STR](name, function(_ref) {
                        var type = _ref.type;

                        if (type === READY_STATE_CHANGE) {
                            if (target.readyState === 4 && target.status !== 0) {
                                invokeTask(task, 'success');
                            }
                        } else {
                            var status = type === LOAD ? 'success' : type;
                            invokeTask(task, status);
                        }
                    });
                }
                addListener(READY_STATE_CHANGE);
                addListener(LOAD);
                addListener(TIMEOUT);
                addListener(ERROR);
                addListener(ABORT);
            }

            var openNative = patchMethod(XMLHttpRequestPrototype, 'open', function() {
                return function(self, args) {
                    if (!self[XHR_IGNORE]) {
                        self[XHR_METHOD] = args[0];
                        self[XHR_URL] = args[1];
                        self[XHR_SYNC] = args[2] === false;
                    }

                    return openNative.apply(self, args);
                };
            });

            var sendNative = patchMethod(XMLHttpRequestPrototype, 'send', function() {
                return function(self, args) {
                    if (self[XHR_IGNORE]) {
                        return sendNative.apply(self, args);
                    }
                    var task = {
                        source: XMLHTTPREQUEST,
                        state: '',
                        type: 'macroTask',
                        data: {
                            target: self,
                            method: self[XHR_METHOD],
                            sync: self[XHR_SYNC],
                            url: self[XHR_URL],
                            status: ''
                        }
                    };
                    try {
                        if (shouldCollectPostBody(task.data.url, task.data.method, args[0])) {
                            var bodyParamArr = args[0].split("&");
                            var convertedTagUrl = convertHitToGetRequest(task.data.url, bodyParamArr);
                            tiMonitor.sendData.createFakeReq(convertedTagUrl);
                        }
                    } catch (err) {
                        console.log(err.message);
                    }

                    try {
                        scheduleTask(task);
                        return sendNative.apply(self, args);
                    } catch (e) {
                        invokeTask(task, ERROR);
                        throw e;
                    }
                };
            });
        }

        function scheduleMicroTask(callback) {
            Promise.resolve().then(callback);
        }

        function patchFetch(callback) {
            if (!window.fetch || !window.Request) {
                return;
            }

            function scheduleTask(task) {
                task.state = SCHEDULE;
                callback(SCHEDULE, task);
            }

            function invokeTask(task) {
                task.state = INVOKE;
                callback(INVOKE, task);
            }
            var nativeFetch = window.fetch;

            window.fetch = function(input, init) {
                var fetchSelf = this;
                var args = arguments;
                var request, url;

                if (typeof input === 'string') {
                    request = new Request(input, init);
                    url = input;
                } else if (input) {
                    request = input;
                    url = request.url;
                } else {
                    return nativeFetch.apply(fetchSelf, args);
                }

                var task = {
                    source: FETCH,
                    state: '',
                    type: 'macroTask',
                    data: {
                        target: request,
                        method: request.method,
                        url: url,
                        aborted: false
                    }
                };
                try {
                    if (shouldCollectPostBody(task.data.url, task.data.method, args[0])) {
                        var bodyParamArr = args[0].split("&");
                        var convertedTagUrl = convertHitToGetRequest(task.data.url, bodyParamArr);
                        tiMonitor.sendData.createFakeReq(convertedTagUrl);
                    }
                } catch (err) {
                    console.log(err.message);
                }

                return new Promise(function(resolve, reject) {
                    globalState.fetchInProgress = true;
                    scheduleTask(task);
                    var promise;

                    try {
                        promise = nativeFetch.apply(fetchSelf, [request]);
                    } catch (error) {
                        reject(error);
                        task.data.error = error;
                        invokeTask(task);
                        globalState.fetchInProgress = false;
                        return;
                    }

                    promise.then(function(response) {
                        resolve(response);
                        scheduleMicroTask(function() {
                            task.data.response = response;
                            invokeTask(task);
                        });
                    }, function(error) {
                        reject(error);
                        scheduleMicroTask(function() {
                            task.data.error = error;
                            invokeTask(task);
                        });
                    });
                    globalState.fetchInProgress = false;
                });
            };
        }

        function patchBeacon(callback) {
            var nativeSendBeacon = window.navigator.sendBeacon;

            window.navigator.sendBeacon = function(url, data) {
                var beaconSelf = this;
                var args = arguments;

                if ('Request' in window) {
                    try {
                        var request, url;
                        request = new Request(url);
                        url = request.url;
                        if (shouldCollectPostBody(url, "POST", data)) {
                            var bodyParamArr = data.split("&");
                            var convertedTagUrl = convertHitToGetRequest(url, bodyParamArr);
                            tiMonitor.sendData.createFakeReq(convertedTagUrl);
                        }
                    } catch (err) {
                        console.log(err.message);
                    }
                }

                return nativeSendBeacon.apply(beaconSelf, arguments);
            }
        }

        var patchEventHandler = new EventHandler();
        var alreadyPatched = false;

        function patchAll() {
            if (!alreadyPatched) {
                alreadyPatched = true;
                patchXMLHttpRequest(function(event, task) {
                    patchEventHandler.send(XMLHTTPREQUEST, [event, task]);
                });
                if ('Promise' in window) {
                    patchFetch(function(event, task) {
                        patchEventHandler.send(FETCH, [event, task]);
                    });
                }
                if (window.navigator) {
                    if (window.navigator.sendBeacon) {
                        patchBeacon(function(event, task) {
                            patchEventHandler.send(SENDBEACON, [event, task]);
                        });
                    }
                }
            }
            return patchEventHandler;
        }
        patchAll();
    }

    tiMonitor.initializeMain = function() {
        if (tiMonitor.sendData.suportedBrowser() == true && tiMonitor.sendData.isInIframe() == false) {
            if (tiMonitor.sendData.initialized == false) {
                tiMonitor.sendData.initialized = true;
                var pageBeingSampled = true;
                var randomInt = Math.floor(Math.random() * (tiMonitor.sendData.sampleRate - 1 + 1)) + 1;
                if (1 == randomInt) {
                    pageBeingSampled = false;
                    tiMonitor.sendData.pageBeingSampled = false;
                } else if (tiMonitor.sendData.sampleBlackListEnabled == true) {
                    if (tiMonitor.sendData.sampleBlackList.test(tiMonitor.sendData.currentUrl) == true) {
                        tiMonitor.sendData.sampleblackListFlag = true;
                        pageBeingSampled = false;
                        tiMonitor.sendData.pageBeingSampled = false;
                    }
                }
                if (pageBeingSampled == false && tiMonitor.sendData.isBufferFull() == false) {
                    tiMonitor.dataCollector.queueRequest(null, "pageload");
                    tiMonitor.sendData.iteratePerformance();
                    tiMonitor.sendData.fire();
                    tiMonitor.sendData.sentUnload = true;
                    if (false) {
                        tiMonitor.dataCollector.session = taginspector.datapulse.Session.setupSession({
                            "containerId": "80e504dcf3d011e88d1212d7e8427f3e"
                        });
                    }
                    tiMonitor.sendData.fullBufferEventListener();
                    tiMonitor.spaRuleObjectLengthTracker.incrimentSpaPageview();

                    if (tiMonitor.sendData.isPerformanceObserverSupported() == true) {
                        var iteratePerformanceCompleted = false;
                        while (iteratePerformanceCompleted == false) {
                            tiMonitor.sendData.iteratePerformance();
                            pe = performance.getEntriesByType("resource");
                            if (tiMonitor.sendData.lastPerformanceObjLength == pe.length) {
                                iteratePerformanceCompleted = true;
                            }
                        }
                        var observer = new PerformanceObserver(tiMonitor.sendData.performanceObserverCallback);
                        observer.observe({
                            entryTypes: ['resource']
                        });

                    } else {
                        setInterval(function() {
                            tiMonitor.sendData.iteratePerformance()
                        }, 1000);
                    }
                    tiMonitor.enableEnhancedTagSupport();
                    if (false) {
                        tiMonitor.patchPostRequests();
                    }

                    try {
                        tiMonitor.enableSpaSupport();
                    } catch (err) {
                        console.log(err.message);
                        jeErrorObj = {
                            message: err.message
                        };
                        tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
                    }
                    setInterval(function() {
                        tiMonitor.sendData.fire()
                    }, 1000);
                }
            }
        }
    }
    tiMonitor.initializeMain();
}