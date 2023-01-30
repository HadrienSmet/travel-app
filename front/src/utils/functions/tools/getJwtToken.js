// This function get the element called jwtToken in the localStorage
// Then it turns it into a JS object before retunring it to us
export const getJwtToken = () => {
    let jwtToken = localStorage.getItem("jwtToken");

    return JSON.parse(jwtToken);
};
