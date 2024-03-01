import { useDispatch } from "react-redux";
import { useSearchParams } from "hooks";
import { setVacancyCount, setVacancyPageData, vacancyListError, vacancyListLoading } from "store/reducers/vacancy";
import { useSelector } from "react-redux";
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "backend";
import { AppDispatch, RootState } from "store";
import { api } from "store/reducers";
import { useLocation, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

/******************************** VACANCIES API *************************************/

const vacancies = () => {
  // Redux
  const dispatch = useDispatch();
  const vacancyState = useSelector((state: RootState) => state.vacancy.list);

  // Memoize the result of the useSelector
  const memoizedState = useMemo(() => vacancyState, [vacancyState]);

  const { loading, error, range, pageData, count } = memoizedState;

  // Location and search parameters
  const searchParams = useSearchParams();
  const allSearchParams = searchParams.getAll();
  delete allSearchParams.vacancy_post;
  delete allSearchParams.extended;

  const dataKey = JSON.stringify(allSearchParams);
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
  const fetchData = useCallback(async () => {
    const fromIndex = (+page - 1) * range;
    const toIndex = fromIndex + range - 1;

    dispatch(vacancyListLoading(true));

    try {
      let query = supabase
        .from("vacancies")
        .select(
          `id, created_at, user_id, title, logo, company, emp_type, location, subtitle, fromSalary, toSalary, currency, experience, views (count)`,
          { count: "exact" }
        );
      // console.log((await query).data);

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
      useFilter.like({ value: allSearchParams.experience, column: "experience" });
      useFilter.or({ value: allSearchParams.emp_type, column: "emp_type" });
      useFilter.or({ value: allSearchParams.education, column: "education" });

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
  }, [dispatch, allSearchParams, page, range, searchParams]);

  useEffect(() => {
    // Fetch data on component mount if data for the current page is not available
    if (!mainData) {
      fetchData();
    }
  }, [dataKey]);

  // Pagination object
  const pagination = {
    list: mainPagesList,
    current: +page,
    last: mainPagesList.length > 0 && mainPagesList[mainPagesList.length - 1] > +page,
    first: +page > 1 && mainData,
    page: (index: number) => searchParams.set({ page: `${index}` }),
    prev: () => searchParams.set({ page: `${+page - 1}` }),
    next: () => searchParams.set({ page: `${+page + 1}` }),
  };

  // Return relevant variables and functions
  return { loading, error, data: mainData, count: mainDataCount, pagination };
};

const vacancy = () => {
  const searchParams = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const id = searchParams.get("vacancy_post");

  const [newComment, setNewComment] = useState("");
  const [newCommentFocus, setNewCommentFocus] = useState(false);

  const element = useSelector((state: RootState) => state.vacancy.element.data[id!]);
  const commentsList = useSelector((state: RootState) => state.vacancy.comments.data[id!]);
  const commentsCount = useSelector((state: RootState) => state.vacancy.comments.count[id!]);
  const commentsLoading = useSelector((state: RootState) => state.vacancy.comments.loading);
  const profile = useSelector((state: RootState) => state.profile);
  const [commentsObserver, InCommentsObserver] = useInView({
    triggerOnce: false,
  });

  useEffect(() => {
    if (InCommentsObserver) {
      comments.load();
    }
  }, [InCommentsObserver]);

  const data = useMemo(() => element, [element]);
  const { error } = useSelector((state: RootState) => state.vacancy.element);

  /** ====================== **/
  useEffect(() => {
    if (id && !data) {
      dispatch(api.vacancy.element(id));
    }
  }, [id]);

  const comments = {
    list: commentsList,
    count: commentsCount,
    loading: commentsLoading,
    value: newComment,
    setValue: setNewComment,
    observer: commentsObserver,
    focus: newCommentFocus,
    setFocus: setNewCommentFocus,
    load() {
      dispatch(api.vacancy.loadMoreComments(id));
    },
  };

  return { data, error, comments, profile };
};

/******************************** SEARCHBAR API *************************************/

const searchbar = () => {
  // React Hooks and Refs
  const searchParams = useSearchParams();
  const text = searchParams.get("text");
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState<string>(text || "");
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [searchListHeight, setSearchListHeight] = useState<number>();

  // Redux Selector
  const userData = useSelector((state: RootState) => state.profile);

  // State for fetched search items from the database
  const [searched, setSearched] = useState<string[]>([]);
  const [searchListData, setSearchListData] = useState<string[]>([]);

  const [searchedItems, setSearchedItems] = useState<string[]>();
  const [searchList, setSearchList] = useState<string[]>([]);

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
  function search(value: string, event?: FormEvent<HTMLFormElement>) {
    if (event) {
      event.preventDefault();
    }

    if (location.pathname === "/") {
      navigate({ pathname: "/search/vacancy", search: `text=${value}&page=1` });
    } else {
      searchParams.set({ text: value, page: "1" });
    }

    setFocus(false);
    inputRef.current?.blur();
    searchHistory.update(value);

    upsert(value);
  }

  // Function to refetch search list
  async function refetch(data: string[]) {
    try {
      await supabase.from("users").update({ searched: data }).eq("user_id", userData.id).select("*");
    } catch (e) {
      console.error(e);
    }
  }

  // Upserting new searched values
  async function upsert(name: string) {
    if (name.trim().length >= 4) {
      await supabase
        .from("search")
        .select("count")
        .eq("name", name)
        .then(async (record) => {
          const currentTimestamp = new Date().toISOString();
          if (record && record.data && record.data[0]) {
            const count = record.data[0].count;
            await supabase
              .from("search")
              .upsert([{ created_at: currentTimestamp, name, count: count + 1 }], { onConflict: "name" });
          } else {
            await supabase.from("search").upsert([{ created_at: currentTimestamp, name, count: 1 }]);
          }
        });
    }
  }

  function clearInput(event: FormEvent<HTMLDivElement>) {
    event.preventDefault();
    setValue("");
    inputRef.current?.focus();
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
    // Initialize a timer variable
    let searchTimer: NodeJS.Timeout;

    // Set up a timer to delay the search by 1000 milliseconds (1 second)
    if (value.trim().length > 2) {
      searchTimer = setTimeout(async () => {
        // Check if the search input has a non-empty trimmed value
        async function fetchSearches() {
          try {
            const regexValue = value.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
            const { data, error } = await supabase
              .from("search")
              .select("name")
              .ilike("name", `${regexValue}%`)
              .gte("count", "10");

            // Map the retrieved data to a list format with specific properties
            const searchResults = data
              ?.map((result) => {
                if (!searchListData.includes(result.name)) {
                  return result.name;
                }
              })
              .filter(Boolean);

            // Set retrieved value
            if (searchResults) {
              setSearchListData([...searchListData, ...searchResults]);
            }
            if (error) throw error;
          } catch (error) {
            console.error(error);
          }
        }
        fetchSearches();
      }, 300);
    }

    // Cleanup function: Clear the timer when the component unmounts or when the 'value' dependency changes
    return () => {
      clearTimeout(searchTimer);
    };
  }, [value]);

  // Define searchedItemsList
  useEffect(() => {
    if (searched && Array.isArray(searched)) {
      const arr = searched.filter((elem) => {
        if (elem.startsWith(value)) {
          return elem;
        }
      });
      setSearchedItems(arr);
    }
  }, [value, searched]);

  //
  useEffect(() => {
    if (searchListData && Array.isArray(searchListData)) {
      const arr = searchListData.filter((elem) => {
        if (elem.startsWith(value)) {
          return elem;
        }
      });
      setSearchList(arr);
    }
  }, [value, searchListData]);

  // Effect to update search list height when 'searchedItems' state changes
  useEffect(() => {
    const height = listRef.current?.getBoundingClientRect().height;
    setSearchListHeight(height);
  });

  return {
    value,
    setValue,
    listRef,
    focus,
    setFocus,
    search,
    searchList,
    inputRef,
    searchHistory,
    searchListHeight,
    clearInput,
    searchedItems,
  };
};

const home = () => {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.home);

  useEffect(() => {
    dispatch(api.home.categories());
  }, []);

  return { data };
};

export default { vacancies, vacancy, searchbar, home };
