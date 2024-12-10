import Hero from "../components/AboutHero"
import FAQAccordion from "../components/FAQAccordion"
import Goals from "../components/Goals"
import HexagonSection from "../components/HexagonSection"
import Team from "../components/Team"


const About = () => {
  return (
    <div>
      <Hero />
      <Goals />
      <HexagonSection />
      <Team />
      <FAQAccordion />
    </div>
  )
}

export default About
