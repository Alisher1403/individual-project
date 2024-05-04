import React, { FC, useContext, useState } from "react";
import styled from "styled-components";
import { UIContext } from "ui";

interface Props {
  value: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
  width?: string | undefined;
  style?: React.CSSProperties;
}

const Select: FC<Props> = ({
  value,
  options,
  onChange,
  width = "auto",
  style,
}) => {
  const { id, setId } = useContext(UIContext);
  const [uid] = useState(Math.random() * 1000000 + Math.random() * 50000);
  const open = uid === id;
  const [label, setLabel] = useState(getSelected());

  function componentClick(e: React.MouseEvent) {
    e.preventDefault();
    if (!open) e.stopPropagation();
    setId(uid);
  }

  function handleClick(params: { value: string; label: string }) {
    if (onChange) {
      onChange(params.value);
    }
    setLabel(params.label);
  }

  function getSelected() {
    const returnValue = options.find((e) => e.value === value)?.label;
    return returnValue;
  }

  return (
    <Container style={style} className="select-container">
      <Content $width={width}>
        <Selected
          onClick={componentClick}
          className={`select-header ${open ? "opened" : ""}`}
        >
          <p>{label}</p>
          <Icon className={open ? "opened" : ""}>
            <span className="material-symbols-rounded select-icon">
              keyboard_arrow_down
            </span>
          </Icon>
        </Selected>
        <OptionsWrapper className={`select-body ${open ? "opened" : ""}`}>
          <List>
            {options.map((elem, idx) => {
              return (
                <li key={idx}>
                  <Option
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(elem);
                    }}
                    className={elem.value === value ? "selected" : ""}
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

export default Select;

const Container = styled.div`
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
  background: var(--element-background);
  justify-content: space-between;
  cursor: pointer;
  align-items: center;
  border: 1px solid var(--border-color-dark);
  width: 100%;
  border-radius: 5px;
  padding: 5px 10px;
  padding-right: 6px;
  height: var(--input-height);
  transition: 0.2s;
  color: var(--text-color);
  font-family: var(--text-font);
  height: 100%;

  &.opened {
    border-color: var(--element-color);
    box-shadow: 0 0 5px var(--element-color);
  }
`;

const Icon = styled.div`
  height: 100%;
  transition: var(--input-transition);
  transform: rotate(0);
  display: flex;
  align-items: center;

  span {
    color: var(--icon-color);
    font-size: 22px;
    line-height: 0;
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

const Label = styled.p`
  font-size: var(--input-font-size);
  color: var(--input-color);
`;
