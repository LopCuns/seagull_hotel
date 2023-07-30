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
    return el
  },
  hasClass: (el, className) => el.classList.contains(className),
  replaceClass: (el, rmClass, newClass) => {
    // Create an outer array, flat it and spread its content
    // This was made to allow either strings (one class) and arrays (multiple classes) as arguments.
    // With a string:
    // string is placed inside an array, this array is flatted(won't do anything because it's already flat) and spread operator unpacks the string.
    // With an array:
    // The array is placed inside an outer array, which is flatted getting the initial array, and spread operator unpacks its values.
    el.classList.remove(...[rmClass].flat())
    el.classList.add(...[newClass].flat())
    return el
  },
  rmev: (el, evType, fn) => el.removeEventListener(evType, fn),
  append: (node, parent = document.body) => {
    parent.appendChild(node)
    return node
  },
  prepend: (node, parent = document) => {
    parent.prepend(node)
    return node
  },
  el: (tag) => document.createElement(tag)
}
export default d
