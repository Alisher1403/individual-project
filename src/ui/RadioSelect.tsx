import { FC } from "react";
import styled from "styled-components";

interface Props {
  value: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
}

const RadioSelect: FC<Props> = ({ value, options, onChange }) => {
  function handleClick(newValue: string) {
    if (onChange) {
      onChange(newValue);
    }
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
                  <RadioBtn data-selected={elem.value === value}>
                    <span className="material-symbols-rounded icon">
                      {elem.value === value
                        ? "radio_button_checked"
                        : "radio_button_unchecked"}
                    </span>
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
    column-gap: 8px;
  }
`;
const RadioBtn = styled.div`
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
    font-size: 22px;
  }
`;
const Label = styled.p`
  font-size: var(--input-font-size);
  color: var(--input-color);
`;
