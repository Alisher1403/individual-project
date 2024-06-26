import vacancy from "./vacancy";
import user from "./user";
import searchbar from "./navigation";
import sidebar from "./sidebar";
import home from "./home";
import chats from "./chats";
import profile from "./profile";
import modals from "./modals";
import resume from "./resume";
import { combineReducers } from "@reduxjs/toolkit";
import { vacancyApi } from "./vacancy";
import { homeApi } from "./home";
import { chatsApi } from "./chats";
import { userApi } from "./user";
import { profileApi } from "./profile";
import { resumeApi } from "./resume";

export const rootReducer = combineReducers({
  vacancy,
  user,
  profile,
  searchbar,
  sidebar,
  home,
  chats,
  modals,
  resume,
});

export const api = {
  vacancy: vacancyApi,
  home: homeApi,
  chats: chatsApi,
  user: userApi,
  profile: profileApi,
  resume: resumeApi,
};
