import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, Register, Home } from './pages'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavHeader } from './components'
import { useState } from 'react'
function App() {
  const [showDate, setShowDate] = useState(false)
  const user = localStorage.getItem('user')
  const [isLoggedIn, setIsLoggenIn] = useState(user ? user : '')

  return (
    <div className="App">
      <BrowserRouter>
        <NavHeader />
        <Routes>
          <Route
            path="/login"
            element={
              <Login isLoggedIn={isLoggedIn} setIsLoggenIn={setIsLoggenIn} />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <Home
                setShowDate={setShowDate}
                showDate={showDate}
                isLoggedIn={isLoggedIn}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
