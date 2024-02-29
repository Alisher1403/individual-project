import { FC } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { formData } from "../constant/formData";

interface iComment {
  element: any;
}

const Comment: FC<iComment> = ({ element }) => {
  return (
    <Container>
      <Content>
        <div className="logo"></div>
        <div className="main">
          <div className="header">
            <div className="name">{element.user.name}</div>
            <div>{formData.timeAgo(element.created_at)}</div>
          </div>
          <div className="body">
            <div className="text">{parse(element.text)}</div>
          </div>
          <div className="footer">
            <button className="btn">
              <span className="material-symbols-rounded icon">thumb_up</span>
            </button>
            <button className="btn">
              <span className="material-symbols-rounded icon">thumb_down</span>
            </button>
            <button className="btn">Respond</button>
          </div>
        </div>
      </Content>
    </Container>
  );
};

export default Comment;

const Container = styled.div``;

const Content = styled.div`
  padding: 10px 0;
  color: var(--text-color);
  display: flex;
  align-items: flex-start;
  column-gap: 10px;

  .logo {
    width: 30px;
    margin-top: 2px;
    aspect-ratio: 1/1;
    background-color: var(--element-color);
    border-radius: 50%;
    overflow: hidden;
  }

  .main {
    .header {
      display: flex;
      column-gap: 10px;
      font-size: 14px;
      margin-bottom: 3px;
      font-family: var(--font-regular);

      .name {
        font-family: var(--font-semiBold);
        color: var(--title-color);
        font-weight: 700;
      }
    }

    .body {
      font-size: 16px;
      font-family: var(--font-regular);
    }

    .footer {
      display: flex;
      align-items: center;
      column-gap: 15px;
      margin-top: 5px;

      .btn {
        background: none;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 14px;
        color: var(--title-color);
        font-family: var(--font-regular);

        .icon {
          font-size: 22px;
        }
      }
    }
  }
`;
