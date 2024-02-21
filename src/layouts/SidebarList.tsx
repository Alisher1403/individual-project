import backend from "backend";
import { FC } from "react";
import styled from "styled-components";
import { useSearchParams } from "hooks";
import { formData } from "../constant/formData";

const SidebarList: FC = () => {
  const { data } = backend.vacancies();
  const searchParams = useSearchParams();
  const post = searchParams.get("post");

  if (!data) return;
  return (
    <Container>
      <List>
        {data.map((elem, index) => {
          return (
            <li key={index} data-selected={+post === elem.id}>
              <button onClick={() => searchParams.set({ post: elem.id })}>
                <div>
                  <p>{elem.title}</p>
                  <p>{formData.salary.get(elem)}</p>
                </div>
              </button>
            </li>
          );
        })}
      </List>
    </Container>
  );
};

export default SidebarList;

const Container = styled.div`
  position: relative;
`;

const List = styled.ul`
  li {
    &:hover {
      background: var(--element-background-hover);
    }

    &[data-selected="true"] {
      background: var(--element-background-hover);
      pointer-events: none;

      button {
        div {
          &::after {
            display: block;
          }
        }
      }
    }

    button {
      background: none;
      border: none;
      width: 100%;
      height: 100%;
      cursor: pointer;

      div {
        display: flex;
        padding: 15px;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        row-gap: 5px;

        &::after {
          content: "";
          height: 100%;
          display: none;
          width: 3px;
          background: var(--element-color);
          right: 0;
          top: 0;
          bottom: 0;
          position: absolute;
        }
      }
    }
  }
`;
