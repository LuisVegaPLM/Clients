

(function (e, t, n) { typeof define == "function" && define.amd ? define(["jquery"], function (r) { return n(r, e, t), r.mobile }) : n(e.jQuery, e, t) })(this, document, function (e, t, n, r) { (function (e, t, r) { "$:nomunge"; function l(e) { return e = e || location.href, "#" + e.replace(/^[^#]*#?(.*)$/, "$1") } var i = "hashchange", s = n, o, u = e.event.special, a = s.documentMode, f = "on" + i in t && (a === r || a > 7); e.fn[i] = function (e) { return e ? this.bind(i, e) : this.trigger(i) }, e.fn[i].delay = 50, u[i] = e.extend(u[i], { setup: function () { if (f) return !1; e(o.start) }, teardown: function () { if (f) return !1; e(o.stop) } }), o = function () { function p() { var n = l(), r = h(u); n !== u ? (c(u = n, r), e(t).trigger(i)) : r !== u && (location.href = location.href.replace(/#.*/, "") + r), o = setTimeout(p, e.fn[i].delay) } var n = {}, o, u = l(), a = function (e) { return e }, c = a, h = a; return n.start = function () { o || p() }, n.stop = function () { o && clearTimeout(o), o = r }, t.attachEvent && !t.addEventListener && !f && function () { var t, r; n.start = function () { t || (r = e.fn[i].src, r = r && r + l(), t = e('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () { r || c(l()), p() }).attr("src", r || "javascript:0").insertAfter("body")[0].contentWindow, s.onpropertychange = function () { try { event.propertyName === "title" && (t.document.title = s.title) } catch (e) { } }) }, n.stop = a, h = function () { return l(t.location.href) }, c = function (n, r) { var o = t.document, u = e.fn[i].domain; n !== r && (o.title = s.title, o.open(), u && o.write('<script>document.domain="' + u + '"</script>'), o.close(), t.location.hash = n) } }(), n }() })(e, this), function (e) { e.mobile = {} }(e), function (e, t, n) { e.extend(e.mobile, { version: "1.4.2", subPageUrlKey: "ui-page", hideUrlBar: !0, keepNative: ":jqmData(role='none'), :jqmData(role='nojs')", activePageClass: "ui-page-active", activeBtnClass: "ui-btn-active", focusClass: "ui-focus", ajaxEnabled: !0, hashListeningEnabled: !0, linkBindingEnabled: !0, defaultPageTransition: "fade", maxTransitionWidth: !1, minScrollBack: 0, defaultDialogTransition: "pop", pageLoadErrorMessage: "Error Loading Page", pageLoadErrorMessageTheme: "a", phonegapNavigationEnabled: !1, autoInitializePage: !0, pushStateEnabled: !0, ignoreContentEnabled: !1, buttonMarkup: { hoverDelay: 200 }, dynamicBaseEnabled: !0, pageContainer: e(), allowCrossDomainPages: !1, dialogHashKey: "&ui-state=dialog" }) }(e, this), function (e, t, n) { var r = {}, i = e.find, s = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, o = /:jqmData\(([^)]*)\)/g; e.extend(e.mobile, { ns: "", getAttribute: function (t, n) { var r; t = t.jquery ? t[0] : t, t && t.getAttribute && (r = t.getAttribute("data-" + e.mobile.ns + n)); try { r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : +r + "" === r ? +r : s.test(r) ? JSON.parse(r) : r } catch (i) { } return r }, nsNormalizeDict: r, nsNormalize: function (t) { return r[t] || (r[t] = e.camelCase(e.mobile.ns + t)) }, closestPageData: function (e) { return e.closest(":jqmData(role='page'), :jqmData(role='dialog')").data("mobile-page") } }), e.fn.jqmData = function (t, r) { var i; return typeof t != "undefined" && (t && (t = e.mobile.nsNormalize(t)), arguments.length < 2 || r === n ? i = this.data(t) : i = this.data(t, r)), i }, e.jqmData = function (t, n, r) { var i; return typeof n != "undefined" && (i = e.data(t, n ? e.mobile.nsNormalize(n) : n, r)), i }, e.fn.jqmRemoveData = function (t) { return this.removeData(e.mobile.nsNormalize(t)) }, e.jqmRemoveData = function (t, n) { return e.removeData(t, e.mobile.nsNormalize(n)) }, e.find = function (t, n, r, s) { return t.indexOf(":jqmData") > -1 && (t = t.replace(o, "[data-" + (e.mobile.ns || "") + "$1]")), i.call(this, t, n, r, s) }, e.extend(e.find, i) }(e, this), function (e, t) { function s(t, n) { var r, i, s, u = t.nodeName.toLowerCase(); return "area" === u ? (r = t.parentNode, i = r.name, !t.href || !i || r.nodeName.toLowerCase() !== "map" ? !1 : (s = e("img[usemap=#" + i + "]")[0], !!s && o(s))) : (/input|select|textarea|button|object/.test(u) ? !t.disabled : "a" === u ? t.href || n : n) && o(t) } function o(t) { return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function () { return e.css(this, "visibility") === "hidden" }).length } var r = 0, i = /^ui-id-\d+$/; e.ui = e.ui || {}, e.extend(e.ui, { version: "c0ab71056b936627e8a7821f03c044aec6280a40", keyCode: { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 } }), e.fn.extend({ focus: function (t) { return function (n, r) { return typeof n == "number" ? this.each(function () { var t = this; setTimeout(function () { e(t).focus(), r && r.call(t) }, n) }) : t.apply(this, arguments) } }(e.fn.focus), scrollParent: function () { var t; return e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? t = this.parents().filter(function () { return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x")) }).eq(0) : t = this.parents().filter(function () { return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x")) }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(this[0].ownerDocument || n) : t }, uniqueId: function () { return this.each(function () { this.id || (this.id = "ui-id-" + ++r) }) }, removeUniqueId: function () { return this.each(function () { i.test(this.id) && e(this).removeAttr("id") }) } }), e.extend(e.expr[":"], { data: e.expr.createPseudo ? e.expr.createPseudo(function (t) { return function (n) { return !!e.data(n, t) } }) : function (t, n, r) { return !!e.data(t, r[3]) }, focusable: function (t) { return s(t, !isNaN(e.attr(t, "tabindex"))) }, tabbable: function (t) { var n = e.attr(t, "tabindex"), r = isNaN(n); return (r || n >= 0) && s(t, !r) } }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function (n, r) { function u(t, n, r, s) { return e.each(i, function () { n -= parseFloat(e.css(t, "padding" + this)) || 0, r && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), s && (n -= parseFloat(e.css(t, "margin" + this)) || 0) }), n } var i = r === "Width" ? ["Left", "Right"] : ["Top", "Bottom"], s = r.toLowerCase(), o = { innerWidth: e.fn.innerWidth, innerHeight: e.fn.innerHeight, outerWidth: e.fn.outerWidth, outerHeight: e.fn.outerHeight }; e.fn["inner" + r] = function (n) { return n === t ? o["inner" + r].call(this) : this.each(function () { e(this).css(s, u(this, n) + "px") }) }, e.fn["outer" + r] = function (t, n) { return typeof t != "number" ? o["outer" + r].call(this, t) : this.each(function () { e(this).css(s, u(this, t, !0, n) + "px") }) } }), e.fn.addBack || (e.fn.addBack = function (e) { return this.add(e == null ? this.prevObject : this.prevObject.filter(e)) }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function (t) { return function (n) { return arguments.length ? t.call(this, e.camelCase(n)) : t.call(this) } }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.support.selectstart = "onselectstart" in n.createElement("div"), e.fn.extend({ disableSelection: function () { return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (e) { e.preventDefault() }) }, enableSelection: function () { return this.unbind(".ui-disableSelection") }, zIndex: function (r) { if (r !== t) return this.css("zIndex", r); if (this.length) { var i = e(this[0]), s, o; while (i.length && i[0] !== n) { s = i.css("position"); if (s === "absolute" || s === "relative" || s === "fixed") { o = parseInt(i.css("zIndex"), 10); if (!isNaN(o) && o !== 0) return o } i = i.parent() } } return 0 } }), e.ui.plugin = { add: function (t, n, r) { var i, s = e.ui[t].prototype; for (i in r) s.plugins[i] = s.plugins[i] || [], s.plugins[i].push([n, r[i]]) }, call: function (e, t, n, r) { var i, s = e.plugins[t]; if (!s) return; if (!r && (!e.element[0].parentNode || e.element[0].parentNode.nodeType === 11)) return; for (i = 0; i < s.length; i++) e.options[s[i][0]] && s[i][1].apply(e.element, n) } } }(e), function (e, t, r) { var i = function (t, n) { var r = t.parent(), i = [], s = r.children(":jqmData(role='header')"), o = t.children(":jqmData(role='header')"), u = r.children(":jqmData(role='footer')"), a = t.children(":jqmData(role='footer')"); return o.length === 0 && s.length > 0 && (i = i.concat(s.toArray())), a.length === 0 && u.length > 0 && (i = i.concat(u.toArray())), e.each(i, function (t, r) { n -= e(r).outerHeight() }), Math.max(0, n) }; e.extend(e.mobile, { window: e(t), document: e(n), keyCode: e.ui.keyCode, behaviors: {}, silentScroll: function (n) { e.type(n) !== "number" && (n = e.mobile.defaultHomeScroll), e.event.special.scrollstart.enabled = !1, setTimeout(function () { t.scrollTo(0, n), e.mobile.document.trigger("silentscroll", { x: 0, y: n }) }, 20), setTimeout(function () { e.event.special.scrollstart.enabled = !0 }, 150) }, getClosestBaseUrl: function (t) { var n = e(t).closest(".ui-page").jqmData("url"), r = e.mobile.path.documentBase.hrefNoHash; if (!e.mobile.dynamicBaseEnabled || !n || !e.mobile.path.isPath(n)) n = r; return e.mobile.path.makeUrlAbsolute(n, r) }, removeActiveLinkClass: function (t) { !!e.mobile.activeClickedLink && (!e.mobile.activeClickedLink.closest("." + e.mobile.activePageClass).length || t) && e.mobile.activeClickedLink.removeClass(e.mobile.activeBtnClass), e.mobile.activeClickedLink = null }, getInheritedTheme: function (e, t) { var n = e[0], r = "", i = /ui-(bar|body|overlay)-([a-z])\b/, s, o; while (n) { s = n.className || ""; if (s && (o = i.exec(s)) && (r = o[2])) break; n = n.parentNode } return r || t || "a" }, enhanceable: function (e) { return this.haveParents(e, "enhance") }, hijackable: function (e) { return this.haveParents(e, "ajax") }, haveParents: function (t, n) { if (!e.mobile.ignoreContentEnabled) return t; var r = t.length, i = e(), s, o, u, a, f; for (a = 0; a < r; a++) { o = t.eq(a), u = !1, s = t[a]; while (s) { f = s.getAttribute ? s.getAttribute("data-" + e.mobile.ns + n) : ""; if (f === "false") { u = !0; break } s = s.parentNode } u || (i = i.add(o)) } return i }, getScreenHeight: function () { return t.innerHeight || e.mobile.window.height() }, resetActivePageHeight: function (t) { var n = e("." + e.mobile.activePageClass), r = n.height(), s = n.outerHeight(!0); t = i(n, typeof t == "number" ? t : e.mobile.getScreenHeight()), n.css("min-height", t - (s - r)) }, loading: function () { var t = this.loading._widget || e(e.mobile.loader.prototype.defaultHtml).loader(), n = t.loader.apply(t, arguments); return this.loading._widget = t, n } }), e.addDependents = function (t, n) { var r = e(t), i = r.jqmData("dependents") || e(); r.jqmData("dependents", e(i).add(n)) }, e.fn.extend({ removeWithDependents: function () { e.removeWithDependents(this) }, enhanceWithin: function () { var t, n = {}, r = e.mobile.page.prototype.keepNativeSelector(), i = this; e.mobile.nojs && e.mobile.nojs(this), e.mobile.links && e.mobile.links(this), e.mobile.degradeInputsWithin && e.mobile.degradeInputsWithin(this), e.fn.buttonMarkup && this.find(e.fn.buttonMarkup.initSelector).not(r).jqmEnhanceable().buttonMarkup(), e.fn.fieldcontain && this.find(":jqmData(role='fieldcontain')").not(r).jqmEnhanceable().fieldcontain(), e.each(e.mobile.widgets, function (t, s) { if (s.initSelector) { var o = e.mobile.enhanceable(i.find(s.initSelector)); o.length > 0 && (o = o.not(r)), o.length > 0 && (n[s.prototype.widgetName] = o) } }); for (t in n) n[t][t](); return this }, addDependents: function (t) { e.addDependents(this, t) }, getEncodedText: function () { return e("<a>").text(this.text()).html() }, jqmEnhanceable: function () { return e.mobile.enhanceable(this) }, jqmHijackable: function () { return e.mobile.hijackable(this) } }), e.removeWithDependents = function (t) { var n = e(t); (n.jqmData("dependents") || e()).remove(), n.remove() }, e.addDependents = function (t, n) { var r = e(t), i = r.jqmData("dependents") || e(); r.jqmData("dependents", e(i).add(n)) }, e.find.matches = function (t, n) { return e.find(t, null, null, n) }, e.find.matchesSelector = function (t, n) { return e.find(n, null, null, [t]).length > 0 } }(e, this), function (e, r) { t.matchMedia = t.matchMedia || function (e, t) { var n, r = e.documentElement, i = r.firstElementChild || r.firstChild, s = e.createElement("body"), o = e.createElement("div"); return o.id = "mq-test-1", o.style.cssText = "position:absolute;top:-100em", s.style.background = "none", s.appendChild(o), function (e) { return o.innerHTML = '&shy;<style media="' + e + '"> #mq-test-1 { width: 42px; }</style>', r.insertBefore(s, i), n = o.offsetWidth === 42, r.removeChild(s), { matches: n, media: e } } }(n), e.mobile.media = function (e) { return t.matchMedia(e).matches } }(e), function (e, t) { var r = { touch: "ontouchend" in n }; e.mobile.support = e.mobile.support || {}, e.extend(e.support, r), e.extend(e.mobile.support, r) }(e), function (e, n) { e.extend(e.support, { orientation: "orientation" in t && "onorientationchange" in t }) }(e), function (e, r) { function i(e) { var t = e.charAt(0).toUpperCase() + e.substr(1), n = (e + " " + u.join(t + " ") + t).split(" "), i; for (i in n) if (o[n[i]] !== r) return !0 } function h() { var n = t, r = !!n.document.createElementNS && !!n.document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect && (!n.opera || navigator.userAgent.indexOf("Chrome") !== -1), i = function (t) { (!t || !r) && e("html").addClass("ui-nosvg") }, s = new n.Image; s.onerror = function () { i(!1) }, s.onload = function () { i(s.width === 1 && s.height === 1) }, s.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" } function p() { var i = "transform-3d", o = e.mobile.media("(-" + u.join("-" + i + "),(-") + "-" + i + "),(" + i + ")"), a, f, l; if (o) return !!o; a = n.createElement("div"), f = { MozTransform: "-moz-transform", transform: "transform" }, s.append(a); for (l in f) a.style[l] !== r && (a.style[l] = "translate3d( 100px, 1px, 1px )", o = t.getComputedStyle(a).getPropertyValue(f[l])); return !!o && o !== "none" } function d() { var t = location.protocol + "//" + location.host + location.pathname + "ui-dir/", n = e("head base"), r = null, i = "", o, u; return n.length ? i = n.attr("href") : n = r = e("<base>", { href: t }).appendTo("head"), o = e("<a href='testurl' />").prependTo(s), u = o[0].href, n[0].href = i || location.pathname, r && r.remove(), u.indexOf(t) === 0 } function v() { var e = n.createElement("x"), r = n.documentElement, i = t.getComputedStyle, s; return "pointerEvents" in e.style ? (e.style.pointerEvents = "auto", e.style.pointerEvents = "x", r.appendChild(e), s = i && i(e, "").pointerEvents === "auto", r.removeChild(e), !!s) : !1 } function m() { var e = n.createElement("div"); return typeof e.getBoundingClientRect != "undefined" } function g() { var e = t, n = navigator.userAgent, r = navigator.platform, i = n.match(/AppleWebKit\/([0-9]+)/), s = !!i && i[1], o = n.match(/Fennec\/([0-9]+)/), u = !!o && o[1], a = n.match(/Opera Mobi\/([0-9]+)/), f = !!a && a[1]; return (r.indexOf("iPhone") > -1 || r.indexOf("iPad") > -1 || r.indexOf("iPod") > -1) && s && s < 534 || e.operamini && {}.toString.call(e.operamini) === "[object OperaMini]" || a && f < 7458 || n.indexOf("Android") > -1 && s && s < 533 || u && u < 6 || "palmGetResource" in t && s && s < 534 || n.indexOf("MeeGo") > -1 && n.indexOf("NokiaBrowser/8.5.0") > -1 ? !1 : !0 } var s = e("<body>").prependTo("html"), o = s[0].style, u = ["Webkit", "Moz", "O"], a = "palmGetResource" in t, f = t.operamini && {}.toString.call(t.operamini) === "[object OperaMini]", l = t.blackberry && !i("-webkit-transform"), c; e.extend(e.mobile, { browser: {} }), e.mobile.browser.oldIE = function () { var e = 3, t = n.createElement("div"), r = t.all || []; do t.innerHTML = "<!--[if gt IE " + ++e + "]><br><![endif]-->"; while (r[0]); return e > 4 ? e : !e }(), e.extend(e.support, { pushState: "pushState" in history && "replaceState" in history && !(t.navigator.userAgent.indexOf("Firefox") >= 0 && t.top !== t) && t.navigator.userAgent.search(/CriOS/) === -1, mediaquery: e.mobile.media("only all"), cssPseudoElement: !!i("content"), touchOverflow: !!i("overflowScrolling"), cssTransform3d: p(), boxShadow: !!i("boxShadow") && !l, fixedPosition: g(), scrollTop: ("pageXOffset" in t || "scrollTop" in n.documentElement || "scrollTop" in s[0]) && !a && !f, dynamicBaseTag: d(), cssPointerEvents: v(), boundingRect: m(), inlineSVG: h }), s.remove(), c = function () { var e = t.navigator.userAgent; return e.indexOf("Nokia") > -1 && (e.indexOf("Symbian/3") > -1 || e.indexOf("Series60/5") > -1) && e.indexOf("AppleWebKit") > -1 && e.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/) }(), e.mobile.gradeA = function () { return (e.support.mediaquery && e.support.cssPseudoElement || e.mobile.browser.oldIE && e.mobile.browser.oldIE >= 8) && (e.support.boundingRect || e.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/) !== null) }, e.mobile.ajaxBlacklist = t.blackberry && !t.WebKitPoint || f || c, c && e(function () { e("head link[rel='stylesheet']").attr("rel", "alternate stylesheet").attr("rel", "stylesheet") }), e.support.boxShadow || e("html").addClass("ui-noboxshadow") }(e), function (e, t) { var n = e.mobile.window, r, i = function () { }; e.event.special.beforenavigate = { setup: function () { n.on("navigate", i) }, teardown: function () { n.off("navigate", i) } }, e.event.special.navigate = r = { bound: !1, pushStateEnabled: !0, originalEventName: t, isPushStateEnabled: function () { return e.support.pushState && e.mobile.pushStateEnabled === !0 && this.isHashChangeEnabled() }, isHashChangeEnabled: function () { return e.mobile.hashListeningEnabled === !0 }, popstate: function (t) { var r = new e.Event("navigate"), i = new e.Event("beforenavigate"), s = t.originalEvent.state || {}; i.originalEvent = t, n.trigger(i); if (i.isDefaultPrevented()) return; t.historyState && e.extend(s, t.historyState), r.originalEvent = t, setTimeout(function () { n.trigger(r, { state: s }) }, 0) }, hashchange: function (t) { var r = new e.Event("navigate"), i = new e.Event("beforenavigate"); i.originalEvent = t, n.trigger(i); if (i.isDefaultPrevented()) return; r.originalEvent = t, n.trigger(r, { state: t.hashchangeState || {} }) }, setup: function () { if (r.bound) return; r.bound = !0, r.isPushStateEnabled() ? (r.originalEventName = "popstate", n.bind("popstate.navigate", r.popstate)) : r.isHashChangeEnabled() && (r.originalEventName = "hashchange", n.bind("hashchange.navigate", r.hashchange)) } } }(e), function (e) { e.event.special.throttledresize = { setup: function () { e(this).bind("resize", n) }, teardown: function () { e(this).unbind("resize", n) } }; var t = 250, n = function () { s = (new Date).getTime(), o = s - r, o >= t ? (r = s, e(this).trigger("throttledresize")) : (i && clearTimeout(i), i = setTimeout(n, t - o)) }, r = 0, i, s, o }(e), function (e, t) { function p() { var e = s(); e !== o && (o = e, r.trigger(i)) } var r = e(t), i = "orientationchange", s, o, u, a, f = { 0: !0, 180: !0 }, l, c, h; if (e.support.orientation) { l = t.innerWidth || r.width(), c = t.innerHeight || r.height(), h = 50, u = l > c && l - c > h, a = f[t.orientation]; if (u && a || !u && !a) f = { "-90": !0, 90: !0 } } e.event.special.orientationchange = e.extend({}, e.event.special.orientationchange, { setup: function () { if (e.support.orientation && !e.event.special.orientationchange.disabled) return !1; o = s(), r.bind("throttledresize", p) }, teardown: function () { if (e.support.orientation && !e.event.special.orientationchange.disabled) return !1; r.unbind("throttledresize", p) }, add: function (e) { var t = e.handler; e.handler = function (e) { return e.orientation = s(), t.apply(this, arguments) } } }), e.event.special.orientationchange.orientation = s = function () { var r = !0, i = n.documentElement; return e.support.orientation ? r = f[t.orientation] : r = i && i.clientWidth / i.clientHeight < 1.1, r ? "portrait" : "landscape" }, e.fn[i] = function (e) { return e ? this.bind(i, e) : this.trigger(i) }, e.attrFn && (e.attrFn[i] = !0) }(e, this), function (e, t, n, r) { function T(e) { while (e && typeof e.originalEvent != "undefined") e = e.originalEvent; return e } function N(t, n) { var i = t.type, s, o, a, l, c, h, p, d, v; t = e.Event(t), t.type = n, s = t.originalEvent, o = e.event.props, i.search(/^(mouse|click)/) > -1 && (o = f); if (s) for (p = o.length, l; p;) l = o[--p], t[l] = s[l]; i.search(/mouse(down|up)|click/) > -1 && !t.which && (t.which = 1); if (i.search(/^touch/) !== -1) { a = T(s), i = a.touches, c = a.changedTouches, h = i && i.length ? i[0] : c && c.length ? c[0] : r; if (h) for (d = 0, v = u.length; d < v; d++) l = u[d], t[l] = h[l] } return t } function C(t) { var n = {}, r, s; while (t) { r = e.data(t, i); for (s in r) r[s] && (n[s] = n.hasVirtualBinding = !0); t = t.parentNode } return n } function k(t, n) { var r; while (t) { r = e.data(t, i); if (r && (!n || r[n])) return t; t = t.parentNode } return null } function L() { g = !1 } function A() { g = !0 } function O() { E = 0, v.length = 0, m = !1, A() } function M() { L() } function _() { D(), c = setTimeout(function () { c = 0, O() }, e.vmouse.resetTimerDuration) } function D() { c && (clearTimeout(c), c = 0) } function P(t, n, r) { var i; if (r && r[t] || !r && k(n.target, t)) i = N(n, t), e(n.target).trigger(i); return i } function H(t) { var n = e.data(t.target, s), r; !m && (!E || E !== n) && (r = P("v" + t.type, t), r && (r.isDefaultPrevented() && t.preventDefault(), r.isPropagationStopped() && t.stopPropagation(), r.isImmediatePropagationStopped() && t.stopImmediatePropagation())) } function B(t) { var n = T(t).touches, r, i, o; n && n.length === 1 && (r = t.target, i = C(r), i.hasVirtualBinding && (E = w++, e.data(r, s, E), D(), M(), d = !1, o = T(t).touches[0], h = o.pageX, p = o.pageY, P("vmouseover", t, i), P("vmousedown", t, i))) } function j(e) { if (g) return; d || P("vmousecancel", e, C(e.target)), d = !0, _() } function F(t) { if (g) return; var n = T(t).touches[0], r = d, i = e.vmouse.moveDistanceThreshold, s = C(t.target); d = d || Math.abs(n.pageX - h) > i || Math.abs(n.pageY - p) > i, d && !r && P("vmousecancel", t, s), P("vmousemove", t, s), _() } function I(e) { if (g) return; A(); var t = C(e.target), n, r; P("vmouseup", e, t), d || (n = P("vclick", e, t), n && n.isDefaultPrevented() && (r = T(e).changedTouches[0], v.push({ touchID: E, x: r.clientX, y: r.clientY }), m = !0)), P("vmouseout", e, t), d = !1, _() } function q(t) { var n = e.data(t, i), r; if (n) for (r in n) if (n[r]) return !0; return !1 } function R() { } function U(t) { var n = t.substr(1); return { setup: function () { q(this) || e.data(this, i, {}); var r = e.data(this, i); r[t] = !0, l[t] = (l[t] || 0) + 1, l[t] === 1 && b.bind(n, H), e(this).bind(n, R), y && (l.touchstart = (l.touchstart || 0) + 1, l.touchstart === 1 && b.bind("touchstart", B).bind("touchend", I).bind("touchmove", F).bind("scroll", j)) }, teardown: function () { --l[t], l[t] || b.unbind(n, H), y && (--l.touchstart, l.touchstart || b.unbind("touchstart", B).unbind("touchmove", F).unbind("touchend", I).unbind("scroll", j)); var r = e(this), s = e.data(this, i); s && (s[t] = !1), r.unbind(n, R), q(this) || r.removeData(i) } } } var i = "virtualMouseBindings", s = "virtualTouchID", o = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "), u = "clientX clientY pageX pageY screenX screenY".split(" "), a = e.event.mouseHooks ? e.event.mouseHooks.props : [], f = e.event.props.concat(a), l = {}, c = 0, h = 0, p = 0, d = !1, v = [], m = !1, g = !1, y = "addEventListener" in n, b = e(n), w = 1, E = 0, S, x; e.vmouse = { moveDistanceThreshold: 10, clickDistanceThreshold: 10, resetTimerDuration: 1500 }; for (x = 0; x < o.length; x++) e.event.special[o[x]] = U(o[x]); y && n.addEventListener("click", function (t) { var n = v.length, r = t.target, i, o, u, a, f, l; if (n) { i = t.clientX, o = t.clientY, S = e.vmouse.clickDistanceThreshold, u = r; while (u) { for (a = 0; a < n; a++) { f = v[a], l = 0; if (u === r && Math.abs(f.x - i) < S && Math.abs(f.y - o) < S || e.data(u, s) === f.touchID) { t.preventDefault(), t.stopPropagation(); return } } u = u.parentNode } } }, !0) }(e, t, n), function (e, t, r) { function l(t, n, i, s) { var o = i.type; i.type = n, s ? e.event.trigger(i, r, t) : e.event.dispatch.call(t, i), i.type = o } var i = e(n), s = e.mobile.support.touch, o = "touchmove scroll", u = s ? "touchstart" : "mousedown", a = s ? "touchend" : "mouseup", f = s ? "touchmove" : "mousemove"; e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function (t, n) { e.fn[n] = function (e) { return e ? this.bind(n, e) : this.trigger(n) }, e.attrFn && (e.attrFn[n] = !0) }), e.event.special.scrollstart = { enabled: !0, setup: function () { function s(e, n) { r = n, l(t, r ? "scrollstart" : "scrollstop", e) } var t = this, n = e(t), r, i; n.bind(o, function (t) { if (!e.event.special.scrollstart.enabled) return; r || s(t, !0), clearTimeout(i), i = setTimeout(function () { s(t, !1) }, 50) }) }, teardown: function () { e(this).unbind(o) } }, e.event.special.tap = { tapholdThreshold: 750, emitTapOnTaphold: !0, setup: function () { var t = this, n = e(t), r = !1; n.bind("vmousedown", function (s) { function a() { clearTimeout(u) } function f() { a(), n.unbind("vclick", c).unbind("vmouseup", a), i.unbind("vmousecancel", f) } function c(e) { f(), !r && o === e.target ? l(t, "tap", e) : r && e.stopPropagation() } r = !1; if (s.which && s.which !== 1) return !1; var o = s.target, u; n.bind("vmouseup", a).bind("vclick", c), i.bind("vmousecancel", f), u = setTimeout(function () { e.event.special.tap.emitTapOnTaphold || (r = !0), l(t, "taphold", e.Event("taphold", { target: o })) }, e.event.special.tap.tapholdThreshold) }) }, teardown: function () { e(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"), i.unbind("vmousecancel") } }, e.event.special.swipe = { scrollSupressionThreshold: 30, durationThreshold: 1e3, horizontalDistanceThreshold: 30, verticalDistanceThreshold: 30, getLocation: function (e) { var n = t.pageXOffset, r = t.pageYOffset, i = e.clientX, s = e.clientY; if (e.pageY === 0 && Math.floor(s) > Math.floor(e.pageY) || e.pageX === 0 && Math.floor(i) > Math.floor(e.pageX)) i -= n, s -= r; else if (s < e.pageY - r || i < e.pageX - n) i = e.pageX - n, s = e.pageY - r; return { x: i, y: s } }, start: function (t) { var n = t.originalEvent.touches ? t.originalEvent.touches[0] : t, r = e.event.special.swipe.getLocation(n); return { time: (new Date).getTime(), coords: [r.x, r.y], origin: e(t.target) } }, stop: function (t) { var n = t.originalEvent.touches ? t.originalEvent.touches[0] : t, r = e.event.special.swipe.getLocation(n); return { time: (new Date).getTime(), coords: [r.x, r.y] } }, handleSwipe: function (t, n, r, i) { if (n.time - t.time < e.event.special.swipe.durationThreshold && Math.abs(t.coords[0] - n.coords[0]) > e.event.special.swipe.horizontalDistanceThreshold && Math.abs(t.coords[1] - n.coords[1]) < e.event.special.swipe.verticalDistanceThreshold) { var s = t.coords[0] > n.coords[0] ? "swipeleft" : "swiperight"; return l(r, "swipe", e.Event("swipe", { target: i, swipestart: t, swipestop: n }), !0), l(r, s, e.Event(s, { target: i, swipestart: t, swipestop: n }), !0), !0 } return !1 }, eventInProgress: !1, setup: function () { var t, n = this, r = e(n), s = {}; t = e.data(this, "mobile-events"), t || (t = { length: 0 }, e.data(this, "mobile-events", t)), t.length++, t.swipe = s, s.start = function (t) { if (e.event.special.swipe.eventInProgress) return; e.event.special.swipe.eventInProgress = !0; var r, o = e.event.special.swipe.start(t), u = t.target, l = !1; s.move = function (t) { if (!o) return; r = e.event.special.swipe.stop(t), l || (l = e.event.special.swipe.handleSwipe(o, r, n, u), l && (e.event.special.swipe.eventInProgress = !1)), Math.abs(o.coords[0] - r.coords[0]) > e.event.special.swipe.scrollSupressionThreshold && t.preventDefault() }, s.stop = function () { l = !0, e.event.special.swipe.eventInProgress = !1, i.off(f, s.move), s.move = null }, i.on(f, s.move).one(a, s.stop) }, r.on(u, s.start) }, teardown: function () { var t, n; t = e.data(this, "mobile-events"), t && (n = t.swipe, delete t.swipe, t.length--, t.length === 0 && e.removeData(this, "mobile-events")), n && (n.start && e(this).off(u, n.start), n.move && i.off(f, n.move), n.stop && i.off(a, n.stop)) } }, e.each({ scrollstop: "scrollstart", taphold: "tap", swipeleft: "swipe", swiperight: "swipe" }, function (t, n) { e.event.special[t] = { setup: function () { e(this).bind(n, e.noop) }, teardown: function () { e(this).unbind(n) } } }) }(e, this), function (e) { var t = e("meta[name=viewport]"), n = t.attr("content"), r = n + ",maximum-scale=1, user-scalable=no", i = n + ",maximum-scale=10, user-scalable=yes", s = /(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test(n); e.mobile.zoom = e.extend({}, { enabled: !s, locked: !1, disable: function (n) { !s && !e.mobile.zoom.locked && (t.attr("content", r), e.mobile.zoom.enabled = !1, e.mobile.zoom.locked = n || !1) }, enable: function (n) { !s && (!e.mobile.zoom.locked || n === !0) && (t.attr("content", i), e.mobile.zoom.enabled = !0, e.mobile.zoom.locked = !1) }, restore: function () { s || (t.attr("content", n), e.mobile.zoom.enabled = !0) } }) }(e), function (e, t) { function f(e) { i = e.originalEvent, a = i.accelerationIncludingGravity, s = Math.abs(a.x), o = Math.abs(a.y), u = Math.abs(a.z), !t.orientation && (s > 7 || (u > 6 && o < 8 || u < 8 && o > 6) && s > 5) ? r.enabled && r.disable() : r.enabled || r.enable() } e.mobile.iosorientationfixEnabled = !0; var n = navigator.userAgent, r, i, s, o, u, a; if (!(/iPhone|iPad|iPod/.test(navigator.platform) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(n) && n.indexOf("AppleWebKit") > -1)) { e.mobile.iosorientationfixEnabled = !1; return } r = e.mobile.zoom, e.mobile.document.on("mobileinit", function () { e.mobile.iosorientationfixEnabled && e.mobile.window.bind("orientationchange.iosorientationfix", r.enable).bind("devicemotion.iosorientationfix", f) }) }(e, this) });

!function (a, b, c) { var d = a.jQuery || a.Zepto || a.ender || a.elo; "undefined" != typeof module && module.exports ? module.exports = c(d) : a[b] = c(d) }(this, "Response", function (a) { function b(a) { throw new TypeError(a ? S + "." + a : S) } function c(a) { return a === +a } function d(a, b, c) { for (var d = [], e = a.length, f = 0; e > f;) d[f] = b.call(c, a[f], f++, a); return d } function e(a) { return a ? h("string" == typeof a ? a.split(" ") : a) : [] } function f(a, b, c) { if (null == a) return a; for (var d = a.length, e = 0; d > e;) b.call(c || a[e], a[e], e++, a); return a } function g(a, b, c) { null == b && (b = ""), null == c && (c = ""); for (var d = [], e = a.length, f = 0; e > f; f++) null == a[f] || d.push(b + a[f] + c); return d } function h(a, b, c) { var d, e, f, g = [], h = 0, i = 0, j = "function" == typeof b, k = !0 === c; for (e = a && a.length, c = k ? null : c; e > i; i++) f = a[i], d = j ? !b.call(c, f, i, a) : b ? typeof f !== b : !f, d === k && (g[h++] = f); return g } function i(a, b) { if (null == a || null == b) return a; if ("object" == typeof b && c(b.length)) bb.apply(a, h(b, "undefined", !0)); else for (var d in b) fb.call(b, d) && void 0 !== b[d] && (a[d] = b[d]); return a } function j(a, b, d) { return null == a ? a : ("object" == typeof a && !a.nodeType && c(a.length) ? f(a, b, d) : b.call(d || a, a), a) } function k(a) { return function (b, c) { var d = a(); return d >= (b || 0) && (!c || c >= d) } } function l(a) { var b = V.devicePixelRatio; return null == a ? b || (l(2) ? 2 : l(1.5) ? 1.5 : l(1) ? 1 : 0) : isFinite(a) ? b && b > 0 ? b >= a : (a = "only all and (min--moz-device-pixel-ratio:" + a + ")", Cb(a).matches ? !0 : !!Cb(a.replace("-moz-", "")).matches) : !1 } function m(a) { return a.replace(xb, "$1").replace(wb, function (a, b) { return b.toUpperCase() }) } function n(a) { return "data-" + (a ? a.replace(xb, "$1").replace(vb, "$1-$2").toLowerCase() : a) } function o(a) { var b; return "string" == typeof a && a ? "false" === a ? !1 : "true" === a ? !0 : "null" === a ? null : "undefined" === a || (b = +a) || 0 === b || "NaN" === a ? b : a : a } function p(a) { return a ? 1 === a.nodeType ? a : a[0] && 1 === a[0].nodeType ? a[0] : !1 : !1 } function q(a, b) { var c, d = arguments.length, e = p(this), g = {}, h = !1; if (d) { if (gb(a) && (h = !0, a = a[0]), "string" == typeof a) { if (a = n(a), 1 === d) return g = e.getAttribute(a), h ? o(g) : g; if (this === e || 2 > (c = this.length || 1)) e.setAttribute(a, b); else for (; c--;) c in this && q.apply(this[c], arguments) } else if (a instanceof Object) for (c in a) a.hasOwnProperty(c) && q.call(this, c, a[c]); return this } return e.dataset && "undefined" != typeof DOMStringMap ? e.dataset : (f(e.attributes, function (a) { a && (c = String(a.name).match(xb)) && (g[m(c[1])] = a.value) }), g) } function r(a) { return this && "string" == typeof a && (a = e(a), j(this, function (b) { f(a, function (a) { a && b.removeAttribute(n(a)) }) })), this } function s(a) { return q.apply(a, cb.call(arguments, 1)) } function t(a, b) { return r.call(a, b) } function u(a) { for (var b, c = [], d = 0, e = a.length; e > d;) (b = a[d++]) && c.push("[" + n(b.replace(ub, "").replace(".", "\\.")) + "]"); return c.join() } function v(b) { return a(u(e(b))) } function w() { return window.pageXOffset || X.scrollLeft } function x() { return window.pageYOffset || X.scrollTop } function y(a, b) { var c = a.getBoundingClientRect ? a.getBoundingClientRect() : {}; return b = "number" == typeof b ? b || 0 : 0, { top: (c.top || 0) - b, left: (c.left || 0) - b, bottom: (c.bottom || 0) + b, right: (c.right || 0) + b } } function z(a, b) { var c = y(p(a), b); return !!c && c.right >= 0 && c.left <= Db() } function A(a, b) { var c = y(p(a), b); return !!c && c.bottom >= 0 && c.top <= Eb() } function B(a, b) { var c = y(p(a), b); return !!c && c.bottom >= 0 && c.top <= Eb() && c.right >= 0 && c.left <= Db() } function C(a) { var b = { img: 1, input: 1, source: 3, embed: 3, track: 3, iframe: 5, audio: 5, video: 5, script: 5 }, c = b[a.nodeName.toLowerCase()] || -1; return 4 > c ? c : null != a.getAttribute("src") ? 5 : -5 } function D(a, c, d) { var e; return a && null != c || b("store"), d = "string" == typeof d && d, j(a, function (a) { e = d ? a.getAttribute(d) : 0 < C(a) ? a.getAttribute("src") : a.innerHTML, null == e ? t(a, c) : s(a, c, e) }), N } function E(a, b) { var c = []; return a && b && f(e(b), function (b) { c.push(s(a, b)) }, a), c } function F(a, b) { return "string" == typeof a && "function" == typeof b && (jb[a] = b, kb[a] = 1), N } function G(a) { return Z.on("resize", a), N } function H(a, b) { var c, d, e = Ab.crossover; return "function" == typeof a && (c = b, b = a, a = c), d = a ? "" + a + e : e, Z.on(d, b), N } function I(a) { return j(a, function (a) { Y(a), G(a) }), N } function J(a) { return j(a, function (a) { "object" == typeof a || b("create @args"); var c, d = yb(O).configure(a), e = d.verge, g = d.breakpoints, h = zb("scroll"), i = zb("resize"); g.length && (c = g[0] || g[1] || !1, Y(function () { function a() { d.reset(), f(d.$e, function (a, b) { d[b].decideValue().updateDOM() }).trigger(g) } function b() { f(d.$e, function (a, b) { B(d[b].$e, e) && d[b].updateDOM() }) } var g = Ab.allLoaded, j = !!d.lazy; f(d.target().$e, function (a, b) { d[b] = yb(d).prepareData(a), (!j || B(d[b].$e, e)) && d[b].updateDOM() }), d.dynamic && (d.custom || pb > c) && G(a, i), j && (Z.on(h, b), d.$e.one(g, function () { Z.off(h, b) })) })) }), N } function K(a) { return R[S] === N && (R[S] = T), "function" == typeof a && a.call(R, N), N } function L(a, b) { return "function" == typeof a && a.fn && ((b || void 0 === a.fn.dataset) && (a.fn.dataset = q), (b || void 0 === a.fn.deletes) && (a.fn.deletes = r)), N } if ("function" != typeof a) try { return void console.warn("response.js aborted due to missing dependency") } catch (M) { } var N, O, P, Q, R = this, S = "Response", T = R[S], U = "init" + S, V = window, W = document, X = W.documentElement, Y = a.domReady || a, Z = a(V), $ = V.screen, _ = Array.prototype, ab = Object.prototype, bb = _.push, cb = _.slice, db = _.concat, eb = ab.toString, fb = ab.hasOwnProperty, gb = Array.isArray || function (a) { return "[object Array]" === eb.call(a) }, hb = { width: [0, 320, 481, 641, 961, 1025, 1281], height: [0, 481], ratio: [1, 1.5, 2] }, ib = {}, jb = {}, kb = {}, lb = { all: [] }, mb = 1, nb = $.width, ob = $.height, pb = nb > ob ? nb : ob, qb = nb + ob - pb, rb = function () { return nb }, sb = function () { return ob }, tb = /[^a-z0-9_\-\.]/gi, ub = /^[\W\s]+|[\W\s]+$|/g, vb = /([a-z])([A-Z])/g, wb = /-(.)/g, xb = /^data-(.+)$/, yb = Object.create || function (a) { function b() { } return b.prototype = a, new b }, zb = function (a, b) { return b = b || S, a.replace(ub, "") + "." + b.replace(ub, "") }, Ab = { allLoaded: zb("allLoaded"), crossover: zb("crossover") }, Bb = V.matchMedia || V.msMatchMedia, Cb = Bb || function () { return {} }, Db = function () { var a = X.clientWidth, b = V.innerWidth; return b > a ? b : a }, Eb = function () { var a = X.clientHeight, b = V.innerHeight; return b > a ? b : a }; return P = k(Db), Q = k(Eb), ib.band = k(rb), ib.wave = k(sb), O = function () { function c(a) { return "string" == typeof a ? a.toLowerCase().replace(tb, "") : "" } function j(a, b) { return a - b } var k = Ab.crossover, l = Math.min; return { $e: 0, mode: 0, breakpoints: null, prefix: null, prop: "width", keys: [], dynamic: null, custom: 0, values: [], fn: 0, verge: null, newValue: 0, currValue: 1, aka: null, lazy: null, i: 0, uid: null, reset: function () { for (var a = this.breakpoints, b = a.length, c = 0; !c && b--;) this.fn(a[b]) && (c = b); return c !== this.i && (Z.trigger(k).trigger(this.prop + k), this.i = c || 0), this }, configure: function (a) { i(this, a); var k, m, n, o, p, q = !0, r = this.prop; if (this.uid = mb++, null == this.verge && (this.verge = l(pb, 500)), this.fn = jb[r] || b("create @fn"), null == this.dynamic && (this.dynamic = "device" !== r.slice(0, 6)), this.custom = kb[r], n = this.prefix ? h(d(e(this.prefix), c)) : ["min-" + r + "-"], o = 1 < n.length ? n.slice(1) : 0, this.prefix = n[0], m = this.breakpoints, gb(m) ? (f(m, function (a) { if (!a && 0 !== a) throw "invalid breakpoint"; q = q && isFinite(a) }), q && m.sort(j), m.length || b("create @breakpoints")) : m = hb[r] || hb[r.split("-").pop()] || b("create @prop"), this.breakpoints = q ? h(m, function (a) { return pb >= a }) : m, this.keys = g(this.breakpoints, this.prefix), this.aka = null, o) { for (p = [], k = o.length; k--;) p.push(g(this.breakpoints, o[k])); this.aka = p, this.keys = db.apply(this.keys, p) } return lb.all = lb.all.concat(lb[this.uid] = this.keys), this }, target: function () { return this.$e = a(u(lb[this.uid])), D(this.$e, U), this.keys.push(U), this }, decideValue: function () { for (var a = null, b = this.breakpoints, c = b.length, d = c; null == a && d--;) this.fn(b[d]) && (a = this.values[d]); return this.newValue = "string" == typeof a ? a : this.values[c], this }, prepareData: function (b) { if (this.$e = a(b), this.mode = C(b), this.values = E(this.$e, this.keys), this.aka) for (var c = this.aka.length; c--;) this.values = i(this.values, E(this.$e, this.aka[c])); return this.decideValue() }, updateDOM: function () { return this.currValue === this.newValue ? this : (this.currValue = this.newValue, 0 < this.mode ? this.$e[0].setAttribute("src", this.newValue) : null == this.newValue ? this.$e.empty && this.$e.empty() : this.$e.html ? this.$e.html(this.newValue) : (this.$e.empty && this.$e.empty(), this.$e[0].innerHTML = this.newValue), this) } } }(), jb.width = P, jb.height = Q, jb["device-width"] = ib.band, jb["device-height"] = ib.wave, jb["device-pixel-ratio"] = l, N = { deviceMin: function () { return qb }, deviceMax: function () { return pb }, noConflict: K, bridge: L, create: J, addTest: F, datatize: n, camelize: m, render: o, store: D, access: E, target: v, object: yb, crossover: H, action: I, resize: G, ready: Y, affix: g, sift: h, dpr: l, deletes: t, scrollX: w, scrollY: x, deviceW: rb, deviceH: sb, device: ib, inX: z, inY: A, route: j, merge: i, media: Cb, wave: Q, band: P, map: d, each: f, inViewport: B, dataset: s, viewportH: Eb, viewportW: Db }, Y(function () { var b = s(W.body, "responsejs"), c = V.JSON && JSON.parse || a.parseJSON; b = b && c ? c(b) : b, b && b.create && J(b.create), X.className = X.className.replace(/(^|\s)(no-)?responsejs(\s|$)/, "$1$3") + " responsejs " }), N });


(function ($) {

    $(document).ready(function () {


    });


    // Response plugin
    var initResponse = function () {
        Response.create({
            mode: "markup",
            prop: "width",
            prefix: "r",
            breakpoints: [0, 350, 750, 1000, 1200, 1400, 1600]
        });

        Response.create({
            mode: "src",
            prop: "width",
            prefix: "src",
            breakpoints: [0, 350, 750, 1000, 1200, 1400, 1600]
        });
    };
    initResponse();

    // Sidebar (menu)
    var initSidebar = function () {

        // Toggle sidebar open class on menu trigger click
        $(document).on('tap.sidebar', '.pageHeader .menu-trigger', function (event) {

            $('body').toggleClass('pushed');

            event.preventDefault();
        });

        // close sidebar on click off
        $(document).on('tap.sidebar', function () {
            $('body').removeClass('pushed');
        });
        $(document).on('tap.sidebar', '.sidebar, .pageHeader .menu-trigger', function (event) {
            event.stopPropagation();
        });

        // Widen menu on hover (desktop)
        $(document).on('mouseover.sidebar', '.sidebar a, .pageHeader', function (event) {

            $('body').addClass('hover-pushed');
        });

        $(document).on('mouseleave.sidebar', '.sidebar, .pageHeader', function (event) {

            $('body').removeClass('hover-pushed');
        });
    };
    initSidebar();

    // Share Menu
    var initShareMenu = function () {

        // Toggle sidebar open class on menu trigger click
        $(document).on('tap.shareMenu', '.share-menu-trigger', function (event) {

            $('.shareMenu').toggleClass('open');

            event.preventDefault();
        });

        // close shareMenu on click off
        $(document).on('tap.shareMenu', function () {
            $('.shareMenu').removeClass('open');
        });
        $(document).on('tap.shareMenu', '.shareMenu, .share-menu-trigger', function (event) {
            event.stopPropagation();
        });
    };
    initShareMenu();

    // Smooth Scroll
    var initSmoothScroll = function () {

        // Smooth Scroll
        var scrollOff = 0;
        $(window).on('throttledresize', function () {
            // Adjust scroll offset for hover links
            if (Response.band(0, 1199)) {
                scrollOff = $('.pageHeader').height();
            } else {
                scrollOff = 0;
            }
        }).trigger('throttledresize');

        $(document).on('tap.smoothScroll', '.smoothScroll', function (event) {
            var linkto = $(this).attr('href');

            $('html, body').animate({
                scrollTop: $(linkto).offset().top - scrollOff
            }, 500);

            event.preventDefault();
        });
    };
    initSmoothScroll();


    // Waypoints
    var initWaypoints = function () {

        // Add waypoint animations on desktop only
        if (Response.band(1200)) {

            var sectionName = '';

            // section-seperators
            $('.section-seperator').waypoint(function () {
                $(this).addClass('in-point');
            }, { offset: '70%' });

            // Timeline
            $('.timeline li').waypoint(function () {
                $(this).addClass('in-point');
            }, { offset: '95%' });

            // Icon stats
            $('.rounded-icon').waypoint(function () {
                $(this).addClass('in-point');
            }, { offset: '50%' });

            // Audience (B2B - B2C)
            $('.section-audience .container-template').waypoint(function () {
                $(this).addClass('in-point');
            }, { offset: '80%' });

            // Centered Titles
            $('.section-intro h1, headergroup h2').waypoint(function () {
                $(this).addClass('in-point');
            }, { offset: '85%' });

            // Keep side navigation up to date
            $('section').waypoint(function (direction) {
                sectionName = $(this).attr('id');
                $('.mainMenu a[href="#' + sectionName + '"]').toggleClass('selected', direction === 'down');
            }, { offset: '70%' })
            .waypoint(function (direction) {
                sectionName = $(this).attr('id');
                $('.mainMenu a[href="#' + sectionName + '"]').toggleClass('selected', direction === 'up');
            }, {
                offset: function () { return -$(this).height() * 0.8; }
            });

        } else {
            $('.section-intro h1, headergroup h2, .section-seperator, .timeline li, .rounded-icon, .section-audience .container-template').addClass('in-point');
        }
    };
    initWaypoints();

    // Parallax
    var initParallax = function () {

        $.stellar({
            horizontalOffset: 90,
            responsive: true,
        });

        // Turn off (prevent bg position change) on mobile
        $(window).on('throttledresize.parallax', function (event) {

            if (!Response.band(1200)) {
                $('.section-membership-section-seperator, .section-intro').addClass('dont-scroll');
            } else {
                $('.section-membership-section-seperator, .section-intro').removeClass('dont-scroll');
            }

        }).trigger('throttledresize');
    };
    initParallax();

    // Statistics
    var initStatisics = function () {

        // Bar Chart - waypoint on desktop only
        if (Response.band(1200)) {
            $('.barChart').waypoint(function (direction) {
                setBarChart();
            },
            {
                offset: '60%',
                triggerOnce: true
            });
        } else {
            setBarChart();
        }

        function setBarChart() {
            $('.barChart').find('.bar').each(function () {
                var height = $(this).data('percentage') - 2;
                $(this).height(height + '%');
            });
        }


        // Pie Chart - waypoint on desktop only
        var pieChartSection_count = $('.pieChart .pie-section').length,
            startPoint = 0,
            degrees = 0,
            coord_x = 0,
            coord_y = 0,
            chartRadius = 0;

        // Initial setup (correct start points)
        $('.pieChart .pie-section').each(function () {

            startPoint = $(this).data('start');

            $(this).css({
                '-webkit-transform': 'rotate(' + startPoint + 'deg)',
                '-moz-transform': 'rotate(' + startPoint + 'deg)',
                '-ms-transform': 'rotate(' + startPoint + 'deg)',
                'transform': 'rotate(' + startPoint + 'deg)',
            });
        });

        // Labels
        $(window).on('throttledresize.pieChart', function (event) {

            chartRadius = $('.pieChart').width() / 2;

            // Position Labels
            $('.pieChart .pie-section-label').each(function () {

                // Calculate position of tip (uses trig in php)
                coord_x = $(this).data('x') * (chartRadius + 20);
                coord_y = $(this).data('y') * (chartRadius + 20);

                // Left or right tip
                if (coord_x < 0) {
                    $(this).addClass('tooltip-left');
                    $(this).css({
                        'right': coord_x * -1,
                        'top': coord_y
                    });
                } else {
                    $(this).addClass('tooltip-right');
                    $(this).css({
                        'left': coord_x,
                        'top': coord_y
                    });
                }
            });

        }).trigger('throttledresize');

        // Rotate and fade when into view
        if (Response.band(1200)) {
            $('.pieChart').waypoint(function (direction) {
                setPieChart();
            },
            {
                offset: '60%',
                triggerOnce: true
            });
        } else {
            setPieChart();
        }

        function setPieChart() {
            $('.pieChart').addClass('in-point');

            $('.pieChart .pie-section').each(function () {

                startPoint = $(this).data('start');
                degrees = $(this).data('degrees') + 1;

                $(this).css({
                    '-webkit-transform': 'rotate(' + startPoint + 'deg)',
                    '-moz-transform': 'rotate(' + startPoint + 'deg)',
                    '-ms-transform': 'rotate(' + startPoint + 'deg)',
                    'transform': 'rotate(' + startPoint + 'deg)'
                });

                $(this).find('.pie-section-before').css({
                    '-webkit-transform': 'rotate(' + degrees + 'deg)',
                    '-moz-transform': 'rotate(' + degrees + 'deg)',
                    '-ms-transform': 'rotate(' + degrees + 'deg)',
                    'transform': 'rotate(' + degrees + 'deg)',
                    'opacity': '1'
                });
            });
        }
    };

    initStatisics();
    // Testimonial swiper
    var initTestimonialSwiper = function () {
        var testimonialSwiper = new Swiper('.testimonials-container', {
            loop: true,
            simulateTouch: false,
            autoplay: 5000,
            paginationElement: 'div',
            pagination: '.testimonials-pagination',
            paginationClickable: true,
            wrapperClass: 'testimonials-wrapper',
            slideClass: 'testimonials-slide',
            slideElement: 'li',
            calculateHeight: true,
            resizeReInit: true,
        });

        if (testimonialSwiper.browser.ie8) {
            testimonialSwiper.destroy(true);
            $('.testimonials-container *').removeAttr('style');
        }
    };
    initTestimonialSwiper();

    // Profile swiper
    var initProfileSwiper = function () {
        var profileSwiperOptions = {
            loop: true,
            simulateTouch: false,
            paginationElement: 'div',
            pagination: '.profile-pagination',
            paginationClickable: true,
            wrapperClass: 'profile-wrapper',
            slideClass: 'profile-slide',
            slideElement: 'div',
            resizeReInit: true,
            calculateHeight: true,
            roundLengths: true,
        },
            profileSwiper,
            profileSwiperInit = false;

        // Enable only at 750px+
        $(window).on('throttledresize.profileSwiper', function (event) {

            if (Response.band(750)) {
                if (!profileSwiperInit) {
                    profileSwiper = $('.profile-container').swiper(profileSwiperOptions);
                    profileSwiperInit = true;

                    if (profileSwiper.browser.ie8) {
                        profileSwiper.destroy(true);
                        $('.profile-container *').removeAttr('style');
                    }
                }
            } else {
                if (profileSwiperInit) {
                    $('.profile-container *').removeAttr('style');
                    profileSwiper.destroy(true);
                    profileSwiperInit = false;
                }
            }
        }).trigger('throttledresize');

        // Attach L/R navigation
        $(document).on('tap.profileSwiper', '.profile-nav', function (event) {

            if ($(this).hasClass('profile-nav-next')) {
                profileSwiper.swipeNext();
            } else if ($(this).hasClass('profile-nav-prev')) {
                profileSwiper.swipePrev();
            }

            event.preventDefault();
        });
    };
    initProfileSwiper();

    // Pricing swiper
    var initPricingSwiper = function () {

        var pricingSwiperOptions = {
            loop: true,
            simulateTouch: false,
            wrapperClass: 'pricing-wrapper',
            slideClass: 'pricing-slide',
            slideElement: 'div',
            calculateHeight: true,

            onSlideChangeStart: function (swiper) {
                // Update nav
                currentSlide = swiper.activeLoopIndex;
                $('.pricing-menu li:eq(' + currentSlide + ')').addClass('selected').siblings().removeClass('selected');
            },
        },
            pricingSwiper,
            pricingSwiperInit = false;


        // Enable only at 750px+
        $(window).on('throttledresize.pricing', function (event) {

            if (Response.band(750)) {
                if (!pricingSwiperInit) {
                    pricingSwiper = $('.pricing-container').swiper(pricingSwiperOptions);
                    pricingSwiperInit = true;

                    if (pricingSwiper.browser.ie8) {
                        pricingSwiper.destroy(true);
                        $('.pricing-container *').removeAttr('style');
                    }
                }
            } else {
                if (pricingSwiperInit) {
                    $('.pricing-container *').removeAttr('style');
                    pricingSwiper.destroy(true);
                    pricingSwiperInit = false;
                }
            }
        }).trigger('throttledresize');

        // On nav click
        $(document).on('tap.pricing', '.pricing-menu li', function (event) {

            var slideIndex = $(this).index();

            pricingSwiper.swipeTo(slideIndex);

            event.preventDefault();
        });

        // Attach L/R navigation
        $(document).on('tap.pricing', '.pricing-nav', function (event) {

            if ($(this).hasClass('pricing-nav-next')) {
                pricingSwiper.swipeNext();
            } else if ($(this).hasClass('pricing-nav-prev')) {
                pricingSwiper.swipePrev();
            }

            event.preventDefault();
        });
    };
    initPricingSwiper();


})(jQuery);