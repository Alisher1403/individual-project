import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
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
`;

export const Theme = {
  linkColor: "black",
  activeLinkColor: "red",
  fontSize: "18px",
};
