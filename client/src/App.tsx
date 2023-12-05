import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, Register, Home} from './pages'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavHeader } from './components';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <NavHeader/>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
