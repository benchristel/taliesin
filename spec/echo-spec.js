describe('An echo chamber', function() {
  var context
  beforeEach(function () {
    context = ReactionaryContext()

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
      .expect({enteredText: ''})
      .type('hello')
      .expect({enteredText: 'hello'})

    expect(context.test.results).toEqual({
      total: 2,
      passed: 2,
      failed: 0
    })
  })

  it('deletes', function() {
    // this should pass
    context.test('echo stage')
      .type('hello')
      .press('Delete')
      .expect({enteredText: 'hell'})

    expect(context.test.results).toEqual({
      total: 1,
      passed: 1,
      failed: 0
    })

    // this should fail
    context.test('echo stage')
      .type('hello')
      .press('Delete')
      .expect({enteredText: 'this should fail'})

    expect(context.test.results).toEqual({
      total: 2,
      passed: 1,
      failed: 1
    })
  })
})
