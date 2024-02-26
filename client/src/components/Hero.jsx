import Appointments from './Appointments'
import { useNavigate } from 'react-router-dom'

const Hero = ({ setShowDate, showDate, isLoggedIn }) => {
  const navigate = useNavigate()

  const makeAppointment = () => {
    console.log(isLoggedIn)
    if (isLoggedIn) {
      setShowDate(true)
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="hero">
      <div className="textHeroDiv">
        <p className="hero_par1"></p>
        <p className="hero_par3">
          <h2>
            Versenden Sie all Ihre Paletten, Pakete und Sperrgut günstiger und
            schneller! <br />
            Bei uns können Sie online die Transportkosten Ihrer Fracht berechnen
            und Angebote von verschiedenen
            <br />
            Versandunternehmen und versand private Personen. Innerhalb
            Deutschlands können Sie mit uns nicht nur Preise für Pakete und
            Stückgut-Transporte, <br />
            sondern auch Preise für Teil- und Komplettladungen sofort einsehen.
            In wenigen Schritten können Sie so Ihren Transport beauftragen:{' '}
            <br />
          </h2>
        </p>
        <button onClick={() => makeAppointment()}>Termin Vereinbaren </button>
      </div>

      <div className="imgHeroDiv"></div>
      {showDate && <Appointments />}
    </div>
  )
}

export default Hero
