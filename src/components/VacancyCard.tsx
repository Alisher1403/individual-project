import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { currencySymbol } from "../constants";
import { icons } from "icons";
import parse from "html-react-parser";

interface MyComponentProps {
  element: any;
  index: number;
}

const VacancyCard: FC<MyComponentProps> = ({ element, index }) => {
  return (
    <Link to={{ pathname: `/vacancy/${element.id}` }}>
      <Card key={element.id} data-id={index}>
        <Left>
          <LeftTop>
            <Title>{element.title}</Title>
            <SaveButton onClick={(e) => e.preventDefault()} title="Save">
              {parse(icons["bookmark"])}
            </SaveButton>
          </LeftTop>
          <div className="inline">
            <div className="inline">
              {element.logo && <Logo src={element.logo} />}
              <Company>{element.company}</Company>
            </div>
            &nbsp;&nbsp;─&nbsp;&nbsp;
            <Location>{element.location}</Location>
            &nbsp;
            {element.remote ? <Remote>remote</Remote> : null}
          </div>
          <Subtitle>{element.subtitle}</Subtitle>
          <Salary>
            {element.fromSalary ? (
              <>
                <FromSalary>{element.fromSalary + currencySymbol[element.currency]}</FromSalary>
                {element.toSalary && (
                  <>
                    &nbsp;&nbsp;─&nbsp;&nbsp;
                    <ToSalary>{element.toSalary + currencySymbol[element.currency]}</ToSalary>
                  </>
                )}
              </>
            ) : null}
          </Salary>
        </Left>
        {/*  */}
      </Card>
    </Link>
  );
};

export default VacancyCard;

//! ***** STYLE ***** !//

const Card = styled.div`
  padding: 20px 10px;
  border-bottom: var(--border-style);
  border-radius: var(--border-radius);
  font-family: var(--text-font);
  display: flex;
  align-items: center;

  &:hover {
    background: var(--card-hover-bg);
  }

  * {
    color: var(--text-color);
    font-size: var(--text-size);
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
`;

const LeftTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SaveButton = styled.button`
  height: 28px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;

  &:hover {
    * {
      fill: var(--icon-bg);
    }
  }

  * {
    height: 100%;
    width: 100%;
    fill: none;
    stroke: var(--icon-bg);
    stroke-width: 2.5px;
  }
`;

const Title = styled.h3`
  font-size: var(--h3-size);
  color: var(--title-color);
  font-family: var(--title-font);
`;

const Logo = styled.img`
  height: 25px;
  aspect-ratio: 1/1;
  object-fit: cover;
  margin-right: 7px;
`;
const Company = styled.span`
  color: var(--texet-color-dark);
  font-family: var(--title-font);
`;
const Location = styled.span`
  color: var(--texet-color-dark);
  font-family: var(--title-font);
`;

const Remote = styled.div`
  background: var(--icon-bg);
  border-radius: 30px;
  font-size: 12px;
  color: white;
  font-family: var(--span-font);
  padding: 0 5px;
`;

const Subtitle = styled.span``;

const Salary = styled.div`
  font-family: var(--font-semiBold);
  color: var(--text-color-light);
  display: flex;
  align-items: center;
`;
const FromSalary = styled.span`
  font-size: 20px;
  color: var(--text-color-light);
`;
const ToSalary = styled.span`
  font-size: 20px;
  color: var(--text-color-light);
`;
