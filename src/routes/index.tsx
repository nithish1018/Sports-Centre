import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
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
import Notfound from "../pages/NotFound/Notfound";

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
            element: (
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            ),
          },
          {
            path: "preferences",
            element: (
              <ProtectedRoute>
                <UserPreferences />
              </ProtectedRoute>
            )
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
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default router;
