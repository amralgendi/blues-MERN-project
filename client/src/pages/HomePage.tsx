import React from "react";
import "./HomePage.css";
// import axios from "axios";
import { useSelector } from "react-redux";
// import { authActions } from "../store/auth-slice";
import { RootState } from "../store";

const HomePage: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <>
      {!isLoggedIn && (
        <div className="welcome">Welcome to Amr AlGendi's Todo App</div>
      )}
      {isLoggedIn && <div>Hello</div>}
    </>
  );
};

export default HomePage;
