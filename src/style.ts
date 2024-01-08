import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        list-style: none;
    }

    :root{
        --link-color: red;
    }
`;

export const Theme = {
  linkColor: "black",
  activeLinkColor: "red",
  fontSize: "18px",
};
