const d = {
  id: (id) => document.getElementById(id),
  byClass: (className) => document.getElementsByClassName(className),
  $: (selector, parent = document) => parent.querySelector(selector),
  $$: (selector, parent = document) => parent.querySelectorAll(selector),
  ev: (el, evType, fn) => el.addEventListener(evType, fn),
  toggle: (elsncls) =>
    elsncls.forEach(([el, className]) => el.classList.toggle(className)),
  getCustomProperty: (propertyName) =>
    getComputedStyle(document.documentElement).getPropertyValue(propertyName),
  setCustomProperty: (propertyName, propertyValue) =>
    document.documentElement.style.setProperty(propertyName, propertyValue),
  addClass: (el, className) => {
    if (!el) return
    el.classList.add(className)
    return el
  },
  rmClass: (el, className) => {
    if (!el) return
    el.classList.remove(className)
    return el
  },
  attr: (el, attribute) => {
    if (!el) return
    return el.getAttribute(attribute)
  },
  txt: (el, text) => {
    if (!el) return
    el.textContent = text
    return el
  },
  setAttr: (el, attr, val) => {
    if (!el) return
    el.setAttribute(attr, val)
  },
  hasClass: (el, className) => el.classList.contains(className)
}
export default d
