import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VacancyCard } from "components";
import supabase from "backend";
import { vacancyListLoading, vacancyListError, setVacancyPageData, setVacancyCount } from "store/reducers/vacancy";
import styled from "styled-components";
import { RootState } from "store";
import { useLocation, useSearchParams } from "react-router-dom";
import parse from "html-react-parser";
import { icons } from "icons";
import { Filter } from "layouts";

const VacancyList: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const dataKey = location.pathname + location.search;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const searchText = searchParams.get("text") || "";

  const { loading, error, range, pageData, count } = useSelector((state: RootState) => state.vacancy.list);

  const mainData = pageData?.[dataKey];
  const mainDataCount = count?.[dataKey];

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

    dispatch(vacancyListLoading(true));

    try {
      let query = supabase
        .from("vacancies")
        .select(
          `id, created_at, userId, title, logo, company, location, subtitle, fromSalary, toSalary, currency, experience, remote`,
          { count: "exact" }
        );

      if (searchText) {
        query = query.or(`title.ilike.%${searchText}%,description.ilike.%${searchText}%,company.ilike.%${searchText}%`);
      }

      const { data, error, count } = await query.range(fromIndex, toIndex).order("id", { ascending: false });

      if (error) {
        throw error;
      } else {
        dispatch(vacancyListLoading(false));
        dispatch(setVacancyPageData({ key: dataKey, data }));

        if (count) {
          dispatch(setVacancyCount({ key: dataKey, value: count }));
        }
      }
    } catch (error) {
      dispatch(vacancyListError(true));
    }
  };

  useEffect(() => {
    if (!mainData) {
      fetchData();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchText, page]);

  return (
    <Container className="container">
      <div>{mainDataCount} items found</div>
      <Content className="content">
        <Filter />

        <SearchContent>
          <div>
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
                    <Pagination.Button
                      $primary
                      onClick={() => setSearchParams((prevParams) => ({ ...prevParams, page: `${+page - 1}` }))}
                    >
                      {parse(icons["arrowLeft"])}
                    </Pagination.Button>
                  </li>
                )}

                {pagesList &&
                  pagesList.map((index) => (
                    <li key={index}>
                      <Pagination.Button
                        $currentPage={index / range + 1 === +page}
                        onClick={() =>
                          setSearchParams((prevParams) => ({ ...prevParams, page: `${index / range + 1}` }))
                        }
                      >
                        {index / range + 1}
                      </Pagination.Button>
                    </li>
                  ))}

                {pagesList.length - 1 >= +page && (
                  <li>
                    <Pagination.Button
                      $primary
                      onClick={() => setSearchParams((prevParams) => ({ ...prevParams, page: `${+page + 1}` }))}
                    >
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
  align-items: flex-start;
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
