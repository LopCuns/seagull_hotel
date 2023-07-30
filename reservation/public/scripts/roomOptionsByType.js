import d from '../../../public/scripts/lib/DOM.js'
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
  suite: [
    createOption('classical', 'Classical'),
    createOption('couple', 'Couple'),
    createOption('library', 'Library'),
    createOption('business', 'Business')
  ],
  family: [
    createOption('mountain', 'Mountain'),
    createOption('ocean', 'Ocean'),
    createOption('relax', 'Relax'),
    createOption('pool', 'Pool')
  ],
  duplex: [
    createOption('country', 'Country'),
    createOption('minimalist', 'Minimalis'),
    createOption('modern', 'Modern'),
    createOption('whitehouse', 'Whitehouse')
  ],
  adapted: [
    createOption('lower', 'Lower'),
    createOption('modernism', 'Modernism'),
    createOption('two', 'Two'),
    createOption('wooden', 'Wooden')
  ]
}
export default roomOptionsByType
