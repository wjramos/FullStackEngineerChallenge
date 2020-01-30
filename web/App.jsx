import React, {useState} from "react";
import {BrowserRouter as Router} from "react-router-dom";

import GlobalStyles from "./components/GlobalStyles";
import AppRouter from "./views";
import Header from "./components/Header";
import UserContext from "./context/UserContext";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <GlobalStyles />

      <UserContext value={{ user, setUser }}>
        <Header />
        <AppRouter />
      </UserContext>
    </Router>
  );
}
