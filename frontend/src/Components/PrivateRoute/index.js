import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import domains from "../../domains";

export const PrivateRoute = ({ children, privateAdminRoute, ...rest }) => {
  const user = useSelector((store) => store.user);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (privateAdminRoute) {
          if (user.isAuth && user.data.isAdmin) {
            return children;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/",
                  from: location,
                }}
              />
            );
          }
        } else if (user.isAuth) {
          return children;
        } else {
          <Redirect
            to={{
              pathname: domains.auth,
              from: location,
            }}
          />;
        }
      }}
    />
  );
};

PrivateRoute.defaultProps = {
  privateAdminRoute: false,
};
PrivateRoute.propTypes = {
  children: PropTypes.element,
  privateAdminRoute: PropTypes.bool,
};
