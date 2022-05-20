import React, {useState} from "react";
import {LocalFilmPost} from "../Interface/LocalFilmPost";
import usePostFilm from "../Hook/usePostFilm";
import {FilmInterface} from "../Interface/ResponsesInterfaces";

export default function FilmForm({loggedUser, setNeedsUpdate}) {
    const [localFilm, setLocalFilm] = useState<FilmInterface>({description: "", titre: ""})
    const postFilm = usePostFilm();

    const handleChange = ({target}: any) => {
        setLocalFilm(prev => ({
            ...prev,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (loggedUser.token != null) {
            postFilm(loggedUser.token, localFilm)
                .then(data => {
                    console.log(data)
                    setLocalFilm({description: "", titre: ""})
                    setNeedsUpdate(true);
                })
        }
    }

    return (
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
    )
}
