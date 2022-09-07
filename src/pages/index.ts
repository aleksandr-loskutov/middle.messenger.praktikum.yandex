import ChatPage from "./chat";
import ProfilePage from "./profile";
import ErrorPage from "./error";
import LoginPage from "./login";
import RegisterPage from "./register";
import PasswordChangePage from "./password";
import { Component } from "core";

enum Pages {
  Login = "login",
  Register = "register",
  Profile = "profile",
  Messenger = "messenger",
  Password = "password",
  Error = "error"
}

const map: Record<Pages, Component> = {
  [Pages.Login]: LoginPage,
  [Pages.Register]: RegisterPage,
  [Pages.Profile]: ProfilePage,
  [Pages.Password]: PasswordChangePage,
  [Pages.Messenger]: ChatPage,
  [Pages.Error]: ErrorPage
};

const getPageComponent = (page: Pages): Component => {
  return map[page];
};

export {
  ChatPage,
  ProfilePage,
  ErrorPage,
  LoginPage,
  RegisterPage,
  PasswordChangePage,
  Pages,
  getPageComponent
};
