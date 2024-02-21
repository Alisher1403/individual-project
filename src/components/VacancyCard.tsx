import { FC } from "react";
import styled from "styled-components";
import { formData } from "../constant/formData";
import { useSearchParams } from "hooks";

interface ComponentProps {
  element: any;
  index: number;
}

const VacancyCard: FC<ComponentProps> = ({ element, index }) => {
  const searchParams = useSearchParams();

  return (
    <Card
      key={element.id}
      data-id={index}
      onClick={() => searchParams.set({ post: element.id })}
      tabIndex={1}
      data-disabled={+searchParams.get("post") === element.id}
    >
      <div className="top">
        <div className="logo">
          <img src={element.logo} alt="" />
        </div>
        <div className="main">
          <h3>{element.title}</h3>
          <p>{element.company}</p>
          <p>{element.location}</p>
        </div>
        <div className="options">
          <button>
            <span className="material-symbols-rounded icon">bookmark</span>
          </button>
        </div>
      </div>
      <div className="bottom">
        <div>{formData.timeAgo(element.created_at)}</div>
      </div>
    </Card>
  );
};

export default VacancyCard;

//! =================================================================== STYLE =================================================================== !//

const Card = styled.div`
  padding: 20px;
  background: white;
  border: 1px solid var(--border-color);
  margin: 10px 0;

  .top {
    display: grid;
    grid-template-columns: 80px auto 40px;
    border-bottom: 1px solid var(--border-color-dark);
    padding-bottom: 15px;
    column-gap: 20px;

    .logo {
      aspect-ratio: 1/1;
      background: var(--element-color);
      border-radius: 7px;
    }

    .main {
      width: 100%;

      h3 {
        font-family: var(--font-bold);
        color: var(--title-color-dark);
        font-size: 20px;
        margin-bottom: 4px;
      }

      p {
        color: var(--text-color);
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
`;
