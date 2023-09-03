import { createBrowserRouter } from "react-router-dom";
import Signin from "../pages/sigin";
import SignupForm from "../pages/signup";
import Hello from "../pages/index/Hello";
import AccountLayout from "../layouts/account";
import LiveGames from "../pages/news/sports";
import MatchModal from "../pages/modals/MatchModal";
import ArticleModal from "../pages/modals/ArticleModal";
import Articles from "../pages/news/articles";
const router = createBrowserRouter([
  {
    path: "/",
    element:<AccountLayout/>,
    children: [
      {index:true, element: <Hello />},
      {
        path: "matches",
        element: <LiveGames/>,
        children: [
          { index: true, element:<></> },
          {
            path: ":matchID",
            element: <MatchModal />,
          }
        ],
      },
      {
        path: "articles",
        element: <Articles/>,
        children: [
          { index: true, element:<></> },
          {
            path: ":articleID",
            element: <ArticleModal />,
          }
        ],
      },
    ]
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <SignupForm/>,
  },
]);

export default router;