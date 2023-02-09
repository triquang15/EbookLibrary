import { Link } from "react-router-dom";
import Book from "../../models/Book";

export const ReviewBox: React.FC<{book: Book | undefined, mobile: boolean,
    currentLoansCount: number, isAuthenticated:any, isCheckout: boolean, checkoutBook: any}> = (props) => {

    function buttonRender() {
        if(props.isAuthenticated) {
            if(!props.isCheckout && props.currentLoansCount < 5) {
                return (<button onClick={() => props.checkoutBook()} className="btn btn-secondary btn-lg">Checked Out</button>)
            } else if(props.isCheckout) {
                return (<p><b>Book checked out. Enjoy!</b></p>)
            } else if(!props.isCheckout) {
                return (<p className="text-danger">Too many books checked out.</p>)
            }
        }

        return ( <Link to='/login' className="btn btn-success btn-lg">Want to Read</Link>)
    }

    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className="card-body container">
                <div className="mt-3">
                    <p><b>{props.currentLoansCount}/5</b> Check nearby libraries</p>
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
             {buttonRender()}
            <hr />
            <p className="mt-3">Enjoying this preview? Become a member to read the full title.</p>
            <p>Join today and read free for 30 days. Need help?</p>
        </div>
    );
}