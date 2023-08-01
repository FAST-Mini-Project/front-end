import GlobalStyle from '../../styles/GlobalStyles'
import styled from 'styled-components'

const PersonalStart = () => {

  const Title = styled.h1`
    font-family: 'InkLipquid';
    text-align: center;
    margin-top: 100px;
  `;
 
  return (
    <div>
      <GlobalStyle />
      <Title>퍼스널 컬러 진단</Title>
    </div>
  );
};

export default PersonalStart
