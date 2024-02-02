import { FC } from "react";
import { VacancyCard } from "components";
import backend from "backend";
import styled from "styled-components";
import parse from "html-react-parser";
import { icons } from "icons";
import { Filter } from "layouts";

const VacancyList: FC = () => {
  const { data, count, loading, error, pagination } = backend.vacancies();

  return (
    <Container className="container">
      <div>{count} items found</div>
      <Content className="content">
        <Filter />

        <SearchContent>
          <div>
            <Data.List>
              {data &&
                data.map((el: any, idx: any) => (
                  <li key={idx}>
                    <Data.ListItem>
                      <VacancyCard key={idx} element={el} index={idx} />
                    </Data.ListItem>
                  </li>
                ))}
            </Data.List>

            {loading && <div>Loading Vacancies...</div>}
            {error && <div>Error</div>}

            <div className="inline">
              <Pagination.List className="inline">
                {pagination.first && (
                  <li>
                    <Pagination.Button $primary onClick={() => pagination.prev()}>
                      {parse(icons["arrowLeft"])}
                    </Pagination.Button>
                  </li>
                )}

                {pagination.list &&
                  pagination.list.map((_, index) => (
                    <li key={index}>
                      <Pagination.Button
                        $currentPage={index + 1 === pagination.current}
                        onClick={() => pagination.page(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Button>
                    </li>
                  ))}

                {pagination.last && (
                  <li>
                    <Pagination.Button $primary onClick={() => pagination.next()}>
                      {parse(icons["arrowRight"])}
                    </Pagination.Button>
                  </li>
                )}
              </Pagination.List>
            </div>
          </div>
        </SearchContent>
      </Content>
    </Container>
  );
};

export default VacancyList;

const Container = styled.div``;

const Content = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const Data = {
  List: styled.ul`
    margin-bottom: 50px;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
  `,
  ListItem: styled.div`
    opacity: 0;
    visibility: hidden;
    animation: vacanciesList 0.2s forwards;

    @keyframes vacanciesList {
      100% {
        opacity: 1;
        visibility: visible;
      }
    }
  `,
};

const SearchContent = styled.div`
  width: 100%;
  height: 100%;
`;

const Pagination = {
  List: styled.ul`
    display: flex;
    column-gap: 6px;
  `,
  Button: styled.button<{ $primary?: boolean; $currentPage?: boolean }>`
    border: var(--border-style);
    background: ${(props) => (props.$primary ? "#58585823" : "none")};
    background-color: ${(props) => props.$currentPage && `var(--button-hover-bg)`};
    color: ${(props) => (props.$currentPage ? "white" : `var(--border-color)`)};
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

    &:hover {
      background: var(--button-hover-bg);
      color: white;

      * {
        stroke: white;
        fill: white;
      }
    }

    * {
      fill: var(--icon-bg);
      stroke: var(--icon-bg);
      stroke-width: 3px;
    }
  `,
};
