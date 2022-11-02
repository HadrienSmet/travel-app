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