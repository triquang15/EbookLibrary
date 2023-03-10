import { useOktaAuth } from "@okta/okta-react"
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { AddNewBook } from "./components/AddNewBook";
import { AdminMessage } from "./components/AdminMessage";
import { UpdateQuantity } from "./components/UpdateQuantity";

export const ManageLibraryPage = () => {
    const { authState } = useOktaAuth();
    const [changeQuantityOfBookClick, setChangeQuantityOfBookClick] = useState(false);
    const [messageClick, setMessageClick] = useState(false);

    function addNewBook() {
        setChangeQuantityOfBookClick(false);
        setMessageClick(false);
    }

    function changeQuantity() {
        setChangeQuantityOfBookClick(true);
        setMessageClick(false);
    }

    function messageClickFunction() {
        setChangeQuantityOfBookClick(false);
        setMessageClick(true);
    }

    if(authState?.accessToken?.claims.userType === undefined) {
        return <Redirect to='/home'/>
    }

    return (
        <div className="container">
            <div className="mt-5">
                <h3 className="text-center">Manage Library</h3>
            </div><br />
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button onClick={addNewBook} className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Manage Books</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button onClick={changeQuantity} className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Update Quantity</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button onClick={messageClickFunction} className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Customer Q&A</button>
                </li>
               
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" >
                    <AddNewBook/>
                </div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" >
                    {changeQuantityOfBookClick ? <UpdateQuantity/> : <></>}
                </div>
                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" >
                    {messageClick ? <AdminMessage/>  : <></>}
                </div>
            </div>
        </div>
    );
}