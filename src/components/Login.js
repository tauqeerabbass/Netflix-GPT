import React from "react";
import Header from "./Header";
import { useState } from "react";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/NL-en-20250106-TRIFECTA-perspective_cdfb3385-ee3d-4827-acfc-b41ead0304f6_large.jpg" />
      <form className="bg-black absolute mt-[-615px] mx-auto right-0 left-0 w-4/12 rounded-lg opacity-90">
        <h1 className="text-3xl text-white font-bold ml-12 p-4 pt-12 pb-7">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            className=" bg-gray-600 w-72 mx-16 mb-4 p-[13px] rounded-lg"
            type="text"
            placeholder="Full Name"
          />
        )}
        <input
          className=" bg-gray-600 w-72 mx-16 mb-4 p-[13px] rounded-lg"
          type="text"
          placeholder="Email Address"
        />
        <input
          className=" bg-gray-600 w-72 mx-16 mb-4 p-[13px] rounded-lg"
          type="password"
          placeholder="Password"
        />
        <button className="w-72 bg-red-600 text-white mx-16 p-2 rounded-lg">
          Sign In
        </button>
        <p
          className="text-white mx-16 mt-8 cursor-pointer mb-12"
          onClick={toggleForm}
        >
            {isSignInForm? "New to Netflix? Sign up now." : "Already a member? Sign in now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
