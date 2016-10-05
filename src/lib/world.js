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
