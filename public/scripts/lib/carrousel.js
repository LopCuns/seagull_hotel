import d from './DOM.js'
import percent from './percent.js'

function createCarrousel ({ $carrousel, MAIN_CLASS, SIDE_CLASS, LEFT_CLASS, RIGHT_CLASS, NO_VISIBLE_LEFT_CLASS, NO_VISIBLE_RIGHT_CLASS }) {
  const getMain = () => d.$(`.${MAIN_CLASS}`)
  const getLeft = () => d.$(`.${LEFT_CLASS}`)
  const getRight = () => d.$(`.${RIGHT_CLASS}`)
  const getLastLeft = () => d.$$(`.${NO_VISIBLE_LEFT_CLASS}`)[0]
  const getLastRight = () => Array.from(d.$$(`.${NO_VISIBLE_RIGHT_CLASS}`)).pop()
  const getNextRight = () => d.$(`.${NO_VISIBLE_RIGHT_CLASS}`)
  const getNextLeft = () => Array.from(d.$$(`.${NO_VISIBLE_LEFT_CLASS}`)).pop()

  const changeSwipeDirection = (X) => {
    const leftLimit = percent(WINDOW_WIDTH, threshold)
    const rightLimit = percent(WINDOW_WIDTH, 100 - threshold)

    if (X < leftLimit) {
      swipeTo = swipeLeft
      return
    }
    if (X > rightLimit) {
      swipeTo = swipeRight
      return
    }
    swipeTo = ''
  }
  // Change window width whenever window is resized
  let WINDOW_WIDTH = window.innerWidth

  d.ev(window, 'resize', () => { WINDOW_WIDTH = window.innerWidth })
  let mouseDownPosition = 0
  let swipeTo = ''
  const threshold = 30

  const swipeLeft = () => {
    const $left = getLeft()
    const $main = getMain()
    const $right = getRight()
    // Disappear the left image
    d.replaceClass($left, [LEFT_CLASS, SIDE_CLASS], NO_VISIBLE_LEFT_CLASS)
    // Change last left class to the last right class and move it to that position
    d.replaceClass(d.append(getLastLeft(), $carrousel), NO_VISIBLE_LEFT_CLASS, getLastRight() ? NO_VISIBLE_RIGHT_CLASS : RIGHT_CLASS)
    // Change the first no visible right class to the right class
    d.replaceClass(getNextRight(), NO_VISIBLE_RIGHT_CLASS, [RIGHT_CLASS, SIDE_CLASS])
    // Change main class to left class
    d.replaceClass($main, MAIN_CLASS, [LEFT_CLASS, SIDE_CLASS])
    // Change right class to main class
    d.replaceClass($right, [RIGHT_CLASS, SIDE_CLASS], MAIN_CLASS)
  }

  const swipeRight = () => {
    const $left = getLeft()
    const $main = getMain()
    const $right = getRight()
    // Disappear the right image
    d.replaceClass($right, [RIGHT_CLASS, SIDE_CLASS], NO_VISIBLE_RIGHT_CLASS)
    // Change last right class to the first left no visible class and move it to that position
    d.replaceClass(d.prepend(getLastRight(), $carrousel), NO_VISIBLE_RIGHT_CLASS, getLastLeft() ? NO_VISIBLE_LEFT_CLASS : LEFT_CLASS)
    // Change the first no visible left class to the left class
    d.replaceClass(getNextLeft(), NO_VISIBLE_LEFT_CLASS, [LEFT_CLASS, SIDE_CLASS])
    // Change main class to right class
    d.replaceClass($main, MAIN_CLASS, [RIGHT_CLASS, SIDE_CLASS])
    // Change left class to main class
    d.replaceClass($left, [LEFT_CLASS, SIDE_CLASS], MAIN_CLASS)
  }

  const moveMain = (px) => {
    if (px < (mouseDownPosition - WINDOW_WIDTH) || px > (WINDOW_WIDTH - mouseDownPosition)) return
    d.setCustomProperty('--carrouselMainTranslate', `${px}px`)
  }

  const onDrag = (e) => {
    const X = e.clientX || e.touches[0].clientX || 0
    moveMain(X - mouseDownPosition)
    changeSwipeDirection(X)
  }

  const onUp = (e) => {
    d.rmev($carrousel, 'mousemove', onDrag)
    d.rmev($carrousel, 'mouseup', onUp)
    d.rmev($carrousel, 'touchmove', onDrag)
    d.rmev($carrousel, 'touchend', onUp)
    d.replaceClass($carrousel, 'grabbing', 'grab')
    d.rmClass(getMain(), 'pressedSlide')
    moveMain(0)
    mouseDownPosition = 0
    if (swipeTo) return swipeTo()
    swipeTo = ''
  }

  const onDown = (e) => {
    mouseDownPosition = e.clientX
    d.ev($carrousel, 'mousemove', onDrag)
    d.ev($carrousel, 'mouseup', onUp)
    d.ev($carrousel, 'touchmove', onDrag)
    d.ev($carrousel, 'touchend', onUp)
    d.replaceClass($carrousel, 'grab', 'grabbing')
    d.addClass(getMain(), 'pressedSlide')
    changeSwipeDirection(mouseDownPosition)
  }

  const onEnter = (e) => {
    d.addClass($carrousel, 'grab')
  }

  const onLeave = (e) => {
    d.rmClass($carrousel, 'grabbing')
    d.rmClass($carrousel, 'grab')
  }

  d.ev($carrousel, 'mousedown', onDown)
  d.ev($carrousel, 'mouseenter', onEnter)
  d.ev($carrousel, 'mouseleave', onLeave)
  d.ev($carrousel, 'touchstart', onDown)
}

export default createCarrousel
