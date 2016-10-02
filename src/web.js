;(function() {
  "use strict"

  window.asc = AsceticContext()

  window.addEventListener('load', function() {
    renderToDom(asc.render())
  })

  function renderToDom(lines) {
    var lineElements = getLineElements()

    for (var i = 0; i < lineElements.length; i++) {
      if (lines[i]) {
        lineElements[i].innerText = lines[i]
      } else {
        lineElements[i].innerText = ''
      }
    }
  }

  var lineElements
  function getLineElements() {
    if (!lineElements) {
      lineElements = []
      for (var i = 0; i < 30; i++) {
        var p = document.createElement('p')
        lineElements.push(p)
        document.body.appendChild(p)
      }
    }

    return lineElements
  }
})();
