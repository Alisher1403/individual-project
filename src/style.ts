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
        background: linear-gradient(to bottom, #f8f8f8, #e0e0e0);
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
        --border-radius: 0px;
        --border-focus-bg: #87a3a3;

        // background
        --card-hover-bg: #c5c5c545;
    }
`;

export const Theme = {
  linkColor: "black",
  activeLinkColor: "red",
  fontSize: "18px",
};
