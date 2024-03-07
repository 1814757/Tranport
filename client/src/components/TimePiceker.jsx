import React from 'react'
import { TimePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import TextField from '@mui/material/TextField'
import { FormControl } from '@material-ui/core'

export default function DatePicker(props) {
  const {
    name,
    labelText,
    handleChange,
    maxTime,
    minTime,
    value,
    error,
    className,
  } = props
  const handleDateTimeRangePickerChange = (_value) => {
    console.log('handle change',value)
    handleChange({ target: { name, value: _value, maxTime, minTime } })
  }
  function disableWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6
  }

  return (
    <FormControl variant="outlined" className={className}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          value={value}
          onChange={handleDateTimeRangePickerChange}
          type="timepicker"
          renderInput={(params) => (
            <TextField
              {...params}
              error={error}
              helperText={
                minTime
                  ? `Select between ${minTime} and ${maxTime}`
                  : 'Wähle eine Zeit'
              }
              required
            />
          )}
          label={labelText}
          name={name}
          autoOk={true}
          timeFormat="HH:MM"
          ampm={false}
          minutesStep={30}
          maxTime={new Date(0, 0, 0, 21, 0)}
          shouldDisableDate={disableWeekends}
          shouldDisableTime={(timeValue, clockType) => {
            return clockType === 'hours' && timeValue <= 7
          }}
        />
      </LocalizationProvider>
    </FormControl>
  )
}
