import { FC } from "react";
import { Sidebar } from "components";
import styled from "styled-components";

const SearchPage: FC = () => {
  return (
    <Container>
      <Content>
        <Sidebar />
      </Content>
    </Container>
  );
};

export default SearchPage;

const Container = styled.div``;
const Content = styled.div``;
