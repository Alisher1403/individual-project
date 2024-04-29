import { FC } from "react";
import styled from "styled-components";
import backend from "backend";

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

  const listLength = 10;

  return (
    <Container>
      <SearchInputWrapper>
        <SearchInput data-focused={focus} className="searchbar">
          <FocusBg data-focus={focus} onClick={() => setFocus(false)} />
          <Top>
            <form onSubmit={(e) => search(value, e)}>
              <input
                name="text"
                type="text"
                value={value}
                ref={inputRef}
                className="searchbar-input"
                onFocus={() => setFocus(true)}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search for items..."
              />
              <div
                className="icon"
                data-visible={value.length !== 0}
                onClick={(e) => clearInput(e)}
              >
                <span className="material-symbols-rounded">close</span>
              </div>
            </form>
          </Top>
          {searchedItems && Array.isArray(searchedItems) ? (
            <SearchList data-focus={focus} $height={searchListHeight}>
              <Line
                data-focus={
                  searchedItems && Array.isArray(searchedItems) && focus
                }
              />
              <ul ref={listRef}>
                {searchedItems.slice(0, listLength)?.map((elem, idx) => {
                  return (
                    <li key={idx}>
                      <SearchItems onClick={() => search(elem)}>
                        <div className="content">
                          <div className="left">
                            <div className="icon">
                              <span className="material-symbols-rounded">
                                history
                              </span>
                            </div>
                            <p>
                              <b>{elem.slice(0, value.length)}</b>
                              {elem.slice(value.length)}
                            </p>
                          </div>
                          <div
                            className="right"
                            onClick={(e) => searchHistory.delete(elem, e)}
                          >
                            {elem ? (
                              <div className="icon">
                                <span className="material-symbols-rounded">
                                  close
                                </span>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </SearchItems>
                    </li>
                  );
                })}
                {value.length > 0 &&
                  searchList
                    ?.slice(0, listLength - searchedItems.length)
                    ?.map((elem, idx) => {
                      if (!searchedItems.includes(elem.toLowerCase())) {
                        return (
                          <li key={idx}>
                            <SearchItems onClick={() => search(elem)}>
                              <div className="content">
                                <div className="left">
                                  <div className="icon">
                                    <span className="material-symbols-rounded">
                                      search
                                    </span>
                                  </div>
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
        </SearchInput>
      </SearchInputWrapper>
    </Container>
  );
};

export default Searchbar;

const Container = styled.div``;

const SearchInputWrapper = styled.div`
  z-index: 100;
  height: 40px;
  width: 100%;
  position: relative;
`;

const SearchInput = styled.div`
  overflow: hidden;
  background: var(--content-background);
  border-bottom: 1px solid var(--border-color);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Top = styled.div`
  padding-left: 5px;
  padding-right: 10px;

  form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: 0.3s;

    input {
      font-family: var(--font-regular);
      color: var(--text-color);
      font-size: 16px;
      padding: 6px 6px;
      border: none;
      outline: none;
      width: 100%;
      background: transparent;
    }

    .icon {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      visibility: collapse;
      opacity: 0;
      transition: 0.2s;
      transform: rotate(90deg);

      span {
        font-size: 18px;
      }

      &[data-visible="true"] {
        visibility: visible;
        opacity: 1;
        transform: rotate(0deg);
      }
    }
  }
`;

const FocusBg = styled.div`
  position: fixed;
  z-index: -1;
  background-color: #0000001f;
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
  font-size: 15px;
  width: 100%;

  &:hover {
    background: #a9a9a94a;
  }

  .content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;

      span {
        font-size: 20px;
      }
    }
  }

  .left {
    display: flex;
    align-items: center;
    column-gap: 5px;
  }

  .right {
    cursor: pointer;
    border-radius: 50%;
    height: 21px;
    width: 21px;
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background: #94949470;
    }
  }
`;
