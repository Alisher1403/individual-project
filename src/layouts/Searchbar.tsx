import { FC } from "react";
import styled from "styled-components";
import backend from "backend";
import parse from "html-react-parser";
import { icons } from "icons";

const Searchbar: FC = () => {
  const {
    value,
    setValue,
    focus,
    setFocus,
    search,
    searchList,
    inputRef,
    searchedItems,
    listRef,
    searchHistory,
    searchListHeight,
    clearInput,
  } = backend.searchbar();

  if (!location.pathname.includes("search")) return;

  const listLength = 10;

  return (
    <Container className="container">
      <SearchInputWrapper>
        <SearchInput className={focus ? "focused" : ""}>
          <FocusBg data-focus={focus} onClick={() => setFocus(false)} />
          <Top>
            <form onSubmit={(e) => search(value, e)}>
              <InputWrapper>
                <div className="left">
                  <Input
                    name="text"
                    type="text"
                    value={value}
                    ref={inputRef}
                    onFocus={() => setFocus(true)}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search for items..."
                  />
                </div>
                <div className="right">
                  <button className="icon" data-visible={value.length !== 0} onClick={() => clearInput()}>
                    {parse(icons.cross.light)}
                  </button>
                  <SearchBtn type="submit">Search</SearchBtn>
                </div>
              </InputWrapper>
            </form>
            <Line data-focus={searchedItems && Array.isArray(searchedItems) && focus} />
            {searchedItems && Array.isArray(searchedItems) ? (
              <SearchList data-focus={focus} $height={searchListHeight}>
                <ul ref={listRef}>
                  {searchedItems.slice(0, listLength)?.map((elem, idx) => {
                    return (
                      <li key={idx}>
                        <SearchItems onClick={() => search(elem)}>
                          <div className="content">
                            <div className="left">
                              <div className="icon">{parse(icons.history.light)}</div>
                              <p>
                                <b>{elem.slice(0, value.length)}</b>
                                {elem.slice(value.length)}
                              </p>
                            </div>
                            <div className="right" onClick={(e) => searchHistory.delete(elem, e)}>
                              {elem ? <div className="icon">{parse(icons.cross.light)}</div> : null}
                            </div>
                          </div>
                        </SearchItems>
                      </li>
                    );
                  })}
                  {searchList?.slice(0, listLength - searchedItems.length)?.map((elem, idx) => {
                    if (!searchedItems.includes(elem)) {
                      return (
                        <li key={idx}>
                          <SearchItems onClick={() => search(elem)}>
                            <div className="content">
                              <div className="left">
                                <div className="icon">{parse(icons.search.light)}</div>
                                <p>
                                  <b>{elem.slice(0, value.length)}</b>
                                  {elem.slice(value.length)}
                                </p>
                              </div>
                            </div>
                          </SearchItems>
                        </li>
                      );
                    }
                  })}
                </ul>
              </SearchList>
            ) : null}
          </Top>
        </SearchInput>
      </SearchInputWrapper>
    </Container>
  );
};

export default Searchbar;

const Container = styled.div`
  .icon {
    * {
      stroke: var(--icon-bg);
    }
  }
`;

const SearchInputWrapper = styled.div`
  height: 45px;
  margin: 20px 0;
  z-index: 1000;
  max-width: 710px;
  position: relative;
`;

const SearchInput = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.055), 0 8px 16px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.024);
  background: white;

  &.focused {
    border-color: var(--border-focus-bg);
    box-shadow: 0 2px 20px var(--border-focus-bg);
  }
`;

const Top = styled.div``;

const FocusBg = styled.div`
  position: fixed;
  z-index: -1;
  background-color: #0000001e;
  transition: 0.2s;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  visibility: collapse;
  opacity: 0;

  &[data-focus="true"] {
    visibility: visible;
    animation: opacity 1s forwards;
    opacity: 1;
  }
`;

const InputWrapper = styled.div`
  /* border: var(--border-style); */
  border-color: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.1s;
  overflow: hidden;
  height: 45px;
  margin: 0 auto;
  transition: 0.3s;

  .left {
    width: 100%;
  }

  .right {
    display: flex;
    align-items: center;

    .icon {
      height: 20px;
      width: 20px;
      background: none;
      border: none;
      display: none;
      cursor: pointer;

      &[data-visible="true"] {
        display: block;
      }
    }
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
  cursor: pointer;
  background: transparent;
  color: var(--text-color);
  border: none;
  padding: 0 12px;
  font-family: var(--text-font);
  font-size: 16px;
`;

const Line = styled.div`
  margin: 0 auto;
  width: calc(100% - 18px);
  height: 0.5px;
  background: var(--border-color-light);
  opacity: 0;
  transition: 0.5s;

  &[data-focus="true"] {
    opacity: 1;
  }
`;

const SearchList = styled.div<{ $height: number | undefined }>`
  width: 100%;
  visibility: collapse;
  height: 0;
  overflow: hidden;
  transition: 0.3s cubic-bezier(0, 0.46, 0.58, 1);

  &[data-focus="true"] {
    visibility: visible;
    transition: all 0.3s cubic-bezier(0, 0.46, 0.58, 1);
    height: ${(props) => props.$height + "px"};
  }
`;

const SearchItems = styled.button`
  background: none;
  border: none;
  padding: 10px 12px;
  font-family: var(--text-font);
  color: var(--text-color);
  font-size: 16px;
  width: 100%;

  &:hover {
    background: #a9a9a94a;
  }

  .content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .left {
    display: flex;
    align-items: center;
    column-gap: 7px;

    .icon {
      height: 18px;
      width: 18px;
    }
  }

  .right {
    cursor: pointer;
    border-radius: 50%;
    height: 22px;
    width: 22px;
    padding: 2px;

    &:hover {
      background: #7e7e7e71;
    }

    .icon {
      height: 100%;
      width: 100%;
    }
  }
`;
