describe('Stage', function() {
  var Stage, start
  beforeEach(function() {
    var $import = Ascetic()
    Stage = $import.Stage
    start = $import.start
  })

  it('declares a stage, so that starting from that stage is possible', function() {
    expect(function() {
      start('Foo')
    }).toThrowError()

    Stage('Foo', function() {
    })

    start('Foo')

    expect(function() {
      start('Foo')
    }).not.toThrowError()
  })
})

describe('sendInputEvent', function() {
  var Stage, start, sendInputEvent
  beforeEach(function() {
    var $import = Ascetic()
    Stage = $import.Stage
    start = $import.start
    sendInputEvent = $import.sendInputEvent
  })

  it('triggers on*Key*.typed handlers', function() {
    var received = null
    Stage('Foo', function(world) {
      world.onCharKey.typed = function(key) {
        received = key
      }
    })

    start('Foo')

    sendInputEvent('q')
    expect(received).toEqual('q')
  })

  it('does nothing when no handler is registered', function() {
    Stage('Foo', function() {
    })

    start('Foo')

    expect(function() { sendInputEvent('q') })
      .not.toThrowError()
  })
})
