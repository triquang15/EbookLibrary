import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import Book from "../../models/Book";
import Review from "../../models/Review";
import ReviewRequest from "../../models/ReviewRequest";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarReview } from "../Utils/StarReview";
import { LatestReview } from "./LatestReview";
import { ReviewBox } from "./ReviewBox";

export const CheckoutPage = () => {

    const { authState } = useOktaAuth();

    const [book, setBooks] = useState<Book>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const bookId = (window.location.pathname).split('/')[2];

    // Review State
    const [reviews, setReviews] = useState<Review[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    const [isReviewLeft, setIsReviewLeft] = useState(false);
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

    // Loans Count State
    const [currentLoansCount, setCurrentLoansCount] = useState(0);
    const [isLoadingCurrentLoans, setIsLoadingCurrentLoans] = useState(true);

    //Is Book Check Out?
    const [isCheckout, setIsCheckout] = useState(false);
    const [isLoadingBookCheckout, setIsLoadingBookCheckout] = useState(true);

    // Payment
    const [displayError, setdisplayError] = useState(false);


    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `${process.env.REACT_APP_API}/books/${bookId}`;

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
    }, [isCheckout]);

    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `${process.env.REACT_APP_API}/reviews/search/findByBookId?bookId=${bookId}`;
            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJsonReviews = await responseReviews.json();
            const responseData = responseJsonReviews._embedded.reviews;
            const loadedReviews: Review[] = [];

            let weightedStarReviews: number = 0;
            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    email: responseData[key].email,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    book_id: responseData[key].book_id,
                    headline: responseData[key].headline,
                    message: responseData[key].message
                });
                weightedStarReviews = weightedStarReviews + responseData[key].rating;
            }

            if (loadedReviews) {
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }

            setReviews(loadedReviews);
            setIsLoadingReview(false);
        };

        fetchBookReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })
    }, [isReviewLeft]);

    useEffect(() => {
        const fetUserReviewBook = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/reviews/secure/user/book/?bookId=${bookId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const userReview = await fetch(url, requestOptions);
                if (!userReview.ok) {
                    throw new Error('Something went wrong!');
                }
                const userReviewJson = await userReview.json();
                setIsReviewLeft(userReviewJson);
            }
            setIsLoadingUserReview(false);
        }
        fetUserReviewBook().catch((error: any) => {
            setIsLoadingUserReview(false);
            setHttpError(error.message);
        })
    }, [authState]);

    useEffect(() => {
        const fetchUserCurrentLoans = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/books/checkout/currentloans`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const currentLoansCountResponse = await fetch(url, requestOptions);
                if (!currentLoansCountResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const loansResponseJson = await currentLoansCountResponse.json();
                setCurrentLoansCount(loansResponseJson);
            }
            setIsLoadingCurrentLoans(false);

        }
        fetchUserCurrentLoans().catch((error: any) => {
            setIsLoadingCurrentLoans(false);
            setHttpError(error.message);
        })
    }, [authState, isCheckout]);

    useEffect(() => {
        const fetchUserCheckoutBook = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/books/checkout/ischecked?bookId=${bookId}`;
                const responseOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application-json'
                    }
                };
                const bookCheckout = await fetch(url, responseOptions);
                if (!bookCheckout.ok) {
                    throw new Error('Something went wrong!');
                }
                const bookCheckoutJson = await bookCheckout.json();
                setIsCheckout(bookCheckoutJson);
            }
            setIsLoadingBookCheckout(false);
        }
        fetchUserCheckoutBook().catch((error: any) => {
            setIsLoadingBookCheckout(false);
            setHttpError(error.message);
        })
    }, [authState]);

    if (isLoading || isLoadingReview || isLoadingCurrentLoans || isLoadingBookCheckout || isLoadingUserReview) {
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

    async function submitReview(starInput: number, reviewHeadline: string, reviewMessage: string) {
        let bookId: number = 0;
        if (book?.id) {
            bookId = book.id;
        }

        const reviewRequestModel = new ReviewRequest(starInput, bookId, reviewHeadline, reviewMessage);
        const url = `${process.env.REACT_APP_API}/reviews/secure`;
        const responseOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewRequestModel)
        };
        const returnResponse = await fetch(url, responseOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setIsReviewLeft(true);
    }

    async function checkoutBook() {
        const url = `${process.env.REACT_APP_API}/books/checkout?bookId=${bookId}`;
        const responseOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application-json'
            }
        };

        const checkoutResponse = await fetch(url, responseOptions);
        if (!checkoutResponse.ok) {
            setdisplayError(true);
            throw new Error('Something went wrong!');
        }
        setdisplayError(false);
        setIsCheckout(true);
    }

    return (
        <div>
            <div className="container d-none d-lg-block">
                {displayError && <div className="alert alert-danger text-center mt-3" role='alert'>
                     Please pay or return expired books
                </div>

                }
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {book?.image ?
                            <img src={book?.image} width='200' height='300' alt="book" />
                            :
                            <img src={require('./../../Images/BooksImages/new-book-1.jpg')} width='226' height='349' alt="Book" />
                        }
                    </div>
                    <div className="col-6 col-md-6 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h6>by <i className="text-primary">{book?.author}</i> (Author)</h6>
                            <p className="lead">{book?.description}</p>
                            <StarReview rating={totalStars} size={25} />
                        </div>
                    </div>
                    <ReviewBox book={book} mobile={false} currentLoansCount={currentLoansCount}
                        isAuthenticated={authState?.isAuthenticated} isCheckout={isCheckout} 
                        checkoutBook={checkoutBook} isReviewLeft={isReviewLeft} submitReview={submitReview}/>
                </div>
                <hr />
                <LatestReview reviews={reviews} bookId={book?.id} mobile={false} />
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
                        <StarReview rating={totalStars} size={25} />
                    </div>
                </div>
                <ReviewBox book={book} mobile={true} currentLoansCount={currentLoansCount}
                    isAuthenticated={authState?.isAuthenticated} isCheckout={isCheckout}
                     checkoutBook={checkoutBook} isReviewLeft={isReviewLeft} submitReview={submitReview} />
                <hr />
                <LatestReview reviews={reviews} bookId={book?.id} mobile={true} />
            </div>
        </div>
    );
}