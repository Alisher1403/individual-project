import * as router_dom from "react-router-dom";

const useSearchParams = (): any => {
  const [searchParams, setSearchParams] = router_dom.useSearchParams();

  const params: searchParamsMethods = {
    getAll,
    set,
    get,
  };

  function get(param: string) {
    const getParam = searchParams.get(param);
    const isArray = getParam?.includes(",");
    if (isArray) {
      return getParam?.split(",");
    } else {
      return getParam;
    }
  }

  function getAll() {
    const allParams = {} as any;
    for (const [key, value] of searchParams.entries()) {
      if (value !== "undefined") {
        const isArray = value?.includes(",");
        if (isArray) {
          allParams[key] = value?.split(",");
        } else {
          allParams[key] = value;
        }
      }
    }
    return allParams;
  }

  function set(params: any) {
    const newParams = {} as any;

    for (const [key, value] of searchParams.entries()) {
      newParams[key] = value;
    }

    Object.keys(params).map((e: string): void => {
      if (Array.isArray(params[e])) {
        newParams[e] = params[e].join(",");
      } else {
        newParams[e] = params[e];
      }
    });

    Object.keys(newParams).map((e) => {
      if (!newParams[e]) delete newParams[e];
    });

    setSearchParams(newParams);
  }

  return params;
};

export default useSearchParams;

interface searchParamsMethods {
  getAll: () => {};
  set: (params: { [key: string]: string }) => void;
  get: (param: string) => void;
}
