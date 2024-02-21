import { FC } from "react";
import styled from "styled-components";

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
      return;
    }
    if (typeof value === "string") {
      onChange([value, newValue]);
    }
    if (value === newValue) {
      onChange(undefined);
      return;
    }
    if (Array.isArray(value)) {
      const valueExists = value.includes(newValue);

      if (valueExists) {
        const returnValue: string[] = value.filter((e) => e !== newValue);
        onChange(returnValue);
        return;
      } else {
        const returnValue: string[] = [...value, newValue];
        onChange(returnValue);
        return;
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
                <Button data-selected={activeElements(elem.value)}>
                  <span className="material-symbols-rounded filled icon">
                    {activeElements(elem.value) ? "check_box" : "check_box_outline_blank"}
                  </span>
                </Button>
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
    column-gap: 7px;
  }
`;
const Button = styled.div`
  height: 18px;
  aspect-ratio: 1/1;
  transition: 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;

  &[data-selected="true"] {
    .icon {
      color: var(--element-color);
    }
  }

  .icon {
    color: #ababac;
    font-size: 28px;
  }
`;
const Label = styled.p`
  font-size: var(--input-font-size);
`;
