import { createBrowserRouter } from "react-router-dom";
import Signin from "../pages/sigin";
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello</div>,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  
]);

export default router;