import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { icons } from "icons";
import parse from "html-react-parser";
import { getExperience, getSalary, getTimeStamp } from "utils";

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

        <Experience className="inline">
          <div className="vc-icon">{parse(icons["briefcase"])}</div> &nbsp;
          {getExperience(element.experience)}
        </Experience>
        {element.subtitle && <Subtitle>{element.subtitle}</Subtitle>}
        <Salary>{getSalary(element)}</Salary>
        <CreatedAt>{getTimeStamp(element.created_at)}</CreatedAt>
      </Card>
    </Link>
  );
};

export default VacancyCard;

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

const Experience = styled.div`
  font-family: var(--text-font);
  font-size: var(--text-size);
`;

const Subtitle = styled.span``;

const Salary = styled.div`
  font-family: var(--font-semiBold);
  color: var(--text-color-light);
  display: flex;
  align-items: center;

  * {
    font-size: 20px;
    color: var(--text-color-light);
  }
`;

const CreatedAt = styled.p`
  font-family: var(--text-font);
  font-size: 14px;
  margin-top: 10px;
  color: #969696cc;
`;
