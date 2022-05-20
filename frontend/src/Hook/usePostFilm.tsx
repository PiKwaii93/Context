import axios from "axios";
import Film from "../Component/Film";
import {LocalFilmPost} from "../Interface/LocalFilmPost";


export default function usePostFilm() {
    return (token: string, film: LocalFilmPost) => {
        return axios({
            url: "http://localhost:2345/post-film.php",
            method:"post",
            data: new URLSearchParams({
                titre: film.titre,
                description: film.description
            }),
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res=>res.data)
        }
}
