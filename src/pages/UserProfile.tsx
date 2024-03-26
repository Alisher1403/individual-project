import { imagesBucket } from "backend";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { api } from "store/reducers";
import styled from "styled-components";
import { Modal } from "ui";

const EditAccount: FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const account = useSelector((state: RootState) => state.user.metadata);
  const userReducer = useSelector((state: RootState) => state.user);
  const [form, setForm] = useState({
    name: account?.name || "",
  });

  const methods = {
    name: {
      ref: useRef<HTMLInputElement>(null),
      disabled(bool: boolean) {
        if (this.ref && this.ref.current) {
          this.ref.current.disabled = bool;
          this.ref.current?.focus();
        }
      },
    },
    img: {
      ref: useRef<HTMLInputElement>(null),
    },
    update() {
      if (this.name.ref && this.name.ref.current) {
        this.name.ref.current.disabled = true;
      }
      dispatch(api.user.metadata.update(form));
    },
    updateImg(file: File) {
      dispatch(api.user.metadata.updateImg(file));
    },
  };

  useEffect(() => {
    setForm({ name: account?.name || "" });
  }, [account]);

  if (account)
    return (
      <Container>
        <Modal open={false} custom={true}>
          <h2 className="ui-title">Hello</h2>
        </Modal>
        <Content>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              methods.update();
            }}
          >
            <div className="s-1">
              <div className="account-img-wrapper">
                <div className="account-img">
                  {account?.img ? (
                    <img src={imagesBucket + account.img} alt="account-img" />
                  ) : (
                    <div></div>
                  )}
                  {/*  */}
                  {userReducer.loading.img ? (
                    <div className="loading">
                      <div className="loader"></div>
                    </div>
                  ) : null}
                </div>
                <label htmlFor="img" className="edit-btn">
                  Change image
                </label>
                <input
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  ref={methods.img.ref}
                  onChange={(e) => {
                    if (e.target?.files) {
                      methods.updateImg(e.target?.files[0]);
                    }
                  }}
                  style={{ display: "none" }}
                />
              </div>
              <div className="account-name">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  minLength={3}
                  disabled
                  ref={methods.name.ref}
                  onBlur={() => methods.update()}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    methods.name.disabled(false);
                  }}
                >
                  <span className="material-symbols-rounded icon">
                    border_color
                  </span>
                </button>
              </div>
            </div>
          </form>
        </Content>
      </Container>
    );

  return null;
};

export default EditAccount;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Content = styled.div`
  padding: 20px 0;

  input {
    border: none;
    border-bottom: 1px solid var(--border-color-dark);
    font-size: 15px;
    color: var(--text-color);
    background: none;
    padding: 3px 5px;
    outline: none;

    &:focus {
      border-color: var(--element-color);
    }
  }

  .subtitle {
    font-size: 15px;
    font-family: var(--font-semiBold);
    color: var(--title-color);
  }

  .edit-btn {
    background: none;
    border: none;
    font-size: 15px;
    font-family: var(--font-semiBold);
    color: var(--element-color);
    cursor: pointer;
  }

  .s-1 {
    display: flex;
    align-items: center;
    column-gap: 20px;

    .account-img-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;

      .account-img {
        height: 120px;
        aspect-ratio: 1/1;
        background: var(--element-background-dark);
        border-radius: 50%;
        overflow: hidden;
        position: relative;

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
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
    }

    .account-name {
      width: 100%;
      display: flex;

      input {
        width: 100%;
        font-size: 24px;
        font-family: var(--font-semiBold);
      }

      button {
        background: none;
        border: none;

        .icon {
          color: var(--text-color);
          font-size: 22px;
          cursor: pointer;
        }
      }
    }
  }
`;
