"use strict"
// this makes everything use strict mode,
// since the code is concatenated before it is run.
// See the gulpfile.

function Ascetic() { // the curly brace is closed in finale.js.

// $export is ultimately returned from the Ascetic function.
// Each module adds itself to the $export object.
var $export = {}

$export.AsceticContext = AsceticContext

/*
 * Creates a new context in which stages, tests, renderers,
 * etc. can be created independently of other stages.
 */
function AsceticContext() {
  var context = {}
  var stages = {}
  var world = {}

  context.Stage = function(name, definitionFn) {
    stages[name] = definitionFn
  }

  context.test = function(stageName) {
    var testBuilder = {}
    var testWorld

    testBuilder.dataToRender = function() {
      if (typeof arguments[0] === 'function') {
        var matcher  = arguments[0],
            expected = arguments[1],
            actual   = getTestWorld().getDataToRender()
      } else {
        var prop     = arguments[0]
            matcher  = arguments[1],
            expected = arguments[2],
            actual   = getProp(getTestWorld().getDataToRender(), prop)
      }
      if (!assert(matcher, actual, expected)) {
        context.test.results.failures.push(
          failureMessage(stageName, prop, matcher, actual, expected)
        )
      }
      return testBuilder
    }

    testBuilder.type = function(text) {
      for (var i = 0; i < text.length; i++) {
        var char = text[i]
        getTestWorld().onCharKey.typed(char)
      }
      return testBuilder
    }

    testBuilder.press = function(keyName) {
      getTestWorld().onKey(keyName).typed(keyName)
      return testBuilder
    }

    // private testBuilder methods below

    function getTestWorld() {
      if (!testWorld) {
        testWorld = World()
        stages[stageName](testWorld)
      }

      return testWorld
    }

    return testBuilder
  }

  context.test.results = {
    total: 0,
    passed: 0,
    failed: 0,
    failures: []
  }

  context.should = {
    equal: function equal(actual, expected) {
      return objectMatch(actual, expected)
          || primitiveMatch(actual, expected)
    }
  }

  context.start = function(stageName) {
    stages[stageName](world)
  }

  context.render = function() {
    return [JSON.stringify(world.getDataToRender())]
  }

  // context-private classes and functions below

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

  function getProp(obj, prop) {
    return obj[prop]
  }

  function World() {
    var world = {}
    var keyEventRegistries = {}

    world.onCharKey = KeyEvents()
    world.onKey = function(keyName) {
      if (!keyEventRegistries[keyName]) {
        keyEventRegistries[keyName] = KeyEvents()
      }

      return keyEventRegistries[keyName]
    }

    return world
  }

  function KeyEvents() {
    var keyEvents = {}

    keyEvents.typed = noop

    return keyEvents
  }

  function assert(matcher, actual, expected) {
    context.test.results.total++
    if (matcher(actual, expected)) {
      context.test.results.passed++
      return true
    } else {
      context.test.results.failed++
      return false
    }
  }

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

  function noop() {}

  return context
}

// end the function started in prelude.js
return $export
}

;(function() {
  var context = AsceticContext()

  window.Stage  = context.Stage
  window.test   = context.test
  window.should = context.should
  window.start  = context.start

  var lineElements = []
  window.addEventListener('load', function() {
    // set up line elements
    for (var i = 0; i < 30; i++) {
      var p = document.createElement('p')
      lineElements.push(p)
      document.body.appendChild(p)
    }

    renderToDom(context.render())
  })

  function renderToDom(lines) {
    for (var i = 0; i < lineElements.length; i++) {
      if (lines[i]) {
        lineElements[i].innerText = lines[i]
      } else {
        lineElements[i].innerText = ''
      }
    }
  }
})();
