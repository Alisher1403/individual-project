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
        } else {
          dispatch(vacancyData({ key: id, data: data[0] }));
          dispatch(vacancyLoading(false));
        }
      } catch (error) {
        dispatch(vacancyError(true));
      }
    };

    if (!element) {
      fetchData();
    }
  }, []);

  /*******************************/

  if (!element || error) return;

  /*******************************/

  return (
    <Container className="container">
      <h1>{loading && "Loading The Vacancy"}</h1>
      <div className="">{JSON.stringify(element)}</div>
      <div className="container">
        {/*  */}
        <s1.Content>
          <s1.Title>{element.title}</s1.Title>
          <s1.Company>{element.company}</s1.Company>
          <s1.Location>{element.location}</s1.Location>
        </s1.Content>
        {/*  */}
      </div>
    </Container>
  );
};

export default Vacancy;

const Container = styled.div``;

const s1 = {
  Content: styled.div``,
  Title: styled.h1``,
  Company: styled.p``,
  Location: styled.p``,
};
