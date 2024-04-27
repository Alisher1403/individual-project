import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUpAs: FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <h1>Sign Up as</h1>
        <div className="box-list">
          <div
            className="box"
            onClick={() => {
              navigate("/signup-applicant");
            }}
          >
            <span className="material-symbols-rounded icon">person</span>
            <h2 className="title">Applicant</h2>
            <p className="info">
              Craft a standout CV, explore diverse job openings, and apply
              confidently. Navigate your career journey with precision and seize
              opportunities for growth and advancement.
            </p>
          </div>
          <div
            className="box"
            onClick={() => {
              navigate("/signup-employer");
            }}
          >
            <span className="material-symbols-rounded icon">badge</span>
            <h2 className="title">Employer</h2>
            <p className="info">
              Discover top talent for your organization by posting job
              vacancies. Attract qualified candidates, streamline hiring, and
              build your dream team with ease.
            </p>
          </div>
        </div>
      </Content>
    </Container>
  );
};

export default SignUpAs;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
`;

const Content = styled.div`
  h1 {
    text-align: center;
    margin-bottom: 15px;
    font-family: var(--font-bold);
    color: var(--text-color);
  }

  .box-list {
    display: flex;
    justify-content: center;
    column-gap: 10px;

    .box {
      max-width: 300px;
      width: 100%;
      border: 1px solid var(--border-color);
      background: var(--element-background);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px 20px;
      cursor: pointer;
      transition: 0.2s;

      &:hover {
        background: var(--element-color);

        .icon,
        .title,
        .info {
          color: #eaeaea;
        }
      }

      .icon {
        font-size: 60px;
        margin-bottom: 8px;
        color: var(--element-color);
      }

      .title {
        font-size: 22px;
        color: var(--text-color);
        font-family: var(--font-semiBold);
        margin-bottom: 7px;
      }

      .info {
        font-family: var(--font-regular);
        font-size: 15px;
        color: var(--text-color);
      }
    }
  }
`;
