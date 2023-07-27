import style from './MainFooter.module.scss'
import { AiFillGithub } from 'react-icons/ai'
const MainFooter = () => {
  return (
    <div className={style.container}>
      <div className={style.des}>Fast Campus MiniProject TEAM2</div>
      <a className={style.link} href="https://github.com/FAST-Mini-Project" target="_blank">
        GitHub <AiFillGithub size="24" />
      </a>
    </div>
  )
}

export default MainFooter
