import '../../../public/scripts/common.js'
import d from '../../../public/scripts/lib/DOM.js'
import SLIDER_INFO from './sliderinfo.js'
import createSlider from '../../../public/scripts/lib/slider.js'

// Create the slider object
createSlider({
  sliderInfo: SLIDER_INFO,
  $slider: d.id('slider'),
  $topImg: d.id('sliderTopImg'),
  $subImg: d.id('sliderSubImg'),
  $title: d.id('sliderTitle'),
  $desc: d.id('sliderDesc'),
  $progress: Array.from(d.id('sliderProgress').children),
  $controllers: d.id('sliderControllers')
})
