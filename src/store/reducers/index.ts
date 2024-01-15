import vacancy from "./vacancy";
import profile from "./profile";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({ vacancy, profile });
