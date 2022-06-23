import React, { useState } from "react";
import "./NavBar.css";
import "./Form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type passwordInputTypes = "password" | "confirmPassword";
interface Props {
  id: string;
  token: string;
}
const ForgotPasswordForm: React.FC<Props> = ({ id, token }) => {
  const navigate = useNavigate();
  const [passwordInputs, setPasswordInputs] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleInput = (key: passwordInputTypes, value: string) => {
    setPasswordInputs((inputs) => {
      inputs[key] = value;
      return inputs;
    });
    setErrors((e) => {
      e[key] = "";
      return { ...e };
    });
  };
  const handleSubmit = (e: React.MouseEvent) => {
    console.log(passwordInputs);

    axios
      .post(
        `http://localhost:5000/api/users/reset-password/${id}/${token}`,
        passwordInputs
      )
      .then(({ data: { success } }) => {
        if (success) navigate("/signin");
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
        <label>Password:</label>
        <input
          onInput={(e) => {
            handleInput(
              e.currentTarget.id as passwordInputTypes,
              e.currentTarget.value
            );
          }}
          value={passwordInputs.password}
          type="text"
          id="password"
          placeholder="Enter password"
        />
        {errors.password !== "" && (
          <div className="error">{errors.password}</div>
        )}
      </div>
      <div className="input">
        <label>Confirm Password:</label>
        <input
          onInput={(e) => {
            handleInput(
              e.currentTarget.id as passwordInputTypes,
              e.currentTarget.value
            );
          }}
          value={passwordInputs.confirmPassword}
          type="text"
          id="confirmPassword"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword !== "" && (
          <div className="error">{errors.confirmPassword}</div>
        )}
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ForgotPasswordForm;
