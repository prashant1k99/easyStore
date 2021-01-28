(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var StorageType;
(function (StorageType) {
    StorageType["session"] = "Session";
    StorageType["local"] = "Local";
})(StorageType || (StorageType = {}));
var EasyStore = /** @class */ (function () {
    function EasyStore(storage) {
        this.isSessionStorage = false;
        this.regexKey = new RegExp(/easyStore_[a-zA-Z_$0-9]*/);
        this.sessionStorageAccessibility = window.sessionStorage ? true : false;
        this.localStorageAccessibility = window.localStorage ? true : false;
        if (storage === "Session" && this.sessionStorageAccessibility) {
            this.isSessionStorage = true;
        }
        else if (storage === "Session") {
            // setup the class as the sessionStorage
        }
        // else {
        //   this.isLocalStorage = true
        // }
        return this;
    }
    Object.defineProperty(EasyStore.prototype, "isSessionStorageSuppported", {
        get: function () {
            return this.sessionStorageAccessibility;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EasyStore.prototype, "isLocalStorageSuppported", {
        get: function () {
            return this.localStorageAccessibility;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EasyStore.prototype, "addData", {
        set: function (data) {
            if (this.isSessionStorage) {
                sessionStorage.setItem("easyStore_" + data.key, JSON.stringify(data.val));
            }
            else {
                localStorage.setItem("easyStore_" + data.key, data.val);
            }
            return;
        },
        enumerable: false,
        configurable: true
    });
    EasyStore.prototype.getData = function (key) {
        if (key === void 0) { key = this.data; }
        if (this.isSessionStorage) {
            this.data = JSON.parse(sessionStorage.getItem("easyStore_" + key));
            return this;
        }
        else {
            this.data = localStorage.getItem("easyStore_" + key);
            return this;
        }
    };
    EasyStore.prototype.removeData = function (key) {
        if (key === void 0) { key = this.data; }
        if (this.isSessionStorage) {
            sessionStorage.removeItem("easyStore_" + key);
            return this;
        }
        else {
            localStorage.removeItem("easyStore_" + key);
            return this;
        }
    };
    EasyStore.prototype.clear = function () {
        if (this.isSessionStorage) {
            var n = sessionStorage.length;
            while (n--) {
                var key = sessionStorage.key(n);
                this.regexKey.test(key) && sessionStorage.removeItem(key);
            }
            return this;
        }
        else {
            var n = localStorage.length;
            while (n--) {
                var key = localStorage.key(n);
                this.regexKey.test(key) && localStorage.removeItem(key);
            }
            return this;
        }
    };
    Object.defineProperty(EasyStore.prototype, "value", {
        get: function () {
            return this.data;
        },
        enumerable: false,
        configurable: true
    });
    return EasyStore;
}());
exports["default"] = EasyStore;

},{}]},{},[1]);
