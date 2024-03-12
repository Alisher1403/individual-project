import vacancy from "./vacancy";
import user from "./user";
import searchbar from "./navigation";
import sidebar from "./sidebar";
import home from "./home";
import { combineReducers } from "@reduxjs/toolkit";
import { vacancyApi } from "./vacancy";
import { homeApi } from "./home";

export const rootReducer = combineReducers({ vacancy, user, searchbar, sidebar, home });

export const api = {
  vacancy: vacancyApi,
  home: homeApi,
};
