import backend from "backend";
import { FC } from "react";
import styled from "styled-components";
import { Searchbar } from "layouts";
import { SwiperSlide } from "swiper/react";
import "chart.js/auto";
import { UserImage } from "components";
import { formData } from "../constant/formData";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { HomeSwiper } from "components";

const Home: FC = () => {
  const { data } = backend.home();

  if (data?.vacancies)
    return (
      <Container>
        <Content>
          <Header>
            <h1>Find your dream job</h1>
            <div className="searchbar-wrapper">
              <Searchbar pathname='/search/vacancy' />
            </div>
          </Header>
          <main>
            {data.vacancies?.specializations ? (
              <SwiperSection>
                <div className="specialization-list">
                  {data.vacancies?.specializations?.map(
                    (item: any, index: number) => {
                      return (
                        <Link
                          key={index}
                          className="specialization"
                          to={{
                            pathname: "/search/vacancy",
                            search: `text=${item.name ?? ""}&page=1`,
                          }}
                        >
                          <div
                            className="specialization-content"
                            style={{ animationDelay: index * 0.1 + "s" }}
                          >
                            <div className="body">
                              <h3 className="title">
                                <span className="title-text">
                                  {item.name ?? "Others"}
                                </span>
                                <span className="material-symbols-rounded icon">
                                  search
                                </span>
                              </h3>
                              {item?.vacancies?.[0]?.count > 0 ? (
                                <p className="text">
                                  More than {item?.vacancies?.[0]?.count}{" "}
                                  vacancies
                                </p>
                              ) : null}
                              {item?.salary?.[0]?.max > 0 ? (
                                <p className="text">
                                  Up to {item?.salary?.[0]?.max}$
                                </p>
                              ) : null}
                              {!item.name ? (
                                <p className="text">See other vacancies</p>
                              ) : null}
                            </div>
                          </div>
                        </Link>
                      );
                    }
                  )}
                </div>
              </SwiperSection>
            ) : null}
            {data.vacancies?.latestVacancies ? (
              <SwiperSection>
                <h2 className="title">Most recent jobs</h2>
                <HomeSwiper delay={5500}>
                  {data.vacancies?.latestVacancies?.map(
                    (item: any, key: number) => {
                      return (
                        <SwiperSlide key={key}>
                          <Link to={`/vacancy/${item.id}`}>
                            <div className="swiper-content">
                              <div className="body">
                                <h3 className="title">{item.title}</h3>
                                <div className="user">
                                  <div className="img">
                                    <UserImage
                                      src={item?.user?.img}
                                      alt={item?.user?.name}
                                    />
                                  </div>
                                  <p className="name">{item.user?.name}</p>
                                </div>
                                <div className="info-list">
                                  <div className="info">
                                    <span className="material-symbols-rounded icon">
                                      location_on
                                    </span>
                                    {item?.location}
                                  </div>
                                  {formData.emp_type.get(item?.emp_type) ? (
                                    <>
                                      <div className="break"></div>
                                      <div className="info">
                                        <span className="material-symbols-rounded icon">
                                          work
                                        </span>
                                        {formData.emp_type.get(item.emp_type)}
                                      </div>
                                    </>
                                  ) : null}
                                </div>
                                <div className="time-ago">
                                  {formData.timeAgo(item.created_at)}
                                </div>
                              </div>
                              <div className="salary">
                                {formData.salary.get({
                                  fromSalary: item?.fromSalary,
                                  toSalary: item?.toSalary,
                                  currency: item?.currency,
                                })}
                              </div>
                            </div>
                          </Link>
                        </SwiperSlide>
                      );
                    }
                  )}
                </HomeSwiper>
              </SwiperSection>
            ) : null}

            {/* ----------------------------------------------------------- */}

            {data.vacancies?.topCompanies ? (
              <SwiperSection>
                <h2 className="title">Top hiring companies</h2>
                <HomeSwiper delay={5000}>
                  {data.vacancies?.topCompanies?.map(
                    (item: any, key: number) => {
                      return (
                        <SwiperSlide key={key} style={{ height: "auto" }}>
                          <Link to={`/profile/${item.id}`}>
                            <div className="swiper-content centered">
                              <div className="body">
                                <div className="logo">
                                  <UserImage src={item?.img} alt={item?.name} />
                                </div>
                                <div className="user-info">
                                  <h3 className="title">{item.name}</h3>
                                </div>
                                {item?.description ? (
                                  <div className="description">
                                    <div className="description-content">
                                      {parse(item?.description)}
                                    </div>
                                  </div>
                                ) : null}
                                <button className="button">View jobs</button>
                              </div>
                            </div>
                          </Link>
                        </SwiperSlide>
                      );
                    }
                  )}
                </HomeSwiper>
              </SwiperSection>
            ) : null}


            {/* ----------------------------------------------------------- */}

            {data.vacancies?.topVacancies ? (
              <SwiperSection>
                <h2 className="title">Most applied jobs</h2>
                <HomeSwiper delay={5500}>
                  {data.vacancies?.latestVacancies?.map(
                    (item: any, key: number) => {
                      return (
                        <SwiperSlide key={key}>
                          <Link to={`/vacancy/${item.id}`}>
                            <div className="swiper-content">
                              <div className="body">
                                <h3 className="title">{item.title}</h3>
                                <div className="user">
                                  <div className="img">
                                    <UserImage
                                      src={item?.user?.img}
                                      alt={item?.user?.name}
                                    />
                                  </div>
                                  <p className="name">{item.user?.name}</p>
                                </div>
                                <div className="info-list">
                                  <div className="info">
                                    <span className="material-symbols-rounded icon">
                                      location_on
                                    </span>
                                    {item?.location}
                                  </div>
                                  {formData.emp_type.get(item?.emp_type) ? (
                                    <>
                                      <div className="break"></div>
                                      <div className="info">
                                        <span className="material-symbols-rounded icon">
                                          work
                                        </span>
                                        {formData.emp_type.get(item.emp_type)}
                                      </div>
                                    </>
                                  ) : null}
                                </div>
                                <div className="time-ago">
                                  {formData.timeAgo(item.created_at)}
                                </div>
                              </div>
                              <div className="salary">
                                {formData.salary.get({
                                  fromSalary: item?.fromSalary,
                                  toSalary: item?.toSalary,
                                  currency: item?.currency,
                                })}
                              </div>
                            </div>
                          </Link>
                        </SwiperSlide>
                      );
                    }
                  )}
                </HomeSwiper>
              </SwiperSection>
            ) : null}
          </main>
        </Content>
      </Container>
    );
};

