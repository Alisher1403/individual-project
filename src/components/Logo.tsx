import { FC } from "react";
import styled from "styled-components";

const Logo: FC = () => {
  return (
    <Container>
      <Content>
        <div className="logo-icon">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="logo-name">Constant</div>
      </Content>
    </Container>
  );
};

export default Logo;

const Container = styled.div``;

const Content = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  .logo-icon {
    display: grid;
    grid-template-columns: repeat(2, 8px);
    grid-template-rows: repeat(2, 8px);
    gap: 1.5px;
    transform: rotate(45deg);

    div {
      background: var(--element-color);
      animation: logo-icon-y 5s infinite;

      &:nth-child(1) {
        animation-delay: 5s;
      }

      &:nth-child(2) {
        animation-delay: 5.15s;
      }
      &:nth-child(3) {
        animation-delay: 5.3s;
      }
      &:nth-child(4) {
        animation-delay: 5.45s;
      }
      &:nth-child(5) {
        animation-delay: 5.6s;
      }

      @keyframes logo-icon-y {
        10% {
          transform: rotateY(180deg) rotateZ(90deg) rotateX(180deg);
        }
        100% {
          transform: rotateY(180deg) rotateZ(90deg) rotateX(180deg);
        }
      }

      @keyframes logo-icon-x {
        100% {
          transform: rotateX(180deg);
        }
      }
    }
  }

  .logo-name {
    font-family: var(--font-medium);
    font-size: 18px;
    color: var(--element-color);
  }
`;
