import { useState } from "react";
import MessageModel from "../../../models/MessageModel";

export const MessageResonpse: React.FC<{message: MessageModel, submitQuestion: any}> = (props, key) => {
    const [displayWarning, setDisplayWarning] = useState(false);
    const [response, setResponse] = useState('');

    function submitBtn() {
        if(props.message.id !== null && response !== '') {
            props.submitQuestion(props.message.id, response);
            setDisplayWarning(false);
        } else {
            setDisplayWarning(true);
        }
    }

    return (
        <div key={props.message.id}>
            <div className="card mt-2 shodow p-3 bg-body rounded">
                <h5>Question #{props.message.id}: &nbsp;&nbsp; <i className="text-info">{props.message.title}</i></h5>
                <h6>{props.message.email}</h6>
                <p>{props.message.question}</p>
                <hr />
                <div>
                    <h5>Answer:</h5>
                    <form action='PUT'>
                        {displayWarning && 
                            <div className="alert alert-danger text-center" role='alert'>
                                All fields must be filled out.
                            </div>
                        }
                        <div className="col-md-12 mb-3">
                            <textarea className="form-control" id='exampleFormControlTextarea1' rows={3} onChange={e => setResponse(e.target.value)} value={response}></textarea>
                        </div>
                        <div>
                            <button type="button" className="btn btn-danger mt-3" onClick={submitBtn}>Submit Response</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}