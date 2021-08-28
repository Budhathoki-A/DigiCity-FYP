import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { authority } from "../../utils/info";

const SubscriptionRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      exact
      render={(props) =>
       ( user.auth === authority.admin || user.auth === authority.teacher)? (
          <Component {...props} />
        ) : user.stripeSubId ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/404",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default SubscriptionRoute;
