import d from '../../../public/scripts/lib/DOM.js'
import { fadeIn, fadeOut } from '../../../public/scripts/lib/animations.js'

const $show = d.id('show')
const $showImg = d.id('showImg')
// Get current option selection transform value
const getCurrentTransformation = () =>
  Number(d.getCustomProperty('--selection_transform').slice(0, -2))
// Store vertical mouse positions
let prevVerticalPosition = 0
// Make the translation
const showTranslate = (y, amount) => {
  const currentTransformation = getCurrentTransformation()
  // If mouse goes up, move selection down
  // If mouse goes down, move selection up
  if (
    y > prevVerticalPosition &&
    currentTransformation > -$showImg.offsetHeight / 2
  ) {
    // mouse going down
    d.setCustomProperty(
      '--selection_transform',
      `${currentTransformation - amount}px`
    )
  } else if (
    y < prevVerticalPosition &&
    currentTransformation < ($showImg.offsetHeight * 1) / 2
  ) {
    // mouse going up
    d.setCustomProperty(
      '--selection_transform',
      `${currentTransformation + amount}px`
    )
  }
  // Update previous mouse vertical position
  prevVerticalPosition = y
}

// Highlight the current selected option
const showHighlightCurrent = (y) => {
  // Get all posible options
  const $showOptions = Array.from(d.$$('.show-option'))
  // Get the current selected option
  const $highlightedOption = d.$('.show-option.highlight')
  // Get the option that has mouse over it
  const $optionToHighlight =
    $showOptions
      .filter((option) => option.getBoundingClientRect().top < y)
      .slice(-1)[0] || $showOptions[0]
  // De-highlight the current selected option and highlight the new selected option
  d.rmClass($highlightedOption, 'highlight')
  d.addClass($optionToHighlight, 'highlight')
  // Animate show image if selected option has changed
  if ($highlightedOption !== $optionToHighlight) showChangeImage()
}
// Change image animation
const showChangeImage = () => {
  // Get the new show img src from the highlighted option
  const $highlightedOption = d.$('.show-option.highlight')
  const $highlightedImage = d.attr($highlightedOption, 'data-img')
  // Animation
  const animationOptions = {
    duration: 300
  }
  fadeOut($showImg, animationOptions)
  $showImg.src = $highlightedImage
  fadeIn($showImg, animationOptions)
}
// Show functionality
const show = (e, amount) => {
  // Get current mouse y position
  const y = e.clientY - $show.getBoundingClientRect().top
  // Translate the selection based on y position
  showTranslate(y, amount)
  // Highlight the current selection based on y position
  showHighlightCurrent(e.clientY)
}
export default show
