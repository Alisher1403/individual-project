import { RootState } from "store";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { backend } from "store";

const Home: FC = () => {
  const vacancies = useSelector((state: RootState) => state.vacancies.list);
  backend.vacancyList(0, 10);

  return (
    <>
      <div>This is Home Page</div>
      <ul>
        {vacancies
          ? vacancies?.map((el, idx) => {
              return (
                <li key={idx}>
                  <Link to={`vacancy/${el.id}`}>{el.title}</Link>
                </li>
              );
            })
          : null}
      </ul>
    </>
  );
};

export default Home;
