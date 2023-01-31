//This function manipulates a timeStamp to return it with the proper shape
export const dateParser = (num) => {
    let options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "short",
        year: "2-digit",
        month: "short",
        day: "numeric",
    };
    let date = new Date(num).toLocaleDateString("fr-BE", options);
    return date.toString();
};
