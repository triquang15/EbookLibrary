import { Link } from "react-router-dom";

export const ExploreTopBooks = () => {
    return (
        <div className="p-5 mb-4 bg-dark header">
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-center">
                <div>
                    <h1 className="display-5 fw-bold">Enjoy popular books when you subscribe</h1>
                    <p className="col-md-8 fs-4">Get instant access to millions of eBooks, audiobooks, magazines, and more for only $9.99/month.</p>
                    <Link type="button" className="btn main-color btn-lg text-white" to="/search">
                       Read free for 30 days
                    </Link>
                </div>
            </div>
        </div>
    );
}