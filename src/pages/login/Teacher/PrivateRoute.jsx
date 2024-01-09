import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import "bootstrap/dist/css/bootstrap.css";
import "../../../assets/stylesheets/style.css"
import "../../../assets/stylesheets/login.css";

// Define a PrivateRoute component
const PrivateRoute = ({ component: Component, ...rest }) => {
  const [userState] = useContext(UserContext);
  const [delayedNavigation, setDelayedNavigation] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log()
    const delayTimeout = setTimeout(() => {
      // Set the flag to indicate that the delay is over, and navigation can proceed
      setDelayedNavigation(true);
    }, 500); // Adjust the delay time as needed (in milliseconds)

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(delayTimeout);
  }, []); // Run this effect only once on component mount

  // Use Navigate instead of Redirect for navigation
  return delayedNavigation ? (
    userState ? (
      <Outlet />
    ) : (
      navigate(`/login?redirectTo=${location.pathname}`)
    )
  ) : (
    // Display a loading message or spinner while waiting
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

// Export the PrivateRoute component
export default PrivateRoute;
