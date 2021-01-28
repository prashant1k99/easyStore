function localSessionStorage() {
  this.data = new Map()
  this.length = 0
  const returnData = {}
  for (const [key, value] of this.data) {
    returnData[key] = value
  }
  return {
    ...returnData,
    length: this.length
  }
}

Object.defineProperty(localSessionStorage, "length", {
  get: function () {
    return this.sessionStorageAccessibility;
  },
  enumerable: false,
  configurable: true
})

localSessionStorage.prototype = {
  get length() : number {
    return this.length
  }
}

localSessionStorage.prototype.clear = function () {
  this.data.clear()
  this.length = 0
  return
}


localSessionStorage.prototype.getItem = function (key: string) : string {
  return this.data.get(key)
}

localSessionStorage.prototype.key = function (index: number) : string {
  return this.data[index]
}

localSessionStorage.prototype.removeItem = function (key: string) : void {
  this.data.delete(key)
  this.length -= 1
  return
}

localSessionStorage.prototype.setItem = function(key: string, value: string) : void {
  this.data.set(key, value)
  this.length += 1
  return
}

export default localSessionStorage