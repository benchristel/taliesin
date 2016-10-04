"use strict"
// this makes everything use strict mode,
// since the code is concatenated before it is run.
// See the gulpfile.

function Ascetic() { // the curly brace is closed in finale.js.

// $export is ultimately returned from the Ascetic function.
// Each module adds itself to the $export object.
var $export = {}

// maps the names of declared Stages to their initializers.
var $stages = {}

// stores the current global state of the application.
var $world = {}

// todo: why is Stage capitalized and test lowercase?
$export.Stage = function(name, definitionFn) {
  $stages[name] = definitionFn
}

$export.start = function(stageName) {
  $stages[stageName]($world)
}

$export.render = function() {
  return [JSON.stringify($world.getDataToRender())]
}

;(function() {

var test = $export.test = function(stageName) {
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
          actual   = getTestWorld().getDataToRender()[prop]
    }
    test.results.total++
    if (matcher(actual, expected)) {
      test.results.passed++
    } else {
      test.results.failed++
      test.results.failures.push(
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
      $stages[stageName](testWorld)
    }

    return testWorld
  }

  return testBuilder
}

test.results = {
  total: 0,
  passed: 0,
  failed: 0,
  failures: []
}

var should = $export.should = {
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

function noop() {}

})();

// end the function started in prelude.js
return $export
}

;(function() {
  var $import = Ascetic()

  window.Stage  = $import.Stage
  window.test   = $import.test
  window.should = $import.should
  window.start  = $import.start

  var lineElements = []
  window.addEventListener('load', function() {
    // set up line elements
    for (var i = 0; i < 30; i++) {
      var p = document.createElement('p')
      lineElements.push(p)
      document.body.appendChild(p)
    }

    renderToDom($import.render())
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
