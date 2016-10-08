var $context = inject()

window.Stage  = $context.Stage
window.test   = $context.test
window.should = $context.should
window.start  = $context.start
var render    = $context.render
var sendInputEvent = $context.sendInputEvent

var lineElements = []
window.addEventListener('load', function() {
  var bodyStyle = document.body.style
  bodyStyle .backgroundColor = 'navajowhite'
  bodyStyle           .color = 'saddlebrown'
  bodyStyle      .fontFamily = 'Menlo, Monaco, monospace'

  var container = document.createElement('div')
  container.style.display = 'table'
  container.style.marginLeft = 'auto'
  container.style.marginRight = 'auto'
  document.body.appendChild(container)

  // set up line elements
  for (var i = 0; i < 30; i++) {
    var p = document.createElement('p')
    p.style.whiteSpace = 'pre'
    p.style.margin = '0'
    p.style.fontSize = '16.6px' // 80 cols fit in 800px
    p.style.lineHeight = '20px' // 30 lines fit in 600 px
    lineElements.push(p)
    container.appendChild(p)
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
      lineElements[i].innerText = snug(lines[i], 80)
    } else {
      lineElements[i].innerText = snug('', 80)
    }
  }
}

var spaces = Array(80).join(' ')
function snug(text, width) {
  if (text.length < width) {
    return snug(text + spaces, width)
  } else {
    return text.slice(0, width)
  }
}
