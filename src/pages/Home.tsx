import backend from "backend";
import { FC } from "react";
import styled from "styled-components";
import { Searchbar } from "layouts";
import { home } from "constant";
import { Swiper, SwiperSlide } from "swiper/react";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import { Link } from "react-router-dom";

const Home: FC = () => {
  const { data } = backend.home();
  const content = home();

  const months = ["October 2023", "November 2023", "December 2023", "January 2024", "February 2024", "March 2024"];

  const chart = {
    data: {
      labels: months,
      datasets: [
        {
          label: "IT",
          data: [45, 39, 20, 51, 66, 35, 20],
        },
        {
          label: "Design",
          data: [48, 39, 10, 54, 64, 32, 20],
        },
        {
          label: "Finance",
          data: [88, 39, 20, 51, 66, 35, 20],
        },
        {
          label: "Marketing",
          data: [78, 59, 70, 61, 46, 55, 80],
        },
        {
          label: "Engineering",
          data: [68, 79, 60, 71, 86, 75, 50],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      tension: 0.4,
      borderWidth: 1.5,
      elements: {
        point: {
          radius: 2,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  };

  return (
    <Container className="main-container">
      <Content>
        <Searchbar />
        <main>
          <Section className="s-1">
            <ul>
              {data.categories &&
                data.categories?.map((e: any) => {
                  return (
                    <li key={e.name}>
                      <div className="content">
                        <h3>{e.name}</h3>
                        <div>{content.specialization(e)}</div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </Section>
          <Section>
            <h2>Top hiring companies</h2>
            <div className="swiper-content">
              <Swiper slidesPerView={4.5} spaceBetween={7}>
                {data.topCompanies?.map((item, index: number) => {
                  return (
                    <SwiperSlide key={index}>
                      <Link to={{ pathname: "/top-companies", search: "specialization=manufacturing" }}>
                        <div className="swiper-card">
                          <div className="card-content">
                            <h4 className="card-title">{item.name}</h4>
                            <ul className="card-list">
                              {item.companies.map((_, idx) => {
                                return (
                                  <li key={idx}>
                                    <div className="card-list-item"></div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </Section>
          <Section>
            <h2>Top specializations (jobs count)</h2>
            <div className="chart">
              <Chart type="line" data={chart.data} options={chart.options} height={Infinity} />
            </div>
          </Section>
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

const Section = styled.div`
  margin-top: 30px;

  h2 {
    font-size: 18px;
    font-family: var(--font-semiBold);
    color: var(--title-color);
    margin-bottom: 10px;
  }

  ul {
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: auto;
    gap: 10px;

    li {
      cursor: pointer;

      .content {
        height: 100%;
        width: 100%;
        background: var(--element-background);
        border: 1px solid var(--border-color);
        padding: 15px;
        border-radius: 5px;
        color: var(--text-color);
        font-size: 14px;

        h3 {
          color: var(--title-color);
          font-family: var(--font-semiBold);
          font-size: 16px;
        }
      }
    }
  }

  .swiper-content {
    .swiper-card {
      border: 1px solid var(--border-color);
      background-color: var(--element-background);
      /* height: 200px; */
      padding: 20px;
      padding-bottom: 23px;
      cursor: pointer;
      user-select: none;
      transition: 0.1s;
      color: var(--title-color);

      &:hover {
        background-color: var(--element-color);
        color: white;
      }

      .card-title {
        font-size: 16px;
        overflow: hidden;
        margin-bottom: 2px;
        font-family: var(--font-semiBold);
      }

      .card-subtitle {
        font-size: 14px;
        font-family: var(--font-regular);
        opacity: 0.85;
        margin-bottom: 20px;
      }

      .card-list {
        overflow: hidden;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        column-gap: 5px;

        li {
          .card-list-item {
            background-color: var(--element-background);
            border: 1px solid var(--border-color-light);
            border-radius: 3px;
            aspect-ratio: 1/1;
          }
        }
      }
    }
  }

  .chart {
    height: 400px;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: var(--element-background);
    border: 1px solid var(--border-color);
    padding: 30px 20px;
    border-radius: 5px;
  }
`;
