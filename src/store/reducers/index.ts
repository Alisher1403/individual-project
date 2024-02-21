import vacancy from "./vacancy";
import profile from "./profile";
import searchbar from "./navigation";
import sidebar from "./sidebar";
import { combineReducers } from "@reduxjs/toolkit";
import { vacancyApi } from "./vacancy";

export const rootReducer = combineReducers({ vacancy, profile, searchbar, sidebar });

export const api = {
  vacancy: vacancyApi,
};
