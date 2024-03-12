import { FC } from "react";
import styled from "styled-components";
import { Searchbar } from "layouts";
import { useLocation } from "react-router-dom";

const Navigation: FC = () => {
  const location = useLocation();
  return <Container>{location.pathname !== "/" && <Searchbar />}</Container>;
};

export default Navigation;

const Container = styled.nav`
  width: 100%;
  margin: 0 auto;
  border-bottom: var(--border-style);
  background: var(--element-background);
  z-index: 100;
  padding: 20px 0;
`;
