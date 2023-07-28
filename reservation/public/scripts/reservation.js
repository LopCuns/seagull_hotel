import d from '../../../public/scripts/lib/DOM.js'

// To format room types and names before using them
const formatString = (string) => string.toLowerCase()

// Select elements
const $roomType = d.id('roomType')
const $roomName = d.id('roomName')
// Form element

const $form = d.id('form')

const createOption = (value, text) => d.addClass(
  d.txt(
    d.setAttr(
      d.el('option'),
      'value',
      value),
    text),
  'form__select__option'
)

const roomOptionsByType = {
  Suite: [
    createOption('Classical', 'Classical'),
    createOption('Couple', 'Couple'),
    createOption('Library', 'Library'),
    createOption('Business', 'Business')
  ],
  Family: [
    createOption('Mountain', 'Mountain'),
    createOption('Ocean', 'Ocean'),
    createOption('Relax', 'Relax'),
    createOption('Pool', 'Pool')
  ],
  Duplex: [
    createOption('Country', 'Country'),
    createOption('Minimalist', 'Minimalis'),
    createOption('Modern', 'Modern'),
    createOption('Whitehouse', 'Whitehouse')
  ],
  Adapted: [
    createOption('Lower', 'Lower'),
    createOption('Modernism', 'Modernism'),
    createOption('Two', 'Two'),
    createOption('Wooden', 'Wooden')
  ]
}

d.ev(window, 'DOMContentLoaded', () => {
  // Get room type and room name from the URL
  const url = new URL(location.href)
  const roomType = formatString(url.searchParams.has('roomtype') ? url.searchParams.get('roomtype') : '')
  const roomName = formatString(url.searchParams.has('roomname') ? url.searchParams.get('roomname') : '')
  // Room type options
  const roomTypeOptions = Array.from($roomType.options).map(opt => formatString(opt.value))
  // Pick the options contained in the URL
  // Use of Math.max --> If an option is not in the list, indexOf returns -1.
  // In order to not break the JS, we need to substitute that index (-1) for a valid index (in this case I prefer 0 to get the initial value)
  $roomType.options[Math.max(roomTypeOptions.indexOf(roomType), 0)].selected = true
  // Change the old room type options for the new room options
  changeRoomNames($roomName, roomOptionsByType[$roomType.value])

  const roomNameOptions = Array.from($roomName.options).map(opt => formatString(opt.value))
  $roomName.options[Math.max(roomNameOptions.indexOf(roomName), 0)].selected = true
})

const clearOptions = (selectElement) => {
  const optionsCollection = selectElement.options
  Array.from(optionsCollection).forEach(option => optionsCollection.remove(option))
}

const addOptions = (selectElement, options) => {
  const optionsCollection = selectElement.options
  options.forEach(opt => optionsCollection.add(opt))
}

const changeRoomNames = (selectElement, newNames) => {
  clearOptions(selectElement)
  addOptions(selectElement, newNames)
}

d.ev($roomType, 'change', () => changeRoomNames($roomName, roomOptionsByType[$roomType.value]))

const sendReservation = (e) => {
  e.preventDefault()
  const $form = e.target
  const reservationData = new FormData($form)
  $form.reset()
  console.log(reservationData)
}

d.ev($form, 'submit', sendReservation)
