import React from "react";
// Dialogue 1: First we will import the API_ENDPOINT constant from the `config` folder
import { API_ENDPOINT } from "../../config/constants";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import myGIF from "../../assets/Gifs/login.gif";
import { toast } from "react-toastify";

type Inputs = {
  email: string;
  password: string;
};
const SigninForm: React.FC = () => {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        toast.error("Invalid Username/Password", { theme: "dark", autoClose: 1000 });
        throw new Error("Sign-in failed");
      } else {
        toast.success("Sign-In Successful", { theme: "dark", autoClose: 1000 });
      }

      console.log("Sign-in successful");
      const data = await response.json();

      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      nav("/home/matches");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <img src={myGIF} alt="my-gif" />
            <p className="leading-relaxed mt-4"></p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Login To Your Account
            </h2>
            <div className="relative mb-4">
              <label className="leading-7 flex text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600 flex">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: true })}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errors.password && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
            >
              Sign In
            </button>
            <p style={{ fontStyle: "italic" }}>
              Don't have accont?{" "}
              <Link to="/signup" className="text-green-600">
                Signup here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </form>
  );
};

export default SigninForm;
