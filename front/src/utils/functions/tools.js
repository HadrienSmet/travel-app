// This function get the element called jwtToken in the localStorage
// Then it turns it into a JS object before retunring it to us
export const getJwtToken = () => {
    let jwtToken = localStorage.getItem("jwtToken");
        
    return JSON.parse(jwtToken);
}

// This function put a new object called jwtToken in the localStorage it turns into a JSON format
// @params {type: Object} --> represents the userId and his token got from json-web-token
export const setJwtToken = (data) => {
    localStorage.setItem("jwtToken", JSON.stringify(data));
}

//This function manipulates a timeStamp to return it with the proper shape
export const dateParser = (num) => {
    let options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "short",
        year: "2-digit",
        month: "short",
        day: "numeric"
    };
    let date = new Date(num).toLocaleDateString('fr-BE', options);
    return date.toString();
}

export const mobileDateParser = (num) => {
    let options = {
        year: "2-digit",
        month: "short",
        day: "numeric"
    };
    let date = new Date(num).toLocaleDateString('fr-BE', options);
    return date.toString();
}