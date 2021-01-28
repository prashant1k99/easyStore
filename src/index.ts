enum StorageType {
  session = "Session",
  local = "Local"
}

export default class EasyStore {
  private sessionStorageAccessibility : boolean;
  private localStorageAccessibility : boolean;
  private isSessionStorage : boolean = false;
  // private isLocalStorage : boolean = true;
  private data : any;
  private regexKey : any = new RegExp(/easyStore_[a-zA-Z_$0-9]*/);

  constructor(storage: StorageType) {
    this.sessionStorageAccessibility = window.sessionStorage ? true : false
    this.localStorageAccessibility = window.localStorage ? true : false

    if (storage === "Session" && this.sessionStorageAccessibility) {
      this.isSessionStorage = true
    } 
    // else if (storage === "Session") {
    //   // setup the class as the sessionStorage
    // }
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

  set addData(data : { key : string, val : any }) {
    if (this.isSessionStorage) {
      sessionStorage.setItem(`easyStore_${data.key}`, JSON.stringify(data.val))
    } else {
      localStorage.setItem(`easyStore_${data.key}`, data.val)
    }
    return
  }

  getData(key : string = this.data) {
    if (this.isSessionStorage) {
      this.data = JSON.parse(sessionStorage.getItem(`easyStore_${key}`))
      return this
    } else {
      this.data = localStorage.getItem(`easyStore_${key}`)
      return this
    }
  }

  removeData(key : string = this.data) {
    if (this.isSessionStorage) {
      sessionStorage.removeItem(`easyStore_${key}`)
      return this
    } else {
      localStorage.removeItem(`easyStore_${key}`)
      return this
    }
  }

  clear() {
    if (this.isSessionStorage) {
      let n = sessionStorage.length;
      while(n--) {
        const key = sessionStorage.key(n);
        this.regexKey.test(key) && sessionStorage.removeItem(key);
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