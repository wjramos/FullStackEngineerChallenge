import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import {EMPLOYEE_ENDPOINT, REVIEW_ENDPOINT} from "../../constants/endpoints";
import fetchWithRetry from "../../utils/fetchWithRetry";
import Card from "../../components/Card";
import AnimatedList from "../../components/AnimatedList";
import CreateUpdateEmployee from "../../components/CreateUpdateEmployee";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import {FlexRow} from "../../components/layout";
import UserContext from "../../context/UserContext";

const RemoveButton = styled.span`
  font-size: 28px;
  color: #f00;
  margin-right: 8px;
`;

export default function Employees() {
  const [employees, setEmployees] = useState(null);
  const [pendingFetch, setPending] = useState(true);
  const [reviews, setReviews] = useState(null);
  const { user, setUser } = useContext(UserContext);

  const fetchReviews = useCallback(async () => {
    const result = await fetchWithRetry(REVIEW_ENDPOINT);

    setReviews(result);
  }, [setReviews]);

  const createReview = useCallback(async ({ employeeId, assignedId }) => {
    const result = await fetchWithRetry(
      REVIEW_ENDPOINT,
      'PUT',
      {
        employeeId,
        assignedId,
      },
    );

    setReviews(result);
  }, [setReviews]);

  const fetchEmployees = useCallback(async () => {
    const result = await fetchWithRetry(EMPLOYEE_ENDPOINT);

    setEmployees(result);

    setPending(false);
  }, [setEmployees, setPending]);

  const removeEmployee = useCallback(async employeeId => {
    await fetchWithRetry(
      EMPLOYEE_ENDPOINT,
      'DELETE',
      { employeeId },
      );

    setPending(true);
  }, [setPending]);

  useEffect(() => {
    pendingFetch && fetchEmployees();
  }, [pendingFetch, fetchEmployees]);

  // @TODO separate pending state
  useEffect(() => {
    pendingFetch && fetchReviews();
  }, [fetchReviews]);

  if (!employees) return (
    <Loader />
  );

  return (
    <>
      <h1>Employee Directory</h1>

      <AnimatedList
        items={employees}
        getKeys={employee => employee.id}
        renderItem={employee => (
          <Link to={`/employee/${employee.id}`}>
            <Card>
              <FlexRow>
                {user === 'admin' && (
                  <RemoveButton
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      removeEmployee(employee.id);
                    }}>
                    &times;
                  </RemoveButton>
                )}

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
        )}
      />

      {user === 'admin' && (
        <CreateUpdateEmployee onComplete={() => setPending(true)} />
      )}
    </>
  );
}