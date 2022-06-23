import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [mailSentMessage, setEmailSentMessage] = useState("");
  useEffect(() => {
    if (mailSentMessage) {
      setTimeout(() => navigate("/"), 2000);
    }
  }, [mailSentMessage, navigate]);
  return (
    <>
      {!mailSentMessage && (
        <ForgotPasswordForm setEmailSentMessage={setEmailSentMessage} />
      )}
      {mailSentMessage && <div>{mailSentMessage}, redirecting...</div>}
    </>
  );
};

export default ForgotPasswordPage;
