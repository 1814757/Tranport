import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState<{ type: string; text: string } | null>(
    null
  )

  interface data {
    email: string
    password: string
    firstname: string
    lastname: string
    type: string
  }
  interface ApiResponse {
    user: {
      email: string
      password: string
      firstname: string
      lastname: string
      type: string
    }
    token: string
    // Add more properties as per your API response structure
  }

  const initialState: data = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    type: 'privatkunde',
  }
  const [values, setValues] = useState(initialState)

  const handleChange = (e: any) => {
    console.log(e.target.value)
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const dispatch = useDispatch()

  const handleRegister = async () => {
    setIsLoading(true)

    try {
      const response = await axios.post<ApiResponse>(
        'http://127.0.0.1:5000/api/v1/auth/register',
        values
      )
      const data: ApiResponse = response.data
      console.log(data)
      if (response.status === 201) {
        setIsLoading(false)
        setAlert({ type: 'success', text: 'Registrierung erfolgreich' })

        // Hier kannst du den Erfolg an deinen Redux-Store weitergeben
        dispatch({
          type: 'REGISTER_USER_SUCCESS',
          payload: {
            username: data.user.firstname,
            token: data.token,
            msg: 'Registrierung erfolgreich',
          },
        })
      } else {
        setIsLoading(false)
        setAlert({ type: 'danger', text: 'Registrierung fehlgeschlagen' })
      }
    } catch (error: any) {
      setIsLoading(false)
      setAlert({ type: 'danger', text: error.response.data.msg })
    }
  }

  return (
    <div>
      <h2>Registrierung</h2>
      {alert && (
        <div className={`alert alert-${alert.type}`} role='alert'>
          {alert.text}
        </div>
      )}
      <input
        type='text'
        placeholder='lastname'
        value={values.lastname}
        onChange={handleChange}
        name='lastname'
      />
      <input
        type='text'
        placeholder='firstname'
        value={values.firstname}
        onChange={handleChange}
        name='firstname'
      />
      <input
        type='email'
        placeholder='email'
        value={values.email}
        onChange={handleChange}
        name='email'
      />
      <input
        type='password'
        placeholder='Passwort'
        value={values.password}
        name='password'
        onChange={handleChange}
      />
      <select name='type' id='cars' onChange={handleChange}>
        <option value='privatkunde'>privatkunde</option>
        <option value='geschäftskunde'>geschäftskunde</option>
      </select>
      <button onClick={handleRegister} disabled={isLoading}>
        {isLoading ? 'Registrierung läuft...' : 'Registrieren'}
      </button>
    </div>
  )
}

export default Register
