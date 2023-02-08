class Review {
    id: number;
    email: string;
    date: string;
    rating: number;
    book_id: number;
    fullname: string;
    headline?: string;
    message?: string;

    constructor(id: number, email: string, date: string, rating: number, book_id: number, fullname: string, headline: string, message: string) {
        this.id = id;
        this.email = email;
        this.date = date;
        this.rating = rating;
        this.book_id = book_id;
        this.fullname = fullname;
        this.headline = headline;
        this.message = message;
    }
}
 export default Review;