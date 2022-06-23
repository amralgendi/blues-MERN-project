import React, { useState } from "react";
import SigninForm from "../components/SigninForm";
import VerificationCode from "../components/VerificationCode";
const SigninPage: React.FC = () => {
  const [codeSent, setCodeSent] = useState(false);
  console.log(codeSent);

  return (
    <>
      <h1>Sign in</h1>
      {!codeSent && (
        <>
          <SigninForm setCodeSent={setCodeSent} />
        </>
      )}
      {codeSent && <VerificationCode />}
    </>
  );
};

export default SigninPage;
