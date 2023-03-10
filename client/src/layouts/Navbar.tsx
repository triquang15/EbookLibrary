import { Link, NavLink } from "react-router-dom";
import { useOktaAuth } from '@okta/okta-react';
import { SpinnerLoading } from "./Utils/SpinnerLoading";

export const Navbar = () => {

  const { oktaAuth, authState } = useOktaAuth();
  if (!authState) {
    return <SpinnerLoading />
  }

  const handLogout = async () => oktaAuth.signOut();
  console.log(authState);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
      <div className="container-fluid">
        <span className="navbar-brand text-info"><b>eBook Library</b></span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navagation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                eBooks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Contact us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Invite friends
              </NavLink>
            </li>
            {authState.isAuthenticated && 
              <li className="nav-item">
                <NavLink className="nav-link" to="/fees">
                 Payment Fees
                </NavLink>
              </li>
            }
            {authState.isAuthenticated && 
              <li className="nav-item">
                <NavLink className="nav-link" to="/shelf">
                  My Orders
                </NavLink>
              </li>
            }
            {
              authState.isAuthenticated && authState.accessToken?.claims?.userType === 'admin' &&
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              </li>
            }
          </ul>
          <ul className="navbar-nav ms-auto">
            {!authState.isAuthenticated ?
              <li className="nav-item m-1">
                <Link to="/login" className="btn btn-outline-light" type="button">
                  Sign in
                </Link>
              </li>
              :
              <li>
                <button className="btn btn-outline-light" onClick={handLogout}>Sign out</button>
              </li>
            }

          </ul>
        </div>
      </div>
    </nav>
  );
};
