import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { supabase } from "backend";
import { useParams } from "react-router-dom";
import ResumeCard from "../../components/Resume/ResumeCard";
import VacancyCard from "../../components/Vacancy/VacancyCard";
import { useInView } from "react-intersection-observer";

const Applicants: FC = () => {
    const params = useParams();
    const id = params?.id;
    const user = useSelector((state: RootState) => state.user.data);
    const [applicants, setApplicants] = useState<any[]>();
    const [vacancy, setVacancy] = useState<any[]>();
    const resumesPerLoaad = 5;
    const [range] = useState(resumesPerLoaad);

    const [observer, inObserver] = useInView({
        triggerOnce: false,
    });

    useEffect(() => {
        if (id) {
            supabase.from('applicants').select('resume: resumes(*, user: user_metadata(*), views: resume_views(count))').eq('vacancy_id', id).order('id', { ascending: false }).range(applicants?.length || 0, range).then((res) => {
                if (res.data) {
                    setApplicants(res.data)
                }
            })

            supabase.from('vacancies').select('*, user: user_metadata(*), views: vacancy_views(count)').eq('id', id).then((res) => {
                if (res.data) {
                    setVacancy(res.data?.[0])
                }
            })
        }
    }, [])

    console.log(inObserver);

    if (!user?.id) return;

    return (
        <Container>
            <Content>
                <div className="vacancy">
                    {vacancy ? <VacancyCard element={vacancy} link hideApply={true} /> : null}
                </div>
                <div className="resume-list">
                    <h1 className="title">Applied CVs'</h1>
                    {applicants && applicants?.length > 0 ? applicants?.map((elem: any, idx: number) => {
                        return <div key={idx} className="resume"><ResumeCard element={elem?.resume} link /></div>
                    }) : <div className="error-msg">No applicants yet</div>}
                    <div className="observer" ref={observer}></div>
                </div>
            </Content>
        </Container>
    );
};

export default Applicants;

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