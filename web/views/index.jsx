import React, { useContext } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Employees from "./Employees";
import Reviews from "./Reviews";
import Button from "../components/Button"
import Employee from "./Employee";
import UserContext from "../context/UserContext";

function Login() {
  const { user, setUser } = useContext(UserContext);

  if (user) {
    return (
      <Redirect
        to={{
          pathname: "/employee",
        }}
      />
    );
  }

  return (
    <>
      <h1>Please log in</h1>

      <Button
        onClick={() => {
          setUser('admin');
        }}
      >
        Log In
      </Button>
    </>
  )
}

function PrivateRoute({ children, ...rest }) {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) => user ? children : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location }
          }}
        />
      )}
    />
  );
}

export default function AppRouter() {
  return (
    <Switch>
      <PrivateRoute path="/employee/:employeeId">
        <Employee />
      </PrivateRoute>

      <PrivateRoute path="/employee">
        <Employees />
      </PrivateRoute>

      <PrivateRoute path="/review">
        <Reviews />
      </PrivateRoute>

      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  );
}