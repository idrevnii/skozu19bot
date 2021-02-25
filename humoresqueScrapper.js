const request = require('request-promise-native');
const cheerio = require('cheerio');
const {getRandomNumber} = require("./utility");

async function getHtml(url) {
    return request(url);
}

async function getHumoresque() {
    const standartUrl = `https://humornet.ru/anekdot/page/${getRandomNumber(0, 4112)}/`;
    const body = await getHtml(standartUrl);
    const $ = cheerio.load(body);
    const humoresques = $('div .text').map((i, el) => $(el).text()).toArray();
    const result = humoresques[getRandomNumber(0, humoresques.length - 1)]
    if (result.split(' ').length > 30) {
        return getHumoresque();
    }
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

module.exports = {
    getDoubleHumoresque,
}