import { FC } from "react";
import { NavLink as BaseLink } from "react-router-dom";
import styled from "styled-components";

const Navigation: FC = () => {
  return (
    <Container>
      <List>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={{ pathname: "/search/vacancy", search: "?text=&page=1" }}>Vacancy</NavLink>
        </li>
      </List>
    </Container>
  );
};

export default Navigation;

const Container = styled.div`
  padding: 20px 50px;
  max-width: 1740px;
  width: 100%;
  margin: 0 auto;

  * {
    font-family: var(--text-font);
    font-size: var(--text-size);
  }
`;

const NavLink = styled(BaseLink)`
  font-size: 17px;
  color: ${(props) => props.theme.linkColor};
  padding: 7px 8px;

  &.active {
    border-bottom: var(--border-style);
    border-width: 3px;
  }
`;

const List = styled.ul`
  display: flex;
  column-gap: 20px;
`;
