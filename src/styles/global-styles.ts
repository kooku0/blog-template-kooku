import { css } from '@emotion/react';

/* prettier-ignore */
export const GlobalStyle = () => css`
  html, body {
    font-family: 'Spoqa Han Sans Neo', sans-serif !important;
    margin: 0;
    padding: 0;
    border: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: hidden;
  }

  #__next {
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }

  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }

  body {
    line-height: 1;
  }

  input {
    &::-ms-clear,
    &::-ms-reveal {display: none; width : 0; height: 0;}
    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration { display: none; }
  }

  *:active {
    -webkit-tap-highlight-color: transparent;
    outline: none;
  }

  *:focus {
    outline: 0;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
