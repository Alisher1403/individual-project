import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Searchbar: FC = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const text = searchParams.get("text");
  const [value, setValue] = useState<string>(text ? text : "");
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function search(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearchParams({ text: value, page: "1" });
  }

  useEffect(() => {
    if (text) {
      setValue(text);
    } else {
      setValue("");
    }
    inputRef.current?.blur();
  }, [text]);

  if (!location.pathname.includes("search")) return;

  return (
    <Container className="container mt">
      <Top>
        <form onSubmit={(e) => search(e)}>
          <InputWrapper className={focus ? "focused" : ""}>
            <Input
              type="text"
              value={value}
              ref={inputRef}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search for items..."
            />
            <SearchBtn type="submit">Search</SearchBtn>
          </InputWrapper>
        </form>
      </Top>
    </Container>
  );
};

export default Searchbar;

const Container = styled.div``;

const Top = styled.div``;

const InputWrapper = styled.div`
  border: var(--border-style);
  border-color: auto;
  display: flex;
  align-items: center;
  transition: 0.1s;
  border-radius: 50px;
  overflow: hidden;
  height: 40px;
  padding: 2px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.055), 0 8px 16px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.024);

  &.focused {
    border-color: var(--border-focus-bg);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.055), 0 8px 16px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.024);
  }
`;

const Input = styled.input`
  font-family: var(--text-font);
  color: var(--font-semiBold);
  font-size: 18px;
  padding: 0 17px;
  height: 100%;
  border: none;
  outline: none;
  width: 100%;
  background: transparent;
`;

const SearchBtn = styled.button`
  height: 100%;
  border-radius: 50px;
  cursor: pointer;
  background: var(--button-bg);
  color: white;
  border: none;
  padding: 0 12px;
  font-family: var(--text-font);
  font-size: 16px;
`;
