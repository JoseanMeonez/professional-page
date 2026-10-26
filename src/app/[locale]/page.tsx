import Contact from './components/sections/Contact'
import Experience from './components/sections/Experience'
import Hero from './components/sections/Hero'
import Marquee from './components/sections/Marquee'
import Projects from './components/sections/Projects'
import Services from './components/sections/Services'
import TechStack from './components/sections/TechStack'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <TechStack />
      <Experience />
      <Projects />
      <Contact />
    </>
  )
}
