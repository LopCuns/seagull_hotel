import d from './lib/DOM.js'

const $body = document.body
const $headerContent = d.id('headerContent')
const $openmenu = d.id('openmenu')
const $main = d.id('main')
const $footer = d.id('footer')
const openCloseMenu = () => {
  d.toggle([
    [$headerContent, 'hidden'],
    [$openmenu, 'open'],
    [$body, 'no-scroll'],
    [$main, 'blurred'],
    [$footer, 'blurred']
  ])
}
d.ev($openmenu, 'click', openCloseMenu)

const ANIMTION_SELECTORS = ['.showUp', '.curtain']

const showAnimation = (entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    const $element = entry.target
    // Add the animation to the element
    d.addClass($element, 'animated')
  })
}

const animationObserver = new IntersectionObserver(showAnimation, { threshold: 0.75 })
d.$$(ANIMTION_SELECTORS.join(',')).forEach(el => animationObserver.observe(el))
