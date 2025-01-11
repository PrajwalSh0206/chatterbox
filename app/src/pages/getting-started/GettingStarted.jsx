import { useState } from "react";
import SignUp from "./components/sign-up/SignUp";
import Login from "./components/login/login";

const GettingStarted = () => {
  const [pageType, setPageType] = useState("login");

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div id="card" className="w-4/12 flex flex-col space-y-2 text-gray-600 items-center border-2 shadow-md rounded-md p-7">
        <div className="w-3/12 bg-gray-700 text-white p-5 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
            />
          </svg>
        </div>
        <p className="text-2xl text-gray-800">Connect</p>
        <p id="subtext" className="pb-2">
          {pageType == "login" ? "Lets Connect With Your Friends" : "Sign up and connect with friends!"}
        </p>
        {pageType == "login" ? <Login></Login> : <SignUp></SignUp>}
        <div id="line" className="bg-gray-600 w-full h-1 rounded-full"></div>
        {pageType == "login" ? (
          <p>
            Dont have an account,{" "}
            <button className="text-indigo-500 hover:text-gray-500" onClick={() => setPageType("signup")}>
              Create One
            </button>
          </p>
        ) : (
          <p>
            Already have an account,{" "}
            <button className="text-indigo-500 hover:text-gray-500" onClick={() => setPageType("login")}>
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default GettingStarted;
