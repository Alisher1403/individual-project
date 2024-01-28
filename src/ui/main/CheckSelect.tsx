import { FC } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { icons } from "icons";

interface Props {
  value: string[] | string | undefined;
  options: { value: string | undefined; label: string }[];
  onChange: (value: string[] | undefined) => void;
}

const CheckSelect: FC<Props> = ({ value, options, onChange }) => {
  function handleClick(newValue: string | undefined) {
    if (newValue === undefined) {
      return;
    }

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

  if (!options || !Array.isArray(options)) return null;

  function activeElements(elem: string | undefined): boolean {
    if (elem && value?.includes(elem)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Container>
      <List>
        {options.map((elem, idx) => (
          <li key={idx}>
            <Element
              onClick={(e) => {
                e.preventDefault();
                handleClick(elem.value);
              }}
            >
              <div>
                <RadioBtn $selected={activeElements(elem.value)}>
                  <div className={activeElements(elem.value) ? "selected" : ""}>{parse(icons.checkmark.bold)}</div>
                </RadioBtn>
                <Label>{elem.label}</Label>
              </div>
            </Element>
          </li>
        ))}
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
  color: var(--input-color);

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
`;
