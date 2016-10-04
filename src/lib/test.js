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
