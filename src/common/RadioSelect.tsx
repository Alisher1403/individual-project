import { FC } from "react";
import styled from "styled-components";

interface RadioSelectType {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

const RadioSelect: FC<RadioSelectType> = ({ value, options, onChange }) => {
  function handleClick(newValue: string) {
    onChange(newValue);
  }
  return (
    <Container>
      <List>
        {options.map((elem, idx) => {
          return (
            <Element
              key={idx}
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
const Element = styled.li`
  cursor: pointer;

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
  background: ${(props) => (props.$selected ? "var(--input-bg)" : "none")};
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
