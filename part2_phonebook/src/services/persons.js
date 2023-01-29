import axios from 'axios'
const baseUrl = '/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = newItem => {
    return axios.post(baseUrl, newItem).then(response => response.data)
}

const deleteItem = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const change = (id, changedNumber) => {
    return axios.put(`${baseUrl}/${id}`, changedNumber).then(response => response.data)
}

export default {getAll, create, deleteItem, change}