
import axios from "axios";

var myHeaders = new Headers();
myHeaders.append("apikey", process.env.REACT_APP_API_KEY);
export var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const BASE_URL = 'https://api.apilayer.com/spoonacular';

const API = axios.create({ baseURL: BASE_URL });



export default API;