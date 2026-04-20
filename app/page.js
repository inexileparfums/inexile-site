import IntroSection from '../components/IntroSection'
import ManifestoSection from '../components/ManifestoSection'
import SignupSection from '../components/SignupSection'
import AboutSection from '../components/AboutSection'
import ScrollControls from '../components/ScrollControls'
import DitherBackground from '../components/DitherBackground'

export default function Home() {
  return (
    <>
      <DitherBackground />
      <main className="relative z-10">
        <IntroSection />
        <ManifestoSection />
        <SignupSection />
        <AboutSection />
      </main>
      <ScrollControls />
    </>
  )
}
