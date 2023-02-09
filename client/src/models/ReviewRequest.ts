class ReviewRequest {
    rating: number;
    bookId: number;
    headline?: string;
    message?: string;

    constructor(rating: number, bookId: number, headline: string, message: string) {
        this.rating = rating;
        this.bookId = bookId;
        this.headline = headline;
        this.message = message;
    }
}
 export default ReviewRequest;