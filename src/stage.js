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
      if (actual === expected) {
        context.test.results.passed++
      } else {
        context.test.results.failed++
      }
      context.test.results.total++
    }

    // private testBuilder methods below

    function getTestWorld() {
      if (!testWorld) {
        testWorld = {}
        stages[stageName](testWorld)
      }

      return testWorld
    }

    return testBuilder
  }

  context.test.results = {
    total: 0,
    passed: 0,
    failed: 0
  }

  return context
}
