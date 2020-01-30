import React, {useState, useEffect, useCallback, useContext} from 'react';

import { REVIEW_ENDPOINT } from "../../constants/endpoints";
import fetchWithRetry from "../../utils/fetchWithRetry";
import UserContext from "../../context/UserContext";
import queryString from "querystring";
import Loader from "../../components/Loader";
import ReviewsList from "../Employee/ReviewsList";

export default function Reviews() {
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [isPending, setPending] = useState(true);

  const fetchReviews = useCallback(async () => {
    setPending(true);

    try {
      const query = user === 'admin' ? '' : `?${queryString.stringify({ assignedId: user })}`;
      const result = await fetchWithRetry(`${REVIEW_ENDPOINT}${query}`);

      setReviews(result);
    } catch (e) {
      // @TODO handle error -- redirect
    } finally {
      setPending(false);
    }
  }, [setReviews, setPending]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  if (isPending) {
    return <Loader />;
  }

  return (
    <div>
      <ReviewsList onSubmit={fetchReviews} reviews={reviews} />
    </div>
  );
}