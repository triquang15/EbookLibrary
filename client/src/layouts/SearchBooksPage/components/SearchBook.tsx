import Book from "../../../models/Book";

export const SearchBook: React.FC<{ book: Book }> = (props) => {
    return (
        <div className="card mt-3 shadown p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-2">
                    <div className="d-none d-lg-block">
                        {props.book.image ?
                            <img src={props.book.image} alt="book" width='123' height='196' />
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
                <div className="col-md-6">
                    <div className="card-body">
                        <h4 className="card-title">
                            {props.book.title}
                        </h4>
                        <h5><i>by {props.book.author}</i></h5>
                        <p className="card-text">{props.book.description}</p>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <a className="btn btn-md btn-danger text-white" href="#">View Details</a>
                </div>
            </div>
        </div>
    );
}