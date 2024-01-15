import { FC } from "react";
import { Home } from "pages";
import styled from "styled-components";

const MainLayout: FC = () => {
  return (
    <Container>
      <Home />
    </Container>
  );
};

export default MainLayout;

const Container = styled.main`
  padding-top: 100px;
`;
