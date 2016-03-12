/*global describe, it, beforeEach, afterEach*/
var assert = require('assert')
var align = require('..')

var from
var to
beforeEach(function () {
  from = document.createElement('div')
  document.body.appendChild(from)
  from.style.height = '30px'
  from.style.width = '100px'
  from.style.top = '0px'
  from.style.left = '0px'
  from.style.position = 'absolute'
  to = document.createElement('div')
  document.body.appendChild(to)
  to.style.height = '10px'
  to.style.width = '20px'
  to.style.position = 'absolute'
})

afterEach(function () {
  document.body.removeChild(to)
  document.body.removeChild(from)
})

describe('align', function() {
  it('should align', function () {
    align(from, to, 'br-tr')
    assert.equal(to.style.top, '30px')
    assert.equal(to.style.left, '80px')
  })
})
