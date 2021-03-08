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

function getHebrew(words) {
    const alphabet = getAlphabet(letters);
    return words.split(' ').map((word) => {
        let result = '';
        for (let i = 0; i !== word.length; i += 1) {
            result = `${result}${alphabet[getRandomNumber(0, 16)]}`;
        }
        return result;
    }).join(' ');
}

module.exports = {
    getHebrew,
}