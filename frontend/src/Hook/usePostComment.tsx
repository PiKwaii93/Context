import axios from "axios";
import Comment from "../Component/Comment";
import { LocalCommentPost } from "../Interface/LocalCommentPost";


export default function usePostComment() {
    return (token: string, comment: LocalCommentPost) => {
        return axios({
            url: "http://localhost:2345/post-comment.php",
            method:"post",
            data: new URLSearchParams({
                text: comment.text,
                idFilm: comment.idFilm
            }),
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res=>res.data)
        }
}
