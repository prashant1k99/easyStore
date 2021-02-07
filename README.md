# easyStore
---
An easy to use Browser Storage API wrapper, that will handle complex logic of Session Storage or Local Storage.

### Installation
**Note** This library is made to run in browser.

* Using `npm`
```js
npm i easystore
```
* Using `yarn`
```js
yarn add easystore
```

### Usage
To use the library using ES6 import module:
```js
import EasyStore from 'easyStore';

const myStore = new EasyStore(option);
```
`option` accept storage type parameter of type `string`
|name|option|
|--|--|
|value|session|
|value|local|