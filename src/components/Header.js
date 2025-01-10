import React from "react";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
    onAuthStateChanged(auth, (user) => {
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
  })}, []);

  return (
    <div className="flex justify-between">
      <div>
      <img
      className="absolute w-[350px] left-12 top-[-10px] py-4 px-[80px] bg-gradient-to-b from-black"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7f67-86aa-d06aa27c6cc0/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      </div>
      {user && <div className="flex p-4">
      <img className="w-12 pr-3" src="https://cdn-icons-png.freepik.com/256/6884/6884443.png?ga=GA1.1.1042756061.1735142965&semt=ais_hybrid"/>
      <button onClick={handleSignOut} className="font-bold">Sign Out</button>
      </div>}    
    </div>
  );
};

export default Header;
