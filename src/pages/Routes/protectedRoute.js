import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../context/authContext";


const ProtectedRoute = ({
  component: Component,
  authorityTobeChecked,
  ...rest
}) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      exact
      render={(props) =>
        (user.auth === authorityTobeChecked) ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: '/404',
                state: { from: props.location },
              }}
            />
          )}
    />
  );
};

export default ProtectedRoute;
