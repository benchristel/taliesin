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
    $world.onKey(key).typed()
    $world.onCharKey.typed(key)
  }
})

inject('goToStage', function(deps) {
  var $stages = deps.$stages
  var $world  = deps.$world

  return function goToStage(stageName) {
    $world.resetIO()
    $stages[stageName]($world)
  }
})
