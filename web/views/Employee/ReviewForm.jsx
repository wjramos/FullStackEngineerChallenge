import React, {useCallback, useState} from 'react';

import Input from "../../components/Input";
import Button from "../../components/Button";
import fetchWithRetry from "../../utils/fetchWithRetry";
import {REVIEW_ENDPOINT} from "../../constants/endpoints";
import {FlexRow} from "../../components/layout";
import {Link} from "../../components/Typography";

export default function ReviewForm({ review, onComplete }) {
  const [isEditing, setEditing] = useState(!review.feedback);
  const [feedback, setFeedback] = useState(review.feedback || '');

  const submitReview = useCallback(async () => {
    try {
      const result = await fetchWithRetry(REVIEW_ENDPOINT, 'PATCH', {
        ...review,
        feedback,
      });

      onComplete && onComplete(result);
    } catch (e) {
      // @TODO error handling
      console.error(e);
    }
  }, [feedback]);

  const toggleEdit = useCallback(() => {
    setEditing(!isEditing);
    setFeedback(review.feedback || '');
  }, [isEditing, setEditing, review, setFeedback]);

  const onSubmit = useCallback(() => {
    submitReview();
    toggleEdit();
  }, [submitReview, toggleEdit]);

  return (
    <>
      {isEditing ? (
        <Input
          rows={8}
          value={feedback}
          onChange={setFeedback}
        />
      ) : (
        <p>
          {feedback}
        </p>
      )}

      <FlexRow>
        {isEditing ? (
          <>
            <Link onClick={toggleEdit} color="#f00">Cancel</Link>

            <Button onClick={onSubmit} disabled={feedback === (review.feedback || '')}>
              Submit feedback
            </Button>
          </>
        ) : (
          <Button onClick={toggleEdit}>
            Edit Review
          </Button>
        )}

      </FlexRow>
    </>
  );
}