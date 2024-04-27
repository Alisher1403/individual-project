import { FC, useState } from "react";
import styled from "styled-components";

interface Props {
  value?: string | number;
  type?: "text" | "password" | "number";
  placeholder?: string;
  title?: string;
  onChange?: (value: string) => void;
}

const Input: FC<Props> = ({ value, type, placeholder, title, onChange }) => {
  const defineType = !type || type === "number" ? "text" : type;
  if (!value) value = "";

  const [focus, setFocus] = useState("");

  function handleOnChange(event: any) {
    event.preventDefault();
    const val = event.target.value;

    if (onChange) {
      if (type === "number") {
        if (Number(val) || val.length <= 0) {
          const defineNumbers = val.replace(/[^0-9]/g, "");
          onChange(defineNumbers);
        }
      } else {
        onChange(val);
      }
    }
  }

  return (
    <Container>
      {title ? <span>{title}</span> : null}
      <Wrapper className={focus}>
        <input
          type={defineType}
          placeholder={placeholder}
          value={value}
          onChange={handleOnChange}
          onFocus={() => setFocus("focused")}
          onBlur={() => {
            setFocus("");
          }}
        />
      </Wrapper>
    </Container>
  );
};

export default Input;

const Container = styled.div`
  margin: var(--input-margin);

  span {
    font-size: 13px;
    font-family: var(--font-semiBold);
    display: block;
    margin-bottom: 2px;
  }
`;

const Wrapper = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 5px;
  overflow: hidden;
  transition: 0.2s;
  padding: var(--input-padding);
  height: var(--input-height);
  background: var(--element-background);
  display: flex;
  align-items: center;

  &.focused {
    border-color: var(--element-color);
    box-shadow: 0 0 5px var(--element-color);
  }

  input {
    outline: none;
    width: 100%;
    font-size: 14px;
    font-family: var(--font-regular);
    border: none;
    background: none;
    color: var(--text-color);

    &::placeholder {
      color: var(--text-color);
      opacity: 0.6;
    }
  }
`;
