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
