import { RootState } from "store";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVacancyList } from "store/reducers/vacancies";
import supabase from "backend";
import { Link } from "react-router-dom";

const Home: FC = () => {
  const vacancies = useSelector((state: RootState) => state.vacancies.list);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("vacancies")
        .select("id, title");

      if (error) {
        console.log(error);
      }
      if (data) {
        dispatch(getVacancyList(data));
        console.log(vacancies);
        console.log(data);
      }
    };

    if (vacancies == null) {
      fetchData();
    }
  }, []);

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
