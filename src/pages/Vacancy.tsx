import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import VacancyList from "./VacancyList";
import VacancyPost from "./VacancyPost";

const Vacancy: FC = () => {
  const [searchParams] = useSearchParams();
  const post = searchParams.get("vacancy_post");

  const getContent = () => {
    if (post) {
      return <VacancyPost />;
    } else {
      return <VacancyList />;
    }
  };
  return <div>{getContent()}</div>;
};

export default Vacancy;
