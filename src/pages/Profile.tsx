// import { imagesBucket } from "backend";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "store";
import { api } from "store/reducers";
// import { setUserLoading } from "store/reducers/user";
import styled from "styled-components";
import { Modal } from "ui";
import UserImage from "../components/UserImage";
import VacancyCard from "../components/VacancyCard";

const Profile: FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const id = useParams()?.id;
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user.data);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({ name: "", email: "" });

  const metadata = useSelector(
    (state: RootState) => state.profile.data[id!]?.metadata
  );

  const posts = useSelector(
    (state: RootState) => state.profile.data[id!]?.posts
  );

  const isHost = user?.id === metadata?.id;

  useEffect(() => {
    if (id) {
      dispatch(api.profile.get(id));
    }
  }, [location.pathname]);

  const methods = {
    img: {
      ref: useRef<HTMLInputElement>(null),
    },
    update() {
      const name = editData.name;
      if (name && name.length > 3) {
        dispatch(api.user.metadata.update(editData));
      }
    },
    updateImg(file: File) {
      dispatch(api.user.metadata.updateImg(file));
    },
  };

  useEffect(() => {
    setEditData({ ...metadata });
  }, [metadata]);

  if (metadata)
    return (
      <Container>
        <UserEdit>
          <div className="modal">
            <Modal open={editModal} onClose={() => setEditModal(false)}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  methods.update();
                  setEditModal(false);
                }}
              >
                <div className="s-1">
                  <div className="metadata-img-wrapper">
                    <div className="metadata-img">
                      <UserImage src={metadata?.img} alt={metadata?.name} />
                    </div>
                    <div className="btn-group img-btn-group">
                      <label
                        htmlFor="img"
                        className="edit-btn custom-btn secondary"
                      >
                        <span className="material-symbols-rounded icon">
                          edit
                        </span>
                      </label>
                      <button
                        className="custom-btn secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(api.user.metadata.deleteImg());
                        }}
                      >
                        <span className="material-symbols-rounded icon">
                          delete
                        </span>
                      </button>
                    </div>
                    <input
                      type="file"
                      id="img"
                      name="img"
                      accept="image/*"
                      ref={methods.img.ref}
                      style={{ display: "none" }}
                      onChange={(e) => {
                        if (e.target?.files) {
                          methods.updateImg(e.target?.files[0]);
                        }
                      }}
                    />
                  </div>
                  <div className="metadata-input">
                    <label htmlFor="name" className="label">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      minLength={3}
                      value={editData?.name}
                      onChange={(e) => {
                        setEditData({ ...editData, name: e.target.value });
                      }}
                    />
                  </div>
                  <div className="metadata-input">
                    <label htmlFor="name" className="label">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      minLength={3}
                      value={editData?.email}
                      onChange={(e) => {
                        setEditData({ ...editData, email: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="btn-group">
                  <button
                    className="custom-btn secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditModal(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button className="custom-btn" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </UserEdit>
        <Content>
          <div className="header">
            <div className="user-img">
              <UserImage src={metadata?.img} alt={metadata?.name} />
            </div>
            <div className="user-info">
              <h1 className="user-name">{metadata?.name}</h1>
              <p className="user-type">{metadata?.userType}</p>
              <div className="btn-group"></div>
            </div>
          </div>

          <div className="posts">
            <div className="btn-group">
              {isHost ? (
                <>
                  <button
                    className="custom-btn secondary"
                    onClick={() => setEditModal(true)}
                  >
                    <span className="material-symbols-rounded icon custom-btn-icon">
                      person
                    </span>
                    Edit profile
                  </button>

                  <Link to={`/create`} className="custom-btn secondary">
                    <span className="material-symbols-rounded">add</span>
                    Add New Post
                  </Link>
                </>
              ) : null}
            </div>
            <h2 className="title">Posts</h2>
            {posts?.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <VacancyCard index={index} element={item} />
                </div>
              );
            })}
          </div>
        </Content>
      </Container>
    );

  return null;
};

export default Profile;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Content = styled.div`
  padding: 20px 0;

  .custom-btn {
    height: 30px;
    border-radius: 5px;
  }

  .subtitle {
    font-size: 15px;
    font-family: var(--font-semiBold);
    color: var(--title-color);
  }

  .header {
    display: flex;
    align-items: center;
    column-gap: 20px;
    margin-bottom: 20px;

    .user-img {
      height: 100px;
      min-width: 100px;
      border-radius: 10px;
      overflow: hidden;

      .alt {
        font-size: 40px;
        font-family: var(--font-semiBold);
      }
    }

    .user-info {
      .user-name {
        font-size: 24px;
        font-family: var(--font-bold);
        color: var(--text-color);
      }

      .user-type {
        font-size: 16px;
        text-transform: capitalize;
        font-family: var(--font-regular);
        color: var(--text-color);
      }

      .edit-btn {
        margin-top: 5px;
      }
    }
  }

  .posts {
    .btn-group {
      display: flex;
      column-gap: 5px;

      .custom-btn {
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
      }
    }

    .title {
      border-bottom: 1px solid var(--border-color-dark);
      padding-bottom: 3px;
      font-size: 20px;
      margin-bottom: 20px;
      margin-top: 20px;
    }
  }
`;

const UserEdit = styled.div`
  .modal {
    form {
      width: 100%;
      min-width: 300px;

      input {
        width: 100%;
        border: none;
        border-bottom: 1px solid var(--border-color-dark);
        font-size: 15px;
        color: var(--text-color);
        background: none;
        padding: 3px 0;
        outline: none;

        &:focus {
          border-color: var(--element-color);
        }
      }

      .metadata-img-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px;

        .metadata-img {
          height: 120px;
          aspect-ratio: 1/1;
          background: var(--element-background-dark);
          border-radius: 50%;
          overflow: hidden;
          position: relative;

          .alt {
            font-size: 40px;
            font-family: var(--font-semiBold);
          }

          .loading {
            height: 100%;
            width: 100%;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            position: absolute;
            background: #39393935;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        .img-btn-group {
          margin-top: 10px;

          .custom-btn {
            border-radius: 10px;
            height: 30px;

            .icon {
              font-size: 20px;
            }
          }
        }
      }

      .metadata-input {
        margin-bottom: 20px;

        .label {
          font-size: 12px;
          font-family: var(--font-semiBold);
          color: var(--element-color);
        }
      }

      .btn-group {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        column-gap: 5px;

        .custom-btn {
          border-radius: 10px;
          height: 35px;
        }
      }
    }
  }
`;
