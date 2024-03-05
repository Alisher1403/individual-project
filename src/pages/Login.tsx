import { FC, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Login: FC = () => {
  const [passwordType, setPasswordType] = useState("password");

  return (
    <Container>
      <Content>
        <h1 className="title">Sign In</h1>
        <h2 className="subtitle">Enter your email and password to access your account</h2>

        <form>
          <div className="form-content">
            <div className="input-container">
              <h3 className="input-label">Email</h3>
              <div className="input-wrapper">
                <input type="email" required />
              </div>
            </div>
            <div className="input-container">
              <h3 className="input-label">Password</h3>
              <div className="input-wrapper">
                <input type={passwordType} required />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (passwordType === "password") {
                      setPasswordType("text");
                    } else {
                      setPasswordType("password");
                    }
                  }}
                >
                  <span className="material-symbols-rounded icon">visibility</span>
                </button>
              </div>
            </div>

            <button type="submit" className="submit-button">
              Sign In
            </button>
          </div>
        </form>

        <h2 className="subtitle">
          Don't have an account? <Link to={{ search: "new=true" }}>Sign Up</Link>
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

    a {
      color: var(--link-color);
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

        .input-label {
          font-size: 14px;
          font-family: var(--font-medium);
          font-weight: normal;
          margin-bottom: 8px;
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
          }

          button {
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
