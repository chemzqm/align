# Align

Align one element to another with specified position and offset.

## Install

    npm install component-align

## Example

``` js
var align = require('component-align')
var yellow = document.getElementById('yellow')
var blue = document.getElementById('blue')
align(yellow, blue, 'bl-tl')
```

## API

### align(fromEl, toEl, [position], [offset])

* position should be `[pos]-[pos]`, pos could be 'tl', 'tc', 'tr', 'bl', 'bc', 'br', 'lc', 'rc'
* offset could contain x and y as number in pixel.
