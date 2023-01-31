export const mobileDateParser = (num) => {
    let options = {
        year: "2-digit",
        month: "short",
        day: "numeric",
    };
    let date = new Date(num).toLocaleDateString("fr-BE", options);
    return date.toString();
};
