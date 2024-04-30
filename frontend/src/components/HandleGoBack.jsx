import React from "react";
import { useNavigate } from "react-router-dom";

const GoBackButton = ({ children }) => {
  const navigate = useNavigate();

  const handleGoBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  return <button onClick={handleGoBack}>{children}</button>;
};

export default GoBackButton;
