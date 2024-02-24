import { FC } from "react";
import styled from "styled-components";
import { Searchbar } from "layouts";

const Navigation: FC = () => {
  return (
    <Container>
      <Searchbar />
    </Container>
  );
};

export default Navigation;

const Container = styled.nav`
  width: 100%;
  margin: 0 auto;
  position: sticky;
  top: 0;
  border-bottom: var(--border-style);
  background: var(--element-background);
  z-index: 100;
  padding: 20px 0;
`;
