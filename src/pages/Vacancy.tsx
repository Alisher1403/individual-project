import backend from "backend";
import { FC } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Vacancy: FC = () => {
  const { id } = useParams();

  if (!id) return;

  const { data, loading, error } = backend.vacancy();

  if (!data || error) return;

  return (
    <Container className="container">
      <h1>{loading && "Loading The Vacancy"}</h1>
      <div className="">{JSON.stringify(data)}</div>
      <div className="container">
        {/*  */}
        <s1.Content>
          <s1.Title>{data.title}</s1.Title>
          <s1.Company>{data.company}</s1.Company>
          <s1.Location>{data.location}</s1.Location>
        </s1.Content>
        {/*  */}
      </div>
    </Container>
  );
};

export default Vacancy;

const Container = styled.div``;

const s1 = {
  Content: styled.div``,
  Title: styled.h1``,
  Company: styled.p``,
  Location: styled.p``,
};
