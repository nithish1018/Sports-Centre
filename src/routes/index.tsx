import { createBrowserRouter } from "react-router-dom";
import Signin from "../pages/signin";
import SignupForm from "../pages/signup";
import Hello from "../pages/index/Hello";
import AccountLayout from "../layouts/account";
import MatchModal from "../pages/modals/MatchModal";
import ArticleModal from "../pages/modals/ArticleModal";
import Logout from "../logout";
import Home from "../pages/index";
import ResetPassword from "../pages/signin/ResetPassword";
import UserPreferences from "../pages/preferences";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AccountLayout />,
    children: [
      {
        index: true,
        element: <Hello />,
      },
      {
        path: "home",
        element: <Home />,
        children: [
          {
            path: "matches",
            children: [
              { index: true, element: <></> },
              {
                path: ":matchID",
                element: <MatchModal />,
              },
            ],
          },
          {
            path: "resetPassword",
            element: <ResetPassword />,
          },
          {
            path: "preferences",
            element: <UserPreferences />,
          },
          {
            path: "articles",
            children: [
              { index: true, element: <></> },
              {
                path: ":articleID",
                element: <ArticleModal />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <SignupForm />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

export default router;
