import { FC, useState } from "react";
import styled from "styled-components";

interface InputType {
  value?: string | number;
  type?: "text" | "password";
  placeholder?: string;
  title?: string;
  onChange?: (param: string) => void;
}

const Input: FC<InputType> = ({ value, type, placeholder, title, onChange }) => {
  const defineType = !type ? "text" : type;

  const [focus, setFocus] = useState("");

  function handleOnChange(event: any) {
    if (onChange) {
      onChange(event.target.value);
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
          onBlur={() => setFocus("")}
        />
      </Wrapper>
    </Container>
  );
};

export default Input;

const Container = styled.div`
  padding: 5px 0;

  span {
    font-size: 12px;
    font-family: var(--font-semiBold);
    display: block;
    margin-bottom: 2px;
  }
`;

const Wrapper = styled.div`
  border: var(--border-style);
  border-radius: 7px;
  overflow: hidden;

  &.focused {
    border-color: var(--border-focus-bg);
  }

  input {
    outline: none;
    width: 100%;
    padding: 7px 10px;
    font-size: 14px;
    font-family: var(--text-font);
    border: none;
    background: none;
  }
`;
