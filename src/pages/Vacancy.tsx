import backend from "backend";
import { FC } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { formData } from "../constant/formData";
import parse from "html-react-parser";
import { icons } from "icons";

const Vacancy: FC = () => {
  const { id } = useParams();

  if (!id) return;

  const { data, loading, error } = backend.vacancy();

  if (!data || error) return;
  const lang = "eng";
  console.log(data);

  return (
    <Container className="container">
      <h1>{loading && "Loading The Vacancy"}</h1>
      <div className="container">
        {/*  */}
        <s1.Content>
          <s1.Title>{data.title}</s1.Title>
          <s1.Text>{data.company}</s1.Text>
          <s1.Text>{data.location}</s1.Text>
          <s1.Text>
            <s1.Icon>{parse(icons.briefcase)}</s1.Icon>
            {formData.experience.get(data, lang)}
          </s1.Text>
          <s1.Text>{formData.emp_type.get(data, lang)}</s1.Text>
          <s1.Text>{formData.created_at.get(data, lang)}</s1.Text>
          <s1.Text>{formData.salary.get(data, lang)}</s1.Text>
        </s1.Content>
        {/*  */}
        <s2.Content>
          <s2.Description>{parse(data.description)}</s2.Description>
          <s2.Skills>
            {data.skills ? (
              <ul>
                {data.skills.map((item: string, index: string) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
            ) : null}
          </s2.Skills>
        </s2.Content>
      </div>
    </Container>
  );
};

export default Vacancy;

const Container = styled.div`
  color: var(--text-color);
  font-size: 17px;
`;

const s1 = {
  Content: styled.div``,
  Title: styled.h2``,
  Text: styled.div`
    display: flex;
    column-gap: 7px;
    align-items: center;
  `,
  Icon: styled.div`
    height: 20px;
    width: 20px;

    * {
      fill: var(--icon-color);
    }
  `,
};

const s2 = {
  Content: styled.div``,
  Description: styled.div``,
  Skills: styled.div``,
};
