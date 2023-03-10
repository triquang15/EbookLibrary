import React from "react";
import { Link } from "react-router-dom";
import Book from "../../../models/Book";

export const ReturnBook: React.FC<{ book: Book }> = (props) => {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                {props.book.image ?
                    <img src={props.book.image} width='200' height='300' alt="Book" /> 
                    :
                    <img src={require('./../../../Images/BooksImages/new-book-1.jpg')} width='250' height='300' alt="Book" />
                }
                <h6 className="mt-2">{props.book.title}</h6>
                <p>by <i><b>{props.book.author}</b></i></p>
                <Link className="btn main-color text-white btn-sm" to={`checkout/${props.book.id}`}>Borrow</Link>
            </div>
        </div>
    );
}