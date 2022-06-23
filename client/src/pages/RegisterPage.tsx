import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import VerificationCode from "../components/VerificationCode";
const RegisterPage: React.FC = () => {
  const [codeSent, setCodeSent] = useState(false);
  return (
    <>
      <h1>Register</h1>
      {!codeSent && (
        <div>
          <RegisterForm setCodeSent={setCodeSent} />
        </div>
      )}
      {codeSent && <VerificationCode />}
    </>
  );
};

export default RegisterPage;
