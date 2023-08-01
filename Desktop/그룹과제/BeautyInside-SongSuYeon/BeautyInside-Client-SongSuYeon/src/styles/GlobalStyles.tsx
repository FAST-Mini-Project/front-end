import { createGlobalStyle } from 'styled-components'
import InkLipquid from '../fonts/InkLipquid.woff'

const GlobalStyle = createGlobalStyle`

  // InkLipquid font 적용
  @font-face {
    font-family: 'InkLipquid';
    src: local('InkLipquid'), url(${InkLipquid}) format('woff');
    src: url(${InkLipquid}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  // 공통
  body {
    font-family: 'Noto Sans KR';
    font-size: 16px;
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    color: #191919;
    text-decoration: none;
  }

  button {
    border: 0;
    outline: 0;
    background: transparent;
    cursor: pointer;
  }
`

export default GlobalStyle