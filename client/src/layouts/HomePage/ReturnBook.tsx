import React from "react";

export const ReturnBook = () => {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                <img src={require('./../../Images/BooksImages/new-book-1.jpg')} width='200' height='300' alt="Book" />
                <h6 className="mt-2">Books</h6>
                <p>Book Library</p>
                <a className="btn main-color text-white btn-sm" href="#">Reverve</a>
            </div>
        </div>
    );
}