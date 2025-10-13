const apikey = import.meta.env.VITE_GEO_DB_APIKEY; 
const baseURL = "https://api.countrystatecity.in/v1"
const getCountries = async() => {
    const response = await fetch(`${baseURL}/countries`, {
        headers: { 'X-CSCAPI-KEY': apikey }
    });
    const countries = await response.json();
    return countries;
}
const getStates = async(iso2)=>{
    const response = await fetch(`${baseURL}/countries/${iso2}/states`, {
        headers: { 'X-CSCAPI-KEY': apikey }
    });
    const states = await response.json();
    return states;
}
const getCities = async(countryIso2,stateIso2)=>{
    const response = await fetch(`${baseURL}/countries/${countryIso2}/states/${stateIso2}/cities`, {
        headers: { 'X-CSCAPI-KEY': apikey }
    });
    const cities = await response.json();
    console.log(cities);
    return cities;
}
export {getCountries,getStates,getCities};