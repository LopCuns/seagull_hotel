const d = {
  id: (id) => document.getElementById(id),
  byClass: (className) => document.getElementsByClassName(className),
  $: (selector) => document.querySelector(selector),
  $$: (selector) => document.querySelectorAll(selector),
  ev: (el, evType, fn) => el.addEventListener(evType, fn),
  toggle: (elsncls) => elsncls.forEach(([el, className]) => el.classList.toggle(className))
}
export default d
