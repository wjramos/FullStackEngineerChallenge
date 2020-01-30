import React, {useCallback, useState} from 'react';
import styled from "@emotion/styled";

import Input from "../../components/Input";
import Button from "../../components/Button";
import fetchWithRetry from "../../utils/fetchWithRetry";
import {REVIEW_ENDPOINT} from "../../constants/endpoints";
import {FlexRow} from "../../components/layout";
import {Link} from "../../components/typography";

const FormButtonRow = styled(FlexRow)`
  margin-top: 32px;
`;

export default function ReviewForm({ review, onComplete }) {
  const [isEditing, setEditing] = useState(!review.feedback);
  const [feedback, setFeedback] = useState(review.feedback || '');

  const toggleEdit = useCallback(() => {
    setEditing(!isEditing);
  }, [isEditing, setEditing]);

  const submitReview = useCallback(async () => {
    try {
      const result = await fetchWithRetry(REVIEW_ENDPOINT, 'PATCH', {
        ...review,
        feedback,
      });

      toggleEdit();
      setFeedback(review.feedback || '');

      console.log(result)
      onComplete && onComplete(result);
    } catch (e) {
      // @TODO error handling
      console.error(e);
    }
  }, [feedback, toggleEdit, setFeedback]);

  const onSubmit = useCallback(() => {
    submitReview();
  }, [submitReview]);

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

      <FormButtonRow>
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

      </FormButtonRow>
    </>
  );
}