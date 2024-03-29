import { FC, useState } from "react";
import styled from "styled-components";
import { Searchbar } from "layouts";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import { api } from "store/reducers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { imagesBucket } from "backend";

const Navigation: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch() as AppDispatch;
  const metadata = useSelector((state: RootState) => state.user.metadata);
  const user = useSelector((state: RootState) => state.user.data);
  const [imageLoadded, setImageLoaded] = useState(true);

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
          <div className="account">
            {user?.id ? (
              <AccountBtn className="accoun-btn">
                <div className="account-img">
                  {metadata?.img && imageLoadded ? (
                    <img
                      src={imagesBucket + metadata?.img}
                      alt=""
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageLoaded(false)}
                    />
                  ) : null}
                  <span>{metadata?.name[0]}</span>
                </div>
              </AccountBtn>
            ) : null}
          </div>
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
  border-bottom: 1px solid var(--border-color);
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  background: var(--content-background);
  max-width: 1350px;
  height: var(--navigation-height);
  padding: 0 10px;
  z-index: 100;
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

const AccountBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  .account-img {
    height: 30px;
    aspect-ratio: 1/1;
    background: var(--element-background-dark);
    border-radius: 50%;
    overflow: hidden;
    z-index: 2;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    span {
      z-index: -1;
      text-transform: uppercase;
    }
  }
`;
