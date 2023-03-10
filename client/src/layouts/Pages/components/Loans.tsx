import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShelfLoans from "../../../models/ShelfLoans";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { LoanModal } from "./LoanModal";

export const Loans = () => {
    const { authState } = useOktaAuth();
    const [httpError, setHttpError] = useState(null);

    // Current Loans
    const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfLoans[]>([]);
    const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);
    const [checkout, setCheckout] = useState(false);

    useEffect(() => {
        const fetchUserCurrentLoans = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/books/checkout/loans`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const shelfCurrentLoansResponse = await fetch(url, requestOptions);
                if (!shelfCurrentLoansResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const shelfCurrentLoansResponseJson = await shelfCurrentLoansResponse.json();
                setShelfCurrentLoans(shelfCurrentLoansResponseJson);
            }
            setIsLoadingUserLoans(false);
        }
        fetchUserCurrentLoans().catch((error: any) => {
            setIsLoadingUserLoans(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [authState, checkout]);

    if (isLoadingUserLoans) {
        return (
            <SpinnerLoading/>
        );
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>
                    {httpError}
                </p>
            </div>
        );
    }

    async function returnBook(bookId: number) {
        const url = `${process.env.REACT_APP_API}/books/checkout/return/?bookId=${bookId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const returnResponse = await fetch(url, requestOptions);
        if(!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setCheckout(!checkout);
    }

    async function renewLoan(bookId: number) {
        const url = `${process.env.REACT_APP_API}/books/checkout/renew/loan/?bookId=${bookId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const returnResponse = await fetch(url, requestOptions);
        if(!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setCheckout(!checkout);
    }


    return (
        <div>
            {/* Desktop */}
            <div className='d-none d-lg-block mt-2'>
                {shelfCurrentLoans.length > 0 ? 
                <>
                    <h3 className="text-danger text-center">Manage Loans </h3>

                    {shelfCurrentLoans.map(shelfCurrentLoan => (
                        <div key={shelfCurrentLoan.book.id}>
                            <div className='row mt-3 mb-3'>
                                <div className='col-4 col-md-4 container'>
                                {shelfCurrentLoan.book?.image ? 
                                        <img src={shelfCurrentLoan.book?.image} width='250' height='349' alt='Book'/>
                                        :
                                        <img src={require('./../../../Images/BooksImages/new-book-1.jpg')} width='226' height='349' alt="Book" />
                                          
                                    }
                                    
                                </div>
                                <div className='card col-3 col-md-3 container d-flex'>
                                    <div className='card-body'>
                                        <div className='mt-3'>
                                            <h4>{shelfCurrentLoan.book.title}</h4>
                                            <h6>by {shelfCurrentLoan.book.author}</h6>
                                            {shelfCurrentLoan.daysLeft > 0 && 
                                                <p className='text-secondary'>
                                                    Due in {shelfCurrentLoan.daysLeft} days.
                                                </p>
                                            }
                                            {shelfCurrentLoan.daysLeft === 0 && 
                                                <p className='text-success'>
                                                    Due Today.
                                                </p>
                                            }
                                            {shelfCurrentLoan.daysLeft < 0 && 
                                                <p className='text-danger'>
                                                    Past due by {shelfCurrentLoan.daysLeft} days.
                                                </p>
                                            }
                                            <div className='list-group mt-3'>
                                                <button className='btn btn-danger' 
                                                    aria-current='true' data-bs-toggle='modal' 
                                                    data-bs-target={`#modal${shelfCurrentLoan.book.id}`}>
                                                        RETURN BOOK
                                                </button>
                                               
                                            </div>
                                        </div>
                                        <hr/>
                                        <p className='mt-3'>
                                           Keep Track of your Favorite Books
                                        </p>
                                        <Link className='btn btn-primary' to={`/checkout/${shelfCurrentLoan.book.id}`}>
                                            Share your thoughts with other customers
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <LoanModal shelfCurrentLoan={shelfCurrentLoan} mobile={false} returnBook={returnBook} 
                                renewLoan={renewLoan}/>
                        </div>
                    ))}
                </> :
                <>
                    <h3 className='mt-3 text-danger text-center'>
                        Currently no loans
                    </h3>
                </>
            }
            </div>

            {/* Mobile */}
            <div className='container d-lg-none mt-2'>
                {shelfCurrentLoans.length > 0 ? 
                <>
                    <h5 className='mb-3' text-danger text-center>Manage Loans </h5>

                    {shelfCurrentLoans.map(shelfCurrentLoan => (
                        <div key={shelfCurrentLoan.book.id}>
                                <div className='d-flex justify-content-center align-items-center'>
                                    {shelfCurrentLoan.book?.image ? 
                                        <img src={shelfCurrentLoan.book?.image} width='226' height='349' alt='Book'/>
                                        :
                                        <img src={require('./../../../Images/BooksImages/new-book-1.jpg')} width='226' height='349' alt="Book" />
                                          
                                    }
                                </div>
                                <div className='card d-flex mt-5 mb-3'>
                                    <div className='card-body container'>
                                        <div className='mt-3'>
                                            <h4>Loan Options</h4>
                                            {shelfCurrentLoan.daysLeft > 0 && 
                                                <p className='text-secondary'>
                                                    Due in {shelfCurrentLoan.daysLeft} days.
                                                </p>
                                            }
                                            {shelfCurrentLoan.daysLeft === 0 && 
                                                <p className='text-success'>
                                                    Due Today.
                                                </p>
                                            }
                                            {shelfCurrentLoan.daysLeft < 0 && 
                                                <p className='text-danger'>
                                                    Past due by {shelfCurrentLoan.daysLeft} days.
                                                </p>
                                            }
                                            <div className='list-group mt-3'>
                                                <button className='list-group-item list-group-item-action' 
                                                    aria-current='true' data-bs-toggle='modal' 
                                                    data-bs-target={`#mobilemodal${shelfCurrentLoan.book.id}`}>
                                                        Manage Loan
                                                </button>
                                                <Link to={'search'} className='list-group-item list-group-item-action'>
                                                    Search more books?
                                                </Link>
                                            </div>
                                        </div>
                                        <hr/>
                                        <p className='mt-3'>
                                        Keep Track of your Favorite Books
                                        </p>
                                        <Link className='btn btn-primary' to={`/checkout/${shelfCurrentLoan.book.id}`}>
                                        Share your thoughts with other customers
                                        </Link>
                                    </div>
                                </div>
                            
                            <hr/>
                             <LoanModal shelfCurrentLoan={shelfCurrentLoan} mobile={true} returnBook={returnBook} renewLoan={renewLoan}/> 
                        </div>
                    ))}
                </> :
                <>
                    <h3 className='mt-3' text-danger text-center>
                        Currently no loans
                    </h3>
        
                </>
            }
            </div>
        </div>
    );
}