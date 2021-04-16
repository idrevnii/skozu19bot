require('dotenv').config();
const {Telegraf} = require('telegraf');
const {getArgument, isAdministrator} = require("./utility");
const {getHebrew} = require("./hebrewReply");
const {getCustomHumoresque} = require("./humoresqueScrapper");
const {getShabbatDay} = require("./whenShabbat");
const {addMarked, removeMarked, isMarked} = require("./markJew");

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
});

bot.command('juden@Skozu19_bot', async (ctx) => {
    const isAdmin = await isAdministrator(ctx, ctx.from);
    if (isAdmin && ctx.message.reply_to_message.from) {
        addMarked(ctx.message.reply_to_message.from);
        await ctx.reply('User now Jew!');
    }
});

bot.command('reabilitate@Skozu19_bot', async (ctx) => {
    const isAdmin = await isAdministrator(ctx, ctx.from);
    if (isAdmin && ctx.message.reply_to_message.from) {
        removeMarked(ctx.message.reply_to_message.from);
        await ctx.reply('User now not a Jew!');
    }
});


bot.on('text', (async (ctx) => {
    const message = ctx.message.text;

    const leftSide = message.indexOf('(((');
    const rightSide = message.indexOf(')))');
    if (leftSide !== -1 && rightSide !== -1 && rightSide - leftSide !== 0) {
        await ctx.reply(message.slice(0, leftSide) + getHebrew((rightSide) - (leftSide + 3)) + message.slice(rightSide + 3));
    }

    const isShabbat = message.toLowerCase().indexOf('шаббат');
    if (isShabbat !== -1) {
        await ctx.reply(getShabbatDay());
    }

    const isMark = isMarked(ctx.from)
    if (isMark) {
        console.log(ctx);
        await ctx.reply(getHebrew(ctx.message.text), {reply_to_message_id: ctx.update.message.message_id});
    }

}))