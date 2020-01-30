import React, { useContext } from 'react';
import _ from 'lodash';

import UserContext from "../../context/UserContext";
import Card from "../../components/Card/Card";
import ReviewForm from "./ReviewForm";
import {RouteLink} from "../../components/typography";

function ReviewListSegment({ reviews, onSubmit, employeeId }) {
  const { user } = useContext(UserContext);

  const canManage = employeeId === user;

  return (
    <ul>
      {reviews.map(review => (
        <li key={`${review.id}-${review.updatedAt}`}>
          <Card>
            {!canManage && (
              <h3>
                <RouteLink to={`/employee/${review.employeeId}`}>
                  For: Employee #{review.employeeId}
                </RouteLink>
              </h3>
            )}

            {user !== review.assignedId && (
              <h3>
                <RouteLink to={`/employee/${review.assignedId}`}>
                  From: Employee #{review.assignedId}
                </RouteLink>
              </h3>
            )}

            {!canManage && user === review.assignedId ? (
              <ReviewForm review={review} onComplete={onSubmit} />
            ) : (
              <p>
                {review.feedback || (<strong>Pending Review</strong>)}
              </p>
            )}
          </Card>
        </li>
      ))}
    </ul>
  );
}

export default function ReviewsList({ reviews = [], ...restProps }) {
  const { employeeId } = restProps;
  const { user } = useContext(UserContext);

  if (!reviews.length) return null;

  const [completeReviews, incompleteReviews] = _.partition(reviews, review => review.feedback);

  const canManage = employeeId === user;

  return (
    <div>
      <h2>{canManage && 'Your '}Reviews</h2>

      <h3>Pending</h3>
      <ReviewListSegment {...restProps} reviews={incompleteReviews} />

      <h3>Complete</h3>
      <ReviewListSegment {...restProps} reviews={completeReviews} />
    </div>
  );
}