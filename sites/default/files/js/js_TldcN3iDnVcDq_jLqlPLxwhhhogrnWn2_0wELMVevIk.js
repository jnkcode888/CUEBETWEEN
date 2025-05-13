/* @license GNU-GPL-2.0-or-later https://www.drupal.org/licensing/faq */ ! function($) {
    "use strict";
    Drupal.behaviors.vidyard_modal = {
        attach: function(context, settings) {
            function launchLightbox(val) {
                var player = VidyardV4.api.getPlayersByUUID(val)[0];
                player.showLightbox();
            }
            $(".vidyard-video-popup").on("click", function(e) {
                let height = $(this).height();
                let video_uuid = $(this).attr('video-uuid');
                let embed_slector = $(this).attr('data-embed_id');
                $('#' + embed_slector).css({
                    'max-height': height + 'px'
                });
                vidyardEmbed.api.renderPlayer({
                    uuid: video_uuid,
                    container: document.getElementById(embed_slector),
                    type: 'lightbox',
                    autoplay: 1,
                    height: 0
                }).then((player) => {
                    launchLightbox(video_uuid);
                    $('.vidyard-close-x, #vidyard-overlay-wrapper').on("click", function(e) {
                        $('#' + embed_slector).find('.vidyard-video-popup').siblings('.vidyard-player-container,.vidyard-player-embed').remove();
                        $('#' + embed_slector).find('.vidyard-video-popup').show();
                        $('#' + embed_slector).css({
                            'max-height': ""
                        });
                    });
                }).catch((e) => {
                    console.error(e.message);
                });
            });
        }
    };
}(jQuery);;
! function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery);
}(function(i) {
    "use strict";
    var e = window.Slick || {};
    (e = function() {
        var e = 0;
        return function(t, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(t),
                appendDots: i(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, t) {
                    return i('<button type="button" />').text(t + 1);
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0);
        };
    }()).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        });
    }, e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
        var s = this;
        if ("boolean" == typeof t) o = t, t = null;
        else {
            if (t < 0 || t >= s.slideCount) return !1;
        }
        s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e);
        }), s.$slidesCache = s.$slides, s.reinit();
    }, e.prototype.animateHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({
                height: e
            }, i.options.speed);
        }
    }, e.prototype.animateSlide = function(e, t) {
        var o = {},
            s = this;
        s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
            left: e
        }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
            top: e
        }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({
            animStart: s.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function(i) {
                i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o));
            },
            complete: function() {
                t && t.call();
            }
        })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function() {
            s.disableTransition(), t.call();
        }, s.options.speed));
    }, e.prototype.getNavTarget = function() {
        var e = this,
            t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)), t;
    }, e.prototype.asNavFor = function(e) {
        var t = this.getNavTarget();
        null !== t && "object" == typeof t && t.each(function() {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0);
        });
    }, e.prototype.applyTransition = function(i) {
        var e = this,
            t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }, e.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed));
    }, e.prototype.autoPlayClear = function() {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer);
    }, e.prototype.autoPlayIterator = function() {
        var i = this,
            e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e));
    }, e.prototype.buildArrows = function() {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }));
    }, e.prototype.buildDots = function() {
        var e, t, o = this;
        if (!0 === o.options.dots) {
            for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active");
        }
    }, e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "");
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable");
    }, e.prototype.buildRows = function() {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
            for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c));
                    }
                    d.appendChild(a);
                }
                o.appendChild(d);
            }
            l.$slider.empty().append(o), l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            });
        }
    }, e.prototype.checkResponsive = function(e, t) {
        var o, s, n, r = this,
            l = !1,
            d = r.$slider.width(),
            a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
        }
    }, e.prototype.changeSlide = function(e, t) {
        var o, s, n, r = this,
            l = i(e.currentTarget);
        switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
            case "previous":
                s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                break;
            case "next":
                s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                break;
            case "index":
                var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                break;
            default:
                return;
        }
    }, e.prototype.checkNavigable = function(i) {
        var e, t;
        if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];
        else
            for (var o in e) {
                if (i < e[o]) {
                    i = t;
                    break;
                }
                t = e[o];
            }
        return i;
    }, e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
    }, e.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }, e.prototype.cleanUpRows = function() {
        var i, e = this;
        e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i));
    }, e.prototype.clickHandler = function(i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
    }, e.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            i(this).attr("style", i(this).data("originalStyling"));
        }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t]);
    }, e.prototype.disableTransition = function(i) {
        var e = this,
            t = {};
        t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }, e.prototype.fadeSlide = function(i, e) {
        var t = this;
        !1 === t.cssTransitions ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }), t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }), e && setTimeout(function() {
            t.disableTransition(i), e.call();
        }, t.options.speed));
    }, e.prototype.fadeSlideOut = function(i) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }));
    }, e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit());
    }, e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(t) {
            t.stopImmediatePropagation();
            var o = i(this);
            setTimeout(function() {
                e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay());
            }, 0);
        });
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        return this.currentSlide;
    }, e.prototype.getDotCount = function() {
        var i = this,
            e = 0,
            t = 0,
            o = 0;
        if (!0 === i.options.infinite)
            if (i.slideCount <= i.options.slidesToShow) ++o;
            else
                for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (!0 === i.options.centerMode) o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1;
    }, e.prototype.getLeft = function(i) {
        var e, t, o, s, n = this,
            r = 0;
        return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e;
    }, e.prototype.getOption = e.prototype.slickGetOption = function(i) {
        return this.options[i];
    }, e.prototype.getNavigableIndexes = function() {
        var i, e = this,
            t = 0,
            o = 0,
            s = [];
        for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s;
    }, e.prototype.getSlick = function() {
        return this;
    }, e.prototype.getSlideCount = function() {
        var e, t, o = this;
        return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(s, n) {
            if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1;
        }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll;
    }, e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e);
    }, e.prototype.init = function(e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay());
    }, e.prototype.initADA = function() {
        var e = this,
            t = Math.ceil(e.slideCount / e.options.slidesToShow),
            o = e.getNavigableIndexes().filter(function(i) {
                return i >= 0 && i < e.slideCount;
            });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
            var s = o.indexOf(t);
            i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1
            }), -1 !== s && i(this).attr({
                "aria-describedby": "slick-slide-control" + e.instanceUid + s
            });
        }), e.$dots.attr("role", "tablist").find("li").each(function(s) {
            var n = o[s];
            i(this).attr({
                role: "presentation"
            }), i(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + s,
                "aria-controls": "slick-slide" + e.instanceUid + n,
                "aria-label": s + 1 + " of " + t,
                "aria-selected": null,
                tabindex: "-1"
            });
        }).eq(e.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.$slides.eq(s).attr("tabindex", 0);
        e.activateADA();
    }, e.prototype.initArrowEvents = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)));
    }, e.prototype.initDotEvents = function() {
        var e = this;
        !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }, e.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
    }, e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition);
    }, e.prototype.initUI = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show();
    }, e.prototype.keyHandler = function(i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }));
    }, e.prototype.lazyLoad = function() {
        function e(e) {
            i("img[data-lazy]", e).each(function() {
                var e = i(this),
                    t = i(this).attr("data-lazy"),
                    o = i(this).attr("data-srcset"),
                    s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                    r = document.createElement("img");
                r.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                        }), n.$slider.trigger("lazyLoaded", [n, e, t]);
                    });
                }, r.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t]);
                }, r.src = t;
            });
        }
        var t, o, s, n = this;
        if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad)
            for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
        e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow));
    }, e.prototype.loadSlider = function() {
        var i = this;
        i.setPosition(), i.$slideTrack.css({
            opacity: 1
        }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
    }, e.prototype.next = e.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        });
    }, e.prototype.orientationChange = function() {
        var i = this;
        i.checkResponsive(), i.setPosition();
    }, e.prototype.pause = e.prototype.slickPause = function() {
        var i = this;
        i.autoPlayClear(), i.paused = !0;
    }, e.prototype.play = e.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1;
    }, e.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
    }, e.prototype.prev = e.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        });
    }, e.prototype.preventDefault = function(i) {
        i.preventDefault();
    }, e.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, o, s, n, r, l = this,
            d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function() {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad();
        }, r.onerror = function() {
            e < 3 ? setTimeout(function() {
                l.progressiveLazyLoad(e + 1);
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad());
        }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l]);
    }, e.prototype.refresh = function(e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
            currentSlide: t
        }), s.init(), e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1);
    }, e.prototype.registerBreakpoints = function() {
        var e, t, o, s = this,
            n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n)
                if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                    for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                    s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings;
                }
            s.breakpoints.sort(function(i, e) {
                return s.options.mobileFirst ? i - e : e - i;
            });
        }
    }, e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e]);
    }, e.prototype.resize = function() {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
            e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition();
        }, 50));
    }, e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
        var o = this;
        if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
        o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit();
    }, e.prototype.setCSS = function(i) {
        var e, t, o = this,
            s = {};
        !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)));
    }, e.prototype.setDimensions = function() {
        var i = this;
        !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
    }, e.prototype.setFade = function() {
        var e, t = this;
        t.$slides.each(function(o, s) {
            e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            });
        }), t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        });
    }, e.prototype.setHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e);
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function() {
        var e, t, o, s, n, r = this,
            l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
        else if ("multiple" === n) i.each(o, function(i, e) {
            r.options[i] = e;
        });
        else {
            if ("responsive" === n)
                for (t in s)
                    if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
                    else {
                        for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                        r.options.responsive.push(s[t]);
                    }
        }
        l && (r.unload(), r.reinit());
    }, e.prototype.setPosition = function() {
        var i = this;
        i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i]);
    }, e.prototype.setProps = function() {
        var i = this,
            e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType;
    }, e.prototype.setSlideClasses = function(i) {
        var e, t, o, s, n = this;
        if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
            var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
            e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center");
        } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad();
    }, e.prototype.setupInfinite = function() {
        var e, t, o, s = this;
        if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
            for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                i(this).attr("id", "");
            });
        }
    }, e.prototype.interrupt = function(i) {
        var e = this;
        i || e.autoPlay(), e.interrupted = i;
    }, e.prototype.selectHandler = function(e) {
        var t = this,
            o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
            s = parseInt(o.attr("data-slick-index"));
        s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s);
    }, e.prototype.slideHandler = function(i, e, t) {
        var o, s, n, r, l, d = null,
            a = this;
        if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
            if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() {
                a.postSlide(o);
            }) : a.postSlide(o));
            else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() {
            a.postSlide(o);
        }) : a.postSlide(o));
        else {
            if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function() {
                a.postSlide(s);
            })) : a.postSlide(s), void a.animateHeight();
            !0 !== t ? a.animateSlide(d, function() {
                a.postSlide(s);
            }) : a.postSlide(s);
        }
    }, e.prototype.startLoad = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading");
    }, e.prototype.swipeDirection = function() {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical";
    }, e.prototype.swipeEnd = function(i) {
        var e, t, o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
        if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
                case "left":
                case "down":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1;
            }
            "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]));
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {});
    }, e.prototype.swipeHandler = function(i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i);
        }
    }, e.prototype.swipeMove = function(i) {
        var e, t, o, s, n, r, l = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))));
    }, e.prototype.swipeStart = function(i) {
        var e, t = this;
        if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0;
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit());
    }, e.prototype.unload = function() {
        var e = this;
        i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
    }, e.prototype.unslick = function(i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy();
    }, e.prototype.updateArrows = function() {
        var i = this;
        Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
    }, e.prototype.updateDots = function() {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"));
    }, e.prototype.visibility = function() {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1);
    }, i.fn.slick = function() {
        var i, t, o = this,
            s = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            r = o.length;
        for (i = 0; i < r; i++)
            if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
        return o;
    };
});;
! function($) {
    "use strict";
    Drupal.behaviors.SlickCustom = {
        attach: function(context, settings) {
            var slickArray = drupalSettings.cvent_custom_scripts.slickData;
            var sliderClass = '';
            let trackSliderClass = '';

            function sliderSingleItem(paragraph) {
                if (paragraph.type === 'content-track-slick') {
                    trackSliderClass = '.content-track-tabs.sidebar1 .vertical';

                    function initializeSlick() {
                        $(trackSliderClass).slick({
                            responsive: [{
                                breakpoint: 1080,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    arrows: true,
                                    centerMode: false
                                }
                            }]
                        });
                    }
                    $(document).ready(function() {
                        if ($(window).width() < 1079) initializeSlick();
                        $(window).on('resize', debounce(function() {
                            if ($(window).width() < 1080 && !$(trackSliderClass).hasClass('slick-initialized')) initializeSlick();
                            else {
                                if ($(window).width() > 1079 && $(trackSliderClass).hasClass('slick-initialized')) $(trackSliderClass).slick('unslick');
                            }
                        }, 100));
                    });
                }
                if (paragraph.type == 'mobile-slick-only') {
                    function initializeMobileSlick() {
                        sliderClass = '.paragraph--id--' + paragraph.paragraphId + ' .summary-output' + ',.paragraph--id--' + paragraph.paragraphId + ' .field__items';
                        if ($(sliderClass).children().length > 1) {
                            function initializeSlickItem() {
                                $(sliderClass).slick({
                                    infinite: true,
                                    speed: 300,
                                    slidesToShow: paragraph.showSlide,
                                    arrows: false,
                                    dots: true,
                                    mobileFirst: true,
                                    autoplay: true,
                                    autoplaySpeed: 2000,
                                    responsive: [{
                                        breakpoint: 560,
                                        settings: {
                                            slidesToShow: 1,
                                            centerMode: false,
                                            slidesToScroll: 1,
                                            dots: true
                                        }
                                    }]
                                });
                            }
                            if ($(window).width() < 560 && !$(sliderClass).hasClass('slick-initialized')) initializeSlickItem();
                            else {
                                if ($(window).width() > 559 && $(sliderClass).hasClass('slick-initialized')) $(sliderClass).slick('unslick');
                            }
                        }
                    }
                    $(document).ready(function() {
                        if ($(window).width() < 560) initializeMobileSlick();
                        $(window).on('resize', debounce(function() {
                            initializeMobileSlick();
                        }, 100));
                    });
                } else if (paragraph.type == 'content-layout-slick') {
                    sliderClass = '.paragraph--id--' + paragraph.paragraphId + ' .layout-content__container > .field__items';
                    if ($(sliderClass).children().length > 1) {
                        $(sliderClass).slick({
                            infinite: true,
                            speed: 400,
                            slidesToShow: paragraph.showSlide,
                            arrows: true,
                            dots: true,
                            mobileFirst: true,
                            autoplay: paragraph.autoplay,
                            autoplaySpeed: 4000,
                            responsive: [{
                                breakpoint: 220,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }, {
                                breakpoint: 1080,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 1
                                }
                            }, {
                                breakpoint: 1464,
                                settings: {
                                    slidesToShow: paragraph.showSlide,
                                    slidesToScroll: 1
                                }
                            }]
                        });
                        $(sliderClass).on('wheel', function(e) {
                            if (Math.abs(e.originalEvent.deltaX) > Math.abs(e.originalEvent.deltaY)) {
                                e.preventDefault();
                                if (e.originalEvent.deltaX > 0) $(this).slick('slickNext');
                                else {
                                    if (e.originalEvent.deltaX < 0) $(this).slick('slickPrev');
                                }
                            }
                        });
                    }
                } else {
                    sliderClass = '#cvent-paragraph-global_slider-' + paragraph.paragraphId + '  .slide-wrap .global-slider-content';
                    $(sliderClass).slick({
                        infinite: true,
                        speed: 300,
                        slidesToShow: paragraph.showSlide,
                        arrows: true,
                        dots: paragraph.showDots,
                        responsive: [{
                            breakpoint: 1920,
                            settings: {
                                slidesToShow: paragraph.showSlide
                            }
                        }, {
                            breakpoint: 1464,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1
                            }
                        }, {
                            breakpoint: 1080,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }]
                    });
                    $(sliderClass).on('wheel', function(e) {
                        if (Math.abs(e.originalEvent.deltaX) > Math.abs(e.originalEvent.deltaY)) {
                            e.preventDefault();
                            if (e.originalEvent.deltaX > 0) $(this).slick('slickNext');
                            else {
                                if (e.originalEvent.deltaX < 0) $(this).slick('slickPrev');
                            }
                        }
                    });
                }
            }
            for (var item in slickArray) sliderSingleItem(slickArray[item]);

            function debounce(func, delay) {
                let timeout;
                return function() {
                    const context = this;
                    const args = arguments;
                    clearTimeout(timeout);
                    timeout = setTimeout(() => func.apply(context, args), delay);
                };
            }
        }
    };
}(jQuery);;;
var hljs = new function() {
    function k(v) {
        return v.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;");
    }

    function t(v) {
        return v.nodeName.toLowerCase();
    }

    function i(w, x) {
        var v = w && w.exec(x);
        return v && v.index == 0;
    }

    function d(v) {
        return Array.prototype.map.call(v.childNodes, function(w) {
            if (w.nodeType == 3) return b.useBR ? w.nodeValue.replace(/\n/g, "") : w.nodeValue;
            if (t(w) == "br") return "\n";
            return d(w);
        }).join("");
    }

    function r(w) {
        var v = (w.className + " " + (w.parentNode ? w.parentNode.className : "")).split(/\s+/);
        v = v.map(function(x) {
            return x.replace(/^language-/, "");
        });
        return v.filter(function(x) {
            return j(x) || x == "no-highlight";
        })[0];
    }

    function o(x, y) {
        var v = {};
        for (var w in x) v[w] = x[w];
        if (y)
            for (var w in y) v[w] = y[w];
        return v;
    }

    function u(x) {
        var v = [];
        (function w(y, z) {
            for (var A = y.firstChild; A; A = A.nextSibling)
                if (A.nodeType == 3) z += A.nodeValue.length;
                else if (t(A) == "br") z += 1;
            else {
                if (A.nodeType == 1) {
                    v.push({
                        event: "start",
                        offset: z,
                        node: A
                    });
                    z = w(A, z);
                    v.push({
                        event: "stop",
                        offset: z,
                        node: A
                    });
                }
            }
            return z;
        })(x, 0);
        return v;
    }

    function q(w, y, C) {
        var x = 0;
        var F = "";
        var z = [];

        function B() {
            if (!w.length || !y.length) return w.length ? w : y;
            if (w[0].offset != y[0].offset) return (w[0].offset < y[0].offset) ? w : y;
            return y[0].event == "start" ? w : y;
        }

        function A(H) {
            function G(I) {
                return " " + I.nodeName + '="' + k(I.value) + '"';
            }
            F += "<" + t(H) + Array.prototype.map.call(H.attributes, G).join("") + ">";
        }

        function E(G) {
            F += "</" + t(G) + ">";
        }

        function v(G) {
            (G.event == "start" ? A : E)(G.node);
        }
        while (w.length || y.length) {
            var D = B();
            F += k(C.substr(x, D[0].offset - x));
            x = D[0].offset;
            if (D == w) {
                z.reverse().forEach(E);
                do {
                    v(D.splice(0, 1)[0]);
                    D = B();
                } while (D == w && D.length && D[0].offset == x);
                z.reverse().forEach(A);
            } else {
                if (D[0].event == "start") z.push(D[0].node);
                else z.pop();
                v(D.splice(0, 1)[0]);
            }
        }
        return F + k(C.substr(x));
    }

    function m(y) {
        function v(z) {
            return (z && z.source) || z;
        }

        function w(A, z) {
            return RegExp(v(A), "m" + (y.cI ? "i" : "") + (z ? "g" : ""));
        }

        function x(D, C) {
            if (D.compiled) return;
            D.compiled = true;
            D.k = D.k || D.bK;
            if (D.k) {
                var z = {};

                function E(G, F) {
                    if (y.cI) F = F.toLowerCase();
                    F.split(" ").forEach(function(H) {
                        var I = H.split("|");
                        z[I[0]] = [G, I[1] ? Number(I[1]) : 1];
                    });
                }
                if (typeof D.k == "string") E("keyword", D.k);
                else Object.keys(D.k).forEach(function(F) {
                    E(F, D.k[F]);
                });
                D.k = z;
            }
            D.lR = w(D.l || /\b[A-Za-z0-9_]+\b/, true);
            if (C) {
                if (D.bK) D.b = D.bK.split(" ").join("|");
                if (!D.b) D.b = /\B|\b/;
                D.bR = w(D.b);
                if (!D.e && !D.eW) D.e = /\B|\b/;
                if (D.e) D.eR = w(D.e);
                D.tE = v(D.e) || "";
                if (D.eW && C.tE) D.tE += (D.e ? "|" : "") + C.tE;
            }
            if (D.i) D.iR = w(D.i);
            if (D.r === undefined) D.r = 1;
            if (!D.c) D.c = [];
            var B = [];
            D.c.forEach(function(F) {
                if (F.v) F.v.forEach(function(G) {
                    B.push(o(F, G));
                });
                else B.push(F == "self" ? D : F);
            });
            D.c = B;
            D.c.forEach(function(F) {
                x(F, D);
            });
            if (D.starts) x(D.starts, C);
            var A = D.c.map(function(F) {
                return F.bK ? "\\.?\\b(" + F.b + ")\\b\\.?" : F.b;
            }).concat([D.tE]).concat([D.i]).map(v).filter(Boolean);
            D.t = A.length ? w(A.join("|"), true) : {
                exec: function(F) {
                    return null;
                }
            };
            D.continuation = {};
        }
        x(y);
    }

    function c(S, L, J, R) {
        function v(U, V) {
            for (var T = 0; T < V.c.length; T++)
                if (i(V.c[T].bR, U)) return V.c[T];
        }

        function z(U, T) {
            if (i(U.eR, T)) return U;
            if (U.eW) return z(U.parent, T);
        }

        function A(T, U) {
            return !J && i(U.iR, T);
        }

        function E(V, T) {
            var U = M.cI ? T[0].toLowerCase() : T[0];
            return V.k.hasOwnProperty(U) && V.k[U];
        }

        function w(Z, X, W, V) {
            var T = V ? "" : b.classPrefix,
                U = '<span class="' + T,
                Y = W ? "" : "</span>";
            U += Z + '">';
            return U + X + Y;
        }

        function N() {
            var U = k(C);
            if (!I.k) return U;
            var T = "";
            var X = 0;
            I.lR.lastIndex = 0;
            var V = I.lR.exec(U);
            while (V) {
                T += U.substr(X, V.index - X);
                var W = E(I, V);
                if (W) {
                    H += W[1];
                    T += w(W[0], V[0]);
                } else T += V[0];
                X = I.lR.lastIndex;
                V = I.lR.exec(U);
            }
            return T + U.substr(X);
        }

        function F() {
            if (I.sL && !f[I.sL]) return k(C);
            var T = I.sL ? c(I.sL, C, true, I.continuation.top) : g(C);
            if (I.r > 0) H += T.r;
            if (I.subLanguageMode == "continuous") I.continuation.top = T.top;
            return w(T.language, T.value, false, true);
        }

        function Q() {
            return I.sL !== undefined ? F() : N();
        }

        function P(V, U) {
            var T = V.cN ? w(V.cN, "", true) : "";
            if (V.rB) {
                D += T;
                C = "";
            } else if (V.eB) {
                D += k(U) + T;
                C = "";
            } else {
                D += T;
                C = U;
            }
            I = Object.create(V, {
                parent: {
                    value: I
                }
            });
        }

        function G(T, X) {
            C += T;
            if (X === undefined) {
                D += Q();
                return 0;
            }
            var V = v(X, I);
            if (V) {
                D += Q();
                P(V, X);
                return V.rB ? 0 : X.length;
            }
            var W = z(I, X);
            if (W) {
                var U = I;
                if (!(U.rE || U.eE)) C += X;
                D += Q();
                do {
                    if (I.cN) D += "</span>";
                    H += I.r;
                    I = I.parent;
                } while (I != W.parent);
                if (U.eE) D += k(X);
                C = "";
                if (W.starts) P(W.starts, "");
                return U.rE ? 0 : X.length;
            }
            if (A(X, I)) throw new Error('Illegal lexeme "' + X + '" for mode "' + (I.cN || "<unnamed>") + '"');
            C += X;
            return X.length || 1;
        }
        var M = j(S);
        if (!M) throw new Error('Unknown language: "' + S + '"');
        m(M);
        var I = R || M;
        var D = "";
        for (var K = I; K != M; K = K.parent)
            if (K.cN) D = w(K.cN, D, true);
        var C = "";
        var H = 0;
        try {
            var B, y, x = 0;
            while (true) {
                I.t.lastIndex = x;
                B = I.t.exec(L);
                if (!B) break;
                y = G(L.substr(x, B.index - x), B[0]);
                x = B.index + y;
            }
            G(L.substr(x));
            for (var K = I; K.parent; K = K.parent)
                if (K.cN) D += "</span>";
            return {
                r: H,
                value: D,
                language: S,
                top: I
            };
        } catch (O) {
            if (O.message.indexOf("Illegal") != -1) return {
                r: 0,
                value: k(L)
            };
            else throw O;
        }
    }

    function g(y, x) {
        x = x || b.languages || Object.keys(f);
        var v = {
            r: 0,
            value: k(y)
        };
        var w = v;
        x.forEach(function(z) {
            if (!j(z)) return;
            var A = c(z, y, false);
            A.language = z;
            if (A.r > w.r) w = A;
            if (A.r > v.r) {
                w = v;
                v = A;
            }
        });
        if (w.language) v.second_best = w;
        return v;
    }

    function h(v) {
        if (b.tabReplace) v = v.replace(/^((<[^>]+>|\t)+)/gm, function(w, z, y, x) {
            return z.replace(/\t/g, b.tabReplace);
        });
        if (b.useBR) v = v.replace(/\n/g, "<br>");
        return v;
    }

    function p(z) {
        var y = d(z);
        var A = r(z);
        if (A == "no-highlight") return;
        var v = A ? c(A, y, true) : g(y);
        var w = u(z);
        if (w.length) {
            var x = document.createElementNS("http://www.w3.org/1999/xhtml", "pre");
            x.innerHTML = v.value;
            v.value = q(w, u(x), y);
        }
        v.value = h(v.value);
        z.innerHTML = v.value;
        z.className += " hljs " + (!A && v.language || "");
        z.result = {
            language: v.language,
            re: v.r
        };
        if (v.second_best) z.second_best = {
            language: v.second_best.language,
            re: v.second_best.r
        };
    }
    var b = {
        classPrefix: "hljs-",
        tabReplace: null,
        useBR: false,
        languages: undefined
    };

    function s(v) {
        b = o(b, v);
    }

    function l() {
        if (l.called) return;
        l.called = true;
        var v = document.querySelectorAll("pre code");
        Array.prototype.forEach.call(v, p);
    }

    function a() {
        addEventListener("DOMContentLoaded", l, false);
        addEventListener("load", l, false);
    }
    var f = {};
    var n = {};

    function e(v, x) {
        var w = f[v] = x(this);
        if (w.aliases) w.aliases.forEach(function(y) {
            n[y] = v;
        });
    }

    function j(v) {
        return f[v] || f[n[v]];
    }
    this.highlight = c;
    this.highlightAuto = g;
    this.fixMarkup = h;
    this.highlightBlock = p;
    this.configure = s;
    this.initHighlighting = l;
    this.initHighlightingOnLoad = a;
    this.registerLanguage = e;
    this.getLanguage = j;
    this.inherit = o;
    this.IR = "[a-zA-Z][a-zA-Z0-9_]*";
    this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*";
    this.NR = "\\b\\d+(\\.\\d+)?";
    this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
    this.BNR = "\\b(0b[01]+)";
    this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
    this.BE = {
        b: "\\\\[\\s\\S]",
        r: 0
    };
    this.ASM = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n",
        c: [this.BE]
    };
    this.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [this.BE]
    };
    this.CLCM = {
        cN: "comment",
        b: "//",
        e: "$"
    };
    this.CBLCLM = {
        cN: "comment",
        b: "/\\*",
        e: "\\*/"
    };
    this.HCM = {
        cN: "comment",
        b: "#",
        e: "$"
    };
    this.NM = {
        cN: "number",
        b: this.NR,
        r: 0
    };
    this.CNM = {
        cN: "number",
        b: this.CNR,
        r: 0
    };
    this.BNM = {
        cN: "number",
        b: this.BNR,
        r: 0
    };
    this.REGEXP_MODE = {
        cN: "regexp",
        b: /\//,
        e: /\/[gim]*/,
        i: /\n/,
        c: [this.BE, {
            b: /\[/,
            e: /\]/,
            r: 0,
            c: [this.BE]
        }]
    };
    this.TM = {
        cN: "title",
        b: this.IR,
        r: 0
    };
    this.UTM = {
        cN: "title",
        b: this.UIR,
        r: 0
    };
}();
hljs.registerLanguage("bash", function(b) {
    var a = {
        cN: "variable",
        v: [{
            b: /\$[\w\d#@][\w\d_]*/
        }, {
            b: /\$\{(.*?)\}/
        }]
    };
    var d = {
        cN: "string",
        b: /"/,
        e: /"/,
        c: [b.BE, a, {
            cN: "variable",
            b: /\$\(/,
            e: /\)/,
            c: [b.BE]
        }]
    };
    var c = {
        cN: "string",
        b: /'/,
        e: /'/
    };
    return {
        l: /-?[a-z\.]+/,
        k: {
            keyword: "if then else elif fi for break continue while in do done exit return set declare case esac export exec",
            literal: "true false",
            built_in: "printf echo read cd pwd pushd popd dirs let eval unset typeset readonly getopts source shopt caller type hash bind help sudo",
            operator: "-ne -eq -lt -gt -f -d -e -s -l -a"
        },
        c: [{
            cN: "shebang",
            b: /^#![^\n]+sh\s*$/,
            r: 10
        }, {
            cN: "function",
            b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
            rB: true,
            c: [b.inherit(b.TM, {
                b: /\w[\w\d_]*/
            })],
            r: 0
        }, b.HCM, b.NM, d, c, a]
    };
});
hljs.registerLanguage("cs", function(b) {
    var a = "abstract as base bool break byte case catch char checked const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async await ascending descending from get group into join let orderby partial select set value var where yield";
    return {
        k: a,
        c: [{
            cN: "comment",
            b: "///",
            e: "$",
            rB: true,
            c: [{
                cN: "xmlDocTag",
                b: "///|<!--|-->"
            }, {
                cN: "xmlDocTag",
                b: "</?",
                e: ">"
            }]
        }, b.CLCM, b.CBLCLM, {
            cN: "preprocessor",
            b: "#",
            e: "$",
            k: "if else elif endif define undef warning error line region endregion pragma checksum"
        }, {
            cN: "string",
            b: '@"',
            e: '"',
            c: [{
                b: '""'
            }]
        }, b.ASM, b.QSM, b.CNM, {
            bK: "protected public private internal",
            e: /[{;=]/,
            k: a,
            c: [{
                bK: "class namespace interface",
                starts: {
                    c: [b.TM]
                }
            }, {
                b: b.IR + "\\s*\\(",
                rB: true,
                c: [b.TM]
            }]
        }]
    };
});
hljs.registerLanguage("ruby", function(e) {
    var h = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?";
    var g = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor";
    var a = {
        cN: "yardoctag",
        b: "@[A-Za-z]+"
    };
    var i = {
        cN: "comment",
        v: [{
            b: "#",
            e: "$",
            c: [a]
        }, {
            b: "^\\=begin",
            e: "^\\=end",
            c: [a],
            r: 10
        }, {
            b: "^__END__",
            e: "\\n$"
        }]
    };
    var c = {
        cN: "subst",
        b: "#\\{",
        e: "}",
        k: g
    };
    var d = {
        cN: "string",
        c: [e.BE, c],
        v: [{
            b: /'/,
            e: /'/
        }, {
            b: /"/,
            e: /"/
        }, {
            b: "%[qw]?\\(",
            e: "\\)"
        }, {
            b: "%[qw]?\\[",
            e: "\\]"
        }, {
            b: "%[qw]?{",
            e: "}"
        }, {
            b: "%[qw]?<",
            e: ">",
            r: 10
        }, {
            b: "%[qw]?/",
            e: "/",
            r: 10
        }, {
            b: "%[qw]?%",
            e: "%",
            r: 10
        }, {
            b: "%[qw]?-",
            e: "-",
            r: 10
        }, {
            b: "%[qw]?\\|",
            e: "\\|",
            r: 10
        }, {
            b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
        }]
    };
    var b = {
        cN: "params",
        b: "\\(",
        e: "\\)",
        k: g
    };
    var f = [d, i, {
        cN: "class",
        bK: "class module",
        e: "$|;",
        i: /=/,
        c: [e.inherit(e.TM, {
            b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
        }), {
            cN: "inheritance",
            b: "<\\s*",
            c: [{
                cN: "parent",
                b: "(" + e.IR + "::)?" + e.IR
            }]
        }, i]
    }, {
        cN: "function",
        bK: "def",
        e: " |$|;",
        r: 0,
        c: [e.inherit(e.TM, {
            b: h
        }), b, i]
    }, {
        cN: "constant",
        b: "(::)?(\\b[A-Z]\\w*(::)?)+",
        r: 0
    }, {
        cN: "symbol",
        b: ":",
        c: [d, {
            b: h
        }],
        r: 0
    }, {
        cN: "symbol",
        b: e.UIR + "(\\!|\\?)?:",
        r: 0
    }, {
        cN: "number",
        b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        r: 0
    }, {
        cN: "variable",
        b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
    }, {
        b: "(" + e.RSR + ")\\s*",
        c: [i, {
            cN: "regexp",
            c: [e.BE, c],
            i: /\n/,
            v: [{
                b: "/",
                e: "/[a-z]*"
            }, {
                b: "%r{",
                e: "}[a-z]*"
            }, {
                b: "%r\\(",
                e: "\\)[a-z]*"
            }, {
                b: "%r!",
                e: "![a-z]*"
            }, {
                b: "%r\\[",
                e: "\\][a-z]*"
            }]
        }],
        r: 0
    }];
    c.c = f;
    b.c = f;
    return {
        k: g,
        c: f
    };
});
hljs.registerLanguage("diff", function(a) {
    return {
        c: [{
            cN: "chunk",
            r: 10,
            v: [{
                b: /^\@\@ +\-\d+,\d+ +\+\d+,\d+ +\@\@$/
            }, {
                b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
            }, {
                b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/
            }]
        }, {
            cN: "header",
            v: [{
                b: /Index: /,
                e: /$/
            }, {
                b: /=====/,
                e: /=====$/
            }, {
                b: /^\-\-\-/,
                e: /$/
            }, {
                b: /^\*{3} /,
                e: /$/
            }, {
                b: /^\+\+\+/,
                e: /$/
            }, {
                b: /\*{5}/,
                e: /\*{5}$/
            }]
        }, {
            cN: "addition",
            b: "^\\+",
            e: "$"
        }, {
            cN: "deletion",
            b: "^\\-",
            e: "$"
        }, {
            cN: "change",
            b: "^\\!",
            e: "$"
        }]
    };
});
hljs.registerLanguage("javascript", function(a) {
    return {
        aliases: ["js"],
        k: {
            keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",
            literal: "true false null undefined NaN Infinity",
            built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require"
        },
        c: [{
            cN: "pi",
            b: /^\s*('|")use strict('|")/,
            r: 10
        }, a.ASM, a.QSM, a.CLCM, a.CBLCLM, a.CNM, {
            b: "(" + a.RSR + "|\\b(case|return|throw)\\b)\\s*",
            k: "return throw case",
            c: [a.CLCM, a.CBLCLM, a.REGEXP_MODE, {
                b: /</,
                e: />;/,
                r: 0,
                sL: "xml"
            }],
            r: 0
        }, {
            cN: "function",
            bK: "function",
            e: /\{/,
            c: [a.inherit(a.TM, {
                b: /[A-Za-z$_][0-9A-Za-z$_]*/
            }), {
                cN: "params",
                b: /\(/,
                e: /\)/,
                c: [a.CLCM, a.CBLCLM],
                i: /["'\(]/
            }],
            i: /\[|%/
        }, {
            b: /\$[(.]/
        }, {
            b: "\\." + a.IR,
            r: 0
        }]
    };
});
hljs.registerLanguage("xml", function(a) {
    var c = "[A-Za-z0-9\\._:-]+";
    var d = {
        b: /<\?(php)?(?!\w)/,
        e: /\?>/,
        sL: "php",
        subLanguageMode: "continuous"
    };
    var b = {
        eW: true,
        i: /</,
        r: 0,
        c: [d, {
            cN: "attribute",
            b: c,
            r: 0
        }, {
            b: "=",
            r: 0,
            c: [{
                cN: "value",
                v: [{
                    b: /"/,
                    e: /"/
                }, {
                    b: /'/,
                    e: /'/
                }, {
                    b: /[^\s\/>]+/
                }]
            }]
        }]
    };
    return {
        aliases: ["html"],
        cI: true,
        c: [{
            cN: "doctype",
            b: "<!DOCTYPE",
            e: ">",
            r: 10,
            c: [{
                b: "\\[",
                e: "\\]"
            }]
        }, {
            cN: "comment",
            b: "<!--",
            e: "-->",
            r: 10
        }, {
            cN: "cdata",
            b: "<\\!\\[CDATA\\[",
            e: "\\]\\]>",
            r: 10
        }, {
            cN: "tag",
            b: "<style(?=\\s|>|$)",
            e: ">",
            k: {
                title: "style"
            },
            c: [b],
            starts: {
                e: "</style>",
                rE: true,
                sL: "css"
            }
        }, {
            cN: "tag",
            b: "<script(?=\\s|>|$)",
            e: ">",
            k: {
                title: "script"
            },
            c: [b],
            starts: {
                e: "<\/script>",
                rE: true,
                sL: "javascript"
            }
        }, {
            b: "<%",
            e: "%>",
            sL: "vbscript"
        }, d, {
            cN: "pi",
            b: /<\?\w+/,
            e: /\?>/,
            r: 10
        }, {
            cN: "tag",
            b: "</?",
            e: "/?>",
            c: [{
                cN: "title",
                b: "[^ /><]+",
                r: 0
            }, b]
        }]
    };
});
hljs.registerLanguage("markdown", function(a) {
    return {
        c: [{
            cN: "header",
            v: [{
                b: "^#{1,6}",
                e: "$"
            }, {
                b: "^.+?\\n[=-]{2,}$"
            }]
        }, {
            b: "<",
            e: ">",
            sL: "xml",
            r: 0
        }, {
            cN: "bullet",
            b: "^([*+-]|(\\d+\\.))\\s+"
        }, {
            cN: "strong",
            b: "[*_]{2}.+?[*_]{2}"
        }, {
            cN: "emphasis",
            v: [{
                b: "\\*.+?\\*"
            }, {
                b: "_.+?_",
                r: 0
            }]
        }, {
            cN: "blockquote",
            b: "^>\\s+",
            e: "$"
        }, {
            cN: "code",
            v: [{
                b: "`.+?`"
            }, {
                b: "^( {4}|\t)",
                e: "$",
                r: 0
            }]
        }, {
            cN: "horizontal_rule",
            b: "^[-\\*]{3,}",
            e: "$"
        }, {
            b: "\\[.+?\\][\\(\\[].+?[\\)\\]]",
            rB: true,
            c: [{
                cN: "link_label",
                b: "\\[",
                e: "\\]",
                eB: true,
                rE: true,
                r: 0
            }, {
                cN: "link_url",
                b: "\\]\\(",
                e: "\\)",
                eB: true,
                eE: true
            }, {
                cN: "link_reference",
                b: "\\]\\[",
                e: "\\]",
                eB: true,
                eE: true
            }],
            r: 10
        }, {
            b: "^\\[.+\\]:",
            e: "$",
            rB: true,
            c: [{
                cN: "link_reference",
                b: "\\[",
                e: "\\]",
                eB: true,
                eE: true
            }, {
                cN: "link_url",
                b: "\\s",
                e: "$"
            }]
        }]
    };
});
hljs.registerLanguage("css", function(a) {
    var b = "[a-zA-Z-][a-zA-Z0-9_-]*";
    var c = {
        cN: "function",
        b: b + "\\(",
        e: "\\)",
        c: ["self", a.NM, a.ASM, a.QSM]
    };
    return {
        cI: true,
        i: "[=/|']",
        c: [a.CBLCLM, {
            cN: "id",
            b: "\\#[A-Za-z0-9_-]+"
        }, {
            cN: "class",
            b: "\\.[A-Za-z0-9_-]+",
            r: 0
        }, {
            cN: "attr_selector",
            b: "\\[",
            e: "\\]",
            i: "$"
        }, {
            cN: "pseudo",
            b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"
        }, {
            cN: "at_rule",
            b: "@(font-face|page)",
            l: "[a-z-]+",
            k: "font-face page"
        }, {
            cN: "at_rule",
            b: "@",
            e: "[{;]",
            c: [{
                cN: "keyword",
                b: /\S+/
            }, {
                b: /\s/,
                eW: true,
                eE: true,
                r: 0,
                c: [c, a.ASM, a.QSM, a.NM]
            }]
        }, {
            cN: "tag",
            b,
            r: 0
        }, {
            cN: "rules",
            b: "{",
            e: "}",
            i: "[^\\s]",
            r: 0,
            c: [a.CBLCLM, {
                cN: "rule",
                b: "[^\\s]",
                rB: true,
                e: ";",
                eW: true,
                c: [{
                    cN: "attribute",
                    b: "[A-Z\\_\\.\\-]+",
                    e: ":",
                    eE: true,
                    i: "[^\\s]",
                    starts: {
                        cN: "value",
                        eW: true,
                        eE: true,
                        c: [c, a.NM, a.QSM, a.ASM, a.CBLCLM, {
                            cN: "hexcolor",
                            b: "#[0-9A-Fa-f]+"
                        }, {
                            cN: "important",
                            b: "!important"
                        }]
                    }
                }]
            }]
        }]
    };
});
hljs.registerLanguage("http", function(a) {
    return {
        i: "\\S",
        c: [{
            cN: "status",
            b: "^HTTP/[0-9\\.]+",
            e: "$",
            c: [{
                cN: "number",
                b: "\\b\\d{3}\\b"
            }]
        }, {
            cN: "request",
            b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",
            rB: true,
            e: "$",
            c: [{
                cN: "string",
                b: " ",
                e: " ",
                eB: true,
                eE: true
            }]
        }, {
            cN: "attribute",
            b: "^\\w",
            e: ": ",
            eE: true,
            i: "\\n|\\s|=",
            starts: {
                cN: "string",
                e: "$"
            }
        }, {
            b: "\\n\\n",
            starts: {
                sL: "",
                eW: true
            }
        }]
    };
});
hljs.registerLanguage("java", function(b) {
    var a = "false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws";
    return {
        k: a,
        i: /<\//,
        c: [{
            cN: "javadoc",
            b: "/\\*\\*",
            e: "\\*/",
            c: [{
                cN: "javadoctag",
                b: "(^|\\s)@[A-Za-z]+"
            }],
            r: 10
        }, b.CLCM, b.CBLCLM, b.ASM, b.QSM, {
            bK: "protected public private",
            e: /[{;=]/,
            k: a,
            c: [{
                cN: "class",
                bK: "class interface",
                eW: true,
                i: /[:"<>]/,
                c: [{
                    bK: "extends implements",
                    r: 10
                }, b.UTM]
            }, {
                b: b.UIR + "\\s*\\(",
                rB: true,
                c: [b.UTM]
            }]
        }, b.CNM, {
            cN: "annotation",
            b: "@[A-Za-z]+"
        }]
    };
});
hljs.registerLanguage("php", function(b) {
    var e = {
        cN: "variable",
        b: "\\$+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*"
    };
    var a = {
        cN: "preprocessor",
        b: /<\?(php)?|\?>/
    };
    var c = {
        cN: "string",
        c: [b.BE, a],
        v: [{
            b: 'b"',
            e: '"'
        }, {
            b: "b'",
            e: "'"
        }, b.inherit(b.ASM, {
            i: null
        }), b.inherit(b.QSM, {
            i: null
        })]
    };
    var d = {
        v: [b.BNM, b.CNM]
    };
    return {
        cI: true,
        k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
        c: [b.CLCM, b.HCM, {
            cN: "comment",
            b: "/\\*",
            e: "\\*/",
            c: [{
                cN: "phpdoc",
                b: "\\s@[A-Za-z]+"
            }, a]
        }, {
            cN: "comment",
            b: "__halt_compiler.+?;",
            eW: true,
            k: "__halt_compiler",
            l: b.UIR
        }, {
            cN: "string",
            b: "<<<['\"]?\\w+['\"]?$",
            e: "^\\w+;",
            c: [b.BE]
        }, a, e, {
            cN: "function",
            bK: "function",
            e: /[;{]/,
            i: "\\$|\\[|%",
            c: [b.UTM, {
                cN: "params",
                b: "\\(",
                e: "\\)",
                c: ["self", e, b.CBLCLM, c, d]
            }]
        }, {
            cN: "class",
            bK: "class interface",
            e: "{",
            i: /[:\(\$"]/,
            c: [{
                bK: "extends implements",
                r: 10
            }, b.UTM]
        }, {
            bK: "namespace",
            e: ";",
            i: /[\.']/,
            c: [b.UTM]
        }, {
            bK: "use",
            e: ";",
            c: [b.UTM]
        }, {
            b: "=>"
        }, c, d]
    };
});
hljs.registerLanguage("python", function(a) {
    var f = {
        cN: "prompt",
        b: /^(>>>|\.\.\.) /
    };
    var b = {
        cN: "string",
        c: [a.BE],
        v: [{
            b: /(u|b)?r?'''/,
            e: /'''/,
            c: [f],
            r: 10
        }, {
            b: /(u|b)?r?"""/,
            e: /"""/,
            c: [f],
            r: 10
        }, {
            b: /(u|r|ur)'/,
            e: /'/,
            r: 10
        }, {
            b: /(u|r|ur)"/,
            e: /"/,
            r: 10
        }, {
            b: /(b|br)'/,
            e: /'/
        }, {
            b: /(b|br)"/,
            e: /"/
        }, a.ASM, a.QSM]
    };
    var d = {
        cN: "number",
        r: 0,
        v: [{
            b: a.BNR + "[lLjJ]?"
        }, {
            b: "\\b(0o[0-7]+)[lLjJ]?"
        }, {
            b: a.CNR + "[lLjJ]?"
        }]
    };
    var e = {
        cN: "params",
        b: /\(/,
        e: /\)/,
        c: ["self", f, d, b]
    };
    var c = {
        e: /:/,
        i: /[${=;\n]/,
        c: [a.UTM, e]
    };
    return {
        k: {
            keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10 None True False",
            built_in: "Ellipsis NotImplemented"
        },
        i: /(<\/|->|\?)/,
        c: [f, d, b, a.HCM, a.inherit(c, {
            cN: "function",
            bK: "def",
            r: 10
        }), a.inherit(c, {
            cN: "class",
            bK: "class"
        }), {
            cN: "decorator",
            b: /@/,
            e: /$/
        }, {
            b: /\b(print|exec)\(/
        }]
    };
});
hljs.registerLanguage("sql", function(a) {
    return {
        cI: true,
        i: /[<>]/,
        c: [{
            cN: "operator",
            b: "\\b(begin|end|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma|grant|merge)\\b(?!:)",
            e: ";",
            eW: true,
            k: {
                keyword: "all partial global month current_timestamp using go revoke smallint indicator end-exec disconnect zone with character assertion to add current_user usage input local alter match collate real then rollback get read timestamp session_user not integer bit unique day minute desc insert execute like ilike|2 level decimal drop continue isolation found where constraints domain right national some module transaction relative second connect escape close system_user for deferred section cast current sqlstate allocate intersect deallocate numeric public preserve full goto initially asc no key output collation group by union session both last language constraint column of space foreign deferrable prior connection unknown action commit view or first into float year primary cascaded except restrict set references names table outer open select size are rows from prepare distinct leading create only next inner authorization schema corresponding option declare precision immediate else timezone_minute external varying translation true case exception join hour default double scroll value cursor descriptor values dec fetch procedure delete and false int is describe char as at in varchar null trailing any absolute current_time end grant privileges when cross check write current_date pad begin temporary exec time update catalog user sql date on identity timezone_hour natural whenever interval work order cascade diagnostics nchar having left call do handler load replace truncate start lock show pragma exists number trigger if before after each row merge matched database",
                aggregate: "count sum min max avg"
            },
            c: [{
                cN: "string",
                b: "'",
                e: "'",
                c: [a.BE, {
                    b: "''"
                }]
            }, {
                cN: "string",
                b: '"',
                e: '"',
                c: [a.BE, {
                    b: '""'
                }]
            }, {
                cN: "string",
                b: "`",
                e: "`",
                c: [a.BE]
            }, a.CNM]
        }, a.CBLCLM, {
            cN: "comment",
            b: "--",
            e: "$"
        }]
    };
});
hljs.registerLanguage("ini", function(a) {
    return {
        cI: true,
        i: /\S/,
        c: [{
            cN: "comment",
            b: ";",
            e: "$"
        }, {
            cN: "title",
            b: "^\\[",
            e: "\\]"
        }, {
            cN: "setting",
            b: "^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*",
            e: "$",
            c: [{
                cN: "value",
                eW: true,
                k: "on off true false yes no",
                c: [a.QSM, a.NM],
                r: 0
            }]
        }]
    };
});
hljs.registerLanguage("perl", function(c) {
    var d = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when";
    var f = {
        cN: "subst",
        b: "[$@]\\{",
        e: "\\}",
        k: d
    };
    var g = {
        b: "->{",
        e: "}"
    };
    var a = {
        cN: "variable",
        v: [{
            b: /\$\d/
        }, {
            b: /[\$\%\@\*](\^\w\b|#\w+(\:\:\w+)*|{\w+}|\w+(\:\:\w*)*)/
        }, {
            b: /[\$\%\@\*][^\s\w{]/,
            r: 0
        }]
    };
    var e = {
        cN: "comment",
        b: "^(__END__|__DATA__)",
        e: "\\n$",
        r: 5
    };
    var h = [c.BE, f, a];
    var b = [a, c.HCM, e, {
        cN: "comment",
        b: "^\\=\\w",
        e: "\\=cut",
        eW: true
    }, g, {
        cN: "string",
        c: h,
        v: [{
            b: "q[qwxr]?\\s*\\(",
            e: "\\)",
            r: 5
        }, {
            b: "q[qwxr]?\\s*\\[",
            e: "\\]",
            r: 5
        }, {
            b: "q[qwxr]?\\s*\\{",
            e: "\\}",
            r: 5
        }, {
            b: "q[qwxr]?\\s*\\|",
            e: "\\|",
            r: 5
        }, {
            b: "q[qwxr]?\\s*\\<",
            e: "\\>",
            r: 5
        }, {
            b: "qw\\s+q",
            e: "q",
            r: 5
        }, {
            b: "'",
            e: "'",
            c: [c.BE]
        }, {
            b: '"',
            e: '"'
        }, {
            b: "`",
            e: "`",
            c: [c.BE]
        }, {
            b: "{\\w+}",
            c: [],
            r: 0
        }, {
            b: "-?\\w+\\s*\\=\\>",
            c: [],
            r: 0
        }]
    }, {
        cN: "number",
        b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        r: 0
    }, {
        b: "(\\/\\/|" + c.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
        k: "split return print reverse grep",
        r: 0,
        c: [c.HCM, e, {
            cN: "regexp",
            b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
            r: 10
        }, {
            cN: "regexp",
            b: "(m|qr)?/",
            e: "/[a-z]*",
            c: [c.BE],
            r: 0
        }]
    }, {
        cN: "sub",
        bK: "sub",
        e: "(\\s*\\(.*?\\))?[;{]",
        r: 5
    }, {
        cN: "operator",
        b: "-\\w\\b",
        r: 0
    }];
    f.c = b;
    g.c = b;
    return {
        k: d,
        c: b
    };
});
hljs.registerLanguage("objectivec", function(a) {
    var d = {
        keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign self synchronized id nonatomic super unichar IBOutlet IBAction strong weak @private @protected @public @try @property @end @throw @catch @finally @synthesize @dynamic @selector @optional @required",
        literal: "false true FALSE TRUE nil YES NO NULL",
        built_in: "NSString NSDictionary CGRect CGPoint UIButton UILabel UITextView UIWebView MKMapView UISegmentedControl NSObject UITableViewDelegate UITableViewDataSource NSThread UIActivityIndicator UITabbar UIToolBar UIBarButtonItem UIImageView NSAutoreleasePool UITableView BOOL NSInteger CGFloat NSException NSLog NSMutableString NSMutableArray NSMutableDictionary NSURL NSIndexPath CGSize UITableViewCell UIView UIViewController UINavigationBar UINavigationController UITabBarController UIPopoverController UIPopoverControllerDelegate UIImage NSNumber UISearchBar NSFetchedResultsController NSFetchedResultsChangeType UIScrollView UIScrollViewDelegate UIEdgeInsets UIColor UIFont UIApplication NSNotFound NSNotificationCenter NSNotification UILocalNotification NSBundle NSFileManager NSTimeInterval NSDate NSCalendar NSUserDefaults UIWindow NSRange NSArray NSError NSURLRequest NSURLConnection UIInterfaceOrientation MPMoviePlayerController dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
    };
    var c = /[a-zA-Z@][a-zA-Z0-9_]*/;
    var b = "@interface @class @protocol @implementation";
    return {
        k: d,
        l: c,
        i: "</",
        c: [a.CLCM, a.CBLCLM, a.CNM, a.QSM, {
            cN: "string",
            b: "'",
            e: "[^\\\\]'",
            i: "[^\\\\][^']"
        }, {
            cN: "preprocessor",
            b: "#import",
            e: "$",
            c: [{
                cN: "title",
                b: '"',
                e: '"'
            }, {
                cN: "title",
                b: "<",
                e: ">"
            }]
        }, {
            cN: "preprocessor",
            b: "#",
            e: "$"
        }, {
            cN: "class",
            b: "(" + b.split(" ").join("|") + ")\\b",
            e: "({|$)",
            k: b,
            l: c,
            c: [a.UTM]
        }, {
            cN: "variable",
            b: "\\." + a.UIR,
            r: 0
        }]
    };
});
hljs.registerLanguage("coffeescript", function(c) {
    var b = {
        keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
        literal: "true false null undefined yes no on off",
        reserved: "case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf",
        built_in: "npm require console print module exports global window document"
    };
    var a = "[A-Za-z$_][0-9A-Za-z$_]*";
    var f = c.inherit(c.TM, {
        b: a
    });
    var e = {
        cN: "subst",
        b: /#\{/,
        e: /}/,
        k: b
    };
    var d = [c.BNM, c.inherit(c.CNM, {
        starts: {
            e: "(\\s*/)?",
            r: 0
        }
    }), {
        cN: "string",
        v: [{
            b: /'''/,
            e: /'''/,
            c: [c.BE]
        }, {
            b: /'/,
            e: /'/,
            c: [c.BE]
        }, {
            b: /"""/,
            e: /"""/,
            c: [c.BE, e]
        }, {
            b: /"/,
            e: /"/,
            c: [c.BE, e]
        }]
    }, {
        cN: "regexp",
        v: [{
            b: "///",
            e: "///",
            c: [e, c.HCM]
        }, {
            b: "//[gim]*",
            r: 0
        }, {
            b: "/\\S(\\\\.|[^\\n])*?/[gim]*(?=\\s|\\W|$)"
        }]
    }, {
        cN: "property",
        b: "@" + a
    }, {
        b: "`",
        e: "`",
        eB: true,
        eE: true,
        sL: "javascript"
    }];
    e.c = d;
    return {
        k: b,
        c: d.concat([{
            cN: "comment",
            b: "###",
            e: "###"
        }, c.HCM, {
            cN: "function",
            b: "(" + a + "\\s*=\\s*)?(\\(.*\\))?\\s*\\B[-=]>",
            e: "[-=]>",
            rB: true,
            c: [f, {
                cN: "params",
                b: "\\(",
                rB: true,
                c: [{
                    b: /\(/,
                    e: /\)/,
                    k: b,
                    c: ["self"].concat(d)
                }]
            }]
        }, {
            cN: "class",
            bK: "class",
            e: "$",
            i: /[:="\[\]]/,
            c: [{
                bK: "extends",
                eW: true,
                i: /[:="\[\]]/,
                c: [f]
            }, f]
        }, {
            cN: "attribute",
            b: a + ":",
            e: ":",
            rB: true,
            eE: true,
            r: 0
        }])
    };
});
hljs.registerLanguage("nginx", function(c) {
    var b = {
        cN: "variable",
        v: [{
            b: /\$\d+/
        }, {
            b: /\$\{/,
            e: /}/
        }, {
            b: "[\\$\\@]" + c.UIR
        }]
    };
    var a = {
        eW: true,
        l: "[a-z/_]+",
        k: {
            built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
        },
        r: 0,
        i: "=>",
        c: [c.HCM, {
            cN: "string",
            c: [c.BE, b],
            v: [{
                b: /"/,
                e: /"/
            }, {
                b: /'/,
                e: /'/
            }]
        }, {
            cN: "url",
            b: "([a-z]+):/",
            e: "\\s",
            eW: true,
            eE: true
        }, {
            cN: "regexp",
            c: [c.BE, b],
            v: [{
                b: "\\s\\^",
                e: "\\s|{|;",
                rE: true
            }, {
                b: "~\\*?\\s+",
                e: "\\s|{|;",
                rE: true
            }, {
                b: "\\*(\\.[a-z\\-]+)+"
            }, {
                b: "([a-z\\-]+\\.)+\\*"
            }]
        }, {
            cN: "number",
            b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
        }, {
            cN: "number",
            b: "\\b\\d+[kKmMgGdshdwy]*\\b",
            r: 0
        }, b]
    };
    return {
        c: [c.HCM, {
            b: c.UIR + "\\s",
            e: ";|{",
            rB: true,
            c: [c.inherit(c.UTM, {
                starts: a
            })],
            r: 0
        }],
        i: "[^\\s\\}]"
    };
});
hljs.registerLanguage("json", function(a) {
    var e = {
        literal: "true false null"
    };
    var d = [a.QSM, a.CNM];
    var c = {
        cN: "value",
        e: ",",
        eW: true,
        eE: true,
        c: d,
        k: e
    };
    var b = {
        b: "{",
        e: "}",
        c: [{
            cN: "attribute",
            b: '\\s*"',
            e: '"\\s*:\\s*',
            eB: true,
            eE: true,
            c: [a.BE],
            i: "\\n",
            starts: c
        }],
        i: "\\S"
    };
    var f = {
        b: "\\[",
        e: "\\]",
        c: [a.inherit(c, {
            cN: null
        })],
        i: "\\S"
    };
    d.splice(d.length, 0, b, f);
    return {
        c: d,
        k: e,
        i: "\\S"
    };
});
hljs.registerLanguage("apache", function(a) {
    var b = {
        cN: "number",
        b: "[\\$%]\\d+"
    };
    return {
        cI: true,
        c: [a.HCM, {
            cN: "tag",
            b: "</?",
            e: ">"
        }, {
            cN: "keyword",
            b: /\w+/,
            r: 0,
            k: {
                common: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
            },
            starts: {
                e: /$/,
                r: 0,
                k: {
                    literal: "on off all"
                },
                c: [{
                    cN: "sqbracket",
                    b: "\\s\\[",
                    e: "\\]$"
                }, {
                    cN: "cbracket",
                    b: "[\\$%]\\{",
                    e: "\\}",
                    c: ["self", b]
                }, b, a.QSM]
            }
        }],
        i: /\S/
    };
});
hljs.registerLanguage("cpp", function(a) {
    var b = {
        keyword: "false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long throw volatile static protected bool template mutable if public friend do return goto auto void enum else break new extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex _Complex _Imaginary",
        built_in: "std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf"
    };
    return {
        aliases: ["c"],
        k: b,
        i: "</",
        c: [a.CLCM, a.CBLCLM, a.QSM, {
            cN: "string",
            b: "'\\\\?.",
            e: "'",
            i: "."
        }, {
            cN: "number",
            b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
        }, a.CNM, {
            cN: "preprocessor",
            b: "#",
            e: "$",
            c: [{
                b: "include\\s*<",
                e: ">",
                i: "\\n"
            }, a.CLCM]
        }, {
            cN: "stl_container",
            b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
            e: ">",
            k: b,
            r: 10,
            c: ["self"]
        }]
    };
});
hljs.registerLanguage("makefile", function(a) {
    var b = {
        cN: "variable",
        b: /\$\(/,
        e: /\)/,
        c: [a.BE]
    };
    return {
        c: [a.HCM, {
            b: /^\w+\s*\W*=/,
            rB: true,
            r: 0,
            starts: {
                cN: "constant",
                e: /\s*\W*=/,
                eE: true,
                starts: {
                    e: /$/,
                    r: 0,
                    c: [b]
                }
            }
        }, {
            cN: "title",
            b: /^[\w]+:\s*$/
        }, {
            cN: "phony",
            b: /^\.PHONY:/,
            e: /$/,
            k: ".PHONY",
            l: /[\.\w]+/
        }, {
            b: /^\t+/,
            e: /$/,
            c: [a.QSM, b]
        }]
    };
});;
(function(Drupal) {
    'use strict';
    Drupal.behaviors.codesnippet = {
        attach: function(context, settings) {
            hljs.initHighlightingOnLoad();
            context.querySelectorAll('pre code').forEach((element) => {
                element.style.overflowX = 'auto';
            });
        }
    };
})(Drupal);;
(function($, Drupal, drupalSettings, cookies) {
    'use strict';
    const euList = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "EL", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "CH", "IS", "LI", "NO"];
    window.userTracker = {
        country: null,
        initialisationComplete: false,
        euSubdomain: false,
        getUserCountry: function getUserCountry() {
            return userTracker.country;
        },
        verifyLocation: function verifyLocation(verified) {
            let domain = ".cvent.com";
            if (verified) cookies.set('gdpr_location_verified', 1, {
                expires: 1,
                path: '/',
                domain
            });
            else $.removeCookie('gdpr_location_verified', {
                path: '/',
                domain
            });
        },
        setUserCountry: function setUserCountry() {
            userTracker.country = drupalSettings.region_consolidation.actual_country;
            userTracker.initialisationComplete = true;
            userTracker.verifyLocation(true);
            $(window).trigger('userTracker:load');
        },
        executeOnCountryLookup: function executeOnCountryLookup(callback, callbackData) {
            if (typeof callback === "function")
                if (userTracker.initialisationComplete) callback(callbackData);
                else $(window).on('userTracker:load', function() {
                    callback(callbackData);
                });
        }
    };
    userTracker.setUserCountry();
}(jQuery, Drupal, window.drupalSettings, window.Cookies));;
(function($, Drupal, drupalSettings, cookies) {
    'use strict';

    function stripBaseUrl(url) {
        let baseUrlPattern = /^https?:\/\/[a-z-\:0-9.]+/;
        let result = '';
        let match = baseUrlPattern.exec(url);
        if (match != null) result = match[0];
        if (result.length > 0) {
            url = url.replace(result, '');
            url = url.replace(/\/$/, '');
        }
        return url;
    }

    function regionRedirectRequired() {
        if (drupalSettings.region_consolidation.actual_region_name !== drupalSettings.region_consolidation.region_name) return true;
        return false;
    }

    function redirectRequired(requestedUrl) {
        let currentUrl = window.location.href;
        return stripBaseUrl(currentUrl) !== stripBaseUrl(requestedUrl);
    }

    function initCountryRedirect(redirects) {
        let country = userTracker.getUserCountry(),
            redirectData = redirects[country];
        if (regionRedirectRequired())
            if (drupalSettings.region_consolidation.current_langcode === 'de') redirectData = redirects['US'];
            else if (drupalSettings.region_consolidation.current_langcode === 'en') redirectData = redirects['DE'];
        else redirectData = [];
        if (redirectData)
            if (redirectRequired(redirectData['to']) && regionRedirectRequired()) {
                let automaticRedirect = localStorage.getItem('automaticRedirect');
                if (automaticRedirect === 'accept') {
                    let targetUrl = redirectData['to'];
                    window.location.replace(targetUrl);
                } else if (automaticRedirect === 'decline') $('.block-regional-redirect-block').remove();
                else {
                    injectRedirectModal(redirectData);
                    initRedirectEventListeners(redirectData);
                }
            } else $('.block-regional-redirect-block').remove();
        else $('.block-regional-redirect-block').remove();
        if (jQuery(".regional-redirect-wrapper").length) cookies.set('Redirection', "true", {
            path: '/',
            domain: '.cvent.com'
        });
        else _satellite.track("redirect_popup_notvisible");
    }
    const injectRedirectModal = function(redirectData) {
        let $modalCopy = $('.modal-redirect-copy'),
            $acceptLink = $('.accept-redirect'),
            $cancelLink = $('.cancel-redirect'),
            $rememberBox = $('.form-item-remember-choice label');
        $(once('inject-modal-copy', $modalCopy)).append(redirectData['modalCopy']);
        $(once('inject-modal-box', $rememberBox)).text(redirectData['modalBoxText']);
        $(once('inject-accept', $acceptLink)).val(redirectData['acceptText']);
        $(once('inject-cancel', $cancelLink)).val(redirectData['cancelText']);
        $('.regional-redirect-wrapper').removeClass('hidden');
    };
    const initRedirectEventListeners = function(redirectData) {
        let $acceptLink = $('.accept-redirect'),
            $cancelLink = $('.cancel-redirect'),
            $rememberBox = $('.modal-redirect-remember'),
            targetUrl = redirectData['to'];
        $(once('accept-redirect-click', $acceptLink)).click(function(e) {
            e.preventDefault();
            if ($rememberBox.prop('checked')) localStorage.setItem('automaticRedirect', 'accept');
            else localStorage.removeItem('automaticRedirect');
            setTimeout(function() {
                window.location.replace(targetUrl);
            }, 200);
        });
        $(once('cancel-redirect-click', $cancelLink)).click(function(e) {
            e.preventDefault();
            if ($rememberBox.prop('checked')) localStorage.setItem('automaticRedirect', 'decline');
            else localStorage.removeItem('automaticRedirect');
        });
        $(once('modal-injected', '.regional-redirect-wrapper')).trigger('regionRedirect:load');
    };
    Drupal.behaviors.countryRedirects = {
        attach: function(context, settings) {
            const preInit = function() {
                let redirects = getRedirects();
                userTracker.executeOnCountryLookup(initCountryRedirect, redirects);
            };
            const getRedirects = function() {
                if (typeof(settings.crrData) !== 'undefined' && settings.crrData) return settings.crrData;
                return [];
            };
            if (context === document) $(once('country-redirect', context, preInit()));
        }
    };
}(jQuery, Drupal, window.drupalSettings, window.Cookies));;
(function($, Drupal, drupalSettings) {
    'use strict';
    window.cventOneTrust = {
        isC0004: false,
        isChekedC0004: false,
        getCookie: function getCookie(c_name) {
            var i, x, y, ARRcookies = document.cookie.split(";");
            for (i = 0; i < ARRcookies.length; i++) {
                x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == c_name) return unescape(y);
            }
        },
        setCookie: function setCookie(c_name, value, exdays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var c_value = escape(value) + ((exdays == null) ? "" : ";expires=" + exdate.toUTCString() + ";domain=.cvent.com;path=/");
            document.cookie = c_name + "=" + c_value;
        },
        getQueryVariable: function getQueryVariable() {
            var rc = cventOneTrust.getCookie('OptanonConsent');
            if (typeof rc != 'undefined') {
                var e = rc.split("&"),
                    n, r;
                for (n = 0; n < e.length; n++) {
                    r = e[n].split("=");
                    if (r[0].toLowerCase() == "groups") return r[1];
                }
            }
        },
        checkIsC0004: function checkIsC0004() {
            var oc = cventOneTrust.getQueryVariable();
            console.log(oc);
            if (typeof oc != 'undefined' && oc.indexOf('C0004:1') > -1) return true;
            return false;
        }
    };
    cventOneTrust.isC0004 = cventOneTrust.checkIsC0004();
}(jQuery, Drupal, window.drupalSettings));;
(function(Drupal, $, once) {
    const onceName = 'ckeditor_tooltip';
    const triggerSelector = 'span[data-editor-tooltip]';
    Drupal.behaviors.tooltip = {
        attach: function(context, settings) {
            function showTooltipBox(tooltip_element) {
                $(".tooltip-wrap").remove();
                let tooltip_attr = $(tooltip_element).attr("data-tooltip");
                let tooltip_content = JSON.parse(tooltip_attr || '{}');
                if (!$(tooltip_element).find(".tooltip-wrap").length) {
                    let final_element = "<div class='tooltip-wrap'><div class='tooltip-content'><button aria-label='Close tooltip'  class='tooltip-close-x'>&#215</button>" + tooltip_content['content'] + "</div></div>";
                    $(tooltip_element).append(final_element);
                    $(triggerSelector).removeClass('active');
                    $(tooltip_element).addClass('active');
                    let tooltip_content_element = $(tooltip_element).find(".tooltip-wrap");
                    $(tooltip_content_element).addClass("position-" + tooltip_content['placement']);
                    tooltipPositioning();
                    $(tooltip_content_element).find(".tooltip-close-x").on("click", function(e2) {
                        $(tooltip_content_element).remove();
                        $(tooltip_element).removeClass('active');
                        e2.stopPropagation();
                    });
                    $(tooltip_content_element).find(".tooltip-close-x").on("keyup", function(e3) {
                        if (e3.which === 13) {
                            $(tooltip_content_element).remove();
                            $(tooltip_element).removeClass('active');
                            e3.stopPropagation();
                        }
                    });
                }
            }

            function tooltipPositioning() {
                const tooltipWrapper = $('.tooltip-wrap');
                const tooltipLeft = tooltipWrapper.offset().left;
                const tooltipRight = $(window).width() - (tooltipWrapper.offset().left + tooltipWrapper.width());
                let rightProp = tooltipWrapper.css('right');
                if (tooltipLeft < 0) tooltipWrapper.css('right', (parseInt(rightProp.replace(/px/, "")) + tooltipLeft - 10) + "px");
                else {
                    if (tooltipRight < 0) tooltipWrapper.css('right', (parseInt(rightProp.replace(/px/, "")) - (tooltipRight - 10)) + "px");
                }
            }
            const $doc_elements = $(once(onceName, 'body'));
            $doc_elements.each(function() {
                $(this).find(triggerSelector).find("span").remove();
                $(this).find(triggerSelector).html("");
                $(this).on("click", triggerSelector, function(e) {
                    showTooltipBox(this);
                    e.stopPropagation();
                });
                $(this).on("keyup", triggerSelector, function(e) {
                    if (e.which === 13) {
                        showTooltipBox(this);
                        e.stopPropagation();
                    }
                });
                $(this).on("click", function(e) {
                    $('.tooltip-wrap').remove();
                    $(triggerSelector).removeClass('active');
                });
                $(this).on("keyup", function(e) {
                    if (e.which === 27) {
                        $('.tooltip-wrap').remove();
                        $(triggerSelector).removeClass('active');
                    }
                });
            });
        }
    };
})(Drupal, jQuery, once);;
(() => {
    var e = {
            841: () => {
                var e = document.querySelectorAll(".button-blue"),
                    t = function() {
                        for (var e = window.location.search.substring(1).split("&"), t = 0; t < e.length; t++) {
                            var n = e[t].split("=");
                            if ("loc" === n[0]) return n[1].replace(/<[\s\S]*?>/, "");
                        }
                        return !1;
                    }();
                t && e.forEach((function(e, n) {
                    e.hash = t;
                }));
            },
            917: (e, t, n) => {
                var i = n(669),
                    o = n(669);
                ! function(e, t) {
                    "use strict";
                    t.behaviors.mainMenu = {
                        attach: function(n, i) {
                            var o = e(once("main_menu", "body", n)),
                                r = e(once("main_menu", ".dropdown-btn", n)),
                                a = e(once("main_menu", ".accordion-btn", n)),
                                s = e(once("menu__toplist", ".dropdown-btn-toplist", n)),
                                c = e(once("main_menu", ".dropdown", n)),
                                l = e(once("main_menu", ".menu-icon", n)),
                                u = e(once("main_menu", ".menu--main", n)),
                                d = e(once("menu__toplist", ".menu--toplist", n)),
                                f = e(once("main_menu", ".dropdown a", n)),
                                p = e(once("main_menu", ".nav-indicator", n)),
                                h = e(once("menu__toplist", ".nav-indicator-toplist", n)),
                                m = e(once("main_menu", ".search-link", n)),
                                g = e(once("main_menu", ".menu--accordion-item", n));

                            function v() {
                                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                                "add" === t ? e(o).addClass("blur-overlay") : "remove" === t ? e(".blur-overlay").removeClass("blur-overlay") : e(o).toggleClass("blur-overlay");
                            }

                            function b() {
                                c.removeClass("active"), p.removeClass("active green-active"), p.removeAttr("style"), r.attr("aria-expanded", "false"), r.removeClass("is-active"), v("remove"), c.off("click").on("click", (function(e) {
                                    return e.stopPropagation();
                                }));
                            }

                            function y(t) {
                                var n = e(t).siblings(".dropdown-btn");
                                e(t).removeClass("active"), e(n).removeClass("is-active"), e(n).attr("aria-expanded", "false"), p.removeClass("active green-active"), p.removeAttr("style"), v("remove");
                            }

                            function w(t) {
                                t.removeClass("active");
                                var n = e(t).siblings(s);
                                n.removeClass("is-active"), n.attr("aria-expanded", "false"), h.removeClass("active");
                            }
                            r.each((function() {
                                var t = e(this).data("dropdown"),
                                    n = e(this).text().trim();
                                if ("undefined" !== t && "" !== t) {
                                    var i = e("#" + t);
                                    e(i).find(".inner-dropdown-btn").attr("data-dropdown", t), e(i).find(".inner-dropdown-btn").html("<svg width='24' height='24' class='desk-hidden'><use xlink:href='#icon-chevron-mobile'></use></svg>" + n), e(i).find(".inner-dropdown-btn").attr("aria-label", n);
                                }
                            })), g.each((function() {
                                var t = e(this).find(".accordion-btn").attr("aria-controls");
                                e(this).find(".menu--accordion-list").attr("id", t);
                            })), e(".product-link").each((function() {
                                var t = e(this).text() + ' <svg width="24" height="24"><use xlink:href="#icon-chevron-mobile"></use></svg>';
                                e(this).html(t);
                            })), l.on("click", (function(n) {
                                ! function(n) {
                                    var i = e("#hamburger");
                                    u.hasClass("show") || d.hasClass("show") ? (b(), u.toggleClass("show"), d.toggleClass("show"), o.toggleClass("mobile-menu-open"), i.attr("aria-label", t.t("Open menu to see all options"))) : (u.toggleClass("show"), d.toggleClass("show"), o.toggleClass("mobile-menu-open"), v("add"), i.attr("aria-label", t.t("Close menu"))), n.stopPropagation();
                                }(n);
                                var i = "false" === e(this).attr("aria-expanded") ? "true" : "false";
                                e(this).attr("aria-expanded", i);
                            })), e(m).on("click", (function(e) {
                                b();
                            })), e(r).on("click", (function(t) {
                                if (e(this).siblings(".dropdown").hasClass("active")) return y(e(this).siblings(".dropdown")), void t.stopPropagation();
                                e(".dropdown.active").length > 0 ? p.removeClass("first-click") : p.addClass("first-click"), e(".dropdown.active").length > 0 && y(e(".dropdown.active"));
                                var n = e(this).data("dropdown"),
                                    i = e("#" + n);
                                if (i.length) {
                                    e(this).addClass("is-active"), e(this).attr("aria-expanded", "true"), e(i).addClass("active"), v("add");
                                    var o = e(this).parents("li");
                                    e(o).hasClass("green-highlight") ? (p.addClass("active"), p.addClass("green-active")) : p.addClass("active"), p.css({
                                        width: e(this).outerWidth() + "px",
                                        left: e(this).position().left + "px"
                                    }), t.stopPropagation();
                                }
                            })), e(".inner-dropdown-btn").on("click", (function(t) {
                                var n, i;
                                n = e(this).parents(".dropdown"), i = e(n).siblings(".dropdown-btn"), e(n).removeClass("active"), e(i).removeClass("is-active"), e(i).attr("aria-expanded", "false"), p.removeClass("active green-active"), p.removeAttr("style"), v("add");
                            })), f.on("click", (function(e) {
                                e.stopPropagation();
                            })), e(".menu--utility-navigation").on("click", (function(e) {
                                e.stopPropagation();
                            })), e(u).on("click", (function(e) {
                                window.innerWidth < 1080 && e.stopImmediatePropagation();
                            })), e(d).on("click", (function(e) {
                                window.innerWidth < 1080 && e.stopImmediatePropagation();
                            })), e(document).on("click", (function() {
                                window.innerWidth > 1080 && b();
                            })), e(document).on("keyup", (function(e) {
                                27 === e.which && b();
                            })), document.addEventListener("keydown", (function(e) {
                                "Escape" === e.key && (u.toggleClass("show"), d.toggleClass("show"), o.toggleClass("mobile-menu-open"));
                            })), e(window).on("changed.zf.mediaquery", (function(t, n, i) {
                                "large" !== n && "xlarge" !== n && "xxlarge" !== n || e(".menu--accordion-list").removeAttr("style");
                            })), a.on("click", (function(t) {
                                var n = e(this).closest(".menu--accordion-item").find(".menu--accordion-list");
                                e(".menu--accordion-list").not(n).slideUp(200), a.not(e(this)).removeClass("rotate90"), n.slideToggle(200), a.not(e(this)).attr("aria-expanded", "false");
                                var i = "true" === e(this).attr("aria-expanded") ? "false" : "true";
                                e(this).attr("aria-expanded", i), "true" === i ? e(this).addClass("rotate90") : e(this).removeClass("rotate90"), v("add");
                            })), e("input[name='form_search']").on("click", (function(e) {
                                e.stopPropagation();
                            })), e(".search-cta-mobile").on("click", (function(t) {
                                var n = e("input[name='form_search']").val(),
                                    i = e("#cvent-header-search-form");
                                e(i).find("#edit-search-field").val(n), e(i).submit(), t.stopPropagation();
                            })), e("input[name='form_search']").on("keyup", (function(t) {
                                if (13 === t.which) {
                                    var n = e("input[name='form_search']").val(),
                                        i = e("#cvent-header-search-form");
                                    e(i).find("#edit-search-field").val(n), e(i).submit(), t.stopPropagation();
                                }
                            })), e(s).on("click", (function(t) {
                                t.stopPropagation();
                                var n = e(this).siblings(".dropdown-toplist");
                                n.hasClass("active") ? (w(n), h.removeClass("active")) : (e(".dropdown-toplist.active").each((function() {
                                    w(e(this));
                                })), e(this).addClass("is-active"), e(this).attr("aria-expanded", "true"), n.addClass("active"), n.css({
                                    left: e(this).position().left + "px"
                                }).addClass("active"), h.addClass("active"), h.css({
                                    width: e(this).outerWidth() + "px",
                                    left: e(this).position().left + "px"
                                }).addClass("active"));
                            })), e(document).on("click", (function() {
                                e(".dropdown-toplist.active").each((function() {
                                    w(e(this));
                                })), e(s).removeClass("is-active");
                            })), e(s).on("click", (function(e) {
                                e.stopPropagation();
                            })), e(document).on("keydown", (function(t) {
                                "Escape" === t.key && (e(".dropdown-toplist.active").each((function() {
                                    w(e(this));
                                })), e(s).removeClass("is-active"));
                            }));
                        }
                    };
                }(i, Drupal), document.addEventListener("DOMContentLoaded", (function() {
                    var e = document.querySelector(".initialized"),
                        t = document.querySelector(".search-mobile-container"),
                        n = document.querySelector(".sticky-placeholer"),
                        i = e.offsetHeight,
                        r = document.querySelector(".region-header"),
                        a = document.querySelector(".region-header-top"),
                        s = document.querySelector(".menu--main"),
                        c = document.querySelector(".menu--toplist"),
                        l = document.querySelector(".secondary-nav-cta-scroll");

                    function u() {
                        var e, t, n, i = document.querySelector(".menu--main");
                        o(".menu--main").length && (window.innerWidth < 1080 ? r.classList.contains("fixed") ? s.style.top = "".concat(r.offsetHeight, "px") : s.style.top = "".concat(a.offsetHeight + r.offsetHeight, "px") : i.style.top = ""), o(".menu--toplist").length && (window.innerWidth < 1080 ? (t = r.offsetHeight, n = null !== (e = null == a ? void 0 : a.offsetHeight) && void 0 !== e ? e : 0, r.classList.contains("fixed") ? c.style.top = "".concat(t, "px") : c.style.top = "".concat(n + t, "px")) : c.style.top = "");
                    }

                    function d() {
                        r.classList.contains("fixed") ? l.style.top = "".concat(r.offsetHeight, "px") : l.style.top = "".concat(a.offsetHeight + r.offsetHeight, "px");
                    }
                    window.addEventListener("scroll", (function() {
                        window.scrollY >= i ? (e.classList.add("fixed"), t && t.classList.add("fixed-search"), n.style.display = "block", n.style.height = e.offsetHeight + "px") : (e.classList.remove("fixed"), t && t.classList.remove("fixed-search"), n.style.display = "none"), u(), l && d();
                    })), u(), l && d(), window.addEventListener("resize", (function() {
                        u(), l && d();
                    }));
                }));
            },
            716: (e, t, n) => {
                var i, o;

                function r(e) {
                    return r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e;
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                    }, r(e);
                }! function() {
                    "use strict";
                    i = [n(669)], void 0 === (o = function(e) {
                        var t = -1,
                            n = -1,
                            i = function(e) {
                                return parseFloat(e) || 0;
                            },
                            o = function(t) {
                                var n = e(t),
                                    o = null,
                                    r = [];
                                return n.each((function() {
                                    var t = e(this),
                                        n = t.offset().top - i(t.css("margin-top")),
                                        a = r.length > 0 ? r[r.length - 1] : null;
                                    null === a ? r.push(t) : Math.floor(Math.abs(o - n)) <= 1 ? r[r.length - 1] = a.add(t) : r.push(t), o = n;
                                })), r;
                            },
                            a = function(t) {
                                var n = {
                                    byRow: !0,
                                    property: "height",
                                    target: null,
                                    remove: !1
                                };
                                return "object" == r(t) ? e.extend(n, t) : ("boolean" == typeof t ? n.byRow = t : "remove" === t && (n.remove = !0), n);
                            },
                            s = e.fn.matchHeight = function(t) {
                                var n = a(t);
                                if (n.remove) {
                                    var i = this;
                                    return this.css(n.property, ""), e.each(s._groups, (function(e, t) {
                                        t.elements = t.elements.not(i);
                                    })), this;
                                }
                                return this.length <= 1 && !n.target || (s._groups.push({
                                    elements: this,
                                    options: n
                                }), s._apply(this, n)), this;
                            };
                        s.version = "0.7.2", s._groups = [], s._throttle = 80, s._maintainScroll = !1, s._beforeUpdate = null, s._afterUpdate = null, s._rows = o, s._parse = i, s._parseOptions = a, s._apply = function(t, n) {
                            var r = a(n),
                                c = e(t),
                                l = [c],
                                u = e(window).scrollTop(),
                                d = e("html").outerHeight(!0),
                                f = c.parents().filter(":hidden");
                            return f.each((function() {
                                var t = e(this);
                                t.data("style-cache", t.attr("style"));
                            })), f.css("display", "block"), r.byRow && !r.target && (c.each((function() {
                                var t = e(this),
                                    n = t.css("display");
                                "inline-block" !== n && "flex" !== n && "inline-flex" !== n && (n = "block"), t.data("style-cache", t.attr("style")), t.css({
                                    display: n,
                                    "padding-top": "0",
                                    "padding-bottom": "0",
                                    "margin-top": "0",
                                    "margin-bottom": "0",
                                    "border-top-width": "0",
                                    "border-bottom-width": "0",
                                    height: "100px",
                                    overflow: "hidden"
                                });
                            })), l = o(c), c.each((function() {
                                var t = e(this);
                                t.attr("style", t.data("style-cache") || "");
                            }))), e.each(l, (function(t, n) {
                                var o = e(n),
                                    a = 0;
                                if (r.target) a = r.target.outerHeight(!1);
                                else {
                                    if (r.byRow && o.length <= 1) return void o.css(r.property, "");
                                    o.each((function() {
                                        var t = e(this),
                                            n = t.attr("style"),
                                            i = t.css("display");
                                        "inline-block" !== i && "flex" !== i && "inline-flex" !== i && (i = "block");
                                        var o = {
                                            display: i
                                        };
                                        o[r.property] = "", t.css(o), t.outerHeight(!1) > a && (a = t.outerHeight(!1)), n ? t.attr("style", n) : t.css("display", "");
                                    }));
                                }
                                o.each((function() {
                                    var t = e(this),
                                        n = 0;
                                    r.target && t.is(r.target) || ("border-box" !== t.css("box-sizing") && (n += i(t.css("border-top-width")) + i(t.css("border-bottom-width")), n += i(t.css("padding-top")) + i(t.css("padding-bottom"))), t.css(r.property, a - n + "px"));
                                }));
                            })), f.each((function() {
                                var t = e(this);
                                t.attr("style", t.data("style-cache") || null);
                            })), s._maintainScroll && e(window).scrollTop(u / d * e("html").outerHeight(!0)), this;
                        }, s._applyDataApi = function() {
                            var t = {};
                            e("[data-match-height], [data-mh]").each((function() {
                                var n = e(this),
                                    i = n.attr("data-mh") || n.attr("data-match-height");
                                t[i] = i in t ? t[i].add(n) : n;
                            })), e.each(t, (function() {
                                this.matchHeight(!0);
                            }));
                        };
                        var c = function(t) {
                            s._beforeUpdate && s._beforeUpdate(t, s._groups), e.each(s._groups, (function() {
                                s._apply(this.elements, this.options);
                            })), s._afterUpdate && s._afterUpdate(t, s._groups);
                        };
                        s._update = function(i, o) {
                            if (o && "resize" === o.type) {
                                var r = e(window).width();
                                if (r === t) return;
                                t = r;
                            }
                            i ? -1 === n && (n = setTimeout((function() {
                                c(o), n = -1;
                            }), s._throttle)) : c(o);
                        }, e(s._applyDataApi);
                        var l = e.fn.on ? "on" : "bind";
                        e(window)[l]("load", (function(e) {
                            s._update(!1, e);
                        })), e(window)[l]("resize orientationchange", (function(e) {
                            s._update(!0, e);
                        }));
                    }.apply(t, i)) || (e.exports = o);
                }();
            },
            595: (e, t, n) => {
                var i = n(669);
                if (i(".wheel_section").length > 0) {
                    var o = !0;
                    i(".inner").on("click", (function() {
                        if (i(this).hasClass("active")) {
                            var e = i(".wheel-logo-content span.wheel-product-desc");
                            i(".inner").removeClass("active inactive"), i('.spokes input[type="radio"]').prop("checked", !1), i(".desktop-spoke-container .spokes").removeClass("active").addClass("inactive"), i(".wheel-logo-content h3").text(e.attr("data-quadranttitle")), i(".wheel-logo-content span.wheel-product-desc").text(e.attr("data-alttext")), i(".active-content h3").text(e.attr("data-quadranttitle")), i(".active-content span").text(e.attr("data-alttext"));
                        } else i(".inner").removeClass("active").addClass("inactive"), i(this).addClass("active").removeClass("inactive"), i(".desktop-spoke-container .spokes").removeClass("active").addClass("inactive"), i(".wheel-logo-content h3").text(i(this).attr("data-quadranttitle")), i(".wheel-logo-content span.wheel-product-desc").text(i(this).attr("data-alttext")), i(".active-content h3").text(i(this).attr("data-quadranttitle")), i(".active-content span").text(i(this).attr("data-alttext")), i(this).hasClass("inner2") ? (i(".desktop-spoke-container .spokes.spoke-1").addClass("active").removeClass("inactive"), i("#acmob-1").prop("checked", !0)) : i(this).hasClass("inner4") ? (i(".desktop-spoke-container .spokes.spoke-2").addClass("active").removeClass("inactive"), i("#acmob-2").prop("checked", !0)) : i(this).hasClass("inner3") ? (i(".desktop-spoke-container .spokes.spoke-3").addClass("active").removeClass("inactive"), i("#acmob-3").prop("checked", !0)) : i(this).hasClass("inner1") && (i(".desktop-spoke-container .spokes.spoke-4").addClass("active").removeClass("inactive"), i("#acmob-4").prop("checked", !0));
                    })), i("label[for='acmob-1']").on("click", (function() {
                        if (i(this).siblings('input[type="radio"]').is(":checked")) return i(this).siblings('input[type="radio"]').prop("checked", !1), i("button[class*='inner2']").trigger("click"), !1;
                        i("button[class*='inner2']").trigger("click");
                    })), i("label[for='acmob-2']").on("click", (function() {
                        if (i(this).siblings('input[type="radio"]').is(":checked")) return i(this).siblings('input[type="radio"]').prop("checked", !1), i("button[class*='inner4']").trigger("click"), !1;
                        i("button[class*='inner4']").trigger("click");
                    })), i("label[for='acmob-3']").on("click", (function() {
                        if (i(this).siblings('input[type="radio"]').is(":checked")) return i(this).siblings('input[type="radio"]').prop("checked", !1), i("button[class*='inner3']").trigger("click"), !1;
                        i("button[class*='inner3']").trigger("click");
                    })), i("label[for='acmob-4']").on("click", (function() {
                        if (i(this).siblings('input[type="radio"]').is(":checked")) return i(this).siblings('input[type="radio"]').prop("checked", !1), i("button[class*='inner1']").trigger("click"), !1;
                        i("button[class*='inner1']").trigger("click");
                    })), i(".spokes").keypress((function(e) {
                        if (13 == e.which) return i(document.activeElement).trigger("click"), !1;
                    })), i(".desktop-spoke-container .spokes .ac-content2 label").on("click", (function() {
                        if (i(this).siblings('input[type="radio"]').is(":checked")) return i(this).siblings('input[type="radio"]').prop("checked", !1), !1;
                    })), i(".spokes .ac-content2-mob label").on("click", (function() {
                        if (i(this).siblings('input[type="radio"]').is(":checked")) return i(this).siblings('input[type="radio"]').prop("checked", !1), !1;
                    })), i('.spokes input[type="radio"]').on("change", (function() {
                        i("article").find("a").removeAttr("tabindex"), i(this).is(":checked") && i(this).siblings("article").find("a").attr("tabindex", i(this).siblings("label").attr("tabindex"));
                    })), i(window).on("scroll", (function() {
                        (function(e, t) {
                            t = t || "object visible";
                            var n = i(window).height(),
                                o = i(window).scrollTop(),
                                r = i(e).offset().top,
                                a = i(e).height();
                            return "object visible" == t ? r < n + o && r > o - a : "above" == t ? r < n + o : void 0;
                        })(i(".wheel-center-content")) && !0 === o && (i(".outer").addClass("animate_border"), setTimeout((function() {
                            i(".animate_border").removeClass("animate_border"), i("button[class*='inner2']").trigger("click");
                        }), 1800), o = !1);
                    })), i(".desktop-accordion-tab").click((function() {
                        var e = i(this).closest(".accordion-item").find(".accordion-list");
                        i(".accordion-list").not(e).slideUp(), e.slideToggle();
                        var t = i(this).closest(".accordion-item");
                        t.hasClass("active") ? t.toggleClass("active") : (i(".accordion-item").removeClass("active"), t.addClass("active"));
                    }));
                }
            },
            459: (e, t, n) => {
                ! function(e) {
                    "use strict";
                    Drupal.behaviors.scrollTo = {
                        attach: function(t, n) {
                            e(once("scrollToForm", ".paragraph--type--link-scroll-to-form .scroll-to")).click((function(t) {
                                t.preventDefault();
                                var n = e(".marketo-form-wrapper:first").offset().top - 80;
                                window.scrollTo(0, n);
                            }));
                        }
                    }, e("[data-anchor]").each((function(t, n) {
                        var i = e(n),
                            o = i.attr("data-anchor"),
                            r = i.attr("anchor-scroll"),
                            a = i.attr("data-anchor-scroll") ? r : 1e3;
                        i.on("click", (function(t) {
                            o && (t.preventDefault(), e("html, body").animate({
                                scrollTop: e("#".concat(o)).offset().top - 150
                            }, a));
                        }));
                    })), e('.node--type-case-study .secondary-nav-section .secondary-nav--links a[href*="#"]').click((function(t) {
                        var n = e(this.hash);
                        if ((n = n.length ? n : e("[name=" + this.hash.slice(1) + "]")).length) {
                            t.preventDefault();
                            var i = e(".region-header").height(),
                                o = e(".secondary-nav-cta-scroll").height(),
                                r = n.offset().top - i - o;
                            window.location.hash = n.attr("id"), window.scrollTo(0, r);
                        }
                    }));
                }(n(669));
            },
            181: (e, t, n) => {
                ! function(e, t) {
                    "use strict";
                    t.behaviors.themekitSocialShareDropdown = {
                        attach: function(t) {
                            var n = e(".authoring--share", t),
                                i = n.find(".authoring--share--link");
                            n.length && (e("html").on("click", (function() {
                                n.removeClass("active");
                            })), i.on("click", (function(t) {
                                t.stopPropagation(), e(this).parent().toggleClass("active");
                            })));
                        }
                    }, t.behaviors.themekitSocialShareLinkCopy = {
                        attach: function(t) {
                            var n = e(".authoring--share", t),
                                i = n.find(".authoring--share--dropdown input"),
                                o = n.find(".authoring--share--dropdown button");
                            n.length && o.on("click", (function() {
                                i.focus(), i.select(), document.execCommand("copy");
                            }));
                        }
                    };
                }(n(669), Drupal);
            },
            915: (e, t, n) => {
                ! function(e) {
                    "use strict";
                    Drupal.behaviors.sticky = {
                        attach: function(t) {
                            var n = e(".region-header-bottom", t),
                                i = e("#block-subscribetonewsletter", t),
                                o = e(".region-header").offset().top;
                            if (n.length && e(window).on("scroll", (function() {
                                    e(window).scrollTop() >= o ? n.addClass("region-sticky") : n.removeClass("region-sticky");
                                })), i.length && e(window).width() > 1079) {
                                var r = e("footer").offset().top,
                                    a = e(window).height(),
                                    s = e(window).scrollTop();
                                i.addClass("sticky-newsletter-active"), e(document).ready((function() {
                                    e(".cta-link-close-icon").on("click", (function() {
                                        i.removeClass("region-sticky-newsletter sticky-newsletter-active");
                                    }));
                                })), s < r - a && i.addClass("region-sticky-newsletter"), e(window).on("scroll", (function() {
                                    s = e(window).scrollTop(), i.hasClass("sticky-newsletter-active") && (s < r - a ? i.addClass("region-sticky-newsletter") : i.removeClass("region-sticky-newsletter"));
                                }));
                            }
                        }
                    };
                }(n(669));
            },
            243: (e, t, n) => {
                "use strict";
                n.d(t, {
                    A: () => s
                });
                var i = n(601),
                    o = n.n(i),
                    r = n(314),
                    a = n.n(r)()(o());
                a.push([e.id, ".tippy-box[data-animation=scale][data-placement^=top]{transform-origin:bottom}.tippy-box[data-animation=scale][data-placement^=bottom]{transform-origin:top}.tippy-box[data-animation=scale][data-placement^=left]{transform-origin:right}.tippy-box[data-animation=scale][data-placement^=right]{transform-origin:left}.tippy-box[data-animation=scale][data-state=hidden]{transform:scale(.5);opacity:0}", ""]);
                const s = a;
            },
            2: (e, t, n) => {
                "use strict";
                n.d(t, {
                    A: () => s
                });
                var i = n(601),
                    o = n.n(i),
                    r = n(314),
                    a = n.n(r)()(o());
                a.push([e.id, '.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:"";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}', ""]);
                const s = a;
            },
            314: (e) => {
                "use strict";
                e.exports = function(e) {
                    var t = [];
                    return t.toString = function() {
                        return this.map((function(t) {
                            var n = "",
                                i = void 0 !== t[5];
                            return t[4] && (n += "@supports (".concat(t[4], ") {")), t[2] && (n += "@media ".concat(t[2], " {")), i && (n += "@layer".concat(t[5].length > 0 ? " ".concat(t[5]) : "", " {")), n += e(t), i && (n += "}"), t[2] && (n += "}"), t[4] && (n += "}"), n;
                        })).join("");
                    }, t.i = function(e, n, i, o, r) {
                        "string" == typeof e && (e = [
                            [null, e, void 0]
                        ]);
                        var a = {};
                        if (i)
                            for (var s = 0; s < this.length; s++) {
                                var c = this[s][0];
                                null != c && (a[c] = !0);
                            }
                        for (var l = 0; l < e.length; l++) {
                            var u = [].concat(e[l]);
                            i && a[u[0]] || (void 0 !== r && (void 0 === u[5] || (u[1] = "@layer".concat(u[5].length > 0 ? " ".concat(u[5]) : "", " {").concat(u[1], "}")), u[5] = r), n && (u[2] ? (u[1] = "@media ".concat(u[2], " {").concat(u[1], "}"), u[2] = n) : u[2] = n), o && (u[4] ? (u[1] = "@supports (".concat(u[4], ") {").concat(u[1], "}"), u[4] = o) : u[4] = "".concat(o)), t.push(u));
                        }
                    }, t;
                };
            },
            601: (e) => {
                "use strict";
                e.exports = function(e) {
                    return e[1];
                };
            },
            126: (e, t, n) => {
                const i = n(570);
                e.exports = {
                    iframeResize: i,
                    iframeResizer: i,
                    contentWindow: n(481)
                };
            },
            481: (e, t, n) => {
                var i = n(669);
                ! function(t) {
                    if ("undefined" != typeof window) {
                        var n = !0,
                            o = "",
                            r = 0,
                            a = "",
                            s = null,
                            c = "",
                            l = !1,
                            u = {
                                resize: 1,
                                click: 1
                            },
                            d = 128,
                            f = !0,
                            p = 1,
                            h = "bodyOffset",
                            m = h,
                            g = !0,
                            v = "",
                            b = {},
                            y = 32,
                            w = null,
                            k = !1,
                            x = !1,
                            C = "[iFrameSizer]",
                            _ = "",
                            T = {
                                max: 1,
                                min: 1,
                                bodyScroll: 1,
                                documentElementScroll: 1
                            },
                            O = "child",
                            S = window.parent,
                            E = "*",
                            z = 0,
                            A = !1,
                            I = null,
                            P = 16,
                            M = 1,
                            L = "scroll",
                            $ = L,
                            j = window,
                            H = function() {
                                re("onMessage function not defined");
                            },
                            D = function() {},
                            R = function() {},
                            F = {
                                height: function() {
                                    return re("Custom height calculation function not defined"), document.documentElement.offsetHeight;
                                },
                                width: function() {
                                    return re("Custom width calculation function not defined"), document.body.scrollWidth;
                                }
                            },
                            N = {},
                            B = !1;
                        try {
                            var W = Object.create({}, {
                                passive: {
                                    get: function() {
                                        B = !0;
                                    }
                                }
                            });
                            window.addEventListener("test", ee, W), window.removeEventListener("test", ee, W);
                        } catch (e) {}
                        var q, U, V, Y, K, G, X, J = {
                                bodyOffset: function() {
                                    return document.body.offsetHeight + ge("marginTop") + ge("marginBottom");
                                },
                                offset: function() {
                                    return J.bodyOffset();
                                },
                                bodyScroll: function() {
                                    return document.body.scrollHeight;
                                },
                                custom: function() {
                                    return F.height();
                                },
                                documentElementOffset: function() {
                                    return document.documentElement.offsetHeight;
                                },
                                documentElementScroll: function() {
                                    return document.documentElement.scrollHeight;
                                },
                                max: function() {
                                    return Math.max.apply(null, be(J));
                                },
                                min: function() {
                                    return Math.min.apply(null, be(J));
                                },
                                grow: function() {
                                    return J.max();
                                },
                                lowestElement: function() {
                                    return Math.max(J.bodyOffset() || J.documentElementOffset(), ve("bottom", we()));
                                },
                                taggedElement: function() {
                                    return ye("bottom", "data-iframe-height");
                                }
                            },
                            Q = {
                                bodyScroll: function() {
                                    return document.body.scrollWidth;
                                },
                                bodyOffset: function() {
                                    return document.body.offsetWidth;
                                },
                                custom: function() {
                                    return F.width();
                                },
                                documentElementScroll: function() {
                                    return document.documentElement.scrollWidth;
                                },
                                documentElementOffset: function() {
                                    return document.documentElement.offsetWidth;
                                },
                                scroll: function() {
                                    return Math.max(Q.bodyScroll(), Q.documentElementScroll());
                                },
                                max: function() {
                                    return Math.max.apply(null, be(Q));
                                },
                                min: function() {
                                    return Math.min.apply(null, be(Q));
                                },
                                rightMostElement: function() {
                                    return ve("right", we());
                                },
                                taggedElement: function() {
                                    return ye("right", "data-iframe-width");
                                }
                            },
                            Z = (q = ke, K = null, G = 0, X = function() {
                                G = Date.now(), K = null, Y = q.apply(U, V), K || (U = V = null);
                            }, function() {
                                var e = Date.now();
                                G || (G = e);
                                var t = P - (e - G);
                                return U = this, V = arguments, t <= 0 || t > P ? (K && (clearTimeout(K), K = null), G = e, Y = q.apply(U, V), K || (U = V = null)) : K || (K = setTimeout(X, t)), Y;
                            });
                        "iframeResizer" in window || (window.iframeChildListener = function(e) {
                            Se({
                                data: e,
                                sameDomian: !0
                            });
                        }, te(window, "message", Se), te(window, "readystatechange", Ee), Ee());
                    }

                    function ee() {}

                    function te(e, t, n, i) {
                        e.addEventListener(t, n, !!B && (i || {}));
                    }

                    function ne(e) {
                        return e.charAt(0).toUpperCase() + e.slice(1);
                    }

                    function ie(e) {
                        return C + "[" + _ + "] " + e;
                    }

                    function oe(e) {
                        k && "object" == typeof window.console && console.log(ie(e));
                    }

                    function re(e) {
                        "object" == typeof window.console && console.warn(ie(e));
                    }

                    function ae() {
                        var e, i;
                        ! function() {
                            function e(e) {
                                return "true" === e;
                            }
                            var i = v.slice(13).split(":");
                            _ = i[0], r = t === i[1] ? r : Number(i[1]), l = t === i[2] ? l : e(i[2]), k = t === i[3] ? k : e(i[3]), y = t === i[4] ? y : Number(i[4]), n = t === i[6] ? n : e(i[6]), a = i[7], m = t === i[8] ? m : i[8], o = i[9], c = i[10], z = t === i[11] ? z : Number(i[11]), b.enable = t !== i[12] && e(i[12]), O = t === i[13] ? O : i[13], $ = t === i[14] ? $ : i[14], x = t === i[15] ? x : e(i[15]);
                        }(), oe("Initialising iFrame (" + window.location.href + ")"),
                            function() {
                                function e(e, t) {
                                    return "function" == typeof e && (oe("Setup custom " + t + "CalcMethod"), F[t] = e, e = "custom"), e;
                                }
                                var t;
                                "iFrameResizer" in window && Object === window.iFrameResizer.constructor && (t = window.iFrameResizer, oe("Reading data from page: " + JSON.stringify(t)), Object.keys(t).forEach(se, t), H = "onMessage" in t ? t.onMessage : H, D = "onReady" in t ? t.onReady : D, E = "targetOrigin" in t ? t.targetOrigin : E, m = "heightCalculationMethod" in t ? t.heightCalculationMethod : m, $ = "widthCalculationMethod" in t ? t.widthCalculationMethod : $, m = e(m, "height"), $ = e($, "width")), oe("TargetOrigin for parent set to: " + E);
                            }(), t === a && (a = r + "px"), ce("margin", (-1 !== (i = a).indexOf("-") && (re("Negative CSS value ignored for margin"), i = ""), i)), ce("background", o), ce("padding", c), (e = document.createElement("div")).style.clear = "both", e.style.display = "block", e.style.height = "0", document.body.appendChild(e), fe(), pe(), document.documentElement.style.height = "", document.body.style.height = "", oe('HTML & body height set to "auto"'), oe("Enable public methods"), j.parentIFrame = {
                                autoResize: function(e) {
                                    return !0 === e && !1 === n ? (n = !0, he()) : !1 === e && !0 === n && (n = !1, ue("remove"), null !== s && s.disconnect(), clearInterval(w)), Oe(0, 0, "autoResize", JSON.stringify(n)), n;
                                },
                                close: function() {
                                    Oe(0, 0, "close");
                                },
                                getId: function() {
                                    return _;
                                },
                                getPageInfo: function(e) {
                                    "function" == typeof e ? (R = e, Oe(0, 0, "pageInfo")) : (R = function() {}, Oe(0, 0, "pageInfoStop"));
                                },
                                moveToAnchor: function(e) {
                                    b.findTarget(e);
                                },
                                reset: function() {
                                    Te("parentIFrame.reset");
                                },
                                scrollTo: function(e, t) {
                                    Oe(t, e, "scrollTo");
                                },
                                scrollToOffset: function(e, t) {
                                    Oe(t, e, "scrollToOffset");
                                },
                                sendMessage: function(e, t) {
                                    Oe(0, 0, "message", JSON.stringify(e), t);
                                },
                                setHeightCalculationMethod: function(e) {
                                    m = e, fe();
                                },
                                setWidthCalculationMethod: function(e) {
                                    $ = e, pe();
                                },
                                setTargetOrigin: function(e) {
                                    oe("Set targetOrigin: " + e), E = e;
                                },
                                size: function(e, t) {
                                    xe("size", "parentIFrame.size(" + (e || "") + (t ? "," + t : "") + ")", e, t);
                                }
                            },
                            function() {
                                function e(e) {
                                    Oe(0, 0, e.type, e.screenY + ":" + e.screenX);
                                }

                                function t(t, n) {
                                    oe("Add event listener: " + n), te(window.document, t, e);
                                }!0 === x && (t("mouseenter", "Mouse Enter"), t("mouseleave", "Mouse Leave"));
                            }(), he(), b = function() {
                                function e(e) {
                                    var n = e.getBoundingClientRect(),
                                        i = {
                                            x: window.pageXOffset === t ? document.documentElement.scrollLeft : window.pageXOffset,
                                            y: window.pageYOffset === t ? document.documentElement.scrollTop : window.pageYOffset
                                        };
                                    return {
                                        x: parseInt(n.left, 10) + parseInt(i.x, 10),
                                        y: parseInt(n.top, 10) + parseInt(i.y, 10)
                                    };
                                }

                                function n(n) {
                                    var i = n.split("#")[1] || n,
                                        o = decodeURIComponent(i),
                                        r = document.getElementById(o) || document.getElementsByName(o)[0];
                                    t === r ? (oe("In page link (#" + i + ") not found in iFrame, so sending to parent"), Oe(0, 0, "inPageLink", "#" + i)) : function(t) {
                                        var n = e(t);
                                        oe("Moving to in page link (#" + i + ") at x: " + n.x + " y: " + n.y), Oe(n.y, n.x, "scrollToOffset");
                                    }(r);
                                }

                                function i() {
                                    var e = window.location.hash,
                                        t = window.location.href;
                                    "" !== e && "#" !== e && n(t);
                                }
                                return b.enable ? Array.prototype.forEach && document.querySelectorAll ? (oe("Setting up location.hash handlers"), Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'), (function(e) {
                                    "#" !== e.getAttribute("href") && te(e, "click", (function(e) {
                                        e.preventDefault(), n(this.getAttribute("href"));
                                    }));
                                })), te(window, "hashchange", i), setTimeout(i, d)) : re("In page linking not fully supported in this browser! (See README.md for IE8 workaround)") : oe("In page linking not enabled"), {
                                    findTarget: n
                                };
                            }(), xe("init", "Init message from host page"), D();
                    }

                    function se(e) {
                        var t = e.split("Callback");
                        if (2 === t.length) {
                            var n = "on" + t[0].charAt(0).toUpperCase() + t[0].slice(1);
                            this[n] = this[e], delete this[e], re("Deprecated: '" + e + "' has been renamed '" + n + "'. The old method will be removed in the next major version.");
                        }
                    }

                    function ce(e, n) {
                        t !== n && "" !== n && "null" !== n && (document.body.style[e] = n, oe("Body " + e + ' set to "' + n + '"'));
                    }

                    function le(e) {
                        var t = {
                            add: function(t) {
                                function n() {
                                    xe(e.eventName, e.eventType);
                                }
                                N[t] = n, te(window, t, n, {
                                    passive: !0
                                });
                            },
                            remove: function(e) {
                                var t, n, i = N[e];
                                delete N[e], t = e, n = i, window.removeEventListener(t, n, !1);
                            }
                        };
                        e.eventNames && Array.prototype.map ? (e.eventName = e.eventNames[0], e.eventNames.map(t[e.method])) : t[e.method](e.eventName), oe(ne(e.method) + " event listener: " + e.eventType);
                    }

                    function ue(e) {
                        le({
                            method: e,
                            eventType: "Animation Start",
                            eventNames: ["animationstart", "webkitAnimationStart"]
                        }), le({
                            method: e,
                            eventType: "Animation Iteration",
                            eventNames: ["animationiteration", "webkitAnimationIteration"]
                        }), le({
                            method: e,
                            eventType: "Animation End",
                            eventNames: ["animationend", "webkitAnimationEnd"]
                        }), le({
                            method: e,
                            eventType: "Input",
                            eventName: "input"
                        }), le({
                            method: e,
                            eventType: "Mouse Up",
                            eventName: "mouseup"
                        }), le({
                            method: e,
                            eventType: "Mouse Down",
                            eventName: "mousedown"
                        }), le({
                            method: e,
                            eventType: "Orientation Change",
                            eventName: "orientationchange"
                        }), le({
                            method: e,
                            eventType: "Print",
                            eventNames: ["afterprint", "beforeprint"]
                        }), le({
                            method: e,
                            eventType: "Ready State Change",
                            eventName: "readystatechange"
                        }), le({
                            method: e,
                            eventType: "Touch Start",
                            eventName: "touchstart"
                        }), le({
                            method: e,
                            eventType: "Touch End",
                            eventName: "touchend"
                        }), le({
                            method: e,
                            eventType: "Touch Cancel",
                            eventName: "touchcancel"
                        }), le({
                            method: e,
                            eventType: "Transition Start",
                            eventNames: ["transitionstart", "webkitTransitionStart", "MSTransitionStart", "oTransitionStart", "otransitionstart"]
                        }), le({
                            method: e,
                            eventType: "Transition Iteration",
                            eventNames: ["transitioniteration", "webkitTransitionIteration", "MSTransitionIteration", "oTransitionIteration", "otransitioniteration"]
                        }), le({
                            method: e,
                            eventType: "Transition End",
                            eventNames: ["transitionend", "webkitTransitionEnd", "MSTransitionEnd", "oTransitionEnd", "otransitionend"]
                        }), "child" === O && le({
                            method: e,
                            eventType: "IFrame Resized",
                            eventName: "resize"
                        });
                    }

                    function de(e, t, n, i) {
                        return t !== e && (e in n || (re(e + " is not a valid option for " + i + "CalculationMethod."), e = t), oe(i + ' calculation method set to "' + e + '"')), e;
                    }

                    function fe() {
                        m = de(m, h, J, "height");
                    }

                    function pe() {
                        $ = de($, L, Q, "width");
                    }

                    function he() {
                        var e;
                        !0 === n ? (ue("add"), e = 0 > y, window.MutationObserver || window.WebKitMutationObserver ? e ? me() : s = function() {
                            function e(e) {
                                function t(e) {
                                    !1 === e.complete && (oe("Attach listeners to " + e.src), e.addEventListener("load", i, !1), e.addEventListener("error", o, !1), a.push(e));
                                }
                                "attributes" === e.type && "src" === e.attributeName ? t(e.target) : "childList" === e.type && Array.prototype.forEach.call(e.target.querySelectorAll("img"), t);
                            }

                            function t(e) {
                                oe("Remove listeners from " + e.src), e.removeEventListener("load", i, !1), e.removeEventListener("error", o, !1),
                                    function(e) {
                                        a.splice(a.indexOf(e), 1);
                                    }(e);
                            }

                            function n(e, n, i) {
                                t(e.target), xe(n, i + ": " + e.target.src);
                            }

                            function i(e) {
                                n(e, "imageLoad", "Image loaded");
                            }

                            function o(e) {
                                n(e, "imageLoadFailed", "Image load failed");
                            }

                            function r(t) {
                                xe("mutationObserver", "mutationObserver: " + t[0].target + " " + t[0].type), t.forEach(e);
                            }
                            var a = [],
                                s = window.MutationObserver || window.WebKitMutationObserver,
                                c = function() {
                                    var e = document.querySelector("body");
                                    return c = new s(r), oe("Create body MutationObserver"), c.observe(e, {
                                        attributes: !0,
                                        attributeOldValue: !1,
                                        characterData: !0,
                                        characterDataOldValue: !1,
                                        childList: !0,
                                        subtree: !0
                                    }), c;
                                }();
                            return {
                                disconnect: function() {
                                    "disconnect" in c && (oe("Disconnect body MutationObserver"), c.disconnect(), a.forEach(t));
                                }
                            };
                        }() : (oe("MutationObserver not supported in this browser!"), me())) : oe("Auto Resize disabled");
                    }

                    function me() {
                        0 !== y && (oe("setInterval: " + y + "ms"), w = setInterval((function() {
                            xe("interval", "setInterval: " + y);
                        }), Math.abs(y)));
                    }

                    function ge(e, t) {
                        var n = 0;
                        return t = t || document.body, n = null === (n = document.defaultView.getComputedStyle(t, null)) ? 0 : n[e], parseInt(n, 10);
                    }

                    function ve(e, t) {
                        for (var n = t.length, i = 0, o = 0, r = ne(e), a = Date.now(), s = 0; s < n; s++)(i = t[s].getBoundingClientRect()[e] + ge("margin" + r, t[s])) > o && (o = i);
                        return a = Date.now() - a, oe("Parsed " + n + " HTML elements"), oe("Element position calculated in " + a + "ms"),
                            function(e) {
                                e > P / 2 && oe("Event throttle increased to " + (P = 2 * e) + "ms");
                            }(a), o;
                    }

                    function be(e) {
                        return [e.bodyOffset(), e.bodyScroll(), e.documentElementOffset(), e.documentElementScroll()];
                    }

                    function ye(e, t) {
                        var n = document.querySelectorAll("[" + t + "]");
                        return 0 === n.length && (re("No tagged elements (" + t + ") found on page"), document.querySelectorAll("body *")), ve(e, n);
                    }

                    function we() {
                        return document.querySelectorAll("body *");
                    }

                    function ke(e, n, i, o) {
                        var r, a;
                        ! function() {
                            function e(e, t) {
                                return !(Math.abs(e - t) <= z);
                            }
                            return r = t === i ? J[m]() : i, a = t === o ? Q[$]() : o, e(p, r) || l && e(M, a);
                        }() && "init" !== e ? !(e in {
                            init: 1,
                            interval: 1,
                            size: 1
                        }) && (m in T || l && $ in T) ? Te(n) : e in {
                            interval: 1
                        } || oe("No change in size detected") : (Ce(), Oe(p = r, M = a, e));
                    }

                    function xe(e, t, n, i) {
                        A && e in u ? oe("Trigger event cancelled: " + e) : (e in {
                            reset: 1,
                            resetPage: 1,
                            init: 1
                        } || oe("Trigger event: " + t), "init" === e ? ke(e, t, n, i) : Z(e, t, n, i));
                    }

                    function Ce() {
                        A || (A = !0, oe("Trigger event lock on")), clearTimeout(I), I = setTimeout((function() {
                            A = !1, oe("Trigger event lock off"), oe("--");
                        }), d);
                    }

                    function _e(e) {
                        p = J[m](), M = Q[$](), Oe(p, M, e);
                    }

                    function Te(e) {
                        var t = m;
                        m = h, oe("Reset trigger event: " + e), Ce(), _e("reset"), m = t;
                    }

                    function Oe(e, n, i, o, r) {
                        var a;
                        t === r ? r = E : oe("Message targetOrigin: " + r), oe("Sending message to host page (" + (a = _ + ":" + e + ":" + n + ":" + i + (t === o ? "" : ":" + o)) + ")"), S.postMessage(C + a, r);
                    }

                    function Se(n) {
                        var o, r = {
                            init: function() {
                                v = n.data, S = n.source, ae(), f = !1, setTimeout((function() {
                                    g = !1;
                                }), d);
                            },
                            reset: function() {
                                g ? oe("Page reset ignored by init") : (oe("Page size reset by host page"), _e("resetPage"));
                            },
                            resize: function() {
                                xe("resizeParent", "Parent window requested size check");
                            },
                            moveToAnchor: function() {
                                b.findTarget(s());
                            },
                            inPageLink: function() {
                                this.moveToAnchor();
                            },
                            pageInfo: function() {
                                var e = s();
                                oe("PageInfoFromParent called from parent: " + e), R(JSON.parse(e)), oe(" --");
                            },
                            message: function() {
                                var e = s();
                                oe("onMessage called from parent: " + e), H(JSON.parse(e)), oe(" --");
                            }
                        };

                        function a() {
                            return n.data.split("]")[1].split(":")[0];
                        }

                        function s() {
                            return n.data.slice(n.data.indexOf(":") + 1);
                        }

                        function c() {
                            return n.data.split(":")[2] in {
                                true: 1,
                                false: 1
                            };
                        }
                        C === ("" + n.data).slice(0, 13) && (!1 === f ? (o = a()) in r ? r[o]() : !e.exports && "iFrameResize" in window || i !== t && "iFrameResize" in i.prototype || c() || re("Unexpected message (" + n.data + ")") : c() ? r.init() : oe('Ignored message of type "' + a() + '". Received before initialization.'));
                    }

                    function Ee() {
                        "loading" !== document.readyState && window.parent.postMessage("[iFrameResizerChild]Ready", "*");
                    }
                }();
            },
            570: (e, t, n) => {
                var i, o, r, a = n(669);
                console.info("\nIFRAME-RESIZER\n\nIframe-Resizer 5 is now available via the following two packages:\n\n * @iframe-resizer/parent\n * @iframe-resizer/child\n\nAdditionally their are also new versions of iframe-resizer for React, Vue, and jQuery.\n\nVersion 5 of iframe-resizer has been extensively rewritten to use modern browser APIs, which has enabled significantly better performance and greater accuracy in the detection of content resizing events.\n\nPlease see https://iframe-resizer.com/upgrade for more details.\n"),
                    function(n) {
                        if ("undefined" != typeof window) {
                            var s, c, l = 0,
                                u = !1,
                                d = !1,
                                f = "[iFrameSizer]",
                                p = null,
                                h = window.requestAnimationFrame,
                                m = Object.freeze({
                                    max: 1,
                                    scroll: 1,
                                    bodyScroll: 1,
                                    documentElementScroll: 1
                                }),
                                g = {},
                                v = null,
                                b = Object.freeze({
                                    autoResize: !0,
                                    bodyBackground: null,
                                    bodyMargin: null,
                                    bodyMarginV1: 8,
                                    bodyPadding: null,
                                    checkOrigin: !0,
                                    inPageLinks: !1,
                                    enablePublicMethods: !0,
                                    heightCalculationMethod: "bodyOffset",
                                    id: "iFrameResizer",
                                    interval: 32,
                                    license: "1jqr0si6pnt",
                                    log: !1,
                                    maxHeight: 1 / 0,
                                    maxWidth: 1 / 0,
                                    minHeight: 0,
                                    minWidth: 0,
                                    mouseEvents: !0,
                                    resizeFrom: "parent",
                                    scrolling: !1,
                                    sizeHeight: !0,
                                    sizeWidth: !1,
                                    warningTimeout: 5e3,
                                    tolerance: 0,
                                    widthCalculationMethod: "scroll",
                                    onClose: function() {
                                        return !0;
                                    },
                                    onClosed: function() {},
                                    onInit: function() {},
                                    onMessage: function() {
                                        O("onMessage function not defined");
                                    },
                                    onMouseEnter: function() {},
                                    onMouseLeave: function() {},
                                    onResized: function() {},
                                    onScroll: function() {
                                        return !0;
                                    }
                                }),
                                y = {};
                            a !== n && ((c = a).fn ? c.fn.iFrameResize || (c.fn.iFrameResize = function(e) {
                                return this.filter("iframe").each((function(t, n) {
                                    F(n, e);
                                })).end();
                            }) : T("", "Unable to bind to jQuery, it is not fully loaded.")), o = [], (r = "function" == typeof(i = q) ? i.apply(t, o) : i) === n || (e.exports = r), window.iFrameResize = window.iFrameResize || q();
                        }

                        function w() {
                            return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                        }

                        function k(e, t, n) {
                            e.addEventListener(t, n, !1);
                        }

                        function x(e, t, n) {
                            e.removeEventListener(t, n, !1);
                        }

                        function C(e) {
                            return g[e] ? g[e].log : u;
                        }

                        function _(e, t) {
                            S("log", e, t, C(e));
                        }

                        function T(e, t) {
                            S("info", e, t, C(e));
                        }

                        function O(e, t) {
                            S("warn", e, t, !0);
                        }

                        function S(e, t, n, i) {
                            !0 === i && "object" == typeof window.console && console[e](function(e) {
                                return f + "[" + function(e) {
                                    var t = "Host page: " + e;
                                    return window.top !== window.self && (t = window.parentIFrame && window.parentIFrame.getId ? window.parentIFrame.getId() + ": " + e : "Nested host page: " + e), t;
                                }(e) + "]";
                            }(t), n);
                        }

                        function E(e) {
                            function t() {
                                n("Height"), n("Width"), H((function() {
                                    j(C), M(S), l("onResized", C);
                                }), C, "init");
                            }

                            function n(e) {
                                var t = Number(g[S]["max" + e]),
                                    n = Number(g[S]["min" + e]),
                                    i = e.toLowerCase(),
                                    o = Number(C[i]);
                                _(S, "Checking " + i + " is in range " + n + "-" + t), o < n && (o = n, _(S, "Set " + i + " to min value")), o > t && (o = t, _(S, "Set " + i + " to max value")), C[i] = "" + o;
                            }

                            function i(e) {
                                return w.slice(w.indexOf(":") + 7 + e);
                            }

                            function o(e, t) {
                                var n, i;
                                n = function() {
                                    var n, i;
                                    D("Send Page Info", "pageInfo:" + (n = document.body.getBoundingClientRect(), i = C.iframe.getBoundingClientRect(), JSON.stringify({
                                        iframeHeight: i.height,
                                        iframeWidth: i.width,
                                        clientHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
                                        clientWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
                                        offsetTop: parseInt(i.top - n.top, 10),
                                        offsetLeft: parseInt(i.left - n.left, 10),
                                        scrollTop: window.pageYOffset,
                                        scrollLeft: window.pageXOffset,
                                        documentHeight: document.documentElement.clientHeight,
                                        documentWidth: document.documentElement.clientWidth,
                                        windowHeight: window.innerHeight,
                                        windowWidth: window.innerWidth
                                    })), e, t);
                                }, y[i = t] || (y[i] = setTimeout((function() {
                                    y[i] = null, n();
                                }), 32));
                            }

                            function r(e) {
                                var t = e.getBoundingClientRect();
                                return P(S), {
                                    x: Math.floor(Number(t.left) + Number(p.x)),
                                    y: Math.floor(Number(t.top) + Number(p.y))
                                };
                            }

                            function a(e) {
                                var t = e ? r(C.iframe) : {
                                        x: 0,
                                        y: 0
                                    },
                                    n = {
                                        x: Number(C.width) + t.x,
                                        y: Number(C.height) + t.y
                                    };
                                _(S, "Reposition requested from iFrame (offset x:" + t.x + " y:" + t.y + ")"), window.top === window.self ? (p = n, s(), _(S, "--")) : window.parentIFrame ? window.parentIFrame["scrollTo" + (e ? "Offset" : "")](n.x, n.y) : O(S, "Unable to scroll to requested position, window.parentIFrame not found");
                            }

                            function s() {
                                !1 === l("onScroll", p) ? L() : M(S);
                            }

                            function c(e) {
                                var t = {};
                                if (0 === Number(C.width) && 0 === Number(C.height)) {
                                    var n = i(9).split(":");
                                    t = {
                                        x: n[1],
                                        y: n[0]
                                    };
                                } else t = {
                                    x: C.width,
                                    y: C.height
                                };
                                l(e, {
                                    iframe: C.iframe,
                                    screenX: Number(t.x),
                                    screenY: Number(t.y),
                                    type: C.type
                                });
                            }

                            function l(e, t) {
                                return z(S, e, t);
                            }
                            var u, d, h, m, v, b, w = e.data,
                                C = {},
                                S = null;
                            "[iFrameResizerChild]Ready" === w ? function() {
                                for (var e in g) D("iFrame requested init", R(e), g[e].iframe, e);
                            }() : f === ("" + w).slice(0, 13) && w.slice(13).split(":")[0] in g ? (m = (h = w.slice(13).split(":"))[1] ? parseInt(h[1], 10) : 0, v = g[h[0]] && g[h[0]].iframe, b = getComputedStyle(v), C = {
                                iframe: v,
                                id: h[0],
                                height: m + function(e) {
                                    return "border-box" !== e.boxSizing ? 0 : (e.paddingTop ? parseInt(e.paddingTop, 10) : 0) + (e.paddingBottom ? parseInt(e.paddingBottom, 10) : 0);
                                }(b) + function(e) {
                                    return "border-box" !== e.boxSizing ? 0 : (e.borderTopWidth ? parseInt(e.borderTopWidth, 10) : 0) + (e.borderBottomWidth ? parseInt(e.borderBottomWidth, 10) : 0);
                                }(b),
                                width: h[2],
                                type: h[3]
                            }, S = C.id, g[S] && (g[S].loaded = !0), (d = C.type in {
                                true: 1,
                                false: 1,
                                undefined: 1
                            }) && _(S, "Ignoring init message from meta parent page"), !d && function(e) {
                                var t = !0;
                                return g[e] || (t = !1, O(C.type + " No settings for " + e + ". Message was: " + w)), t;
                            }(S) && (_(S, "Received: " + w), u = !0, null === C.iframe && (O(S, "IFrame (" + C.id + ") not found"), u = !1), u && function() {
                                var t, n = e.origin,
                                    i = g[S] && g[S].checkOrigin;
                                if (i && "" + n != "null" && !(i.constructor === Array ? function() {
                                        var e = 0,
                                            t = !1;
                                        for (_(S, "Checking connection is from allowed list of origins: " + i); e < i.length; e++)
                                            if (i[e] === n) {
                                                t = !0;
                                                break;
                                            }
                                        return t;
                                    }() : (t = g[S] && g[S].remoteHost, _(S, "Checking connection is from: " + t), n === t))) throw new Error("Unexpected message received from: " + n + " for " + C.iframe.id + ". Message was: " + e.data + ". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.");
                                return !0;
                            }() && function() {
                                switch (g[S] && g[S].firstRun && g[S] && (g[S].firstRun = !1), C.type) {
                                    case "close":
                                        I(C.iframe);
                                        break;
                                    case "message":
                                        e = i(6), _(S, "onMessage passed: {iframe: " + C.iframe.id + ", message: " + e + "}"), l("onMessage", {
                                            iframe: C.iframe,
                                            message: JSON.parse(e)
                                        }), _(S, "--");
                                        break;
                                    case "mouseenter":
                                        c("onMouseEnter");
                                        break;
                                    case "mouseleave":
                                        c("onMouseLeave");
                                        break;
                                    case "autoResize":
                                        g[S].autoResize = JSON.parse(i(9));
                                        break;
                                    case "scrollTo":
                                        a(!1);
                                        break;
                                    case "scrollToOffset":
                                        a(!0);
                                        break;
                                    case "pageInfo":
                                        o(g[S] && g[S].iframe, S),
                                            function() {
                                                function e(e, i) {
                                                    function r() {
                                                        g[n] ? o(g[n].iframe, n) : t();
                                                    }["scroll", "resize"].forEach((function(t) {
                                                        _(n, e + t + " listener for sendPageInfo"), i(window, t, r);
                                                    }));
                                                }

                                                function t() {
                                                    e("Remove ", x);
                                                }
                                                var n = S;
                                                e("Add ", k), g[n] && (g[n].stopPageInfo = t);
                                            }();
                                        break;
                                    case "pageInfoStop":
                                        g[S] && g[S].stopPageInfo && (g[S].stopPageInfo(), delete g[S].stopPageInfo);
                                        break;
                                    case "inPageLink":
                                        ! function(e) {
                                            var t, n = e.split("#")[1] || "",
                                                i = decodeURIComponent(n),
                                                o = document.getElementById(i) || document.getElementsByName(i)[0];
                                            o ? (t = r(o), _(S, "Moving to in page link (#" + n + ") at x: " + t.x + " y: " + t.y), p = {
                                                x: t.x,
                                                y: t.y
                                            }, s(), _(S, "--")) : window.top === window.self ? _(S, "In page link #" + n + " not found") : window.parentIFrame ? window.parentIFrame.moveToAnchor(n) : _(S, "In page link #" + n + " not found and window.parentIFrame not found");
                                        }(i(9));
                                        break;
                                    case "reset":
                                        $(C);
                                        break;
                                    case "init":
                                        t(), l("onInit", C.iframe);
                                        break;
                                    default:
                                        0 === Number(C.width) && 0 === Number(C.height) ? O("Unsupported message received (" + C.type + "), this is likely due to the iframe containing a later version of iframe-resizer than the parent page") : t();
                                }
                                var e;
                            }())) : T(S, "Ignored: " + w);
                        }

                        function z(e, t, n) {
                            var i = null,
                                o = null;
                            if (g[e]) {
                                if ("function" != typeof(i = g[e][t])) throw new TypeError(t + " on iFrame[" + e + "] is not a function");
                                o = i(n);
                            }
                            return o;
                        }

                        function A(e) {
                            var t = e.id;
                            delete g[t];
                        }

                        function I(e) {
                            var t = e.id;
                            if (!1 !== z(t, "onClose", t)) {
                                _(t, "Removing iFrame: " + t);
                                try {
                                    e.parentNode && e.parentNode.removeChild(e);
                                } catch (e) {
                                    O(e);
                                }
                                z(t, "onClosed", t), _(t, "--"), A(e), s && (s.disconnect(), s = null);
                            } else _(t, "Close iframe cancelled by onClose event");
                        }

                        function P(e) {
                            null === p && _(e, "Get page position: " + (p = {
                                x: window.pageXOffset === n ? document.documentElement.scrollLeft : window.pageXOffset,
                                y: window.pageYOffset === n ? document.documentElement.scrollTop : window.pageYOffset
                            }).x + "," + p.y);
                        }

                        function M(e) {
                            null !== p && (window.scrollTo(p.x, p.y), _(e, "Set page position: " + p.x + "," + p.y), L());
                        }

                        function L() {
                            p = null;
                        }

                        function $(e) {
                            _(e.id, "Size reset requested by " + ("init" === e.type ? "host page" : "iFrame")), P(e.id), H((function() {
                                j(e), D("reset", "reset", e.iframe, e.id);
                            }), e, "reset");
                        }

                        function j(e) {
                            function t(t) {
                                ! function(t) {
                                    e.id ? (e.iframe.style[t] = e[t] + "px", _(e.id, "IFrame (" + n + ") " + t + " set to " + e[t] + "px")) : _("undefined", "messageData id not set");
                                }(t),
                                function(t) {
                                    d || "0" !== e[t] || (d = !0, _(n, "Hidden iFrame detected, creating visibility listener"), function() {
                                        function e() {
                                            Object.keys(g).forEach((function(e) {
                                                ! function(e) {
                                                    function t(t) {
                                                        return "0px" === (g[e] && g[e].iframe.style[t]);
                                                    }
                                                    g[e] && null !== g[e].iframe.offsetParent && (t("height") || t("width")) && D("Visibility change", "resize", g[e].iframe, e);
                                                }(e);
                                            }));
                                        }
                                        var t, n = w();
                                        n && (t = document.querySelector("body"), new n((function(t) {
                                            _("window", "Mutation observed: " + t[0].target + " " + t[0].type), N(e, 16);
                                        })).observe(t, {
                                            attributes: !0,
                                            attributeOldValue: !1,
                                            characterData: !0,
                                            characterDataOldValue: !1,
                                            childList: !0,
                                            subtree: !0
                                        }));
                                    }());
                                }(t);
                            }
                            var n = e.iframe.id;
                            g[n] && (g[n].sizeHeight && t("height"), g[n].sizeWidth && t("width"));
                        }

                        function H(e, t, n) {
                            n !== t.type && h && !window.jasmine ? (_(t.id, "Requesting animation frame"), h(e)) : e();
                        }

                        function D(e, t, n, i, o) {
                            var r, a = !1;
                            i = i || n.id, g[i] && (n && "contentWindow" in n && null !== n.contentWindow ? (r = g[i] && g[i].targetOrigin, _(i, "[" + e + "] Sending msg to iframe[" + i + "] (" + t + ") targetOrigin: " + r), n.contentWindow.postMessage(f + t, r)) : O(i, "[" + e + "] IFrame(" + i + ") not found"), o && g[i] && g[i].warningTimeout && (g[i].msgTimeout = setTimeout((function() {
                                !g[i] || g[i].loaded || a || (a = !0, O(i, "IFrame has not responded within " + g[i].warningTimeout / 1e3 + " seconds. Check iFrameResizer.contentWindow.js has been loaded in iFrame. This message can be ignored if everything is working, or you can set the warningTimeout option to a higher value or zero to suppress this warning."));
                            }), g[i].warningTimeout)));
                        }

                        function R(e) {
                            return e + ":" + g[e].bodyMarginV1 + ":" + g[e].sizeWidth + ":" + g[e].log + ":" + g[e].interval + ":" + g[e].enablePublicMethods + ":" + g[e].autoResize + ":" + g[e].bodyMargin + ":" + g[e].heightCalculationMethod + ":" + g[e].bodyBackground + ":" + g[e].bodyPadding + ":" + g[e].tolerance + ":" + g[e].inPageLinks + ":" + g[e].resizeFrom + ":" + g[e].widthCalculationMethod + ":" + g[e].mouseEvents;
                        }

                        function F(e, t) {
                            function i(e) {
                                var t = e.split("Callback");
                                if (2 === t.length) {
                                    var n = "on" + t[0].charAt(0).toUpperCase() + t[0].slice(1);
                                    this[n] = this[e], delete this[e], O(a, "Deprecated: '" + e + "' has been renamed '" + n + "'. The old method will be removed in the next major version.");
                                }
                            }
                            var o, r, a = function(n) {
                                if ("string" != typeof n) throw new TypeError("Invaild id for iFrame. Expected String");
                                var i;
                                return "" === n && (e.id = (i = t && t.id || b.id + l++, null !== document.getElementById(i) && (i += l++), n = i), u = (t || {}).log, _(n, "Added missing iframe ID: " + n + " (" + e.src + ")")), n;
                            }(e.id);
                            a in g && "iFrameResizer" in e ? O(a, "Ignored iFrame, already setup.") : (function(t) {
                                var n;
                                t = t || {}, g[a] = Object.create(null), g[a].iframe = e, g[a].firstRun = !0, g[a].remoteHost = e.src && e.src.split("/").slice(0, 3).join("/"),
                                    function(e) {
                                        if ("object" != typeof e) throw new TypeError("Options is not an object");
                                    }(t), Object.keys(t).forEach(i, t),
                                    function(e) {
                                        for (var t in b) Object.prototype.hasOwnProperty.call(b, t) && (g[a][t] = Object.prototype.hasOwnProperty.call(e, t) ? e[t] : b[t]);
                                    }(t), g[a] && (g[a].targetOrigin = !0 === g[a].checkOrigin ? "" === (n = g[a].remoteHost) || null !== n.match(/^(about:blank|javascript:|file:\/\/)/) ? "*" : n : "*");
                            }(t), function() {
                                switch (_(a, "IFrame scrolling " + (g[a] && g[a].scrolling ? "enabled" : "disabled") + " for " + a), e.style.overflow = !1 === (g[a] && g[a].scrolling) ? "hidden" : "auto", g[a] && g[a].scrolling) {
                                    case "omit":
                                        break;
                                    case !0:
                                        e.scrolling = "yes";
                                        break;
                                    case !1:
                                        e.scrolling = "no";
                                        break;
                                    default:
                                        e.scrolling = g[a] ? g[a].scrolling : "no";
                                }
                            }(), function() {
                                function t(t) {
                                    var n = g[a][t];
                                    1 / 0 !== n && 0 !== n && (e.style[t] = "number" == typeof n ? n + "px" : n, _(a, "Set " + t + " = " + e.style[t]));
                                }

                                function n(e) {
                                    if (g[a]["min" + e] > g[a]["max" + e]) throw new Error("Value for min" + e + " can not be greater than max" + e);
                                }
                                n("Height"), n("Width"), t("maxHeight"), t("minHeight"), t("maxWidth"), t("minWidth");
                            }(), "number" != typeof(g[a] && g[a].bodyMargin) && "0" !== (g[a] && g[a].bodyMargin) || (g[a].bodyMarginV1 = g[a].bodyMargin, g[a].bodyMargin = g[a].bodyMargin + "px"), o = R(a), (r = w()) && (s = function(t) {
                                if (!e.parentNode) return null;
                                var n = new t((function(t) {
                                    t.forEach((function(t) {
                                        Array.prototype.slice.call(t.removedNodes).forEach((function(t) {
                                            t === e && I(e);
                                        }));
                                    }));
                                }));
                                return n.observe(e.parentNode, {
                                    childList: !0
                                }), n;
                            }(r)), k(e, "load", (function() {
                                var t, i;
                                D("iFrame.onload", o, e, n, !0), t = g[a] && g[a].firstRun, i = g[a] && g[a].heightCalculationMethod in m, !t && i && $({
                                    iframe: e,
                                    height: 0,
                                    width: 0,
                                    type: "init"
                                });
                            })), D("init", o, e, n, !0), g[a] && (g[a].iframe.iFrameResizer = {
                                close: I.bind(null, g[a].iframe),
                                removeListeners: A.bind(null, g[a].iframe),
                                resize: D.bind(null, "Window resize", "resize", g[a].iframe),
                                moveToAnchor: function(e) {
                                    D("Move to anchor", "moveToAnchor:" + e, g[a].iframe, a);
                                },
                                sendMessage: function(e) {
                                    D("Send Message", "message:" + (e = JSON.stringify(e)), g[a].iframe, a);
                                }
                            }));
                        }

                        function N(e, t) {
                            null === v && (v = setTimeout((function() {
                                v = null, e();
                            }), t));
                        }

                        function B() {
                            "hidden" !== document.visibilityState && (_("document", "Trigger event: Visibility change"), N((function() {
                                W("Tab Visible", "resize");
                            }), 16));
                        }

                        function W(e, t) {
                            Object.keys(g).forEach((function(n) {
                                (function(e) {
                                    return g[e] && "parent" === g[e].resizeFrom && g[e].autoResize && !g[e].firstRun;
                                })(n) && D(e, t, g[n].iframe, n);
                            }));
                        }

                        function q() {
                            function e(e, n) {
                                n && (function() {
                                    if (!n.tagName) throw new TypeError("Object is not a valid DOM element");
                                    if ("IFRAME" !== n.tagName.toUpperCase()) throw new TypeError("Expected <IFRAME> tag, found <" + n.tagName + ">");
                                }(), F(n, e), t.push(n));
                            }
                            var t;
                            return function() {
                                    var e, t = ["moz", "webkit", "o", "ms"];
                                    for (e = 0; e < t.length && !h; e += 1) h = window[t[e] + "RequestAnimationFrame"];
                                    h ? h = h.bind(window) : _("setup", "RequestAnimationFrame not supported");
                                }(), k(window, "message", E), k(window, "resize", (function() {
                                    _("window", "Trigger event: resize"), N((function() {
                                        W("Window resize", "resize");
                                    }), 16);
                                })), k(document, "visibilitychange", B), k(document, "-webkit-visibilitychange", B),
                                function(i, o) {
                                    switch (t = [], function(e) {
                                        e && e.enablePublicMethods && O("enablePublicMethods option has been removed, public methods are now always available in the iFrame");
                                    }(i), typeof o) {
                                        case "undefined":
                                        case "string":
                                            Array.prototype.forEach.call(document.querySelectorAll(o || "iframe"), e.bind(n, i));
                                            break;
                                        case "object":
                                            e(i, o);
                                            break;
                                        default:
                                            throw new TypeError("Unexpected data type (" + typeof o + ")");
                                    }
                                    return t;
                                };
                        }
                    }();
            },
            732: (e, t, n) => {
                var i, o, r, a = n(669);
                o = [n(669)], i = function(e) {
                    var t, n, i, o, r, s, c = "Close",
                        l = "BeforeClose",
                        u = "MarkupParse",
                        d = "Open",
                        f = "Change",
                        p = "mfp",
                        h = "." + p,
                        m = "mfp-ready",
                        g = "mfp-removing",
                        v = "mfp-prevent-close",
                        b = function() {},
                        y = !!a,
                        w = e(window),
                        k = function(e, n) {
                            t.ev.on(p + e + h, n);
                        },
                        x = function(t, n, i, o) {
                            var r = document.createElement("div");
                            return r.className = "mfp-" + t, i && (r.innerHTML = i), o ? n && n.appendChild(r) : (r = e(r), n && r.appendTo(n)), r;
                        },
                        C = function(e, n) {
                            t.ev.triggerHandler(p + e, n), t.st.callbacks && (e = e.charAt(0).toLowerCase() + e.slice(1), t.st.callbacks[e] && t.st.callbacks[e].apply(t, Array.isArray(n) ? n : [n]));
                        },
                        _ = function(n) {
                            return n === s && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), s = n), t.currTemplate.closeBtn;
                        },
                        T = function() {
                            e.magnificPopup.instance || ((t = new b()).init(), e.magnificPopup.instance = t);
                        };
                    b.prototype = {
                        constructor: b,
                        init: function() {
                            var n = navigator.appVersion;
                            t.isLowIE = t.isIE8 = document.all && !document.addEventListener, t.isAndroid = /android/gi.test(n), t.isIOS = /iphone|ipad|ipod/gi.test(n), t.supportsTransition = function() {
                                var e = document.createElement("p").style,
                                    t = ["ms", "O", "Moz", "Webkit"];
                                if (void 0 !== e.transition) return !0;
                                for (; t.length;)
                                    if (t.pop() + "Transition" in e) return !0;
                                return !1;
                            }(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), i = e(document), t.popupsCache = {};
                        },
                        open: function(n) {
                            var o;
                            if (!1 === n.isObj) {
                                t.items = n.items.toArray(), t.index = 0;
                                var a, s = n.items;
                                for (o = 0; o < s.length; o++)
                                    if ((a = s[o]).parsed && (a = a.el[0]), a === n.el[0]) {
                                        t.index = o;
                                        break;
                                    }
                            } else t.items = Array.isArray(n.items) ? n.items : [n.items], t.index = n.index || 0;
                            if (!t.isOpen) {
                                t.types = [], r = "", n.mainEl && n.mainEl.length ? t.ev = n.mainEl.eq(0) : t.ev = i, n.key ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}), t.currTemplate = t.popupsCache[n.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, n), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = x("bg").on("click" + h, (function() {
                                    t.close();
                                })), t.wrap = x("wrap").attr("tabindex", -1).on("click" + h, (function(e) {
                                    t._checkIfClose(e.target) && t.close();
                                })), t.container = x("container", t.wrap)), t.contentContainer = x("content"), t.st.preloader && (t.preloader = x("preloader", t.container, t.st.tLoading));
                                var c = e.magnificPopup.modules;
                                for (o = 0; o < c.length; o++) {
                                    var l = c[o];
                                    l = l.charAt(0).toUpperCase() + l.slice(1), t["init" + l].call(t);
                                }
                                C("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (k(u, (function(e, t, n, i) {
                                    n.close_replaceWith = _(i.type);
                                })), r += " mfp-close-btn-in") : t.wrap.append(_())), t.st.alignTop && (r += " mfp-align-top"), t.fixedContentPos ? t.wrap.css({
                                    overflow: t.st.overflowY,
                                    overflowX: "hidden",
                                    overflowY: t.st.overflowY
                                }) : t.wrap.css({
                                    top: w.scrollTop(),
                                    position: "absolute"
                                }), (!1 === t.st.fixedBgPos || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                                    height: i.height(),
                                    position: "absolute"
                                }), t.st.enableEscapeKey && i.on("keyup" + h, (function(e) {
                                    27 === e.keyCode && t.close();
                                })), w.on("resize" + h, (function() {
                                    t.updateSize();
                                })), t.st.closeOnContentClick || (r += " mfp-auto-cursor"), r && t.wrap.addClass(r);
                                var f = t.wH = w.height(),
                                    p = {};
                                if (t.fixedContentPos && t._hasScrollBar(f)) {
                                    var g = t._getScrollbarSize();
                                    g && (p.marginRight = g);
                                }
                                t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : p.overflow = "hidden");
                                var v = t.st.mainClass;
                                return t.isIE7 && (v += " mfp-ie7"), v && t._addClassToMFP(v), t.updateItemHTML(), C("BuildControls"), e("html").css(p), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)), t._lastFocusedEl = document.activeElement, setTimeout((function() {
                                    t.content ? (t._addClassToMFP(m), t._setFocus()) : t.bgOverlay.addClass(m), i.on("focusin" + h, t._onFocusIn);
                                }), 16), t.isOpen = !0, t.updateSize(f), C(d), n;
                            }
                            t.updateItemHTML();
                        },
                        close: function() {
                            t.isOpen && (C(l), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(g), setTimeout((function() {
                                t._close();
                            }), t.st.removalDelay)) : t._close());
                        },
                        _close: function() {
                            C(c);
                            var n = g + " " + m + " ";
                            if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (n += t.st.mainClass + " "), t._removeClassFromMFP(n), t.fixedContentPos) {
                                var o = {
                                    marginRight: ""
                                };
                                t.isIE7 ? e("body, html").css("overflow", "") : o.overflow = "", e("html").css(o);
                            }
                            i.off("keyup.mfp focusin" + h), t.ev.off(h), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && !0 !== t.currTemplate[t.currItem.type] || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).trigger("focus"), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, C("AfterClose");
                        },
                        updateSize: function(e) {
                            if (t.isIOS) {
                                var n = document.documentElement.clientWidth / window.innerWidth,
                                    i = window.innerHeight * n;
                                t.wrap.css("height", i), t.wH = i;
                            } else t.wH = e || w.height();
                            t.fixedContentPos || t.wrap.css("height", t.wH), C("Resize");
                        },
                        updateItemHTML: function() {
                            var n = t.items[t.index];
                            t.contentContainer.detach(), t.content && t.content.detach(), n.parsed || (n = t.parseEl(t.index));
                            var i = n.type;
                            if (C("BeforeChange", [t.currItem ? t.currItem.type : "", i]), t.currItem = n, !t.currTemplate[i]) {
                                var r = !!t.st[i] && t.st[i].markup;
                                C("FirstMarkupParse", r), t.currTemplate[i] = !r || e(r);
                            }
                            o && o !== n.type && t.container.removeClass("mfp-" + o + "-holder");
                            var a = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, t.currTemplate[i]);
                            t.appendContent(a, i), n.preloaded = !0, C(f, n), o = n.type, t.container.prepend(t.contentContainer), C("AfterChange");
                        },
                        appendContent: function(e, n) {
                            t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && !0 === t.currTemplate[n] ? t.content.find(".mfp-close").length || t.content.append(_()) : t.content = e : t.content = "", C("BeforeAppend"), t.container.addClass("mfp-" + n + "-holder"), t.contentContainer.append(t.content);
                        },
                        parseEl: function(n) {
                            var i, o = t.items[n];
                            if (o.tagName ? o = {
                                    el: e(o)
                                } : (i = o.type, o = {
                                    data: o,
                                    src: o.src
                                }), o.el) {
                                for (var r = t.types, a = 0; a < r.length; a++)
                                    if (o.el.hasClass("mfp-" + r[a])) {
                                        i = r[a];
                                        break;
                                    }
                                o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"));
                            }
                            return o.type = i || t.st.type || "inline", o.index = n, o.parsed = !0, t.items[n] = o, C("ElementParse", o), t.items[n];
                        },
                        addGroup: function(e, n) {
                            var i = function(i) {
                                i.mfpEl = this, t._openClick(i, e, n);
                            };
                            n || (n = {});
                            var o = "click.magnificPopup";
                            n.mainEl = e, n.items ? (n.isObj = !0, e.off(o).on(o, i)) : (n.isObj = !1, n.delegate ? e.off(o).on(o, n.delegate, i) : (n.items = e, e.off(o).on(o, i)));
                        },
                        _openClick: function(n, i, o) {
                            if ((void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick) || !(2 === n.which || n.ctrlKey || n.metaKey || n.altKey || n.shiftKey)) {
                                var r = void 0 !== o.disableOn ? o.disableOn : e.magnificPopup.defaults.disableOn;
                                if (r)
                                    if ("function" == typeof r) {
                                        if (!r.call(t)) return !0;
                                    } else {
                                        if (w.width() < r) return !0;
                                    }
                                n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()), o.el = e(n.mfpEl), o.delegate && (o.items = i.find(o.delegate)), t.open(o);
                            }
                        },
                        updateStatus: function(e, i) {
                            if (t.preloader) {
                                n !== e && t.container.removeClass("mfp-s-" + n), i || "loading" !== e || (i = t.st.tLoading);
                                var o = {
                                    status: e,
                                    text: i
                                };
                                C("UpdateStatus", o), e = o.status, i = o.text, t.st.allowHTMLInStatusIndicator ? t.preloader.html(i) : t.preloader.text(i), t.preloader.find("a").on("click", (function(e) {
                                    e.stopImmediatePropagation();
                                })), t.container.addClass("mfp-s-" + e), n = e;
                            }
                        },
                        _checkIfClose: function(n) {
                            if (!e(n).closest("." + v).length) {
                                var i = t.st.closeOnContentClick,
                                    o = t.st.closeOnBgClick;
                                if (i && o) return !0;
                                if (!t.content || e(n).closest(".mfp-close").length || t.preloader && n === t.preloader[0]) return !0;
                                if (n === t.content[0] || e.contains(t.content[0], n)) {
                                    if (i) return !0;
                                } else {
                                    if (o && e.contains(document, n)) return !0;
                                }
                                return !1;
                            }
                        },
                        _addClassToMFP: function(e) {
                            t.bgOverlay.addClass(e), t.wrap.addClass(e);
                        },
                        _removeClassFromMFP: function(e) {
                            this.bgOverlay.removeClass(e), t.wrap.removeClass(e);
                        },
                        _hasScrollBar: function(e) {
                            return (t.isIE7 ? i.height() : document.body.scrollHeight) > (e || w.height());
                        },
                        _setFocus: function() {
                            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).trigger("focus");
                        },
                        _onFocusIn: function(n) {
                            if (n.target !== t.wrap[0] && !e.contains(t.wrap[0], n.target)) return t._setFocus(), !1;
                        },
                        _parseMarkup: function(n, i, o) {
                            var r;
                            o.data && (i = e.extend(o.data, i)), C(u, [n, i, o]), e.each(i, (function(i, o) {
                                if (void 0 === o || !1 === o) return !0;
                                if ((r = i.split("_")).length > 1) {
                                    var a = n.find(h + "-" + r[0]);
                                    if (a.length > 0) {
                                        var s = r[1];
                                        "replaceWith" === s ? a[0] !== o[0] && a.replaceWith(o) : "img" === s ? a.is("img") ? a.attr("src", o) : a.replaceWith(e("<img>").attr("src", o).attr("class", a.attr("class"))) : a.attr(r[1], o);
                                    }
                                } else t.st.allowHTMLInTemplate ? n.find(h + "-" + i).html(o) : n.find(h + "-" + i).text(o);
                            }));
                        },
                        _getScrollbarSize: function() {
                            if (void 0 === t.scrollbarSize) {
                                var e = document.createElement("div");
                                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e);
                            }
                            return t.scrollbarSize;
                        }
                    }, e.magnificPopup = {
                        instance: null,
                        proto: b.prototype,
                        modules: [],
                        open: function(t, n) {
                            return T(), (t = t ? e.extend(!0, {}, t) : {}).isObj = !0, t.index = n || 0, this.instance.open(t);
                        },
                        close: function() {
                            return e.magnificPopup.instance && e.magnificPopup.instance.close();
                        },
                        registerModule: function(t, n) {
                            n.options && (e.magnificPopup.defaults[t] = n.options), e.extend(this.proto, n.proto), this.modules.push(t);
                        },
                        defaults: {
                            disableOn: 0,
                            key: null,
                            midClick: !1,
                            mainClass: "",
                            preloader: !0,
                            focus: "",
                            closeOnContentClick: !1,
                            closeOnBgClick: !0,
                            closeBtnInside: !0,
                            showCloseBtn: !0,
                            enableEscapeKey: !0,
                            modal: !1,
                            alignTop: !1,
                            removalDelay: 0,
                            prependTo: null,
                            fixedContentPos: "auto",
                            fixedBgPos: "auto",
                            overflowY: "auto",
                            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                            tClose: "Close (Esc)",
                            tLoading: "Loading...",
                            autoFocusLast: !0,
                            allowHTMLInStatusIndicator: !1,
                            allowHTMLInTemplate: !1
                        }
                    }, e.fn.magnificPopup = function(n) {
                        T();
                        var i = e(this);
                        if ("string" == typeof n)
                            if ("open" === n) {
                                var o, r = y ? i.data("magnificPopup") : i[0].magnificPopup,
                                    a = parseInt(arguments[1], 10) || 0;
                                r.items ? o = r.items[a] : (o = i, r.delegate && (o = o.find(r.delegate)), o = o.eq(a)), t._openClick({
                                    mfpEl: o
                                }, i, r);
                            } else t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
                        else n = e.extend(!0, {}, n), y ? i.data("magnificPopup", n) : i[0].magnificPopup = n, t.addGroup(i, n);
                        return i;
                    };
                    var O, S, E, z = "inline",
                        A = function() {
                            E && (S.after(E.addClass(O)).detach(), E = null);
                        };
                    e.magnificPopup.registerModule(z, {
                        options: {
                            hiddenClass: "hide",
                            markup: "",
                            tNotFound: "Content not found"
                        },
                        proto: {
                            initInline: function() {
                                t.types.push(z), k(c + "." + z, (function() {
                                    A();
                                }));
                            },
                            getInline: function(n, i) {
                                if (A(), n.src) {
                                    var o = t.st.inline,
                                        r = e(n.src);
                                    if (r.length) {
                                        var a = r[0].parentNode;
                                        a && a.tagName && (S || (O = o.hiddenClass, S = x(O), O = "mfp-" + O), E = r.after(S).detach().removeClass(O)), t.updateStatus("ready");
                                    } else t.updateStatus("error", o.tNotFound), r = e("<div>");
                                    return n.inlineElement = r, r;
                                }
                                return t.updateStatus("ready"), t._parseMarkup(i, {}, n), i;
                            }
                        }
                    });
                    var I, P = "ajax",
                        M = function() {
                            I && e(document.body).removeClass(I);
                        },
                        L = function() {
                            M(), t.req && t.req.abort();
                        };
                    e.magnificPopup.registerModule(P, {
                        options: {
                            settings: null,
                            cursor: "mfp-ajax-cur",
                            tError: "The content could not be loaded."
                        },
                        proto: {
                            initAjax: function() {
                                t.types.push(P), I = t.st.ajax.cursor, k(c + "." + P, L), k("BeforeChange." + P, L);
                            },
                            getAjax: function(n) {
                                I && e(document.body).addClass(I), t.updateStatus("loading");
                                var i = e.extend({
                                    url: n.src,
                                    success: function(i, o, r) {
                                        var a = {
                                            data: i,
                                            xhr: r
                                        };
                                        C("ParseAjax", a), t.appendContent(e(a.data), P), n.finished = !0, M(), t._setFocus(), setTimeout((function() {
                                            t.wrap.addClass(m);
                                        }), 16), t.updateStatus("ready"), C("AjaxContentAdded");
                                    },
                                    error: function() {
                                        M(), n.finished = n.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", n.src));
                                    }
                                }, t.st.ajax.settings);
                                return t.req = e.ajax(i), "";
                            }
                        }
                    });
                    var $, j, H = function(e) {
                        if (e.data && void 0 !== e.data.title) return e.data.title;
                        var n = t.st.image.titleSrc;
                        if (n) {
                            if ("function" == typeof n) return n.call(t, e);
                            if (e.el) return e.el.attr(n) || "";
                        }
                        return "";
                    };
                    e.magnificPopup.registerModule("image", {
                        options: {
                            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                            cursor: "mfp-zoom-out-cur",
                            titleSrc: "title",
                            verticalFit: !0,
                            tError: "The image could not be loaded."
                        },
                        proto: {
                            initImage: function() {
                                var n = t.st.image,
                                    i = ".image";
                                t.types.push("image"), k(d + i, (function() {
                                    "image" === t.currItem.type && n.cursor && e(document.body).addClass(n.cursor);
                                })), k(c + i, (function() {
                                    n.cursor && e(document.body).removeClass(n.cursor), w.off("resize" + h);
                                })), k("Resize" + i, t.resizeImage), t.isLowIE && k("AfterChange", t.resizeImage);
                            },
                            resizeImage: function() {
                                var e = t.currItem;
                                if (e && e.img && t.st.image.verticalFit) {
                                    var n = 0;
                                    t.isLowIE && (n = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - n);
                                }
                            },
                            _onImageHasSize: function(e) {
                                e.img && (e.hasSize = !0, $ && clearInterval($), e.isCheckingImgSize = !1, C("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1));
                            },
                            findImageSize: function(e) {
                                var n = 0,
                                    i = e.img[0],
                                    o = function(r) {
                                        $ && clearInterval($), $ = setInterval((function() {
                                            i.naturalWidth > 0 ? t._onImageHasSize(e) : (n > 200 && clearInterval($), 3 == ++n ? o(10) : 40 === n ? o(50) : 100 === n && o(500));
                                        }), r);
                                    };
                                o(1);
                            },
                            getImage: function(n, i) {
                                var o = 0,
                                    r = t.st.image,
                                    a = function() {
                                        n && (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("error", r.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0);
                                    },
                                    s = function() {
                                        n && (n.img[0].complete ? (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, C("ImageLoadComplete")) : ++o < 200 ? setTimeout(s, 100) : a());
                                    },
                                    c = i.find(".mfp-img");
                                if (c.length) {
                                    var l = document.createElement("img");
                                    l.className = "mfp-img", n.el && n.el.find("img").length && (l.alt = n.el.find("img").attr("alt")), n.img = e(l).on("load.mfploader", s).on("error.mfploader", a), l.src = n.src, c.is("img") && (n.img = n.img.clone()), (l = n.img[0]).naturalWidth > 0 ? n.hasSize = !0 : l.width || (n.hasSize = !1);
                                }
                                return t._parseMarkup(i, {
                                    title: H(n),
                                    img_replaceWith: n.img
                                }, n), t.resizeImage(), n.hasSize ? ($ && clearInterval($), n.loadError ? (i.addClass("mfp-loading"), t.updateStatus("error", r.tError.replace("%url%", n.src))) : (i.removeClass("mfp-loading"), t.updateStatus("ready")), i) : (t.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, i.addClass("mfp-loading"), t.findImageSize(n)), i);
                            }
                        }
                    }), e.magnificPopup.registerModule("zoom", {
                        options: {
                            enabled: !1,
                            easing: "ease-in-out",
                            duration: 300,
                            opener: function(e) {
                                return e.is("img") ? e : e.find("img");
                            }
                        },
                        proto: {
                            initZoom: function() {
                                var e, n = t.st.zoom,
                                    i = ".zoom";
                                if (n.enabled && t.supportsTransition) {
                                    var o, r, a = n.duration,
                                        s = function(e) {
                                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                                i = "all " + n.duration / 1e3 + "s " + n.easing,
                                                o = {
                                                    position: "fixed",
                                                    zIndex: 9999,
                                                    left: 0,
                                                    top: 0,
                                                    "-webkit-backface-visibility": "hidden"
                                                },
                                                r = "transition";
                                            return o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = i, t.css(o), t;
                                        },
                                        u = function() {
                                            t.content.css("visibility", "visible");
                                        };
                                    k("BuildControls" + i, (function() {
                                        if (t._allowZoom()) {
                                            if (clearTimeout(o), t.content.css("visibility", "hidden"), !(e = t._getItemToZoom())) return void u();
                                            (r = s(e)).css(t._getOffset()), t.wrap.append(r), o = setTimeout((function() {
                                                r.css(t._getOffset(!0)), o = setTimeout((function() {
                                                    u(), setTimeout((function() {
                                                        r.remove(), e = r = null, C("ZoomAnimationEnded");
                                                    }), 16);
                                                }), a);
                                            }), 16);
                                        }
                                    })), k(l + i, (function() {
                                        if (t._allowZoom()) {
                                            if (clearTimeout(o), t.st.removalDelay = a, !e) {
                                                if (!(e = t._getItemToZoom())) return;
                                                r = s(e);
                                            }
                                            r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css("visibility", "hidden"), setTimeout((function() {
                                                r.css(t._getOffset());
                                            }), 16);
                                        }
                                    })), k(c + i, (function() {
                                        t._allowZoom() && (u(), r && r.remove(), e = null);
                                    }));
                                }
                            },
                            _allowZoom: function() {
                                return "image" === t.currItem.type;
                            },
                            _getItemToZoom: function() {
                                return !!t.currItem.hasSize && t.currItem.img;
                            },
                            _getOffset: function(n) {
                                var i, o = (i = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem)).offset(),
                                    r = parseInt(i.css("padding-top"), 10),
                                    a = parseInt(i.css("padding-bottom"), 10);
                                o.top -= e(window).scrollTop() - r;
                                var s = {
                                    width: i.width(),
                                    height: (y ? i.innerHeight() : i[0].offsetHeight) - a - r
                                };
                                return void 0 === j && (j = void 0 !== document.createElement("p").style.MozTransform), j ? s["-moz-transform"] = s.transform = "translate(" + o.left + "px," + o.top + "px)" : (s.left = o.left, s.top = o.top), s;
                            }
                        }
                    });
                    var D = "iframe",
                        R = function(e) {
                            if (t.currTemplate[D]) {
                                var n = t.currTemplate[D].find("iframe");
                                n.length && (e || (n[0].src = "//about:blank"), t.isIE8 && n.css("display", e ? "block" : "none"));
                            }
                        };
                    e.magnificPopup.registerModule(D, {
                        options: {
                            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                            srcAction: "iframe_src",
                            patterns: {
                                youtube: {
                                    index: "youtube.com",
                                    id: "v=",
                                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                                },
                                vimeo: {
                                    index: "vimeo.com/",
                                    id: "/",
                                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                                },
                                gmaps: {
                                    index: "//maps.google.",
                                    src: "%id%&output=embed"
                                }
                            }
                        },
                        proto: {
                            initIframe: function() {
                                t.types.push(D), k("BeforeChange", (function(e, t, n) {
                                    t !== n && (t === D ? R() : n === D && R(!0));
                                })), k(c + "." + D, (function() {
                                    R();
                                }));
                            },
                            getIframe: function(n, i) {
                                var o = n.src,
                                    r = t.st.iframe;
                                e.each(r.patterns, (function() {
                                    if (o.indexOf(this.index) > -1) return this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1;
                                }));
                                var a = {};
                                return r.srcAction && (a[r.srcAction] = o), t._parseMarkup(i, a, n), t.updateStatus("ready"), i;
                            }
                        }
                    });
                    var F = function(e) {
                            var n = t.items.length;
                            return e > n - 1 ? e - n : e < 0 ? n + e : e;
                        },
                        N = function(e, t, n) {
                            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n);
                        };
                    e.magnificPopup.registerModule("gallery", {
                        options: {
                            enabled: !1,
                            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                            preload: [0, 2],
                            navigateByImgClick: !0,
                            arrows: !0,
                            tPrev: "Previous (Left arrow key)",
                            tNext: "Next (Right arrow key)",
                            tCounter: "%curr% of %total%",
                            langDir: null,
                            loop: !0
                        },
                        proto: {
                            initGallery: function() {
                                var n = t.st.gallery,
                                    o = ".mfp-gallery";
                                if (t.direction = !0, !n || !n.enabled) return !1;
                                n.langDir || (n.langDir = document.dir || "ltr"), r += " mfp-gallery", k(d + o, (function() {
                                    n.navigateByImgClick && t.wrap.on("click" + o, ".mfp-img", (function() {
                                        if (t.items.length > 1) return t.next(), !1;
                                    })), i.on("keydown" + o, (function(e) {
                                        37 === e.keyCode ? "rtl" === n.langDir ? t.next() : t.prev() : 39 === e.keyCode && ("rtl" === n.langDir ? t.prev() : t.next());
                                    })), t.updateGalleryButtons();
                                })), k("UpdateStatus" + o, (function() {
                                    t.updateGalleryButtons();
                                })), k("UpdateStatus" + o, (function(e, n) {
                                    n.text && (n.text = N(n.text, t.currItem.index, t.items.length));
                                })), k(u + o, (function(e, i, o, r) {
                                    var a = t.items.length;
                                    o.counter = a > 1 ? N(n.tCounter, r.index, a) : "";
                                })), k("BuildControls" + o, (function() {
                                    if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
                                        var i, o, r, a;
                                        "rtl" === n.langDir ? (i = n.tNext, o = n.tPrev, r = "next", a = "prev") : (i = n.tPrev, o = n.tNext, r = "prev", a = "next");
                                        var s = n.arrowMarkup,
                                            c = t.arrowLeft = e(s.replace(/%title%/gi, i).replace(/%action%/gi, r).replace(/%dir%/gi, "left")).addClass(v),
                                            l = t.arrowRight = e(s.replace(/%title%/gi, o).replace(/%action%/gi, a).replace(/%dir%/gi, "right")).addClass(v);
                                        "rtl" === n.langDir ? (t.arrowNext = c, t.arrowPrev = l) : (t.arrowNext = l, t.arrowPrev = c), c.on("click", (function() {
                                            "rtl" === n.langDir ? t.next() : t.prev();
                                        })), l.on("click", (function() {
                                            "rtl" === n.langDir ? t.prev() : t.next();
                                        })), t.container.append(c.add(l));
                                    }
                                })), k(f + o, (function() {
                                    t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout((function() {
                                        t.preloadNearbyImages(), t._preloadTimeout = null;
                                    }), 16);
                                })), k(c + o, (function() {
                                    i.off(o), t.wrap.off("click" + o), t.arrowRight = t.arrowLeft = null;
                                }));
                            },
                            next: function() {
                                var e = F(t.index + 1);
                                if (!t.st.gallery.loop && 0 === e) return !1;
                                t.direction = !0, t.index = e, t.updateItemHTML();
                            },
                            prev: function() {
                                var e = t.index - 1;
                                if (!t.st.gallery.loop && e < 0) return !1;
                                t.direction = !1, t.index = F(e), t.updateItemHTML();
                            },
                            goTo: function(e) {
                                t.direction = e >= t.index, t.index = e, t.updateItemHTML();
                            },
                            preloadNearbyImages: function() {
                                var e, n = t.st.gallery.preload,
                                    i = Math.min(n[0], t.items.length),
                                    o = Math.min(n[1], t.items.length);
                                for (e = 1; e <= (t.direction ? o : i); e++) t._preloadItem(t.index + e);
                                for (e = 1; e <= (t.direction ? i : o); e++) t._preloadItem(t.index - e);
                            },
                            _preloadItem: function(n) {
                                if (n = F(n), !t.items[n].preloaded) {
                                    var i = t.items[n];
                                    i.parsed || (i = t.parseEl(n)), C("LazyLoad", i), "image" === i.type && (i.img = e('<img class="mfp-img" />').on("load.mfploader", (function() {
                                        i.hasSize = !0;
                                    })).on("error.mfploader", (function() {
                                        i.hasSize = !0, i.loadError = !0, C("LazyLoadError", i);
                                    })).attr("src", i.src)), i.preloaded = !0;
                                }
                            },
                            updateGalleryButtons: function() {
                                t.st.gallery.loop || "object" != typeof t.arrowPrev || null === t.arrowPrev || (0 === t.index ? t.arrowPrev.hide() : t.arrowPrev.show(), t.index === t.items.length - 1 ? t.arrowNext.hide() : t.arrowNext.show());
                            }
                        }
                    });
                    var B = "retina";
                    e.magnificPopup.registerModule(B, {
                        options: {
                            replaceSrc: function(e) {
                                return e.src.replace(/\.\w+$/, (function(e) {
                                    return "@2x" + e;
                                }));
                            },
                            ratio: 1
                        },
                        proto: {
                            initRetina: function() {
                                if (window.devicePixelRatio > 1) {
                                    var e = t.st.retina,
                                        n = e.ratio;
                                    (n = isNaN(n) ? n() : n) > 1 && (k("ImageHasSize." + B, (function(e, t) {
                                        t.img.css({
                                            "max-width": t.img[0].naturalWidth / n,
                                            width: "100%"
                                        });
                                    })), k("ElementParse." + B, (function(t, i) {
                                        i.src = e.replaceSrc(i, n);
                                    })));
                                }
                            }
                        }
                    }), T();
                }, void 0 === (r = i.apply(t, o)) || (e.exports = r);
            },
            72: (e) => {
                "use strict";
                var t = [];

                function n(e) {
                    for (var n = -1, i = 0; i < t.length; i++)
                        if (t[i].identifier === e) {
                            n = i;
                            break;
                        }
                    return n;
                }

                function i(e, i) {
                    for (var r = {}, a = [], s = 0; s < e.length; s++) {
                        var c = e[s],
                            l = i.base ? c[0] + i.base : c[0],
                            u = r[l] || 0,
                            d = "".concat(l, " ").concat(u);
                        r[l] = u + 1;
                        var f = n(d),
                            p = {
                                css: c[1],
                                media: c[2],
                                sourceMap: c[3],
                                supports: c[4],
                                layer: c[5]
                            };
                        if (-1 !== f) t[f].references++, t[f].updater(p);
                        else {
                            var h = o(p, i);
                            i.byIndex = s, t.splice(s, 0, {
                                identifier: d,
                                updater: h,
                                references: 1
                            });
                        }
                        a.push(d);
                    }
                    return a;
                }

                function o(e, t) {
                    var n = t.domAPI(t);
                    return n.update(e),
                        function(t) {
                            if (t) {
                                if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap && t.supports === e.supports && t.layer === e.layer) return;
                                n.update(e = t);
                            } else n.remove();
                        };
                }
                e.exports = function(e, o) {
                    var r = i(e = e || [], o = o || {});
                    return function(e) {
                        e = e || [];
                        for (var a = 0; a < r.length; a++) {
                            var s = n(r[a]);
                            t[s].references--;
                        }
                        for (var c = i(e, o), l = 0; l < r.length; l++) {
                            var u = n(r[l]);
                            0 === t[u].references && (t[u].updater(), t.splice(u, 1));
                        }
                        r = c;
                    };
                };
            },
            659: (e) => {
                "use strict";
                var t = {};
                e.exports = function(e, n) {
                    var i = function(e) {
                        if (void 0 === t[e]) {
                            var n = document.querySelector(e);
                            if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try {
                                n = n.contentDocument.head;
                            } catch (e) {
                                n = null;
                            }
                            t[e] = n;
                        }
                        return t[e];
                    }(e);
                    if (!i) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                    i.appendChild(n);
                };
            },
            540: (e) => {
                "use strict";
                e.exports = function(e) {
                    var t = document.createElement("style");
                    return e.setAttributes(t, e.attributes), e.insert(t, e.options), t;
                };
            },
            56: (e, t, n) => {
                "use strict";
                e.exports = function(e) {
                    var t = n.nc;
                    t && e.setAttribute("nonce", t);
                };
            },
            825: (e) => {
                "use strict";
                e.exports = function(e) {
                    if ("undefined" == typeof document) return {
                        update: function() {},
                        remove: function() {}
                    };
                    var t = e.insertStyleElement(e);
                    return {
                        update: function(n) {
                            ! function(e, t, n) {
                                var i = "";
                                n.supports && (i += "@supports (".concat(n.supports, ") {")), n.media && (i += "@media ".concat(n.media, " {"));
                                var o = void 0 !== n.layer;
                                o && (i += "@layer".concat(n.layer.length > 0 ? " ".concat(n.layer) : "", " {")), i += n.css, o && (i += "}"), n.media && (i += "}"), n.supports && (i += "}");
                                var r = n.sourceMap;
                                r && "undefined" != typeof btoa && (i += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r)))), " */")), t.styleTagTransform(i, e, t.options);
                            }(t, e, n);
                        },
                        remove: function() {
                            ! function(e) {
                                if (null === e.parentNode) return !1;
                                e.parentNode.removeChild(e);
                            }(t);
                        }
                    };
                };
            },
            113: (e) => {
                "use strict";
                e.exports = function(e, t) {
                    if (t.styleSheet) t.styleSheet.cssText = e;
                    else {
                        for (; t.firstChild;) t.removeChild(t.firstChild);
                        t.appendChild(document.createTextNode(e));
                    }
                };
            },
            669: (e) => {
                "use strict";
                e.exports = jQuery;
            }
        },
        t = {};

    function n(i) {
        var o = t[i];
        if (void 0 !== o) return o.exports;
        var r = t[i] = {
            id: i,
            exports: {}
        };
        return e[i](r, r.exports, n), r.exports;
    }
    n.n = (e) => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return n.d(t, {
            a: t
        }), t;
    }, n.d = (e, t) => {
        for (var i in t) n.o(t, i) && !n.o(e, i) && Object.defineProperty(e, i, {
            enumerable: !0,
            get: t[i]
        });
    }, n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), n.nc = void 0, (() => {
        "use strict";
        var e = n(669),
            t = n.n(e);

        function i() {
            return "rtl" === t()("html").attr("dir");
        }

        function o() {
            for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 6, t = arguments.length > 1 ? arguments[1] : void 0, n = "", i = 0; i < e; i++) n += "0123456789abcdefghijklmnopqrstuvwxyz" [Math.floor(36 * Math.random())];
            return t ? "".concat(n, "-").concat(t) : n;
        }

        function r(e) {
            var t, n = {
                    transition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "otransitionend"
                },
                i = document.createElement("div");
            for (var o in n) void 0 !== i.style[o] && (t = n[o]);
            return t || (setTimeout((function() {
                e.triggerHandler("transitionend", [e]);
            }), 1), "transitionend");
        }

        function a(e, n) {
            var i = "complete" === document.readyState,
                o = (i ? "_didLoad" : "load") + ".zf.util.onLoad",
                r = function() {
                    return e.triggerHandler(o);
                };
            return e && (n && e.one(o, n), i ? setTimeout(r) : t()(window).one("load", r)), o;
        }

        function s(e) {
            return s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            }, s(e);
        }

        function c(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, i = Array(t); n < t; n++) i[n] = e[n];
            return i;
        }
        window.matchMedia || (window.matchMedia = function() {
            var e = window.styleMedia || window.media;
            if (!e) {
                var t, n = document.createElement("style"),
                    i = document.getElementsByTagName("script")[0];
                n.type = "text/css", n.id = "matchmediajs-test", i ? i.parentNode.insertBefore(n, i) : document.head.appendChild(n), t = "getComputedStyle" in window && window.getComputedStyle(n, null) || n.currentStyle, e = {
                    matchMedium: function(e) {
                        var i = "@media " + e + "{ #matchmediajs-test { width: 1px; } }";
                        return n.styleSheet ? n.styleSheet.cssText = i : n.textContent = i, "1px" === t.width;
                    }
                };
            }
            return function(t) {
                return {
                    matches: e.matchMedium(t || "all"),
                    media: t || "all"
                };
            };
        }());
        var l = {
            queries: [],
            current: "",
            _init: function() {
                if (!0 === this.isInitialized) return this;
                this.isInitialized = !0, t()("meta.foundation-mq").length || t()('<meta class="foundation-mq" name="foundation-mq" content>').appendTo(document.head);
                var e, n, i, o = t()(".foundation-mq").css("font-family");
                for (var r in i = void 0, i = {}, e = "string" != typeof(n = o) ? i : (n = n.trim().slice(1, -1)) ? (i = n.split("&").reduce((function(e, t) {
                        var n = t.replace(/\+/g, " ").split("="),
                            i = n[0],
                            o = n[1];
                        return i = decodeURIComponent(i), o = void 0 === o ? null : decodeURIComponent(o), e.hasOwnProperty(i) ? Array.isArray(e[i]) ? e[i].push(o) : e[i] = [e[i], o] : e[i] = o, e;
                    }), {}), i) : i, this.queries = [], e) e.hasOwnProperty(r) && this.queries.push({
                    name: r,
                    value: "only screen and (min-width: ".concat(e[r], ")")
                });
                this.current = this._getCurrentSize(), this._watcher();
            },
            _reInit: function() {
                this.isInitialized = !1, this._init();
            },
            atLeast: function(e) {
                var t = this.get(e);
                return !!t && window.matchMedia(t).matches;
            },
            only: function(e) {
                return e === this._getCurrentSize();
            },
            upTo: function(e) {
                var t = this.next(e);
                return !t || !this.atLeast(t);
            },
            is: function(e) {
                var t, n = function(e) {
                        if (Array.isArray(e)) return e;
                    }(t = e.trim().split(" ").filter((function(e) {
                        return !!e.length;
                    }))) || function(e) {
                        var t = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (null != t) {
                            var n, i, o, r, a = [],
                                s = !0,
                                c = !1;
                            try {
                                for (o = (t = t.call(e)).next, !2; !(s = (n = o.call(t)).done) && (a.push(n.value), 2 !== a.length); s = !0);
                            } catch (e) {
                                c = !0, i = e;
                            } finally {
                                try {
                                    if (!s && null != t.return && (r = t.return(), Object(r) !== r)) return;
                                } finally {
                                    if (c) throw i;
                                }
                            }
                            return a;
                        }
                    }(t) || function(e) {
                        if (e) {
                            if ("string" == typeof e) return c(e, 2);
                            var t = {}.toString.call(e).slice(8, -1);
                            return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? c(e, 2) : void 0;
                        }
                    }(t) || function() {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                    }(),
                    i = n[0],
                    o = n[1],
                    r = void 0 === o ? "" : o;
                if ("only" === r) return this.only(i);
                if (!r || "up" === r) return this.atLeast(i);
                if ("down" === r) return this.upTo(i);
                throw new Error('\n      Invalid breakpoint passed to MediaQuery.is().\n      Expected a breakpoint name formatted like "<size> <modifier>", got "'.concat(e, '".\n    '));
            },
            get: function(e) {
                for (var t in this.queries)
                    if (this.queries.hasOwnProperty(t)) {
                        var n = this.queries[t];
                        if (e === n.name) return n.value;
                    }
                return null;
            },
            next: function(e) {
                var t = this,
                    n = this.queries.findIndex((function(n) {
                        return t._getQueryName(n) === e;
                    }));
                if (-1 === n) throw new Error('\n        Unknown breakpoint "'.concat(e, '" passed to MediaQuery.next().\n        Ensure it is present in your Sass "$breakpoints" setting.\n      '));
                var i = this.queries[n + 1];
                return i ? i.name : null;
            },
            _getQueryName: function(e) {
                if ("string" == typeof e) return e;
                if ("object" === s(e)) return e.name;
                throw new TypeError('\n      Invalid value passed to MediaQuery._getQueryName().\n      Expected a breakpoint name (String) or a breakpoint query (Object), got "'.concat(e, '" (').concat(s(e), ")\n    "));
            },
            _getCurrentSize: function() {
                for (var e, t = 0; t < this.queries.length; t++) {
                    var n = this.queries[t];
                    window.matchMedia(n.value).matches && (e = n);
                }
                return e && this._getQueryName(e);
            },
            _watcher: function() {
                var e = this;
                t()(window).on("resize.zf.trigger", (function() {
                    var n = e._getCurrentSize(),
                        i = e.current;
                    n !== i && (e.current = n, t()(window).trigger("changed.zf.mediaquery", [n, i]));
                }));
            }
        };

        function u(e) {
            return u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            }, u(e);
        }
        var d = {
            version: "6.9.0",
            _plugins: {},
            _uuids: [],
            plugin: function(e, t) {
                var n = t || f(e),
                    i = p(n);
                this._plugins[i] = this[n] = e;
            },
            registerPlugin: function(e, t) {
                var n = t ? p(t) : f(e.constructor).toLowerCase();
                e.uuid = o(6, n), e.$element.attr("data-".concat(n)) || e.$element.attr("data-".concat(n), e.uuid), e.$element.data("zfPlugin") || e.$element.data("zfPlugin", e), e.$element.trigger("init.zf.".concat(n)), this._uuids.push(e.uuid);
            },
            unregisterPlugin: function(e) {
                var t = p(f(e.$element.data("zfPlugin").constructor));
                for (var n in this._uuids.splice(this._uuids.indexOf(e.uuid), 1), e.$element.removeAttr("data-".concat(t)).removeData("zfPlugin").trigger("destroyed.zf.".concat(t)), e) "function" == typeof e[n] && (e[n] = null);
            },
            reInit: function(e) {
                var n = e instanceof t();
                try {
                    if (n) e.each((function() {
                        t()(this).data("zfPlugin")._init();
                    }));
                    else {
                        var i = u(e),
                            o = this;
                        ({
                            object: function(e) {
                                e.forEach((function(e) {
                                    e = p(e), t()("[data-" + e + "]").foundation("_init");
                                }));
                            },
                            string: function() {
                                e = p(e), t()("[data-" + e + "]").foundation("_init");
                            },
                            undefined: function() {
                                this.object(Object.keys(o._plugins));
                            }
                        })[i](e);
                    }
                } catch (e) {
                    console.error(e);
                } finally {
                    return e;
                }
            },
            reflow: function(e, n) {
                void 0 === n ? n = Object.keys(this._plugins) : "string" == typeof n && (n = [n]);
                var i = this;
                t().each(n, (function(n, o) {
                    var r = i._plugins[o];
                    t()(e).find("[data-" + o + "]").addBack("[data-" + o + "]").filter((function() {
                        return void 0 === t()(this).data("zfPlugin");
                    })).each((function() {
                        var e = t()(this),
                            n = {
                                reflow: !0
                            };
                        e.attr("data-options") && e.attr("data-options").split(";").forEach((function(e) {
                            var t, i = e.split(":").map((function(e) {
                                return e.trim();
                            }));
                            i[0] && (n[i[0]] = "true" === (t = i[1]) || "false" !== t && (isNaN(1 * t) ? t : parseFloat(t)));
                        }));
                        try {
                            e.data("zfPlugin", new r(t()(this), n));
                        } catch (e) {
                            console.error(e);
                        } finally {
                            return;
                        }
                    }));
                }));
            },
            getFnName: f,
            addToJquery: function() {
                return t().fn.foundation = function(e) {
                    var n = u(e),
                        i = t()(".no-js");
                    if (i.length && i.removeClass("no-js"), "undefined" === n) l._init(), d.reflow(this);
                    else {
                        if ("string" !== n) throw new TypeError("We're sorry, ".concat(n, " is not a valid parameter. You must use a string representing the method you wish to invoke."));
                        var o = Array.prototype.slice.call(arguments, 1),
                            r = this.data("zfPlugin");
                        if (void 0 === r || void 0 === r[e]) throw new ReferenceError("We're sorry, '" + e + "' is not an available method for " + (r ? f(r) : "this element") + ".");
                        1 === this.length ? r[e].apply(r, o) : this.each((function(n, i) {
                            r[e].apply(t()(i).data("zfPlugin"), o);
                        }));
                    }
                    return this;
                }, t();
            }
        };

        function f(e) {
            if (void 0 === Function.prototype.name) {
                var t = /function\s([^(]{1,})\(/.exec(e.toString());
                return t && t.length > 1 ? t[1].trim() : "";
            }
            return void 0 === e.prototype ? e.constructor.name : e.prototype.constructor.name;
        }

        function p(e) {
            return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        }

        function h(e) {
            return h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            }, h(e);
        }

        function m(e) {
            var t = function(e) {
                if ("object" != h(e) || !e) return e;
                var t = e[Symbol.toPrimitive];
                if (void 0 !== t) {
                    var n = t.call(e, "string");
                    if ("object" != h(n)) return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(e);
            }(e);
            return "symbol" == h(t) ? t : t + "";
        }
        d.util = {
                throttle: function(e, t) {
                    var n = null;
                    return function() {
                        var i = this,
                            o = arguments;
                        null === n && (n = setTimeout((function() {
                            e.apply(i, o), n = null;
                        }), t));
                    };
                }
            }, window.Foundation = d,
            function() {
                Date.now && window.Date.now || (window.Date.now = Date.now = function() {
                    return (new Date()).getTime();
                });
                for (var e = ["webkit", "moz"], t = 0; t < e.length && !window.requestAnimationFrame; ++t) {
                    var n = e[t];
                    window.requestAnimationFrame = window[n + "RequestAnimationFrame"], window.cancelAnimationFrame = window[n + "CancelAnimationFrame"] || window[n + "CancelRequestAnimationFrame"];
                }
                if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
                    var i = 0;
                    window.requestAnimationFrame = function(e) {
                        var t = Date.now(),
                            n = Math.max(i + 16, t);
                        return setTimeout((function() {
                            e(i = n);
                        }), n - t);
                    }, window.cancelAnimationFrame = clearTimeout;
                }
                window.performance && window.performance.now || (window.performance = {
                    start: Date.now(),
                    now: function() {
                        return Date.now() - this.start;
                    }
                });
            }(), Function.prototype.bind || (Function.prototype.bind = function(e) {
                if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                var t = Array.prototype.slice.call(arguments, 1),
                    n = this,
                    i = function() {},
                    o = function() {
                        return n.apply(this instanceof i ? this : e, t.concat(Array.prototype.slice.call(arguments)));
                    };
                return this.prototype && (i.prototype = this.prototype), o.prototype = new i(), o;
            }), window.$ = t(), d.addToJquery(t()), t()(document).foundation(), t()(document).on("click", ".ui-widget-overlay", (function() {
                t()(".ui-dialog-titlebar .ui-button").trigger("click");
            })), t()("#skip-to-content").find(".skip-to-content-link").on("click", (function(e) {
                e.preventDefault();
                var n = t()(t()(this).attr("href"));
                window.location.hash = t()(this).attr("href");
                var i = t()(".region-header-bottom").length > 0 ? t()(".region-header-bottom").height() : 0,
                    o = t()(".initialized.region-header").height();
                if (n.attr("tabindex", "-1"), n.focus(), o) {
                    var r = window.location.hash,
                        a = t()(r).offset().top - (o + i);
                    window.scrollTo(0, a);
                }
                n.on("blur focusout", (function() {
                    t()(this).removeAttr("tabindex");
                }));
            }));
        var g = function() {
            return e = function e(t, n) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, e), this._setup(t, n);
                var i = v(this);
                this.uuid = o(6, i), this.$element.attr("data-".concat(i)) || this.$element.attr("data-".concat(i), this.uuid), this.$element.data("zfPlugin") || this.$element.data("zfPlugin", this), this.$element.trigger("init.zf.".concat(i));
            }, (t = [{
                key: "destroy",
                value: function() {
                    this._destroy();
                    var e = v(this);
                    for (var t in this.$element.removeAttr("data-".concat(e)).removeData("zfPlugin").trigger("destroyed.zf.".concat(e)), this) this.hasOwnProperty(t) && (this[t] = null);
                }
            }]) && function(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, m(i.key), i);
                }
            }(e.prototype, t), Object.defineProperty(e, "prototype", {
                writable: !1
            }), e;
            var e, t;
        }();

        function v(e) {
            return e.className.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        }
        var b = {
                9: "TAB",
                13: "ENTER",
                27: "ESCAPE",
                32: "SPACE",
                35: "END",
                36: "HOME",
                37: "ARROW_LEFT",
                38: "ARROW_UP",
                39: "ARROW_RIGHT",
                40: "ARROW_DOWN"
            },
            y = {};

        function w(e) {
            return !!e && e.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter((function() {
                return !(!t()(this).is(":visible") || t()(this).attr("tabindex") < 0);
            })).sort((function(e, n) {
                if (t()(e).attr("tabindex") === t()(n).attr("tabindex")) return 0;
                var i = parseInt(t()(e).attr("tabindex"), 10),
                    o = parseInt(t()(n).attr("tabindex"), 10);
                return void 0 === t()(e).attr("tabindex") && o > 0 ? 1 : void 0 === t()(n).attr("tabindex") && i > 0 ? -1 : 0 === i && o > 0 ? 1 : 0 === o && i > 0 || i < o ? -1 : i > o ? 1 : void 0;
            }));
        }

        function k(e) {
            var t = b[e.which || e.keyCode] || String.fromCharCode(e.which).toUpperCase();
            return t = t.replace(/\W+/, ""), e.shiftKey && (t = "SHIFT_".concat(t)), e.ctrlKey && (t = "CTRL_".concat(t)), e.altKey && (t = "ALT_".concat(t)), t.replace(/_$/, "");
        }
        var x = {
                keys: function(e) {
                    var t = {};
                    for (var n in e) e.hasOwnProperty(n) && (t[e[n]] = e[n]);
                    return t;
                }(b),
                parseKey: k,
                handleKey: function(e, n, o) {
                    var r, a = y[n],
                        s = this.parseKey(e);
                    if (!a) return console.warn("Component not defined!");
                    if (!0 !== e.zfIsKeyHandled)
                        if ((r = o[(void 0 === a.ltr ? a : i() ? t().extend({}, a.ltr, a.rtl) : t().extend({}, a.rtl, a.ltr))[s]]) && "function" == typeof r) {
                            var c = r.apply();
                            e.zfIsKeyHandled = !0, (o.handled || "function" == typeof o.handled) && o.handled(c);
                        } else(o.unhandled || "function" == typeof o.unhandled) && o.unhandled();
                },
                findFocusable: w,
                register: function(e, t) {
                    y[e] = t;
                },
                trapFocus: function(e) {
                    var t = w(e),
                        n = t.eq(0),
                        i = t.eq(-1);
                    e.on("keydown.zf.trapfocus", (function(e) {
                        e.target === i[0] && "TAB" === k(e) ? (e.preventDefault(), n.focus()) : e.target === n[0] && "SHIFT_TAB" === k(e) && (e.preventDefault(), i.focus());
                    }));
                },
                releaseFocus: function(e) {
                    e.off("keydown.zf.trapfocus");
                }
            },
            C = function(e) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "zf";
                e.attr("role", "menubar"), e.find("a").attr({
                    role: "menuitem"
                });
                var i = e.find("li").attr({
                        role: "none"
                    }),
                    o = "is-".concat(n, "-submenu"),
                    r = "".concat(o, "-item"),
                    a = "is-".concat(n, "-submenu-parent"),
                    s = "accordion" !== n;
                i.each((function() {
                    var e = t()(this),
                        i = e.children("ul");
                    if (i.length) {
                        if (e.addClass(a), s) {
                            var c = e.children("a:first");
                            c.attr({
                                "aria-haspopup": !0,
                                "aria-label": c.attr("aria-label") || c.text()
                            }), "drilldown" === n && e.attr({
                                "aria-expanded": !1
                            });
                        }
                        i.addClass("submenu ".concat(o)).attr({
                            "data-submenu": "",
                            role: "menubar"
                        }), "drilldown" === n && i.attr({
                            "aria-hidden": !0
                        });
                    }
                    e.parent("[data-submenu]").length && e.addClass("is-submenu-item ".concat(r));
                }));
            },
            _ = function(e, t) {
                var n = "is-".concat(t, "-submenu"),
                    i = "".concat(n, "-item"),
                    o = "is-".concat(t, "-submenu-parent");
                e.find(">li, > li > ul, .menu, .menu > li, [data-submenu] > li").removeClass("".concat(n, " ").concat(i, " ").concat(o, " is-submenu-item submenu is-active")).removeAttr("data-submenu").css("display", "");
            },
            T = {
                ImNotTouchingYou: function(e, t, n, i, o) {
                    return 0 === O(e, t, n, i, o);
                },
                OverlapArea: O,
                GetDimensions: S,
                GetExplicitOffsets: function(e, t, n, i, o, r, a) {
                    var s, c, l = S(e),
                        u = t ? S(t) : null;
                    if (null !== u) {
                        switch (n) {
                            case "top":
                                s = u.offset.top - (l.height + o);
                                break;
                            case "bottom":
                                s = u.offset.top + u.height + o;
                                break;
                            case "left":
                                c = u.offset.left - (l.width + r);
                                break;
                            case "right":
                                c = u.offset.left + u.width + r;
                        }
                        switch (n) {
                            case "top":
                            case "bottom":
                                switch (i) {
                                    case "left":
                                        c = u.offset.left + r;
                                        break;
                                    case "right":
                                        c = u.offset.left - l.width + u.width - r;
                                        break;
                                    case "center":
                                        c = a ? r : u.offset.left + u.width / 2 - l.width / 2 + r;
                                }
                                break;
                            case "right":
                            case "left":
                                switch (i) {
                                    case "bottom":
                                        s = u.offset.top - o + u.height - l.height;
                                        break;
                                    case "top":
                                        s = u.offset.top + o;
                                        break;
                                    case "center":
                                        s = u.offset.top + o + u.height / 2 - l.height / 2;
                                }
                        }
                    }
                    return {
                        top: s,
                        left: c
                    };
                }
            };

        function O(e, t, n, i, o) {
            var r, a, s, c, l = S(e);
            if (t) {
                var u = S(t);
                a = u.height + u.offset.top - (l.offset.top + l.height), r = l.offset.top - u.offset.top, s = l.offset.left - u.offset.left, c = u.width + u.offset.left - (l.offset.left + l.width);
            } else a = l.windowDims.height + l.windowDims.offset.top - (l.offset.top + l.height), r = l.offset.top - l.windowDims.offset.top, s = l.offset.left - l.windowDims.offset.left, c = l.windowDims.width - (l.offset.left + l.width);
            return a = o ? 0 : Math.min(a, 0), r = Math.min(r, 0), s = Math.min(s, 0), c = Math.min(c, 0), n ? s + c : i ? r + a : Math.sqrt(r * r + a * a + s * s + c * c);
        }

        function S(e) {
            if ((e = e.length ? e[0] : e) === window || e === document) throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
            var t = e.getBoundingClientRect(),
                n = e.parentNode.getBoundingClientRect(),
                i = document.body.getBoundingClientRect(),
                o = window.pageYOffset,
                r = window.pageXOffset;
            return {
                width: t.width,
                height: t.height,
                offset: {
                    top: t.top + o,
                    left: t.left + r
                },
                parentDims: {
                    width: n.width,
                    height: n.height,
                    offset: {
                        top: n.top + o,
                        left: n.left + r
                    }
                },
                windowDims: {
                    width: i.width,
                    height: i.height,
                    offset: {
                        top: o,
                        left: r
                    }
                }
            };
        }

        function E(e) {
            return E = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            }, E(e);
        }

        function z(e) {
            var t = function(e) {
                if ("object" != E(e) || !e) return e;
                var t = e[Symbol.toPrimitive];
                if (void 0 !== t) {
                    var n = t.call(e, "string");
                    if ("object" != E(n)) return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(e);
            }(e);
            return "symbol" == E(t) ? t : t + "";
        }
        var A, I, P, M, L = {},
            $ = !1,
            j = !1;

        function H(e) {
            if (this.removeEventListener("touchmove", D), this.removeEventListener("touchend", H), !j) {
                var n = t().Event("tap", M || e);
                t()(this).trigger(n);
            }
            M = null, $ = !1, j = !1;
        }

        function D(e) {
            if (!0 === t().spotSwipe.preventDefault && e.preventDefault(), $) {
                var n, i = e.touches[0].pageX,
                    o = A - i;
                j = !0, P = (new Date()).getTime() - I, Math.abs(o) >= t().spotSwipe.moveThreshold && P <= t().spotSwipe.timeThreshold && (n = o > 0 ? "left" : "right"), n && (e.preventDefault(), H.apply(this, arguments), t()(this).trigger(t().Event("swipe", Object.assign({}, e)), n).trigger(t().Event("swipe".concat(n), Object.assign({}, e))));
            }
        }

        function R(e) {
            1 === e.touches.length && (A = e.touches[0].pageX, M = e, $ = !0, j = !1, I = (new Date()).getTime(), this.addEventListener("touchmove", D, {
                passive: !0 === t().spotSwipe.preventDefault
            }), this.addEventListener("touchend", H, !1));
        }

        function F() {
            this.addEventListener && this.addEventListener("touchstart", R, {
                passive: !0
            });
        }
        var N = function() {
            return e = function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, e), this.version = "1.0.0", this.enabled = "ontouchstart" in document.documentElement, this.preventDefault = !1, this.moveThreshold = 75, this.timeThreshold = 200, this._init();
            }, (n = [{
                key: "_init",
                value: function() {
                    t().event.special.swipe = {
                        setup: F
                    }, t().event.special.tap = {
                        setup: F
                    }, t().each(["left", "up", "down", "right"], (function() {
                        t().event.special["swipe".concat(this)] = {
                            setup: function() {
                                t()(this).on("swipe", t().noop);
                            }
                        };
                    }));
                }
            }]) && function(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, z(i.key), i);
                }
            }(e.prototype, n), Object.defineProperty(e, "prototype", {
                writable: !1
            }), e;
            var e, n;
        }();

        function B(e) {
            return B = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            }, B(e);
        }

        function W(e) {
            var t = function(e) {
                if ("object" != B(e) || !e) return e;
                var t = e[Symbol.toPrimitive];
                if (void 0 !== t) {
                    var n = t.call(e, "string");
                    if ("object" != B(n)) return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(e);
            }(e);
            return "symbol" == B(t) ? t : t + "";
        }

        function q() {
            try {
                var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
            } catch (e) {}
            return (q = function() {
                return !!e;
            })();
        }

        function U(e) {
            return U = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            }, U(e);
        }

        function V(e, t) {
            return V = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                return e.__proto__ = t, e;
            }, V(e, t);
        }
        L.setupSpotSwipe = function() {
            t().spotSwipe = new N(t());
        }, L.setupTouchHandler = function() {
            t().fn.addTouch = function() {
                this.each((function(n, i) {
                    t()(i).bind("touchstart touchmove touchend touchcancel", (function(t) {
                        e(t);
                    }));
                }));
                var e = function(e) {
                    var t, n = e.changedTouches[0],
                        i = {
                            touchstart: "mousedown",
                            touchmove: "mousemove",
                            touchend: "mouseup"
                        }[e.type];
                    "MouseEvent" in window && "function" == typeof window.MouseEvent ? t = new window.MouseEvent(i, {
                        bubbles: !0,
                        cancelable: !0,
                        screenX: n.screenX,
                        screenY: n.screenY,
                        clientX: n.clientX,
                        clientY: n.clientY
                    }) : (t = document.createEvent("MouseEvent")).initMouseEvent(i, !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), n.target.dispatchEvent(t);
                };
            };
        }, L.init = function() {
            void 0 === t().spotSwipe && (L.setupSpotSwipe(t()), L.setupTouchHandler(t()));
        };
        var Y = function(e) {
            function n() {
                return function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                    }(this, n),
                    function(e, t, n) {
                        return t = U(t),
                            function(e, t) {
                                if (t && ("object" == B(t) || "function" == typeof t)) return t;
                                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                                return function(e) {
                                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                    return e;
                                }(e);
                            }(e, q() ? Reflect.construct(t, n || [], U(e).constructor) : t.apply(e, n));
                    }(this, n, arguments);
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && V(e, t);
            }(n, e), o = n, r = [{
                key: "_setup",
                value: function(e, i) {
                    this.$element = e, this.options = t().extend({}, n.defaults, this.$element.data(), i), this.className = "DropdownMenu", L.init(t()), this._init(), x.register("DropdownMenu", {
                        ENTER: "open",
                        SPACE: "open",
                        ARROW_RIGHT: "next",
                        ARROW_UP: "up",
                        ARROW_DOWN: "down",
                        ARROW_LEFT: "previous",
                        ESCAPE: "close"
                    });
                }
            }, {
                key: "_init",
                value: function() {
                    C(this.$element, "dropdown");
                    var e = this.$element.find("li.is-dropdown-submenu-parent");
                    this.$element.children(".is-dropdown-submenu-parent").children(".is-dropdown-submenu").addClass("first-sub"), this.$menuItems = this.$element.find('li[role="none"]'), this.$tabs = this.$element.children('li[role="none"]'), this.$tabs.find("ul.is-dropdown-submenu").addClass(this.options.verticalClass), "auto" === this.options.alignment ? this.$element.hasClass(this.options.rightClass) || i() || this.$element.parents(".top-bar-right").is("*") ? (this.options.alignment = "right", e.addClass("opens-left")) : (this.options.alignment = "left", e.addClass("opens-right")) : "right" === this.options.alignment ? e.addClass("opens-left") : e.addClass("opens-right"), this.changed = !1, this._events();
                }
            }, {
                key: "_isVertical",
                value: function() {
                    return "block" === this.$tabs.css("display") || "column" === this.$element.css("flex-direction");
                }
            }, {
                key: "_isRtl",
                value: function() {
                    return this.$element.hasClass("align-right") || i() && !this.$element.hasClass("align-left");
                }
            }, {
                key: "_events",
                value: function() {
                    var e = this,
                        n = "ontouchstart" in window || void 0 !== window.ontouchstart,
                        i = "is-dropdown-submenu-parent";
                    (this.options.clickOpen || n) && this.$menuItems.on("click.zf.dropdownMenu touchstart.zf.dropdownMenu", (function(o) {
                        var r = t()(o.target).parentsUntil("ul", ".".concat(i)),
                            a = r.hasClass(i),
                            s = "true" === r.attr("data-is-click"),
                            c = r.children(".is-dropdown-submenu");
                        if (a)
                            if (s) {
                                if (!e.options.closeOnClick || !e.options.clickOpen && !n || e.options.forceFollow && n) return;
                                o.stopImmediatePropagation(), o.preventDefault(), e._hide(r);
                            } else o.stopImmediatePropagation(), o.preventDefault(), e._show(c), r.add(r.parentsUntil(e.$element, ".".concat(i))).attr("data-is-click", !0);
                    })), e.options.closeOnClickInside && this.$menuItems.on("click.zf.dropdownMenu", (function() {
                        t()(this).hasClass(i) || e._hide();
                    })), n && this.options.disableHoverOnTouch && (this.options.disableHover = !0), this.options.disableHover || this.$menuItems.on("mouseenter.zf.dropdownMenu", (function() {
                        var n = t()(this);
                        n.hasClass(i) && (clearTimeout(n.data("_delay")), n.data("_delay", setTimeout((function() {
                            e._show(n.children(".is-dropdown-submenu"));
                        }), e.options.hoverDelay)));
                    })).on("mouseleave.zf.dropdownMenu", function(e) {
                        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            i = n.ignoreLeaveWindow,
                            o = void 0 !== i && i,
                            r = n.ignoreReappear,
                            a = void 0 !== r && r;
                        return function(n) {
                            for (var i = arguments.length, r = new Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++) r[s - 1] = arguments[s];
                            var c = e.bind.apply(e, [this, n].concat(r));
                            if (null !== n.relatedTarget) return c();
                            setTimeout((function() {
                                if (!o && document.hasFocus && !document.hasFocus()) return c();
                                a || t()(document).one("mouseenter", (function(e) {
                                    t()(n.currentTarget).has(e.target).length || (n.relatedTarget = e.target, c());
                                }));
                            }), 0);
                        };
                    }((function() {
                        var n = t()(this);
                        if (n.hasClass(i) && e.options.autoclose) {
                            if ("true" === n.attr("data-is-click") && e.options.clickOpen) return !1;
                            clearTimeout(n.data("_delay")), n.data("_delay", setTimeout((function() {
                                e._hide(n);
                            }), e.options.closingTime));
                        }
                    }))), this.$menuItems.on("keydown.zf.dropdownMenu", (function(n) {
                        var i, o, r = t()(n.target).parentsUntil("ul", '[role="none"]'),
                            a = e.$tabs.index(r) > -1,
                            s = a ? e.$tabs : r.siblings("li").add(r);
                        s.each((function(e) {
                            if (t()(this).is(r)) return i = s.eq(e - 1), void(o = s.eq(e + 1));
                        }));
                        var c = function() {
                                o.children("a:first").focus(), n.preventDefault();
                            },
                            l = function() {
                                i.children("a:first").focus(), n.preventDefault();
                            },
                            u = function() {
                                var t = r.children("ul.is-dropdown-submenu");
                                t.length && (e._show(t), r.find("li > a:first").focus(), n.preventDefault());
                            },
                            d = function() {
                                var t = r.parent("ul").parent("li");
                                t.children("a:first").focus(), e._hide(t), n.preventDefault();
                            },
                            f = {
                                open: u,
                                close: function() {
                                    e._hide(e.$element), e.$menuItems.eq(0).children("a").focus(), n.preventDefault();
                                }
                            };
                        a ? e._isVertical() ? e._isRtl() ? t().extend(f, {
                            down: c,
                            up: l,
                            next: d,
                            previous: u
                        }) : t().extend(f, {
                            down: c,
                            up: l,
                            next: u,
                            previous: d
                        }) : e._isRtl() ? t().extend(f, {
                            next: l,
                            previous: c,
                            down: u,
                            up: d
                        }) : t().extend(f, {
                            next: c,
                            previous: l,
                            down: u,
                            up: d
                        }) : e._isRtl() ? t().extend(f, {
                            next: d,
                            previous: u,
                            down: c,
                            up: l
                        }) : t().extend(f, {
                            next: u,
                            previous: d,
                            down: c,
                            up: l
                        }), x.handleKey(n, "DropdownMenu", f);
                    }));
                }
            }, {
                key: "_addBodyHandler",
                value: function() {
                    var e = this,
                        n = t()(document.body);
                    this._removeBodyHandler(), n.on("click.zf.dropdownMenu tap.zf.dropdownMenu", (function(n) {
                        t()(n.target).closest(e.$element).length || (e._hide(), e._removeBodyHandler());
                    }));
                }
            }, {
                key: "_removeBodyHandler",
                value: function() {
                    t()(document.body).off("click.zf.dropdownMenu tap.zf.dropdownMenu");
                }
            }, {
                key: "_show",
                value: function(e) {
                    var n = this.$tabs.index(this.$tabs.filter((function(n, i) {
                            return t()(i).find(e).length > 0;
                        }))),
                        i = e.parent("li.is-dropdown-submenu-parent").siblings("li.is-dropdown-submenu-parent");
                    this._hide(i, n), e.css("visibility", "hidden").addClass("js-dropdown-active").parent("li.is-dropdown-submenu-parent").addClass("is-active");
                    var o = T.ImNotTouchingYou(e, null, !0);
                    if (!o) {
                        var r = "left" === this.options.alignment ? "-right" : "-left",
                            a = e.parent(".is-dropdown-submenu-parent");
                        a.removeClass("opens".concat(r)).addClass("opens-".concat(this.options.alignment)), (o = T.ImNotTouchingYou(e, null, !0)) || a.removeClass("opens-".concat(this.options.alignment)).addClass("opens-inner"), this.changed = !0;
                    }
                    e.css("visibility", ""), this.options.closeOnClick && this._addBodyHandler(), this.$element.trigger("show.zf.dropdownMenu", [e]);
                }
            }, {
                key: "_hide",
                value: function(e, t) {
                    var n;
                    if ((n = e && e.length ? e : void 0 !== t ? this.$tabs.not((function(e) {
                            return e === t;
                        })) : this.$element).hasClass("is-active") || n.find(".is-active").length > 0) {
                        var i = n.find("li.is-active");
                        if (i.add(n).attr({
                                "data-is-click": !1
                            }).removeClass("is-active"), n.find("ul.js-dropdown-active").removeClass("js-dropdown-active"), this.changed || n.find("opens-inner").length) {
                            var o = "left" === this.options.alignment ? "right" : "left";
                            n.find("li.is-dropdown-submenu-parent").add(n).removeClass("opens-inner opens-".concat(this.options.alignment)).addClass("opens-".concat(o)), this.changed = !1;
                        }
                        clearTimeout(i.data("_delay")), this._removeBodyHandler(), this.$element.trigger("hide.zf.dropdownMenu", [n]);
                    }
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.$menuItems.off(".zf.dropdownMenu").removeAttr("data-is-click").removeClass("is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner"), t()(document.body).off(".zf.dropdownMenu"), _(this.$element, "dropdown");
                }
            }], r && function(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, W(i.key), i);
                }
            }(o.prototype, r), Object.defineProperty(o, "prototype", {
                writable: !1
            }), o;
            var o, r;
        }(g);

        function K(e) {
            return K = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            }, K(e);
        }

        function G(e) {
            var t = function(e) {
                if ("object" != K(e) || !e) return e;
                var t = e[Symbol.toPrimitive];
                if (void 0 !== t) {
                    var n = t.call(e, "string");
                    if ("object" != K(n)) return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(e);
            }(e);
            return "symbol" == K(t) ? t : t + "";
        }

        function X() {
            try {
                var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
            } catch (e) {}
            return (X = function() {
                return !!e;
            })();
        }

        function J(e) {
            return J = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            }, J(e);
        }

        function Q(e, t) {
            return Q = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                return e.__proto__ = t, e;
            }, Q(e, t);
        }
        Y.defaults = {
            disableHover: !1,
            disableHoverOnTouch: !0,
            autoclose: !0,
            hoverDelay: 50,
            clickOpen: !1,
            closingTime: 500,
            alignment: "auto",
            closeOnClick: !0,
            closeOnClickInside: !0,
            verticalClass: "vertical",
            rightClass: "align-right",
            forceFollow: !0
        };
        var Z = function(e) {
            function n() {
                return function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                    }(this, n),
                    function(e, t, n) {
                        return t = J(t),
                            function(e, t) {
                                if (t && ("object" == K(t) || "function" == typeof t)) return t;
                                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                                return function(e) {
                                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                    return e;
                                }(e);
                            }(e, X() ? Reflect.construct(t, n || [], J(e).constructor) : t.apply(e, n));
                    }(this, n, arguments);
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && Q(e, t);
            }(n, e), i = n, a = [{
                key: "_setup",
                value: function(e, i) {
                    this.$element = e, this.options = t().extend({}, n.defaults, this.$element.data(), i), this.className = "Drilldown", this._init(), x.register("Drilldown", {
                        ENTER: "open",
                        SPACE: "open",
                        ARROW_RIGHT: "next",
                        ARROW_UP: "up",
                        ARROW_DOWN: "down",
                        ARROW_LEFT: "previous",
                        ESCAPE: "close"
                    });
                }
            }, {
                key: "_init",
                value: function() {
                    C(this.$element, "drilldown"), this.options.autoApplyClass && this.$element.addClass("drilldown"), this.$element.attr({
                        "aria-multiselectable": !1
                    }), this.$submenuAnchors = this.$element.find("li.is-drilldown-submenu-parent").children("a"), this.$submenus = this.$submenuAnchors.parent("li").children("[data-submenu]").attr("role", "group"), this.$menuItems = this.$element.find("li").not(".js-drilldown-back").find("a"), this.$currentMenu = this.$element, this.$element.attr("data-mutate", this.$element.attr("data-drilldown") || o(6, "drilldown")), this._prepareMenu(), this._registerEvents(), this._keyboardEvents();
                }
            }, {
                key: "_prepareMenu",
                value: function() {
                    var e = this;
                    this.$submenuAnchors.each((function() {
                        var n = t()(this),
                            i = n.parent();
                        e.options.parentLink && n.clone().prependTo(i.children("[data-submenu]")).wrap('<li data-is-parent-link class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="none"></li>'), n.data("savedHref", n.attr("href")).removeAttr("href").attr("tabindex", 0), n.children("[data-submenu]").attr({
                            "aria-hidden": !0,
                            tabindex: 0,
                            role: "group"
                        }), e._events(n);
                    })), this.$submenus.each((function() {
                        var n = t()(this);
                        if (!n.find(".js-drilldown-back").length) switch (e.options.backButtonPosition) {
                            case "bottom":
                                n.append(e.options.backButton);
                                break;
                            case "top":
                                n.prepend(e.options.backButton);
                                break;
                            default:
                                console.error("Unsupported backButtonPosition value '" + e.options.backButtonPosition + "'");
                        }
                        e._back(n);
                    })), this.$submenus.addClass("invisible"), this.options.autoHeight || this.$submenus.addClass("drilldown-submenu-cover-previous"), this.$element.parent().hasClass("is-drilldown") || (this.$wrapper = t()(this.options.wrapper).addClass("is-drilldown"), this.options.animateHeight && this.$wrapper.addClass("animate-height"), this.$element.wrap(this.$wrapper)), this.$wrapper = this.$element.parent(), this.$wrapper.css(this._getMaxDims());
                }
            }, {
                key: "_resize",
                value: function() {
                    this.$wrapper.css({
                        "max-width": "none",
                        "min-height": "none"
                    }), this.$wrapper.css(this._getMaxDims());
                }
            }, {
                key: "_events",
                value: function(e) {
                    var n = this;
                    e.off("click.zf.drilldown").on("click.zf.drilldown", (function(i) {
                        if (t()(i.target).parentsUntil("ul", "li").hasClass("is-drilldown-submenu-parent") && i.preventDefault(), n._show(e.parent("li")), n.options.closeOnClick) {
                            var o = t()("body");
                            o.off(".zf.drilldown").on("click.zf.drilldown", (function(e) {
                                e.target === n.$element[0] || t().contains(n.$element[0], e.target) || (e.preventDefault(), n._hideAll(), o.off(".zf.drilldown"));
                            }));
                        }
                    }));
                }
            }, {
                key: "_registerEvents",
                value: function() {
                    this.options.scrollTop && (this._bindHandler = this._scrollTop.bind(this), this.$element.on("open.zf.drilldown hide.zf.drilldown close.zf.drilldown closed.zf.drilldown", this._bindHandler)), this.$element.on("mutateme.zf.trigger", this._resize.bind(this));
                }
            }, {
                key: "_scrollTop",
                value: function() {
                    var e = this,
                        n = "" !== e.options.scrollTopElement ? t()(e.options.scrollTopElement) : e.$element,
                        i = parseInt(n.offset().top + e.options.scrollTopOffset, 10);
                    t()("html, body").stop(!0).animate({
                        scrollTop: i
                    }, e.options.animationDuration, e.options.animationEasing, (function() {
                        this === t()("html")[0] && e.$element.trigger("scrollme.zf.drilldown");
                    }));
                }
            }, {
                key: "_keyboardEvents",
                value: function() {
                    var e = this;
                    this.$menuItems.add(this.$element.find(".js-drilldown-back > a, .is-submenu-parent-item > a")).on("keydown.zf.drilldown", (function(n) {
                        var i, o, a = t()(this),
                            s = a.parent("li").parent("ul").children("li").children("a");
                        s.each((function(e) {
                            if (t()(this).is(a)) return i = s.eq(Math.max(0, e - 1)), void(o = s.eq(Math.min(e + 1, s.length - 1)));
                        })), x.handleKey(n, "Drilldown", {
                            next: function() {
                                if (a.is(e.$submenuAnchors)) return e._show(a.parent("li")), a.parent("li").one(r(a), (function() {
                                    a.parent("li").find("ul li a").not(".js-drilldown-back a").first().focus();
                                })), !0;
                            },
                            previous: function() {
                                return e._hide(a.parent("li").parent("ul")), a.parent("li").parent("ul").one(r(a), (function() {
                                    setTimeout((function() {
                                        a.parent("li").parent("ul").parent("li").children("a").first().focus();
                                    }), 1);
                                })), !0;
                            },
                            up: function() {
                                return i.focus(), !a.is(e.$element.find("> li:first-child > a"));
                            },
                            down: function() {
                                return o.focus(), !a.is(e.$element.find("> li:last-child > a"));
                            },
                            close: function() {
                                a.is(e.$element.find("> li > a")) || (e._hide(a.parent().parent()), a.parent().parent().siblings("a").focus());
                            },
                            open: function() {
                                return (!e.options.parentLink || !a.attr("href")) && (a.is(e.$menuItems) ? a.is(e.$submenuAnchors) ? (e._show(a.parent("li")), a.parent("li").one(r(a), (function() {
                                    a.parent("li").find("ul li a").not(".js-drilldown-back a").first().focus();
                                })), !0) : void 0 : (e._hide(a.parent("li").parent("ul")), a.parent("li").parent("ul").one(r(a), (function() {
                                    setTimeout((function() {
                                        a.parent("li").parent("ul").parent("li").children("a").first().focus();
                                    }), 1);
                                })), !0));
                            },
                            handled: function(e) {
                                e && n.preventDefault();
                            }
                        });
                    }));
                }
            }, {
                key: "_hideAll",
                value: function() {
                    var e = this,
                        t = this.$element.find(".is-drilldown-submenu.is-active");
                    if (t.addClass("is-closing"), t.parent().closest("ul").removeClass("invisible"), this.options.autoHeight) {
                        var n = t.parent().closest("ul").data("calcHeight");
                        this.$wrapper.css({
                            height: n
                        });
                    }
                    this.$element.trigger("close.zf.drilldown"), t.one(r(t), (function() {
                        t.removeClass("is-active is-closing"), e.$element.trigger("closed.zf.drilldown");
                    }));
                }
            }, {
                key: "_back",
                value: function(e) {
                    var t = this;
                    e.off("click.zf.drilldown"), e.children(".js-drilldown-back").on("click.zf.drilldown", (function() {
                        t._hide(e);
                        var n = e.parent("li").parent("ul").parent("li");
                        n.length ? t._show(n) : t.$currentMenu = t.$element;
                    }));
                }
            }, {
                key: "_menuLinkEvents",
                value: function() {
                    var e = this;
                    this.$menuItems.not(".is-drilldown-submenu-parent").off("click.zf.drilldown").on("click.zf.drilldown", (function() {
                        setTimeout((function() {
                            e._hideAll();
                        }), 0);
                    }));
                }
            }, {
                key: "_setShowSubMenuClasses",
                value: function(e, t) {
                    e.addClass("is-active").removeClass("invisible").attr("aria-hidden", !1), e.parent("li").attr("aria-expanded", !0), !0 === t && this.$element.trigger("open.zf.drilldown", [e]);
                }
            }, {
                key: "_setHideSubMenuClasses",
                value: function(e, t) {
                    e.removeClass("is-active").addClass("invisible").attr("aria-hidden", !0), e.parent("li").attr("aria-expanded", !1), !0 === t && e.trigger("hide.zf.drilldown", [e]);
                }
            }, {
                key: "_showMenu",
                value: function(e, n) {
                    var i = this;
                    if (this.$element.find('li[aria-expanded="true"] > ul[data-submenu]').each((function() {
                            i._setHideSubMenuClasses(t()(this));
                        })), this.$currentMenu = e, e.is("[data-drilldown]")) return !0 === n && e.find("li > a").first().focus(), void(this.options.autoHeight && this.$wrapper.css("height", e.data("calcHeight")));
                    var o = e.children().first().parentsUntil("[data-drilldown]", "[data-submenu]");
                    o.each((function(a) {
                        0 === a && i.options.autoHeight && i.$wrapper.css("height", t()(this).data("calcHeight"));
                        var s = a === o.length - 1;
                        !0 === s && t()(this).one(r(t()(this)), (function() {
                            !0 === n && e.find("li > a").first().focus();
                        })), i._setShowSubMenuClasses(t()(this), s);
                    }));
                }
            }, {
                key: "_show",
                value: function(e) {
                    var t = e.children("[data-submenu]");
                    e.attr("aria-expanded", !0), this.$currentMenu = t, e.parent().closest("ul").addClass("invisible"), t.addClass("is-active visible").removeClass("invisible").attr("aria-hidden", !1), this.options.autoHeight && this.$wrapper.css({
                        height: t.data("calcHeight")
                    }), this.$element.trigger("open.zf.drilldown", [e]);
                }
            }, {
                key: "_hide",
                value: function(e) {
                    this.options.autoHeight && this.$wrapper.css({
                        height: e.parent().closest("ul").data("calcHeight")
                    }), e.parent().closest("ul").removeClass("invisible"), e.parent("li").attr("aria-expanded", !1), e.attr("aria-hidden", !0), e.addClass("is-closing").one(r(e), (function() {
                        e.removeClass("is-active is-closing visible"), e.blur().addClass("invisible");
                    })), e.trigger("hide.zf.drilldown", [e]);
                }
            }, {
                key: "_getMaxDims",
                value: function() {
                    var e = 0,
                        n = {},
                        i = this;
                    return this.$submenus.add(this.$element).each((function() {
                        var n = T.GetDimensions(this).height;
                        e = n > e ? n : e, i.options.autoHeight && t()(this).data("calcHeight", n);
                    })), this.options.autoHeight ? n.height = this.$currentMenu.data("calcHeight") : n["min-height"] = "".concat(e, "px"), n["max-width"] = "".concat(this.$element[0].getBoundingClientRect().width, "px"), n;
                }
            }, {
                key: "_destroy",
                value: function() {
                    t()("body").off(".zf.drilldown"), this.options.scrollTop && this.$element.off(".zf.drilldown", this._bindHandler), this._hideAll(), this.$element.off("mutateme.zf.trigger"), _(this.$element, "drilldown"), this.$element.unwrap().find(".js-drilldown-back, .is-submenu-parent-item").remove().end().find(".is-active, .is-closing, .is-drilldown-submenu").removeClass("is-active is-closing is-drilldown-submenu").off("transitionend otransitionend webkitTransitionEnd").end().find("[data-submenu]").removeAttr("aria-hidden tabindex role"), this.$submenuAnchors.each((function() {
                        t()(this).off(".zf.drilldown");
                    })), this.$element.find("[data-is-parent-link]").detach(), this.$submenus.removeClass("drilldown-submenu-cover-previous invisible"), this.$element.find("a").each((function() {
                        var e = t()(this);
                        e.removeAttr("tabindex"), e.data("savedHref") && e.attr("href", e.data("savedHref")).removeData("savedHref");
                    }));
                }
            }], a && function(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, G(i.key), i);
                }
            }(i.prototype, a), Object.defineProperty(i, "prototype", {
                writable: !1
            }), i;
            var i, a;
        }(g);

        function ee(e) {
            return ee = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            }, ee(e);
        }

        function te(e) {
            var t = function(e) {
                if ("object" != ee(e) || !e) return e;
                var t = e[Symbol.toPrimitive];
                if (void 0 !== t) {
                    var n = t.call(e, "string");
                    if ("object" != ee(n)) return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(e);
            }(e);
            return "symbol" == ee(t) ? t : t + "";
        }

        function ne() {
            try {
                var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
            } catch (e) {}
            return (ne = function() {
                return !!e;
            })();
        }

        function ie(e) {
            return ie = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            }, ie(e);
        }

        function oe(e, t) {
            return oe = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                return e.__proto__ = t, e;
            }, oe(e, t);
        }
        Z.defaults = {
            autoApplyClass: !0,
            backButton: '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>',
            backButtonPosition: "top",
            wrapper: "<div></div>",
            parentLink: !1,
            closeOnClick: !1,
            autoHeight: !1,
            animateHeight: !1,
            scrollTop: !1,
            scrollTopElement: "",
            scrollTopOffset: 0,
            animationDuration: 500,
            animationEasing: "swing"
        };
        var re = function(e) {
            function n() {
                return function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                    }(this, n),
                    function(e, t, n) {
                        return t = ie(t),
                            function(e, t) {
                                if (t && ("object" == ee(t) || "function" == typeof t)) return t;
                                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                                return function(e) {
                                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                    return e;
                                }(e);
                            }(e, ne() ? Reflect.construct(t, n || [], ie(e).constructor) : t.apply(e, n));
                    }(this, n, arguments);
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && oe(e, t);
            }(n, e), i = n, r = [{
                key: "_setup",
                value: function(e, i) {
                    this.$element = e, this.options = t().extend({}, n.defaults, this.$element.data(), i), this.className = "AccordionMenu", this._init(), x.register("AccordionMenu", {
                        ENTER: "toggle",
                        SPACE: "toggle",
                        ARROW_RIGHT: "open",
                        ARROW_UP: "up",
                        ARROW_DOWN: "down",
                        ARROW_LEFT: "close",
                        ESCAPE: "closeAll"
                    });
                }
            }, {
                key: "_init",
                value: function() {
                    C(this.$element, "accordion");
                    var e = this;
                    this.$element.find("[data-submenu]").not(".is-active").slideUp(0), this.$element.attr({
                        "aria-multiselectable": this.options.multiOpen
                    }), this.$menuLinks = this.$element.find(".is-accordion-submenu-parent"), this.$menuLinks.each((function() {
                        var n = this.id || o(6, "acc-menu-link"),
                            i = t()(this),
                            r = i.children("[data-submenu]"),
                            a = r[0].id || o(6, "acc-menu"),
                            s = r.hasClass("is-active");
                        e.options.parentLink && i.children("a").clone().prependTo(r).wrap('<li data-is-parent-link class="is-submenu-parent-item is-submenu-item is-accordion-submenu-item"></li>'), e.options.submenuToggle ? (i.addClass("has-submenu-toggle"), i.children("a").after('<button id="' + n + '" class="submenu-toggle" aria-controls="' + a + '" aria-expanded="' + s + '" title="' + e.options.submenuToggleText + '"><span class="submenu-toggle-text">' + e.options.submenuToggleText + "</span></button>")) : i.attr({
                            "aria-controls": a,
                            "aria-expanded": s,
                            id: n
                        }), r.attr({
                            "aria-labelledby": n,
                            "aria-hidden": !s,
                            role: "group",
                            id: a
                        });
                    }));
                    var n = this.$element.find(".is-active");
                    n.length && n.each((function() {
                        e.down(t()(this));
                    })), this._events();
                }
            }, {
                key: "_events",
                value: function() {
                    var e = this;
                    this.$element.find("li").each((function() {
                        var n = t()(this).children("[data-submenu]");
                        n.length && (e.options.submenuToggle ? t()(this).children(".submenu-toggle").off("click.zf.accordionMenu").on("click.zf.accordionMenu", (function() {
                            e.toggle(n);
                        })) : t()(this).children("a").off("click.zf.accordionMenu").on("click.zf.accordionMenu", (function(t) {
                            t.preventDefault(), e.toggle(n);
                        })));
                    })).on("keydown.zf.accordionMenu", (function(n) {
                        var i, o, r = t()(this),
                            a = r.parent("ul").children("li"),
                            s = r.children("[data-submenu]");
                        a.each((function(e) {
                            if (t()(this).is(r)) return i = a.eq(Math.max(0, e - 1)).find("a").first(), o = a.eq(Math.min(e + 1, a.length - 1)).find("a").first(), t()(this).children("[data-submenu]:visible").length && (o = r.find("li:first-child").find("a").first()), t()(this).is(":first-child") ? i = r.parents("li").first().find("a").first() : i.parents("li").first().children("[data-submenu]:visible").length && (i = i.parents("li").find("li:last-child").find("a").first()), void(t()(this).is(":last-child") && (o = r.parents("li").first().next("li").find("a").first()));
                        })), x.handleKey(n, "AccordionMenu", {
                            open: function() {
                                s.is(":hidden") && (e.down(s), s.find("li").first().find("a").first().focus());
                            },
                            close: function() {
                                s.length && !s.is(":hidden") ? e.up(s) : r.parent("[data-submenu]").length && (e.up(r.parent("[data-submenu]")), r.parents("li").first().find("a").first().focus());
                            },
                            up: function() {
                                return i.focus(), !0;
                            },
                            down: function() {
                                return o.focus(), !0;
                            },
                            toggle: function() {
                                return !e.options.submenuToggle && (r.children("[data-submenu]").length ? (e.toggle(r.children("[data-submenu]")), !0) : void 0);
                            },
                            closeAll: function() {
                                e.hideAll();
                            },
                            handled: function(e) {
                                e && n.preventDefault();
                            }
                        });
                    }));
                }
            }, {
                key: "hideAll",
                value: function() {
                    this.up(this.$element.find("[data-submenu]"));
                }
            }, {
                key: "showAll",
                value: function() {
                    this.down(this.$element.find("[data-submenu]"));
                }
            }, {
                key: "toggle",
                value: function(e) {
                    e.is(":animated") || (e.is(":hidden") ? this.down(e) : this.up(e));
                }
            }, {
                key: "down",
                value: function(e) {
                    var t = this;
                    if (!this.options.multiOpen) {
                        var n = e.parentsUntil(this.$element).add(e).add(e.find(".is-active")),
                            i = this.$element.find(".is-active").not(n);
                        this.up(i);
                    }
                    e.addClass("is-active").attr({
                        "aria-hidden": !1
                    }), this.options.submenuToggle ? e.prev(".submenu-toggle").attr({
                        "aria-expanded": !0
                    }) : e.parent(".is-accordion-submenu-parent").attr({
                        "aria-expanded": !0
                    }), e.slideDown(this.options.slideSpeed, (function() {
                        t.$element.trigger("down.zf.accordionMenu", [e]);
                    }));
                }
            }, {
                key: "up",
                value: function(e) {
                    var t = this,
                        n = e.find("[data-submenu]"),
                        i = e.add(n);
                    n.slideUp(0), i.removeClass("is-active").attr("aria-hidden", !0), this.options.submenuToggle ? i.prev(".submenu-toggle").attr("aria-expanded", !1) : i.parent(".is-accordion-submenu-parent").attr("aria-expanded", !1), e.slideUp(this.options.slideSpeed, (function() {
                        t.$element.trigger("up.zf.accordionMenu", [e]);
                    }));
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.$element.find("[data-submenu]").slideDown(0).css("display", ""), this.$element.find("a").off("click.zf.accordionMenu"), this.$element.find("[data-is-parent-link]").detach(), this.options.submenuToggle && (this.$element.find(".has-submenu-toggle").removeClass("has-submenu-toggle"), this.$element.find(".submenu-toggle").remove()), _(this.$element, "accordion");
                }
            }], r && function(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, te(i.key), i);
                }
            }(i.prototype, r), Object.defineProperty(i, "prototype", {
                writable: !1
            }), i;
            var i, r;
        }(g);

        function ae(e) {
            return ae = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            }, ae(e);
        }

        function se(e) {
            var t = function(e) {
                if ("object" != ae(e) || !e) return e;
                var t = e[Symbol.toPrimitive];
                if (void 0 !== t) {
                    var n = t.call(e, "string");
                    if ("object" != ae(n)) return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(e);
            }(e);
            return "symbol" == ae(t) ? t : t + "";
        }

        function ce() {
            try {
                var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
            } catch (e) {}
            return (ce = function() {
                return !!e;
            })();
        }

        function le(e) {
            return le = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            }, le(e);
        }

        function ue(e, t) {
            return ue = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                return e.__proto__ = t, e;
            }, ue(e, t);
        }
        re.defaults = {
            parentLink: !1,
            slideSpeed: 250,
            submenuToggle: !1,
            submenuToggleText: "Toggle menu",
            multiOpen: !0
        };
        var de = {
                dropdown: {
                    cssClass: "dropdown",
                    plugin: Y
                },
                drilldown: {
                    cssClass: "drilldown",
                    plugin: Z
                },
                accordion: {
                    cssClass: "accordion-menu",
                    plugin: re
                }
            },
            fe = function(e) {
                function n() {
                    return function(e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                        }(this, n),
                        function(e, t, n) {
                            return t = le(t),
                                function(e, t) {
                                    if (t && ("object" == ae(t) || "function" == typeof t)) return t;
                                    if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                                    return function(e) {
                                        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                        return e;
                                    }(e);
                                }(e, ce() ? Reflect.construct(t, n || [], le(e).constructor) : t.apply(e, n));
                        }(this, n, arguments);
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }), Object.defineProperty(e, "prototype", {
                        writable: !1
                    }), t && ue(e, t);
                }(n, e), i = n, (r = [{
                    key: "_setup",
                    value: function(e) {
                        this.$element = t()(e), this.rules = this.$element.data("responsive-menu"), this.currentMq = null, this.currentPlugin = null, this.className = "ResponsiveMenu", this._init(), this._events();
                    }
                }, {
                    key: "_init",
                    value: function() {
                        if (l._init(), "string" == typeof this.rules) {
                            for (var e = {}, n = this.rules.split(" "), i = 0; i < n.length; i++) {
                                var r = n[i].split("-"),
                                    a = r.length > 1 ? r[0] : "small",
                                    s = r.length > 1 ? r[1] : r[0];
                                null !== de[s] && (e[a] = de[s]);
                            }
                            this.rules = e;
                        }
                        t().isEmptyObject(this.rules) || this._checkMediaQueries(), this.$element.attr("data-mutate", this.$element.attr("data-mutate") || o(6, "responsive-menu"));
                    }
                }, {
                    key: "_events",
                    value: function() {
                        var e = this;
                        t()(window).on("changed.zf.mediaquery", (function() {
                            e._checkMediaQueries();
                        }));
                    }
                }, {
                    key: "_checkMediaQueries",
                    value: function() {
                        var e, n = this;
                        t().each(this.rules, (function(t) {
                            l.atLeast(t) && (e = t);
                        })), e && (this.currentPlugin instanceof this.rules[e].plugin || (t().each(de, (function(e, t) {
                            n.$element.removeClass(t.cssClass);
                        })), this.$element.addClass(this.rules[e].cssClass), this.currentPlugin && this.currentPlugin.destroy(), this.currentPlugin = new this.rules[e].plugin(this.$element, {})));
                    }
                }, {
                    key: "_destroy",
                    value: function() {
                        this.currentPlugin.destroy(), t()(window).off(".zf.ResponsiveMenu");
                    }
                }]) && function(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, se(i.key), i);
                    }
                }(i.prototype, r), Object.defineProperty(i, "prototype", {
                    writable: !1
                }), i;
                var i, r;
            }(g);
        fe.defaults = {};
        var pe = ["mui-enter", "mui-leave"],
            he = ["mui-enter-active", "mui-leave-active"];

        function me(e) {
            return me = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            }, me(e);
        }
        var ge = function() {
                for (var e = ["WebKit", "Moz", "O", "Ms", ""], t = 0; t < e.length; t++)
                    if ("".concat(e[t], "MutationObserver") in window) return window["".concat(e[t], "MutationObserver")];
                return !1;
            }(),
            ve = function(e, n) {
                e.data(n).split(" ").forEach((function(i) {
                    t()("#".concat(i))["close" === n ? "trigger" : "triggerHandler"]("".concat(n, ".zf.trigger"), [e]);
                }));
            },
            be = {
                Listeners: {
                    Basic: {},
                    Global: {}
                },
                Initializers: {}
            };

        function ye(e, n, i) {
            var o, r = Array.prototype.slice.call(arguments, 3);
            t()(window).on(n, (function() {
                o && clearTimeout(o), o = setTimeout((function() {
                    i.apply(null, r);
                }), e || 10);
            }));
        }

        function we(e) {
            return we = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            }, we(e);
        }

        function ke(e) {
            var t = function(e) {
                if ("object" != we(e) || !e) return e;
                var t = e[Symbol.toPrimitive];
                if (void 0 !== t) {
                    var n = t.call(e, "string");
                    if ("object" != we(n)) return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(e);
            }(e);
            return "symbol" == we(t) ? t : t + "";
        }

        function xe() {
            try {
                var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
            } catch (e) {}
            return (xe = function() {
                return !!e;
            })();
        }

        function Ce(e) {
            return Ce = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            }, Ce(e);
        }

        function _e(e, t) {
            return _e = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                return e.__proto__ = t, e;
            }, _e(e, t);
        }
        be.Listeners.Basic = {
            openListener: function() {
                ve(t()(this), "open");
            },
            closeListener: function() {
                t()(this).data("close") ? ve(t()(this), "close") : t()(this).trigger("close.zf.trigger");
            },
            toggleListener: function() {
                t()(this).data("toggle") ? ve(t()(this), "toggle") : t()(this).trigger("toggle.zf.trigger");
            },
            closeableListener: function(e) {
                var n = t()(this).data("closable");
                e.stopPropagation(), "" !== n ? function(e, n, i) {
                    ! function(e, n, i, o) {
                        if ((n = t()(n).eq(0)).length) {
                            var a = pe[1],
                                s = he[1];
                            c(), n.addClass(i).css("transition", "none"), requestAnimationFrame((function() {
                                n.addClass(a);
                            })), requestAnimationFrame((function() {
                                n[0].offsetWidth, n.css("transition", "").addClass(s);
                            })), n.one(r(n), (function() {
                                n.hide(), c(), o && o.apply(n);
                            }));
                        }

                        function c() {
                            n[0].style.transitionDuration = 0, n.removeClass("".concat(a, " ").concat(s, " ").concat(i));
                        }
                    }(0, e, n, i);
                }(t()(this), n, (function() {
                    t()(this).trigger("closed.zf");
                })) : t()(this).fadeOut().trigger("closed.zf");
            },
            toggleFocusListener: function() {
                var e = t()(this).data("toggle-focus");
                t()("#".concat(e)).triggerHandler("toggle.zf.trigger", [t()(this)]);
            }
        }, be.Initializers.addOpenListener = function(e) {
            e.off("click.zf.trigger", be.Listeners.Basic.openListener), e.on("click.zf.trigger", "[data-open]", be.Listeners.Basic.openListener);
        }, be.Initializers.addCloseListener = function(e) {
            e.off("click.zf.trigger", be.Listeners.Basic.closeListener), e.on("click.zf.trigger", "[data-close]", be.Listeners.Basic.closeListener);
        }, be.Initializers.addToggleListener = function(e) {
            e.off("click.zf.trigger", be.Listeners.Basic.toggleListener), e.on("click.zf.trigger", "[data-toggle]", be.Listeners.Basic.toggleListener);
        }, be.Initializers.addCloseableListener = function(e) {
            e.off("close.zf.trigger", be.Listeners.Basic.closeableListener), e.on("close.zf.trigger", "[data-closeable], [data-closable]", be.Listeners.Basic.closeableListener);
        }, be.Initializers.addToggleFocusListener = function(e) {
            e.off("focus.zf.trigger blur.zf.trigger", be.Listeners.Basic.toggleFocusListener), e.on("focus.zf.trigger blur.zf.trigger", "[data-toggle-focus]", be.Listeners.Basic.toggleFocusListener);
        }, be.Listeners.Global = {
            resizeListener: function(e) {
                ge || e.each((function() {
                    t()(this).triggerHandler("resizeme.zf.trigger");
                })), e.attr("data-events", "resize");
            },
            scrollListener: function(e) {
                ge || e.each((function() {
                    t()(this).triggerHandler("scrollme.zf.trigger");
                })), e.attr("data-events", "scroll");
            },
            closeMeListener: function(e, n) {
                var i = e.namespace.split(".")[0];
                t()("[data-".concat(i, "]")).not('[data-yeti-box="'.concat(n, '"]')).each((function() {
                    var e = t()(this);
                    e.triggerHandler("close.zf.trigger", [e]);
                }));
            }
        }, be.Initializers.addClosemeListener = function(e) {
            var n = t()("[data-yeti-box]"),
                i = ["dropdown", "tooltip", "reveal"];
            if (e && ("string" == typeof e ? i.push(e) : "object" === me(e) && "string" == typeof e[0] ? i = i.concat(e) : console.error("Plugin names must be strings")), n.length) {
                var o = i.map((function(e) {
                    return "closeme.zf.".concat(e);
                })).join(" ");
                t()(window).off(o).on(o, be.Listeners.Global.closeMeListener);
            }
        }, be.Initializers.addResizeListener = function(e) {
            var n = t()("[data-resize]");
            n.length && ye(e, "resize.zf.trigger", be.Listeners.Global.resizeListener, n);
        }, be.Initializers.addScrollListener = function(e) {
            var n = t()("[data-scroll]");
            n.length && ye(e, "scroll.zf.trigger", be.Listeners.Global.scrollListener, n);
        }, be.Initializers.addMutationEventsListener = function(e) {
            if (!ge) return !1;
            var n = e.find("[data-resize], [data-scroll], [data-mutate]"),
                i = function(e) {
                    var n = t()(e[0].target);
                    switch (e[0].type) {
                        case "attributes":
                            "scroll" === n.attr("data-events") && "data-events" === e[0].attributeName && n.triggerHandler("scrollme.zf.trigger", [n, window.pageYOffset]), "resize" === n.attr("data-events") && "data-events" === e[0].attributeName && n.triggerHandler("resizeme.zf.trigger", [n]), "style" === e[0].attributeName && (n.closest("[data-mutate]").attr("data-events", "mutate"), n.closest("[data-mutate]").triggerHandler("mutateme.zf.trigger", [n.closest("[data-mutate]")]));
                            break;
                        case "childList":
                            n.closest("[data-mutate]").attr("data-events", "mutate"), n.closest("[data-mutate]").triggerHandler("mutateme.zf.trigger", [n.closest("[data-mutate]")]);
                            break;
                        default:
                            return !1;
                    }
                };
            if (n.length)
                for (var o = 0; o <= n.length - 1; o++) new ge(i).observe(n[o], {
                    attributes: !0,
                    childList: !0,
                    characterData: !1,
                    subtree: !0,
                    attributeFilter: ["data-events", "style"]
                });
        }, be.Initializers.addSimpleListeners = function() {
            var e = t()(document);
            be.Initializers.addOpenListener(e), be.Initializers.addCloseListener(e), be.Initializers.addToggleListener(e), be.Initializers.addCloseableListener(e), be.Initializers.addToggleFocusListener(e);
        }, be.Initializers.addGlobalListeners = function() {
            var e = t()(document);
            be.Initializers.addMutationEventsListener(e), be.Initializers.addResizeListener(250), be.Initializers.addScrollListener(), be.Initializers.addClosemeListener();
        }, be.init = function(e, n) {
            a(t()(window), (function() {
                !0 !== t().triggersInitialized && (be.Initializers.addSimpleListeners(), be.Initializers.addGlobalListeners(), t().triggersInitialized = !0);
            })), n && (n.Triggers = be, n.IHearYou = be.Initializers.addGlobalListeners);
        };
        var Te = function(e) {
            function n() {
                return function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                    }(this, n),
                    function(e, t, n) {
                        return t = Ce(t),
                            function(e, t) {
                                if (t && ("object" == we(t) || "function" == typeof t)) return t;
                                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                                return function(e) {
                                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                    return e;
                                }(e);
                            }(e, xe() ? Reflect.construct(t, n || [], Ce(e).constructor) : t.apply(e, n));
                    }(this, n, arguments);
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && _e(e, t);
            }(n, e), i = n, r = [{
                key: "_setup",
                value: function(e, i) {
                    this.$element = e, this.options = t().extend({}, n.defaults, this.$element.data(), i), this.className = "Sticky", be.init(t()), this._init();
                }
            }, {
                key: "_init",
                value: function() {
                    l._init();
                    var e = this.$element.parent("[data-sticky-container]"),
                        n = this.$element[0].id || o(6, "sticky"),
                        i = this;
                    e.length ? this.$container = e : (this.wasWrapped = !0, this.$element.wrap(this.options.container), this.$container = this.$element.parent()), this.$container.addClass(this.options.containerClass), this.$element.addClass(this.options.stickyClass).attr({
                        "data-resize": n,
                        "data-mutate": n
                    }), "" !== this.options.anchor && t()("#" + i.options.anchor).attr({
                        "data-mutate": n
                    }), this.scrollCount = this.options.checkEvery, this.isStuck = !1, this.onLoadListener = a(t()(window), (function() {
                        i.containerHeight = "none" === i.$element.css("display") ? 0 : i.$element[0].getBoundingClientRect().height, i.$container.css("height", i.containerHeight), i.elemHeight = i.containerHeight, "" !== i.options.anchor ? i.$anchor = t()("#" + i.options.anchor) : i._parsePoints(), i._setSizes((function() {
                            var e = window.pageYOffset;
                            i._calc(!1, e), i.isStuck || i._removeSticky(!(e >= i.topPoint));
                        })), i._events(n.split("-").reverse().join("-"));
                    }));
                }
            }, {
                key: "_parsePoints",
                value: function() {
                    for (var e = ["" === this.options.topAnchor ? 1 : this.options.topAnchor, "" === this.options.btmAnchor ? document.documentElement.scrollHeight : this.options.btmAnchor], n = {}, i = 0, o = e.length; i < o && e[i]; i++) {
                        var r;
                        if ("number" == typeof e[i]) r = e[i];
                        else {
                            var a = e[i].split(":"),
                                s = t()("#".concat(a[0]));
                            r = s.offset().top, a[1] && "bottom" === a[1].toLowerCase() && (r += s[0].getBoundingClientRect().height);
                        }
                        n[i] = r;
                    }
                    this.points = n;
                }
            }, {
                key: "_events",
                value: function(e) {
                    var n = this,
                        i = this.scrollListener = "scroll.zf.".concat(e);
                    this.isOn || (this.canStick && (this.isOn = !0, t()(window).off(i).on(i, (function() {
                        0 === n.scrollCount ? (n.scrollCount = n.options.checkEvery, n._setSizes((function() {
                            n._calc(!1, window.pageYOffset);
                        }))) : (n.scrollCount--, n._calc(!1, window.pageYOffset));
                    }))), this.$element.off("resizeme.zf.trigger").on("resizeme.zf.trigger", (function() {
                        n._eventsHandler(e);
                    })), this.$element.on("mutateme.zf.trigger", (function() {
                        n._eventsHandler(e);
                    })), this.$anchor && this.$anchor.on("mutateme.zf.trigger", (function() {
                        n._eventsHandler(e);
                    })));
                }
            }, {
                key: "_eventsHandler",
                value: function(e) {
                    var t = this,
                        n = this.scrollListener = "scroll.zf.".concat(e);
                    t._setSizes((function() {
                        t._calc(!1), t.canStick ? t.isOn || t._events(e) : t.isOn && t._pauseListeners(n);
                    }));
                }
            }, {
                key: "_pauseListeners",
                value: function(e) {
                    this.isOn = !1, t()(window).off(e), this.$element.trigger("pause.zf.sticky");
                }
            }, {
                key: "_calc",
                value: function(e, t) {
                    if (e && this._setSizes(), !this.canStick) return this.isStuck && this._removeSticky(!0), !1;
                    t || (t = window.pageYOffset), t >= this.topPoint ? t <= this.bottomPoint ? this.isStuck || this._setSticky() : this.isStuck && this._removeSticky(!1) : this.isStuck && this._removeSticky(!0);
                }
            }, {
                key: "_setSticky",
                value: function() {
                    var e = this,
                        t = this.options.stickTo,
                        n = "top" === t ? "marginTop" : "marginBottom",
                        i = "top" === t ? "bottom" : "top",
                        o = {};
                    o[n] = "".concat(this.options[n], "em"), o[t] = 0, o[i] = "auto", this.isStuck = !0, this.$element.removeClass("is-anchored is-at-".concat(i)).addClass("is-stuck is-at-".concat(t)).css(o).trigger("sticky.zf.stuckto:".concat(t)), this.$element.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", (function() {
                        e._setSizes();
                    }));
                }
            }, {
                key: "_removeSticky",
                value: function(e) {
                    var t = this.options.stickTo,
                        n = "top" === t,
                        i = {},
                        o = (this.points ? this.points[1] - this.points[0] : this.anchorHeight) - this.elemHeight,
                        r = e ? "top" : "bottom";
                    i[n ? "marginTop" : "marginBottom"] = 0, i.bottom = "auto", i.top = e ? 0 : o, this.isStuck = !1, this.$element.removeClass("is-stuck is-at-".concat(t)).addClass("is-anchored is-at-".concat(r)).css(i).trigger("sticky.zf.unstuckfrom:".concat(r));
                }
            }, {
                key: "_setSizes",
                value: function(e) {
                    this.canStick = l.is(this.options.stickyOn), this.canStick || e && "function" == typeof e && e();
                    var t = this.$container[0].getBoundingClientRect().width,
                        n = window.getComputedStyle(this.$container[0]),
                        i = parseInt(n["padding-left"], 10),
                        o = parseInt(n["padding-right"], 10);
                    if (this.$anchor && this.$anchor.length ? this.anchorHeight = this.$anchor[0].getBoundingClientRect().height : this._parsePoints(), this.$element.css({
                            "max-width": "".concat(t - i - o, "px")
                        }), this.options.dynamicHeight || !this.containerHeight) {
                        var r = this.$element[0].getBoundingClientRect().height || this.containerHeight;
                        r = "none" === this.$element.css("display") ? 0 : r, this.$container.css("height", r), this.containerHeight = r;
                    }
                    if (this.elemHeight = this.containerHeight, !this.isStuck && this.$element.hasClass("is-at-bottom")) {
                        var a = (this.points ? this.points[1] - this.$container.offset().top : this.anchorHeight) - this.elemHeight;
                        this.$element.css("top", a);
                    }
                    this._setBreakPoints(this.containerHeight, (function() {
                        e && "function" == typeof e && e();
                    }));
                }
            }, {
                key: "_setBreakPoints",
                value: function(e, t) {
                    if (!this.canStick) {
                        if (!t || "function" != typeof t) return !1;
                        t();
                    }
                    var n = Oe(this.options.marginTop),
                        i = Oe(this.options.marginBottom),
                        o = this.points ? this.points[0] : this.$anchor.offset().top,
                        r = this.points ? this.points[1] : o + this.anchorHeight,
                        a = window.innerHeight;
                    "top" === this.options.stickTo ? (o -= n, r -= e + n) : "bottom" === this.options.stickTo && (o -= a - (e + i), r -= a - i), this.topPoint = o, this.bottomPoint = r, t && "function" == typeof t && t();
                }
            }, {
                key: "_destroy",
                value: function() {
                    this._removeSticky(!0), this.$element.removeClass("".concat(this.options.stickyClass, " is-anchored is-at-top")).css({
                        height: "",
                        top: "",
                        bottom: "",
                        "max-width": ""
                    }).off("resizeme.zf.trigger").off("mutateme.zf.trigger"), this.$anchor && this.$anchor.length && this.$anchor.off("change.zf.sticky"), this.scrollListener && t()(window).off(this.scrollListener), this.onLoadListener && t()(window).off(this.onLoadListener), this.wasWrapped ? this.$element.unwrap() : this.$container.removeClass(this.options.containerClass).css({
                        height: ""
                    });
                }
            }], r && function(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, ke(i.key), i);
                }
            }(i.prototype, r), Object.defineProperty(i, "prototype", {
                writable: !1
            }), i;
            var i, r;
        }(g);

        function Oe(e) {
            return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * e;
        }
        Te.defaults = {
            container: "<div data-sticky-container></div>",
            stickTo: "top",
            anchor: "",
            topAnchor: "",
            btmAnchor: "",
            marginTop: 1,
            marginBottom: 1,
            stickyOn: "medium",
            stickyClass: "sticky",
            containerClass: "sticky-container",
            dynamicHeight: !0,
            checkEvery: -1
        }, t()(document).ready((function() {
            if (t()(".paragraph--type--reference-menu-block nav").length) {
                var e = t()(".paragraph--type--reference-menu-block nav > ul.menu");
                new fe(e), new Te(t()(".paragraph--type--reference-menu-block nav"), {
                    stickyOn: "large",
                    anchor: "block-themekit-content",
                    marginTop: 0
                }), new Te(t()(".paragraph--type--reference-menu-block nav"), {
                    stickyOn: "small",
                    anchor: "block-themekit-content",
                    marginTop: 0
                });
            }
        })), n(917), n(732), t()(document).on("click", ".video-popup", (function(e) {
            e.preventDefault(), t().magnificPopup.open({
                items: {
                    src: this.href
                },
                type: "iframe",
                removalDelay: 300,
                mainClass: "mfp-fade"
            });
        }));
        var Se = t()(".regional-redirect-wrapper");
        Se.on("regionRedirect:load", (function() {
            var e = t()(".cancel-redirect"),
                n = t()(".accept-redirect");
            t().magnificPopup.open({
                items: {
                    src: ".block-regional-redirect-block",
                    type: "inline"
                }
            }), e.on("click", (function() {
                t().magnificPopup.close();
            })), n.on("click", (function() {
                Se.append('<div class="ajax-progress ajax-progress-fullscreen"></div>'), e.addClass("disabled").attr("disabled", !0);
            }));
        })), t()(".region-redirect-reset-link a").on("click", (function(e) {
            var n = t()(".clear-preference-link");
            e.preventDefault(), t().magnificPopup.open({
                items: {
                    src: ".modal-redirect-reset-wrapper",
                    type: "inline"
                }
            }), n.on("click", (function() {
                t().magnificPopup.close();
            }));
        }));
        var Ee, ze = n(669);

        function Ae(e) {
            return Ae = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            }, Ae(e);
        }

        function Ie(e) {
            var t = function(e) {
                if ("object" != Ae(e) || !e) return e;
                var t = e[Symbol.toPrimitive];
                if (void 0 !== t) {
                    var n = t.call(e, "string");
                    if ("object" != Ae(n)) return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(e);
            }(e);
            return "symbol" == Ae(t) ? t : t + "";
        }

        function Pe() {
            try {
                var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
            } catch (e) {}
            return (Pe = function() {
                return !!e;
            })();
        }

        function Me(e) {
            return Me = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            }, Me(e);
        }

        function Le(e, t) {
            return Le = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                return e.__proto__ = t, e;
            }, Le(e, t);
        }
        Ee = ze, Drupal.behaviors.exitOverlays = {
            attach: function(e, t) {
                var n = void 0 !== t.cventNotifications && t.cventNotifications ? t.cventNotifications : null,
                    i = null;
                void 0 !== n.overlayWrapper && n.overlayWrapper && (i = Ee(n.overlayWrapper)), null !== i && i.on("injectOverlay", (function() {
                    Ee(".exit-overlay").each((function() {
                        ! function(e) {
                            var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 120,
                                n = !1;
                            setTimeout((function() {
                                Ee(window).on("mousemove scroll", Foundation.util.throttle((function(i) {
                                    (!n && i.pageY - t <= Ee(window).scrollTop() || !n && t >= Ee(window).scrollTop()) && Ee.magnificPopup.open({
                                        items: {
                                            src: e,
                                            type: "inline"
                                        },
                                        callbacks: {
                                            open: function() {
                                                n = !0;
                                            },
                                            close: function() {
                                                var t = e.attr("notification-id"),
                                                    n = Ee.cookie("cvent_notifications");
                                                n ? ((n = n.split(".")).includes(t) || n.push(t), n = n.join(".")) : n = t, Ee.cookie("cvent_notifications", n, {
                                                    expires: 365,
                                                    path: "/"
                                                });
                                            }
                                        }
                                    });
                                }), 50));
                            }), arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e4);
                        }(Ee(this));
                    }));
                }));
            }
        }, n(716);
        var $e = function(e) {
            function n() {
                return function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                    }(this, n),
                    function(e, t, n) {
                        return t = Me(t),
                            function(e, t) {
                                if (t && ("object" == Ae(t) || "function" == typeof t)) return t;
                                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                                return function(e) {
                                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                    return e;
                                }(e);
                            }(e, Pe() ? Reflect.construct(t, n || [], Me(e).constructor) : t.apply(e, n));
                    }(this, n, arguments);
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && Le(e, t);
            }(n, e), i = n, o = [{
                key: "_setup",
                value: function(e, i) {
                    this.$element = e, this.options = t().extend({}, n.defaults, this.$element.data(), i), this.className = "Tabs", this._init(), x.register("Tabs", {
                        ENTER: "open",
                        SPACE: "open",
                        ARROW_RIGHT: "next",
                        ARROW_UP: "previous",
                        ARROW_DOWN: "next",
                        ARROW_LEFT: "previous"
                    });
                }
            }, {
                key: "_init",
                value: function() {
                    var e = this,
                        n = this;
                    if (this._isInitializing = !0, this.$element.attr({
                            role: "tablist"
                        }), this.$tabTitles = this.$element.find(".".concat(this.options.linkClass)), this.$tabContent = t()('[data-tabs-content="'.concat(this.$element[0].id, '"]')), this.$tabTitles.each((function() {
                            var e = t()(this),
                                i = e.find("a"),
                                o = e.hasClass("".concat(n.options.linkActiveClass)),
                                r = i.attr("data-tabs-target") || i[0].hash.slice(1),
                                s = i[0].id ? i[0].id : "".concat(r, "-label"),
                                c = t()("#".concat(r));
                            e.attr({
                                role: "presentation"
                            }), i.attr({
                                role: "tab",
                                "aria-controls": r,
                                "aria-selected": o,
                                id: s,
                                tabindex: o ? "0" : "-1"
                            }), c.attr({
                                role: "tabpanel",
                                "aria-labelledby": s
                            }), o && (n._initialAnchor = "#".concat(r)), o || c.attr("aria-hidden", "true"), o && n.options.autoFocus && (n.onLoadListener = a(t()(window), (function() {
                                t()("html, body").animate({
                                    scrollTop: e.offset().top
                                }, n.options.deepLinkSmudgeDelay, (function() {
                                    i.focus();
                                }));
                            })));
                        })), this.options.matchHeight) {
                        var i = this.$tabContent.find("img");
                        i.length ? function(e, n) {
                            var i = e.length;

                            function o() {
                                0 == --i && n();
                            }
                            0 === i && n(), e.each((function() {
                                if (this.complete && void 0 !== this.naturalWidth) o();
                                else {
                                    var e = new Image(),
                                        n = "load.zf.images error.zf.images";
                                    t()(e).one(n, (function e() {
                                        t()(this).off(n, e), o();
                                    })), e.src = t()(this).attr("src");
                                }
                            }));
                        }(i, this._setHeight.bind(this)) : this._setHeight();
                    }
                    this._checkDeepLink = function() {
                        var n = window.location.hash;
                        if (!n.length) {
                            if (e._isInitializing) return;
                            e._initialAnchor && (n = e._initialAnchor);
                        }
                        var i = n.indexOf("#") >= 0 ? n.slice(1) : n,
                            o = i && t()("#".concat(i)),
                            r = n && e.$element.find('[href$="'.concat(n, '"],[data-tabs-target="').concat(i, '"]')).first();
                        if (o.length && r.length) {
                            if (o && o.length && r && r.length ? e.selectTab(o, !0) : e._collapse(), e.options.deepLinkSmudge) {
                                var a = e.$element.offset();
                                t()("html, body").animate({
                                    scrollTop: a.top - e.options.deepLinkSmudgeOffset
                                }, e.options.deepLinkSmudgeDelay);
                            }
                            e.$element.trigger("deeplink.zf.tabs", [r, o]);
                        }
                    }, this.options.deepLink && this._checkDeepLink(), this._events(), this._isInitializing = !1;
                }
            }, {
                key: "_events",
                value: function() {
                    this._addKeyHandler(), this._addClickHandler(), this._setHeightMqHandler = null, this.options.matchHeight && (this._setHeightMqHandler = this._setHeight.bind(this), t()(window).on("changed.zf.mediaquery", this._setHeightMqHandler)), this.options.deepLink && t()(window).on("hashchange", this._checkDeepLink);
                }
            }, {
                key: "_addClickHandler",
                value: function() {
                    var e = this;
                    this.$element.off("click.zf.tabs").on("click.zf.tabs", ".".concat(this.options.linkClass), (function(n) {
                        n.preventDefault(), e._handleTabChange(t()(this));
                    }));
                }
            }, {
                key: "_addKeyHandler",
                value: function() {
                    var e = this;
                    this.$tabTitles.off("keydown.zf.tabs").on("keydown.zf.tabs", (function(n) {
                        if (9 !== n.which) {
                            var i, o, r = t()(this),
                                a = r.parent("ul").children("li");
                            a.each((function(n) {
                                t()(this).is(r) && (e.options.wrapOnKeys ? (i = 0 === n ? a.last() : a.eq(n - 1), o = n === a.length - 1 ? a.first() : a.eq(n + 1)) : (i = a.eq(Math.max(0, n - 1)), o = a.eq(Math.min(n + 1, a.length - 1))));
                            })), x.handleKey(n, "Tabs", {
                                open: function() {
                                    r.find('[role="tab"]').focus(), e._handleTabChange(r);
                                },
                                previous: function() {
                                    i.find('[role="tab"]').focus(), e._handleTabChange(i);
                                },
                                next: function() {
                                    o.find('[role="tab"]').focus(), e._handleTabChange(o);
                                },
                                handled: function() {
                                    n.preventDefault();
                                }
                            });
                        }
                    }));
                }
            }, {
                key: "_handleTabChange",
                value: function(e, t) {
                    if (e.hasClass("".concat(this.options.linkActiveClass))) this.options.activeCollapse && this._collapse();
                    else {
                        var n = this.$element.find(".".concat(this.options.linkClass, ".").concat(this.options.linkActiveClass)),
                            i = e.find('[role="tab"]'),
                            o = i.attr("data-tabs-target"),
                            r = o && o.length ? "#".concat(o) : i[0].hash,
                            a = this.$tabContent.find(r);
                        this._collapseTab(n), this._openTab(e), this.options.deepLink && !t && (this.options.updateHistory ? history.pushState({}, "", location.pathname + location.search + r) : history.replaceState({}, "", location.pathname + location.search + r)), this.$element.trigger("change.zf.tabs", [e, a]), a.find("[data-mutate]").trigger("mutateme.zf.trigger");
                    }
                }
            }, {
                key: "_openTab",
                value: function(e) {
                    var t = e.find('[role="tab"]'),
                        n = t.attr("data-tabs-target") || t[0].hash.slice(1),
                        i = this.$tabContent.find("#".concat(n));
                    e.addClass("".concat(this.options.linkActiveClass)), t.attr({
                        "aria-selected": "true",
                        tabindex: "0"
                    }), i.addClass("".concat(this.options.panelActiveClass)).removeAttr("aria-hidden");
                }
            }, {
                key: "_collapseTab",
                value: function(e) {
                    var n = e.removeClass("".concat(this.options.linkActiveClass)).find('[role="tab"]').attr({
                        "aria-selected": "false",
                        tabindex: -1
                    });
                    t()("#".concat(n.attr("aria-controls"))).removeClass("".concat(this.options.panelActiveClass)).attr({
                        "aria-hidden": "true"
                    });
                }
            }, {
                key: "_collapse",
                value: function() {
                    var e = this.$element.find(".".concat(this.options.linkClass, ".").concat(this.options.linkActiveClass));
                    e.length && (this._collapseTab(e), this.$element.trigger("collapse.zf.tabs", [e]));
                }
            }, {
                key: "selectTab",
                value: function(e, t) {
                    var n, i;
                    (n = "object" === Ae(e) ? e[0].id : e).indexOf("#") < 0 ? i = "#".concat(n) : (i = n, n = n.slice(1));
                    var o = this.$tabTitles.has('[href$="'.concat(i, '"],[data-tabs-target="').concat(n, '"]')).first();
                    this._handleTabChange(o, t);
                }
            }, {
                key: "_setHeight",
                value: function() {
                    var e = 0,
                        n = this;
                    this.$tabContent && this.$tabContent.find(".".concat(this.options.panelClass)).css("min-height", "").each((function() {
                        var i = t()(this),
                            o = i.hasClass("".concat(n.options.panelActiveClass));
                        o || i.css({
                            visibility: "hidden",
                            display: "block"
                        });
                        var r = this.getBoundingClientRect().height;
                        o || i.css({
                            visibility: "",
                            display: ""
                        }), e = r > e ? r : e;
                    })).css("min-height", "".concat(e, "px"));
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.$element.find(".".concat(this.options.linkClass)).off(".zf.tabs").hide().end().find(".".concat(this.options.panelClass)).hide(), this.options.matchHeight && null != this._setHeightMqHandler && t()(window).off("changed.zf.mediaquery", this._setHeightMqHandler), this.options.deepLink && t()(window).off("hashchange", this._checkDeepLink), this.onLoadListener && t()(window).off(this.onLoadListener);
                }
            }], o && function(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, Ie(i.key), i);
                }
            }(i.prototype, o), Object.defineProperty(i, "prototype", {
                writable: !1
            }), i;
            var i, o;
        }(g);

        function je(e) {
            return je = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            }, je(e);
        }

        function He(e) {
            var t = function(e) {
                if ("object" != je(e) || !e) return e;
                var t = e[Symbol.toPrimitive];
                if (void 0 !== t) {
                    var n = t.call(e, "string");
                    if ("object" != je(n)) return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(e);
            }(e);
            return "symbol" == je(t) ? t : t + "";
        }

        function De() {
            try {
                var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
            } catch (e) {}
            return (De = function() {
                return !!e;
            })();
        }

        function Re(e) {
            return Re = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            }, Re(e);
        }

        function Fe(e, t) {
            return Fe = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                return e.__proto__ = t, e;
            }, Fe(e, t);
        }
        $e.defaults = {
            deepLink: !1,
            deepLinkSmudge: !1,
            deepLinkSmudgeDelay: 300,
            deepLinkSmudgeOffset: 0,
            updateHistory: !1,
            autoFocus: !1,
            wrapOnKeys: !0,
            matchHeight: !1,
            activeCollapse: !1,
            linkClass: "tabs-title",
            linkActiveClass: "is-active",
            panelClass: "tabs-panel",
            panelActiveClass: "is-active"
        };
        var Ne = function(e) {
            function n() {
                return function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                    }(this, n),
                    function(e, t, n) {
                        return t = Re(t),
                            function(e, t) {
                                if (t && ("object" == je(t) || "function" == typeof t)) return t;
                                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                                return function(e) {
                                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                    return e;
                                }(e);
                            }(e, De() ? Reflect.construct(t, n || [], Re(e).constructor) : t.apply(e, n));
                    }(this, n, arguments);
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && Fe(e, t);
            }(n, e), i = n, r = [{
                key: "_setup",
                value: function(e, i) {
                    this.$element = e, this.options = t().extend({}, n.defaults, this.$element.data(), i), this.className = "Accordion", this._init(), x.register("Accordion", {
                        ENTER: "toggle",
                        SPACE: "toggle",
                        ARROW_DOWN: "next",
                        ARROW_UP: "previous",
                        HOME: "first",
                        END: "last"
                    });
                }
            }, {
                key: "_init",
                value: function() {
                    var e = this;
                    this._isInitializing = !0, this.$tabs = this.$element.children("[data-accordion-item]"), this.$tabs.each((function(e, n) {
                        var i = t()(n),
                            r = i.children("[data-tab-content]"),
                            a = r[0].id || o(6, "accordion"),
                            s = n.id ? "".concat(n.id, "-label") : "".concat(a, "-label");
                        i.find("a:first").attr({
                            "aria-controls": a,
                            id: s,
                            "aria-expanded": !1
                        }), r.attr({
                            role: "region",
                            "aria-labelledby": s,
                            "aria-hidden": !0,
                            id: a
                        });
                    }));
                    var n = this.$element.find(".is-active").children("[data-tab-content]");
                    n.length && (this._initialAnchor = n.prev("a").attr("href"), this._openSingleTab(n)), this._checkDeepLink = function() {
                        var n = window.location.hash;
                        if (!n.length) {
                            if (e._isInitializing) return;
                            e._initialAnchor && (n = e._initialAnchor);
                        }
                        var i = n && t()(n),
                            o = n && e.$element.find('[href$="'.concat(n, '"]'));
                        i.length && o.length && (i && o && o.length ? o.parent("[data-accordion-item]").hasClass("is-active") || e._openSingleTab(i) : e._closeAllTabs(), e.options.deepLinkSmudge && a(t()(window), (function() {
                            var n = e.$element.offset();
                            t()("html, body").animate({
                                scrollTop: n.top - e.options.deepLinkSmudgeOffset
                            }, e.options.deepLinkSmudgeDelay);
                        })), e.$element.trigger("deeplink.zf.accordion", [o, i]));
                    }, this.options.deepLink && this._checkDeepLink(), this._events(), this._isInitializing = !1;
                }
            }, {
                key: "_events",
                value: function() {
                    var e = this;
                    this.$tabs.each((function() {
                        var n = t()(this),
                            i = n.children("[data-tab-content]");
                        i.length && n.children("a").off("click.zf.accordion keydown.zf.accordion").on("click.zf.accordion", (function(t) {
                            t.preventDefault(), e.toggle(i);
                        })).on("keydown.zf.accordion", (function(t) {
                            x.handleKey(t, "Accordion", {
                                toggle: function() {
                                    e.toggle(i);
                                },
                                next: function() {
                                    var t = n.next().find("a").focus();
                                    e.options.multiExpand || t.trigger("click.zf.accordion");
                                },
                                previous: function() {
                                    var t = n.prev().find("a").focus();
                                    e.options.multiExpand || t.trigger("click.zf.accordion");
                                },
                                first: function() {
                                    var t = e.$tabs.first().find(".accordion-title").focus();
                                    e.options.multiExpand || t.trigger("click.zf.accordion");
                                },
                                last: function() {
                                    var t = e.$tabs.last().find(".accordion-title").focus();
                                    e.options.multiExpand || t.trigger("click.zf.accordion");
                                },
                                handled: function() {
                                    t.preventDefault();
                                }
                            });
                        }));
                    })), this.options.deepLink && t()(window).on("hashchange", this._checkDeepLink);
                }
            }, {
                key: "toggle",
                value: function(e) {
                    if (e.closest("[data-accordion]").is("[disabled]")) console.info("Cannot toggle an accordion that is disabled.");
                    else {
                        if (e.parent().hasClass("is-active") ? this.up(e) : this.down(e), this.options.deepLink) {
                            var t = e.prev("a").attr("href");
                            this.options.updateHistory ? history.pushState({}, "", t) : history.replaceState({}, "", t);
                        }
                    }
                }
            }, {
                key: "down",
                value: function(e) {
                    e.closest("[data-accordion]").is("[disabled]") ? console.info("Cannot call down on an accordion that is disabled.") : this.options.multiExpand ? this._openTab(e) : this._openSingleTab(e);
                }
            }, {
                key: "up",
                value: function(e) {
                    if (this.$element.is("[disabled]")) console.info("Cannot call up on an accordion that is disabled.");
                    else {
                        var t = e.parent();
                        if (t.hasClass("is-active")) {
                            var n = t.siblings();
                            (this.options.allowAllClosed || n.hasClass("is-active")) && this._closeTab(e);
                        }
                    }
                }
            }, {
                key: "_openSingleTab",
                value: function(e) {
                    var t = this.$element.children(".is-active").children("[data-tab-content]");
                    t.length && this._closeTab(t.not(e)), this._openTab(e);
                }
            }, {
                key: "_openTab",
                value: function(e) {
                    var n = this,
                        i = e.parent(),
                        o = e.attr("aria-labelledby");
                    e.attr("aria-hidden", !1), i.addClass("is-active"), t()("#".concat(o)).attr({
                        "aria-expanded": !0
                    }), e.finish().slideDown(this.options.slideSpeed, (function() {
                        n.$element.trigger("down.zf.accordion", [e]);
                    }));
                }
            }, {
                key: "_closeTab",
                value: function(e) {
                    var n = this,
                        i = e.parent(),
                        o = e.attr("aria-labelledby");
                    e.attr("aria-hidden", !0), i.removeClass("is-active"), t()("#".concat(o)).attr({
                        "aria-expanded": !1
                    }), e.finish().slideUp(this.options.slideSpeed, (function() {
                        n.$element.trigger("up.zf.accordion", [e]);
                    }));
                }
            }, {
                key: "_closeAllTabs",
                value: function() {
                    var e = this.$element.children(".is-active").children("[data-tab-content]");
                    e.length && this._closeTab(e);
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.$element.find("[data-tab-content]").stop(!0).slideUp(0).css("display", ""), this.$element.find("a").off(".zf.accordion"), this.options.deepLink && t()(window).off("hashchange", this._checkDeepLink);
                }
            }], r && function(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, He(i.key), i);
                }
            }(i.prototype, r), Object.defineProperty(i, "prototype", {
                writable: !1
            }), i;
            var i, r;
        }(g);
        Ne.defaults = {
            slideSpeed: 250,
            multiExpand: !1,
            allowAllClosed: !1,
            deepLink: !1,
            deepLinkSmudge: !1,
            deepLinkSmudgeDelay: 300,
            deepLinkSmudgeOffset: 0,
            updateHistory: !1
        }, t()(".paragraph--type--layout-tabs-h  .tabs").length && new $e(t()(".paragraph--type--layout-tabs-h .tabs")), t()(".paragraph--type--layout-tabs-v .tabs").length && new $e(t()(".paragraph--type--layout-tabs-v .tabs")), t()(".content-track-tabs .tabs").length && new $e(t()(".content-track-tabs .tabs")), t()(".accordion").length && new Ne(t()(".accordion"));
        var Be, We, qe = t()(window).width(),
            Ue = qe;

        function Ve() {
            t()(window).width() <= 1079 ? (t()(".field__item").find(".tab-title-mobile").removeClass("is-active"), t()(".field__item").find(".paragraph").removeClass("is-active"), t()(".tab-title-mobile").off("click").on("click", (function() {
                var e = t()(this).closest(".field__item").find(".paragraph");
                if (e.length) {
                    var n = t()(this).closest(".tabs-wrapper");
                    n.find(".tab-title-mobile").removeClass("is-active"), t()(this).addClass("is-active"), n.find(".paragraph").removeClass("is-active"), e.addClass("is-active");
                    var i = t()(this).closest(".field__item").find(".paragraph--type--compound-tab-h .field--name-field-p-logos");
                    t()(window).width() <= 559 && i.length && (i.slick("unslick"), i.slick({
                        infinite: !0,
                        speed: 300,
                        slidesToShow: 1,
                        arrows: !1,
                        dots: !0,
                        mobileFirst: !0,
                        autoplay: !0,
                        autoplaySpeed: 2e3
                    }));
                }
            })), t()(".tabs-wrapper").each((function() {
                var e = t()(this).find(".tab-title-mobile:first"),
                    n = e.closest(".field__item").find(".paragraph");
                e.length && n.length && (e.addClass("is-active"), n.addClass("is-active"));
            }))) : (t()("ul.tabs li").removeClass("is-active"), t()(".tabs-content .paragraph").removeClass("is-active"), t()("ul.tabs").each((function() {
                var e = t()(this),
                    n = e.nextAll(".tabs-content:first").find(".paragraph:first");
                setTimeout((function() {
                    n.length && (e.find("li:first").addClass("is-active"), n.addClass("is-active"));
                }), 300);
            })));
        }
        t()(window).on("resize", (Be = function() {
            Ue = t()(window).width(), (qe > 1079 && Ue <= 1079 || qe <= 1079 && Ue > 1079) && Ve(), qe = Ue;
        }, function() {
            var e = this,
                t = arguments;
            clearTimeout(We), We = setTimeout((function() {
                We = null, Be.apply(e, t);
            }), 300);
        })), t()(document).ready((function() {
            Ve();
        }));
        var Ye = function(e) {
            var n = t()('a[href="' + e + '"]');
            if (n.length) {
                var i = n.closest("li");
                if (i && t()(i).length) {
                    var o, r, a = null !== (o = null === (r = t()(i).parents("#tabs")) || void 0 === r || null === (r = r.offset()) || void 0 === r ? void 0 : r.top) && void 0 !== o ? o : 0;
                    a > 0 && t()(window).scrollTop(a - 80);
                }
                setTimeout((function() {
                    i.siblings("li").removeClass("is-active"), i.addClass("is-active"), i.parents(".tabs-wrapper").find(".tabs-content").find(".paragraph").removeClass("is-active"), t()(e).addClass("is-active");
                }), 400);
            }
        };
        t()("ul.tabs li a").click((function() {
            var e = t()(this).closest("li");
            if (e.closest("ul.tabs").nextAll(".tabs-content:first").find(".paragraph").length) {
                e.siblings("li").removeClass("is-active"), e.addClass("is-active"), e.closest("ul.tabs").nextAll(".tabs-content:first").find(".paragraph").removeClass("is-active");
                var n = t()(this).attr("href");
                return t()(n).addClass("is-active"), !1;
            }
        })), t()("div.tabs .tabs-title").each((function() {
            if (t()(this).hasClass("is-active")) {
                var e = t()(this).find("a").attr("href");
                return t()(".sidebar-track-content").find(".content-track-tabs").hide(), t()(e).show(), !1;
            }
        })), t()("div.tabs a").on("click", (function(e) {
            var n = t()(this).attr("href");
            t()(".sidebar-track-content").find(".content-track-tabs").hide(), t()(n).show();
        })), t()(document).ready((function() {
            var e = window.location.hash;
            e && Ye(e);
        })), t()(window).on("hashchange", (function() {
            var e = window.location.hash;
            Ye(e);
        })), t()(document).ready((function() {
            var e = t()(".promote-img-area"),
                n = t()(".region-header"),
                i = t()(".region-header-bottom"),
                o = t()(".toc-js");
            if (0 !== o.length) {
                var r = e.length > 0 ? e.outerHeight() : 0,
                    a = (n.length > 0 ? n.outerHeight() : 0) + (i.length > 0 ? i.outerHeight() : 0),
                    s = r + a,
                    c = window.matchMedia("(min-width: 1500px)");
                o.css({
                    top: a,
                    transition: "left 0.3s ease-out"
                }), t()(window).width() >= 1080 && l(), t()(window).on("resize", (function() {
                    t()(window).width() >= 1080 && l();
                }));
            }

            function l() {
                var e = !0,
                    n = 0;
                t()(window).on("scroll", (function() {
                    if (t()(window).scrollTop() > s ? c.matches ? o.css({
                            position: "fixed",
                            left: "calc((100vw - 1500px) / 2)",
                            top: a
                        }) : o.css({
                            position: "fixed",
                            left: "0",
                            top: a
                        }) : o.css({
                            position: "fixed",
                            left: "-600px",
                            top: a
                        }), t()(".field--name-field-author").offset().top - (t()(".toc-js nav").offset().top + t()(".toc-js nav").height()) < 10) {
                        if (e) {
                            var i = 2 * t()(".region-header").height() + 2 * t()(".region-sticky .region-content").height() + (t()("#block-promotion-opener").length ? t()("#block-promotion-opener").height() : 0);
                            n = t()(".node--type-author").offset().top - t()(".toc-js nav").height() - i, e = !1;
                        }
                        o.css({
                            top: n,
                            position: "absolute",
                            left: "unset"
                        });
                    }
                })), t()(".content-track-container .toc-js").length > 0 && t()(".content-track-container .toc-js").remove();
            }
        }));
        var Ke = n(669),
            Ge = t()("body"),
            Xe = t()(".menu--search-menu > ul").clone(),
            Je = t()(".region-header-top .block-cvent-header-search-block"),
            Qe = t()(".search-mobile-container"),
            Ze = t()(".search-link"),
            et = !1;

        function tt() {
            var e, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "toggle",
                i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
            if ("open" === n) e = !0, et = !0;
            else if ("close" === n) e = !1, et = !1;
            else if ("toggle" === n) e = !et, et = !et;
            else {
                if (void 0 !== n) return console.log("Invalid toggleAction parameter '" + n + "' passed to toggleSearchs function."), !1;
            }
            Ge.toggleClass("search-mobile-open", e);
            var o = e ? "searchmobile.opening" : "searchmobile.closing";
            i instanceof Ke ? i.trigger(o) : t()(document).trigger(o);
        }
        Qe.append(t()("<div>").addClass("search-close")), Qe.append(t()("<nav>").addClass("menu--mobile").append(Je).append(Xe)), Ze.on("click", (function(e) {
            e.preventDefault(), tt(), e.stopPropagation();
        })), t()(".search-close").on("click", (function(e) {
            e.preventDefault(), tt("close"), e.stopPropagation();
        })), t()(document).keyup((function(e) {
            27 === e.which && tt("close");
        })), t()(window).on("changed.zf.mediaquery", (function(e, t, n) {
            "large" !== t && "xlarge" !== t && "xxlarge" !== t || tt("close");
        })), t()(document).mouseup((function(e) {
            var n = t()(".search-mobile-container");
            t()(".search-link").is(e.target) || n.is(e.target) || 0 != n.has(e.target).length || tt("close");
        })), window._wq = window._wq || [];
        var nt = {
            playbar: !1,
            playButton: !1,
            volume: 0,
            endVideoBehavior: "loop",
            plugin: {
                cropFill: {
                    src: "https://fast.wistia.com/labs/crop-fill/plugin.js"
                }
            }
        };

        function it(e) {
            if (null == e) return window;
            if ("[object Window]" !== e.toString()) {
                var t = e.ownerDocument;
                return t && t.defaultView || window;
            }
            return e;
        }

        function ot(e) {
            return e instanceof it(e).Element || e instanceof Element;
        }

        function rt(e) {
            return e instanceof it(e).HTMLElement || e instanceof HTMLElement;
        }

        function at(e) {
            return "undefined" != typeof ShadowRoot && (e instanceof it(e).ShadowRoot || e instanceof ShadowRoot);
        }
        t()(".bg-video-container").each((function() {
            var e = t()(this),
                n = e.find(".bg-video").attr("data-video-bg-id");
            _wq.push({
                id: n,
                options: nt,
                onReady: function(n) {
                    n.bind("play", (function() {
                        return n.pause(), n.time(0), e.removeClass("video-inactive"), n.play(), n.unbind;
                    })), n.play(), t()(window).on("changed.zf.mediaquery", (function(e, t, i) {
                        "marge" !== t && "large" !== t && "xlarge" !== t && "xxlarge" !== t || "playing" !== n.state() && n.play();
                    }));
                }
            });
        })), n(459), t()("a").each((function() {
            new RegExp("/" + window.location.host + "/").test(this.href) || "" === this.href || t()(this).attr("target", "_blank");
        })), t()(".file > a").each((function() {
            t()(this).hasClass("skip-external") || t()(this).attr("target", "_blank");
        })), (0, n(126).iframeResizer)({
            checkOrigin: !1
        }, ".iframe-size-style-dynamic iframe"), n(841);
        var st = Math.max,
            ct = Math.min,
            lt = Math.round;

        function ut() {
            var e = navigator.userAgentData;
            return null != e && e.brands && Array.isArray(e.brands) ? e.brands.map((function(e) {
                return e.brand + "/" + e.version;
            })).join(" ") : navigator.userAgent;
        }

        function dt() {
            return !/^((?!chrome|android).)*safari/i.test(ut());
        }

        function ft(e, t, n) {
            void 0 === t && (t = !1), void 0 === n && (n = !1);
            var i = e.getBoundingClientRect(),
                o = 1,
                r = 1;
            t && rt(e) && (o = e.offsetWidth > 0 && lt(i.width) / e.offsetWidth || 1, r = e.offsetHeight > 0 && lt(i.height) / e.offsetHeight || 1);
            var a = (ot(e) ? it(e) : window).visualViewport,
                s = !dt() && n,
                c = (i.left + (s && a ? a.offsetLeft : 0)) / o,
                l = (i.top + (s && a ? a.offsetTop : 0)) / r,
                u = i.width / o,
                d = i.height / r;
            return {
                width: u,
                height: d,
                top: l,
                right: c + u,
                bottom: l + d,
                left: c,
                x: c,
                y: l
            };
        }

        function pt(e) {
            var t = it(e);
            return {
                scrollLeft: t.pageXOffset,
                scrollTop: t.pageYOffset
            };
        }

        function ht(e) {
            return e ? (e.nodeName || "").toLowerCase() : null;
        }

        function mt(e) {
            return ((ot(e) ? e.ownerDocument : e.document) || window.document).documentElement;
        }

        function gt(e) {
            return ft(mt(e)).left + pt(e).scrollLeft;
        }

        function vt(e) {
            return it(e).getComputedStyle(e);
        }

        function bt(e) {
            var t = vt(e),
                n = t.overflow,
                i = t.overflowX,
                o = t.overflowY;
            return /auto|scroll|overlay|hidden/.test(n + o + i);
        }

        function yt(e, t, n) {
            void 0 === n && (n = !1);
            var i, o, r = rt(t),
                a = rt(t) && function(e) {
                    var t = e.getBoundingClientRect(),
                        n = lt(t.width) / e.offsetWidth || 1,
                        i = lt(t.height) / e.offsetHeight || 1;
                    return 1 !== n || 1 !== i;
                }(t),
                s = mt(t),
                c = ft(e, a, n),
                l = {
                    scrollLeft: 0,
                    scrollTop: 0
                },
                u = {
                    x: 0,
                    y: 0
                };
            return (r || !r && !n) && (("body" !== ht(t) || bt(s)) && (l = (i = t) !== it(i) && rt(i) ? {
                scrollLeft: (o = i).scrollLeft,
                scrollTop: o.scrollTop
            } : pt(i)), rt(t) ? ((u = ft(t, !0)).x += t.clientLeft, u.y += t.clientTop) : s && (u.x = gt(s))), {
                x: c.left + l.scrollLeft - u.x,
                y: c.top + l.scrollTop - u.y,
                width: c.width,
                height: c.height
            };
        }

        function wt(e) {
            var t = ft(e),
                n = e.offsetWidth,
                i = e.offsetHeight;
            return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - i) <= 1 && (i = t.height), {
                x: e.offsetLeft,
                y: e.offsetTop,
                width: n,
                height: i
            };
        }

        function kt(e) {
            return "html" === ht(e) ? e : e.assignedSlot || e.parentNode || (at(e) ? e.host : null) || mt(e);
        }

        function xt(e) {
            return ["html", "body", "#document"].indexOf(ht(e)) >= 0 ? e.ownerDocument.body : rt(e) && bt(e) ? e : xt(kt(e));
        }

        function Ct(e, t) {
            var n;
            void 0 === t && (t = []);
            var i = xt(e),
                o = i === (null == (n = e.ownerDocument) ? void 0 : n.body),
                r = it(i),
                a = o ? [r].concat(r.visualViewport || [], bt(i) ? i : []) : i,
                s = t.concat(a);
            return o ? s : s.concat(Ct(kt(a)));
        }

        function _t(e) {
            return ["table", "td", "th"].indexOf(ht(e)) >= 0;
        }

        function Tt(e) {
            return rt(e) && "fixed" !== vt(e).position ? e.offsetParent : null;
        }

        function Ot(e) {
            for (var t = it(e), n = Tt(e); n && _t(n) && "static" === vt(n).position;) n = Tt(n);
            return n && ("html" === ht(n) || "body" === ht(n) && "static" === vt(n).position) ? t : n || function(e) {
                var t = /firefox/i.test(ut());
                if (/Trident/i.test(ut()) && rt(e) && "fixed" === vt(e).position) return null;
                var n = kt(e);
                for (at(n) && (n = n.host); rt(n) && ["html", "body"].indexOf(ht(n)) < 0;) {
                    var i = vt(n);
                    if ("none" !== i.transform || "none" !== i.perspective || "paint" === i.contain || -1 !== ["transform", "perspective"].indexOf(i.willChange) || t && "filter" === i.willChange || t && i.filter && "none" !== i.filter) return n;
                    n = n.parentNode;
                }
                return null;
            }(e) || t;
        }
        var St = "top",
            Et = "bottom",
            zt = "right",
            At = "left",
            It = "auto",
            Pt = [St, Et, zt, At],
            Mt = "start",
            Lt = "end",
            $t = "viewport",
            jt = "popper",
            Ht = Pt.reduce((function(e, t) {
                return e.concat([t + "-" + Mt, t + "-" + Lt]);
            }), []),
            Dt = [].concat(Pt, [It]).reduce((function(e, t) {
                return e.concat([t, t + "-" + Mt, t + "-" + Lt]);
            }), []),
            Rt = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];

        function Ft(e) {
            var t = new Map(),
                n = new Set(),
                i = [];

            function o(e) {
                n.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach((function(e) {
                    if (!n.has(e)) {
                        var i = t.get(e);
                        i && o(i);
                    }
                })), i.push(e);
            }
            return e.forEach((function(e) {
                t.set(e.name, e);
            })), e.forEach((function(e) {
                n.has(e.name) || o(e);
            })), i;
        }
        var Nt = {
            placement: "bottom",
            modifiers: [],
            strategy: "absolute"
        };

        function Bt() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            return !t.some((function(e) {
                return !(e && "function" == typeof e.getBoundingClientRect);
            }));
        }
        var Wt = {
            passive: !0
        };
        const qt = {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function() {},
            effect: function(e) {
                var t = e.state,
                    n = e.instance,
                    i = e.options,
                    o = i.scroll,
                    r = void 0 === o || o,
                    a = i.resize,
                    s = void 0 === a || a,
                    c = it(t.elements.popper),
                    l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
                return r && l.forEach((function(e) {
                        e.addEventListener("scroll", n.update, Wt);
                    })), s && c.addEventListener("resize", n.update, Wt),
                    function() {
                        r && l.forEach((function(e) {
                            e.removeEventListener("scroll", n.update, Wt);
                        })), s && c.removeEventListener("resize", n.update, Wt);
                    };
            },
            data: {}
        };

        function Ut(e) {
            return e.split("-")[0];
        }

        function Vt(e) {
            return e.split("-")[1];
        }

        function Yt(e) {
            return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
        }

        function Kt(e) {
            var t, n = e.reference,
                i = e.element,
                o = e.placement,
                r = o ? Ut(o) : null,
                a = o ? Vt(o) : null,
                s = n.x + n.width / 2 - i.width / 2,
                c = n.y + n.height / 2 - i.height / 2;
            switch (r) {
                case St:
                    t = {
                        x: s,
                        y: n.y - i.height
                    };
                    break;
                case Et:
                    t = {
                        x: s,
                        y: n.y + n.height
                    };
                    break;
                case zt:
                    t = {
                        x: n.x + n.width,
                        y: c
                    };
                    break;
                case At:
                    t = {
                        x: n.x - i.width,
                        y: c
                    };
                    break;
                default:
                    t = {
                        x: n.x,
                        y: n.y
                    };
            }
            var l = r ? Yt(r) : null;
            if (null != l) {
                var u = "y" === l ? "height" : "width";
                switch (a) {
                    case Mt:
                        t[l] = t[l] - (n[u] / 2 - i[u] / 2);
                        break;
                    case Lt:
                        t[l] = t[l] + (n[u] / 2 - i[u] / 2);
                }
            }
            return t;
        }
        var Gt = {
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        };

        function Xt(e) {
            var t, n = e.popper,
                i = e.popperRect,
                o = e.placement,
                r = e.variation,
                a = e.offsets,
                s = e.position,
                c = e.gpuAcceleration,
                l = e.adaptive,
                u = e.roundOffsets,
                d = e.isFixed,
                f = a.x,
                p = void 0 === f ? 0 : f,
                h = a.y,
                m = void 0 === h ? 0 : h,
                g = "function" == typeof u ? u({
                    x: p,
                    y: m
                }) : {
                    x: p,
                    y: m
                };
            p = g.x, m = g.y;
            var v = a.hasOwnProperty("x"),
                b = a.hasOwnProperty("y"),
                y = At,
                w = St,
                k = window;
            if (l) {
                var x = Ot(n),
                    C = "clientHeight",
                    _ = "clientWidth";
                x === it(n) && "static" !== vt(x = mt(n)).position && "absolute" === s && (C = "scrollHeight", _ = "scrollWidth"), (o === St || (o === At || o === zt) && r === Lt) && (w = Et, m -= (d && x === k && k.visualViewport ? k.visualViewport.height : x[C]) - i.height, m *= c ? 1 : -1), o !== At && (o !== St && o !== Et || r !== Lt) || (y = zt, p -= (d && x === k && k.visualViewport ? k.visualViewport.width : x[_]) - i.width, p *= c ? 1 : -1);
            }
            var T, O = Object.assign({
                    position: s
                }, l && Gt),
                S = !0 === u ? function(e, t) {
                    var n = e.x,
                        i = e.y,
                        o = t.devicePixelRatio || 1;
                    return {
                        x: lt(n * o) / o || 0,
                        y: lt(i * o) / o || 0
                    };
                }({
                    x: p,
                    y: m
                }, it(n)) : {
                    x: p,
                    y: m
                };
            return p = S.x, m = S.y, c ? Object.assign({}, O, ((T = {})[w] = b ? "0" : "", T[y] = v ? "0" : "", T.transform = (k.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + m + "px)" : "translate3d(" + p + "px, " + m + "px, 0)", T)) : Object.assign({}, O, ((t = {})[w] = b ? m + "px" : "", t[y] = v ? p + "px" : "", t.transform = "", t));
        }
        const Jt = {
                name: "computeStyles",
                enabled: !0,
                phase: "beforeWrite",
                fn: function(e) {
                    var t = e.state,
                        n = e.options,
                        i = n.gpuAcceleration,
                        o = void 0 === i || i,
                        r = n.adaptive,
                        a = void 0 === r || r,
                        s = n.roundOffsets,
                        c = void 0 === s || s,
                        l = {
                            placement: Ut(t.placement),
                            variation: Vt(t.placement),
                            popper: t.elements.popper,
                            popperRect: t.rects.popper,
                            gpuAcceleration: o,
                            isFixed: "fixed" === t.options.strategy
                        };
                    null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, Xt(Object.assign({}, l, {
                        offsets: t.modifiersData.popperOffsets,
                        position: t.options.strategy,
                        adaptive: a,
                        roundOffsets: c
                    })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, Xt(Object.assign({}, l, {
                        offsets: t.modifiersData.arrow,
                        position: "absolute",
                        adaptive: !1,
                        roundOffsets: c
                    })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
                        "data-popper-placement": t.placement
                    });
                },
                data: {}
            },
            Qt = {
                name: "applyStyles",
                enabled: !0,
                phase: "write",
                fn: function(e) {
                    var t = e.state;
                    Object.keys(t.elements).forEach((function(e) {
                        var n = t.styles[e] || {},
                            i = t.attributes[e] || {},
                            o = t.elements[e];
                        rt(o) && ht(o) && (Object.assign(o.style, n), Object.keys(i).forEach((function(e) {
                            var t = i[e];
                            !1 === t ? o.removeAttribute(e) : o.setAttribute(e, !0 === t ? "" : t);
                        })));
                    }));
                },
                effect: function(e) {
                    var t = e.state,
                        n = {
                            popper: {
                                position: t.options.strategy,
                                left: "0",
                                top: "0",
                                margin: "0"
                            },
                            arrow: {
                                position: "absolute"
                            },
                            reference: {}
                        };
                    return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
                        function() {
                            Object.keys(t.elements).forEach((function(e) {
                                var i = t.elements[e],
                                    o = t.attributes[e] || {},
                                    r = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce((function(e, t) {
                                        return e[t] = "", e;
                                    }), {});
                                rt(i) && ht(i) && (Object.assign(i.style, r), Object.keys(o).forEach((function(e) {
                                    i.removeAttribute(e);
                                })));
                            }));
                        };
                },
                requires: ["computeStyles"]
            },
            Zt = {
                name: "offset",
                enabled: !0,
                phase: "main",
                requires: ["popperOffsets"],
                fn: function(e) {
                    var t = e.state,
                        n = e.options,
                        i = e.name,
                        o = n.offset,
                        r = void 0 === o ? [0, 0] : o,
                        a = Dt.reduce((function(e, n) {
                            return e[n] = function(e, t, n) {
                                var i = Ut(e),
                                    o = [At, St].indexOf(i) >= 0 ? -1 : 1,
                                    r = "function" == typeof n ? n(Object.assign({}, t, {
                                        placement: e
                                    })) : n,
                                    a = r[0],
                                    s = r[1];
                                return a = a || 0, s = (s || 0) * o, [At, zt].indexOf(i) >= 0 ? {
                                    x: s,
                                    y: a
                                } : {
                                    x: a,
                                    y: s
                                };
                            }(n, t.rects, r), e;
                        }), {}),
                        s = a[t.placement],
                        c = s.x,
                        l = s.y;
                    null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += l), t.modifiersData[i] = a;
                }
            };
        var en = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };

        function tn(e) {
            return e.replace(/left|right|bottom|top/g, (function(e) {
                return en[e];
            }));
        }
        var nn = {
            start: "end",
            end: "start"
        };

        function on(e) {
            return e.replace(/start|end/g, (function(e) {
                return nn[e];
            }));
        }

        function rn(e, t) {
            var n = t.getRootNode && t.getRootNode();
            if (e.contains(t)) return !0;
            if (n && at(n)) {
                var i = t;
                do {
                    if (i && e.isSameNode(i)) return !0;
                    i = i.parentNode || i.host;
                } while (i);
            }
            return !1;
        }

        function an(e) {
            return Object.assign({}, e, {
                left: e.x,
                top: e.y,
                right: e.x + e.width,
                bottom: e.y + e.height
            });
        }

        function sn(e, t, n) {
            return t === $t ? an(function(e, t) {
                var n = it(e),
                    i = mt(e),
                    o = n.visualViewport,
                    r = i.clientWidth,
                    a = i.clientHeight,
                    s = 0,
                    c = 0;
                if (o) {
                    r = o.width, a = o.height;
                    var l = dt();
                    (l || !l && "fixed" === t) && (s = o.offsetLeft, c = o.offsetTop);
                }
                return {
                    width: r,
                    height: a,
                    x: s + gt(e),
                    y: c
                };
            }(e, n)) : ot(t) ? function(e, t) {
                var n = ft(e, !1, "fixed" === t);
                return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
            }(t, n) : an(function(e) {
                var t, n = mt(e),
                    i = pt(e),
                    o = null == (t = e.ownerDocument) ? void 0 : t.body,
                    r = st(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0),
                    a = st(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0),
                    s = -i.scrollLeft + gt(e),
                    c = -i.scrollTop;
                return "rtl" === vt(o || n).direction && (s += st(n.clientWidth, o ? o.clientWidth : 0) - r), {
                    width: r,
                    height: a,
                    x: s,
                    y: c
                };
            }(mt(e)));
        }

        function cn(e) {
            return Object.assign({}, {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }, e);
        }

        function ln(e, t) {
            return t.reduce((function(t, n) {
                return t[n] = e, t;
            }), {});
        }

        function un(e, t) {
            void 0 === t && (t = {});
            var n = t,
                i = n.placement,
                o = void 0 === i ? e.placement : i,
                r = n.strategy,
                a = void 0 === r ? e.strategy : r,
                s = n.boundary,
                c = void 0 === s ? "clippingParents" : s,
                l = n.rootBoundary,
                u = void 0 === l ? $t : l,
                d = n.elementContext,
                f = void 0 === d ? jt : d,
                p = n.altBoundary,
                h = void 0 !== p && p,
                m = n.padding,
                g = void 0 === m ? 0 : m,
                v = cn("number" != typeof g ? g : ln(g, Pt)),
                b = f === jt ? "reference" : jt,
                y = e.rects.popper,
                w = e.elements[h ? b : f],
                k = function(e, t, n, i) {
                    var o = "clippingParents" === t ? function(e) {
                            var t = Ct(kt(e)),
                                n = ["absolute", "fixed"].indexOf(vt(e).position) >= 0 && rt(e) ? Ot(e) : e;
                            return ot(n) ? t.filter((function(e) {
                                return ot(e) && rn(e, n) && "body" !== ht(e);
                            })) : [];
                        }(e) : [].concat(t),
                        r = [].concat(o, [n]),
                        a = r[0],
                        s = r.reduce((function(t, n) {
                            var o = sn(e, n, i);
                            return t.top = st(o.top, t.top), t.right = ct(o.right, t.right), t.bottom = ct(o.bottom, t.bottom), t.left = st(o.left, t.left), t;
                        }), sn(e, a, i));
                    return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
                }(ot(w) ? w : w.contextElement || mt(e.elements.popper), c, u, a),
                x = ft(e.elements.reference),
                C = Kt({
                    reference: x,
                    element: y,
                    strategy: "absolute",
                    placement: o
                }),
                _ = an(Object.assign({}, y, C)),
                T = f === jt ? _ : x,
                O = {
                    top: k.top - T.top + v.top,
                    bottom: T.bottom - k.bottom + v.bottom,
                    left: k.left - T.left + v.left,
                    right: T.right - k.right + v.right
                },
                S = e.modifiersData.offset;
            if (f === jt && S) {
                var E = S[o];
                Object.keys(O).forEach((function(e) {
                    var t = [zt, Et].indexOf(e) >= 0 ? 1 : -1,
                        n = [St, Et].indexOf(e) >= 0 ? "y" : "x";
                    O[e] += E[n] * t;
                }));
            }
            return O;
        }
        const dn = {
            name: "flip",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t = e.state,
                    n = e.options,
                    i = e.name;
                if (!t.modifiersData[i]._skip) {
                    for (var o = n.mainAxis, r = void 0 === o || o, a = n.altAxis, s = void 0 === a || a, c = n.fallbackPlacements, l = n.padding, u = n.boundary, d = n.rootBoundary, f = n.altBoundary, p = n.flipVariations, h = void 0 === p || p, m = n.allowedAutoPlacements, g = t.options.placement, v = Ut(g), b = c || (v !== g && h ? function(e) {
                            if (Ut(e) === It) return [];
                            var t = tn(e);
                            return [on(e), t, on(t)];
                        }(g) : [tn(g)]), y = [g].concat(b).reduce((function(e, n) {
                            return e.concat(Ut(n) === It ? function(e, t) {
                                void 0 === t && (t = {});
                                var n = t,
                                    i = n.placement,
                                    o = n.boundary,
                                    r = n.rootBoundary,
                                    a = n.padding,
                                    s = n.flipVariations,
                                    c = n.allowedAutoPlacements,
                                    l = void 0 === c ? Dt : c,
                                    u = Vt(i),
                                    d = u ? s ? Ht : Ht.filter((function(e) {
                                        return Vt(e) === u;
                                    })) : Pt,
                                    f = d.filter((function(e) {
                                        return l.indexOf(e) >= 0;
                                    }));
                                0 === f.length && (f = d);
                                var p = f.reduce((function(t, n) {
                                    return t[n] = un(e, {
                                        placement: n,
                                        boundary: o,
                                        rootBoundary: r,
                                        padding: a
                                    })[Ut(n)], t;
                                }), {});
                                return Object.keys(p).sort((function(e, t) {
                                    return p[e] - p[t];
                                }));
                            }(t, {
                                placement: n,
                                boundary: u,
                                rootBoundary: d,
                                padding: l,
                                flipVariations: h,
                                allowedAutoPlacements: m
                            }) : n);
                        }), []), w = t.rects.reference, k = t.rects.popper, x = new Map(), C = !0, _ = y[0], T = 0; T < y.length; T++) {
                        var O = y[T],
                            S = Ut(O),
                            E = Vt(O) === Mt,
                            z = [St, Et].indexOf(S) >= 0,
                            A = z ? "width" : "height",
                            I = un(t, {
                                placement: O,
                                boundary: u,
                                rootBoundary: d,
                                altBoundary: f,
                                padding: l
                            }),
                            P = z ? E ? zt : At : E ? Et : St;
                        w[A] > k[A] && (P = tn(P));
                        var M = tn(P),
                            L = [];
                        if (r && L.push(I[S] <= 0), s && L.push(I[P] <= 0, I[M] <= 0), L.every((function(e) {
                                return e;
                            }))) {
                            _ = O, C = !1;
                            break;
                        }
                        x.set(O, L);
                    }
                    if (C)
                        for (var $ = function(e) {
                                var t = y.find((function(t) {
                                    var n = x.get(t);
                                    if (n) return n.slice(0, e).every((function(e) {
                                        return e;
                                    }));
                                }));
                                if (t) return _ = t, "break";
                            }, j = h ? 3 : 1; j > 0 && "break" !== $(j); j--);
                    t.placement !== _ && (t.modifiersData[i]._skip = !0, t.placement = _, t.reset = !0);
                }
            },
            requiresIfExists: ["offset"],
            data: {
                _skip: !1
            }
        };

        function fn(e, t, n) {
            return st(e, ct(t, n));
        }
        const pn = {
                name: "preventOverflow",
                enabled: !0,
                phase: "main",
                fn: function(e) {
                    var t = e.state,
                        n = e.options,
                        i = e.name,
                        o = n.mainAxis,
                        r = void 0 === o || o,
                        a = n.altAxis,
                        s = void 0 !== a && a,
                        c = n.boundary,
                        l = n.rootBoundary,
                        u = n.altBoundary,
                        d = n.padding,
                        f = n.tether,
                        p = void 0 === f || f,
                        h = n.tetherOffset,
                        m = void 0 === h ? 0 : h,
                        g = un(t, {
                            boundary: c,
                            rootBoundary: l,
                            padding: d,
                            altBoundary: u
                        }),
                        v = Ut(t.placement),
                        b = Vt(t.placement),
                        y = !b,
                        w = Yt(v),
                        k = "x" === w ? "y" : "x",
                        x = t.modifiersData.popperOffsets,
                        C = t.rects.reference,
                        _ = t.rects.popper,
                        T = "function" == typeof m ? m(Object.assign({}, t.rects, {
                            placement: t.placement
                        })) : m,
                        O = "number" == typeof T ? {
                            mainAxis: T,
                            altAxis: T
                        } : Object.assign({
                            mainAxis: 0,
                            altAxis: 0
                        }, T),
                        S = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
                        E = {
                            x: 0,
                            y: 0
                        };
                    if (x) {
                        if (r) {
                            var z, A = "y" === w ? St : At,
                                I = "y" === w ? Et : zt,
                                P = "y" === w ? "height" : "width",
                                M = x[w],
                                L = M + g[A],
                                $ = M - g[I],
                                j = p ? -_[P] / 2 : 0,
                                H = b === Mt ? C[P] : _[P],
                                D = b === Mt ? -_[P] : -C[P],
                                R = t.elements.arrow,
                                F = p && R ? wt(R) : {
                                    width: 0,
                                    height: 0
                                },
                                N = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0
                                },
                                B = N[A],
                                W = N[I],
                                q = fn(0, C[P], F[P]),
                                U = y ? C[P] / 2 - j - q - B - O.mainAxis : H - q - B - O.mainAxis,
                                V = y ? -C[P] / 2 + j + q + W + O.mainAxis : D + q + W + O.mainAxis,
                                Y = t.elements.arrow && Ot(t.elements.arrow),
                                K = Y ? "y" === w ? Y.clientTop || 0 : Y.clientLeft || 0 : 0,
                                G = null != (z = null == S ? void 0 : S[w]) ? z : 0,
                                X = M + V - G,
                                J = fn(p ? ct(L, M + U - G - K) : L, M, p ? st($, X) : $);
                            x[w] = J, E[w] = J - M;
                        }
                        if (s) {
                            var Q, Z = "x" === w ? St : At,
                                ee = "x" === w ? Et : zt,
                                te = x[k],
                                ne = "y" === k ? "height" : "width",
                                ie = te + g[Z],
                                oe = te - g[ee],
                                re = -1 !== [St, At].indexOf(v),
                                ae = null != (Q = null == S ? void 0 : S[k]) ? Q : 0,
                                se = re ? ie : te - C[ne] - _[ne] - ae + O.altAxis,
                                ce = re ? te + C[ne] + _[ne] - ae - O.altAxis : oe,
                                le = p && re ? function(e, t, n) {
                                    var i = fn(e, t, n);
                                    return i > n ? n : i;
                                }(se, te, ce) : fn(p ? se : ie, te, p ? ce : oe);
                            x[k] = le, E[k] = le - te;
                        }
                        t.modifiersData[i] = E;
                    }
                },
                requiresIfExists: ["offset"]
            },
            hn = {
                name: "arrow",
                enabled: !0,
                phase: "main",
                fn: function(e) {
                    var t, n = e.state,
                        i = e.name,
                        o = e.options,
                        r = n.elements.arrow,
                        a = n.modifiersData.popperOffsets,
                        s = Ut(n.placement),
                        c = Yt(s),
                        l = [At, zt].indexOf(s) >= 0 ? "height" : "width";
                    if (r && a) {
                        var u = function(e, t) {
                                return cn("number" != typeof(e = "function" == typeof e ? e(Object.assign({}, t.rects, {
                                    placement: t.placement
                                })) : e) ? e : ln(e, Pt));
                            }(o.padding, n),
                            d = wt(r),
                            f = "y" === c ? St : At,
                            p = "y" === c ? Et : zt,
                            h = n.rects.reference[l] + n.rects.reference[c] - a[c] - n.rects.popper[l],
                            m = a[c] - n.rects.reference[c],
                            g = Ot(r),
                            v = g ? "y" === c ? g.clientHeight || 0 : g.clientWidth || 0 : 0,
                            b = h / 2 - m / 2,
                            y = u[f],
                            w = v - d[l] - u[p],
                            k = v / 2 - d[l] / 2 + b,
                            x = fn(y, k, w),
                            C = c;
                        n.modifiersData[i] = ((t = {})[C] = x, t.centerOffset = x - k, t);
                    }
                },
                effect: function(e) {
                    var t = e.state,
                        n = e.options.element,
                        i = void 0 === n ? "[data-popper-arrow]" : n;
                    null != i && ("string" != typeof i || (i = t.elements.popper.querySelector(i))) && rn(t.elements.popper, i) && (t.elements.arrow = i);
                },
                requires: ["popperOffsets"],
                requiresIfExists: ["preventOverflow"]
            };

        function mn(e, t, n) {
            return void 0 === n && (n = {
                x: 0,
                y: 0
            }), {
                top: e.top - t.height - n.y,
                right: e.right - t.width + n.x,
                bottom: e.bottom - t.height + n.y,
                left: e.left - t.width - n.x
            };
        }

        function gn(e) {
            return [St, zt, Et, At].some((function(t) {
                return e[t] >= 0;
            }));
        }
        var vn = function(e) {
                void 0 === e && (e = {});
                var t = e,
                    n = t.defaultModifiers,
                    i = void 0 === n ? [] : n,
                    o = t.defaultOptions,
                    r = void 0 === o ? Nt : o;
                return function(e, t, n) {
                    void 0 === n && (n = r);
                    var o, a, s = {
                            placement: "bottom",
                            orderedModifiers: [],
                            options: Object.assign({}, Nt, r),
                            modifiersData: {},
                            elements: {
                                reference: e,
                                popper: t
                            },
                            attributes: {},
                            styles: {}
                        },
                        c = [],
                        l = !1,
                        u = {
                            state: s,
                            setOptions: function(n) {
                                var o = "function" == typeof n ? n(s.options) : n;
                                d(), s.options = Object.assign({}, r, s.options, o), s.scrollParents = {
                                    reference: ot(e) ? Ct(e) : e.contextElement ? Ct(e.contextElement) : [],
                                    popper: Ct(t)
                                };
                                var a, l, f = function(e) {
                                    var t = Ft(e);
                                    return Rt.reduce((function(e, n) {
                                        return e.concat(t.filter((function(e) {
                                            return e.phase === n;
                                        })));
                                    }), []);
                                }((a = [].concat(i, s.options.modifiers), l = a.reduce((function(e, t) {
                                    var n = e[t.name];
                                    return e[t.name] = n ? Object.assign({}, n, t, {
                                        options: Object.assign({}, n.options, t.options),
                                        data: Object.assign({}, n.data, t.data)
                                    }) : t, e;
                                }), {}), Object.keys(l).map((function(e) {
                                    return l[e];
                                }))));
                                return s.orderedModifiers = f.filter((function(e) {
                                    return e.enabled;
                                })), s.orderedModifiers.forEach((function(e) {
                                    var t = e.name,
                                        n = e.options,
                                        i = void 0 === n ? {} : n,
                                        o = e.effect;
                                    if ("function" == typeof o) {
                                        var r = o({
                                            state: s,
                                            name: t,
                                            instance: u,
                                            options: i
                                        });
                                        c.push(r || function() {});
                                    }
                                })), u.update();
                            },
                            forceUpdate: function() {
                                if (!l) {
                                    var e = s.elements,
                                        t = e.reference,
                                        n = e.popper;
                                    if (Bt(t, n)) {
                                        s.rects = {
                                            reference: yt(t, Ot(n), "fixed" === s.options.strategy),
                                            popper: wt(n)
                                        }, s.reset = !1, s.placement = s.options.placement, s.orderedModifiers.forEach((function(e) {
                                            return s.modifiersData[e.name] = Object.assign({}, e.data);
                                        }));
                                        for (var i = 0; i < s.orderedModifiers.length; i++)
                                            if (!0 !== s.reset) {
                                                var o = s.orderedModifiers[i],
                                                    r = o.fn,
                                                    a = o.options,
                                                    c = void 0 === a ? {} : a,
                                                    d = o.name;
                                                "function" == typeof r && (s = r({
                                                    state: s,
                                                    options: c,
                                                    name: d,
                                                    instance: u
                                                }) || s);
                                            } else s.reset = !1, i = -1;
                                    }
                                }
                            },
                            update: (o = function() {
                                return new Promise((function(e) {
                                    u.forceUpdate(), e(s);
                                }));
                            }, function() {
                                return a || (a = new Promise((function(e) {
                                    Promise.resolve().then((function() {
                                        a = void 0, e(o());
                                    }));
                                }))), a;
                            }),
                            destroy: function() {
                                d(), l = !0;
                            }
                        };
                    if (!Bt(e, t)) return u;

                    function d() {
                        c.forEach((function(e) {
                            return e();
                        })), c = [];
                    }
                    return u.setOptions(n).then((function(e) {
                        !l && n.onFirstUpdate && n.onFirstUpdate(e);
                    })), u;
                };
            }({
                defaultModifiers: [qt, {
                    name: "popperOffsets",
                    enabled: !0,
                    phase: "read",
                    fn: function(e) {
                        var t = e.state,
                            n = e.name;
                        t.modifiersData[n] = Kt({
                            reference: t.rects.reference,
                            element: t.rects.popper,
                            strategy: "absolute",
                            placement: t.placement
                        });
                    },
                    data: {}
                }, Jt, Qt, Zt, dn, pn, hn, {
                    name: "hide",
                    enabled: !0,
                    phase: "main",
                    requiresIfExists: ["preventOverflow"],
                    fn: function(e) {
                        var t = e.state,
                            n = e.name,
                            i = t.rects.reference,
                            o = t.rects.popper,
                            r = t.modifiersData.preventOverflow,
                            a = un(t, {
                                elementContext: "reference"
                            }),
                            s = un(t, {
                                altBoundary: !0
                            }),
                            c = mn(a, i),
                            l = mn(s, o, r),
                            u = gn(c),
                            d = gn(l);
                        t.modifiersData[n] = {
                            referenceClippingOffsets: c,
                            popperEscapeOffsets: l,
                            isReferenceHidden: u,
                            hasPopperEscaped: d
                        }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
                            "data-popper-reference-hidden": u,
                            "data-popper-escaped": d
                        });
                    }
                }]
            }),
            bn = "tippy-content",
            yn = "tippy-arrow",
            wn = "tippy-svg-arrow",
            kn = {
                passive: !0,
                capture: !0
            },
            xn = function() {
                return document.body;
            };

        function Cn(e, t, n) {
            if (Array.isArray(e)) {
                var i = e[t];
                return null == i ? Array.isArray(n) ? n[t] : n : i;
            }
            return e;
        }

        function _n(e, t) {
            var n = {}.toString.call(e);
            return 0 === n.indexOf("[object") && n.indexOf(t + "]") > -1;
        }

        function Tn(e, t) {
            return "function" == typeof e ? e.apply(void 0, t) : e;
        }

        function On(e, t) {
            return 0 === t ? e : function(i) {
                clearTimeout(n), n = setTimeout((function() {
                    e(i);
                }), t);
            };
            var n;
        }

        function Sn(e) {
            return [].concat(e);
        }

        function En(e, t) {
            -1 === e.indexOf(t) && e.push(t);
        }

        function zn(e) {
            return [].slice.call(e);
        }

        function An(e) {
            return Object.keys(e).reduce((function(t, n) {
                return void 0 !== e[n] && (t[n] = e[n]), t;
            }), {});
        }

        function In() {
            return document.createElement("div");
        }

        function Pn(e) {
            return ["Element", "Fragment"].some((function(t) {
                return _n(e, t);
            }));
        }

        function Mn(e, t) {
            e.forEach((function(e) {
                e && (e.style.transitionDuration = t + "ms");
            }));
        }

        function Ln(e, t) {
            e.forEach((function(e) {
                e && e.setAttribute("data-state", t);
            }));
        }

        function $n(e, t, n) {
            var i = t + "EventListener";
            ["transitionend", "webkitTransitionEnd"].forEach((function(t) {
                e[i](t, n);
            }));
        }

        function jn(e, t) {
            for (var n = t; n;) {
                var i;
                if (e.contains(n)) return !0;
                n = null == n.getRootNode || null == (i = n.getRootNode()) ? void 0 : i.host;
            }
            return !1;
        }
        var Hn = {
                isTouch: !1
            },
            Dn = 0;

        function Rn() {
            Hn.isTouch || (Hn.isTouch = !0, window.performance && document.addEventListener("mousemove", Fn));
        }

        function Fn() {
            var e = performance.now();
            e - Dn < 20 && (Hn.isTouch = !1, document.removeEventListener("mousemove", Fn)), Dn = e;
        }

        function Nn() {
            var e, t = document.activeElement;
            if ((e = t) && e._tippy && e._tippy.reference === e) {
                var n = t._tippy;
                t.blur && !n.state.isVisible && t.blur();
            }
        }
        var Bn = !("undefined" == typeof window || "undefined" == typeof document || !window.msCrypto),
            Wn = Object.assign({
                appendTo: xn,
                aria: {
                    content: "auto",
                    expanded: "auto"
                },
                delay: 0,
                duration: [300, 250],
                getReferenceClientRect: null,
                hideOnClick: !0,
                ignoreAttributes: !1,
                interactive: !1,
                interactiveBorder: 2,
                interactiveDebounce: 0,
                moveTransition: "",
                offset: [0, 10],
                onAfterUpdate: function() {},
                onBeforeUpdate: function() {},
                onCreate: function() {},
                onDestroy: function() {},
                onHidden: function() {},
                onHide: function() {},
                onMount: function() {},
                onShow: function() {},
                onShown: function() {},
                onTrigger: function() {},
                onUntrigger: function() {},
                onClickOutside: function() {},
                placement: "top",
                plugins: [],
                popperOptions: {},
                render: null,
                showOnCreate: !1,
                touch: !0,
                trigger: "mouseenter focus",
                triggerTarget: null
            }, {
                animateFill: !1,
                followCursor: !1,
                inlinePositioning: !1,
                sticky: !1
            }, {
                allowHTML: !1,
                animation: "fade",
                arrow: !0,
                content: "",
                inertia: !1,
                maxWidth: 350,
                role: "tooltip",
                theme: "",
                zIndex: 9999
            }),
            qn = Object.keys(Wn);

        function Un(e) {
            var t = (e.plugins || []).reduce((function(t, n) {
                var i, o = n.name,
                    r = n.defaultValue;
                return o && (t[o] = void 0 !== e[o] ? e[o] : null != (i = Wn[o]) ? i : r), t;
            }), {});
            return Object.assign({}, e, t);
        }

        function Vn(e, t) {
            var n = Object.assign({}, t, {
                content: Tn(t.content, [e])
            }, t.ignoreAttributes ? {} : function(e, t) {
                return (t ? Object.keys(Un(Object.assign({}, Wn, {
                    plugins: t
                }))) : qn).reduce((function(t, n) {
                    var i = (e.getAttribute("data-tippy-" + n) || "").trim();
                    if (!i) return t;
                    if ("content" === n) t[n] = i;
                    else try {
                        t[n] = JSON.parse(i);
                    } catch (e) {
                        t[n] = i;
                    }
                    return t;
                }), {});
            }(e, t.plugins));
            return n.aria = Object.assign({}, Wn.aria, n.aria), n.aria = {
                expanded: "auto" === n.aria.expanded ? t.interactive : n.aria.expanded,
                content: "auto" === n.aria.content ? t.interactive ? null : "describedby" : n.aria.content
            }, n;
        }

        function Yn(e, t) {
            e.innerHTML = t;
        }

        function Kn(e) {
            var t = In();
            return !0 === e ? t.className = yn : (t.className = wn, Pn(e) ? t.appendChild(e) : Yn(t, e)), t;
        }

        function Gn(e, t) {
            Pn(t.content) ? (Yn(e, ""), e.appendChild(t.content)) : "function" != typeof t.content && (t.allowHTML ? Yn(e, t.content) : e.textContent = t.content);
        }

        function Xn(e) {
            var t = e.firstElementChild,
                n = zn(t.children);
            return {
                box: t,
                content: n.find((function(e) {
                    return e.classList.contains(bn);
                })),
                arrow: n.find((function(e) {
                    return e.classList.contains(yn) || e.classList.contains(wn);
                })),
                backdrop: n.find((function(e) {
                    return e.classList.contains("tippy-backdrop");
                }))
            };
        }

        function Jn(e) {
            var t = In(),
                n = In();
            n.className = "tippy-box", n.setAttribute("data-state", "hidden"), n.setAttribute("tabindex", "-1");
            var i = In();

            function o(n, i) {
                var o = Xn(t),
                    r = o.box,
                    a = o.content,
                    s = o.arrow;
                i.theme ? r.setAttribute("data-theme", i.theme) : r.removeAttribute("data-theme"), "string" == typeof i.animation ? r.setAttribute("data-animation", i.animation) : r.removeAttribute("data-animation"), i.inertia ? r.setAttribute("data-inertia", "") : r.removeAttribute("data-inertia"), r.style.maxWidth = "number" == typeof i.maxWidth ? i.maxWidth + "px" : i.maxWidth, i.role ? r.setAttribute("role", i.role) : r.removeAttribute("role"), n.content === i.content && n.allowHTML === i.allowHTML || Gn(a, e.props), i.arrow ? s ? n.arrow !== i.arrow && (r.removeChild(s), r.appendChild(Kn(i.arrow))) : r.appendChild(Kn(i.arrow)) : s && r.removeChild(s);
            }
            return i.className = bn, i.setAttribute("data-state", "hidden"), Gn(i, e.props), t.appendChild(n), n.appendChild(i), o(e.props, e.props), {
                popper: t,
                onUpdate: o
            };
        }
        Jn.$$tippy = !0;
        var Qn = 1,
            Zn = [],
            ei = [];

        function ti(e, t) {
            void 0 === t && (t = {});
            var n = Wn.plugins.concat(t.plugins || []);
            document.addEventListener("touchstart", Rn, kn), window.addEventListener("blur", Nn);
            var i, o = Object.assign({}, t, {
                    plugins: n
                }),
                r = (i = e, Pn(i) ? [i] : function(e) {
                    return _n(e, "NodeList");
                }(i) ? zn(i) : Array.isArray(i) ? i : zn(document.querySelectorAll(i))).reduce((function(e, t) {
                    var n = t && function(e, t) {
                        var n, i, o, r, a, s, c, l, u = Vn(e, Object.assign({}, Wn, Un(An(t)))),
                            d = !1,
                            f = !1,
                            p = !1,
                            h = !1,
                            m = [],
                            g = On(Y, u.interactiveDebounce),
                            v = Qn++,
                            b = (l = u.plugins).filter((function(e, t) {
                                return l.indexOf(e) === t;
                            })),
                            y = {
                                id: v,
                                reference: e,
                                popper: In(),
                                popperInstance: null,
                                props: u,
                                state: {
                                    isEnabled: !0,
                                    isVisible: !1,
                                    isDestroyed: !1,
                                    isMounted: !1,
                                    isShown: !1
                                },
                                plugins: b,
                                clearDelayTimeouts: function() {
                                    clearTimeout(n), clearTimeout(i), cancelAnimationFrame(o);
                                },
                                setProps: function(t) {
                                    if (!y.state.isDestroyed) {
                                        M("onBeforeUpdate", [y, t]), U();
                                        var n = y.props,
                                            i = Vn(e, Object.assign({}, n, An(t), {
                                                ignoreAttributes: !0
                                            }));
                                        y.props = i, q(), n.interactiveDebounce !== i.interactiveDebounce && (j(), g = On(Y, i.interactiveDebounce)), n.triggerTarget && !i.triggerTarget ? Sn(n.triggerTarget).forEach((function(e) {
                                            e.removeAttribute("aria-expanded");
                                        })) : i.triggerTarget && e.removeAttribute("aria-expanded"), $(), P(), x && x(n, i), y.popperInstance && (J(), Z().forEach((function(e) {
                                            requestAnimationFrame(e._tippy.popperInstance.forceUpdate);
                                        }))), M("onAfterUpdate", [y, t]);
                                    }
                                },
                                setContent: function(e) {
                                    y.setProps({
                                        content: e
                                    });
                                },
                                show: function() {
                                    var e = y.state.isVisible,
                                        t = y.state.isDestroyed,
                                        n = !y.state.isEnabled,
                                        i = Hn.isTouch && !y.props.touch,
                                        o = Cn(y.props.duration, 0, Wn.duration);
                                    if (!(e || t || n || i || E().hasAttribute("disabled") || (M("onShow", [y], !1), !1 === y.props.onShow(y)))) {
                                        if (y.state.isVisible = !0, S() && (k.style.visibility = "visible"), P(), F(), y.state.isMounted || (k.style.transition = "none"), S()) {
                                            var r = A();
                                            Mn([r.box, r.content], 0);
                                        }
                                        var a, c, l;
                                        s = function() {
                                            var e;
                                            if (y.state.isVisible && !h) {
                                                if (h = !0, k.offsetHeight, k.style.transition = y.props.moveTransition, S() && y.props.animation) {
                                                    var t = A(),
                                                        n = t.box,
                                                        i = t.content;
                                                    Mn([n, i], o), Ln([n, i], "visible");
                                                }
                                                L(), $(), En(ei, y), null == (e = y.popperInstance) || e.forceUpdate(), M("onMount", [y]), y.props.animation && S() && function(e) {
                                                    B(e, (function() {
                                                        y.state.isShown = !0, M("onShown", [y]);
                                                    }));
                                                }(o);
                                            }
                                        }, c = y.props.appendTo, l = E(), (a = y.props.interactive && c === xn || "parent" === c ? l.parentNode : Tn(c, [l])).contains(k) || a.appendChild(k), y.state.isMounted = !0, J();
                                    }
                                },
                                hide: function() {
                                    var e = !y.state.isVisible,
                                        t = y.state.isDestroyed,
                                        n = !y.state.isEnabled,
                                        i = Cn(y.props.duration, 1, Wn.duration);
                                    if (!(e || t || n) && (M("onHide", [y], !1), !1 !== y.props.onHide(y))) {
                                        if (y.state.isVisible = !1, y.state.isShown = !1, h = !1, d = !1, S() && (k.style.visibility = "hidden"), j(), N(), P(!0), S()) {
                                            var o = A(),
                                                r = o.box,
                                                a = o.content;
                                            y.props.animation && (Mn([r, a], i), Ln([r, a], "hidden"));
                                        }
                                        L(), $(), y.props.animation ? S() && function(e, t) {
                                            B(e, (function() {
                                                !y.state.isVisible && k.parentNode && k.parentNode.contains(k) && t();
                                            }));
                                        }(i, y.unmount) : y.unmount();
                                    }
                                },
                                hideWithInteractivity: function(e) {
                                    z().addEventListener("mousemove", g), En(Zn, g), g(e);
                                },
                                enable: function() {
                                    y.state.isEnabled = !0;
                                },
                                disable: function() {
                                    y.hide(), y.state.isEnabled = !1;
                                },
                                unmount: function() {
                                    y.state.isVisible && y.hide(), y.state.isMounted && (Q(), Z().forEach((function(e) {
                                        e._tippy.unmount();
                                    })), k.parentNode && k.parentNode.removeChild(k), ei = ei.filter((function(e) {
                                        return e !== y;
                                    })), y.state.isMounted = !1, M("onHidden", [y]));
                                },
                                destroy: function() {
                                    y.state.isDestroyed || (y.clearDelayTimeouts(), y.unmount(), U(), delete e._tippy, y.state.isDestroyed = !0, M("onDestroy", [y]));
                                }
                            };
                        if (!u.render) return y;
                        var w = u.render(y),
                            k = w.popper,
                            x = w.onUpdate;
                        k.setAttribute("data-tippy-root", ""), k.id = "tippy-" + y.id, y.popper = k, e._tippy = y, k._tippy = y;
                        var C = b.map((function(e) {
                                return e.fn(y);
                            })),
                            _ = e.hasAttribute("aria-expanded");
                        return q(), $(), P(), M("onCreate", [y]), u.showOnCreate && ee(), k.addEventListener("mouseenter", (function() {
                            y.props.interactive && y.state.isVisible && y.clearDelayTimeouts();
                        })), k.addEventListener("mouseleave", (function() {
                            y.props.interactive && y.props.trigger.indexOf("mouseenter") >= 0 && z().addEventListener("mousemove", g);
                        })), y;

                        function T() {
                            var e = y.props.touch;
                            return Array.isArray(e) ? e : [e, 0];
                        }

                        function O() {
                            return "hold" === T()[0];
                        }

                        function S() {
                            var e;
                            return !(null == (e = y.props.render) || !e.$$tippy);
                        }

                        function E() {
                            return c || e;
                        }

                        function z() {
                            var e, t, n = E().parentNode;
                            return n && null != (t = Sn(n)[0]) && null != (e = t.ownerDocument) && e.body ? t.ownerDocument : document;
                        }

                        function A() {
                            return Xn(k);
                        }

                        function I(e) {
                            return y.state.isMounted && !y.state.isVisible || Hn.isTouch || r && "focus" === r.type ? 0 : Cn(y.props.delay, e ? 0 : 1, Wn.delay);
                        }

                        function P(e) {
                            void 0 === e && (e = !1), k.style.pointerEvents = y.props.interactive && !e ? "" : "none", k.style.zIndex = "" + y.props.zIndex;
                        }

                        function M(e, t, n) {
                            var i;
                            void 0 === n && (n = !0), C.forEach((function(n) {
                                n[e] && n[e].apply(n, t);
                            })), n && (i = y.props)[e].apply(i, t);
                        }

                        function L() {
                            var t = y.props.aria;
                            if (t.content) {
                                var n = "aria-" + t.content,
                                    i = k.id;
                                Sn(y.props.triggerTarget || e).forEach((function(e) {
                                    var t = e.getAttribute(n);
                                    if (y.state.isVisible) e.setAttribute(n, t ? t + " " + i : i);
                                    else {
                                        var o = t && t.replace(i, "").trim();
                                        o ? e.setAttribute(n, o) : e.removeAttribute(n);
                                    }
                                }));
                            }
                        }

                        function $() {
                            !_ && y.props.aria.expanded && Sn(y.props.triggerTarget || e).forEach((function(e) {
                                y.props.interactive ? e.setAttribute("aria-expanded", y.state.isVisible && e === E() ? "true" : "false") : e.removeAttribute("aria-expanded");
                            }));
                        }

                        function j() {
                            z().removeEventListener("mousemove", g), Zn = Zn.filter((function(e) {
                                return e !== g;
                            }));
                        }

                        function H(t) {
                            if (!Hn.isTouch || !p && "mousedown" !== t.type) {
                                var n = t.composedPath && t.composedPath()[0] || t.target;
                                if (!y.props.interactive || !jn(k, n)) {
                                    if (Sn(y.props.triggerTarget || e).some((function(e) {
                                            return jn(e, n);
                                        }))) {
                                        if (Hn.isTouch) return;
                                        if (y.state.isVisible && y.props.trigger.indexOf("click") >= 0) return;
                                    } else M("onClickOutside", [y, t]);
                                    !0 === y.props.hideOnClick && (y.clearDelayTimeouts(), y.hide(), f = !0, setTimeout((function() {
                                        f = !1;
                                    })), y.state.isMounted || N());
                                }
                            }
                        }

                        function D() {
                            p = !0;
                        }

                        function R() {
                            p = !1;
                        }

                        function F() {
                            var e = z();
                            e.addEventListener("mousedown", H, !0), e.addEventListener("touchend", H, kn), e.addEventListener("touchstart", R, kn), e.addEventListener("touchmove", D, kn);
                        }

                        function N() {
                            var e = z();
                            e.removeEventListener("mousedown", H, !0), e.removeEventListener("touchend", H, kn), e.removeEventListener("touchstart", R, kn), e.removeEventListener("touchmove", D, kn);
                        }

                        function B(e, t) {
                            var n = A().box;

                            function i(e) {
                                e.target === n && ($n(n, "remove", i), t());
                            }
                            if (0 === e) return t();
                            $n(n, "remove", a), $n(n, "add", i), a = i;
                        }

                        function W(t, n, i) {
                            void 0 === i && (i = !1), Sn(y.props.triggerTarget || e).forEach((function(e) {
                                e.addEventListener(t, n, i), m.push({
                                    node: e,
                                    eventType: t,
                                    handler: n,
                                    options: i
                                });
                            }));
                        }

                        function q() {
                            var e;
                            O() && (W("touchstart", V, {
                                passive: !0
                            }), W("touchend", K, {
                                passive: !0
                            })), (e = y.props.trigger, e.split(/\s+/).filter(Boolean)).forEach((function(e) {
                                if ("manual" !== e) switch (W(e, V), e) {
                                    case "mouseenter":
                                        W("mouseleave", K);
                                        break;
                                    case "focus":
                                        W(Bn ? "focusout" : "blur", G);
                                        break;
                                    case "focusin":
                                        W("focusout", G);
                                }
                            }));
                        }

                        function U() {
                            m.forEach((function(e) {
                                var t = e.node,
                                    n = e.eventType,
                                    i = e.handler,
                                    o = e.options;
                                t.removeEventListener(n, i, o);
                            })), m = [];
                        }

                        function V(e) {
                            var t, n = !1;
                            if (y.state.isEnabled && !X(e) && !f) {
                                var i = "focus" === (null == (t = r) ? void 0 : t.type);
                                r = e, c = e.currentTarget, $(), !y.state.isVisible && _n(e, "MouseEvent") && Zn.forEach((function(t) {
                                    return t(e);
                                })), "click" === e.type && (y.props.trigger.indexOf("mouseenter") < 0 || d) && !1 !== y.props.hideOnClick && y.state.isVisible ? n = !0 : ee(e), "click" === e.type && (d = !n), n && !i && te(e);
                            }
                        }

                        function Y(e) {
                            var t = e.target,
                                n = E().contains(t) || k.contains(t);
                            if ("mousemove" !== e.type || !n) {
                                var i = Z().concat(k).map((function(e) {
                                    var t, n = null == (t = e._tippy.popperInstance) ? void 0 : t.state;
                                    return n ? {
                                        popperRect: e.getBoundingClientRect(),
                                        popperState: n,
                                        props: u
                                    } : null;
                                })).filter(Boolean);
                                (function(e, t) {
                                    var n = t.clientX,
                                        i = t.clientY;
                                    return e.every((function(e) {
                                        var t = e.popperRect,
                                            o = e.popperState,
                                            r = e.props.interactiveBorder,
                                            a = o.placement.split("-")[0],
                                            s = o.modifiersData.offset;
                                        if (!s) return !0;
                                        var c = "bottom" === a ? s.top.y : 0,
                                            l = "top" === a ? s.bottom.y : 0,
                                            u = "right" === a ? s.left.x : 0,
                                            d = "left" === a ? s.right.x : 0,
                                            f = t.top - i + c > r,
                                            p = i - t.bottom - l > r,
                                            h = t.left - n + u > r,
                                            m = n - t.right - d > r;
                                        return f || p || h || m;
                                    }));
                                })(i, e) && (j(), te(e));
                            }
                        }

                        function K(e) {
                            X(e) || y.props.trigger.indexOf("click") >= 0 && d || (y.props.interactive ? y.hideWithInteractivity(e) : te(e));
                        }

                        function G(e) {
                            y.props.trigger.indexOf("focusin") < 0 && e.target !== E() || y.props.interactive && e.relatedTarget && k.contains(e.relatedTarget) || te(e);
                        }

                        function X(e) {
                            return !!Hn.isTouch && O() !== e.type.indexOf("touch") >= 0;
                        }

                        function J() {
                            Q();
                            var t = y.props,
                                n = t.popperOptions,
                                i = t.placement,
                                o = t.offset,
                                r = t.getReferenceClientRect,
                                a = t.moveTransition,
                                c = S() ? Xn(k).arrow : null,
                                l = r ? {
                                    getBoundingClientRect: r,
                                    contextElement: r.contextElement || E()
                                } : e,
                                u = [{
                                    name: "offset",
                                    options: {
                                        offset: o
                                    }
                                }, {
                                    name: "preventOverflow",
                                    options: {
                                        padding: {
                                            top: 2,
                                            bottom: 2,
                                            left: 5,
                                            right: 5
                                        }
                                    }
                                }, {
                                    name: "flip",
                                    options: {
                                        padding: 5
                                    }
                                }, {
                                    name: "computeStyles",
                                    options: {
                                        adaptive: !a
                                    }
                                }, {
                                    name: "$$tippy",
                                    enabled: !0,
                                    phase: "beforeWrite",
                                    requires: ["computeStyles"],
                                    fn: function(e) {
                                        var t = e.state;
                                        if (S()) {
                                            var n = A().box;
                                            ["placement", "reference-hidden", "escaped"].forEach((function(e) {
                                                "placement" === e ? n.setAttribute("data-placement", t.placement) : t.attributes.popper["data-popper-" + e] ? n.setAttribute("data-" + e, "") : n.removeAttribute("data-" + e);
                                            })), t.attributes.popper = {};
                                        }
                                    }
                                }];
                            S() && c && u.push({
                                name: "arrow",
                                options: {
                                    element: c,
                                    padding: 3
                                }
                            }), u.push.apply(u, (null == n ? void 0 : n.modifiers) || []), y.popperInstance = vn(l, k, Object.assign({}, n, {
                                placement: i,
                                onFirstUpdate: s,
                                modifiers: u
                            }));
                        }

                        function Q() {
                            y.popperInstance && (y.popperInstance.destroy(), y.popperInstance = null);
                        }

                        function Z() {
                            return zn(k.querySelectorAll("[data-tippy-root]"));
                        }

                        function ee(e) {
                            y.clearDelayTimeouts(), e && M("onTrigger", [y, e]), F();
                            var t = I(!0),
                                i = T(),
                                o = i[0],
                                r = i[1];
                            Hn.isTouch && "hold" === o && r && (t = r), t ? n = setTimeout((function() {
                                y.show();
                            }), t) : y.show();
                        }

                        function te(e) {
                            if (y.clearDelayTimeouts(), M("onUntrigger", [y, e]), y.state.isVisible) {
                                if (!(y.props.trigger.indexOf("mouseenter") >= 0 && y.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(e.type) >= 0 && d)) {
                                    var t = I(!1);
                                    t ? i = setTimeout((function() {
                                        y.state.isVisible && y.hide();
                                    }), t) : o = requestAnimationFrame((function() {
                                        y.hide();
                                    }));
                                }
                            } else N();
                        }
                    }(t, o);
                    return n && e.push(n), e;
                }), []);
            return Pn(e) ? r[0] : r;
        }
        ti.defaultProps = Wn, ti.setDefaultProps = function(e) {
            Object.keys(e).forEach((function(t) {
                Wn[t] = e[t];
            }));
        }, ti.currentInput = Hn, Object.assign({}, Qt, {
            effect: function(e) {
                var t = e.state,
                    n = {
                        popper: {
                            position: t.options.strategy,
                            left: "0",
                            top: "0",
                            margin: "0"
                        },
                        arrow: {
                            position: "absolute"
                        },
                        reference: {}
                    };
                Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow);
            }
        }), ti.setDefaultProps({
            render: Jn
        });
        const ni = ti;
        var ii = n(72),
            oi = n.n(ii),
            ri = n(825),
            ai = n.n(ri),
            si = n(659),
            ci = n.n(si),
            li = n(56),
            ui = n.n(li),
            di = n(540),
            fi = n.n(di),
            pi = n(113),
            hi = n.n(pi),
            mi = n(2),
            gi = {};
        gi.styleTagTransform = hi(), gi.setAttributes = ui(), gi.insert = ci().bind(null, "head"), gi.domAPI = ai(), gi.insertStyleElement = fi(), oi()(mi.A, gi), mi.A && mi.A.locals && mi.A.locals;
        var vi = n(243),
            bi = {};
        bi.styleTagTransform = hi(), bi.setAttributes = ui(), bi.insert = ci().bind(null, "head"), bi.domAPI = ai(), bi.insertStyleElement = fi(), oi()(vi.A, bi), vi.A && vi.A.locals && vi.A.locals, ni(".region-switcher-active-region a", {
                content: function(e) {
                    var t = document.querySelector(".region-switcher-list-wrapper");
                    if (t) return t.innerHTML;
                },
                trigger: "click",
                arrow: !0,
                interactive: !0,
                theme: "cvent",
                distance: 15,
                allowHTML: !0,
                animation: "scale",
                duration: [300, 200],
                easing: "ease-out"
            }), t()(".region-switcher-active-region a").on("click", (function(e) {
                e.preventDefault();
            })),
            function(e) {
                e.isScrollToFixed = function(t) {
                    return !!e(t).data("ScrollToFixed");
                }, e.ScrollToFixed = function(t, n) {
                    var i = this;
                    i.$el = e(t), i.el = t, i.$el.data("ScrollToFixed", i);
                    var o, r, a, s, c = !1,
                        l = i.$el,
                        u = 0,
                        d = 0,
                        f = -1,
                        p = -1,
                        h = null;

                    function m() {
                        var e = i.options.limit;
                        return e ? "function" == typeof e ? e.apply(l) : e : 0;
                    }

                    function g() {
                        return "fixed" === o;
                    }

                    function v() {
                        return "absolute" === o;
                    }

                    function b() {
                        return !(g() || v());
                    }

                    function y() {
                        if (!g()) {
                            var e = l[0].getBoundingClientRect();
                            h.css({
                                display: l.css("display"),
                                width: e.width,
                                height: e.height,
                                float: l.css("float")
                            });
                            var t = {
                                "z-index": i.options.zIndex,
                                position: "fixed",
                                top: -1 == i.options.bottom ? C() + 60 : "",
                                bottom: -1 == i.options.bottom ? "" : i.options.bottom,
                                "margin-left": "0px"
                            };
                            i.options.dontSetWidth || (t.width = l.css("width")), l.css(t), l.addClass(i.options.baseClassName), i.options.className && l.addClass(i.options.className), o = "fixed";
                        }
                    }

                    function w() {
                        var e = m(),
                            t = d;
                        i.options.removeOffsets && (t = "", e -= u);
                        var n = {
                            position: "absolute",
                            top: e + 60,
                            left: t,
                            "margin-left": "0px",
                            bottom: ""
                        };
                        i.options.dontSetWidth || (n.width = l.css("width")), l.css(n), o = "absolute";
                    }

                    function k() {
                        b() || (p = -1, h.css("display", "none"), l.css({
                            "z-index": s,
                            width: "",
                            position: r,
                            left: "",
                            top: a,
                            "margin-left": ""
                        }), l.removeClass(i.options.baseClassName), i.options.className && l.removeClass(i.options.className), o = null);
                    }

                    function x(e) {
                        e != p && (l.css("left", d - e), p = e);
                    }

                    function C() {
                        var e = i.options.marginTop;
                        return e ? "function" == typeof e ? e.apply(l) : e : 0;
                    }

                    function _() {
                        if (e.isScrollToFixed(l) && !l.is(":hidden")) {
                            var t = c,
                                n = b();
                            c ? b() && (u = l.offset().top, d = l.offset().left) : (l.trigger("preUnfixed.ScrollToFixed"), k(), l.trigger("unfixed.ScrollToFixed"), p = -1, u = l.offset().top, d = l.offset().left, i.options.offsets && (d += l.offset().left - l.position().left), -1 == f && (f = d), o = l.css("position"), c = !0, -1 != i.options.bottom && (l.trigger("preFixed.ScrollToFixed"), y(), l.trigger("fixed.ScrollToFixed")));
                            var a = e(window).scrollLeft(),
                                s = e(window).scrollTop(),
                                h = m();
                            i.options.minWidth && e(window).width() < i.options.minWidth || i.options.maxWidth && e(window).width() > i.options.maxWidth ? b() && t || (T(), l.trigger("preUnfixed.ScrollToFixed"), k(), l.trigger("unfixed.ScrollToFixed")) : -1 == i.options.bottom ? h > 0 && s >= h - C() ? n || v() && t || (T(), l.trigger("preAbsolute.ScrollToFixed"), w(), l.trigger("unfixed.ScrollToFixed")) : s >= u - (C() + 60) ? (g() && t || (T(), l.trigger("preFixed.ScrollToFixed"), y(), p = -1, l.trigger("fixed.ScrollToFixed")), x(a)) : b() && t || (T(), l.trigger("preUnfixed.ScrollToFixed"), k(), l.trigger("unfixed.ScrollToFixed")) : h > 0 ? s + e(window).height() - l.outerHeight(!0) >= h - (C() || -(i.options.bottom ? i.options.bottom : 0)) ? g() && (T(), l.trigger("preUnfixed.ScrollToFixed"), "absolute" === r ? w() : k(), l.trigger("unfixed.ScrollToFixed")) : (g() || (T(), l.trigger("preFixed.ScrollToFixed"), y()), x(a), l.trigger("fixed.ScrollToFixed")) : x(a);
                        }
                    }

                    function T() {
                        var e = l.css("position");
                        "absolute" == e ? l.trigger("postAbsolute.ScrollToFixed") : "fixed" == e ? l.trigger("postFixed.ScrollToFixed") : l.trigger("postUnfixed.ScrollToFixed");
                    }
                    var O = function(e) {
                            l.is(":visible") ? (c = !1, _()) : k();
                        },
                        S = function(e) {
                            window.requestAnimationFrame ? requestAnimationFrame(_) : _();
                        };
                    i.init = function() {
                        i.options = e.extend({}, e.ScrollToFixed.defaultOptions, n), s = l.css("z-index"), i.$el.css("z-index", i.options.zIndex), h = e("<div />"), o = l.css("position"), r = l.css("position"), l.css("float"), a = l.css("top"), b() && i.$el.after(h), e(window).bind("resize.ScrollToFixed", O), e(window).bind("scroll.ScrollToFixed", S), "ontouchmove" in window && e(window).bind("touchmove.ScrollToFixed", _), i.options.preFixed && l.bind("preFixed.ScrollToFixed", i.options.preFixed), i.options.postFixed && l.bind("postFixed.ScrollToFixed", i.options.postFixed), i.options.preUnfixed && l.bind("preUnfixed.ScrollToFixed", i.options.preUnfixed), i.options.postUnfixed && l.bind("postUnfixed.ScrollToFixed", i.options.postUnfixed), i.options.preAbsolute && l.bind("preAbsolute.ScrollToFixed", i.options.preAbsolute), i.options.postAbsolute && l.bind("postAbsolute.ScrollToFixed", i.options.postAbsolute), i.options.fixed && l.bind("fixed.ScrollToFixed", i.options.fixed), i.options.unfixed && l.bind("unfixed.ScrollToFixed", i.options.unfixed), i.options.spacerClass && h.addClass(i.options.spacerClass), l.bind("resize.ScrollToFixed", (function() {
                            h.height(l.height());
                        })), l.bind("scroll.ScrollToFixed", (function() {
                            l.trigger("preUnfixed.ScrollToFixed"), k(), l.trigger("unfixed.ScrollToFixed"), _();
                        })), l.bind("detach.ScrollToFixed", (function(t) {
                            var n;
                            (n = (n = t) || window.event).preventDefault && n.preventDefault(), n.returnValue = !1, l.trigger("preUnfixed.ScrollToFixed"), k(), l.trigger("unfixed.ScrollToFixed"), e(window).unbind("resize.ScrollToFixed", O), e(window).unbind("scroll.ScrollToFixed", S), l.unbind(".ScrollToFixed"), h.remove(), i.$el.removeData("ScrollToFixed");
                        })), O();
                    }, i.init();
                }, e.ScrollToFixed.defaultOptions = {
                    marginTop: 0,
                    limit: 0,
                    bottom: -1,
                    zIndex: 1e3,
                    baseClassName: "scroll-to-fixed-fixed"
                }, e.fn.scrollToFixed = function(t) {
                    return this.each((function() {
                        new e.ScrollToFixed(this, t);
                    }));
                }, e(window).on("resize", (function() {
                    e(window).width() > 480 && e(".mktoHasWidth").css("width", "100%");
                }));
            }(n(669));
        var yi = n(669);
        t().urlParam = function(e) {
            var t = new RegExp("[?&]" + e + "=([^&#]*)").exec(window.location.href);
            return null == t ? null : decodeURI(t[1]) || 0;
        }, t()((function() {
            var e = t().urlParam("dlink");
            if (void 0 !== e && null != e && "" != e) {
                var n = decodeURIComponent(e);
                t()(".paragraph--type--link-default .field--name-field-link").find("a").attr("href", n);
            }
        })), t()((function() {
            var e = t().urlParam("type");
            void 0 !== e && null != e && "" != e && t()("#cvent_mrkto_partnership_type")[0] && (t()("#cvent_mrkto_partnership_type").val(e).change(), t()("#cvent_mrkto_contact_us_product_selection").val(e));
        })), t()((function() {
            t()(".simple-content-block").on("click", (function() {
                var e = t()(this).find("a").attr("href");
                void 0 !== e && null != e && "" != e && (window.location = e);
            }));
        })), t()((function() {
            var e = t().urlParam("partner");
            void 0 !== e && null != e && "" != e && t()(".paragraph--type--link-default .field--name-field-link,.paragraph--type--simple-card .simple-card").find("a").each((function() {
                var n = t()(this).attr("href");
                n.indexOf("content-share-program") > 0 && (n.indexOf("?") > 0 ? t()(this).attr("href", n + "&partner=" + e) : t()(this).attr("href", n + "?partner=" + e));
            }));
        })), t()((function() {
            var e = t().urlParam("gclid");
            void 0 !== e && null != e && "" != e && t()("#cvent_mrkto_gclid").attr("value", e);
        })), t()((function() {
            t()("[data-popup-open]").on("click", (function(e) {
                var n = yi(this).attr("data-popup-open");
                t()('[data-popup="' + n + '"]').fadeIn(350), t()(".add-cover").addClass("popup-cover"), e.preventDefault();
            })), t()("[data-popup-close]").on("click", (function(e) {
                var n = yi(this).attr("data-popup-close");
                t()('[data-popup="' + n + '"]').fadeOut(350), t()(".add-cover").removeClass("popup-cover"), e.preventDefault();
            }));
        })), t()((function() {
            t()(".form-modal").on("click", (function(e) {
                e.preventDefault();
                var n = t()(".marketo-form-wrapper").height();
                t()(".page-form-spacer").height(n), t()(".paragraph--type--cvent-marketo-form").addClass("active"), t()(".paragraph--type--cvent-marketo-form").append('<div id="close_m_btn" class="close_m_btn"></div>'), t()(".paragraph--type--cvent-marketo-form").after('<div class="form-modal--overlay"></div>'), t()("body").addClass("form-open");
            })), t()(document).on("click touchend", ".close_m_btn", (function(e) {
                e.preventDefault(), t()(".paragraph--type--cvent-marketo-form").removeClass("active"), t()(".page-form–spacer").removeClass("active"), t()(".marketo-form-wrapper").height("auto"), t()(".form-modal--overlay").remove(), t()("body").removeClass("form-open"), t()("#close_m_btn").remove(), t()(".field-p-sidebar-item-marketo-form").length && t()(".field-p-sidebar-item-marketo-form").hide();
            })), t()(document).mouseup((function(e) {
                var n = t()(".marketo-form-wrapper");
                n.is(e.target) || 0 !== n.has(e.target).length || (t()(".paragraph--type--cvent-marketo-form").removeClass("active"), t()(".page-form–spacer").removeClass("active"), t()(".marketo-form-wrapper").height("auto"), t()(".form-modal--overlay").remove(), t()("body").removeClass("form-open"), t()("#close_m_btn").remove(), t()(".field-p-sidebar-item-marketo-form").length && t()(".field-p-sidebar-item-marketo-form").hide());
            })), t()(document).keyup((function(e) {
                "Escape" === e.key && (t()(".paragraph--type--cvent-marketo-form").removeClass("active"), t()(".page-form–spacer").removeClass("active"), t()(".marketo-form-wrapper").height("auto"), t()(".form-modal--overlay").remove(), t()("body").removeClass("form-open"), t()("#close_m_btn").remove(), t()(".field-p-sidebar-item-marketo-form").length && t()(".field-p-sidebar-item-marketo-form").hide());
            }));
        })), t()((function() {
            t()(".product-cards .paragraph--type--layout-solution-links a").matchHeight({
                byRow: !0
            }), t()(".solution-links .paragraph--type--layout-solution-links a").matchHeight({
                byRow: !0
            });
        })), t()((function() {
            var e, n = 0,
                i = t()("header");
            t()(window).scroll((function() {
                var o = t()(window).scrollTop(),
                    r = i.height();
                e < (n = o) && o > r + r ? i.addClass("scrollUp") : e > n && !(o <= r) && i.removeClass("scrollUp"), e = n;
            }));
        })), t()((function() {
            var e, n = 0,
                i = t()(".secondary-nav-cta-scroll");
            t()(window).scroll((function() {
                var o = t()(window).scrollTop(),
                    r = i.height();
                e < (n = o) && o > r + r ? i.addClass("scrollUp") : e > n && !(o <= r) && i.removeClass("scrollUp"), e = n;
            }));
        })), t()(document).ready((function() {
            setTimeout((function() {
                t()(this).width() >= 1080 ? t()(".resource__scroll").scrollToFixed({
                    limit: function() {
                        return t()(".node--type-resource").innerHeight() - t()(".resource__sidebar").innerHeight() + t()(".region-header").innerHeight() + t()(".region-header-top").innerHeight();
                    },
                    zIndex: 300,
                    marginTop: 20,
                    removeOffsets: !0
                }) : t()(".resource__scroll").trigger("detach.ScrollToFixed");
            }), 2e3), t()(".resource__form-default--button").click((function() {
                t()(this).toggleClass("active"), t()(".resource__form-default").toggleClass("active"), t()(".resource__form-default--button span").toggleClass("inactive");
            })), t()(".resource__form-ty--button").click((function() {
                t()(".resource__form-ty").toggle(), t()(".resource__form-ty--button span").toggleClass("inactive");
            })), t()(".resource__filter-toggle-button").click((function() {
                t()(".resource__filters").addClass("active");
            })), t()(".resource__filter-close").click((function() {
                t()(".resource__filters").removeClass("active");
            }));
        })), t()(document).ajaxComplete((function() {
            t()(".resource__filter-toggle-button").click((function() {
                t()(".resource__filters").addClass("active");
            })), t()(".resource__filter-close").click((function() {
                t()(".resource__filters").removeClass("active");
            }));
        })), t()(document).ajaxStop((function() {
            t()(".resource-text-filter .form-text").val() ? t()(".resource-text-filter-wrap").show() : t()(".resource-text-filter-wrap").hide();
        })), 0 == t()("#block-pagebanner").length && 0 == t()(".resource__header").length || (t()(".secondary-nav-cta-scroll").hide(), t()(window).scroll((function() {
            var e = t()(".secondary-nav-cta-scroll"),
                n = t()(window).scrollTop();
            if (0 != t()("#block-pagebanner").length) var i = t()("#block-pagebanner").offset().top + t()("#block-pagebanner").height();
            else 0 != t()(".resource__header").length && (i = t()(".resource__header").offset().top + t()(".resource__header").height());
            n >= i ? e.show() : e.hide();
        }))), t()(".menu--blog-navigation .menu-item--expanded").on("click", (function() {
            t()(".menu--blog-navigation .menu-item--expanded .menu").toggle();
        })), t()(".compound-media-bar").each((function(e, n) {
            t()(this).find(".compound-media-bar__media").addClass("animate__animated"), t()(this).find(".compound-media-bar__content").addClass("animate__animated");
        }));
        var wi = document.querySelectorAll("dotlottie-player"),
            ki = new IntersectionObserver((function(e, t) {
                e.forEach((function(e) {}));
            }), {
                root: null,
                rootMargin: "0px",
                threshold: .5
            });
        wi.forEach((function(e) {
                ki.observe(e);
            })), t()(".compound-media-bar").each((function(e, t) {
                ki.observe(this);
            })), t()("a.header_banner-default--button").click((function() {
                t()(".header-banner-modern-form").toggleClass("form_open");
            })), t()(".secondary-nav--links .item-list ul li a").click((function() {
                t()(".secondary-nav--links .item-list ul li a").removeClass("active"), t()(this).addClass("active");
            })), t()(window).bind("scroll", (function() {
                if (document.getElementsByClassName("node--type-case-study").length > 0) {
                    var e = t()(window).scrollTop();
                    if (t()(".scroll-spy").length <= 0 && t()(".node--type-case-study").children(".secondary-nav-section").length > 0)
                        for (var n = t()(".case-study-node-content-w :header"), i = 0; i < n.length; i++) n[i].parentNode.classList.add("scroll-spy");
                    t()(".scroll-spy").each((function(n) {
                        var i = t()(this).offset().top - t()(".region-header").height() - t()(".secondary-nav-cta-scroll").height() - 8,
                            o = i + t()(this).height();
                        if (e > i && e < o) {
                            var r = t()(this).children(":header").children("a").attr("id"),
                                a = t()('a[href="#' + r + '"]');
                            a.addClass("active").parent().parent().parent().addClass("active-Nav").siblings().removeClass("active-Nav"), t()(a.parent().parent().parent().siblings()).find("a.active").removeClass("active");
                        }
                    }));
                }
            })), t()(".menu--footer .menu-item--expanded").on("click", (function(e) {
                t()(this).children("span").toggleClass("hide-submenu"), t()(this).siblings().children("span").addClass("hide-submenu");
            })), t()(window).on("resize", (function() {
                var e = t()(".paragraph--type--reference-menu-block .block-menu.navigation > span"),
                    n = t()(".paragraph--type--reference-menu-block .block-menu.navigation .menu");
                t()(window).width() < 1080 ? (t()(".resource__scroll").trigger("detach.ScrollToFixed"), t()(".resource__sidebar .resource__form.resource__scroll").removeAttr("style"), e.removeClass("visually-hidden"), n.addClass("visually-hidden"), t()("#block-subnavenwebinar-menu").removeClass("visually-hidden"), e.off("click").on("click", (function(e) {
                    t()(this).toggleClass("active"), n.toggleClass("visually-hidden");
                }))) : (t()("#block-subnavenwebinar-menu").addClass("visually-hidden"), e.removeClass("active"), n.removeClass("visually-hidden"), e.addClass("visually-hidden"));
            })).resize(),
            function(e) {
                Drupal.behaviors.tableOptimized = {
                    attach: function(t, n) {
                        e(".paragraph--type--table-optimised").each((function() {
                            var t = e(this).attr("class").split(/\s+/).filter((function(e) {
                                return e.match(/^bg-color/);
                            }));
                            if (t.length) {
                                var n = t[0],
                                    i = e(this).find("table").find("th");
                                if (e(i).length) {
                                    var o = e(i).parents("tr");
                                    e(o).addClass(n), e(this).removeClass(n);
                                }
                            }
                        })), e(once("tableOptimized", "input[name='optimised_custom_table']", t)).on("keyup", (function() {
                            var t = e(this).parents(".paragraph--type--table-optimised"),
                                n = e(t).find(".optimized-table-content").find("table").find("tbody"),
                                i = this.value.toLowerCase().trim();
                            e("tr", n).each((function(t) {
                                e(this).find("td").each((function() {
                                    var t = -1 == e(this).text().toLowerCase().trim().indexOf(i);
                                    return e(this).closest("tr").toggle(!t), t;
                                }));
                            }));
                        }));
                    }
                };
            }(yi), window.GestureEvent && document.querySelectorAll(".paragraph a").forEach((function(e) {
                "none" !== window.getComputedStyle(t()(e).get(0), ":after").content == 1 && "none" !== window.getComputedStyle(t()(e).get(0), ":after").display && (t()(e).css("min-width", "-webkit-fill-available"), t()(e).addClass("safari-only"));
            })), t()("input[type='checkbox']").on("keypress", (function(e) {
                13 === e.which && (this.checked = !this.checked, e.preventDefault());
            })), t()("[type=checkbox].multiple-select").on("click keypress", (function(e) {
                mapMultipleCheckboxSelection(this);
            })), t()("nav").hasClass("menu--footer") && (t()("a").removeAttr("title"), t()("span").removeAttr("title"));
        var xi = Drupal.t("Close Newsletter Signup");
        t()("#block-subscribetonewsletter .field--name-field-cta-link").length && t()("#block-subscribetonewsletter .field--name-field-cta-link").prepend("<button class='cta-link-close-icon' aria-label='" + xi + "'></button>"), document.addEventListener("DOMContentLoaded", (function() {
            document.querySelectorAll(".text-formatted").forEach((function(e) {
                e.querySelectorAll("a span").forEach((function(e) {
                    var t = e.parentNode;
                    if ("" !== e.textContent.trim()) {
                        for (; e.firstChild;) t.insertBefore(e.firstChild, e);
                        t.removeChild(e);
                    }
                }));
            }));
        })), t()(document).ready((function() {
            var e = t()("#block-themekit-cventtoplistsurgencybanner").find(".paragraph--type--cvent-marketo-form");
            t()(".urgency-banner-toplist").on("click", (function(t) {
                e.addClass("active"), e.find("#close_m_btn_toplist").length || e.append('<div id="close_m_btn_toplist" class="close_m_btn_toplist"></div>'), e.next().hasClass("form-modal--overlay") || e.after('<div class="form-modal--overlay"></div>'), t.stopPropagation();
            })), t()(document).on("click", "#close_m_btn_toplist", (function(t) {
                e.removeClass("active"), e.find("#close_m_btn_toplist").remove(), e.next(".form-modal--overlay").remove(), t.stopPropagation();
            }));
        })), n(915), n(181);
        var Ci, _i = document.querySelector(".podcast-audio-player"),
            Ti = t()(".play"),
            Oi = t()(".pause"),
            Si = t()(".bar"),
            Ei = t()(".podcast-play-toggle .play"),
            zi = (t()(".podcast-play-toggle"), t()(".podcast-player-toggle"));

        function Ai() {
            function e(e, t) {
                for (var n = e + ""; n.length < t;) n = "0" + n;
                return n;
            }
            document.querySelector(".podcast-audio-player").pause(), _i.play(), Ti.hide(), Oi.show(), clearInterval(Ci), Ci = setInterval((function() {
                for (var n = "", i = 0; i < _i.buffered.length; i++) {
                    var o = (_i.buffered.start(i) / _i.duration * 100).toString(),
                        r = (_i.buffered.end(i) / _i.duration * 100).toString();
                    n = i > 0 ? n + ",rgba(240,240,240) " + o + "%,#0071F2 " + o + "%, #0071F2 " + r + "%, rgba(240,240,240) " + r + "%" : n + "#0071F2 " + o + "%, #0071F2 " + r + "%, rgba(240,240,240) " + r + "%";
                }
                n = n + ",rgba(240,240,240) " + _i.buffered.end(_i.buffered.length - 1) / _i.duration * 100 + "%, rgba(240,240,240)", Si.css({
                    background: "linear-gradient(to right, #F0F0F0, " + n + ")"
                });
                var a = e(Math.floor(_i.currentTime / 60), 2),
                    s = e(Math.floor(_i.currentTime - 60 * a), 2);
                t()(".elapsed span").html(a + ":" + s), t()(".position-marker").css({
                    left: _i.currentTime / _i.duration * 100 + "%"
                });
            }), 1e3);
        }
        Si.on("click", (function(e) {
            var t = e.offsetX / e.target.offsetWidth;
            _i.currentTime = _i.duration * t, Ai();
        })), Ti.on("click", (function() {
            Ai();
        })), Oi.on("click", (function() {
            _i.pause(), Oi.hide(), Ti.show(), clearInterval(Ci);
        })), Ei.on("click", (function() {
            zi.addClass("is-active");
        }));
        var Ii = n(669);
        t()((function() {
            t()(".region-header .menu--utility-navigation,.search-mobile-container") && (t()(".search-mobile-container #edit-search-field,.search-mobile-container #edit-submit-btn").attr("tabindex", "0"), t()(".search-mobile-container .search-close").attr("tabindex", "-1"), t()(".region-header .menu--utility-navigation .menu .menu-item .search-link").attr("tabindex", "0")), t()(document).keydown((function(e) {
                13 == e.keyCode && t()(".region-header .menu--utility-navigation .menu .menu-item .search-link").length > 0 && t()(".region-header .menu--utility-navigation .menu .menu-item .search-link").is(":focus") && (t()("body").addClass("search-mobile-open"), t()("body").hasClass("search-mobile-open") ? setTimeout((function() {
                    t()(".search-mobile-container #edit-search-field").focus();
                }), 200) : t()(".region-header .menu--utility-navigation .menu .menu-item .search-link").focus()), 9 == e.keyCode && t()(".search-mobile-container #edit-submit-btn").is(":focus") && (e.preventDefault(), t()(".search-mobile-container .search-close").focus()), 13 == e.keyCode && t()(".search-mobile-container .search-close").is(":focus") && (e.preventDefault(), t()("body").removeClass("search-mobile-open"), t()("body").removeClass("blur-overlay"), t()(".region-header .menu--utility-navigation .menu .menu-item .search-link").focus()), t()("body").hasClass("search-mobile-open") && 9 == e.keyCode && t()(".region-header .menu--utility-navigation .menu .menu-item:last-child a").is(":focus") && (e.preventDefault(), t()("body").removeClass("search-mobile-open"), t()("body").removeClass("blur-overlay"));
            }));
        })), t()((function() {
            var e = "menu",
                n = "ada-focus",
                i = "is-visible",
                o = "sub-menu-focused",
                r = "menu-item--expanded",
                a = "child-menu-show",
                s = t()("#block-blognavigation .menu ." + r).first();
            s.attr("tabindex", "0"), s.addClass(n), t()(window).keyup((function(s) {
                if (9 == (s.keyCode ? s.keyCode : s.which)) {
                    if (t()(s.target).hasClass(n)) {
                        var c = s.target.querySelector("." + e);
                        c && (t()(c).addClass(i), t()(c).addClass(o));
                    }
                    if (t()(s.target).parent().hasClass(r)) {
                        t()("." + e).removeClass(a);
                        var l = t()(s.target).next();
                        t()(l) && l.addClass(a);
                    } else t()(s.target).parent().parent().hasClass(o) && t()("." + e).removeClass(a);
                    var u = s.target.offsetParent;
                    t()(u).parent().parent().hasClass(o) && (t()(u).hasClass(a) || (t()("." + e).removeClass(a), t()(u).addClass(a))), t()(s.target.offsetParent).hasClass(e) || t()(s.target).hasClass("menu-item") || t()("." + o).removeClass(i);
                }
            }));
        })), t()(".showcase-gallery #gallery .views-col").each((function(e) {
            t()(this), t()(this).on("click", (function() {
                setTimeout((function() {
                    t()("#lcl_wrap") && (t()("#lcl_wrap").attr("tabindex", "0"), t()(".lcl_prev").attr("tabindex", "0"), t()(".lcl_next").attr("tabindex", "0"), t()(".lcl_close").attr("tabindex", "0"), t()("#lcl_wrap").attr("role", "dialog"), t()(".lcl_close").focus());
                }), 1e3);
            }));
        })), t()(document).bind("keydown", (function(e) {
            t()("#lcl_wrap") && (9 == e.keyCode && t()(".lcl_close").is(":focus") && (e.preventDefault(), t()(".lcl_prev").focus()), 13 == e.keyCode && t()(".lcl_close").is(":focus") && (e.preventDefault(), lcl_close(), Ii(".showcase-gallery #gallery") && Ii(".showcase-gallery #gallery .views-col:first > a").focus()), 13 == e.keyCode && t()(".lcl_prev").is(":focus") && (e.preventDefault(), t()(".lcl_prev").click()), 13 == e.keyCode && t()(".lcl_next").is(":focus") && (e.preventDefault(), t()(".lcl_next").click()), 9 == e.keyCode && t()(".lcl_next").is(":focus") ? (e.preventDefault(), t()(".gallery_imglink").focus()) : 9 == e.keyCode && t()(".gallery_imglink").is(":focus") && (e.preventDefault(), t()(".lcl_close").focus()));
        })), t()((function() {
            t()(document).keyup((function(e) {
                t()(".header-banner-full .vidyard_wrapper .player").length > 0 && "13" == e.keyCode && t()(".vidyard_wrapper .player").is(":focus") && 0 == t()(".header-banner-full .vidyard-player-container").length && t()(".header-banner-full .vidyard_wrapper .player").trigger("click");
            }));
        })), n(595);
    })();
})();;
! function($) {
    "use strict";
    let langCode = drupalSettings.path.currentLanguage;
    let isAjax = false;
    Drupal.behaviors.checkboxFilterAdjust = {
        attach: function(context, settings) {
            if ($('.view-display-id-block_resources .view-content .views-row').length) {
                var itemCount = $('.view-display-id-block_resources .view-content .views-row').length;
                var wrap2Height = 0;
                for (var i = 0; i < itemCount; ++i) {
                    $(".view-display-id-block_resources .node__content .field--name-title").each(function() {
                        var boxHeight = $(this).height();
                        if (wrap2Height < boxHeight) wrap2Height = boxHeight;
                    });
                    $(".view-display-id-block_resources .node__content").css('minHeight', wrap2Height + 55 + 'px');
                }
            }
            if ($('.summary-output .resource-card__column .node--type-resource .node__content').length) {
                var itemsCount = $('.summary-output .resource-card__column .node--type-resource .node__content').length;
                var wraperHeight = 0;
                for (var j = 0; j < itemsCount; ++j) {
                    $(".summary-output .resource-card__column .node--type-resource .node__content .field--name-title").each(function() {
                        var cardHeight = $(this).height();
                        if (wraperHeight < cardHeight) wraperHeight = cardHeight;
                    });
                    $(".summary-output .resource-card__column .node--type-resource .node__content").css('minHeight', wraperHeight + 55 + 'px');
                }
            }
            $(".resource-text-filter input[name='title']").on("keypress", function(e) {
                if (e.which == '13') {
                    $('#views-exposed-form-resources-block-resources .form-submit').click();
                    $("form[id^='views-exposed-form-resources-block-resources--'] .form-submit").click();
                    return false;
                }
            });
            let allenText = $('.resource-text-filter .form-text').val();
            if (allenText) {
                $('.resource-text-filter-wrap').show();
                $(".resource-text-filter .resource-text-filter-val").html("<span>" + allenText + "</span>");
            }
            $("fieldset[id^='edit-field-cvent-region-target-id--']").on('click', function() {
                localStorage.setItem("accr_s_class", "is-active");
                var accr_s_class = localStorage.getItem("accr_s_class");
                $("fieldset[id^='edit-field-cvent-region-target-id--']").toggleClass(accr_s_class);
            });
            $("fieldset[id^='edit-field-platforms-target-id--']").on('click', function() {
                localStorage.setItem("accr_s_class", "is-active");
                var accr_s_class = localStorage.getItem("accr_s_class");
                $("fieldset[id^='edit-field-platforms-target-id--']").toggleClass(accr_s_class);
            });
            $("fieldset[id^='edit-field-resource-type-target-id--']").on('click', function() {
                localStorage.setItem("accr_r_class", "is-active");
                var accr_r_class = localStorage.getItem("accr_r_class");
                $("fieldset[id^='edit-field-resource-type-target-id--']").toggleClass(accr_r_class);
            });
            var i = 0;
            $('.resource-check-filter-row').hide();
            let regionTID = $(".form-checkbox:checkbox:checked").val();
            if (typeof regionTID !== 'undefined' && langCode != 'de' && isAjax == false) {
                $('.resource-check-filter-row').show();
                var check_text = $(".form-item-field-cvent-region-target-id-" + regionTID).children('label').text();
                var seleted_dom = "<div class='box-name selected-check-name-" + regionTID + "' data-val='" + regionTID + "'  id='field_cvent_region_target_id[" + regionTID + "]'>" + check_text + "</div>";
                $(".resource-check-select-option").append(seleted_dom);
            }
            $('.resource-check-filter .form-checkbox').click(function() {
                if ($(this).is(":checked") && i == 0) {
                    i++;
                    var searchTIDs = [];
                    $(".form-checkboxes input:checkbox:checked").map(function() {
                        searchTIDs.push({
                            check_val: $(this).val(),
                            check_name: $(this).attr('name'),
                            check_text: $(this).siblings('label').text()
                        });
                    }).get();
                    if (typeof searchTIDs !== 'undefined' && searchTIDs.length > 0) $(document).ajaxStop(function() {
                        isAjax = true;
                        $('.resource-check-filter-row').show();
                        $.each(searchTIDs, function(index, value) {
                            var check_val = value.check_val;
                            var check_name = value.check_name;
                            var check_text = value.check_text;
                            var seleted_dom = "<div class='box-name selected-check-name-" + check_val + "' data-val='" + check_val + "'  id='" + check_name + "'>" + check_text + "</div>";
                            let checkedVal = $('.selected-check-name-' + check_val).length;
                            if (checkedVal === 0) $(".resource-check-select-option").append(seleted_dom);
                        });
                    });
                }
                if ($(this).is(":not(:checked)")) {
                    var check_val = $(this).val();
                    $(document).ajaxStop(function() {
                        $(".resource-check-select-option .selected-check-name-" + check_val).remove();
                    });
                }
            });
            $(document).on('click', 'div.box-name', function() {
                var text_name = $(this).attr('id');
                var text_val = $(this).attr('data-val');
                $("input[name='" + text_name + "']").click();
                $(document).ajaxStop(function() {
                    $(".resource-check-select-option .selected-check-name-" + text_val).remove();
                    var numberOfboxes = $(".resource-check-select-option .box-name").length;
                    if (numberOfboxes == '0') $('.resource-check-filter-row').hide();
                });
            });
            $('.select-clear-all').on('click', function() {
                $('input:checkbox').removeAttr('checked');
                $("form[id^='views-exposed-form-resources-block-resources--'] .form-submit").click();
                $(document).ajaxStop(function() {
                    $(".resource-check-filter .resource-check-select-option").empty();
                    $('.resource-check-filter-row').hide();
                });
            });
            $('.text-clear-all').on('click', function() {
                $('.resource-text-filter .form-text').val('');
                $("form[id^='views-exposed-form-resources-block-resources--'] .form-submit").click();
                $(document).ajaxStop(function() {
                    $(".resource-text-filter .resource-text-filter-val").html('');
                });
            });
            $("#views-exposed-form-resources-block-resources .form-item-title input, form[id^='views-exposed-form-resources-block-resources--'] .form-item-title input").on("keyup", function() {
                var text_val = $(this).val();
                $(document).ajaxStart(function() {
                    $('#views-exposed-form-resources-block-resources .form-item-title input').attr("disabled", "disabled");
                    $("form[id^='views-exposed-form-resources-block-resources--'] .form-item-title input").attr("disabled", "disabled");
                });
                $(document).ajaxStop(function() {
                    $('#views-exposed-form-resources-block-resources .form-item-title input').removeAttr("disabled");
                    $("form[id^='views-exposed-form-resources-block-resources--'] .form-item-title input").removeAttr("disabled");
                    var numberOfChecked = $('.resource-check-filter input:checkbox:checked').length;
                    if (numberOfChecked == '0') $(".resource-check-select-option").html('');
                    $(".resource-text-filter .resource-text-filter-val").html("<span>" + text_val + "</span>");
                });
            });
            $(document).ready(function() {
                if ($('.view-display-id-block_resources .views-exposed-form-resources-block-resources').length) {
                    var label_region = Drupal.t("Region");
                    var label_solution = Drupal.t("Solution Suite");
                    var label_type = Drupal.t("Type");
                    $('fieldset[id^="edit-field-cvent-region-target-id--"] .fieldset-legend').html('<a class="region-link" href="javascript:void(0)">' + label_region + '</a>');
                    $('fieldset[id^="edit-field-platforms-target-id--"] .fieldset-legend').html('<a class="platforms-link" href="javascript:void(0)">' + label_solution + '</a>');
                    $('fieldset[id^="edit-field-resource-type-target-id--"] .fieldset-legend').html('<a class="type-link" href="javascript:void(0)">' + label_type + '</a>');
                }
            });
            if ($('.view-display-id-block_case_studies').length) {
                $(".case-study-text-filter input[name='search']").on("keyup", function(e) {
                    if (e.which == '13') {
                        $('#views-exposed-form-case-studies-block-case-studies .form-submit').click();
                        return false;
                    }
                });
                if ($('.view-display-id-block_case_studies .view-header').length) $('.view-display-id-block_case_studies .view-header').insertAfter('.view-display-id-block_case_studies .view-filters .form--inline');
                if ($('.view-display-id-block_case_studies .view-empty').length) $('.view-display-id-block_case_studies .view-empty').insertAfter('.view-display-id-block_case_studies .view-filters .form--inline');
                var cs_selected_dom = "";
                var compact_selected_dom = "";

                function initialiseCapsules() {
                    $('.case-studies-check-filter option:selected').each(function() {
                        let selected_text = $(this).text();
                        let selected_value = $(this).val();
                        cs_selected_dom += "<div class='box-name selected-cs-check-name-" + selected_value + "' data-val='" + selected_value + "'  id='" + selected_text + selected_value + "'>" + selected_text + "</div>";
                        $(".case-studies-check-select-option").html(cs_selected_dom);
                        let view_case_study_header = $('.view-display-id-block_case_studies .view-header');
                        $(view_case_study_header).css('display', 'block');
                        $('.option-clear-all').css('display', 'block');
                    });
                    if (window.innerWidth < 1080) $('.case-studies-compact-filter option:selected').each(function() {
                        let selected_text = $(this).text();
                        let selected_value = $(this).val();
                        compact_selected_dom += "<div class='box-name selected-cs-check-name-" + selected_value + "' data-val='" + selected_value + "'  id='" + selected_text + selected_value + "'>" + selected_text + "</div>";
                        $(".case-studies-compact-filter-select-option").html(compact_selected_dom);
                        let view_case_study_header = $('.view-display-id-block_case_studies .view-header');
                        $(view_case_study_header).css('display', 'block');
                        $('.option-clear-all').css('display', 'block');
                    });
                    $(once('checkboxFilterAdjust', '.case-studies-check-select-option .box-name', context)).on('click', function() {
                        let target_checkbox = $(".case-studies-check-filter .form-item-select-checkbox input[value='" + $(this).attr("data-val") + "']");
                        $(target_checkbox).prop("checked", false);
                        $(target_checkbox).trigger("change");
                    });
                    $(once('checkboxFilterAdjust', '.case-studies-compact-filter-select-option .box-name', context)).on('click', function() {
                        let target_checkbox = $(".case-studies-compact-filter .form-item-select-checkbox input[value='" + $(this).attr("data-val") + "']");
                        $(target_checkbox).prop("checked", false);
                        $(target_checkbox).trigger("change");
                    });
                }
                $(document).ajaxComplete(function(event, xhr, settings) {
                    $('.case-studies-check-filter option:selected').each(function() {
                        let selected_text = $(this).text();
                        let selected_value = $(this).val();
                        cs_selected_dom += "<div class='box-name selected-cs-check-name-" + selected_value + "' data-val='" + selected_value + "'  id='" + selected_text + selected_value + "'>" + selected_text + "</div>";
                        if (settings.url.indexOf('views/ajax') !== -1) $(".case-studies-check-select-option").html(cs_selected_dom);
                        let view_case_study_header = $('.view-display-id-block_case_studies .view-header');
                        $(view_case_study_header).css('display', 'block');
                        $('.option-clear-all').css('display', 'block');
                    });
                    if (window.innerWidth < 1080) $('.case-studies-compact-filter option:selected').each(function() {
                        let selected_text = $(this).text();
                        let selected_value = $(this).val();
                        compact_selected_dom += "<div class='box-name selected-cs-check-name-" + selected_value + "' data-val='" + selected_value + "'  id='" + selected_text + selected_value + "'>" + selected_text + "</div>";
                        $(".case-studies-compact-filter-select-option").html(compact_selected_dom);
                        let view_case_study_header = $('.view-display-id-block_case_studies .view-header');
                        $(view_case_study_header).css('display', 'block');
                        $('.option-clear-all').css('display', 'block');
                    });
                    let text_value = $(".views-exposed-form-case-studies-block-case-studies .form-item-search input[name='search']").val();
                    if (text_value !== 'undefined' && text_value !== '') {
                        $(".case-studies-text-filter-val").html("<div class='box-name'>" + text_value + "</div>");
                        let view_case_study_header = $('.view-display-id-block_case_studies .view-header');
                        $(view_case_study_header).css('display', 'block');
                        $('.option-clear-all').css('display', 'block');
                        $('.case-studies-text-filter-wrap').css('display', 'block');
                    }
                    $(once('checkboxFilterAdjust', '.case-studies-check-select-option .box-name', context)).on('click', function() {
                        $(this).remove();
                        let target_checkbox = $(".case-studies-check-filter .form-item-select-checkbox input[value='" + $(this).attr("data-val") + "']");
                        $(target_checkbox).prop("checked", false);
                        $(target_checkbox).trigger("change");
                    });
                    $(once('checkboxFilterAdjust', '.case-studies-compact-filter-select-option .box-name', context)).on('click', function() {
                        $(this).remove();
                        let target_checkbox = $(".case-studies-compact-filter .form-item-select-checkbox input[value='" + $(this).attr("data-val") + "']");
                        $(target_checkbox).prop("checked", false);
                        $(target_checkbox).trigger("change");
                    });
                    $(once('checkboxFilterAdjust', '.case-studies-text-filter-val, .box-name', context)).on('click', function() {
                        $(this).remove();
                        $(".case-studies-text-filter input[name='search']").val('');
                        $(".views-exposed-form-case-studies-block-case-studies .form-submit").click();
                    });
                });
                if (context === document) initialiseCapsules();
                $(".case-studies-compact-filter .form-item-select-checkbox input[type='checkbox'], .case-studies-check-filter .form-item-select-checkbox input[type='checkbox']").on("change", function(e) {
                    let parent_select_check_w = $(this).parents(".search-with-select");
                    let current_select_w_name = $(parent_select_check_w).find("select").attr("name");
                    $("input[name='triggering_element']").val(current_select_w_name);
                });
                $('.option-clear-all').on('click', function() {
                    $('.case-studies-text-filter .form-text').val('');
                    $('.case-studies-check-filter option:selected').removeAttr('selected');
                    $('.case-studies-compact-filter option:selected').removeAttr('selected');
                    $("form[id^='views-exposed-form-case-studies-block-case-studies--'] .form-submit").click();
                    $(document).ajaxStop(function() {
                        $(".cs-capsule-res-wrapper .case-studies-check-select-option").empty();
                        $(".cs-capsule-res-wrapper .case-studies-text-filter-val").empty();
                        $(".cs-capsule-res-wrapper .case-studies-compact-filter-select-option").empty();
                        $(".cs-capsule-res-wrapper .option-clear-all").hide();
                    });
                });
            }
            if ($('.view-display-id-navattic_demo_library').length) {
                $(".case-study-text-filter input[name='name']").on("keyup", function(e) {
                    if (e.which == '13') {
                        $('#views-exposed-form-navattic-demo-list-navattic-demo-library .form-submit').click();
                        return false;
                    }
                });
                if ($('.view-display-id-navattic_demo_library .view-header').length) $('.view-display-id-navattic_demo_library .view-header').insertAfter('.view-display-id-navattic_demo_library .view-filters .form--inline');
                if ($('.view-display-id-navattic_demo_library .view-empty').length) $('.view-display-id-navattic_demo_library .view-empty').insertAfter('.view-display-id-navattic_demo_library .view-filters .form--inline');
                var cs_selected_dom = "";
                var compact_selected_dom = "";
                $(document).ajaxStop(function() {
                    $('.case-studies-check-filter option:selected').each(function() {
                        let selected_text = $(this).text();
                        let selected_value = $(this).val();
                        cs_selected_dom += "<div role='button' tabindex='0' class='box-name selected-cs-check-name-" + selected_value + "' data-val='" + selected_value + "' id='" + selected_text + selected_value + "' aria-label='remove " + selected_text + " filter'>" + selected_text + "</div>";
                        $(".case-studies-check-select-option").html(cs_selected_dom);
                        let view_case_study_header = $('.view-display-id-navattic_demo_library .view-header');
                        $(view_case_study_header).css('display', 'block');
                        $('.option-clear-all').css('display', 'block');
                    });
                    $('.case-studies-compact-filter option:selected').each(function() {
                        let selected_text = $(this).text();
                        let selected_value = $(this).val();
                        compact_selected_dom += "<div role='button' tabindex='0' class='box-name selected-cs-check-name-" + selected_value + "' data-val='" + selected_value + "' id='" + selected_text + selected_value + "' aria-label='remove " + selected_text + " filter'>" + selected_text + "</div>";
                        $(".case-studies-compact-filter-select-option").html(compact_selected_dom);
                        let view_case_study_header = $('.view-display-id-navattic_demo_library .view-header');
                        $(view_case_study_header).css('display', 'block');
                        $('.option-clear-all').css('display', 'block');
                    });
                    let text_value = $(".views-exposed-form-navattic-demo-list-navattic-demo-library .form-item-name input[name='name']").val();
                    if (text_value !== 'undefined' && text_value !== '') {
                        $(".case-studies-text-filter-val").html("<div class='box-name'>" + text_value + "</div>");
                        let view_case_study_header = $('.view-display-id-navattic_demo_library .view-header');
                        $(view_case_study_header).css('display', 'block');
                        $('.option-clear-all').css('display', 'block');
                        $('.case-studies-text-filter-wrap').css('display', 'block');
                    }
                    $('.case-studies-check-select-option .box-name').on('click', function() {
                        $(this).remove();
                        let target_checkbox = $(".case-studies-check-filter .form-item-select-checkbox input[value='" + $(this).attr("data-val") + "']");
                        $(target_checkbox).prop("checked", false);
                        $(target_checkbox).trigger("change");
                    });
                    $(".case-studies-check-select-option .box-name,.option-clear-all").on('keydown', function(event) {
                        if (event.key === 'Enter') $(this).trigger('click');
                    });
                    $('.case-studies-compact-filter-select-option .box-name').on('click', function() {
                        $(this).remove();
                        let target_checkbox = $(".case-studies-compact-filter .form-item-select-checkbox input[value='" + $(this).attr("data-val") + "']");
                        $(target_checkbox).prop("checked", false);
                        $(target_checkbox).trigger("change");
                    });
                    $('.case-studies-text-filter-val, .box-name').on('click', function() {
                        $(this).remove();
                        $(".case-studies-text-filter input[name='name']").val('');
                        $(".views-exposed-form-navattic-demo-list-navattic-demo-library .form-submit").click();
                    });
                });
                $(".case-studies-compact-filter .form-item-select-checkbox input[type='checkbox'], .case-studies-check-filter .form-item-select-checkbox input[type='checkbox']").on("change", function(e) {
                    let parent_select_check_w = $(this).parents(".search-with-select");
                    let current_select_w_name = $(parent_select_check_w).find("select").attr("name");
                    $("input[name='triggering_element']").val(current_select_w_name);
                });
                $('.option-clear-all').on('click', function() {
                    $('.case-studies-text-filter .form-text').val('');
                    $('.case-studies-check-filter option:selected').removeAttr('selected');
                    $('.case-studies-compact-filter option:selected').removeAttr('selected');
                    $("form[id^='views-exposed-form-navattic-demo-list-navattic-demo-library--'] .form-submit").click();
                    $(document).ajaxStop(function() {
                        $(".cs-capsule-res-wrapper .case-studies-check-select-option").empty();
                        $(".cs-capsule-res-wrapper .case-studies-text-filter-val").empty();
                        $(".cs-capsule-res-wrapper .case-studies-compact-filter-select-option").empty();
                        $(".cs-capsule-res-wrapper .option-clear-all").hide();
                    });
                });
            }
        }
    };
}(jQuery);;