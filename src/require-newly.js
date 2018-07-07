/**
 * 
 * # require-newly
 * 
 * 
 * ![](https://img.shields.io/badge/require--newly-v1.0.0-green.svg) ![](https://img.shields.io/badge/test-passing-green.svg) ![](https://img.shields.io/badge/coverage-88.24%25-green.svg) ![](https://img.shields.io/badge/stable-100%25-green.svg)
 * 
 * 
 * Import Node.js modules but cleaning their cache previously.
 * 
 * ## 1. Installation
 * 
 * ~$ `npm install --save require-newly`
 * 
 * ## 2. Usage
 * 
 * ```js
 * // 1. Import the module:
 * const requireNewly = require("require-newly");
 * 
 * // 2. Use it to import other modules
 * const myModule = requireNewly("./my-module.js");
 * 
 * // 3. Change the contents of the modules that were already imported
 * // ...
 * 
 * // 4. Use it to import the same modules, but clearing the cache:
 * const myModuleFresh = requireNewly("./my-module.js");
 * ```
 * 
 * ## 3. API
 * 
 * ### `const requireNewly = require("require-newly")`
 * 
 * ----
 * 
 * ### `requireNewly(module:String)`
 * 
 * @type `{Function}`
 * @parameter `{String} module`. Path or name of the module to be retrieved.
 * @returns `{Any}`.
 * @description Retrieves the specified module, but previously it clears the cache that was bound to that module.
 * 
 */
var requireNewly = function(moduleName) {
  requireNewly.purge(moduleName);
  return require(moduleName);
};

/**
 * 
 * ----
 * 
 * ### `requireNewly.purge(module:String)`
 * 
 * @type `{Function}`
 * @parameter `{String} module`. Path or name of the module to which purge its cache.
 * @returns `{Void}`.
 * @description Removes a module from the cache
 */
requireNewly.purge = function(moduleName) {
  requireNewly.search(moduleName, function(mod) {
    delete require.cache[mod.id];
  });
  Object.keys(module.constructor._pathCache).forEach(function(cacheKey) {
    if (cacheKey.indexOf(moduleName) > 0) {
      delete module.constructor._pathCache[cacheKey];
    }
  });
};

/**
 * 
 * ----
 * 
 * ### `requireNewly.search(module:String, callback:Function)`
 * 
 * @type `{Function}`
 * @parameter `{String} module`. Path or name of the module to be retrieved.
 * @parameter `{Function} callback`. Callback applied to each module found.
 * @returns `{Void}`.
 * @description Traverses the cache to search for all the cached files of the specified module name
 */
requireNewly.search = function(moduleName, callback) {
  var mod = require.resolve(moduleName);
  if (mod && ((mod = require.cache[mod]) !== undefined)) {
    (function traverse(mod) {
      mod.children.forEach(function(child) {
        traverse(child);
      });
      callback(mod);
    }(mod));
  }
};

module.exports = requireNewly;

/**
 * 
 * ## 4. Tests, coverage and documentation
 * 
 * · To pass the tests:
 * 
 * ~$ `npm run test`
 * 
 * · To generate the coverage reports:
 * 
 * ~$ `npm run coverage`
 * 
 * · To generate the documentation:
 * 
 * ~$ `npm run docs`
 * 
 * 
 * 
 * ## 5. Conclusion
 * 
 * This package is simply the implementation of [the solution of this issue](https://github.com/nodejs/node-v0.x-archive/issues/8266).
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */