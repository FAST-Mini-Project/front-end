import GlobalStyle from '../../styles/GlobalStyles'
import styled from 'styled-components'

const PersonalColor = () => {
  //섹션-퍼스널컬러
  const Section = styled.div`
    margin-top: 100px;
    box-sizing: border-box;
    > div {
      text-align: center;
      width: 990px;
      margin: 0 auto;
      > p {
        font-family: 'InkLipquid';
        font-size: 42px;
        letter-spacing: -.05em;
        > span {
          color: #ffa9be;
        }
      }
    }
  `
  //이미지
  const Contents = styled.div`
    width: 100%;
    margin-top: 44px;
    > img {
      width: 100%;
      object-fit: cover;
    }
  `

  //진단하기 버튼
  const Button = styled.button`
    font-family: 'Noto Sans KR';
    font-size: 26px;
    color: #fff;
    background-color: #dedede;
    margin-top: 50px;
    padding: 12px 60px;
    border-radius: 30px;
    transition: .3s;
    cursor: pointer;
    &:hover {
      background-color: #ffa9be;
    }
  `

 
  return (
    <div>
      <GlobalStyle />
      <Section>
        <div>
          <p>나에게 가장 잘 어울리는 <br /><span>퍼스널 컬러</span> 찾기</p>
          <Contents>
            <img src='assets/personallogo.png' alt="퍼스널 진단" />
          </Contents>
          <Button>진단하기</Button>
        </div>
      </Section>
    </div>
  )
}

export default PersonalColor
