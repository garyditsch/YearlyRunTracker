// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"g9TDx":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "0bcb44a518dbc454";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"1SICI":[function(require,module,exports) {
var _calendarJs = require("./modules/calendar.js");
var _helpersJs = require("./modules/helpers.js");
const calendar_svg = d3.select("#calendar_svg_2022");
const runTable = "https://quizzical-tereshkova-82c9ca.netlify.app/api/get-run-data";
const runTable2 = "https://quizzical-tereshkova-82c9ca.netlify.app/api/get-past-run-data";
let dateControl = document.querySelector('select');
dateControl.addEventListener('change', async ()=>{
    console.log(dateControl.value);
    switch(dateControl.value){
        case '2022':
            _calendarJs.calendar(theData, runTable, calendar_svg, {
                'startDate': '12/31/2021',
                'endDate': '1/1/2023',
                'height': 500,
                'width': 900,
                'margin': {
                    left: 0,
                    right: 10,
                    top: 100,
                    bottom: 10
                }
            });
            break;
        case '2021':
            _calendarJs.calendar(theData, runTable, calendar_svg, {
                'startDate': '12/31/2020',
                'endDate': '1/1/2022',
                'height': 500,
                'width': 900,
                'margin': {
                    left: 0,
                    right: 10,
                    top: 100,
                    bottom: 10
                }
            });
            break;
        case '2020':
            _calendarJs.calendar(theData, runTable, calendar_svg, {
                'startDate': '12/31/2019',
                'endDate': '1/1/2021',
                'height': 500,
                'width': 900,
                'margin': {
                    left: 0,
                    right: 10,
                    top: 100,
                    bottom: 10
                }
            });
            break;
        case '2019':
            _calendarJs.calendar(theData, runTable2, calendar_svg, {
                'startDate': '12/31/2018',
                'endDate': '1/1/2020',
                'height': 500,
                'width': 900,
                'margin': {
                    left: 0,
                    right: 10,
                    top: 100,
                    bottom: 10
                }
            });
            break;
        case '2018':
            _calendarJs.calendar(theData, runTable2, calendar_svg, {
                'startDate': '12/31/2017',
                'endDate': '1/1/2019',
                'height': 500,
                'width': 900,
                'margin': {
                    left: 0,
                    right: 10,
                    top: 100,
                    bottom: 10
                }
            });
            break;
        case '2017':
            _calendarJs.calendar(theData, runTable2, calendar_svg, {
                'startDate': '12/31/2016',
                'endDate': '1/1/2018',
                'height': 500,
                'width': 900,
                'margin': {
                    left: 0,
                    right: 10,
                    top: 100,
                    bottom: 10
                }
            });
            break;
    }
});

},{"./modules/calendar.js":"91nXN","./modules/helpers.js":"eCTLq"}],"91nXN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "calendar", ()=>calendar
);
async function calendar(theData, table, svg, ...Args) {
    const startDate = new Date(Args[0].startDate).getTime();
    const endDate = new Date(Args[0].endDate).getTime();
    svg.selectAll("*").remove();
    let ed = new Date(endDate).getTime();
    let sd = new Date(startDate).getTime();
    let allMyDates = await theData(table);
    console.log(allMyDates);
    let dates = allMyDates.filter((d)=>{
        var time = new Date(d.date).getTime();
        return sd < time && time < ed;
    });
    const yearTotal = dates.reduce((runTotal, run)=>{
        const total = runTotal + run.value;
        return total;
    }, 0);
    const yearData = {
        'total': yearTotal.toFixed(0),
        'calYear': dates[0].date.getFullYear(),
        'noRuns': dates.length
    };
    // function to return week label
    const formatDay = (d)=>[
            "Sun",
            "",
            "Tue",
            "",
            "Thu",
            "",
            "Sat"
        ][d.getUTCDay()]
    ;
    // return an index representing day of week: Ex: 0 = Sunday, 6 = Saturday
    const countDay = (d)=>d.getUTCDay()
    ;
    // had to reduce the dates to get totals for each day
    // https://stackoverflow.com/questions/47893084/sum-the-values-for-the-same-dates
    // had some issues with the dates as objects, but changing to string and comparing worked
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
    const reducedDates = dates.reduce(function(allDates, date) {
        if (allDates.some(function(e) {
            return e.date.toLocaleString('en-US') === date.date.toLocaleString('en-US');
        })) allDates.filter(function(e) {
            return e.date.toLocaleString('en-US') === date.date.toLocaleString('en-US');
        })[0].value += +date.value;
        else allDates.push({
            date: date.date,
            value: +date.value
        });
        return allDates;
    }, []);
    // return array with months grouped together. NOTE: nest is deprecated in future d3 versions
    const months = d3.nest().key((d)=>d.date.toLocaleString('default', {
            month: 'short'
        })
    ).entries(reducedDates);
    months.sort((a, b)=>a.values[0].date > b.values[0].date ? 1 : b.values[0].date > a.values[0].date ? -1 : 0
    );
    const month_totals = months.map((month)=>{
        if (month.key === 'Jan') {
            const allValue = [];
            month.values.map((v)=>allValue.push(v.value)
            );
            return {
                'key': 'Jan',
                'total': d3.sum(allValue).toFixed(2)
            };
        } else if (month.key === 'Feb') {
            const allValue = [];
            month.values.map((v)=>allValue.push(v.value)
            );
            return {
                'key': 'Feb',
                'total': d3.sum(allValue).toFixed(2)
            };
        } else if (month.key === 'Mar') {
            const allValue = [];
            month.values.map((v)=>allValue.push(v.value)
            );
            return {
                'key': 'Mar',
                'total': d3.sum(allValue).toFixed(2)
            };
        } else if (month.key === 'Apr') {
            const allValue = [];
            month.values.map((v)=>allValue.push(v.value)
            );
            return {
                'key': 'Apr',
                'total': d3.sum(allValue).toFixed(2)
            };
        } else if (month.key === 'May') {
            const allValue = [];
            month.values.map((v)=>allValue.push(v.value)
            );
            return {
                'key': 'May',
                'total': d3.sum(allValue).toFixed(2)
            };
        } else if (month.key === 'Jun') {
            const allValue = [];
            month.values.map((v)=>allValue.push(v.value)
            );
            return {
                'key': 'Jun',
                'total': d3.sum(allValue).toFixed(2)
            };
        } else if (month.key === 'Jul') {
            const allValue = [];
            month.values.map((v)=>allValue.push(v.value)
            );
            return {
                'key': 'Jul',
                'total': d3.sum(allValue).toFixed(2)
            };
        } else if (month.key === 'Aug') {
            const allValue = [];
            month.values.map((v)=>allValue.push(v.value)
            );
            return {
                'key': 'Aug',
                'total': d3.sum(allValue).toFixed(2)
            };
        } else if (month.key === 'Sep') {
            const allValue = [];
            month.values.map((v)=>allValue.push(v.value)
            );
            return {
                'key': 'Sep',
                'total': d3.sum(allValue).toFixed(2)
            };
        } else if (month.key === 'Aug') {
            const allValue = [];
            month.values.map((v)=>allValue.push(v.value)
            );
            return {
                'key': 'Aug',
                'total': d3.sum(allValue).toFixed(2)
            };
        } else if (month.key === 'Oct') {
            const allValue = [];
            month.values.map((v)=>allValue.push(v.value)
            );
            return {
                'key': 'Oct',
                'total': d3.sum(allValue).toFixed(2)
            };
        } else if (month.key === 'Nov') {
            const allValue = [];
            month.values.map((v)=>allValue.push(v.value)
            );
            return {
                'key': 'Nov',
                'total': d3.sum(allValue).toFixed(2)
            };
        } else if (month.key === 'Dec') {
            const allValue = [];
            month.values.map((v)=>allValue.push(v.value)
            );
            return {
                'key': 'Dec',
                'total': d3.sum(allValue).toFixed(2)
            };
        }
    });
    // get array of all values
    const values = reducedDates.map((c)=>c.value
    );
    // get max/min values 
    const maxValue = d3.max(values);
    const minValue = d3.min(values);
    // set constants, yearHeight is * 7 for days of week
    const cellSize = 10;
    const yearHeight = cellSize * 5 + 25;
    // https://www.geeksforgeeks.org/d3-js-d3-utcsunday-function/
    // returns array of all the sundays from a start/end date
    const timeWeek = d3.utcSunday;
    const formatDate = d3.utcFormat("%x");
    // adds day of the week
    svg.append('g').attr("text-anchor", "end").selectAll("text").data(d3.range(7).map((i)=>new Date(1995, 0, i)
    )).join("text").attr("x", 20).attr("y", (d)=>(countDay(d) + 0.5) * cellSize + 50
    ).attr("dy", "0.31em").attr("font-size", 10).text(formatDay);
    // add year totals
    svg.append("text").attr('x', 0).attr('y', 10).attr('height', 45).attr('width', 500).attr('font-size', 12).text(`${yearData.calYear} | Total Miles: ${yearData.total}, Total Runs: ${yearData.noRuns}`);
    // adds month label
    svg.append("g").selectAll('text').data(months).enter().append('text').attr('x', (d, i)=>yearHeight * i + cellSize * 1.5 + 10
    ).attr('y', 30).attr('height', 45).attr('width', 50).attr('font-size', 12).text((d)=>{
        return d.key;
    }).style('fill', '#000');
    svg.append("g").selectAll('text').data(month_totals).enter().append('text').attr('x', (d, i)=>yearHeight * i + cellSize * 1.5 + 10
    ).attr('y', 40).attr('height', 15).attr('width', 50).attr("font-size", 10).text((d)=>{
        return `${d.total} mi`;
    }).style('fill', '#000000');
    // adding g element to svg
    const group = svg.append("g");
    // adds g element for each month with data to svg
    // gives the y axis value to move g element based on month index within data
    const month1 = group.selectAll("g").data(months).join("g").attr("transform", (d, i)=>`translate(${yearHeight * i + cellSize * 1.5}, 0)`
    );
    // http://using-d3js.com/04_05_sequential_scales.html
    const colorFn = d3.scaleSequential(d3.interpolateBlues)// .scaleSequential(d3.interpolateCool)
    .domain([
        Math.floor(minValue),
        Math.ceil(maxValue)
    ]);
    const format = d3.format("+.2%");
    month1.append("g").selectAll("rect").data((d)=>d.values
    ).join("rect").attr("width", cellSize - 1.5).attr("height", cellSize - 1.5).attr("x", (d, i)=>timeWeek.count(d3.utcMonth(d.date), d.date) * cellSize + 10
    ).attr("y", (d)=>countDay(d.date) * cellSize + 0.5 + 50
    ).attr("fill", (d)=>colorFn(d.value)
    ).append("title").text((d)=>`${formatDate(d.date)}: ${d.value.toFixed(2)}`
    );
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"eCTLq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "drawCalendar2019", ()=>drawCalendar2019
);
parcelHelpers.export(exports, "drawCalendar2018", ()=>drawCalendar2018
);
parcelHelpers.export(exports, "drawCalendar2017", ()=>drawCalendar2017
);
var _calendarJs = require("./calendar.js");
// const runTable2 = "https://quizzical-tereshkova-82c9ca.netlify.app/api/get-past-run-data"
const drawCalendar2019 = ()=>{
    const svg = d3.select("#calendar_svg_2019");
    _calendarJs.calendar(theData, runTable2, svg, {
        'startDate': '1/1/2019',
        'endDate': '12/31/2019',
        'height': 500,
        'width': 900,
        'margin': {
            left: 0,
            right: 10,
            top: 100,
            bottom: 10
        },
        'class': 'spinner3'
    });
};
const drawCalendar2018 = ()=>{
    const svg = d3.select("#calendar_svg_2018");
    _calendarJs.calendar(theData, runTable2, svg, {
        'startDate': '12/31/2017',
        'endDate': '1/1/2019',
        'height': 500,
        'width': 900,
        'margin': {
            left: 0,
            right: 10,
            top: 100,
            bottom: 10
        },
        'class': 'spinner3'
    });
};
const drawCalendar2017 = ()=>{
    const svg = d3.select("#calendar_svg_2017");
    _calendarJs.calendar(theData, runTable2, svg, {
        'startDate': '12/31/2016',
        'endDate': '1/1/2018',
        'height': 500,
        'width': 900,
        'margin': {
            left: 0,
            right: 10,
            top: 100,
            bottom: 10
        },
        'class': 'spinner3'
    });
};

},{"./calendar.js":"91nXN","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["g9TDx","1SICI"], "1SICI", "parcelRequire50e8")

//# sourceMappingURL=index.18dbc454.js.map
