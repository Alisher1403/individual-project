import { FC } from "react";
import styled from "styled-components";
import { Searchbar } from "layouts";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../components/Logo";

const Navigation: FC = () => {
  const location = useLocation();
  return (
    <Container>
      <Content>
        <Section>
          <ul className="links-list">
            <li>
              <NavLink to={`/`}>
                <Logo />
              </NavLink>
            </li>
            <li>
              <NavLink to={`/`}>Home</NavLink>
            </li>
            <li>
              <NavLink to={`/search/vacancy`}>Vacancies</NavLink>
            </li>
          </ul>
        </Section>
        {location.pathname !== "/" && <Searchbar />}
      </Content>
    </Container>
  );
};

export default Navigation;

const Container = styled.nav`
  width: 100%;
  margin: 0 auto;
  border-bottom: var(--border-style);
  background: var(--content-background);
  z-index: 100;
  max-width: 1350px;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const Section = styled.div`
  .links-list {
    display: flex;
    column-gap: 30px;
    align-items: center;

    li {
      a {
        color: var(--title-color);
        font-family: var(--font-regular);
        font-size: 16px;

        &.active {
          color: var(--element-color);
        }
      }
    }
  }
`;
