import React, { useState } from "react";
import "./NavBar.css";
import "./Form.css";
import axios from "axios";

interface Props {
  setEmailSentMessage: React.Dispatch<React.SetStateAction<string>>;
}
const ForgotPasswordForm: React.FC<Props> = ({ setEmailSentMessage }) => {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const handleSubmit = (e: React.MouseEvent) => {
    axios
      .post("http://localhost:5000/api/users/forgot-password", { email })
      .then(({ data: { message } }) => {
        setEmailSentMessage(message);
      })
      .catch(
        ({
          response: {
            data: { errors },
          },
        }) => {
          setErrorEmail(Object.values(errors)[0] as string);
        }
      );
  };
  return (
    <div className="form">
      <div className="input">
        <label>Email:</label>
        <input
          onInput={(e) => {
            setEmail(e.currentTarget.value);
            setErrorEmail("");
          }}
          value={email}
          type="text"
          id="email"
          placeholder="Enter Email"
        />
        {errorEmail !== "" && <div className="error">{errorEmail}</div>}{" "}
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ForgotPasswordForm;
