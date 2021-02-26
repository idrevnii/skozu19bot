const request = require('request-promise-native');
const cheerio = require('cheerio');
const {getRandomNumber} = require("./utility");

async function getHtml(url) {
    return request(url);
}

function getRandomHumoresqueFromArrayWithLength(arr, length) {
    const result = arr[getRandomNumber(0, arr.length - 1)];
    if (result.split(' ').length > 30) {
        return getRandomHumoresqueFromArrayWithLength(arr, length);
    } else {
        return result;
    }
}

async function getHumoresque() {
    const standartUrl = `https://humornet.ru/anekdot/page/${getRandomNumber(0, 4112)}/`;
    const body = await getHtml(standartUrl);
    const $ = cheerio.load(body);
    const humoresques = $('div .text').map((i, el) => $(el).text()).toArray();
    const result = getRandomHumoresqueFromArrayWithLength(humoresques, 30);
    if (result) {
        return result;
    } else {
        console.log(humoresques, result);
        return 'Not funny, didnt laugh';
    }

}

async function getDoubleHumoresque() {
    const first = (await getHumoresque()).split(' ');
    const second = (await getHumoresque()).split(' ');
    return first.slice(0, first.length / 2).concat(second.slice(second.length / 2)).join(' ');
}

async function getCustomHumoresque(firstPart, secondPart) {
    if (typeof firstPart === 'number' && typeof  secondPart === 'number' && firstPart > 0 && firstPart < 101 && secondPart > 0 && secondPart < 101) {
        const first = (await getHumoresque()).split(' ');
        const second = (await getHumoresque()).split(' ');
        return first.slice(0, (Math.floor(first.length / 100 * firstPart))).concat(second.slice(Math.floor(second.length / 100 * secondPart))).join(' ');
    } else {
        return 'Wrong ratio!';
    }
}

module.exports = {
    getDoubleHumoresque,
    getCustomHumoresque,
}