import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./Form.css";
import { authActions } from "../store/auth-slice";
const VerificationCode: React.FC = () => {
  const [code, setCode] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log(localStorage);

    axios
      .get(`http://localhost:5000/api/users/verify?code=${code}`, {
        headers: {
          authentication: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(({ data: { token, ...data } }) => {
        localStorage.setItem("token", token);
        dispatch(authActions.signin(data));
      })
      .catch(
        ({
          response: {
            data: { errors },
          },
        }) => {
          setErrorCode(Object.values(errors)[0] as string);
        }
      );
  };
  return (
    <div className="form">
      <div className="input">
        <label>Code:</label>
        <input
          type="text"
          placeholder="code"
          id="code"
          value={code}
          onInput={(e) => setCode(e.currentTarget.value)}
        />
        {errorCode !== "" && <div className="error">{errorCode}</div>}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default VerificationCode;
