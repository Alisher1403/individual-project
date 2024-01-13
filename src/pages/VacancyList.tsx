import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VacancyCard } from "components";
import supabase from "backend";
import { vacancyListLoading, vacancyListError, setVacancyCount, setVacancyPageData } from "store/reducers/vacancy";
import styled from "styled-components";
import { RootState } from "store";
import { useLocation, useSearchParams } from "react-router-dom";
import parse from "html-react-parser";
import { icons } from "icons";

const Home: FC = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const page = searchParams.get("page");

  const mainContent = useRef<HTMLDivElement>(null);

  /********************************/

  const { loading, error, range, count, pageData } = useSelector((state: RootState) => state.vacancy.list);

  /********************************/

  const [pagesList, setPagesList] = useState<number[]>([]);

  /********************************/

  if (!page) return;

  useEffect(() => {
    if (!page) {
      setSearchParams({ page: "1" });
    }

    const pagesCount = [];

    for (let i = 0; i < count; i += range) {
      pagesCount.push(i);
    }

    setPagesList(pagesCount);
  }, [count]);

  /********************************/

  useEffect(() => {
    const fromIndex = (+page - 1) * range;
    const toIndex = fromIndex + range - 1;

    const fetchData = async () => {
      dispatch(vacancyListLoading(true));

      try {
        const { data, error, count } = await supabase
          .from("vacancies")
          .select(
            `id, title, logo, company, location, subtitle, fromSalary, toSalary, currency, fromExperience, toExperience`,
            { count: "exact" }
          )
          .range(fromIndex, toIndex);
        if (error) {
          throw error;
        } else {
          //-----------//
          dispatch(vacancyListLoading(false));
          dispatch(setVacancyPageData({ page: +page, data: data }));

          if (count) {
            dispatch(setVacancyCount(count));
          }
        }
        //-----------//
      } catch (error) {
        dispatch(vacancyListError(true));
      }
    };

    if (!pageData[page]) {
      fetchData();
    }
  }, [location.search]);

  /********************************/

  useEffect(() => {
    if (mainContent.current) {
      mainContent.current.scroll(0, 0);
    }
  }, [page]);

  /********************************/

  return (
    <Container ref={mainContent}>
      <div className="container">
        <div>This is Home Page</div>
        <p>{count} items found</p>
      </div>

      <div className="container">
        {/* ------------ LIST OF ITEMS ------------ */}
        <Data.List>
          {pageData[page] &&
            pageData[page].map((el: any, idx: any) => (
              <li key={idx}>
                <Data.ListItem>
                  <VacancyCard key={idx} element={el} index={idx} />
                </Data.ListItem>
              </li>
            ))}
        </Data.List>

        {loading && <div>Loading Vacancies...</div>}
        {error && <div>Error</div>}

        {/* ------------ BUTTONS ------------ */}
        <div className="inline">
          {/*  */}

          <Pagination.List className="inline">
            {/*  */}
            {+page > 1 && pageData[+page] && (
              <li>
                <Pagination.Button $primary onClick={() => setSearchParams({ page: `${+page - 1}` })}>
                  {parse(icons["arrowLeft"])}
                </Pagination.Button>
              </li>
            )}
            {/*  */}

            {pagesList &&
              pagesList.map((_, index) => {
                return (
                  <li key={index}>
                    <Pagination.Button
                      $currentPage={index + 1 == +page}
                      onClick={() => setSearchParams({ page: `${index + 1}` })}
                    >
                      {index + 1}
                    </Pagination.Button>
                  </li>
                );
              })}

            {/*  */}
            {pagesList.length - 1 >= +page && (
              <li>
                <Pagination.Button $primary onClick={() => setSearchParams({ page: `${+page + 1}` })}>
                  {parse(icons["arrowRight"])}
                </Pagination.Button>
              </li>
            )}
            {/*  */}
          </Pagination.List>
        </div>
      </div>
    </Container>
  );
};

export default Home;

const Container = styled.div``;

const Data = {
  List: styled.ul`
    border-top: var(--border-style);
    margin-bottom: 50px;
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
