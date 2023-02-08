import {useOktaAuth} from '@okta/okta-react';
import { Link } from 'react-router-dom';

export const LibraryService = () => {

    const { authState } = useOktaAuth();

    return (
        <div className="container my-5">
            <div className="row p-4 align-items-center border shadow-lg">
                <div className="col-lg-4 p-4">
                    <h3 className="display-5 fw-bold">
                        The library reading app.
                    </h3>
                    <p>Borrow ebooks, audiobooks, magazines and more from your local library for free! Libby is the newer library reading app by OverDrive, loved by millions of readers worldwide.
                    </p>
                     {authState?.isAuthenticated ?
                            <Link type="button" className='btn btn-danger btn-sm text-white' to='search'>Explore Top Books</Link>
                            :
                        <Link to='/login' className="btn btn-danger btn-sm text-white">Read more</Link>
                    }
                </div>
                <div className="col-lg-7 offset-lg-1 shadow-lg lost-image"></div>
            </div>
        </div>
    );
}