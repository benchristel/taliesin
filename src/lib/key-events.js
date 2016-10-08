inject('KeyEvents', function(deps) {
  var noop = deps.noop

  return function KeyEvents() {
    var keyEvents = {}

    keyEvents.typed = noop

    return keyEvents
  }
})
