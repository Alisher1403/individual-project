import { FC } from "react";
import { Home, Login, Profile, Vacancy } from "pages";
import styled from "styled-components";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navigation } from "layouts";
import { Sidebar } from "components";

const MainLayout: FC = () => {
  const location = useLocation();
  if (location.pathname === "/login") return <Login />;

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
            <Route path="/search/vacancy" element={<Vacancy />}></Route>
            <Route path="/profile/:id" element={<Profile />}></Route>
            <Route path="/login" element={<Login />}></Route>
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

  @media screen and (max-width: 1100px) {
    display: none;
  }
`;
const MainContent = styled.div`
  width: 100%;
  background-color: var(--content-background);

  .main-container {
    max-width: 1100px;
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
