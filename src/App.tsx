import MainLayout from "./layouts/MainLayout";
import { Routes, Route } from "react-router-dom";
import { Vacancy } from "pages";
import { Navigation } from "components";
import { GlobalStyle, Theme } from "./style";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Navigation />
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<MainLayout />}></Route>
          <Route path="/vacancy/:id" element={<Vacancy />}></Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
