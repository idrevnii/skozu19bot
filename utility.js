const random = require('random');

function getRandomNumber(min, max) {
    return random.int(min, max);
}

module.exports = {
    getRandomNumber
}