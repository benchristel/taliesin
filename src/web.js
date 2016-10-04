;(function() {
  var $import = Ascetic()

  window.Stage  = $import.Stage
  window.test   = $import.test
  window.should = $import.should
  window.start  = $import.start

  var lineElements = []
  window.addEventListener('load', function() {
    // set up line elements
    for (var i = 0; i < 30; i++) {
      var p = document.createElement('p')
      lineElements.push(p)
      document.body.appendChild(p)
    }

    renderToDom($import.render())
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
