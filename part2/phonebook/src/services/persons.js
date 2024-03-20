import axios from "axios";

const url = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(url).then(res => res.data)
}

const create = (person) => {
  return axios.post(url, person).then(person => person.data)
}

export default {getAll, create}