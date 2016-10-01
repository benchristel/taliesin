describe("All the world's a Stage", function () {

  var context, should
  beforeEach(function () {
    context = ReactionaryContext()
    should = context.should
    context.Stage('hello world stage', function(world) {
      world.getDataToRender = function() {
        return 'Hello, world!'
      }
    })
  })

  it('renders "Hello, world!"', function() {
    // this test should pass
    context.test('hello world stage')
      .dataToRender(should.equal, 'Hello, world!')

    expect(context.test.results).toEqual({
      total: 1,
      passed: 1,
      failed: 0
    })

    // this test should fail
    context.test('hello world stage')
      .dataToRender(should.equal, 'Fleen, the barbarian chef')

    expect(context.test.results).toEqual({
      total: 2,
      passed: 1,
      failed: 1
    })
  })
})
