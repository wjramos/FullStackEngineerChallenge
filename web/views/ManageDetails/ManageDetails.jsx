import React, { useCallback, useContext, useEffect, useState } from 'react';

import { UserContext } from "../../App";
import fetchWithRetry from "../../utils/fetchWithRetry";
import { EMPLOYEE_ENDPOINT } from "../../constants/endpoints";

export default function ManageDetails() {
  const { user } = useContext(UserContext);
  const [employee, setEmployee] = useState(null);

  const fetchEmployee = useCallback(async () => {
    const result = await fetchWithRetry(`${EMPLOYEE_ENDPOINT}/${user}`);

    setEmployee(result);
  }, [setEmployee]);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  return (
    <>
      {JSON.stringify(employee)}
    </>
  );
}