import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import MessageModel from "../../../models/MessageModel";
import { Pagination } from "../../Utils/Pagination";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const Messages = () => {
    const { authState } = useOktaAuth();
    const [isLoadingMessage, setIsLoadingMessage] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Messages
    const [messages, setMessages] = useState<MessageModel[]>([]);

    // Pagination
    const [messagePerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetUserMessage = async () => {
            if (authState && authState?.isAuthenticated) {
                const url = `http://localhost:8080/api/messages/search/findByEmail/?email=${authState?.accessToken?.claims.sub}&page=${currentPage - 1}&size=${messagePerPage}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const messageResponse = await fetch(url, requestOptions);
                if (!messageResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const messageResponseJson = await messageResponse.json();
                setMessages(messageResponseJson._embedded.messages);
                setTotalPages(messageResponseJson.page.totalPages);
            }
            setIsLoadingMessage(false);
        }
        fetUserMessage().catch((error: any) => {
            setIsLoadingMessage(false);
            setHttpError(error.messages);
        })
        window.scrollTo(0, 0);
    }, [[authState, currentPage]]);

    if (isLoadingMessage) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (
            <div className="container m-2">
                <p>{httpError}</p>
            </div>
        );
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    return (
        <div className='mt-2'>
            {messages.length > 0 ? 
                <>
                    <h5 className="text-center">Question I asked </h5>
                    {messages.map(message => (
                        <div key={message.id}>
                            <div className='card mt-2 shadow p-3 bg-body rounded'>
                                <h5>Case #{message.id}: {message.title}</h5>
                                <h6>{message.email}</h6>
                                <p>{message.question}</p>
                                <hr/>
                                <div>
                                    <h5>Response: </h5>
                                    {message.response && message.email ? 
                                        <>
                                            <h6>{message.email} (admin)</h6>
                                            <p>{message.response}</p>
                                        </>
                                        :
                                        <p><i>Pending response from administration. Please be patient.</i></p>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </>
                :
                <h5>All questions you submit will be shown here</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    );
}