import { Link } from "react-router-dom";
import Book from "../../models/Book";

export const ReviewBox: React.FC<{book: Book | undefined, mobile: boolean}> = (props) => {
    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className="card-body container">
                <div className="mt-3">
                    <p><b>0/5</b> Shipping & Fee Details</p>
                </div>
                <hr />
                {props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
                    <h5 className="text-success">In Stock</h5>
                    :
                    <h5 className="text-danger">Wail List</h5>
                }
                <div className="row">
                    <p className="col-6 lead">
                        <b>{props.book?.copies}</b> Copies
                    </p>
                    <p className="col-6 lead">
                        <b>{props.book?.copiesAvailable}</b> Available
                    </p>
                </div>
            </div>
            <Link to='/#' className="btn btn-success btn-lg">Start Your Free Trial</Link>
            <hr />
            <p className="mt-3">Enjoying this preview? Become a member to read the full title.</p>
            <p>Join today and read free for 30 days. Need help?</p>
        </div>
    );
}