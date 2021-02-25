const {letters} = require('hebrew');
const {getRandomNumber} = require("./utility");

function getAlphabet(o) {
    const keys = Object.keys(o)
    const result = [];
    for (const key of keys) {
        if (!(typeof o[key] === 'object')) {
            result.push(o[key]);
        }
    }
    return result;
}

function getHebrew(count) {
    const alphabet = getAlphabet(letters);
    let result = '';
    for (let i = 0; i !== count; i += 1) {
        result = `${result}${alphabet[getRandomNumber(0, 16)]}`;
    }
    return result;
}

module.exports = {
    getHebrew,
}