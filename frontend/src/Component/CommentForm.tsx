import React, {useState, useEffect} from "react";
import { LocalCommentPost } from "../Interface/LocalCommentPost";
import usePostComment from "../Hook/usePostComment";
import {CommentInterface, LoginResponseInterface} from "../Interface/ResponsesInterfaces";

interface CommentFormPropsInterface {
    loggedUser: LoginResponseInterface,
    setNeedsUpdate: React.Dispatch<boolean>
}

export default function CommentForm({loggedUser, setNeedsUpdate, id, CommentStore}: CommentFormPropsInterface) {
    
    const [testMeow, setTestMeow] = useState([])
    const [localComment, setLocalComment] = useState<CommentInterface>({idFilm: id, text: ""})
    const postComment = usePostComment();

    let refresh=true;

    useEffect(() => {
        if(refresh==true){
            setTestMeow(CommentStore.getState())
            refresh=false;
        }
    })

    const handleChange = ({target}: any) => {
        setLocalComment(prev => ({
            ...prev,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        CommentStore.dispatch({
            type: 'ADD_TODO',
            text: localComment.text,
            idFilm: id
        })
        setTestMeow(CommentStore.getState());
        console.log(testMeow);
        
        if (loggedUser.token != null) {
            postComment(loggedUser.token, localComment)
                .then(data => {
                    console.log(data)
                    setLocalComment({text: CommentStore.getState()[CommentStore.getState().length - 1].text, idFilm:  CommentStore.getState()[CommentStore.getState().length - 1].idFilm})
                    console.log(localComment);
                    setNeedsUpdate(true);
                })
        }
    }

    return (
        <form className='mx-auto' style={{maxWidth: '350px'}} onSubmit={handleSubmit}>
            <h2 className='mb-3 text-center'>Feel like a writer ?</h2>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="text"
                       name='text' onChange={handleChange} value={localComment.text}/>
                <label htmlFor="floatingInput">Text</label>
            </div>
            <button type='submit' className='btn btn-primary w-100'>Send</button>
        </form>
    )
}
