import { useEffect, useState } from "react";
import Book from "../../models/Book";
import Review from "../../models/Review";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarReview } from "../Utils/StarReview";
import { LatestReview } from "./LatestReview";
import { ReviewBox } from "./ReviewBox";

export const CheckoutPage = () => {

    const [book, setBooks] = useState<Book>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const bookId = (window.location.pathname).split('/')[2];

    // Review State
    const [reviews, setReviews] = useState<Review[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

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

    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;
            const responseReviews = await fetch(reviewUrl);

            if(!responseReviews.ok) {
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
                    fullname: responseData[key].fullname,
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
    }, []);

    if (isLoading || isLoadingReview) {
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
                            <h6>by <i className="text-primary">{book?.author}</i> (Author)</h6>
                            <p className="lead">{book?.description}</p>
                            <StarReview rating={totalStars} size={25} />
                        </div>
                    </div>
                    <ReviewBox book={book} mobile={false} />
                </div>
                <hr />
                <LatestReview reviews={reviews} bookId={book?.id} mobile={false}/>
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
                <ReviewBox book={book} mobile={true} />
                <hr />
                <LatestReview reviews={reviews} bookId={book?.id} mobile={true}/>
            </div>
        </div>
    );
}