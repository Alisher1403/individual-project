import backend from "backend";
import { FC } from "react";
import styled from "styled-components";
import { formData } from "../constant/formData";
import parse from "html-react-parser";
import { skills } from "icons";
import { appData } from "constant";
import { Link } from "react-router-dom";
import { Comment, CommentEditor } from "components";
import SidebarList from "../layouts/SidebarList";

const VacancyPost: FC = () => {
  const { data, error, comments, id, methods, user } = backend.vacancy();

  if (!data || error) return;
  console.log(data);
  

  return (
    <Container className="main-container">
      <Content>
        <Main>
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
                  <span className="material-symbols-rounded icon">
                    bookmark
                  </span>
                </button>
              </div>
            </div>
            <div className="p-2">{data.subtitle}</div>
            <div className="p-3">
              <div className="left">
                <div>{formData.timeAgo(data.created_at)}</div>
                <div>{formData.emp_type.get(data.emp_type)}</div>
                <div>
                  <span className="material-symbols-rounded icon">
                    visibility
                  </span>
                  {data.views[0].count}
                </div>
              </div>
              <div className="right">
                <button
                  className="apply-btn"
                  disabled={!!data?.applied[0]}
                  onClick={methods.apply}
                >
                  {data.applied[0] ? (
                    <div className="apply-btn-content">
                      <span className="material-symbols-rounded icon">
                        done
                      </span>{" "}
                      Applied
                    </div>
                  ) : (
                    <div className="apply-btn-content">Apply</div>
                  )}
                </button>
              </div>
            </div>
          </Section_1>
          {/*  */}
          <Section_4>
            <div className="content">
              <div className="left">
                <button className="btn">
                  <div className="btn-content">
                    <span className="material-symbols-rounded icon">
                      group_add
                    </span>
                    <span>{data?.appliedCount[0].count} Applied</span>
                  </div>
                </button>
              </div>
              <div className="right">
                <Link
                  to={`/chat/${id}`}
                  data-disabled={!user?.id}
                  className="btn"
                >
                  <div className="btn-content">
                    <span className="material-symbols-rounded icon">chat</span>
                    <span>Open Chat</span>
                  </div>
                </Link>
                <button
                  className="btn"
                  disabled={!user?.id}
                  onClick={methods.like}
                >
                  <div className="btn-content">
                    <span
                      className={`material-symbols-rounded icon ${
                        data.reaction[0]?.type === "like" && "filled"
                      }`}
                    >
                      thumb_up
                    </span>
                    <span>{methods.reactionsCount().likes}</span>
                  </div>
                </button>
                <button
                  className="btn"
                  disabled={!user?.id}
                  onClick={methods.dislike}
                >
                  <div className="btn-content">
                    <span
                      className={`material-symbols-rounded icon ${
                        data.reaction[0]?.type === "dislike" && "filled"
                      }`}
                    >
                      thumb_down
                    </span>
                    <span>{methods.reactionsCount().dislikes}</span>
                  </div>
                </button>
              </div>
            </div>
          </Section_4>
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
                  {data.skills.map(
                    (item: keyof typeof skills, index: number) => {
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
                    }
                  )}
                </ul>
              </div>
            ) : null}
          </Section_2>
          {/*  */}
          <div>{formData.created_at.get(data)}</div>

          <Section_3>
            <div className="title">
              <h2>Comments </h2>
              <i>{comments.count}</i>
            </div>
            <CommentEditor />
            {/*  */}
            <ul>
              {comments.list?.length > 0 ? (
                comments.list.map((item: any) => (
                  <li key={item.id}>
                    <Comment element={item} id={id} />
                  </li>
                ))
              ) : (
                <p>No comments available</p>
              )}
            </ul>
            {/*  */}
            <div
              className="loading-animation"
              ref={comments.observer}
              data-loading={comments.loading}
            >
              <div className="loader"></div>
              <p>Loading...</p>
            </div>
            {/*  */}
          </Section_3>
        </Main>
        <Aside>
          <SidebarList />
        </Aside>
      </Content>
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

const Content = styled.div`
  display: grid;
  grid-template-columns: auto 350px;
  column-gap: 30px;
  padding: 30px 0;
`;

const Aside = styled.aside``;
const Main = styled.div``;

const Section_1 = styled.div`
  padding: 20px;
  padding-bottom: 15px;
  background: var(--element-background);
  border: 1px solid var(--border-color);
  margin-bottom: 10px;

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
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;

      div {
        display: flex;
        align-items: center;
        text-transform: lowercase;
        column-gap: 2px;
        border-left: 1px solid var(--border-color);
        padding: 0 15px;

        &:first-child {
          border: none;
          padding-left: 0;
        }

        .icon {
          margin-bottom: -1px;
          color: var(--text-color);
        }
      }
    }

    .right {
      .apply-btn {
        font-family: var(--font-bold);
        background-color: var(--element-color);
        border: 1px solid var(--element-color);
        font-size: 15px;
        padding: 0 35px;
        height: 30px;
        border-radius: 3px;
        cursor: pointer;

        * {
          color: white;
        }

        &[disabled] {
          background-color: transparent;
          color: var(--element-color);

          * {
            color: var(--element-color);
          }
        }

        .apply-btn-content {
          display: flex;
          align-items: center;
          column-gap: 2px;
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
    font-family: var(--font-bold);
    font-weight: normal;
  }

  .description {
    font-family: var(--font-regular);
    color: var(--text-color);

    h2 {
      font-size: 16px;
      color: var(--title-color);
      font-family: var(--font-bold);
      font-weight: normal;
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
      gap: 6px;

      li {
        .content {
          display: flex;
          align-items: center;
          height: 35px;
          padding: 6px;
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

  .title {
    display: flex;
    column-gap: 10px;
    align-items: center;
    margin-bottom: 15px;

    h2 {
      color: var(--title-color);
      font-family: var(--font-bold);
      font-size: 18px;
      font-weight: normal;
      font-family: var(--font-bold);
      font-weight: normal;
    }
  }

  .loading-animation {
    font-size: 15px;
    font-family: var(--font-semiBold);
    color: var(--title-color);
    display: flex;
    align-items: center;
    column-gap: 16px;
    padding: 5px;
    visibility: hidden;

    &[data-loading="true"] {
      visibility: visible;
    }

    .loader {
      width: 26px;
    }
  }
`;

const Section_4 = styled.div`
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left,
    .right {
      display: flex;
      column-gap: 7px;
    }

    .info {
      display: flex;
      align-items: center;
      column-gap: 5px;
      font-size: 15px;
      color: var(--text-color);

      .icon {
        font-size: 22px;
        color: var(--text-color);
      }
    }

    .btn {
      background: var(--element-background);
      border: 1px solid var(--border-color);
      padding: 6px 15px;
      border-radius: 3px;
      cursor: pointer;

      &:hover {
        background: var(--element-background-hover);
      }

      &[data-disabled="true"] {
        pointer-events: none;
      }

      .btn-content {
        display: flex;
        align-items: center;
        column-gap: 5px;
        font-size: 15px;
        color: var(--text-color);
        font-family: var(--font-semiBold);

        .icon {
          font-size: 20px;
          color: var(--text-color);
        }
      }
    }
  }
`;
