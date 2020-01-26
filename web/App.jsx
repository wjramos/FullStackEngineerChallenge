import React, { useState, createContext } from "react";

import GlobalStyles from "./components/GlobalStyles";
import AppRouter from "./views";
import Header from "./components/Header";

export const UserContext = createContext(null);

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <GlobalStyles />

      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <AppRouter />
      </UserContext.Provider>
    </>
  );
}
