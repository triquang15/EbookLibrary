import { useState, useEffect } from "react";
import Book from "../../models/Book";
import { Pagination } from "../Utils/Pagination";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";

export const SearchBookPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [totalBooks, setTotalBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [categorySelection, setCategorySelection] = useState('Books');

    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = "http://localhost:8080/api/books";

            let url: string = '';

            if (searchUrl === '') {
                url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
            } else {
                url = baseUrl + searchUrl;
            }
            const response = await fetch(url);

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
        window.scrollTo(0, 0);
    }, [currentPage, searchUrl]);

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

    const searchHandleChange = () => {
        if (search == '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=0&size=${booksPerPage}`);
        }
    }

    const categoryField = (value: string) => {
        if (
            value === 'Java' ||
            value === 'Python' ||
            value === 'Javascript' ||
            value === 'DevOps'
        ) {
            setCategorySelection(value);
            setSearchUrl(`/search/findByCategory?category=${value}&page=0&size=${booksPerPage}`);
        } else {
            setCategorySelection('All Categories');
            setSearchUrl(`?page=0&size=${booksPerPage}`);
        }
    }

    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalBooks ? booksPerPage * currentPage : totalBooks;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input type="search" className="form-control me-2" placeholder="Search for anything..." aria-labelledby="Search"
                                    onChange={e => setSearch(e.target.value)} />
                                <button className="btn btn-md btn-outline-primary text-muted" onClick={() => searchHandleChange()}>Search</button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className="btn btn-md btn-outline-warning text-muted dropdown-toggle" type="button"
                                    id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded='false'>{categorySelection}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li onClick={() => categoryField('All Categories')}>
                                        <a href="#" className="dropdown-item">All Categories</a>
                                    </li>
                                    <li onClick={() => categoryField('Java')}>
                                        <a href="#" className="dropdown-item">Java</a>
                                    </li>
                                    <li onClick={() => categoryField('Python')}>
                                        <a href="#" className="dropdown-item">Python</a>
                                    </li>
                                    <li onClick={() => categoryField('Javascript')}>
                                        <a href="#" className="dropdown-item">JavaScript</a>
                                    </li>
                                    <li onClick={() => categoryField('DevOps')}>
                                        <a href="#" className="dropdown-item">DevOps</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {totalBooks > 0 ?
                        <>
                            <div className="mt-3">
                                <h5>Number of results: ({totalBooks})</h5>
                            </div>
                            <p>{indexFirstBook + 1} to {lastItem} of {totalBooks} items:</p>
                            {books.map(book => (
                                <SearchBook book={book} key={book.id} />
                            ))}
                        </>
                        :
                        <div className="m-5">
                            <h3>Sorry, we couldn't find any results</h3>
                            - Try adjusting your search. Here are some ideas: <br />
                            - Make sure all words are spelled correctly <br />
                            - Try different search terms <br />
                            - Try more general search terms

                        </div>
                    }
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    }
                </div>
            </div>
        </div>
    );
}