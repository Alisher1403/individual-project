import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VacancyCard } from "components";
import supabase from "backend";
import { vacancyListLoading, vacancyListError, setVacancyPageData } from "store/reducers/vacancy";
import styled from "styled-components";
import { RootState } from "store";
import { useSearchParams } from "react-router-dom";
import parse from "html-react-parser";
import { icons } from "icons";

const VacancyList: FC = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const searchText = searchParams.get("text") || "";

  const { loading, error, range, pageData } = useSelector((state: RootState) => state.vacancy.list);
  const mainData = pageData[searchText]?.[page];
  const mainDataCount = pageData[searchText]?.count;

  const [pagesList, setPagesList] = useState<number[]>([]);

  useEffect(() => {
    if (!page) {
      setSearchParams({ page: "1" });
    }

    const pagesCount = Array.from({ length: Math.ceil(mainDataCount / range) }, (_, i) => i * range);
    setPagesList(pagesCount);
  }, [mainDataCount]);

  const fetchData = async () => {
    const fromIndex = (+page - 1) * range;
    const toIndex = fromIndex + range - 1;

    window.scrollTo({ top: 0 });

    dispatch(vacancyListLoading(true));

    try {
      let query = supabase
        .from("vacancies")
        .select(
          `id, created_at, userId, title, logo, company, location, subtitle, fromSalary, toSalary, currency, fromExperience, toExperience, remote`,
          { count: "exact" }
        );

      if (searchText) {
        query = query.or(`title.ilike.%${searchText}%,description.ilike.%${searchText}%`);
      }

      const { data, error, count } = await query.range(fromIndex, toIndex).order("id", { ascending: false });

      if (error) {
        throw error;
      } else {
        dispatch(vacancyListLoading(false));
        dispatch(setVacancyPageData({ search: searchText, data: { [page]: data, count } }));
      }
    } catch (error) {
      dispatch(vacancyListError(true));
    }
  };

  useEffect(() => {
    if (!mainData || !pageData[searchText]) {
      fetchData();
    }
  }, [searchText, page]);

  return (
    <Container>
      <div className="container">{mainDataCount} items found</div>

      <div className="container">
        <Data.List>
          {mainData &&
            mainData.map((el: any, idx: any) => (
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
            {+page > 1 && mainData && (
              <li>
                <Pagination.Button $primary onClick={() => setSearchParams({ text: searchText, page: `${+page - 1}` })}>
                  {parse(icons["arrowLeft"])}
                </Pagination.Button>
              </li>
            )}

            {pagesList &&
              pagesList.map((index) => (
                <li key={index}>
                  <Pagination.Button
                    $currentPage={index / range + 1 === +page}
                    onClick={() => setSearchParams({ text: searchText, page: `${index / range + 1}` })}
                  >
                    {index / range + 1}
                  </Pagination.Button>
                </li>
              ))}

            {pagesList.length - 1 >= +page && (
              <li>
                <Pagination.Button $primary onClick={() => setSearchParams({ text: searchText, page: `${+page + 1}` })}>
                  {parse(icons["arrowRight"])}
                </Pagination.Button>
              </li>
            )}
          </Pagination.List>
        </div>
      </div>
    </Container>
  );
};

export default VacancyList;

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
