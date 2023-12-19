import axios from "axios";

var config = {
    // baseURL: 'https://localhost:8443/',
    baseURL: "https://nutrimateapp-4ad28e15dbfd.herokuapp.com/",
};

const Authenticate = axios.create(config);

export default Authenticate;
