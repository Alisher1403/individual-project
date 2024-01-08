import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Vacancy: FC = () => {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState();

  return <Container></Container>;
};

export default Vacancy;

const Container = styled.div``;
