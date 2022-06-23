import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth-slice";
import SigninPage from "./pages/SigninPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import jwt from "jsonwebtoken";

const App: React.FC = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const { id, email, verified } = jwt.decode(token) as jwt.JwtPayload;
  //     dispatch(
  //       authActions.signin({
  //         id,
  //         email,
  //         verified,
  //       })
  //     );
  //   }
  // }, [dispatch]);
  return (
    <div className="app">
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPasswordPage />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
