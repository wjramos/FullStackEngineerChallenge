import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Employees from "./Employees";
import { UserContext } from "../App";
import Reviews from "./Reviews";
import Button from "../components/Button"

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
  const { setUser } = useContext(UserContext);

  return (
    <Router>
      <Switch>
        <PrivateRoute path="/employee/:employeeId">
          {/*<Employee />*/}
        </PrivateRoute>

        <PrivateRoute path="/employee">
          <Employees />
        </PrivateRoute>

        <PrivateRoute path="/review/:reviewId">
          {/*<Review />*/}
        </PrivateRoute>

        <PrivateRoute path="/review">
          <Reviews />
        </PrivateRoute>

        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}