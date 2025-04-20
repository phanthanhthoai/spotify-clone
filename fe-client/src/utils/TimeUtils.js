export function convertSecondToTimeString(second = 0) {
    const hour = Math.floor(second / 3600);
    const minute = Math.floor((second % 3600) / 60);
    second = second % 60;

    return `${hour > 0 ? hour + ":" : ''}${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
}