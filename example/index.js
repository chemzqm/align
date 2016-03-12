var align = require('..')
var demo = document.getElementById('demo')
var menu = document.getElementById('menu')
setPosition()

function setPosition() {
  var vf = document.getElementById('from').value
  var vt = document.getElementById('to').value
  align(demo, menu, vf + '-' + vt)
}
document.getElementById('from').addEventListener('change', function () {
  setPosition()
})
document.getElementById('to').addEventListener('change', function () {
  setPosition()
})
