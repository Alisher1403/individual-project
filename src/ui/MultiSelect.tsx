import React, { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UIContext } from "ui";

interface Props {
  value: string[];
  options: { value: string | undefined; label: any }[];
  onChange?: (value: string[]) => void;
  width?: string | undefined;
  style?: React.CSSProperties;
}

const MultiSelect: FC<Props> = ({
  value: paramValue,
  options: optionsList,
  onChange,
  width = "auto",
  style,
}) => {
  const value = paramValue || [];
  const { id, setId } = useContext(UIContext);
  const [uid] = useState(Math.random() * 1000000 + Math.random() * 50000);
  const open = uid === id;
  const [options, setOptions] = useState(optionsList);
  const [inputValue, setInputValue] = useState("");
  const [selections, setSelections] = useState<
    { value: string | undefined; label: any }[]
  >([]);

  function componentClick(e: React.MouseEvent) {
    e.preventDefault();
    if (!open) e.stopPropagation();
    setId(uid);
  }

  function handleClick(params: { value: string | undefined; label: string }) {
    if (params.value) {
      const list = value.filter((e) => e !== params.value);

      const returnValue = list;

      if (!value.includes(params.value)) {
        returnValue.push(params.value);
      }

      if (onChange) {
        onChange(returnValue);
      }
    }
  }

  function deleteValue(index: number) {
    const updatedValue = [...value];
    updatedValue.splice(index, 1);

    if (onChange) {
      onChange(updatedValue);
    }
  }

  function filterOptions(text: string) {
    const returnValue = optionsList.filter((e) => {
      if (e.value?.includes(text)) {
        return e;
      }
    });

    console.log(returnValue);

    setOptions(returnValue);
  }

  function createValue() {
    setInputValue("");
    setOptions(optionsList);
    handleClick({ value: inputValue, label: inputValue });
  }

  useEffect(() => {
    const returnValue: any[] = [];

    value.forEach((e) => {
      const opt = optionsList.find((i) => i.value === e);
      if (opt) {
        returnValue.push(opt);
      } else {
        returnValue.push({ value: e, label: e });
        console.log(3);
      }
    });

    setSelections(returnValue);
  }, [value]);

  return (
    <Container style={style} className="ui-multi-select">
      <Content $width={width}>
        <Selected
          onClick={componentClick}
          className={`header ${open ? "opened" : ""}`}
        >
          <div className="selection-list">
            {selections.map((item, index) => {
              return (
                <div key={index} className="selection">
                  <div className="selection-label">{item?.label}</div>
                  <span
                    className="material-symbols-rounded selection-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteValue(index);
                    }}
                  >
                    delete
                  </span>
                </div>
              );
            })}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createValue();
            }}
          >
            <input
              name="value"
              type="text"
              className="header-input"
              value={inputValue}
              placeholder="Search for item"
              onChange={(e) => {
                e.stopPropagation();
                if (!open) {
                  setId(uid);
                }
                setInputValue(e.target.value);
                filterOptions(e.target.value);
              }}
            />
          </form>
        </Selected>
        <OptionsWrapper className={open ? "opened" : ""}>
          <List>
            {options.map((elem, idx) => {
              return (
                <li key={idx} className="option">
                  <Option
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleClick(elem);
                      setInputValue("");
                      setOptions(optionsList);
                    }}
                    onFocus={(e) => {
                      e.stopPropagation();
                    }}
                    className={value.includes(elem.value!) ? "selected" : ""}
                  >
                    <Label>{elem.label}</Label>
                  </Option>
                </li>
              );
            })}
          </List>
        </OptionsWrapper>
      </Content>
    </Container>
  );
};

export default MultiSelect;

const Container = styled.div`
  margin: var(--input-margin);

  * {
    font-size: var(--input-font-size);
  }
`;

const Content = styled.div<{ $width: string }>`
  position: relative;
  min-width: 40px;
  display: flex;
  width: ${(props) => props.$width};
`;

const Selected = styled.button`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  min-height: var(--input-height);
  background: var(--element-background);
  border: 1px solid var(--border-color-dark);
  border-radius: 5px;
  padding: 5px;
  transition: 0.2s;
  cursor: pointer;
  color: var(--text-color);

  .selection-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 7px;

    .selection {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--element-background);
      border: 1px solid var(--border-color);

      .selection-label {
        font-family: var(--font-regular);
        padding: 5px 10px;
      }

      .selection-icon {
        border-left: 1px solid var(--border-color);
        height: 100%;
        display: flex;
        align-items: center;
        background: var(--border-color);
      }
    }
  }

  &.opened {
    border-color: var(--element-color);
    box-shadow: 0 0 5px var(--element-color);
  }

  form {
    width: 100%;

    .header-input {
      border: 1px solid var(--border-color-dark);
      padding: 5px 8px;
      outline: none;
      width: 100%;
      border-radius: 5px;

      &::placeholder {
        color: var(--text-color);
        font-family: var(--font-regular);
        opacity: 0.5;
      }
    }
  }
`;

const OptionsWrapper = styled.div`
  border: var(--input-border);
  border-radius: 5px;
  padding: 2px;
  width: 100%;
  top: calc(100% + 3px);
  position: absolute;
  display: none;
  z-index: 5;
  max-height: 250px;
  overflow-y: scroll;
  background: var(--element-background);

  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    display: none;
  }

  &:-webkit-scrollbar-track {
    display: none;
  }

  &.opened {
    display: block;
    animation: open-select 0.15s forwards;

    @keyframes open-select {
      0% {
        opacity: 0;
        transform: scale(0.8) translateY(-20%);
        height: 0;
      }
      100% {
        opacity: 1;
        transform: scale(1) translateY(0);
        height: auto;
      }
    }
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
const Option = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--option-padding);
  transition: var(--input-transition);
  border-radius: 3px;
  color: var(--text-color);
  font-family: var(--text-font);

  &.selected {
    background: var(--element-color-light);

    * {
      color: white;
    }
  }
`;

const Label = styled.div`
  font-size: var(--input-font-size);
  color: var(--input-color);
`;
