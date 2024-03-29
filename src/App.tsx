import { BrowserRouter } from "react-router-dom";
import { GlobalStyle, Theme } from "./style";
import { ThemeProvider } from "styled-components";
import { UIProvider } from "ui";
import "./index.css";
import "./App.css";
import { MainLayout } from "layouts";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import backend from "backend";

function App() {
  const { startApp } = backend.app();

  if (startApp)
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
