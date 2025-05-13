(function() {
    "use strict";
    var l = {},
        vt, y, c, r, t, u, ti, oi, lu;
    ! function() {
        l.d = function(n, t) {
            for (var i in t) l.o(t, i) && !l.o(n, i) && Object.defineProperty(n, i, {
                enumerable: !0,
                get: t[i]
            })
        }
    }();
    ! function() {
        l.o = function(n, t) {
            return Object.prototype.hasOwnProperty.call(n, t)
        }
    }();
    ! function() {
        l.r = function(n) {
            typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {
                value: "Module"
            });
            Object.defineProperty(n, "__esModule", {
                value: !0
            })
        }
    }();
    vt = {};
    /*!*************************************************!*\
      !*** ./src/rprofiler/rprofiler.ts + 30 modules ***!
      \*************************************************/
    l.r(vt);
    l.d(vt, {
        "default": function() {
            return fo
        }
    });
    var d, si, p = function() {
            var n = self.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
            if (n && n.responseStart > 0 && n.responseStart < performance.now()) return n
        },
        g = function(n) {
            if ("loading" === document.readyState) return "loading";
            var t = p();
            if (t) {
                if (n < t.domInteractive) return "loading";
                if (0 === t.domContentLoadedEventStart || n < t.domContentLoadedEventStart) return "dom-interactive";
                if (0 === t.domComplete || n < t.domComplete) return "dom-content-loaded"
            }
            return "complete"
        },
        au = function(n) {
            var t = n.nodeName;
            return 1 === n.nodeType ? t.toLowerCase() : t.toUpperCase().replace(/^#/, "")
        },
        et = function(n, t) {
            var r = "",
                i, u;
            try {
                for (; n && 9 !== n.nodeType;) {
                    if (i = n, u = i.id ? "#" + i.id : au(i) + (i.classList && i.classList.value && i.classList.value.trim() && i.classList.value.trim().length ? "." + i.classList.value.trim().replace(/\s+/g, ".") : ""), r.length + u.length > (t || 100) - 1) return r || u;
                    if (r = r ? u + ">" + r : u, i.id) break;
                    n = i.parentNode
                }
            } catch (n) {}
            return r
        },
        hi = -1,
        ci = function() {
            return hi
        },
        a = function(n) {
            addEventListener("pageshow", function(t) {
                t.persisted && (hi = t.timeStamp, n(t))
            }, !0)
        },
        ot = function() {
            var n = p();
            return n && n.activationStart || 0
        },
        f = function(n, t) {
            var r = p(),
                i = "navigate";
            return ci() >= 0 ? i = "back-forward-cache" : r && (document.prerendering || ot() > 0 ? i = "prerender" : document.wasDiscarded ? i = "restore" : r.type && (i = r.type.replace(/_/g, "-"))), {
                name: n,
                value: void 0 === t ? -1 : t,
                rating: "good",
                delta: 0,
                entries: [],
                id: "v4-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12),
                navigationType: i
            }
        },
        v = function(n, t, i) {
            try {
                if (PerformanceObserver.supportedEntryTypes.includes(n)) {
                    var r = new PerformanceObserver(function(n) {
                        Promise.resolve().then(function() {
                            t(n.getEntries())
                        })
                    });
                    return r.observe(Object.assign({
                        type: n,
                        buffered: !0
                    }, i || {})), r
                }
            } catch (n) {}
        },
        e = function(n, t, i, r) {
            var u, f;
            return function(e) {
                t.value >= 0 && (e || r) && ((f = t.value - (u || 0)) || void 0 === u) && (u = t.value, t.delta = f, t.rating = function(n, t) {
                    return n > t[1] ? "poor" : n > t[0] ? "needs-improvement" : "good"
                }(t.value, i), n(t))
            }
        },
        yt = function(n) {
            requestAnimationFrame(function() {
                return requestAnimationFrame(function() {
                    return n()
                })
            })
        },
        nt = function(n) {
            document.addEventListener("visibilitychange", function() {
                "hidden" === document.visibilityState && n()
            })
        },
        st = function(n) {
            var t = !1;
            return function() {
                t || (n(), t = !0)
            }
        },
        w = -1,
        li = function() {
            return "hidden" !== document.visibilityState || document.prerendering ? 1 / 0 : 0
        },
        ht = function(n) {
            "hidden" === document.visibilityState && w > -1 && (w = "visibilitychange" === n.type ? n.timeStamp : 0, vu())
        },
        ai = function() {
            addEventListener("visibilitychange", ht, !0);
            addEventListener("prerenderingchange", ht, !0)
        },
        vu = function() {
            removeEventListener("visibilitychange", ht, !0);
            removeEventListener("prerenderingchange", ht, !0)
        },
        pt = function() {
            return w < 0 && (w = li(), ai(), a(function() {
                setTimeout(function() {
                    w = li();
                    ai()
                }, 0)
            })), {
                get firstHiddenTime() {
                    return w
                }
            }
        },
        tt = function(n) {
            document.prerendering ? addEventListener("prerenderingchange", function() {
                return n()
            }, !0) : n()
        },
        vi = [1800, 3e3],
        yi = function(n, t) {
            t = t || {};
            tt(function() {
                var r, o = pt(),
                    i = f("FCP"),
                    u = v("paint", function(n) {
                        n.forEach(function(n) {
                            "first-contentful-paint" === n.name && (u.disconnect(), n.startTime < o.firstHiddenTime && (i.value = Math.max(n.startTime - ot(), 0), i.entries.push(n), r(!0)))
                        })
                    });
                u && (r = e(n, i, vi, t.reportAllChanges), a(function(u) {
                    i = f("FCP");
                    r = e(n, i, vi, t.reportAllChanges);
                    yt(function() {
                        i.value = performance.now() - u.timeStamp;
                        r(!0)
                    })
                }))
            })
        },
        pi = [.1, .25],
        wi = function(n, t) {
            ! function(n, t) {
                t = t || {};
                yi(st(function() {
                    var i, r = f("CLS", 0),
                        u = 0,
                        o = [],
                        s = function(n) {
                            n.forEach(function(n) {
                                if (!n.hadRecentInput) {
                                    var t = o[0],
                                        i = o[o.length - 1];
                                    u && n.startTime - i.startTime < 1e3 && n.startTime - t.startTime < 5e3 ? (u += n.value, o.push(n)) : (u = n.value, o = [n])
                                }
                            });
                            u > r.value && (r.value = u, r.entries = o, i())
                        },
                        h = v("layout-shift", s);
                    h && (i = e(n, r, pi, t.reportAllChanges), nt(function() {
                        s(h.takeRecords());
                        i(!0)
                    }), a(function() {
                        u = 0;
                        r = f("CLS", 0);
                        i = e(n, r, pi, t.reportAllChanges);
                        yt(function() {
                            return i()
                        })
                    }), setTimeout(i, 0))
                }))
            }(function(t) {
                var i = function(n) {
                    var r, u = {},
                        t, i;
                    return n.entries.length && (t = n.entries.reduce(function(n, t) {
                        return n && n.value > t.value ? n : t
                    }), t && t.sources && t.sources.length && (i = (r = t.sources).find(function(n) {
                        return n.node && 1 === n.node.nodeType
                    }) || r[0], i && (u = {
                        largestShiftTarget: et(i.node),
                        largestShiftTime: t.startTime,
                        largestShiftValue: t.value,
                        largestShiftSource: i,
                        largestShiftEntry: t,
                        loadState: g(t.startTime)
                    }))), Object.assign(n, {
                        attribution: u
                    })
                }(t);
                n(i)
            }, t)
        },
        bi = function(n, t) {
            yi(function(t) {
                var i = function(n) {
                    var r = {
                            timeToFirstByte: 0,
                            firstByteToFCP: n.value,
                            loadState: g(ci())
                        },
                        t, u, f, i;
                    return n.entries.length && (t = p(), u = n.entries[n.entries.length - 1], t && (f = t.activationStart || 0, i = Math.max(0, t.responseStart - f), r = {
                        timeToFirstByte: i,
                        firstByteToFCP: n.value - i,
                        loadState: g(n.entries[0].startTime),
                        navigationEntry: t,
                        fcpEntry: u
                    })), Object.assign(n, {
                        attribution: r
                    })
                }(t);
                n(i)
            }, t)
        },
        ki = 0,
        wt = 1 / 0,
        ct = 0,
        yu = function(n) {
            n.forEach(function(n) {
                n.interactionId && (wt = Math.min(wt, n.interactionId), ct = Math.max(ct, n.interactionId), ki = ct ? (ct - wt) / 7 + 1 : 0)
            })
        },
        di = function() {
            return d ? ki : performance.interactionCount || 0
        },
        pu = function() {
            "interactionCount" in performance || d || (d = v("event", yu, {
                type: "event",
                buffered: !0,
                durationThreshold: 0
            }))
        },
        o = [],
        it = new Map,
        gi = 0,
        wu = function() {
            var n = Math.min(o.length - 1, Math.floor((di() - gi) / 50));
            return o[n]
        },
        nr = [],
        bu = function(n) {
            var r, t, i;
            (nr.forEach(function(t) {
                return t(n)
            }), n.interactionId || "first-input" === n.entryType) && (r = o[o.length - 1], t = it.get(n.interactionId), (t || o.length < 10 || n.duration > r.latency) && (t ? n.duration > t.latency ? (t.entries = [n], t.latency = n.duration) : n.duration === t.latency && n.startTime === t.entries[0].startTime && t.entries.push(n) : (i = {
                id: n.interactionId,
                latency: n.duration,
                entries: [n]
            }, it.set(i.id, i), o.push(i)), o.sort(function(n, t) {
                return t.latency - n.latency
            }), o.length > 10 && o.splice(10).forEach(function(n) {
                return it.delete(n.id)
            })))
        },
        bt = function(n) {
            var i = self.requestIdleCallback || self.setTimeout,
                t = -1;
            return n = st(n), "hidden" === document.visibilityState ? n() : (t = i(n), nt(n)), t
        },
        tr = [200, 500],
        ku = function(n, t) {
            "PerformanceEventTiming" in self && "interactionId" in PerformanceEventTiming.prototype && (t = t || {}, tt(function() {
                var u;
                pu();
                var r, i = f("INP"),
                    h = function(n) {
                        bt(function() {
                            n.forEach(bu);
                            var t = wu();
                            t && t.latency !== i.value && (i.value = t.latency, i.entries = t.entries, r())
                        })
                    },
                    s = v("event", h, {
                        durationThreshold: null !== (u = t.durationThreshold) && void 0 !== u ? u : 40
                    });
                r = e(n, i, tr, t.reportAllChanges);
                s && (s.observe({
                    type: "first-input",
                    buffered: !0
                }), nt(function() {
                    h(s.takeRecords());
                    r(!0)
                }), a(function() {
                    gi = di();
                    o.length = 0;
                    it.clear();
                    i = f("INP");
                    r = e(n, i, tr, t.reportAllChanges)
                }))
            }))
        },
        b = [],
        s = [],
        kt = 0,
        dt = new WeakMap,
        k = new Map,
        gt = -1,
        du = function(n) {
            b = b.concat(n);
            ir()
        },
        ir = function() {
            gt < 0 && (gt = bt(gu))
        },
        gu = function() {
            var r, u, t, n, i, f;
            for (k.size > 10 && k.forEach(function(n, t) {
                    it.has(t) || k.delete(t)
                }), r = o.map(function(n) {
                    return dt.get(n.entries[0])
                }), u = s.length - 50, s = s.filter(function(n, t) {
                    return t >= u || r.includes(n)
                }), t = new Set, n = 0; n < s.length; n++) i = s[n], ur(i.startTime, i.processingEnd).forEach(function(n) {
                t.add(n)
            });
            f = b.length - 51;
            b = b.filter(function(n, i) {
                return n.startTime > kt && i > f || t.has(n)
            });
            gt = -1
        };
    nr.push(function(n) {
        n.interactionId && n.target && !k.has(n.interactionId) && k.set(n.interactionId, n.target)
    }, function(n) {
        var t, u = n.startTime + n.duration,
            i, r;
        for (kt = Math.max(kt, n.processingEnd), i = s.length - 1; i >= 0; i--)
            if (r = s[i], Math.abs(u - r.renderTime) <= 8) {
                (t = r).startTime = Math.min(n.startTime, t.startTime);
                t.processingStart = Math.min(n.processingStart, t.processingStart);
                t.processingEnd = Math.max(n.processingEnd, t.processingEnd);
                t.entries.push(n);
                break
            }
        t || (t = {
            startTime: n.startTime,
            processingStart: n.processingStart,
            processingEnd: n.processingEnd,
            renderTime: u,
            entries: [n]
        }, s.push(t));
        (n.interactionId || "first-input" === n.entryType) && dt.set(n, t);
        ir()
    });
    var h, rt, rr, lt, ur = function(n, t) {
            for (var i, r = [], u = 0; i = b[u]; u++)
                if (!(i.startTime + i.duration < n)) {
                    if (i.startTime > t) break;
                    r.push(i)
                }
            return r
        },
        fr = function(n, t) {
            si || (si = v("long-animation-frame", du));
            ku(function(t) {
                var i = function(n) {
                    var t = n.entries[0],
                        r = dt.get(t),
                        u = t.processingStart,
                        i = r.processingEnd,
                        h = r.entries.sort(function(n, t) {
                            return n.processingStart - t.processingStart
                        }),
                        f = ur(t.startTime, i),
                        e = n.entries.find(function(n) {
                            return n.target
                        }),
                        o = e && e.target || k.get(t.interactionId),
                        c = [t.startTime + t.duration, i].concat(f.map(function(n) {
                            return n.startTime + n.duration
                        })),
                        s = Math.max.apply(Math, c),
                        l = {
                            interactionTarget: et(o),
                            interactionTargetElement: o,
                            interactionType: t.name.startsWith("key") ? "keyboard" : "pointer",
                            interactionTime: t.startTime,
                            nextPaintTime: s,
                            processedEventEntries: h,
                            longAnimationFrameEntries: f,
                            inputDelay: u - t.startTime,
                            processingDuration: i - u,
                            presentationDelay: Math.max(s - i, 0),
                            loadState: g(t.startTime)
                        };
                    return Object.assign(n, {
                        attribution: l
                    })
                }(t);
                n(i)
            }, t)
        },
        er = [2500, 4e3],
        ni = {},
        or = function(n, t) {
            ! function(n, t) {
                t = t || {};
                tt(function() {
                    var r, h = pt(),
                        i = f("LCP"),
                        s = function(n) {
                            t.reportAllChanges || (n = n.slice(-1));
                            n.forEach(function(n) {
                                n.startTime < h.firstHiddenTime && (i.value = Math.max(n.startTime - ot(), 0), i.entries = [n], r())
                            })
                        },
                        u = v("largest-contentful-paint", s),
                        o;
                    u && (r = e(n, i, er, t.reportAllChanges), o = st(function() {
                        ni[i.id] || (s(u.takeRecords()), u.disconnect(), ni[i.id] = !0, r(!0))
                    }), ["keydown", "click"].forEach(function(n) {
                        addEventListener(n, function() {
                            return bt(o)
                        }, !0)
                    }), nt(o), a(function(u) {
                        i = f("LCP");
                        r = e(n, i, er, t.reportAllChanges);
                        yt(function() {
                            i.value = performance.now() - u.timeStamp;
                            ni[i.id] = !0;
                            r(!0)
                        })
                    }))
                })
            }(function(t) {
                var i = function(n) {
                    var u = {
                            timeToFirstByte: 0,
                            resourceLoadDelay: 0,
                            resourceLoadDuration: 0,
                            elementRenderDelay: n.value
                        },
                        r;
                    if (n.entries.length && (r = p(), r)) {
                        var f = r.activationStart || 0,
                            t = n.entries[n.entries.length - 1],
                            i = t.url && performance.getEntriesByType("resource").filter(function(n) {
                                return n.name === t.url
                            })[0],
                            e = Math.max(0, r.responseStart - f),
                            o = Math.max(e, i ? (i.requestStart || i.startTime) - f : 0),
                            s = Math.max(o, i ? i.responseEnd - f : 0),
                            h = Math.max(s, t.startTime - f);
                        u = {
                            element: et(t.element),
                            timeToFirstByte: e,
                            resourceLoadDelay: o - e,
                            resourceLoadDuration: s - o,
                            elementRenderDelay: h - s,
                            navigationEntry: r,
                            lcpEntry: t
                        };
                        t.url && (u.url = t.url);
                        i && (u.lcpResourceEntry = i)
                    }
                    return Object.assign(n, {
                        attribution: u
                    })
                }(t);
                n(i)
            }, t)
        },
        sr = [800, 1800],
        nf = function d(n) {
            document.prerendering ? tt(function() {
                return d(n)
            }) : "complete" !== document.readyState ? addEventListener("load", function() {
                return d(n)
            }, !0) : setTimeout(n, 0)
        },
        tf = function(n, t) {
            t = t || {};
            var i = f("TTFB"),
                r = e(n, i, sr, t.reportAllChanges);
            nf(function() {
                var u = p();
                u && (i.value = Math.max(u.responseStart - ot(), 0), i.entries = [u], r(!0), a(function() {
                    i = f("TTFB", 0);
                    (r = e(n, i, sr, t.reportAllChanges))(!0)
                }))
            })
        },
        eo = function(n, t) {
            tf(function(t) {
                var i = function(n) {
                    var r = {
                        waitingDuration: 0,
                        cacheDuration: 0,
                        dnsDuration: 0,
                        connectionDuration: 0,
                        requestDuration: 0
                    };
                    if (n.entries.length) {
                        var t = n.entries[0],
                            i = t.activationStart || 0,
                            u = Math.max((t.workerStart || t.fetchStart) - i, 0),
                            f = Math.max(t.domainLookupStart - i, 0),
                            e = Math.max(t.connectStart - i, 0),
                            o = Math.max(t.connectEnd - i, 0);
                        r = {
                            waitingDuration: u,
                            cacheDuration: f - u,
                            dnsDuration: e - f,
                            connectionDuration: o - e,
                            requestDuration: n.value - o,
                            navigationEntry: t
                        }
                    }
                    return Object.assign(n, {
                        attribution: r
                    })
                }(t);
                n(i)
            }, t)
        },
        ut = {
            passive: !0,
            capture: !0
        },
        rf = new Date,
        hr = function(n, t) {
            h || (h = t, rt = n, rr = new Date, lr(removeEventListener), cr())
        },
        cr = function() {
            if (rt >= 0 && rt < rr - rf) {
                var n = {
                    entryType: "first-input",
                    name: h.type,
                    target: h.target,
                    cancelable: h.cancelable,
                    startTime: h.timeStamp,
                    processingStart: h.timeStamp + rt
                };
                lt.forEach(function(t) {
                    t(n)
                });
                lt = []
            }
        },
        uf = function(n) {
            if (n.cancelable) {
                var t = (n.timeStamp > 1e12 ? new Date : performance.now()) - n.timeStamp;
                "pointerdown" == n.type ? function(n, t) {
                    var i = function() {
                            hr(n, t);
                            u()
                        },
                        r = function() {
                            u()
                        },
                        u = function() {
                            removeEventListener("pointerup", i, ut);
                            removeEventListener("pointercancel", r, ut)
                        };
                    addEventListener("pointerup", i, ut);
                    addEventListener("pointercancel", r, ut)
                }(t, n) : hr(t, n)
            }
        },
        lr = function(n) {
            ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function(t) {
                return n(t, uf, ut)
            })
        },
        ar = [100, 300],
        ff = function(n, t) {
            t = t || {};
            tt(function() {
                var r, c = pt(),
                    i = f("FID"),
                    o = function(n) {
                        n.startTime < c.firstHiddenTime && (i.value = n.processingStart - n.startTime, i.entries.push(n), r(!0))
                    },
                    s = function(n) {
                        n.forEach(o)
                    },
                    u = v("first-input", s);
                r = e(n, i, ar, t.reportAllChanges);
                u && (nt(st(function() {
                    s(u.takeRecords());
                    u.disconnect()
                })), a(function() {
                    var u;
                    i = f("FID");
                    r = e(n, i, ar, t.reportAllChanges);
                    lt = [];
                    rt = -1;
                    h = null;
                    lr(addEventListener);
                    u = o;
                    lt.push(u);
                    cr()
                }))
            })
        },
        oo = function(n, t) {
            ff(function(t) {
                var i = function(n) {
                    var t = n.entries[0],
                        i = {
                            eventTarget: et(t.target),
                            eventType: t.name,
                            eventTime: t.startTime,
                            eventEntry: t,
                            loadState: g(t.startTime)
                        };
                    return Object.assign(n, {
                        attribution: i
                    })
                }(t);
                n(i)
            }, t)
        },
        ft;
    (function(n) {
        n.Load = "load";
        n.BeforeUnload = "beforeunload";
        n.Abort = "abort";
        n.Error = "error";
        n.Unload = "unload"
    })(ft || (ft = {})),
    function(n) {
        n[n.None = 0] = "None";
        n[n.Loading = 1] = "Loading";
        n[n.Complete = 2] = "Complete";
        n[n.DomInteractive = 3] = "DomInteractive";
        n[n.DomContentLoaded = 4] = "DomContentLoaded"
    }(y || (y = {})),
    function(n) {
        n[n.Focus = 0] = "Focus";
        n[n.Blur = 1] = "Blur"
    }(c || (c = {})),
    function(n) {
        n[n.OnLoad = 0] = "OnLoad";
        n[n.OnBeforeUnload = 1] = "OnBeforeUnload";
        n[n.OnAbort = 2] = "OnAbort";
        n[n.Flush = 3] = "Flush"
    }(r || (r = {})),
    function(n) {
        n[n.DNS = 0] = "DNS";
        n[n.Connect = 1] = "Connect";
        n[n.Load = 2] = "Load";
        n[n.Wait = 3] = "Wait";
        n[n.Start = 4] = "Start";
        n[n.Redirect = 5] = "Redirect";
        n[n.Duration = 6] = "Duration";
        n[n.SSL = 7] = "SSL";
        n[n.TransferSize = 8] = "TransferSize"
    }(t || (t = {})),
    function(n) {
        n.UserId = "u";
        n.SessionId = "s";
        n.SessionTime = "t";
        n.PageViewCount = "c";
        n.UrlCheckSum = "k";
        n.PostFlag = "f"
    }(u || (u = {})),
    function(n) {
        n[n.GET = 0] = "GET";
        n[n.POST = 1] = "POST";
        n[n.HEAD = 2] = "HEAD";
        n[n.DELETE = 3] = "DELETE";
        n[n.OPTIONS = 4] = "OPTIONS";
        n[n.PUT = 5] = "PUT";
        n[n.TRACE = 6] = "TRACE";
        n[n.CONNECT = 7] = "CONNECT"
    }(ti || (ti = {}));
    var ef = function() {
            function n(n, t, i, r) {
                var u = this;
                this.getPerformanceTimings = function(n) {
                    u.connect = n.connectEnd - n.connectStart;
                    u.dns = n.domainLookupEnd - n.domainLookupStart;
                    u.duration = n.duration;
                    u.load = n.responseEnd - n.responseStart;
                    u.wait = n.responseStart - n.requestStart;
                    u.start = n.startTime;
                    u.redirect = n.redirectEnd - n.redirectStart;
                    n.secureConnectionStart && (u.ssl = n.connectEnd - n.secureConnectionStart)
                };
                this.url = n;
                this.method = t;
                this.isAsync = i;
                this.open = r
            }
            return n
        }(),
        vr = ef,
        of = function() {
            function n() {
                var t = this;
                this.fetchRequests = [];
                this.fetchEntriesIndices = {};
                this.compareEntriesDelay = 100;
                this.hasPerformance = typeof performance == "object" && typeof window.performance.now == "function" && typeof window.performance.getEntriesByType == "function";
                this.captureFetchRequests = function() {
                    var n = [],
                        i = t,
                        r = function(n) {
                            return n
                        },
                        u = function(n) {
                            return Promise.reject(n)
                        };
                    window.fetch && (window.fetch = function(t) {
                        return function() {
                            for (var o, f, s = [], e = 0; e < arguments.length; e++) s[e] = arguments[e];
                            return o = 0, f = Promise.resolve(s), f = f.then(function(t) {
                                var r, u = {},
                                    e, f;
                                if (t.length && t.length >= 1) r = t[0], t.length > 1 && (u = t[1]);
                                else return [];
                                return e = "GET", u.method && (e = u.method), o = n.length, f = "", f = typeof r != "object" || !r ? r : Array.isArray(r) && r.length > 0 ? r[0] : r.url, f && n.push(new vr(f, e, !0, i.now())), [r, u]
                            }, r), f = f.then(function(n) {
                                return t.apply(void 0, n)
                            }), f.then(function(t) {
                                var r = n[o],
                                    u = i.fetchRequests;
                                return i.processPerformanceEntries(r, u), t
                            }, u)
                        }
                    }(window.fetch))
                };
                this.captureFetchRequests();
                n.startAjaxCapture(this)
            }
            return n.prototype.getAjaxRequests = function() {
                return this.fetchRequests
            }, n.prototype.clear = function() {
                this.fetchRequests = []
            }, n.prototype.now = function() {
                return this.hasPerformance ? window.performance.now() : (new Date).getTime()
            }, n.prototype.processPerformanceEntries = function(n, t) {
                var i = this;
                setTimeout(function() {
                    var f, o, s, h, e;
                    if (i.hasPerformance) {
                        var u = n.url,
                            r = [],
                            c = performance.getEntriesByType("resource");
                        for (f = 0, o = c; f < o.length; f++) s = o[f], s.name === u && r.push(s);
                        if (t.push(n), r.length !== 0) {
                            if (i.fetchEntriesIndices[u] || (i.fetchEntriesIndices[u] = []), r.length === 1) {
                                n.getPerformanceTimings(r[0]);
                                i.fetchEntriesIndices[u].push(0);
                                return
                            }
                            h = i.fetchEntriesIndices[u];
                            for (e in r)
                                if (h.indexOf(e) === -1) {
                                    n.getPerformanceTimings(r[e]);
                                    h.push(e);
                                    return
                                }
                            n.getPerformanceTimings(r[0])
                        }
                    }
                }, i.compareEntriesDelay)
            }, n.startAjaxCapture = function(n) {
                var t = XMLHttpRequest.prototype,
                    r = t.open,
                    u = t.send,
                    i = [];
                n.hasPerformance && typeof window.performance.setResourceTimingBufferSize == "function" && window.performance.setResourceTimingBufferSize(300);
                t.open = function(t, u, f, e, o) {
                    this.rpIndex = i.length;
                    i.push(new vr(u, t, f, n.now()));
                    r.call(this, t, u, f === !1 ? !1 : !0, e, o)
                };
                t.send = function(t) {
                    var r = this,
                        e = this.onreadystatechange,
                        f;
                    (this.onreadystatechange = function(t) {
                        var u = i[r.rpIndex],
                            o, f;
                        if (u) {
                            o = r.readyState;
                            f = !!(r.response && r.response !== null && r.response !== undefined);
                            switch (o) {
                                case 1:
                                    u.connectionEstablished = n.now();
                                    break;
                                case 2:
                                    u.requestReceived = n.now();
                                    break;
                                case 3:
                                    u.processingTime = n.now();
                                    break;
                                case 4:
                                    u.complete = n.now();
                                    switch (r.responseType) {
                                        case "text":
                                        case "":
                                            typeof r.responseText == "string" && (u.responseSize = r.responseText.length);
                                            break;
                                        case "json":
                                            f && typeof r.response.toString == "function" && (u.responseSize = r.response.toString().length);
                                            break;
                                        case "arraybuffer":
                                            f && typeof r.response.byteLength == "number" && (u.responseSize = r.response.byteLength);
                                            break;
                                        case "blob":
                                            f && typeof r.response.size == "number" && (u.responseSize = r.response.size)
                                    }
                                    n.processPerformanceEntries(u, n.fetchRequests)
                            }
                            typeof e == "function" && e.call(r, t)
                        }
                    }, f = i[this.rpIndex], f) && (t && !isNaN(t.length) && (f.sendSize = t.length), f.send = n.now(), u.call(this, t))
                }
            }, n
        }(),
        sf = of ,
        hf = function() {
            function n() {
                this.events = [];
                this.hasAttachEvent = !!window.attachEvent
            }
            return n.prototype.add = function(n, t, i) {
                this.events.push({
                    type: n,
                    target: t,
                    func: i
                });
                this.hasAttachEvent ? t.attachEvent("on" + n, i) : t.addEventListener(n, i, !1)
            }, n.prototype.remove = function(n, t, i) {
                this.hasAttachEvent ? t.detachEvent(n, i) : t.removeEventListener(n, i, !1);
                var r = this.events.indexOf({
                    type: n,
                    target: t,
                    func: i
                });
                r !== 1 && this.events.splice(r, 1)
            }, n.prototype.clear = function() {
                for (var n, i = this.events, t = 0; t < i.length; t++) n = i[t], this.remove(n.type, n.target, n.func);
                this.events = []
            }, n
        }(),
        yr = hf,
        cf = function() {
            function n() {
                var n = this;
                this.hiddenStrings = ["hidden", "msHidden", "webkitHidden", "mozHidden"];
                this.visibilityStrings = ["visibilitychange", "msvisibilitychange", "webkitvisibilitychange", "mozvisibilitychange"];
                this.captureSoftNavigation = !1;
                this.hidden = "hidden";
                this.visibilityChange = "visibilitychange";
                this.visibilityEvents = [];
                this.eventManager = new yr;
                this.engagementTimeIntervalMs = 1e3;
                this.engagementTime = 0;
                this.firstEngagementTime = 0;
                this.lastEventTimeStamp = 0;
                this.timeoutId = undefined;
                this.startTime = (new Date).getTime();
                this.now = function() {
                    return (new Date).getTime()
                };
                this.startVisibilityCapture = function() {
                    n.initializeVisibilityProperties();
                    document.addEventListener(n.visibilityChange, n.captureFocusEvent, !1)
                };
                this.initializeVisibilityProperties = function() {
                    for (var r = n.hiddenStrings, i = 0, t = 0; t < r.length; t++) typeof document[r[t]] != "undefined" && (i = t);
                    n.visibilityChange = n.visibilityStrings[i];
                    n.hidden = n.hiddenStrings[i]
                };
                this.captureFocusEvent = function() {
                    n.updateVisibilityChangeTime();
                    document[n.hidden] || n.captureEngagementTime()
                };
                this.updateVisibilityChangeTime = function() {
                    document[n.hidden] ? n.captureVisibilityEvent(c.Blur) : n.captureVisibilityEvent(c.Focus)
                };
                this.onBlur = function() {
                    n.captureVisibilityEvent(c.Blur)
                };
                this.onFocus = function() {
                    n.captureVisibilityEvent(c.Focus)
                };
                this.captureVisibilityEvent = function(t) {
                    n.visibilityEvents.push({
                        type: t,
                        time: n.now()
                    })
                };
                this.captureEngagementTime = function(t) {
                    if (t === void 0 && (t = !0), !n.lastEventTimeStamp) {
                        n.engagementTime = n.engagementTimeIntervalMs;
                        n.lastEventTimeStamp = n.now();
                        return
                    }
                    var i = n.now() - n.lastEventTimeStamp;
                    if (n.lastEventTimeStamp = n.now(), t && n.firstEngagementTime === 0 && (n.firstEngagementTime = n.now()), i > 0 && i < n.engagementTimeIntervalMs) {
                        clearTimeout(n.timeoutId);
                        n.engagementTime += i;
                        return
                    }
                    n.startTimer()
                };
                this.captureMouseMove = function() {
                    n.captureEngagementTime(!1)
                };
                this.startTimer = function() {
                    n.timeoutId = window.setTimeout(function() {
                        n.engagementTime += n.engagementTimeIntervalMs
                    }, n.engagementTimeIntervalMs)
                };
                this.getFocusAwayTime = function() {
                    var i = n.visibilityEvents,
                        t = -1,
                        s, h, o;
                    if (i.length === 0) return 0;
                    for (var r = t, u = 0, f = t, e = 0; u < i.length;) i[u].type === c.Blur && r === t && (r = u), s = f === t && r !== t, i[u].type === c.Focus && s && (f = u), h = r !== t && f !== t, h && (o = i[f].time - i[r].time, o > 0 && (e += o), r = t, f = t), u = u + 1;
                    return r === i.length - 1 && (e += n.now() - i[r].time), e
                };
                this.getEngagementTime = function() {
                    return n.engagementTime
                };
                this.getStartTime = function() {
                    return n.startTime
                };
                this.getFirstEngagementTime = function() {
                    return n.firstEngagementTime
                };
                this.startSoftNavigationCapture = function() {
                    n.captureSoftNavigation = !0
                };
                this.resetSoftNavigationCapture = function() {
                    n.resetEngagementMetrics();
                    n.visibilityEvents = []
                };
                this.resetEngagementMetrics = function() {
                    n.engagementTime = 0;
                    n.lastEventTimeStamp = n.now();
                    n.firstEngagementTime = 0
                };
                this.clear = function() {
                    n.eventManager.clear()
                };
                this.captureEngagementTime(!1);
                this.eventManager.add("scroll", document, this.captureEngagementTime);
                this.eventManager.add("resize", window, this.captureEngagementTime);
                this.eventManager.add("mouseup", document, this.captureEngagementTime);
                this.eventManager.add("keyup", document, this.captureEngagementTime);
                this.eventManager.add("mousemove", document, this.captureMouseMove);
                this.eventManager.add("focus", window, this.onFocus);
                this.eventManager.add("blur", window, this.onBlur);
                this.eventManager.add("focus", document, this.onFocus);
                this.eventManager.add("blur", document, this.onBlur)
            }
            return n
        }(),
        lf = cf,
        af = function() {
            function n(n, t, i) {
                this.count = 0;
                this.message = n;
                this.url = t;
                this.lineNumber = i
            }
            return n.createText = function(n, t, i) {
                return [n, t, i].join(":")
            }, n.prototype.getText = function() {
                return n.createText(this.message, this.url, this.lineNumber)
            }, n
        }(),
        pr = af,
        at = undefined && undefined.__assign || function() {
            return at = Object.assign || function(n) {
                for (var t, r, i = 1, u = arguments.length; i < u; i++) {
                    t = arguments[i];
                    for (r in t) Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r])
                }
                return n
            }, at.apply(this, arguments)
        },
        vf = function() {
            function t() {}
            t.now = function() {
                return (new Date).getTime()
            };
            t.setWindowEvent = function() {
                n.windowEvent = this.pageWindow.WindowEvent
            };
            t.setRProfiler = function() {
                n.profiler = this.pageWindow.RProfiler
            };
            t.setWindowEventDef = function() {
                var t, i, r, u, f;
                n.windowEventDef = {
                    Load: (t = n.windowEvent) === null || t === void 0 ? void 0 : t.Load,
                    BeforeUnload: (i = n.windowEvent) === null || i === void 0 ? void 0 : i.BeforeUnload,
                    Unload: (r = n.windowEvent) === null || r === void 0 ? void 0 : r.Unload,
                    Abort: (u = n.windowEvent) === null || u === void 0 ? void 0 : u.Abort,
                    Error: (f = n.windowEvent) === null || f === void 0 ? void 0 : f.Error
                }
            };
            t.setAppConfig = function(t) {
                n.config = at(at({}, n.config), t)
            };
            t.initValues = function() {
                n.setWindowEvent();
                n.setRProfiler();
                n.setWindowEventDef()
            };
            t.getConfig = function() {
                return n.config
            };
            var i, r, u, f, e, n;
            return n = t, t.pageWindow = parent.window, t.location = n.pageWindow.location, t.profiler = n.pageWindow.RProfiler, t.windowEvent = n.pageWindow.WindowEvent, t.protocol = n.location.protocol + "//", t.windowEventDef = {
                Load: (i = n.windowEvent) === null || i === void 0 ? void 0 : i.Load,
                BeforeUnload: (r = n.windowEvent) === null || r === void 0 ? void 0 : r.BeforeUnload,
                Unload: (u = n.windowEvent) === null || u === void 0 ? void 0 : u.Unload,
                Abort: (f = n.windowEvent) === null || f === void 0 ? void 0 : f.Abort,
                Error: (e = n.windowEvent) === null || e === void 0 ? void 0 : e.Error
            }, t.hasPerformanceApi = !!n.pageWindow.performance && typeof n.pageWindow.performance == "object", t.hasGetEntriesApi = n.hasPerformanceApi && typeof n.pageWindow.performance.getEntriesByType == "function", t.testUserId = "test", t.version = "v4.0.8", t.config = {
                sampleRate: -999,
                waterfallSampleRate: -888,
                postUrl: n.protocol + "rjs.3gl.net/hawklogserver/r.p",
                siteId: 12733,
                debugParameter: "GlimpseDebug",
                debugUrl: "g.3gl.net/jp/v4.0.8/D",
                waterfallParameter: "GlimpseWaterfall",
                sendOnLoad: !1,
                clearResources: !0,
                ajaxDomains: "",
                useBenchmark: !1,
                lastMileUrl: n.protocol + "g.3gl.net/jp/12733/v4.0.8/LastMileScript.js",
                benchMarkPageGroups: ""
            }, t
        }(),
        n = vf,
        yf = function() {
            function n() {
                this.hasErrors = !1;
                this._appErrors = null;
                this.hasIndicators = !1;
                this._indicators = null;
                this.hasTracepoints = !1;
                this._tracepoints = null
            }
            return n.prototype.addError = function(n, t) {
                this.hasErrors || (this._appErrors = {}, this.hasErrors = !0);
                this._appErrors[n] = t
            }, n.prototype.getErrors = function() {
                return this._appErrors
            }, n.prototype.addIndicator = function(n) {
                this.hasIndicators || (this._indicators = {}, this.hasIndicators = !0);
                for (var t in n) this._indicators[t] = n[t]
            }, n.prototype.getIndicators = function() {
                return this._indicators
            }, n.prototype.addTracepoint = function(n) {
                this.hasTracepoints || (this._tracepoints = {}, this.hasTracepoints = !0);
                for (var t in n) this._tracepoints[t] = n[t]
            }, n.prototype.getTracepoints = function() {
                return this._tracepoints
            }, n
        }(),
        pf = yf,
        wf = function() {
            function i() {}
            return i.getValue = function(n, r) {
                var u = n.responseStart !== 0;
                switch (r) {
                    case t.DNS:
                        return i.getMetricValue(n.domainLookupEnd, n.domainLookupStart, u);
                    case t.Connect:
                        return i.getMetricValue(n.connectEnd, n.connectStart, u);
                    case t.Load:
                        return i.getMetricValue(n.responseEnd, n.responseStart, u);
                    case t.Wait:
                        return i.getMetricValue(n.responseStart, n.requestStart, u);
                    case t.Start:
                        return n.startTime;
                    case t.Redirect:
                        return i.getMetricValue(n.redirectEnd, n.redirectStart);
                    case t.Duration:
                        return n.duration;
                    case t.SSL:
                        if (n.secureConnectionStart) return u ? n.connectEnd - n.secureConnectionStart : null;
                        break;
                    case t.TransferSize:
                        return n.transferSize
                }
                return 0
            }, i.getMetricValue = function(n, t, i) {
                if (i === void 0 && (i = !0), i) {
                    if (n >= 0 && n >= t && t >= 0) {
                        var r = n - t;
                        return Math.round(r)
                    }
                } else return null
            }, i.getRoundedValue = function(n) {
                return n ? Math.round(n) : n
            }, i.getQueryStringValue = function(n) {
                for (var u = location.search.substring(1), r = u.split("&"), t, i = 0; i < r.length; i++)
                    if (t = r[i].split("="), t[0] == n) return t[1];
                return ""
            }, i.stopEvents = function() {
                n.profiler && (n.profiler.eventManager.clear(), n.profiler.getEventTimingHandler().clear())
            }, i.getLoadStateEnum = function(n) {
                switch (n) {
                    case "loading":
                        return y.Loading;
                    case "dom-content-loaded":
                        return y.DomContentLoaded;
                    case "dom-interactive":
                        return y.DomInteractive;
                    case "complete":
                        return y.Complete;
                    default:
                        return y.None
                }
            }, i.getNavigationTime = function() {
                var i = null,
                    t = n.hasGetEntriesApi && n.pageWindow.performance.getEntriesByType("navigation");
                return t && t.length !== 0 && (i = t[0]), i
            }, i.getNavigationStart = function(n) {
                var t = n;
                return t.startTime
            }, i
        }(),
        i = wf,
        bf = function() {
            function n(n) {
                this.dns = null;
                this.connect = null;
                this.load = null;
                this.wait = null;
                this.start = 0;
                this.duration = 0;
                this.redirect = 0;
                this.ssl = null;
                this.url = n.name;
                var r = i.getValue;
                this.dns = r(n, t.DNS);
                this.connect = r(n, t.Connect);
                this.wait = r(n, t.Wait);
                this.load = r(n, t.Load);
                this.start = r(n, t.Start);
                this.duration = r(n, t.Duration);
                this.redirect = r(n, t.Redirect);
                this.ssl = r(n, t.SSL);
                this.transferSize = r(n, t.TransferSize)
            }
            return Object.defineProperty(n.prototype, "url", {
                get: function() {
                    return this._url
                },
                set: function(n) {
                    var i, t, u, r;
                    n.indexOf("http://") !== -1 ? this.protocol = 0 : n.indexOf("https://") !== -1 && (this.protocol = 1);
                    i = n.split("/").slice(1, 3).join("");
                    t = i.indexOf(":");
                    t != -1 && (u = i.substr(t + 1), r = parseInt(u), isNaN(r) || (this.port = r));
                    n = n.substr(n.indexOf(i) + i.length);
                    t = n.indexOf("?");
                    t != -1 && (n = n.substr(0, t));
                    t = n.indexOf("#");
                    t != -1 && (n = n.substr(0, t));
                    n = n.substr(0, 64);
                    this._url = n
                },
                enumerable: !1,
                configurable: !0
            }), n.prototype.translateForPost = function() {
                var t = i.getRoundedValue,
                    r = {
                        u: this.url,
                        pr: this.protocol
                    },
                    n = function(n, t) {
                        typeof t != "number" || isNaN(t) || (r[n] = t)
                    };
                return n("pt", this.port), n("dn", t(this.dns)), n("fc", t(this.connect)), n("ld", t(this.load)), n("wt", t(this.wait)), n("st", t(this.start)), n("rd", t(this.redirect)), n("dr", t(this.duration)), n("ssl", t(this.ssl)), n("ts", this.transferSize), r
            }, n
        }(),
        wr = bf,
        kf = undefined && undefined.__extends || function() {
            var n = function(t, i) {
                return n = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(n, t) {
                    n.__proto__ = t
                } || function(n, t) {
                    for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
                }, n(t, i)
            };
            return function(t, i) {
                function r() {
                    this.constructor = t
                }
                if (typeof i != "function" && i !== null) throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
                n(t, i);
                t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype, new r)
            }
        }(),
        df = function(n) {
            function r(t, i, r) {
                var u = n.call(this, i) || this;
                return u.responseTime = 0, u.sendSize = 0, u.responseSize = 0, u.method = ti[t.method.toUpperCase()], t.complete && t.connectionEstablished && (u.responseTime = t.complete - t.connectionEstablished), u.isSummary = r, r ? (u.start = undefined, u.count = 1) : u.isAsync = t.isAsync, u.sendSize = t.sendSize || 0, u.responseSize = t.responseSize || 0, u
            }
            return kf(r, n), r.prototype.update = function(n, r) {
                var u = i.getValue;
                r.responseStart && (this.dns += u(r, t.DNS), this.connect += u(r, t.Connect), this.wait += u(r, t.Wait), this.load += u(r, t.Load), this.ssl += u(r, t.SSL));
                this.duration += u(r, t.Duration);
                this.redirect += u(r, t.Redirect);
                this.sendSize += n.sendSize || 0;
                this.responseSize += n.responseSize || 0;
                this.count++
            }, r.prototype.translateForPost = function() {
                var t = n.prototype.translateForPost.call(this);
                return this.isSummary ? t.n = this.count : t.ia = this.isAsync ? 1 : 0, t.md = this.method, t.rp = Math.round(this.responseTime), t.ss = this.sendSize, t.rs = this.responseSize, t
            }, r
        }(wr),
        br = df,
        gf = function() {
            function n() {
                this.count = 0;
                this.dns = null;
                this.connect = null;
                this.load = null;
                this.wait = null;
                this.duration = 0;
                this.redirect = 0;
                this.ssl = null
            }
            return n.prototype.addAjaxItem = function(n, t) {
                var i, r, u, f;
                if (this.update(t), i = new br(n, t, !0), typeof this._ajax == "undefined") {
                    this._ajax = [];
                    this._ajax.push(i);
                    return
                }
                for (r = 0, u = this._ajax; r < u.length; r++)
                    if (f = u[r], f.url == i.url) {
                        f.update(n, t);
                        return
                    }
                this._ajax.length < 10 && this._ajax.push(i)
            }, n.prototype.update = function(n) {
                var r = i.getValue;
                n.responseStart && (this.dns += r(n, t.DNS), this.connect += r(n, t.Connect), this.wait += r(n, t.Wait), this.load += r(n, t.Load), this.ssl += r(n, t.SSL));
                this.duration += r(n, t.Duration);
                this.redirect += r(n, t.Redirect);
                this.count++
            }, n.prototype.translateForPost = function() {
                var n = i.getRoundedValue,
                    f = {
                        n: this.count,
                        dn: n(this.dns),
                        fc: n(this.connect),
                        ld: n(this.load),
                        wt: n(this.wait),
                        dr: n(this.duration),
                        rd: n(this.redirect),
                        ssl: n(this.ssl)
                    },
                    r, t, u, e;
                if (this._ajax) {
                    for (r = [], t = 0, u = this._ajax; t < u.length; t++) e = u[t], r.push(e.translateForPost());
                    f.ax = r
                }
                return f
            }, n
        }(),
        ne = gf,
        te = function() {
            function n() {
                this._resources = []
            }
            return n.prototype.translateForPost = function() {
                for (var r, t = [], n = 0, i = this._resources; n < i.length; n++) r = i[n], t.push(r.translateForPost());
                return t
            }, n.prototype.addItem = function(n) {
                var t = new wr(n);
                this._resources.push(t)
            }, n.prototype.addAjaxItem = function(n, t) {
                var i = new br(n, t, !1);
                this._resources.push(i)
            }, n
        }(),
        ie = te,
        re = function() {
            function n(n) {
                this.char = n;
                this.children = []
            }
            return n
        }(),
        kr = re,
        ue = function() {
            function n() {
                this.root = new kr("");
                this.isReversed = !0
            }
            return n.prototype.add = function(n, t) {
                var u, i, f, e, r;
                for (n === void 0 && (n = this.root), u = n.children, i = 0, f = u; i < f.length; i++)
                    if (e = f[i], e.char == t) return e;
                return r = new kr(t), u.push(r), r.parent = n, r
            }, n.prototype.toObject = function() {
                var n = {},
                    t = this.isReversed;
                return function i(n, r) {
                    var o = n.char == "",
                        e, u, f;
                    if (o) e = r;
                    else {
                        if (u = n.char, n.children.length == 1)
                            while (n.children.length == 1) n = n.children[0], u = t ? n.char + u : u + n.char, n.data && (r[u] = n.data);
                        r[u] = n.data || {};
                        e = r[u]
                    }
                    for (f = 0; f < n.children.length; f++) i(n.children[f], e)
                }(this.root, n), n
            }, n
        }(),
        dr = ue,
        fe = undefined && undefined.__extends || function() {
            var n = function(t, i) {
                return n = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(n, t) {
                    n.__proto__ = t
                } || function(n, t) {
                    for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
                }, n(t, i)
            };
            return function(t, i) {
                function r() {
                    this.constructor = t
                }
                if (typeof i != "function" && i !== null) throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
                n(t, i);
                t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype, new r)
            }
        }(),
        ee = function(t) {
            function i() {
                var n = t !== null && t.apply(this, arguments) || this;
                return n.maxJsErrors = 10, n.charCodes = {
                    "\b": "\\b",
                    "\t": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\",
                    "&": "%26"
                }, n.strRegex = /["&\\\x00-\x1f\x7f-\x9f]/g, n
            }
            return fe(i, t), i.prototype.toString = function(n, t) {
                var i = this.translateForPost(n, t);
                return typeof JSON == "undefined" ? this.jsonStringify(i) : JSON.stringify(i)
            }, i.prototype.strEscape = function(n) {
                var i = this.charCodes[n],
                    t;
                return i ? i : (t = n.charCodeAt(0), "\\u00" + Math.floor(t / 16).toString(16) + (t % 16).toString(16))
            }, i.prototype.jsonStringify = function(n) {
                var t = [],
                    i, u, e, r, f;
                switch (typeof n) {
                    case "string":
                        return this.strRegex.test(n) ? '"' + n.replace(this.strRegex, this.strEscape) + '"' : '"' + n + '"';
                    case "number":
                        return isFinite(n) ? String(n) : "null";
                    case "boolean":
                        return String(n);
                    case "object":
                        if (!n) return "null";
                        if (n.constructor === Date, typeof n.length == "number" && !n.propertyIsEnumerable("length")) {
                            for (i = 0, u = n; i < u.length; i++) e = u[i], t.push(this.jsonStringify(e));
                            return "[" + t.join(",") + "]"
                        }
                        for (r in n) typeof r == "string" && (f = this.jsonStringify(n[r]), !f || t.push(this.jsonStringify(r) + ":" + f));
                        return "{" + t.join(",") + "}"
                }
                return ""
            }, i.prototype.translateForPost = function(t, i) {
                var s = this.viewCount > 1,
                    u = {},
                    e, f, o;
                if (u.v = n.version, u.pt = this.postType, u.ui = this.userId, u.si = this.sessionId, u.di = this.siteId, u.pi = this.pageViewId, u.jsc = this.jsErrorCount || 0, u.rf = this.referrer, u.pc = this.pageViewCount, u.vc = this.viewCount, u.rc = this.redirectCount || 0, this.jsErrors && this.jsErrors.length > 0) {
                    for (e = [], f = 0; f < Math.min(this.jsErrors.length, this.maxJsErrors); f++) e.push(this.translateErrorForPost(this.jsErrors[f]));
                    u.jse = e
                }
                return this.hasErrors && (u.ae = this.getErrors()), this.pageGroup && (u.pg = this.pageGroup), this.variation && (u.ab = this.variation), (this.resources || this.ajaxRequests) && (o = this.translateResources(this.resources, this.ajaxRequests), u.res = o.summary, i && (u.wf = o.waterfall)), typeof this.isNewView == "boolean" && (u.nv = this.isNewView ? 1 : 0), this.hasIndicators && (u.ind = this.getIndicators()), this.hasTracepoints && (u.tra = this.getTracepoints()), this.isConversion && (u.cv = this.isConversion ? 1 : 0, this.revenue && (u.rv = this.revenue), this.revenueItems && (u.ri = this.revenueItems)), u.np = this.isNewPageView ? 1 : 0, (t === r.OnLoad || t === r.OnAbort) && (u.dh = this.screenHeight, u.dw = this.screenWidth, this.isNewPageView && (u.dn = Math.round(this.dns), u.fc = Math.round(this.fullConnect), u.wt = Math.round(this.wait), u.ld = Math.round(this.load), u.de = this.domInteractive, u.dl = this.domLoaded, u.dc = this.docComplete, u.rp = this.response, u.cl = this.contentLoad, u.rd = this.redirect, u.rc = this.redirectCount || 0, u.cls = this.cls, u.lcp = this.lcp, u.inp = this.inp, u.frc = this.frc, u.fec = this.fec, u.fdc = this.fdc, u.ftc = this.ftc, this.secureConnect && (u.sc = this.secureConnect), this.exitToEntry && (u.xe = this.exitToEntry), this.entryToOnLoad && (u.el = this.entryToOnLoad), this.prerender && (u.pr = this.prerender))), t === r.OnBeforeUnload && (u.maf = this.markAboveTheFold, u.mfl = this.markFullyLoaded, u.mfv = this.markFullyVisible, u.mtu = this.markTimeToUserAction, u.tp = this.timeOnPage, u.tti = this.timeToInteract, u.et = this.engagementTime, u.fet = this.firstEngagementTime, u.vct = this.visComplete, s || (u.fp = this.firstPaint, u.fcp = this.firstContentPaint, u.cls = this.cls, u.lcp = this.lcp, u.inp = this.inp, u.frc = this.frc, u.fec = this.fec, u.fdc = this.fdc, u.ftc = this.ftc, u.inpDe = this.inpDe)), (t === r.OnBeforeUnload || t === r.OnAbort) && (u.rqc = this.rqc), u
            }, i.prototype.translateErrorForPost = function(n) {
                var i = {},
                    t, r;
                return i.m = n.message, i.n = n.lineNumber, i.c = n.count + 1, t = n.url, t && (r = t.indexOf("?"), r != -1 && (t = t.substr(0, r))), i.u = t, i
            }, i.prototype.translateResources = function(n, t) {
                var g = this,
                    b = !!n,
                    k = !!t,
                    d, r, s, v, u, i, y, o, h, p, c, w, a, f, e, l;
                if (!b && !k) return null;
                if (d = function(n) {
                        var c, r, o, h, e, i;
                        if (!b || !k) return null;
                        for (c = g.filterAjaxResources(t), r = 0, o = c; r < o.length; r++) {
                            var s = o[r],
                                u = s.url,
                                f = "";
                            if (u && u.indexOf("http") != 0) {
                                for (h = 0, e = location.href, i = 0; i < e.length; i++)
                                    if (e[i] === "/" && (h += 1), h === 3) {
                                        f = e.slice(0, i);
                                        f = f + u;
                                        break
                                    }
                                if (f === n.name) return s
                            }
                            if (u === n.name) return s
                        }
                        return null
                    }, r = {}, n)
                    for (s = 0, v = n; s < v.length; s++)(u = v[s], u) && (i = u.name.split("/").slice(1, 3).join(""), i && i.length != 0) && (y = i.indexOf(":"), y != -1 && (i = i.substr(0, y)), r.hasOwnProperty(i) || (r[i] = {
                        summary: new ne,
                        waterfall: new ie
                    }), o = r[i], h = d(u), h ? (o.summary.addAjaxItem(h, u), o.waterfall.addAjaxItem(h, u)) : (o.summary.update(u), o.waterfall.addItem(u)));
                p = new dr;
                for (c in r) {
                    for (f = undefined, e = c.length - 1; e >= 0; e--) l = c[e], f = p.add(f, l);
                    f.data = r[c].summary.translateForPost()
                }
                w = new dr;
                for (a in r) {
                    for (f = undefined, e = a.length - 1; e >= 0; e--) l = a[e], f = w.add(f, l);
                    f.data = r[a].waterfall.translateForPost()
                }
                return {
                    summary: p.toObject(),
                    waterfall: w.toObject()
                }
            }, i.prototype.filterAjaxResources = function(t) {
                if (n.config.ajaxDomains === "" || n.config.ajaxDomains === undefined) return t;
                var u = function(n) {
                        var t = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/.exec(n);
                        if (t !== null) return t[1]
                    },
                    i = function(n) {
                        var t = /([a-z\-0-9]{2,63})\.([a-z\.]{2,5})$/.exec(n);
                        return t && t[0]
                    },
                    r = function(n) {
                        var t = /(http|https)?:\/\/(\S+)/g.test(n);
                        return t ? n : "https://".concat(n)
                    },
                    f = n.config.ajaxDomains.split(",");
                return t.filter(function(n) {
                    var t = u(n.url),
                        e = r(n.url),
                        o = new URL(e).host,
                        s = i(o);
                    return f.some(function(n) {
                        var o = r(n),
                            u = new URL(o).host,
                            f = u.replace("www.", ""),
                            e = i(u),
                            h = f !== e;
                        return h ? f === t : s === e
                    })
                })
            }, i
        }(pf),
        oe = ee,
        se = function() {
            function t() {}
            return t.save = function(i) {
                if (t.canUseLocalStorage()) {
                    n.pageWindow.localStorage.setItem(t.storeKey, i);
                    return
                }
                t.setCookie(i)
            }, t.read = function() {
                if (t.canUseLocalStorage()) {
                    var i = n.pageWindow.localStorage.getItem(t.storeKey);
                    if (i) return i
                }
                return this.readCookie()
            }, t.canUseLocalStorage = function() {
                var r = !0,
                    i, u, f;
                try {
                    i = t.storeKey + "delete";
                    u = i + 0;
                    n.pageWindow.localStorage.setItem(i, u);
                    f = n.pageWindow.localStorage.getItem(i);
                    r = u === f;
                    r && n.pageWindow.localStorage.removeItem(i)
                } catch (e) {
                    r = !1
                }
                return r
            }, t.setCookie = function(i) {
                var r = new Date;
                r.setTime(r.getTime() + t.cookieExpireDays * 864e5);
                var e = "; expires=" + r.toUTCString(),
                    u = n.pageWindow.document.domain.split("."),
                    f = u.length,
                    o = u[f - 2] + "." + u[f - 1];
                document.cookie = t.storeKey + "=" + encodeURIComponent(i) + e + "; path=/; domain=" + o + "; SameSite=Lax;"
            }, t.readCookie = function() {
                for (var i, f = n.pageWindow.document.cookie.split(";"), e = t.storeRegex, r = 0, u = f; r < u.length; r++)
                    if (i = u[r], e.test(i)) return decodeURIComponent(i.substring(i.indexOf("=") + 1, i.length));
                return ""
            }, t.cookieExpireDays = 365, t.storeKey = "__CG", t.storeRegex = new RegExp("^(\\s)*" + t.storeKey + "=", "i"), t
        }(),
        gr = se,
        he = function() {
            function n() {
                this.userId = -1;
                this.sessionId = 0;
                this.sessionTime = 0;
                this.pageViewCount = 0;
                this.viewCount = 0;
                this.pageViewId = 0;
                this.postFlag = -1;
                this.sendWaterfall = !1;
                this.exitToEntry = 0
            }
            return n.prototype.resetViewCount = function() {
                this.viewCount = 1
            }, n.prototype.save = function() {
                var n = this.getText();
                gr.save(n)
            }, n.prototype.load = function() {
                var e = gr.read(),
                    o, r, f, s, i, t, h, n;
                if (!e) return !1;
                for (o = e.split(","), r = 0, f = o; r < f.length; r++)
                    if (s = f[r], i = s.split(":"), i.length === 2) {
                        if (t = i[0], typeof t == "string" && (t = t.trim()), h = i[1], t === u.UrlCheckSum) {
                            this.urlCheckSum = h;
                            continue
                        }
                        if (n = parseInt(i[1], 10), !isNaN(n)) switch (t) {
                            case u.UserId:
                                this.userId = n;
                                break;
                            case u.SessionId:
                                this.sessionId = n;
                                break;
                            case u.SessionTime:
                                this.sessionTime = n;
                                break;
                            case u.PageViewCount:
                                this.pageViewCount = n;
                                break;
                            case u.PostFlag:
                                this.postFlag = n
                        }
                    }
                return !0
            }, n.prototype.getText = function() {
                var n = u.UserId + ":" + this.userId + ",";
                return n += u.SessionId + ":" + this.sessionId + ",", n += u.SessionTime + ":" + this.sessionTime + ",", n += u.PageViewCount + ":" + this.pageViewCount + ",", n += u.UrlCheckSum + ":" + this.urlCheckSum + ",", n + (u.PostFlag + ":" + this.postFlag)
            }, n
        }(),
        ce = he,
        le = function() {
            function t() {
                this.sessionExpire = 18e5;
                this.store = new ce
            }
            return t.prototype.updateSessionTime = function() {
                if (this.store) {
                    var n = (new Date).getTime();
                    n - this.store.sessionTime > this.sessionExpire && (this.store.sessionId = 0);
                    this.store.sessionTime = n;
                    this.updateStore()
                }
            }, t.prototype.updateStore = function() {
                this.store && this.store.save()
            }, t.prototype.initStore = function() {
                var n = this.store.load();
                !n
            }, t.prototype.checkAndResetPostFlags = function() {
                var t, i;
                if (this.store.postFlag = 0, n.config.sampleRate < 0) {
                    this.store.postFlag = -1;
                    return
                }
                t = this.getUserId(n.config.sampleRate / 100);
                this.store.userId <= t && (this.store.postFlag = 1, i = t / (100 / n.config.waterfallSampleRate), this.store.sendWaterfall = this.store.userId <= i)
            }, t.prototype.getReferrer = function(n) {
                for (var i = this.getHostName(n).replace(":", "-"), r = n.indexOf("?"), u = 0, t = i.length; t < n.length; t++) u += n.charCodeAt(t) % t;
                return i + "/" + (r < 0 ? n.length : r) + "/" + n.length + "/" + u
            }, t.prototype.getHostName = function(n) {
                var i = n.indexOf("//") + 2,
                    t = n.indexOf("/", i);
                return i < 2 && t == -1 ? n : (t == -1 && (t = n.length), n.substring(i, t))
            }, t.prototype.init = function() {
                var t = n.profiler.data.start;
                return this.initStore(), (this.store.userId == -1 || this.store.userId == n.testUserId) && (this.store.userId = this.getUserId()), this.checkAndResetPostFlags(), this.store.sessionId == 0 || t - this.store.sessionTime > this.sessionExpire ? (this.store.sessionId = Math.floor(1 + Math.random() * ((Math.pow(2, 32) - 2) / 2)), this.store.pageViewCount = 1) : (this.store.pageViewCount < 65535 && this.store.pageViewCount++, this.getReferrer(n.pageWindow.document.referrer) == this.store.urlCheckSum && this.store.sessionTime > 0 && (this.store.exitToEntry = t - this.store.sessionTime)), this.store.sessionTime = (new Date).getTime(), this.store.pageViewId = Math.floor(1 + Math.random() * ((Math.pow(2, 16) - 2) / 2)), this.store.urlCheckSum = this.getReferrer(n.pageWindow.location.href), this.store.resetViewCount(), this.updateStore(), this.store.load()
            }, t.prototype.getUserId = function(n) {
                n === void 0 && (n = Math.random());
                return Math.floor(1 + n * ((Math.pow(2, 64) - 2) / 2))
            }, t.prototype.shouldPost = function() {
                return this.store.postFlag == 1
            }, t
        }(),
        ae = le,
        ve = function() {
            function t(t) {
                var r = this,
                    u;
                this.longTaskEndTime = 0;
                this.waitTime = 5e3;
                this.performanceObserverApi = n.pageWindow.PerformanceObserver;
                this.performanceLongTaskTiming = n.pageWindow.PerformanceLongTaskTiming;
                this.nowTime = 0;
                this.isSoftnav = !1;
                this.getDomContentLoad = function() {
                    var n = i.getNavigationTime(),
                        t, r;
                    if (n) return t = i.getNavigationStart(n), r = i.getMetricValue(n.domContentLoadedEventEnd, t), r
                };
                this.observeLongTask = function(n) {
                    for (var t = 0; t < n.length; t++) {
                        var i = n[t],
                            u = r.isSoftnav ? i.startTime - r.nowTime : i.startTime,
                            f = u - r.longTaskEndTime;
                        f >= r.waitTime ? r.performanceObserver.disconnect() : r.setLongTaskTime(i)
                    }
                };
                this.setLongTaskTime = function(n) {
                    var t = Math.round(n.startTime + n.duration);
                    r.longTaskEndTime = t
                };
                this.getLongTaskTime = function() {
                    return r.longTaskEndTime
                };
                this.performanceLongTaskTiming && (this.isSoftnav = t, this.nowTime = n.pageWindow.performance.now(), u = this.getDomContentLoad(), t || (this.longTaskEndTime = u), this.observe(["longtask"], this.observeLongTask))
            }
            return t.prototype.observe = function(n, t) {
                this.performanceObserverApi && (this.performanceObserver = new this.performanceObserverApi(function(n) {
                    var i = n.getEntries();
                    t(i)
                }), this.performanceObserver.observe({
                    entryTypes: n
                }))
            }, t
        }(),
        nu = ve,
        ii = new nu(!1),
        ye = function() {
            function t() {
                var t = this,
                    s, u, f, e, o;
                if (this.visitor = new ae, this.postUrl = n.config.postUrl, this.didSendInitial = !1, this.isDebugging = !1, this.countResourcesSent = 0, this.didSoftNavigation = !1, this.currentUrl = "", this.softNavigationStart = 0, this.MaxNumberOfPerformanceMarks = 1e3, this.updatePerformanceMetrics = function(n) {
                        var t = i.getNavigationTime();
                        if (t) {
                            var f = t,
                                r = i.getNavigationStart(t),
                                e = f.loadEventEnd,
                                u = t.responseStart;
                            n.dns = u ? t.domainLookupEnd - t.domainLookupStart : null;
                            n.fullConnect = u ? t.connectEnd - t.connectStart : null;
                            n.wait = u ? t.responseStart - t.requestStart : null;
                            n.load = u ? t.responseEnd - t.responseStart : null;
                            n.domInteractive = i.getMetricValue(t.domInteractive, r);
                            n.domLoaded = i.getMetricValue(t.domContentLoadedEventStart, r);
                            n.docComplete = i.getMetricValue(t.domComplete, r);
                            n.response = i.getMetricValue(t.responseEnd, r);
                            n.contentLoad = i.getMetricValue(t.loadEventStart, e);
                            n.redirect = t.redirectEnd - t.redirectStart;
                            t.secureConnectionStart && (n.secureConnect = t.connectEnd - t.secureConnectionStart)
                        }
                    }, this.updateResources = function(i, u) {
                        if (n.hasPerformanceApi) {
                            var f = [];
                            n.hasGetEntriesApi && (f = n.pageWindow.performance.getEntriesByType("resource"));
                            i != r.OnLoad && (t.setClearResources(), n.config.clearResources && n.pageWindow.performance.clearResourceTimings ? (u.resources = f, u.rqc = f.length, n.pageWindow.performance.clearResourceTimings()) : (u.resources = f.slice(t.countResourcesSent), t.countResourcesSent = f.length))
                        }
                    }, this.getTimeOnPage = function(i) {
                        var r = t.getFocusAwayTime(),
                            u = t.getNavigationStart(i);
                        return n.now() - u - r
                    }, this.getVisuallyComplete = function(t) {
                        if (n.pageWindow.CPVisuallyComplete) {
                            var i = n.pageWindow.CPVisuallyComplete.getValue(t);
                            if (typeof i == "number" && i >= 0) return i
                        }
                    }, this.updateEngagementMetrics = function(r, u) {
                        var f, e;
                        if (n.hasGetEntriesApi && (f = n.pageWindow.performance.getEntriesByType("paint"), f && f.length > 0 && (r.firstPaint = t.getPaintTimings(f, "first-paint"))), e = i.getNavigationTime(), e) {
                            var h = i.getNavigationStart(e),
                                o = i.getMetricValue(e.domContentLoadedEventEnd, h),
                                s = ii.getLongTaskTime();
                            r.timeToInteract = u ? s || t.getVisuallyComplete(u) : o && o < s ? s : o
                        }
                        n.profiler.getEventTimingHandler && (r.engagementTime = n.profiler.getEventTimingHandler().getEngagementTime(), r.timeOnPage = t.getTimeOnPage(u), r.firstEngagementTime = t.getFirstEngagementTime(u))
                    }, this.getFirstEngagementTime = function(i) {
                        var r = t.getNavigationStart(i),
                            u = n.profiler.getEventTimingHandler().getFirstEngagementTime();
                        return u && r ? u - r : 0
                    }, this.getNavigationStart = function(i) {
                        var r = n.profiler.getEventTimingHandler && typeof n.profiler.getEventTimingHandler == "function" && n.profiler.getEventTimingHandler().getStartTime && typeof n.profiler.getEventTimingHandler().getStartTime == "function" ? n.profiler.getEventTimingHandler().getStartTime() : 0;
                        return i ? t.softNavigationStart : r
                    }, this.getElapsedTimeSinceLatestNavStart = function() {
                        var i = n.profiler.data.start;
                        return t.didSoftNavigation && i ? t.softNavigationStart - i : 0
                    }, this.getFocusAwayTime = function() {
                        return n.profiler.getEventTimingHandler().getFocusAwayTime() || 0
                    }, this.updateDebugData = function() {
                        var u = t.createInitPostObject(r.OnBeforeUnload, !1),
                            f = t.visitor.store.sendWaterfall || !!i.getQueryStringValue(n.config.waterfallParameter),
                            e = u.toString(r.OnLoad, f);
                        n.profiler.debugData = u;
                        n.profiler.unloadDebugData = e
                    }, this.onPageLoad = function() {
                        if (t.isDebugging) {
                            n.profiler.debugData = t.createInitPostObject(r.OnLoad, !1);
                            n.profiler.updateDebugData = t.updateDebugData;
                            n.profiler.sendData = function() {
                                t.doPost(r.OnBeforeUnload, !1)
                            };
                            i.stopEvents();
                            return
                        }
                        t.visitor.updateSessionTime();
                        t.doPost(r.OnLoad, !1)
                    }, this.captureSoftNavigations = function() {
                        var i, r, u, f, e, o, s;
                        (n.profiler.eventManager.add("hashchange", n.pageWindow, t.onSoftNavigation), i = n.pageWindow.history, i) && (r = "function", typeof i.go === r && (u = i.go, i.go = function(n) {
                            t.onSoftNavigation();
                            u.call(i, n)
                        }), typeof i.back === r && (f = i.back, i.back = function() {
                            t.onSoftNavigation();
                            f.call(i)
                        }), typeof i.forward === r && (e = i.forward, i.forward = function() {
                            t.onSoftNavigation();
                            e.call(i)
                        }), typeof i.pushState === r && (o = i.pushState, i.pushState = function(n, r, u) {
                            t.onSoftNavigation();
                            o.call(i, n, r, u)
                        }), typeof i.replaceState === r && (s = i.replaceState, i.replaceState = function(n, r, u) {
                            t.onSoftNavigation();
                            s.call(i, n, r, u)
                        }))
                    }, this.onViewVisuallyComplete = function() {
                        t.didSoftNavigation && t.doPost(r.OnLoad, !0)
                    }, this.onSoftNavigation = function() {
                        if (n.profiler.data.loadFired) {
                            var i;
                            if (ii && (ii = new nu(!0)), n.pageWindow.CPVisuallyComplete) {
                                i = n.pageWindow.CPVisuallyComplete;
                                i.onComplete(t.onViewVisuallyComplete)
                            }
                            t.doPost(r.OnBeforeUnload, t.didSoftNavigation);
                            t.visitor.store.viewCount++;
                            i && n.pageWindow.setTimeout(function() {
                                i.reset()
                            }, 0);
                            n.pageWindow.setTimeout(function() {
                                if (t.softNavigationStart = n.now(), n.profiler.getEventTimingHandler) {
                                    var i = n.profiler.getEventTimingHandler();
                                    i.startSoftNavigationCapture();
                                    i.resetSoftNavigationCapture()
                                }
                            }, 0);
                            t.didSoftNavigation = !0;
                            n.profiler.excludeLastMileBenchMarks = !1
                        }
                    }, this.doPost = function(u, f) {
                        var e;
                        if (t.visitor.shouldPost()) {
                            u != r.OnBeforeUnload || n.profiler.data.loadFired || (u = r.OnAbort);
                            t.didSendInitial ? e = t.createDiffPostObject(u, f) : (e = t.createInitPostObject(u, f), t.didSendInitial = !0);
                            var o = t.visitor.store.sendWaterfall || !!i.getQueryStringValue(n.config.waterfallParameter),
                                s = u == r.OnBeforeUnload || u == r.OnAbort,
                                h = o && s;
                            t.makeRequest(u, e, h)
                        }
                    }, n.profiler && n.profiler.data) {
                    if (s = this.visitor.init(), this.isDebugging = !!i.getQueryStringValue(n.config.debugParameter), !this.isDebugging && !s) {
                        i.stopEvents();
                        return
                    }
                    this.captureSoftNavigations();
                    u = !1;
                    f = function() {
                        u || (n.profiler.data.loadFired = !0, u = !0, t.onPageLoad())
                    };
                    n.profiler.data.loadFired || !n.pageWindow.document || (n.profiler.data.loadFired = n.pageWindow.document.readyState === "complete");
                    n.profiler.data.loadFired ? f() : n.profiler.eventManager.add(n.windowEventDef.Load, parent.window, f);
                    e = !1;
                    o = function() {
                        e || (e = !0, t.doPost(r.OnBeforeUnload, !1))
                    };
                    n.profiler.eventManager.add(n.windowEventDef.BeforeUnload, n.pageWindow, o);
                    n.profiler.eventManager.add(n.windowEventDef.Unload, n.pageWindow, o)
                }
            }
            return t.prototype.createInitPostObject = function(t, i) {
                var u = this.createBasePostObj(t, !0, i),
                    e, o, f;
                return this.updatePerformanceMetrics(u), e = this.visitor.store, e.exitToEntry > 0 && (u.exitToEntry = e.exitToEntry), o = n.profiler.data.loadTime - n.profiler.data.start, o > 0 && (u.entryToOnLoad = o), document.webkitVisibilityState === "prerender" && (u.prerender = 1), n.hasPerformanceApi && (f = void 0, n.hasGetEntriesApi && (f = n.pageWindow.performance.getEntriesByType("resource"), u.resources = f), t != r.OnLoad && (this.setClearResources(), n.config.clearResources && n.pageWindow.performance.clearResourceTimings ? n.pageWindow.performance.clearResourceTimings() : this.countResourcesSent = f.length)), u
            }, t.prototype.createDiffPostObject = function(t, i) {
                var e, o, s, h, r = this.createBasePostObj(t, !1, i),
                    c, u, l, f;
                return this.updateResources(t, r), this.updateEngagementMetrics(r, i), this.addPerformanceMarksToPostData(n.pageWindow.performance, r), c = this.getVisuallyComplete(i), c && (r.visComplete = c), ((e = n === null || n === void 0 ? void 0 : n.profiler) === null || e === void 0 ? void 0 : e.getCPWebVitals) && (u = n.profiler.getCPWebVitals(), u.cls && (r.cls = u.cls), u.lcp && (r.lcp = u.lcp), u.inp && (r.inp = u.inp), u.inpDe && u.inpDe.length > 0 && (r.inpDe = u.inpDe), u.fcp && (r.firstContentPaint = u.fcp), (r.firstPaint > r.firstContentPaint || r.firstContentPaint === undefined) && (r.firstPaint = r.firstContentPaint), r.lcp < r.firstContentPaint && (r.lcp = r.firstContentPaint)), ((s = (o = n === null || n === void 0 ? void 0 : n.profiler) === null || o === void 0 ? void 0 : o.data) === null || s === void 0 ? void 0 : s.jsCount) > 0 && (r.jsErrorCount = n.profiler.data.jsCount, r.jsErrors = n.profiler.data.jsErrors, n.profiler.clearErrors()), ((h = n === null || n === void 0 ? void 0 : n.profiler) === null || h === void 0 ? void 0 : h.getAjaxRequests) && (l = n.profiler.getAjaxRequests(), l && (r.ajaxRequests = l.slice(), n.profiler.clearAjaxRequests())), (n === null || n === void 0 ? void 0 : n.profiler.getFrustrationMetrics) && (f = n.profiler.getFrustrationMetrics(), f && (r.frc = f.frc, r.fec = f.fec, r.fdc = f.fdc, r.ftc = f.ftc)), r
            }, t.prototype.createBasePostObj = function(t, i, u) {
                var f = new oe,
                    e;
                return f.postType = t, f.isNewPageView = i, f.siteId = n.config.siteId, f.referrer = encodeURI(decodeURI(n.pageWindow.location.href)), f.sampleRate = n.config.sampleRate, f.waterfallSampleRate = n.config.waterfallSampleRate, e = this.visitor.store, f.userId = e.userId, f.sessionId = e.sessionId, f.pageViewId = e.pageViewId, f.pageViewCount = e.pageViewCount, f.viewCount = e.viewCount, f.screenHeight = screen.height, f.screenWidth = screen.width, this.currentUrl = f.referrer, f.referrer = t === r.OnBeforeUnload || t === r.OnAbort ? this.currentUrl || encodeURI(decodeURI(n.pageWindow.location.href)) : encodeURI(decodeURI(n.pageWindow.location.href)), u && (f.isNewView = t == r.OnLoad), n.profiler.hasInsight && (this.addInsightForPost(f), n.profiler.clearInfo()), f
            }, t.prototype.addPerformanceMarksToPostData = function(t, i) {
                var r, e, o, u, f, s;
                if (n.hasPerformanceApi && t.getEntriesByType && (r = t.getEntriesByType("mark"), r && r.length > 0 && r.length < this.MaxNumberOfPerformanceMarks))
                    for (e = this.getElapsedTimeSinceLatestNavStart(), o = r.filter(function(n) {
                            return n.startTime != null && n.startTime >= e
                        }), u = 0, f = o; u < f.length; u++) s = f[u], this.addMarkToPostData(s, i)
            }, t.prototype.addMarkToPostData = function(n, t) {
                var r = i.getRoundedValue(n.startTime + n.duration);
                switch (n.name) {
                    case "mark_fully_loaded":
                        t.markFullyLoaded = r;
                        break;
                    case "mark_fully_visible":
                        t.markFullyVisible = r;
                        break;
                    case "mark_above_the_fold":
                        t.markAboveTheFold = r;
                        break;
                    case "mark_time_to_user_action":
                        t.markTimeToUserAction = r
                }
            }, t.prototype.getPaintTimings = function(n, t) {
                var i = n.filter(function(n) {
                    return n.name === t
                });
                if (i && i.length > 0 && i[0].startTime) return i[0].startTime
            }, t.prototype.setClearResources = function() {
                n.pageWindow.__cpPreventResourceClear && (n.config.clearResources = n.pageWindow.__cpPreventResourceClear === !1)
            }, t.prototype.addInsightForPost = function(t) {
                var f = n.profiler.info,
                    r, s, e, o, u, h, c, i;
                for (r in f) switch (r) {
                    case "appError":
                        if (i = f[r], i && typeof i == "object") {
                            e = void 0;
                            for (o in i)(e = Number(o), isNaN(e)) || (u = i[o], u && typeof u == "string" && (s = u, s.length > 32 && (s = s.substring(0, 32)), t.addError(o, s)))
                        }
                        break;
                    case "conversion":
                        if (i = f[r], t.isConversion = !0, i && typeof i == "object") {
                            e = void 0;
                            for (o in i)(e = Number(o), isNaN(e)) || (u = i[o], u && typeof u == "number" && (t.revenue = e, t.revenueItems = u))
                        }
                        break;
                    case "indicator":
                        h = this.buildInsight(f[r], 0);
                        h[0] && t.addIndicator(h[1]);
                        break;
                    case "tracepoint":
                        c = this.buildInsight(f[r], "");
                        c[0] && t.addTracepoint(c[1]);
                        break;
                    case "pageGroup":
                        i = f[r];
                        i !== undefined && typeof i == "string" && (t.pageGroup = i);
                        break;
                    case "variation":
                        i = f[r];
                        i !== undefined && typeof i == "string" && (t.variation = i)
                }
            }, t.prototype.buildInsight = function(n, t) {
                var f = {},
                    i = !1,
                    r, u;
                if (n && typeof n == "object")
                    for (r in n) r && (u = n[r], u != null && typeof u == typeof t && (f[r] = u, i = !0));
                return i ? [i, f] : [i, f]
            }, t.prototype.makeRequest = function(t, i, r) {
                var f = i.toString(t, r),
                    u;
                if (n.pageWindow.navigator && typeof n.pageWindow.navigator.sendBeacon == "function") try {
                    n.pageWindow.navigator.sendBeacon(this.postUrl, f)
                } catch (e) {
                    console.error("Error sending RUM data:", e)
                } else {
                    u = new XMLHttpRequest;
                    window.XDomainRequest && (u = new window.XDomainRequest, u.timeout = 0, u.onload = function() {}, u.onerror = function() {}, u.ontimeout = function() {}, u.onprogress = function() {});
                    u.open("POST", this.postUrl, !1);
                    u.setRequestHeader ? u.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8") : null;
                    u.onreadystatechange = function() {
                        u.readyState === 4 && (u.status >= 200 && u.status < 300 ? console.log("JSP Request succeeded with status:", u.status) : (console.error("JSP Request failed with status:", u.status), console.error("JSP Response text:", u.responseText)))
                    };
                    try {
                        u.send(f)
                    } catch (o) {
                        console.error("CP JSP Request failed to send:", o)
                    }
                    u = null
                }
            }, t
        }(),
        pe = ye,
        tu = undefined && undefined.__awaiter || function(n, t, i, r) {
            function u(n) {
                return n instanceof i ? n : new i(function(t) {
                    t(n)
                })
            }
            return new(i || (i = Promise))(function(i, f) {
                function o(n) {
                    try {
                        e(r.next(n))
                    } catch (t) {
                        f(t)
                    }
                }

                function s(n) {
                    try {
                        e(r["throw"](n))
                    } catch (t) {
                        f(t)
                    }
                }

                function e(n) {
                    n.done ? i(n.value) : u(n.value).then(o, s)
                }
                e((r = r.apply(n, t || [])).next())
            })
        },
        iu = undefined && undefined.__generator || function(n, t) {
            function o(n) {
                return function(t) {
                    return s([n, t])
                }
            }

            function s(o) {
                if (e) throw new TypeError("Generator is already executing.");
                while (f && (f = 0, o[0] && (r = 0)), r) try {
                    if (e = 1, u && (i = o[0] & 2 ? u["return"] : o[0] ? u["throw"] || ((i = u["return"]) && i.call(u), 0) : u.next) && !(i = i.call(u, o[1])).done) return i;
                    (u = 0, i) && (o = [o[0] & 2, i.value]);
                    switch (o[0]) {
                        case 0:
                        case 1:
                            i = o;
                            break;
                        case 4:
                            return r.label++, {
                                value: o[1],
                                done: !1
                            };
                        case 5:
                            r.label++;
                            u = o[1];
                            o = [0];
                            continue;
                        case 7:
                            o = r.ops.pop();
                            r.trys.pop();
                            continue;
                        default:
                            if (!(i = r.trys, i = i.length > 0 && i[i.length - 1]) && (o[0] === 6 || o[0] === 2)) {
                                r = 0;
                                continue
                            }
                            if (o[0] === 3 && (!i || o[1] > i[0] && o[1] < i[3])) {
                                r.label = o[1];
                                break
                            }
                            if (o[0] === 6 && r.label < i[1]) {
                                r.label = i[1];
                                i = o;
                                break
                            }
                            if (i && r.label < i[2]) {
                                r.label = i[2];
                                r.ops.push(o);
                                break
                            }
                            i[2] && r.ops.pop();
                            r.trys.pop();
                            continue
                    }
                    o = t.call(n, r)
                } catch (s) {
                    o = [6, s];
                    u = 0
                } finally {
                    e = i = 0
                }
                if (o[0] & 5) throw o[1];
                return {
                    value: o[0] ? o[1] : void 0,
                    done: !0
                }
            }
            var r = {
                    label: 0,
                    sent: function() {
                        if (i[0] & 1) throw i[1];
                        return i[1]
                    },
                    trys: [],
                    ops: []
                },
                e, u, i, f;
            return f = {
                next: o(0),
                "throw": o(1),
                "return": o(2)
            }, typeof Symbol == "function" && (f[Symbol.iterator] = function() {
                return this
            }), f
        },
        we = function() {
            return tu(void 0, void 0, void 0, function() {
                var i, t, r;
                return iu(this, function(u) {
                    switch (u.label) {
                        case 0:
                            if (!document.getElementById || !(window.attachEvent || window.addEventListener)) return [2];
                            if (!n.windowEvent || !n.profiler) return [2];
                            !n.pageWindow.__cpPostUrl || (n.config.postUrl = n.pageWindow.__cpPostUrl.trim());
                            !n.pageWindow.__cpSendOnLoad || (n.config.sendOnLoad = n.pageWindow.__cpSendOnLoad === !0);
                            i = function() {
                                return tu(void 0, void 0, void 0, function() {
                                    var n, t;
                                    return iu(this, function(i) {
                                        switch (i.label) {
                                            case 0:
                                                return [4, fetch("https://g.3gl.net/jp/12733/v4.0.8/AC")];
                                            case 1:
                                                return n = i.sent(), [4, n.json()];
                                            case 2:
                                                return t = i.sent(), [2, t]
                                        }
                                    })
                                })
                            };
                            u.label = 1;
                        case 1:
                            return u.trys.push([1, 3, , 4]), [4, i()];
                        case 2:
                            return t = u.sent(), n.setAppConfig({
                                sampleRate: t.SampleRate,
                                ajaxDomains: t.AjaxDomains,
                                waterfallSampleRate: t.WaterfallSampleRate,
                                useBenchmark: t.UseBenchmark,
                                benchMarkPageGroups: t.BenchmarkPageGroups
                            }), [3, 4];
                        case 3:
                            return r = u.sent(), console.error("CP RUM Error", r), [3, 4];
                        case 4:
                            return new pe, [2]
                    }
                })
            })
        },
        be = we,
        ru = function(n) {
            if (n && n.startsWith("url")) {
                var t = n.match(/url\(["']?([^"']*)["']?\)/),
                    i = t && t.length > 1 && t[1];
                if (i && !i.startsWith("data")) return i
            }
            return null
        },
        ke = function(n) {
            var t = n.className !== "" ? ".".concat(n.className) : "",
                i = n.id !== "" ? "#".concat(n.id) : "";
            return [n.nodeName, t, i].join(" ")
        },
        uu = parent.window || window,
        de = function() {
            uu.CPVisuallyComplete = function() {
                var t = function() {
                        function n() {
                            var n = this;
                            this.targetWindow = uu;
                            this.mutationObserver = undefined;
                            this.start = 0;
                            this.waitMs = 2e3;
                            this.maxResourceTiming = 0;
                            this.mutationObserverVal = 0;
                            this.scroll = "scroll";
                            this.click = "click";
                            this.maxDiffBetweenMutation = 1e3;
                            this.sinceLastXHR = 500;
                            this.disconnectObserverTimeout = 5e3;
                            this.hasPerformance = typeof this.targetWindow.performance == "object" && typeof this.targetWindow.performance.getEntriesByType == "function";
                            this.removeListeners = function() {
                                document.removeEventListener(n.scroll, n.clear);
                                document.removeEventListener(n.click, n.clear)
                            };
                            this.addListeners = function() {
                                document.addEventListener(n.scroll, n.clear);
                                document.addEventListener(n.click, n.clear)
                            };
                            this.imageListener = function(t) {
                                for (var r = n.targetWindow.performance.getEntriesByType("resource"), u = undefined, i = 0; i < r.length; i++)
                                    if (r[i].name === t.target.currentSrc) {
                                        u = r[i];
                                        break
                                    }
                                u && (n.maxResourceTiming = Math.max(n.maxResourceTiming, Math.round(u.responseEnd)));
                                t.currentTarget.removeEventListener("load", n.imageListener)
                            };
                            this.videoListener = function(t) {
                                n.maxResourceTiming = Math.max(n.maxResourceTiming, Math.round(n.getPerformanceTime()));
                                t.currentTarget.removeEventListener("canplay", n.videoListener)
                            };
                            this.addListenersForDynamicContent = function(t) {
                                for (var r, u, f, e = t.querySelectorAll("img"), i = 0; i < e.length; i += 1) r = e[i], n.isVisible(r) && r.addEventListener("load", n.imageListener);
                                for (u = t.querySelectorAll("video"), i = 0; i < u.length; i += 1) f = u[i], n.isVisible(f) && f.addEventListener("canplay", n.videoListener)
                            };
                            this.clear = function() {
                                clearTimeout(n.timeout);
                                n.removeListeners();
                                n.trigger()
                            };
                            this.onLoad = function() {
                                n.timeout = window.setTimeout(function() {
                                    n.removeListeners();
                                    n.calculate()
                                }, n.waitMs)
                            };
                            this.getBackgroundImagesTiming = function() {
                                for (var h, r, f, c, p, i, w, e, o, l, s = [], t = 0; t < document.styleSheets.length; t += 1) {
                                    h = document.styleSheets[t];
                                    try {
                                        for (r = 0; r < h.cssRules.length; r += 1) {
                                            var y = h.cssRules[r],
                                                b = y.selectorText,
                                                u = y.style;
                                            if (u)
                                                for (f = 0; f < u.length; f += 1) c = u[f], c === "background-image" && (p = u[c], i = ru(p), i && (w = n.targetWindow.document.querySelector(b), n.isVisible(w) && s.push(i)))
                                        }
                                    } catch (g) {}
                                }
                                for (e = n.targetWindow.document.querySelectorAll('[style*="background"]'), t = 0; t < e.length; t++)
                                    if (n.isVisible(e[t])) {
                                        var k = n.targetWindow.getComputedStyle(e[t]),
                                            d = k.getPropertyValue("background-image"),
                                            i = ru(d);
                                        i && s.push(i)
                                    }
                                for (o = 0, l = s; o < l.length; o++) {
                                    var i = l[o],
                                        a = n.targetWindow.performance.getEntriesByType("resource"),
                                        v = undefined;
                                    for (t = 0; t < a.length; t++)
                                        if (a[t].name === new URL(i, n.targetWindow.location.href).href) {
                                            v = a[t];
                                            break
                                        }
                                    v && (n.maxResourceTiming = Math.max(n.maxResourceTiming, Math.round(v.responseEnd)))
                                }
                            };
                            this.calculate = function() {
                                if (!n.targetWindow.performance) {
                                    n.trigger();
                                    return
                                }
                                n.getBackgroundImagesTiming();
                                n.trigger()
                            };
                            this.getPerformanceTime = function() {
                                return n.targetWindow.performance.now()
                            };
                            this.resetValueOnSoftNav = function() {
                                n.mutationObserverVal = 0;
                                n.maxResourceTiming = 0;
                                n.isSoftNav = !1
                            };
                            this.isVisible = function(t) {
                                var i = typeof t.getBoundingClientRect == "function" && t.getBoundingClientRect(),
                                    u = i && i.width * i.height >= 8 && i.right >= 0 && i.bottom >= 0 && i.left <= n.targetWindow.innerWidth && i.top <= n.targetWindow.innerHeight && !t.hidden && t.type !== "hidden",
                                    r;
                                return u ? (r = window.getComputedStyle(t), r.display !== "none" && r.visibility !== "hidden" && r.visibility !== "collapse" && +r.opacity > 0) : !1
                            };
                            this.mutationCallback = function(t) {
                                t.forEach(function(t) {
                                    var i, u, f, e, r;
                                    if (t.type === "childList" && t.addedNodes.length > 0) {
                                        if (i = t.addedNodes[0], n.isVisible(i)) {
                                            for (i.nodeName.toLowerCase() === "img" && i.addEventListener("load", n.imageListener), i.nodeName.toLowerCase() === "video" && i.addEventListener("canplay", n.videoListener), u = n.getPerformanceTime(), n.isSoftNav && n.resetValueOnSoftNav(), f = n.targetWindow.performance.getEntriesByType("resource"), e = undefined, r = 0; r < f.length; r++)
                                                if (f[r].initiatorType === "xmlhttprequest") {
                                                    e = f[r];
                                                    break
                                                }(n.mutationObserverVal === 0 || e && u - e.responseEnd < n.sinceLastXHR || u - n.mutationObserverVal <= n.maxDiffBetweenMutation) && (n.mutationObserverVal = Math.round(u))
                                        }
                                    } else t.type === "attributes" && t.target.nodeName.toLowerCase() === "img" && t.attributeName === "src" && n.isVisible(t.target) && t.target.addEventListener("load", n.imageListener)
                                })
                            };
                            this.initMutationObserver = function() {
                                var t = n.targetWindow.MutationObserver || n.targetWindow.WebKitMutationObserver || n.targetWindow.MozMutationObserver;
                                t && n.targetWindow.performance && (n.mutationObserver = new t(n.mutationCallback), n.observe())
                            };
                            this.trigger = function() {
                                if (n.callback) {
                                    var t = n.getValue(!1);
                                    n.callback(t)
                                }
                            };
                            this.observe = function() {
                                n.mutationObserver.observe(n.targetWindow.document, {
                                    childList: !0,
                                    attributes: !0,
                                    characterData: !0,
                                    subtree: !0
                                });
                                setTimeout(function() {
                                    n.mutationObserver.disconnect()
                                }, n.disconnectObserverTimeout)
                            };
                            this.getValue = function(t) {
                                var r = t || n.isSoftNav,
                                    i;
                                return n.maxResourceTiming || n.mutationObserverVal ? (i = 0, n.maxResourceTiming && n.mutationObserverVal ? i = Math.max(n.maxResourceTiming, n.mutationObserverVal) : n.maxResourceTiming ? i = n.maxResourceTiming : n.mutationObserverVal && (i = n.mutationObserverVal), !r) ? Math.round(Math.max(i - n.start, n.getFirstPaintTime())) : Math.round(i - n.start) : undefined
                            };
                            this.onComplete = function(t) {
                                n.callback = t
                            };
                            this.reset = function() {
                                n.isSoftNav = !0;
                                n.targetWindow.performance && (n.start = n.getPerformanceTime(), n.mutationObserver.disconnect(), n.observe(), n.onLoad())
                            };
                            this.captureSoftNavigations = function() {
                                var t, i, r, u, f, e, o;
                                n.targetWindow.HashChangeEvent && !n.targetWindow.RProfiler && (n.addEvent("hashchange", n.targetWindow, n.reset), t = n.targetWindow.history, t) && (i = "function", typeof t.go === i && (r = t.go, t.go = function(i) {
                                    n.reset();
                                    r.call(t, i)
                                }), typeof t.back === i && (u = t.back, t.back = function() {
                                    n.reset();
                                    u.call(t)
                                }), typeof t.forward === i && (f = t.forward, t.forward = function() {
                                    n.reset();
                                    f.call(t)
                                }), typeof t.pushState === i && (e = t.pushState, t.pushState = function(i, r, u) {
                                    n.reset();
                                    e.call(t, i, r, u)
                                }), typeof t.replaceState === i && (o = t.replaceState, t.replaceState = function(i, r, u) {
                                    n.reset();
                                    o.call(t, i, r, u)
                                }))
                            };
                            this.initMutationObserver();
                            this.captureSoftNavigations();
                            this.init()
                        }
                        return n.prototype.init = function() {
                            var t = this,
                                n = this.targetWindow.document;
                            n.readyState === "complete" ? this.onLoad() : this.targetWindow.addEventListener("load", this.onLoad);
                            n.readyState === "interactive" ? this.addListenersForDynamicContent(n) : this.targetWindow.addEventListener("DOMContentLoaded", function() {
                                t.addListenersForDynamicContent(n)
                            });
                            this.removeListeners();
                            this.addListeners()
                        }, n.prototype.addEvent = function(n, t, i) {
                            this.targetWindow.attachEvent ? t.attachEvent("on" + n, i) : t.addEventListener(n, i, !1)
                        }, n.prototype.getFirstPaintTime = function() {
                            var r = 0,
                                n, t, i;
                            try {
                                n = this.targetWindow.performance.getEntriesByType("paint");
                                n && n.length > 0 && (t = n.filter(function(n) {
                                    return n.name === "first-paint"
                                }), t && t.length > 0 && t[0].startTime && (r = Math.round(t[0].startTime)), i = n.filter(function(n) {
                                    return n.name === "first-contentful-paint"
                                }), i && i.length > 0 && i[0].startTime && (r = Math.round(i[0].startTime)))
                            } catch (u) {}
                            return r
                        }, n
                    }(),
                    n = new t;
                return {
                    getValue: n.getValue,
                    onComplete: n.onComplete,
                    reset: n.reset
                }
            }()
        },
        ge = de,
        no = function() {
            function n() {
                this.clickCount = 0;
                this.rageClickLimit = 3;
                this.timeoutDuration = 1e3;
                this.rageClickValue = null
            }
            return n.prototype.startListening = function() {
                this.clicklistener()
            }, n.prototype.getRageClick = function() {
                return this.rageClickValue
            }, n.prototype.clicklistener = function() {
                var t = this,
                    n;
                this.clickCount++;
                n = setInterval(function() {
                    t.clickCount = 0;
                    clearInterval(n)
                }, this.timeoutDuration);
                this.clickCount >= this.rageClickLimit && (this.rageClickValue = 1, clearInterval(n))
            }, n
        }(),
        fu = new no,
        to = function() {
            function n() {
                this.error = "";
                this.errorClickValue = null
            }
            return n.prototype.startListening = function() {
                var n = this;
                window.onerror = function(t) {
                    n.error = t
                };
                this.clicklistener()
            }, n.prototype.getErrorClick = function() {
                return this.errorClickValue
            }, n.prototype.clicklistener = function() {
                var n = this;
                setTimeout(function() {
                    n.error && (n.errorClickValue = 1)
                }, 0)
            }, n
        }(),
        eu = new to,
        io = function() {
            function n() {
                this.clickCounts = {};
                this.deadClickLimit = 2;
                this.deadClickValue = null;
                this.timeoutDuration = 1e3
            }
            return n.prototype.getDeadClick = function() {
                return this.deadClickValue
            }, n.prototype.clickListener = function(n) {
                var r = this,
                    i = setInterval(function() {
                        r.clickCounts = {};
                        clearInterval(i)
                    }, this.timeoutDuration),
                    t = ke(n.target);
                this.clickCounts[t] = this.clickCounts[t] ? this.clickCounts[t] + 1 : 1;
                this.clickCounts[t] === this.deadClickLimit && (this.deadClickValue = 1, clearInterval(i))
            }, n.prototype.startListening = function(n) {
                this.clickListener(n)
            }, n
        }(),
        ou = new io,
        ro = function() {
            function n() {
                var n = this,
                    t;
                this.mouseMoveListener = function(t) {
                    var i = Math.sign(t.movementX);
                    n.distance += Math.abs(t.movementX) + Math.abs(t.movementY);
                    i !== n.direction && (n.direction = i, n.directionChangeCount++)
                };
                this.directionChangeCount = 0;
                this.distance = 0;
                this.interval = 350;
                this.threshold = .01;
                this.thrashedCursorValue = !1;
                t = setInterval(function() {
                    var i = n.distance / n.interval,
                        r;
                    if (!n.velocity) {
                        n.velocity = i;
                        return
                    }
                    r = (i - n.velocity) / n.interval;
                    n.directionChangeCount && r > n.threshold && (clearInterval(t), n.thrashedCursorValue = !0);
                    n.distance = 0;
                    n.directionChangeCount = 0;
                    n.velocity = i
                }, this.interval)
            }
            return n.prototype.getThrashedCursor = function() {
                return this.thrashedCursorValue
            }, n.prototype.startListening = function(n) {
                this.mouseMoveListener(n)
            }, n
        }(),
        su = new ro,
        uo = function() {
            function n() {}
            return n.prototype.listenClickEvent = function(n) {
                fu.startListening(n);
                eu.startListening(n);
                ou.startListening(n)
            }, n.prototype.listenMouseMove = function(n) {
                su.startListening(n)
            }, n.prototype.startListeningClickEvent = function() {
                window.addEventListener("click", this.listenClickEvent.bind(this))
            }, n.prototype.stopListeningClickEvent = function() {
                window.removeEventListener("click", this.listenClickEvent.bind(this))
            }, n.prototype.startListeningMouseMove = function() {
                window.addEventListener("mousemove", this.listenMouseMove.bind(this))
            }, n.prototype.stopListeningMouseMove = function() {
                window.removeEventListener("mousemove", this.listenMouseMove.bind(this))
            }, n
        }(),
        hu = new uo,
        ri = undefined && undefined.__assign || function() {
            return ri = Object.assign || function(n) {
                for (var t, r, i = 1, u = arguments.length; i < u; i++) {
                    t = arguments[i];
                    for (r in t) Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r])
                }
                return n
            }, ri.apply(this, arguments)
        },
        ui = undefined && undefined.__awaiter || function(n, t, i, r) {
            function u(n) {
                return n instanceof i ? n : new i(function(t) {
                    t(n)
                })
            }
            return new(i || (i = Promise))(function(i, f) {
                function o(n) {
                    try {
                        e(r.next(n))
                    } catch (t) {
                        f(t)
                    }
                }

                function s(n) {
                    try {
                        e(r["throw"](n))
                    } catch (t) {
                        f(t)
                    }
                }

                function e(n) {
                    n.done ? i(n.value) : u(n.value).then(o, s)
                }
                e((r = r.apply(n, t || [])).next())
            })
        },
        fi = undefined && undefined.__generator || function(n, t) {
            function o(n) {
                return function(t) {
                    return s([n, t])
                }
            }

            function s(o) {
                if (e) throw new TypeError("Generator is already executing.");
                while (f && (f = 0, o[0] && (r = 0)), r) try {
                    if (e = 1, u && (i = o[0] & 2 ? u["return"] : o[0] ? u["throw"] || ((i = u["return"]) && i.call(u), 0) : u.next) && !(i = i.call(u, o[1])).done) return i;
                    (u = 0, i) && (o = [o[0] & 2, i.value]);
                    switch (o[0]) {
                        case 0:
                        case 1:
                            i = o;
                            break;
                        case 4:
                            return r.label++, {
                                value: o[1],
                                done: !1
                            };
                        case 5:
                            r.label++;
                            u = o[1];
                            o = [0];
                            continue;
                        case 7:
                            o = r.ops.pop();
                            r.trys.pop();
                            continue;
                        default:
                            if (!(i = r.trys, i = i.length > 0 && i[i.length - 1]) && (o[0] === 6 || o[0] === 2)) {
                                r = 0;
                                continue
                            }
                            if (o[0] === 3 && (!i || o[1] > i[0] && o[1] < i[3])) {
                                r.label = o[1];
                                break
                            }
                            if (o[0] === 6 && r.label < i[1]) {
                                r.label = i[1];
                                i = o;
                                break
                            }
                            if (i && r.label < i[2]) {
                                r.label = i[2];
                                r.ops.push(o);
                                break
                            }
                            i[2] && r.ops.pop();
                            r.trys.pop();
                            continue
                    }
                    o = t.call(n, r)
                } catch (s) {
                    o = [6, s];
                    u = 0
                } finally {
                    e = i = 0
                }
                if (o[0] & 5) throw o[1];
                return {
                    value: o[0] ? o[1] : void 0,
                    done: !0
                }
            }
            var r = {
                    label: 0,
                    sent: function() {
                        if (i[0] & 1) throw i[1];
                        return i[1]
                    },
                    trys: [],
                    ops: []
                },
                e, u, i, f;
            return f = {
                next: o(0),
                "throw": o(1),
                "return": o(2)
            }, typeof Symbol == "function" && (f[Symbol.iterator] = function() {
                return this
            }), f
        },
        cu = function() {
            function t() {
                function u(n) {
                    var i = n.target || n.srcElement;
                    return i.nodeType == 3 && (i = i.parentNode), t("N/A", i.src || i.URL, -1), !1
                }
                var n = this,
                    t, r;
                this.restUrl = "g.3gl.net/jp/12733/v4.0.8/M";
                this.startTime = (new Date).getTime();
                this.eventsTimingHandler = new lf;
                this.inpDe = [];
                this.siteId = 12733;
                this.version = "v4.0.8";
                this.info = {};
                this.hasInsight = !1;
                this.data = {
                    start: this.startTime,
                    jsCount: 0,
                    jsErrors: [],
                    loadTime: -1,
                    loadFired: window.document.readyState == "complete"
                };
                this.excludeLastMileBenchMarks = !1;
                this.eventManager = new yr;
                this.setCLS = function(t) {
                    var i = t.name,
                        r = t.value,
                        u = i === "CLS" ? r : undefined;
                    n.cls = u
                };
                this.setLCP = function(t) {
                    var r = t.name,
                        i = t.value,
                        u = t.delta,
                        f = r === "LCP" ? i : undefined;
                    u >= 0 && i > 0 && (n.lcp = f)
                };
                this.setINP = function(t) {
                    var e = t.name,
                        u = t.value,
                        r = t.attribution,
                        f;
                    e === "INP" && (n.inp = u, u > 200 && (f = {
                        t: r.interactionTarget,
                        eTy: r.interactionType,
                        sTi: i.getRoundedValue(r.interactionTime),
                        indl: i.getRoundedValue(r.inputDelay),
                        psdu: i.getRoundedValue(r.processingDuration),
                        prdl: i.getRoundedValue(r.presentationDelay),
                        val: i.getRoundedValue(u),
                        ls: i.getLoadStateEnum(r.loadState)
                    }, n.inpDe.push(ri({}, f)), n.inpDe.sort(function(n, t) {
                        return t.val - n.val
                    }), n.inpDe.length === 10 && n.inpDe.pop()))
                };
                this.setFCP = function(t) {
                    var i = t.name,
                        r = t.value;
                    n.fcp = i === "FCP" ? r : undefined
                };
                this.recordPageLoad = function() {
                    n.data.loadTime = (new Date).getTime();
                    n.data.loadFired = !0
                };
                this.addError = function(t, i, r) {
                    var s, f, u, e, o;
                    for (n.data.jsCount++, s = pr.createText(t, i, r), f = n.data.jsErrors, u = 0, e = f; u < e.length; u++)
                        if (o = e[u], o.getText() == s) {
                            o.count++;
                            return
                        }
                    f.push(new pr(t, i, r))
                };
                this.getAjaxRequests = function() {
                    return n.ajaxHandler.getAjaxRequests()
                };
                this.clearAjaxRequests = function() {
                    n.ajaxHandler.clear()
                };
                this.addInfo = function(t, i, r) {
                    if (!n.isNullOrEmpty(t)) {
                        if (n.isNullOrEmpty(r)) n.info[t] = i;
                        else {
                            if (n.isNullOrEmpty(i)) return;
                            n.isNullOrEmpty(n.info[t]) && (n.info[t] = {});
                            n.info[t][i] = r
                        }
                        n.hasInsight = !0
                    }
                };
                this.clearInfo = function() {
                    n.info = {};
                    n.hasInsight = !1
                };
                this.clearErrors = function() {
                    n.data.jsCount = 0;
                    n.data.jsErrors = []
                };
                this.getInfo = function() {
                    return n.hasInsight ? n.info : null
                };
                this.getEventTimingHandler = function() {
                    return n.eventsTimingHandler
                };
                this.getCPWebVitals = function() {
                    return wi(n.setCLS), or(n.setLCP), fr(n.setINP), bi(n.setFCP), {
                        cls: n.cls,
                        lcp: n.lcp,
                        inp: n.inp,
                        inpDe: n.inpDe,
                        fcp: n.fcp
                    }
                };
                this.getFrustrationMetrics = function() {
                    return {
                        frc: fu.getRageClick(),
                        fec: eu.getErrorClick(),
                        fdc: ou.getDeadClick(),
                        ftc: su.getThrashedCursor()
                    }
                };
                this.eventManager.add(ft.Load, window, this.recordPageLoad);
                t = this.addError;
                this.ajaxHandler = new sf;
                wi(this.setCLS, {
                    reportAllChanges: !0
                });
                or(this.setLCP, {
                    reportAllChanges: !0
                });
                fr(this.setINP, {
                    reportAllChanges: !0
                });
                bi(this.setFCP, {
                    reportAllChanges: !0
                });
                hu.startListeningClickEvent();
                hu.startListeningMouseMove();
                window.opera ? this.eventManager.add(ft.Error, document, u) : "onerror" in window && (r = window.onerror, window.onerror = function(n, i, u) {
                    return (t(n, i !== null && i !== void 0 ? i : "", u !== null && u !== void 0 ? u : 0), !!r) ? r(n, i, u) : !1
                });
                "onunhandledrejection" in window && (window.onunhandledrejection = function(n) {
                    var r, u, f, e = (r = n.reason.stack) !== null && r !== void 0 ? r : "",
                        i = e !== "" ? e.split(/\bat\b/) : [],
                        s = i[1] ? i[1].replace(/:\d+/g, "") : "",
                        o = i[1] ? i[1].match(/:\d+/g) : [],
                        h = o[0] ? o[0].replace(":", "") : 0;
                    t((f = (u = i[0]) === null || u === void 0 ? void 0 : u.trim()) !== null && f !== void 0 ? f : "N/A", s.trim(), h)
                });
                !window.__cpCdnPath || (this.restUrl = window.__cpCdnPath.trim())
            }
            return t.prototype.isNullOrEmpty = function(n) {
                if (n === undefined || n === null) return !0;
                if (typeof n == "string") {
                    var t = n;
                    return t.trim().length == 0
                }
                return !1
            }, t.prototype.dispatchCustomEvent = function(n) {
                (function(n) {
                    function t(n, t) {
                        t = t || {
                            bubbles: !1,
                            cancelable: !1,
                            detail: undefined
                        };
                        var i = document.createEvent("CustomEvent");
                        return i.initCustomEvent(n, t.bubbles, t.cancelable, t.detail), i
                    }
                    if (typeof n.CustomEvent == "function") return !1;
                    t.prototype = Event.prototype;
                    n.CustomEvent = t
                })(window);
                var t = new CustomEvent(n);
                window.dispatchEvent(t)
            }, t.prototype.checkBrowserIsBot = function() {
                var t, i, r, n;
                return ((t = navigator === null || navigator === void 0 ? void 0 : navigator.userAgentData) === null || t === void 0 ? void 0 : t.brands) ? (i = navigator.userAgentData.brands, n = i.some(function(n) {
                    return /bot|crawl|spider|headless|phantom/i.test(n.brand)
                }), n) : (r = navigator.userAgent.toLowerCase(), n = /bot|crawl|spider|headless|phantom/i.test(r), n)
            }, t.prototype.addLastMileScript = function() {
                var i = n.getConfig(),
                    r = i.useBenchmark,
                    u = i.lastMileUrl,
                    f = !this.checkBrowserIsBot(),
                    t;
                r && f && (t = document.createElement("iframe"), t.style.display = "none", t.srcdoc = '<script defer src="'.concat(u, '"><\/script>'), t.referrerPolicy = "no-referrer", document.body.appendChild(t), console.log("CP: Lastmile script added"))
            }, t.prototype.getBenchMarksPageGroup = function() {
                var t = n.getConfig().benchMarkPageGroups;
                return t.split(",")
            }, t.prototype.excludeBenchMarks = function() {
                this.excludeLastMileBenchMarks = !0
            }, t
        }(),
        fo = cu,
        ei = new cu;
    window.RProfiler = ei;
    window.WindowEvent = ft;
    oi = function() {
        return ui(void 0, void 0, void 0, function() {
            return fi(this, function(t) {
                switch (t.label) {
                    case 0:
                        return n.initValues(), [4, be()];
                    case 1:
                        return t.sent(), ge(), ei.addLastMileScript(), [2]
                }
            })
        })
    };
    lu = function() {
        return ui(void 0, void 0, void 0, function() {
            return fi(this, function() {
                return document.readyState === "complete" ? oi() : document.addEventListener("readystatechange", function(n) {
                    return ui(void 0, void 0, void 0, function() {
                        return fi(this, function() {
                            return n.target.readyState === "complete" && oi(), [2]
                        })
                    })
                }), [2]
            })
        })
    };
    lu();
    ei.dispatchCustomEvent("GlimpseLoaded")
})();