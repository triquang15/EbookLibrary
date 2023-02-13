import { useEffect, useState } from "react";
import Book from "../../../models/Book";
import { Pagination } from "../../Utils/Pagination";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { ChangeQuantityOfBook } from "./ChangeQuantityOfBook";

export const UpdateQuantity = () => {

    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [totalBooks, setTotalBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [bookDelete, setBookDelete] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8080/api/books?page=${currentPage - 1}&size=${booksPerPage}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;

            setTotalBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);
            const loadBooks: Book[] = [];

            for (const key in responseData) {
                loadBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    image: responseData[key].image
                });
            }

            setBooks(loadBooks);
            setIsLoading(false);
        };
        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })

    }, [currentPage, bookDelete]);

    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalBooks ? booksPerPage * currentPage : totalBooks;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const deleteBook = () => setBookDelete(!bookDelete);

    if (isLoading) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            {totalBooks > 0 ?
            <>
                <div className="mt-3">
                    <h3>Number of results: ({totalBooks})</h3>
                </div>
                <p>{indexFirstBook + 1} to {lastItem} of {totalBooks} items:</p>
                {books.map(book => (
                    <ChangeQuantityOfBook book={book} key={book.id} deleteBook={deleteBook} />
                ))}
            </>    
            :
            <h5>Add a book before changing quantity</h5>
        }
        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    );
}