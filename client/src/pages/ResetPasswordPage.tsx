import React from "react";
import { useParams } from "react-router-dom";
import ResetPasswordForm from "../components/ResetPasswordForm";
const ResetPasswordPage: React.FC = () => {
  const { id, token } = useParams();
  console.log(id, token);

  return <ResetPasswordForm id={id as string} token={token as string} />;
};

export default ResetPasswordPage;