export default Home;

const Container = styled.div`
  max-width: 1420px;
  margin: 0 auto;
  padding: 0 10px;
`;

const Content = styled.div`
  padding: 30px 0;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .searchbar-wrapper {
    margin: 0 auto;
    max-width: 600px;
    width: 100%;

    .searchbar {
      border: 1px solid var(--border-color);
      background: var(--element-background);
      border-radius: 5px;

      .searchbar-input {
        font-size: 16px;
      }
    }
  }
`;

const SwiperSection = styled.div`
  padding: 15px 0;

  .title {
    font-size: 18px;
    color: var(--title-color);
    font-family: var(--font-semiBold);
    font-weight: normal;
    margin-bottom: 10px;
    padding: 0 30px;
  }

  .specialization-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    max-width: 950px;
    padding: 0 30px;
    margin: 0 auto;
    gap: 2px;

    @media screen and (max-width: 800px) {
      grid-template-columns: repeat(3, 1fr);
      padding: 0;
    }
    @media screen and (max-width: 470px) {
      grid-template-columns: repeat(2, 1fr);
      padding: 0;
    }

    .specialization {
      display: block;

      .specialization-content {
        height: 100%;
        width: 100%;
        background: var(--element-background);
        padding: 15px;
        transition: 0.1s;
        opacity: 0;
        animation: specialization 0.2s forwards;

        @keyframes specialization {
          100% {
            opacity: 1;
          }
        }

        &:hover {
          background: var(--element-background-hover);
        }

        * {
          color: var(--text-color);
        }

        .title {
          margin-bottom: 0;
          padding: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          column-gap: 10px;

          .title-text {
            color: var(--title-color);
            font-size: 15px;
            font-family: var(--font-semiBold);
            font-weight: normal;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 100%;
          }

          .icon {
            font-size: 15px;
            color: var(--text-color);
          }
        }

        .text {
          font-family: var(--font-regular);
          font-size: 13px;
        }
      }
    }
  }
`;
