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