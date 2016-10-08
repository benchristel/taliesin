;(function() {
  var $import = Ascetic()

  window.Stage  = $import.Stage
  window.test   = $import.test
  window.should = $import.should
  window.start  = $import.start
  var render    = $import.render
  var sendInputEvent = $import.sendInputEvent

  var lineElements = []
  window.addEventListener('load', function() {
    // set up line elements
    for (var i = 0; i < 30; i++) {
      var p = document.createElement('p')
      lineElements.push(p)
      document.body.appendChild(p)
    }

    if (test.results.failed) {
      renderToDom(test.results.failures)
      document.body.style.color = '#c00'
    } else {
      boot()
    }
  })

  function boot() {
    redraw()

    window.addEventListener('keypress', function(event) {
      console.log('key pressed', event)
      sendInputEvent(event.key)
      redraw()
    })
  }

  function redraw() {
    renderToDom(render())
  }

  function renderToDom(lines) {
    for (var i = 0; i < lineElements.length; i++) {
      if (lines[i]) {
        lineElements[i].innerText = lines[i]
      } else {
        lineElements[i].innerText = ''
      }
    }
  }
})();
