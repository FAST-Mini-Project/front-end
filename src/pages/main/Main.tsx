import style from './Main.module.scss'

const Main = () => {
  return (
    <>
      <div className={style.main}>굵은 글씨입니다.</div>
      <div className={style.sub}>얇은 글씨 입니다.</div>
    </>
  )
}

export default Main
