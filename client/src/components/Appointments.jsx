import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { Appointment } from '../components'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: '#328853',
    marginRight: theme.spacing(2),
    transition: '0.3s ease-in-out all',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#328853',
      boxShadow: ' 0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
  },
}))

function Appointments() {
  const initialState = {
    terminVereinbaren: {
      date: new Date(),
      time: new Date().getTime(),
    },
  }

  const classes = useStyles()
  const [values, setValues] = useState(initialState)

  //   useEffect(() => {
  //     getAppointment()
  //     if (alertText === 'Neuer Termin geschaffen!') {
  //       clearValues()
  //     }
  //     // eslint-disable-next-line
  //   }, [alertText])

  const handleNext = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/v1/home/create-appointment',
        values
      )
      const data = response.data
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event, category, field) => {
    if (field === 'date') {
      setValues((prevValues) => ({
        ...prevValues,
        [category]: {
          ...prevValues[category],
          [field]: event,
        },
      }))
    } else {
      const newValue = event.target.value
      setValues((prevValues) => ({
        ...prevValues,
        [category]: {
          ...prevValues[category],
          [field]: newValue,
        },
      }))
    }
  }

  return (
    <div>
      <div className="form container page">
        <div className="pt-3">
          <div>
            <form onSubmit={handleNext}>
              <Appointment
                values={values.terminVereinbaren}
                setValues={setValues}
                onFormDataChange={handleChange}
              />
              <div className="stepper-btn-container">
                <Button
                  variant="contained"
                  onClick={handleNext}
                  type="submit"
                  className={classes.button}
                >
                  Weiter
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointments
