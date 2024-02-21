import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
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
