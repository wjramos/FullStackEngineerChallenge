import React, {useContext, useEffect} from 'react';
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import UserContext from "../../context/UserContext";

const isDev = process.env.NODE_ENV !== 'development';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #fff;
  padding: 0 8px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 32px;
  z-index: 1000;
`;

const Logo = styled.div`
  margin-right: auto;
`;

export default function Header() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (isDev && user === null) {
      setUser('admin');
    }
  }, [user, setUser]);

  return (
    <HeaderContainer>
      <Link to="/employee">
        <Logo>
          <h2>Company</h2>
        </Logo>
      </Link>

      {isDev && (
        <label>
          <p style={{ margin: 0 }}>Switch Role:</p>
          <select value={user || ''} onChange={({ target }) => {
            setUser(target.value);
          }}>
            {/* Display current user when simulating */}
            {user && user !== 'admin' && (
              <option value={user}>User {user}</option>
            )}
            <option value="admin">Admin</option>
            <option value="">Logged out</option>
          </select>
        </label>
      )}
    </HeaderContainer>
  )
}