import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePostFilm from "../Hook/usePostFilm";
import {FilmInterface} from "../Interface/ResponsesInterfaces";
import Film from './Film';



export const ReduxTodos = [
    {
        text: "Bouger le chat",
        completed : true
    },
    {
        text:"Manger",
        completed: false
    }
];  

export function ReduxTodoReducerTest(state, action){
    switch(action.type){
        case 'ADD_TODO':
            return [
                ...state,
                {
                    titre : action.titre,
                    description : action.description
                }
            ]
        default:
            return state;
    }

}

export function ReduxTodoReducer(state, action){
    switch(action.type){
        case "ADD_TODO":
            return[
                ...state,
                {
                    ...action.payload,
                    completed: false    
                }
            ];
            default:
                return state;
    }
}


export default function ReduxAppTest({ReduxStore, loggedUser, setNeedsUpdate}) {

    const [testMeow, setTestMeow] = useState([])
    const [localFilm, setLocalFilm] = useState<FilmInterface>({description: "", titre: ""})
    const postFilm = usePostFilm();

    let refresh=true;


    useEffect(() => {
        if(refresh==true){
            setTestMeow(ReduxStore.getState())
            refresh=false;
        }
    })

    const handleChange = ({target}: any) => {
        setLocalFilm(prev => ({
            ...prev,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        ReduxStore.dispatch({
            type: 'ADD_TODO',
            titre: localFilm.titre,
            description: localFilm.description
        })
        console.log(localFilm);
        setTestMeow(ReduxStore.getState());
        if (loggedUser.token != null) {
            postFilm(loggedUser.token, localFilm)
                .then(data => {
                    console.log(data)
                    setLocalFilm({description: ReduxStore.getState()[ReduxStore.getState().length - 1].description, titre: ReduxStore.getState()[ReduxStore.getState().length - 1].titre})
                    setNeedsUpdate(true);
                })
        }
        alert("Votre film a été créée avec succès");
        
    }
    
    return(
        <div>
            <form className='mx-auto' style={{maxWidth: '350px'}} onSubmit={handleSubmit}>
                <h2 className='mb-3 text-center'>Feel like a writer ?</h2>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="titre"
                        name='titre' onChange={handleChange} value={localFilm.titre}/>
                    <label htmlFor="floatingInput">Titre</label>
                </div>
                <div className="mb-3 form-floating">
                    <textarea className="form-control" placeholder="Description" id="floatingTextarea" name='description'
                            style={{height: '100px'}} onChange={handleChange} value={localFilm.description}/>
                    <label htmlFor="floatingTextarea">Description</label>
                </div>
                <button type='submit' className='btn btn-primary w-100'>Send</button>
            </form>
        </div>
    )

}