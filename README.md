 


# require-newly


![](https://img.shields.io/badge/require--newly-v1.0.1-green.svg) ![](https://img.shields.io/badge/test-passing-green.svg) ![](https://img.shields.io/badge/coverage-88.24%25-green.svg) ![](https://img.shields.io/badge/stable-100%25-green.svg)


Import Node.js modules but cleaning their cache previously.

## 1. Installation

~$ `npm install --save require-newly`

## 2. Usage

```js
// 1. Import the module:
const requireNewly = require("require-newly");

// 2. Use it to import other modules
const myModule = requireNewly("./my-module.js");

// 3. Change the contents of the modules that were already imported
// ...

// 4. Use it to import the same modules, but clearing the cache:
const myModuleFresh = requireNewly("./my-module.js");
```

## 3. API

### `const requireNewly = require("require-newly")`

----

### `requireNewly(module:String)`


**Type:** `{Function}`

**Parameter:** `{String} module`. Path or name of the module to be retrieved.

**Returns:** `{Any}`.

**Description:** Retrieves the specified module, but previously it clears the cache that was bound to that module.




 


----

### `requireNewly.purge(module:String)`


**Type:** `{Function}`

**Parameter:** `{String} module`. Path or name of the module to which purge its cache.

**Returns:** `{Void}`.

**Description:** Removes a module from the cache



 


----

### `requireNewly.search(module:String, callback:Function)`


**Type:** `{Function}`

**Parameter:** `{String} module`. Path or name of the module to be retrieved.

**Parameter:** `{Function} callback`. Callback applied to each module found.

**Returns:** `{Void}`.

**Description:** Traverses the cache to search for all the cached files of the specified module name



 


## 4. Tests, coverage and documentation

· To pass the tests:

~$ `npm run test`

· To generate the coverage reports:

~$ `npm run coverage`

· To generate the documentation:

~$ `npm run docs`



## 5. Conclusion

This package is simply the implementation of [the solution of this issue](https://github.com/nodejs/node-v0.x-archive/issues/8266).





















