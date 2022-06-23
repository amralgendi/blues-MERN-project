import React, { useState } from "react";
import "./NavBar.css";
import "./Form.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
type registerInputsTypes = "email" | "password" | "confirmPassword";

interface Props {
  setCodeSent: React.Dispatch<React.SetStateAction<boolean>>;
}
const RegisterForm: React.FC<Props> = ({ setCodeSent }) => {
  const dispatch = useDispatch();
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInput = (value: string, key: registerInputsTypes) => {
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
  const handleRegister = (e: React.MouseEvent) => {
    axios
      .post("http://localhost:5000/api/users/register", formInputs)
      .then(({ data: { success, data } }) => {
        if (!success) {
          console.log("bad");
          return;
        }
        localStorage.setItem("token", data.token);
        dispatch(
          authActions.signin({
            id: data.id,
            email: data.email,
            verified: data.verified,
          })
        );
        setCodeSent(true);
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
              e.currentTarget.id as registerInputsTypes
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
              e.currentTarget.id as registerInputsTypes
            )
          }
          type="text"
          id="password"
          placeholder="8+ characters"
        />
        {errors.password !== "" && (
          <div className="error">{errors.password}</div>
        )}{" "}
      </div>
      <div className="input">
        <label>Confirm Password:</label>
        <input
          onInput={(e) =>
            handleInput(
              e.currentTarget.value,
              e.currentTarget.id as registerInputsTypes
            )
          }
          type="text"
          id="confirmPassword"
          placeholder="Confirm password"
        />
        {errors.confirmPassword !== "" && (
          <div className="error">{errors.confirmPassword}</div>
        )}
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterForm;
