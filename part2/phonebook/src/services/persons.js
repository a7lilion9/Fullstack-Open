import axios from "axios";

const url = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(url).then(res => res.data)
}

const create = (person) => {
  return axios.post(url, person).then(person => person.data)
}

const remove = (id, person) => {
  console.log('id', person.id)
  return axios.delete(`${url}/${id}`)
}

const edit = (person) => {
  console.log('id', person.id)
  remove(person.id, person)
  return create(person)
}

export default {getAll, create, remove, edit}