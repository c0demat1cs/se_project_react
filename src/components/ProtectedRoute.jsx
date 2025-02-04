import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUserContext";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const from = location.state?.form || "/";

  // destructure isLoggedIn from the value provided by the CurrentUserContext
  const { isLoggedIn } = useContext(CurrentUserContext);

  // if the user is logged in, redirect away from anonymous routes
  if (isLoggedIn) {
    return <Navigate to={from} />;
  }

  // if user is not logged in, redirect to the login page
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // otherwise, render the protected route's child component
  return children;
}
``;
