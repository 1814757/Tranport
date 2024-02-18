import { StatusCodes } from 'http-status-codes'
import Moving from '../model/Date.js'
import { BadRequestError } from '../errors/index.js'

const createAppointments = async (req, res) => {
  const movingData = {}

  const propertyMapping = {
    umzugVon: 'from',
    umzugNach: 'to',
    persoenlicheDaten: 'persoenliche',
    terminVereinbaren: 'termin',
  }

  const flattenObject = (obj, sectionKey = '') => {
    for (const key in obj) {
      var newKey = ''

      newKey =
        sectionKey === 'from' || sectionKey === 'to'
          ? `${sectionKey}_${key}`
          : key

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        flattenObject(obj[key], propertyMapping[key] || sectionKey)
      } else {
        movingData[newKey] = obj[key]
      }
    }
  }

  flattenObject(req.body)
  const receivedTimeAsString = movingData.date

  const currentTime = new Date(receivedTimeAsString)
  console.log(new Date(currentTime.getTime() + 24 * 60 * 60 * 1000))
  const existingMovingAppointment = await Moving.findOne({
    date: {
      $gte: currentTime,
      $lt: new Date(currentTime.getTime() + 24 * 60 * 60 * 1000),
    },
  })

  if (existingMovingAppointment) {
    throw new BadRequestError(
      'es wurde bereits ein Termin für das Datum existiert'
    )
  }
  console.log(movingData)
  await Moving.create(movingData)

  return res.status(StatusCodes.CREATED).json({ movingData })
}
const getAppointments = async (req, res) => {
  console.log('req.query')
  const appointments = await Moving.find().select('date').sort('-date')
  const totalAppointments = await Moving.countDocuments({})
  return res.status(StatusCodes.OK).json({ appointments, totalAppointments })
}
export { createAppointments, getAppointments }
