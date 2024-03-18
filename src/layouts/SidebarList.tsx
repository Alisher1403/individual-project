import backend from "backend";
import { FC } from "react";
import styled from "styled-components";
import { formData } from "../constant/formData";
import { NavLink } from "react-router-dom";

const SidebarList: FC = () => {
  const { data } = backend.vacancies();

  if (!data) return;

  return (
    <Container>
      <List>
        {data.map((elem, index) => {
          return (
            <li key={index}>
              <NavLink to={`/vacancy/${elem.id}`}>
                <div>
                  <h3>{elem.title}</h3>
                  <p>{elem.company}</p>
                  <p>{formData.salary.get(elem)}</p>
                </div>
              </NavLink>
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
  display: flex;
  flex-direction: column;
  row-gap: 7px;

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

    a {
      &[aria-current="page"] {
        div {
          border-right: 3px solid var(--element-color);
          background: var(--element-background-hover);
        }
      }

      div {
        background-color: var(--element-background);
        border: 1px solid var(--border-color);
        width: 100%;
        height: 100%;
        cursor: pointer;
        display: flex;
        padding: 15px;
        flex-direction: column;
        align-items: flex-start;
        row-gap: 5px;

        h3 {
          font-size: 15px;
          color: var(--title-color);
          line-height: 100%;
        }

        p {
          color: var(--text-color);
          font-size: 14px;
        }
      }
    }
  }
`;
