import { FC, useEffect, useState, KeyboardEvent, ChangeEvent, useRef } from "react";
import styled from "styled-components";

interface Props {
  value?: string;
  type?: "text" | "password" | "number";
  placeholder?: string;
  title?: string;
  onBlur?: (value: string) => void;
  onPressEnter?: (value: string) => void;
}

const InputStateful: FC<Props> = ({ value = "", type, placeholder, title, onBlur, onPressEnter }) => {
  const defineType = !type || type === "number" ? "text" : type;

  const [state, setState] = useState(value);
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setState(value || "");
  }, [value]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const val = event.target.value;

    if (type === "number") {
      const defineNumbers = val.replace(/[^0-9]/g, "");
      setState(defineNumbers);
    } else {
      setState(val);
    }
  };

  const handleOnFocus = () => {
    setFocus(true);
  };

  const handleOnBlur = () => {
    setFocus(false);
    if (onBlur) onBlur(state);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (onPressEnter) onPressEnter(state);
      inputRef.current?.blur();
    }
  };

  return (
    <Container>
      {title && <span>{title}</span>}
      <Wrapper className={focus ? "focused" : ""}>
        <input
          type={defineType}
          placeholder={placeholder}
          value={state}
          ref={inputRef}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onKeyDown={handleKeyPress}
        />
      </Wrapper>
    </Container>
  );
};

export default InputStateful;

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
  border: var(--border-style);
  border-radius: 7px;
  overflow: hidden;
  transition: 0.2s;

  &.focused {
    border-color: var(--border-focus-bg);
    box-shadow: 0 0 5px var(--border-focus-bg);
  }

  input {
    outline: none;
    width: 100%;
    padding: var(--input-padding);
    font-size: 14px;
    font-family: var(--text-font);
    border: none;
    background: none;
    color: var(--text-font);

    &::placeholder {
      color: var(--text-color);
      opacity: 0.6;
    }
  }
`;
