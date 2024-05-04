import backend from "backend";
import { FC } from "react";
import styled from "styled-components";
import { formData } from "../../constant/formData";
import parse from "html-react-parser";
import { skills } from "icons";
import { Link } from "react-router-dom";
import { Comment, CommentEditor, VacancyCard } from "components";
import SidebarList from "../../layouts/SidebarList";
import { useDispatch } from "react-redux";
import { setChat } from "store/reducers/chats";

const VacancyPost: FC = () => {
  const { data, error, comments, id, methods, user } = backend.vacancy();
  const dispatch = useDispatch();

  if (!data || error) return;

  return (
    <Container className="main-container">
      <Content>
        <Main>
          <VacancyCard element={data} link={false} />
          {/*  */}
          <Section_1>
            <div className="content">
              <div className="left">
                <button className="btn">
                  <div className="btn-content">
                    <span className="material-symbols-rounded icon">
                      group_add
                    </span>
                    <span>{data?.applicants[0].count} Applied</span>
                  </div>
                </button>
              </div>
              <div className="right">
                <Link
                  to={`/chat`}
                  onClick={() => {
                    dispatch(setChat(data?.id));
                  }}
                  data-disabled={!user?.id}
                  className="btn"
                >
                  <div className="btn-content">
                    <span className="material-symbols-rounded icon">chat</span>
                    <span>Open Chat</span>
                  </div>
                </Link>
                <button className="btn" onClick={methods.like}>
                  <div className="btn-content">
                    <span
                      className={`material-symbols-rounded icon ${
                        data.reaction[0]?.type === "like" &&
                        user?.id &&
                        "filled"
                      }`}
                    >
                      thumb_up
                    </span>
                    <span>{methods.reactionsCount().likes}</span>
                  </div>
                </button>
                <button className="btn" onClick={methods.dislike}>
                  <div className="btn-content">
                    <span
                      className={`material-symbols-rounded icon ${
                        data.reaction[0]?.type === "dislike" &&
                        user?.id &&
                        "filled"
                      }`}
                    >
                      thumb_down
                    </span>
                    <span>{methods.reactionsCount().dislikes}</span>
                  </div>
                </button>
              </div>
            </div>
          </Section_1>
          <Section_2>
            {data.description && (
              <div className="p-1">
                <div className="description">{parse(data.description)}</div>
              </div>
            )}
            {data?.skills && data?.skills.length > 0 ? (
              <div className="p-1">
                <h3>Required Skills</h3>
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
          <div className="created-at">{formData.created_at.get(data)}</div>

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
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: auto 330px;
  column-gap: 20px;
  padding: 30px 0;

  .created-at {
    margin-top: 15px;
  }
`;

const Aside = styled.aside``;

const Main = styled.div`
  width: 100%;
`;

const Section_1 = styled.div`
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

const Section_2 = styled.div`
  h3 {
    text-transform: capitalize;
    font-size: 15px;
    margin-bottom: 10px;
    color: var(--title-color-light);
    font-family: var(--font-bold);
    font-weight: normal;
    width: 100%;
  }

  .description {
    width: 100%;
    font-family: var(--font-regular);
    color: var(--text-color);
    margin-top: 15px;
    word-break: break-all;

    h2 {
      font-size: 16px;
      color: var(--title-color);
      font-family: var(--font-bold);
      font-weight: normal;
      margin-top: 10px;
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
