const fadeOut = (el, options) => {
  el.animate([{ opacity: 1 }, { opacity: 0.5 }], options)
}

const fadeIn = (el, options) => {
  el.animate(
    [
      { opacity: 0.5, transform: 'scale(1.2)' },
      { opacity: 1, transform: 'scale(1)' }
    ],
    options
  )
}

const lighting = (el, options) => {
  el.animate([{ opacity: 0 }, { opacity: 0.5 }, { opacity: 1 }], options)
}

const animateMultiple = (els, animation, options) => {
  els.forEach((el) => animation(el, options))
}

export { fadeIn, fadeOut, lighting, animateMultiple }
