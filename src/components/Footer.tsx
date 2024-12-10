
import insta from "../assets/product/insta.svg";
import linked from "../assets/product/linked.svg";
import git from "../assets/product/git.svg";
import logo from '../assets/home/logo.svg'

const Footer = () => {
  return (
    <div>
      <img src={logo} alt="" />
      <div className='flex items-center justify-between my-[2rem]'>
        <aside className='flex gap-4'>
          <img src={insta} alt="" />
          <img src={git} alt="" />
          <img src={linked} alt="" />
        </aside>
        <aside>© 2024 Qubic NG, All rights reserved</aside>
      </div>
    </div>
  )
}

export default Footer
