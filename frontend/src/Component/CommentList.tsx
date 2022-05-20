import {CommentInterface} from "../Interface/ResponsesInterfaces";
import Comment from "./Comment";

export default function CommentList({commentList}: { commentList: CommentInterface[] }) {
    return (
        <div className='p-5'>
            <h1 className='text-center mb-5'>Tous les comments</h1>
            {commentList.map((comment: CommentInterface) => (
                <Comment comment={}={comment} key={comment.id}/>
            ))}
        </div>
    )
}
