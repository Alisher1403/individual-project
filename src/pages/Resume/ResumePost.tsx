import backend from "backend";
import { FC } from "react";
import styled from "styled-components";
import { formData } from "../../constant/formData";
import parse from "html-react-parser";
import { skills } from "icons";
// import { Link } from "react-router-dom";
import { ResumeCard } from "components";
import SidebarList from "../../layouts/SidebarList";
// import { useDispatch } from "react-redux";
// import { setChat } from "store/reducers/chats";

const ResumePost: FC = () => {
  const { data, error } = backend.resume();
  // const dispatch = useDispatch();

  if (!data || error) return;

  return (
    <Container className="main-container">
      <Content>
        <Main>
          <ResumeCard element={data} link={false} />
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
        </Main>
        <Aside>
          <SidebarList />
        </Aside>
      </Content>
    </Container>
  );
};

export default ResumePost;

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
