const {getShabbatDay} = require("./whenShabbat");
const {getCustomHumoresque} = require("./humoresqueScrapper");
const {getArgument} = require("./utility");

// Яндекс-функция:
module.exports.bot = async (event) => {
    const body = JSON.parse(event.body);
    const text = body.message.text;

    const userMsg = text.toLowerCase();
    let answerText;

    switch (userMsg) {
        case 'humoresque@Skozu19_bot':
            const args = getArgument(userMsg).split(' ');
            if (args.length === 1 && args[0] === '/humoresque@Skozu19_bot') {
                answerText = (await getCustomHumoresque(50, 50));
            } else {
                if (args.length === 2) {
                    answerText = await getCustomHumoresque(Math.floor(parseInt(args[0])), Math.floor(parseInt(args[1])));
                    if (!answerText) {
                        answerText = 'Stop trolling me!'
                    }
                } else {
                    answerText = 'Are you mad?';
                }
            }
            break;
        case 'shabbat@Skozu19_bot':
            answerText = getShabbatDay();
            break;
        default:
            answerText = 'Reply to simple message';
    }













    let botMsg;
    let photoUrl;
    let redirectUrl;
    let inlineKeyText;
    let isPhoto = false;
    let msg = {};

    if (getTrigger(userMsg)) {
        botMsg = await getData(api);
    } else if (userMsg === '/start') {
        botMsg = 'Нажми на кнопку "Умная мысль", чтобы получить её бесплатно.';
    } else if (userMsg === '/help') {
        botMsg = 'Я поставляю умные мысли от умных людей! Нажимай на кнопку "Умная мысль", чтобы получать их бесплатно.';
    } else if (userMsg === 'навык алисы') {
        isPhoto = true;
        inlineKeyText = 'Послушай Умные Мысли от Алисы!';
        photoUrl = skillImgUrl;
        redirectUrl = skillUrl;
    } else if (userMsg === 'кинуть монетку') {
        isPhoto = true;
        inlineKeyText = 'Проспонсируй немного Умные Мысли!';
        photoUrl = donateImgUrl;
        redirectUrl = donateUrl;
    } else {
        botMsg = 'Давай не будем отвлекаться. Просто нажимай кнопку "Умная мысль", и получай эти мысли бесплатно.';
    }

    // Шлём скриншоты, с кнопкой перехода на заданный URL:
    if (isPhoto) {
        msg = {
            'method': 'sendPhoto',
            'photo': photoUrl,
            'chat_id': body.message.chat.id,
            'reply_markup': JSON.stringify({
                inline_keyboard: [
                    [{ text: inlineKeyText, url: redirectUrl }]
                ]
            })
        };
    } else {
        // Шлём текстовое сообщение:
        msg = {
            'method': 'sendMessage',
            'parse_mode': 'HTML',
            'chat_id': body.message.chat.id,
            'text': botMsg,
            // Устанавливаем кнопки для быстрого ввода:
            'reply_markup': JSON.stringify({
                keyboard: [
                    [{ text: 'Умная мысль' }],
                    [{ text: 'Навык Алисы' }],
                    [{ text: 'Кинуть монетку' }]
                ]
            })
        };
    }

    // Возвращаем результат в Telegram:
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json; charset=utf-8'
        },
        'body': JSON.stringify(msg),
        'isBase64Encoded': false
    };
};