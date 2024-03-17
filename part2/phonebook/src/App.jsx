import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const handleSearchChange = e => {
    setNewSearch(e.target.value)
  }

  const handlePhoneChange = e => {
    setNewPhone(e.target.value)
  }

  const handleChange = e => {
    // console.log(e.target.value);
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
      setPersons(persons.concat({name: newName, phone: newPhone}))
    }

    setNewName("")
    setNewPhone("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with <input value={newSearch} onChange={handleSearchChange} /></p>
      <h2>Add a new</h2>
      <form onSubmit={addNewName}>
        <div>
          <div>name: <input value={newName} onChange={handleChange} /></div>
          <div>number: <input value={newPhone} onChange={handlePhoneChange} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          persons
            .filter(p => p.name.toLowerCase().startsWith(newSearch.toLowerCase()))
            .map(p => <li key={p.name}>{p.name} {p.number}</li>)
        }
      </ul>
    </div>
  )
}

export default App