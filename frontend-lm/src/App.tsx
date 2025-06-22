import { useState, useEffect } from 'react'

const App = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch('/api/')
        const data = await response.json()
        setMessage(data.message)
      } catch (error) {
        setMessage('Error al conectar con la API')
      }
    }

    fetchMessage()
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Leads Manager</h1>
      <p>{message}</p>
    </div>
  )
}

export default App