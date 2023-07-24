const d = {
  id: (id) => document.getElementById(id),
  byClass: (className) => document.getElementsByClassName(className),
  $: (selector) => document.querySelector(selector),
  $$: (selector) => document.querySelectorAll(selector),
  ev: (el, evType, fn) => el.addEventListener(evType, fn),
  toggle: (elsncls) =>
    elsncls.forEach(([el, className]) => el.classList.toggle(className)),
  getCustomProperty: (propertyName) =>
    getComputedStyle(document.documentElement).getPropertyValue(propertyName),
  setCustomProperty: (propertyName, propertyValue) =>
    document.documentElement.style.setProperty(propertyName, propertyValue),
  addClass: (el, className) => {
    el.classList.add(className)
    return el
  },
  rmClass: (el, className) => {
    el.classList.remove(className)
    return el
  },
  attr: (el, attribute) => el.getAttribute(attribute),
  txt: (el, text) => {
    el.textContent = text
    return el
  },
  setAttr: (el, attr, val) => el.setAttribute(attr, val)
}
export default d
