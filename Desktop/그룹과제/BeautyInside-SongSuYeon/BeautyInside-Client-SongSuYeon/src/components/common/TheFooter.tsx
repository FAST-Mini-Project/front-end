import companyLogo from '../../../public/assets/logo.png'
import GlobalStyle from '../../styles/GlobalStyles'
import styled from 'styled-components'

const Footer = () => {

  const Footer = styled.footer`
    margin-top: 180px;
    border-top: 1px solid #f3f3f3;
  `
  
  const Inner = styled.div`
    width: calc(100% - 600px);
    height: 354px;
    padding: 64px 0;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    > div:first-child {
      width: 132px;
      height: 43px;
    }
  `

  const Img = styled.img`
    display: block;
    width: 100%;
  `

  const Link = styled.ul`
    margin-bottom: 52px;
    display: flex;
    > li {
      font-family: 'Noto Sans KR';
      font-size: 14px;
      font-weight: 400;
      color: #191919;
      margin-right: 50px;
      &:last-child {
        margin-right: 0px;
      }
    }
  `

  const Infolist = styled.div`
    color: #8e8e8e;
    font-family: 'Noto Sans KR';
    font-weight: 400;
    letter-spacing: -.05em;
    margin-bottom: 28px;
    > div {
      margin-bottom: 4px;
      > span {
        position: relative;
        margin: 0 10px;
        &:first-child {
          margin-left: 0px;
        }
        &:last-child {
          margin-right: 0px;
        }
      }
    }
  `

  const En = styled.span`
    font-family: 'Spoqa Han Sans Neo';
    letter-spacing: 0;
  `

  const CopyRight = styled.div`
    color: #8E8E8E;
  `

  const Client = styled.div`
    color: #8e8e8e;
    font-size: 14px;
    letter-spacing: -.05em;
    > h2 {
      font-size: 24px;
      letter-spacing: 0;
      margin-top: 8px;
      margin-bottom: 24px;
      font-weight: 700;
    }
    > a {
      color: #8e8e8e;
      padding: 10px 26px;
      border: 1px solid #8e8e8e;
      border-radius: 6px;
    }
  `

  return (
    <>
      <GlobalStyle />
      <Footer>
        <Inner>
          <div>
            <Img src={companyLogo} />
          </div>
          <div>
            <Link>
              <li><a href='javascript:void(0)'>소개</a></li>
              <li><a href='javascript:void(0)'>이용약관</a></li>
              <li><a href='javascript:void(0)'>개인정보처리방침</a></li>
              <li><a href='javascript:void(0)'>이용안내</a></li>
            </Link>
            <Infolist>
              <div>
                <span>법인명 : 뷰티인사이드</span>
                <span>사업자등록번호 : <En>123-45-1234</En></span>
              </div>
              <div>
                <span>주소 : 서울특별시 강남구 테헤란로 <En>231, 11</En>층</span>
                <span>개인정보보호책임자 : <En>4</En>조 그룹원들</span>
              </div>
              <div>
                <span>대표이사 : <En>4</En>조 그룹원들</span>
                <span><En>FAX : 02-1234-1234</En></span>
                <span>이메일주소 : <En>beautyinside@beautyinside.com</En></span>
              </div>
            </Infolist>
            <CopyRight>
              <En>Copyright © 2023 beautyinside. All Rights Reserved.</En>
            </CopyRight>
          </div>
          <Client>
            <h4>고객 서비스 센터 이용안내</h4>
            <h2>080-123-1234</h2>
            <a href='javascript:void(0)'><En>1</En> : <En>1</En> 문의</a>
          </Client>
        </Inner>
      </Footer>
    </>
  )
}


export default Footer