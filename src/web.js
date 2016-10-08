var $context = inject()

window.Stage  = $context.Stage
window.test   = $context.test
window.should = $context.should
window.start  = $context.start
var render    = $context.render
var sendInputEvent = $context.sendInputEvent

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
