describe('World', function() {
  var World, noop
  beforeEach(function() {
    var $imports = inject()
    World   = $imports.World
    noop    = $imports.noop
  })

  describe('resetIO', function() {
    it('clears input events from a World', function() {
      var world = World()

      var handler = function() {}
      world.onKey('a').typed = handler

      world.resetIO()

      expect(world.onKey('a').typed).toBe(noop)
    })
  })


})
