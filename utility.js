const random = require('random');

function getRandomNumber(min, max) {
    return random.int(min, max);
}

function getArgument(message) {
    return message.slice(message.indexOf(' ') + 1);
}

module.exports = {
    getArgument,
    getRandomNumber
}