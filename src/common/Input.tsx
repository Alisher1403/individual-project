import { FC } from "react";
import styled from "styled-components";

interface InputType {
  value?: string | number;
  type?: "text" | "password";
  onChange?: any;
}

const Input: FC<InputType> = ({ value, type, onChange }) => {
  return (
    <Wrapper>
      <input type={!type ? "text" : type} value={value} onChange={(e) => onChange && onChange(e)} />
    </Wrapper>
  );
};

export default Input;

const Wrapper = styled.div`
  border: var(--border-style);
`;
