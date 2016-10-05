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
