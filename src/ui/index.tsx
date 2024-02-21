import { FC, createContext, useEffect, useState } from "react";

import Input from "./Input";
import RadioSelect from "./RadioSelect";
import CheckSelect from "./CheckSelect";
import Select from "./Select";
import InputStateful from "./InputStateful";
import Grid from "./Grid";

export { Input, RadioSelect, CheckSelect, Select, InputStateful, Grid };

const UIContext = createContext({} as { id: number; setId: (id: number) => void });

interface UIType {
  children: any;
}

const UIProvider: FC<UIType> = ({ children }) => {
  const [id, setId] = useState(0);
  useEffect(() => {
    document.addEventListener("click", () => {
      setId(0);
    });
  }, []);
  return <UIContext.Provider value={{ id, setId }}>{children}</UIContext.Provider>;
};

export { UIContext, UIProvider };
