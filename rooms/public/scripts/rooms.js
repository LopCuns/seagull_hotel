import '../../../public/scripts/common.js'
import d from '../../../public/scripts/lib/DOM.js'
import show from './show.js'

const $show = d.id('show')
d.ev($show, 'mousemove', (e) => show(e, 5))
d.ev($show, 'mouseenter', () =>
  d.setCustomProperty('--selection_transform', '0px')
)

d.ev($show, 'click', () => d.$('.highlight').click())
