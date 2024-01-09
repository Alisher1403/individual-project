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
        max-width: 1040px;
        width: 100%;
        margin: 0 auto;
        padding: 0 15px;
    }

    .inline{
        display: flex;
        align-items: center;
    }

    :root{
        // fonts
        --font-light: 'Nunito-Light';
        --font-regular: 'Nunito-Regular';
        --font-medium: 'Nunito-Medium';
        --font-semiBold: 'Nunito-SemiBold';
        
        // title
        --h3-size: 23px;
        --title-color: #2e2e2e;
        --title-color-dark: #262626;
        --title-font: 'Nunito-Medium';

        // link
        --link-color: red;

        // text
        --text-size: 16px;
        --text-color: #43464b;
        --text-color-light: #4c5762;
        --text-font: 'Nunito-Regular';

        // span
        --span-font: 'Nunito-Light';

        // icon
        --icon-bg: #717a7a;

        // border
        --border-style: 1px solid #717a7a;
        --border-color: #717a7a;
        --border-width: 1px;
        --border-radius: 0px;

        // background
        --card-hover-bg: #c5c5c545;
    }
`;

export const Theme = {
  linkColor: "black",
  activeLinkColor: "red",
  fontSize: "18px",
};
