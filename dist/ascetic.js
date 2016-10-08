;(function() {
"use strict";

var Poppins

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a
=typeof require=="function"&&require;if(!u&&a)return a(o,!0)
;if(i)return i(o,!0);var f=new Error("Cannot find module '"+
o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports
:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];
return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}
var i=typeof require=="function"&&require;for(var o=0;o<r.
length;o++)s(r[o]);return s})({1:[function(require,module,
exports){

Poppins = require('./index')

},{"./index":2}],2:[function(require,module,exports){
/* The MIT License (MIT)
 * Copyright (c) 2016 Ben Christel
 *
 * Permission is hereby granted, free of charge, to any
 * person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the
 * Software without restriction, including without
 * limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software
 * is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice
 * shall be included in all copies or substantial portions
 * of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
 * KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
require('./proxy-polyfill.js')
var shallowCopy = require('shallow-copy')
var hasOwnProperty = Object.prototype.hasOwnProperty

module.exports = function(logger) {
  logger = logger || console
  var factories = {}
  var proxyMightHaveFrozenFactoriesObject = false

  return function() {
    validateArguments(arguments)

    if (arguments.length === 2) {
      if (proxyMightHaveFrozenFactoriesObject) {
        throw new Error("Poppins: You can't register a new module now because some modules have already been built.")
      }
      registerModule.apply(null, arguments)
    } else {
      return buildDependencyProvider(arguments[0])
    }
  }

  function registerModule (name, factory) {
    factories[name] = factory
  }

  function buildDependencyProvider (overrides) {
    validateOverrides(overrides)
    var cache = shallowCopy(overrides) || {}
    var requireStack = []

    var provider = new Proxy(factories, {
      get: function (factories, name) {
        if (requireStack.indexOf(name) > -1) {
          throw new Error('Poppins: Could not build ' + name + ' because there is a dependency cycle: ' + requireStack.join(' -> ') + ' -> ' + name)
        }

        requireStack.push(name)

        if (!hasOwnProperty.call(cache, name)) {
          cache[name] = buildModule(name, provider)
        }

        requireStack.pop()

        return cache[name]
      }
    })

    proxyMightHaveFrozenFactoriesObject = true

    return provider
  }

  function buildModule(name, provider) {
    if (!hasOwnProperty.call(factories, name)) {
      throw new Error('Poppins: No factory registered for requested module "' + name + '"')
    }
    return factories[name](provider)
  }

  function validateOverrides(overrides) {
    if (!overrides) return

    for (var key in overrides) {
      if (hasOwnProperty.call(overrides, key) && !hasOwnProperty.call(factories, key)) {
        throw new Error("Poppins: You're trying to override " + key + ", but there is no such module.")
      }
    }
  }
}

function validateArguments(args) {
  var message = 'Poppins was called with unexpected arguments. You may want to have a look at the docs: https://github.com/benchristel/poppins/'

  if (args.length === 1) {
    if (typeof args[0] !== 'object') {
      throw Error(message)
    }
  } else if (args.length === 2) {
    if (typeof args[0] !== 'string' || typeof args[1] !== 'function') {
      throw Error(message)
    }
  } else if (args.length > 2) {
    throw Error(message)
  }
}

},{"./proxy-polyfill.js":4,"shallow-copy":3}],3:[function(require,module,exports){
module.exports = function (obj) {
    if (!obj || typeof obj !== 'object') return obj;

    var copy;

    if (isArray(obj)) {
        var len = obj.length;
        copy = Array(len);
        for (var i = 0; i < len; i++) {
            copy[i] = obj[i];
        }
    }
    else {
        var keys = objectKeys(obj);
        copy = {};

        for (var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i];
            copy[key] = obj[key];
        }
    }
    return copy;
};

var objectKeys = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) {
        if ({}.hasOwnProperty.call(obj, key)) keys.push(key);
    }
    return keys;
};

var isArray = Array.isArray || function (xs) {
    return {}.toString.call(xs) === '[object Array]';
};

},{}],4:[function(require,module,exports){
(function (global){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

(function(d){function k(a){return a?"object"==typeof a||"function"==typeof a:!1}if(!d.Proxy){var l=null;d.a=function(a,c){function d(){}if(!k(a)||!k(c))throw new TypeError("Cannot create proxy with a non-object as target or handler");l=function(){d=function(b){throw new TypeError("Cannot perform '"+b+"' on a proxy that has been revoked");}};var f=c;c={get:null,set:null,apply:null,construct:null};for(var g in f){if(!(g in c))throw new TypeError("Proxy polyfill does not support trap '"+g+"'");c[g]=
f[g]}"function"==typeof f&&(c.apply=f.apply.bind(f));var e=this,m=!1,n="function"==typeof a;if(c.apply||c.construct||n)e=function(){var b=this&&this.constructor===e;d(b?"construct":"apply");if(b&&c.construct)return c.construct.call(this,a,arguments);if(!b&&c.apply)return c.apply(a,this,arguments);if(n)return b?(b=Array.prototype.slice.call(arguments),b.unshift(a),new (a.bind.apply(a,b))):a.apply(this,arguments);throw new TypeError(b?"not a constructor":"not a function");},m=!0;var p=c.get?function(b){d("get");
return c.get(this,b,e)}:function(b){d("get");return this[b]},r=c.set?function(b,a){d("set");c.set(this,b,a,e)}:function(a,c){d("set");this[a]=c},q={};Object.getOwnPropertyNames(a).forEach(function(b){m&&b in e||(Object.defineProperty(e,b,{enumerable:!!Object.getOwnPropertyDescriptor(a,b).enumerable,get:p.bind(a,b),set:r.bind(a,b)}),q[b]=!0)});f=!0;Object.setPrototypeOf?Object.setPrototypeOf(e,Object.getPrototypeOf(a)):e.__proto__?e.__proto__=a.__proto__:f=!1;if(c.get||!f)for(var h in a)q[h]||Object.defineProperty(e,
h,{get:p.bind(a,h)});Object.seal(a);Object.seal(e);return e};d.a.b=function(a,c){return{proxy:new d.a(a,c),revoke:l}};d.a.revocable=d.a.b;d.Proxy=d.a}})("undefined"!==typeof module&&module.exports?global:window);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);

var inject = Poppins()

;(function() {
"use strict";

inject('$stages', function() {
  // holds stage definitions
  return {}
})

inject('$world', function(deps) {
  // holds the global state of the application
  return deps.World()
})

inject('Stage', function(deps) {
  var $stages = deps.$stages

  // todo: why is Stage capitalized and test lowercase?
  return function Stage(name, definitionFn) {
    $stages[name] = definitionFn
  }
})

inject('start', function(deps) {
  var $stages = deps.$stages
  var $world  = deps.$world

  return function start(stageName) {
    $stages[stageName]($world)
  }
})

inject('render', function(deps) {
  var $world = deps.$world

  return function render() {
    try {
      return $world.renderer($world.getDataToRender())
    } catch(e) {
      console.error(e)
      return [e.toString()]
    }
  }
})

inject('sendInputEvent', function(deps) {
  var $world = deps.$world

  return function sendInputEvent(key) {
    $world.onCharKey.typed(key)
  }
})
}());

;(function() {
"use strict";

inject('KeyEvents', function(deps) {
  var noop = deps.noop

  return function KeyEvents() {
    var keyEvents = {}

    keyEvents.typed = noop

    return keyEvents
  }
})
}());

;(function() {
"use strict";

inject('noop', function() { return function noop() {} })
}());

;(function() {
"use strict";

inject('test', function(deps) {
  var $stages = deps.$stages
  var World   = deps.World

  function test(stageName) {
    var testBuilder = Object.create(nullTestBuilder)
    var testWorld = World()

    if (typeof $stages[stageName] !== 'function') {
      // we've encountered a fatal error and will not be
      // running assertions.
      fail('There is no stage named `' + stageName + '`.')
      return nullTestBuilder
    }

    $stages[stageName](testWorld)

    if (typeof testWorld.getDataToRender !== 'function') {
      fail('Stage `' + stageName + '` did not define a getDataToRender function.')
      return nullTestBuilder
    }

    testBuilder.dataToRender = function() {
      var actual, matcher, expected, prop

      if (typeof arguments[0] === 'function') {
        matcher  = arguments[0]
        expected = arguments[1]
        try {
          actual = testWorld.getDataToRender()
        } catch(e) {
          console.error(e)
          fail('Stage `' + stageName + '` threw an error in getDataToRender: ' + e)
          return nullTestBuilder
        }
      } else {
        prop     = arguments[0]
        matcher  = arguments[1]
        expected = arguments[2]
        actual = testWorld.getDataToRender()[prop]
      }
      test.results.total++
      if (matcher(actual, expected)) {
        test.results.passed++
      } else {
        fail(failureMessage(stageName, prop, matcher, actual, expected))
      }
      return testBuilder
    }

    testBuilder.type = function(text) {
      for (var i = 0; i < text.length; i++) {
        var char = text[i]
        testWorld.onCharKey.typed(char)
      }
      return testBuilder
    }

    testBuilder.press = function(keyName) {
      testWorld.onKey(keyName).typed(keyName)
      return testBuilder
    }

    function fail(message) {
      test.results.failed++
      test.results.failures.push(message)
    }

    return testBuilder
  }

  test.results = {
    total: 0,
    passed: 0,
    failed: 0,
    failures: []
  }

  return test
})

inject('should', function() {
  // holds matchers

  return {
    equal: function equal(actual, expected) {
      return objectMatch(actual, expected)
          || primitiveMatch(actual, expected)
    }
  }

  function objectMatch(actual, expected) {
    return typeof actual === 'object'
           && typeof expected === 'object'
           && containsAll(actual, expected)
  }

  function primitiveMatch(actual, expected) {
    return typeof actual !== 'object'
           && typeof expected !== 'object'
           && actual === expected
  }
})

function failureMessage (stageName, prop, matcher, actual, expected) {
  var pathToFailure = prop ? prop : 'data'

  return '' + stageName + ': '
    + pathToFailure + ' should ' + matcher.name + ' '
    + JSON.stringify(expected)
    + ', but was ' + JSON.stringify(actual) + '.'
}

function containsAll(container, contents) {
  for (var prop in contents) if (ownProperty(contents, prop)) {
    if (container[prop] !== contents[prop]) {
      return false
    }
  }
  return true
}

function ownProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

function returnNullTestBuilder() {
  return nullTestBuilder
}

var nullTestBuilder = {
  dataToRender: returnNullTestBuilder,
  type: returnNullTestBuilder,
  press: returnNullTestBuilder
}
}());

;(function() {
"use strict";

inject('World', function(deps) {
  var KeyEvents = deps.KeyEvents

  return function World() {
    var world = {}
    var keyEventRegistries = {}

    world.renderer = function(data) {
      return [JSON.stringify(data)]
    }

    world.onCharKey = KeyEvents()
    world.onKey = function(keyName) {
      if (!keyEventRegistries[keyName]) {
        keyEventRegistries[keyName] = KeyEvents()
      }

      return keyEventRegistries[keyName]
    }

    return world
  }
})
}());

var $context = inject()

window.Stage  = $context.Stage
window.test   = $context.test
window.should = $context.should
window.start  = $context.start
var render    = $context.render
var sendInputEvent = $context.sendInputEvent

var lineElements = []
window.addEventListener('load', function() {
  var bodyStyle = document.body.style
  bodyStyle .backgroundColor = 'navajowhite'
  bodyStyle           .color = 'saddlebrown'
  bodyStyle      .fontFamily = 'Menlo, Monaco, monospace'

  var container = document.createElement('div')
  container.style.display = 'table'
  container.style.marginLeft = 'auto'
  container.style.marginRight = 'auto'
  document.body.appendChild(container)

  // set up line elements
  for (var i = 0; i < 30; i++) {
    var p = document.createElement('p')
    p.style.whiteSpace = 'pre'
    p.style.margin = '0'
    p.style.fontSize = '16.6px' // 80 cols fit in 800px
    p.style.lineHeight = '20px' // 30 lines fit in 600 px
    lineElements.push(p)
    container.appendChild(p)
  }

  if (test.results.failed) {
    renderToDom(test.results.failures)
    document.body.style.color = '#c00'
  } else {
    boot()
  }
})

function boot() {
  redraw()

  window.addEventListener('keypress', function(event) {
    sendInputEvent(event.key)
    redraw()
  })
}

function redraw() {
  renderToDom(render())
}

function renderToDom(lines) {
  for (var i = 0; i < lineElements.length; i++) {
    if (lines[i]) {
      lineElements[i].innerText = snug(lines[i], 80)
    } else {
      lineElements[i].innerText = snug('', 80)
    }
  }
}

var spaces = Array(80).join(' ')
function snug(text, width) {
  if (text.length < width) {
    return snug(text + spaces, width)
  } else {
    return text.slice(0, width)
  }
}
}());
