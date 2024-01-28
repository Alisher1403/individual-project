import { FC, createContext, useEffect, useState } from "react";

import Input from "./main/Input";
import RadioSelect from "./main/RadioSelect";
import CheckSelect from "./main/CheckSelect";
import Select from "./main/Select";
import InputStateful from "./main/InputStateful";
import Grid from "./main/Grid";

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
