export const Month = {
    0: "января",
    1: "февраля",
    2: "марта",
    3: "апреля",
    4: "мая",
    5: "июня",
    6: "июля",
    7: "августа",
    8: "сентября",
    9: "октября",
    10: "ноября",
    11: "декабря",
};

export function formatDateString(date) {
    return `${date.getDate()} ${Month[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatDateStringWithTodayYesterday(date) {
    const now = new Date();
    if (
        now.getFullYear() !== date.getFullYear() ||
        now.getMonth() !== date.getMonth()
    ) {
        return formatDateString(date);
    }

    switch (now.getDate() - date.getDate()) {
        case 1:
            return "Вчера";
        case 0:
            return "Сегодня";
        default:
            return formatDateString(date);
    }
}

export const getTimeFromDate = (date) => {
    const mins = date.getMinutes();
    const hours = date.getHours();

    return `${hours >= 10 ? hours : "0" + hours}:${
        mins >= 10 ? mins : "0" + mins
    }`;
};

export const timeout = (time) => new Promise((res) => setTimeout(res, time));
