describe('A failing Ascetic test', function() {
  var context
  beforeEach(function() {
    context = ReactionaryContext()
  })

  it('reports the failure message', function() {
    context.Stage('hello stage', function(world) {
      world.getDataToRender = function() {
        return {greeting: 'blefm'}
      }
    })

    context.test('hello stage')
      .dataToRender('greeting', context.should.equal, 'hello')

    expect(context.test.results.failures).toEqual(
      ['hello stage: greeting should equal "hello", but was "blefm".']
    )
  })
})
