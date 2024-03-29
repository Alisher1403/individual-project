import backend from "backend";
import { FC } from "react";
import styled from "styled-components";
import { Searchbar } from "layouts";
import { Swiper, SwiperSlide } from "swiper/react";
import "chart.js/auto";

const Home: FC = () => {
  const { data } = backend.home();

  console.log(data.vacancies);

  if (data?.vacancies)
    return (
      <Container className="main-container">
        <Content>
          <Section_1>
            <h1>Find your dream job</h1>
            <Searchbar />
          </Section_1>
          <main>
            {data.vacancies?.vacanciesOfTheWeek ? (
              <SwiperSection>
                <h2 className="title">Top hiring companies</h2>
                <Swiper
                  spaceBetween={5}
                  speed={300}
                  autoplay={{ delay: 4000 }}
                  slidesPerView={5.5}
                  className="swiper"
                >
                  {data.vacancies?.vacanciesOfTheWeek?.map(
                    (item: any, key: number) => {
                      return (
                        <SwiperSlide key={key}>
                          <div className="swiper-content">
                            <h3 className="title">{item.title}</h3>
                          </div>
                        </SwiperSlide>
                      );
                    }
                  )}
                </Swiper>
              </SwiperSection>
            ) : null}
            {data.vacancies?.latestVacancies ? (
              <SwiperSection>
                <h2 className="title">Top hiring companies</h2>
                <Swiper
                  spaceBetween={5}
                  speed={300}
                  autoplay={{ delay: 4000 }}
                  slidesPerView={5.5}
                  className="swiper"
                >
                  {data.vacancies?.latestVacancies?.map(
                    (item: any, key: number) => {
                      return (
                        <SwiperSlide key={key}>
                          <div className="swiper-content">
                            <h3 className="title">{item.title}</h3>
                            <div className="user">
                              <div className="user-img"></div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    }
                  )}
                </Swiper>
              </SwiperSection>
            ) : null}
            {data.vacancies?.topCompanies ? (
              <SwiperSection>
                <h2 className="title">Top hiring companies</h2>
                <Swiper
                  spaceBetween={5}
                  speed={300}
                  autoplay={{ delay: 4000 }}
                  slidesPerView={5.5}
                  className="swiper"
                >
                  {data.vacancies?.topCompanies?.map(
                    (item: any, key: number) => {
                      return (
                        <SwiperSlide key={key}>
                          <div className="swiper-content">{item.title}</div>
                        </SwiperSlide>
                      );
                    }
                  )}
                </Swiper>
              </SwiperSection>
            ) : null}
          </main>
        </Content>
      </Container>
    );
};

export default Home;

const Container = styled.div``;

const Content = styled.div`
  padding: 30px 0;
`;

const Section_1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: 20px;
  }
`;

const SwiperSection = styled.div`
  padding: 20px 0;

  .title {
    font-size: 18px;
    color: var(--title-color);
    font-family: var(--font-semiBold);
    font-weight: normal;
    margin-bottom: 10px;
  }

  .swiper-content {
    background-color: var(--element-background);
    border: 1px solid var(--border-color);
    padding: 20px;
  }
`;
