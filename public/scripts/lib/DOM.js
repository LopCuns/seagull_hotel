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
  addClass: (el, className) => el.classList.add(className),
  rmClass: (el, className) => el.classList.remove(className),
  attr: (el, attribute) => el.getAttribute(attribute)
}
export default d
