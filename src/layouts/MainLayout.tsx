import { FC } from "react";
import { Home, Profile, Vacancy, VacanciesPage } from "pages";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { Navigation } from "layouts";
import { Sidebar } from "components";

const MainLayout: FC = () => {
  return (
    <Container>
      <Content>
        <Left>
          <Sidebar />
        </Left>
        <MainContent>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/search/vacancy" element={<VacanciesPage />}></Route>
            <Route path="/vacancy/:id" element={<Vacancy />}></Route>
            <Route path="/profile/:id" element={<Profile />}></Route>
          </Routes>
        </MainContent>
      </Content>
    </Container>
  );
};

export default MainLayout;

const Container = styled.div`
  position: relative;
`;
const Content = styled.div`
  display: flex;
  position: relative;
`;
const Left = styled.div`
  height: 100%;
  position: sticky;
  top: 0;
  width: 20vw;
  min-width: 350px;
  overflow: hidden;
`;
const MainContent = styled.div`
  width: 100%;
  background-color: var(--content-background);
`;
