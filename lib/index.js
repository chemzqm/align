var computedStyle = require('computed-style')
var doc = document.documentElement

/**
 * align from to to element with position
 *
 * @public
 * @param {Element} from
 * @param {Element} to
 * @param {Object} offset
 * @param {String} position
 */
function align(from, to, position, offset) {
  if (!/[tlrbc]{2}-[tlrbc]{2}/.test(position)) throw new Error('invalid position ' + position)
  var pel = getRelativeElement(from)
  if (pel !== getRelativeElement(to)) throw new Error('from and to should share same position element')
  var pos = getAbsolutePosition(from, pel)
  var parts = position.split('-')
  var point = getFromPoint(pos, parts[0])
  var res = getPosition(to, point, parts[1])
  if (offset) {
      res.x += offset.x || 0
      res.y += offset.y || 0
  }
  to.style.top = res.y + 'px'
  to.style.left = res.x + 'px'
}

function getPosition(to, point, str) {
  var x = point.x
  var y = point.y
  var th = parseInt(computedStyle(to, 'height'), 10)
  var tw = parseInt(computedStyle(to, 'width'), 10)
  if (isNaN(th) || isNaN(tw)) throw new Error('can\'t get dimension of to element')
  if (~str.indexOf('b')) {
    y = y - th
  }
  if (~str.indexOf('r')) {
    x = x - tw
  }
  if (~str.indexOf('c')) {
    switch (str.replace('c', '')) {
      case 't':
        x = x - tw/2
        break
      case 'b':
        x = x - tw/2
        break
      case 'l':
        y = y - th/2
        break
      case 'r':
        y = y - th/2
        break
    }
  }
  return {x:x, y:y}
}

function getFromPoint(pos, str) {
  var x = pos.left
  var y = pos.top
  if (~str.indexOf('b')) {
    y = y + pos.height
  }
  if (~str.indexOf('r')) {
    x = x + pos.width
  }
  if (~str.indexOf('c')) {
    switch (str.replace('c', '')) {
      case 't':
        x = x + pos.width/2
        break
      case 'b':
        x = x + pos.width/2
        break
      case 'l':
        y = y + pos.height/2
        break
      case 'r':
        y = y + pos.height/2
        break
    }
  }
  return {x: x, y:y}
}

function getRelativeElement (el) {
  do {
    el = el.parentNode
    if (el === doc) return el
    var p = getComputedStyle(el).position
    if (p === 'absolute' || p === 'fixed' || p === 'relative') {
      return el
    }
  } while(el)
}

/**
 * Get absolute left top width height
 *
 * @param  {Element}  el
 * @param {Element} pel
 * @return {Object}
 * @api public
 */
function getAbsolutePosition (el, pel) {
  var r = el.getBoundingClientRect()
  var rect = pel.getBoundingClientRect()
  return {
    left: r.left - rect.left,
    top: r.top -rect.top,
    width: r.width,
    height: r.height
  }
}

module.exports = align
