import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import MessageModel from "../../../models/MessageModel";
export const PostNewMessage = () => {
    const { authState } = useOktaAuth();
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    async function submitNewQuestion() {
        const url = `${process.env.REACT_APP_API}/messages/secure/add/message`;
        if (authState?.isAuthenticated && title !== '' && question !== '') {
            const messageRequestModel: MessageModel = new MessageModel(title, question);
            const requestOptions = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageRequestModel)
            };
            const submitNewQuestionResponse = await fetch(url, requestOptions);
            if (!submitNewQuestionResponse.ok) {
                throw new Error('Something went wrong!');
            }
            setTitle('');
            setQuestion('');
            setDisplayWarning(false);
            setDisplaySuccess(true);
        } else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }

    return (
        <div className="card mt-3">
            <div className="card-header">
                <b>Tips on getting your questions answered faster</b> <br />
                - Search to see if your question has been asked before <br />
                - Be detailed; provide screenshots, error messages, code, or other clues whenever possible <br />
                - Check grammar and spelling
            </div>
            <div className="card-body">
                <form method="post">
                    {displayWarning &&
                        <div className="alert alert-danger text-center" role='alert'>
                            All fields must be filled out
                        </div>
                    }
                    {displaySuccess &&
                        <div className="alert alert-success text-center" role="alert">
                            Question added successfully.
                        </div>
                    }
                    <div className="mb-3">
                        <label className="form-label"><b>Title or summary</b></label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                            placeholder="e.g. Why do we use fit_transform() for training_set?" onChange={e => setTitle(e.target.value)} value={title} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><b>Details (optional)</b></label>
                        <textarea className="form-control" id="exampleFormControlTextarea1"
                            rows={3} onChange={e => setQuestion(e.target.value)} value={question}
                            placeholder="e.g. At 06:30, I did't understand this part, here is a screenshot of what I tried..."></textarea>
                    </div>
                    <button type="button" className="btn btn-danger mt-3 align-center" onClick={submitNewQuestion}>Publish</button>
                </form>
            </div>
        </div>
    );
}