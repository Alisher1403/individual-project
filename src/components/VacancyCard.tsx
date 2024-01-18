import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { currencySymbol } from "../constants";
import { icons } from "icons";
import parse from "html-react-parser";

interface ComponentProps {
  element: any;
  index: number;
}

const VacancyCard: FC<ComponentProps> = ({ element, index }) => {
  const navigate = useNavigate();

  const handleSaveButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/profile/${element.userId}`);
  };

  return (
    <Link to={{ pathname: `/vacancy/${element.id}` }}>
      <Card key={element.id} data-id={index}>
        <Top>
          <Title>{element.title}</Title>
          <SaveButton onClick={handleSaveButtonClick} title="Save">
            {parse(icons["bookmark"])}
          </SaveButton>
        </Top>

        <div className="inline">
          <Center className="inline prevent-btn" onClick={handleProfileClick}>
            {element.logo && <Logo src={element.logo} />}
            <div>
              <Company>{element.company}</Company>
              &nbsp;&nbsp;<span>─</span>&nbsp;&nbsp;
              <Location>{element.location}</Location>
            </div>
          </Center>
          &nbsp;&nbsp;
          {element.remote && <Remote>remote</Remote>}
        </div>

        {getExperience(element)}
        {element.subtitle && <Subtitle>{element.subtitle}</Subtitle>}
        {Salary(element)}
        <CreatedAt>{getTimeStamp(element.created_at)}</CreatedAt>
      </Card>
    </Link>
  );
};

export default VacancyCard;

//* =============================================================== MAIN COMPONENT END =============================================================== *//

//* =================================================================== EXPERIENCE =================================================================== *//

function getExperience(element: any) {
  const experience = element.experience;

  function defineExperience() {
    switch (experience) {
      case "0":
        return "Without experience";
      case "1-3":
        return <Experience>From 1 to 3 years</Experience>;
      case "3-6":
        return <Experience>From 3 to 6 years</Experience>;
      case "6":
        return <Experience>More than 6 years</Experience>;
      default:
        return "";
    }
  }
  if (!experience || experience === "") return;
  return (
    <ExperienceContent className="inline">
      <div className="vc-icon">{parse(icons["briefcase"])}</div> &nbsp;
      {defineExperience()}
    </ExperienceContent>
  );
}

//* =============================================================== EXPERIENCE END =============================================================== *//

//* =================================================================== SALARY =================================================================== *//

function Salary(element: any) {
  const from = element.fromSalary;
  const to = element.toSalary;
  const currency = element.currency;

  function defineSalary() {
    if (from === 0 && to === 0) {
      return <span>Free</span>;
    }

    if (from === 0 && +to > 0) {
      return (
        <>
          <FromSalary>Up to</FromSalary> &nbsp;
          <ToSalary>{`${to} ${currencySymbol[currency]}`}</ToSalary>
        </>
      );
    }

    if (+from > 0 && to === 0 && to !== -1) {
      return (
        <>
          <FromSalary>From</FromSalary> &nbsp;
          <ToSalary>{`${from} ${currencySymbol[currency]}`}</ToSalary>
        </>
      );
    }

    if (from !== 0 && to !== 0 && from !== to) {
      return (
        <>
          <FromSalary>{`${from} ${currencySymbol[currency]}`}</FromSalary>
          &nbsp;&nbsp;─&nbsp;&nbsp;
          <ToSalary>{`${to} ${currencySymbol[currency]}`}</ToSalary>
        </>
      );
    }

    if (from === to) {
      return <ToSalary>{`${to} ${currencySymbol[currency]}`}</ToSalary>;
    }
  }

  if (from === -1) return null;

  return (
    <SalaryContent className="inline">
      <div className="vc-icon">{parse(icons["coin"])}</div>&nbsp;
      {defineSalary()}
    </SalaryContent>
  );
}

//* =================================================================== SALARY END =================================================================== *//

function getTimeStamp(time: string): string {
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  function addZero(num: number): string | number {
    if (num < 10) return "0" + num;
    return num;
  }

  const timeString = `${addZero(day)}.${addZero(month)}.${year} - ${addZero(hour)}:${addZero(minute)}`;

  return timeString;
}

//* =================================================================== SALARY END =================================================================== *//

//! =================================================================== STYLE =================================================================== !//

const Card = styled.div`
  padding: 20px;
  border: var(--border-style);
  font-family: var(--text-font);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 10px;
  border-radius: 15px;

  &:hover {
    background: var(--card-hover-bg);
  }

  * {
    color: var(--text-color);
    font-size: var(--text-size);
  }

  .vc-icon {
    height: 25px;
    aspect-ratio: 1/1;
    fill: var(--icon-bg);
  }
`;

const Top = styled.div`
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

const Center = styled.button`
  display: inline-flex;

  &:hover {
    text-decoration: underline;
  }
`;
const Logo = styled.img`
  height: 25px;
  aspect-ratio: 1/1;
  object-fit: cover;
  margin-right: 7px;
`;
const Company = styled.span`
  color: var(--text-color);
  font-family: var(--title-font);
`;
const Location = styled.span`
  color: var(--text-color);
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

const ExperienceContent = styled.div`
  font-family: var(--text-font);
  font-size: var(--text-size);
`;

const Experience = styled.span``;
const ToExperience = styled.span``;

const Subtitle = styled.span``;

const SalaryContent = styled.div`
  font-family: var(--font-semiBold);
  color: var(--text-color-light);
  display: flex;
  align-items: center;

  * {
    font-size: 20px;
    color: var(--text-color-light);
  }
`;
const FromSalary = styled.span``;
const ToSalary = styled.span``;

const CreatedAt = styled.p`
  font-family: var(--text-font);
  font-size: 14px;
  margin-top: 10px;
  color: #969696cc;
`;
