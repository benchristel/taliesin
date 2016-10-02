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
