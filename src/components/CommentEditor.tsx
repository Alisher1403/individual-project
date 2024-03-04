import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import styled from "styled-components";
import { api } from "store/reducers";
import useSearchParams from "../hooks/useSearchParams";

interface Props {
  onCancel?: () => void;
  element?: any;
  open?: boolean;
}

const CommentEditor: FC<Props> = ({ onCancel, open = false, element }) => {
  const vacancy_id = useSearchParams().get("vacancy_post");
  const profile = useSelector((state: RootState) => state.profile);
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
      ref.current.textContent = element.text;
    }
  }, []);

  async function submit() {
    const value = ref.current;
    if (value && value.textContent) {
      if (element) {
        await dispatch(
          api.vacancy.comments.update({ vacancy_id, id: element.id, value: value.textContent?.trim() })
        ).then(() => {
          cancel();
        });
      } else {
        await dispatch(api.vacancy.comments.post({ vacancy_id, value: value.textContent?.trim() })).then(() => {
          cancel();
        });
      }
    }
  }

  return (
    <Container>
      <div className="new-comment">
        <div className="body">
          <div className="logo">{profile.img ? <img src={profile.img} alt="" /> : profile.name[0]?.toUpperCase()}</div>
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
              <button className="button" disabled={disabled} data-primary onClick={submit}>
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
};

export default CommentEditor;

const Container = styled.div`
  .new-comment {
    .body {
      .logo {
        width: 40px;
        margin-top: 2px;
        aspect-ratio: 1/1;
        background-color: var(--element-background-dark);
        border-radius: 50%;
        overflow: hidden;
        color: var(--title-color);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        line-height: 0;
        user-select: none;
        font-family: var(--font-regular);
      }
    }
  }
`;
