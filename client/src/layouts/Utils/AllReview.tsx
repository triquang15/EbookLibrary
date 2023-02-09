import React from "react";
import Review from "../../models/Review";
import { StarReview } from "./StarReview";

export const AllReview: React.FC<{ review: Review }> = (props) => {
    const date = new Date(props.review.date);
    const longMonth = date.toLocaleString('en-us', { month: 'long' });
    const dateDay = date.getDate();
    const dateYear = date.getFullYear();
    const dateRender = longMonth + ' ' + dateDay + ', ' + dateYear;

    return (
        <div>
            <div className="col-sm-8 col-md-8">
                <h6 className="text-muted">{props.review.email}</h6>
                <h5>{props.review.headline}</h5>
                <div className="row">
                    <div className="col">
                         Reviewed on {dateRender}
                    </div>
                    <div className="col">
                        <StarReview rating={props.review.rating} size={16} />
                    </div>
                </div>
                <div className="mt-2">
                    <p>{props.review.message}</p>
                </div>
            </div>
        </div>
    );
}