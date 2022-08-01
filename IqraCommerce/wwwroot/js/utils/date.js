const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const fullDate = (date) => {
    date = new Date(date);
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`; 
}