import { FC } from "react";
import styled from "styled-components";

interface Props {
  gap?: string | undefined;
  children?: any;
}

const Grid: FC<Props> = ({ gap, children }) => {
  return <Container $gap={gap}>{children}</Container>;
};

export default Grid;

const Container = styled.div<{ $gap?: string }>`
  display: grid;
  grid-auto-flow: column;
  grid-row-gap: ${(props) => props.$gap};
`;
