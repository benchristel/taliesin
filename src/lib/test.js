;(function() {

var test = $export.test = function(stageName) {
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
    if (typeof arguments[0] === 'function') {
      var matcher  = arguments[0],
          expected = arguments[1],
          actual   = testWorld.getDataToRender()
    } else {
      var prop     = arguments[0]
          matcher  = arguments[1],
          expected = arguments[2],
          actual   = testWorld.getDataToRender()[prop]
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
function returnNulltestBuilder() {
  return nullTestBuilder
}

var nullTestBuilder = {
  dataToRender: returnNulltestBuilder,
  type: returnNulltestBuilder,
  press: returnNulltestBuilder
}

})();
