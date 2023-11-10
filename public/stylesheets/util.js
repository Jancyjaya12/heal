// A function to select a random element from an array.
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = { getRandomElement };