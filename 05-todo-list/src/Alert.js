import React, { useEffect } from 'react';

const Alert = ({ alert, setAlert, inputRef }) => {
  useEffect(() => {
    const closeAlert = () => {
      setAlert({ ...alert, isShow: false });
    };
    const timeout = setTimeout(() => closeAlert(), 2000);
    return () => clearTimeout(timeout);
  }, [alert, setAlert]);

  const { type, message } = alert;
  return <p className={`alert ${type}`}>{message}</p>;
};

export default Alert;
