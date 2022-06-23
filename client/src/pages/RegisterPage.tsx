import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import VerificationCode from "../components/VerificationCode";
const RegisterPage: React.FC = () => {
  const [codeSent, setCodeSent] = useState(false);
  return (
    <>
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
