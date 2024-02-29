import { useSearchParams as useRouterSearchParams } from "react-router-dom";

const useSearchParams = () => {
  const [searchParams, setSearchParams] = useRouterSearchParams();

  const params = {
    getAll,
    set,
    get,
  };

  function get(param: string) {
    const getParam = searchParams.get(param);
    if (getParam) {
      return isArrayParam(getParam) ? getParam.split(",") : (getParam as any);
    }
  }

  function getAll() {
    const allParams: any = {};
    for (const [key, value] of searchParams.entries()) {
      if (value !== "undefined") {
        allParams[key] = isArrayParam(value) ? value.split(",") : value;
      }
    }
    return allParams;
  }

  function set(newParams: object) {
    const existingParams = Object.fromEntries(searchParams.entries());
    const updatedParams = { ...existingParams, ...newParams };

    for (const key in updatedParams) {
      if (updatedParams[key] === undefined || updatedParams[key] === null) {
        delete updatedParams[key];
      }
    }

    setSearchParams(updatedParams);
  }

  function isArrayParam(value: string) {
    return value && value.includes(",");
  }

  return params;
};

export default useSearchParams;
