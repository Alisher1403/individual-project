import { FC } from "react";
import { VacancyCard } from "components";
import backend from "backend";
import styled from "styled-components";
import Filter from "../layouts/Filter";
import Searchbar from "../layouts/Searchbar";
import useSearchParams from "../hooks/useSearchParams";
import { Swiper, SwiperSlide } from "swiper/react";

const VacancyList: FC = () => {
  const searchParams = useSearchParams();
  const { data, count, loading, error, pagination, searchList } =
    backend.vacancies();

  return (
    <Container className="main-container">
      <div className="searchbar-wrapper">
        <Searchbar />
      </div>
      <div className="top-content">
        <div className="count">
          <span className="material-symbols-rounded icon">search</span>{" "}
          {count ?? 0} vacancies found
        </div>
        <div className="search-list">
          <Swiper slidesPerView={"auto"} freeMode spaceBetween={7}>
            {searchList.similar.map((e, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <button
                    className="search custom-btn secondary"
                    onClick={() => searchParams.set({ text: e.name })}
                  >
                    {e.name}
                  </button>
                </SwiperSlide>
              );
            })}
            {searchList.others.map((e, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <button
                    className="search custom-btn secondary"
                    onClick={() => searchParams.set({ text: e.name })}
                  >
                    {e.name}
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <Content>
        <Aside>
          <Filter />
        </Aside>
        <Main>
          <div>
            <Data>
              <ul>
                {data &&
                  data.map((el: any, idx: any) => (
                    <li key={idx}>
                      <div className="content">
                        <VacancyCard key={idx} element={el} index={idx} />
                      </div>
                    </li>
                  ))}
              </ul>
            </Data>

            {loading && <div>Loading Vacancies...</div>}
            {error && <div>Error</div>}

            <div className="inline">
              <Pagination className="inline">
                <ul>
                  {pagination.first && (
                    <li>
                      <button data-primary onClick={() => pagination.prev()}>
                        <span className="material-symbols-rounded">
                          chevron_left
                        </span>
                      </button>
                    </li>
                  )}

                  {pagination.list &&
                    pagination.list.map((_, index) => (
                      <li key={index}>
                        <button
                          data-current={index + 1 === pagination.current}
                          onClick={() => pagination.page(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}

                  {pagination.last && (
                    <li>
                      <button data-primary onClick={() => pagination.next()}>
                        <span className="material-symbols-rounded">
                          chevron_right
                        </span>
                      </button>
                    </li>
                  )}
                </ul>
              </Pagination>
            </div>
          </div>
        </Main>
      </Content>
    </Container>
  );
};

export default VacancyList;

const Container = styled.div`
  background-color: var(--content-background);
  width: 100%;
  padding-bottom: 80px;

  .searchbar-wrapper {
    margin: 0 auto;
    max-width: 600px;
    margin-top: 30px;

    .searchbar {
      border: 1px solid var(--border-color);
      border-radius: 5px;
      background: var(--element-background);
    }
  }

  .top-content {
    margin-bottom: 20px;

    .search-list {
      .swiper-slide {
        width: auto;
      }

      .custom-btn {
        white-space: nowrap;
        height: 35px;
      }
    }

    .count {
      font-family: var(--font-regular);
      color: var(--text-color-dark);
      font-size: 14px;
      display: inline-flex;
      margin-bottom: 10px;
      background: var(--border-color);
      padding: 2px 7px;
      border-radius: 100px;
      align-items: center;
      column-gap: 2px;

      .icon {
        font-size: 18px;
        line-height: 0;
      }
    }
  }
`;

const Data = styled.div`
  ul {
    margin-bottom: 30px;

    li {
      opacity: 0;
      visibility: hidden;
      animation: vacanciesList 0.2s forwards;

      @keyframes vacanciesList {
        100% {
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  column-gap: 15px;
  position: relative;
`;

const Aside = styled.aside`
  position: sticky;
  height: 100vh;
  top: 0;

  h3 {
    font-family: var(--font-semiBold);
    color: var(--title-color);
    font-size: 18px;
    padding: 15px;
  }
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
`;

const Pagination = styled.div`
  ul {
    display: flex;
    column-gap: 6px;

    li {
      button {
        border: 1px solid var(--border-color-dark);
        border-radius: 20px;
        font-family: var(--text-font);
        font-size: 16px;
        height: 37px;
        aspect-ratio: 1/1;
        line-height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 0;
        padding: 6px;
        cursor: pointer;
        transition: 0.1s;
        background: var(--element-background);

        &[data-primary="true"] {
          background: #58585823;
        }

        &[data-current="true"] {
          background: var(--element-color);
          color: white;
        }

        &:hover {
          background: var(--button-hover-bg);
          color: white;
        }
      }
    }
  }
`;
