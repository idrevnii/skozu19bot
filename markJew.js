
const marked = new Map();

function addMarked(user) {
    return marked.set(user.id, user);
}

function removeMarked(user) {
    return marked.delete(user.id);
}

function isMarked(user) {
    return marked.has(user.id);
}

module.exports = {
    addMarked,
    removeMarked,
    isMarked,
}