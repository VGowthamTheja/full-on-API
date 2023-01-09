import axios from "axios";


// Base url for making the backend requests.
const instance = axios.create({
    baseURL: "http://localhost:3000"
});

export default instance;