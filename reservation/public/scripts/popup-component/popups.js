const HTML = `
<div class="popup">
  <p class="popup__text"></p>
</div>
`
const template = document.createElement('template')
template.innerHTML = HTML

class Popup extends HTMLElement {
  constructor () {
    super()
    // SETUP
    this.attachShadow({ mode: 'open' })
    this.template = template.content.cloneNode(true)
    this.stylesheet = document.createElement('style')
  }

  connectedCallback () {
    // FILL TEXT
    const $popupText = this.template.querySelector('.popup__text')
    const $popUp = this.template.querySelector('.popup')
    $popupText.textContent = this.textContent
    //  STYLES
    this.stylesheet.textContent = `
     .popup {
       position: fixed;
       bottom: 0;
       width: 100%;
       padding: 1rem;
       text-align: center;
       background-color: ${this.getAttribute('data-backgroundcolor')};
       box-sizing: border-box;
     }
     .popup__text {
       font-family: sans-serif;
       font-weight: bold;
       color: ${this.getAttribute('data-textcolor')};
     }
     `
    // ADD CONTENT
    this.shadowRoot.appendChild(this.stylesheet)
    this.shadowRoot.appendChild(this.template)
    // ANIMATE THE ELEMENT
    const ANIMATION_DURATION = 600
    const SEE_DURATION = 6000
    // Make the element appear
    $popUp.animate([
      { transform: 'translateY(100%)' },
      { transform: 'translateY(0)' }
    ], { duration: ANIMATION_DURATION })
    // Make the element disappear

    $popUp.animate([
      { transform: 'translateY(0)' },
      { transform: 'translateY(100%)' }
    ], { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION + SEE_DURATION })

    // DELETE THE ELEMENT
    setTimeout(() => document.body.removeChild(this), ANIMATION_DURATION * 2 + SEE_DURATION)
  }
}

customElements.define('pop-up', Popup)
