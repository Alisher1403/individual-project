import { FC, useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  open: boolean;
  children?: any;
  onClose?: () => any;
  custom?: boolean;
  style?: object;
}

const Modal: FC<Props> = ({ open, children, onClose, custom, style }) => {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open);
  }, [open]);

  function close() {
    setShow(false);
    if (onClose) {
      onClose();
    }
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [show]);

  if (show) {
    return (
      <Container onClick={() => close()}>
        <Content
          data-custom={!custom}
          style={style}
          onClick={(e) => e.stopPropagation()}
        >
          <div>{children}</div>
          <button className="close" onClick={() => close()}>
            <span className="material-symbols-rounded icon">close</span>
          </button>
        </Content>
      </Container>
    );
  }
};

export default Modal;

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #35353531;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  &[data-custom="true"] {
    background: var(--element-background);
    border: 1px solid var(--border-color);
    padding: 25px 20px;
    border-radius: 7px;
    position: relative;

    .close {
      .icon {
        font-size: 18px;
      }
    }
  }

  .ui-title {
    font-size: 18px;
    color: var(--title-color);
    font-family: var(--font-semiBold);
    font-weight: normal;
  }

  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    background: none;
    display: flex;
    border: none;

    .icon {
      font-size: 35px;
    }
  }
`;
