import { useEffect, useState } from "react";
import Book from "../../models/Book";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const CheckoutPage = () => {

    const [book, setBooks] = useState<Book>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const bookId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const loadBooks: Book = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                image: responseJson.image
            };

            setBooks(loadBooks);
            setIsLoading(false);
        };
        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {book?.image ?
                            <img src={book?.image} width='226' height='349' alt="book" />
                            :
                            <img src={require('./../../Images/BooksImages/new-book-1.jpg')} width='226' height='349' alt="Book" />
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h6>by <i className="text-primary">{book?.author}</i></h6>
                            <p className="lead">{book?.description}</p>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {book?.image ?
                        <img src={book?.image} width='226' height='349' alt="book" />
                        :
                        <img src={require('./../../Images/BooksImages/new-book-1.jpg')} width='226' height='349' alt="Book" />
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h6>by <i className="text-primary">{book?.author}</i></h6>
                        <p className="lead">{book?.description}</p>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    );
}