import React, { useState, useEffect, useCallback } from 'react';

import { REVIEW_ENDPOINT } from "../../constants/endpoints";
import fetchWithRetry from "../../utils/fetchWithRetry";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = useCallback(async () => {
    const result = await fetchWithRetry(REVIEW_ENDPOINT);

    setReviews(result);
  }, [setReviews]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

    return (
      <div>
        {reviews.length} reviews
      </div>
    );
  }