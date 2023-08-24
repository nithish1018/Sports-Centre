import { createBrowserRouter } from "react-router-dom";
import Signin from "../pages/sigin";
import SignupForm from "../pages/signup";
import Hello from "../pages/index/Hello";
import AccountLayout from "../layouts/account";
import LiveGames from "../pages/news/sports";


const router = createBrowserRouter([
  {
    path: "/",
    element:<> <AccountLayout/> <Hello/> </>
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
    path: "/matches",
    element: <LiveGames/>,
  },
  
]);

export default router;