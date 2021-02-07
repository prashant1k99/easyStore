class EasyStore {
  #sessionStorageAccessibility
  #localStorageAccessibility
  #isSessionStorage
  #data
  #regexKey = new RegExp(/easyStore_[a-zA-Z_$0-9]*/);

  constructor(storage = "localStorage") {
    if (!window) throw new Error('Package only suppported in Browsers.')
    this.#sessionStorageAccessibility = window.sessionStorage ? true : false;
    this.#localStorageAccessibility = window.localStorage ? true : false;

    if (storage === "session" && !this.sessionStorageAccessibility)
      throw new Error('Browser does not supports session storage.');
    else if (storage === "session") {
      this.store = sessionStorage;
      this.#isSessionStorage = true;
    }
    return this;
  }

  get isSessionStorageSuppported () {
    return this.#sessionStorageAccessibility;
  }

  get isLocalStorageSuppported () {
    return this.#localStorageAccessibility;
  }

  addData( key, val ) {
    if (! /[a-zA-Z_$0-9]*/.test(key)) {
      throw new Error(`The variable \"${key}\" is not supported by the package easyStore. Please check that variable is valide for \"/[a-zA-Z_$0-9]*/\"`);
    }
    if (this.#isSessionStorage)
      this.store.setItem(`easyStore_${key}`, JSON.stringify(val));
    else
      localStorage.setItem(`easyStore_${key}`, val);
    return
  }

  getData(key = this.#data) {
    if (this.#isSessionStorage)
      this.#data = JSON.parse(this.store.getItem(`easyStore_${key}`));
    else
      this.#data = localStorage.getItem(`easyStore_${key}`);
    return this;
  }

  removeData(key = this.#data) {
    if (this.#isSessionStorage)
      this.store.removeItem(`easyStore_${key}`);
    else
      localStorage.removeItem(`easyStore_${key}`);
    return this;
  }

  clear() {
    if (this.#isSessionStorage) {
      let n = this.store.length;
      while(n--) {
        const key = this.store.key(n);
        this.#regexKey.test(key) && this.store.removeItem(key);
      }
    } else {
      let n = localStorage.length;
      while(n--) {
        const key = localStorage.key(n);
        this.#regexKey.test(key) && localStorage.removeItem(key);
      }
    }
    return this;
  }

  get value() {
    return this.#data;
  }
}

exports.default = EasyStore