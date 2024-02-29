import backend from "backend";
import { FC, useEffect } from "react";
import styled from "styled-components";
import { formData } from "../constant/formData";
import parse from "html-react-parser";
import { skills } from "icons";
import { appData } from "constant";
import { Link } from "react-router-dom";
import { Comment } from "components";
import { useInView } from "react-intersection-observer";

const VacancyPost: FC = () => {
  const { data, error, comments } = backend.vacancy();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      comments.load();
    }
  }, [inView]);

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
                <div className="description">{parse(data.description)}</div>
              </div>
            )}
            {data.skills ? (
              <div className="p-1">
                <h3>{appData.titles.skillsRequired}</h3>
                <ul data-skills>
                  {data.skills.map((item: keyof typeof skills, index: number) => {
                    const { icon, name } = skills[item] || {};
                    const hasIcon = icon && name;

                    return (
                      <li key={index} data-list="skills">
                        <div className="content">
                          {hasIcon ? (
                            <>
                              <div className="icon">{parse(icon)}</div>
                              <p className="name">{name}</p>
                            </>
                          ) : (
                            <p className="name">{item}</p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </Section_2>
          {/*  */}
          <div>{formData.created_at.get(data)}</div>

          <Section_3>
            <h2>Comments {comments.count}</h2>
            <ul>
              {comments.list
                ? comments.list?.map((item: any, index: number) => {
                    return (
                      <li key={index}>
                        <Comment element={item} />
                      </li>
                    );
                  })
                : undefined}
            </ul>
            <div ref={ref} className="loading-animation">
              <div className="loader"></div>
              <p>Loading...</p>
            </div>
          </Section_3>
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
  h3 {
    text-transform: capitalize;
    font-size: 15px;
    margin-bottom: 10px;
    color: var(--title-color-light);
  }

  .description {
    font-family: var(--font-regular);
    color: var(--text-color);

    h2 {
      font-size: 16px;
      color: var(--title-color);
      margin-top: 20px;
      margin-bottom: 3px;
    }

    ul {
      li {
        position: relative;
        padding-left: 25px;

        &::before {
          content: "―";
          left: 0;
          position: absolute;
        }
      }
    }
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
          pointer-events: none;

          .icon {
            height: 100%;
            aspect-ratio: 1/1;
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

const Section_3 = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px dashed var(--border-color-black);

  h2 {
    color: var(--title-color);
    font-size: 20px;
    margin-bottom: 10px;
  }

  .loading-animation {
    font-size: 15px;
    font-family: var(--font-semiBold);
    color: var(--title-color);
    display: flex;
    align-items: center;
    column-gap: 16px;
    padding: 10px;

    .loader {
      width: 26px;
    }
  }
`;
