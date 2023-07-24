import '../../../public/scripts/common.js'
import d from '../../../public/scripts/lib/DOM.js'
import infiniteRange from '../../../public/scripts/lib/infiniteRange.js'
import SLIDER_INFO from './sliderinfo.js'
import {
  lighting,
  animateMultiple
} from '../../../public/scripts/lib/animations.js'

const $sliderTopImg = d.id('sliderTopImg')
const $sliderSubImg = d.id('sliderSubImg')
const $sliderTitle = d.id('sliderTitle')
const $sliderDesc = d.id('sliderDesc')
const $sliderControllers = d.id('sliderControllers')
const $sliderProgress = Array.from(d.id('sliderProgress').children)
const $slider = d.id('slider')

/**
 * Get the current index slide index.
 * @returns {number}
 */
const getSliderIndex = () => Number(d.attr($slider, 'data-sliderindex'))

/**
 * Updates slider top image, sub image, title and description
 * @param {object} newSliderInfo
 */
const updateSliderInfo = (newSliderInfo) => {
  $sliderTopImg.src = newSliderInfo.topimg
  $sliderSubImg.src = newSliderInfo.subimg
  d.txt($sliderTitle, newSliderInfo.title)
  d.txt($sliderDesc, newSliderInfo.desc)
}
/**
 * Update the slider progress
 * @param {number} newCurrentIndex
 */
const updateProgress = (newCurrentIndex) => {
  d.rmClass(d.$('.slider__info__progress__dot.current'), 'current')
  d.addClass($sliderProgress[newCurrentIndex], 'current')
}

/**
 * Change the slide content
 * @param {number} index
 */
const changeSlide = (index) => {
  const rangedIndex = infiniteRange(0, SLIDER_INFO.length - 1, index)
  const newSliderInfo = SLIDER_INFO[rangedIndex]

  updateSliderInfo(newSliderInfo)
  updateProgress(rangedIndex)
  animateMultiple([$sliderTopImg, $sliderSubImg], lighting, { duration: 500 })
  d.setAttr($slider, 'data-sliderindex', rangedIndex)
}

/**
 * Creates an interval to change the slide every 5s
 * @returns {*} javascript setInterval
 */
const createInterval = () =>
  setInterval(() => changeSlide(getSliderIndex() + 1), 5000)

let sliderTimer = createInterval()

/**
 * Change slide using controll buttons
 * @param {Event} e
 */
const sliderControll = (e) => {
  const direction = d.attr(e.target, 'data-changeslide')
  // If not direction, not controller btn clicked, so exit the function
  if (!direction) return
  // Reset interval
  clearInterval(sliderTimer)
  sliderTimer = createInterval()

  const currentSliderIndex = getSliderIndex()
  if (direction === 'prev') return changeSlide(currentSliderIndex - 1)
  else if (direction === 'next') return changeSlide(currentSliderIndex + 1)
}

d.ev($sliderControllers, 'click', sliderControll)
