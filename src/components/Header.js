import React from "react";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {LOGO_URL} from "../utils/constans";
import {USER_ICON} from "../utils/constans";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store=>store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, email, displayName } = user;
      dispatch(
        setUser({
          uid: uid,
          email: email,
          displayName: displayName,
        })
      );
      navigate("/browse");
    } else {
      dispatch(removeUser());
      navigate("/");
    }
    
    return ()=>unsubscribe;
  })}, []);

  return (
    <div className="flex justify-between">
      <div>
      <img
      className="absolute w-[350px] left-12 top-[-10px] py-4 px-[80px] bg-gradient-to-b from-black"
        src={LOGO_URL}
        alt="logo"
      />
      </div>
      {user && <div className="flex p-4">
      <img className="w-12 pr-3" src={USER_ICON}/>
      <button onClick={handleSignOut} className="font-bold">Sign Out</button>
      </div>}    
    </div>
  );
};

export default Header;
