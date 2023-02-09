import React from "react";
import { Link } from "react-router-dom";
import Review from "../../models/Review";
import { AllReview } from "../Utils/AllReview";

export const LatestReview: React.FC<{
    reviews: Review[], bookId: number | undefined, mobile: boolean
}> = (props) => {
    return (
        <div className={props.mobile ? 'mt-3' : 'row mt-5'}>
            <div className={props.mobile ? '' : 'col-sm-2 col-md-2'}>
                <h3><b>Community Reviews</b></h3>
            </div>
            <div className="col-sm-10 col-md-10">
                {props.reviews.length > 0 ?
                <>
                    {props.reviews.slice(0, 3).map(eachReview => (
                        <AllReview review={eachReview} key={eachReview.id}></AllReview>
                    ))}

                    <div className="m-3">
                        <Link type="button" className="btn btn-danger btn-sm text-white"
                        to="#">
                        All reviewers</Link>
                    </div>
                </>    
                :
                <div className="m-3">
                    <p className="lead">No community reviews have been submitted for this work.</p>
                </div>
            }
            </div>
        </div>
    );
}