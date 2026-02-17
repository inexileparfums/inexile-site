import IntroSection from '../components/IntroSection'
import ManifestoSection from '../components/ManifestoSection'
import SignupSection from '../components/SignupSection'
import AboutSection from '../components/AboutSection'
import ScrollControls from '../components/ScrollControls'
import ParallaxTexture from '../components/ParallaxTexture'

export default function Home() {
  return (
    <>
      <ParallaxTexture />
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
