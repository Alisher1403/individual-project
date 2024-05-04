import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle, Theme } from "./style";
import { ThemeProvider } from "styled-components";
import { UIProvider } from "ui";
import "./index.css";
import "./App.scss";
import { MainLayout } from "layouts";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import SwiperCore from "swiper";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import backend from "backend";
import Login from "./pages/Login/Login";
import { SignUpApplicant, SignUpAs, SignUpEmployer } from "pages";

SwiperCore.use([Autoplay, Navigation, Pagination, FreeMode]);

function App() {
  const { startApp } = backend.app();

  if (startApp)
    return (
      <BrowserRouter>
        <ThemeProvider theme={Theme}>
          <UIProvider>
            <GlobalStyle />
            <Routes>
              <Route path="*" element={<MainLayout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signupas" element={<SignUpAs />} />
              <Route path="/signup-employer" element={<SignUpEmployer />} />
              <Route path="/signup-applicant" element={<SignUpApplicant />} />
            </Routes>
          </UIProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
}

export default App;
