import { useState } from "react";
import { StarReview } from "./StarReview";

export const LeaveReview: React.FC<{submitReview: any}> = (props) => {

    const [starInput, setStarInput] = useState(0);
    const [displayInput, setDisplayInput] = useState(false);
    const [reviewHeadline, setReviewHeadline] = useState('');
    const [reviewMessage, setReviewMessage] = useState('');

    function starValue(value: number) {
        setStarInput(value);
        setDisplayInput(true);
    }

    return (
        <div className="dropdown" style={{ cursor: 'pointer' }}>
            <h5 className="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                Leave a review?
            </h5>
            <ul id="submitRating" className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><button onClick={() => starValue(1)} className='dropdown-item'>1 star</button></li>
                <li><button onClick={() => starValue(2)} className='dropdown-item'>2 star</button></li>
                <li><button onClick={() => starValue(3)} className='dropdown-item'>3 star</button></li>
                <li><button onClick={() => starValue(4)} className='dropdown-item'>4 star</button></li>
                <li><button onClick={() => starValue(5)} className='dropdown-item'>5 star</button></li>
            </ul>
            <StarReview rating={starInput} size={25} />
            {displayInput &&
                <form method="POST" action="#">
                    <hr />
                    <div className="mb-3">
                        <input type="text" id="submitHeadline" placeholder="Headline" className="form-control"
                            onChange={e => setReviewHeadline(e.target.value)} /> <br />
                        <textarea className="form-control" id="submitMessage" placeholder="Message"
                            rows={3} onChange={e => setReviewMessage(e.target.value)}>
                        </textarea>
                    </div>
                    <div>
                        <button type="button" onClick={() => props.submitReview(starInput, reviewHeadline, reviewMessage)} className="btn btn-danger mt-3">Write a review</button>
                    </div>
                </form>
            }
        </div>
    );
}