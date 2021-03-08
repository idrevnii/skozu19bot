require('dotenv').config();
const {Telegraf} = require('telegraf');
const {getArgument} = require("./utility");
const {getHebrew} = require("./hebrewReply");
const {getCustomHumoresque} = require("./humoresqueScrapper");
const {getShabbatDay} = require("./whenShabbat");

const bot = new Telegraf(process.env.BOT_TOKEN);

const {telegram: tg} = bot;

tg.callApi('getUpdates', {offset: -1})
    .then((updates) => updates.length && updates[0].update_id + 1)
    .then((offset) => offset && tg.callApi('getUpdates', {offset}))
    .then(() => bot.launch())
    .then(() => console.info('The bot is launched'))
    .catch((err) => console.error(err));

bot.command('humoresque@Skozu19_bot',async (ctx) => {
    const args = getArgument(ctx.message.text).split(' ');
    if (args.length === 1 && args[0] === '/humoresque@Skozu19_bot') {
        await ctx.reply(await getCustomHumoresque(50, 50));
    } else {
        if (args.length === 2) {
            const humoresque = await getCustomHumoresque(Math.floor(parseInt(args[0])), Math.floor(parseInt(args[1])));
            if (humoresque) {
                await ctx.reply(humoresque);
            } else {
                await ctx.reply('Stop trolling me!');
            }
        } else {
            await ctx.reply('Are you mad?');
        }
    }
})

bot.command('shabbat@Skozu19_bot', async (ctx) => {
    await ctx.reply(getShabbatDay());
})

bot.on('text', ((ctx) => {
    const message = ctx.message.text;
    const leftSide = message.indexOf('(((');
    const rightSide = message.indexOf(')))');
    if (leftSide !== -1 && rightSide !== -1) {
        ctx.reply(message.slice(0, leftSide) + getHebrew((rightSide) - (leftSide + 3)) + message.slice(rightSide + 3));
    }

}))