import GlobalStyle from '../../styles/GlobalStyles'
import styled from 'styled-components'

const Cart = () => {

  // Title 부분은 테스트용입니다. const Title 부분과 <Title> 줄을 지우고 내용을 넣으시면 됩니다.
  const Title = styled.h1`
    font-family: 'Noto Sans KR';
    text-align: center;
    margin-top: 100px;
  `

  return (
    <div>
      <GlobalStyle />
      <Title>장바구니</Title>
    </div>
  )
}

export default Cart
