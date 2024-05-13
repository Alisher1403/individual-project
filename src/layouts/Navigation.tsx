import { FC, useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { api } from "store/reducers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import UserImage from "../components/UserImage";
import Options from "../ui/Options";

const Navigation: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch() as AppDispatch;
  const metadata = useSelector((state: RootState) => state.user.metadata);
  const user = useSelector((state: RootState) => state.user.data);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Container>
      <Menu data-open={menuOpen} onClick={() => setMenuOpen(false)}>
        <div className="menu-content" onClick={(e) => e.stopPropagation()}>
          <ul className="links-list">
            <li className="logo" onClick={() => setMenuOpen(false)}>
              <NavLink to={`/`}>
                <Logo />
              </NavLink>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <NavLink to={`/`}>Home</NavLink>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <NavLink to={`/search/vacancy`}>Vacancies</NavLink>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <NavLink to={`/search/resume`}>Resumes</NavLink>
            </li>
          </ul>
        </div>
      </Menu>

      <Content>
        {/*  */}
        <button
          className="custom-btn secondary menu-btn"
          onClick={() => setMenuOpen(true)}
        >
          <span className="material-symbols-rounded icon">menu</span>
        </button>
        {/*  */}
        <Section className="left">
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
            <li>
              <NavLink to={`/search/resume`}>Resumes</NavLink>
            </li>
          </ul>
        </Section>
        <Section className="right">
          {user?.id ? (
            <AccountBtn className="accoun-btn">
              <Options
                parent={
                  <div className="account">
                    <div className="account-img">
                      <UserImage src={metadata?.img} alt={metadata?.name} />
                    </div>
                    <div className="account-name">{metadata?.name}</div>
                  </div>
                }
                options={[
                  {
                    label: "New post",
                    icon: "add",
                    onClick: () => {
                      navigate(`/create`);
                    },
                  },
                  {
                    label: "Profile",
                    icon: "person",
                    onClick: () => {
                      navigate(`/profile/${user?.id}`);
                    },
                  },
                  {
                    label: "Log Out",
                    icon: "logout",
                    onClick: () => {
                      dispatch(api.user.signOut());
                    },
                  },
                ]}
              />
            </AccountBtn>
          ) : (
            <div className="btn-list">
              <NavLink to={`/login`} className={"custom-btn"}>
                Log In
              </NavLink>
              <NavLink to={`/signupas`} className={"custom-btn"}>
                Sign Up
              </NavLink>
            </div>
          )}
        </Section>
      </Content>
    </Container>
  );
};

export default Navigation;

const Container = styled.nav`
  border-bottom: 1px solid var(--border-color);
  background: var(--element-background);
  position: relative;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  max-width: 1350px;
  height: var(--navigation-height);
  padding: 0 10px;
  z-index: 100;

  .menu-btn {
    border: none;
    border-radius: 5px;
    display: none;

    @media (max-width: 700px) {
      display: block;
    }

    .icon {
      font-size: 25px;
    }
  }
`;

const Menu = styled.div`
  background: #6f6f6f2b;
  position: fixed;
  height: 100lvh;
  width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  overflow: hidden;
  visibility: collapse;

  &[data-open="true"] {
    visibility: visible;

    .menu-content {
      transform: translateX(0);
    }
  }

  .menu-content {
    max-width: 200px;
    width: 100%;
    height: 100svh;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background: var(--element-background);
    padding: 20px;
    transform: translateX(-100%);
    transition: 0.3s;
  }

  .links-list {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    z-index: 2;

    .logo {
      margin-bottom: 10px;
    }

    a {
      width: 100%;
      display: block;
      padding: 5px 0;

      &.active {
        border-bottom: 2px solid var(--element-color);
        color: var(--element-color);
      }
    }
  }
`;

const Section = styled.div`
  &.left {
    .links-list {
      display: flex;
      column-gap: 20px;
      align-items: center;

      a {
        color: var(--title-color);
        font-family: var(--font-regular);
        font-size: 16px;
        white-space: nowrap;

        &.custom-btn {
          color: white;
        }

        &.active {
          color: var(--element-color);
        }
      }
    }
  }

  &.right {
    display: flex;
    column-gap: 10px;

    .btn-list {
      display: flex;
      column-gap: 5px;
      align-items: center;

      .custom-btn {
        height: 100%;
        color: var(--title-color);
        font-family: var(--font-regular);
        font-size: 15px;
        white-space: nowrap;
        color: white;
      }
    }
  }

  @media (max-width: 700px) {
    &.left {
      .links-list {
        display: none;
      }
    }
  }
`;

const AccountBtn = styled.div`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 1000;

  .account {
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 10px;
    padding: 3px;
    padding-right: 10px;
    border-radius: 100px;
    border: 1px solid var(--border-color-dark);

    &:hover {
      background: var(--element-background-hover);
    }

    .account-img {
      height: 100%;
      aspect-ratio: 1/1;
      background: var(--element-background-dark);
      border-radius: 50%;
      overflow: hidden;

      .alt {
        text-transform: uppercase;
        font-size: 14px;
      }
    }

    .account-name {
      white-space: nowrap;
      font-size: 14px;
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .options-header {
    border-radius: 100px !important;
  }

  .options-body {
    width: 150px;
    top: calc(100% + 3px);
  }
`;
