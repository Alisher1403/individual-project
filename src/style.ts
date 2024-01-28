import { createGlobalStyle } from "styled-components";
import fonts from "./assets/fonts";

export const GlobalStyle = createGlobalStyle`
    ${fonts}

    *{
        list-style: none;
        text-decoration: none;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .container{
        max-width: 1340px;
        width: 100%;
        margin: 0 auto;
        padding: 0 15px;
    }

    body {
        background: var(--main-bg);
    }

    * {
        scrollbar-width: thin;
        scrollbar-color: #6b8e23 transparent;
        font-family: var(--font-regular);
    }

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #5e6e6b;
        border-radius: 8px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    .inline{
        display: flex;
        align-items: center;
    }

    .prevent-btn{
        background: none;
        border: none;
        cursor: pointer;
    }

    :root{
        // Main
        --main-bg: #f8f8f8;

        // fonts
        --font-light: 'Nunito-Light';
        --font-regular: 'Nunito-Regular';
        --font-medium: 'Nunito-Medium';
        --font-semiBold: 'Nunito-SemiBold';
        
        // title
        --h3-size: 23px;
        --title-color: #333333;
        --title-color-dark: #262626;
        --title-font: 'Nunito-Medium';

        // link
        --link-color: red;
        --link-hover-color: #d91e44;

        // text
        --text-size: 16px;
        --text-color: #333333;
        --text-color-light: #87a3a3;
        --text-font: 'Nunito-Regular';

        // span
        --span-font: 'Nunito-Light';

        // icon
        --icon-bg: #4f5959;
        --icon-hover-bg: white;

        // button
        --button-bg: #87a3a3;
        --button-hover-bg: #717a7a;

        // border
        --border-style: 1px solid #717a7a;
        --border-color: #717a7a;
        --border-width: 1px;
        --border-focus-bg: #87a3a3;

        // background
        --card-hover-bg: #c5c5c545;

        // UI Lib
        --ui-grid-gap: 5px;
        --input-border-radius: 10px;
        --input-border: 1px solid #717a7a;
        --input-margin: 5px 0;
        --input-padding: 7px 10px;
        --input-icon-color: var(--icon-bg);
        --input-radio-corner: 5px;
        --input-font-size: 15px;
        --input-bg: var(--main-bg);
        --input-indicator-color: #87a3a3;
        --input-bg-active: #87a3a3;
        --input-color: #333333;
        --input-icon-size: 20px;
        --input-transition: 0.2s;
        --option-wrapper-padding: 2px;
        --option-border-radius: calc(var(--input-border-radius) - 2px);
        --option-padding: 7px 10px;
        --option-selected-bg: #b8d9d3;
    }
`;

export const Theme = {
  linkColor: "black",
  activeLinkColor: "red",
  fontSize: "18px",
};
