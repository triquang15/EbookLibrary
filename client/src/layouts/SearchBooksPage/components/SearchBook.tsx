import { Link } from "react-router-dom";
import Book from "../../../models/Book";

export const SearchBook: React.FC<{ book: Book }> = (props) => {
    return (
        <div className="card mt-3 shadown p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-2">
                    <div className="d-none d-lg-block">
                        {props.book.image ?
                            <img src={props.book.image} alt="book" width='200' height='300' />
                            :
                            <img src={require('./../../../Images/BooksImages/new-book-1.jpg')} width='123' height='196' alt="Book" />
                        }
                    </div>
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                        {props.book.image ?
                            <img src={props.book.image} alt="book" width='123' height='196' />
                            :
                            <img src={require('./../../../Images/BooksImages/new-book-1.jpg')} width='123' height='196' alt="Book" />
                        }
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="card-body">
                        <h4 className="card-title">
                            {props.book.title}
                        </h4>
                        <h6>by <i className="text-primary">{props.book.author}</i> (Author)</h6>
                        <p className="card-text">{props.book.description}</p>
                    </div>
                </div>
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                    <Link className="btn btn-sm btn-danger text-blue" to={`/checkout/${props.book.id}`}>Read preview</Link>
                </div>
            </div>
        </div>
    );
}