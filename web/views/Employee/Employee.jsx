import React, {useState, useEffect, useCallback, useContext} from 'react';
import { useParams } from 'react-router-dom';
import queryString from 'querystring';
import styled from "@emotion/styled";

import {Link, RouteLink} from "../../components/typography";
import Loader from "../../components/Loader";
import fetchWithRetry from "../../utils/fetchWithRetry";
import {EMPLOYEE_ENDPOINT, REVIEW_ENDPOINT} from "../../constants/endpoints";
import Card from "../../components/Card";
import CreateUpdateEmployee from "../../components/CreateUpdateEmployee";
import ReviewForm from "./ReviewForm";
import UserContext from "../../context/UserContext";
import ReviewsList from "./ReviewsList";

const EmployeeDetails = styled.div`
  text-align: center;
`;

export default function Employee() {
  const { user } = useContext(UserContext);
  const [isEditing, setEditing] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { employeeId } = useParams();

  const employeeIdInt = parseInt(employeeId, 10);

  const isCurrentUser = user === employeeIdInt;
  const canManage = isCurrentUser || user === 'admin';

  const fetchEmployee = useCallback(async () => {
    let result;

    try {
      result = await fetchWithRetry(`${EMPLOYEE_ENDPOINT}/${employeeId}`);
      setEmployee(result);
    } catch (e) {
      console.error(e);
    }
  }, [setEmployee, employeeId]);

  const fetchReviews = useCallback(async () => {
    const query = !canManage
      ? `?${queryString.stringify({ assignedId: user })}`
      : '';

    try {
      const result = await fetchWithRetry(`${REVIEW_ENDPOINT}/${employeeId}${query}`);

      setReviews(result);
    } catch(e) {
      console.error(e);
    }
  }, [setReviews, employeeId, user]);

  // Fetch employee
  useEffect(() => {
    if (!employee || employee.id !== employeeIdInt) {
      fetchEmployee();
    }
  }, [employee, employeeIdInt, fetchEmployee]);

  // Fetch reviews
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const onComplete = useCallback(result => {
    setEmployee(result);
    setEditing(false);
  }, [setEmployee, setEditing]);

  const onCancel = useCallback(() => {
    setEditing(false);
  }, [setEditing]);

  if (!employee) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <EmployeeDetails>
        <img
          src={require('../../images/user.svg')}
          alt=""
          style={{ maxWidth: 200, paddingRight: 8, margin: 'auto' }}
        />
        {isEditing ? (
          <CreateUpdateEmployee
            initialValues={employee}
            onCancel={onCancel}
            onComplete={onComplete}
          />
        ) : (
          <>
            <h1>{employee.firstName}&nbsp;{employee.lastName}</h1>
            <p>{employee.title}</p>

            {canManage && (
              <Link
                onClick={() => {
                  setEditing(true);
                }}
              >
                Edit Details
              </Link>
            )}
          </>
        )}
      </EmployeeDetails>

      <ReviewsList
        employeeId={employeeIdInt}
        reviews={reviews}
        onSubmit={fetchReviews}
      />
    </>
  );
}