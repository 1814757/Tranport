import React, { useEffect } from 'react'
import { TimePicker } from './index'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import dayjs from 'dayjs'
import 'dayjs/locale/de' // Importiere das deutsche Locale
import { deDE } from '@mui/x-date-pickers/locales'
import axios from 'axios'

const Appointment = ({ values, onFormDataChange }) => {
  let dates = []

  useEffect(() => {
    getAppointment()

    // eslint-disable-next-line
  }, [])
  const getAppointment = () => {
    axios
      .get('http://127.0.0.1:5000/api/v1/home/appointments')
      .then((res) => {
        res.data.appointments.map((item) => {
          dates.push(item.date)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleChange = (e) => {
    console.log(e.target)
    onFormDataChange(e, 'terminVereinbaren', e.target.name)
  }
  const handleChangeDate = (newDate) => {
    // You can handle the date change here
    onFormDataChange(newDate.$d, 'terminVereinbaren', 'date')
  }

  dayjs.locale('de')

  const today = dayjs()

  const isDateInArray = (date) =>
    dates.some((d) => dayjs(d).isSame(date, 'day'))
  console.log(dates)
  return (
    <div className="project-form ">
      <h5 className="section-title">Termin Vereinbaren</h5>
      <div className="basic-informaion-form">
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={
            deDE.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <StaticDatePicker
            value={dayjs(values.date)} // Controlled by external state
            onChange={handleChangeDate}
            renderInput={(params) => <input {...params} />}
            orientation="landscape"
            name="date"
            shouldDisableDate={(date) =>
              date.isBefore(today, 'day') || isDateInArray(date)
            }
          />
        </LocalizationProvider>
        <TimePicker
          labelText="Uhr Zeit"
          name="time"
          value={values.time}
          handleChange={handleChange}
          className=" res-fullRow"
        />
      </div>
    </div>
  )
}

export default Appointment
