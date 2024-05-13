import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { supabase } from "backend";
import VacancyCard from "../components/Vacancy/VacancyCard";

const Saved: FC = () => {
    const user = useSelector((state: RootState) => state.user.data);
    const [vacancies, setVacancies] = useState<any[]>();

    useEffect(() => {
        if (user?.id) {
            supabase.from('vacancies').select('*, user: user_metadata(*), views: vacancy_views(count), saved: saved_vacancies!inner(id)').eq('saved.user_id', user.id).then((res) => {
                if (res.data) {
                    setVacancies(res.data)
                }
            })
        }
    }, [])

    if (!user?.id) return;

    console.log(vacancies);


    return (
        <Container>
            <Content>
                <div className="resume-list">
                    <h1 className="title">Saved Vacancies</h1>
                    {vacancies ? vacancies?.map((elem: any, idx: number) => {
                        return <div key={idx} className="resume"><VacancyCard element={elem} link /></div>
                    }) : <div className="error-msg">No saved posts yet</div>}
                </div>
            </Content>
        </Container>
    );
};

export default Saved;

const Container = styled.div`
  padding: 20px 10px;
  margin: 0 auto;
  max-width: 1000px;
  width: 100%;
`;

const Content = styled.div`
    .title{
        font-size: 20px;
    }

    .resume-list{
        .title{
            border-bottom: 1px solid var(--element-color);
            padding: 10px 0;
            margin-bottom: 20px;
        }

        .error-msg {
            margin-top: 20px;
            font-size: 18px;
        }

        .observer{
            height: 50px;
        }
    }
`