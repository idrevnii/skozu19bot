const random = require('random');

function getRandomNumber(min, max) {
    return random.int(min, max);
}

function getArgument(message) {
    return message.slice(message.indexOf(' ') + 1);
}

async function isAdministrator(ctx, user) {
    return ctx.getChatAdministrators().then((administrators) => {
        return administrators.map((administrator) => {
            if (!(administrator.user.is_bot)
                && (administrator.status === 'administrator' || administrator.status === 'creator')
                && administrator.user.id === user.id) {
                return true;
            }
        }).filter(Boolean)[0];
    })
}

module.exports = {
    getArgument,
    getRandomNumber,
    isAdministrator
}