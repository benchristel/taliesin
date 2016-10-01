/*
 * Creates a new context in which stages, tests, renderers,
 * etc. can be created independently of other stages.
 */
function ReactionaryContext() {
  var context = {}
  var stages = {}

  context.Stage = function(name, definitionFn) {
    stages[name] = definitionFn
  }

  context.test = function(stageName) {
    var testBuilder = {}
    var testWorld

    testBuilder.expect = function(expected) {
      var actual = getTestWorld().getDataToRender()
      if (objectMatch(actual, expected) || primitiveMatch(actual, expected)) {
        context.test.results.passed++
      } else {
        context.test.results.failed++
      }
      context.test.results.total++
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

    return testBuilder
  }

  context.test.results = {
    total: 0,
    passed: 0,
    failed: 0
  }

  // context-private classes and functions below

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
