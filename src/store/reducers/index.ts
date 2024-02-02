import vacancy from "./vacancy";
import profile from "./profile";
import searchbar from "./searchbar";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({ vacancy, profile, searchbar });
