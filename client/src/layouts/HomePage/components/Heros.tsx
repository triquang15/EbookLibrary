export const Heros = () => {
    return (
        <div>
        <div className="d-none d-lg-block">
            <div className="row g-0 mt-5">
                <div className="col-sm-6 col-md-6">
                    <div className="col-image-left"></div>
                </div>

                <div className="col-4 col-md-4 container d-flex justify-content align-items-center">
                    <div className="ml-2">
                        <h1>What have you been reading?</h1>
                        <p className="lead">
                            The library team work to know that you have been reading.
                            Whether it is to learn a new still or grow within one,
                            we will be able tp provide the top content for you !
                        </p>
                        <a href="#" className="btn btn-danger btn-sm text-white">Sign Up</a>
                    </div>
                </div>
            </div>
            
            <div className="row g-0">
                <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                    <div className="ml-2">
                        <h1>Our collection is always changing!</h1>
                        <p className="lead">
                            Try to check is daily as our collection is always changing!
                            We work nonstop to provide the most accurate book selection possible
                            for our Book Library Read students! We are diligent about book sellection
                            and our book sellection and our books are always going to be our top priority.
                        </p>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6">
                    <div className="col-image-right"></div>
                </div>
            </div>
        </div>

            {/* Mobile */ }
    <div className="d-lg-none">
        <div className="container">
            <div className="m-2">
                <div className="col-image-left">
                    <div className="mt-2">
                        <h1>What have you been reading?</h1>
                        <p className="lead">
                            The library team work to know that you have been reading.
                            Whether it is to learn a new still or grow within one,
                            we will be able tp provide the top content for you !
                        </p>
                        <a href="#" className="btn btn-danger btn-sm text-white btn-sm">Sign Up</a>
                    </div>
                </div>
                <div className="m-2">
                    <div className="col-image-right"></div>
                    <div className="mt-2">
                        <h1>Our collection is always changing!</h1>
                        <p className="lead">
                            Try to check is daily as our collection is always changing!
                            We work nonstop to provide the most accurate book selection possible
                            for our Book Library Read students! We are diligent about book sellection
                            and our book sellection and our books are always going to be our top priority.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
}