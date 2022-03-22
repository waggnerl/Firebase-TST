import './App.css'
import { useState, useEffect } from 'react'
import { db } from './firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore'
function App() {
  const [newName, setNewName] = useState('')
  const [newAge, setNewAge] = useState(0)

  const [users, setUsers] = useState([])
  const usersCollectionReference = collection(db, 'users')

  const createUser = async () => {
    await addDoc(usersCollectionReference, {
      names: newName,
      age: Number(newAge)
    })
  }
  const updateUser = async (id, age, parameter) => {
    const userDoc = doc(db, 'users', id)
    let newFields = {}
    if (parameter === 'increase') {
      newFields = { age: age + 1 }
    } else {
      newFields = { age: age - 1 }
    }
    await updateDoc(userDoc, newFields)
    window.location.reload(true)
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionReference)

      setUsers(
        data.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      )
    }
    getUsers()
  }, [])

  return (
    <div className="App">
      <input
        placeholder="...Name"
        onChange={e => {
          setNewName(e.target.value)
        }}
      />
      <input
        placeholder="...Age"
        type="number"
        onChange={e => setNewAge(e.target.value)}
      />
      <button onClick={createUser}>Create User</button>
      {users.map(user => {
        return (
          <div>
            <h1>Name: {user.name}</h1>
            <h1> Age: {user.age}</h1>
            <button onClick={() => updateUser(user.id, user.age, 'increase')}>
              Increase Age
            </button>
            <button onClick={() => updateUser(user.id, user.age, 'reduce')}>
              Reduce Age
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default App
