import backend from "backend";
import { FC } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { formData } from "../constant/formData";
import parse from "html-react-parser";
import { skillsIcon } from "icons";
import { appData } from "../constant/appData";

const Vacancy: FC = () => {
  const { id } = useParams();

  if (!id) return;

  const { data, error } = backend.vacancy();

  if (!data || error) return;

  return (
    <Container className="container">
      <div className="container">
        {/*  */}
        <Content>
          <s1.Content>
            <s1.Title>{data.title}</s1.Title>
            <s1.Text>{data.company}</s1.Text>
            <s1.Text>
              <span className="material-symbols-rounded">location_on</span>
              {data.location}
            </s1.Text>
            {data.experience && (
              <s1.Text>
                <span className="material-symbols-rounded">trip</span>
                {formData.experience.get(data)}
              </s1.Text>
            )}
            {data.emp_type && (
              <s1.Text>
                <span className="material-symbols-rounded">schedule</span>
                {formData.emp_type.get(data)}
              </s1.Text>
            )}
            {formData.salary.get(data) && (
              <s1.Text>
                <span className="material-symbols-rounded">paid</span>
                {formData.salary.get(data)}
              </s1.Text>
            )}
            <s1.ButtonGroup>
              <s1.Button data-apply>{appData.buttons.apply}</s1.Button>
              <s1.Button>
                <span className="material-symbols-rounded">thumb_up</span>
              </s1.Button>
              <s1.Button>
                <span className="material-symbols-rounded">thumb_down</span>
              </s1.Button>
              <s1.Button data-save>
                <span className="material-symbols-rounded">bookmark</span>
              </s1.Button>
            </s1.ButtonGroup>
          </s1.Content>
          {/*  */}
          <s2.Content>
            <s2.Img src={data.logo} />
            <s2.Title>{data.company}</s2.Title>
          </s2.Content>
          {/*  */}
          <s3.Content>
            {data.description && <s3.Description>{parse(data.description)}</s3.Description>}
            {data.skills ? (
              <s3.Div>
                <s3.Heading>{appData.titles.skillsRequired}</s3.Heading>
                <s3.List>
                  {data.skills.map((item: keyof typeof skillsIcon, index: string) => {
                    return (
                      <li key={index} data-list="skills">
                        {skillsIcon[item]?.icon ? (
                          <div className="content">
                            <div className="icon">{parse(skillsIcon[item]?.icon)}</div>
                            <p className="name">{skillsIcon[item]?.name}</p>
                          </div>
                        ) : (
                          <div className="content">
                            <p className="name">{item}</p>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </s3.List>
              </s3.Div>
            ) : null}
            <s3.Date>{formData.created_at.get(data)}</s3.Date>
          </s3.Content>
          {/*  */}
        </Content>
      </div>
    </Container>
  );
};

export default Vacancy;

const Container = styled.div`
  color: var(--text-color);
  font-size: 16px;

  .material-symbols-rounded {
    color: var(--icon-color);
  }
`;

const Content = styled.div``;

const s1 = {
  Content: styled.div`
    background-color: #e7eaf1;
    padding: 25px;
    border-radius: 15px;
  `,
  Title: styled.h2``,
  Text: styled.div`
    display: flex;
    column-gap: 3px;
    align-items: center;
  `,
  ButtonGroup: styled.div`
    display: flex;
    column-gap: 5px;
  `,
  Button: styled.button`
    font-family: var(--font-regular);
    text-transform: capitalize;
    padding: 7px;
    font-size: 15px;
    border-radius: 7px;
    border: var(--border-style);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

    .material-symbols-rounded {
      font-size: 21px;
    }

    &[data-apply] {
      width: 100%;
      max-width: 300px;
      font-size: 17px;
    }

    &[data-save] {
      .material-symbols-rounded {
        font-size: 25px;
      }
    }
  `,
};

const s2 = {
  Content: styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
    background-color: #e7eaf1;
    border-radius: 15px;
  `,
  Title: styled.h3`
    font-size: 23px;
    font-family: var(--font-regular);
    font-weight: normal;
    text-align: center;
  `,
  Img: styled.img`
    width: 50px;
    aspect-ratio: 1/1;
    border: var(--border-style);
    object-fit: cover;
    border-radius: 50%;
  `,
  List: styled.ul``,
};

const s3 = {
  Content: styled.div``,
  Description: styled.div``,
  Div: styled.div`
    padding: 10px 0;
  `,
  Heading: styled.h3`
    text-transform: capitalize;
    margin-bottom: 10px;
  `,
  List: styled.ul`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    li {
      .content {
        display: flex;
        align-items: center;
        background: white;
        height: 40px;
        padding: 7px;
        border-radius: 8px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.055), 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.024);

        .icon {
          height: 100%;
          aspect-ratio: 1/1;
          border-radius: 5px;
          overflow: hidden;

          svg {
            height: 100%;
            width: 100%;
          }
        }

        .name {
          padding: 0 5px;
          font-size: 18px;
        }
      }
    }
  `,
  Date: styled.div`
    color: #a8a8a8;
  `,
  text: styled.div`
    display: flex;
    column-gap: 3px;
    align-items: center;
  `,
};
