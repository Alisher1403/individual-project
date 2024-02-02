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
import { FormEvent, useEffect, useRef, useState } from "react";
import { supabase } from "backend";
import { RootState } from "store";

/******************************** VACANCIES API *************************************/

const vacancies = () => {
  // Redux
  const dispatch = useDispatch();
  const { loading, error, range, pageData, count } = useSelector((state: RootState) => state.vacancy.list);

  // Location and search parameters
  const location = useLocation();
  const dataKey = location.pathname + location.search;
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const searchText = searchParams.get("text") || "";

  // Data for the current page
  const mainData = pageData?.[dataKey];
  const mainDataCount = count?.[dataKey];

  // State for pagination
  const [mainPagesList, setMainPagesList] = useState<number[]>([]);

  useEffect(() => {
    // Set default page if not provided
    if (!page) {
      searchParams.set({ page: "1" });
    }

    // Calculate the list of pages based on the total count and range
    const pagesCount = Array.from({ length: Math.ceil(mainDataCount / range) }, (_, i) => i + 1);
    setMainPagesList(pagesCount);
  }, [mainDataCount]);

  // Fetch data from the API
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

      // Apply search text filter
      if (searchText) {
        const removeSpaces = searchText.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
        query = query.or(
          `title.ilike.%${removeSpaces}%,description.ilike.%${removeSpaces}%,company.ilike.%${removeSpaces}%`
        );
      }

      // Utility functions for applying filters
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

      // Apply additional filters from search parameters
      const filters = searchParams.getAll();
      useFilter.like({ value: filters.experience, column: "experience" });
      useFilter.or({ value: filters.emp_type, column: "emp_type" });
      useFilter.or({ value: filters.education, column: "education" });

      // Fetch data from the API
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
    // Fetch data on component mount if data for the current page is not available
    if (!mainData) {
      fetchData();
    }

    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dataKey]);

  // Pagination object
  const pagination = {
    list: mainPagesList,
    current: +page,
    last: mainPagesList.length > 0 && mainPagesList[mainPagesList.length - 1] >= +page,
    first: +page > 1 && mainData,
    page: (index: number) => searchParams.set({ page: `${index}` }),
    prev: () => searchParams.set({ page: `${+page - 1}` }),
    next: () => searchParams.set({ page: `${+page + 1}` }),
  };

  // Return relevant variables and functions
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

/******************************** SEARCHBAR API *************************************/

const searchbar = () => {
  // React Hooks and Refs
  const searchParams = useSearchParams();
  const text = searchParams.get("text");
  const [value, setValue] = useState<string>(text || "");
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchedRef = useRef<HTMLUListElement>(null);

  // Redux Selector
  const userData = useSelector((state: RootState) => state.profile);

  // Type definition for search list
  type SearchListType = { value: string; searched: boolean }[];

  // State for searched items
  const [searchedItems, setSearchedItems] = useState<SearchListType>();

  // State for fetched search items from the database
  const [searched, setSearched] = useState<string[]>([]);

  // Search history utility object
  const searchHistory = {
    // Delete function to remove an item from the search history
    delete: async function (elem: string, event: React.MouseEvent<HTMLDivElement>) {
      event.stopPropagation();
      if (!searched) return;

      // Filter and create a new list without the deleted element
      const newList = searched.filter((e) => e !== elem);
      setSearched(newList);
      refetch(newList);
    },
    // Update function to add a new item to the search history
    update: async function (val: string) {
      const regexValue = val.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
      const filteredList = searched.filter((e) => e !== regexValue);

      // If the element is not found in the existing list, add it
      if (regexValue.trim()) {
        const newList = [regexValue, ...filteredList];
        setSearched(newList);
        refetch(newList);
      }
    },
  };

  // Function to handle search
  function search(value: string, e?: FormEvent<HTMLFormElement>) {
    if (e) {
      e.preventDefault();
    }

    searchParams.set({ text: value, page: "1" });
    setFocus(false);
    inputRef.current?.blur();
    searchHistory.update(value);
  }

  // Effect to fetch data from the database based on user search history
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("users").select("searched").eq("user_id", userData.id).range(0, 10);

        if (data) {
          setSearched(data[0]?.searched || []);
        }
        if (error) throw error;
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Function to set the searched list
  function setSearchedList(list: string[], searched: boolean) {
    const searchedObj: SearchListType = list.map((e: string) => ({
      value: e,
      searched,
    }));
    setSearchedItems(searchedObj);
  }

  // Effect to set the searched list
  useEffect(() => {
    setSearchedList(searched, true);
  }, [searched]);

  // Function to refetch search list
  async function refetch(data: string[]) {
    try {
      await supabase.from("users").update({ searched: data }).eq("user_id", userData.id).select("*");
    } catch (e) {
      console.error(e);
    }
  }

  // Effect to update the input value when the text prop changes
  useEffect(() => {
    if (text) {
      setValue(text.replace(/^\s+|\s+$|\s+(?=\s)/g, ""));
    } else {
      setValue("");
    }
    inputRef.current?.blur();
  }, [text]);

  // Effect Timout to decrease number of requests
  useEffect(() => {
    let timer: NodeJS.Timeout;

    timer = setTimeout(() => {
      console.log(value);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  // State for search list height
  const [searchListHeight, setSearchListHeight] = useState(searchedRef.current?.getBoundingClientRect().height);

  // Effect to update search list height when 'searchedItems' state changes
  useEffect(() => {
    const height = searchedRef.current?.getBoundingClientRect().height;
    setSearchListHeight(height);
  }, [searchedItems]);

  return {
    value,
    setValue,
    searchedRef,
    focus,
    setFocus,
    search,
    inputRef,
    searched: searchedItems,
    searchHistory,
    searchListHeight,
  };
};

export default { vacancies, vacancy, searchbar };
