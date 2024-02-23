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
            <img src={data.logo} />
            <h3>{data.company}</h3>
          </Section_2>
          {/*  */}
          <s3.Content>
            {data.description && <s3.Description>{parse(data.description)}</s3.Description>}
            {data.skills ? (
              <s3.Div>
                <s3.Heading>{appData.titles.skillsRequired}</s3.Heading>
                <s3.List>
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
                </s3.List>
              </s3.Div>
            ) : null}
            <s3.Date>{formData.created_at.get(data)}</s3.Date>
          </s3.Content>
          {/*  */}
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
  cursor: pointer;

  &:hover {
    background: var(--element-background-hover);
  }

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
  padding: 15px;
  display: flex;
  align-items: center;
  background-color: var(--data-background);
  border: 1px solid var(--border-color);
  border-radius: 5px;

  h3 {
    font-size: 23px;
    font-family: var(--font-regular);
    font-weight: normal;
    text-align: center;
  }

  img {
    width: 50px;
    aspect-ratio: 1/1;
    border: var(--border-style);
    object-fit: cover;
    border-radius: 50%;
  }
`;

const s3 = {
  Content: styled.div``,
  Description: styled.div``,
  Div: styled.div`
    padding: 10px 0;
  `,
  Heading: styled.h3`
    text-transform: capitalize;
    margin-bottom: 10px;
  `,
  List: styled.ul`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    li {
      .content {
        display: flex;
        align-items: center;
        background: white;
        height: 40px;
        padding: 7px;
        border-radius: 8px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.055), 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.024);

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
          padding: 0 5px;
          font-size: 18px;
        }
      }
    }
  `,
  Date: styled.div`
    color: #a8a8a8;
  `,
  text: styled.div`
    display: flex;
    column-gap: 3px;
    align-items: center;
  `,
};
