import Appointments from './Appointments'
import { useNavigate } from 'react-router-dom'

const Hero = ({ setShowDate, showDate, isLoggedIn }) => {
  const navigate = useNavigate()

  const makeAppointment = () => {
    if (isLoggedIn) {
      setShowDate(true)
    } else {
      navigate('/login')
    }
  }

  return (
    <div >
     
      <button onClick={() => makeAppointment()}>Termin Vereinbaren </button>
     
      {showDate && <Appointments />}
    </div>
  )
}

export default Hero
