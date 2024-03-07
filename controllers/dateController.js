import { StatusCodes } from 'http-status-codes'
import Moving from '../model/Date.js'
import { BadRequestError } from '../errors/index.js'

const createAppointments = async (req, res) => {
  const receivedTimeAsString = req.body.date;

  const currentTime = new Date(receivedTimeAsString);
  const existingMovingAppointment = await Moving.findOne({
    date: currentTime, // Verwenden Sie das genaue Datum und die genaue Uhrzeit für die Überprüfung
  });

  if (existingMovingAppointment) {
    throw new BadRequestError('Es wurde bereits ein Termin für das Datum existiert');
  }
  
  const movingData = await Moving.create({ date: currentTime });
  return res.status(StatusCodes.CREATED).json({ movingData });
}

const getAppointments = async (req, res) => {
  const appointments = await Moving.find().select('date').sort('-date')
  const totalAppointments = await Moving.countDocuments({})
  return res.status(StatusCodes.OK).json({ appointments, totalAppointments })
}
export { createAppointments, getAppointments }
