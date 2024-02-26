import { HeroSection, Cards } from '../components'
export const Home = ({ setShowDate, showDate, isLoggedIn }) => {
  return (
    <div>
      <HeroSection
        setShowDate={setShowDate}
        showDate={showDate}
        isLoggedIn={isLoggedIn}
      />
      <Cards />
    </div>
  )
}
