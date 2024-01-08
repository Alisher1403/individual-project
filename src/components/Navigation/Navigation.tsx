import { FC } from "react";
import { NavLink as BaseLink } from "react-router-dom";
import styled from "styled-components";

const Navigation: FC = () => {
  return (
    <Container>
      <ul>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/"}>Vacancy</NavLink>
        </li>
      </ul>
    </Container>
  );
};

export default Navigation;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const NavLink = styled(BaseLink)`
  font-size: 18px;
  color: ${(props) => props.theme.linkColor};
`;
