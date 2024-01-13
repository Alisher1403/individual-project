import { Routes, Route, BrowserRouter } from "react-router-dom";
import { VacancyList, Vacancy } from "pages";
import { Navigation } from "layouts";
import { GlobalStyle, Theme } from "./style";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={Theme}>
        <Navigation />
        <GlobalStyle />
        <Routes>
          <Route path="/vacancy-list" element={<VacancyList />}></Route>
          <Route path="/vacancy/:id" element={<Vacancy />}></Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
