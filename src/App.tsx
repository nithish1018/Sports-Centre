import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ThemeContext } from "./context/theme";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`h-screen py-2 ${theme === "dark" ? "dark" : ""}`}>
      <RouterProvider router={router} />
      <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <ToastContainer />
    </div>
  );
}

export default App;
