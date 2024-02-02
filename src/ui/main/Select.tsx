import { icons } from "icons";
import React, { FC, useContext, useState } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { UIContext } from "ui";

interface Props {
  value: string;
  options: { value: string | undefined; label: string }[];
  onChange: (value: string | undefined) => void;
  width?: string | undefined;
  style?: React.CSSProperties;
}

const Select: FC<Props> = ({ value, options, onChange, width = "auto", style }) => {
  const { id, setId } = useContext(UIContext);
  const [uid] = useState(Math.random() * 1000000 + Math.random() * 50000);
  const open = uid === id;
  const [label, setLabel] = useState(getSelected());

  function componentClick(e: React.MouseEvent) {
    e.preventDefault();
    if (!open) e.stopPropagation();
    setId(uid);
  }

  function handleClick(params: { value: string | undefined; label: string }) {
    onChange(params.value);
    setLabel(params.label);
  }

  function getSelected() {
    const returnValue = options.find((e) => e.value === value)?.label;
    return returnValue;
  }

  return (
    <Container style={style}>
      <Content $width={width}>
        <Selected onClick={componentClick} className={open ? "opened" : ""}>
          <p>{label}</p>
          <Icon className={open ? "opened" : ""}>{parse(icons["arrowBottom"])}</Icon>
        </Selected>
        <OptionsWrapper className={open ? "opened" : ""}>
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
  margin: var(--input-margin);

  * {
    font-family: var(--text-font);
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
  display: flex;
  background: none;
  column-gap: 5px;
  justify-content: space-between;
  cursor: pointer;
  align-items: center;
  border: var(--input-border);
  width: 100%;
  border-radius: var(--input-border-radius);
  padding: var(--input-padding);
  height: var(--input-height);
  background: var(--input-bg);
  transition: var(--input-transition);
  color: var(--input-color);

  &.opened {
    border-color: var(--border-focus-bg);
    box-shadow: 0 0 5px var(--border-focus-bg);
  }
`;

const Icon = styled.div`
  height: var(--input-icon-size);
  transition: var(--input-transition);
  transform: rotate(0);

  * {
    fill: var(--input-icon-color);
  }
`;

const OptionsWrapper = styled.div`
  border: var(--input-border);
  border-radius: var(--input-border-radius);
  padding: var(--option-wrapper-padding);
  width: 100%;
  top: calc(100% + 3px);
  position: absolute;
  display: none;
  background: var(--input-bg);
  z-index: 5;
  background: var(--input-bg);

  &.opened {
    display: block;
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
  padding: var(--option-padding);
  transition: var(--input-transition);
  border-radius: var(--option-border-radius);
  color: var(--input-color);

  &.selected {
    background: var(--option-selected-bg);
  }

  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Label = styled.p`
  font-size: var(--input-font-size);
  color: var(--input-color);
`;
