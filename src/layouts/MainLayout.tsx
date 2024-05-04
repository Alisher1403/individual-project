import { FC } from "react";
import {
  Create,
  Home,
  TopCompanies,
  VacancyList,
  VacancyPost,
  Chat,
  Profile,
  Edit,
} from "pages";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { Navigation } from "layouts";
import { RequireLogin, ModalsList } from "components";

const MainLayout: FC = () => {
  return (
    <Container>
      <RequireLogin />
      <Content>
        <MainContent>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/search/vacancy" element={<VacancyList />}></Route>
            <Route path="/vacancy/:id" element={<VacancyPost />}></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/edit/:id" element={<Edit />}></Route>
            <Route path="/top-companies" element={<TopCompanies />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
            <Route path="/profile/:id" element={<Profile />}></Route>
          </Routes>
        </MainContent>
      </Content>
      <ModalsList />
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

const MainContent = styled.div`
  width: 100%;
  background-color: var(--content-background);

  .main-container {
    max-width: 1350px;
    margin: 0 auto;
    padding: 0 20px;

    @media screen and (max-width: 1100px) {
      padding: 0 30px;
    }

    @media screen and (max-width: 700px) {
      padding: 0 15px;
    }
  }
`;
