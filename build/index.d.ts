declare enum StorageEnum {
    session = "Session",
    local = "Local"
}
declare type StorageType = keyof typeof StorageEnum;
export default class EasyStore {
    private sessionStorageAccessibility;
    private localStorageAccessibility;
    private isSessionStorage;
    private data;
    private regexKey;
    store: any;
    constructor(storage: StorageType);
    get isSessionStorageSuppported(): boolean;
    get isLocalStorageSuppported(): boolean;
    addData(key: string, val: any): void;
    getData(key?: string): this;
    removeData(key?: string): this;
    clear(): this;
    get value(): any;
}
export {};
