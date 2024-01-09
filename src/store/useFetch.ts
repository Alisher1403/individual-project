import { useEffect } from "react";
import supabase from "backend";
import { useDispatch } from "react-redux";
import {
  getVacancyList,
  vacancyListError,
  vacancyListLoading,
} from "./reducers/vacancies";

export const backend = {
  vacancyList() {
    const dispatch = useDispatch();

    useEffect(() => {
      async function fetch() {
        vacancyListLoading(true);
        const { data, error } = await supabase.from("vacancies").select("*");

        if (data) {
          dispatch(getVacancyList(data));
          vacancyListLoading(false);
        }
        if (error) {
          vacancyListError(true);
        }
      }
      fetch();
    }, []);
  },
};
