import { Routes, Route, BrowserRouter } from "react-router-dom";
import { VacancyList, Vacancy, Profile, Home } from "pages";
import { Navigation, Searchbar } from "layouts";
import { GlobalStyle, Theme } from "./style";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Navigation />
        <Searchbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search/vacancy" element={<VacancyList />}></Route>
          <Route path="/vacancy/:id" element={<Vacancy />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
