import React from "react";
import { useNavigate } from "react-router-dom";

// Will be used for all for buttons that go back to the previous page
const GoBackButton = ({ children }) => {
  const navigate = useNavigate();

  const handleGoBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  return <button onClick={handleGoBack}>{children}</button>;
};

export default GoBackButton;
