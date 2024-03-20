import { FC, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { formData } from "../constant/formData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { Options } from "ui";
import CommentEditor from "./CommentEditor";
import { api } from "store/reducers";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { setCommentReaction } from "store/reducers/vacancy";

interface Props {
  element: any;
  id: string;
}

const Comment: FC<Props> = ({ element }) => {
  const vacancy_id = useParams()?.id || "";
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [edit, setEdit] = useState(false);
  const timeAgo = useMemo(() => formData.timeAgo(element.created_at), [element.created_at]);
  const likeTimer = useRef<any>();

  const methods = {
    like() {
      dispatch(setCommentReaction({ comment_id: element.id, vacancy_id, type: "like" }));
      clearTimeout(likeTimer.current);
      likeTimer.current = setTimeout(() => {
        dispatch(api.vacancy.comments.like({ vacancy_id, comment_id: element.id }));
      }, 1000);
    },
    dislike() {
      dispatch(setCommentReaction({ comment_id: element.id, vacancy_id, type: "dislike" }));
      clearTimeout(likeTimer.current);
      likeTimer.current = setTimeout(() => {
        dispatch(api.vacancy.comments.like({ vacancy_id, comment_id: element.id }));
      }, 1000);
    },
    reactionsCount() {
      const reaction = element.reaction[0]?.type;
      const likesCount = element.likes[0]?.count;
      const dislikesCount = element.dislikes[0]?.count;
      let likes;
      let dislikes;

      if (reaction === "like") {
        likes = likesCount + 1;
      } else {
        likes = likesCount;
      }

      if (reaction === "dislike") {
        dislikes = dislikesCount + 1;
      } else {
        dislikes = dislikesCount;
      }

      return {
        likes,
        dislikes,
      };
    },
  };

  return (
    <Container>
      {edit ? (
        <CommentEditor onCancel={() => setEdit(false)} open={true} element={element} />
      ) : (
        <Content>
          <div className="img">
            {element?.user.img ? <img src={element?.user.img} alt="" /> : element?.user.name[0].toUpperCase()}
          </div>
          <div className="main-wrapper">
            <div>
              <div className="main">
                <div className="header">
                  <div className="name">{element.user?.name}</div>
                  <div>{timeAgo}</div>
                  <div>{element?.changed ? "(changed)" : ""}</div>
                </div>
                <div className="body">
                  <div className="text">{parse(element.text)}</div>
                </div>
                <div className="footer">
                  <button className="btn" disabled={!user?.id} onClick={() => methods.like()}>
                    <p>{methods.reactionsCount().likes}</p>
                    <span
                      className={`material-symbols-rounded icon ${
                        element?.reaction?.[0]?.type === "like" ? "filled" : ""
                      }`}
                    >
                      thumb_up
                    </span>
                  </button>
                  <button className="btn" disabled={!user?.id} onClick={() => methods.dislike()}>
                    <p>{methods.reactionsCount().dislikes}</p>
                    <span
                      className={`material-symbols-rounded icon ${
                        element?.reaction?.[0]?.type === "dislike" ? "filled" : ""
                      }`}
                    >
                      thumb_down
                    </span>
                  </button>
                  <button className="btn">Respond</button>
                </div>
              </div>
            </div>
            <div>
              {user && element.user.id === user?.id ? (
                <Options
                  options={[
                    { icon: "edit", label: "Edit", onClick: () => setEdit(true) },
                    {
                      icon: "delete",
                      label: "Delete",
                      onClick: () => dispatch(api.vacancy.comments.delete({ id: element.id, vacancy_id })),
                    },
                  ]}
                />
              ) : null}
            </div>
          </div>
        </Content>
      )}
    </Container>
  );
};

export default Comment;

const Container = styled.div``;

const Content = styled.div`
  padding: 15px 0;
  color: var(--text-color);
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid var(--border-color-light);

  .img {
    min-width: 40px;
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
    margin-right: 15px;

    @media screen and (max-width: 700px) {
      min-width: 30px;
      width: 30px;
      font-size: 18px;
      margin-right: 7px;
    }
  }

  .main-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .main {
      .header {
        display: flex;
        column-gap: 7px;
        font-size: 12px;
        align-items: center;
        margin-bottom: 3px;
        font-family: var(--font-regular);

        .name {
          font-family: var(--font-semiBold);
          color: var(--title-color);
          font-weight: normal;
          font-size: 16px;

          @media screen and (max-width: 700px) {
            font-size: 13px;
          }
        }
      }

      .body {
        font-size: 14px;
        font-family: var(--font-regular);
      }

      .footer {
        display: flex;
        align-items: center;
        column-gap: 15px;
        margin-top: 15px;

        .btn {
          background: none;
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-size: 13px;
          color: var(--title-color);
          font-family: var(--font-regular);

          .icon {
            font-size: 20px;
          }
        }
      }
    }
  }
`;
