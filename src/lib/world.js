inject('World', function(deps) {
  var KeyEvents = deps.KeyEvents

  return function World() {
    var world = {}
    var keyEventRegistries = {}

    world.renderer = function(data) {
      return [JSON.stringify(data)]
    }

    world.onCharKey = KeyEvents()
    world.onKey = function(keyName) {
      if (!keyEventRegistries[keyName]) {
        keyEventRegistries[keyName] = KeyEvents()
      }

      return keyEventRegistries[keyName]
    }

    return world
  }
})
