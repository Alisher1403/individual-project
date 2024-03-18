import { FC, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { formData } from "../constant/formData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { Options } from "ui";
import CommentEditor from "./CommentEditor";
import { api } from "store/reducers";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";

interface Props {
  element: any;
  id: string;
}

const Comment: FC<Props> = ({ element }) => {
  const vacancy_id = useParams()?.id || "";
  const dispatch: AppDispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.id);
  const [edit, setEdit] = useState(false);
  const timeAgo = useMemo(() => formData.timeAgo(element.created_at), [element.created_at]);
  const [liked, setLiked] = useState<"like" | "dislike" | null>(element.liked);
  const [componentReady, setComponentReady] = useState(false);

  const like = {
    set(state: typeof liked): void {
      setLiked((prevLiked) => (prevLiked === state ? null : state));
    },
    count(state: typeof liked) {
      const isLike = liked === "like";
      const isDislike = liked === "dislike";
      const isElementLiked = element.liked === "like";
      const isElementDisliked = element.liked === "dislike";

      let likeCount = isLike
        ? isElementLiked
          ? element.like_count
          : element.like_count + 1
        : isElementLiked
        ? element.like_count - 1
        : element.like_count;

      let dislikeCount = isDislike
        ? isElementDisliked
          ? element.dislike_count
          : element.dislike_count + 1
        : isElementDisliked
        ? element.dislike_count - 1
        : element.dislike_count;

      return state === "like" ? likeCount : dislikeCount;
    },
  };

  useEffect(() => {
    let timer: any;
    setComponentReady(true);

    if (componentReady) {
      timer = setTimeout(() => {
        dispatch(api.vacancy.comments.like({ comment_id: element.id, vacancy_id, liked }));
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [liked]);

  return (
    <Container>
      {edit ? (
        <CommentEditor onCancel={() => setEdit(false)} open={true} element={element} />
      ) : (
        <Content>
          <div className="img">
            {element?.user_data.img ? (
              <img src={element?.user_data.img} alt="" />
            ) : (
              element?.user_data.name[0].toUpperCase()
            )}
          </div>
          <div className="main-wrapper">
            <div>
              <div className="main">
                <div className="header">
                  <div className="name">{element.user_data?.name}</div>
                  <div>{timeAgo}</div>
                  <div>{element?.changed ? "(changed)" : ""}</div>
                </div>
                <div className="body">
                  <div className="text">{parse(element.text)}</div>
                </div>
                <div className="footer">
                  <button className="btn" onClick={() => like.set("like")}>
                    <p>{like.count("like")}</p>
                    <span className={`material-symbols-rounded icon ${liked === "like" ? "filled" : ""}`}>
                      thumb_up
                    </span>
                  </button>
                  <button className="btn" onClick={() => like.set("dislike")}>
                    <p>{like.count("dislike")}</p>
                    <span className={`material-symbols-rounded icon ${liked === "dislike" ? "filled" : ""}`}>
                      thumb_down
                    </span>
                  </button>
                  <button className="btn">Respond</button>
                </div>
              </div>
            </div>
            <div>
              {element.user_data.id === userId ? (
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
