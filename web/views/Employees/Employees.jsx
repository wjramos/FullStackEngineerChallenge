import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import { EMPLOYEE_ENDPOINT } from "../../constants/endpoints";
import fetchWithRetry from "../../utils/fetchWithRetry";
import { UserContext } from "../../App";
import Card from "../../components/Card";
import AnimatedList from "../../components/AnimatedList";
import CreateEmployee from "./CreateEmployee";
import Button from "../../components/Button";

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [pendingFetch, setPending] = useState(true);
  const { user, setUser } = useContext(UserContext);

  const fetchEmployees = useCallback(async () => {
    const result = await fetchWithRetry(EMPLOYEE_ENDPOINT);

    setEmployees(result);
  }, [setEmployees]);

  useEffect(() => {
    if (pendingFetch) fetchEmployees();
  }, [pendingFetch, fetchEmployees]);

  return (
    <>
      <h1>Employee Directory</h1>

      <AnimatedList>
        {employees.map(employee => (
          <li key={employee.id}>
            <Link to={`/employee/${employee.id}`}>
              <Card>
                <FlexRow>
                  <img src={require('../../images/user.svg')} alt="" style={{ maxWidth: 55, paddingRight: 8 }} />

                  <FlexRow style={{ marginRight: 'auto' }}>
                    <h3 style={{ marginRight: 8 }}>
                      {employee.firstName}&nbsp;{employee.lastName}
                    </h3>
                    <p>
                      {employee.title}
                    </p>
                  </FlexRow>

                  {/* @NOTE in development, allow simulation of authenticated employees */}
                  {process.env.NODE_ENV !== 'production' && user !== employee.id && (
                    <Button style={{ fontSize: 12, padding: 4, margin: 4, boxShadow: 'none' }} onClick={() => setUser(employee.id)}>
                      Become user
                    </Button>
                  )}
                </FlexRow>
              </Card>
            </Link>
          </li>
        ))}
      </AnimatedList>

      {user === 'admin' && (
        <CreateEmployee onComplete={() => setPending(true)} />
      )}
    </>
  );
}