import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "store";
import { api } from "store/reducers";
import styled from "styled-components";

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch() as AppDispatch;
  const [passwordType, setPasswordType] = useState("password");
  const [userExists, setUserExists] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function signIn() {
    dispatch(api.user.signIn(form)).then((e) => {
      if (e.payload) {
        setUserExists(false);
      } else {
        setUserExists(true);
      }
    });
  }

  return (
    <Container>
      <Content>
        <h1 className="title">Log In</h1>
        <h2 className="subtitle">
          Enter your email and password to access your account
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          <div className="form-content">
            <div className="input-container" data-error={userExists}>
              <h3 className="input-label">Email</h3>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  required
                  onChange={(e) => {
                    setUserExists(false);
                    setForm({ ...form, email: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="input-container" data-error={userExists}>
              <h3 className="input-label">Password</h3>
              <div className="input-wrapper">
                <input
                  type={passwordType}
                  name="password"
                  required
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <div
                  className="password-visible"
                  onClick={(e) => {
                    e.preventDefault();
                    if (passwordType === "password") {
                      setPasswordType("text");
                    } else {
                      setPasswordType("password");
                    }
                  }}
                >
                  <span className="material-symbols-rounded icon visibility">
                    visibility
                  </span>
                </div>
              </div>
              <span className="error-message">Incorrect name or password</span>
            </div>

            <button type="submit" className="submit-button">
              Log in
            </button>
          </div>
        </form>

        <h2 className="subtitle">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signupas")}>Sign Up</button>
        </h2>
      </Content>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--content-background);
`;

const Content = styled.div`
  max-width: 420px;
  width: 100%;
  border: 1px solid var(--border-color);
  padding: 40px 50px;
  background-color: var(--element-background);
  border-radius: 7px;

  .title {
    font-size: 50px;
    font-family: var(--font-semiBold);
    text-transform: capitalize;
    text-align: center;
    margin-bottom: 10px;
    color: var(--title-color-dark);
  }

  .subtitle {
    font-size: 16px;
    font-family: var(--font-regular);
    font-weight: normal;
    text-align: center;
    color: var(--title-color-dark);

    button {
      color: var(--link-color);
      background: none;
      border: none;
      padding: 0;
      font-size: 16px;
      cursor: pointer;
    }
  }

  form {
    margin-top: 35px;

    .form-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 10px;

      .input-container {
        margin: 5px 0;
        width: 100%;

        &[data-error="true"] {
          .error-message {
            display: block;
          }

          .input-wrapper {
            border-color: red;
          }
        }

        .input-label {
          font-size: 14px;
          font-family: var(--font-medium);
          font-weight: normal;
          margin-bottom: 8px;
        }

        .error-message {
          color: red;
          font-family: var(--font-light);
          font-size: 14px;
          display: none;
          margin-top: 3px;
        }

        .input-wrapper {
          height: 35px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--content-background);
          border: 1px solid var(--border-color-light);
          border-radius: 7px;
          overflow: hidden;

          input {
            border: none;
            outline: none;
            height: 100%;
            padding: 0 10px;
            outline: none;
            width: 100%;
            background: none;

            &:-webkit-autofill {
              box-shadow: 0 0 0 30px var(--content-background) inset;
            }

            /* Firefox */
            &:-moz-autofill {
              box-shadow: 0 0 0 30px var(--content-background) inset;
            }
          }

          .password-visible {
            border: none;
            background: none;
            padding: 0 5px;
            padding-right: 10px;
            height: 100%;
            cursor: pointer;
            background: none;
            display: flex;
            justify-content: center;
            align-items: center;

            .icon {
              font-size: 22px;
              margin-bottom: -2px;
              line-height: 0;
            }
          }
        }
      }
    }

    .submit-button {
      width: 100%;
      background-color: var(--element-color);
      border: none;
      padding: 10px;
      font-size: 16px;
      color: white;
      border-radius: 7px;
      margin-top: 25px;
      margin-bottom: 20px;
      cursor: pointer;
    }
  }
`;
