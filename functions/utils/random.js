const { v4: uuidv4 } = require('uuid');

// rewrite to some custom method( e.g. xorshift) or use https://www.random.org/
// Learn more: https://www.udacity.com/blog/2021/04/javascript-random-numbers.html
const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomUuid= uuidv4;

const getRandomDay = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return days[getRandom(0, days.length - 1)]
}

module.exports = {
  getRandom,
  getRandomUuid,
  getRandomDay
}
