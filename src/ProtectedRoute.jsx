import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function ProtectedRoute({ component: Component, token, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !!token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default connect(({ auth: { token } }) => ({ token }))(ProtectedRoute);
