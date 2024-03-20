import { useEffect, useState } from 'react'
import personServices from './services/persons'

const Filter = ({value, handleFunction}) => {
  return (
    <p>filter shown with <input value={value} onChange={handleFunction} /></p>
  )
}

const PersonForm = ({handleSubmit, nameValue, phoneValue, handleName, handlePhone}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>name: <input value={nameValue} onChange={handleName} /></div>
        <div>number: <input value={phoneValue} onChange={handlePhone} /></div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons, newSearch}) => {
  return (
    <ul>
      {
        persons
          .filter(p => p.name.toLowerCase().startsWith(newSearch.toLowerCase()))
          .map(p => <li key={p.name}>{p.name} {p.number}</li>)
      }
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personServices.getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const handleSearchChange = e => {
    setNewSearch(e.target.value)
  }

  const handlePhoneChange = e => {
    setNewPhone(e.target.value)
  }

  const handleChange = e => {
    setNewName(e.target.value)
  }

  const addNewName = e => {
    e.preventDefault()

    const isDuplicate = persons.reduce((dup, person) => 
      dup || person.name === newName 
      , false)
    
    if (isDuplicate) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newPhone,
      }
      
      personServices.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }

    setNewName("")
    setNewPhone("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} handleFunction={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm 
        handleSubmit={addNewName}
        nameValue={newName}
        phoneValue={newPhone}
        handleName={handleChange}
        handlePhone={handlePhoneChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} newSearch={newSearch} />
    </div>
  )
}

export default App