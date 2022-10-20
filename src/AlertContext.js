import { createContext, useState } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertData, setAlertData] = useState(false);

  const showAlert = (header, message, acceptCallBack) => {
    setAlertData({ message, header, acceptCallBack });
  };

  const closeAlert = () => {
    setAlertData(false);
  };

  return (
    <AlertContext.Provider value={{ alertData, showAlert, closeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
