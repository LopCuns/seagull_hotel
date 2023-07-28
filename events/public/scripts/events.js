import '../../../public/scripts/common.js'
import d from '../../../public/scripts/lib/DOM.js'
import createCarrousel from '../../../public/scripts/lib/carrousel.js'

createCarrousel({
  $carrousel: d.id('carrousel'),
  MAIN_CLASS: 'carrousel__main',
  SIDE_CLASS: 'carrousel_side',
  LEFT_CLASS: 'carrousel_side-left',
  RIGHT_CLASS: 'carrousel_side-right',
  NO_VISIBLE_LEFT_CLASS: 'carrousel_side-novisible-left',
  NO_VISIBLE_RIGHT_CLASS: 'carrousel_side-novisible-right'
})
