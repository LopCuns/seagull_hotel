import '../../../public/scripts/common.js'
import d from '../../../public/scripts/lib/DOM.js'
import SLIDER_INFO from './sliderinfo.js'
import createSlider from '../../../public/scripts/lib/slider.js'

createSlider({
  sliderInfo: SLIDER_INFO,
  $slider: d.id('slider'),
  $topImg: d.id('sliderTopImg'),
  $progress: Array.from(d.id('sliderProgress').children),
  $controllers: d.id('sliderControllers')
})

const $menuOpeners = Array.from(d.$$('.menu__opener'))

const expandMenu = ($opener) => {
  const $menu = $opener.parentElement
  const $icon = d.$('[data-expandicon]', $opener)
  const $toexpand = d.$('[data-toexpand]', $menu)
  d.toggle([[$toexpand, 'expanded-plate'], [$icon, 'expanded-icon']])
}

$menuOpeners.forEach($opener => d.ev($opener, 'click', () => expandMenu($opener)))
