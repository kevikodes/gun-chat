import './App.css'
import { useEffect, useState, useReducer } from 'react'
import Gun from 'gun'

const gun = Gun({
  peers: ['http://localhost:3030/gun'],
})

const initialState = {
  messages: [],
}

function reducer(state, message) {
  return {
    messages: [message, ...state.messages],
  }
}

function App() {
  const [formState, setForm] = useState({
    name: '',
    message: '',
  })
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const messages = gun.get('messages')
    messages.map().on((m) => {
      dispatch({
        name: m.name,
        message: m.message,
        createdAt: m.createdAt,
      })
    })
  }, [])

  function onChange(e) {
    setForm({ ...formState, [e.target.name]: e.target.value })
  }

  function saveMessage() {
    const messages = gun.get('messages')
    messages.set({
      name: formState.name,
      message: formState.message,
      createdAt: Date.now(),
    })
    setForm({
      name: '',
      message: '',
    })
  }

  return <div className="App"></div>
}

export default App
