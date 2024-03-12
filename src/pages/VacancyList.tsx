import { FC } from "react";
import { VacancyCard } from "components";
import backend from "backend";
import styled from "styled-components";

const VacancyList: FC = () => {
  const { data, count, loading, error, pagination } = backend.vacancies();

  return (
    <Container className="main-container">
      <Content>
        <div className="top-content">
          <div className="count">{count} items found</div>
        </div>
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
                      <span className="material-symbols-rounded">chevron_left</span>
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
                      <span className="material-symbols-rounded">chevron_right</span>
                    </button>
                  </li>
                )}
              </ul>
            </Pagination>
          </div>
        </div>
      </Content>
    </Container>
  );
};

export default VacancyList;

const Container = styled.div`
  background-color: var(--content-background);
  width: 100%;
  padding-bottom: 80px;
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
  width: 100%;
  height: 100%;

  .top-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0 7px;

    .count {
      font-family: var(--font-regular);
      color: var(--text-color-dark);
      font-size: 15px;
    }

    .btn-group {
      display: flex;
      border-radius: 5px;
      overflow: hidden;
      border: 1px solid var(--element-color);

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background: none;
        padding: 0 10px;
        cursor: pointer;

        &[data-active="true"] {
          background: var(--element-color);
        }
      }
    }
  }
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
