window._mfq = window._mfq || [];
window._mfq.push(['config', 'includeQueryStringInPath', true]);;
window._mfq = window._mfq || [];
(function() {
    function getParameter(variable) {
        var query = location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        return false;
    }
    var omniture_cid = getParameter('cid');
    if (omniture_cid) {
        window._mfq.push(['setVariable', 'omniture_cid', omniture_cid]);
    }
})();;
window._mfq = window._mfq || [];
(function() {
    if (window.optimizely && window.optimizely.get) {
        var optimizelyData = optimizely.get('data');
        var optimizelyState = optimizely.get('state');
        var activeExperiments = optimizelyState.getActiveExperimentIds();
        var variationMap = optimizelyState.getVariationMap();
        var variationNames = '';
        for (var i = 0; i < activeExperiments.length; i++) {
            var experimentId = activeExperiments[i];
            var variationName = variationMap[experimentId]['name'];
            var experimentName = optimizelyData.experiments[experimentId].name;
            variationNames += (variationNames != '' ? '/' : '') + experimentName + ':' + variationName;
            window._mfq.push(["tag", "Optimizely Experiment: " + experimentName]);
            window._mfq.push(["tag", "Optimizely Variation: " + variationName]);
        }
    }
})();
var mouseflowDisableKeyLogging = true;
if (typeof mouseflow === 'undefined' && typeof mouseflowPlayback === 'undefined') {
    (function() {
        var _565 = false;
        var _564 = false;
        var _442 = [{
            _21: "contains",
            _5: "/explore/",
            _233: "Content Track"
        }, {
            _21: "contains",
            _5: "/blog/",
            _233: "Blog Pages"
        }, {
            _21: "contains",
            _5: "/education/learning-centers/product/",
            _233: "Product Learning Centers"
        }, {
            _21: "contains",
            _5: "/discussion/",
            _233: "Community Discussion Thread"
        }, {
            _21: "contains",
            _5: "/forums/openforumhome",
            _233: "Community Open Forum Home"
        }];
        var _440 = [];
        var _48 = 'https://eu.mouseflow.com';
        var _561 = false;
        const _342 = window.location.search.slice(1).split('&').map(a => a.split('=', 2)).filter(a => a[0]).reduce((acc, cur) => (acc[cur[0]] = cur[1] ? ? null, acc), {});

        function _7(_146, _14) {
            _14 = (typeof _14 !== 'undefined' ? _14 : '');
            if (_3.debug) console.log('MF' + (_3.includeDebugTime ? ' - ' + _14 : '') + ': ' + _146)
        }
        var _25 = new _994(window);
        var _26 = new _971(window);
        var _11 = new _970(window, Math, JSON, _25);
        var _23 = new _880(_25, _11);
        var _54 = new _842('local', window, _11, _7);
        var _182 = new _842('session', window, _11, _7);
        var _401 = new _961(window);
        var _3 = new _1012(window, _54, _565, _564, _561);
        _3._264();
        _3._348 = [];
        _3._354 = ["#searchString"];
        _3._336 = [];
        _3._355 = [];
        _3._661 = [{
            _36: "9ab496fa-d43d-4fb8-8f54-5125cfc8016c",
            _63: "EMS-Wheel-Content",
            _35: "Mouseover",
            _8: "#cvent-paragraph-layout_content-949571 > .layout-content",
            _153: "https://www.cvent.com/en/event-management-software",
            _213: null
        }, {
            _36: "a73b57e6-26a0-4bd4-9de7-86004d4e1cd4",
            _63: "Wheel Engagement - Hover",
            _35: "Mouseover",
            _8: ".outer",
            _153: "https://www.cvent.com/en/event-management-software",
            _213: null
        }, {
            _36: "eb4bb186-df10-40ea-b610-92b72735710c",
            _63: "Wheel Engagement - Click",
            _35: "Click",
            _8: "#drift-frame-controller",
            _153: "https://www.cvent.com/en/event-management-software",
            _213: null
        }, {
            _36: "86dbc63c-b60f-44c8-b6d6-0b9132d57559",
            _63: "Homepage Wheel Hover",
            _35: "Mouseover",
            _8: "#drift-frame-controller",
            _153: "https://www.cvent.com/",
            _213: null
        }, {
            _36: "e46a7744-1119-4938-a6fe-1369eefd2f5c",
            _63: "Drift Click",
            _35: "Click",
            _8: "#drift-frame-chat",
            _153: "",
            _213: null
        }];
        _3._688 = [];
        _3._51 = '33baeca1-461c-4bfb-8e3c-0b6cda6810e3';
        _3._527 = true;
        _3._421 = true;
        _3._1072 = '10000000';
        _3._412('appUrl', _48);
        var _320 = new _914(window, _11, _3, _7);

        function _823(_2, _105, _25, _3, _26, _11, _23, _88, _325, _54, _182, _212, _492, _7, _401, _320, _124) {
            var _1091 = false;
            var _192 = 'https://eu01.rec.mouseflow.com/';
            var _262 = 50.00000;
            var _180 = [{
                _21: "notContains",
                _5: "/rfp/"
            }, {
                _21: "notContains",
                _5: "/ae/"
            }, {
                _21: "notContains",
                _5: "/uk/"
            }, {
                _21: "notContains",
                _5: "/myaccount/"
            }];
            var _1152 = [];
            var _1001 = [{
                _31: "uNWxY0VOfkibKF2HoVzwRA",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "6nQBLcvBN0-pRMkdm7Ttbw",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "5UxlV9zXtUaLxSe1yd8FAQ",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "McAXe3LWzUKReWd0jjrMdA",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "4apbUw9N-0S0jxQuiPRgZQ",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "FixViqxS_0aWc8FAnDlJBQ",
                _17: "#mkto_form"
            }, {
                _31: "WooT-F9o4k-UcXx0vd3_Ag",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "n6pyAlZpkkKlGuxBiy9dqA",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "xe-4HjfI5UWXos36zSGFcA",
                _17: "#mkto_form"
            }, {
                _31: "-bX447sNOkqSAltV69-kpA",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "SPdycq8Z-0mVlxnhtJNvaQ",
                _17: "#mkto_form"
            }, {
                _31: "TgT8tdlF20eDJPhOgoQSEA",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "MGDomAbsqkS9gcx7onRZBA",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "MQMNgEv7dk6avNKfMGGcmw",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "9kHUx4vnQ0mqzHHTh2-Gew",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "G1AyZ9NWLkqV3FsTv8mdTw",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "o1gEKXiYiEym4VG_oG4Kpg",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "0rCATYfp-USQARSqbBmoew",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "yvjgysq2qUK5tsUE1VvZuA",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "7PliGCN6Rk6iF6YUi-eAWA",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "PWR41V94b0OkyVow7ymMGw",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "4BcbaiZG00-JVvfXT1bU3g",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "n34PAfgg2EmWYmPI0QKb3A",
                _17: "#cvent_mrkto_form"
            }, {
                _31: "zfVi5Ik5AEes0CgF8k-scw",
                _17: "#cvent_mrkto_form"
            }];
            var _281 = ["cvent.com"];
            var _744 = false;
            var _1036 = false;
            var _1052 = '2025-05-03T07:10:11.3649672Z';
            var _210 = '18.29';
            var _185 = false;
            var _746 = false;
            var _97 = false;
            var _269 = false;
            var _456 = false;
            var _840 = /\[(\d+)\]_mf$/;
            var _13 = _2.document;
            var _70 = _2.location;
            var _15 = _984();
            var _0 = _623();
            var _414 = _11._457(_3);
            var _76 = {
                _629: 100,
                _1149: 250,
                _1151: 10000,
                _673: 1336,
                _460: 1800000,
                _1082: 3600000,
                _1117: 100,
                _1086: 2000,
                _831: 8000,
                _592: 100000,
                _776: 2048,
                _1005: 200,
                _1006: 5000
            };
            var _488, _506, _507, _303, _340, _295, _568, _358, _121, _647 = [],
                _648 = [],
                _573 = [],
                _513 = [],
                _646 = [],
                _346 = new Map(),
                _255 = new Map();
            var _9 = {
                _374: 0,
                _378: 1,
                _377: 2,
                _415: 3,
                _420: 4,
                _256: 5,
                _251: 6,
                _356: 7,
                _465: 8,
                _357: 9,
                _285: 10,
                _601: 11,
                _655: 12,
                _417: 13,
                _748: 14,
                _71: 15,
                _1221: 16,
                _1215: 17,
                _63: 18,
                _452: 19,
                _936: 20,
                _471: 21,
                _446: 22,
                _376: 23,
                _424: 24,
                _426: 25,
                _431: 26,
                _430: 27,
                _434: 28,
                _599: 29,
                _556: 30,
                _575: 31,
                _546: 32,
                _381: 33,
                _669: 34,
                _246: 35,
                _572: 36,
                _576: 37,
                _42: 38,
                _479: 39,
                _1014: 40,
                _283: 41,
                _73: 42,
                _1211: 43,
                _587: 44,
                _266: 45
            };
            var _92 = {
                _686: {
                    _22: 'bounce',
                    _5: 2,
                    _36: 1,
                    _140: 1000
                },
                _370: {
                    _22: 'click-rage',
                    _5: 5,
                    _36: 2,
                    _140: 2000
                },
                _707: {
                    _22: 'click-error',
                    _5: 2,
                    _36: 3,
                    _140: 20
                },
                _656: {
                    _22: 'speed-browsing',
                    _5: 1,
                    _36: 6,
                    _140: 1000
                },
                _246: {
                    _22: 'submit-failure',
                    _5: 3,
                    _36: 7,
                    _140: 20
                },
                _428: {
                    _22: '404',
                    _5: 5,
                    _36: 8,
                    _140: 20
                },
                _351: {
                    _22: 'dead-click',
                    _5: 1,
                    _36: 9,
                    _140: 1000
                }
            };
            var _583 = /[\x20\r\n]+/g;
            var _912 = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@/;
            var _907 = /^\d{12,19}$/;
            var _925 = /^(onbeforeunload|onblur|onchange|onclick|onfocus|oninput|onkeydown|onkeypress|onkeyup|onload|onmousedown|onmouseenter|onmouseleave|onmousemove|onmouseout|onmouseover|onmouseup|onresize|onsubmit|ontouchcancel|ontouchend|ontouchenter|ontouchleave|ontouchmove|ontouchstart|onunload)$/;
            var _904 = /checkbox|radio|button|submit|file|image|reset/;
            var _909 = [{
                name: 'VISA',
                patternRegex: /^4(\d{15}|\d{17,18})$/
            }, {
                name: 'Mastercard',
                patternRegex: /^(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720|5[1-5]\d\d)\d{12}$/
            }, {
                name: 'American Express',
                patternRegex: /^3[47]\d{13}$/
            }, {
                name: 'Diners Club',
                patternRegex: /^3(0[0-5]|[689]\d)(\d{11}|\d{13}|\d{16})$/
            }, {
                name: 'Discover',
                patternRegex: /^(6011|64[456789]\d|65\d{2})(\d{12}|\d{15})$/
            }, {
                name: 'JCB',
                patternRegex: /^(352[89]|35[3-8]\d|2131|1800)\d{12,15}$/
            }, {
                name: 'China UnionPay',
                patternRegex: /^(62[03456]\d{3}]|6210\d\d|621[1-7]\d\d|6218[0-2]\d|6218[4-9]\d|6219[0-7]\d|6220[0-579]\d|62201\d|6220[2-9]\d|622[1-9]\d{2}|622018|627[026]\d\d|62770\d|6277[1-7]\d|62778[1-9]|62779\d|628[2-9]\d\d|629[12]\d\d|810\d\d\d|811\d\d\d|81[2-6]\d\d\d|817[01]\d\d)\d{8,13}$/
            }, {
                name: 'Maestro',
                patternRegex: /^((493698|50000\d|5000[1-9]\d|500[1-9]\d{2}|50[1-3]\d{3}|5040\d{2}|5041[0-6]\d|50417[0-4]|50417[6-9]|5041[89]\d|504[2-9]\d{2}|505\d{3}|506[0-5]\d{2}|5066[0-8]\d|50669[0-8]|506779|5067[89]\d|506[89]\d{2}|50[78]\d{3})\d{6,13}|(5[6-9]|63|67|6\d)\d{10,17})$/
            }, {
                name: 'Elo',
                patternRegex: /^(40117[89]|438935|457631|457632|431274|451416|457393|504175|506699|5067[0-6]\d|50677[0-8]|50900\d|5090[1-9]\d|509[1-9]\d{2}|627780|636297|636368|65003[1-3]|65003[5-9]|65004\d|65005[01]|65040[5-9]|6504[1-3]\d|65048[5-9]|65049\d|6505[0-2]\d|65053[0-8]|65054[1-9]|6505[5-8]\d|65059[0-8]|65070\d|65071[0-8]|65072[0-7]|65090[1-9]|6509[1-6]\d|65097[0-8]|65165[2-9]|6516[67]\d|65500\d|65501\d|65502[1-9]|6550[34]\d|65505[0-8])\d{10}$/
            }, {
                name: 'Hiper',
                patternRegex: /^(637095|63737423|63743358|637568|637599|637609|637612)\d{10}$/
            }, {
                name: 'Hipercard',
                patternRegex: /^(606282)\d{10}$/
            }, {
                name: 'Dankort',
                patternRegex: /^5019\d{12}$/
            }, {
                name: 'VISA Dankort',
                patternRegex: /^4571\d{12}$/
            }];
            const _615 = _1017();
            const _294 = new WeakMap();
            const _290 = 'mf-dead-click';
            let _499 = false;
            var _908 = (function(_943) {
                return function(_569) {
                    var _598 = _569.length,
                        _597 = 1,
                        _496 = 0,
                        _197;
                    while (_598) {
                        _197 = parseInt(_569.charAt(--_598), 10);
                        _597 ^= 1;
                        _496 += _597 ? _943[_197] : _197
                    }
                    return _496 && _496 % 10 === 0
                }
            }([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));
            // Copyright 2011 Google Inc.
            //
            // Licensed under the Apache License, Version 2.0 (the "License");
            // you may not use this file except in compliance with the License.
            // You may obtain a copy of the License at
            //
            //     http://www.apache.org/licenses/LICENSE-2.0
            //
            // Unless required by applicable law or agreed to in writing, software
            // distributed under the License is distributed on an "AS IS" BASIS,
            // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
            // See the License for the specific language governing permissions and
            // limitations under the License.
            //
            // This component contains modifications carried out by Mouseflow ApS.
            var __extends = this.__extends || function(d, b) {
                for (var p in b)
                    if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];

                function __() {
                    this.constructor = d
                }
                __.prototype = b.prototype;
                d.prototype = new __()
            };
            var MutationObserverCtor;
            if (typeof WebKitMutationObserver !== 'undefined') MutationObserverCtor = WebKitMutationObserver;
            else if (typeof MutationObserver !== 'undefined') MutationObserverCtor = MutationObserver;
            if (MutationObserverCtor === undefined) {
                _7('DOM Mutation Observers not supported.', _14())
            }
            var NodeMap = (function() {
                function NodeMap() {
                    this.nodes = [];
                    this.values = []
                }
                NodeMap.prototype.isIndex = function(s) {
                    return +s === s >>> 0
                };
                NodeMap.prototype.nodeId = function(node) {
                    var id = node[NodeMap.ID_PROP];
                    if (!id) id = node[NodeMap.ID_PROP] = NodeMap.nextId_++;
                    return id
                };
                NodeMap.prototype.set = function(node, value) {
                    var id = this.nodeId(node);
                    this.nodes[id] = node;
                    this.values[id] = value
                };
                NodeMap.prototype.get = function(node) {
                    var id = this.nodeId(node);
                    return this.values[id]
                };
                NodeMap.prototype.has = function(node) {
                    return this.nodeId(node) in this.nodes
                };
                NodeMap.prototype.deleteNode = function(node) {
                    var id = this.nodeId(node);
                    delete this.nodes[id];
                    this.values[id] = undefined
                };
                NodeMap.prototype.keys = function() {
                    var nodes = [];
                    for (var id in this.nodes) {
                        if (!this.isIndex(id)) continue;
                        nodes.push(this.nodes[id])
                    }
                    return nodes
                };
                NodeMap.ID_PROP = '__mouseflow_node_map_id__';
                NodeMap.nextId_ = 1;
                return NodeMap
            })();
            var Movement;
            (function(Movement) {
                Movement[Movement['STAYED_OUT'] = 0] = 'STAYED_OUT';
                Movement[Movement['ENTERED'] = 1] = 'ENTERED';
                Movement[Movement['STAYED_IN'] = 2] = 'STAYED_IN';
                Movement[Movement['REPARENTED'] = 3] = 'REPARENTED';
                Movement[Movement['REORDERED'] = 4] = 'REORDERED';
                Movement[Movement['EXITED'] = 5] = 'EXITED'
            })(Movement || (Movement = {}));

            function enteredOrExited(changeType) {
                return changeType === Movement.ENTERED || changeType === Movement.EXITED
            }
            var NodeChange = (function() {
                function NodeChange(node, childList, attributes, characterData, oldParentNode, added, attributeOldValues, characterDataOldValue) {
                    if (childList === void 0) {
                        childList = false
                    }
                    if (attributes === void 0) {
                        attributes = false
                    }
                    if (characterData === void 0) {
                        characterData = false
                    }
                    if (oldParentNode === void 0) {
                        oldParentNode = null
                    }
                    if (added === void 0) {
                        added = false
                    }
                    if (attributeOldValues === void 0) {
                        attributeOldValues = null
                    }
                    if (characterDataOldValue === void 0) {
                        characterDataOldValue = null
                    }
                    this.node = node;
                    this.childList = childList;
                    this.attributes = attributes;
                    this.characterData = characterData;
                    this.oldParentNode = oldParentNode;
                    this.added = added;
                    this.attributeOldValues = attributeOldValues;
                    this.characterDataOldValue = characterDataOldValue;
                    this.isCaseInsensitive = this.node.nodeType === 1 && this.node instanceof HTMLElement && typeof(HTMLDocument) !== 'undefined' && this.node.ownerDocument instanceof HTMLDocument
                }
                NodeChange.prototype.getAttributeOldValue = function(name) {
                    if (!this.attributeOldValues) return undefined;
                    if (this.isCaseInsensitive) name = name.toLowerCase();
                    return this.attributeOldValues[name]
                };
                NodeChange.prototype.getAttributeNamesMutated = function() {
                    var names = [];
                    if (!this.attributeOldValues) return names;
                    for (var name in this.attributeOldValues) {
                        names.push(name)
                    }
                    return names
                };
                NodeChange.prototype.attributeMutated = function(name, oldValue) {
                    this.attributes = true;
                    this.attributeOldValues = this.attributeOldValues || {};
                    if (name in this.attributeOldValues) return;
                    this.attributeOldValues[name] = oldValue
                };
                NodeChange.prototype.characterDataMutated = function(oldValue) {
                    if (this.characterData) return;
                    this.characterData = true;
                    this.characterDataOldValue = oldValue
                };
                NodeChange.prototype.removedFromParent = function(parent) {
                    this.childList = true;
                    if (this.added || this.oldParentNode) this.added = false;
                    else this.oldParentNode = parent
                };
                NodeChange.prototype.insertedIntoParent = function() {
                    this.childList = true;
                    this.added = true
                };
                NodeChange.prototype.getOldParent = function() {
                    if (this.childList) {
                        if (this.oldParentNode) return this.oldParentNode;
                        if (this.added) return null
                    }
                    return _25._87(this.node)
                };
                return NodeChange
            })();
            var ChildListChange = (function() {
                function ChildListChange() {
                    this.added = new NodeMap();
                    this.removed = new NodeMap();
                    this.maybeMoved = new NodeMap();
                    this.oldPrevious = new NodeMap();
                    this.moved = undefined
                }
                return ChildListChange
            })();
            var TreeChanges = (function(_588) {
                __extends(TreeChanges, _588);

                function TreeChanges(rootNode, mutations) {
                    _588.call(this);
                    this.rootNode = rootNode;
                    this.reachableCache = undefined;
                    this.wasReachableCache = undefined;
                    this.anyParentsChanged = false;
                    this.anyAttributesChanged = false;
                    this.anyCharacterDataChanged = false;
                    for (var m = 0; m < mutations.length; m++) {
                        var mutation = mutations[m];
                        switch (mutation.type) {
                            case 'childList':
                                this.anyParentsChanged = true;
                                for (let i = 0; i < mutation.removedNodes.length; i++) {
                                    let node = mutation.removedNodes[i];
                                    this.getChange(node).removedFromParent(mutation.target)
                                }
                                for (let i = 0; i < mutation.addedNodes.length; i++) {
                                    let node = mutation.addedNodes[i];
                                    this.getChange(node).insertedIntoParent()
                                }
                                break;
                            case 'attributes':
                                this.anyAttributesChanged = true;
                                this.getChange(mutation.target).attributeMutated(mutation.attributeName, mutation.oldValue);
                                break;
                            case 'characterData':
                                this.anyCharacterDataChanged = true;
                                this.getChange(mutation.target).characterDataMutated(mutation.oldValue);
                                break
                        }
                    }
                }
                TreeChanges.prototype.getChange = function(node) {
                    var change = this.get(node);
                    if (!change) {
                        change = new NodeChange(node);
                        this.set(node, change)
                    }
                    return change
                };
                TreeChanges.prototype.getOldParent = function(node) {
                    var change = this.get(node);
                    return change ? change.getOldParent() : _25._87(node)
                };
                TreeChanges.prototype.getIsReachable = function(node) {
                    if (node === this.rootNode) return true;
                    if (!node) return false;
                    this.reachableCache = this.reachableCache || new NodeMap();
                    var isReachable = this.reachableCache.get(node);
                    if (isReachable === undefined) {
                        isReachable = this.getIsReachable(_25._87(node));
                        this.reachableCache.set(node, isReachable)
                    }
                    return isReachable
                };
                TreeChanges.prototype.getWasReachable = function(node) {
                    if (node === this.rootNode) return true;
                    if (!node) return false;
                    this.wasReachableCache = this.wasReachableCache || new NodeMap();
                    var wasReachable = this.wasReachableCache.get(node);
                    if (wasReachable === undefined) {
                        wasReachable = this.getWasReachable(this.getOldParent(node));
                        this.wasReachableCache.set(node, wasReachable)
                    }
                    return wasReachable
                };
                TreeChanges.prototype.reachabilityChange = function(node) {
                    if (this.getIsReachable(node)) {
                        return this.getWasReachable(node) ? Movement.STAYED_IN : Movement.ENTERED
                    }
                    return this.getWasReachable(node) ? Movement.EXITED : Movement.STAYED_OUT
                };
                return TreeChanges
            })(NodeMap);
            var MutationProjection = (function() {
                function MutationProjection(rootNode, mutations, selectors, calcReordered, calcOldPreviousSibling) {
                    this.rootNode = rootNode;
                    this.mutations = mutations;
                    this.selectors = selectors;
                    this.calcReordered = calcReordered;
                    this.calcOldPreviousSibling = calcOldPreviousSibling;
                    this.treeChanges = new TreeChanges(rootNode, mutations);
                    this.entered = [];
                    this.exited = [];
                    this.stayedIn = new NodeMap();
                    this.visited = new NodeMap();
                    this.childListChangeMap = undefined;
                    this.characterDataOnly = undefined;
                    this.matchCache = undefined;
                    this.processMutations()
                }
                MutationProjection.prototype.processMutations = function() {
                    if (!this.treeChanges.anyParentsChanged && !this.treeChanges.anyAttributesChanged) return;
                    var changedNodes = this.treeChanges.keys();
                    for (var i = 0; i < changedNodes.length; i++) {
                        this.visitNode(changedNodes[i], undefined)
                    }
                };
                MutationProjection.prototype.visitNode = function(node, parentReachable) {
                    if (this.visited.has(node)) return;
                    this.visited.set(node, true);
                    var change = this.treeChanges.get(node);
                    var reachable = parentReachable;
                    if ((change && change.childList) || reachable == undefined) reachable = this.treeChanges.reachabilityChange(node);
                    if (reachable === Movement.STAYED_OUT) return;
                    this.matchabilityChange(node);
                    if (reachable === Movement.ENTERED) {
                        this.entered.push(node)
                    } else if (reachable === Movement.EXITED) {
                        this.exited.push(node);
                        this.ensureHasOldPreviousSiblingIfNeeded(node)
                    } else if (reachable === Movement.STAYED_IN) {
                        var movement = Movement.STAYED_IN;
                        if (change && change.childList) {
                            if (change.oldParentNode !== _25._87(node)) {
                                movement = Movement.REPARENTED;
                                this.ensureHasOldPreviousSiblingIfNeeded(node)
                            } else if (this.calcReordered && this.wasReordered(node)) {
                                movement = Movement.REORDERED
                            }
                        }
                        this.stayedIn.set(node, movement)
                    }
                    if (reachable === Movement.STAYED_IN) return;
                    for (var child = _25._177(node); child; child = _25._171(child)) {
                        this.visitNode(child, reachable)
                    }
                };
                MutationProjection.prototype.ensureHasOldPreviousSiblingIfNeeded = function(node) {
                    if (!this.calcOldPreviousSibling) return;
                    this.processChildlistChanges();
                    var parentNode = _25._87(node);
                    var nodeChange = this.treeChanges.get(node);
                    if (nodeChange && nodeChange.oldParentNode) parentNode = nodeChange.oldParentNode;
                    var change = this.childListChangeMap.get(parentNode);
                    if (!change) {
                        change = new ChildListChange();
                        this.childListChangeMap.set(parentNode, change)
                    }
                    if (!change.oldPrevious.has(node)) {
                        change.oldPrevious.set(node, node.previousSibling)
                    }
                };
                MutationProjection.prototype.getChanged = function(summary, selectors, characterDataOnly) {
                    this.selectors = selectors;
                    this.characterDataOnly = characterDataOnly;
                    for (let i = 0; i < this.entered.length; i++) {
                        let node = this.entered[i];
                        let matchable = this.matchabilityChange(node);
                        if (matchable === Movement.ENTERED || matchable === Movement.STAYED_IN) summary.added.push(node)
                    }
                    var stayedInNodes = this.stayedIn.keys();
                    for (let i = 0; i < stayedInNodes.length; i++) {
                        let node = stayedInNodes[i];
                        let matchable = this.matchabilityChange(node);
                        if (matchable === Movement.ENTERED) {
                            summary.added.push(node)
                        } else if (matchable === Movement.EXITED) {
                            summary.removed.push(node)
                        } else if (matchable === Movement.STAYED_IN && (summary.reparented || summary.reordered)) {
                            var movement = this.stayedIn.get(node);
                            if (summary.reparented && movement === Movement.REPARENTED) summary.reparented.push(node);
                            else if (summary.reordered && movement === Movement.REORDERED) summary.reordered.push(node)
                        }
                    }
                    for (var i = 0; i < this.exited.length; i++) {
                        var node = this.exited[i];
                        var matchable = this.matchabilityChange(node);
                        if (matchable === Movement.EXITED || matchable === Movement.STAYED_IN) summary.removed.push(node)
                    }
                };
                MutationProjection.prototype.getOldParentNode = function(node) {
                    var change = this.treeChanges.get(node);
                    if (change && change.childList) return change.oldParentNode ? change.oldParentNode : null;
                    var reachabilityChange = this.treeChanges.reachabilityChange(node);
                    if (reachabilityChange === Movement.STAYED_OUT || reachabilityChange === Movement.ENTERED) throw Error('getOldParentNode requested on invalid node.');
                    return _25._87(node)
                };
                MutationProjection.prototype.getOldPreviousSibling = function(node) {
                    var parentNode = _25._87(node);
                    var nodeChange = this.treeChanges.get(node);
                    if (nodeChange && nodeChange.oldParentNode) parentNode = nodeChange.oldParentNode;
                    var change = this.childListChangeMap.get(parentNode);
                    if (!change) throw Error('getOldPreviousSibling requested on invalid node.');
                    return change.oldPrevious.get(node)
                };
                MutationProjection.prototype.getOldAttribute = function(element, attrName) {
                    var change = this.treeChanges.get(element);
                    if (!change || !change.attributes) throw Error('getOldAttribute requested on invalid node.');
                    var value = change.getAttributeOldValue(attrName);
                    if (value === undefined) throw Error('getOldAttribute requested for unchanged attribute name.');
                    return value
                };
                MutationProjection.prototype.attributeChangedNodes = function(includeAttributes) {
                    if (!this.treeChanges.anyAttributesChanged) return {};
                    var attributeFilter;
                    var caseInsensitiveFilter;
                    if (includeAttributes) {
                        attributeFilter = {};
                        caseInsensitiveFilter = {};
                        for (let i = 0; i < includeAttributes.length; i++) {
                            let attrName = includeAttributes[i];
                            attributeFilter[attrName] = true;
                            caseInsensitiveFilter[attrName.toLowerCase()] = attrName
                        }
                    }
                    var result = {};
                    var nodes = this.treeChanges.keys();
                    for (let i = 0; i < nodes.length; i++) {
                        var node = nodes[i];
                        var change = this.treeChanges.get(node);
                        if (!change.attributes) continue;
                        if (Movement.STAYED_IN !== this.treeChanges.reachabilityChange(node) || Movement.STAYED_IN !== this.matchabilityChange(node)) {
                            continue
                        }
                        var element = node;
                        var changedAttrNames = change.getAttributeNamesMutated();
                        for (var j = 0; j < changedAttrNames.length; j++) {
                            let attrName = changedAttrNames[j];
                            if (attributeFilter && !attributeFilter[attrName] && !(change.isCaseInsensitive && caseInsensitiveFilter[attrName])) {
                                continue
                            }
                            var oldValue = change.getAttributeOldValue(attrName);
                            if (oldValue === element.getAttribute(attrName)) continue;
                            if (caseInsensitiveFilter && change.isCaseInsensitive) attrName = caseInsensitiveFilter[attrName];
                            result[attrName] = result[attrName] || [];
                            result[attrName].push(element)
                        }
                    }
                    return result
                };
                MutationProjection.prototype.getOldCharacterData = function(node) {
                    var change = this.treeChanges.get(node);
                    if (!change || !change.characterData) throw Error('getOldCharacterData requested on invalid node.');
                    return change.characterDataOldValue
                };
                MutationProjection.prototype.getCharacterDataChanged = function() {
                    if (!this.treeChanges.anyCharacterDataChanged) return [];
                    var nodes = this.treeChanges.keys();
                    var result = [];
                    for (var i = 0; i < nodes.length; i++) {
                        var target = nodes[i];
                        if (Movement.STAYED_IN !== this.treeChanges.reachabilityChange(target)) continue;
                        var change = this.treeChanges.get(target);
                        if (!change.characterData || target.textContent == change.characterDataOldValue) continue;
                        result.push(target)
                    }
                    return result
                };
                MutationProjection.prototype.computeMatchabilityChange = function(selector, el) {
                    if (!this.matchCache) this.matchCache = [];
                    if (!this.matchCache[selector.uid]) this.matchCache[selector.uid] = new NodeMap();
                    var cache = this.matchCache[selector.uid];
                    var result = cache.get(el);
                    if (result === undefined) {
                        result = selector.matchabilityChange(el, this.treeChanges.get(el));
                        cache.set(el, result)
                    }
                    return result
                };
                MutationProjection.prototype.matchabilityChange = function(node) {
                    var _44 = this;
                    if (this.characterDataOnly) {
                        switch (node.nodeType) {
                            case 8:
                            case 3:
                                return Movement.STAYED_IN;
                            default:
                                return Movement.STAYED_OUT
                        }
                    }
                    if (!this.selectors) return Movement.STAYED_IN;
                    if (node.nodeType !== 1) return Movement.STAYED_OUT;
                    var el = node;
                    var matchChanges = this.selectors.map(function(selector) {
                        return _44.computeMatchabilityChange(selector, el)
                    });
                    var accum = Movement.STAYED_OUT;
                    var i = 0;
                    while (accum !== Movement.STAYED_IN && i < matchChanges.length) {
                        switch (matchChanges[i]) {
                            case Movement.STAYED_IN:
                                accum = Movement.STAYED_IN;
                                break;
                            case Movement.ENTERED:
                                if (accum === Movement.EXITED) accum = Movement.STAYED_IN;
                                else accum = Movement.ENTERED;
                                break;
                            case Movement.EXITED:
                                if (accum === Movement.ENTERED) accum = Movement.STAYED_IN;
                                else accum = Movement.EXITED;
                                break
                        }
                        i++
                    }
                    return accum
                };
                MutationProjection.prototype.getChildlistChange = function(el) {
                    var change = this.childListChangeMap.get(el);
                    if (!change) {
                        change = new ChildListChange();
                        this.childListChangeMap.set(el, change)
                    }
                    return change
                };
                MutationProjection.prototype.processChildlistChanges = function() {
                    if (this.childListChangeMap) return;
                    this.childListChangeMap = new NodeMap();
                    for (var i = 0; i < this.mutations.length; i++) {
                        var mutation = this.mutations[i];
                        if (mutation.type != 'childList') continue;
                        if (this.treeChanges.reachabilityChange(mutation.target) !== Movement.STAYED_IN && !this.calcOldPreviousSibling) continue;
                        var change = this.getChildlistChange(mutation.target);
                        var oldPrevious = mutation.previousSibling;
                        for (let j = 0; j < mutation.removedNodes.length; j++) {
                            let node = mutation.removedNodes[j];
                            recordOldPrevious(node, oldPrevious, change);
                            if (change.added.has(node)) {
                                change.added.deleteNode(node)
                            } else {
                                change.removed.set(node, true);
                                change.maybeMoved.deleteNode(node)
                            }
                            oldPrevious = node
                        }
                        recordOldPrevious(mutation.nextSibling, oldPrevious, change);
                        for (let j = 0; j < mutation.addedNodes.length; j++) {
                            let node = mutation.addedNodes[j];
                            if (change.removed.has(node)) {
                                change.removed.deleteNode(node);
                                change.maybeMoved.set(node, true)
                            } else {
                                change.added.set(node, true)
                            }
                        }
                    }
                };
                MutationProjection.prototype.wasReordered = function(node) {
                    if (!this.treeChanges.anyParentsChanged) return false;
                    this.processChildlistChanges();
                    var parentNode = _25._87(node);
                    var nodeChange = this.treeChanges.get(node);
                    if (nodeChange && nodeChange.oldParentNode) parentNode = nodeChange.oldParentNode;
                    var change = this.childListChangeMap.get(parentNode);
                    if (!change) return false;
                    if (change.moved) return change.moved.get(node);
                    change.moved = new NodeMap();
                    var pendingMoveDecision = new NodeMap();

                    function isMoved(node) {
                        if (!node) return false;
                        if (!change.maybeMoved.has(node)) return false;
                        var didMove = change.moved.get(node);
                        if (didMove !== undefined) return didMove;
                        if (pendingMoveDecision.has(node)) {
                            didMove = true
                        } else {
                            pendingMoveDecision.set(node, true);
                            didMove = getPrevious(node) !== getOldPrevious(node)
                        }
                        if (pendingMoveDecision.has(node)) {
                            pendingMoveDecision.deleteNode(node);
                            change.moved.set(node, didMove)
                        } else {
                            didMove = change.moved.get(node)
                        }
                        return didMove
                    }
                    var oldPreviousCache = new NodeMap();

                    function getOldPrevious(node) {
                        var oldPrevious = oldPreviousCache.get(node);
                        if (oldPrevious !== undefined) return oldPrevious;
                        oldPrevious = change.oldPrevious.get(node);
                        while (oldPrevious && (change.removed.has(oldPrevious) || isMoved(oldPrevious))) {
                            oldPrevious = getOldPrevious(oldPrevious)
                        }
                        if (oldPrevious === undefined) oldPrevious = node.previousSibling;
                        oldPreviousCache.set(node, oldPrevious);
                        return oldPrevious
                    }
                    var previousCache = new NodeMap();

                    function getPrevious(node) {
                        if (previousCache.has(node)) return previousCache.get(node);
                        var previous = node.previousSibling;
                        while (previous && (change.added.has(previous) || isMoved(previous))) previous = previous.previousSibling;
                        previousCache.set(node, previous);
                        return previous
                    }
                    change.maybeMoved.keys().forEach(isMoved);
                    return change.moved.get(node)
                };
                return MutationProjection
            })();

            function recordOldPrevious(node, previous, change) {
                if (!node || change.oldPrevious.has(node) || change.added.has(node) || change.maybeMoved.has(node)) return;
                if (previous && (change.added.has(previous) || change.maybeMoved.has(previous))) return;
                change.oldPrevious.set(node, previous)
            }
            var Summary = (function() {
                function Summary(projection, query) {
                    var _44 = this;
                    this.projection = projection;
                    this.added = [];
                    this.removed = [];
                    this.reparented = query.all || query.element || query.characterData ? [] : undefined;
                    this.reordered = query.all ? [] : undefined;
                    projection.getChanged(this, query.elementFilter, query.characterData);
                    if (query.all || query.attribute || query.attributeList) {
                        var filter = query.attribute ? [query.attribute] : query.attributeList;
                        var attributeChanged = projection.attributeChangedNodes(filter);
                        if (query.attribute) {
                            this.valueChanged = attributeChanged[query.attribute] || []
                        } else {
                            this.attributeChanged = attributeChanged;
                            if (query.attributeList) {
                                query.attributeList.forEach(function(attrName) {
                                    if (Object.prototype.hasOwnProperty.call(!_44.attributeChanged, attrName)) _44.attributeChanged[attrName] = []
                                })
                            }
                        }
                    }
                    if (query.all || query.characterData) {
                        var characterDataChanged = projection.getCharacterDataChanged();
                        if (query.characterData) this.valueChanged = characterDataChanged;
                        else this.characterDataChanged = characterDataChanged
                    }
                    if (this.reordered) this.getOldPreviousSibling = projection.getOldPreviousSibling.bind(projection)
                }
                Summary.prototype.getOldParentNode = function(node) {
                    return this.projection.getOldParentNode(node)
                };
                Summary.prototype.getOldAttribute = function(node, name) {
                    return this.projection.getOldAttribute(node, name)
                };
                Summary.prototype.getOldCharacterData = function(node) {
                    return this.projection.getOldCharacterData(node)
                };
                Summary.prototype.getOldPreviousSibling = function(node) {
                    return this.projection.getOldPreviousSibling(node)
                };
                return Summary
            })();
            var validNameInitialChar = /[a-zA-Z_]+/;
            var validNameNonInitialChar = /[a-zA-Z0-9_-]+/;

            function escapeQuotes(value) {
                return '"' + value.replace(/"/g, '\\"') + '"'
            }
            var Qualifier = (function() {
                function Qualifier() {}
                Qualifier.prototype.matches = function(oldValue) {
                    if (oldValue === null) return false;
                    if (this.attrValue === undefined) return true;
                    if (!this.contains) return this.attrValue == oldValue;
                    var tokens = oldValue.split(' ');
                    for (var i = 0; i < tokens.length; i++) {
                        if (this.attrValue === tokens[i]) return true
                    }
                    return false
                };
                Qualifier.prototype.toString = function() {
                    if (this.attrName === 'class' && this.contains) return '.' + this.attrValue;
                    if (this.attrName === 'id' && !this.contains) return '#' + this.attrValue;
                    if (this.contains) return '[' + this.attrName + '~=' + escapeQuotes(this.attrValue) + ']';
                    if ('attrValue' in this) return '[' + this.attrName + '=' + escapeQuotes(this.attrValue) + ']';
                    return '[' + this.attrName + ']'
                };
                return Qualifier
            })();
            var Selector = (function() {
                function Selector() {
                    this.uid = Selector.nextUid++;
                    this.qualifiers = []
                }
                try {
                    Object.defineProperty(Selector.prototype, 'caseInsensitiveTagName', {
                        get: function() {
                            return this.tagName.toUpperCase()
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Selector.prototype, 'selectorString', {
                        get: function() {
                            return this.tagName + this.qualifiers.join('')
                        },
                        enumerable: true,
                        configurable: true
                    })
                } catch (e) {}
                Selector.prototype.isMatching = function(el) {
                    return el[Selector.matchesSelector](this.selectorString)
                };
                Selector.prototype.wasMatching = function(el, change, isMatching) {
                    if (!change || !change.attributes) return isMatching;
                    var tagName = change.isCaseInsensitive ? this.caseInsensitiveTagName : this.tagName;
                    if (tagName !== '*' && tagName !== el.tagName) return false;
                    var attributeOldValues = [];
                    var anyChanged = false;
                    for (let i = 0; i < this.qualifiers.length; i++) {
                        let qualifier = this.qualifiers[i];
                        let oldValue = change.getAttributeOldValue(qualifier.attrName);
                        attributeOldValues.push(oldValue);
                        anyChanged = anyChanged || (oldValue !== undefined)
                    }
                    if (!anyChanged) return isMatching;
                    for (let i = 0; i < this.qualifiers.length; i++) {
                        let qualifier = this.qualifiers[i];
                        let oldValue = attributeOldValues[i];
                        if (oldValue === undefined) oldValue = el.getAttribute(qualifier.attrName);
                        if (!qualifier.matches(oldValue)) return false
                    }
                    return true
                };
                Selector.prototype.matchabilityChange = function(el, change) {
                    var isMatching = this.isMatching(el);
                    if (isMatching) return this.wasMatching(el, change, isMatching) ? Movement.STAYED_IN : Movement.ENTERED;
                    else return this.wasMatching(el, change, isMatching) ? Movement.EXITED : Movement.STAYED_OUT
                };
                Selector.parseSelectors = function(input) {
                    var selectors = [];
                    var currentSelector;
                    var currentQualifier;

                    function newSelector() {
                        if (currentSelector) {
                            if (currentQualifier) {
                                currentSelector.qualifiers.push(currentQualifier);
                                currentQualifier = undefined
                            }
                            selectors.push(currentSelector)
                        }
                        currentSelector = new Selector()
                    }

                    function newQualifier() {
                        if (currentQualifier) currentSelector.qualifiers.push(currentQualifier);
                        currentQualifier = new Qualifier()
                    }
                    var WHITESPACE = /\s/;
                    var valueQuoteChar;
                    var SYNTAX_ERROR = 'Invalid or unsupported selector syntax.';
                    var SELECTOR = 1;
                    var TAG_NAME = 2;
                    var QUALIFIER = 3;
                    var QUALIFIER_NAME_FIRST_CHAR = 4;
                    var QUALIFIER_NAME = 5;
                    var ATTR_NAME_FIRST_CHAR = 6;
                    var ATTR_NAME = 7;
                    var EQUIV_OR_ATTR_QUAL_END = 8;
                    var EQUAL = 9;
                    var ATTR_QUAL_END = 10;
                    var VALUE_FIRST_CHAR = 11;
                    var VALUE = 12;
                    var QUOTED_VALUE = 13;
                    var SELECTOR_SEPARATOR = 14;
                    var state = SELECTOR;
                    var i = 0;
                    while (i < input.length) {
                        var c = input[i++];
                        switch (state) {
                            case SELECTOR:
                                if (c.match(validNameInitialChar)) {
                                    newSelector();
                                    currentSelector.tagName = c;
                                    state = TAG_NAME;
                                    break
                                }
                                if (c == '*') {
                                    newSelector();
                                    currentSelector.tagName = '*';
                                    state = QUALIFIER;
                                    break
                                }
                                if (c == '.') {
                                    newSelector();
                                    newQualifier();
                                    currentSelector.tagName = '*';
                                    currentQualifier.attrName = 'class';
                                    currentQualifier.contains = true;
                                    state = QUALIFIER_NAME_FIRST_CHAR;
                                    break
                                }
                                if (c == '#') {
                                    newSelector();
                                    newQualifier();
                                    currentSelector.tagName = '*';
                                    currentQualifier.attrName = 'id';
                                    state = QUALIFIER_NAME_FIRST_CHAR;
                                    break
                                }
                                if (c == '[') {
                                    newSelector();
                                    newQualifier();
                                    currentSelector.tagName = '*';
                                    currentQualifier.attrName = '';
                                    state = ATTR_NAME_FIRST_CHAR;
                                    break
                                }
                                if (c.match(WHITESPACE)) break;
                                throw Error(SYNTAX_ERROR);
                            case TAG_NAME:
                                if (c.match(validNameNonInitialChar)) {
                                    currentSelector.tagName += c;
                                    break
                                }
                                if (c == '.') {
                                    newQualifier();
                                    currentQualifier.attrName = 'class';
                                    currentQualifier.contains = true;
                                    state = QUALIFIER_NAME_FIRST_CHAR;
                                    break
                                }
                                if (c == '#') {
                                    newQualifier();
                                    currentQualifier.attrName = 'id';
                                    state = QUALIFIER_NAME_FIRST_CHAR;
                                    break
                                }
                                if (c == '[') {
                                    newQualifier();
                                    currentQualifier.attrName = '';
                                    state = ATTR_NAME_FIRST_CHAR;
                                    break
                                }
                                if (c.match(WHITESPACE)) {
                                    state = SELECTOR_SEPARATOR;
                                    break
                                }
                                if (c == ',') {
                                    state = SELECTOR;
                                    break
                                }
                                throw Error(SYNTAX_ERROR);
                            case QUALIFIER:
                                if (c == '.') {
                                    newQualifier();
                                    currentQualifier.attrName = 'class';
                                    currentQualifier.contains = true;
                                    state = QUALIFIER_NAME_FIRST_CHAR;
                                    break
                                }
                                if (c == '#') {
                                    newQualifier();
                                    currentQualifier.attrName = 'id';
                                    state = QUALIFIER_NAME_FIRST_CHAR;
                                    break
                                }
                                if (c == '[') {
                                    newQualifier();
                                    currentQualifier.attrName = '';
                                    state = ATTR_NAME_FIRST_CHAR;
                                    break
                                }
                                if (c.match(WHITESPACE)) {
                                    state = SELECTOR_SEPARATOR;
                                    break
                                }
                                if (c == ',') {
                                    state = SELECTOR;
                                    break
                                }
                                throw Error(SYNTAX_ERROR);
                            case QUALIFIER_NAME_FIRST_CHAR:
                                if (c.match(validNameInitialChar)) {
                                    currentQualifier.attrValue = c;
                                    state = QUALIFIER_NAME;
                                    break
                                }
                                throw Error(SYNTAX_ERROR);
                            case QUALIFIER_NAME:
                                if (c.match(validNameNonInitialChar)) {
                                    currentQualifier.attrValue += c;
                                    break
                                }
                                if (c == '.') {
                                    newQualifier();
                                    currentQualifier.attrName = 'class';
                                    currentQualifier.contains = true;
                                    state = QUALIFIER_NAME_FIRST_CHAR;
                                    break
                                }
                                if (c == '#') {
                                    newQualifier();
                                    currentQualifier.attrName = 'id';
                                    state = QUALIFIER_NAME_FIRST_CHAR;
                                    break
                                }
                                if (c == '[') {
                                    newQualifier();
                                    state = ATTR_NAME_FIRST_CHAR;
                                    break
                                }
                                if (c.match(WHITESPACE)) {
                                    state = SELECTOR_SEPARATOR;
                                    break
                                }
                                if (c == ',') {
                                    state = SELECTOR;
                                    break
                                }
                                throw Error(SYNTAX_ERROR);
                            case ATTR_NAME_FIRST_CHAR:
                                if (c.match(validNameInitialChar)) {
                                    currentQualifier.attrName = c;
                                    state = ATTR_NAME;
                                    break
                                }
                                if (c.match(WHITESPACE)) break;
                                throw Error(SYNTAX_ERROR);
                            case ATTR_NAME:
                                if (c.match(validNameNonInitialChar)) {
                                    currentQualifier.attrName += c;
                                    break
                                }
                                if (c.match(WHITESPACE)) {
                                    state = EQUIV_OR_ATTR_QUAL_END;
                                    break
                                }
                                if (c == '~') {
                                    currentQualifier.contains = true;
                                    state = EQUAL;
                                    break
                                }
                                if (c == '=') {
                                    currentQualifier.attrValue = '';
                                    state = VALUE_FIRST_CHAR;
                                    break
                                }
                                if (c == ']') {
                                    state = QUALIFIER;
                                    break
                                }
                                throw Error(SYNTAX_ERROR);
                            case EQUIV_OR_ATTR_QUAL_END:
                                if (c == '~') {
                                    currentQualifier.contains = true;
                                    state = EQUAL;
                                    break
                                }
                                if (c == '=') {
                                    currentQualifier.attrValue = '';
                                    state = VALUE_FIRST_CHAR;
                                    break
                                }
                                if (c == ']') {
                                    state = QUALIFIER;
                                    break
                                }
                                if (c.match(WHITESPACE)) break;
                                throw Error(SYNTAX_ERROR);
                            case EQUAL:
                                if (c == '=') {
                                    currentQualifier.attrValue = '';
                                    state = VALUE_FIRST_CHAR;
                                    break
                                }
                                throw Error(SYNTAX_ERROR);
                            case ATTR_QUAL_END:
                                if (c == ']') {
                                    state = QUALIFIER;
                                    break
                                }
                                if (c.match(WHITESPACE)) break;
                                throw Error(SYNTAX_ERROR);
                            case VALUE_FIRST_CHAR:
                                if (c.match(WHITESPACE)) break;
                                if (c == '"' || c == "'") {
                                    valueQuoteChar = c;
                                    state = QUOTED_VALUE;
                                    break
                                }
                                currentQualifier.attrValue += c;
                                state = VALUE;
                                break;
                            case VALUE:
                                if (c.match(WHITESPACE)) {
                                    state = ATTR_QUAL_END;
                                    break
                                }
                                if (c == ']') {
                                    state = QUALIFIER;
                                    break
                                }
                                if (c == "'" || c == '"') throw Error(SYNTAX_ERROR);
                                currentQualifier.attrValue += c;
                                break;
                            case QUOTED_VALUE:
                                if (c == valueQuoteChar) {
                                    state = ATTR_QUAL_END;
                                    break
                                }
                                currentQualifier.attrValue += c;
                                break;
                            case SELECTOR_SEPARATOR:
                                if (c.match(WHITESPACE)) break;
                                if (c == ',') {
                                    state = SELECTOR;
                                    break
                                }
                                throw Error(SYNTAX_ERROR)
                        }
                    }
                    switch (state) {
                        case SELECTOR:
                        case TAG_NAME:
                        case QUALIFIER:
                        case QUALIFIER_NAME:
                        case SELECTOR_SEPARATOR:
                            newSelector();
                            break;
                        default:
                            throw Error(SYNTAX_ERROR)
                    }
                    if (!selectors.length) throw Error(SYNTAX_ERROR);
                    return selectors
                };
                Selector.nextUid = 1;
                Selector.matchesSelector = (function() {
                    var element = _13.createElement('div');
                    if (typeof element['webkitMatchesSelector'] === 'function') return 'webkitMatchesSelector';
                    if (typeof element['mozMatchesSelector'] === 'function') return 'mozMatchesSelector';
                    if (typeof element['msMatchesSelector'] === 'function') return 'msMatchesSelector';
                    return 'matchesSelector'
                })();
                return Selector
            })();
            var attributeFilterPattern = /^([a-zA-Z:_]+[a-zA-Z0-9_\-:.]*)$/;

            function validateAttribute(attribute) {
                if (typeof attribute != 'string') throw Error('Invalid request opion. attribute must be a non-zero length string.');
                attribute = attribute.trim();
                if (!attribute) throw Error('Invalid request opion. attribute must be a non-zero length string.');
                if (!attribute.match(attributeFilterPattern)) throw Error('Invalid request option. invalid attribute name: ' + attribute);
                return attribute
            }

            function validateElementAttributes(attribs) {
                if (!attribs.trim().length) throw Error('Invalid request option: elementAttributes must contain at least one attribute.');
                var lowerAttributes = {};
                var attributes = {};
                var tokens = attribs.split(/\s+/);
                for (var i = 0; i < tokens.length; i++) {
                    let name = tokens[i];
                    if (!name) continue;
                    name = validateAttribute(name);
                    var nameLower = name.toLowerCase();
                    if (lowerAttributes[nameLower]) throw Error('Invalid request option: observing multiple case variations of the same attribute is not supported.');
                    attributes[name] = true;
                    lowerAttributes[nameLower] = true
                }
                return Object.keys(attributes)
            }

            function elementFilterAttributes(selectors) {
                var attributes = {};
                selectors.forEach(function(selector) {
                    selector.qualifiers.forEach(function(qualifier) {
                        attributes[qualifier.attrName] = true
                    })
                });
                return Object.keys(attributes)
            }
            var MutationSummary = (function() {
                function MutationSummary(opts) {
                    var _44 = this;
                    this.connected = false;
                    this.options = MutationSummary.validateOptions(opts);
                    this.observerOptions = MutationSummary.createObserverOptions(this.options.queries);
                    this.root = this.options.rootNode;
                    this.callback = this.options.callback;
                    this.elementFilter = Array.prototype.concat.apply([], this.options.queries.map(function(query) {
                        return query.elementFilter ? query.elementFilter : []
                    }));
                    if (!this.elementFilter.length) this.elementFilter = undefined;
                    this.calcReordered = this.options.queries.some(function(query) {
                        return query.all
                    });
                    this.queryValidators = [];
                    if (MutationSummary.createQueryValidator) {
                        this.queryValidators = this.options.queries.map(function(query) {
                            return MutationSummary.createQueryValidator(_44.root, query)
                        })
                    }
                    this.observedMutations = [];
                    this.observer = MutationObserverCtor ? new MutationObserverCtor(function(mutations) {
                        _44.observedMutations.push(mutations);
                        _2.setTimeout(() => {
                            if (!_44.observedMutations.length) return;
                            _44.observerCallback(_44.observedMutations.flat());
                            _44.observedMutations = []
                        }, 1)
                    }) : {
                        observe: function() {}
                    };
                    this.reconnect()
                }
                MutationSummary.createObserverOptions = function(queries) {
                    var observerOptions = {
                        childList: true,
                        subtree: true
                    };
                    var attributeFilter;

                    function observeAttributes(attributes) {
                        if (observerOptions.attributes && !attributeFilter) return;
                        observerOptions.attributes = true;
                        observerOptions.attributeOldValue = true;
                        if (!attributes) {
                            attributeFilter = undefined;
                            return
                        }
                        attributeFilter = attributeFilter || {};
                        attributes.forEach(function(attribute) {
                            attributeFilter[attribute] = true;
                            attributeFilter[attribute.toLowerCase()] = true
                        })
                    }
                    queries.forEach(function(query) {
                        if (query.characterData) {
                            observerOptions.characterData = true;
                            observerOptions.characterDataOldValue = true;
                            return
                        }
                        if (query.all) {
                            observeAttributes();
                            observerOptions.characterData = true;
                            observerOptions.characterDataOldValue = true;
                            return
                        }
                        if (query.attribute) {
                            observeAttributes([query.attribute.trim()]);
                            return
                        }
                        var attributes = elementFilterAttributes(query.elementFilter).concat(query.attributeList || []);
                        if (attributes.length) observeAttributes(attributes)
                    });
                    if (attributeFilter) observerOptions.attributeFilter = Object.keys(attributeFilter);
                    return observerOptions
                };
                MutationSummary.validateOptions = function(options) {
                    for (var prop in options) {
                        if (!(prop in MutationSummary.optionKeys)) throw Error('Invalid option: ' + prop)
                    }
                    if (typeof options.callback !== 'function') throw Error('Invalid options: callback is required and must be a function');
                    if (!options.queries || !options.queries.length) throw Error('Invalid options: queries must contain at least one query request object.');
                    var opts = {
                        callback: options.callback,
                        rootNode: options.rootNode || _13,
                        observeOwnChanges: !!options.observeOwnChanges,
                        oldPreviousSibling: !!options.oldPreviousSibling,
                        queries: []
                    };
                    for (var i = 0; i < options.queries.length; i++) {
                        var request = options.queries[i];
                        if (request.all) {
                            if (Object.keys(request).length > 1) throw Error('Invalid request option. all has no options.');
                            opts.queries.push({
                                all: true
                            });
                            continue
                        }
                        if ('attribute' in request) {
                            let query = {
                                attribute: validateAttribute(request.attribute)
                            };
                            query.elementFilter = Selector.parseSelectors('*[' + query.attribute + ']');
                            if (Object.keys(request).length > 1) throw Error('Invalid request option. attribute has no options.');
                            opts.queries.push(query);
                            continue
                        }
                        if ('element' in request) {
                            var requestOptionCount = Object.keys(request).length;
                            let query = {
                                element: request.element,
                                elementFilter: Selector.parseSelectors(request.element)
                            };
                            if (Object.prototype.hasOwnProperty.call(request, 'elementAttributes')) {
                                query.attributeList = validateElementAttributes(request.elementAttributes);
                                requestOptionCount--
                            }
                            if (requestOptionCount > 1) throw Error('Invalid request option. element only allows elementAttributes option.');
                            opts.queries.push(query);
                            continue
                        }
                        if (request.characterData) {
                            if (Object.keys(request).length > 1) throw Error('Invalid request option. characterData has no options.');
                            opts.queries.push({
                                characterData: true
                            });
                            continue
                        }
                        throw Error('Invalid request option. Unknown query request.')
                    }
                    return opts
                };
                MutationSummary.prototype.createSummaries = function(mutations) {
                    if (!mutations || !mutations.length) return [];
                    var projection = new MutationProjection(this.root, mutations, this.elementFilter, this.calcReordered, this.options.oldPreviousSibling);
                    var summaries = [];
                    for (var i = 0; i < this.options.queries.length; i++) {
                        summaries.push(new Summary(projection, this.options.queries[i]))
                    }
                    return summaries
                };
                MutationSummary.prototype.checkpointQueryValidators = function() {
                    this.queryValidators.forEach(function(validator) {
                        if (validator) validator.recordPreviousState()
                    })
                };
                MutationSummary.prototype.runQueryValidators = function(summaries) {
                    this.queryValidators.forEach(function(validator, index) {
                        if (validator) validator.validate(summaries[index])
                    })
                };
                MutationSummary.prototype.changesToReport = function(summaries) {
                    return summaries.some(function(summary) {
                        var summaryProps = ['added', 'removed', 'reordered', 'reparented', 'valueChanged', 'characterDataChanged'];
                        if (summaryProps.some(function(prop) {
                                return summary[prop] && summary[prop].length
                            })) return true;
                        if (summary.attributeChanged) {
                            var attrNames = Object.keys(summary.attributeChanged);
                            var attrsChanged = attrNames.some(function(attrName) {
                                return !!summary.attributeChanged[attrName].length
                            });
                            if (attrsChanged) return true
                        }
                        return false
                    })
                };
                MutationSummary.prototype.observerCallback = function(mutations) {
                    if (!this.options.observeOwnChanges) this.observer.disconnect();
                    var summaries = this.createSummaries(mutations);
                    this.runQueryValidators(summaries);
                    if (this.options.observeOwnChanges) this.checkpointQueryValidators();
                    if (this.changesToReport(summaries)) this.callback(summaries);
                    if (!this.options.observeOwnChanges && this.connected) {
                        this.checkpointQueryValidators();
                        this.observer.observe(this.root, this.observerOptions)
                    }
                };
                MutationSummary.prototype.reconnect = function() {
                    if (this.connected) throw Error('Already connected');
                    this.observer.observe(this.root, this.observerOptions);
                    this.connected = true;
                    this.checkpointQueryValidators()
                };
                MutationSummary.prototype.takeSummaries = function() {
                    if (!this.connected) throw Error('Not connected');
                    var summaries = this.createSummaries(this.observer.takeRecords());
                    return this.changesToReport(summaries) ? summaries : undefined
                };
                MutationSummary.prototype.disconnect = function() {
                    var summaries = this.takeSummaries();
                    this.observer.disconnect();
                    this.connected = false;
                    return summaries
                };
                MutationSummary.NodeMap = NodeMap;
                MutationSummary.parseElementFilter = Selector.parseSelectors;
                MutationSummary.optionKeys = {
                    'callback': true,
                    'queries': true,
                    'rootNode': true,
                    'oldPreviousSibling': true,
                    'observeOwnChanges': true
                };
                return MutationSummary
            })();
            var TreeMirrorClient = (function() {
                function TreeMirrorClient(target, mirror, testingQueries) {
                    var _44 = this;
                    this.target = target;
                    this.mirror = mirror;
                    this.nextId = 1;
                    this.knownNodes = new MutationSummary.NodeMap();
                    this.mutationSummaries = [];
                    _432();
                    var serializedRoot = this.serializeNode(target, true);
                    var rootId = serializedRoot.id;
                    this.mirror.initialize(rootId, [serializedRoot]);
                    var queries = [{
                        all: true
                    }];
                    if (testingQueries) queries = queries.concat(testingQueries);
                    this.mutationSummaries.push(new MutationSummary({
                        rootNode: target,
                        callback: function(summaries) {
                            _44.applyChanged(summaries)
                        },
                        queries: queries
                    }))
                }
                TreeMirrorClient.prototype.addShadowRoot = function(shadow) {
                    if (!this.isKnownNode(shadow)) {
                        var data = this.serializeNode(shadow, true);
                        if (data) {
                            data.parentNode = this.serializeNode(shadow.host);
                            this.mirror.applyChanged({
                                removed: [],
                                addedOrMoved: [data],
                                attributes: [],
                                text: []
                            })
                        }
                    }
                    var _44 = this;
                    this.mutationSummaries.push(new MutationSummary({
                        rootNode: shadow,
                        callback: function(summaries) {
                            _44.applyChanged(summaries)
                        },
                        queries: [{
                            all: true
                        }]
                    }))
                };
                TreeMirrorClient.prototype.disconnect = function() {
                    this.mutationSummaries.forEach(function(mutationSummary) {
                        mutationSummary.disconnect()
                    });
                    this.mutationSummaries = []
                };
                TreeMirrorClient.prototype.rememberNode = function(node) {
                    var id = this.nextId++;
                    this.knownNodes.set(node, id);
                    return id
                };
                TreeMirrorClient.prototype.forgetNode = function(node) {
                    this.knownNodes.deleteNode(node)
                };
                TreeMirrorClient.prototype.isKnownNode = function(node) {
                    return !!this.knownNodes.get(node)
                };
                TreeMirrorClient.prototype.serializeNode = function(node, isInitial) {
                    if (node === null) return null;
                    if (_234(node, _311)) return null;
                    if (_234(node, _308)) return null;
                    var id = this.knownNodes.get(node);
                    if (id !== undefined) {
                        if (isInitial) return _7('Found duplicated node during initial DOM: ' + id, _14());
                        return {
                            id: id
                        }
                    }
                    var data = {
                        nodeType: node.nodeType,
                        id: this.rememberNode(node)
                    };
                    var parent = _25._87(node);
                    if (_11._187(node, 'data-mf-replace') || _11._187(node, 'data-mf-replace-inner')) return null;
                    var _562 = _486(node),
                        _581 = !!_234(parent, _311);
                    if (_562 || _581) {
                        _7('CSS Blacklist blocked node. NodeType: ' + node.nodeType + '. ' + (node.nodeType === 1 ? 'Tag: ' + node.tagName : ''), _14());
                        _305(node, _311, true);
                        if (isInitial && node.childNodes.length) {
                            let _40;
                            for (_40 = _25._177(node); _40; _40 = _25._171(_40)) this.serializeNode(_40, true)
                        }
                        if (_581) return null
                    }
                    var _535 = _468(node),
                        _596 = !!_234(parent, _308);
                    if (_535 || _596) {
                        _7('CSS Masked blocked node. NodeType: ' + node.nodeType + '. ' + (node.nodeType === 1 ? 'Tag: ' + node.tagName : ''), _14());
                        _305(node, _308, true);
                        if (isInitial && node.childNodes.length) {
                            let _40;
                            for (_40 = _25._177(node); _40; _40 = _25._171(_40)) this.serializeNode(_40, true)
                        }
                        if (_596) return null
                    }
                    switch (data.nodeType) {
                        case 9:
                            this.serializeAdoptedStyleSheets(node, data);
                            if (isInitial) this.serializeChildNodes(node, data);
                            break;
                        case 11:
                            data.isShadowRoot = _25._962(node);
                            this.serializeAdoptedStyleSheets(node, data);
                            if (isInitial) this.serializeChildNodes(node, data);
                            break;
                        case 10:
                            data.name = node.name;
                            data.publicId = node.publicId;
                            data.systemId = node.systemId;
                            break;
                        case 8:
                        case 3:
                            if (node.nodeType === 8 && node.textContent.indexOf('[if') !== 0 && node.textContent.indexOf('<![endif]') !== 0) break;
                            data.textContent = _653(node);
                            if (_583.test(data.textContent) && !_1039(parent)) data.textContent = data.textContent.replace(_583, ' ');
                            if (parent && parent.tagName === 'STYLE' && /^\s*$/.test(node.textContent)) {
                                data.textContent = _396(parent.sheet)
                            }
                            break;
                        case 1:
                            if (node.tagName === 'IFRAME' && parent && parent.tagName === 'HEAD') {
                                data.nodeType = 8;
                                data.textContent = '';
                                break
                            }
                            data.tagName = node.tagName;
                            if (node.attributes['data-mf-replace']) {
                                let _328 = node.attributes['data-mf-replace'].value;
                                data = _681.call(this, _328, function(_19) {
                                    var _10 = this.serializeNode(_19, true);
                                    _10.id = data.id;
                                    this.knownNodes.set(_19, _10.id);
                                    return _10
                                })[0];
                                break
                            }
                            if (node.tagName === 'SCRIPT') {
                                if (/\/?aura_prod\.js(\?.+)?$/.test(node.src)) {
                                    _7('Salesforce Aura script added');
                                    _1185();
                                    _1172()
                                }
                                break
                            }
                            data.attributes = {};
                            var _947 = _562 || _535;
                            if (_947) {
                                _900(node, data)
                            } else {
                                _954(node, data)
                            }
                            if (_562) {
                                data.attributes.class = node.className + ' mf-excluded';
                                break
                            }
                            if (_535) {
                                data.attributes.class = node.className + ' mf-masked'
                            }
                            if (node === _414) data.attributes.class = (data.attributes.class || '') + ' mf-scroll-main';
                            if (_573.indexOf(node) !== -1) data.attributes.class = (data.attributes.class || '') + ' mf-listen';
                            if (node.tagName === 'IFRAME' && node.offsetWidth <= 1 && node.offsetHeight <= 1) data.attributes.src = '';
                            if (isInitial && node.tagName === 'INPUT') {
                                if (!data.attributes.value && node.value) data.attributes.value = _247(node);
                                if (!data.attributes.checked && node.checked) data.attributes.checked = node.checked
                            }
                            if (isInitial && node.tagName === 'OPTION' && !data.attributes.selected && node.selected) data.attributes.selected = node.selected;
                            if (node.tagName === 'INPUT' && node.type === 'hidden' && data.attributes.value) data.attributes.value = '';
                            if (node.attributes['data-mf-replace-inner']) {
                                let _328 = node.attributes['data-mf-replace-inner'].value;
                                data.childNodes = _681.call(this, _328, function(_19) {
                                    return this.serializeNode(_19, true)
                                });
                                break
                            }
                            if (isInitial) {
                                this.serializeChildNodes(node, data);
                                if (node.shadowRoot) {
                                    if (!data.childNodes) data.childNodes = [];
                                    var shadowRootData = this.serializeNode(node.shadowRoot, true);
                                    if (shadowRootData) data.childNodes.push(shadowRootData)
                                }
                                var cssDomain = node.tagName === 'LINK' ? node.href.split('/')[2] : '-1';
                                var cssGetAllowed = _13.domain.indexOf(cssDomain) !== -1;
                                var _949 = node.tagName === 'LINK' && node.href && cssGetAllowed && (node.href.indexOf('blob:') === 0 || _3.enableCssRecording);
                                var _950 = node.tagName === 'STYLE' && !node.textContent;
                                var cssRules = _949 || _950 ? _396(node.sheet) : null;
                                if (cssRules) {
                                    data.childNodes = [{
                                        nodeType: 3,
                                        textContent: cssRules
                                    }];
                                    data.tagName = 'STYLE';
                                    data.href = undefined;
                                    data.rel = undefined
                                }
                            }
                            break
                    }
                    return data
                };
                TreeMirrorClient.prototype.serializeAddedAndMoved = function(added, reparented, reordered) {
                    var _44 = this;
                    var all = added.concat(reparented).concat(reordered);
                    var parentMap = new MutationSummary.NodeMap();
                    all.forEach(function(node) {
                        var parent = _25._87(node);
                        var children = parentMap.get(parent);
                        if (!children) {
                            children = new MutationSummary.NodeMap();
                            parentMap.set(parent, children)
                        }
                        children.set(node, true)
                    });
                    var moved = [];
                    parentMap.keys().forEach(function(parent) {
                        var children = parentMap.get(parent);
                        var keys = children.keys();
                        while (keys.length) {
                            var node = keys[0];
                            while (node.previousSibling && children.has(node.previousSibling)) node = node.previousSibling;
                            var _219 = false;
                            while (node && children.has(node)) {
                                if (_678(node)) _219 = true;
                                else if (_677(node.previousSibling)) _219 = false;
                                if (!_219) {
                                    var data = _44.serializeNode(node);
                                    if (data) {
                                        var _360 = node.previousSibling;
                                        while (_360 && !data.previousSibling) {
                                            data.previousSibling = _44.serializeNode(_360);
                                            _360 = _360.previousSibling
                                        }
                                        data.parentNode = _44.serializeNode(_25._87(node));
                                        if (data.parentNode) moved.push(data)
                                    }
                                }
                                children.deleteNode(node);
                                node = _25._171(node)
                            }
                            keys = children.keys()
                        }
                    });
                    return moved
                };
                TreeMirrorClient.prototype.serializeAttributeChanges = function(attributeChanged) {
                    var _44 = this;
                    var map = new MutationSummary.NodeMap();
                    Object.keys(attributeChanged).forEach(function(attrName) {
                        attributeChanged[attrName].forEach(function(element) {
                            if (element.hasAttribute && element.hasAttribute('data-mf-replace') || _11._187(element, 'data-mf-replace') || _11._187(element, 'data-mf-replace-inner')) {
                                return
                            }
                            if (_486(element)) _305(element, _311, true, true);
                            if (_478(element)) _305(element, _308, true, true);
                            var record = map.get(element);
                            if (!record) {
                                record = _44.serializeNode(element);
                                if (record) {
                                    record.attributes = {};
                                    map.set(element, record)
                                }
                            }
                            if (record) {
                                if (attrName.toLowerCase() === 'value' && element.tagName === 'INPUT') record.attributes.value = _247(element);
                                else if (attrName === 'mf_adoptedStyleSheets') _44.serializeAdoptedStyleSheets(element, record);
                                else record.attributes[attrName] = element.getAttribute(attrName)
                            }
                        })
                    });
                    return map.keys().map(function(node) {
                        return map.get(node)
                    })
                };
                TreeMirrorClient.prototype.serializeTextChanges = function(textChanges) {
                    var _44 = this;
                    return textChanges.map(function(node) {
                        var data = _44.serializeNode(node);
                        if (data) {
                            if (node.tagName === 'STYLE' && /^\s*$/.test(node.textContent)) data.textContent = _396(node.sheet);
                            else data.textContent = _653(node)
                        }
                        return data
                    })
                };
                TreeMirrorClient.prototype.applyChanged = function(summaries) {
                    _432();
                    var summary = summaries[0];
                    ['removed', 'added', 'reparented', 'reordered', 'attributeChanged', 'characterDataChanged'].forEach(function(key) {
                        if (!summary[key]) summary[key] = []
                    });
                    var _44 = this;
                    var removed = summary.removed.map(function(node) {
                        return _44.serializeNode(node)
                    });
                    var moved = this.serializeAddedAndMoved(summary.added, summary.reparented, summary.reordered);
                    var attributes = this.serializeAttributeChanges(summary.attributeChanged);
                    var text = this.serializeTextChanges(summary.characterDataChanged);
                    this.mirror.applyChanged({
                        removed: _363(removed),
                        addedOrMoved: _363(moved),
                        attributes: _363(attributes),
                        text: _363(text)
                    });
                    summary.removed.forEach(function(node) {
                        _44.forgetNode(node)
                    });
                    summary.added.forEach(function(node) {
                        _379(node)
                    })
                };
                TreeMirrorClient.prototype.serializeChildNodes = function(node, data) {
                    if (!node.childNodes.length) return;
                    data.childNodes = [];
                    var _219 = false;
                    for (var child = _25._177(node); child; child = _25._171(child)) {
                        if (_678(child)) _219 = true;
                        else if (_677(child.previousSibling)) _219 = false;
                        if (_219) continue;
                        var serializedChild = this.serializeNode(child, true);
                        if (serializedChild) {
                            data.childNodes.push(serializedChild)
                        }
                    }
                };
                TreeMirrorClient.prototype.serializeAdoptedStyleSheets = function(_19, _10) {
                    if (!_19.adoptedStyleSheets) return;
                    var _44 = this;
                    _10.css = _19.adoptedStyleSheets.map(function(_144) {
                        var _361 = {
                            id: _44.knownNodes.get(_144)
                        };
                        if (!_361.id) {
                            _361.id = _44.rememberNode(_144);
                            _361.text = _396(_144)
                        }
                        return _361
                    })
                };
                return TreeMirrorClient
            })();

            function _363(_963) {
                return _963.filter(function(_77) {
                    return _77
                })
            }

            function _954(node, data) {
                for (var i = 0; i < node.attributes.length; i++) {
                    var attr = node.attributes[i];
                    if (_924(attr.name.toLowerCase())) continue;
                    if (attr.name.toLowerCase() === 'value' && node.tagName === 'INPUT') data.attributes.value = _247(node);
                    else data.attributes[attr.name] = attr.value
                }
            }

            function _432() {
                _316(_647, _3._348);
                _316(_648, _3._354);
                _316(_573, _3._336);
                _316(_646, _3._355);
                _316(_513, ['.mf-form']);
                _958();
                _959()
            }

            function _316(_580, _586) {
                _580.length = 0;
                if (!_586.length) return;
                try {
                    var _322 = _150(_586.join(','), _13);
                    for (var i = 0; i < _322.length; i++) {
                        _580.push(_322[i])
                    }
                } catch (e) {}
            }

            function _958() {
                if (!_3.freezeElementIds) return;
                _3.freezeElementIds.forEach(function(_8) {
                    try {
                        var _322 = _150(_8, _13);
                        _322.forEach(function(_19) {
                            if (_346.has(_19)) return;
                            if (_322.length > 1) _8 = _60(_19);
                            _346.set(_19, _8)
                        })
                    } catch (e) {}
                })
            }

            function _959() {
                _255.clear();
                const _960 = _88._139();
                for (const _216 of _3._688) {
                    if (_216._153 && _216._153 != _960) continue;
                    let _239;
                    if (_216._1214) {
                        const _595 = _150(_216._17, _13);
                        if (!_595 ? .length) continue;
                        _239 = _595
                    } else {
                        const _571 = _245(_216._17, false);
                        if (!_571) continue;
                        _239 = [_571]
                    }
                    if (_216._351) {
                        const _570 = _255.get(_92._351._22);
                        if (_570) _239.forEach(_19 => _570.add(_19));
                        else _255.set(_92._351._22, new Set(_239))
                    }
                    if (_216._370) {
                        const _574 = _255.get(_92._370._22);
                        if (_574) _239.forEach(_19 => _574.add(_19));
                        else _255.set(_92._370._22, new Set(_239))
                    }
                }
            }

            function _150(_8, _34) {
                try {
                    var _55 = [];
                    _8.split(',').forEach(function(_8) {
                        var _49 = _8.split(' > :document-fragment: > ', 1);
                        _34.querySelectorAll(_49[0]).forEach(function(_1) {
                            if (_49[1] && _1.shadowRoot) {
                                _150(_49[1], _1.shadowRoot).forEach(function(_1) {
                                    _55.push(_1)
                                })
                            } else {
                                _55.push(_1)
                            }
                        })
                    });
                    return _55
                } catch (_59) {
                    _7('Could not get element from selector: ' + _59.message)
                }
            }

            function _681(_328, _921) {
                var _10 = [];
                var _444 = _13.createElement('div');
                _444.innerHTML = _328;
                for (var i = 0; i < _444.childNodes.length; i++) {
                    var _922 = _444.childNodes[i];
                    var _923 = _921.call(this, _922);
                    _10.push(_923)
                }
                return _10
            }

            function _678(_19) {
                return _19 && _19.nodeType === 8 && _19.textContent.trim().toLowerCase().indexOf('mouseflowexcludestart') === 0
            }

            function _677(_19) {
                return _19 && _19.nodeType === 8 && _19.textContent.trim().toLowerCase().indexOf('mouseflowexcludeend') === 0
            }

            function _924(_467) {
                return _925.test(_467)
            }

            function _396(_144) {
                var _237 = '';
                try {
                    if (!_144 || !_144.cssRules) return _237
                } catch (e) {
                    return _237
                }
                for (var _4 = 0; _4 < _144.cssRules.length; _4++) {
                    _237 += _144.cssRules[_4].cssText
                }
                return _237
            }

            function _1038() {
                _147({
                    _20: _192 + 'install?websiteId=' + _3._51,
                    _131: function() {
                        _7('Website installed signal sent.', _14())
                    },
                    _71: function() {
                        _7('Error in transmitCrossDomain - could not signal that website was installed.', _14())
                    }
                })
            }

            function _1064(_65) {
                _147({
                    _20: _192 + 'config?websiteId=' + _3._51,
                    _131: function(_90) {
                        var _927 = _11._317(_90._410);
                        _3.keyLogging = _927.enableKeystrokes;
                        _7('Fetched recording script configuration.');
                        _65()
                    },
                    _71: function() {
                        _7('Error in transmitCrossDomain - could not fetch recording script configuration.');
                        _65()
                    }
                })
            }

            function _38() {
                if (_97) {
                    _7('Recording script is already started', _14());
                    return
                }
                if (!_746) {
                    _7('Recording not started - recording script is not initialized', _14());
                    return
                }
                _7('Recording starting, version ' + _210 + (_3.gdprEnabled ? ', GDPR mode enabled' : '') + (_3._527 ? ', privacy enforced' : ''), _14());
                if (!_636()) return;
                _97 = true;
                _1147();
                _432();
                _15._74 = _1118(_0._679);
                if (_932()) _933();
                _0._230 = _210;
                _929()
            }

            function _929() {
                var _675 = _1023();
                var _20 = _192 + 'init?v=' + _210 + '&p=' + _3._51 + '&s=' + _15._61 + '&page=' + _15._74 + '&ret=' + (_15._298 ? '1' : '0') + '&u=' + _15._183 + '&href={href}' + '&url=' + _108(_88._139()) + '&ref={referrer}' + '&title=' + _108(_13.title) + '&res=' + _2.screen.width + 'x' + _2.screen.height + '&tz=' + _1121() + '&to=' + _15._651 + '&dnt=' + _15._645 + '&ori=' + (typeof _2.orientation != 'undefined' ? _2.orientation : '') + '&dw=' + _13.documentElement.clientWidth + '&dh=' + _13.documentElement.clientHeight + '&time=' + _1096() + '&pxr=' + (typeof _2.devicePixelRatio != 'undefined' ? _2.devicePixelRatio : 1) + (_675.length > 0 ? '&fw=' + _675.join(',') : '') + '&gdpr=' + (_3.gdprEnabled ? 1 : 0);
                _20 = _20.replace('{href}', _1019(_20.length)).replace('{referrer}', _108(_3.referrer));
                _1022();
                if (_3.hasCustomHref) _124._779(['tag', 'mf_secret_custom-href']);
                var _671 = _993(_76._776 - _20.length - 6);
                _20 += _996(_671);
                _147({
                    _20: _20,
                    _131: function(_90) {
                        if (_90._410 === 'Recording blocked') {
                            _7('Recording not started - mf_block cookie set to 1', _14());
                            return
                        }
                        const _674 = parseInt(_90._410, 10);
                        if (isNaN(_674)) {
                            _7('Recording not started - init failed', _14());
                            return
                        }
                        _0._774 = _674;
                        _671.forEach(function(_155) {
                            _719(_155.key, _155.value)
                        });
                        _269 = true;
                        _965();
                        _212._38(_15, _0, _352);
                        _124._38();
                        _978();
                        _979();
                        _981()
                    },
                    _1083: true,
                    _71: function() {
                        _7('Error in transmitCrossDomain - recording not starting.', _14())
                    }
                });
                _701();
                _0._120 = null;
                _1123();
                _0._100 = {
                    x: _2.pageXOffset,
                    y: _2.pageYOffset
                };
                if (_0._100.x !== 0 && _0._100.y !== 0) _577();
                _0._312 = 1;
                _528();
                _7('Recording started. Session: ' + _15._61 + ', Page: ' + _15._74 + ', Last page: ' + _15._407, _14())
            }

            function _932() {
                return !_15._61 || !_1126() || (_0._230 && _0._230 !== '0' && _0._230 !== _210) || (+new Date() - _0._419) > _76._460
            }

            function _933() {
                _7('Starting new session');
                var _934 = _15._61;
                _15._61 = _445();
                _0._176 = [];
                _15._296 = 0;
                if (_15._61 === _934) throw Error('New session ID is identical to the old session ID. This might be because Math.random has been overwritten.')
            }

            function _62(_935) {
                if (!_97) return;
                _964();
                _185 = false;
                _593();
                _124._725();
                _26._214(_488);
                _26._214(_506);
                _26._214(_507);
                _26._148(_303);
                if (_295) {
                    _26._148(_295);
                    _807()
                }
                if (_340) {
                    _26._148(_340);
                    _664()
                }
                _1145();
                if (!_935) _30(_9._936, {});
                _411();
                _269 = false;
                if (_121) _121.disconnect();
                _212._62();
                _528();
                _0 = _623();
                _7('Recording stopped', _14());
                _97 = false;
                _456 = false
            }

            function _423(_27, _70, _940) {
                if (_14() < 100) {
                    var _937 = !_27 || _27.toString() === _3.path;
                    var _938 = (_70 || _2.location).href === _3.location.href;
                    if (_937 && _938) return
                }
                if (_97) _62();
                _3.htmlDelay = _3.newPageViewHtmlDelay;
                _3._523(_27, _70);
                _3.forcePath = !!_940;
                _15._74 = '';
                _0._986 = true;
                _38();
                _473(0)
            }

            function _964() {
                if (_0._142) {
                    if (+new Date() - _0._142 < _3.registerSubmitTimeout) {
                        _7('Registering formSubmit', _14())
                    } else {
                        _7('Not registering formSubmit. Timeout exceeded.', _14());
                        _0._120 = null
                    }
                }
            }

            function _1059() {
                _62();
                _1095('mf_' + _3._51);
                if (_2.name && ((_2.name.length === 35 && _2.name.indexOf('mf_') === 0) || (_3.crossDomainSupport && _2.name.indexOf('mf_' + _3._51) === 0))) _2.name = ''
            }

            function _965() {
                if (_3.htmlFetchMode === 'post') {
                    _26._72(function() {
                        _966()
                    }, _3.htmlDelay)
                } else {
                    _7('Html not sent due to mouseflowHtmlFecthMode setting', _14())
                }
            }

            function _966() {
                if (_121) _121.disconnect();
                var _57 = {
                    _51: _3._51,
                    _61: _15._61,
                    _74: _15._74
                };
                _121 = new TreeMirrorClient(_13, {
                    initialize: function(rootId, children) {
                        if (_57._74 === _15._74) _185 = true;
                        _2.setTimeout(function() {
                            _1073({
                                _57: _57,
                                _10: {
                                    f: 'initialize',
                                    args: [rootId, children]
                                },
                                _175: _13.documentElement.innerHTML.length
                            })
                        }, 1)
                    },
                    applyChanged: function(summary) {
                        if (_14() - _0._512 < 30000) {
                            if (summary.removed.length || summary.addedOrMoved.length || summary.attributes.length || summary.text.length) {
                                _1069({
                                    _57: _57,
                                    _10: {
                                        f: 'applyChanged',
                                        args: [summary.removed, summary.addedOrMoved, summary.attributes, summary.text]
                                    }
                                })
                            }
                        }
                    }
                })
            }

            function _1057(_16, _5, _991, _670) {
                if (!_97) return;
                if (!_668(_16, _5)) return;
                if (!_719(_16, _5)) {
                    _7('Variable already set to same value, not triggering callback.', _14());
                    return
                }
                var _10 = {
                    key: _16.toString(),
                    value: _5.toString() || '',
                    scope: _991 || 'session',
                    overwrite: _670 === undefined ? true : _670
                };
                _0._145.push(_10);
                _26._148(_340);
                _340 = _26._72(_664, 1000)
            }

            function _668(_16, _5) {
                if (!_16 || !_5) {
                    _7('Variable key and value cannot be empty', _14());
                    return false
                }
                if (_16.includes('=')) {
                    _7('Variable key cannot contain "="', _14());
                    return false
                }
                if (_16.length > 100) {
                    _7('Variable key cannot be more than 100 characters', _14());
                    return false
                }
                if (_5.length > 2000) {
                    _7('Variable value cannot be more than 2000 characters', _14());
                    return false
                }
                return true
            }

            function _993(limit) {
                var _83 = _124._901();
                if (!_83.length) return [];
                var _145 = [];
                var _665 = 0;
                for (var _50 = 0; _50 < _83.length; _50++) {
                    var _56 = _83[_50];
                    if (!_56 || !_56.length || _56[0] !== 'setVariable') continue;
                    if ((_56.length > 3 && _56[3] !== 'session') || (_56.length > 4 && _56[4] !== true)) continue;
                    var _16 = _56[1];
                    var _5 = _56[2];
                    if (!_668(_16, _5)) continue;
                    if (_720(_16) !== -1) continue;
                    var _995 = _108(_16) + '=' + _108(_5);
                    _665 += _995.length + 1;
                    if (_665 - 1 >= limit) break;
                    _145.push({
                        key: _16,
                        value: _5
                    });
                    _83.splice(_50, 1);
                    _50--
                }
                return _145
            }

            function _996(_145) {
                var _384 = _145.map(function(_155) {
                    return _108(_155.key) + '=' + _108(_155.value)
                }).join('&');
                return _384 ? '&vars=' + _108(_384) : ''
            }

            function _664() {
                _340 = 0;
                for (var _4 = 0; _4 < _0._145.length; _4++) {
                    var _155 = _0._145[_4];
                    _7('Setting custom variable: ' + _155.key + ' = ' + _155.value + ', overwrite: ' + (_155.overwrite === undefined ? true : _155.overwrite), _14())
                }
                _352('variable', _0._145);
                _0._145 = []
            }

            function _63(_997) {
                _30(_9._63, {
                    target: _997
                })
            }

            function _1058() {
                _30(_9._63, {
                    target: '*'
                })
            }

            function _1056(_998) {
                if (!_97) return;
                if (_3.gdprEnabled || _3._527) {
                    _7('User identification not allowed (privacy enforced in script)', _14());
                    return
                }
                _352('identify', {
                    userId: _15._183,
                    userName: _998
                })
            }

            function _1055(_47) {
                if (!_97) return;
                _47 = _437(_47);
                _7('Registering form submit attempt on this page', _14());
                _559(_47)
            }

            function _433(_47) {
                if (!_97) return;
                _47 = _437(_47);
                var _469 = _14();
                if (_0._120 === _116(_3.path || _3.location.pathname) || _469 > 5000) {
                    _7('Registering form submit success on this page', _14());
                    if (!_0._120) _30(_9._417, {
                        target: _47
                    });
                    _30(_9._669, {});
                    _0._142 = undefined;
                    _0._120 = undefined
                } else {
                    _2.setTimeout(function() {
                        _7('Registering form submit success on previous page', _14());
                        _451([{
                            _21: _9._669
                        }], _709())
                    }, _706())
                }
            }

            function _754(_47) {
                if (!_97) return;
                _47 = _437(_47);
                var _469 = _14();
                if (_0._120 === _116(_3.path || _3.location.pathname) || _469 > 5000) {
                    _7('Registering form submit failure on this page', _14());
                    if (!_0._120) _30(_9._417, {
                        target: _47
                    });
                    _30(_9._246, {});
                    _170(_92._246);
                    _0._142 = undefined;
                    _0._120 = undefined
                } else {
                    _2.setTimeout(function() {
                        _7('Registering form submit failure on previous page', _14());
                        _451([{
                            _21: _9._246
                        }, {
                            _21: _9._73,
                            _24: {
                                x: _92._246._5,
                                y: 0
                            }
                        }, {
                            _21: _9._63,
                            _24: {
                                target: _92._246._22
                            }
                        }], _709())
                    }, _706())
                }
            }

            function _709() {
                const _429 = _15._109.find(_57 => _57._36 === _15._407) ? ._75;
                if (_0._142 && _429 && _0._142 > _429 && _0._142 < _0._75) {
                    return _0._142 - _429
                }
                return 0
            }

            function _706() {
                var _705 = 1000;
                var _704 = new Date() - _0._142;
                return _704 > _705 ? 0 : _705 - _704
            }

            function _437(_47) {
                if (typeof(_47) === 'object') return _60(_47);
                var _17 = _1001.filter(function(_438) {
                    return _438._31 === _47
                }).map(function(_438) {
                    return _438._17
                })[0];
                return _17 || _47
            }

            function _559(_31) {
                if (!_97 || !_31 || _404(_245(_31))) return;
                if ((+new Date()) - _0._622 < 20) return;
                _0._622 = +new Date();
                _30(_9._417, {
                    target: _31
                });
                if (!_0._485[_31]) {
                    _0._485[_31] = _517(_31)
                } else {
                    _881(_31, _517(_31), _0._485[_31])
                }
                _885(_31);
                _871(_31);
                _0._142 = +new Date();
                _0._120 = _116(_3.path || _3.location.pathname);
                _701()
            }

            function _701() {
                if (!_0._120) return;
                var _218 = _1007();
                if (_218.length) {
                    _1002(_218);
                    return
                }
                if (_0._120 !== _116(_3.path || _3.location.pathname)) {
                    _433()
                }
            }

            function _1002(_218) {
                var _700 = _218.filter(function(_3) {
                    return !_3.target
                })[0];
                if (_700) {
                    _698(_700);
                    return
                }
                _990(function() {
                    var _699 = _218.filter(function(_3) {
                        return _3.target && _1010(_3.target)
                    })[0];
                    if (!_699) return false;
                    _698(_699);
                    return true
                }, _76._1005, _76._1006)
            }

            function _1007() {
                if (!_3.forms) return [];
                var _218 = _3.forms.filter(function(_364) {
                    if (_364.formPath && _116(_364.formPath) !== _0._120) return false;
                    if (_364.redirectPath && _364.redirectPath !== _3.location.pathname) return false;
                    return true
                });
                return _218
            }

            function _1010(_17) {
                var _1 = _13.querySelector(_17.selector);
                if (!_1) return false;
                if (!_17.text) return true;
                return _1.textContent.toLowerCase().includes(_17.text.toLowerCase())
            }

            function _698(_3) {
                if (_3.result === 'success') {
                    _433()
                } else if (_3.result === 'failure') {
                    _754()
                }
            }

            function _990(_65, _693, _988) {
                var _75 = new Date();
                var _696 = function() {
                    var _989 = new Date() - _75;
                    if (_989 < _988 && !_65()) _2.setTimeout(_696, _693)
                };
                _2.setTimeout(_696, _693)
            }

            function _170(_73, _17) {
                if (!_97 || !_73) return;
                const _337 = _972(_73, _17);
                const _369 = _538(_73, _17, _337);
                if (!_369) return;
                _30(_9._73, _369);
                if (!_337) _212._951(_73._22)
            }

            function _538(_73, _17, _337) {
                let _329 = +_73._5;
                let _22 = _73._22 || 'custom-friction' + (_73._756 ? ('-' + _73._756) : '');
                if (_337) _22 += '__MUTED';
                const _558 = _0._383.findIndex(e => e._22 === _22 && e._17 === _17);
                const _563 = _558 > -1 ? _0._383[_558] : null;
                if (_563) {
                    const _968 = new Date() - _563._112;
                    if (_968 < _73._140) return;
                    _0._383.splice(_558, 1)
                }
                _0._383.push({
                    _22: _22,
                    _17: _17,
                    _112: new Date()
                });
                if ((_337 || _563) && !_22.includes('custom-friction')) _329 = 0;
                const _369 = {
                    value: _22,
                    target: _17 ? _17 : '',
                    x: _329 > 0 ? _329 : 0,
                    y: _329 < 0 ? _329 * -1 : 0,
                };
                return _369
            }

            function _972(_73, _17) {
                if (!_17 || !_73 || !_3._688.length) return false;
                const _687 = _255.get(_73._22);
                if (!_687) return false;
                const _975 = _245(_17);
                if (_282(_975, (_987) => _687.has(_987))) return true;
                return false
            }

            function _978() {
                if (_15._109.length < 2) return;
                var _249 = _15._109[_15._109.length - 2];
                var _327 = _15._109[_15._109.length - 1];
                var _221 = _116(_3.path || _3.location.pathname);
                if (_249._221 === _221 && _249._221 !== _327._221 && _0._75 - _327._75 < 10000) {
                    _451([{
                        _21: _9._73,
                        _24: _538(_92._686)
                    }, {
                        _21: _9._63,
                        _24: {
                            target: _92._686._22
                        }
                    }])
                }
            }

            function _979() {
                if (_15._109.length < 4) return;
                var _657 = _15._109[_15._109.length - 5];
                var _249 = _15._109[_15._109.length - 4];
                if (_0._75 - _249._75 < 30000) {
                    if (_657 && _249._75 - _657._75 < 30000) return;
                    _682(_249._36, [{
                        _21: _9._73,
                        _24: _538(_92._656)
                    }, {
                        _21: _9._63,
                        _24: {
                            target: _92._656._22
                        }
                    }])
                }
            }

            function _981() {
                const _232 = _441();
                const _982 = _232.responseStatus;
                if (_982 === 404) {
                    _170(_92._428);
                    return
                }
                const _983 = _3.notFoundIdentifiers.map(a => new RegExp(a, 'i')).some(a => a.test(_13.title));
                if (_983) {
                    _170(_92._428);
                    return
                }
            }

            function _427() {
                if (!_97) return;
                _212._427.apply(_212, arguments)
            }

            function _984() {
                return {
                    _61: '',
                    _74: '',
                    _183: '',
                    _298: false,
                    _651: +('ontouchstart' in _2 && _3.touchEvents),
                    _645: (navigator.doNotTrack === 'yes' || navigator.doNotTrack == 1 || window.doNotTrack == 1 || navigator.msDoNotTrack == 1) ? 1 : 0,
                    _296: 0,
                    _407: '',
                    _109: [],
                    _275: [],
                    _344: _182._810(),
                    _181: null
                }
            }

            function _623() {
                return {
                    _679: new Date(),
                    _75: +new Date(),
                    _774: null,
                    _300: +new Date(),
                    _419: +new Date(),
                    _986: false,
                    _10: [],
                    _132: [],
                    _52: [],
                    _279: [],
                    _635: [],
                    _196: [],
                    _134: [],
                    _160: [],
                    _710: 0,
                    _702: 0,
                    _203: 0,
                    _703: '',
                    _622: 0,
                    _271: [],
                    _383: [],
                    _151: {
                        x: 0,
                        y: 0
                    },
                    _594: {
                        x: 0,
                        y: 0
                    },
                    _584: {
                        x: 0,
                        y: 0
                    },
                    _641: -100,
                    _100: {
                        x: 0,
                        y: 0
                    },
                    _274: {
                        x: 0,
                        y: 0
                    },
                    _244: {},
                    _566: -100,
                    _541: -100,
                    _193: {
                        x: 0,
                        y: 0
                    },
                    _585: {
                        x: 1,
                        y: 1
                    },
                    _579: {
                        x: 0,
                        y: 0
                    },
                    _547: [],
                    _1068: 0,
                    _224: [],
                    _145: [],
                    _312: 1,
                    _512: 0,
                    _667: 0,
                    _485: {},
                    _176: [],
                    _814: 0,
                    _815: 0,
                    _816: 0,
                    _275: [],
                    _289: 0,
                    _204: 0,
                    _174: null,
                    _157: _876(),
                    _821: 0,
                    _590: 0,
                    _591: false,
                    _524: false,
                    _230: 0,
                    _631: false,
                    _633: false
                }
            }

            function _609(_19, _53) {
                var _159 = [];
                if (!_19.childNodes || !_19.childNodes.length) return _159;
                for (var _40 = _25._177(_19); _40; _40 = _25._171(_40)) {
                    if (_53 && _53(_40)) _159.push(_40);
                    _159 = _159.concat(_609(_40, _53))
                }
                return _159
            }

            function _604(_47, _53) {
                return _47.elements ? Array.from(_47.elements).filter(_53) : _609(_47, _53)
            }

            function _517(_31) {
                var _47 = _245(_31);
                var _33 = {};
                if (!_47) {
                    _7('Form not found: ' + _31, _14());
                    return _33
                }
                var _159 = _604(_47, function(_6) {
                    return /input|select|textarea/i.test(_6.tagName) && !/hidden|submit|reset|image|button/i.test(_6.type)
                });
                _159.forEach(function(_6) {
                    var _5 = _231(_6);
                    var _36 = _60(_6);
                    if (!_33[_36]) _33[_36] = _5;
                    else if (_5) _33[_36] += ', ' + _5
                });
                return _33
            }

            function _871(_31) {
                var _47 = _245(_31);
                if (!_47 || !_15._344) return;
                var _159 = _604(_47, function(_6) {
                    return /input|textarea/i.test(_6.tagName) && !/hidden|submit|reset|image|file|button|password/i.test(_6.type)
                });
                _159.forEach(function(_6) {
                    var _5 = _231(_6);
                    if (!_5 || _5.length <= 3 || _297(_5) || _508(_6)) return;
                    var _115 = _603(_5);
                    if (_115.length === 0) return;
                    var _205 = [];
                    for (let _4 = 0; _4 < _115.length; _4++) {
                        _205.push(_115[_4]._123)
                    }
                    var _202 = false;
                    for (let _4 = 0; _4 < _0._157.length; _4++) {
                        var _338 = _0._157[_4];
                        _202 = _205.length === _338.length && _628(_338, _205) === 0;
                        if (_202) break
                    }
                    if (!_202) _0._157.push(_205)
                });
                if (_0._157.length) {
                    _0._157 = _0._157.slice(-100);
                    _875(_0._157)
                }
            }

            function _875(_52) {
                _54._240('mf_replaceHashes', _52)
            }

            function _876() {
                return _54._227('mf_replaceHashes') || []
            }

            function _897(_5) {
                if (_0._157.length === 0) return _5;
                var _115 = _603(_5);
                for (var _4 = 0; _4 < _0._157.length; _4++) {
                    var _338 = _0._157[_4];
                    var _200;
                    do {
                        var _129 = _200 !== undefined ? _200 + 1 : 0;
                        _200 = _628(_115, _338, _129);
                        if (_200 !== -1) {
                            var _38 = _115[_200]._38;
                            var _265 = _115[_200 + _338.length - 1]._265;
                            var _868 = _1020('*', _265 - _38);
                            _5 = _5.slice(0, _38) + _868 + _5.slice(_265)
                        }
                    } while (_200 !== -1)
                }
                return _5
            }

            function _603(_5) {
                var _205 = [];
                var _38;

                function _613(_265) {
                    if (_38 === undefined) return;
                    var _602 = _5.slice(_38, _265);
                    _205.push({
                        _38: _38,
                        _265: _38 + _602.length,
                        _123: _116(_602)
                    });
                    _38 = undefined
                }
                for (var _4 = 0; _4 < _5.length; _4++) {
                    var _481 = _5[_4];
                    if (_1021(_481)) {
                        if (_38 === undefined) {
                            _38 = _4
                        }
                    } else {
                        _613(_4)
                    }
                }
                _613();
                return _205
            }

            function _628(_267, _115, _129) {
                for (var _4 = _129 || 0; _4 < _267.length; _4++) {
                    if (_4 + _115.length > _267.length) break;
                    if (_869(_267, _115, _4)) return _4
                }
                return -1
            }

            function _869(_267, _115, _129) {
                var _202 = false;
                for (var _4 = _129 || 0, _135 = 0; _4 < _267.length && _135 < _115.length; _4++, _135++) {
                    _202 = _267[_4]._123 === _115[_135];
                    if (!_202) break
                }
                return _202
            }

            function _231(_1) {
                var _5 = '';
                if (_1.type && /radio|checkbox/.test(_1.type.toLowerCase())) _5 = _1.checked ? _1.value : '';
                else if (_1.tagName && /select/.test(_1.tagName.toLowerCase()) && _1.options)
                    for (var j = 0; j < _1.options.length; j++) {
                        var _197 = _1.options[j].selected ? _1.options[j].value : '';
                        if (_197 && _197 != '') _5 += (_5 && _5 != '' ? ',' : '') + _197
                    } else _5 = _1.value;
                return _5 || ''
            }

            function _247(_1) {
                if (_1.type === 'password') return '*';
                var _5 = _231(_1);
                if (_638(_1)) {
                    _5 = _5.replace(/./g, _639(_1.type))
                } else if (_637(_1) && !_508(_1)) {
                    _5 = _5.slice(0, 2) + _5.slice(2).replace(/./g, _639(_1.type))
                }
                return _5
            }

            function _653(_1) {
                var _229 = _1.textContent;
                if (_1.nodeType === 3 && _25._87(_1)) _1 = _25._87(_1);
                var _652 = _897(_229);
                if (_652 !== _229 && _3.replaceLastFormValues) _229 = _652;
                if (_905(_1)) _229 = _229.replace(/./g, '*');
                return _229
            }

            function _900(_19, _10) {
                var _650 = _712(_19);
                if (_19.id) _10.attributes.id = _19.id;
                if (_19.name) _10.attributes.name = _19.name;
                _10.attributes.style = (_19.style ? _19.style.cssText + '; ' : '') + 'width: ' + _650.width + 'px; height: ' + _650.height + 'px;' + (_2.getComputedStyle(_19).display === 'inline' ? ' display: inline-block;' : '')
            }

            function _508(_1) {
                return _11._172(_1, 'mouseflow') || _648.indexOf(_1) !== -1
            }

            function _404(_1) {
                if (!_1) return false;
                if (_1[NodeMap.ID_PROP]) return !!_234(_1, _311);
                if (_282(_1, _486)) return true;
                return false
            }

            function _478(_1) {
                if (!_1) return false;
                if (_1[NodeMap.ID_PROP]) return !!_234(_1, _308);
                if (_282(_1, _468)) return true;
                return false
            }

            function _486(_1) {
                return _647.indexOf(_1) !== -1 || _11._172(_1, 'no-mouseflow-dom') || _11._172(_1, 'mf-excluded')
            }

            function _468(_1) {
                return _646.indexOf(_1) !== -1 || _11._172(_1, 'mf-masked')
            }

            function _644(_1) {
                return _11._172(_1, 'no-mouseflow') || (!_3.keyLogging && !_508(_1)) || _404(_1) || _478(_1)
            }

            function _638(_1) {
                return (_644(_1) || _297(_231(_1)) || _906(_1)) && _640(_1) && !_904.test(_1.type)
            }

            function _905(_1) {
                return (_1.isContentEditable || _1.tagName === 'TEXTAREA') && _644(_1)
            }

            function _906(_1) {
                return (_3.gdprEnabled || _3._527) && (_911(_1) || _913(_1))
            }

            function _297(_5) {
                var _526 = _5.replace(/[-\s]+/g, '');
                if (!_907.test(_526) || !_908.call(this, _526)) return false;
                return !_909.every(function(_643) {
                    if (_643.patternRegex.test(_526)) {
                        _7("Identified credit card " + _643.name);
                        return false
                    }
                    return true
                })
            }

            function _911(_1) {
                return /email/i.test(_1.type) || _912.test(_1.value)
            }

            function _913(_1) {
                return /tel/i.test(_1.type)
            }

            function _637(_1) {
                return _640(_1) && /^\d{3}[^a-z]*$/i.test(_1.value)
            }

            function _640(_1) {
                return _1.tagName === 'INPUT' || _1.tagName === 'TEXTAREA'
            }

            function _639(_899) {
                return /number/i.test(_899) ? '0' : '*'
            }

            function _1125(_35) {
                return _638(_35.target) || _637(_35.target) ? '191' : (_35.which && _35.which.toString()) || ''
            }

            function _1137(_1) {
                var _386 = _60(_1);
                var _391 = _0._635[_386];
                var _395 = _247(_1);
                var _33 = _395;
                if (_391 && _391.length > 3 && _395.indexOf(_391) === 0) _33 = '+||' + _395.substring(_391.length);
                _0._635[_386] = _395;
                return _33
            }

            function _881(_31, _529, _521) {
                try {
                    var _324 = [];
                    for (let _82 in _529) {
                        if (typeof _521[_82] == 'undefined' || _529[_82] != _521[_82]) _324.push(_82)
                    }
                    for (let _82 in _521) {
                        if (typeof _529[_82] == 'undefined' && _324.indexOf(_82) === -1) _324.push(_82)
                    }
                    for (var i = 0; i < _324.length; i++) {
                        _30(_9._576, {
                            target: _324[i]
                        })
                    }
                } catch (_59) {
                    _7('Error in _addChangedFieldEvents: ' + _59.message, _14())
                }
            }

            function _885(_31) {
                try {
                    var _331 = _886(_31);
                    for (var i = 0; i < _331.length; i++) {
                        _30(_9._572, {
                            target: _331[i]
                        })
                    }
                } catch (_59) {
                    _7('Error in getBlankFields: ' + _59.message, _14())
                }
            }

            function _886(_31) {
                var _331 = [];
                var _52 = _517(_31);
                for (var _82 in _52)
                    if (_52[_82] == '') _331.push(_82);
                return _331
            }

            function _439(_1) {
                if (_513.includes(_1)) return null;
                return _1.form || _513.filter(function(_47) {
                    return _47.contains(_1)
                })[0] || null
            }

            function _1161() {
                _889();
                _892()
            }

            function _528() {
                _891();
                _642()
            }

            function _889() {
                var _632 = _734('mf_user').split('|');
                for (var _4 = 0; _4 < _632.length; _4++) {
                    var _95 = _632[_4];
                    switch (_4) {
                        case 0:
                            _15._183 = _95;
                            break;
                        case 1:
                            _15._275 = _95 !== '' ? _95.split(/[$,]+/) : [];
                            break
                    }
                }
                _15._298 = _15._183 !== '';
                if (_15._183 === '' || _15._183 === '1') _15._183 = _445();
                _0._631 = true
            }

            function _891() {
                if (!_0._631) return;
                _713('mf_user', [_15._183, _15._275.join('$')].join('|'), 1, _11._323(_70, _3))
            }

            function _892() {
                var _630 = _734('mf_' + _3._51).split('|');
                for (var _4 = 0; _4 < _630.length; _4++) {
                    var _95 = _630[_4];
                    switch (_4) {
                        case 0:
                            _15._61 = _95;
                            break;
                        case 1:
                            _15._109 = _1160(_95, _15._74);
                            break;
                        case 2:
                            _0._419 = parseInt(_95, 10);
                            break;
                        case 3:
                            _0._176 = _95 !== '' ? _95.split('.') : [];
                            break;
                        case 4:
                            _15._296 = parseInt(_95, 10);
                            break;
                        case 5:
                            _0._120 = _95;
                            break;
                        case 6:
                            _0._142 = parseInt(_95, 10);
                            break;
                        case 7:
                            _0._275 = _95 !== '' ? _95.split(/[$,]+/) : [];
                            break;
                        case 8:
                            _15._298 = _95 === '1';
                            break;
                        case 9:
                            _0._230 = _95;
                            break;
                        case 10:
                            _15._181 = parseFloat(_95);
                            break
                    }
                }
                if (!_15._61) _15._61 = _3.sessionId || _1004();
                if (!_15._181) _15._181 = _1013();
                var _327 = _15._109[_15._109.length - 1];
                if (_327) _15._407 = _327._36;
                _0._633 = true
            }

            function _1004() {
                var sessionId = _600();
                return sessionId && sessionId.length === 32 ? sessionId : null
            }

            function _1013() {
                var recordingRate = _600();
                return /^\d+\.\d+$/.test(recordingRate) ? parseFloat(recordingRate) : null
            }

            function _600() {
                return _3.crossDomainSupport && _2.name && _2.name.indexOf('mf_' + _3._51) === 0 ? _2.name.split('=')[1] : null
            }

            function _642() {
                if (!_0._633) return;
                _713('mf_' + _3._51, [_15._61, _1148(), _0._419, _0._176.join('.'), _15._296, _0._120 || '', _0._142 || '', _0._275.join('$'), _15._298 ? '1' : '0', _0._230, _15._181].join('|'), 0, _11._323(_70, _3));
                if (_3.crossDomainSupport) _2.name = 'mf_' + _3._51 + '=' + (_15._61 || _15._181)
            }

            function _1160(_5, _74) {
                return _5.split(/[$,]+/).map(function(_57) {
                    var _52 = _57.split('.');
                    return {
                        _36: _52[0],
                        _221: _52[1],
                        _75: +_52[2]
                    }
                }).filter(function(p) {
                    return p._36 !== _74
                }).slice(-5)
            }

            function _1148() {
                var _515 = _15._109;
                if (_15._74) {
                    _515 = _515.concat([{
                        _36: _15._74,
                        _221: _116(_3.path || _3.location.pathname),
                        _75: _0._75
                    }]).slice(-6)
                }
                return _515.map(function(_57) {
                    return _57._36 + '.' + _57._221 + '.' + _57._75
                }).join('$')
            }
            var _394 = '__mouseflow_properties__';
            var _311 = 'is-blacklisted';
            var _308 = 'is-masked';

            function _234(_19, _16) {
                if (!_19) return null;
                var _235 = _19[_394];
                return _235 ? _235[_16] : null
            }

            function _305(_19, _16, _5, _1144) {
                var _235 = _19[_394];
                if (!_235) _235 = _19[_394] = {};
                _235[_16] = _5;
                if (_1144 && _19.childNodes && _19.childNodes.length) {
                    for (var _40 = _25._177(_19); _40; _40 = _25._171(_40)) {
                        _305(_40, _16, _5, true)
                    }
                }
            }

            function _634(_19) {
                delete _19[_394];
                if (_19.childNodes && _19.childNodes.length) {
                    for (var _40 = _25._177(_19); _40; _40 = _25._171(_40)) {
                        _634(_40)
                    }
                }
            }

            function _1145() {
                _634(_13.body)
            }

            function _1147() {
                _0._75 = +new Date();
                _0._300 = +new Date();
                _488 = _26._368(_577, _76._629);
                _506 = _26._368(_1074, _76._1149);
                _507 = _26._368(_452, _76._1151);
                _303 = _26._72(_140, _76._460)
            }

            function _1092() {
                if (!_722(_3.location.hostname)) return false;
                if (_742()) {
                    _7('Recording not started - browser is IE8 or older');
                    return false
                }
                return _636()
            }

            function _636() {
                _1161();
                if (_3.forceStart) return true;
                if (_1150()) {
                    _7('Recording not started - session ID is invalid.', _14());
                    return false
                }
                if (_1159()) {
                    _7('Recording not started - honored "do not track" browser setting.', _14());
                    return false
                }
                if (_1139()) {
                    _7('Recording not started - the browser was identified as a bot.', _14());
                    return false
                }
                if (!_325._553(_180)) {
                    _7('Recording not started - page does not match page rules', _14());
                    return false
                }
                var _405 = _1152.filter(function(_69) {
                    return _325._258(_69)
                }).sort(_1155)[0];
                if (_405) {
                    _262 = _405._262;
                    _7('Recording rate set from page recording rule: ' + _405._21 + ', "' + _405._5 + '"', _14())
                }
                if (!_15._181) _15._181 = _1158();
                var _654 = _15._61 || _15._181 <= _262;
                if (!_654) _7('Recording not started - recordingRate or blocked', _14());
                _642();
                return _654
            }

            function _1155(_1157, _1156) {
                return _1156._262 - _1157._262
            }

            function _1158() {
                return _105.round(_105.random() * 10000000) / 100000
            }

            function _1159() {
                return _3.honorDoNotTrack && _15._645
            }

            function _1150() {
                return _15._61 && _15._61.length != 32
            }

            function _1139() {
                if (_3.enableBots) return false;
                return _2.navigator.webdriver || /ptst|headlesschrome|lighthouse/i.test(_2.navigator.userAgent)
            }

            function _1126() {
                return (_15._296 < _76._1117)
            }

            function _1118(_112) {
                return _390(_112.getMonth() + 1, 2) + _390(_112.getDate(), 2) + _390(_112.getSeconds(), 2) + _390(_112.getMilliseconds(), 3).slice(1) + _445()
            }

            function _390(_1120, _198) {
                return (new Array(_198 + 1).join('0') + _1120).slice(-_198)
            }

            function _1121() {
                var _649 = new Date();
                return _105.max(new Date(_649.getFullYear(), 0, 1).getTimezoneOffset(), new Date(_649.getFullYear(), 6, 1).getTimezoneOffset())
            }
            var _606 = false;

            function _1123() {
                try {
                    _533(_13);
                    _102(_13, 'mousemove', function(_6) {
                        _0._151 = {
                            x: _6.pageX,
                            y: _6.pageY
                        }
                    });
                    _560(_13.documentElement, 'mouseleave', function() {
                        _30(_9._1014, {});
                        _63('mouse-out')
                    });
                    _102(_13, 'mousedown', function(_6) {
                        _1051(_6, _6.target)
                    });
                    _102(_13, 'mouseup', function(_6) {
                        _1053(_6, _6.target)
                    });
                    _620(_13, 'click', _615, function(_6) {
                        _1054(_6, _6.delegatedTarget || _6.target);
                        if (!_6.delegatedTarget) {
                            const stylesBeforePotentialMutation = { ..._619(_6.target)
                            };
                            if (_3.enableDeadClick) _26._72(() => _1135(_6, stylesBeforePotentialMutation), 1)
                        }
                    });
                    try {
                        var _491 = _1018();
                        if (_491) {
                            _560(_13, 'mouseenter', _491, function(_6) {
                                var _207 = _341(_9._251).filter(function(_77) {
                                    return _6.delegatedTarget && _6.delegatedTarget.matches(_77._8)
                                })[0];
                                if (_207) _63(_207._63);
                                _30(_9._251, {
                                    x: _6.pageX,
                                    y: _6.pageY,
                                    target: _60(_6.target)
                                })
                            });
                            _560(_13, 'mouseleave', _491, function(_6) {
                                _30(_9._356, {
                                    x: _6.pageX,
                                    y: _6.pageY,
                                    target: _60(_6.target)
                                })
                            })
                        }
                    } catch (_59) {
                        _7('Error in getHoverSelectors: ' + _59.message, _14())
                    }
                    _102(_13, 'focus', 'input,textarea,select,button', function(_6) {
                        _30(_9._601, {
                            target: _60(_6.target)
                        })
                    });
                    _102(_13, 'blur', 'input,textarea,select,button', function(_6) {
                        _30(_9._655, {
                            target: _60(_6.target)
                        })
                    });
                    _102(_13, 'keypress', 'input,textarea,select', function(_6) {
                        if (_6.target && _6.target.type !== 'password') {
                            _30(_9._465, {
                                target: _60(_6.target)
                            })
                        }
                    });
                    _102(_13, 'keydown', 'input,textarea,select', function(_6) {
                        if (_6.target && _6.target.type !== 'password') {
                            _30(_9._381, {
                                target: _60(_6.target),
                                value: _1125(_6)
                            })
                        }
                    });
                    _102(_13, 'keyup', 'input,textarea,select', function(_6) {
                        if (_6.target && _6.target.type !== 'password') {
                            _30(_9._357, {
                                target: _60(_6.target),
                                value: _1137(_6.target)
                            });
                            if (_297(_231(_6.target)) && _3.autoTagPayments) _63('payment')
                        }
                    });
                    _102(_13, 'change', 'input,textarea,select', function(_6) {
                        _30(_9._285, {
                            target: _60(_6.target),
                            value: _247(_6.target)
                        });
                        if (_6.target && ['password', 'file'].indexOf(_6.target.type) === -1 && _297(_231(_6.target)) && _3.autoTagPayments) _63('payment')
                    });
                    _534(_13);
                    if (_15._651) {
                        _102(_13, 'touchstart', function(_6) {
                            var _99 = _6.touches;
                            if (_99.length > 0) {
                                _30(_9._471, {
                                    x: _99[0].pageX,
                                    y: _99[0].pageY
                                })
                            }
                            if (_99.length > 1) {
                                _30(_9._426, {
                                    x: _99[1].pageX,
                                    y: _99[1].pageY
                                })
                            }
                        });
                        _102(_13, 'touchmove', function(_6) {
                            var _99 = _6.touches;
                            var _385 = _14();
                            var _495 = _385 - _76._629;
                            if (_99.length > 0 && _0._641 < _495) {
                                _30(_9._446, {
                                    x: _99[0].pageX,
                                    y: _99[0].pageY
                                });
                                if (_99.length > 1) {
                                    _30(_9._431, {
                                        x: _99[1].pageX,
                                        y: _99[1].pageY
                                    })
                                }
                                _0._641 = _385;
                                var _1132 = !_179(_393(), _0._193);
                                if (_1132) {
                                    _0._193 = _393();
                                    _30(_9._374, _0._193);
                                    if (_0._541 < _495) {
                                        _30(_9._374, _0._193);
                                        _0._541 = _385
                                    }
                                }
                                _0._100 = {
                                    x: _2.pageXOffset,
                                    y: _2.pageYOffset
                                };
                                if (_0._566 < _495 && !_179(_0._100, _0._274)) {
                                    _0._274 = _0._100;
                                    _30(_9._378, _0._100);
                                    _0._566 = _385
                                }
                            }
                        });
                        _102(_13, 'touchend', function(_6) {
                            var _99 = _6.touches;
                            if (_99.length === 0) _30(_9._376, {
                                x: 0,
                                y: 0
                            });
                            if (_99.length > 1) _30(_9._430, {
                                x: 0,
                                y: 0
                            })
                        });
                        if (_2.screen.orientation) {
                            _102(_2.screen.orientation, 'change', function() {
                                _30(_9._424, {
                                    x: _2.screen.orientation.angle,
                                    y: 0
                                })
                            })
                        }
                    }
                    _102(_2, _1031(), function() {
                        _62()
                    });
                    var _605 = _2.onerror;
                    _2.onerror = function(_146, _20, _540, _537, _498) {
                        var _1133 = new Date() - _0._204;
                        if (_1133 > 1000 && _0._289 < 50) {
                            _0._204 = +new Date();
                            var _497 = 'Malformed error';
                            if (_146 && _146.message) _497 = _146.message;
                            else if (typeof _146 === 'string') _497 = _146;
                            _0._174 = {
                                _146: _497,
                                _20: typeof _20 === 'string' ? _20 : 'Malformed URL',
                                _540: '' + _540,
                                _537: '' + _537,
                                _1101: _498 && _498.stack && _498.stack.substring(0, 800),
                                _1212: _0._204
                            };
                            if (_0._203 !== 0 && _0._204 - _0._203 < 100) {
                                _170(_92._707, _0._703);
                                _708()
                            }
                        }
                        if (_605) _605.apply(this, arguments)
                    };
                    if (!_606) {
                        if (_3.proxyAttachShadow) _365();
                        _625();
                        _1169();
                        if (_3.enableSpa) {
                            _401.proxyPushState(_423)
                        }
                        if (_3.proxyValueSetter) _683();
                        _606 = true
                    }
                    if (_3.keyLogging) _1043()
                } catch (_59) {
                    _7('Error in bindDomEvents: ' + _59.message, _14())
                }
            }

            function _1135(_6, _607) {
                if (_611(_6)) return;
                if (_504(_6.target)) return;
                const _1136 = _2.getSelection();
                const _1138 = (_626(_6.target) || _1202(_607) || _504(_6.target) || _1197(_6.target) || _611(_6) || _1136.type === 'Range');
                if (_1138) return;
                if (_1203(_6.target, _607) || _1205(_6.target, _6.clientX, _6.clientY) || _1196(_6.target)) {
                    _608(_6.target);
                    return
                }
                const _211 = _617(_6.target);
                if (_211) {
                    _608(_6.target, _211)
                }
            }

            function _608(_17, _1162 = null) {
                const _386 = _60(_17);
                _170(_92._351, _386);
                _1163(_1162 ? ? _17)
            }

            function _1163(_1190) {
                if (!_3.debugDeadClick) {
                    if (_499) {
                        for (const _1 of _13.getElementsByClassName(_290)) {
                            _1.classList.remove(_290)
                        }
                    }
                    return
                }
                if (!_499) {
                    const _58 = _13.createElement('style');
                    _58.textContent = `.${_290}{outline:solid red}`;
                    _13.head.append(_58);
                    _499 = true
                }
                const _55 = new Set([..._13.getElementsByClassName(_290), _1190]);
                for (const _1 of _55) {
                    _1.classList.toggle(_290)
                }
            }

            function _612(_610) {
                return _610 === 'true' || _610 === 'plaintext-only'
            }

            function _611(_6) {
                const _1192 = _6.target.getAttribute('contenteditable');
                if (_612(_1192)) {
                    return true
                }
                const _1193 = _6.target.closest('[contenteditable]');
                const _1195 = _1193 ? .getAttribute('contenteditable');
                if (_612(_1195)) {
                    return true
                }
            }

            function _1196(_1) {
                return _1 && _1.tagName === 'I'
            }

            function _504(_1) {
                return _1 && _1.tagName === 'LABEL' && _1.control && _626(_1.control)
            }

            function _1197(_1) {
                const _614 = _1.closest('label');
                return _614 && _504(_614)
            }

            function _626(_1) {
                return _1.matches(_615)
            }

            function _1202(_293) {
                return _293.cursor && _293.cursor !== 'default' && _293.cursor !== 'auto'
            }

            function _1203(_1, _293) {
                return _1.tagName === 'IMG' || _1 instanceof SVGElement || _293.backgroundImage ? .startsWith('url')
            }

            function _1205(_1, x, y) {
                for (const node of _1.childNodes) {
                    if (node.nodeType !== Node.TEXT_NODE) {
                        continue
                    }
                    const _616 = _13.createRange();
                    _616.selectNodeContents(node);
                    for (const rect of _616.getClientRects()) {
                        if (rect.left < x && rect.right > x && rect.top < y && rect.bottom > y) {
                            return true
                        }
                    }
                }
                return false
            }

            function _617(_1, _618 = 1) {
                if (!_1 || _618 > 5) return null;
                const _58 = _619(_1);
                const _1207 = parseInt(_58.borderWidth, 10);
                const _1208 = parseInt(_58.outlineWidth, 10);
                if (_1207 > 0 || _1208 > 0) return _1;
                return _617(_1.parentElement, _618 + 1)
            }

            function _619(_1) {
                let _58 = _294.get(_1);
                if (_58) return _58;
                _58 = _2.getComputedStyle(_1);
                _294.set(_1, _58);
                if (_294.size > 100) _294.delete(_294.keys().next().value);
                return _58
            }

            function _533(_34) {
                _620(_34, 'scroll', 'body,div,section,main,article,ul,.mf-scroll-listen', function(_6) {
                    if (_6.target === _13) {
                        _0._100 = {
                            x: _2.pageXOffset,
                            y: _2.pageYOffset
                        }
                    } else if (_6.target === _414) {
                        _0._100 = {
                            x: _6.target.scrollLeft,
                            y: _6.target.scrollTop
                        }
                    } else {
                        _1060(_60(_6.target), _6.target.scrollLeft, _6.target.scrollTop)
                    }
                })
            }

            function _534(_34) {
                _102(_34, 'click', '.mf-form-button', function(_6) {
                    _559(_60(_439(_6.target)))
                });
                _102(_34, 'submit', 'form', function(_6) {
                    _559(_60(_6.target))
                })
            }

            function _102(_17, _9, _53, _65) {
                _23._43(_17, _9, _53, _65, {
                    _91: true
                })
            }

            function _560(_17, _9, _53, _65) {
                _23._43(_17, _9, _53, _65, {
                    _91: true,
                    _416: true
                })
            }

            function _620(_17, _9, _53, _65) {
                _23._43(_17, _9, _53, _65, {
                    _91: true,
                    _870: true
                })
            }

            function _1169() {
                var _1170 = CSSStyleSheet.prototype.insertRule;
                var _621;
                var _260 = [];
                CSSStyleSheet.prototype.insertRule = function() {
                    _1170.apply(this, arguments);
                    if (!_185) return;
                    var _19 = this.ownerNode;
                    if (_260.indexOf(_19) < 0) _260.push(_19);
                    _26._148(_621);
                    _621 = _26._72(function() {
                        _260 = _260.filter(function(_19) {
                            return _19 && _121.isKnownNode(_19)
                        });
                        _121.applyChanged([{
                            characterDataChanged: _260
                        }]);
                        _260 = []
                    }, 200)
                }
            }
            var _557 = HTMLElement.prototype.attachShadow;
            var _380 = false;

            function _1172() {
                var _75 = new Date();
                var _1175 = _2.setInterval(function() {
                    var _1173 = new Date() - _75;
                    if (HTMLElement.prototype.attachShadow !== _557 || _1173 > 10000) {
                        _2.clearInterval(_1175);
                        _365()
                    }
                }, 200)
            }

            function _1185() {
                if (!_380 || HTMLElement.prototype.attachShadow !== _624) return;
                _7('Resetting "attach shadow" proxy');
                delete HTMLElement.prototype.attachShadow;
                _380 = false
            }

            function _365() {
                if (_380) return;
                if (!_185) {
                    _2.setTimeout(_365, 200);
                    return
                }
                _7('Setting up "attach shadow" proxy');
                _379(_13.body);
                _557 = HTMLElement.prototype.attachShadow;
                HTMLElement.prototype.attachShadow = _624;
                _380 = true
            }

            function _624() {
                var _118 = _557.apply(this, arguments);
                if (_185 && _121.isKnownNode(this)) {
                    _533(_118);
                    _534(_118);
                    _121.addShadowRoot(_118)
                }
                return _118
            }

            function _379(_1) {
                for (; _1; _1 = _1.nextElementSibling) {
                    if (_1.shadowRoot) {
                        _533(_1.shadowRoot);
                        _534(_1.shadowRoot);
                        _121.addShadowRoot(_1.shadowRoot);
                        _379(_1.shadowRoot.firstElementChild)
                    }
                    _379(_1.firstElementChild)
                }
            }

            function _625() {
                if (!_185) {
                    _2.setTimeout(_625, 200);
                    return
                }
                _292(Document.prototype, 'adoptedStyleSheets', {
                    _126: _627
                });
                _292(ShadowRoot.prototype, 'adoptedStyleSheets', {
                    _126: _627
                })
            }

            function _627() {
                if (!_185) return;
                _121.applyChanged([{
                    attributeChanged: {
                        'mf_adoptedStyleSheets': [this]
                    }
                }])
            }

            function _683() {
                if (!_185) {
                    _2.setTimeout(_683, 200);
                    return
                }
                _292(HTMLInputElement.prototype, 'value', {
                    _126: _544
                });
                _292(HTMLTextAreaElement.prototype, 'value', {
                    _126: _544
                });
                _292(HTMLSelectElement.prototype, 'value', {
                    _126: _544
                })
            }

            function _544() {
                if (!_121.isKnownNode(this)) return;
                _121.applyChanged([{
                    attributeChanged: {
                        'value': [this]
                    }
                }])
            }

            function _292(_19, _689, _273) {
                var _484 = Object.getOwnPropertyDescriptor(_19, _689);
                if (!_273 || !_484) return;
                Object.defineProperty(_19, _689, {
                    get: function() {
                        var _5 = _484.get.apply(this, arguments);
                        if (_273._168) _273._168.apply(this, arguments);
                        return _5
                    },
                    set: function() {
                        _484.set.apply(this, arguments);
                        if (_273._126) _273._126.apply(this, arguments)
                    }
                })
            }

            function _708() {
                if (_0._174) {
                    _0._289++;
                    var _10 = {
                        seq: _0._289,
                        errorMsg: _0._174._146,
                        url: _0._174._20,
                        line: _0._174._540,
                        col: _0._174._537,
                        stack: _0._174._1101,
                        errorTime: _0._204
                    };
                    _30(_9._71, {
                        x: _0._289,
                        y: 0
                    });
                    _7('JS error ' + _0._289 + ', msg: ' + _0._174._146, _14());
                    _352('error', _10);
                    _0._174 = null
                }
            }

            function _593() {
                _23._845();
                if (_568) _26._214(_568)
            }

            function _1043() {
                _0._279 = _690();
                _568 = _26._368(function() {
                    _1049(_1048(_690(), _0._279))
                }, 200)
            }

            function _690() {
                var _691 = _13.querySelectorAll('input,textarea,select');
                var _692 = {};
                for (var i = 0; i < _691.length; i++) {
                    var _82 = _691[i];
                    if (_11._172(_82, 'no-mouseflow')) continue;
                    if (!_1046(_82, ['text', 'textarea', 'select-one'])) continue;
                    _692[_60(_82)] = _247(_82)
                }
                return _692
            }

            function _1046(_82, _1047) {
                return _82.type && new RegExp(_1047.join('|'), 'i').test(_82.type)
            }

            function _1048(_279, _695) {
                var _304 = [];
                for (var _16 in _279) {
                    var _5 = _279[_16];
                    var _694 = _695[_16];
                    if (_694 !== undefined && _694 !== _5) _304.push({
                        id: _16,
                        value: _5
                    });
                    _695[_16] = _5
                }
                return _304
            }

            function _1049(_304) {
                if (_14() - _0._667 > 100) {
                    for (var i = 0; i < _304.length; i++) {
                        var _46 = _304[i];
                        _30(_9._285, {
                            target: _46.id,
                            value: _46.value
                        })
                    }
                }
            }

            function _1051(_6, _1) {
                if ((+new Date()) - _0._710 < 20) return;
                _0._710 = +new Date();
                _30(_9._415, {
                    x: _6.pageX,
                    y: _6.pageY,
                    target: _60(_1)
                })
            }

            function _1053(_6, _1) {
                if ((+new Date()) - _0._702 < 20) return;
                _0._702 = +new Date();
                var _165 = _500(_1, _6.pageX, _6.pageY);
                if (!_165 && _1.firstElementChild) _165 = _500(_1.firstElementChild, _6.pageX, _6.pageY);
                if (_165) _30(_9._420, {
                    x: _165.x,
                    y: _165.y,
                    target: _60(_1)
                })
            }

            function _1054(_6, _1) {
                if ((+new Date()) - _0._203 < 20) return;
                var _17 = _60(_1);
                _0._203 = +new Date();
                _0._703 = _17;
                _30(_9._256, {
                    x: _6.pageX,
                    y: _6.pageY,
                    target: _17
                });
                _0._271.push(_0._203);
                _0._271 = _0._271.slice(-5);
                if (_0._271[4] - _0._271[0] < 1000) {
                    _170(_92._370, _17);
                    _0._271 = []
                }
                if (_0._203 !== 0 && _0._204 !== 0 && _0._203 - _0._204 < 100) {
                    _170(_92._707, _17);
                    _708()
                }
                var _207 = _341(_9._256).filter(function(_77) {
                    return _1.matches(_77._8)
                })[0];
                if (_207) {
                    _63(_207._63);
                    if (_207._213) setTimeout(() => _423(_207._213, null, true), 1)
                }
            }

            function _1060(_36, _1061, _1040) {
                _0._244[_36] = {
                    x: _1061,
                    y: _1040
                };
                if (_358) return;
                _358 = _26._72(_697, 100);

                function _697() {
                    _358 = null;
                    var _685 = true;
                    for (var _17 in _0._244) {
                        if (Object.prototype.hasOwnProperty.call(_0._244, _17)) {
                            _30(_9._479, {
                                x: _0._244[_17].x,
                                y: _0._244[_17].y,
                                target: _17
                            });
                            _685 = false
                        }
                    }
                    if (!_685) {
                        _0._244 = {};
                        _358 = _26._72(_697, 100)
                    }
                }
            }

            function _500(_19, _1037, _1016) {
                var _45 = _712(_19);
                if (_45 == null || !_45.height || !_45.width) return null;
                return {
                    x: parseInt((_1037 - _0._100.x - _45.x) / parseFloat(_45.width) * 65535),
                    y: parseInt((_1016 - _0._100.y - _45.y) / parseFloat(_45.height) * 65535)
                }
            }

            function _1017() {
                const _37 = ['a', 'input', 'select', 'button', 'textarea', '.mf-listen-click'];
                _37.push.apply(_37, _663(_341(_9._256)));
                return _37.slice(0, 1000).join(',')
            }

            function _1018() {
                var _659 = {};
                var _658 = /[^(]:hover/;
                if (_3.useAllHoverSelectors) {
                    for (var _4 = 0; _4 < _13.styleSheets.length; _4++) {
                        var _149 = _13.styleSheets[_4];
                        try {
                            var _237 = _149.cssRules ? _149.cssRules : _149.rules;
                            for (var _135 = 0; _135 < _237.length; _135++) {
                                var _684 = _149.cssRules[_135];
                                if (!_658.test(_684.selectorText)) continue;
                                let _37 = _684.selectorText.split(',');
                                var _8;
                                for (var _476 = 0; _476 < _37.length; _476++) {
                                    _8 = _37[_476].replace(/^\s+|\s+$/g, '');
                                    if (_658.test(_8)) {
                                        _8 = _8.substring(0, _8.indexOf(':hover'));
                                        _8 = _1029(_8);
                                        _659[_8] = true
                                    }
                                }
                            }
                        } catch (_59) {
                            _7('Cannot inspect external css file, :hover support may fail: ' + _149.href)
                        }
                    }
                }
                let _37 = ['a', 'input', 'select', 'button', 'textarea', 'li', 'canvas', '.mf-listen'];
                for (_8 in _659) {
                    _8 = _8.replace(/^\s+|\s+$/g, '');
                    if (_8 != '' && _8 != 'a' && !_287(_8, ' a') && !_287(_8, ' select') && !_287(_8, ' submit') && !_287(_8, ' textarea') && !_287(_8, ' li')) _37.push(_8)
                }
                _37.push.apply(_37, _3._336);
                _37.push.apply(_37, _663(_341(_9._251)));
                return _37.slice(0, 1000).join(',')
            }

            function _341(_1026) {
                var _1025 = {
                    5: 'Click',
                    6: 'Mouseover'
                };
                let _660 = _88._139();
                var _662 = _3._661.filter(function(_448) {
                    return _448._213 === _660
                }).map(function(_448) {
                    return _448._153
                });
                _662.push(_660);
                var _454 = _3._661.filter(function(_77) {
                    return _77._35 === _1025[_1026] && (!_77._153 || _77._153 === _3.location.href || _662.includes(_77._153))
                });
                return _454
            }

            function _663(_454) {
                return _454.map(function(_77) {
                    return _77._8
                })
            }

            function _282(_19, _455, _470, _286) {
                if (!_19 || !_455) return null;
                if (_455(_19)) return _19;
                if (!_286) _286 = 0;
                _286 += 1;
                if (_470 && _286 >= _470) return null;
                return _282(_25._87(_19), _455, _470, _286)
            }

            function _1029(_46) {
                var _666 = [/:active/g, /:visited/g, /::before/g, /:before/g, /::after/g, /:after/g, /::first-letter/g, /::first-line/g, /::selection/g];
                for (var _4 = 0; _4 < _666.length; _4++) _46 = _46.replace(_666[_4], '');
                return _46
            }

            function _108(_1030) {
                try {
                    return _2.encodeURIComponent(_1030)
                } catch (_59) {
                    _7('Encode error: ' + _59.message, _14());
                    return ''
                }
            }

            function _1087(_5) {
                return _5.replace(/%/g, '%25').replace(/\|{3}/g, '%7C%7C%7C')
            }

            function _30(_21, _24) {
                if (!_97) return;
                if (_0._10.length === 0) _0._300 = +new Date();
                var _41 = _672(_21, _24, _0._196, _0._52, _863());
                if (!_41) return;
                if (_1107(_21)) {
                    _26._148(_303);
                    _303 = _26._72(_140, _76._460);
                    _0._512 = _14();
                    _0._419 = +new Date()
                }
                if (_582(_21)) _0._667 = _14();
                if (_1032(_41)) {
                    _411();
                    if (_41._5 !== undefined) _41._10[_41._10.length - 1] = 0;
                    _0._10 = _41._10;
                    _0._10[0] = 0;
                    _0._10[1] = 0;
                    if (_41._141 !== undefined) _0._134.push(_41._141);
                    if (_41._5 !== undefined) _0._52.push(_41._5);
                    if (_41._173 !== undefined) _0._160.push(_41._173)
                } else {
                    _0._10 = _0._10.concat(_41._10);
                    if (_41._141 !== undefined) _0._134.push(_41._141);
                    if (_41._5 !== undefined) _0._52.push(_41._5);
                    if (_41._173 !== undefined) _0._160.push(_41._173);
                    if (_21 === _9._376) {
                        _411()
                    }
                }
            }

            function _1032(_41) {
                const _1033 = _792(_0._134) + (_41._141 ? _403.encode(_41._141).length : 0);
                const _1034 = _792(_0._52) + (_41._5 ? _403.encode(_41._5).length : 0);
                const _1035 = _0._10.length + _41._10.length + _1033 + _1034;
                return _1035 > _76._673
            }

            function _451(_447, _190) {
                _682(_15._407, _447, _190)
            }

            function _682(_74, _447, _190 = 0) {
                var _10 = [],
                    _196 = [],
                    _134 = [],
                    _52 = [],
                    _160 = [];
                let _463 = 0;
                _447.forEach(function(_35, _50) {
                    if (!_35._24) _35._24 = {};
                    _463 = _50 + 1;
                    var _41 = _672(_35._21, _35._24, _196, _52, _463);
                    if (!_41) return;
                    _10 = _10.concat(_41._10);
                    if (_41._141 !== undefined) _134.push(_41._141);
                    if (_41._5 !== undefined) _52.push(_41._5);
                    if (_41._173 !== undefined) _160.push(_41._173)
                });
                const _169 = _578(_190, _10, _134, _52, _160);
                const _1063 = _190 + _463;
                const _464 = {
                    _20: _192 + 'events?w=' + _3._51 + '&s=' + _15._61 + '&p=' + _74 + '&v=' + _210 + '&pst=' + _277() + '&li=' + _1063 + '&lh=0&ls=0'
                };
                if (_3._421) {
                    _464._10 = 'd=' + _169
                } else {
                    _464._20 += '&d=' + _169
                }
                _147(_464)
            }

            function _672(_21, _24, _196, _52, _1065) {
                var _141;
                var _5 = _24.value;
                var _173;
                var _392 = -1;
                var _10 = [];
                _10._794 = false;
                if (_1098(_21) && !_1099(_24)) return null;
                if (_24.value && _24.value.length > _76._673) {
                    _7('Event, type: ' + _21 + ', skipping due to large value, details: ' + _11._122(_24), _14());
                    return null
                }
                _156(2, _1065, _10);
                _156(1, _21, _10);
                if (_24.x < 0) _24.x = 0;
                if (_24.y < 0) _24.y = 0;
                if (_24.x > 65534) _24.x = 65534;
                if (_24.y > 65534) _24.y = 65534;
                if (_24.x != undefined) _156(2, _24.x, _10);
                if (_24.y != undefined) _156(2, _24.y, _10);
                if (_24.target != undefined) {
                    if (typeof _24.target == 'object' && _24.target.id != undefined) _24.target = _24.target.id;
                    if (_21 !== _9._63 && _24.target && _24.target.indexOf('||') === -1) {
                        var _1 = _245(_24.target);
                        if (_1) {
                            if (_404(_1)) return null;
                            if (_478(_1)) {
                                _24.target = _60(_282(_1, _468))
                            }
                            var _47 = _439(_1);
                            if (_47 && !_404(_47)) _24.target = _60(_47) + '||' + _24.target
                        }
                    }
                    for (var _4 = 0; _4 < _196.length; _4++) {
                        if (_196[_4] === _24.target) {
                            _392 = _4;
                            break
                        }
                    }
                }
                if (_1100(_21)) {
                    if (!_24.target) {
                        _156(2, 65535, _10)
                    } else if (_392 === -1) {
                        var _676 = _196.length;
                        _156(2, _676, _10);
                        _141 = _676 + ':' + _24.target;
                        _196.push(_24.target)
                    } else {
                        _156(2, _392, _10);
                        _173 = _392 + ':' + _24.target
                    }
                }
                if (_21 !== _9._377 && _21 !== _9._283) _7('Event, type: ' + _21 + ', time: ' + _14() + ', details: ' + _11._122(_24), _14());
                if (_1106(_21)) {
                    if (_5 instanceof Array) _5 = _5.join(', ');
                    _156(1, _52.length, _10)
                }
                if (_10._794) {
                    _7('Event, type: ' + _21 + ', skipping due to overflow in temp data, details: ' + _11._122(_24), _14());
                    return null
                }
                return {
                    _10: _10,
                    _141: _141,
                    _5: _5,
                    _173: _3._421 ? _173 : undefined
                }
            }

            function _863() {
                return +new Date() - _0._300
            }

            function _1096() {
                const _232 = _441();
                const _288 = _0._679 - (_232.domLoading ? ? 0);
                return Math.ceil(_288)
            }

            function _789() {
                const _232 = _441();
                const _288 = (_232.loadEventStart ? ? 0) - (_232.fetchStart ? ? 0);
                return Math.ceil(_288)
            }

            function _441() {
                const _680 = _2.performance.getEntriesByType('navigation');
                return _680[_680.length - 1] ? ? {}
            }

            function _1098(_21) {
                return [_9._374, _9._378, _9._377, _9._415, _9._420, _9._256, _9._251, _9._356, _9._748, _9._71, _9._471, _9._446, _9._376, _9._424, _9._426, _9._431, _9._430, _9._434, _9._599, _9._556, _9._575, _9._546, _9._42, _9._479, _9._283, _9._73, _9._266, _9._587].indexOf(_21) !== -1
            }

            function _1099(_24) {
                return _24.x !== undefined && _24.y !== undefined && !isNaN(_24.x) && !isNaN(_24.y)
            }

            function _1100(_21) {
                return [_9._415, _9._420, _9._256, _9._251, _9._356, _9._465, _9._357, _9._285, _9._601, _9._655, _9._417, _9._63, _9._434, _9._556, _9._546, _9._381, _9._572, _9._576, _9._479, _9._283, _9._73].indexOf(_21) !== -1
            }

            function _1106(_21) {
                return [_9._357, _9._285, _9._381, _9._73].indexOf(_21) !== -1
            }

            function _1107(_21) {
                return _1108(_21) || _582(_21) || _1089(_21)
            }

            function _1108(_21) {
                return [_9._377, _9._415, _9._420, _9._256, _9._378, _9._251, _9._356, _9._283].indexOf(_21) !== -1
            }

            function _582(_21) {
                return [_9._465, _9._357, _9._285, _9._381].indexOf(_21) !== -1
            }

            function _1089(_21) {
                return [_9._471, _9._446, _9._376, _9._424, _9._426, _9._431, _9._430, _9._434, _9._599, _9._556, _9._575, _9._546].indexOf(_21) !== -1
            }

            function _577() {
                if (!_179(_393(), _0._193)) {
                    _0._193 = _393();
                    _30(_9._374, _0._193);
                    _0._541 = _14()
                }
                if (!_179(_0._151, _0._594)) {
                    _0._594 = _0._151;
                    _30(_9._377, _0._151)
                }
                if (!_179(_0._100, _0._274)) {
                    _0._274 = _0._100;
                    _30(_9._378, _0._100);
                    _0._566 = _14()
                }
                var _1070 = _2.visualViewport ? _2.visualViewport.scale : 1;
                var _530 = {
                    x: _105.round(_105.min(_1070, 10) * 1000),
                    y: _105.round(_105.min(_2.devicePixelRatio, 10) * 1000)
                };
                if (!_179(_530, _0._585)) {
                    _30(_9._587, _530);
                    _0._585 = _530
                }
                if (_2.visualViewport) {
                    var _266 = {
                        x: _2.visualViewport.offsetLeft,
                        y: _2.visualViewport.offsetTop
                    };
                    if (!_179(_266, _0._579)) {
                        _30(_9._266, _266);
                        _0._579 = _266
                    }
                }
            }

            function _1074() {
                if (!_179(_0._151, _0._584)) {
                    _0._584 = _0._151;
                    var _589 = _13.elementFromPoint(_0._151.x - _0._100.x, _0._151.y - _0._100.y);
                    var _165 = _500(_589, _0._151.x, _0._151.y);
                    if (_165) {
                        _30(_9._283, {
                            x: _165.x,
                            y: _165.y,
                            target: _60(_589)
                        })
                    }
                }
            }

            function _411() {
                var _190 = _0._300 - _0._75;
                _0._590 += _0._10.length;
                if (_0._590 > _76._592 && !_0._591) {
                    _0._591 = true;
                    _7('Recording event limit of ' + _76._592 + ' reached. Stopping recording.', _14());
                    _62()
                }
                var _169 = _578(_190, _0._10, _0._134, _0._52, _0._160);
                _0._132.push(_169);
                _0._10 = [];
                _0._52 = [];
                _0._134 = [];
                _0._160 = [];
                _0._300 = +new Date();
                if (_14() > _76._1082) {
                    _7('Pageview over max.time, stopping.', _14());
                    _593();
                    _26._214(_488);
                    _26._214(_506);
                    _26._214(_507);
                    _26._148(_303);
                    _269 = false
                } else {
                    _1124()
                }
            }

            function _578(_190, _10, _134, _52, _160) {
                var _278 = [];
                _156(3, _190, _278);
                _156(2, _10.length, _278);
                _278 = _278.concat(_10);
                let _711 = _1094.e(_278) + '.' + _436(_134 || []) + '.' + _436(_52 || []);
                if (_3._421) {
                    const _878 = [...new Set(_160 || [])].filter(_36 => !_134.includes(_36));
                    _711 += '.' + _436(_878)
                }
                return _711
            }

            function _1124() {
                if (_269 && _0._132.length > 0) {
                    if (_0._312 == 1) {
                        _15._296++
                    }
                    var _83 = _15._344 ? _525() : [];
                    for (let _4 = 0; _4 < _0._132.length; _4++) {
                        const _510 = {
                            _20: _192 + 'events?w=' + _3._51 + '&s=' + _15._61 + '&p=' + _15._74 + '&v=' + _210 + '&pst=' + _277() + '&q=' + _0._312 + '&li=' + _0._814 + '&lh=' + _0._815 + '&ls=' + _0._816
                        };
                        if (_3._421) {
                            _510._10 = 'd=' + _0._132[_4]
                        } else {
                            _510._20 += '&d=' + _0._132[_4]
                        }
                        _83.push(_510);
                        _0._312++;
                        _0._814 = _0._512;
                        _0._815 = _0._193.y;
                        _0._816 = _0._274.y
                    }
                    _0._132 = [];
                    if (_15._344 && _819(_83.slice(-10))) {
                        _818()
                    } else {
                        for (let _4 = 0; _4 < _83.length; _4++) {
                            _147(_83[_4])
                        }
                    }
                    if (_0._312 > _76._1086) _62()
                }
            }

            function _818() {
                if (_0._524) return;
                var _18 = _525().slice(0, 1)[0];
                if (_18) {
                    _0._524 = true;
                    _18._131 = _18._71 = function() {
                        _819(_525().slice(1));
                        _0._524 = false;
                        _26._72(_818, 1)
                    };
                    _147(_18)
                }
            }

            function _525() {
                return (_182._227('mf_transmitQueue') || []).map(a => ({
                    _20: a.url,
                    _10: a.data
                }))
            }

            function _819(_83) {
                return _182._240('mf_transmitQueue', _83.map(a => ({
                    url: a._20,
                    data: a._10
                })))
            }

            function _147(_18) {
                if (!_18 ? ._20) {
                    if (_18 ? ._71) _18._71();
                    return
                }
                _528();
                if (_1076() && _2.XDomainRequest) {
                    _1084(_18)
                } else if (_2.XMLHttpRequest) {
                    if (_18._10 && _18._252) {
                        var _1085 = _3.compressFunction || _252;
                        _1085(_18._10, function(_10) {
                            _18._10 = _10;
                            _18._20 = _353(_18._20, '1');
                            _505(_18)
                        }, function() {
                            _18._20 = _353(_18._20, '0');
                            _505(_18)
                        })
                    } else {
                        _18._20 = _353(_18._20, '0');
                        _505(_18)
                    }
                }
            }

            function _1084(_18) {
                try {
                    _18._20 = _1075(_353(_18._20, '0'));
                    var _136 = new _2.XDomainRequest();
                    _136.open(_18._10 ? 'POST' : 'GET', _18._20);
                    _136.onload = function() {
                        if (_18._131) _18._131(_830(_136))
                    };
                    _136.onerror = function() {
                        if (_18._71) _18._71(_830(_136))
                    };
                    _136.onprogress = function() {
                        _7('XDR progress:' + _18._20, _14())
                    };
                    _136.ontimeout = function() {
                        _7('XDR timeout:' + _18._20, _14())
                    };
                    _136.timeout = 20000;
                    _26._72(function() {
                        _136.send(_18._10)
                    }, 500)
                } catch (_59) {
                    _7('Error in transmitCrossDomain (XDomainRequest): ' + _59.message, _14());
                    if (_18._71) _18._71({})
                }
            }

            function _505(_18) {
                try {
                    var _90 = new _2.XMLHttpRequest();
                    _90.onreadystatechange = function() {
                        if (_90.readyState !== 4 || !_90.status) return;
                        if (_1077(_90.status)) {
                            if (_18._131) _18._131(_824(_90))
                        } else {
                            if (_18._71) _18._71(_824(_90))
                        }
                    };
                    _90.open(_18._10 ? 'POST' : 'GET', _18._20, true);
                    _90.setRequestHeader('Content-type', 'text/plain');
                    if (_18._1083) _90.withCredentials = true;
                    _90.send(_18._10)
                } catch (_59) {
                    _7('Error in transmitCrossDomain (XMLHttpRequest): ' + _59.message, _14());
                    if (_18._71) _18._71({})
                }
            }

            function _830(_136) {
                return {
                    _410: _136.responseText
                }
            }

            function _824(_90) {
                return {
                    _502: _90.status,
                    _410: _90.response
                }
            }

            function _252(_10, _131, _71) {
                if (!_2.CompressionStream) {
                    if (_71) _71();
                    return
                }
                var _1081 = new _2.TextEncoder();
                var _1080 = new _2.ReadableStream({
                    start(_826) {
                        _826.enqueue(_1081.encode(_10));
                        _826.close()
                    }
                }).pipeThrough(new _2.CompressionStream('gzip'));
                var _1079 = _1080.getReader();
                var _132 = [];
                var _198 = 0;
                _827();

                function _827() {
                    _1079.read().then(function(_169) {
                        if (_169.value) {
                            _132.push(_169.value);
                            _198 += _169.value.length
                        }
                        if (_169.done) {
                            _1078()
                        } else {
                            _827()
                        }
                    }).catch(_71)
                }

                function _1078() {
                    var _33;
                    if (_132.length === 1) {
                        _33 = _132[0]
                    } else {
                        _33 = new Uint8Array(_198);
                        var _828 = 0;
                        _132.forEach(function(_5) {
                            _33.set(_5, _828);
                            _828 += _5.length
                        })
                    }
                    if (_131) _131(_33)
                }
            }

            function _353(_20, _5) {
                return /\/(html|dom)/.test(_20) ? _20 + (_20.indexOf('?') === -1 ? '?' : '&') + 'gz=' + _5 : _20
            }

            function _352(_21, _10) {
                _147({
                    _20: _192 + 'data',
                    _10: 'website=' + _3._51 + '&session=' + _15._61 + '&page=' + _15._74 + '&type=' + _21 + '&pst=' + _277() + '&canonicalPage=' + _88._139() + '&data=' + _108(_11._122(_10))
                })
            }

            function _1077(_502) {
                return _502 >= 200 && _502 < 300
            }

            function _1076() {
                return _13.all && !_2.atob;
            }

            function _742() {
                return _13.all && !_13.addEventListener;
            }

            function _1075(_20) {
                return _20.replace(/^https?:/i, _3.location.protocol)
            }

            function _1073(_42) {
                var _345 = _11._122(_42._10);
                if (_345 && _345.length > _3._1072) {
                    _7('DOM size too big, not sending, size: ' + _11._228(_345.length), _14());
                    _63('mf_secret_html-too-big');
                    return
                }
                var _209 = _108(_345);
                var _1071 = 5242000;
                var _301 = _209.length <= _1071;
                var _18 = {
                    _20: _192 + 'html' + '?website=' + _42._57._51 + '&session=' + _42._57._61 + '&page=' + _42._57._74,
                    _10: 'size=' + _42._175 + '&html=' + _209 + '&pst=' + _277() + '&canonicalPage=' + _108(_88._139()),
                    _252: _3.compress
                };
                if (_15._344 && _301) {
                    var _83 = _799();
                    if (_209 !== '') {
                        _7('Adding initial DOM to queue, size: ' + _11._228(_209.length), _14());
                        _83.push(_18)
                    } else _7('Initial DOM empty, not sending', _14());
                    if (_800(_83.slice(-10))) _795();
                    else {
                        _796(_18, _301, _209.length)
                    }
                } else {
                    if (_209 == '') {
                        _7('Initial DOM empty, not sending', _14());
                        return
                    }
                    _796(_18, _301, _209.length)
                }
            }

            function _795() {
                var _83 = _799();
                var _18 = _83.splice(0, 1)[0];
                if (_18) {
                    _7('Sending initial DOM mutations. Size: ' + _18._10.length, _14());
                    _18._131 = _18._71 = function() {
                        _800(_83);
                        _26._72(_795, 1)
                    };
                    _147(_18)
                }
            }

            function _796(_18, _301, _798) {
                if (_301) {
                    _7('Transmitting initial DOM without queue due to no sessionstorage, size: ' + _11._228(_798), _14())
                } else {
                    _7('Transmitting initial DOM without queue due too big html, size: ' + _11._228(_798), _14())
                }
                _147(_18)
            }

            function _799() {
                return (_182._227('mf_initialDomQueue') || []).map(a => ({
                    _20: a.url,
                    _10: a.data,
                    _252: a.compress
                }))
            }

            function _800(_83) {
                return _182._240('mf_initialDomQueue', _83.map(a => ({
                    url: a._20,
                    data: a._10,
                    compress: a._252
                })))
            }

            function _1069(_42) {
                var _178 = _42._10.args[1].some(function(_125) {
                    return _492._178(_125)
                });
                if (_178) {
                    _7('DOM mutation is a duplicate and has not been added.', _14());
                    return
                }
                var _802 = _1088(_42, _0._224);
                if (_802 > -1) {
                    _0._224[_802]._10 = _42._10;
                    _7('Deduplicating DOM mutation', _14());
                    return
                }
                if (_3.domReuse) {
                    var _362 = _1066(_42);
                    var _803 = _1067(_362);
                    if (_803 > -1) {
                        _42.sequence = _803;
                        _7('Reusing already sent DOM mutation, sequence ' + _42.sequence, _14());
                        _30(_9._42, {
                            x: _42.sequence,
                            y: 0
                        });
                        return
                    } else _0._547.push(_362)
                }
                _42.sequence = ++_0._1068;
                _30(_9._42, {
                    x: _42.sequence,
                    y: 0
                });
                _0._224.push(_42);
                if (!_295) _295 = _26._72(_807, 1500)
            }

            function _1067(_362) {
                for (var i = 0; i < _0._547.length; i++)
                    if (_0._547[i] == _362) return i + 1;
                return -1
            }

            function _1066(_42) {
                return _116(_11._122(_42._10))
            }

            function _807() {
                _295 = 0;
                if (_269 && _0._224.length > 0) {
                    var _809 = _0._224.length;
                    var _259 = _0._224.map(function(_42) {
                        return {
                            _57: 'website=' + _42._57._51 + '&session=' + _42._57._61 + '&page=' + _42._57._74 + '&pst=' + _277(),
                            _10: _42.sequence + '.' + _1087(_11._122(_42._10))
                        }
                    }).filter(function(_42) {
                        return _42._10.length
                    }).reduce(function(_259, _42) {
                        var _501 = _259[_42._57];
                        if (!_501) _501 = _259[_42._57] = [];
                        _501.push(_42._10);
                        return _259
                    }, {});
                    _0._224 = [];
                    Object.keys(_259).forEach(function(_57) {
                        var _10 = _259[_57].join('|||');
                        _10 = _57 + '&data=' + _108(_10);
                        _147({
                            _20: _192 + 'dom',
                            _10: _10,
                            _252: _3.compress
                        });
                        _7('Sending DOM mutations: ' + _809 + ', size: ' + _10.length, _14());
                        _0._821 += _809;
                        if (_0._821 > _76._831) {
                            _7('DOM mutation limit of ' + _76._831 + ' reached. Stopping recording.', _14());
                            _62()
                        }
                    })
                }
            }

            function _1088(_93, _833) {
                if (!_3.domDeduplicator) return -1;
                var _89 = _93._10.args;
                var _862 = _858(_89);
                var _861 = _857(_89);
                if (!_862 && !_861) return -1;
                for (var i = 0; i < _833.length; i++) {
                    var _466 = _833[i]._10.args;
                    if (_862 && _858(_466) && _1111(_89[2], _466[2])) {
                        return i
                    } else if (_861 && _857(_466)) {
                        return i
                    }
                }
                return -1
            }

            function _858(_89) {
                return _851(_89) && _89[2].filter(_1090).length === _89[2].length
            }

            function _857(_89) {
                return _851(_89) && _89[2].filter(_1112).length === _89[2].length
            }

            function _851(_89) {
                return _89[0].length === 0 && _89[1].length === 0 && _89[2].length > 0 && _89[3].length === 0
            }

            function _1090(_284) {
                return _284.attributes.style && _854(_284.attributes) === 1
            }

            function _1112(_284) {
                return _284.attributes.d && _854(_284.attributes) === 1
            }

            function _854(obj) {
                var count = 0;
                for (var prop in obj)
                    if (Object.prototype.hasOwnProperty.call(obj, prop)) count++;
                return count
            }

            function _1111(_453, _864) {
                if (_453.length !== _864.length) return false;
                for (var i = 0; i < _453.length; i++) {
                    var _1110 = _453[i],
                        _1109 = _864[i];
                    if (_1110.id !== _1109.id) return false
                }
                return true
            }

            function _452() {
                if (_0._10.length > 0 && _863() >= 5000) {
                    _30(_9._452, {});
                    _411()
                }
            }

            function _140() {
                _7('Inactivity timeout.', _14());
                _62(true)
            }

            function _179(_130, _848) {
                return _130.x == _848.x && _130.y == _848.y
            }

            function _393() {
                return {
                    x: _2.innerWidth,
                    y: _2.innerHeight
                }
            }

            function _712(_208) {
                if (!_208 || !_208.getBoundingClientRect) return null;
                var _186 = _208.getBoundingClientRect();
                var _314;
                if (!_208.childElementCount && !_186.height && !_186.width) _314 = _1105(_208);
                if (!_314) {
                    return {
                        x: _186.left,
                        y: _186.top,
                        width: _186.width,
                        height: _186.height
                    }
                } else {
                    _314.x += _186.left - _208.offsetLeft;
                    _314.y += _186.top - _208.offsetTop;
                    return _314
                }
            }

            function _1105(_1) {
                var _248 = window.getComputedStyle(_1, [':after']);
                if (!_248) return _248;
                return {
                    x: +_248.left.slice(0, -2),
                    y: +_248.top.slice(0, -2),
                    width: +_248.width.slice(0, -2),
                    height: +_248.height.slice(0, -2)
                }
            }

            function _60(_1) {
                var _291 = _346.get(_1);
                if (_291) return _291;
                try {
                    var _36 = [];
                    while (_1) {
                        var _34 = _1.getRootNode ? _1.getRootNode() : _13;
                        _36.unshift(_1104(_1, _34) || _1103(_1, _34));
                        _1 = _34.host
                    }
                    return _36.join(' > :document-fragment: > ')
                } catch (_59) {
                    _7('Error in getElementPath: ' + _59.message, _14())
                }
                return ''
            }

            function _1104(_1) {
                var name = _1.attributes ? .['name'] ? _1.attributes['name'].value : null;
                if (name && _439(_1) && /button|input|select|textarea/.test(_1.tagName.toLowerCase())) {
                    var _418 = _13.getElementsByName(name);
                    if (_418.length === 1) return name;
                    if (_418.length > 1) {
                        for (var _4 = 0; _4 < _418.length; _4++)
                            if (_1 === _418[_4]) return name + '[' + _4 + ']_mf'
                    }
                }
                return null
            }

            function _1103(_64, _34) {
                var _27 = [];
                try {
                    while (_64 && _64.nodeType === 1) {
                        var _8 = '';
                        var _78 = _25._87(_64);
                        if (!_78) return '';
                        var _291 = _346.get(_64);
                        if (_291) {
                            _27.unshift(_291);
                            break
                        }
                        if (_64.tagName === 'TABLE' && _27.indexOf('tbody') === -1 && _27.indexOf('thead') === -1) _27.unshift('tbody');
                        if (_64.getAttribute('id') && !_11._187(_64, 'data-mf-ignore-child-ids') && _3.useIdSelectors) {
                            _8 += '#' + _64.getAttribute('id');
                            _27.unshift(_8);
                            break
                        } else {
                            _8 += _64.tagName.toLowerCase();
                            var _422 = '',
                                _425 = _64,
                                _241 = 1;
                            if (_78 && _78.tagName && _78.tagName.toLowerCase() == 'body') {
                                var _113 = _11._225(_64);
                                _422 = _113.length ? '.' + _113.join('.') : ''
                            }
                            if (_422 !== '' && _34.querySelectorAll(_838('body > ' + _8 + _422)).length === 1) _8 += _422;
                            else {
                                while ((_425 = _425.previousElementSibling)) {
                                    if (_425.tagName.toLowerCase() === _8) _241++
                                }
                                if (_241 !== 1) _8 += ':[' + _241 + ']'
                            }
                        }
                        _27.unshift(_8);
                        _64 = _78
                    }
                } catch (_59) {
                    _7('Error in _getCssPath: ' + _59.message, _14())
                }
                return _27.join(' > ').replace('html > body > ', '> ')
            }

            function _245(_36, _1113 = true) {
                if (!_36) return null;
                var _1 = _1102(_36);
                if (!_1) {
                    try {
                        var _34 = _13;
                        _838(_36).split(' > :document-fragment: > ').forEach(function(_8) {
                            _1 = _34.querySelector(_8);
                            _34 = _1.shadowRoot
                        })
                    } catch (_59) {
                        if (_1113) _7('Error in _getElementById: ' + _59.message, _14())
                    }
                }
                return _1
            }

            function _1102(_22) {
                if (!_22) return null;
                var _68 = _840.exec(_22);
                if (_68 && _68[1]) {
                    try {
                        var _50 = _2.parseInt(_68[1]);
                        return _13.getElementsByName(_22.replace(_840, ''))[_50]
                    } catch (_59) {}
                }
                var _55 = _13.getElementsByName(_22);
                if (_55 && _55.length === 1) return _55[0];
                return null
            }

            function _838(_27) {
                if (!_27) return null;
                if (_27.substr(0, 1) === '>') _27 = 'html > body ' + _27;
                _27 = _27.replace(/^(\d)/, '\\3$1 ');
                _27 = _27.replace(/#(\d)/, '#\\3$1 ');
                _27 = _27.replace(/#(-\d)/, '#\\$1');
                _27 = _27.replace(/:(?!\[)/g, '\\:');
                _27 = _27.replace(/\\:document-fragment\\:/g, ':document-fragment:');
                _27 = _27.replace(/^#\S+/, function(_68) {
                    return _68.replace(/\./g, '\\.');
                });
                _27 = _27.replace(/:\[([^\]]+)\]/g, ':nth-of-type($1)');
                _27 = _27.replace(/([{}[\]/;%$~@&<*^])/g, '\\$1');
                return _27
            }

            function _156(_1097, _5, _302) {
                for (var _4 = _1097 - 1; _4 > 0; _4--) {
                    var _836 = _105.pow(256, _4);
                    _835(_105.floor(_5 / _836), _302);
                    _5 = _5 % _836
                }
                _835(_5, _302)
            }

            function _835(_808, _302) {
                if (_808 > 255) {
                    _302._794 = true;
                    return
                }
                _302.push(_808)
            }

            function _436(_1) {
                var _33 = '';
                for (var _4 = 0; _4 < _1.length; _4++) {
                    _33 += (_4 > 0 ? ',' : '') + _403.encode('' + _1[_4])
                }
                return _33
            }

            function _792(_1) {
                var _175 = 0;
                for (var _4 = 0; _4 < _1.length; _4++) _175 += _403.encode('' + _1[_4]).length + 1;
                return _175 > 0 ? _175 - 1 : _175
            }

            function _713(_22, _5, _201, _32) {
                if (_3.preferStorageApi) _54._126(_22, _5);
                else _320._126(_22, _5, _201, _32)
            }

            function _734(_22) {
                if (_3.preferStorageApi) return _54._168(_22) || '';
                else return _320._168(_22)
            }

            function _1095(_22) {
                if (_3.preferStorageApi) {
                    _182._236(_22);
                    _54._236(_22)
                } else {
                    _320._236(_22)
                }
            }
            var _1094 = new function() {
                for (var d = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'.split(''), c = 64; c;) --c;
                this.e = function(e) {
                    let a = [],
                        f = 0,
                        b = 0,
                        g, c = e.length,
                        h = c % 3;
                    for (; f < c;) a[b++] = d[(g = e[f++] << 16 | e[f++] << 8 | e[f++]) >> 18 & 63] + d[g >> 12 & 63] + d[g >> 6 & 63] + d[g & 63];
                    if (h)
                        for (a[--b] = a[b].substr(0, a[b].length - (h = 3 - h)); h--;) a[b] += '*';
                    return a.join('')
                }
            };
            var _403 = {
                _402: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
                encode: function(c) {
                    for (var a = '', d, b, e, i, h, f, g = 0, c = this._1093(c); g < c.length;) d = c.charCodeAt(g++), b = c.charCodeAt(g++), e = c.charCodeAt(g++), i = d >> 2, d = (d & 3) << 4 | b >> 4, h = (b & 15) << 2 | e >> 6, f = e & 63, isNaN(b) ? h = f = 64 : isNaN(e) && (f = 64), a = a + this._402.charAt(i) + this._402.charAt(d) + this._402.charAt(h) + this._402.charAt(f);
                    return a
                },
                _1093: function(c) {
                    for (var c = c.replace(/\r\n/g, '\n'), a = '', d = 0; d < c.length; d++) {
                        var b = c.charCodeAt(d);
                        128 > b ? a += String.fromCharCode(b) : (127 < b && 2048 > b ? a += String.fromCharCode(b >> 6 | 192) : (a += String.fromCharCode(b >> 12 | 224), a += String.fromCharCode(b >> 6 & 63 | 128)), a += String.fromCharCode(b & 63 | 128))
                    }
                    return a
                }
            };

            function _445() {
                var _130 = function() {
                    return ((1 + _105.random()) * 65536 | 0).toString(16).substring(1)
                };
                return _130() + _130() + _130() + _130() + _130() + _130() + _130() + _130()
            }
            var _480 = 0;

            function _788() {
                if (_13.body) {
                    _7('Initializing recorder');
                    if (!_1092()) return;
                    if (_1091) _1064(_740);
                    else _740();
                    return
                }
                _480++;
                if (_480 === 1) {
                    _7('Retrying to initialize recorder - document.body is not set', _14())
                } else if (_480 === 25) {
                    _7('Failed to initialize recorder', _14());
                    return
                }
                _26._72(_788, 200)
            }

            function _740() {
                _7('Initializing recorder', _14());
                if (!_722(_3.location.hostname)) return;
                if (_742()) {
                    _7('Recording not started - browser is IE8 or older', _14());
                    return
                }
                if (_744) _1038();
                if (_744 || _1036) return;
                _746 = true;

                function _747() {
                    if (!_97 && _3.autoStart && _13.readyState !== 'loading') _38();
                    _473(_789())
                }
                _23._43(_13, 'readystatechange', _747);
                _747()
            }

            function _473(_288) {
                if (_456 || !_97 || _13.readyState !== 'complete') return;
                _30(_9._748, {
                    x: _288,
                    y: _414 ? _414.scrollHeight : _11._474()
                });
                _456 = true
            }

            function _1031() {
                return _3.useUnload ? 'unload' : 'beforeunload'
            }

            function _287(_714, _715) {
                return _714.indexOf(_715, _714.length - _715.length) !== -1
            }

            function _116(_46) {
                var _123 = 0,
                    _717;
                for (var _4 = 0; _4 < _46.length; _4++) {
                    _717 = _46.charCodeAt(_4);
                    _123 = ((_123 << 5) - _123) + _717
                }
                return _123.toString()
            }

            function _720(_16) {
                for (var _4 = 0; _4 < _0._176.length; _4++)
                    if (_0._176[_4].split('_')[0] === _116(_16)) {
                        return _4
                    }
                return -1
            }

            function _719(_16, _5) {
                var _461 = _720(_16);
                var _458 = _116('' + _5);
                if (_461 > -1) {
                    if (_0._176[_461].split('_')[1] === _458) {
                        return false
                    }
                    _0._176[_461] = _116(_16) + '_' + _458
                } else if (_0._176.length < 20) {
                    _0._176.push(_116(_16) + '_' + _458)
                }
                return true
            }

            function _722(_32) {
                var _1028 = _32;
                _32 = _449(_32);
                var _730 = false;
                for (let _4 = 0; _4 < _281.length; _4++) {
                    if (_32 == _449(_281[_4])) {
                        _730 = true;
                        break
                    }
                }
                _32 = _1027(_32);
                var _723 = false;
                for (let _4 = 0; _4 < _281.length; _4++) {
                    if (_32 == _449(_281[_4])) {
                        _723 = true;
                        break
                    }
                }
                var _33 = _730 || _723;
                if (!_33) _7('Domain was blocked: ' + _1028 + ' - domain list: ' + _281, _14());
                return _33
            }

            function _449(_32) {
                if (_32 == null) return '';
                _32 = _32.toLowerCase();
                _32 = _32.replace(/^\s+|\s+$/g, '');
                if (_32.substring(0, 4) == 'www.') {
                    _32 = _32.substring(4, _32.length)
                }
                return _32
            }

            function _1027(_32) {
                if (_3.includeSubDomains) {
                    _32 = _1024(_32)
                }
                return _32
            }

            function _1024(_32) {
                var _137 = _32.split('.');
                if (_137.length <= 2) return _32;
                if (_32.indexOf('.co.') > -1 || _32.indexOf('.com.') > -1 || _32.indexOf('.org.') > -1) {
                    _137 = _137.slice(_137.length - 3, _137.length);
                    return _137.join('.')
                }
                _137 = _137.slice(_137.length - 2, _137.length);
                return _137.join('.')
            }

            function _1023() {
                var _33 = [];
                if (typeof Ember != 'undefined') _33.push('em');
                if (typeof angular != 'undefined') _33.push('an');
                if (typeof Backbone != 'undefined') _33.push('bb');
                return _33
            }

            function _1022() {
                if (_3.autoTagging) {
                    _7('Autotagging session', _14());
                    var _731 = ['utm_source', 'utm_medium', 'utm_term', 'utm_content', 'utm_campaign', 'gclid'];
                    for (var _4 = 0; _4 < _731.length; _4++) {
                        var _462 = _731[_4];
                        var _5 = _751(_3.location.href, _462);
                        if (!_5) _5 = _751(_3.referrer, _462);
                        if (_5) _124._779(['setVariable', _462, _5])
                    }
                }
            }

            function _751(_20, _22) {
                _22 = _22.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
                var regex = new RegExp('[\\?&]' + _22 + '=([^&#]*)'),
                    results = regex.exec(_20);
                return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
            }
            const nonWordCharactersRegex = /[\s"'.,_\-+/*:=!?@#%&{}[\]\\|]/;

            function _1021(_481) {
                return !nonWordCharactersRegex.test(_481)
            }

            function _1020(_5, _555) {
                var _33 = '';
                for (var _4 = 0; _4 < _555; _4++) {
                    _33 += _5
                }
                return _33
            }

            function _277() {
                return _0._774 || _0._75
            }

            function _14() {
                return +new Date() - _0._75
            }

            function _1019(urlLength) {
                var _215 = _3.location.href;
                var _781 = _76._776 - urlLength - 6;
                if (_108(_215).length > _781) _215 = _215.split('#')[0];
                if (_108(_215).length > _781) _215 = _215.split('?')[0];
                return _108(_215)
            }

            function _1039(_19) {
                var _1062 = _19 instanceof Element;
                if (!_1062) return false;
                var _784 = _2.getComputedStyle(_19);
                var _531 = _784 ? _784['white-space'] : '';
                if (_531 && (_531.indexOf('pre') > -1 || _531 === 'break-spaces')) return true;
                return false
            }
            _788();
            this.start = function() {
                _38();
                _473(_789())
            };
            this.stop = _62;
            this.newPageView = _423;
            this.stopSession = _1059;
            this.getSessionId = function() {
                return _15._61
            };
            this.getPageViewId = function() {
                return _15._74
            };
            this.tag = _63;
            this.star = _1058;
            this.setVariable = _1057;
            this.identify = _1056;
            this.formSubmitAttempt = _1055;
            this.formSubmitSuccess = _433;
            this.formSubmitFailure = _754;
            this.addFriction = function(_5, _22) {
                _170({
                    _5: _5,
                    _756: _22,
                    _140: 0
                })
            };
            this.isRecording = function() {
                return _269
            };
            this.isReturningUser = function() {
                return _15._298
            };
            this.activateFeedback = _427;
            this.proxyAttachShadow = _365;
            this.recordingRate = _262;
            this.version = _210;
            this.lastUpdate = _1052;
            this.isCreditCard = _297;
            this.pageNotFound = function() {
                _170(_92._428)
            }
        }

        function _812(_25, _3) {
            var _793 = [];

            function _178(_125) {
                if (!_3.domMutationDetectorEnable || !_125 || _125.nodeType !== 1) return false;
                var _78 = _25._87(_125);
                var _762 = _78 ? _78.id : undefined;
                var _770 = _125.previousSibling ? _125.previousSibling.id : undefined;
                var _1050 = _125.tagName;
                var _763 = _125.attributes ? _125.attributes.id : undefined;
                var _765 = _125.attributes ? _125.attributes.class : undefined;
                var _16 = _1050;
                if (_3.domMutationUseParentNode && _762) _16 += '_' + _762;
                if (_3.domMutationUsePreviousSibling && _770) _16 += '_' + _770;
                if (_763) _16 += '_' + _763;
                if (_765) _16 += '_' + _765.replace(/\s/g, "_");
                var _758 = +new Date();
                var _93 = _793[_16];
                var _567 = _93 ? _93._555 : 0;
                var _1045 = _93 ? ((_758 - _93._1044) / 1000) : 0;
                var _769 = _567 < _3.domMutationCountThreshold;
                var _791 = _1045 < _3.domMutationTimeThresholdInSeconds;
                var _178 = _93 ? (_769 && _791) : false;
                if (!_769 || !_791) _567 = 0;
                _793[_16] = {
                    _1044: _758,
                    _555: _567 + 1
                };
                return _178
            }
            this._178 = _178
        }

        function _945(_2, _3, _98, _11, _23, _88, _54) {
            var _48, _51, _7, _104;
            var _375 = 'mf_liveHeatmaps';
            var _39;
            var _310 = [];
            var _133;
            var _373 = false;

            function _38(_306, _217, _334, _195) {
                _51 = _306;
                _48 = _334;
                _7 = _217;
                _373 = window.location.search.indexOf('mf_legacy=1') !== -1 ? true : false;
                _7('Live heatmaps starting');
                _104 = _98._254();
                if (!_104) {
                    _7('Live heatmaps not initiated - could not create root HTML element');
                    return
                }
                if (!_2.opener) {
                    _7('Live heatmaps not initiated - window.opener is missing');
                    return
                }
                if (typeof _195 === 'function') {
                    _195(function() {
                        _220()
                    })
                } else {
                    _220()
                }
            }

            function _62() {
                _409()
            }

            function _220() {
                _23._43(_2, 'message', function(_35) {
                    if (_35.origin !== _48) return;
                    _326(_35.data);
                    switch (_35.data.message) {
                        case 'MouseflowLiveHeatmaps_Init_Received':
                            _2.clearInterval(_133);
                            break;
                        case 'MouseflowLiveHeatmaps_Init_Success':
                        case 'MouseflowLiveHeatmaps_Hello':
                            _103(_35.data);
                            _330(_35.data.scripts, function() {
                                var message;
                                if (_373) {
                                    message = {
                                        mfCommand: 'settings',
                                        value: {
                                            websiteSettings: _35.data.websiteSettings
                                        }
                                    }
                                } else {
                                    _738();
                                    message = {
                                        mfCommand: 'settings_liveheatmap',
                                        value: _39
                                    }
                                }
                                _543(JSON.stringify(message))
                            });
                            break;
                        case 'MouseflowLiveHeatmaps_StreamData_Chunk':
                            _280(_35.data.requestUrl, true)._542(_35.data.dataChunk);
                            break;
                        case 'MouseflowLiveHeatmaps_StreamData_Success':
                            _280(_35.data.requestUrl)._152();
                            break;
                        case 'MouseflowLiveHeatmaps_StreamData_Error':
                            _280(_35.data.requestUrl)._222();
                            break;
                        case 'MouseflowLiveHeatmaps_RequestData_Success':
                            _280(_35.data.requestUrl)._152(_35.data.responseText);
                            break;
                        case 'MouseflowLiveHeatmaps_RequestData_Error':
                            _280(_35.data.requestUrl)._222();
                            break
                    }
                });
                _133 = _2.setInterval(_309, 500);
                _2.setTimeout(function() {
                    _2.clearInterval(_133)
                }, 10000);
                _309()
            }

            function _309() {
                _188({
                    message: 'MouseflowLiveHeatmaps_Init',
                    websiteId: _51,
                    legacy: _373
                })
            }

            function _103(_103) {
                _39 = _716();
                var _276 = _741();
                var _366 = _3.location.search.match(/mf_liveHeatmaps=([^&]+)/);
                var _550 = typeof _2.name === 'string' && _2.name.indexOf('mf_liveHeatmaps') === 0 ? _2.name.slice(15).split('_') : [];
                var _1115 = _366 || _550[1] === 'init';
                if (_39 && !_1115) {
                    _39.filters.url = _276.url;
                    _85(_39);
                    return
                }
                _39 = {
                    isMinimized: false,
                    appUrlBase: _48,
                    websiteId: _51,
                    filters: _276,
                    minDate: _103.minDate,
                    filteredViews: _103.filteredViews,
                    user: _103.user,
                    website: _103.website,
                    mutedEvents: _103.mutedEvents,
                    muteAvailable: _103.muteAvailable,
                    supportedLanguages: _103.supportedLanguages
                };
                if (_103.filters && _103.filters.view) {
                    _39.selectedFilteredView = _103.filters.view;
                    delete _103.filters.view
                }
                if (_103.filters) {
                    Object.keys(_103.filters).forEach(function(_16) {
                        var _5 = _103.filters[_16];
                        if (_5 instanceof Date) _5 = _372(_5);
                        _39.filters[_16] = _5
                    })
                }
                if (_366 && _366[1] !== '1') _39.filters.maptype = _366[1];
                else if (_550[2]) _39.filters.maptype = _550[2];
                _85(_39);
                _2.name = 'mf_liveHeatmaps'
            }

            function _738() {
                _39.devices = _39.filters.device ? _39.filters.device.and || _39.filters.device.or : [];
                _39.mapType = _39.filters.maptype;
                _39.url = _39.filters.url = _88._139();
                _188({
                    message: 'MouseflowLiveHeatmaps_SetSettings',
                    settings: _39
                })
            }

            function _330(_161, _65) {
                if (!_161) return;
                var _226 = 0;

                function _339() {
                    if (_226 >= _161.length) {
                        _65();
                        return
                    }
                    var _79 = _161[_226];
                    _516(_79);
                    _226++;
                    var _163 = document.createElement('script');
                    if (_79.startsWith('/')) _163.src = _48 + _79;
                    else _163.src = _48 + '/' + _79;
                    _163.onload = _339;
                    _104.appendChild(_163)
                }
                _339()
            }

            function _716() {
                return _54._227(_375)
            }

            function _85(_39) {
                if (_7) _7('Live heatmaps saving settings');
                _54._240(_375, _39)
            }

            function _409() {
                if (_7) _7('Live heatmaps removing settings');
                _54._236(_375)
            }

            function _280(_20, _1114) {
                var _539 = _310.filter(function(_1041) {
                    return _1041._20 === _20
                })[0];
                if (!_1114 && _539) _310.splice(_310.indexOf(_539), 1);
                return _539
            }

            function _1116(_18) {
                if (typeof _18 !== 'object') return;
                _39 = _716();
                var _276 = _741();
                Object.keys(_18).forEach(function(_16) {
                    var _5 = _18[_16];
                    if (_5 instanceof Date) _5 = _372(_5);
                    _39.filters[_16] = _5 || undefined
                });
                Object.keys(_276).forEach(function(_16) {
                    if (!_39.filters[_16]) _39.filters[_16] = _276[_16]
                });
                if (_39.filters.view) {
                    _39.selectedFilteredView = _39.filters.view;
                    delete _39.filters.view
                }
                _85(_39)
            }

            function _741() {
                var _253 = new Date();
                _253 = new Date(_253.getFullYear(), _253.getMonth(), _253.getDate());
                var _552 = new Date(_253);
                _552.setDate(_552.getDate() - 29);
                return {
                    maptype: 'click',
                    url: _88._139(),
                    fromdate: _372(_552),
                    todate: _372(_253)
                }
            }

            function _188(_10) {
                _2.opener.postMessage(_10, _48);
                _7('Sent ' + _10.message + (_10.requestUrl ? ', request URL: ' + _10.requestUrl : ''))
            }

            function _543(_10) {
                _2.postMessage(_10, _2.location.origin);
                _7('Sent ' + _10.message + (_10.requestUrl ? ', request URL: ' + _10.requestUrl : ''))
            }

            function _326(_10) {
                if (_10.message && _10.message.indexOf('MouseflowLiveHeatmaps_') === 0) _7('Received ' + _10.message + (_10.requestUrl ? ', request URL: ' + _10.requestUrl : ''))
            }

            function _516(_79) {
                _7('Live heatmaps loading script: ' + _79)
            }

            function _372(_112) {
                return _112.getFullYear() + '-' + _749(_112.getMonth() + 1, '00') + '-' + _749(_112.getDate(), '00')
            }

            function _749(_1134, _743) {
                return (_743 + _1134).slice(-_743.length)
            }
            this._38 = _38;
            this._62 = _62;
            this._522 = function(_18) {
                _1116(_18);
                if (_373) {
                    _543('{"mfCommand":"MouseflowHeatmap_UpdateHeatmap"}')
                } else {
                    _738();
                    var message = {
                        mfCommand: 'settings_change',
                        value: {
                            settings: _39,
                            reloadData: _18 && _18.maptype ? false : true
                        }
                    };
                    _543(JSON.stringify(message))
                }
                _7('Sent postmessage updateheatmap')
            };
            _2.mouseflowHeatmap = {
                streamData: function(_20, _542, _152, _222) {
                    _310.push({
                        _20: _20,
                        _542: _542 || function() {},
                        _152: _152 || function() {},
                        _222: _222 || function() {}
                    });
                    _188({
                        message: 'MouseflowLiveHeatmaps_StreamData',
                        requestUrl: _20
                    })
                },
                getData: function(_20, _152, _222) {
                    _310.push({
                        _20: _20,
                        _152: _152 || function() {},
                        _222: _222 || function() {}
                    });
                    _188({
                        message: 'MouseflowLiveHeatmaps_RequestData',
                        requestUrl: _20
                    })
                }
            }
        }

        function _946(_2, _3, _98, _11, _23, _88, _54, _342) {
            const _375 = 'mf_liveHeatmaps';
            let _48, _51, _7, _104;
            let _133;
            const _13 = _2.document;

            function _38(_306, _217, _334, _195) {
                _51 = _306;
                _48 = _334;
                _7 = _217;
                _7('Live heatmaps starting');
                _104 = _98._254();
                if (!_104) {
                    _7('Live heatmaps not initiated - could not create root HTML element');
                    return
                }
                if (!_2.opener) {
                    _7('Live heatmaps not initiated - window.opener is missing');
                    return
                }
                if (typeof _195 === 'function') {
                    _195(function() {
                        _220()
                    })
                } else {
                    _220()
                }
            }

            function _62() {}

            function _220() {
                _23._43(_2, 'message', function(_35) {
                    if (_35.origin !== _48) return;
                    _326(_35.data);
                    switch (_35.data.message) {
                        case 'MouseflowLiveHeatmapsV3_Init_Received':
                            _2.clearInterval(_133);
                            break;
                        case 'MouseflowLiveHeatmapsV3_Init_Success':
                            _330(_35.data.scripts);
                            break
                    }
                });
                _133 = _2.setInterval(_309, 500);
                _2.setTimeout(function() {
                    _2.clearInterval(_133)
                }, 10000);
                _309()
            }

            function _309() {
                _188({
                    message: 'MouseflowLiveHeatmapsV3_Init',
                    websiteId: _51,
                    prod: _342.prod !== undefined
                })
            }

            function _330(_161) {
                for (const _79 of _161) {
                    const _1 = _13.createElement(_79.tagName);
                    if (_79.textContent) {
                        _1.textContent = _79.textContent
                    }
                    for (const _16 in _79.attributes) {
                        const _5 = _79.attributes[_16];
                        if (_16 === 'src' || _16 === 'href') {
                            _1[_16] = _48 + _5
                        } else {
                            _1.setAttribute(_16, _5)
                        }
                    }
                    if (_1.tagName === 'SCRIPT') {
                        _1.async = false
                    }
                    if (_1.tagName === 'SCRIPT' && _1.type === 'importmap') {
                        _1.textContent = _1.textContent.replace(/(:\s*")(\/[^"]+")/g, `$1${_48}$2`)
                    }
                    _104.appendChild(_1)
                }
            }

            function _188(_10) {
                _2.opener.postMessage(_10, _48);
                _7('Sent ' + _10.message + (_10.requestUrl ? ', request URL: ' + _10.requestUrl : ''))
            }

            function _326(_10) {
                if (_10.message && _10.message.indexOf('MouseflowLiveHeatmapsV3_') === 0) _7('Received ' + _10.message + (_10.requestUrl ? ', request URL: ' + _10.requestUrl : ''))
            }
            this._38 = _38;
            this._62 = _62;
            this._522 = function(_18) {}
        }

        function _948(_2, _98, _25, _26, _11, _23, _54, _3) {
            var _13 = _2.document,
                _48, _51, _7, _12, _104, _28, _853, _847, _832, _805, _162, _128, _389, _167, _724, _206, _299, _307, _166, _143, _149;

            function _38(_1184, _306, _348, _354, _336, _355, _217) {
                _48 = _1184;
                _51 = _306;
                _7 = _217;
                _12 = _1154() || {
                    _154: false,
                    _66: 'exclude',
                    _86: _348 || [],
                    _84: _354 || [],
                    _111: _336 || [],
                    _106: _355 || []
                };
                _7('Starting privacy tool');
                _104 = _98._254();
                if (!_104) {
                    _7('Privacy tool not initiated - could not create root HTML element');
                    return
                }
                _1183();
                _26._72(function() {
                    _1182();
                    _85(_12)
                }, 1000);
            }

            function _62() {
                _1171();
                _98._551()
            }

            function _1183() {
                _23._43(_2, 'message', function(event) {
                    if (event.origin !== _48) return;
                    switch (event.data.message) {
                        case 'MouseflowPrivacyTool_Hello':
                            _7('Privacy tool API ready');
                            _307 = event.source;
                            if (event.data.cssSelectorBlacklist) {
                                _12._86 = event.data.cssSelectorBlacklist;
                                _12._84 = event.data.cssSelectorWhitelist;
                                _12._111 = event.data.cssSelectorTracked;
                                _12._106 = event.data.cssSelectorMasked
                            }
                            _264();
                            break;
                        case 'MouseflowPrivacyTool_Save_Success':
                            _7('Successfully saved CSS lists');
                            if (_166) _166();
                            _166 = undefined;
                            _143 = undefined;
                            break;
                        case 'MouseflowPrivacyTool_Save_Failed':
                            _7('Failed saving CSS lists');
                            if (_143) _143();
                            _166 = undefined;
                            _143 = undefined;
                            _519('Uh oh! We couldn\'t save your changes.<br><br>' + 'Please refresh the page and try again.');
                            break;
                        case 'MouseflowPrivacyTool_Unauthorized':
                            _7('Privacy tool API logged out - cannot save');
                            if (_143) _143();
                            _166 = undefined;
                            _143 = undefined;
                            _519('Uh oh! We couldn\'t save your changes.<br><br>' + 'Please log into Mouseflow and try again.');
                            break
                    }
                });
                if (_2.opener) {
                    _7('Loading privacy tool API using window.opener');
                    _2.opener.postMessage({
                        message: 'MouseflowPrivacyTool_Hello'
                    }, _48)
                }
                _26._72(function() {
                    if (!_307) {
                        _7('Loading privacy tool API using iframe');
                        var _313 = _13.createElement('iframe');
                        _313.style.width = '0px';
                        _313.style.height = '0px';
                        _313.style.display = 'none';
                        _313.src = _48 + '/websites/' + _51 + '/privacytool';
                        _104.appendChild(_313);
                        _26._72(function() {
                            if (!_307) {
                                _7('Loading privacy tool API timed out');
                                _1143('We\'re having trouble loading the Privacy Tool on this page. Please try ' + 'refreshing the page or logging in to Mouseflow and reloading the Privacy Tool from there.<br><br>' + 'If you need help, please don\'t hesitate to reach out to us at:  <a class="green" href="mailto:support@mouseflow.com">support@mouseflow.com</a>')
                            }
                        }, 5000)
                    }
                }, 2000)
            }

            function _1182() {
                _28 = _1141(_12);
                _853 = _28.querySelector('.tool-exclude output');
                _847 = _28.querySelector('.tool-whitelist output');
                _832 = _28.querySelector('.tool-track output');
                _805 = _28.querySelector('.tool-masked output');
                _162 = _28.querySelector('.tool-status-text');
                _128 = _28.querySelector('.btn-widget');
                _389 = _28.querySelector('.tool-loading h2');
                _12._86.forEach(_764);
                _12._84.forEach(_760);
                _12._111.forEach(_766);
                _12._106.forEach(_757);
                _104.appendChild(_28);
                _167 = _1186();
                _28.appendChild(_167);
                _11._333(_13.body, 'mf-privacy-tool-opened', !_12._154);
                _1181();
                _264()
            }

            function _264() {
                if (_28 && _307) {
                    _11._67(_28, 'is-loading');
                    _119();
                    _1180();
                    _382()
                }
            }

            function _503() {
                _409();
                _62();
                _2.close()
            }

            function _1181() {
                _23._43(_28, 'click', '.mf-tool-close', _503, {
                    _101: true
                })
            }

            function _1180() {
                _23._43(_28, 'click', '.mf-tool-toggle', _1168, {
                    _101: true
                });
                _23._43(_28, 'click', '.mf-tool-close', _503, {
                    _101: true
                });
                _23._43(_28, 'click', '.mf-tool-exclude', _1167, {
                    _101: true
                });
                _23._43(_28, 'click', '.mf-tool-whitelist', _1166, {
                    _101: true
                });
                _23._43(_28, 'click', '.mf-tool-track', _1165, {
                    _101: true
                });
                _23._43(_28, 'click', '.mf-tool-masked', _1174, {
                    _101: true
                });
                _23._43(_28, 'click', '.highlight-excluded', _1187, {
                    _101: true
                });
                _23._43(_28, 'click', '.highlight-whitelisted', _1209, {
                    _101: true
                });
                _23._43(_28, 'click', '.highlight-tracked', _1188, {
                    _101: true
                });
                _23._43(_28, 'click', '.highlight-masked', _1206, {
                    _101: true
                });
                _23._43(_28, 'click', '.mf-remove-excluded', _1204, {
                    _101: true
                });
                _23._43(_28, 'click', '.mf-remove-whitelisted', _1201, {
                    _101: true
                });
                _23._43(_28, 'click', '.mf-remove-tracked', _1200, {
                    _101: true
                });
                _23._43(_28, 'click', '.mf-remove-masked', _1199, {
                    _101: true
                });
                _23._43(_28, 'submit', _1198, {
                    _101: true
                });
                _23._43(_13, 'mouseover', _1194, {
                    _91: true
                });
                _23._43(_13, 'mouseleave', _1191, {
                    _91: true
                });
                _23._43(_13, 'mouseup', _1164, {
                    _91: true
                });
                _23._43(_13, 'mouseenter', _189, {
                    _91: true
                });
                _23._43(_13, 'mousemove', _189, {
                    _91: true
                });
                _23._43(_13, 'mousedown', _189, {
                    _91: true
                });
                _23._43(_13, 'click', _189, {
                    _91: true
                });
                _23._43(_13, 'mouseout', _189, {
                    _91: true
                });
                _23._43(_13, 'scroll', _119, {
                    _91: true,
                    _416: true
                });
                _23._43(_2, 'resize', _119, {
                    _91: true,
                    _416: true
                });
                var MutationObserver = _2.MutationObserver || _2.WebKitMutationObserver || _2.MozMutationObserver;
                if (MutationObserver) {
                    _299 = new MutationObserver(function(_860) {
                        var _1176 = _860.some(function(_93) {
                            if (_93.target.nodeType !== 1 || _11._94(_93.target, '#mouseflow *')) return false;
                            var _1179 = _93.oldValue && _93.oldValue.indexOf('mf-highlight') !== -1;
                            var _1178 = _93.target.classList.contains('mf-highlight');
                            var _1177 = _1179 || _1178;
                            if (_93.type === 'attributes' && _93.attributeName === 'class' && _1177) return false;
                            return true
                        });
                        if (_1176) _119();
                        _860.forEach(function(_93) {
                            _93.addedNodes.forEach(function(_19) {
                                if (!_19.shadowRoot) return;
                                _299.observe(_19.shadowRoot, {
                                    childList: true,
                                    subtree: true
                                });
                                _382(_19)
                            })
                        })
                    });
                    _299.observe(_13, {
                        attributes: true,
                        childList: true,
                        characterData: true,
                        subtree: true,
                        attributeOldValue: true
                    })
                }
            }

            function _1171() {
                _23._845();
                if (_299) _299.disconnect()
            }

            function _382(_78) {
                if (!_149) _149 = _890();
                if (!_78) _78 = _13;
                for (var _40 = _25._177(_78); _40; _40 = _25._171(_40)) {
                    _382(_40);
                    var _118 = _40.shadowRoot;
                    if (!_118) continue;
                    _382(_118);
                    if (_118.adoptedStyleSheets) {
                        if (_118.adoptedStyleSheets.indexOf(_149) > -1) continue;
                        var _811 = Array.prototype.slice.call(_118.adoptedStyleSheets);
                        _811.push(_149);
                        _118.adoptedStyleSheets = _811
                    } else {
                        if (_118.querySelector('.mf-privacy-tool-style')) continue;
                        var _58 = _13.createElement('style');
                        _58.type = 'text/css';
                        _58.innerHTML = _511();
                        _58.className = 'mf-privacy-tool-style';
                        _118.appendChild(_58)
                    }
                }
            }

            function _1168() {
                _12._154 = !_12._154;
                _85(_12);
                _11._333(_28, 'tool-closed', _12._154);
                _11._333(_13.body, 'mf-privacy-tool-opened', !_12._154);
                var _359 = _28.getElementsByClassName('step')[0];
                var _211 = _28.getElementsByClassName('tool-container')[0];
                if (_12._154) {
                    _11._67(_359, 'fade-out');
                    _11._110(_359, 'fade-in');
                    _11._67(_211, 'fade-in');
                    _11._110(_211, 'fade-out')
                } else {
                    _11._67(_359, 'fade-in');
                    _11._110(_359, 'fade-out');
                    _11._67(_211, 'fade-out');
                    _11._110(_211, 'fade-in')
                }
            }

            function _1167() {
                _12._66 = 'exclude';
                _85(_12);
                _343()
            }

            function _1166() {
                _12._66 = 'whitelist';
                _85(_12);
                _343()
            }

            function _1165() {
                _12._66 = 'track';
                _85(_12);
                _343()
            }

            function _1174() {
                _12._66 = 'masked';
                _85(_12);
                _343()
            }

            function _343() {
                _11._67(_28.getElementsByClassName('mf-tool-exclude')[0], 'active');
                _11._67(_28.getElementsByClassName('tool-exclude')[0], 'active');
                _11._67(_28.getElementsByClassName('mf-tool-whitelist')[0], 'active');
                _11._67(_28.getElementsByClassName('tool-whitelist')[0], 'active');
                _11._67(_28.getElementsByClassName('mf-tool-track')[0], 'active');
                _11._67(_28.getElementsByClassName('tool-track')[0], 'active');
                _11._67(_28.getElementsByClassName('mf-tool-masked')[0], 'active');
                _11._67(_28.getElementsByClassName('tool-masked')[0], 'active');
                _11._110(_28.getElementsByClassName('mf-tool-' + _12._66)[0], 'active');
                _11._110(_28.getElementsByClassName('tool-' + _12._66)[0], 'active')
            }

            function _1187(_6) {
                if (_12._66 === 'exclude') {
                    _755(_6.target.getAttribute('data-target'));
                    _119()
                }
            }

            function _1209(_6) {
                if (_12._66 === 'whitelist') {
                    _773(_6.target.getAttribute('data-target'));
                    _119()
                }
            }

            function _1188(_6) {
                if (_12._66 === 'track') {
                    _790(_6.target.getAttribute('data-target'));
                    _119()
                }
            }

            function _1206(_6) {
                if (_12._66 === 'masked') {
                    _777(_6.target.getAttribute('data-target'));
                    _119()
                }
            }

            function _1204(_6) {
                _755(_6.target.parentNode.getAttribute('data-target'));
                _119()
            }

            function _1201(_6) {
                _773(_6.target.parentNode.getAttribute('data-target'));
                _119()
            }

            function _1200(_6) {
                _790(_6.target.parentNode.getAttribute('data-target'));
                _119()
            }

            function _1199(_6) {
                _777(_6.target.parentNode.getAttribute('data-target'));
                _119()
            }

            function _1198() {
                _1153();
                _1131(_12._86, _12._84, _12._111, _12._106, function() {
                    _852();
                    _128.innerHTML = 'Saved';
                    _409();
                    _26._72(_503, 500)
                }, function() {
                    _852()
                })
            }

            function _1194(_6) {
                _26._148(_724);
                var _718 = _13.getElementsByClassName('mf-highlight');
                for (var _4 = 0; _4 < _718.length; _4++) {
                    _11._67(_718[_4], 'mf-highlight')
                }
                _11._110(_167, 'hidden');
                if (_189(_6) || _767(_6.target)) return;
                _11._110(_6.target, 'mf-highlight');
                _724 = _26._72(function() {
                    var _45 = _6.target.getBoundingClientRect();
                    _167.style.left = _45.left + _2.pageXOffset + 'px';
                    _167.style.top = _45.top + _2.pageYOffset + 'px';
                    _167.style.width = _45.width + 'px';
                    _167.style.height = _45.height + 'px';
                    _11._67(_167, 'hidden')
                }, 75)
            }

            function _1191(_6) {
                if (_189(_6)) return;
                if (_6.target === _13) {
                    _11._110(_167, 'hidden')
                }
            }

            function _1164(_6) {
                if (_189(_6)) return;
                if (_6.button !== 0 || _767(_6.target)) return;
                _11._67(_6.target, 'mf-highlight');
                var _8 = _1129(_6.target);
                if (_12._66 === 'exclude') {
                    _764(_8)
                } else if (_12._66 === 'whitelist') {
                    _760(_8)
                } else if (_12._66 === 'masked') {
                    _757(_8)
                } else {
                    _766(_8)
                }
                _119()
            }

            function _189(_6) {
                if (_12._154 || _6.target.nodeType !== 1 || _11._94(_6.target, '#mouseflow *')) return true;
                _6.preventDefault();
                _6.stopPropagation();
                return false
            }

            function _767(_1) {
                return _1 === _13.body || _11._94(_1, 'html') || (_12._66 === 'whitelist' && (!/INPUT|TEXTAREA/.test(_1.tagName) || /checkbox|radio|button|submit/.test(_1.type)))
            }

            function _766(_8) {
                if (_8 && _12._111.indexOf(_8) === -1) {
                    _12._111.unshift(_8);
                    _85(_12)
                }
                _184()
            }

            function _764(_8) {
                if (_8 && _12._86.indexOf(_8) === -1) {
                    _12._86.unshift(_8);
                    _85(_12)
                }
                _184()
            }

            function _760(_8) {
                if (_8 && _12._84.indexOf(_8) === -1) {
                    _12._84.unshift(_8);
                    _85(_12)
                }
                _184()
            }

            function _757(_8) {
                if (_8 && _12._106.indexOf(_8) === -1) {
                    _12._106.unshift(_8);
                    _85(_12)
                }
                _184()
            }

            function _755(_8) {
                if (_8 && _12._86.indexOf(_8) !== -1) {
                    _12._86 = _12._86.filter(function(_77) {
                        return _77 !== _8
                    });
                    _85(_12)
                }
                _184()
            }

            function _773(_8) {
                if (_8 && _12._84.indexOf(_8) !== -1) {
                    _12._84 = _12._84.filter(function(_77) {
                        return _77 !== _8
                    });
                    _85(_12)
                }
                _184()
            }

            function _790(_8) {
                if (_8 && _12._111.indexOf(_8) !== -1) {
                    _12._111 = _12._111.filter(function(_77) {
                        return _77 !== _8
                    });
                    _85(_12)
                }
                _184()
            }

            function _777(_8) {
                if (_8 && _12._106.indexOf(_8) !== -1) {
                    _12._106 = _12._106.filter(function(_77) {
                        return _77 !== _8
                    });
                    _85(_12)
                }
                _184()
            }

            function _119() {
                _26._148(_206);
                if (!_206) {
                    _26._72(function() {
                        if (_206) {
                            _26._148(_206);
                            _775();
                            _206 = undefined
                        }
                    }, 200)
                }
                _206 = _26._72(function() {
                    _775();
                    _206 = undefined
                }, 100)
            }

            function _775() {
                var _728 = _28.querySelectorAll('.highlight-excluded,.highlight-whitelisted,.highlight-tracked,.highlight-masked'),
                    _4;
                for (_4 = 0; _4 < _728.length; _4++) {
                    _28.removeChild(_728[_4])
                }
                _12._86.forEach(function(_8) {
                    var _55 = _150(_8, _13);
                    for (_4 = 0; _4 < _55.length; _4++) {
                        _28.appendChild(_1210(_8, _55[_4].getBoundingClientRect()))
                    }
                });
                _12._84.forEach(function(_8) {
                    var _55 = _150(_8, _13);
                    for (_4 = 0; _4 < _55.length; _4++) {
                        _28.appendChild(_1146(_8, _55[_4].getBoundingClientRect()))
                    }
                });
                _12._111.forEach(function(_8) {
                    var _55 = _150(_8, _13);
                    for (_4 = 0; _4 < _55.length; _4++) {
                        _28.appendChild(_1119(_8, _55[_4].getBoundingClientRect()))
                    }
                });
                _12._106.forEach(function(_8) {
                    var _55 = _150(_8, _13);
                    for (_4 = 0; _4 < _55.length; _4++) {
                        _28.appendChild(_1127(_8, _55[_4].getBoundingClientRect()))
                    }
                })
            }

            function _150(_8, _34) {
                try {
                    var _55 = [];
                    _8.split(',').forEach(function(_8) {
                        var _49 = _8.split(' > :document-fragment: > ', 1);
                        _34.querySelectorAll(_49[0]).forEach(function(_1) {
                            if (_49[1] && _1.shadowRoot) {
                                _150(_49[1], _1.shadowRoot).forEach(function(_1) {
                                    _55.push(_1)
                                })
                            } else {
                                _55.push(_1)
                            }
                        })
                    });
                    return _55
                } catch (_59) {
                    _7('Could not get element from selector: ' + ex.message)
                }
            }

            function _1131(_86, _84, _111, _106, _152, _1130) {
                if (_166) {
                    _7('Attempted to save CSS lists while previous save was in progress');
                    return
                }
                _166 = _152;
                _143 = _1130;
                _1142();
                _307.postMessage({
                    message: 'MouseflowPrivacyTool_Save',
                    blacklist: _86,
                    whitelist: _84,
                    tracked: _111,
                    masked: _106
                }, _48);
                _26._72(function() {
                    if (_166 === _152) {
                        _7('Saving CSS lists timed out');
                        if (_143) _143();
                        _166 = undefined;
                        _143 = undefined;
                        _519('Uh oh! We couldn\'t save your changes.<br><br>' + 'Please log into Mouseflow and try again.')
                    }
                }, 7500)
            }

            function _1129(_1) {
                if (_1 == null) return null;
                try {
                    var _36 = [];
                    while (_1) {
                        var _34 = _1.getRootNode ? _1.getRootNode() : _13;
                        var _8 = _732(_1, _34);
                        _36.unshift(_8);
                        _1 = _34.host
                    }
                    return _36.join(' > :document-fragment: > ')
                } catch (ex) {
                    _7('Could not get element selector: ' + ex.message);
                    return null
                }
            }

            function _1217(_1, _34) {
                var _272 = _1122(_1, _34);
                if (!_272) return null;
                if (_11._94(_1, _272)) return _272;
                var _98 = _34.querySelector(_272);
                var _138 = _1;
                var _49 = [];
                while (_138 && _138 !== _98) {
                    var _37 = _487(_138, _34);
                    if (_37.length === 0) _37.push(_750(_138));
                    _49.unshift(_37);
                    _138 = _138.parentNode
                }
                _49.unshift(_272);
                return _490(_49, _34)
            }

            function _732(_1, _34, _49) {
                if (!_49) _49 = [];
                var _37 = _487(_1, _34);
                _49.unshift(_37);
                var _8 = _490(_49, _34);
                if (_8) return _8;
                if (_37.length === 0) {
                    _37.push(_750(_1));
                    _8 = _490(_49, _34);
                    if (_8) return _8
                }
                return _732(_1.parentNode, _34, _49)
            }

            function _490(_49, _34) {
                var _489 = _49.length > 1 ? _1140.apply(this, _49) : _49[0];
                for (var _4 = 0; _4 < _489.length; _4++) {
                    if (_34.querySelectorAll(_489[_4]).length === 1) return _489[_4]
                }
                return null
            }

            function _1122(_1, _34) {
                var _138 = _1;
                while (_138) {
                    var _37 = _487(_138, _34);
                    for (var _4 = 0; _4 < _37.length; _4++) {
                        if (_34.querySelectorAll(_37[_4]).length === 1) return _37[_4]
                    }
                    _138 = _138.parentNode
                }
                return null
            }

            function _487(_1, _34) {
                if (_1 === _13.body) return ['body'];
                var _37 = [];
                var _78 = _1.parentNode;
                var _4;
                var _36 = _1.getAttribute('id');
                var _8 = '#' + _11._194(_36);
                if (_36 && _34.querySelectorAll(_8).length === 1 && !_11._187(_1, 'data-mf-ignore-child-ids') && _3.useIdSelectors) return [_8];
                var _22 = _1.getAttribute('name');
                _8 = '[name="' + _11._194(_22) + '"]';
                if (_22) {
                    if (_34.querySelectorAll(_8).length === 1) return [_8];
                    if (_78.querySelectorAll(_8).length === 1) _37.push(_8)
                }
                var _113 = _11._225(_1);
                for (_4 = 0; _4 < _113.length; _4++) {
                    _8 = '.' + _11._194(_113[_4]);
                    if (_34.querySelectorAll(_8).length === 1) return [_8];
                    if (_78.querySelectorAll(_8).length === 1) _37.push(_8)
                }
                for (_4 = 0; _4 < _113.length; _4++) {
                    _8 = _11._194(_1.tagName.toLowerCase()) + '.' + _11._194(_113[_4]);
                    if (_34.querySelectorAll(_8).length === 1) return [_8];
                    if (_78.querySelectorAll(_8).length === 1) _37.push(_8)
                }
                return _37
            }

            function _750(_1) {
                var _8 = _11._194(_1.tagName.toLowerCase());
                if (_1.parentNode.querySelectorAll(_8).length === 1) return _8;
                var _241 = 0;
                var _408 = _1;
                while (_408) {
                    if (_408.tagName === _1.tagName) _241++;
                    _408 = _408.previousElementSibling
                }
                _8 += ':nth-of-type(' + _241 + ')';
                return _8
            }

            function _1140() {
                var _37, _242, _243, _4;
                var _129 = 0;
                var _223 = arguments.length - 1;
                var _397 = false;
                var _315 = true;
                while (_129 < _223) {
                    _242 = undefined;
                    for (_4 = 0; _4 <= _129; _4++) {
                        _242 = _242 ? _406(_242, arguments[_4], ' > ') : arguments[_4]
                    }
                    _243 = undefined;
                    for (_4 = arguments.length - 1; _4 >= _223; _4--) {
                        _243 = _243 ? _406(arguments[_4], _243, ' > ') : arguments[_4]
                    }
                    var _400 = (_129 + 1) == _223 ? ' > ' : ' ';
                    _37 = _37 ? _37.concat(_406(_242, _243, _400)) : _406(_242, _243, _400);
                    if (_315 && _397) {
                        _223--;
                        _397 = false;
                        _315 = true
                    } else if (_315) {
                        _223--;
                        _397 = true;
                        _315 = false
                    } else {
                        _129++;
                        if (_129 != _223) _223++;
                        _397 = true;
                        _315 = true
                    }
                }
                return _37
            }

            function _406(_843, _844, _400) {
                var _37 = [];
                for (var _4 = 0; _4 < _843.length; _4++) {
                    for (var _135 = 0; _135 < _844.length; _135++) {
                        _37.push(_843[_4] + _400 + _844[_135])
                    }
                }
                return _37
            }

            function _1154() {
                return _54._227('mf_privacyTool') || null
            }

            function _85(_39) {
                _54._240('mf_privacyTool', _39)
            }

            function _409() {
                _54._236('mf_privacyTool')
            }

            function _1153() {
                _128.setAttribute('disabled', '');
                _128.setAttribute('original-html', _128.innerHTML);
                _128.innerHTML = '<i>&bull;</i> <i>&bull;</i> <i>&bull;</i> <i>&bull;</i>';
                _11._110(_128, 'loading')
            }

            function _852() {
                _11._67(_128, 'loading');
                _128.innerHTML = _128.getAttribute('original-html');
                _128.removeAttribute('original-html');
                _128.removeAttribute('disabled')
            }

            function _184() {
                _853.innerHTML = _1042(_12._86);
                _847.innerHTML = _895(_12._84);
                _832.innerHTML = _894(_12._111);
                _805.innerHTML = _893(_12._106);
                _162.innerHTML = _509(_12._86, _12._84, _12._111, _12._106);
                _11._67(_162, 'red')
            }

            function _1143(_199) {
                if (!_389) return;
                _389.innerHTML = _199;
                _11._110(_389, 'red')
            }

            function _519(_199) {
                if (!_162) return;
                _162.innerHTML = _199;
                _11._110(_162, 'red')
            }

            function _1142() {
                if (!_162) return;
                _162.innerHTML = _509(_12._86, _12._84, _12._111, _12._106);
                _11._67(_162, 'red')
            }

            function _1141(_12) {
                var _29 = _13.createElement('div');
                _29.className = 'privacy-tool is-loading';
                _29.innerHTML = _1128(_12);
                if (_12._154) _29.className += ' tool-closed';
                var _58 = _13.createElement('style');
                _58.type = 'text/css';
                _58.innerHTML = _511();
                _29.appendChild(_58);
                return _29
            }

            function _1186() {
                var _29 = _13.createElement('div');
                _29.className = 'highlight-box';
                return _29
            }

            function _1210(_8, _45) {
                var _29 = _13.createElement('div');
                _29.className = 'highlight-box highlight-excluded';
                _29.setAttribute('data-target', _8);
                _29.style.left = _45.left + _2.pageXOffset + 'px';
                _29.style.top = _45.top + _2.pageYOffset + 'px';
                _29.style.width = _45.width + 'px';
                _29.style.height = _45.height + 'px';
                return _29
            }

            function _1146(_8, _45) {
                var _29 = _13.createElement('div');
                _29.className = 'highlight-box highlight-whitelisted';
                _29.setAttribute('data-target', _8);
                _29.style.left = _45.left + _2.pageXOffset + 'px';
                _29.style.top = _45.top + _2.pageYOffset + 'px';
                _29.style.width = _45.width + 'px';
                _29.style.height = _45.height + 'px';
                return _29
            }

            function _1119(_8, _45) {
                var _29 = _13.createElement('div');
                _29.className = 'highlight-box highlight-tracked';
                _29.setAttribute('data-target', _8);
                _29.style.left = _45.left + _2.pageXOffset + 'px';
                _29.style.top = _45.top + _2.pageYOffset + 'px';
                _29.style.width = _45.width + 'px';
                _29.style.height = _45.height + 'px';
                return _29
            }

            function _1127(_8, _45) {
                var _29 = _13.createElement('div');
                _29.className = 'highlight-box highlight-masked';
                _29.setAttribute('data-target', _8);
                _29.style.left = _45.left + _2.pageXOffset + 'px';
                _29.style.top = _45.top + _2.pageYOffset + 'px';
                _29.style.width = _45.width + 'px';
                _29.style.height = _45.height + 'px';
                return _29
            }

            function _1128(_12) {
                return ('<form action="#" id="mf_privacy_tool">' + _1189(_12) + _1015(_12) + '</form>')
            }

            function _1189(_12) {
                return ('<div class="step step-block' + (_12._154 ? ' fade-in' : '') + '">' + '<div class="widget-header">' + '<div class="widget-text">Open privacy tool</div>' + '<div class="widget-toggle">' + '<a href="#" class="btn-arrow btn-arrow--up mf-tool-toggle"></a>' + '</div>' + '</div>' + '</div>')
            }

            function _1015() {
                return ('<div class="tool-container' + (_12._154 ? '' : ' fade-in') + '">' + '<div class="tool-header">' + '<div class="tool-title">' + '<svg class="logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="37" height="34" viewBox="0 0 37 34"><g id="logomark_dark" transform="translate(0 0.281)"><path id="Path_7123" class="logo-path" data-name="Path 7123" d="M36.916,16.723c0-2.879-2.308-5.423-6.032-7.173.347-4.1-.708-7.367-3.2-8.812S21.832.029,18.452,2.378c-.111-.078-.218-.153-.329-.227-3.4-2.267-6.552-2.768-8.9-1.417C6.735,2.171,5.685,5.444,6.034,9.547,2.308,11.3,0,13.844,0,16.723S2.311,22.149,6.038,23.9c-.013.133-.023.268-.03.4-.268,4.069.878,7.057,3.219,8.408a5.667,5.667,0,0,0,2.877.738,11.533,11.533,0,0,0,6.353-2.379,11.533,11.533,0,0,0,6.353,2.379,5.687,5.687,0,0,0,2.877-.738c2.343-1.352,3.485-4.339,3.222-8.408-.009-.133-.018-.268-.031-.4C34.607,22.149,36.916,19.6,36.916,16.723Zm-12.09-14.7a3.668,3.668,0,0,1,1.855.455c1.548.894,2.363,3.181,2.233,6.268a28.258,28.258,0,0,0-5.13-1.254,27.937,27.937,0,0,0-3.652-3.81A9.132,9.132,0,0,1,24.826,2.024ZM8.217,10.82a24.675,24.675,0,0,1,3.168-.941c-.432.652-.85,1.329-1.261,2.03s-.788,1.417-1.133,2.125a23.11,23.11,0,0,1-.774-3.215ZM22.7,24.077a34.406,34.406,0,0,1-4.243.256,34.365,34.365,0,0,1-4.242-.256c-.992-.123-1.928-.29-2.816-.492a23.143,23.143,0,0,1-3.174-.946,23.7,23.7,0,0,1,.765-3.222c.275-.885.6-1.785.982-2.692a33.8,33.8,0,0,1,1.9-3.811A34.244,34.244,0,0,1,14.2,9.381q.908-1.2,1.842-2.206A23.422,23.422,0,0,1,18.453,4.9a23.659,23.659,0,0,1,2.408,2.278A27.591,27.591,0,0,1,22.7,9.381a34.1,34.1,0,0,1,2.343,3.533,34.039,34.039,0,0,1,1.9,3.811,28.251,28.251,0,0,1,.982,2.692,23.66,23.66,0,0,1,.769,3.225,23.235,23.235,0,0,1-3.179.946C24.626,23.785,23.688,23.952,22.7,24.077Zm-4.243,2.267c.82,0,1.626-.027,2.408-.078a23.788,23.788,0,0,1-2.408,2.281,23.478,23.478,0,0,1-2.408-2.281Q17.228,26.344,18.457,26.344Zm9.468-12.306q-.526-1.071-1.133-2.125T25.53,9.881a24.368,24.368,0,0,1,3.166.939,22.89,22.89,0,0,1-.771,3.219ZM10.235,2.479a3.737,3.737,0,0,1,1.877-.463A9.029,9.029,0,0,1,16.778,3.68a28.033,28.033,0,0,0-3.65,3.812A27.992,27.992,0,0,0,8,8.749C7.866,5.659,8.683,3.373,10.235,2.479ZM2.017,16.723c0-1.928,1.646-3.715,4.31-5.072a27.76,27.76,0,0,0,1.479,5.078,28.156,28.156,0,0,0-1.475,5.066c-2.75-1.429-4.318-3.283-4.318-5.072Zm10.074,14.7a3.684,3.684,0,0,1-1.857-.456C8.661,30.055,7.853,27.78,8,24.7a28.105,28.105,0,0,0,5.122,1.254,28.219,28.219,0,0,0,3.652,3.812A9.118,9.118,0,0,1,12.092,31.42Zm14.592-.456c-1.55.894-3.937.463-6.544-1.2a28.218,28.218,0,0,0,3.652-3.812A28.193,28.193,0,0,0,28.917,24.7c.146,3.081-.662,5.357-2.237,6.265Zm3.909-9.169a28.41,28.41,0,0,0-1.475-5.065A28.321,28.321,0,0,0,30.6,11.651c2.662,1.357,4.308,3.144,4.308,5.072-.007,1.789-1.575,3.642-4.321,5.072Z" transform="translate(0 0)" fill="#0f172f"/><path id="Path_7124" data-name="Path 7124" d="M100,75.4a29.752,29.752,0,0,0-5,10.427l5-2.726,5,2.726A30.653,30.653,0,0,0,100,75.4Z" transform="translate(-81.541 -64.726)" fill="#0f172f"/></g></svg>' + '<h3>Click elements in the interface that you wish to manage</h3>' + '<div class="tool-toggle">' + '<div class="tool-toggle-text">' + '<b> Hide to navigate </b>' + '</div>' + '<div class="tool-toggle-icon">' + '<a href="#" class="btn-arrow btn-arrow--down mf-tool-toggle"></a>' + '</div>' + '</div>' + '<div class="tool-close">' + '<div class="tool-toggle-text">' + 'Close' + '</div>' + '<div class="tool-toggle-icon">' + '<a href="#" class="btn-cross mf-tool-close"></a>' + '</div>' + '</div>' + '</div>' + '</div>' + '<div class="tool-content">' + '<ul class="tool-menu">' + '<li class="tool-menu-item mf-tool-exclude' + (_12._66 === 'exclude' ? ' active' : '') + '">' + 'Excluded content' + '</li>' + '<li class="tool-menu-item mf-tool-masked' + (_12._66 === 'masked' ? ' active' : '') + '">' + 'Masked content' + '</li>' + '<li class="tool-menu-item mf-tool-whitelist' + (_12._66 === 'whitelist' ? ' active' : '') + '">' + 'Whitelisted fields' + '</li>' + '<li class="tool-menu-item mf-tool-track' + (_12._66 === 'track' ? ' active' : '') + '">' + 'Tracked elements' + '</li>' + '</ul>' + '<div class="tool-exclude' + (_12._66 === 'exclude' ? ' active' : '') + '">' + '<h2>Exclude content</h2>' + '<p>' + 'To exclude content from being tracked, click on the element(s) you want to remove. ' + 'The excluded elements and any descendants inside those elements will not be stored or visible in Recordings or Heatmaps.' + 'The CSS selectors of the selected elements will appear in the list below. ' + '</p>' + '<p>' + 'Click "Hide to navigate" to exclude more content or "Save and close" to apply changes. Check our <a href="https://help.mouseflow.com/en/articles/5973120-excluded-whitelisted-tracked-fields" target="_blank">Support Guide</a> for details and best practices.' + '</p>' + '<h3>Excluded content</h3>' + '<div>' + '<output></output>' + '</div>' + '</div>' + '<div class="tool-masked' + (_12._66 === 'masked' ? ' active' : '') + '">' + '<h2>Mask content</h2>' + '<p>' + 'Masking elements in the interface enables you to hide the content from being recorded without loosing interaction data (e.g. clicks, hovers) on that element. ' + 'Click the element in the interface that you would like to mask. ' + 'The CSS selectors of the selected elements will appear in the list below. ' + '</p>' + '<p>' + 'Click "Hide to navigate" to mask more content or "Save and close" to apply changes. Check our <a href="https://help.mouseflow.com/en/articles/5973120-excluded-whitelisted-tracked-fields" target="_blank">Support Guide</a> for details and best practices.' + '</p>' + '<h3>Masked content</h3>' + '<div>' + '<output></output>' + '</div>' + '</div>' + '<div class="tool-whitelist' + (_12._66 === 'whitelist' ? ' active' : '') + '">' + '<h2>Whitelist input fields</h2>' + '<p>' + 'Mouseflow automatically masks all fields to protect personal data. However, you can whitelist specific input fields by clicking on them. ' + 'This allows Mouseflow to record input in those fields. ' + 'The CSS selectors of the selected elements will appear in the list below. ' + '</p>' + '<p>' + ' Click "Hide to navigate" to whitelist more input fields or "Save and close" to apply changes. Check our <a href="https://help.mouseflow.com/en/articles/5973120-excluded-whitelisted-tracked-fields" target="_blank">Support Guide</a> for details and best practices.' + '</p>' + '<h3>Whitelisted fields</h3>' + '<div>' + '<output></output>' + '</div>' + '</div>' + '<div class="tool-track' + (_12._66 === 'track' ? ' active' : '') + '">' + '<h2>Tracked elements</h2>' + '<p>' + 'When viewing a Heatmap, most links show interaction data (e.g. clicks and hovers).' + 'If you&quot;ve found an element that is not being tracked, you can select it here. ' + 'This will ensure the additional metrics are shown in your Heatmaps. ' + 'The CSS selectors of the selected elements will appear in the list below. ' + '</p>' + '<p>' + 'Click "Hide to navigate" or "Save and close" to finish. Check our <a href="https://help.mouseflow.com/en/articles/5973120-excluded-whitelisted-tracked-fields" target="_blank">Support Guide</a> for details and best practices.' + '</p>' + '<h3>Tracked elements</h3>' + '<div>' + '<output></output>' + '</div>' + '</div>' + '<div class="tool-status">' + '<div class="tool-status-text">' + _509(_12._86, _12._84, _12._111, _12._106) + '</div>' + '<div class="tool-status-buttons">' + '<button type="submit" class="btn-widget">Save and close</button>' + '<a href="#" class="green bold mf-tool-close">Close Privacy Tool</a>' + '</div>' + '</div>' + '<div class="tool-loading">' + '<h2 class="loading">Loading the Privacy Tool<i>.</i><i>.</i><i>.</i></h2>' + '</div>' + '<div class="tool-message">' + '<h3>Browser window is to small to load the Privacy Tool</h3>' + '<p>To use Mouseflow\'s Privacy Tool, you need to view the page in a larger browser window.</p>' + '</div>' + '</div>' + '</div>')
            }

            function _1042(_49) {
                return _49.map(function(_8) {
                    return ('<div class="tm-tag" data-target="' + _11._158(_8) + '">' + _11._158(_8) + '<a href="#" class="btn-cross mf-remove-excluded"></a>' + '</div>')
                }).join('')
            }

            function _895(_49) {
                return _49.map(function(_8) {
                    return ('<div class="tm-tag" data-target="' + _11._158(_8) + '">' + _11._158(_8) + '<a href="#" class="btn-cross mf-remove-whitelisted"></a>' + '</div>')
                }).join('')
            }

            function _894(_49) {
                return _49.map(function(_8) {
                    return ('<div class="tm-tag" data-target="' + _11._158(_8) + '">' + _11._158(_8) + '<a href="#" class="btn-cross mf-remove-tracked"></a>' + '</div>')
                }).join('')
            }

            function _893(_49) {
                return _49.map(function(_8) {
                    return ('<div class="tm-tag" data-target="' + _11._158(_8) + '">' + _11._158(_8) + '<a href="#" class="btn-cross mf-remove-masked"></a>' + '</div>')
                }).join('')
            }

            function _509(_86, _84, _813, _829) {
                return '<p>You have:</p>' + '<p>' + '&nbsp;&bull; excluded <i class="emphasis"> ' + _86.length + '</i> ' + (_86.length === 1 ? 'element' : 'elements') + '<br>' + '&nbsp;&bull; masked <i class="emphasis"> ' + _829.length + '</i> ' + (_829.length === 1 ? 'element' : 'elements') + '<br>' + '&nbsp;&bull; whitelisted <i class="emphasis">' + _84.length + '</i> input ' + (_84.length === 1 ? 'field' : 'fields') + '<br>' + '&nbsp;&bull; tracked <i class="emphasis">' + _813.length + '</i> input ' + (_813.length === 1 ? 'element' : 'elements') + '</p>'
            }

            function _890() {
                var _144 = new CSSStyleSheet();
                _144.replace(_511());
                return _144
            }

            function _511() {
                return ('@font-face {' + 'font-family: "Open Sans";' + 'font-style: normal;' + 'font-weight: 400;' + 'src: url(https://cdn.mouseflow.com/fonts/opensans/opensans-regular.woff2) format("woff2");' + '}' + '@font-face {' + 'font-family: "Open Sans";' + 'font-style: normal;' + 'font-weight: 700;' + 'src: url(https://cdn.mouseflow.com/fonts/opensans/opensans-bold.woff2) format("woff2");' + '}' + ':root {' + '--deep-ocean: #08163c;' + '--dusty-cloud: #f7f9fc;' + '--dark-border: #bbc8e0;' + '--lighter-navy: #d4dbe3;' + '--dark-mode: #10172D;' + '--serious-business: #0b65e3;' + '--light-blue: #66A7FD;' + '--subtle-warmth: #7162e3;' + '--lighter-aqua: #ebf2fa;' + '--dusty-cloud-darker: #E4E9F2;' + '--deep-ocean-light: #A1B2D3;' + '--redwine-vibes: #cd575f;' + '}' + '.mf-highlight {' + 'cursor: pointer !important;' + '}' + '.mf-privacy-tool-opened iframe {' + 'pointer-events: none;' + '}' + '#mouseflow {' + 'font-weight: 400;' + 'font-family: \'Open Sans\', Arial, sans-serif;' + '}' + '#mouseflow .highlight-box {' + 'background-color: #add8e6;' + 'border: 2px dotted #808080;' + 'position: absolute;' + 'border-radius: 2px;' + 'z-index: 2147483646;' + 'cursor: pointer;' + 'pointer-events: none;' + 'opacity: 0.5;' + '-webkit-transition: opacity .075s linear;' + 'transition: opacity .075s linear;' + '}' + '#mouseflow .highlight-box.hidden,' + '#mouseflow .tool-closed .highlight-box {' + 'opacity: 0;' + '}' + '#mouseflow .highlight-box.highlight-excluded {' + 'background-color: #FFD2CF80;' + 'opacity: 1;' + 'pointer-events: initial;' + '}' + '#mouseflow .highlight-box.highlight-whitelisted {' + 'background-color: #70C59780;' + 'opacity: 1;' + 'pointer-events: initial;' + '}' + '#mouseflow .highlight-box.highlight-tracked {' + 'background-color: #92C6FB80;' + 'opacity: 1;' + 'pointer-events: initial;' + '}' + '#mouseflow .highlight-box.highlight-masked {' + 'background-color: #FFECBD80;' + 'opacity: 1;' + 'pointer-events: initial;' + '}' + '#mouseflow .tool-closed .highlight-box.highlight-excluded,' + '#mouseflow .tool-closed .highlight-box.highlight-whitelisted,' + '#mouseflow .tool-closed .highlight-box.highlight-masked,' + '#mouseflow .tool-closed .highlight-box.highlight-tracked {' + 'pointer-events: none;' + '}' + '#mouseflow .btn-widget {' + 'background: var(--serious-business);' + '}' + '#mouseflow .widget-header {' + 'background: var(--dusty-cloud);' + '}' + '#mouseflow .widget-text,' + '#mouseflow .btn-arrow,' + '#mouseflow .btn-cross {' + 'color: var(--deep-ocean);' + '}' + '#mouseflow .btn-widget {' + 'color: white;' + '}' + '#mouseflow .tm-tag {' + 'margin: 7px 7px 0 0;' + 'padding: 7px;' + 'display: inline-block;' + 'border-radius: 8px;' + 'border: 1px solid var(--dark-border);' + 'background-color: var(--dusty-cloud);' + 'color: var(--deep-ocean);' + 'font-size: 13px;' + '}' + '#mouseflow .step {' + 'visibility: hidden;' + 'opacity: 0;' + 'position: fixed;' + 'bottom: 30px;' + 'right: 30px;' + 'z-index: 2147483647;' + 'width: 300px;' + 'border-radius: 8px;' + 'border: 1px solid var(--deep-ocean);' + 'overflow: hidden;' + '}' + '#mouseflow a:hover {' + 'text-decoration: underline;' + '}' + '#mouseflow h2 {' + 'font-size: 21px;' + 'font-weight: 700;' + 'line-height: 1.4em;' + 'margin-bottom: 6px;' + '}' + '#mouseflow h3 {' + 'font-size: 16px;' + 'font-weight: 700;' + 'line-height: 1.4em;' + 'color: #08163C;' + '}' + '#mouseflow p {' + 'margin-bottom: 8px;' + 'line-height: 1.4em;' + '}' + '#mouseflow .green {' + 'color: var(--deep-ocean);' + '}' + '#mouseflow .red {' + 'color: var(--redwine-vibes);' + '}' + '#mouseflow .emphasis {' + 'color: var(--subtle-warmth);' + 'font-weight: 700;' + '}' + '#mouseflow .bold {' + 'font-weight: 700;' + '}' + '#mouseflow .tool-container {' + 'visibility: visible;' + 'opacity: 0;' + 'position: fixed;' + 'bottom: 0;' + 'left: 0;' + 'width: 100%;' + 'height: 350px;' + 'max-height: 40%;' + 'overflow: hidden;' + 'background-color: white;' + 'box-shadow: 0 0 6px var(--deep-ocean-light);' + 'z-index: 2147483647;' + '}' + '#mouseflow .tool-header {' + 'background-color: var(--dusty-cloud);' + 'height: 58px;' + 'border: 1px solid var(--dusty-cloud-darker);' + '}' + '#mouseflow .tool-title { ' + 'display: flex;' + 'vertical-align: middle;' + 'align-items: center;' + '}' + '#mouseflow .logo {' + 'display: inline;' + 'height: 30px;' + 'margin: 14px 10px;' + 'fill: black;' + '}' + '#mouseflow .tool-toggle,' + '#mouseflow .tool-close {' + 'margin-left: auto;' + 'padding: 18px 24px;' + '}' + '#mouseflow .is-loading .tool-close {' + 'display: block;' + '}' + '#mouseflow .is-loading .tool-toggle,' + '#mouseflow .tool-close {' + 'display: none;' + '}' + '#mouseflow .tool-toggle-text {' + 'display: inline-block;' + 'color: var(--deep-ocean);' + 'font-size: 16px;' + 'font-weight: 700;' + '}' + '#mouseflow .tool-toggle-icon {' + 'width: 23px;' + 'display: inline-block;' + 'position: relative;' + 'top: 0px;' + '}' + '#mouseflow .tool-close .tool-toggle-icon {' + 'top: 4px;' + '}' + '#mouseflow .tool-content {' + 'height: calc(100% - 58px);' + '}' + '#mouseflow .tool-menu {' + 'width: 15%;' + 'height: 100%;' + 'float: left;' + '}' + '#mouseflow .tool-menu-item {' + 'background-color: var(--dusty-cloud);' + 'color: var(--deep-ocean);' + 'cursor: pointer;' + 'height: 40px;' + 'padding: 12px;' + '}' + '#mouseflow .tool-menu-item.active {' + 'position: relative;' + 'background-color: var(--lighter-navy);' + 'color: var(--deep-ocean);' + 'cursor: default;' + '}' + '#mouseflow .tool-exclude,' + '#mouseflow .tool-whitelist,' + '#mouseflow .tool-track,' + '#mouseflow .tool-masked {' + 'display: none;' + 'width: 70%;' + 'height: 100%;' + 'float: left;' + 'color: var(--deep-ocean);' + 'overflow-y: auto;' + 'overflow-x: hidden;' + 'padding: 10px 20px;' + '}' + '#mouseflow .tool-exclude p, #mouseflow .tool-whitelist p, #mouseflow .tool-track p, #mouseflow .tool-masked p {' + 'color: black;' + '}' + '#mouseflow .tool-exclude.active,' + '#mouseflow .tool-whitelist.active,' + '#mouseflow .tool-masked.active,' + '#mouseflow .tool-track.active {' + 'display: block;' + '}' + '#mouseflow .tool-exclude::-webkit-scrollbar,' + '#mouseflow .tool-whitelist::-webkit-scrollbar,' + '#mouseflow .tool-masked::-webkit-scrollbar,' + '#mouseflow .tool-track::-webkit-scrollbar {' + 'width: 8px;' + '}' + '#mouseflow .tool-exclude::-webkit-scrollbar-track,' + '#mouseflow .tool-whitelist::-webkit-scrollbar-track,' + '#mouseflow .tool-masked::-webkit-scrollbar-track,' + '#mouseflow .tool-track::-webkit-scrollbar-track {' + 'border-radius: 10px;' + 'background-color: #F5F5F5;' + '-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);' + '}' + '#mouseflow .tool-exclude::-webkit-scrollbar-thumb,' + '#mouseflow .tool-whitelist::-webkit-scrollbar-thumb,' + '#mouseflow .tool-masked::-webkit-scrollbar-thumb,' + '#mouseflow .tool-track::-webkit-scrollbar-thumb {' + 'border-radius: 10px;' + 'background-color: #a7a7a7;' + '-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);' + '}' + '#mouseflow .tool-status {' + 'width: 15%;' + 'background-color: var(--dusty-cloud);' + 'color: var(--deep-ocean);' + 'height: 100%;' + 'float: left;' + 'position: relative;' + '}' + '#mouseflow .tool-status-text {' + 'font-size: 16px;' + 'font-weight: 300;' + 'text-align: left;' + 'padding: 0 15px;' + 'position: absolute;' + 'top: 40px;' + '}' + '#mouseflow .tool-status-buttons {' + 'width: 100%;' + 'text-align: center;' + 'position: absolute;' + 'padding: 0 30px;' + 'bottom: 40px;' + '}' + '#mouseflow .tool-loading {' + 'width: 100%;' + 'height: calc(100% - 58px);' + 'background-color: white;' + 'color: rgb(71, 64, 62);' + 'position: absolute;' + 'top: 58px;' + 'z-index: 2;' + 'visibility: hidden;' + 'opacity: 0;' + '-webkit-animation: fadeOut .3s linear;' + 'animation: fadeOut .3s linear;' + '}' + '#mouseflow .is-loading .tool-loading {' + 'visibility: visible;' + 'opacity: 1;' + '-webkit-animation: fadeIn .3s linear;' + 'animation: fadeIn .3s linear;' + '}' + '#mouseflow .tool-loading h2 {' + 'position: absolute;' + 'left: 50%;' + 'top: 50%;' + '-webkit-transform: translate(-50%, -50%);' + '-ms-transform: translate(-50%, -50%);' + 'transform: translate(-50%, -50%);' + '}' + '#mouseflow .widget-header {' + 'color: #fff;' + 'padding: 12px 15px;' + 'vertical-align: middle;' + 'overflow: hidden;' + 'position: relative;' + 'z-index: 1;' + '-webkit-transition: opacity .3s linear;' + 'transition: opacity .3s linear;' + '}' + '#mouseflow .widget-header:hover {' + 'background-color: var(--lighter-aqua);' + '}' + '#mouseflow .widget-text {' + 'font-size: 16px;' + 'line-height: 20px;' + 'width: 245px;' + 'display: inline-block;' + 'vertical-align: middle;' + '}' + '#mouseflow .widget-toggle {' + 'width: 20px;' + 'display: inline-block;' + 'vertical-align: middle;' + 'margin: 0;' + '}' + '#mouseflow .btn-arrow,' + '#mouseflow .btn-cross {' + 'float: right;' + 'z-index: 10;' + 'line-height: .5;' + '}' + '#mouseflow .tool-toggle-icon .btn-arrow,' + '#mouseflow .tool-toggle-icon .btn-cross {' + 'font-size: 23px;' + '}' + '#mouseflow .widget-toggle .btn-arrow {' + 'font-size: 23px;' + '}' + '#mouseflow .tm-tag .btn-cross {' + 'margin: 3px 0 0 7px;' + 'font-weight: 700;' + 'font-size: 16px;' + '}' + '#mouseflow .btn-arrow--up {' + '-webkit-transform: rotate(-90deg) scale(1.5, 1.5);' + '-ms-transform: rotate(-90deg) scale(1.5, 1.5);' + 'transform: rotate(-90deg) scale(1.5, 1.5);' + '}' + '#mouseflow .btn-arrow--down {' + '-webkit-transform: rotate(+90deg) scale(1.5, 1.5);' + '-ms-transform: rotate(+90deg) scale(1.5, 1.5);' + 'transform: rotate(+90deg) scale(1.5, 1.5);' + '}' + '#mouseflow .widget-toggle .btn-arrow:before {' + 'content: "";' + 'display: inline;' + 'position: absolute;' + 'top: -185px;' + 'left: -15px;' + 'right: -15px;' + 'bottom: -15px;' + 'display: block;' + '}' + '#mouseflow .tool-toggle-icon .btn-arrow:before {' + 'content: "";' + 'display: inline;' + 'position: absolute;' + 'top: -10px;' + 'left: -15px;' + 'right: -15px;' + 'bottom: -100px;' + 'display: block;' + '}' + '#mouseflow .tool-toggle-icon .btn-cross:before {' + 'content: "";' + 'display: inline;' + 'position: absolute;' + 'top: -25px;' + 'left: -150px;' + 'right: -20px;' + 'bottom: -20px;' + 'display: block;' + '}' + '#mouseflow .btn-arrow:after {' + 'content: "\\203a";' + 'display: inline;' + '}' + '#mouseflow .btn-cross:after {' + 'content: "\\00d7";' + 'display: inline;' + 'top: -4px;' + 'position: relative;' + '}' + '#mouseflow .tm-tag .btn-cross:after {' + 'top: 0px;' + '}' + '#mouseflow .btn-arrow:hover,' + '#mouseflow .btn-cross:hover {' + 'text-decoration: none;' + '}' + '#mouseflow .btn-widget {' + 'width: 100%;' + 'height: 38px;' + 'border: none;' + 'border-radius: 8px;' + 'overflow: hidden;' + 'position: relative;' + 'z-index: 1;' + 'cursor: pointer;' + 'display: block;' + 'padding: 10px;' + 'font-size: 16px;' + 'font-family: inherit;' + 'font-weight: bold;' + 'text-align: center;' + 'outline: none;' + 'color: var(--dusty-cloud);' + 'margin-bottom: 10px;' + '-webkit-transition: background-color .3s linear;' + 'transition: background-color .3s linear;' + '}' + '#mouseflow .btn-widget:hover {' + 'text-decoration: none;' + 'background-color: var(--light-blue);' + '}' + '#mouseflow .privacy-tool {' + 'height: 350px;' + 'max-height: 40%;' + '-webkit-transition: height .5s ease-out;' + 'transition: height .5s ease-out;' + '}' + '#mouseflow .privacy-tool.tool-closed {' + 'height: 0;' + '}' + '#mouseflow .tool-closed .step {' + 'visibility: visible;' + '}' + '#mouseflow .tool-closed .tool-container {' + 'visibility: hidden;' + '}' + '#mouseflow .step.fade-in,' + '#mouseflow .tool-container.fade-in {' + '-webkit-animation: fadeUpIn .8s cubic-bezier(0, 0, 0, 1) both;' + 'animation: fadeUpIn .8s cubic-bezier(0, 0, 0, 1) both;' + '}' + '#mouseflow .step.fade-out,' + '#mouseflow .tool-container.fade-out {' + '-webkit-animation: fadeDownOut .8s cubic-bezier(0, 0, 0, 1);' + 'animation: fadeDownOut .8s cubic-bezier(0, 0, 0, 1);' + '}' + '#mouseflow .btn-widget.loading {' + 'cursor: default;' + '}' + '#mouseflow .btn-widget.loading:before {' + 'display: none;' + '}' + '#mouseflow .loading i {' + 'animation-name: blink;' + 'animation-duration: 1.4s;' + 'animation-iteration-count: infinite;' + 'animation-fill-mode: both;' + '}' + '#mouseflow .loading i:nth-child(2) {' + 'animation-delay: .2s;' + '}' + '#mouseflow .loading i:nth-child(3) {' + 'animation-delay: .4s;' + '}' + '#mouseflow .loading i:nth-child(4) {' + 'animation-delay: .6s;' + '}' + '#mouseflow .tool-message {' + 'width: 100%;' + 'height: calc(100% - 58px);' + 'background-color: white;' + 'color: rgb(71, 64, 62);' + 'position: absolute;' + 'top: 58px;' + 'z-index: 3;' + 'padding: 20px;' + 'overflow-y: auto;' + 'overflow-x: hidden;' + 'visibility: hidden;' + 'opacity: 0;' + '-webkit-animation: fadeOut .3s linear;' + 'animation: fadeOut .3s linear;' + '}' + '#mouseflow .tool-message h3 {' + 'margin-bottom: 20px;' + '}' + '@media (max-width: 1300px) {' + '#mouseflow .tool-exclude,' + '#mouseflow .tool-whitelist,' + '#mouseflow .tool-masked,' + '#mouseflow .tool-track {' + 'width: 60%;' + '}' + '#mouseflow .tool-status {' + 'width: 25%;' + '}' + '#mouseflow .tool-status-buttons {' + 'bottom: 10px;' + '}' + '}' + '@media (max-width: 850px) {' + '#mouseflow .tool-menu-item {' + 'height: 56px;' + '}' + '#mouseflow .tool-status-text {' + 'font-size: 14px;' + '}' + '#mouseflow .btn-widget {' + 'font-size: 12px;' + '}' + '#mouseflow a.mf-tool-close {' + 'font-size: 12px;' + '}' + '}' + '@media (max-height: 800px) {' + '#mouseflow .tool-status-text {' + 'top: 20px;' + '}' + '#mouseflow .tool-status-buttons {' + 'bottom: 20px;' + '}' + '}' + '@media (max-height: 650px) {' + '#mouseflow .tool-status-text {' + 'font-size: 14px;' + '}' + '}' + '@media (max-width: 650px), (max-height: 600px) {' + '#mouseflow .tool-message {' + 'visibility: visible;' + 'opacity: 1;' + '-webkit-animation: fadeIn .3s linear;' + 'animation: fadeIn .3s linear;' + '}' + '}' + '@-webkit-keyframes fadeUpIn {' + '0% {' + '-webkit-transform: translateY(50px);' + '-ms-transform: translateY(50px);' + 'transform: translateY(50px);' + 'opacity: 0;' + '}' + '100% {' + '-webkit-transform: translateY(0);' + '-ms-transform: translateY(0);' + 'transform: translateY(0);' + 'opacity: 1;' + '}' + '}' + '@keyframes fadeUpIn {' + '0% {' + '-webkit-transform: translateY(50px);' + '-ms-transform: translateY(50px);' + 'transform: translateY(50px);' + 'opacity: 0;' + '}' + '100% {' + '-webkit-transform: translateY(0);' + '-ms-transform: translateY(0);' + 'transform: translateY(0);' + 'opacity: 1;' + '}' + '}' + '@-webkit-keyframes fadeDownOut {' + '0% {' + 'visibility: visible;' + '-webkit-transform: translateY(0);' + '-ms-transform: translateY(0);' + 'transform: translateY(0);' + 'opacity: 1;' + '}' + '100% {' + 'visibility: hidden;' + '-webkit-transform: translateY(50px);' + '-ms-transform: translateY(50px);' + 'transform: translateY(50px);' + 'opacity: 0;' + '}' + '}' + '@keyframes fadeDownOut {' + '0% {' + 'visibility: visible;' + '-webkit-transform: translateY(0);' + '-ms-transform: translateY(0);' + 'transform: translateY(0);' + 'opacity: 1;' + '}' + '100% {' + 'visibility: hidden;' + '-webkit-transform: translateY(50px);' + '-ms-transform: translateY(50px);' + 'transform: translateY(50px);' + 'opacity: 0;' + '}' + '}' + '@-webkit-keyframes fadeIn {' + '0% {' + 'visibility: visible;' + 'opacity: 0;' + '}' + '100% {' + 'visibility: visible;' + 'opacity: 1;' + '}' + '}' + '@keyframes fadeIn {' + '0% {' + 'visibility: visible;' + 'opacity: 0;' + '}' + '100% {' + 'visibility: visible;' + 'opacity: 1;' + '}' + '}' + '@-webkit-keyframes fadeOut {' + '0% {' + 'visibility: visible;' + 'opacity: 1;' + '}' + '100% {' + 'visibility: hidden;' + 'opacity: 0;' + '}' + '}' + '@keyframes fadeOut {' + '0% {' + 'visibility: visible;' + 'opacity: 1;' + '}' + '100% {' + 'visibility: hidden;' + 'opacity: 0;' + '}' + '}' + '@keyframes blink {' + '0% {' + 'opacity: .2;' + '}' + '20% {' + 'opacity: 1;' + '}' + '100% {' + 'opacity: .2;' + '}' + '}')
            }
            this._38 = _38;
            this._62 = _62
        }

        function _944(_2, _98, _26, _11, _23, _3, _88) {
            var _7, _104, _133, _48, _801, _514;

            function _38(_217, _334, _888, _65) {
                _48 = _334;
                _7 = _217;
                _514 = _65;
                _801 = !!_888;
                _7('Tagger tool starting');
                _104 = _98._254();
                if (!_104) {
                    _7('Tagger tool not initiated - could not create root HTML element');
                    return
                }
                if (!_2.opener) {
                    _7('Tagger tool not initiated - window.opener is missing');
                    return
                }
                _220()
            }

            function _220() {
                _23._43(_2, 'message', function(_35) {
                    if (_35.origin !== _48) return;
                    _326(_35.data);
                    switch (_35.data.message) {
                        case 'MouseflowTaggerTool_Init_Received':
                            _2.clearInterval(_133);
                            break;
                        case 'MouseflowTaggerTool_Init_Success':
                            _330(_35.data.scripts, function() {
                                taggerToolWidget.start(_88._139());
                                if (typeof _514 === 'function') _514();
                                _7('Tagger tool scripts loaded')
                            });
                            break
                    }
                });
                _133 = _2.setInterval(_797, 500);
                _2.setTimeout(function() {
                    _2.clearInterval(_133)
                }, 10000);
                _797()
            }

            function _797() {
                _188({
                    message: 'MouseflowTaggerTool_Init',
                    startWithHeatMap: _801
                })
            }

            function _330(_161, _65) {
                if (!_161) return;
                var _226 = 0;

                function _339() {
                    if (_226 >= _161.length) {
                        _65();
                        return
                    }
                    var _79 = _161[_226];
                    _516(_79);
                    _226++;
                    var _163 = document.createElement('script');
                    if (_79.startsWith('/')) _163.src = _48 + _79;
                    else _163.src = _48 + '/' + _79;
                    _163.onload = _339;
                    _104.appendChild(_163)
                }
                _339()
            }

            function _516(_79) {
                _7('Tagger tool loading script: ' + _79)
            }

            function _326(_10) {
                if (_10.message && _10.message.indexOf('MouseflowTaggerTool_') === 0) _7('Received ' + _10.message + (_10.requestUrl ? ', request URL: ' + _10.requestUrl : ''))
            }

            function _188(_10) {
                _2.opener.postMessage(_10, _48);
                _7('Sent ' + _10.message + (_10.requestUrl ? ', request URL: ' + _10.requestUrl : ''))
            }
            this._38 = _38
        }

        function _955(_3, _442, _440) {
            function _139() {
                if (_3.forcePath && _3.path) return _3.path.toLowerCase();
                var _80 = (_3.crossDomainSupport ? _3.location.hostname : '') + (_3.path || (_3.decodePathName ? decodeURIComponent(_3.location.pathname) : _3.location.pathname)).toLowerCase();
                var _123 = (_3.includeHashInPath ? _3.location.hash : '').toLowerCase();
                var _114 = _3.location.search.toLowerCase();
                if (_80 !== '/' && _80.slice(-1) === '/' && (!_3.includeQueryStringInPath && !_3.includeHashInPath)) _80 = _80.slice(0, -1);
                return _887(_80 + (_3.includeQueryStringInPath ? _114 : '') + _123) || _80 + _884(_114) + _123
            }

            function _887(_80) {
                return _442.filter(function(_81) {
                    return _882(_80, _81)
                }).map(function(_81) {
                    return _896(_81)
                })[0]
            }

            function _884(_114) {
                if (_114[0] === '?') _114 = _114.slice(1);
                var _68;
                var _520 = [];
                var _883 = /([^&=]+)=?([^&]*)/g;
                while ((_68 = _883.exec(_114)) !== null) {
                    var _50 = _440.indexOf(_68[1]);
                    if (_68[2] && _50 > -1) _520[_50] = _68[0]
                }
                return _520.length ? '?' + _520.filter(hasValue).join('&') : (_3.includeQueryStringInPath && _114 ? '?' + _114 : '')
            }

            function _882(_80, _81) {
                var _849 = _80.indexOf('?');
                if (!_3.includeQueryStringInPath && _849 > -1) _80 = _80.slice(0, _849);
                switch (_81._21) {
                    case 'equals':
                        return _80 === _81._5.toLowerCase();
                    case 'startsWith':
                        return _80.substr(0, _81._5.length) === _81._5;
                    case 'endsWith':
                        return _80.substr(-_81._5.length) === _81._5;
                    case 'contains':
                        return _80.includes(_81._5.toLowerCase());
                    case 'regex':
                        return new RegExp(_81._5).test(_80);
                    default:
                        return false
                }
            }

            function _896(_81) {
                if (_81._233) return _81._233;
                switch (_81._21) {
                    case 'startsWith':
                        return _81._5 + '*';
                    case 'endsWith':
                        return '*' + _81._5;
                    default:
                        return _81._5
                }
            }

            function hasValue(value) {
                return value
            }
            this._139 = _139
        }

        function _842(_21, _2, _11, _7) {
            var _238 = _915(_21);
            this._168 = function(_16) {
                try {
                    return _238.getItem(_16) || null
                } catch (e) {
                    _7(e);
                    return null
                }
            };
            this._227 = function(_16) {
                try {
                    return _11._317(this._168(_16)) || null
                } catch (e) {
                    _7(e);
                    return null
                }
            };
            this._126 = function(_16, _5) {
                try {
                    _238.setItem(_16, _5);
                    return true
                } catch (e) {
                    _7(e);
                    return false
                }
            };
            this._240 = function(_16, _5) {
                try {
                    return this._126(_16, _11._122(_5))
                } catch (e) {
                    _7(e);
                    return false
                }
            };
            this._236 = function(_16) {
                try {
                    _238.removeItem(_16)
                } catch (e) {
                    _7(e)
                }
            };
            this._810 = function() {
                try {
                    var _16 = 'mf_supportsSessionStorage';
                    var _5 = '1';
                    _238.setItem(_16, _5);
                    var _898 = _238.getItem(_16) === _5;
                    _238.removeItem(_16);
                    return _898
                } catch (e) {
                    _7(e);
                    return false
                }
            };

            function _915(_21) {
                switch (_21) {
                    case 'local':
                        return _2.localStorage;
                    case 'session':
                        return _2.sessionStorage;
                    default:
                        throw Error('Unknown storage type: ' + (_21 || 'null'))
                }
            }
        }

        function _914(_2, _11, _3, _7) {
            var _13 = _2.document;
            var _70 = _2.location;
            var _879 = 7776000000;
            this._910 = function(_22) {
                var _739 = _22 + '=';
                var _736 = _13.cookie.split(';');
                for (var i = 0; i < _736.length; i++) {
                    var c = _736[i];
                    while (c.charAt(0) === ' ') {
                        c = c.substring(1)
                    }
                    if (c.indexOf(_739) === 0) {
                        return c.substring(_739.length, c.length)
                    }
                }
                return ''
            };
            this._168 = function(_16) {
                try {
                    return this._910(_16)
                } catch (e) {
                    _7(e);
                    return null
                }
            };
            this._227 = function(_16) {
                try {
                    return _11._317(this._168(_16)) || null
                } catch (e) {
                    _7(e);
                    return null
                }
            };
            this._902 = function(_22, _5, _201, _32) {
                var _721 = '';
                if (_201 == 1) {
                    var _112 = new Date();
                    _112.setTime(_112.getTime() + _879);
                    _721 = '; expires=' + _112.toGMTString()
                }
                var _903 = _3.secureCookie ? 'secure;' : '';
                _13.cookie = _22 + '=' + _5 + _721 + '; path=/; domain=' + _32 + ';' + _903 + 'SameSite=Strict;'
            };
            this._126 = function(_16, _5, _201, _32) {
                try {
                    this._902(_16, _5, _201, _32);
                    return true
                } catch (e) {
                    _7(e);
                    return false
                }
            };
            this._240 = function(_16, _5, _201, _32) {
                try {
                    return this._126(_16, _11._122(_5), _201, _32)
                } catch (e) {
                    _7(e);
                    return false
                }
            };
            this._236 = function(_16) {
                try {
                    _13.cookie = _16 + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/; domain=' + _11._323(_70, _3) + ';'
                } catch (e) {
                    _7(e)
                }
            }
        }

        function _957(_2, _11, _3, _7) {
            this._725 = function() {
                _2._mfq = []
            };
            this._264 = function() {
                if (!_2._mfq) this._725();
                for (var _50 = 0; _50 < _2._mfq.length; _50++) {
                    var _56 = _2._mfq[_50];
                    if (_56 && _56.length) {
                        var _726 = true;
                        if (_56[0] === 'config') _3._412.apply(_3, _56.slice(1));
                        else if (_56[0] === 'newPageView') _3._523.apply(_3, _56.slice(1));
                        else _726 = false;
                        if (_726) delete _2._mfq[_50]
                    }
                }
            };
            this._38 = function() {
                _2._mfq = new _124(_2._mfq)
            };
            this._779 = function() {
                _2._mfq.push.apply(_2._mfq, arguments)
            };
            this._901 = function() {
                return _2._mfq
            };

            function _124(_413) {
                if (!_413) _413 = [];
                var _44 = this;
                _2.setTimeout(function() {
                    for (var _50 = 0; _50 < _413.length; _50++) _44.push(_413[_50])
                }, 1)
            }
            _124.prototype.push = function(_56) {
                if (!_56) return;
                try {
                    if (typeof _56 === 'object' && _56.length) {
                        _2.mouseflow[_56.slice(0, 1)].apply(_2.mouseflow, _56.slice(1))
                    } else if (typeof _56 === 'function') {
                        _56(_2.mouseflow)
                    }
                } catch (error) {
                    var _199 = 'Failed to execute item on action queue';
                    var _759 = _11._122(_56);
                    if (_759) _199 += '\n' + _759;
                    _199 += '\n' + error;
                    _7(_199)
                }
            }
        }

        function _880(_25, _11) {
            var _494 = [];
            var _865 = ['target', 'button', 'pageX', 'pageY', 'which', 'data', 'origin', 'source', 'touches', 'key', 'clientX', 'clientY'];

            function _867(_17, _9, _53, _493, _18) {
                var _91 = !!_18._91;
                var _761 = function(_6) {
                    var _332 = [];
                    if (_6.composedPath && ((_6.target && _6.target.shadowRoot) || _53)) _332 = _6.composedPath();
                    var _768 = _6;
                    _6 = _866(_6);
                    _6.preventDefault = function() {
                        _768.preventDefault()
                    };
                    _6.stopPropagation = function() {
                        _768.stopPropagation()
                    };
                    if (_6.target && _6.target.shadowRoot && _332.length) _6.target = _332[0];
                    if (_53) {
                        _6.delegatedTarget = _837(function(_64, _4) {
                            return _332.length ? _332[_4] : (_64 ? _25._87(_64) : _6.target)
                        }, _53);
                        if (!_6.delegatedTarget && !_18._870) return;
                        if (_18._416 && _6.target !== _6.delegatedTarget) return
                    } else if (_18._416 && _6.target !== _17) {
                        return
                    }
                    if (_18._101) _6.preventDefault();
                    if (_18._1218) _6.stopPropagation();
                    _493.apply(this, arguments)
                };
                _17.addEventListener(_9, _761, {
                    capture: _91
                });
                _494.push({
                    _17: _17,
                    _9: _9,
                    _493: _761,
                    _91: _91
                })
            }

            function _866(_6) {
                var _834 = {};
                _865.forEach(function(_16) {
                    if (_6[_16] != undefined) _834[_16] = _6[_16]
                });
                return _834
            }

            function _874() {
                _494.forEach(function(_23) {
                    _23._17.removeEventListener(_23._9, _23._493, {
                        capture: _23._91
                    })
                });
                _494 = []
            }

            function _837(_839, _53, _17, _50) {
                if (!_50) _50 = 0;
                _17 = _839(_17, _50);
                if (!_17 || !_53) return null;
                if (_11._94(_17, _53)) return _17;
                return _837(_839, _53, _17, ++_50)
            }
            this._43 = function(_17, _9, _53, _65, _18) {
                if (typeof _53 === 'function') {
                    _18 = _65;
                    _65 = _53;
                    _53 = null
                }
                _867(_17, _9, _53, _65, _18 || {})
            };
            this._845 = _874
        }

        function _804(_3, _11) {
            function _553(_180, _319) {
                if (!_180 || !_180.length) return true;
                _180 = _180.filter(function(_69) {
                    return _69 && _69._21 && _69._5
                });
                var _856 = _180.filter(function(_69) {
                    return _69._21.indexOf('not') !== 0
                });
                var _872 = _856.length === 0 || _856.some(function(_69) {
                    return _258(_69, _319)
                });
                var _850 = _180.filter(function(_69) {
                    return _69._21.indexOf('not') === 0
                });
                var _873 = _850.length === 0 || _850.every(function(_69) {
                    return _258(_69, _319)
                });
                return _873 && _872
            }

            function _258(_69, _319) {
                const _80 = _3.path || _3.location.pathname;
                const _123 = _3.includeHashInPath ? _3.location.hash : '';
                const _114 = _3.includeQueryStringInPath ? _3.location.search : '';
                const _27 = (_80 + _114 + _123).toLowerCase();
                const _733 = _319 ? .toLowerCase();
                const _877 = _319 && _733 === _69._5 ? .toLowerCase();
                let _518 = _877 ? _532(_69, _733) : _532(_69, _27);
                if (!_518 && _3.crossDomainSupport) _518 = _532(_69, _3.location.hostname + _27);
                return _518
            }

            function _532(_69, _27) {
                const _21 = (_69._21 || '').toLowerCase();
                const _5 = (_69._5 || '').toLowerCase();
                const _350 = _11._349(_27, '/');
                const _371 = _11._349(_5, '/');
                const _916 = {
                    equals: () => _350 === _371,
                    startswith: () => _27.startsWith(_5),
                    endswith: () => _350.endsWith(_371),
                    regex: () => new RegExp(_5).test(_27),
                    contains: () => _27.includes(_5),
                    notequals: () => _350 !== _371,
                    notstartswith: () => !_27.startsWith(_5),
                    notendswith: () => !_350.endsWith(_371),
                    notcontains: () => !_27.includes(_5)
                };
                return _916[_21] ? .() ? ? true
            }
            this._553 = _553;
            this._258 = _258
        }

        function _1012(_2, _54, _565, _564, _561) {
            const _70 = _2.location;
            const _13 = _2.document;
            const _918 = URL.parse ? ? _536;

            function _536(_20) {
                var _94 = (_20 || '').match(/^(([^:]+:)?\/?\/?(([^:/?#]+)?:?(\d+)?))(\/.*?)?(\?.*?)?(#.*)?$/);
                return {
                    href: _94[0] || '',
                    origin: _94[1] || '',
                    protocol: _94[2] || '',
                    host: _94[3] || '',
                    hostname: _94[4] || '',
                    port: _94[5] || '',
                    pathname: _94[6] || '',
                    search: _94[7] || '',
                    hash: _94[8] || ''
                }
            }

            function _806(_985) {
                if (_561) return '';
                const _20 = _918(_985);
                return _20 ? .protocol && _20 ? .origin ? _20.origin : ''
            }
            this.debug = _2.mouseflowDebug || _70.search.indexOf('mf_debug=1') !== -1;
            this.includeDebugTime = false;
            this.forceStart = _70.search.indexOf('mf_force=1') !== -1;
            this.autoStart = _2.mouseflowAutoStart !== false && _70.search.indexOf('mf_autostart=0') === -1;
            this.enableBots = false;
            this.touchEvents = !_2.mouseflowDisableTouch;
            this.htmlDelay = _2.mouseflowHtmlDelay || 1000;
            this.newPageViewHtmlDelay = _2.mouseflowNewPageViewHtmlDelay || 500;
            this.compress = _2.mouseflowCompress !== false && _70.search.indexOf('mf_compress=0') === -1;
            this.compressFunction = null;
            this.autoTagging = _2.mouseflowAutoTagging !== false;
            this.path = _2.mouseflowPath;
            this.forcePath = false;
            this.crossDomainSupport = !!_2.mouseflowCrossDomainSupport;
            this.location = _536(_2.mouseflowHref || _70.href);
            this.hasCustomHref = !!_2.mouseflowHref;
            this.referrer = _806(_2.mouseflowReferrer !== undefined ? _2.mouseflowReferrer : _13.referrer);
            this.htmlFetchMode = _2.mouseflowHtmlFetchMode || 'post';
            this.sessionId = _2.mouseflowSessionId;
            this.honorDoNotTrack = _2.mouseflowHonorDoNotTrack || _564;
            this.gdprEnabled = _2.mouseflowForceGdpr || _565;
            this.keyLogging = !_2.mouseflowDisableKeyLogging && !this.gdprEnabled;
            this.domReuse = !_2.mouseflowDisableDomReuse;
            this.domDeduplicator = !_2.mouseflowDisableDomDeduplicator;
            this.includeSubDomains = !_2.mouseflowExcludeSubDomains;
            this.registerSubmitTimeout = _2.mouseflowRegisterSubmitTimeout || 2000;
            this.useUnload = !!_2.mouseflowUseUnload;
            this.replaceLastFormValues = _2.mouseflowReplaceLastFormValues || !this.keyLogging || this.gdprEnabled;
            this.useAllHoverSelectors = !!_2.mouseflowUseAllHoverSelectors;
            this.enableCssRecording = !!_2.mouseflowEnableCssRecording;
            this.secureCookie = !!_2.mouseflowSecureCookie;
            this.enableSpa = true;
            this.includeHashInPath = false;
            this.includeQueryStringInPath = false;
            this.autoTagPayments = true;
            this.preferStorageApi = !!_2.mouseflowPreferStorageApi;
            this.domMutationDetectorEnable = _2.domMutationDetectorEnable !== undefined ? _2.domMutationDetectorEnable : false;
            this.domMutationUseParentNode = _2.domMutationUseParentNode !== undefined ? _2.domMutationUseParentNode : true;
            this.domMutationUsePreviousSibling = _2.domMutationUsePreviousSibling !== undefined ? _2.domMutationUsePreviousSibling : false;
            this.domMutationCountThreshold = _2.domMutationCountThreshold !== undefined ? _2.domMutationCountThreshold : 20;
            this.domMutationTimeThresholdInSeconds = _2.domMutationTimeThresholdInSeconds !== undefined ? _2.domMutationTimeThresholdInSeconds : 10;
            this.liveHeatmapsEnabled = false;
            this.privacyToolEnabled = false;
            this.taggerToolEnabled = false;
            this.useIdSelectors = _2.mouseflowUseIdSelectors !== undefined ? _2.mouseflowUseIdSelectors : true;
            this.proxyAttachShadow = true;
            this.scrollSelector = _2.mouseflowScrollSelector;
            this.autoScrollSelector = _2.mouseflowAutoScrollSelector || false;
            this.freezeElementIds = [];
            this.proxyValueSetter = false;
            this.decodePathName = false;
            this.forms = _2.mouseflowFormsConfiguration || null;
            this.notFoundIdentifiers = _2.mouseflowNotFoundIdentifiers || ["Not Found", "404"];
            this.debugDeadClick = _70.search.indexOf('mf_debugDeadClick=1') !== -1;
            this.enableDeadClick = true;
            this._264 = function() {
                if (!!_2.opener && _70.search.indexOf('mf_liveHeatmaps') !== -1) {
                    this.liveHeatmapsEnabled = true;
                    this.taggerToolEnabled = true;
                    return
                }
                if (_70.search.indexOf('mf_inspect') !== -1) {
                    this.privacyToolEnabled = true;
                    return
                }
                if (!!_2.opener && (typeof _2.name === 'string' && _2.name.indexOf('mf_liveHeatmaps') === 0)) {
                    this.liveHeatmapsEnabled = true;
                    this.taggerToolEnabled = true;
                    return
                }
                if (_2.name === 'mf_privacyTool') {
                    this.privacyToolEnabled = true;
                    return
                }
                if (_2.name.indexOf('mf_tagger_tool') > -1) {
                    this.taggerToolEnabled = true;
                    return
                }
                if (!_54._810()) return;
                if (_2.opener) {
                    if (_54._168('mf_privacyTool')) this.privacyToolEnabled = true;
                    else if (_54._168('mf_liveHeatmaps')) {
                        this.liveHeatmapsEnabled = true;
                        this.taggerToolEnabled = true
                    }
                }
            };
            this._523 = function(_27, _70) {
                this._412('href', _2.location.href);
                this.path = undefined;
                if (_27) this.path = _27.toString();
                if (_70) {
                    this.location = _70;
                    this.hasCustomHref = true
                }
            };
            this._412 = function(_16, _5) {
                if (_16[0] === '_') return;
                switch (_16) {
                    case 'href':
                        this.location = _536(_5);
                        this.hasCustomHref = _5 !== _2.location.href;
                        break;
                    case 'keyLogging':
                        this.keyLogging = this.keyLogging && _5;
                        break;
                    case 'gdprEnabled':
                        this.gdprEnabled = this.gdprEnabled || _5;
                        break;
                    case 'freezeElementIds':
                        this.freezeElementIds = Array.isArray(_5) ? _5 : ['' + _5];
                        break;
                    case 'referrer':
                        this.referrer = _806(_5);
                        break;
                    case 'hasCustomHref':
                        break;
                    default:
                        this[_16] = _5;
                        break
                }
            }
        }

        function _956(_2, _25) {
            const _1219 = 'mf-root';
            let _980, _191;
            _261(_2);

            function _261(_263) {
                _980 = _263;
                _191 = _263.document;
                _25._261(_263)
            }

            function _254() {
                if (!_191.body) return null;
                let _257 = _859();
                if (!_974()) _735();
                if (!_257) {
                    _257 = _977();
                    _548()
                }
                return _257
            }

            function _551() {
                const _257 = _859();
                if (!_257) return;
                _191.body.removeChild(_257)
            }

            function _548() {}

            function _859() {
                return _191.getElementById('mouseflow');
            }

            function _977() {
                const _29 = _191.createElement('div');
                _29.id = 'mouseflow';
                const _58 = _191.createElement('style');
                _58.type = 'text/css';
                _58.innerHTML = _973();
                const _545 = _191.createElement('div');
                _545.className = 'load-font';
                _545.innerHTML = 'load font';
                _29.appendChild(_58);
                _29.appendChild(_545);
                _191.body.appendChild(_29);
                return _29;
            }

            function _974() {
                return true;
            }

            function _735() {}

            function getRootHtml() {
                return ('<style type="text/css">' + '@font-face {' + 'font-family: "Open Sans";' + 'font-style: normal;' + 'font-weight: 400;' + 'src: url(https://cdn.mouseflow.com/fonts/opensans/opensans-regular.woff2) format("woff2");' + '}' + '@font-face {' + 'font-family: "Open Sans";' + 'font-style: normal;' + 'font-weight: 700;' + 'src: url(https://cdn.mouseflow.com/fonts/opensans/opensans-bold.woff2) format("woff2");' + '}' + '#mouseflow {' + 'all: initial;' + 'font: 400 14px/1.4 "Open Sans", Arial, sans-serif;' + 'color: #666;' + '}' + '#mouseflow * {' + 'background: transparent;' + 'border: 0;' + 'border-image-outset: 0s;' + 'border-image-repeat: stretch;' + 'border-image-slice: 100%;' + 'border-image-source: none;' + 'border-image-width: 1;' + 'border-color: #000;' + 'border-radius: 0;' + 'border-width: 0;' + 'border-style: none;' + 'box-sizing: border-box;' + 'clip: auto;' + 'float: none;' + 'color: inherit;' + 'font-family: inherit;' + 'font-size: inherit;' + 'font-style: inherit;' + 'font-weight: inherit;' + 'width: auto;' + 'height: auto;' + 'min-width: auto;' + 'min-height: auto;' + 'max-width: auto;' + 'max-height: auto;' + 'letter-spacing: normal;' + 'line-height: normal;' + 'margin: 0;' + 'padding: 0;' + 'text-decoration: none;' + 'text-indent: 0;' + 'text-transform: none;' + 'vertical-align: baseline;' + 'text-align: left;' + 'overflow: visible;' + 'top: auto;' + 'right: auto;' + 'bottom: auto;' + 'left: auto;' + '-webkit-transition: none;' + 'transition: none;' + '}' + '#mouseflow .mf-is-hidden {' + 'display: none;' + '}' + '</style>')
            }

            function _973() {
                return ('@font-face {' + 'font-family: "Open Sans";' + 'font-style: normal;' + 'font-weight: 400;' + 'src: url(https://cdn.mouseflow.com/fonts/opensans/opensans-regular.woff2) format("woff2");' + '}' + '@font-face {' + 'font-family: "Open Sans";' + 'font-style: normal;' + 'font-weight: 700;' + 'src: url(https://cdn.mouseflow.com/fonts/opensans/opensans-bold.woff2) format("woff2");' + '}' + '#mouseflow :before, #mouseflow :after {' + 'display: none;' + '}' + '#mouseflow,' + '#mouseflow * {' + 'background: transparent;' + 'border: 0;' + 'border-image-outset: 0s;' + 'border-image-repeat: stretch;' + 'border-image-slice: 100%;' + 'border-image-source: none;' + 'border-image-width: 1;' + 'border-color: #000;' + 'border-radius: 0;' + 'border-width: 0;' + 'border-style: none;' + 'box-sizing: border-box;' + 'clip: auto;' + 'float: none;' + 'color: inherit;' + 'font-family: inherit;' + 'font-size: inherit;' + 'font-style: inherit;' + 'font-weight: inherit;' + 'width: auto;' + 'height: auto;' + 'min-width: auto;' + 'min-height: auto;' + 'max-width: auto;' + 'max-height: auto;' + 'letter-spacing: normal;' + 'line-height: normal;' + 'margin: 0;' + 'padding: 0;' + 'text-decoration: none;' + 'text-indent: 0;' + 'text-transform: none;' + 'vertical-align: baseline;' + 'text-align: left;' + 'overflow: visible;' + 'top: auto;' + 'right: auto;' + 'bottom: auto;' + 'left: auto;' + '-webkit-transition: none;' + 'transition: none;' + '}' + '#mouseflow {' + 'font: 400 14px/1.4 "Open Sans", sans-serif;' + 'color: #666;' + '}' + '#mouseflow .load-font {' + 'position: absolute;' + 'visibility: hidden;' + 'width: 0px;' + 'height: 0px;' + 'overflow: hidden;' + '}')
            }
            this._261 = _261;
            this._254 = _254;
            this._551 = _551;
            this._548 = _548
        }

        function _971(_2) {
            this._72 = function() {
                return _367('setTimeout').apply(_2, arguments)
            };
            this._368 = function() {
                return _367('setInterval').apply(_2, arguments)
            };
            this._148 = function() {
                _367('clearTimeout').apply(_2, arguments)
            };
            this._214 = function() {
                _367('clearInterval').apply(_2, arguments)
            };

            function _367(_22) {
                var _737;
                if (_2.Zone && _2.Zone.__symbol__) _737 = _2[_2.Zone.__symbol__(_22)];
                return _737 || _2[_22]
            }
        }

        function _970(_2, _105, _435, _25) {
            var _13 = _2.document;

            function _172(_1, _96) {
                var _113 = _1.classList;
                if (_113 && _96) return _113.contains(_96);
                var _164 = _225(_1);
                return _164.indexOf(_96) !== -1
            }

            function _110(_1, _96) {
                var _113 = _1.classList;
                if (_113 && _96) {
                    _1.classList.add(_96);
                    return
                }
                var _164 = _225(_1);
                if (_164.indexOf(_96) === -1) _164.push(_96);
                _1.className = _164.join(' ')
            }

            function _67(_1, _96) {
                var _113 = _1.classList;
                if (_113 && _96) {
                    _1.classList.remove(_96);
                    return
                }
                var _164 = _225(_1);
                var _50 = _164.indexOf(_96);
                if (_50 !== -1) _164.splice(_50, 1);
                _1.className = _164.join(' ')
            }

            function _333(_1, _96, _554) {
                if (_554 === undefined) _554 = !_172(_1, _96);
                if (_554) {
                    _110(_1, _96)
                } else {
                    _67(_1, _96)
                }
            }

            function _225(_1) {
                var _745 = typeof _1.className === 'string' ? _1.className.replace(/\s+/g, ' ').trim() : '';
                return _745 !== '' ? _745.split(' ') : []
            }

            function _474() {
                return _105.max((_13.body || {}).scrollHeight || 0, (_13.body || {}).offsetHeight || 0, _13.documentElement.scrollHeight || 0, _13.documentElement.offsetHeight || 0, _13.documentElement.clientHeight || 0)
            }

            function _483() {
                var _250 = null;
                var _969 = _13.body.scrollHeight;
                _13.querySelectorAll('body *').forEach(function(_64) {
                    if (_64.tagName === 'LINKBAR-CONTAINER') return;
                    if (!_250) _250 = _64;
                    if (_250.scrollHeight < _64.scrollHeight) _250 = _64
                });
                return _250.scrollHeight > _969 ? _250 : null
            }

            function _457(_3) {
                if (!_3.autoScrollSelector) return _13.querySelector(_3.scrollSelector);
                return _483()
            }

            function _53(_52, _967) {
                var _33 = [];
                if (!_52) return _33;
                for (var _4 = 0; _4 < _52.length; _4++) {
                    if (_967(_52[_4], _4)) _33.push(_52[_4])
                }
                return _33
            }

            function _228(_175) {
                var _4 = Math.floor(Math.log(_175) / Math.log(1024));
                return (_175 / Math.pow(1024, _4)).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][_4]
            }

            function _778(_321) {
                var _387 = _321.length;
                while (_387) {
                    var _4 = _105.floor(_105.random() * _387--);
                    var _976 = _321[_387];
                    _321[_387] = _321[_4];
                    _321[_4] = _976
                }
            }

            function _158(_46) {
                if (!_46) return _46;
                return _46.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            }

            function _475(_46) {
                if (!_46) return _46;
                return _46.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
            }

            function _477(url) {
                return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(url.trim())
            }

            function _753(_46) {
                return _46.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(_68, _1011, _20) {
                    _20 = _475(_20);
                    return _477(_20) ? '<a href="' + _20 + '" target="_blank">' + _1011 + '</a>' : _68
                })
            }

            function _194(_5) {
                if (!_5) return _5;
                return _5.replace(/([^a-zA-Z\d-_])/g, '\\$1').replace(/^(-)?(\d)/, '$1\\3$2 ')
            }

            function _317(_5) {
                return _5 ? _435.parse(_5) : undefined
            }

            function _122(_5) {
                var _33;
                if (Array.prototype.toJSON) {
                    var _1009 = Array.prototype.toJSON;
                    delete Array.prototype.toJSON;
                    _33 = _435.stringify(_5);
                    Array.prototype.toJSON = _1009
                } else if (_5) {
                    _33 = _435.stringify(_5)
                }
                return _33
            }

            function _752(_1008, _917) {
                var _270 = _347(_1008);
                var _46 = _347(_917);
                var _198 = _105.max(_270.length, _46.length);
                if (_46 == 'NaN' || _270 == 'NaN') {
                    return false
                }
                for (var _4 = 0; _4 < _198; _4++) {
                    _270[_4] = _270[_4] || 0;
                    _46[_4] = _46[_4] || 0;
                    if (_270[_4] == _46[_4]) {
                        continue
                    }
                    return _270[_4] > _46[_4]
                }
                return true
            }

            function _347(_1003) {
                var _771 = _1003.split('.');
                var _772 = [];
                for (var _4 = 0; _4 < _771.length; _4++) {
                    _772.push(parseInt(_771[_4]))
                }
                return _772
            }

            function _349(_46, _1000) {
                var _33 = _46;
                while (_33[_33.length - 1] === (_1000 || ' ')) _33 = _33.slice(0, -1);
                return _33
            }

            function _729(_384) {
                var _68;
                var _114 = /([^?&=]+)(?:=([^&]*))?/g;
                var _787 = {};
                while ((_68 = _114.exec(_384)) !== null) {
                    var _16 = _68[1];
                    var _5 = _68[2] ? window.decodeURIComponent(_68[2].replace(/\+/g, ' ')) : null;
                    _787[_16] = _5
                }
                return _787
            }
            const platformRegexes = [{
                family: 'windows',
                regex: [/microsoft (windows) (vista|xp)/i, /(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[/]?([\d.\w]*)/i, /(windows)[/]?([ntce\d.]+\w)(?!.+xbox)/i, /(win(?=3|9|n)|win 9x )([nt\d.]+)/i]
            }, {
                family: 'ios',
                regex: [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /(?:ios;fbsv\/|iphone.+ios[/])([\d.]+)/i, /cfnetwork\/.+darwin/i]
            }, {
                family: 'macos',
                regex: [/(mac os x) ?([\w. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i]
            }, {
                family: 'android',
                regex: [/droid ([\w.]+)\b.+android[- ]x86/i, /(android)[-/]?([\w.]*)/i]
            }, {
                family: 'linux',
                regex: [/\b(joli|palm)\b ?(?:os)?\/?([\w.]*)/i, /(mint)[/()]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-/]?(?!chrom|package)([-\w.]*)/i, /(hurd|linux) ?([\w.]*)/i, /(gnu) ?([\w.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[/]?(?!amd|[ix346]{1,2}86)([\w.]*)/i, /(haiku) (\w+)/i]
            }];
            const browserRegexes = [{
                browser: 'chrome',
                regex: [/\b(?:crmo|crios)\/([\w.]+)/i]
            }, {
                browser: 'edge',
                regex: [/edg(?:e|ios|a)?\/([\w.]+)/i]
            }, {
                browser: 'opera',
                regex: [/(opera mini)\/([-\w.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w.]+)/i, /(opera)(?:.+version\/|[/]+)([\w.]+)/i, /opios[/]+([\w.]+)/i, /\bopr\/([\w.]+)/i]
            }, {
                browser: 'ie',
                regex: [/(?:ms|\()(ie) ([\w.]+)/i, /trident.+rv[: ]([\w.]{1,9})\b.+like gecko/i]
            }, {
                browser: 'firefox',
                regex: [/\bfocus\/([\w.]+)/i, /fxios\/([\w.-]+)/i, /(?:mobile|tablet);.*(firefox)\/([\w.-]+)/i, /mobile vr; rv:([\w.]+)\).+firefox/i, /(firefox)\/([\w.]+)/i]
            }, {
                browser: 'opera',
                regex: [/\bopt\/([\w.]+)/i, /coast\/([\w.]+)/i]
            }, {
                browser: 'samsung',
                regex: [/(samsung)browser\/([\w.]+)/i]
            }, {
                browser: 'chrome',
                regex: [/ wv\).+(chrome)\/([\w.]+)/i, /chrome\/([\w.]+) mobile/i, /(chrome)\/v?([\w.]+)/i]
            }, {
                browser: 'android',
                regex: [/droid.+ version\/([\w.]+)\b.+(?:mobile safari|safari)/i]
            }, {
                browser: 'safari',
                regex: [/version\/([\w.,]+) .*mobile(?:\/\w+ | ?)safari/i, /iphone .*mobile(?:\/\w+ | ?)safari/i, /version\/([\w.,]+) .*(safari)/i, /webkit.+?(mobile ?safari|safari)(\/[\w.]+)/i]
            }];

            function _727(_785) {
                var _782;
                var _780;
                for (let _4 = 0; _4 < platformRegexes.length; _4++) {
                    var _786 = platformRegexes[_4];
                    let _68 = _786.regex.find(function(_443) {
                        return _443.test(_785)
                    });
                    if (_68) {
                        _780 = _786.family;
                        break
                    }
                }
                for (let _4 = 0; _4 < browserRegexes.length; _4++) {
                    var _783 = browserRegexes[_4];
                    let _68 = _783.regex.find(function(_443) {
                        return _443.test(_785)
                    });
                    if (_68) {
                        _782 = _783.browser;
                        break
                    }
                }
                return {
                    browser: _782,
                    os: _780
                }
            }

            function _94(_1, _8) {
                if (_1.nodeType !== 1) return false;
                if (_1.msMatchesSelector) return _1.msMatchesSelector(_8);
                if (_1.matches) return _1.matches(_8);
                return false
            }

            function _187(_64, _467) {
                var _78 = _25._87(_64);
                return _78 && _78.hasAttribute && _78.hasAttribute(_467)
            }

            function _472(ipaddress) {
                if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
                    return (true)
                }
                return (false)
            }

            function _323(_46, _3) {
                if (_472(_46.hostname) || !_3.includeSubDomains) return _46.hostname;
                var _32 = _46.href;
                var _999 = /\.co\.|\.com\.|\.ac\.|\.org\.|\.gov\.|\.edu\.|\.net\./;
                _32 = _32.replace(/^http(s)?:\/\/?/i, '').replace(/^([^/]+)\/.*/i, '$1').replace(/:[\d]*$/, '');
                if (_999.test(_32)) _32 = _32.replace(/^([^.]+\.){1,}([^.]+\.[^.]+\.[^.]+)$/i, '$2');
                else _32 = _32.replace(/^([^.]+\.){1,}([^.]+\.[^.]+)$/i, '$2');
                return '.' + _32
            }
            this._323 = _323;
            this._472 = _472;
            this._172 = _172;
            this._110 = _110;
            this._67 = _67;
            this._333 = _333;
            this._225 = _225;
            this._474 = _474;
            this._53 = _53;
            this._228 = _228;
            this._778 = _778;
            this._158 = _158;
            this._475 = _475;
            this._477 = _477;
            this._753 = _753;
            this._194 = _194;
            this._317 = _317;
            this._122 = _122;
            this._752 = _752;
            this._347 = _347;
            this._349 = _349;
            this._94 = _94;
            this._187 = _187;
            this._729 = _729;
            this._727 = _727;
            this._483 = _483;
            this._457 = _457
        }

        function _994(_2) {
            const _398 = _2.Object;
            const _450 = _2.Node;
            let _388;
            const _941 = _398.getOwnPropertyDescriptor(_450.prototype, 'parentNode');
            const _952 = _398.getOwnPropertyDescriptor(_450.prototype, 'nextSibling');
            const _942 = _398.getOwnPropertyDescriptor(_450.prototype, 'firstChild');
            let _268, _318, _335;
            this._261 = function(_263) {
                _268 = _263;
                _318 = _263.document;
                _335 = {}
            };
            this._261(_2);
            this._992 = function(_107) {
                return _920(_268[_107], _107)
            };
            this._931 = function(_107, _482) {
                return this._992(_107).prototype[_482]
            };
            this._841 = function(_107, _482, _939) {
                const _930 = this._931(_107, _482);
                const _89 = Array.from(arguments).slice(3);
                return _930.apply(_939, _89)
            };
            this._735 = function(_22, _926) {
                this._841('CustomElementRegistry', 'define', _268.customElements, _22, _926)
            };
            this._1216 = function(_22) {
                return this._841('CustomElementRegistry', 'get', _268.customElements, _22)
            };

            function _920(_846, _107) {
                const _919 = 'function ' + _107 + '() { [native code] }';
                let _117 = _846;
                while (_335[_107] === undefined) {
                    if (!_117) {
                        _335[_107] = _928(_107) || _846
                    } else if (_117.toString().replace(/\s+/g, ' ') === _919) {
                        _335[_107] = _117
                    } else {
                        _117 = Object.getPrototypeOf(_117)
                    }
                }
                return _335[_107]
            }

            function _928(_107) {
                const _549 = _318.createElement('iframe');
                _318.body.appendChild(_549);
                const _117 = _549.contentWindow[_107];
                _318.body.removeChild(_549);
                return _117
            }
            this._87 = function(_1) {
                return _1 ? _941.get.apply(_1) : null
            };
            this._171 = function(_1) {
                return _1 ? _952.get.apply(_1) : null
            };
            this._177 = function(_1) {
                return _1 ? _942.get.apply(_1) : null
            };
            this._962 = function(_1) {
                if (!_1) return false;
                if (_388 === undefined) {
                    try {
                        _388 = _318.createElement('div').attachShadow({
                            mode: 'open'
                        }).constructor
                    } catch (e) {
                        _388 = _268.ShadowRoot
                    }
                }
                var _117 = _1;
                var _5 = null;
                while (_5 === null) {
                    _117 = _398.getPrototypeOf(_117);
                    if (!_117 || _117.constructor === _268.DocumentFragment) _5 = false;
                    if (_117.constructor === _388) _5 = true
                }
                return _5
            }
        }

        function _961(_2) {
            var _855;
            this.proxyPushState = function(callback) {
                var _459 = _2.history;
                _855 = _459.pushState;
                _459.pushState = function() {
                    _2.setTimeout(callback, 100);
                    return _855.apply(_459, arguments)
                };
                _2.addEventListener('popstate', function() {
                    _2.setTimeout(callback, 100)
                })
            }
        }
        var _124 = new _957(window, _11, _3, _7);
        var _98 = new _956(window, _25);
        var _88 = new _955(_3, _442, _440);
        var _325 = (typeof _804 === 'function') ? new _804(_3, _11) : {
            _258: function() {}
        };
        var _212 = (typeof _953 === 'function') ? new _953(window, _3, _98, _26, _11, _325, _23, _54, _7, _88) : {
            _38: function() {},
            _62: function() {},
            _427: function() {},
            _1213: function() {},
            _951: function() {},
            _1220: function() {}
        };
        var _492 = (typeof _812 === 'function') ? new _812(_25, _3) : {
            _178: function() {}
        };
        var _822 = new _948(window, _98, _25, _26, _11, _23, _54, _3);
        var _399 = _342.v3 !== undefined ? new _946(window, _3, _98, _11, _23, _88, _54, _342) : new _945(window, _3, _98, _11, _23, _88, _54);
        var _825 = new _944(window, _98, _26, _11, _23, _3, _88);
        _124._264();
        var shouldRecord = false;
        if (_3.privacyToolEnabled) {
            _822._38(_48, _3._51, _3._348, _3._354, _3._336, _3._355, _7)
        } else if (_3.liveHeatmapsEnabled) {
            var _195;
            if (_3.taggerToolEnabled) {
                _195 = function(_65) {
                    _825._38(_7, _48, true, _65)
                }
            }
            _399._38(_3._51, _7, _48, _195)
        } else if (_3.taggerToolEnabled) {
            _825._38(_7, _48)
        } else if (typeof _823 === 'function') {
            window.mouseflow = new _823(window, Math, _25, _3, _26, _11, _23, _88, _325, _54, _182, _212, _492, _7, _401, _320, _124);
            shouldRecord = true
        }

        function _127() {
            return undefined
        }

        function _820() {
            return null
        }

        function _817() {
            return false
        }
        if (!shouldRecord) {
            window.mouseflow = {
                start: _127,
                stop: function() {
                    if (_3.privacyToolEnabled) _822._62();
                    else if (_3.liveHeatmapsEnabled) _399._62()
                },
                newPageView: function(_27, _70) {
                    _3._523(_27, _70);
                    if (_3.liveHeatmapsEnabled) _399._522()
                },
                stopSession: _127,
                getSessionId: _820,
                getPageViewId: _820,
                tag: _127,
                star: _127,
                setVariable: _127,
                identify: _127,
                formSubmitAttempt: _127,
                formSubmitSuccess: _127,
                formSubmitFailure: _127,
                addFriction: _127,
                isRecording: _817,
                isReturningUser: _817,
                activateFeedback: _127,
                proxyAttachShadow: _127,
                recordingRate: null,
                version: null
            };
            _401.proxyPushState(window.mouseflow.newPageView);
            _124._38()
        }
        window.mouseflow.websiteId = _3._51;
        window.mouseflow.gdprEnabled = _3.gdprEnabled;
        window.mouseflow.updateHeatmap = _399._522;
        window.mouseflow.getDisplayUrl = _88._139;
        window.mouseflow.config = function() {
            return arguments.length === 1 ? _3[arguments[0]] : _3._412.apply(_3, arguments)
        };
        window.mouseflow.logConfig = function() {
            if (_3.debug) console.log(_3)
        };
        window.mouseflow.debug = function() {
            _3.debug = !_3.debug;
            console.log('MF: Debugging ' + (_3.debug ? 'enabled' : 'disabled'))
        }
    })()
}