import { FC } from "react";
import styled from "styled-components";
import { formData } from "../../constant/formData";
import { Link, useNavigate } from "react-router-dom";
import { UserImage } from "..";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { setResumeDelete } from "store/reducers/modals";

interface ComponentProps {
  element: any;
  link: boolean;
}

const ResumeCard: FC<ComponentProps> = ({ element, link }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch() as AppDispatch;
  const user = useSelector((state: RootState) => state.user.data);

  const ContanteWrapper = (args: { children: any }) => {
    const { children } = args;
    if (link) {
      return (
        <Link className="link" to={`/resume/${element.id}`}>
          {children}
        </Link>
      );
    } else {
      return children;
    }
  };

  return (
    <Container key={element.id}>
      <ContanteWrapper>
        <Content data-link={link}>
          <div className="card-header">
            <div className="logo">
              <UserImage src={element?.user?.img} alt={element?.user?.name} />
            </div>
            <div className="card-info">
              <h3>
                {element.title}
                {element?.remote && <span className="remote">remote</span>}
              </h3>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  navigate(`/profile/${element?.user_id}`);
                }}
                className="profile-link"
              >
                <div className="user-img">
                  <UserImage
                    src={element?.user?.img}
                    alt={element?.user?.name}
                  />
                </div>
                <p>{element?.user?.name}</p>
              </div>
              {element?.location ? (
                <p className="custom-icon-text">
                  {element.location}
                  <span className="material-symbols-rounded icon">
                    location_on
                  </span>
                </p>
              ) : null}
            </div>
            <div className="options">
              {/* <button>
                <span className="material-symbols-rounded icon">bookmark</span>
              </button> */}
            </div>
          </div>
          {/*  */}
          <div className="card-body">
            {element?.subtitle?.length > 0 && (
              <div className="subtitle">{element.subtitle}</div>
            )}
            {element?.experience && (
              <div className="experience">
                <span className="material-symbols-rounded icon">work</span>{" "}
                {formData.experience.get(element)}
              </div>
            )}

            {/*  */}
            {element?.user_id === user?.id ? (
              <div className="card-btn-group">
                <button
                  className="custom-btn secondary edit"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate(`/edit/${element?.id}`);
                  }}
                >
                  {" "}
                  <span className="material-symbols-rounded icon">
                    edit
                  </span>{" "}
                  Edit
                </button>
                <button
                  className="custom-btn red delete"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(setResumeDelete(element));
                  }}
                >
                  {" "}
                  <span className="material-symbols-rounded icon">
                    delete
                  </span>{" "}
                  Delete
                </button>
              </div>
            ) : null}
          </div>
          {/*  */}
          <div className="card-footer">
            <div className="left">
              {formData.salary.get(element) && (
                <div className="salary">
                  {element?.salary}
                  {formData.currency.get(element?.currency)}
                </div>
              )}
              <div>{formData.timeAgo(element.created_at)}</div>
              <div>
                <span className="material-symbols-rounded icon">
                  visibility
                </span>
                {element?.views?.[0]?.count}
              </div>
            </div>
          </div>
        </Content>
      </ContanteWrapper>
    </Container>
  );
};

export default ResumeCard;

//! =================================================================== STYLE =================================================================== !//

const Container = styled.div`
  a {
    color: var(--text-color);
  }
`;

const Content = styled.div`
  padding: 20px 20px 15px;
  background: var(--element-background);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: default;
  transition: 0.2s;

  &[data-link="true"] {
    @media (hover) {
      &:hover {
        background: var(--element-background-hover);
      }
    }
  }

  .card-header {
    display: grid;
    grid-template-columns: 75px auto 35px;
    column-gap: 20px;
    margin-bottom: 4px;

    .logo {
      aspect-ratio: 1/1;
      overflow: hidden;

      .img-container {
        border-radius: 7px;
        background: var(--element-color);

        &.loaded {
          background: none;
          border-radius: none;
        }

        .alt {
          font-size: 30px;
          text-transform: uppercase;
          color: white;
        }
      }
    }

    .card-info {
      width: 100%;

      h3 {
        font-family: var(--font-bold);
        color: var(--title-color-dark);
        font-size: 20px;
        margin-bottom: 2px;
        display: flex;
        align-items: center;

        .remote {
          background: var(--red-color);
          color: white;
          border-radius: 50px;
          font-size: 11px;
          padding: 2px 5px;
          margin-left: 7px;
        }
      }

      .profile-link {
        display: flex;
        column-gap: 7px;
        align-items: center;

        .user-img {
          display: none;

          .img-container {
            height: 25px;
            max-width: 25px;
            border-radius: 50%;
            overflow: hidden;
            background: var(--element-color);

            &.loaded {
              background: none;
            }

            .alt {
              font-size: 13px;
              color: white;
              font-family: var(--font-regular);
            }
          }
        }

        p {
          color: var(--text-color);
          text-decoration: underline;
          font-size: 16px;
          cursor: pointer;
        }
      }

      .custom-icon-text {
        margin: 2px 0;
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

  .card-body {
    padding: 5px 0 7px;
    width: 100%;
    text-overflow: ellipsis;
    word-break: break-word;

    .subtitle {
      margin: 5px 0;
      font-size: 15px;
    }

    .experience {
      margin-top: 5px;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      column-gap: 5px;
      color: var(--red-color);
      font-family: var(--font-regular);

      .icon {
        font-size: 18px;
      }
    }

    .card-btn-group {
      margin: 5px 0;
      padding-bottom: 2px;
      display: flex;
      column-gap: 7px;

      .custom-btn {
        border-radius: 7px;
        height: 28px;
        font-size: 13px;

        .icon {
          font-size: 17px;
          line-height: 0;
        }

        &.edit {
          background: var(--orange-color);
          color: white;
          border-color: var(--orange-color);
        }

        &.red {
          background: var(--red-color);
          color: white;
          border-color: var(--red-color);
        }
      }
    }
  }

  .card-footer {
    border-top: 1px dashed var(--element-color);
    padding-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      width: 100%;
      height: 25px;

      .salary {
        font-size: 18px;
        font-family: var(--font-semiBold);
        color: var(--element-color);
      }

      div {
        display: flex;
        align-items: center;
        text-transform: lowercase;
        border-left: 1px solid var(--orange-color);
        padding: 0 15px;
        column-gap: 2px;

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
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: var(--font-bold);
        background-color: var(--element-color);
        border: 1px solid var(--element-color);
        font-size: 15px;
        padding: 0 35px;
        height: 30px;
        border-radius: 5px;
        cursor: pointer;

        * {
          color: white;
        }

        &[data-applied="true"] {
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

    @media (max-width: 700px) {
      flex-direction: column;
      border-top: none;

      .right {
        width: 100%;
        margin-top: 15px;
        border-top: 0.5px solid var(--border-color);
        padding-top: 15px;

        .apply-btn {
          width: 100%;
          height: 35px;
          border-radius: 50px;
        }
      }
    }
  }

  @media (max-width: 700px) {
    .card-header {
      grid-template-columns: auto 35px;

      .logo {
        display: none;
      }

      .card-info {
        .profile-link {
          margin: 5px 0;

          .user-img {
            display: flex;
          }
        }
      }
    }

    .card-body {
      padding: 0;
    }
  }
`;
