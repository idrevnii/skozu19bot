function getShabbatDay() {
    const currDay = new Date().getDay();
    if (currDay === 6) {
        return `Шаббат шалом!`;
    } else if (currDay === 5) {
        return `Завтра шаббат!`;
    } else if (currDay >= 0 && currDay < 5) {
        return `До шаббата ${5 - currDay} дня!`;
    } else {
        return `Что-то случилось с шаббатом!`;
    }
}

module.exports = {
    getShabbatDay,
}