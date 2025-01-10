import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import {validateUserData} from "../utils/Validate";
import { auth } from "../utils/firebase";
import {useDispatch} from "react-redux";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { setUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const validateInfo = () => {
    const message = validateUserData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (!isSignInForm) {
        //Sign Up Logic
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
    else{
        //Sign In Logic
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {displayName: name.current.value})
            .then(() => {
              const {uid, email, displayName} = auth.currentUser;
              dispatch(setUser({uid:uid , email:email, displayName:displayName}));
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  }

  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/NL-en-20250106-TRIFECTA-perspective_cdfb3385-ee3d-4827-acfc-b41ead0304f6_large.jpg" />
      <form className="bg-black absolute mt-[-615px] mx-auto right-0 left-0 w-4/12 rounded-lg opacity-90" onSubmit={(e) => e.preventDefault()}>
        <h1 className="text-3xl text-white font-bold ml-12 p-4 pt-12 pb-7">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
          ref={name}
            className=" bg-gray-600 w-72 mx-16 mb-4 p-[13px] rounded-lg"
            type="text"
            placeholder="Full Name"
          />
        )}
        <input
        ref={email}
          className=" bg-gray-600 w-72 mx-16 mb-4 p-[13px] rounded-lg"
          type="text"
          placeholder="Email Address"
        />
        <input
        ref={password}
          className=" bg-gray-600 w-72 mx-16 mb-4 p-[13px] rounded-lg"
          type="password"
          placeholder="Password"
        />
        <p className="font-bold text-lg text-red-600 mx-16 my-4">{errorMessage}</p>
        <button className="w-72 bg-red-600 text-white mx-16 p-2 rounded-lg" onClick={validateInfo}>
          {isSignInForm ? "Sign In" : "Sign Up"}
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
