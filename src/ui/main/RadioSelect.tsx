import { FC } from "react";
import styled from "styled-components";

interface Props {
  value: string;
  options: { value: string | undefined; label: string }[];
  onChange: (value: string | undefined) => void;
}

const RadioSelect: FC<Props> = ({ value, options, onChange }) => {
  function handleClick(newValue: string | undefined) {
    onChange(newValue);
  }
  return (
    <Container>
      <List>
        {options.map((elem, idx) => {
          return (
            <li key={idx}>
              <Element
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(elem.value);
                }}
              >
                <div>
                  <RadioBtn $selected={elem.value === value}></RadioBtn>
                  <Label>{elem.label}</Label>
                </div>
              </Element>
            </li>
          );
        })}
      </List>
    </Container>
  );
};

export default RadioSelect;

const Container = styled.div``;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;
const Element = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
  color: var(--input-color);

  div {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }
`;
const RadioBtn = styled.div<{ $selected: boolean }>`
  height: 18px;
  aspect-ratio: 1/1;
  border: var(--border-style);
  border-radius: 50%;
  overflow: hidden;
  background: ${(props) => (props.$selected ? "var(--input-indicator-color)" : "none")};
  transition: 0.2s;

  div {
    padding: 2px;
    height: 100%;
    width: 100%;
    visibility: hidden;

    &.selected {
      visibility: visible;
    }

    * {
      fill: white;
    }
  }
`;
const Label = styled.p`
  font-size: var(--input-font-size);
  color: var(--input-color);
`;
