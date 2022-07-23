import LoginPage from "./pages/login/";
import RegisterPage from "./pages/register";
import ChatPage from "./pages/chat";
import ProfilePage from "./pages/profile";
import ErrorPage from "./pages/error";
import "/src/css/style.scss";

const root = document.getElementById("root");

window.onload = function () {
  switch (window.location.pathname) {
    case "/":
      root.innerHTML = LoginPage;
      break;
    case "/register":
      root.innerHTML = RegisterPage;
      break;
    case "/chat":
      root.innerHTML = ChatPage;
      break;
    case "/profile":
      root.innerHTML = ProfilePage;
      break;
    default:
      root.innerHTML = ErrorPage;
      break;
  }
};
