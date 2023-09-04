import { createBrowserRouter } from "react-router-dom";
import Signin from "../pages/sigin";
import SignupForm from "../pages/signup";
import Hello from "../pages/index/Hello";
import AccountLayout from "../layouts/account";
import LiveGames from "../pages/news/sports";
import MatchModal from "../pages/modals/MatchModal";
import ArticleModal from "../pages/modals/ArticleModal";
import Articles from "../pages/news/articles";
import Logout from "../logout";
const router = createBrowserRouter([
  {
    path: "/",
    element:<AccountLayout/>,
    children: [
      {index:true, element: <Hello />},
      {
        path: "matches",
        element:<> <LiveGames/> <Articles/> </>,
        children: [
          { index: true, element:<></> },
          {
            path: ":matchID",
            element: <MatchModal />,
          },
        
        ],
      },
    ]
  },
  {
    path: "articles/:articleID",
    element: <ArticleModal />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <SignupForm/>,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

export default router;