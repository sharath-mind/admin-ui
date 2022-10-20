import React, { useContext } from "react";
import AlertContext from "../../AlertContext";
import { CloseIcon } from "../../Assets/icons";
import "./alert.css";

const Alert = () => {
  const { alertData, closeAlert } = useContext(AlertContext);
  const onAccept = () => {
    alertData?.acceptCallBack();
    closeAlert();
  };
  return (
    <>
      {alertData && (
        <>
          <div className="alert-backdrop"></div>
          <div className="alert-container">
            <div className="close-btn" onClick={closeAlert}>
              <CloseIcon />
            </div>
            <h1>{alertData.header}</h1>
            <p dangerouslySetInnerHTML={{__html:alertData.message}} />
            <div onClick={onAccept} className="ok-btn">
              OK
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Alert;
