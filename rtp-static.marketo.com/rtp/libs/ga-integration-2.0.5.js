(function(S) {
    var j = "trwsa.sid",
        p = "campaign",
        h = "Insightera-CTA",
        D = "industry",
        u = "Industry",
        a = "ISegment: ",
        x = "ICampaign: ",
        U = "segment",
        d = "Segment",
        Z = "Organization",
        P = "it.pcmp",
        ad = "(not set)",
        k = "RTP-Campaigns",
        aa = "RTP-Segments",
        al = "Clicks",
        l = "RTP-Remarketing",
        O = "RTP Remarketing",
        R = "Industry",
        aj = "Group",
        F = "Category",
        w = "ABM List",
        am = "Segmented Audience",
        I = "Campaign Clicked",
        q = "eVar",
        n = "event",
        M = "prop",
        ae = null,
        af = null,
        X = {
            gwtPrefix: "",
            aid: null,
            ap: "/ga",
            cmpn: "/cmpn",
            indr: "/indr",
            sgm: "/sgm",
            racs: {},
            eGaSgmPush: false,
            eGaIndrPush: false,
            eGaCmpPush: false,
            eGaOrgPush: false,
            eSIndrPush: false,
            eSOrgPush: false,
            eSSgmPush: false,
            eSCtaPush: false,
            gaIndrSlot: null,
            gaOrgSlot: null,
            gaOrgScope: 2,
            gaIndrScope: 1,
            newV: false,
            newS: false,
            sOrgCC: 21,
            sIndCC: 20,
            sCmpCE: 20,
            sSgmCE: 21,
            sSgmOrgTV: 20,
            sSgmIndTV: 21,
            sCmpOrgTV: 22,
            sCmpIndTV: 23,
            eGA: false,
            eSC: false,
            eUA: false,
            eUAOrgPush: false,
            eUAIndrPush: false,
            eUASizePush: false,
            eUARevenuePush: false,
            eUAaBMPush: false,
            eUASgmPush: false,
            eUACtaPush: false,
            eUARcmdPush: false,
            uaOrgIndex: null,
            uaIndrIndex: null,
            uaSizeIndex: null,
            uaRevenueIndex: null,
            uaABMIndex: null,
            eFC: false,
            eFCIndPush: false,
            eFCCatPush: false,
            eFCGroupPush: false,
            eFCAbmPush: false,
            eFCSAPush: false,
            eFCCmpPush: false
        },
        ac = {
            IMPRESSION: "impr",
            CONVERSION: "conv"
        },
        m = null,
        L = "",
        B = null,
        H = null,
        b = null,
        z = (("https:" == document.location.protocol) ? "https://" : "http://"),
        f = {
            supports: function() {
                if (localStorage) {
                    return true
                }
                return false
            },
            store: function(an, ao) {
                localStorage[an] = ao
            },
            getValue: function(an) {
                return localStorage[an]
            },
            remove: function(an) {
                localStorage.removeItem(an)
            }
        },
        y = function(an) {
            var ap = "";
            for (var ao = 0; ao < an.length; ao++) {
                ap += an[ao] + ","
            }
            ap = ap.substring(0, ap.length - 1);
            return ap
        },
        g = function(an) {
            var aq = document.cookie;
            aq = aq.split("; ");
            var ap = "";
            for (var ao = 0; ao < aq.length; ao++) {
                ap = aq[ao].split("=");
                if (ap[0] == an) {
                    return unescape(ap[1])
                }
            }
            return null
        },
        r = function(ao) {
            var an = g(ao);
            if (an != null) {
                an = an.split(":")
            }
            return an
        },
        ab = function() {
            var ao = null;
            var an = r(j);
            if (an != null && an.length > 0) {
                ao = an[0]
            }
            return ao
        },
        e = function() {
            var an = Array.prototype.slice.call(arguments);
            for (var ao = 0; ao < an.length; ao++) {
                if (an[ao] === undefined || an[ao] == null || an[ao] == "") {
                    return true
                }
            }
            return false
        },
        ai = function(aq, an) {
            var ap = new S.XMLHttpRequest();
            if ("withCredentials" in ap) {
                try {
                    ap.open(aq, an, true)
                } catch (ao) {
                    console.log(ao)
                }
            } else {
                if (typeof XDomainRequest != "undefined") {
                    ap = new XDomainRequest();
                    ap.open(aq, an)
                } else {
                    ap = null
                }
            }
            return ap
        },
        V = function(an, ao) {
            if (an === undefined || an == null || an == "") {
                return
            }
            if (an.indexOf("http://") != 0 && an.indexOf("https://") != 0) {
                an = z + an
            }
            an += "&" + new Date().getTime();
            var ap = ai("GET", an);
            if (!ap) {
                return
            }
            ap.onload = function() {
                var ar = ap.responseText;
                var aq = JSON.parse(ar);
                if (aq.code == 200 || aq.status == 200) {
                    if (typeof ao == "function") {
                        ao(aq)
                    }
                } else {
                    console.log("error in data request " + an)
                }
            };
            ap.onerror = function() {};
            ap.send()
        },
        W = function(aq, ap, an) {
            var ao = aq[ap];
            if (ao == undefined || ao == null) {
                ao = []
            }
            if (ao.indexOf(an) == -1) {
                ao.push(an)
            }
            aq[ap] = ao;
            return aq
        },
        t = function(ao, ap, an) {
            if (f.supports()) {
                var aq = f.getValue(P);
                if (aq === undefined) {
                    aq = {};
                    aq.sid = an
                } else {
                    aq = JSON.parse(aq);
                    if (an != aq.sid) {
                        aq = {};
                        aq.sid = an;
                        aq[ap] = null
                    }
                }
                aq = W(aq, ap, ao);
                f.store(P, JSON.stringify(aq))
            }
        },
        A = function(an, ar, ao) {
            if (f.supports()) {
                var at = f.getValue(P);
                if (at !== undefined && at != null) {
                    at = JSON.parse(at);
                    if (ao == at.sid) {
                        var aq = at[ar];
                        if (aq !== undefined) {
                            for (var ap = 0; ap < aq.length; ap++) {
                                if (an == aq[ap]) {
                                    return false
                                }
                            }
                        }
                    }
                }
            }
            return true
        },
        v = function(an) {
            an = an.toLowerCase();
            return an.replace(/(^|\s)([a-z])/g, function(ao, aq, ap) {
                return aq + ap.toUpperCase()
            })
        },
        T = {
            getTrackers: function() {
                var an = null;
                if (B == null) {
                    if (m != null && L == "analytics") {
                        an = m.getAll();
                        B = an
                    }
                } else {
                    an = B
                }
                return an
            },
            getTrackerName: function(an) {
                var ao = "";
                if (m != null && L == "analytics") {
                    ao = an.get("name");
                    if (ao == "t0") {
                        ao = ""
                    }
                }
                if (ao != "") {
                    ao += "."
                }
                return ao
            },
            trackEvent: function(ap, aq, an) {
                if (X.eUA) {
                    var at = this.getTrackers(),
                        ar;
                    if (at != null) {
                        for (var ao = 0; ao < at.length; ao++) {
                            ar = this.getTrackerName(at[ao]);
                            if (m != null && L == "analytics") {
                                if (aq == "Conversion") {
                                    m(ar + "send", "event", ap, aq, an)
                                } else {
                                    m(ar + "send", "event", ap, aq, an, {
                                        nonInteraction: 1
                                    })
                                }
                            }
                        }
                    }
                    if (window.google_tag_manager && window.dataLayer) {
                        dataLayer.push({
                            event: "gaInsighteraEvent",
                            gaInsighteraEventCatagory: ap,
                            gaInsighteraEventAction: aq,
                            gaInsighteraEventLabel: an
                        })
                    }
                }
            },
            setCustomDimesion: function(an, ap) {
                if (X.eUA) {
                    var ar = this.getTrackers(),
                        aq;
                    if (ar != null) {
                        for (var ao = 0; ao < ar.length; ao++) {
                            aq = this.getTrackerName(ar[ao]);
                            if (m != null && L == "analytics") {
                                m(aq + "set", "dimension" + an, ap)
                            }
                        }
                    }
                }
            },
            trackPageview: function() {
                if (X.eUA) {
                    var ap = this.getTrackers(),
                        ao;
                    if (ap != null) {
                        for (var an = 0; an < ap.length; an++) {
                            ao = this.getTrackerName(ap[an]);
                            if (m != null && L == "analytics") {
                                m(ao + "send", "pageview")
                            }
                        }
                    }
                    if (window.google_tag_manager && window.dataLayer) {
                        dataLayer.push({
                            event: "iCustomVar"
                        })
                    }
                }
            },
            pushCustomData: function(aq) {
                if (X.eUA) {
                    if (X.newS && !e(aq)) {
                        var ao = false;
                        var at = "";
                        if (X.eUAOrgPush && !e(aq.org, X.uaOrgIndex)) {
                            if (aq.isp) {
                                this.setCustomDimesion(X.uaOrgIndex, ad);
                                at = ad
                            } else {
                                this.setCustomDimesion(X.uaOrgIndex, aq.org);
                                at = aq.org
                            }
                            ao = true
                        }
                        if (!aq.isp) {
                            if (X.eUAIndrPush && !e(aq.industries, X.uaIndrIndex)) {
                                var ar = aq.industries[0];
                                if (!e(ar)) {
                                    this.setCustomDimesion(X.uaIndrIndex, ar);
                                    ao = true;
                                    if (at == "") {
                                        at = ar
                                    }
                                }
                            }
                            if (X.eUASizePush && !e(aq.category, X.uaSizeIndex)) {
                                var an = null;
                                if (aq.category === "ENTERPRISE") {
                                    an = v(aq.category)
                                } else {
                                    an = aq.category
                                }
                                this.setCustomDimesion(X.uaSizeIndex, an);
                                ao = true;
                                if (at == "") {
                                    at = an
                                }
                            }
                            if (X.eUARevenuePush && !e(aq.group, X.uaRevenueIndex)) {
                                this.setCustomDimesion(X.uaRevenueIndex, v(aq.group.replace("_", " ")));
                                ao = true;
                                if (at == "") {
                                    at = v(aq.group)
                                }
                            }
                            if (X.eUAaBMPush && !e(aq.abm, X.uaABMIndex)) {
                                if (aq.abm.length > 0) {
                                    var ap = aq.abm[0];
                                    if (!e(ap.name)) {
                                        this.setCustomDimesion(X.uaABMIndex, ap.name);
                                        ao = true;
                                        if (at == "") {
                                            at = ap.name
                                        }
                                    }
                                }
                            }
                        }
                        if (ao) {
                            if (at != "") {
                                this.trackEvent("RTP", Z, at)
                            }
                            if (window.google_tag_manager && window.dataLayer) {
                                dataLayer.push({
                                    event: "iCustomVar"
                                })
                            }
                        }
                    }
                }
            },
            addLabels: function(an, ao) {
                if (ao !== undefined && ao !== null && ao.length > 0) {
                    if (typeof ao === "string") {
                        ao = ao.split(",")
                    }
                    ao = "[" + ao.join() + "]";
                    an = ao + " " + an
                }
                return an
            },
            pushSegments: function(ap) {
                if (X.eUA && !e(ap)) {
                    if (X.eUASgmPush) {
                        for (var aq = 0; aq < ap.length; aq++) {
                            if (ap[aq].pushToAnalytics) {
                                ae = ap[aq].organization;
                                this.trackEvent(aa, this.addLabels(ap[aq].segmentName, ap[aq].segmentLabels), ap[aq].organization)
                            }
                        }
                    }
                    var ao;
                    for (var aq = 0; aq < ap.length; aq++) {
                        ao = ap[aq].audiences;
                        if (!e(ao)) {
                            for (var an = 0; an < ao.length; an++) {
                                if (ao[an].pushToGA) {
                                    this.trackEvent(l, am, ao[an].name)
                                }
                            }
                        }
                    }
                }
            },
            pushCampaign: function(ao, an, ap) {
                if (X.eUA && X.eUACtaPush) {
                    if (ao == "Conversion") {
                        this.trackEvent(k, al, this.addLabels(an, ap))
                    } else {
                        this.trackEvent(k, ao, this.addLabels(an, ap))
                    }
                }
            }
        },
        c = {
            trackEvent: function(ao, ap, an) {
                if (X.eUA) {
                    if (m != null && L == "GA4") {
                        if (ap == "Conversion") {
                            gtag("event", ap, {
                                event_category: ao,
                                event_label: an
                            })
                        } else {
                            gtag("event", ap, {
                                event_category: ao,
                                event_label: an,
                                non_interaction: true
                            })
                        }
                    }
                    if (window.google_tag_manager && window.dataLayer) {
                        dataLayer.push({
                            event: "gaInsighteraEvent",
                            gaInsighteraEventCatagory: ao,
                            gaInsighteraEventAction: ap,
                            gaInsighteraEventLabel: an
                        })
                    }
                }
            },
            pushCustomData: function(at) {
                var ar = {};
                if (X.eUA) {
                    if (X.newS && !e(at)) {
                        var ay = false;
                        if (X.eUAOrgPush && !e(at.org, X.uaOrgIndex)) {
                            var av = "dimension" + X.uaOrgIndex;
                            if (at.isp) {
                                ar[av] = ad
                            } else {
                                ar[av] = at.org
                            }
                            ay = true
                        }
                        if (!at.isp) {
                            if (X.eUAIndrPush && !e(at.industries, X.uaIndrIndex)) {
                                var aw = at.industries[0];
                                if (!e(aw)) {
                                    var ap = "dimension" + X.uaIndrIndex;
                                    ar[ap] = aw;
                                    ay = true
                                }
                            }
                            if (X.eUASizePush && !e(at.category, X.uaSizeIndex)) {
                                var ax = null;
                                if (at.category === "ENTERPRISE") {
                                    ax = v(at.category)
                                } else {
                                    ax = at.category
                                }
                                var ao = "dimension" + X.uaSizeIndex;
                                ar[ao] = ax;
                                ay = true
                            }
                            if (X.eUARevenuePush && !e(at.group, X.uaRevenueIndex)) {
                                var an = "dimension" + X.uaRevenueIndex;
                                ar[an] = v(at.group.replace("_", " "));
                                ay = true
                            }
                            if (X.eUAaBMPush && !e(at.abm, X.uaABMIndex)) {
                                if (at.abm.length > 0) {
                                    var aq = at.abm[0];
                                    if (!e(aq.name)) {
                                        var au = "dimension" + X.uaABMIndex;
                                        ar[au] = aq.name;
                                        ay = true
                                    }
                                }
                            }
                        }
                        if (ay) {
                            if (m != null && L == "GA4") {
                                gtag("event", "RTP_GA_VISITOR_DATA", ar)
                            }
                            if (window.google_tag_manager && window.dataLayer) {
                                dataLayer.push({
                                    event: "RTP_GA_VISITOR_DATA",
                                    dimensionData: ar
                                })
                            }
                        }
                    }
                }
            },
            addLabels: function(an, ao) {
                if (ao !== undefined && ao !== null && ao.length > 0) {
                    if (typeof ao === "string") {
                        ao = ao.split(",")
                    }
                    ao = "[" + ao.join() + "]";
                    an = ao + " " + an
                }
                return an
            },
            pushSegments: function(ap) {
                if (X.eUA && !e(ap)) {
                    if (X.eUASgmPush) {
                        for (var aq = 0; aq < ap.length; aq++) {
                            if (ap[aq].pushToAnalytics) {
                                ae = ap[aq].organization;
                                this.trackEvent(aa, this.addLabels(ap[aq].segmentName, ap[aq].segmentLabels), ap[aq].organization)
                            }
                        }
                    }
                    var ao;
                    for (var aq = 0; aq < ap.length; aq++) {
                        ao = ap[aq].audiences;
                        if (!e(ao)) {
                            for (var an = 0; an < ao.length; an++) {
                                if (ao[an].pushToGA) {
                                    this.trackEvent(l, am, ao[an].name)
                                }
                            }
                        }
                    }
                }
            },
            pushCampaign: function(ao, an, ap) {
                if (X.eUA && X.eUACtaPush) {
                    if (ao == "Conversion") {
                        this.trackEvent(k, al, this.addLabels(an, ap))
                    } else {
                        this.trackEvent(k, ao, this.addLabels(an, ap))
                    }
                }
            }
        },
        o = {
            trackEvent: function(aq, ar, av, au, ap, at, an) {
                if (X.eSC) {
                    if (H != null) {
                        if (au == null && at == null) {
                            var ao = null;
                            ao = K(D, {
                                sid: an
                            });
                            V(ao, function(aw) {
                                var ax = aw.body;
                                if (!e(ax)) {
                                    if (!e(ax.indr)) {
                                        at = aw.body.indr[0];
                                        af = at
                                    }
                                    if (!e(ax.org)) {
                                        au = ax.org;
                                        ae = au
                                    }
                                }
                            })
                        }
                        if (!H.events || H.events.indexOf(aq) == -1) {
                            H.events = aq
                        }
                        if (!H.linkTrackEvents || H.linkTrackEvents.indexOf(aq) == -1) {
                            H.linkTrackEvents = aq
                        }
                        if (!e(av, au)) {
                            if (!H.linkTrackVars || H.linkTrackVars.indexOf(ap) == -1) {
                                H.linkTrackVars = av
                            }
                            H[av] = au
                        }
                        if (!e(ap, at)) {
                            if (!H.linkTrackEvents || H.linkTrackEvents == "None") {
                                H.linkTrackVars = ap
                            } else {
                                if (H.linkTrackVars && H.linkTrackVars.indexOf(ap) == -1) {
                                    H.linkTrackVars += "," + ap
                                }
                            }
                            H[ap] = at
                        }
                        s.tl(true, "o", ar)
                    }
                }
            },
            setCustomVar: function(ao, an) {
                if (X.eSC) {
                    if (H != null) {
                        if (!H.linkTrackEvents || H.linkTrackEvents == "None") {
                            H.linkTrackVars = ao
                        } else {
                            if (H.linkTrackVars && H.linkTrackVars.indexOf(ao) == -1) {
                                H.linkTrackVars += "," + ao
                            }
                        }
                        H[ao] = an
                    }
                }
            },
            trackPageview: function() {
                if (X.eSC && H != null) {
                    H.tl()
                }
            },
            pushCustomData: function(ao) {
                if (X.eSC) {
                    var an = false;
                    if (!ao.isp) {
                        if (X.newV && X.eSIndrPush && !e(ao.industries, X.sIndCC)) {
                            if (ao.industries.length > 0) {
                                var ap = ao.industries[0];
                                af = ap;
                                this.setCustomVar(q + X.sIndCC, ap);
                                an = true
                            }
                        }
                        if (X.newS && X.eSOrgPush && !e(ao.org)) {
                            ae = ao.org;
                            this.setCustomVar(q + X.sOrgCC, ae);
                            an = true
                        }
                    }
                    if (an) {
                        this.trackPageview()
                    }
                }
            },
            pushSegments: function(an) {
                if (X.eSC && X.eSSgmPush) {
                    if (!e(an)) {
                        for (var ao = 0; ao < an.length; ao++) {
                            if (an[ao].pushToAnalytics) {
                                ae = an[ao].organization;
                                af = an[ao].industry;
                                this.trackEvent(n + X.sSgmCE, d + " " + an[ao].segmentName, M + X.sSgmOrgTV, an[ao].organization, M + X.sSgmIndTV, an[ao].industry)
                            }
                        }
                    }
                }
            },
            pushCampaign: function(ap, ao, aq, an) {
                if (X.eSC && X.eSCtaPush && !e(X.sCmpOrgTV, X.sCmpIndTV)) {
                    if (ap == "Conversion") {
                        this.trackEvent(n + X.sCmpCE, ap + " " + a + aq + ", " + x + ao, M + X.sCmpOrgTV, ae, M + X.sCmpIndTV, af, an)
                    } else {
                        this.trackEvent(n + X.sCmpCE, ap + " " + a + aq + ", " + x + ao, M + X.sCmpOrgTV, ae, M + X.sCmpIndTV, af, an)
                    }
                }
            }
        },
        J = {
            trackEvent: function(ao, ap, aq, an) {
                if (X.eFC) {
                    if (b != null) {
                        if (an !== undefined && an != null) {
                            b.push(["track", ao, an])
                        } else {
                            var an = {};
                            an[ap] = aq;
                            b.push(["track", ao, an])
                        }
                    }
                }
            },
            pushCustomData: function(ar) {
                if (X.eFC) {
                    if (X.newS && !e(ar)) {
                        var ao = false;
                        var au = "";
                        var aq = {};
                        if (!ar.isp) {
                            if (X.eFCIndPush && !e(ar.industries)) {
                                var at = ar.industries[0];
                                if (!e(at)) {
                                    aq[R] = at
                                }
                            }
                            if (X.eFCCatPush && !e(ar.category)) {
                                var an = null;
                                if (ar.category === "ENTERPRISE") {
                                    an = v(ar.category)
                                } else {
                                    an = ar.category
                                }
                                aq[F] = an
                            }
                            if (X.eFCGroupPush && !e(ar.group)) {
                                aq[aj] = v(ar.group.replace("_", " "))
                            }
                            if (X.eFCAbmPush && !e(ar.abm)) {
                                if (ar.abm.length > 0) {
                                    for (var ap = 0; ap < ar.abm.length; ap++) {
                                        if (!e(ar.abm[ap].name)) {
                                            this.trackEvent(O, w, ar.abm[ap].name)
                                        }
                                    }
                                }
                            }
                        }
                        if (Object.keys(aq).length !== 0) {
                            this.trackEvent(O, null, null, aq)
                        }
                    }
                }
            },
            pushSegments: function(ap) {
                if (X.eFC && X.eFCSAPush) {
                    if (!e(ap)) {
                        var ao;
                        for (var aq = 0; aq < ap.length; aq++) {
                            ao = ap[aq].audiences;
                            if (!e(ao)) {
                                for (var an = 0; an < ao.length; an++) {
                                    if (ao[an].pushToFacebook) {
                                        this.trackEvent(O, am, ao[an].name)
                                    }
                                }
                            }
                        }
                    }
                }
            },
            pushCampaign: function(ao, an) {
                if (X.eFC && X.eFCCmpPush && !e(an)) {
                    if (ao == "Conversion") {
                        this.trackEvent(O, I, an)
                    }
                }
            }
        },
        Y = function(an) {
            try {
                return an()
            } catch (ao) {
                if (window.console && window.console.log) {
                    window.console.log("Analytics Error: ", ao)
                }
            }
        },
        ah = function(ao, ap) {
            var an = 0;
            for (var aq in ap) {
                if (ap.hasOwnProperty(aq) && ap[aq] !== undefined) {
                    if (an == 0) {
                        ao += "?" + aq + "=" + encodeURIComponent(ap[aq])
                    } else {
                        ao += "&" + aq + "=" + encodeURIComponent(ap[aq])
                    }
                    an++
                }
            }
            return ao
        },
        K = function(an, ap, ao) {
            switch (an) {
                case p:
                    return ah(X.gwtPrefix + X.ap + X.cmpn, ap);
                case D:
                    return ah(X.gwtPrefix + X.ap + X.indr, ap);
                case U:
                    return ah(X.gwtPrefix + X.ap + X.sgm, ap);
                default:
                    break
            }
        },
        Q = function(an, aq, ap, at, ao, au) {
            ag();
            if (aq == "Conversion") {
                var ar = X.racs[an];
                if (!e(ar) && ar.conv != 1) {
                    ar.conv = 1;
                    if (A(an, ac.CONVERSION, ao)) {
                        t(an, ac.CONVERSION, ao);
                        T.pushCampaign(aq, ar.rn, ar.labels);
                        c.pushCampaign(aq, ar.rn, ar.labels);
                        o.pushCampaign(aq, ar.rn, ar.msn, ao);
                        J.pushCampaign(aq, ar.rn)
                    }
                }
            } else {
                if (!e(an, ap, at)) {
                    if (A(an, ac.IMPRESSION, ao)) {
                        t(an, ac.IMPRESSION, ao);
                        T.pushCampaign(aq, ap, au);
                        c.pushCampaign(aq, ap, au);
                        o.pushCampaign(aq, ap, at, ao)
                    }
                    X.racs[an] = {
                        rn: ap,
                        msn: at,
                        labels: au
                    }
                }
            }
        },
        C = function(an) {
            ag();
            if (X.newS && (X.eGA || X.eSC || X.eUA || X.eFC) && an !== undefined && an != null) {
                var ao = null,
                    ap = 0;
                ao = X.gwtPrefix + "/rtp/api/v1_1/visitor?sid=" + an + "&aid=" + X.aid;
                V(ao, function(aq) {
                    var at = aq.results,
                        ar = "";
                    if (!e(at)) {
                        T.pushCustomData(at);
                        c.pushCustomData(at);
                        o.pushCustomData(at);
                        J.pushCustomData(at)
                    }
                })
            }
        },
        E = function() {
            ag();
            if (X.eGA || X.eSC || X.eUA || X.eFC) {
                var an = ab();
                var ao = null;
                if (an != null) {
                    ao = K(U, {
                        sid: an
                    })
                }
                V(ao, function(aq) {
                    var ar = aq.body;
                    if (!e(ar)) {
                        if (!e(ar.segments)) {
                            var ap = ar.segments;
                            T.pushSegments(ap);
                            c.pushSegments(ap);
                            o.pushSegments(ap);
                            J.pushSegments(ap)
                        }
                    }
                })
            }
        },
        N = function(an) {
            for (var ao in an) {
                if (an.hasOwnProperty(ao) && !e(an[ao])) {
                    X[ao] = an[ao]
                }
            }
        },
        i = {
            pushCampaign: function(aq, ao, ap, ar, an, at) {
                Y(function() {
                    Q(aq, ao, ap, ar, an, at)
                })
            },
            pushCustomData: function(an) {
                Y(function() {
                    C(an)
                })
            },
            pushSegment: function() {
                Y(function() {
                    E()
                })
            },
            setGWPrefix: function(an) {
                X.gwtPrefix = an
            },
            updateConfig: function(an) {
                Y(function() {
                    N(an)
                })
            }
        };

    function ag() {
        if (L === "") {
            if (window._gaq) {
                m = window._gaq;
                L = "ga";
                if (window._gat) {
                    var ap = null;
                    if ((ap = _gat._getTrackers())) {
                        B = ap
                    }
                }
            } else {
                if (window.GoogleAnalyticsObject && window[window.GoogleAnalyticsObject]) {
                    m = window[window.GoogleAnalyticsObject];
                    L = "analytics";
                    if (m.getAll) {
                        var ap = null;
                        if (ap = m.getAll()) {
                            B = ap
                        }
                    }
                } else {
                    if (window.gtag || window.google_tag_manager) {
                        G()
                    }
                }
            }
        }
        if (H === null) {
            var an = window.s_account || (window.s ? window.s.account : undefined);
            if (an && window.s_gi) {
                try {
                    H = s_gi(an)
                } catch (ao) {}
            }
        }
        if (window._fbq) {
            b = window._fbq
        }
    }

    function G() {
        var ap = document.getElementsByTagName("script");
        for (var an = 0; an < ap.length; an++) {
            var ao = ap[an].textContent;
            if (ao.includes("G-")) {
                console.log("Found GA4 tag");
                L = "GA4";
                m = window.gtag;
                break
            } else {
                if (ao.includes("GTM-")) {
                    console.log("Found GTM tag");
                    L = "GTM";
                    break
                }
            }
        }
    }

    function ak() {
        ag();
        if (window.iiq) {
            while (iiq.length) {
                var an = iiq.shift();
                var ao = an.shift();
                i[ao].apply(i, an)
            }
            iiq.push = function(ap) {
                var aq = ap.shift();
                i[aq].apply(i, ap)
            }
        }
    }
    if (document.readyState === "complete") {
        ak()
    } else {
        if (window.addEventListener) {
            window.addEventListener("load", ak, false)
        } else {
            window.attachEvent("onload", ak)
        }
    }
})(window);
if (typeof JSON !== "object") {
    JSON = {}
}(function() {
    function f(n) {
        return n < 10 ? "0" + n : n
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap,
            partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
            case "string":
                return quote(value);
            case "number":
                return isFinite(value) ? String(value) : "null";
            case "boolean":
            case "null":
                return String(value);
            case "object":
                if (!value) {
                    return "null"
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === "[object Array]") {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null"
                    }
                    v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                    gap = mind;
                    return v
                }
                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === "string") {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                }
                v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                gap = mind;
                return v
        }
    }
    if (typeof JSON.stringify !== "function") {
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {
                "": value
            })
        }
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function(text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
}());