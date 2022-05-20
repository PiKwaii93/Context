import {
    BrowserRouter, 
    Routes,
    Route,
    Link,
    Outlet,
    useParams,
    useNavigate
  } from "react-router-dom";
import {FilmInterface} from "../Interface/ResponsesInterfaces";
import WildCard from "./WildCard";

export default function Film({film}: { film: FilmInterface }) {

    const titre = film.titre;

    return (
        <div className="card border-primary mb-3">
            <div className="card-header">ID : {film.id}</div>
            <div className="card-body text-primary">
            <h5 className="card-title">Titre : {film.titre}</h5>
            <p className="card-text">Description : {film.description}</p>
            </div>
            <ul>
                <li><Link to={titre}>En savoir plus</Link></li>
                </ul>
      </div>
    )
}
