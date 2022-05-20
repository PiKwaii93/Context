import {CommentInterface} from "../Interface/ResponsesInterfaces";

export default function Comment({comment}: { comment: CommentInterface }) {
    return (
        <div className='bg-light rounded p-3 mb-3'>
            <p>
                <small>
                    Par : {comment.author}
                    <br/>
                    Le : {comment.date}
                </small>
            </p>
            <p>{comment.text}</p>
        </div>
    )
}
