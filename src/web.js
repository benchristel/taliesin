;(function() {
  "use strict"

  var context = AsceticContext()

  window.Stage  = context.Stage
  window.test   = context.test
  window.should = context.should
  window.start  = context.start

  var lineElements = []
  window.addEventListener('load', function() {
    // set up line elements
    for (var i = 0; i < 30; i++) {
      var p = document.createElement('p')
      lineElements.push(p)
      document.body.appendChild(p)
    }

    renderToDom(context.render())
  })

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
