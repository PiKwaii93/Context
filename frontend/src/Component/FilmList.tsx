import {FilmInterface} from "../Interface/ResponsesInterfaces";
import Film from "./Film";
import { test } from "../Context/Contexts";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function FilmList() {

    const filmListContext = test();

    console.log(filmListContext);


    return (
        <div className='p-5'>
            <h1 className='text-center mb-5'>Tous les films ({filmListContext.length})</h1>
            {filmListContext.map((film: FilmInterface) => (
                    <Film film={film} key={film.id}/>
            ))}
        </div>
    )
}
