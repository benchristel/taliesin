// todo: why is Stage capitalized and test lowercase?
$export.Stage = function(name, definitionFn) {
  $stages[name] = definitionFn
}

$export.start = function(stageName) {
  $stages[stageName]($world)
}

$export.render = function() {
  try {
    return [JSON.stringify($world.getDataToRender())]
  } catch(e) {
    console.error(e)
    return [e.toString()]
  }
}

$export.sendInputEvent = function(key) {
  $world.onCharKey.typed(key)
}
