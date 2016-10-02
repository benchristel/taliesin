describe('An echo chamber', function() {
  var context, should
  beforeEach(function () {
    context = AsceticContext()
    should = context.should

    context.Stage('echo stage', function(world) {
      var typed = ''

      world.getDataToRender = function() {
        return {enteredText: typed}
      }

      world.onCharKey.typed = function(char) {
        typed += char
      }

      world.onKey('Delete').typed = function() {
        typed = typed.slice(0, typed.length - 1)
      }
    })
  })

  it('renders what the user types', function() {
    context.test('echo stage')
      .dataToRender('enteredText', should.equal, '')
      .type('hel')
      .type('lo')
      .dataToRender('enteredText', should.equal, 'hello')

    expect(context.test.results).toEqual({
      total: 2,
      passed: 2,
      failed: 0,
      failures: []
    })
  })

  it('deletes', function() {
    // this should pass
    context.test('echo stage')
      .type('hello')
      .press('Delete')
      .dataToRender('enteredText', should.equal, 'hell')

    expect(context.test.results).toEqual({
      total: 1,
      passed: 1,
      failed: 0,
      failures: []
    })

    // this should fail
    context.test('echo stage')
      .type('hello')
      .press('Delete')
      .dataToRender('enteredText', should.equal, 'this should fail')

    expect(context.test.results).toEqual({
      total: 2,
      passed: 1,
      failed: 1,
      failures: ['echo stage: enteredText should equal "this should fail", but was "hell".']
    })
  })
})
