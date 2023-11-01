import { useDispatch } from 'react-redux'
import { ActionType } from '../state/action-types'
import { useState } from 'react'
import axios from 'axios'

type Props = {}

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState<{ type: string; text: string } | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const loginUser = async () => {
    dispatch({ type: ActionType.LOGIN_USER_BEGIN })

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/v1/auth/login',
        {
          email,
          password,
        }
      )
      const { user, token } = response.data
      console.log(response.data)

      if (response.status === 200) {
        setIsLoading(false)
        setAlert({ type: 'success', text: 'Login erfolgreich' })
        dispatch({
          type: ActionType.LOGIN_USER_SUCCESS,
          payload: {
            user,
            token,
            msg: 'Login erfolgreich',
          },
        })
      } else {
        setIsLoading(false)
        setAlert({ type: 'danger', text: 'Login fehlgeschlagen' })
      }
    } catch (error: any) {
      setIsLoading(false)
      setAlert({ type: 'danger', text: error.response.data.msg })
      dispatch({
        type: ActionType.LOGIN_USER_ERROR,
      })
    }
  }

  return (
    <div style={{ marginTop: '200px' }}>
      <div>
        <h2>Login</h2>
        {alert && (
          <div className={`alert alert-${alert.type}`} role='alert'>
            {alert.text}
          </div>
        )}
      </div>

      <input
        type='text'
        placeholder='Benutzername'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Passwort'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginUser} disabled={isLoading}>
        {isLoading ? 'login läuft...' : 'login'}
      </button>
    </div>
  )
}

export default Login
