import supabase from "backend";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "store";
import { vacancyLoading, vacancyError, vacancyData } from "store/reducers/vacancy";
import styled from "styled-components";

const Vacancy: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  if (!id) return;

  const element = useSelector((state: RootState) => state.vacancy.element.data[id]);
  const { loading, error } = useSelector((state: RootState) => state.vacancy.element);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(vacancyLoading(true));

      try {
        const { data, error } = await supabase.from("vacancies").select("*").eq("id", id);
        if (error) {
          throw error;
        }

        dispatch(vacancyData({ key: id, data: data }));
        dispatch(vacancyLoading(false));
      } catch (error) {
        dispatch(vacancyError(true));
      }
    };

    if (!element) {
      fetchData();
    }
  }, []);

  /*******************************/

  if (!element && error) return;

  /*******************************/

  return (
    <Container className="container">
      <h1>{loading && "Loading The Vacancy"}</h1>
      <div className="">{JSON.stringify(element)}</div>
    </Container>
  );
};

export default Vacancy;

const Container = styled.div``;
