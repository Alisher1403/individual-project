import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "store";
import { requireLogin } from "store/reducers/user";
import styled from "styled-components";

const RequireLogin: FC = () => {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.user.requireLogin);

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [open]);

  if (open) {
    return (
      <Container onClick={() => dispatch(requireLogin(false))}>
        <Content onClick={(e) => e.stopPropagation()}>
          <h1>Log in or Sign up to account to access more features</h1>
          <Link to={{ pathname: "/login", search: "type=log-in" }}>
            <span className="material-symbols-rounded icon">login</span>
            <div className="btn-text">Log In</div>
          </Link>
          <Link to={{ pathname: "/login", search: "type=sign-up" }}>
            <span className="material-symbols-rounded icon">person_add</span>
            <div className="btn-text">Sign Up</div>
          </Link>
        </Content>
      </Container>
    );
  }
};

export default RequireLogin;

const Container = styled.div`
  height: 100%;
  width: 100%;
  background: #0000001a;
  position: fixed;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  max-width: 500px;
  width: 100%;
  background: var(--element-background);
  border: 1px solid var(--border-color-dark);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 12px;
  padding: 25px 20px;
  z-index: 1;

  h1 {
    font-size: 20px;
    text-align: center;
    font-family: var(--font-bold);
    font-weight: normal;
    color: var(--title-color);
  }

  a {
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 7px;
    border: 1px solid var(--border-color);
    border-radius: 50px;
    background: var(--content-background);
    color: var(--title-color);
    cursor: pointer;
    transition: 0.1s;

    &:hover {
      background: var(--element-color);
      border-color: var(--element-color);

      * {
        color: white;
      }
    }

    .icon {
      font-size: 25px;
      line-height: 0;
    }

    .btn-text {
      font-size: 18px;
      font-family: var(--font-semiBold);
    }
  }
`;
