import d from '../../../public/scripts/lib/DOM.js'
import toFetch from '../../../public/scripts/lib/toFetch.js'
import createPopup from './popup-component/createPopups.js'

const $form = d.id('form')

const sendReservation = async (e) => {
  e.preventDefault()
  const $form = e.target
  const reservationData = Object.fromEntries(new FormData($form))
  try {
    const response = await toFetch('https://seagull-hotel-back.onrender.com/reserve/', 'json', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(reservationData)
    })
    const { status, content, ok } = response
    if (!ok) throw new Error(`${status} : ${content.errormsg}`)
    d.append(createPopup(content.successmsg, '#0fa', '#000'))
    $form.reset()
  } catch (err) {
    d.append(createPopup(err, '#f0a', '#000'))
  }
}

d.ev($form, 'submit', sendReservation)
