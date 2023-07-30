import d from '../../../../public/scripts/lib/DOM.js'

const createPopup = (msg, bgcolor = '#0fa', txtcolor = '#000') => {
  const $popup = d.el('pop-up')
  d.txt($popup, msg)
  d.setAttr($popup, 'data-backgroundColor', bgcolor)
  d.setAttr($popup, 'data-textColor', txtcolor)
  return $popup
}
export default createPopup
