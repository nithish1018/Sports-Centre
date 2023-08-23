import { createBrowserRouter } from "react-router-dom";
import Signin from "../pages/sigin";
import SignupForm from "../pages/signup";
import Hello from "../pages/index/Hello";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Hello/>,
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