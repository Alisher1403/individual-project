import { supabase } from ".";
import { useDispatch } from "react-redux";
import {
  getVacancyList,
  vacancyListError,
  vacancyListLoading,
} from "store/reducers/vacancies";
import { useEffect } from "react";

interface UseFetchType {
  query: any;
  data: (data: any) => any;
  list?: object | any | null;
  loading?: (loading: boolean) => any;
  error?: (error: boolean) => any;
}

export const useFetch = (params: UseFetchType): Promise<void> => {
  const { query, data, list, loading, error } = params;
  const dispatch = useDispatch();

  return new Promise(async (resolve, reject) => {
    useEffect(() => {
      const fetchData = async () => {
        if (loading) {
          dispatch(loading(true));
        }

        try {
          const { data: responseData, error: responseError } = await query;

          if (responseData) {
            dispatch(data(responseData));
          }
          if (responseError && error) {
            dispatch(error(true));
          }

          resolve();
        } catch (err) {
          reject(err);
        } finally {
          if (loading) {
            dispatch(loading(false));
          }
        }
      };

      if (!list) {
        fetchData();
      }
    }, []);
  });
};

export const backend = {
  vacancyList(vacancies: null | any[]) {
    useFetch({
      query: supabase
        .from("vacancies")
        .select(
          "id, title, logo, company, location, remote, subtitle, fromSalary, toSalary, currency"
        ),
      list: vacancies,
      data: getVacancyList,
      loading: vacancyListLoading,
      error: vacancyListError,
    });
  },
};
