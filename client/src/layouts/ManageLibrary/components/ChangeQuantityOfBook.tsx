import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import Book from "../../../models/Book";

export const ChangeQuantityOfBook: React.FC<{ book: Book, deleteBook: any }> = (props, key) => {
    const { authState } = useOktaAuth();
    const [quantity, setQuantity] = useState<number>(0);
    const [remaining, setRemaining] = useState<number>(0);
    

    useEffect(() => {
        const fetBookInState = () => {
            props.book.copies ? setQuantity(props.book.copies) : setQuantity(0);
            props.book.copiesAvailable ? setRemaining(props.book.copiesAvailable) : setRemaining(0);
        };
        fetBookInState();
    }, []);

    async function inCreaseQuantity() {
        const url = `${process.env.REACT_APP_API}/admin/secure/increase/book/quantity/?bookId=${props.book?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const quantityUpdateResponse = await fetch(url, requestOptions);
        if(!quantityUpdateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setQuantity(quantity + 1);
        setRemaining(remaining + 1);
    }

    async function inDereaseQuantity() {
        const url = `${process.env.REACT_APP_API}/admin/secure/decrease/book/quantity/?bookId=${props.book?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const quantityUpdateResponse = await fetch(url, requestOptions);
        if(!quantityUpdateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setQuantity(quantity - 1);
        setRemaining(remaining - 1);
    }

    async function deleteBook() {
        const url = `${process.env.REACT_APP_API}/admin/secure/delete/book/?bookId=${props.book?.id}`;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const updateResponse = await fetch(url, requestOptions);
        if (!updateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        props.deleteBook();
    }

    return (
        <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-2">
                    <div className="d-none d-lg-block">
                        {props.book.image ?
                            <img src={props.book.image} width='200' height='300' alt="book" />
                            :
                            <img src={require('./../../../Images/BooksImages/new-book-1.jpg')} width='200' height='300' alt="Default" />
                        }
                    </div>
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                        {props.book.image ?
                            <img src={props.book.image} width='200' height='300' alt="book" />
                            :
                            <img src={require('./../../../Images/BooksImages/new-book-1.jpg')} width='200' height='300' alt="Default" />
                        }
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">by {props.book.author}</h5>
                        <h4>{props.book.title}</h4>
                        <p className="card-center">{props.book.description}</p>
                    </div>
                </div>
                <div className="mt-3 col-md-4">
                    <div className="d-flex justify-content-center align-items-center">
                        <p>Total Quantity: <b>{quantity}</b></p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <p>Book Remaining: <b>{remaining}</b></p>
                    </div>
                </div>
                <div className="mt-3 col-md-4">
                    <div className="d-flex justify-content-start">
                        <button onClick={deleteBook} className="m-1 btn btn-md btn-danger">DELETE</button>
                        <button onClick={inCreaseQuantity} className="m-1 btn btn-md btn-info">UPDATE </button>
                        <button onClick={inDereaseQuantity} className="m-1 btn btn-md btn-warning">DECREASE </button>
                    </div>
                </div>
            </div>
        </div>
    );
}