import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import styled from "styled-components";
import { api } from "store/reducers";
import { useParams } from "react-router-dom";
import { requireLogin } from "store/reducers/user";
import { UserImage } from ".";

interface Props {
  onCancel?: () => void;
  element?: any;
  open?: boolean;
}

const CommentEditor: FC<Props> = ({ onCancel, open = false, element }) => {
  const vacancy_id = useParams()?.id || "";
  const user = useSelector((state: RootState) => state.user.data);
  const metadata = useSelector((state: RootState) => state.user.metadata);
  const ref = useRef<HTMLDivElement | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [focus, setFocus] = useState(open);
  const dispatch: AppDispatch = useDispatch();

  function onInput() {
    if (ref.current && ref.current.textContent) {
      if (ref.current.textContent?.trim().length === 0) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }

  function cancel() {
    setFocus(false);
    if (onCancel) {
      onCancel();
    }
    if (ref.current && ref.current.textContent) {
      ref.current.textContent = "";
    }
  }

  useEffect(() => {
    if (element && ref.current) {
      ref.current?.focus();
      ref.current.innerHTML = element.text;
    }
  }, []);

  function submit() {
    const value = ref.current?.innerHTML;

    if (value) {
      if (element) {
        dispatch(
          api.vacancy.comments.update({
            vacancy_id,
            id: element.id,
            value: value.trim(),
          })
        ).then(() => {
          cancel();
        });
      } else {
        dispatch(
          api.vacancy.comments.post({ vacancy_id, value: value.trim() })
        ).then(() => {
          cancel();
        });
      }
    }
  }

  if (user && user.id) {
    return (
      <Container>
        <div className="new-comment">
          <div className="body">
            <div className="img">
              <UserImage src={metadata?.img} alt={metadata?.name} />
            </div>
            <div className="comment-input-wrapper">
              <div
                className="comment-input"
                contentEditable={true}
                onInput={onInput}
                ref={ref}
                role="textbox"
                onFocus={() => setFocus(true)}
              ></div>
            </div>
          </div>
          {focus ? (
            <div className="footer">
              <div className="buttons-wrapper">
                <button className="button" onClick={cancel}>
                  Cancel
                </button>
                <button
                  className="button"
                  disabled={disabled}
                  data-primary
                  onClick={submit}
                >
                  Leave Comment
                </button>
              </div>
            </div>
          ) : (
            <div className="footer-margin"></div>
          )}
        </div>
      </Container>
    );
  } else {
    return (
      <Container>
        <button
          className="warning"
          onClick={() => dispatch(requireLogin(true))}
        >
          <span className="material-symbols-rounded icon">add</span>
          <span>Leave a Comment</span>
        </button>
      </Container>
    );
  }
};

export default CommentEditor;

const Container = styled.div`
  padding: 15px 0;

  .new-comment {
    width: 100%;

    .body {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;
      width: 100%;

      .img {
        height: 40px;
        min-width: 40px;
        margin-right: 15px;
        border-radius: 50%;
        overflow: hidden;
      }

      .comment-input-wrapper {
        flex: 1;
        overflow: hidden;

        .comment-input {
          border: none;
          background: none;
          outline: none;
          resize: none;
          border-bottom: 1px solid var(--border-color-dark);
          padding: 5px 0;
          font-family: var(--font-regular);
          color: var(--text-color);
          font-size: 14px;
          transition: 0.1s;

          &::placeholder {
            color: var(--placeholder-color);
          }

          &:focus {
            border-bottom: 0.5px solid var(--border-color-black);
          }
        }
      }
    }

    .footer {
      margin-bottom: 5px;

      .buttons-wrapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        column-gap: 5px;

        .button {
          font-family: var(--font-semiBold);
          color: var(--title-color);
          border: 0.5px solid var(--border-color);
          padding: 5px 15px;
          font-size: 15px;
          cursor: pointer;
          border-radius: 5px;
          background: var(--element-background);

          &[data-primary] {
            background-color: var(--element-color);
            color: white;
          }
        }
      }
    }

    .footer-margin {
      margin-bottom: 25px;
    }
  }

  .warning {
    border: 1px solid var(--border-color-dark);
    background: none;
    padding: 7px 13px;
    padding-left: 5px;
    cursor: pointer;
    border-radius: 30px;
    display: flex;
    align-items: center;
    column-gap: 1px;

    &:hover {
      border-color: var(--element-color-hover);

      * {
        color: var(--element-color-hover);
      }
    }

    * {
      color: var(--text-color);
    }

    .icon {
      line-height: 0;
      font-size: 25px;
    }

    span {
      font-size: 14px;
    }
  }
`;
