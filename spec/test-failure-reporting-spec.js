describe('A failing Ascetic test', function() {
  var Stage, should, test
  beforeEach(function() {
    var $import = Ascetic()
    Stage  = $import.Stage
    should = $import.should
    test   = $import.test
  })

  it('reports the failure message', function() {
    Stage('hello stage', function(world) {
      world.getDataToRender = function() {
        return {greeting: 'blefm'}
      }
    })

    test('hello stage')
      .dataToRender('greeting', should.equal, 'hello')

    expect(test.results.failures).toEqual(
      ['hello stage: greeting should equal "hello", but was "blefm".']
    )
  })
})
