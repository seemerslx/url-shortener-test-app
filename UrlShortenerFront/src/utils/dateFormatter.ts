export function formatDateToString(date: Date) {
    let start = new Date(date);
    const year = start.getUTCFullYear();
    const month = ('0' + (start.getMonth() + 1)).slice(-2);
    const day = ('0' + start.getDate()).slice(-2);
    const hours = ('0' + start.getHours()).slice(-2);
    const minutes = ('0' + start.getMinutes()).slice(-2);
    const seconds = ('0' + start.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}