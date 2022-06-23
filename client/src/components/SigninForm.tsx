import React, { useState } from "react";
import "./NavBar.css";
import "./Form.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
type signinInputsTypes = "email" | "password";

interface Props {
  setCodeSent: React.Dispatch<React.SetStateAction<boolean>>;
}

const SigninForm: React.FC<Props> = ({ setCodeSent }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const sendVerificationCode = (token: string) => {
    axios
      .get("http://localhost:5000/api/users/sendcode", {
        headers: {
          authentication: `Bearer ${token}`,
        },
      })
      .then(({ data: { message } }) => {
        console.log(message);
      });
  };

  const handleInput = (value: string, key: signinInputsTypes) => {
    setFormInputs((inputs) => {
      inputs[key] = value;
      return inputs;
    });
    setErrors((e) => {
      e[key] = "";
      console.log(e);
      return { ...e };
    });
  };
  const handleSignin = (e: React.MouseEvent) => {
    axios
      .post("http://localhost:5000/api/users/signin", formInputs)
      .then(({ data: { success, data } }) => {
        localStorage.setItem("token", data.jwt);
        dispatch(
          authActions.signin({
            id: data.id,
            email: data.email,
            verified: data.verified,
          })
        );
        localStorage.setItem("token", data.token);
        if (data.verified) navigate("/");
        else {
          sendVerificationCode(data.token);
          setCodeSent(true);
        }
      })
      .catch(
        ({
          response: {
            data: { errors },
          },
        }) => {
          setErrors((e) => {
            console.log({ ...e, ...errors });

            return {
              ...e,
              ...errors,
            };
          });
        }
      );
  };
  return (
    <div className="form">
      <div className="input">
        <label>Email:</label>
        <input
          onInput={(e) =>
            handleInput(
              e.currentTarget.value,
              e.currentTarget.id as signinInputsTypes
            )
          }
          type="text"
          id="email"
          placeholder="Enter Email"
        />
        {errors.email !== "" && <div className="error">{errors.email}</div>}
      </div>
      <div className="input">
        <label>Password:</label>
        <input
          onInput={(e) =>
            handleInput(
              e.currentTarget.value,
              e.currentTarget.id as signinInputsTypes
            )
          }
          type="text"
          id="password"
          placeholder="8+ characters"
        />
        {errors.password !== "" && (
          <div className="error">{errors.password}</div>
        )}
      </div>
      <Link to="/forgot-password">forgot password?</Link>

      <button onClick={handleSignin}>Sign in</button>
    </div>
  );
};

export default SigninForm;
