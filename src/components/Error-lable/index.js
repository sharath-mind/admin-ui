import React from "react";
import "./error-lable.css";

const ErrorLable = ({message, forName}) => {
  return (
    <label className="error-lable" for={forName}>
      {message}
    </label>
  );
}

export default ErrorLable

