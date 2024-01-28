import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useSearchParams } from "hooks";
import {
  setVacancyCount,
  setVacancyPageData,
  vacancyData,
  vacancyError,
  vacancyListError,
  vacancyListLoading,
  vacancyLoading,
} from "store/reducers/vacancy";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { supabase } from "backend";
import { RootState } from "store";

const vacancies = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const dataKey = location.pathname + location.search;
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const searchText = searchParams.get("text") || "";

  const { loading, error, range, pageData, count } = useSelector((state: RootState) => state.vacancy.list);

  const mainData = pageData?.[dataKey];
  const mainDataCount = count?.[dataKey];

  const [mainPagesList, setMainPagesList] = useState<number[]>([]);

  useEffect(() => {
    if (!page) {
      searchParams.set({ page: "1" });
    }

    const pagesCount = Array.from({ length: Math.ceil(mainDataCount / range) }, (_, i) => i * range);
    setMainPagesList(pagesCount);
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

      const useFilter = {
        like(params: { value: string; column: string }) {
          if (params.value) {
            query = query.filter(params.column, "like", params.value);
          }
        },
        or(params: { value: string[]; column: string }) {
          if (params.value && params.value.length > 0) {
            let matchQuery;
            if (Array.isArray(params.value)) {
              matchQuery = params.value.map((e) => `${params.column}.ilike.${e}`).join(",");
              query = query.or(matchQuery);
            } else {
              query = query.or(`${params.column}.ilike.${params.value}`);
            }
          }
        },
      };

      const filters = searchParams.getAll();
      useFilter.like({ value: filters.experience, column: "experience" });
      useFilter.or({ value: filters.emp_type, column: "emp_type" });
      useFilter.or({ value: filters.education, column: "education" });

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
      let timeout;
      clearTimeout(timeout);
      fetchData();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dataKey]);

  const pagination = {
    list: mainPagesList,
    current: +page,
    last: mainPagesList.length - 1 >= +page,
    first: +page > 1 && mainData,
    page(index: number) {
      searchParams.set({ page: index });
    },
    prev() {
      searchParams.set({ page: `${+page - 1}` });
    },
    next() {
      searchParams.set({ page: `${+page + 1}` });
    },
  };

  return { loading, error, data: mainData, count: mainDataCount, pagination };
};

const vacancy = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const id = params.id;

  const element = useSelector((state: RootState) => state.vacancy.element.data[id!]);
  const { loading, error } = useSelector((state: RootState) => state.vacancy.element);

  async function fetchData() {
    try {
      dispatch(vacancyLoading(true));
      const { data } = await supabase.from("vacancies").select("*").eq("id", id);

      if (data && id) {
        dispatch(vacancyData({ key: id, data: data }));
        dispatch(vacancyLoading(false));
      }
    } catch (e) {
      dispatch(vacancyError(true));
    }
  }

  useEffect(() => {
    if (!element) {
      fetchData();
    }
  }, []);

  return { data: element, loading, error };
};

export default { vacancies, vacancy };
