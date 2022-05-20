
import { useParams } from "react-router-dom"
import Film from "./Film";
import {CommentInterface} from "../Interface/ResponsesInterfaces";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import HideIfNotLogged from "./HideIfNotLogged";
import { createStore } from 'redux';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function WildCard({commentList, ReduxStore, loggedUser, setNeedsUpdate}) {

    const params = useParams();
    var verif = false;
    var exist = false;

    var filmInfo;

    for(let i=0; i<ReduxStore.getState().length; i++){
        if(params.titre == ReduxStore.getState()[i].titre){
            filmInfo = ReduxStore.getState()[i];
            verif = true;
            exist = true;
            break;
        }
    }

    const newCommentList = [];

    if(verif==true){
        for(let i=0; i<commentList.length; i++){
            if(filmInfo.id == commentList[i].idFilm){
                newCommentList.push(commentList[i]);
            }
        }
    }

    function ReduxTodoReducerComment(state, action){
        switch(action.type){
            case 'ADD_TODO':
                return [
                    ...state,
                    {
                        text : action.text,
                        idFilm : action.idFilm
                    }
                ]
            default:
                return state;
        }
    
    }

    const CommentStore = createStore(ReduxTodoReducerComment, newCommentList);

    console.log(CommentStore.getState());
    console.log(commentList);

    if(verif==true & exist == true){
        return(
            <div>
                <h1>
                    Le titre : {filmInfo.titre}
                    
                </h1>
                <h2>
                    La description : {filmInfo.description}
                </h2>
                <h3>
                    L'ID : {filmInfo.id}
                </h3>
                <div className='p-5'>
                    
                    <HideIfNotLogged loggedUser={loggedUser}>
                        <CommentForm loggedUser={loggedUser} setNeedsUpdate={setNeedsUpdate} id={filmInfo.id} CommentStore={CommentStore}/>
                    </HideIfNotLogged>
                    <h1 className='text-center mb-5'>Tous les commentaires</h1>
                    {CommentStore.getState().map((comment: CommentInterface) => (
                        <Comment comment={comment} key={comment.id}/>
                    ))}
                </div>
            </div>
        )
    }else{
        return(
            <div>
                <p>Ce film n'existe pas (っ▀¯▀)つ</p>
                <p>Retournez à l'accueil</p>
                <Link to="/">Accueil</Link>
            </div>
        )
    }
    
}