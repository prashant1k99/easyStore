enum StorageEnum {
  session = "Session",
  local = "Local"
}

type StorageType = keyof typeof StorageEnum

export default class EasyStore {
  private sessionStorageAccessibility : boolean;
  private localStorageAccessibility : boolean;
  private isSessionStorage : boolean = false;
  // private isLocalStorage : boolean = true;
  private data : any;
  private regexKey : any = new RegExp(/easyStore_[a-zA-Z_$0-9]*/);
  store : any;

  constructor(storage: StorageType) {
    if (!window) throw new Error('Package only suppported in Browsers.')
    this.sessionStorageAccessibility = window.sessionStorage ? true : false
    this.localStorageAccessibility = window.localStorage ? true : false

    if (storage === "session" && !this.sessionStorageAccessibility)
      throw new Error('Browser does not supports session storage.')
      // import('./localSessionStorage.js').then(data => this.store = data)
    else if (storage === "session") {
      this.store = sessionStorage
      this.isSessionStorage = true
    }
    // else {
    //   this.isLocalStorage = true
    // }
    return this
  }

  get isSessionStorageSuppported () : boolean {
    return this.sessionStorageAccessibility
  }

  get isLocalStorageSuppported () : boolean {
    return this.localStorageAccessibility
  }

  addData( key : string, val : any ) {
    if (! /[a-zA-Z_$0-9]*/.test(key)) {
      throw new Error(`The variable \"${key}\" is not supported by the package easyStore. Please check that variable is valide for \"/[a-zA-Z_$0-9]*/\"`)
    }
    if (this.isSessionStorage) {
      this.store.setItem(`easyStore_${key}`, JSON.stringify(val))
    } else {
      localStorage.setItem(`easyStore_${key}`, val)
    }
    return
  }

  getData(key : string = this.data) {
    if (this.isSessionStorage) {
      this.data = JSON.parse(this.store.getItem(`easyStore_${key}`))
      return this
    } else {
      this.data = localStorage.getItem(`easyStore_${key}`)
      return this
    }
  }

  removeData(key : string = this.data) {
    if (this.isSessionStorage) {
      this.store.removeItem(`easyStore_${key}`)
      return this
    } else {
      localStorage.removeItem(`easyStore_${key}`)
      return this
    }
  }

  clear() {
    if (this.isSessionStorage) {
      let n = this.store.length;
      while(n--) {
        const key = this.store.key(n);
        this.regexKey.test(key) && this.store.removeItem(key);
      }
      return this
    } else {
      let n = localStorage.length;
      while(n--) {
        const key = localStorage.key(n);
        this.regexKey.test(key) && localStorage.removeItem(key);
      }
      return this
    }
  }

  get value() {
    return this.data
  }
}
