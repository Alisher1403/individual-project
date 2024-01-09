import { useEffect, useState } from "react";
import supabase from "backend";
import { useDispatch } from "react-redux";
import { getVacancyList } from "./reducers/vacancies";

export const backend = {
  vacancyList(from?: number, to?: number) {
    const [loading, setLoading] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
      async function fetch() {
        const { data, error } = await supabase.from("vacancies").select("*");
        console.log(data);

        if (data) {
          dispatch(getVacancyList(data));
        }
      }
      fetch();
    }, []);
  },
};
