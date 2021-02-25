require('dotenv').config();
const {Telegraf} = require('telegraf');
const {getHebrew} = require("./hebrewReply");
const {getDoubleHumoresque} = require("./humoresqueScrapper");

const bot = new Telegraf(process.env.BOT_TOKEN);

const {telegram: tg} = bot;

tg.callApi('getUpdates', {offset: -1})
    .then((updates) => updates.length && updates[0].update_id + 1)
    .then((offset) => offset && tg.callApi('getUpdates', {offset}))
    .then(() => bot.launch())
    .then(() => console.info('The bot is launched'))
    .catch((err) => console.error(err));


bot.hears('/humoresque@Skozu19_bot', async (ctx) => {
    await ctx.reply(await getDoubleHumoresque());
})

bot.hears('(((', ((ctx) => {
    console.log('triggered');
    const message = ctx.message.text;
    const leftSide = message.indexOf('(((');
    const rightSide = message.indexOf(')))');
    if (leftSide !== -1 && rightSide !== -1) {
        ctx.reply(message.slice(0, leftSide) + getHebrew((rightSide) - (leftSide + 3)) + message.slice(rightSide + 3));
    }

}))