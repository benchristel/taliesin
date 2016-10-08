describe('A test for a nonexistent stage', function() {
  var should, test
  beforeEach(function() {
    var $import = inject()
    should = $import.should
    test   = $import.test
  })

  it('records a failure', function() {
    test('unicorns')

    expect(test.results.failed).toEqual(1)
    expect(test.results.failures).toEqual(
      ['There is no stage named `unicorns`.']
    )
  })

  it('does not try to run actions or assertions', function() {
    test('unicorns')
      .type('foo')
      .dataToRender(should.equal, 'kablooie')

    expect(test.results.failed).toEqual(1)
    expect(test.results.failures).toEqual(
      ['There is no stage named `unicorns`.']
    )
  })
})

describe('A test for a stage with no getDataToRender method', function() {
  var should, test, Stage
  beforeEach(function() {
    var $import = inject()
    Stage  = $import.Stage
    should = $import.should
    test   = $import.test

    Stage('empty', function() {})
  })

  it('records a failure', function() {
    test('empty')
      .dataToRender(should.equal, 'something')

    expect(test.results.failed).toEqual(1)
    expect(test.results.failures).toEqual(
      ['Stage `empty` did not define a getDataToRender function.']
    )
  })
})

describe('A test for a stage whose getDataToRender method throws an error', function() {
  var should, test, Stage
  beforeEach(function() {
    var $import = inject()
    Stage  = $import.Stage
    should = $import.should
    test   = $import.test

    Stage('errors', function(world) {
      world.getDataToRender = function() {
        throw 'broken!'
      }
    })

    spyOn(console, 'error')
  })

  it('records a failure', function() {
    test('errors')
      .dataToRender(should.equal, 'something')

    expect(test.results.failed).toEqual(1)
    expect(test.results.failures).toEqual(
      ['Stage `errors` threw an error in getDataToRender: broken!']
    )
  })

  it('logs the exception to the console', function() {
    test('errors')
      .dataToRender(should.equal, 'something')

    expect(console.error).toHaveBeenCalledWith('broken!')
  })
})
