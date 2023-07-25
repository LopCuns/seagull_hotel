import d from './DOM.js'
import { animateMultiple, lighting } from './animations.js'
import infiniteRange from './infiniteRange.js'
/**
 * Get the current slide index.
 * @param {HTMLElement} $slider
 * @returns {number} slider index
 */
const getSliderIndex = ($slider) => Number(d.attr($slider, 'data-sliderindex'))

/**
 * Update the data shown in the slider.
 * @param {object} sliderData
 */
const updateSliderInfo = ({ newSliderInfo, $topImg, $subImg, $title, $desc }) => {
  d.setAttr($topImg, 'src', newSliderInfo.topimg)
  d.setAttr($subImg, 'src', newSliderInfo.subimg)
  d.txt($title, newSliderInfo.title)
  d.txt($desc, newSliderInfo.desc)
}

/**
 * Update the slider progress.
 * @param {number} newCurrentIndex
 * @param {HTMLElement} $progress
 */
const updateProgress = (newCurrentIndex, $progress) => {
  d.rmClass(d.$('.slider__info__progress__dot.current'), 'current')
  d.addClass($progress[newCurrentIndex], 'current')
}

/**
 * Create the function to change slides.
 * @param {obejct} sliderData
 * @returns {function} changeSliderFunction
 */
const changeSlideFunction = ({ sliderInfo, $slider, $topImg, $subImg, $title, $desc, $progress }) => (index) => {
  const rangedIndex = infiniteRange(0, sliderInfo.length - 1, index)
  const newSliderInfo = sliderInfo[rangedIndex]

  updateSliderInfo({ newSliderInfo, $topImg, $subImg, $title, $desc })
  updateProgress(rangedIndex, $progress)
  animateMultiple([$topImg, $subImg], lighting, { duration: 500 })
  d.setAttr($slider, 'data-sliderindex', rangedIndex)
}
/**
 * Create a new slider and run it.
 * @param {object} sliderData
 */
const createSlider = ({ sliderInfo, $slider, $topImg, $subImg, $title, $desc, $progress, $controllers }) => {
  // Create a change slide from changeSlideFunction
  const changeSlide = changeSlideFunction({ sliderInfo, $slider, $topImg, $subImg, $title, $desc, $progress })
  // Create the slider change interval
  const createInterval = ($slider) =>
    setInterval(() => changeSlide(getSliderIndex($slider) + 1), 5000)
  let sliderTimer = createInterval($slider)
  // Create the slider controlls
  const sliderControll = (e, $slider, changeSlide) => {
    const direction = d.attr(e.target, 'data-changeslide')
    // If not direction, not controller btn clicked, so exit the function
    if (!direction) return
    // Reset interval
    clearInterval(sliderTimer)
    sliderTimer = createInterval($slider)

    const currentSliderIndex = getSliderIndex($slider)
    if (direction === 'prev') return changeSlide(currentSliderIndex - 1)
    else if (direction === 'next') return changeSlide(currentSliderIndex + 1)
  }
  // Add the controlls to the controllers
  d.ev($controllers, 'click', (e) => sliderControll(e, $slider, changeSlide))
}
export default createSlider
