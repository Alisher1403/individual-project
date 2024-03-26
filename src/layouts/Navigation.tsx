import { FC } from "react";
import styled from "styled-components";
import { Searchbar } from "layouts";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import { api } from "store/reducers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";

const Navigation: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch() as AppDispatch;

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
        <Section>
          <div className="links-list">
            <NavLink to={`/login`}>IN</NavLink>
            <button onClick={() => dispatch(api.user.signOut())}>OUT</button>
          </div>
        </Section>
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
  height: var(--navigation-height);
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Section = styled.div`
  .links-list {
    display: flex;
    column-gap: 15px;
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
