import { RootState } from "store";
import { FC } from "react";
import { useSelector } from "react-redux";
import backend from "backend";
import { VacancyCard } from "components";
import styled from "styled-components";

const Home: FC = () => {
  const vacancies = useSelector((state: RootState) => state.vacancies.list);
  const loading = useSelector((state: RootState) => state.vacancies.listLoading);
  const error = useSelector((state: RootState) => state.vacancies.listError);
  backend.vacancyList(vacancies);

  return (
    <>
      <div>This is Home Page</div>
      <div className="container">
        <List>
          {vacancies
            ? vacancies?.map((el, idx) => {
                return <VacancyCard element={el} index={idx} />;
              })
            : null}
        </List>
        {loading && "Loading"}
        {error && "Error"}
      </div>
    </>
  );
};

export default Home;

const List = styled.ul`
  border-top: var(--border-style);
`;
