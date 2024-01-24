import { FC } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { icons } from "icons";

interface CheckSelectType {
  value: string[] | string;
  options: { value: string; label: string }[];
  onChange: (value: string[]) => void;
}

const CheckSelect: FC<CheckSelectType> = ({ value, options, onChange }) => {
  function handleClick(newValue: string) {
    if (!value) {
      onChange([newValue]);
    } else if (typeof value === "string") {
      onChange([value, newValue]);
    } else if (Array.isArray(value)) {
      const valueExists = value.includes(newValue);

      if (valueExists) {
        const returnValue: string[] = value.filter((e) => e !== newValue);
        onChange(returnValue);
      } else {
        const returnValue: string[] = [...value, newValue];
        onChange(returnValue);
      }
    }
  }

  if (!options || !Array.isArray(options)) return;

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
                  <RadioBtn $selected={value?.includes(elem.value)}>
                    <div className={value?.includes(elem.value) ? "selected" : ""}>{parse(icons.checkmark)}</div>
                  </RadioBtn>
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

export default CheckSelect;

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

  div {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }
`;
const RadioBtn = styled.div<{ $selected: boolean }>`
  height: 20px;
  aspect-ratio: 1/1;
  border: var(--border-style);
  border-radius: var(--input-radio-corner);
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
`;
