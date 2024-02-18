import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  const initialState = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    type: 'privatkunde',
  }
  const [values, setValues] = useState(initialState)

  const handleChange = (e) => {
    console.log(e.target.value)
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch()

  const handleRegister = async () => {
    setIsLoading(true)

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/v1/auth/register',
        values
      )
      const data = response.data
      console.log(data)
      if (response.status === 201) {
        setIsLoading(false)
        setAlert({ type: 'success', text: 'Registrierung erfolgreich' })

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
    } catch (error) {
      setIsLoading(false)
      setAlert({ type: 'danger', text: error.response.data.msg })
    }
  }

  return (
    <div>
      {alert && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.text}
        </div>
      )}

      <Container>
        <Row className=" mt-5 pt-5 d-flex justify-content-center align-items-center">
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
                        <Form.Label className="text-center">Name</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Name"
                          value={values.firstname}
                          onChange={handleChange}
                          name="firstname"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Nachname
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Nachname"
                          value={values.lastname}
                          onChange={handleChange}
                          name="lastname"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="E-Mail eingeben"
                          value={values.email}
                          onChange={handleChange}
                          name="email"
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
                          value={values.password}
                          name="password"
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Select
                        aria-label="Default select example"
                        id="cars"
                        onChange={handleChange}
                        className="mb-3"
                      >
                        <option>Öffnen Sie dieses Auswahlmenü</option>
                        <option value="privatkunde">privatkunde</option>
                        <option value="geschäftskunde">geschäftskunde</option>
                      </Form.Select>

                      <div className="d-grid">
                        <Button
                          variant="primary"
                          type="submit"
                          onClick={handleRegister}
                          disabled={isLoading}
                        >
                          {isLoading
                            ? 'Registrierung läuft...'
                            : 'Registrieren'}
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Sie haben bereits ein Konto?
                        <a href="login" className="text-primary fw-bold">
                          Anmelden
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
    </div>
  )
}

export default Register
