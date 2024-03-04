import { FC, useContext, useState } from "react";
import styled from "styled-components";
import { UIContext } from "ui";

interface Props {
  options: { icon: string; label: string; onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void }[];
}

const Options: FC<Props> = ({ options }) => {
  const { id, setId } = useContext(UIContext);
  const [uid] = useState(Math.random() * 1000000 + Math.random() * 50000);
  const open = uid === id;

  return (
    <Container>
      <Content>
        <div className="options-wrapper">
          <button
            className="options-button"
            onClick={(e) => {
              e.stopPropagation();
              !open ? setId(uid) : setId(0);
            }}
          >
            <span className="material-symbols-rounded icon">more_vert</span>
          </button>
          {open ? (
            <div className="options-list-wrapper">
              <div className="options-list">
                {options?.map((item, index) => {
                  return (
                    <button className="option" key={index} onClick={item.onClick}>
                      <span className="material-symbols-rounded icon">{item.icon}</span> {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </Content>
    </Container>
  );
};

export default Options;

const Container = styled.div``;
const Content = styled.div`
  .options-wrapper {
    position: relative;

    .options-button {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;

      .icon {
        font-size: 25px;
        color: var(--icon-color-dark);
      }
    }

    .options-list-wrapper {
      background: var(--element-background);
      border: 1px solid var(--border-color);
      border-radius: 5px;
      position: absolute;
      right: 0;

      .options-list {
        padding: 6px 0;

        .option {
          width: 100%;
          text-align: left;
          padding: 4px 7px;
          padding-right: 15px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          column-gap: 5px;
          font-family: var(--font-regular);
          color: var(--text-color);
          font-size: 14px;

          &:hover {
            background: var(--element-background-hover);
          }

          .icon {
            font-size: 22px;
            color: var(--icon-color);
          }
        }
      }
    }
  }
`;
