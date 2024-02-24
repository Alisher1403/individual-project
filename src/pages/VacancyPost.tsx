import backend from "backend";
import { FC } from "react";
import styled from "styled-components";
import { formData } from "../constant/formData";
import parse from "html-react-parser";
import { skillsIcon } from "icons";
import { appData } from "../constant/appData";
import { Link } from "react-router-dom";

const VacancyPost: FC = () => {
  const { data, error } = backend.vacancy();

  if (!data || error) return;

  return (
    <Container className="main-container">
      <div>
        {/*  */}
        <Content>
          <Section_1>
            <div className="p-1">
              <div className="logo">
                <img src={data.logo} alt="" />
              </div>
              <div className="main">
                <h3>{data.title}</h3>
                <Link to={`/profile/${data.user_id}`}>{data.company}</Link>
                <p>{data.location}</p>
              </div>
              <div className="options">
                <button>
                  <span className="material-symbols-rounded icon">bookmark</span>
                </button>
              </div>
            </div>
            <div className="p-2">{data.subtitle}</div>
            <div className="p-3">
              <div className="left">
                <div>{formData.timeAgo(data.created_at)}</div>
                <div>{formData.emp_type.get(data.emp_type)}</div>
                <div>
                  <span className="material-symbols-rounded">visibility</span>
                  {data.views[0].count}
                </div>
              </div>
            </div>
          </Section_1>
          {/*  */}
          <Section_2>
            {data.description && (
              <div className="p-1">
                <h3>{appData.titles.description}</h3>
                <p>{data.description}</p>
              </div>
            )}
            {data.skills ? (
              <div className="p-1">
                <h3>{appData.titles.skillsRequired}</h3>
                <ul>
                  {data.skills.map((item: keyof typeof skillsIcon, index: string) => {
                    return (
                      <li key={index} data-list="skills">
                        {skillsIcon[item]?.icon ? (
                          <div className="content">
                            <div className="icon">{parse(skillsIcon[item]?.icon)}</div>
                            <p className="name">{skillsIcon[item]?.name}</p>
                          </div>
                        ) : (
                          <div className="content">
                            <p className="name">{item}</p>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </Section_2>
          {/*  */}
          <div>{formData.created_at.get(data)}</div>
        </Content>
      </div>
    </Container>
  );
};

export default VacancyPost;

const Container = styled.div`
  color: var(--text-color);
  font-size: 16px;
  padding: 20px;

  .material-symbols-rounded {
    color: var(--icon-color);
  }
`;

const Content = styled.div``;

const Section_1 = styled.div`
  padding: 20px;
  background: var(--element-background);
  border: 1px solid var(--border-color);
  margin: 10px 0;

  .p-1 {
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

      a {
        color: var(--link-color);

        &:hover {
          color: var(--link-color-hover);
        }
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

  .p-2 {
    padding-top: 15px;
  }

  .p-3 {
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

const Section_2 = styled.div`
  padding: 30px 0;
  h3 {
    text-transform: capitalize;
    font-size: 15px;
    margin-bottom: 10px;
    padding-bottom: 2px;
    border-bottom: 1px solid var(--border-color);
    color: var(--title-color-light);
  }

  .p-1 {
    padding-bottom: 30px;

    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      li {
        .content {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 7px;
          border: 1px solid var(--border-color);
          background: var(--element-background);
          border-radius: 5px;
          cursor: pointer;

          .icon {
            height: 100%;
            aspect-ratio: 1/1;
            border-radius: 5px;
            overflow: hidden;

            svg {
              height: 100%;
              width: 100%;
            }
          }

          .name {
            padding: 0 4px;
            font-size: 16px;
          }
        }
      }
    }
  }
`;
