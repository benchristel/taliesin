describe('Stage', function() {
  var Stage, start
  beforeEach(function() {
    var $import = inject()
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
    var $import = inject()
    Stage = $import.Stage
    start = $import.start
    sendInputEvent = $import.sendInputEvent
  })

  it('does nothing when no handler is registered', function() {
    Stage('Foo', function() {
    })

    start('Foo')

    expect(function() { sendInputEvent('q') })
      .not.toThrowError()
  })

  it('triggers the onCharKey.typed handler', function() {
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

  it('triggers the onKey(name).typed handler', function() {
    var events = []
    Stage('Foo', function(world) {
      world.onKey('q').typed = function() {
        events.push('q')
      }

      world.onKey('w').typed = function() {
        events.push('w')
      }
    })

    start('Foo')

    expect(events).toEqual([])

    sendInputEvent('q')
    expect(events).toEqual(['q'])

    sendInputEvent('w')
    expect(events).toEqual(['q', 'w'])

    sendInputEvent('w')
    expect(events).toEqual(['q', 'w', 'w'])

    sendInputEvent('z')
    expect(events).toEqual(['q', 'w', 'w'])
  })
})

describe('render', function() {
  var Stage, start, render
  beforeEach(function() {
    var $import = inject()
    Stage = $import.Stage
    start = $import.start
    render = $import.render
  })

  it('JSONifies the data returned by getDataToRender if the stage does not specify a renderer', function() {
    Stage('Foo', function(world) {
      world.getDataToRender = function() {
        return {foo: 3}
      }
    })

    start('Foo')

    expect(render()).toEqual(['{"foo":3}'])
  })

  it('uses the renderer if the stage specifies one', function() {
    Stage('Beer', function(world) {
      world.getDataToRender = function() {
        return [99, 98, 97]
      }

      world.renderer = beerSong
    })

    function beerSong(data) {
      return data.map(function(n) {
        return n + ' bottles of beer on the wall, '
          + n + ' bottles of beer!'
      })
    }

    start('Beer')

    expect(render()).toEqual([
      '99 bottles of beer on the wall, 99 bottles of beer!',
      '98 bottles of beer on the wall, 98 bottles of beer!',
      '97 bottles of beer on the wall, 97 bottles of beer!',
    ])
  })
})

describe('goToStage', function() {
  var Stage, start, render, goToStage, sendInputEvent
  beforeEach(function() {
    var $import = inject()
    Stage = $import.Stage
    start = $import.start
    render = $import.render
    goToStage = $import.goToStage
    sendInputEvent = $import.sendInputEvent
  })

  it('goes to the specified stage', function() {
    var arrivedAtStages = []

    Stage('First', function(world) {
      arrivedAtStages.push('First')
      world.onCharKey.typed = function() {
        goToStage('Second')
      }
      world.getDataToRender = function() {}
    })

    Stage('Second', function(world) {
      arrivedAtStages.push('Second')
      world.onCharKey.typed = function() {
        goToStage('First')
      }
      world.getDataToRender = function() {}
    })

    start('First')

    expect(arrivedAtStages).toEqual(['First'])

    sendInputEvent('c')
    expect(arrivedAtStages).toEqual(['First', 'Second'])

    sendInputEvent('c')
    expect(arrivedAtStages).toEqual(['First', 'Second', 'First'])
  })

  it('clears event handlers from previous stages', function() {
    var events = []

    Stage('First', function(world) {
      world.onKey('a').typed = function() {
        events.push('a')
      }
      world.onKey('q').typed = function() {
        goToStage('Second')
      }
      world.getDataToRender = function() {}
    })

    Stage('Second', function(world) {
      world.getDataToRender = function() {}
    })

    start('First')

    expect(events).toEqual([])

    sendInputEvent('a')
    expect(events).toEqual(['a'])
    sendInputEvent('q')
    // now we're in the Second stage
    sendInputEvent('a') // should do nothing;
    // Second does not respond to the 'a' key
    expect(events).toEqual(['a'])
  })
})
