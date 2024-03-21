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

const Persons = ({persons, newSearch, handleDeletion}) => {
  return (
    <ul>
      {
        persons
          .filter(p => p.name.toLowerCase().startsWith(newSearch.toLowerCase()))
          .map(p => <li key={p.name}>
            {p.name} {p.number} <button onClick={() => handleDeletion(p.id)}>delete</button>
          </li>)
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

    let personId = null
    const isDuplicate = persons.reduce((dup, person) => {
      const result = dup || person.name === newName

      if (result) {
        personId = person.id
      }
      return result
    }, false)
    
    if (isDuplicate) {
      const editPersonConfirmation = window
        .confirm(`${newName} is already added to phonebook do you want to edit it?`)
      
        if (editPersonConfirmation) {
          const newPerson = {...persons.find(p => p.name === newName), number: newPhone}
          console.log(newPerson);
          personServices.edit(newPerson)

          setPersons(persons.filter(p => p.name !== newPerson.name).concat(newPerson))
        }
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

  const deletePerson = id => {
    const currentPersonName = persons.find(p => p.id === id).name
    const confirm = window.confirm(`Delete ${currentPersonName}?`)

    if (confirm) {
      personServices.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
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
      <Persons
        handleDeletion={deletePerson}
        persons={persons}
        newSearch={newSearch}
      />
    </div>
  )
}

export default App