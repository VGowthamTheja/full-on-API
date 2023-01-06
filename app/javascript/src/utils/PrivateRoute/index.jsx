import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import LoadSpinner from "../../components/LoadSpinner";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { userState, spinner, setSpinner } = useContext(AuthContext);
  const renderChildren = () => {
    if (userState.loggedIn==='NOT_LOGGED_IN'){
      setSpinner(true)
      return <Navigate to={'/login'} />;
    } else if (userState.loggedIn==='LOGGED_IN'){
      setSpinner(true)
      return children
    }
  }
  return (
    <>
      {renderChildren()}
    </>
  )
};

export default PrivateRoute;
