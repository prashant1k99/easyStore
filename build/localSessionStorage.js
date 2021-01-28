System.register([], function (exports_1, context_1) {
    "use strict";
    var __assign = (this && this.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var __moduleName = context_1 && context_1.id;
    function localSessionStorage() {
        this.data = new Map();
        this.length = 0;
        var returnData = {};
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            returnData[key] = value;
        }
        return __assign(__assign({}, returnData), { length: this.length });
    }
    return {
        setters: [],
        execute: function () {
            Object.defineProperty(localSessionStorage, "length", {
                get: function () {
                    return this.sessionStorageAccessibility;
                },
                enumerable: false,
                configurable: true
            });
            localSessionStorage.prototype = {
                get length() {
                    return this.length;
                }
            };
            localSessionStorage.prototype.clear = function () {
                this.data.clear();
                this.length = 0;
                return;
            };
            localSessionStorage.prototype.getItem = function (key) {
                return this.data.get(key);
            };
            localSessionStorage.prototype.key = function (index) {
                return this.data[index];
            };
            localSessionStorage.prototype.removeItem = function (key) {
                this.data["delete"](key);
                this.length -= 1;
                return;
            };
            localSessionStorage.prototype.setItem = function (key, value) {
                this.data.set(key, value);
                this.length += 1;
                return;
            };
            exports_1("default", localSessionStorage);
        }
    };
});
