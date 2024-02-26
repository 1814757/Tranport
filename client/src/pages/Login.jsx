import { useDispatch } from 'react-redux'
import { ActionType } from '../state/action-types'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Login = ({ setIsLoggenIn, isLoggedIn }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home')
    }
    // eslint-disable-next-line
  }, [isLoggedIn])

  const addUserToLocalStorage = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }
  const loginUser = async () => {
    setIsLoading(true)
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
      setIsLoggenIn(user)
      addUserToLocalStorage(user, token)
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
    } catch (error) {
      setIsLoading(false)
      setAlert({ type: 'danger', text: error.response.data.msg })
    }
  }

  return (
    <>
      {alert && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.text}
        </div>
      )}

      <Container>
        <Row className="mt-5 pt-5 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">
                    Transport-Deutschland
                  </h2>
                  <p className=" mb-5">
                    Bitte geben Sie Ihr Login und Passwort ein!
                  </p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="E-Mail eingeben"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Passwort</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Passwort"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Passwort vergessen?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button
                          variant="primary"
                          type="submit"
                          onClick={loginUser}
                          disabled={isLoading}
                        >
                          {isLoading ? 'login läuft...' : 'login'}
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0 text-center">
                        Sie haben noch kein Konto?{' '}
                        <a href="register" className="text-primary fw-bold">
                          Registrieren
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login
