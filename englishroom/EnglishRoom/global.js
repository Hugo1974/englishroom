if (function (n) {
        "function" == typeof define && define.amd ? define(["jquery"], n) : n(jQuery)
    }(function (n) {
        function t(t, r) {
            var u, f, e, o = t.nodeName.toLowerCase();
            return "area" === o ? (u = t.parentNode, f = u.name, t.href && f && "map" === u.nodeName.toLowerCase() ? (e = n("img[usemap='#" + f + "']")[0], !!e && i(e)) : !1) : (/input|select|textarea|button|object/.test(o) ? !t.disabled : "a" === o ? t.href || r : r) && i(t)
        }

        function i(t) {
            return n.expr.filters.visible(t) && !n(t).parents().addBack().filter(function () {
                return "hidden" === n.css(this, "visibility")
            }).length
        }
        n.ui = n.ui || {};
        n.extend(n.ui, {
            version: "1.11.2",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        });
        n.fn.extend({
            scrollParent: function (t) {
                var i = this.css("position"),
                    u = "absolute" === i,
                    f = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                    r = this.parents().filter(function () {
                        var t = n(this);
                        return u && "static" === t.css("position") ? !1 : f.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
                    }).eq(0);
                return "fixed" !== i && r.length ? r : n(this[0].ownerDocument || document)
            },
            uniqueId: function () {
                var n = 0;
                return function () {
                    return this.each(function () {
                        this.id || (this.id = "ui-id-" + ++n)
                    })
                }
            }(),
            removeUniqueId: function () {
                return this.each(function () {
                    /^ui-id-\d+$/.test(this.id) && n(this).removeAttr("id")
                })
            }
        });
        n.extend(n.expr[":"], {
            data: n.expr.createPseudo ? n.expr.createPseudo(function (t) {
                return function (i) {
                    return !!n.data(i, t)
                }
            }) : function (t, i, r) {
                return !!n.data(t, r[3])
            },
            focusable: function (i) {
                return t(i, !isNaN(n.attr(i, "tabindex")))
            },
            tabbable: function (i) {
                var r = n.attr(i, "tabindex"),
                    u = isNaN(r);
                return (u || r >= 0) && t(i, !u)
            }
        });
        n("<a>").outerWidth(1).jquery || n.each(["Width", "Height"], function (t, i) {
            function r(t, i, r, u) {
                return n.each(e, function () {
                    i -= parseFloat(n.css(t, "padding" + this)) || 0;
                    r && (i -= parseFloat(n.css(t, "border" + this + "Width")) || 0);
                    u && (i -= parseFloat(n.css(t, "margin" + this)) || 0)
                }), i
            }
            var e = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
                u = i.toLowerCase(),
                f = {
                    innerWidth: n.fn.innerWidth,
                    innerHeight: n.fn.innerHeight,
                    outerWidth: n.fn.outerWidth,
                    outerHeight: n.fn.outerHeight
                };
            n.fn["inner" + i] = function (t) {
                return void 0 === t ? f["inner" + i].call(this) : this.each(function () {
                    n(this).css(u, r(this, t) + "px")
                })
            };
            n.fn["outer" + i] = function (t, e) {
                return "number" != typeof t ? f["outer" + i].call(this, t) : this.each(function () {
                    n(this).css(u, r(this, t, !0, e) + "px")
                })
            }
        });
        n.fn.addBack || (n.fn.addBack = function (n) {
            return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
        });
        n("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (n.fn.removeData = function (t) {
            return function (i) {
                return arguments.length ? t.call(this, n.camelCase(i)) : t.call(this)
            }
        }(n.fn.removeData));
        n.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
        n.fn.extend({
            focus: function (t) {
                return function (i, r) {
                    return "number" == typeof i ? this.each(function () {
                        var t = this;
                        setTimeout(function () {
                            n(t).focus();
                            r && r.call(t)
                        }, i)
                    }) : t.apply(this, arguments)
                }
            }(n.fn.focus),
            disableSelection: function () {
                var n = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
                return function () {
                    return this.bind(n + ".ui-disableSelection", function (n) {
                        n.preventDefault()
                    })
                }
            }(),
            enableSelection: function () {
                return this.unbind(".ui-disableSelection")
            },
            zIndex: function (t) {
                if (void 0 !== t) return this.css("zIndex", t);
                if (this.length)
                    for (var r, u, i = n(this[0]); i.length && i[0] !== document;) {
                        if (r = i.css("position"), ("absolute" === r || "relative" === r || "fixed" === r) && (u = parseInt(i.css("zIndex"), 10), !isNaN(u) && 0 !== u)) return u;
                        i = i.parent()
                    }
                return 0
            }
        });
        n.ui.plugin = {
            add: function (t, i, r) {
                var u, f = n.ui[t].prototype;
                for (u in r) f.plugins[u] = f.plugins[u] || [], f.plugins[u].push([i, r[u]])
            },
            call: function (n, t, i, r) {
                var u, f = n.plugins[t];
                if (f && (r || n.element[0].parentNode && 11 !== n.element[0].parentNode.nodeType))
                    for (u = 0; f.length > u; u++) n.options[f[u][0]] && f[u][1].apply(n.element, i)
            }
        };
        var u = 0,
            r = Array.prototype.slice;
        n.cleanData = function (t) {
            return function (i) {
                for (var r, u, f = 0; null != (u = i[f]); f++) try {
                    r = n._data(u, "events");
                    r && r.remove && n(u).triggerHandler("remove")
                } catch (e) {}
                t(i)
            }
        }(n.cleanData);
        n.widget = function (t, i, r) {
            var s, f, u, o, h = {},
                e = t.split(".")[0];
            return t = t.split(".")[1], s = e + "-" + t, r || (r = i, i = n.Widget), n.expr[":"][s.toLowerCase()] = function (t) {
                return !!n.data(t, s)
            }, n[e] = n[e] || {}, f = n[e][t], u = n[e][t] = function (n, t) {
                return this._createWidget ? (arguments.length && this._createWidget(n, t), void 0) : new u(n, t)
            }, n.extend(u, f, {
                version: r.version,
                _proto: n.extend({}, r),
                _childConstructors: []
            }), o = new i, o.options = n.widget.extend({}, o.options), n.each(r, function (t, r) {
                return n.isFunction(r) ? (h[t] = function () {
                    var n = function () {
                            return i.prototype[t].apply(this, arguments)
                        },
                        u = function (n) {
                            return i.prototype[t].apply(this, n)
                        };
                    return function () {
                        var t, i = this._super,
                            f = this._superApply;
                        return this._super = n, this._superApply = u, t = r.apply(this, arguments), this._super = i, this._superApply = f, t
                    }
                }(), void 0) : (h[t] = r, void 0)
            }), u.prototype = n.widget.extend(o, {
                widgetEventPrefix: f ? o.widgetEventPrefix || t : t
            }, h, {
                constructor: u,
                namespace: e,
                widgetName: t,
                widgetFullName: s
            }), f ? (n.each(f._childConstructors, function (t, i) {
                var r = i.prototype;
                n.widget(r.namespace + "." + r.widgetName, u, i._proto)
            }), delete f._childConstructors) : i._childConstructors.push(u), n.widget.bridge(t, u), u
        };
        n.widget.extend = function (t) {
            for (var i, u, e = r.call(arguments, 1), f = 0, o = e.length; o > f; f++)
                for (i in e[f]) u = e[f][i], e[f].hasOwnProperty(i) && void 0 !== u && (t[i] = n.isPlainObject(u) ? n.isPlainObject(t[i]) ? n.widget.extend({}, t[i], u) : n.widget.extend({}, u) : u);
            return t
        };
        n.widget.bridge = function (t, i) {
            var u = i.prototype.widgetFullName || t;
            n.fn[t] = function (f) {
                var s = "string" == typeof f,
                    o = r.call(arguments, 1),
                    e = this;
                return f = !s && o.length ? n.widget.extend.apply(null, [f].concat(o)) : f, s ? this.each(function () {
                    var i, r = n.data(this, u);
                    return "instance" === f ? (e = r, !1) : r ? n.isFunction(r[f]) && "_" !== f.charAt(0) ? (i = r[f].apply(r, o), i !== r && void 0 !== i ? (e = i && i.jquery ? e.pushStack(i.get()) : i, !1) : void 0) : n.error("no such method '" + f + "' for " + t + " widget instance") : n.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + f + "'")
                }) : this.each(function () {
                    var t = n.data(this, u);
                    t ? (t.option(f || {}), t._init && t._init()) : n.data(this, u, new i(f, this))
                }), e
            }
        };
        n.Widget = function () {};
        n.Widget._childConstructors = [];
        n.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function (t, i) {
                i = n(i || this.defaultElement || this)[0];
                this.element = n(i);
                this.uuid = u++;
                this.eventNamespace = "." + this.widgetName + this.uuid;
                this.bindings = n();
                this.hoverable = n();
                this.focusable = n();
                i !== this && (n.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function (n) {
                        n.target === i && this.destroy()
                    }
                }), this.document = n(i.style ? i.ownerDocument : i.document || i), this.window = n(this.document[0].defaultView || this.document[0].parentWindow));
                this.options = n.widget.extend({}, this.options, this._getCreateOptions(), t);
                this._create();
                this._trigger("create", null, this._getCreateEventData());
                this._init()
            },
            _getCreateOptions: n.noop,
            _getCreateEventData: n.noop,
            _create: n.noop,
            _init: n.noop,
            destroy: function () {
                this._destroy();
                this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(n.camelCase(this.widgetFullName));
                this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
                this.bindings.unbind(this.eventNamespace);
                this.hoverable.removeClass("ui-state-hover");
                this.focusable.removeClass("ui-state-focus")
            },
            _destroy: n.noop,
            widget: function () {
                return this.element
            },
            option: function (t, i) {
                var r, u, f, e = t;
                if (0 === arguments.length) return n.widget.extend({}, this.options);
                if ("string" == typeof t)
                    if (e = {}, r = t.split("."), t = r.shift(), r.length) {
                        for (u = e[t] = n.widget.extend({}, this.options[t]), f = 0; r.length - 1 > f; f++) u[r[f]] = u[r[f]] || {}, u = u[r[f]];
                        if (t = r.pop(), 1 === arguments.length) return void 0 === u[t] ? null : u[t];
                        u[t] = i
                    } else {
                        if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
                        e[t] = i
                    } return this._setOptions(e), this
            },
            _setOptions: function (n) {
                for (var t in n) this._setOption(t, n[t]);
                return this
            },
            _setOption: function (n, t) {
                return this.options[n] = t, "disabled" === n && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
            },
            enable: function () {
                return this._setOptions({
                    disabled: !1
                })
            },
            disable: function () {
                return this._setOptions({
                    disabled: !0
                })
            },
            _on: function (t, i, r) {
                var f, u = this;
                "boolean" != typeof t && (r = i, i = t, t = !1);
                r ? (i = f = n(i), this.bindings = this.bindings.add(i)) : (r = i, i = this.element, f = this.widget());
                n.each(r, function (r, e) {
                    function o() {
                        if (t || u.options.disabled !== !0 && !n(this).hasClass("ui-state-disabled")) return ("string" == typeof e ? u[e] : e).apply(u, arguments)
                    }
                    "string" != typeof e && (o.guid = e.guid = e.guid || o.guid || n.guid++);
                    var s = r.match(/^([\w:-]*)\s*(.*)$/),
                        h = s[1] + u.eventNamespace,
                        c = s[2];
                    c ? f.delegate(c, h, o) : i.bind(h, o)
                })
            },
            _off: function (t, i) {
                i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
                t.unbind(i).undelegate(i);
                this.bindings = n(this.bindings.not(t).get());
                this.focusable = n(this.focusable.not(t).get());
                this.hoverable = n(this.hoverable.not(t).get())
            },
            _delay: function (n, t) {
                function r() {
                    return ("string" == typeof n ? i[n] : n).apply(i, arguments)
                }
                var i = this;
                return setTimeout(r, t || 0)
            },
            _hoverable: function (t) {
                this.hoverable = this.hoverable.add(t);
                this._on(t, {
                    mouseenter: function (t) {
                        n(t.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function (t) {
                        n(t.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function (t) {
                this.focusable = this.focusable.add(t);
                this._on(t, {
                    focusin: function (t) {
                        n(t.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function (t) {
                        n(t.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function (t, i, r) {
                var u, f, e = this.options[t];
                if (r = r || {}, i = n.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], f = i.originalEvent)
                    for (u in f) u in i || (i[u] = f[u]);
                return this.element.trigger(i, r), !(n.isFunction(e) && e.apply(this.element[0], [i].concat(r)) === !1 || i.isDefaultPrevented())
            }
        };
        n.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function (t, i) {
            n.Widget.prototype["_" + t] = function (r, u, f) {
                "string" == typeof u && (u = {
                    effect: u
                });
                var o, e = u ? u === !0 || "number" == typeof u ? i : u.effect || i : t;
                u = u || {};
                "number" == typeof u && (u = {
                    duration: u
                });
                o = !n.isEmptyObject(u);
                u.complete = f;
                u.delay && r.delay(u.delay);
                o && n.effects && n.effects.effect[e] ? r[t](u) : e !== t && r[e] ? r[e](u.duration, u.easing, f) : r.queue(function (i) {
                    n(this)[t]();
                    f && f.call(r[0]);
                    i()
                })
            }
        });
        n.widget,
            function () {
                function f(n, t, i) {
                    return [parseFloat(n[0]) * (a.test(n[0]) ? t / 100 : 1), parseFloat(n[1]) * (a.test(n[1]) ? i / 100 : 1)]
                }

                function i(t, i) {
                    return parseInt(n.css(t, i), 10) || 0
                }

                function v(t) {
                    var i = t[0];
                    return 9 === i.nodeType ? {
                        width: t.width(),
                        height: t.height(),
                        offset: {
                            top: 0,
                            left: 0
                        }
                    } : n.isWindow(i) ? {
                        width: t.width(),
                        height: t.height(),
                        offset: {
                            top: t.scrollTop(),
                            left: t.scrollLeft()
                        }
                    } : i.preventDefault ? {
                        width: 0,
                        height: 0,
                        offset: {
                            top: i.pageY,
                            left: i.pageX
                        }
                    } : {
                        width: t.outerWidth(),
                        height: t.outerHeight(),
                        offset: t.offset()
                    }
                }
                n.ui = n.ui || {};
                var u, e, r = Math.max,
                    t = Math.abs,
                    o = Math.round,
                    s = /left|center|right/,
                    h = /top|center|bottom/,
                    c = /[\+\-]\d+(\.[\d]+)?%?/,
                    l = /^\w+/,
                    a = /%$/,
                    y = n.fn.position;
                n.position = {
                    scrollbarWidth: function () {
                        if (void 0 !== u) return u;
                        var r, i, t = n("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'><\/div><\/div>"),
                            f = t.children()[0];
                        return n("body").append(t), r = f.offsetWidth, t.css("overflow", "scroll"), i = f.offsetWidth, r === i && (i = t[0].clientWidth), t.remove(), u = r - i
                    },
                    getScrollInfo: function (t) {
                        var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
                            r = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
                            u = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth,
                            f = "scroll" === r || "auto" === r && t.height < t.element[0].scrollHeight;
                        return {
                            width: f ? n.position.scrollbarWidth() : 0,
                            height: u ? n.position.scrollbarWidth() : 0
                        }
                    },
                    getWithinInfo: function (t) {
                        var i = n(t || window),
                            r = n.isWindow(i[0]),
                            u = !!i[0] && 9 === i[0].nodeType;
                        return {
                            element: i,
                            isWindow: r,
                            isDocument: u,
                            offset: i.offset() || {
                                left: 0,
                                top: 0
                            },
                            scrollLeft: i.scrollLeft(),
                            scrollTop: i.scrollTop(),
                            width: r || u ? i.width() : i.outerWidth(),
                            height: r || u ? i.height() : i.outerHeight()
                        }
                    }
                };
                n.fn.position = function (u) {
                    if (!u || !u.of) return y.apply(this, arguments);
                    u = n.extend({}, u);
                    var k, a, p, b, w, g, nt = n(u.of),
                        it = n.position.getWithinInfo(u.within),
                        rt = n.position.getScrollInfo(it),
                        d = (u.collision || "flip").split(" "),
                        tt = {};
                    return g = v(nt), nt[0].preventDefault && (u.at = "left top"), a = g.width, p = g.height, b = g.offset, w = n.extend({}, b), n.each(["my", "at"], function () {
                        var t, i, n = (u[this] || "").split(" ");
                        1 === n.length && (n = s.test(n[0]) ? n.concat(["center"]) : h.test(n[0]) ? ["center"].concat(n) : ["center", "center"]);
                        n[0] = s.test(n[0]) ? n[0] : "center";
                        n[1] = h.test(n[1]) ? n[1] : "center";
                        t = c.exec(n[0]);
                        i = c.exec(n[1]);
                        tt[this] = [t ? t[0] : 0, i ? i[0] : 0];
                        u[this] = [l.exec(n[0])[0], l.exec(n[1])[0]]
                    }), 1 === d.length && (d[1] = d[0]), "right" === u.at[0] ? w.left += a : "center" === u.at[0] && (w.left += a / 2), "bottom" === u.at[1] ? w.top += p : "center" === u.at[1] && (w.top += p / 2), k = f(tt.at, a, p), w.left += k[0], w.top += k[1], this.each(function () {
                        var y, g, h = n(this),
                            c = h.outerWidth(),
                            l = h.outerHeight(),
                            ut = i(this, "marginLeft"),
                            ft = i(this, "marginTop"),
                            et = c + ut + i(this, "marginRight") + rt.width,
                            ot = l + ft + i(this, "marginBottom") + rt.height,
                            s = n.extend({}, w),
                            v = f(tt.my, h.outerWidth(), h.outerHeight());
                        "right" === u.my[0] ? s.left -= c : "center" === u.my[0] && (s.left -= c / 2);
                        "bottom" === u.my[1] ? s.top -= l : "center" === u.my[1] && (s.top -= l / 2);
                        s.left += v[0];
                        s.top += v[1];
                        e || (s.left = o(s.left), s.top = o(s.top));
                        y = {
                            marginLeft: ut,
                            marginTop: ft
                        };
                        n.each(["left", "top"], function (t, i) {
                            n.ui.position[d[t]] && n.ui.position[d[t]][i](s, {
                                targetWidth: a,
                                targetHeight: p,
                                elemWidth: c,
                                elemHeight: l,
                                collisionPosition: y,
                                collisionWidth: et,
                                collisionHeight: ot,
                                offset: [k[0] + v[0], k[1] + v[1]],
                                my: u.my,
                                at: u.at,
                                within: it,
                                elem: h
                            })
                        });
                        u.using && (g = function (n) {
                            var i = b.left - s.left,
                                o = i + a - c,
                                f = b.top - s.top,
                                v = f + p - l,
                                e = {
                                    target: {
                                        element: nt,
                                        left: b.left,
                                        top: b.top,
                                        width: a,
                                        height: p
                                    },
                                    element: {
                                        element: h,
                                        left: s.left,
                                        top: s.top,
                                        width: c,
                                        height: l
                                    },
                                    horizontal: 0 > o ? "left" : i > 0 ? "right" : "center",
                                    vertical: 0 > v ? "top" : f > 0 ? "bottom" : "middle"
                                };
                            c > a && a > t(i + o) && (e.horizontal = "center");
                            l > p && p > t(f + v) && (e.vertical = "middle");
                            e.important = r(t(i), t(o)) > r(t(f), t(v)) ? "horizontal" : "vertical";
                            u.using.call(this, n, e)
                        });
                        h.offset(n.extend(s, {
                            using: g
                        }))
                    })
                };
                n.ui.position = {
                        fit: {
                            left: function (n, t) {
                                var h, e = t.within,
                                    u = e.isWindow ? e.scrollLeft : e.offset.left,
                                    o = e.width,
                                    s = n.left - t.collisionPosition.marginLeft,
                                    i = u - s,
                                    f = s + t.collisionWidth - o - u;
                                t.collisionWidth > o ? i > 0 && 0 >= f ? (h = n.left + i + t.collisionWidth - o - u, n.left += i - h) : n.left = f > 0 && 0 >= i ? u : i > f ? u + o - t.collisionWidth : u : i > 0 ? n.left += i : f > 0 ? n.left -= f : n.left = r(n.left - s, n.left)
                            },
                            top: function (n, t) {
                                var h, o = t.within,
                                    u = o.isWindow ? o.scrollTop : o.offset.top,
                                    e = t.within.height,
                                    s = n.top - t.collisionPosition.marginTop,
                                    i = u - s,
                                    f = s + t.collisionHeight - e - u;
                                t.collisionHeight > e ? i > 0 && 0 >= f ? (h = n.top + i + t.collisionHeight - e - u, n.top += i - h) : n.top = f > 0 && 0 >= i ? u : i > f ? u + e - t.collisionHeight : u : i > 0 ? n.top += i : f > 0 ? n.top -= f : n.top = r(n.top - s, n.top)
                            }
                        },
                        flip: {
                            left: function (n, i) {
                                var o, s, r = i.within,
                                    y = r.offset.left + r.scrollLeft,
                                    c = r.width,
                                    h = r.isWindow ? r.scrollLeft : r.offset.left,
                                    l = n.left - i.collisionPosition.marginLeft,
                                    a = l - h,
                                    v = l + i.collisionWidth - c - h,
                                    u = "left" === i.my[0] ? -i.elemWidth : "right" === i.my[0] ? i.elemWidth : 0,
                                    f = "left" === i.at[0] ? i.targetWidth : "right" === i.at[0] ? -i.targetWidth : 0,
                                    e = -2 * i.offset[0];
                                0 > a ? (o = n.left + u + f + e + i.collisionWidth - c - y, (0 > o || t(a) > o) && (n.left += u + f + e)) : v > 0 && (s = n.left - i.collisionPosition.marginLeft + u + f + e - h, (s > 0 || v > t(s)) && (n.left += u + f + e))
                            },
                            top: function (n, i) {
                                var o, s, r = i.within,
                                    y = r.offset.top + r.scrollTop,
                                    a = r.height,
                                    h = r.isWindow ? r.scrollTop : r.offset.top,
                                    v = n.top - i.collisionPosition.marginTop,
                                    c = v - h,
                                    l = v + i.collisionHeight - a - h,
                                    p = "top" === i.my[1],
                                    u = p ? -i.elemHeight : "bottom" === i.my[1] ? i.elemHeight : 0,
                                    f = "top" === i.at[1] ? i.targetHeight : "bottom" === i.at[1] ? -i.targetHeight : 0,
                                    e = -2 * i.offset[1];
                                0 > c ? (s = n.top + u + f + e + i.collisionHeight - a - y, n.top + u + f + e > c && (0 > s || t(c) > s) && (n.top += u + f + e)) : l > 0 && (o = n.top - i.collisionPosition.marginTop + u + f + e - h, n.top + u + f + e > l && (o > 0 || l > t(o)) && (n.top += u + f + e))
                            }
                        },
                        flipfit: {
                            left: function () {
                                n.ui.position.flip.left.apply(this, arguments);
                                n.ui.position.fit.left.apply(this, arguments)
                            },
                            top: function () {
                                n.ui.position.flip.top.apply(this, arguments);
                                n.ui.position.fit.top.apply(this, arguments)
                            }
                        }
                    },
                    function () {
                        var t, i, r, u, f, o = document.getElementsByTagName("body")[0],
                            s = document.createElement("div");
                        t = document.createElement(o ? "div" : "body");
                        r = {
                            visibility: "hidden",
                            width: 0,
                            height: 0,
                            border: 0,
                            margin: 0,
                            background: "none"
                        };
                        o && n.extend(r, {
                            position: "absolute",
                            left: "-1000px",
                            top: "-1000px"
                        });
                        for (f in r) t.style[f] = r[f];
                        t.appendChild(s);
                        i = o || document.documentElement;
                        i.insertBefore(t, i.firstChild);
                        s.style.cssText = "position: absolute; left: 10.7432222px;";
                        u = n(s).offset().left;
                        e = u > 10 && 11 > u;
                        t.innerHTML = "";
                        i.removeChild(t)
                    }()
            }();
        n.ui.position;
        n.widget("ui.menu", {
            version: "1.11.2",
            defaultElement: "<ul>",
            delay: 300,
            options: {
                icons: {
                    submenu: "ui-icon-carat-1-e"
                },
                items: "> *",
                menus: "ul",
                position: {
                    my: "left-1 top",
                    at: "right top"
                },
                role: "menu",
                blur: null,
                focus: null,
                select: null
            },
            _create: function () {
                this.activeMenu = this.element;
                this.mouseHandled = !1;
                this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                    role: this.options.role,
                    tabIndex: 0
                });
                this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true");
                this._on({
                    "mousedown .ui-menu-item": function (n) {
                        n.preventDefault()
                    },
                    "click .ui-menu-item": function (t) {
                        var i = n(t.target);
                        !this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(t), t.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(t) : !this.element.is(":focus") && n(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                    },
                    "mouseenter .ui-menu-item": function (t) {
                        if (!this.previousFilter) {
                            var i = n(t.currentTarget);
                            i.siblings(".ui-state-active").removeClass("ui-state-active");
                            this.focus(t, i)
                        }
                    },
                    mouseleave: "collapseAll",
                    "mouseleave .ui-menu": "collapseAll",
                    focus: function (n, t) {
                        var i = this.active || this.element.find(this.options.items).eq(0);
                        t || this.focus(n, i)
                    },
                    blur: function (t) {
                        this._delay(function () {
                            n.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t)
                        })
                    },
                    keydown: "_keydown"
                });
                this.refresh();
                this._on(this.document, {
                    click: function (n) {
                        this._closeOnDocumentClick(n) && this.collapseAll(n);
                        this.mouseHandled = !1
                    }
                })
            },
            _destroy: function () {
                this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show();
                this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () {
                    var t = n(this);
                    t.data("ui-menu-submenu-carat") && t.remove()
                });
                this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
            },
            _keydown: function (t) {
                var i, u, r, f, e = !0;
                switch (t.keyCode) {
                    case n.ui.keyCode.PAGE_UP:
                        this.previousPage(t);
                        break;
                    case n.ui.keyCode.PAGE_DOWN:
                        this.nextPage(t);
                        break;
                    case n.ui.keyCode.HOME:
                        this._move("first", "first", t);
                        break;
                    case n.ui.keyCode.END:
                        this._move("last", "last", t);
                        break;
                    case n.ui.keyCode.UP:
                        this.previous(t);
                        break;
                    case n.ui.keyCode.DOWN:
                        this.next(t);
                        break;
                    case n.ui.keyCode.LEFT:
                        this.collapse(t);
                        break;
                    case n.ui.keyCode.RIGHT:
                        this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                        break;
                    case n.ui.keyCode.ENTER:
                    case n.ui.keyCode.SPACE:
                        this._activate(t);
                        break;
                    case n.ui.keyCode.ESCAPE:
                        this.collapse(t);
                        break;
                    default:
                        e = !1;
                        u = this.previousFilter || "";
                        r = String.fromCharCode(t.keyCode);
                        f = !1;
                        clearTimeout(this.filterTimer);
                        r === u ? f = !0 : r = u + r;
                        i = this._filterMenuItems(r);
                        i = f && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i;
                        i.length || (r = String.fromCharCode(t.keyCode), i = this._filterMenuItems(r));
                        i.length ? (this.focus(t, i), this.previousFilter = r, this.filterTimer = this._delay(function () {
                            delete this.previousFilter
                        }, 1e3)) : delete this.previousFilter
                }
                e && t.preventDefault()
            },
            _activate: function (n) {
                this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(n) : this.select(n))
            },
            refresh: function () {
                var i, t, u = this,
                    f = this.options.icons.submenu,
                    r = this.element.find(this.options.menus);
                this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length);
                r.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({
                    role: this.options.role,
                    "aria-hidden": "true",
                    "aria-expanded": "false"
                }).each(function () {
                    var t = n(this),
                        i = t.parent(),
                        r = n("<span>").addClass("ui-menu-icon ui-icon " + f).data("ui-menu-submenu-carat", !0);
                    i.attr("aria-haspopup", "true").prepend(r);
                    t.attr("aria-labelledby", i.attr("id"))
                });
                i = r.add(this.element);
                t = i.find(this.options.items);
                t.not(".ui-menu-item").each(function () {
                    var t = n(this);
                    u._isDivider(t) && t.addClass("ui-widget-content ui-menu-divider")
                });
                t.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({
                    tabIndex: -1,
                    role: this._itemRole()
                });
                t.filter(".ui-state-disabled").attr("aria-disabled", "true");
                this.active && !n.contains(this.element[0], this.active[0]) && this.blur()
            },
            _itemRole: function () {
                return {
                    menu: "menuitem",
                    listbox: "option"
                } [this.options.role]
            },
            _setOption: function (n, t) {
                "icons" === n && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu);
                "disabled" === n && this.element.toggleClass("ui-state-disabled", !!t).attr("aria-disabled", t);
                this._super(n, t)
            },
            focus: function (n, t) {
                var i, r;
                this.blur(n, n && "focus" === n.type);
                this._scrollIntoView(t);
                this.active = t.first();
                r = this.active.addClass("ui-state-focus").removeClass("ui-state-active");
                this.options.role && this.element.attr("aria-activedescendant", r.attr("id"));
                this.active.parent().closest(".ui-menu-item").addClass("ui-state-active");
                n && "keydown" === n.type ? this._close() : this.timer = this._delay(function () {
                    this._close()
                }, this.delay);
                i = t.children(".ui-menu");
                i.length && n && /^mouse/.test(n.type) && this._startOpening(i);
                this.activeMenu = t.parent();
                this._trigger("focus", n, {
                    item: t
                })
            },
            _scrollIntoView: function (t) {
                var e, o, i, r, u, f;
                this._hasScroll() && (e = parseFloat(n.css(this.activeMenu[0], "borderTopWidth")) || 0, o = parseFloat(n.css(this.activeMenu[0], "paddingTop")) || 0, i = t.offset().top - this.activeMenu.offset().top - e - o, r = this.activeMenu.scrollTop(), u = this.activeMenu.height(), f = t.outerHeight(), 0 > i ? this.activeMenu.scrollTop(r + i) : i + f > u && this.activeMenu.scrollTop(r + i - u + f))
            },
            blur: function (n, t) {
                t || clearTimeout(this.timer);
                this.active && (this.active.removeClass("ui-state-focus"), this.active = null, this._trigger("blur", n, {
                    item: this.active
                }))
            },
            _startOpening: function (n) {
                clearTimeout(this.timer);
                "true" === n.attr("aria-hidden") && (this.timer = this._delay(function () {
                    this._close();
                    this._open(n)
                }, this.delay))
            },
            _open: function (t) {
                var i = n.extend({
                    of: this.active
                }, this.options.position);
                clearTimeout(this.timer);
                this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true");
                t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
            },
            collapseAll: function (t, i) {
                clearTimeout(this.timer);
                this.timer = this._delay(function () {
                    var r = i ? this.element : n(t && t.target).closest(this.element.find(".ui-menu"));
                    r.length || (r = this.element);
                    this._close(r);
                    this.blur(t);
                    this.activeMenu = r
                }, this.delay)
            },
            _close: function (n) {
                n || (n = this.active ? this.active.parent() : this.element);
                n.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")
            },
            _closeOnDocumentClick: function (t) {
                return !n(t.target).closest(".ui-menu").length
            },
            _isDivider: function (n) {
                return !/[^\-\u2014\u2013\s]/.test(n.text())
            },
            collapse: function (n) {
                var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                t && t.length && (this._close(), this.focus(n, t))
            },
            expand: function (n) {
                var t = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
                t && t.length && (this._open(t.parent()), this._delay(function () {
                    this.focus(n, t)
                }))
            },
            next: function (n) {
                this._move("next", "first", n)
            },
            previous: function (n) {
                this._move("prev", "last", n)
            },
            isFirstItem: function () {
                return this.active && !this.active.prevAll(".ui-menu-item").length
            },
            isLastItem: function () {
                return this.active && !this.active.nextAll(".ui-menu-item").length
            },
            _move: function (n, t, i) {
                var r;
                this.active && (r = "first" === n || "last" === n ? this.active["first" === n ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[n + "All"](".ui-menu-item").eq(0));
                r && r.length && this.active || (r = this.activeMenu.find(this.options.items)[t]());
                this.focus(i, r)
            },
            nextPage: function (t) {
                var i, r, u;
                return this.active ? (this.isLastItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () {
                    return i = n(this), 0 > i.offset().top - r - u
                }), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]())), void 0) : (this.next(t), void 0)
            },
            previousPage: function (t) {
                var i, r, u;
                return this.active ? (this.isFirstItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () {
                    return i = n(this), i.offset().top - r + u > 0
                }), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items).first())), void 0) : (this.next(t), void 0)
            },
            _hasScroll: function () {
                return this.element.outerHeight() < this.element.prop("scrollHeight")
            },
            select: function (t) {
                this.active = this.active || n(t.target).closest(".ui-menu-item");
                var i = {
                    item: this.active
                };
                this.active.has(".ui-menu").length || this.collapseAll(t, !0);
                this._trigger("select", t, i)
            },
            _filterMenuItems: function (t) {
                var i = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                    r = RegExp("^" + i, "i");
                return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function () {
                    return r.test(n.trim(n(this).text()))
                })
            }
        });
        n.widget("ui.autocomplete", {
            version: "1.11.2",
            defaultElement: "<input>",
            options: {
                appendTo: null,
                autoFocus: !1,
                delay: 300,
                minLength: 1,
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                source: null,
                change: null,
                close: null,
                focus: null,
                open: null,
                response: null,
                search: null,
                select: null
            },
            requestIndex: 0,
            pending: 0,
            _create: function () {
                var t, i, r, u = this.element[0].nodeName.toLowerCase(),
                    f = "textarea" === u,
                    e = "input" === u;
                this.isMultiLine = f ? !0 : e ? !1 : this.element.prop("isContentEditable");
                this.valueMethod = this.element[f || e ? "val" : "text"];
                this.isNewMenu = !0;
                this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off");
                this._on(this.element, {
                    keydown: function (u) {
                        if (this.element.prop("readOnly")) return t = !0, r = !0, i = !0, void 0;
                        t = !1;
                        r = !1;
                        i = !1;
                        var f = n.ui.keyCode;
                        switch (u.keyCode) {
                            case f.PAGE_UP:
                                t = !0;
                                this._move("previousPage", u);
                                break;
                            case f.PAGE_DOWN:
                                t = !0;
                                this._move("nextPage", u);
                                break;
                            case f.UP:
                                t = !0;
                                this._keyEvent("previous", u);
                                break;
                            case f.DOWN:
                                t = !0;
                                this._keyEvent("next", u);
                                break;
                            case f.ENTER:
                                this.menu.active && (t = !0, u.preventDefault(), this.menu.select(u));
                                break;
                            case f.TAB:
                                this.menu.active && this.menu.select(u);
                                break;
                            case f.ESCAPE:
                                this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(u), u.preventDefault());
                                break;
                            default:
                                i = !0;
                                this._searchTimeout(u)
                        }
                    },
                    keypress: function (r) {
                        if (t) return t = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && r.preventDefault(), void 0;
                        if (!i) {
                            var u = n.ui.keyCode;
                            switch (r.keyCode) {
                                case u.PAGE_UP:
                                    this._move("previousPage", r);
                                    break;
                                case u.PAGE_DOWN:
                                    this._move("nextPage", r);
                                    break;
                                case u.UP:
                                    this._keyEvent("previous", r);
                                    break;
                                case u.DOWN:
                                    this._keyEvent("next", r)
                            }
                        }
                    },
                    input: function (n) {
                        return r ? (r = !1, n.preventDefault(), void 0) : (this._searchTimeout(n), void 0)
                    },
                    focus: function () {
                        this.selectedItem = null;
                        this.previous = this._value()
                    },
                    blur: function (n) {
                        return this.cancelBlur ? (delete this.cancelBlur, void 0) : (clearTimeout(this.searching), this.close(n), this._change(n), void 0)
                    }
                });
                this._initSource();
                this.menu = n("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                    role: null
                }).hide().menu("instance");
                this._on(this.menu.element, {
                    mousedown: function (t) {
                        t.preventDefault();
                        this.cancelBlur = !0;
                        this._delay(function () {
                            delete this.cancelBlur
                        });
                        var i = this.menu.element[0];
                        n(t.target).closest(".ui-menu-item").length || this._delay(function () {
                            var t = this;
                            this.document.one("mousedown", function (r) {
                                r.target === t.element[0] || r.target === i || n.contains(i, r.target) || t.close()
                            })
                        })
                    },
                    menufocus: function (t, i) {
                        var r, u;
                        return this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type)) ? (this.menu.blur(), this.document.one("mousemove", function () {
                            n(t.target).trigger(t.originalEvent)
                        }), void 0) : (u = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", t, {
                            item: u
                        }) && t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(u.value), r = i.item.attr("aria-label") || u.value, r && n.trim(r).length && (this.liveRegion.children().hide(), n("<div>").text(r).appendTo(this.liveRegion)), void 0)
                    },
                    menuselect: function (n, t) {
                        var i = t.item.data("ui-autocomplete-item"),
                            r = this.previous;
                        this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = r, this._delay(function () {
                            this.previous = r;
                            this.selectedItem = i
                        }));
                        !1 !== this._trigger("select", n, {
                            item: i
                        }) && this._value(i.value);
                        this.term = this._value();
                        this.close(n);
                        this.selectedItem = i
                    }
                });
                this.liveRegion = n("<span>", {
                    role: "status",
                    "aria-live": "assertive",
                    "aria-relevant": "additions"
                }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body);
                this._on(this.window, {
                    beforeunload: function () {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _destroy: function () {
                clearTimeout(this.searching);
                this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete");
                this.menu.element.remove();
                this.liveRegion.remove()
            },
            _setOption: function (n, t) {
                this._super(n, t);
                "source" === n && this._initSource();
                "appendTo" === n && this.menu.element.appendTo(this._appendTo());
                "disabled" === n && t && this.xhr && this.xhr.abort()
            },
            _appendTo: function () {
                var t = this.options.appendTo;
                return t && (t = t.jquery || t.nodeType ? n(t) : this.document.find(t).eq(0)), t && t[0] || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t
            },
            _initSource: function () {
                var i, r, t = this;
                n.isArray(this.options.source) ? (i = this.options.source, this.source = function (t, r) {
                    r(n.ui.autocomplete.filter(i, t.term))
                }) : "string" == typeof this.options.source ? (r = this.options.source, this.source = function (i, u) {
                    t.xhr && t.xhr.abort();
                    t.xhr = n.ajax({
                        url: r,
                        data: i,
                        dataType: "json",
                        success: function (n) {
                            u(n)
                        },
                        error: function () {
                            u([])
                        }
                    })
                }) : this.source = this.options.source
            },
            _searchTimeout: function (n) {
                clearTimeout(this.searching);
                this.searching = this._delay(function () {
                    var t = this.term === this._value(),
                        i = this.menu.element.is(":visible"),
                        r = n.altKey || n.ctrlKey || n.metaKey || n.shiftKey;
                    t && (!t || i || r) || (this.selectedItem = null, this.search(null, n))
                }, this.options.delay)
            },
            search: function (n, t) {
                return n = null != n ? n : this._value(), this.term = this._value(), n.length < this.options.minLength ? this.close(t) : this._trigger("search", t) !== !1 ? this._search(n) : void 0
            },
            _search: function (n) {
                this.pending++;
                this.element.addClass("ui-autocomplete-loading");
                this.cancelSearch = !1;
                this.source({
                    term: n
                }, this._response())
            },
            _response: function () {
                var t = ++this.requestIndex;
                return n.proxy(function (n) {
                    t === this.requestIndex && this.__response(n);
                    this.pending--;
                    this.pending || this.element.removeClass("ui-autocomplete-loading")
                }, this)
            },
            __response: function (n) {
                n && (n = this._normalize(n));
                this._trigger("response", null, {
                    content: n
                });
                !this.options.disabled && n && n.length && !this.cancelSearch ? (this._suggest(n), this._trigger("open")) : this._close()
            },
            close: function (n) {
                this.cancelSearch = !0;
                this._close(n)
            },
            _close: function (n) {
                this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", n))
            },
            _change: function (n) {
                this.previous !== this._value() && this._trigger("change", n, {
                    item: this.selectedItem
                })
            },
            _normalize: function (t) {
                return t.length && t[0].label && t[0].value ? t : n.map(t, function (t) {
                    return "string" == typeof t ? {
                        label: t,
                        value: t
                    } : n.extend({}, t, {
                        label: t.label || t.value,
                        value: t.value || t.label
                    })
                })
            },
            _suggest: function (t) {
                var i = this.menu.element.empty();
                this._renderMenu(i, t);
                this.isNewMenu = !0;
                this.menu.refresh();
                i.show();
                this._resizeMenu();
                i.position(n.extend({
                    of: this.element
                }, this.options.position));
                this.options.autoFocus && this.menu.next()
            },
            _resizeMenu: function () {
                var n = this.menu.element;
                n.outerWidth(Math.max(n.width("").outerWidth() + 1, this.element.outerWidth()))
            },
            _renderMenu: function (t, i) {
                var r = this;
                n.each(i, function (n, i) {
                    r._renderItemData(t, i)
                })
            },
            _renderItemData: function (n, t) {
                return this._renderItem(n, t).data("ui-autocomplete-item", t)
            },
            _renderItem: function (t, i) {
                return n("<li>").text(i.label).appendTo(t)
            },
            _move: function (n, t) {
                return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(n) || this.menu.isLastItem() && /^next/.test(n) ? (this.isMultiLine || this._value(this.term), this.menu.blur(), void 0) : (this.menu[n](t), void 0) : (this.search(null, t), void 0)
            },
            widget: function () {
                return this.menu.element
            },
            _value: function () {
                return this.valueMethod.apply(this.element, arguments)
            },
            _keyEvent: function (n, t) {
                (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(n, t), t.preventDefault())
            }
        });
        n.extend(n.ui.autocomplete, {
            escapeRegex: function (n) {
                return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            },
            filter: function (t, i) {
                var r = RegExp(n.ui.autocomplete.escapeRegex(i), "i");
                return n.grep(t, function (n) {
                    return r.test(n.label || n.value || n)
                })
            }
        });
        n.widget("ui.autocomplete", n.ui.autocomplete, {
            options: {
                messages: {
                    noResults: "No search results.",
                    results: function (n) {
                        return n + (n > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                    }
                }
            },
            __response: function (t) {
                var i;
                this._superApply(arguments);
                this.options.disabled || this.cancelSearch || (i = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.children().hide(), n("<div>").text(i).appendTo(this.liveRegion))
            }
        });
        n.ui.autocomplete
    }), function (n) {
        function i(n, t) {
            for (var i = window, r = (n || "").split("."); i && r.length;) i = i[r.shift()];
            return typeof i == "function" ? i : (t.push(n), Function.constructor.apply(null, t))
        }

        function u(n) {
            return n === "GET" || n === "POST"
        }

        function o(n, t) {
            u(t) || n.setRequestHeader("X-HTTP-Method-Override", t)
        }

        function s(t, i, r) {
            var u;
            r.indexOf("application/x-javascript") === -1 && (u = (t.getAttribute("data-ajax-mode") || "").toUpperCase(), n(t.getAttribute("data-ajax-update")).each(function (t, r) {
                var f;
                switch (u) {
                    case "BEFORE":
                        f = r.firstChild;
                        n("<div />").html(i).contents().each(function () {
                            r.insertBefore(this, f)
                        });
                        break;
                    case "AFTER":
                        n("<div />").html(i).contents().each(function () {
                            r.appendChild(this)
                        });
                        break;
                    case "REPLACE-WITH":
                        n(r).replaceWith(i);
                        break;
                    default:
                        n(r).html(i)
                }
            }))
        }

        function f(t, r) {
            var e, h, f, c;
            (e = t.getAttribute("data-ajax-confirm"), !e || window.confirm(e)) && (h = n(t.getAttribute("data-ajax-loading")), c = parseInt(t.getAttribute("data-ajax-loading-duration"), 10) || 0, n.extend(r, {
                type: t.getAttribute("data-ajax-method") || undefined,
                url: t.getAttribute("data-ajax-url") || undefined,
                cache: !!t.getAttribute("data-ajax-cache"),
                beforeSend: function (n) {
                    var r;
                    return o(n, f), r = i(t.getAttribute("data-ajax-begin"), ["xhr"]).apply(t, arguments), r !== !1 && h.show(c), r
                },
                complete: function () {
                    h.hide(c);
                    i(t.getAttribute("data-ajax-complete"), ["xhr", "status"]).apply(t, arguments)
                },
                success: function (n, r, u) {
                    s(t, n, u.getResponseHeader("Content-Type") || "text/html");
                    i(t.getAttribute("data-ajax-success"), ["data", "status", "xhr"]).apply(t, arguments)
                },
                error: function () {
                    i(t.getAttribute("data-ajax-failure"), ["xhr", "status", "error"]).apply(t, arguments)
                }
            }), r.data.push({
                name: "X-Requested-With",
                value: "XMLHttpRequest"
            }), f = r.type.toUpperCase(), u(f) || (r.type = "POST", r.data.push({
                name: "X-HTTP-Method-Override",
                value: f
            })), n.ajax(r))
        }

        function h(t) {
            var i = n(t).data(e);
            return !i || !i.validate || i.validate()
        }
        var t = "unobtrusiveAjaxClick",
            r = "unobtrusiveAjaxClickTarget",
            e = "unobtrusiveValidation";
        n(document).on("click", "a[data-ajax=true]", function (n) {
            n.preventDefault();
            f(this, {
                url: this.href,
                type: "GET",
                data: []
            })
        });
        n(document).on("click", "form[data-ajax=true] input[type=image]", function (i) {
            var r = i.target.name,
                u = n(i.target),
                f = n(u.parents("form")[0]),
                e = u.offset();
            f.data(t, [{
                name: r + ".x",
                value: Math.round(i.pageX - e.left)
            }, {
                name: r + ".y",
                value: Math.round(i.pageY - e.top)
            }]);
            setTimeout(function () {
                f.removeData(t)
            }, 0)
        });
        n(document).on("click", "form[data-ajax=true] :submit", function (i) {
            var f = i.currentTarget.name,
                e = n(i.target),
                u = n(e.parents("form")[0]);
            u.data(t, f ? [{
                name: f,
                value: i.currentTarget.value
            }] : []);
            u.data(r, e);
            setTimeout(function () {
                u.removeData(t);
                u.removeData(r)
            }, 0)
        });
        n(document).on("submit", "form[data-ajax=true]", function (i) {
            var e = n(this).data(t) || [],
                u = n(this).data(r),
                o = u && u.hasClass("cancel");
            (i.preventDefault(), o || h(this)) && f(this, {
                url: this.action,
                type: this.method || "GET",
                data: e.concat(n(this).serializeArray())
            })
        })
    }(jQuery), function (n) {
        n.extend(n.fn, {
            validate: function (t) {
                if (!this.length) return t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."), void 0;
                var i = n.data(this[0], "validator");
                return i ? i : (this.attr("novalidate", "novalidate"), i = new n.validator(t, this[0]), n.data(this[0], "validator", i), i.settings.onsubmit && (this.validateDelegate(":submit", "click", function (t) {
                    i.settings.submitHandler && (i.submitButton = t.target);
                    n(t.target).hasClass("cancel") && (i.cancelSubmit = !0);
                    void 0 !== n(t.target).attr("formnovalidate") && (i.cancelSubmit = !0)
                }), this.submit(function (t) {
                    function r() {
                        var r;
                        return i.settings.submitHandler ? (i.submitButton && (r = n("<input type='hidden'/>").attr("name", i.submitButton.name).val(n(i.submitButton).val()).appendTo(i.currentForm)), i.settings.submitHandler.call(i, i.currentForm, t), i.submitButton && r.remove(), !1) : !0
                    }
                    return i.settings.debug && t.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, r()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : r() : (i.focusInvalid(), !1)
                })), i)
            },
            valid: function () {
                if (n(this[0]).is("form")) return this.validate().form();
                var t = !0,
                    i = n(this[0].form).validate();
                return this.each(function () {
                    t = t && i.element(this)
                }), t
            },
            removeAttrs: function (t) {
                var i = {},
                    r = this;
                return n.each(t.split(/\s/), function (n, t) {
                    i[t] = r.attr(t);
                    r.removeAttr(t)
                }), i
            },
            rules: function (t, i) {
                var r = this[0],
                    o, u, h;
                if (t) {
                    var e = n.data(r.form, "validator").settings,
                        s = e.rules,
                        f = n.validator.staticRules(r);
                    switch (t) {
                        case "add":
                            n.extend(f, n.validator.normalizeRule(i));
                            delete f.messages;
                            s[r.name] = f;
                            i.messages && (e.messages[r.name] = n.extend(e.messages[r.name], i.messages));
                            break;
                        case "remove":
                            return i ? (o = {}, n.each(i.split(/\s/), function (n, t) {
                                o[t] = f[t];
                                delete f[t]
                            }), o) : (delete s[r.name], f)
                    }
                }
                return u = n.validator.normalizeRules(n.extend({}, n.validator.classRules(r), n.validator.attributeRules(r), n.validator.dataRules(r), n.validator.staticRules(r)), r), u.required && (h = u.required, delete u.required, u = n.extend({
                    required: h
                }, u)), u
            }
        });
        n.extend(n.expr[":"], {
            blank: function (t) {
                return !n.trim("" + n(t).val())
            },
            filled: function (t) {
                return !!n.trim("" + n(t).val())
            },
            unchecked: function (t) {
                return !n(t).prop("checked")
            }
        });
        n.validator = function (t, i) {
            this.settings = n.extend(!0, {}, n.validator.defaults, t);
            this.currentForm = i;
            this.init()
        };
        n.validator.format = function (t, i) {
            return 1 === arguments.length ? function () {
                var i = n.makeArray(arguments);
                return i.unshift(t), n.validator.format.apply(this, i)
            } : (arguments.length > 2 && i.constructor !== Array && (i = n.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), n.each(i, function (n, i) {
                t = t.replace(RegExp("\\{" + n + "\\}", "g"), function () {
                    return i
                })
            }), t)
        };
        n.extend(n.validator, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                validClass: "valid",
                errorElement: "label",
                focusInvalid: !0,
                errorContainer: n([]),
                errorLabelContainer: n([]),
                onsubmit: !0,
                ignore: ":hidden",
                ignoreTitle: !1,
                onfocusin: function (n) {
                    this.lastActive = n;
                    this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, n, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(n)).hide())
                },
                onfocusout: function (n) {
                    !this.checkable(n) && (n.name in this.submitted || !this.optional(n)) && this.element(n)
                },
                onkeyup: function (n, t) {
                    (9 !== t.which || "" !== this.elementValue(n)) && (n.name in this.submitted || n === this.lastElement) && this.element(n)
                },
                onclick: function (n) {
                    n.name in this.submitted ? this.element(n) : n.parentNode.name in this.submitted && this.element(n.parentNode)
                },
                highlight: function (t, i, r) {
                    "radio" === t.type ? this.findByName(t.name).addClass(i).removeClass(r) : n(t).addClass(i).removeClass(r)
                },
                unhighlight: function (t, i, r) {
                    "radio" === t.type ? this.findByName(t.name).removeClass(i).addClass(r) : n(t).removeClass(i).addClass(r)
                }
            },
            setDefaults: function (t) {
                n.extend(n.validator.defaults, t)
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
                creditcard: "Please enter a valid credit card number.",
                equalTo: "Please enter the same value again.",
                maxlength: n.validator.format("Please enter no more than {0} characters."),
                minlength: n.validator.format("Please enter at least {0} characters."),
                rangelength: n.validator.format("Please enter a value between {0} and {1} characters long."),
                range: n.validator.format("Please enter a value between {0} and {1}."),
                max: n.validator.format("Please enter a value less than or equal to {0}."),
                min: n.validator.format("Please enter a value greater than or equal to {0}.")
            },
            autoCreateRanges: !1,
            prototype: {
                init: function () {
                    function i(t) {
                        var i = n.data(this[0].form, "validator"),
                            r = "on" + t.type.replace(/^validate/, "");
                        i.settings[r] && i.settings[r].call(i, this[0], t)
                    }
                    var r, t;
                    this.labelContainer = n(this.settings.errorLabelContainer);
                    this.errorContext = this.labelContainer.length && this.labelContainer || n(this.currentForm);
                    this.containers = n(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                    this.submitted = {};
                    this.valueCache = {};
                    this.pendingRequest = 0;
                    this.pending = {};
                    this.invalid = {};
                    this.reset();
                    r = this.groups = {};
                    n.each(this.settings.groups, function (t, i) {
                        "string" == typeof i && (i = i.split(/\s/));
                        n.each(i, function (n, i) {
                            r[i] = t
                        })
                    });
                    t = this.settings.rules;
                    n.each(t, function (i, r) {
                        t[i] = n.validator.normalizeRule(r)
                    });
                    n(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", i).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", i);
                    this.settings.invalidHandler && n(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
                },
                form: function () {
                    return this.checkForm(), n.extend(this.submitted, this.errorMap), this.invalid = n.extend({}, this.errorMap), this.valid() || n(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                },
                checkForm: function () {
                    this.prepareForm();
                    for (var n = 0, t = this.currentElements = this.elements(); t[n]; n++) this.check(t[n]);
                    return this.valid()
                },
                element: function (t) {
                    t = this.validationTargetFor(this.clean(t));
                    this.lastElement = t;
                    this.prepareElement(t);
                    this.currentElements = n(t);
                    var i = this.check(t) !== !1;
                    return i ? delete this.invalid[t.name] : this.invalid[t.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), i
                },
                showErrors: function (t) {
                    if (t) {
                        n.extend(this.errorMap, t);
                        this.errorList = [];
                        for (var i in t) this.errorList.push({
                            message: t[i],
                            element: this.findByName(i)[0]
                        });
                        this.successList = n.grep(this.successList, function (n) {
                            return !(n.name in t)
                        })
                    }
                    this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                },
                resetForm: function () {
                    n.fn.resetForm && n(this.currentForm).resetForm();
                    this.submitted = {};
                    this.lastElement = null;
                    this.prepareForm();
                    this.hideErrors();
                    this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
                },
                numberOfInvalids: function () {
                    return this.objectLength(this.invalid)
                },
                objectLength: function (n) {
                    var t = 0;
                    for (var i in n) t++;
                    return t
                },
                hideErrors: function () {
                    this.addWrapper(this.toHide).hide()
                },
                valid: function () {
                    return 0 === this.size()
                },
                size: function () {
                    return this.errorList.length
                },
                focusInvalid: function () {
                    if (this.settings.focusInvalid) try {
                        n(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (t) {}
                },
                findLastActive: function () {
                    var t = this.lastActive;
                    return t && 1 === n.grep(this.errorList, function (n) {
                        return n.element.name === t.name
                    }).length && t
                },
                elements: function () {
                    var t = this,
                        i = {};
                    return n(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                        return !this.name && t.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in i || !t.objectLength(n(this).rules()) ? !1 : (i[this.name] = !0, !0)
                    })
                },
                clean: function (t) {
                    return n(t)[0]
                },
                errors: function () {
                    var t = this.settings.errorClass.replace(" ", ".");
                    return n(this.settings.errorElement + "." + t, this.errorContext)
                },
                reset: function () {
                    this.successList = [];
                    this.errorList = [];
                    this.errorMap = {};
                    this.toShow = n([]);
                    this.toHide = n([]);
                    this.currentElements = n([])
                },
                prepareForm: function () {
                    this.reset();
                    this.toHide = this.errors().add(this.containers)
                },
                prepareElement: function (n) {
                    this.reset();
                    this.toHide = this.errorsFor(n)
                },
                elementValue: function (t) {
                    var r = n(t).attr("type"),
                        i = n(t).val();
                    return "radio" === r || "checkbox" === r ? n("input[name='" + n(t).attr("name") + "']:checked").val() : "string" == typeof i ? i.replace(/\r/g, "") : i
                },
                check: function (t) {
                    var r, u;
                    t = this.validationTargetFor(this.clean(t));
                    var i, f = n(t).rules(),
                        e = !1,
                        s = this.elementValue(t);
                    for (r in f) {
                        u = {
                            method: r,
                            parameters: f[r]
                        };
                        try {
                            if (i = n.validator.methods[r].call(this, s, t, u.parameters), "dependency-mismatch" === i) {
                                e = !0;
                                continue
                            }
                            if (e = !1, "pending" === i) return this.toHide = this.toHide.not(this.errorsFor(t)), void 0;
                            if (!i) return this.formatAndAdd(t, u), !1
                        } catch (o) {
                            throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + u.method + "' method.", o), o;
                        }
                    }
                    if (!e) return (this.objectLength(f) && this.successList.push(t), !0)
                },
                customDataMessage: function (t, i) {
                    return n(t).data("msg-" + i.toLowerCase()) || t.attributes && n(t).attr("data-msg-" + i.toLowerCase())
                },
                customMessage: function (n, t) {
                    var i = this.settings.messages[n];
                    return i && (i.constructor === String ? i : i[t])
                },
                findDefined: function () {
                    for (var n = 0; arguments.length > n; n++)
                        if (void 0 !== arguments[n]) return arguments[n];
                    return void 0
                },
                defaultMessage: function (t, i) {
                    return this.findDefined(this.customMessage(t.name, i), this.customDataMessage(t, i), !this.settings.ignoreTitle && t.title || void 0, n.validator.messages[i], "<strong>Warning: No message defined for " + t.name + "<\/strong>")
                },
                formatAndAdd: function (t, i) {
                    var r = this.defaultMessage(t, i.method),
                        u = /\$?\{(\d+)\}/g;
                    "function" == typeof r ? r = r.call(this, i.parameters, t) : u.test(r) && (r = n.validator.format(r.replace(u, "{$1}"), i.parameters));
                    this.errorList.push({
                        message: r,
                        element: t
                    });
                    this.errorMap[t.name] = r;
                    this.submitted[t.name] = r
                },
                addWrapper: function (n) {
                    return this.settings.wrapper && (n = n.add(n.parent(this.settings.wrapper))), n
                },
                defaultShowErrors: function () {
                    for (var i, t, n = 0; this.errorList[n]; n++) t = this.errorList[n], this.settings.highlight && this.settings.highlight.call(this, t.element, this.settings.errorClass, this.settings.validClass), this.showLabel(t.element, t.message);
                    if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                        for (n = 0; this.successList[n]; n++) this.showLabel(this.successList[n]);
                    if (this.settings.unhighlight)
                        for (n = 0, i = this.validElements(); i[n]; n++) this.settings.unhighlight.call(this, i[n], this.settings.errorClass, this.settings.validClass);
                    this.toHide = this.toHide.not(this.toShow);
                    this.hideErrors();
                    this.addWrapper(this.toShow).show()
                },
                validElements: function () {
                    return this.currentElements.not(this.invalidElements())
                },
                invalidElements: function () {
                    return n(this.errorList).map(function () {
                        return this.element
                    })
                },
                showLabel: function (t, i) {
                    var r = this.errorsFor(t);
                    r.length ? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass), r.html(i)) : (r = n("<" + this.settings.errorElement + ">").attr("for", this.idOrName(t)).addClass(this.settings.errorClass).html(i || ""), this.settings.wrapper && (r = r.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(r).length || (this.settings.errorPlacement ? this.settings.errorPlacement(r, n(t)) : r.insertAfter(t)));
                    !i && this.settings.success && (r.text(""), "string" == typeof this.settings.success ? r.addClass(this.settings.success) : this.settings.success(r, t));
                    this.toShow = this.toShow.add(r)
                },
                errorsFor: function (t) {
                    var i = this.idOrName(t);
                    return this.errors().filter(function () {
                        return n(this).attr("for") === i
                    })
                },
                idOrName: function (n) {
                    return this.groups[n.name] || (this.checkable(n) ? n.name : n.id || n.name)
                },
                validationTargetFor: function (n) {
                    return this.checkable(n) && (n = this.findByName(n.name).not(this.settings.ignore)[0]), n
                },
                checkable: function (n) {
                    return /radio|checkbox/i.test(n.type)
                },
                findByName: function (t) {
                    return n(this.currentForm).find("[name='" + t + "']")
                },
                getLength: function (t, i) {
                    switch (i.nodeName.toLowerCase()) {
                        case "select":
                            return n("option:selected", i).length;
                        case "input":
                            if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                    }
                    return t.length
                },
                depend: function (n, t) {
                    return this.dependTypes[typeof n] ? this.dependTypes[typeof n](n, t) : !0
                },
                dependTypes: {
                    boolean: function (n) {
                        return n
                    },
                    string: function (t, i) {
                        return !!n(t, i.form).length
                    },
                    "function": function (n, t) {
                        return n(t)
                    }
                },
                optional: function (t) {
                    var i = this.elementValue(t);
                    return !n.validator.methods.required.call(this, i, t) && "dependency-mismatch"
                },
                startRequest: function (n) {
                    this.pending[n.name] || (this.pendingRequest++, this.pending[n.name] = !0)
                },
                stopRequest: function (t, i) {
                    this.pendingRequest--;
                    0 > this.pendingRequest && (this.pendingRequest = 0);
                    delete this.pending[t.name];
                    i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (n(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (n(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
                },
                previousValue: function (t) {
                    return n.data(t, "previousValue") || n.data(t, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(t, "remote")
                    })
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
            addClassRules: function (t, i) {
                t.constructor === String ? this.classRuleSettings[t] = i : n.extend(this.classRuleSettings, t)
            },
            classRules: function (t) {
                var i = {},
                    r = n(t).attr("class");
                return r && n.each(r.split(" "), function () {
                    this in n.validator.classRuleSettings && n.extend(i, n.validator.classRuleSettings[this])
                }), i
            },
            attributeRules: function (t) {
                var u = {},
                    e = n(t),
                    f = e[0].getAttribute("type"),
                    r, i;
                for (r in n.validator.methods) "required" === r ? (i = e.get(0).getAttribute(r), "" === i && (i = !0), i = !!i) : i = e.attr(r), /min|max/.test(r) && (null === f || /number|range|text/.test(f)) && (i = Number(i)), i ? u[r] = i : f === r && "range" !== f && (u[r] = !0);
                return u.maxlength && /-1|2147483647|524288/.test(u.maxlength) && delete u.maxlength, u
            },
            dataRules: function (t) {
                var i, r, u = {},
                    f = n(t);
                for (i in n.validator.methods) r = f.data("rule-" + i.toLowerCase()), void 0 !== r && (u[i] = r);
                return u
            },
            staticRules: function (t) {
                var i = {},
                    r = n.data(t.form, "validator");
                return r.settings.rules && (i = n.validator.normalizeRule(r.settings.rules[t.name]) || {}), i
            },
            normalizeRules: function (t, i) {
                return n.each(t, function (r, u) {
                    if (u === !1) return delete t[r], void 0;
                    if (u.param || u.depends) {
                        var f = !0;
                        switch (typeof u.depends) {
                            case "string":
                                f = !!n(u.depends, i.form).length;
                                break;
                            case "function":
                                f = u.depends.call(i, i)
                        }
                        f ? t[r] = void 0 !== u.param ? u.param : !0 : delete t[r]
                    }
                }), n.each(t, function (r, u) {
                    t[r] = n.isFunction(u) ? u(i) : u
                }), n.each(["minlength", "maxlength"], function () {
                    t[this] && (t[this] = Number(t[this]))
                }), n.each(["rangelength", "range"], function () {
                    var i;
                    t[this] && (n.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (i = t[this].split(/[\s,]+/), t[this] = [Number(i[0]), Number(i[1])]))
                }), n.validator.autoCreateRanges && (t.min && t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), t.minlength && t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t
            },
            normalizeRule: function (t) {
                if ("string" == typeof t) {
                    var i = {};
                    n.each(t.split(/\s/), function () {
                        i[this] = !0
                    });
                    t = i
                }
                return t
            },
            addMethod: function (t, i, r) {
                n.validator.methods[t] = i;
                n.validator.messages[t] = void 0 !== r ? r : n.validator.messages[t];
                3 > i.length && n.validator.addClassRules(t, n.validator.normalizeRule(t))
            },
            methods: {
                required: function (t, i, r) {
                    if (!this.depend(r, i)) return "dependency-mismatch";
                    if ("select" === i.nodeName.toLowerCase()) {
                        var u = n(i).val();
                        return u && u.length > 0
                    }
                    return this.checkable(i) ? this.getLength(t, i) > 0 : n.trim(t).length > 0
                },
                email: function (n, t) {
                    return this.optional(t) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(n)
                },
                url: function (n, t) {
                    return this.optional(t) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(n)
                },
                date: function (n, t) {
                    return this.optional(t) || !/Invalid|NaN/.test("" + new Date(n))
                },
                dateISO: function (n, t) {
                    return this.optional(t) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(n)
                },
                number: function (n, t) {
                    return this.optional(t) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(n)
                },
                digits: function (n, t) {
                    return this.optional(t) || /^\d+$/.test(n)
                },
                creditcard: function (n, t) {
                    var r, e;
                    if (this.optional(t)) return "dependency-mismatch";
                    if (/[^0-9 \-]+/.test(n)) return !1;
                    var f = 0,
                        i = 0,
                        u = !1;
                    for (n = n.replace(/\D/g, ""), r = n.length - 1; r >= 0; r--) e = n.charAt(r), i = parseInt(e, 10), u && (i *= 2) > 9 && (i -= 9), f += i, u = !u;
                    return 0 == f % 10
                },
                minlength: function (t, i, r) {
                    var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
                    return this.optional(i) || u >= r
                },
                maxlength: function (t, i, r) {
                    var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
                    return this.optional(i) || r >= u
                },
                rangelength: function (t, i, r) {
                    var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
                    return this.optional(i) || u >= r[0] && r[1] >= u
                },
                min: function (n, t, i) {
                    return this.optional(t) || n >= i
                },
                max: function (n, t, i) {
                    return this.optional(t) || i >= n
                },
                range: function (n, t, i) {
                    return this.optional(t) || n >= i[0] && i[1] >= n
                },
                equalTo: function (t, i, r) {
                    var u = n(r);
                    return this.settings.onfocusout && u.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                        n(i).valid()
                    }), t === u.val()
                },
                remote: function (t, i, r) {
                    var f, u, e;
                    return this.optional(i) ? "dependency-mismatch" : (f = this.previousValue(i), this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), f.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = f.message, r = "string" == typeof r && {
                        url: r
                    } || r, f.old === t) ? f.valid : (f.old = t, u = this, this.startRequest(i), e = {}, e[i.name] = t, n.ajax(n.extend(!0, {
                        url: r,
                        mode: "abort",
                        port: "validate" + i.name,
                        dataType: "json",
                        data: e,
                        success: function (r) {
                            var e, h, s, o;
                            u.settings.messages[i.name].remote = f.originalMessage;
                            e = r === !0 || "true" === r;
                            e ? (h = u.formSubmitted, u.prepareElement(i), u.formSubmitted = h, u.successList.push(i), delete u.invalid[i.name], u.showErrors()) : (s = {}, o = r || u.defaultMessage(i, "remote"), s[i.name] = f.message = n.isFunction(o) ? o(t) : o, u.invalid[i.name] = !0, u.showErrors(s));
                            f.valid = e;
                            u.stopRequest(i, e)
                        }
                    }, r)), "pending")
                }
            }
        });
        n.format = n.validator.format
    }(jQuery), function (n) {
        var t = {},
            i;
        n.ajaxPrefilter ? n.ajaxPrefilter(function (n, i, r) {
            var u = n.port;
            "abort" === n.mode && (t[u] && t[u].abort(), t[u] = r)
        }) : (i = n.ajax, n.ajax = function (r) {
            var f = ("mode" in r ? r : n.ajaxSettings).mode,
                u = ("port" in r ? r : n.ajaxSettings).port;
            return "abort" === f ? (t[u] && t[u].abort(), t[u] = i.apply(this, arguments), t[u]) : i.apply(this, arguments)
        })
    }(jQuery), function (n) {
        n.extend(n.fn, {
            validateDelegate: function (t, i, r) {
                return this.bind(i, function (i) {
                    var u = n(i.target);
                    if (u.is(t)) return r.apply(u, arguments)
                })
            }
        })
    }(jQuery), function (n) {
        function i(n, t, i) {
            n.rules[t] = i;
            n.message && (n.messages[t] = n.message)
        }

        function h(n) {
            return n.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g)
        }

        function f(n) {
            return n.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1")
        }

        function e(n) {
            return n.substr(0, n.lastIndexOf(".") + 1)
        }

        function o(n, t) {
            return n.indexOf("*.") === 0 && (n = n.replace("*.", t)), n
        }

        function c(t, i) {
            var r = n(this).find("[data-valmsg-for='" + f(i[0].name) + "']"),
                u = r.attr("data-valmsg-replace"),
                e = u ? n.parseJSON(u) !== !1 : null;
            r.removeClass("field-validation-valid").addClass("field-validation-error");
            t.data("unobtrusiveContainer", r);
            e ? (r.empty(), t.removeClass("input-validation-error").appendTo(r)) : t.hide()
        }

        function l(t, i) {
            var u = n(this).find("[data-valmsg-summary=true]"),
                r = u.find("ul");
            r && r.length && i.errorList.length && (r.empty(), u.addClass("validation-summary-errors").removeClass("validation-summary-valid"), n.each(i.errorList, function () {
                n("<li />").html(this.message).appendTo(r)
            }))
        }

        function a(t) {
            var i = t.data("unobtrusiveContainer"),
                r = i.attr("data-valmsg-replace"),
                u = r ? n.parseJSON(r) : null;
            i && (i.addClass("field-validation-valid").removeClass("field-validation-error"), t.removeData("unobtrusiveContainer"), u && i.empty())
        }

        function v() {
            var t = n(this);
            t.data("validator").resetForm();
            t.find(".validation-summary-errors").addClass("validation-summary-valid").removeClass("validation-summary-errors");
            t.find(".field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error").removeData("unobtrusiveContainer").find(">*").removeData("unobtrusiveContainer")
        }

        function s(t) {
            var i = n(t),
                f = i.data(u),
                s = n.proxy(v, t),
                e = r.unobtrusive.options || {},
                o = function (i, r) {
                    var u = e[i];
                    u && n.isFunction(u) && u.apply(t, r)
                };
            return f || (f = {
                options: {
                    errorClass: e.errorClass || "input-validation-error",
                    errorElement: e.errorElement || "span",
                    errorPlacement: function () {
                        c.apply(t, arguments);
                        o("errorPlacement", arguments)
                    },
                    invalidHandler: function () {
                        l.apply(t, arguments);
                        o("invalidHandler", arguments)
                    },
                    messages: {},
                    rules: {},
                    success: function () {
                        a.apply(t, arguments);
                        o("success", arguments)
                    }
                },
                attachValidation: function () {
                    i.off("reset." + u, s).on("reset." + u, s).validate(this.options)
                },
                validate: function () {
                    return i.validate(), i.valid()
                }
            }, i.data(u, f)), f
        }
        var r = n.validator,
            t, u = "unobtrusiveValidation";
        r.unobtrusive = {
            adapters: [],
            parseElement: function (t, i) {
                var u = n(t),
                    f = u.parents("form")[0],
                    r, e, o;
                f && (r = s(f), r.options.rules[t.name] = e = {}, r.options.messages[t.name] = o = {}, n.each(this.adapters, function () {
                    var i = "data-val-" + this.name,
                        r = u.attr(i),
                        s = {};
                    r !== undefined && (i += "-", n.each(this.params, function () {
                        s[this] = u.attr(i + this)
                    }), this.adapt({
                        element: t,
                        form: f,
                        message: r,
                        params: s,
                        rules: e,
                        messages: o
                    }))
                }), n.extend(e, {
                    __dummy__: !0
                }), i || r.attachValidation())
            },
            parse: function (t) {
                var i = n(t),
                    u = i.parents().addBack().filter("form").add(i.find("form")).has("[data-val=true]");
                i.find("[data-val=true]").each(function () {
                    r.unobtrusive.parseElement(this, !0)
                });
                u.each(function () {
                    var n = s(this);
                    n && n.attachValidation()
                })
            }
        };
        t = r.unobtrusive.adapters;
        t.add = function (n, t, i) {
            return i || (i = t, t = []), this.push({
                name: n,
                params: t,
                adapt: i
            }), this
        };
        t.addBool = function (n, t) {
            return this.add(n, function (r) {
                i(r, t || n, !0)
            })
        };
        t.addMinMax = function (n, t, r, u, f, e) {
            return this.add(n, [f || "min", e || "max"], function (n) {
                var f = n.params.min,
                    e = n.params.max;
                f && e ? i(n, u, [f, e]) : f ? i(n, t, f) : e && i(n, r, e)
            })
        };
        t.addSingleVal = function (n, t, r) {
            return this.add(n, [t || "val"], function (u) {
                i(u, r || n, u.params[t])
            })
        };
        r.addMethod("__dummy__", function () {
            return !0
        });
        r.addMethod("regex", function (n, t, i) {
            var r;
            return this.optional(t) ? !0 : (r = new RegExp(i).exec(n), r && r.index === 0 && r[0].length === n.length)
        });
        r.addMethod("nonalphamin", function (n, t, i) {
            var r;
            return i && (r = n.match(/\W/g), r = r && r.length >= i), r
        });
        r.methods.extension ? (t.addSingleVal("accept", "mimtype"), t.addSingleVal("extension", "extension")) : t.addSingleVal("extension", "extension", "accept");
        t.addSingleVal("regex", "pattern");
        t.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url");
        t.addMinMax("length", "minlength", "maxlength", "rangelength").addMinMax("range", "min", "max", "range");
        t.addMinMax("minlength", "minlength").addMinMax("maxlength", "minlength", "maxlength");
        t.add("equalto", ["other"], function (t) {
            var r = e(t.element.name),
                u = t.params.other,
                s = o(u, r),
                h = n(t.form).find(":input").filter("[name='" + f(s) + "']")[0];
            i(t, "equalTo", h)
        });
        t.add("required", function (n) {
            (n.element.tagName.toUpperCase() !== "INPUT" || n.element.type.toUpperCase() !== "CHECKBOX") && i(n, "required", !0)
        });
        t.add("remote", ["url", "type", "additionalfields"], function (t) {
            var r = {
                    url: t.params.url,
                    type: t.params.type || "GET",
                    data: {}
                },
                u = e(t.element.name);
            n.each(h(t.params.additionalfields || t.element.name), function (i, e) {
                var s = o(e, u);
                r.data[s] = function () {
                    return n(t.form).find(":input").filter("[name='" + f(s) + "']").val()
                }
            });
            i(t, "remote", r)
        });
        t.add("password", ["min", "nonalphamin", "regex"], function (n) {
            n.params.min && i(n, "minlength", n.params.min);
            n.params.nonalphamin && i(n, "nonalphamin", n.params.nonalphamin);
            n.params.regex && i(n, "regex", n.params.regex)
        });
        n(function () {
            r.unobtrusive.parse(document)
        })
    }(jQuery), function (n, t) {
        if (typeof define == "function" && define.amd) define(["exports", "jquery"], function (n, i) {
            return t(n, i)
        });
        else if (typeof exports != "undefined") {
            var i = require("jquery");
            t(exports, i)
        } else t(n, n.jQuery || n.Zepto || n.ender || n.$)
    }(this, function (n, t) {
        function i(n, i) {
            function e(n, t, i) {
                return n[t] = i, n
            }

            function s(n, t) {
                for (var f = n.match(r.key), i, u;
                    (i = f.pop()) !== undefined;) r.push.test(i) ? (u = h(n.replace(/\[\]$/, "")), t = e([], u, t)) : r.fixed.test(i) ? t = e([], i, t) : r.named.test(i) && (t = e({}, i, t));
                return t
            }

            function h(n) {
                return f[n] === undefined && (f[n] = 0), f[n]++
            }

            function c(n) {
                switch (t('[name="' + n.name + '"]', i).attr("type")) {
                    case "checkbox":
                        return n.value === "on" ? !0 : n.value;
                    default:
                        return n.value
                }
            }

            function l(t) {
                if (!r.validate.test(t.name)) return this;
                var i = s(t.name, c(t));
                return u = n.extend(!0, u, i), this
            }

            function a(t) {
                if (!n.isArray(t)) throw new Error("formSerializer.addPairs expects an Array");
                for (var i = 0, r = t.length; i < r; i++) this.addPair(t[i]);
                return this
            }

            function o() {
                return u
            }

            function v() {
                return JSON.stringify(o())
            }
            var u = {},
                f = {};
            this.addPair = l;
            this.addPairs = a;
            this.serialize = o;
            this.serializeJSON = v
        }
        var r = {
            validate: /^[a-z_][a-z0-9_]*(?:\[(?:\d*|[a-z0-9_]+)\])*$/i,
            key: /[a-z0-9_]+|(?=\[\])/gi,
            push: /^$/,
            fixed: /^\d+$/,
            named: /^[a-z0-9_]+$/i
        };
        return i.patterns = r, i.serializeObject = function () {
            return this.length > 1 ? new Error("jquery-serialize-object can only serialize one form at a time") : new i(t, this).addPairs(this.serializeArray()).serialize()
        }, i.serializeJSON = function () {
            return this.length > 1 ? new Error("jquery-serialize-object can only serialize one form at a time") : new i(t, this).addPairs(this.serializeArray()).serializeJSON()
        }, typeof t.fn != "undefined" && (t.fn.serializeObject = i.serializeObject, t.fn.serializeJSON = i.serializeJSON), n.FormSerializer = i, i
    }), function () {
        var t, n;
        t = this.jQuery || window.jQuery;
        n = t(window);
        t.fn.stick_in_parent = function (i) {
            var s, e, a, h, c, v, r, u, o, l, f;
            for (null == i && (i = {}), f = i.sticky_class, c = i.inner_scrolling, l = i.recalc_every, o = i.parent, u = i.offset_top, r = i.spacer, e = i.bottoming, null == u && (u = 0), null == o && (o = void 0), null == c && (c = !0), null == f && (f = "is_stuck"), s = t(document), null == e && (e = !0), a = function (i, h, a, v, y, p, w, b) {
                    var it, ot, nt, et, st, k, d, rt, ut, ft, g, tt;
                    if (!i.data("sticky_kit")) {
                        if (i.data("sticky_kit", !0), st = s.height(), d = i.parent(), null != o && (d = d.closest(o)), !d.length) throw "failed to find stick parent";
                        if (it = nt = !1, (g = null != r ? r && i.closest(r) : t("<div />")) && g.css("position", i.css("position")), rt = function () {
                                var n, t, e;
                                if (!b && (st = s.height(), n = parseInt(d.css("border-top-width"), 10), t = parseInt(d.css("padding-top"), 10), h = parseInt(d.css("padding-bottom"), 10), a = d.offset().top + n + t, v = d.height(), nt && (it = nt = !1, null == r && (i.insertAfter(g), g.detach()), i.css({
                                        position: "",
                                        top: "",
                                        width: "",
                                        bottom: ""
                                    }).removeClass(f), e = !0), y = i.offset().top - (parseInt(i.css("margin-top"), 10) || 0) - u, p = i.outerHeight(!0), w = i.css("float"), g && g.css({
                                        width: i.outerWidth(!0),
                                        height: p,
                                        display: i.css("display"),
                                        "vertical-align": i.css("vertical-align"),
                                        float: w
                                    }), e)) return tt()
                            }, rt(), p !== v) return et = void 0, k = u, ft = l, tt = function () {
                            var o, ut, t, tt;
                            if (!b && (t = !1, null != ft && (--ft, 0 >= ft && (ft = l, rt(), t = !0)), t || s.height() === st || rt(), t = n.scrollTop(), null != et && (ut = t - et), et = t, nt ? (e && (tt = t + p + k > v + a, it && !tt && (it = !1, i.css({
                                    position: "fixed",
                                    bottom: "",
                                    top: k
                                }).trigger("sticky_kit:unbottom"))), t < y && (nt = !1, k = u, null == r && ("left" !== w && "right" !== w || i.insertAfter(g), g.detach()), o = {
                                    position: "",
                                    width: "",
                                    top: ""
                                }, i.css(o).removeClass(f).trigger("sticky_kit:unstick")), c && (o = n.height(), p + u > o && !it && (k -= ut, k = Math.max(o - p, k), k = Math.min(u, k), nt && i.css({
                                    top: k + "px"
                                })))) : t > y && (nt = !0, o = {
                                    position: "fixed",
                                    top: k
                                }, o.width = "border-box" === i.css("box-sizing") ? i.outerWidth() + "px" : i.width() + "px", i.css(o).addClass(f), null == r && (i.after(g), "left" !== w && "right" !== w || g.append(i)), i.trigger("sticky_kit:stick")), nt && e && (null == tt && (tt = t + p + k > v + a), !it && tt))) return it = !0, "static" === d.css("position") && d.css({
                                position: "relative"
                            }), i.css({
                                position: "absolute",
                                bottom: h,
                                top: "auto"
                            }).trigger("sticky_kit:bottom")
                        }, ut = function () {
                            return rt(), tt()
                        }, ot = function () {
                            return b = !0, n.off("touchmove", tt), n.off("scroll", tt), n.off("resize", ut), t(document.body).off("sticky_kit:recalc", ut), i.off("sticky_kit:detach", ot), i.removeData("sticky_kit"), i.css({
                                position: "",
                                bottom: "",
                                top: "",
                                width: ""
                            }), d.position("position", ""), nt ? (null == r && ("left" !== w && "right" !== w || i.insertAfter(g), g.remove()), i.removeClass(f)) : void 0
                        }, n.on("touchmove", tt), n.on("scroll", tt), n.on("resize", ut), t(document.body).on("sticky_kit:recalc", ut), i.on("sticky_kit:detach", ot), setTimeout(tt, 0)
                    }
                }, h = 0, v = this.length; h < v; h++) i = this[h], a(t(i));
            return this
        }
    }.call(this), function () {
        "use strict";

        function n(t, r) {
            function h(n, t) {
                return function () {
                    return n.apply(t, arguments)
                }
            }
            var o, f, e, u, s;
            if (r = r || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = r.touchBoundary || 10, this.layer = t, this.tapDelay = r.tapDelay || 200, this.tapTimeout = r.tapTimeout || 700, !n.notNeeded(t)) {
                for (f = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], e = this, u = 0, s = f.length; u < s; u++) e[f[u]] = h(e[f[u]], e);
                i && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0), t.addEventListener("mouseup", this.onMouse, !0));
                t.addEventListener("click", this.onClick, !0);
                t.addEventListener("touchstart", this.onTouchStart, !1);
                t.addEventListener("touchmove", this.onTouchMove, !1);
                t.addEventListener("touchend", this.onTouchEnd, !1);
                t.addEventListener("touchcancel", this.onTouchCancel, !1);
                Event.prototype.stopImmediatePropagation || (t.removeEventListener = function (n, i, r) {
                    var u = Node.prototype.removeEventListener;
                    n === "click" ? u.call(t, n, i.hijacked || i, r) : u.call(t, n, i, r)
                }, t.addEventListener = function (n, i, r) {
                    var u = Node.prototype.addEventListener;
                    n === "click" ? u.call(t, n, i.hijacked || (i.hijacked = function (n) {
                        n.propagationStopped || i(n)
                    }), r) : u.call(t, n, i, r)
                });
                typeof t.onclick == "function" && (o = t.onclick, t.addEventListener("click", function (n) {
                    o(n)
                }, !1), t.onclick = null)
            }
        }
        var r = navigator.userAgent.indexOf("Windows Phone") >= 0,
            i = navigator.userAgent.indexOf("Android") > 0 && !r,
            t = /iP(ad|hone|od)/.test(navigator.userAgent) && !r,
            u = t && /OS 4_\d(_\d)?/.test(navigator.userAgent),
            f = t && /OS [6-7]_\d/.test(navigator.userAgent),
            e = navigator.userAgent.indexOf("BB10") > 0;
        n.prototype.needsClick = function (n) {
            switch (n.nodeName.toLowerCase()) {
                case "button":
                case "select":
                case "textarea":
                    if (n.disabled) return !0;
                    break;
                case "input":
                    if (t && n.type === "file" || n.disabled) return !0;
                    break;
                case "label":
                case "iframe":
                case "video":
                    return !0
            }
            return /\bneedsclick\b/.test(n.className)
        };
        n.prototype.needsFocus = function (n) {
            switch (n.nodeName.toLowerCase()) {
                case "textarea":
                    return !0;
                case "select":
                    return !i;
                case "input":
                    switch (n.type) {
                        case "button":
                        case "checkbox":
                        case "file":
                        case "image":
                        case "radio":
                        case "submit":
                            return !1
                    }
                    return !n.disabled && !n.readOnly;
                default:
                    return /\bneedsfocus\b/.test(n.className)
            }
        };
        n.prototype.sendClick = function (n, t) {
            var r, i;
            document.activeElement && document.activeElement !== n && document.activeElement.blur();
            i = t.changedTouches[0];
            r = document.createEvent("MouseEvents");
            r.initMouseEvent(this.determineEventType(n), !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null);
            r.forwardedTouchEvent = !0;
            n.dispatchEvent(r)
        };
        n.prototype.determineEventType = function (n) {
            return i && n.tagName.toLowerCase() === "select" ? "mousedown" : "click"
        };
        n.prototype.focus = function (n) {
            var i;
            t && n.setSelectionRange && n.type.indexOf("date") !== 0 && n.type !== "time" && n.type !== "month" ? (i = n.value.length, n.setSelectionRange(i, i)) : n.focus()
        };
        n.prototype.updateScrollParent = function (n) {
            var i, t;
            if (i = n.fastClickScrollParent, !i || !i.contains(n)) {
                t = n;
                do {
                    if (t.scrollHeight > t.offsetHeight) {
                        i = t;
                        n.fastClickScrollParent = t;
                        break
                    }
                    t = t.parentElement
                } while (t)
            }
            i && (i.fastClickLastScrollTop = i.scrollTop)
        };
        n.prototype.getTargetElementFromEventTarget = function (n) {
            return n.nodeType === Node.TEXT_NODE ? n.parentNode : n
        };
        n.prototype.onTouchStart = function (n) {
            var r, i, f;
            if (n.targetTouches.length > 1) return !0;
            if (r = this.getTargetElementFromEventTarget(n.target), i = n.targetTouches[0], t) {
                if (f = window.getSelection(), f.rangeCount && !f.isCollapsed) return !0;
                if (!u) {
                    if (i.identifier && i.identifier === this.lastTouchIdentifier) return n.preventDefault(), !1;
                    this.lastTouchIdentifier = i.identifier;
                    this.updateScrollParent(r)
                }
            }
            return this.trackingClick = !0, this.trackingClickStart = n.timeStamp, this.targetElement = r, this.touchStartX = i.pageX, this.touchStartY = i.pageY, n.timeStamp - this.lastClickTime < this.tapDelay && n.preventDefault(), !0
        };
        n.prototype.touchHasMoved = function (n) {
            var t = n.changedTouches[0],
                i = this.touchBoundary;
            return Math.abs(t.pageX - this.touchStartX) > i || Math.abs(t.pageY - this.touchStartY) > i ? !0 : !1
        };
        n.prototype.onTouchMove = function (n) {
            return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(n.target) || this.touchHasMoved(n)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
        };
        n.prototype.findControl = function (n) {
            return n.control !== undefined ? n.control : n.htmlFor ? document.getElementById(n.htmlFor) : n.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
        };
        n.prototype.onTouchEnd = function (n) {
            var s, c, e, o, h, r = this.targetElement;
            if (!this.trackingClick) return !0;
            if (n.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
            if (n.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
            if (this.cancelNextClick = !1, this.lastClickTime = n.timeStamp, c = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, f && (h = n.changedTouches[0], r = document.elementFromPoint(h.pageX - window.pageXOffset, h.pageY - window.pageYOffset) || r, r.fastClickScrollParent = this.targetElement.fastClickScrollParent), e = r.tagName.toLowerCase(), e === "label") {
                if (s = this.findControl(r), s) {
                    if (this.focus(r), i) return !1;
                    r = s
                }
            } else if (this.needsFocus(r)) return n.timeStamp - c > 100 || t && window.top !== window && e === "input" ? (this.targetElement = null, !1) : (this.focus(r), this.sendClick(r, n), t && e === "select" || (this.targetElement = null, n.preventDefault()), !1);
            return t && !u && (o = r.fastClickScrollParent, o && o.fastClickLastScrollTop !== o.scrollTop) ? !0 : (this.needsClick(r) || (n.preventDefault(), this.sendClick(r, n)), !1)
        };
        n.prototype.onTouchCancel = function () {
            this.trackingClick = !1;
            this.targetElement = null
        };
        n.prototype.onMouse = function (n) {
            return this.targetElement ? n.forwardedTouchEvent ? !0 : n.cancelable ? !this.needsClick(this.targetElement) || this.cancelNextClick ? (n.stopImmediatePropagation ? n.stopImmediatePropagation() : n.propagationStopped = !0, n.stopPropagation(), n.preventDefault(), !1) : !0 : !0 : !0
        };
        n.prototype.onClick = function (n) {
            var t;
            return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : n.target.type === "submit" && n.detail === 0 ? !0 : (t = this.onMouse(n), t || (this.targetElement = null), t)
        };
        n.prototype.destroy = function () {
            var n = this.layer;
            i && (n.removeEventListener("mouseover", this.onMouse, !0), n.removeEventListener("mousedown", this.onMouse, !0), n.removeEventListener("mouseup", this.onMouse, !0));
            n.removeEventListener("click", this.onClick, !0);
            n.removeEventListener("touchstart", this.onTouchStart, !1);
            n.removeEventListener("touchmove", this.onTouchMove, !1);
            n.removeEventListener("touchend", this.onTouchEnd, !1);
            n.removeEventListener("touchcancel", this.onTouchCancel, !1)
        };
        n.notNeeded = function (n) {
            var t, r, u, f;
            if (typeof ontouchstart == "undefined") return !0;
            if (r = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], r)
                if (i) {
                    if (t = document.querySelector("meta[name=viewport]"), t && (t.content.indexOf("user-scalable=no") !== -1 || r > 31 && document.documentElement.scrollWidth <= window.outerWidth)) return !0
                } else return !0;
            return e && (u = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), u[1] >= 10 && u[2] >= 3 && (t = document.querySelector("meta[name=viewport]"), t && (t.content.indexOf("user-scalable=no") !== -1 || document.documentElement.scrollWidth <= window.outerWidth))) ? !0 : n.style.msTouchAction === "none" || n.style.touchAction === "manipulation" ? !0 : (f = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], f >= 27 && (t = document.querySelector("meta[name=viewport]"), t && (t.content.indexOf("user-scalable=no") !== -1 || document.documentElement.scrollWidth <= window.outerWidth))) ? !0 : n.style.touchAction === "none" || n.style.touchAction === "manipulation" ? !0 : !1
        };
        n.attach = function (t, i) {
            return new n(t, i)
        };
        typeof define == "function" && typeof define.amd == "object" && define.amd ? define(function () {
            return n
        }) : typeof module != "undefined" && module.exports ? (module.exports = n.attach, module.exports.FastClick = n) : window.FastClick = n
    }(), $(function () {
        FastClick.attach(document.body)
    }), ! function (n) {
        var t = !1,
            r, i;
        ("function" == typeof define && define.amd && (define(n), t = !0), "object" == typeof exports && (module.exports = n(), t = !0), t) || (r = window.Cookies, i = window.Cookies = n(), i.noConflict = function () {
            return window.Cookies = r, i
        })
    }(function () {
        function n() {
            for (var i, r, n = 0, t = {}; n < arguments.length; n++) {
                i = arguments[n];
                for (r in i) t[r] = i[r]
            }
            return t
        }

        function t(i) {
            function r(t, u, f) {
                var o, c, l, s, v, e, h;
                if ("undefined" != typeof document) {
                    if (arguments.length > 1) {
                        "number" == typeof (f = n({
                            path: "/"
                        }, r.defaults, f)).expires && (c = new Date, c.setMilliseconds(c.getMilliseconds() + 864e5 * f.expires), f.expires = c);
                        f.expires = f.expires ? f.expires.toUTCString() : "";
                        try {
                            o = JSON.stringify(u);
                            /^[\{\[]/.test(o) && (u = o)
                        } catch (n) {}
                        u = i.write ? i.write(u, t) : encodeURIComponent(String(u)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                        t = (t = (t = encodeURIComponent(String(t))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
                        l = "";
                        for (s in f) f[s] && (l += "; " + s, !0 !== f[s] && (l += "=" + f[s]));
                        return document.cookie = t + "=" + u + l
                    }
                    t || (o = {});
                    for (var y = document.cookie ? document.cookie.split("; ") : [], p = /(%[0-9A-Z]{2})+/g, a = 0; a < y.length; a++) {
                        v = y[a].split("=");
                        e = v.slice(1).join("=");
                        this.json || '"' !== e.charAt(0) || (e = e.slice(1, -1));
                        try {
                            if (h = v[0].replace(p, decodeURIComponent), e = i.read ? i.read(e, h) : i(e, h) || e.replace(p, decodeURIComponent), this.json) try {
                                e = JSON.parse(e)
                            } catch (n) {}
                            if (t === h) {
                                o = e;
                                break
                            }
                            t || (o[h] = e)
                        } catch (n) {}
                    }
                    return o
                }
            }
            return r.set = r, r.get = function (n) {
                return r.call(r, n)
            }, r.getJSON = function () {
                return r.apply({
                    json: !0
                }, [].slice.call(arguments))
            }, r.defaults = {}, r.remove = function (t, i) {
                r(t, "", n(i, {
                    expires: -1
                }))
            }, r.withConverter = t, r
        }
        return t(function () {})
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function (n) {
    "use strict";
    var t = n.fn.jquery.split(" ")[0].split(".");
    if (t[0] < 2 && t[1] < 9 || 1 == t[0] && 9 == t[1] && t[2] < 1 || t[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
}(jQuery); + function (n) {
    "use strict";

    function t() {
        var i = document.createElement("bootstrap"),
            n = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var t in n)
            if (void 0 !== i.style[t]) return {
                end: n[t]
            };
        return !1
    }
    n.fn.emulateTransitionEnd = function (t) {
        var i = !1,
            u = this,
            r;
        n(this).one("bsTransitionEnd", function () {
            i = !0
        });
        return r = function () {
            i || n(u).trigger(n.support.transition.end)
        }, setTimeout(r, t), this
    };
    n(function () {
        n.support.transition = t();
        n.support.transition && (n.event.special.bsTransitionEnd = {
            bindType: n.support.transition.end,
            delegateType: n.support.transition.end,
            handle: function (t) {
                if (n(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery); + function (n) {
    "use strict";

    function u(i) {
        return this.each(function () {
            var r = n(this),
                u = r.data("bs.alert");
            u || r.data("bs.alert", u = new t(this));
            "string" == typeof i && u[i].call(r)
        })
    }
    var i = '[data-dismiss="alert"]',
        t = function (t) {
            n(t).on("click", i, this.close)
        },
        r;
    t.VERSION = "3.3.7";
    t.TRANSITION_DURATION = 150;
    t.prototype.close = function (i) {
        function e() {
            r.detach().trigger("closed.bs.alert").remove()
        }
        var f = n(this),
            u = f.attr("data-target"),
            r;
        u || (u = f.attr("href"), u = u && u.replace(/.*(?=#[^\s]*$)/, ""));
        r = n("#" === u ? [] : u);
        i && i.preventDefault();
        r.length || (r = f.closest(".alert"));
        r.trigger(i = n.Event("close.bs.alert"));
        i.isDefaultPrevented() || (r.removeClass("in"), n.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", e).emulateTransitionEnd(t.TRANSITION_DURATION) : e())
    };
    r = n.fn.alert;
    n.fn.alert = u;
    n.fn.alert.Constructor = t;
    n.fn.alert.noConflict = function () {
        return n.fn.alert = r, this
    };
    n(document).on("click.bs.alert.data-api", i, t.prototype.close)
}(jQuery); + function (n) {
    "use strict";

    function i(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.button"),
                f = "object" == typeof i && i;
            r || u.data("bs.button", r = new t(this, f));
            "toggle" == i ? r.toggle() : i && r.setState(i)
        })
    }
    var t = function (i, r) {
            this.$element = n(i);
            this.options = n.extend({}, t.DEFAULTS, r);
            this.isLoading = !1
        },
        r;
    t.VERSION = "3.3.7";
    t.DEFAULTS = {
        loadingText: "loading..."
    };
    t.prototype.setState = function (t) {
        var i = "disabled",
            r = this.$element,
            f = r.is("input") ? "val" : "html",
            u = r.data();
        t += "Text";
        null == u.resetText && r.data("resetText", r[f]());
        setTimeout(n.proxy(function () {
            r[f](null == u[t] ? this.options[t] : u[t]);
            "loadingText" == t ? (this.isLoading = !0, r.addClass(i).attr(i, i).prop(i, !0)) : this.isLoading && (this.isLoading = !1, r.removeClass(i).removeAttr(i).prop(i, !1))
        }, this), 0)
    };
    t.prototype.toggle = function () {
        var t = !0,
            i = this.$element.closest('[data-toggle="buttons"]'),
            n;
        i.length ? (n = this.$element.find("input"), "radio" == n.prop("type") ? (n.prop("checked") && (t = !1), i.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == n.prop("type") && (n.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), n.prop("checked", this.$element.hasClass("active")), t && n.trigger("change")) : (this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active"))
    };
    r = n.fn.button;
    n.fn.button = i;
    n.fn.button.Constructor = t;
    n.fn.button.noConflict = function () {
        return n.fn.button = r, this
    };
    n(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (t) {
        var r = n(t.target).closest(".btn");
        i.call(r, "toggle");
        n(t.target).is('input[type="radio"], input[type="checkbox"]') || (t.preventDefault(), r.is("input,button") ? r.trigger("focus") : r.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (t) {
        n(t.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(t.type))
    })
}(jQuery); + function (n) {
    "use strict";

    function i(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.carousel"),
                f = n.extend({}, t.DEFAULTS, u.data(), "object" == typeof i && i),
                e = "string" == typeof i ? i : f.slide;
            r || u.data("bs.carousel", r = new t(this, f));
            "number" == typeof i ? r.to(i) : e ? r[e]() : f.interval && r.pause().cycle()
        })
    }
    var t = function (t, i) {
            this.$element = n(t);
            this.$indicators = this.$element.find(".carousel-indicators");
            this.options = i;
            this.paused = null;
            this.sliding = null;
            this.interval = null;
            this.$active = null;
            this.$items = null;
            this.options.keyboard && this.$element.on("keydown.bs.carousel", n.proxy(this.keydown, this));
            "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", n.proxy(this.pause, this)).on("mouseleave.bs.carousel", n.proxy(this.cycle, this))
        },
        u, r;
    t.VERSION = "3.3.7";
    t.TRANSITION_DURATION = 600;
    t.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    };
    t.prototype.keydown = function (n) {
        if (!/input|textarea/i.test(n.target.tagName)) {
            switch (n.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            n.preventDefault()
        }
    };
    t.prototype.cycle = function (t) {
        return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(n.proxy(this.next, this), this.options.interval)), this
    };
    t.prototype.getItemIndex = function (n) {
        return this.$items = n.parent().children(".item"), this.$items.index(n || this.$active)
    };
    t.prototype.getItemForDirection = function (n, t) {
        var i = this.getItemIndex(t),
            f = "prev" == n && 0 === i || "next" == n && i == this.$items.length - 1,
            r, u;
        return f && !this.options.wrap ? t : (r = "prev" == n ? -1 : 1, u = (i + r) % this.$items.length, this.$items.eq(u))
    };
    t.prototype.to = function (n) {
        var i = this,
            t = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(n > this.$items.length - 1 || n < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function () {
            i.to(n)
        }) : t == n ? this.pause().cycle() : this.slide(n > t ? "next" : "prev", this.$items.eq(n))
    };
    t.prototype.pause = function (t) {
        return t || (this.paused = !0), this.$element.find(".next, .prev").length && n.support.transition && (this.$element.trigger(n.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    };
    t.prototype.next = function () {
        if (!this.sliding) return this.slide("next")
    };
    t.prototype.prev = function () {
        if (!this.sliding) return this.slide("prev")
    };
    t.prototype.slide = function (i, r) {
        var e = this.$element.find(".item.active"),
            u = r || this.getItemForDirection(i, e),
            l = this.interval,
            f = "next" == i ? "left" : "right",
            a = this,
            o, s, h, c;
        return u.hasClass("active") ? this.sliding = !1 : (o = u[0], s = n.Event("slide.bs.carousel", {
            relatedTarget: o,
            direction: f
        }), (this.$element.trigger(s), !s.isDefaultPrevented()) ? ((this.sliding = !0, l && this.pause(), this.$indicators.length) && (this.$indicators.find(".active").removeClass("active"), h = n(this.$indicators.children()[this.getItemIndex(u)]), h && h.addClass("active")), c = n.Event("slid.bs.carousel", {
            relatedTarget: o,
            direction: f
        }), n.support.transition && this.$element.hasClass("slide") ? (u.addClass(i), u[0].offsetWidth, e.addClass(f), u.addClass(f), e.one("bsTransitionEnd", function () {
            u.removeClass([i, f].join(" ")).addClass("active");
            e.removeClass(["active", f].join(" "));
            a.sliding = !1;
            setTimeout(function () {
                a.$element.trigger(c)
            }, 0)
        }).emulateTransitionEnd(t.TRANSITION_DURATION)) : (e.removeClass("active"), u.addClass("active"), this.sliding = !1, this.$element.trigger(c)), l && this.cycle(), this) : void 0)
    };
    u = n.fn.carousel;
    n.fn.carousel = i;
    n.fn.carousel.Constructor = t;
    n.fn.carousel.noConflict = function () {
        return n.fn.carousel = u, this
    };
    r = function (t) {
        var o, r = n(this),
            u = n(r.attr("data-target") || (o = r.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, "")),
            e, f;
        u.hasClass("carousel") && (e = n.extend({}, u.data(), r.data()), f = r.attr("data-slide-to"), f && (e.interval = !1), i.call(u, e), f && u.data("bs.carousel").to(f), t.preventDefault())
    };
    n(document).on("click.bs.carousel.data-api", "[data-slide]", r).on("click.bs.carousel.data-api", "[data-slide-to]", r);
    n(window).on("load", function () {
        n('[data-ride="carousel"]').each(function () {
            var t = n(this);
            i.call(t, t.data())
        })
    })
}(jQuery); + function (n) {
    "use strict";

    function r(t) {
        var i, r = t.attr("data-target") || (i = t.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return n(r)
    }

    function i(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.collapse"),
                f = n.extend({}, t.DEFAULTS, u.data(), "object" == typeof i && i);
            !r && f.toggle && /show|hide/.test(i) && (f.toggle = !1);
            r || u.data("bs.collapse", r = new t(this, f));
            "string" == typeof i && r[i]()
        })
    }
    var t = function (i, r) {
            this.$element = n(i);
            this.options = n.extend({}, t.DEFAULTS, r);
            this.$trigger = n('[data-toggle="collapse"][href="#' + i.id + '"],[data-toggle="collapse"][data-target="#' + i.id + '"]');
            this.transitioning = null;
            this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger);
            this.options.toggle && this.toggle()
        },
        u;
    t.VERSION = "3.3.7";
    t.TRANSITION_DURATION = 350;
    t.DEFAULTS = {
        toggle: !0
    };
    t.prototype.dimension = function () {
        var n = this.$element.hasClass("width");
        return n ? "width" : "height"
    };
    t.prototype.show = function () {
        var f, r, e, u, o, s;
        if (!this.transitioning && !this.$element.hasClass("in") && (r = this.$parent && this.$parent.children(".panel").children(".in, .collapsing"), !(r && r.length && (f = r.data("bs.collapse"), f && f.transitioning)) && (e = n.Event("show.bs.collapse"), this.$element.trigger(e), !e.isDefaultPrevented()))) {
            if (r && r.length && (i.call(r, "hide"), f || r.data("bs.collapse", null)), u = this.dimension(), this.$element.removeClass("collapse").addClass("collapsing")[u](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1, o = function () {
                    this.$element.removeClass("collapsing").addClass("collapse in")[u]("");
                    this.transitioning = 0;
                    this.$element.trigger("shown.bs.collapse")
                }, !n.support.transition) return o.call(this);
            s = n.camelCase(["scroll", u].join("-"));
            this.$element.one("bsTransitionEnd", n.proxy(o, this)).emulateTransitionEnd(t.TRANSITION_DURATION)[u](this.$element[0][s])
        }
    };
    t.prototype.hide = function () {
        var r, i, u;
        if (!this.transitioning && this.$element.hasClass("in") && (r = n.Event("hide.bs.collapse"), this.$element.trigger(r), !r.isDefaultPrevented())) return i = this.dimension(), this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1, u = function () {
            this.transitioning = 0;
            this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
        }, n.support.transition ? void this.$element[i](0).one("bsTransitionEnd", n.proxy(u, this)).emulateTransitionEnd(t.TRANSITION_DURATION) : u.call(this)
    };
    t.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    t.prototype.getParent = function () {
        return n(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(n.proxy(function (t, i) {
            var u = n(i);
            this.addAriaAndCollapsedClass(r(u), u)
        }, this)).end()
    };
    t.prototype.addAriaAndCollapsedClass = function (n, t) {
        var i = n.hasClass("in");
        n.attr("aria-expanded", i);
        t.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    u = n.fn.collapse;
    n.fn.collapse = i;
    n.fn.collapse.Constructor = t;
    n.fn.collapse.noConflict = function () {
        return n.fn.collapse = u, this
    };
    n(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (t) {
        var u = n(this);
        u.attr("data-target") || t.preventDefault();
        var f = r(u),
            e = f.data("bs.collapse"),
            o = e ? "toggle" : u.data();
        i.call(f, o)
    })
}(jQuery); + function (n) {
    "use strict";

    function r(t) {
        var i = t.attr("data-target"),
            r;
        return i || (i = t.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, "")), r = i && n(i), r && r.length ? r : t.parent()
    }

    function u(t) {
        t && 3 === t.which || (n(o).remove(), n(i).each(function () {
            var u = n(this),
                i = r(u),
                f = {
                    relatedTarget: this
                };
            i.hasClass("open") && (t && "click" == t.type && /input|textarea/i.test(t.target.tagName) && n.contains(i[0], t.target) || (i.trigger(t = n.Event("hide.bs.dropdown", f)), t.isDefaultPrevented() || (u.attr("aria-expanded", "false"), i.removeClass("open").trigger(n.Event("hidden.bs.dropdown", f)))))
        }))
    }

    function e(i) {
        return this.each(function () {
            var r = n(this),
                u = r.data("bs.dropdown");
            u || r.data("bs.dropdown", u = new t(this));
            "string" == typeof i && u[i].call(r)
        })
    }
    var o = ".dropdown-backdrop",
        i = '[data-toggle="dropdown"]',
        t = function (t) {
            n(t).on("click.bs.dropdown", this.toggle)
        },
        f;
    t.VERSION = "3.3.7";
    t.prototype.toggle = function (t) {
        var f = n(this),
            i, o, e;
        if (!f.is(".disabled, :disabled")) {
            if (i = r(f), o = i.hasClass("open"), u(), !o) {
                if ("ontouchstart" in document.documentElement && !i.closest(".navbar-nav").length && n(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(n(this)).on("click", u), e = {
                        relatedTarget: this
                    }, i.trigger(t = n.Event("show.bs.dropdown", e)), t.isDefaultPrevented()) return;
                f.trigger("focus").attr("aria-expanded", "true");
                i.toggleClass("open").trigger(n.Event("shown.bs.dropdown", e))
            }
            return !1
        }
    };
    t.prototype.keydown = function (t) {
        var e, o, s, h, f, u;
        if (/(38|40|27|32)/.test(t.which) && !/input|textarea/i.test(t.target.tagName) && (e = n(this), t.preventDefault(), t.stopPropagation(), !e.is(".disabled, :disabled"))) {
            if (o = r(e), s = o.hasClass("open"), !s && 27 != t.which || s && 27 == t.which) return 27 == t.which && o.find(i).trigger("focus"), e.trigger("click");
            h = " li:not(.disabled):visible a";
            f = o.find(".dropdown-menu" + h);
            f.length && (u = f.index(t.target), 38 == t.which && u > 0 && u--, 40 == t.which && u < f.length - 1 && u++, ~u || (u = 0), f.eq(u).trigger("focus"))
        }
    };
    f = n.fn.dropdown;
    n.fn.dropdown = e;
    n.fn.dropdown.Constructor = t;
    n.fn.dropdown.noConflict = function () {
        return n.fn.dropdown = f, this
    };
    n(document).on("click.bs.dropdown.data-api", u).on("click.bs.dropdown.data-api", ".dropdown form", function (n) {
        n.stopPropagation()
    }).on("click.bs.dropdown.data-api", i, t.prototype.toggle).on("keydown.bs.dropdown.data-api", i, t.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", t.prototype.keydown)
}(jQuery); + function (n) {
    "use strict";

    function i(i, r) {
        return this.each(function () {
            var f = n(this),
                u = f.data("bs.modal"),
                e = n.extend({}, t.DEFAULTS, f.data(), "object" == typeof i && i);
            u || f.data("bs.modal", u = new t(this, e));
            "string" == typeof i ? u[i](r) : e.show && u.show(r)
        })
    }
    var t = function (t, i) {
            this.options = i;
            this.$body = n(document.body);
            this.$element = n(t);
            this.$dialog = this.$element.find(".modal-dialog");
            this.$backdrop = null;
            this.isShown = null;
            this.originalBodyPad = null;
            this.scrollbarWidth = 0;
            this.ignoreBackdropClick = !1;
            this.options.remote && this.$element.find(".modal-content").load(this.options.remote, n.proxy(function () {
                this.$element.trigger("loaded.bs.modal")
            }, this))
        },
        r;
    t.VERSION = "3.3.7";
    t.TRANSITION_DURATION = 300;
    t.BACKDROP_TRANSITION_DURATION = 150;
    t.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    };
    t.prototype.toggle = function (n) {
        return this.isShown ? this.hide() : this.show(n)
    };
    t.prototype.show = function (i) {
        var r = this,
            u = n.Event("show.bs.modal", {
                relatedTarget: i
            });
        this.$element.trigger(u);
        this.isShown || u.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', n.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
            r.$element.one("mouseup.dismiss.bs.modal", function (t) {
                n(t.target).is(r.$element) && (r.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function () {
            var f = n.support.transition && r.$element.hasClass("fade"),
                u;
            r.$element.parent().length || r.$element.appendTo(r.$body);
            r.$element.show().scrollTop(0);
            r.adjustDialog();
            f && r.$element[0].offsetWidth;
            r.$element.addClass("in");
            r.enforceFocus();
            u = n.Event("shown.bs.modal", {
                relatedTarget: i
            });
            f ? r.$dialog.one("bsTransitionEnd", function () {
                r.$element.trigger("focus").trigger(u)
            }).emulateTransitionEnd(t.TRANSITION_DURATION) : r.$element.trigger("focus").trigger(u)
        }))
    };
    t.prototype.hide = function (i) {
        i && i.preventDefault();
        i = n.Event("hide.bs.modal");
        this.$element.trigger(i);
        this.isShown && !i.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), n(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), n.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", n.proxy(this.hideModal, this)).emulateTransitionEnd(t.TRANSITION_DURATION) : this.hideModal())
    };
    t.prototype.enforceFocus = function () {
        n(document).off("focusin.bs.modal").on("focusin.bs.modal", n.proxy(function (n) {
            document === n.target || this.$element[0] === n.target || this.$element.has(n.target).length || this.$element.trigger("focus")
        }, this))
    };
    t.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", n.proxy(function (n) {
            27 == n.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    };
    t.prototype.resize = function () {
        this.isShown ? n(window).on("resize.bs.modal", n.proxy(this.handleUpdate, this)) : n(window).off("resize.bs.modal")
    };
    t.prototype.hideModal = function () {
        var n = this;
        this.$element.hide();
        this.backdrop(function () {
            n.$body.removeClass("modal-open");
            n.resetAdjustments();
            n.resetScrollbar();
            n.$element.trigger("hidden.bs.modal")
        })
    };
    t.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null
    };
    t.prototype.backdrop = function (i) {
        var e = this,
            f = this.$element.hasClass("fade") ? "fade" : "",
            r, u;
        if (this.isShown && this.options.backdrop) {
            if (r = n.support.transition && f, this.$backdrop = n(document.createElement("div")).addClass("modal-backdrop " + f).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", n.proxy(function (n) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(n.target === n.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), r && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !i) return;
            r ? this.$backdrop.one("bsTransitionEnd", i).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : i()
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), u = function () {
            e.removeBackdrop();
            i && i()
        }, n.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", u).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : u()) : i && i()
    };
    t.prototype.handleUpdate = function () {
        this.adjustDialog()
    };
    t.prototype.adjustDialog = function () {
        var n = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && n ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !n ? this.scrollbarWidth : ""
        })
    };
    t.prototype.resetAdjustments = function () {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    };
    t.prototype.checkScrollbar = function () {
        var n = window.innerWidth,
            t;
        n || (t = document.documentElement.getBoundingClientRect(), n = t.right - Math.abs(t.left));
        this.bodyIsOverflowing = document.body.clientWidth < n;
        this.scrollbarWidth = this.measureScrollbar()
    };
    t.prototype.setScrollbar = function () {
        var n = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "";
        this.bodyIsOverflowing && this.$body.css("padding-right", n + this.scrollbarWidth)
    };
    t.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad)
    };
    t.prototype.measureScrollbar = function () {
        var n = document.createElement("div"),
            t;
        return n.className = "modal-scrollbar-measure", this.$body.append(n), t = n.offsetWidth - n.clientWidth, this.$body[0].removeChild(n), t
    };
    r = n.fn.modal;
    n.fn.modal = i;
    n.fn.modal.Constructor = t;
    n.fn.modal.noConflict = function () {
        return n.fn.modal = r, this
    };
    n(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (t) {
        var r = n(this),
            f = r.attr("href"),
            u = n(r.attr("data-target") || f && f.replace(/.*(?=#[^\s]+$)/, "")),
            e = u.data("bs.modal") ? "toggle" : n.extend({
                remote: !/#/.test(f) && f
            }, u.data(), r.data());
        r.is("a") && t.preventDefault();
        u.one("show.bs.modal", function (n) {
            n.isDefaultPrevented() || u.one("hidden.bs.modal", function () {
                r.is(":visible") && r.trigger("focus")
            })
        });
        i.call(u, e, this)
    })
}(jQuery); + function (n) {
    "use strict";

    function r(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.tooltip"),
                f = "object" == typeof i && i;
            !r && /destroy|hide/.test(i) || (r || u.data("bs.tooltip", r = new t(this, f)), "string" == typeof i && r[i]())
        })
    }
    var t = function (n, t) {
            this.type = null;
            this.options = null;
            this.enabled = null;
            this.timeout = null;
            this.hoverState = null;
            this.$element = null;
            this.inState = null;
            this.init("tooltip", n, t)
        },
        i;
    t.VERSION = "3.3.7";
    t.TRANSITION_DURATION = 150;
    t.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"><\/div><div class="tooltip-inner"><\/div><\/div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    };
    t.prototype.init = function (t, i, r) {
        var f, e, u, o, s;
        if (this.enabled = !0, this.type = t, this.$element = n(i), this.options = this.getOptions(r), this.$viewport = this.options.viewport && n(n.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (f = this.options.trigger.split(" "), e = f.length; e--;)
            if (u = f[e], "click" == u) this.$element.on("click." + this.type, this.options.selector, n.proxy(this.toggle, this));
            else "manual" != u && (o = "hover" == u ? "mouseenter" : "focusin", s = "hover" == u ? "mouseleave" : "focusout", this.$element.on(o + "." + this.type, this.options.selector, n.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, n.proxy(this.leave, this)));
        this.options.selector ? this._options = n.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    };
    t.prototype.getDefaults = function () {
        return t.DEFAULTS
    };
    t.prototype.getOptions = function (t) {
        return t = n.extend({}, this.getDefaults(), this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {
            show: t.delay,
            hide: t.delay
        }), t
    };
    t.prototype.getDelegateOptions = function () {
        var t = {},
            i = this.getDefaults();
        return this._options && n.each(this._options, function (n, r) {
            i[n] != r && (t[n] = r)
        }), t
    };
    t.prototype.enter = function (t) {
        var i = t instanceof this.constructor ? t : n(t.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), n(t.currentTarget).data("bs." + this.type, i)), t instanceof n.Event && (i.inState["focusin" == t.type ? "focus" : "hover"] = !0), i.tip().hasClass("in") || "in" == i.hoverState ? void(i.hoverState = "in") : (clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function () {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    };
    t.prototype.isInStateTrue = function () {
        for (var n in this.inState)
            if (this.inState[n]) return !0;
        return !1
    };
    t.prototype.leave = function (t) {
        var i = t instanceof this.constructor ? t : n(t.currentTarget).data("bs." + this.type);
        if (i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), n(t.currentTarget).data("bs." + this.type, i)), t instanceof n.Event && (i.inState["focusout" == t.type ? "focus" : "hover"] = !1), !i.isInStateTrue()) return clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function () {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide()
    };
    t.prototype.show = function () {
        var c = n.Event("show.bs." + this.type),
            l, p, e, w, h;
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(c), l = n.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]), c.isDefaultPrevented() || !l) return;
            var u = this,
                r = this.tip(),
                a = this.getUID(this.type);
            this.setContent();
            r.attr("id", a);
            this.$element.attr("aria-describedby", a);
            this.options.animation && r.addClass("fade");
            var i = "function" == typeof this.options.placement ? this.options.placement.call(this, r[0], this.$element[0]) : this.options.placement,
                v = /\s?auto?\s?/i,
                y = v.test(i);
            y && (i = i.replace(v, "") || "top");
            r.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(i).data("bs." + this.type, this);
            this.options.container ? r.appendTo(this.options.container) : r.insertAfter(this.$element);
            this.$element.trigger("inserted.bs." + this.type);
            var f = this.getPosition(),
                o = r[0].offsetWidth,
                s = r[0].offsetHeight;
            y && (p = i, e = this.getPosition(this.$viewport), i = "bottom" == i && f.bottom + s > e.bottom ? "top" : "top" == i && f.top - s < e.top ? "bottom" : "right" == i && f.right + o > e.width ? "left" : "left" == i && f.left - o < e.left ? "right" : i, r.removeClass(p).addClass(i));
            w = this.getCalculatedOffset(i, f, o, s);
            this.applyPlacement(w, i);
            h = function () {
                var n = u.hoverState;
                u.$element.trigger("shown.bs." + u.type);
                u.hoverState = null;
                "out" == n && u.leave(u)
            };
            n.support.transition && this.$tip.hasClass("fade") ? r.one("bsTransitionEnd", h).emulateTransitionEnd(t.TRANSITION_DURATION) : h()
        }
    };
    t.prototype.applyPlacement = function (t, i) {
        var r = this.tip(),
            l = r[0].offsetWidth,
            e = r[0].offsetHeight,
            o = parseInt(r.css("margin-top"), 10),
            s = parseInt(r.css("margin-left"), 10),
            h, f, u;
        isNaN(o) && (o = 0);
        isNaN(s) && (s = 0);
        t.top += o;
        t.left += s;
        n.offset.setOffset(r[0], n.extend({
            using: function (n) {
                r.css({
                    top: Math.round(n.top),
                    left: Math.round(n.left)
                })
            }
        }, t), 0);
        r.addClass("in");
        h = r[0].offsetWidth;
        f = r[0].offsetHeight;
        "top" == i && f != e && (t.top = t.top + e - f);
        u = this.getViewportAdjustedDelta(i, t, h, f);
        u.left ? t.left += u.left : t.top += u.top;
        var c = /top|bottom/.test(i),
            a = c ? 2 * u.left - l + h : 2 * u.top - e + f,
            v = c ? "offsetWidth" : "offsetHeight";
        r.offset(t);
        this.replaceArrow(a, r[0][v], c)
    };
    t.prototype.replaceArrow = function (n, t, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - n / t) + "%").css(i ? "top" : "left", "")
    };
    t.prototype.setContent = function () {
        var n = this.tip(),
            t = this.getTitle();
        n.find(".tooltip-inner")[this.options.html ? "html" : "text"](t);
        n.removeClass("fade in top bottom left right")
    };
    t.prototype.hide = function (i) {
        function f() {
            "in" != r.hoverState && u.detach();
            r.$element && r.$element.removeAttr("aria-describedby").trigger("hidden.bs." + r.type);
            i && i()
        }
        var r = this,
            u = n(this.$tip),
            e = n.Event("hide.bs." + this.type);
        if (this.$element.trigger(e), !e.isDefaultPrevented()) return u.removeClass("in"), n.support.transition && u.hasClass("fade") ? u.one("bsTransitionEnd", f).emulateTransitionEnd(t.TRANSITION_DURATION) : f(), this.hoverState = null, this
    };
    t.prototype.fixTitle = function () {
        var n = this.$element;
        (n.attr("title") || "string" != typeof n.attr("data-original-title")) && n.attr("data-original-title", n.attr("title") || "").attr("title", "")
    };
    t.prototype.hasContent = function () {
        return this.getTitle()
    };
    t.prototype.getPosition = function (t) {
        t = t || this.$element;
        var r = t[0],
            u = "BODY" == r.tagName,
            i = r.getBoundingClientRect();
        null == i.width && (i = n.extend({}, i, {
            width: i.right - i.left,
            height: i.bottom - i.top
        }));
        var f = window.SVGElement && r instanceof window.SVGElement,
            e = u ? {
                top: 0,
                left: 0
            } : f ? null : t.offset(),
            o = {
                scroll: u ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop()
            },
            s = u ? {
                width: n(window).width(),
                height: n(window).height()
            } : null;
        return n.extend({}, i, o, s, e)
    };
    t.prototype.getCalculatedOffset = function (n, t, i, r) {
        return "bottom" == n ? {
            top: t.top + t.height,
            left: t.left + t.width / 2 - i / 2
        } : "top" == n ? {
            top: t.top - r,
            left: t.left + t.width / 2 - i / 2
        } : "left" == n ? {
            top: t.top + t.height / 2 - r / 2,
            left: t.left - i
        } : {
            top: t.top + t.height / 2 - r / 2,
            left: t.left + t.width
        }
    };
    t.prototype.getViewportAdjustedDelta = function (n, t, i, r) {
        var f = {
                top: 0,
                left: 0
            },
            e, u, o, s, h, c;
        return this.$viewport ? (e = this.options.viewport && this.options.viewport.padding || 0, u = this.getPosition(this.$viewport), /right|left/.test(n) ? (o = t.top - e - u.scroll, s = t.top + e - u.scroll + r, o < u.top ? f.top = u.top - o : s > u.top + u.height && (f.top = u.top + u.height - s)) : (h = t.left - e, c = t.left + e + i, h < u.left ? f.left = u.left - h : c > u.right && (f.left = u.left + u.width - c)), f) : f
    };
    t.prototype.getTitle = function () {
        var t = this.$element,
            n = this.options;
        return t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title)
    };
    t.prototype.getUID = function (n) {
        do n += ~~(1e6 * Math.random()); while (document.getElementById(n));
        return n
    };
    t.prototype.tip = function () {
        if (!this.$tip && (this.$tip = n(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    };
    t.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    };
    t.prototype.enable = function () {
        this.enabled = !0
    };
    t.prototype.disable = function () {
        this.enabled = !1
    };
    t.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    };
    t.prototype.toggle = function (t) {
        var i = this;
        t && (i = n(t.currentTarget).data("bs." + this.type), i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), n(t.currentTarget).data("bs." + this.type, i)));
        t ? (i.inState.click = !i.inState.click, i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    };
    t.prototype.destroy = function () {
        var n = this;
        clearTimeout(this.timeout);
        this.hide(function () {
            n.$element.off("." + n.type).removeData("bs." + n.type);
            n.$tip && n.$tip.detach();
            n.$tip = null;
            n.$arrow = null;
            n.$viewport = null;
            n.$element = null
        })
    };
    i = n.fn.tooltip;
    n.fn.tooltip = r;
    n.fn.tooltip.Constructor = t;
    n.fn.tooltip.noConflict = function () {
        return n.fn.tooltip = i, this
    }
}(jQuery); + function (n) {
    "use strict";

    function r(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.popover"),
                f = "object" == typeof i && i;
            !r && /destroy|hide/.test(i) || (r || u.data("bs.popover", r = new t(this, f)), "string" == typeof i && r[i]())
        })
    }
    var t = function (n, t) {
            this.init("popover", n, t)
        },
        i;
    if (!n.fn.tooltip) throw new Error("Popover requires tooltip.js");
    t.VERSION = "3.3.7";
    t.DEFAULTS = n.extend({}, n.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content"><\/div><\/div>'
    });
    t.prototype = n.extend({}, n.fn.tooltip.Constructor.prototype);
    t.prototype.constructor = t;
    t.prototype.getDefaults = function () {
        return t.DEFAULTS
    };
    t.prototype.setContent = function () {
        var n = this.tip(),
            i = this.getTitle(),
            t = this.getContent();
        n.find(".popover-title")[this.options.html ? "html" : "text"](i);
        n.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof t ? "html" : "append" : "text"](t);
        n.removeClass("fade top bottom left right in");
        n.find(".popover-title").html() || n.find(".popover-title").hide()
    };
    t.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    };
    t.prototype.getContent = function () {
        var t = this.$element,
            n = this.options;
        return t.attr("data-content") || ("function" == typeof n.content ? n.content.call(t[0]) : n.content)
    };
    t.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    i = n.fn.popover;
    n.fn.popover = r;
    n.fn.popover.Constructor = t;
    n.fn.popover.noConflict = function () {
        return n.fn.popover = i, this
    }
}(jQuery); + function (n) {
    "use strict";

    function t(i, r) {
        this.$body = n(document.body);
        this.$scrollElement = n(n(i).is(document.body) ? window : i);
        this.options = n.extend({}, t.DEFAULTS, r);
        this.selector = (this.options.target || "") + " .nav li > a";
        this.offsets = [];
        this.targets = [];
        this.activeTarget = null;
        this.scrollHeight = 0;
        this.$scrollElement.on("scroll.bs.scrollspy", n.proxy(this.process, this));
        this.refresh();
        this.process()
    }

    function i(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.scrollspy"),
                f = "object" == typeof i && i;
            r || u.data("bs.scrollspy", r = new t(this, f));
            "string" == typeof i && r[i]()
        })
    }
    t.VERSION = "3.3.7";
    t.DEFAULTS = {
        offset: 10
    };
    t.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    };
    t.prototype.refresh = function () {
        var t = this,
            i = "offset",
            r = 0;
        this.offsets = [];
        this.targets = [];
        this.scrollHeight = this.getScrollHeight();
        n.isWindow(this.$scrollElement[0]) || (i = "position", r = this.$scrollElement.scrollTop());
        this.$body.find(this.selector).map(function () {
            var f = n(this),
                u = f.data("target") || f.attr("href"),
                t = /^#./.test(u) && n(u);
            return t && t.length && t.is(":visible") && [[t[i]().top + r, u]] || null
        }).sort(function (n, t) {
            return n[0] - t[0]
        }).each(function () {
            t.offsets.push(this[0]);
            t.targets.push(this[1])
        })
    };
    t.prototype.process = function () {
        var n, i = this.$scrollElement.scrollTop() + this.options.offset,
            f = this.getScrollHeight(),
            e = this.options.offset + f - this.$scrollElement.height(),
            t = this.offsets,
            r = this.targets,
            u = this.activeTarget;
        if (this.scrollHeight != f && this.refresh(), i >= e) return u != (n = r[r.length - 1]) && this.activate(n);
        if (u && i < t[0]) return this.activeTarget = null, this.clear();
        for (n = t.length; n--;) u != r[n] && i >= t[n] && (void 0 === t[n + 1] || i < t[n + 1]) && this.activate(r[n])
    };
    t.prototype.activate = function (t) {
        this.activeTarget = t;
        this.clear();
        var r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
            i = n(r).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active"));
        i.trigger("activate.bs.scrollspy")
    };
    t.prototype.clear = function () {
        n(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var r = n.fn.scrollspy;
    n.fn.scrollspy = i;
    n.fn.scrollspy.Constructor = t;
    n.fn.scrollspy.noConflict = function () {
        return n.fn.scrollspy = r, this
    };
    n(window).on("load.bs.scrollspy.data-api", function () {
        n('[data-spy="scroll"]').each(function () {
            var t = n(this);
            i.call(t, t.data())
        })
    })
}(jQuery); + function (n) {
    "use strict";

    function r(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.tab");
            r || u.data("bs.tab", r = new t(this));
            "string" == typeof i && r[i]()
        })
    }
    var t = function (t) {
            this.element = n(t)
        },
        u, i;
    t.VERSION = "3.3.7";
    t.TRANSITION_DURATION = 150;
    t.prototype.show = function () {
        var t = this.element,
            f = t.closest("ul:not(.dropdown-menu)"),
            i = t.data("target"),
            u;
        if (i || (i = t.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active")) {
            var r = f.find(".active:last a"),
                e = n.Event("hide.bs.tab", {
                    relatedTarget: t[0]
                }),
                o = n.Event("show.bs.tab", {
                    relatedTarget: r[0]
                });
            (r.trigger(e), t.trigger(o), o.isDefaultPrevented() || e.isDefaultPrevented()) || (u = n(i), this.activate(t.closest("li"), f), this.activate(u, u.parent(), function () {
                r.trigger({
                    type: "hidden.bs.tab",
                    relatedTarget: t[0]
                });
                t.trigger({
                    type: "shown.bs.tab",
                    relatedTarget: r[0]
                })
            }))
        }
    };
    t.prototype.activate = function (i, r, u) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1);
            i.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0);
            o ? (i[0].offsetWidth, i.addClass("in")) : i.removeClass("fade");
            i.parent(".dropdown-menu").length && i.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0);
            u && u()
        }
        var f = r.find("> .active"),
            o = u && n.support.transition && (f.length && f.hasClass("fade") || !!r.find("> .fade").length);
        f.length && o ? f.one("bsTransitionEnd", e).emulateTransitionEnd(t.TRANSITION_DURATION) : e();
        f.removeClass("in")
    };
    u = n.fn.tab;
    n.fn.tab = r;
    n.fn.tab.Constructor = t;
    n.fn.tab.noConflict = function () {
        return n.fn.tab = u, this
    };
    i = function (t) {
        t.preventDefault();
        r.call(n(this), "show")
    };
    n(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', i).on("click.bs.tab.data-api", '[data-toggle="pill"]', i)
}(jQuery); + function (n) {
    "use strict";

    function i(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.affix"),
                f = "object" == typeof i && i;
            r || u.data("bs.affix", r = new t(this, f));
            "string" == typeof i && r[i]()
        })
    }
    var t = function (i, r) {
            this.options = n.extend({}, t.DEFAULTS, r);
            this.$target = n(this.options.target).on("scroll.bs.affix.data-api", n.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", n.proxy(this.checkPositionWithEventLoop, this));
            this.$element = n(i);
            this.affixed = null;
            this.unpin = null;
            this.pinnedOffset = null;
            this.checkPosition()
        },
        r;
    t.VERSION = "3.3.7";
    t.RESET = "affix affix-top affix-bottom";
    t.DEFAULTS = {
        offset: 0,
        target: window
    };
    t.prototype.getState = function (n, t, i, r) {
        var u = this.$target.scrollTop(),
            f = this.$element.offset(),
            e = this.$target.height();
        if (null != i && "top" == this.affixed) return u < i && "top";
        if ("bottom" == this.affixed) return null != i ? !(u + this.unpin <= f.top) && "bottom" : !(u + e <= n - r) && "bottom";
        var o = null == this.affixed,
            s = o ? u : f.top,
            h = o ? e : t;
        return null != i && u <= i ? "top" : null != r && s + h >= n - r && "bottom"
    };
    t.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(t.RESET).addClass("affix");
        var n = this.$target.scrollTop(),
            i = this.$element.offset();
        return this.pinnedOffset = i.top - n
    };
    t.prototype.checkPositionWithEventLoop = function () {
        setTimeout(n.proxy(this.checkPosition, this), 1)
    };
    t.prototype.checkPosition = function () {
        var i, e, o;
        if (this.$element.is(":visible")) {
            var s = this.$element.height(),
                r = this.options.offset,
                f = r.top,
                u = r.bottom,
                h = Math.max(n(document).height(), n(document.body).height());
            if ("object" != typeof r && (u = f = r), "function" == typeof f && (f = r.top(this.$element)), "function" == typeof u && (u = r.bottom(this.$element)), i = this.getState(h, s, f, u), this.affixed != i) {
                if (null != this.unpin && this.$element.css("top", ""), e = "affix" + (i ? "-" + i : ""), o = n.Event(e + ".bs.affix"), this.$element.trigger(o), o.isDefaultPrevented()) return;
                this.affixed = i;
                this.unpin = "bottom" == i ? this.getPinnedOffset() : null;
                this.$element.removeClass(t.RESET).addClass(e).trigger(e.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == i && this.$element.offset({
                top: h - s - u
            })
        }
    };
    r = n.fn.affix;
    n.fn.affix = i;
    n.fn.affix.Constructor = t;
    n.fn.affix.noConflict = function () {
        return n.fn.affix = r, this
    };
    n(window).on("load", function () {
        n('[data-spy="affix"]').each(function () {
            var r = n(this),
                t = r.data();
            t.offset = t.offset || {};
            null != t.offsetBottom && (t.offset.bottom = t.offsetBottom);
            null != t.offsetTop && (t.offset.top = t.offsetTop);
            i.call(r, t)
        })
    })
}(jQuery);
window.Linguasorb = {
    Views: {},
    UI: {},
    Data: {},
    Core: {},
    Utilities: {},
    State: {}
};
window.Linguasorb.Utilities.Environment = function (n) {
    function u() {
        function f() {
            i ? t = 0 : (t++, t > 5 && (window.removeEventListener("mousemove", f, !1), u.resolve()))
        }

        function e() {
            t = 0;
            i = !0
        }

        function o() {
            t = 0;
            i = !1
        }
        var u = n.Deferred();
        r.waitMouseAvailable = u.promise();
        window.addEventListener("mousemove", f, !1);
        window.addEventListener("mousedown", e, !1);
        window.addEventListener("mouseup", o, !1)
    }
    var f = n.Deferred,
        r = {},
        t = 0,
        i = !1;
    return u(), r
}($);
window.Linguasorb.Utilities.JQuery = function (n) {
    var t = {};
    return t.ignoreDefaultEvent = function (n) {
        return function (t) {
            t && t.preventDefault && t.preventDefault();
            n && n.apply(this)
        }
    }, t.highlightText = function (t, i) {
        for (var e = n.trim(t).toLowerCase(), r = i.get(0).firstChild, o, f, u;
            (o = r.data.toLowerCase().indexOf(e)) >= 0;) f = r.splitText(o), r = f.splitText(e.length), u = document.createElement("span"), u.className = "highlight", r.parentNode.insertBefore(u, r), u.appendChild(f)
    }, t
}($);
window.Linguasorb.Utilities.StringUtilities = function () {
    var n = {};
    return n.toTitleCase = function (n) {
        return n.replace(/\w\S*/g, function (n) {
            return n.charAt(0).toUpperCase() + n.substr(1).toLowerCase()
        })
    }, n
}($);
Linguasorb.Core.ErrorHandler = function () {
    function i(i) {
        i.isHandled || (i.status == 0 ? setTimeout(function () {
            n || t(i)
        }, 2e3) : t(i))
    }

    function t() {}
    var n = !1;
    return $(window).unload(function () {
        n = !0
    }), {
        handleApiError: i
    }
}();
Linguasorb.Core.Api = function (n, t, i) {
    function f(i, r, u, f) {
        var e = n.Deferred(),
            h = {
                url: i,
                type: r,
                contentType: f,
                data: u,
                traditional: !0
            };
        return n.ajax(h).done(function (n) {
            f !== o && (n = n.data);
            e.resolve(n)
        }).fail(function (n) {
            var i = s(n);
            e.fail(t.handleApiError).reject(i)
        }), e.promise()
    }
    var u = "application/json",
        o = "application/x-www-form-urlencoded; charset=UTF-8",
        e = "GET",
        r = {},
        s;
    return n.ajaxPrefilter(function (n) {
        i.antiForgeryToken && n.type != e && (n.headers = n.headers || {}, n.headers["X-XSRF-Token"] = i.antiForgeryToken)
    }), r.get = function (n, t) {
        return f(n, e, t, u)
    }, r.getHtml = function (n, t) {
        return f(n, e, t, o)
    }, r.post = function (n, t) {
        return f(n, "POST", JSON.stringify(t), u)
    }, r.put = function (n, t) {
        return f(n, "PUT", JSON.stringify(t), u)
    }, r.del = function (n, t) {
        return f(n, "DELETE", JSON.stringify(t), u)
    }, s = function (t) {
        var i = {
                status: 0,
                isHandled: !1
            },
            r;
        return t ? (t.status && (i.status = t.status), r = t.getResponseHeader("content-type"), r && r.toLowerCase().indexOf(u) != -1 && n.extend(i, JSON.parse(t.responseText)), i) : i
    }, r
}($, Linguasorb.Core.ErrorHandler, Linguasorb.State);
Linguasorb.Data.AnalyticsService = function () {
    function t(n, t, i, r) {
        window.ga && ga("send", "event", n, t, i, r)
    }
    var n = {};
    return n.audioPlay = function () {
        t("Audio", "Play")
    }, n.mailinglistSignup = function (n) {
        t("mailinglist", "signup", n)
    }, n.leadBoxClick = function (n) {
        t("Lead Box", "Click", n)
    }, n.languageLevelSelected = function (n, i) {
        t("Level Selected", n, i)
    }, n.affiliateLinkClick = function (n) {
        t("Affiliate link", "General", n)
    }, n
}();
Linguasorb.Data.AudioService = function () {
    function r() {
        n.playbackRate = i
    }
    var t = {},
        n = document.createElement("audio"),
        i = 1;
    return r(), t.audio = function () {
        return n
    }, t.play = function () {
        n.play()
    }, t.pause = function () {
        n.pause()
    }, t.stop = function () {
        n.pause()
    }, t.load = function (t) {
        n.setAttribute("src", t);
        n.load()
    }, t.loadAndPlay = function (t) {
        (t != n.src || n.readyState != 1) && (n.setAttribute("src", t), n.load());
        n.play()
    }, t
}($);
Linguasorb.Data.CookieService = function () {
    var n = {},
        t = "lingc_dl";
    return n.getDefaultLanguage = function () {
        return Cookies.get(t)
    }, n.setDefaultLanguage = function (n) {
        Cookies.set(t, n, {
            expires: 365
        })
    }, n.getLanguageLevel = function (n) {
        return Cookies.get(n + "_level")
    }, n.setLanguageLevel = function (n, t) {
        Cookies.set(n + "_level", t, {
            expires: 365
        })
    }, n
}($);
Linguasorb.Data.EggService = function () {
    var n = {},
        t = "mmdkdjusthd65s3";
    return n.isEggBlockEnabled = function () {
        return !document.getElementById(t)
    }, n
}($);
Linguasorb.Data.MailingListService = function () {
    var n = {};
    return n.addSignup = function (n, t) {
        var i = {
            email: n,
            listId: t
        };
        $.ajax({
            type: "POST",
            url: "/mailinglist/signup",
            content: "application/json; charset=utf-8",
            dataType: "json",
            data: i,
            success: function () {
                return !0
            },
            error: function () {
                return !1
            }
        })
    }, n
}($);
Linguasorb.Data.SubscriptionService = function () {
    var n = {},
        t = "[data-egg-holder]";
    return n.userHasSubscription = function () {
        return $(t).length
    }, n
}($);
Linguasorb.UI.AudioButton = function (n, t, i, r, u) {
    function c() {
        e = n("[data-audio-button]")
    }

    function l() {
        e.on("click", "i", function () {
            var s = n(this).is("[data-audio-restricted]"),
                e, f;
            o = t.isEggBlockEnabled();
            s && o && !r.userHasSubscription() ? n("#adblock-modal").modal("show") : (e = n(this).hasClass("playing"), i.stop(), h(), e || (f = n(this).data("file"), n(this).addClass("playing"), i.loadAndPlay(f), u.audioPlay(f)))
        });
        n(s).on("play", a);
        n(s).on("ended", h)
    }

    function a() {}

    function h() {
        n("[data-audio-button] i").removeClass("playing")
    }
    var f = {},
        e, o, s = i.audio();
    return f.init = function () {
        c();
        l()
    }, f
}($, Linguasorb.Data.EggService, Linguasorb.Data.AudioService, Linguasorb.Data.SubscriptionService, Linguasorb.Data.AnalyticsService, Linguasorb.UI, Linguasorb.Utilities);
Linguasorb.UI.MailingListSignup = function (n, t) {
    function r() {
        n("[data-mailinglist-submit]").on("click", function (i) {
            var s;
            i.preventDefault();
            var r = n(this).parent(),
                h = n(r).find("[data-mailinglist-id]").val(),
                e = n(r).find("[data-mailinglist-name]").val(),
                o = n(r).find("[data-mailinglist-email]").val(),
                f = n(r).find("[data-mailinglist-message]");
            u(o) ? (f.html("Sending..."), s = {
                email: o,
                listId: h
            }, n.ajax({
                type: "POST",
                url: "/mailinglist/signup",
                content: "application/json; charset=utf-8",
                dataType: "json",
                data: s,
                success: function () {
                    f.html("Signup successful");
                    t.mailinglistSignup(e)
                },
                error: function () {
                    f.html("Error, please try again later");
                    t.mailinglistError(e)
                }
            })) : f.html("Invalid email")
        })
    }

    function u(n) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(n)
    }
    var i = {},
        f = n("[data-mailinglist-signup]");
    return i.init = function () {
        r()
    }, i
}($, Linguasorb.Data.AnalyticsService);
Linguasorb.UI.MobileCollapsePanel = function (n) {
    function r() {
        i = n("[data-mobile-collapse]")
    }

    function u() {
        n("[data-mobile-expand-button]").on("click", function () {
            i.removeClass("mob-collapsed");
            n(this).hide()
        })
    }
    var t = {},
        i;
    return t.init = function () {
        r();
        u()
    }, t
}($, Linguasorb.Utilities);
Linguasorb.UI.StickyHeaderPanel = function (n, t, i, r) {
    function s() {
        u = n("#sticky-header");
        f = u.data("language");
        e = i.getLanguageLevel(f)
    }

    function h() {
        window.onscroll = function () {
            c()
        };
        n("[data-level]").on("click", function () {
            var t = n(this).data("level");
            i.setLanguageLevel(f, t);
            e = t;
            _dcq.push(["identify", {
                tags: [t]
            }]);
            r.languageLevelSelected(f, t);
            n("#sticky-header-buttons").hide();
            n("#sticky-header-thanks").show();
            u.delay(1e3).slideUp()
        })
    }

    function c() {
        e == null && (window.pageYOffset >= 200 ? u.addClass("stickyOn") : u.removeClass("stickyOn"))
    }
    var o = {},
        f, e, u;
    return o.init = function () {
        s();
        h()
    }, o
}($, Linguasorb.Utilities, Linguasorb.Data.CookieService, Linguasorb.Data.AnalyticsService);
Linguasorb.Views.Global = function (n, t, i, r, u, f, e) {
    function h() {
        o = t.isEggBlockEnabled();
        o && !r.userHasSubscription() && n("[data-ad-block-message]").show();
        o ? ga("send", "event", "Blocking Ads", "Yes", {
            nonInteraction: 1
        }) : ga("send", "event", "Blocking Ads", "No", {
            nonInteraction: 1
        })
    }

    function c() {
        n("[data-drip-showForm]").click(function () {
            var t = n(this).attr("data-formId"),
                i = n(this).attr("data-formName");
            return _dcq.push(["showForm", {
                id: t
            }]), u.leadBoxClick(i), !1
        });
        n(document).on("submitted.drip", function () {
            var n, t;
            u.mailinglistSignup("Drip");
            n = location.pathname.split("/")[1];
            (n == "spanish" || n == "french" || n == "english") && (t = f.getLanguageLevel(n), t != null && _dcq.push(["identify", {
                tags: [t]
            }]))
        })
    }

    function l() {
        n("[data-sticky-item]").stick_in_parent()
    }

    function a() {
        n("[data-affiliate-link-name]").click(function () {
            u.affiliateLinkClick(n(this).data("affiliate-link-name"))
        })
    }
    var s = {},
        o;
    return s.init = function () {
        e.AudioButton.init();
        e.MailingListSignup.init();
        e.MobileCollapsePanel.init();
        h();
        l();
        c();
        a()
    }, s
}($, Linguasorb.Data.EggService, Linguasorb.Data.AudioService, Linguasorb.Data.SubscriptionService, Linguasorb.Data.AnalyticsService, Linguasorb.Data.CookieService, Linguasorb.UI);
Linguasorb.Views.Home = function (n, t, i) {
    function f() {
        u(t.getDefaultLanguage(), !1)
    }

    function u(r, u) {
        r != null && (n(".homeFlag").removeClass("active"), n(".homeFlag[data-lang='" + r + "']").addClass("active"), n("#hidLang").val(r), n("#txtConj").attr("placeholder", "Search " + i.StringUtilities.toTitleCase(r) + " verbs"), n("#searchForm").attr("action", "/" + r + "/search/"), u && t.setDefaultLanguage(r))
    }

    function e() {
        n("#txtConj").autocomplete({
            minLength: 2,
            source: function (t, i) {
                n.ajax({
                    url: o(t.term),
                    success: function (n) {
                        i(n)
                    },
                    error: function () {}
                })
            },
            focus: function (t, i) {
                return n("#txtConj").val(i.item.l2Display), !1
            },
            select: function (t, i) {
                location.href = s(i.item.urlSlug);
                n("#txtConj").val("Loading...")
            },
            messages: {
                noResults: "",
                results: function () {}
            }
        });
        n("#txtConj").data("ui-autocomplete")._renderItem = function (t, r) {
            var e, u, f;
            if (r) {
                e = n("#hidLang").val();
                switch (e) {
                    case "spanish":
                        return u = n("<a><\/a>"), f = n("<span class='search-main'><\/span>").text(r.l2Display), i.JQuery.highlightText(this.term, f), u.append(f), r.verbForm != "Infinitive" ? n("<br /><span class='search-meta'><\/span>").text(r.l1Search + " (" + r.l2Infinitive + " - " + r.verbForm.toLowerCase() + ")").appendTo(u) : n("<br /><span class='search-meta'><\/span>").text("to " + r.l1Search).appendTo(u), n("<li><\/li>").append(u).appendTo(t);
                    case "french":
                        return u = n("<a><\/a>"), f = n("<span class='search-main'><\/span>").text(r.l2Display), i.JQuery.highlightText(this.term, f), u.append(f), r.verbForm != "Infinitive" ? n("<br /><span class='search-meta'><\/span>").text(r.l1Search + " (" + r.l2Infinitive + " - " + r.verbForm.toLowerCase() + ")").appendTo(u) : n("<br /><span class='search-meta'><\/span>").text("to " + r.l1Search).appendTo(u), n("<li><\/li>").append(u).appendTo(t);
                    case "english":
                        return u = n("<a><\/a>"), f = n("<span class='search-main'><\/span>").text(r.l2Display), i.JQuery.highlightText(this.term, f), u.append(f), r.verbForm != "Infinitive" && n("<br /><span class='search-meta'><\/span>").text(r.l2Infinitive + " - " + r.verbForm.toLowerCase()).appendTo(u), n("<li><\/li>").append(u).appendTo(t)
                }
            }
        }
    }

    function o(t) {
        var r = n("#hidLang").val(),
            i;
        switch (r) {
            case "spanish":
                i = "/api/spanish/verb/" + t;
                break;
            case "french":
                i = "/api/french/verb/" + t;
                break;
            case "english":
                i = "/api/english/verb/" + t
        }
        return i
    }

    function s(t) {
        var r = n("#hidLang").val(),
            i;
        switch (r) {
            case "spanish":
                i = "/spanish/verbs/conjugation/" + t;
                break;
            case "french":
                i = "/french/verbs/conjugation/" + t;
                break;
            case "english":
                i = "/english/verbs/conjugation/" + t
        }
        return i
    }
    var r = {};
    return r.init = function () {
        f();
        n(document).on("click", "[data-language-select]", function () {
            u(n(this).data("lang"), !0)
        });
        e()
    }, r
}($, Linguasorb.Data.CookieService, Linguasorb.Utilities);
Linguasorb.Views.LanguageSection = function (n, t) {
    function r(t) {
        var i = "/api/" + t + "/verb/",
            r = "/" + t + "/verbs/conjugation/";
        n(".autoSearch").autocomplete({
            minLength: 2,
            source: function (t, r) {
                n.ajax({
                    url: i + t.term,
                    success: function (n) {
                        r(n)
                    }
                })
            },
            focus: function (t, i) {
                return n(".autoSearch").val(i.item.l2Display), !1
            },
            select: function (n, t) {
                location.href = r + t.item.urlSlug
            },
            create: function () {
                n(this).data("ui-autocomplete")._renderItem = function (i, r) {
                    var f = n("<a><\/a>"),
                        e = n("<span class='search-main'><\/span>").text(r.l2Display);
                    return u(this.term, e), f.append(e), t == "english" ? r.verbForm != "Infinitive" && n("<br /><span class='search-meta'><\/span>").text(r.l2Infinitive + " - " + r.verbForm.toLowerCase()).appendTo(f) : r.VerbForm != "Infinitive" ? n("<br /><span class='search-meta'><\/span>").text(r.l1Search + " (" + r.l2Infinitive + " - " + r.verbForm.toLowerCase() + ")").appendTo(f) : n("<br /><span class='search-meta'><\/span>").text("to " + r.l1Search).appendTo(f), n("<li><\/li>").append(f).appendTo(i)
                }
            }
        })
    }

    function u(t, i) {
        for (var e = n.trim(t).toLowerCase(), r = i.get(0).firstChild, o, f, u;
            (o = r.data.toLowerCase().indexOf(e)) >= 0;) f = r.splitText(o), r = f.splitText(e.length), u = document.createElement("span"), u.className = "highlight", r.parentNode.insertBefore(u, r), u.appendChild(f)
    }
    var i = {},
        f = t.JQuery.ignoreDefaultEvent;
    return i.init = function (n) {
        r(n)
    }, i
}($, Linguasorb.Utilities);
Linguasorb.Views.Payment = function (n, t) {
    function u() {
        n("#customPrice").prop("checked", !0)
    }

    function f() {
        var t = 5,
            i = n("input[name=price]:checked").val(),
            r = n("input#priceTxt").val();
        if (i == "custom") {
            if (isNaN(r)) {
                alert("Value is not a number");
                return
            }
            t = r
        } else t = i;
        t >= 1 ? (ga("send", "event", "Purchase button", "click", "CC", t), window.location.href = "/account/purchaseregistration/?p=" + t) : alert("Minimum value is $1")
    }
    var i = {},
        r = t.JQuery.ignoreDefaultEvent;
    return i.init = function () {
        n(document).on("click", "#payButton", r(f));
        n(document).on("focus", "#priceTxt", u)
    }, i
}($, Linguasorb.Utilities);
Linguasorb.Views.SpanishConjugation = function (n, t) {
    function u() {
        n("[data-positive-conjugation]").hide();
        n("[data-negative-conjugation]").show();
        n("[data-negative-button]").addClass("btn-active");
        n("[data-positive-button]").removeClass("btn-active")
    }

    function f() {
        n("[data-positive-conjugation]").show();
        n("[data-negative-conjugation]").hide();
        n("[data-positive-button]").addClass("btn-active");
        n("[data-negative-button]").removeClass("btn-active")
    }
    var i = {},
        r = t.JQuery.ignoreDefaultEvent;
    return i.init = function () {
        n(document).on("click", "[data-negative-button]", r(u));
        n(document).on("click", "[data-positive-button]", r(f));
        n("[data-tooltip").tooltip()
    }, i
}($, Linguasorb.Utilities);
Linguasorb.Views.VocabCourseWord = function (n, t) {
    function u() {
        var t = n(this).data("correct") == "True";
        n("[data-answer]").addClass("disabled");
        n("[data-answer]").attr("disabled", "disabled");
        t ? (n(this).removeClass("btn-info"), n(this).addClass("btn-success"), n("[data-result-correct]").show()) : (n(this).removeClass("btn-info"), n(this).addClass("btn-danger"), n('[data-correct="True"]').removeClass("btn-info"), n('[data-correct="True"]').addClass("btn-success"), n("[data-result-incorrect]").show())
    }
    var i = {},
        r = t.JQuery.ignoreDefaultEvent;
    return i.init = function () {
        n(document).on("click", "[data-answer]", r(u))
    }, i
}($, Linguasorb.Utilities)
