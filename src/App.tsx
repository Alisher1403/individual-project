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
