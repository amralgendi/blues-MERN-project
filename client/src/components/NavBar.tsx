import React from "react";
import "./NavBar.css";
import { useSelector } from "react-redux";

import { RootState } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch(authActions.signout());
    navigate("/");
  };
  return (
    <div className="nav-bar">
      <div id="title">
        <Link to="/">Todo App</Link>
      </div>
      <div className="links">
        {!isLoggedIn && (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <a href="#" onClick={handleLogout}>
              Log Out
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
