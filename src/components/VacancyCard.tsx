import { FC } from "react";
import styled from "styled-components";
import { formData } from "../constant/formData";
import { Link } from "react-router-dom";

interface ComponentProps {
  element: any;
  index: number;
  expanded?: boolean;
}

const VacancyCard: FC<ComponentProps> = ({ element, expanded = true }) => {
  return (
    <Container key={element.id}>
      <Link to={{ search: `${window.location.search}&post=${element.id}` }}>
        <Content>
          <div className="s1">
            <div className="logo">
              <img src={element.logo} alt="" />
            </div>
            <div className="main">
              <h3>{element.title}</h3>
              <p>{element.company}</p>
              <p>{element.location}</p>
            </div>
            <div className="options">
              <button>
                <span className="material-symbols-rounded icon">bookmark</span>
              </button>
            </div>
          </div>
          {expanded && element.subtitle && <div className="s2">{element.subtitle}</div>}
          <div className="s3">
            <div className="left">
              <div>{formData.timeAgo(element.created_at)}</div>
              <div>{formData.emp_type.get(element.emp_type)}</div>
              <div>
                <span className="material-symbols-rounded">visibility</span>
                {element.views[0].count}
              </div>
            </div>
          </div>
        </Content>
      </Link>
    </Container>
  );
};

export default VacancyCard;

//! =================================================================== STYLE =================================================================== !//

const Container = styled.div`
  a {
    color: var(--text-color);
  }
`;

const Content = styled.div`
  padding: 20px;
  background: var(--element-background);
  border: 1px solid var(--border-color);
  margin: 10px 0;
  cursor: pointer;

  &:hover {
    background: var(--element-background-hover);
  }

  .s1 {
    display: grid;
    grid-template-columns: 80px auto 40px;
    column-gap: 20px;

    .logo {
      aspect-ratio: 1/1;
      background: var(--element-color);
      border-radius: 7px;
    }

    .main {
      width: 100%;

      h3 {
        font-family: var(--font-bold);
        color: var(--title-color-dark);
        font-size: 20px;
        margin-bottom: 4px;
      }

      p {
        color: var(--text-color);
      }
    }

    .options {
      button {
        height: 40px;
        aspect-ratio: 1/1;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--content-background);
        border: none;
        border-radius: 5px;
        cursor: pointer;

        .icon {
          font-size: 32px;
        }
      }
    }
  }

  .s2 {
    padding-top: 15px;
  }

  .s3 {
    border-top: 1px solid var(--border-color-dark);
    padding-top: 10px;
    margin-top: 20px;

    .left {
      display: flex;

      div {
        display: flex;
        align-items: center;
        text-transform: lowercase;
        border-left: 1px solid var(--border-color);
        padding: 0 15px;

        &:first-child {
          border: none;
          padding-left: 0;
        }
      }
    }
  }
`;
