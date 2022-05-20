import {FilmInterface} from "../Interface/ResponsesInterfaces";

export default function useGetFilmList() {
    return (): Promise<FilmInterface[]> => {
        return axios({
            url: "http://localhost:2345/film.php",
            method:"get",
        })
        .then(res=>res.data)
        }
}
