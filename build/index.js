System.register([], function (exports_1, context_1) {
    "use strict";
    var StorageEnum, EasyStore;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (StorageEnum) {
                StorageEnum["session"] = "Session";
                StorageEnum["local"] = "Local";
            })(StorageEnum || (StorageEnum = {}));
            EasyStore = /** @class */ (function () {
                function EasyStore(storage) {
                    var _this = this;
                    this.isSessionStorage = false;
                    this.regexKey = new RegExp(/easyStore_[a-zA-Z_$0-9]*/);
                    this.sessionStorageAccessibility = window.sessionStorage ? true : false;
                    this.localStorageAccessibility = window.localStorage ? true : false;
                    if (storage === "session" && !this.sessionStorageAccessibility)
                        context_1["import"]('./localSessionStorage.js').then(function (data) { return _this.store = data; });
                    else if (storage === "session") {
                        this.store = sessionStorage;
                        this.isSessionStorage = true;
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
                EasyStore.prototype.addData = function (key, val) {
                    if (this.isSessionStorage) {
                        this.store.setItem("easyStore_" + key, JSON.stringify(val));
                    }
                    else {
                        localStorage.setItem("easyStore_" + key, val);
                    }
                    return;
                };
                EasyStore.prototype.getData = function (key) {
                    if (key === void 0) { key = this.data; }
                    if (this.isSessionStorage) {
                        this.data = JSON.parse(this.store.getItem("easyStore_" + key));
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
                        this.store.removeItem("easyStore_" + key);
                        return this;
                    }
                    else {
                        localStorage.removeItem("easyStore_" + key);
                        return this;
                    }
                };
                EasyStore.prototype.clear = function () {
                    if (this.isSessionStorage) {
                        var n = this.store.length;
                        while (n--) {
                            var key = this.store.key(n);
                            this.regexKey.test(key) && this.store.removeItem(key);
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
            exports_1("default", EasyStore);
        }
    };
});
