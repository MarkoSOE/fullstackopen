import axios from "axios";

const baseURL = 'http://localhost:3001/persons'

const create = newObject => {
    return axios.post(baseURL, newObject)
}

const getAll = () => {
    return axios.get(baseURL)
}

//have to export this as an object for it to be used in another js file
export default {create , getAll}