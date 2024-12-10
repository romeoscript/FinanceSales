
import AnimatedCard from '../components/AnimatedCard'
import FAQAccordion from '../components/FAQAccordion'
import kwick from "../assets/product/kwick.svg";
import outat from "../assets/product/outat.svg";

const ProjectPage = () => {
  return (
    <div>
        <div className='grid grid-cols-2 gap-4 max-w-[1100px] my-[2rem] mx-auto'>
                <AnimatedCard
                    title="Outat TV"
                    subtitle="Online Streaming Platform"
                    image={outat}
                />
                <AnimatedCard
                    title="Outat TV"
                    subtitle="Online Streaming Platform"
                    image={kwick}
                />
                <AnimatedCard
                    title="Outat TV"
                    subtitle="Online Streaming Platform"
                    image={outat}
                />
                <AnimatedCard
                    title="Outat TV"
                    subtitle="Online Streaming Platform"
                    image={kwick}
                />
            </div>
      <FAQAccordion />
    </div>
  )
}

export default ProjectPage
