describe("All the world's a Stage", function () {

  var Stage, should, test
  beforeEach(function () {
    var $import = inject()

    Stage  = $import.Stage
    should = $import.should
    test   = $import.test

    Stage('hello world stage', function(world) {
      world.getDataToRender = function() {
        return 'Hello, world!'
      }
    })
  })

  it('renders "Hello, world!"', function() {
    // this test should pass
    test('hello world stage')
      .dataToRender(should.equal, 'Hello, world!')

    expect(test.results).toEqual({
      total: 1,
      passed: 1,
      failed: 0,
      failures: []
    })

    // this test should fail
    test('hello world stage')
      .dataToRender(should.equal, 'Fleen, the barbarian chef')

    expect(test.results).toEqual({
      total: 2,
      passed: 1,
      failed: 1,
      failures: ['hello world stage: data should equal "Fleen, the barbarian chef", but was "Hello, world!".']
    })
  })
})
