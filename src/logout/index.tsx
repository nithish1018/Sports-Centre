import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {

  useEffect(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  }, []);

  toast.success("Signed-Out Successfully", { theme: "dark", autoClose: 1000 })
  return <Navigate to="/signin" />;
};

export default Logout;
