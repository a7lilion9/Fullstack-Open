import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '1234567890' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

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
        {persons.map(p => <li key={p.name}>{p.name} {p.phone}</li>)}
      </ul>
    </div>
  )
}

export default App