/**
 * Given a minimum value, a maximum value and a value, returns the value if its between max and min,
 * returns the max if value is lower than min and returns the min if value is greater than max.
 * @param {number} min
 * @param {number} max
 * @param {number} num
 * @returns {number}
 */
const infiniteRange = (min, max, num) => {
  if (num > max) return min
  else if (num < min) return max
  return num
}

export default infiniteRange
