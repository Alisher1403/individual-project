import { BrowserRouter } from "react-router-dom";
import { GlobalStyle, Theme } from "./style";
import { ThemeProvider } from "styled-components";
import { UIProvider } from "ui";
import "./index.css";
import "./App.css";
import { MainLayout } from "layouts";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={Theme}>
        <UIProvider>
          <GlobalStyle />
          <MainLayout />
        </UIProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
