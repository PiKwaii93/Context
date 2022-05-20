import {BlogInterface} from "../Interface/ResponsesInterfaces";

export default function useGetCommentList() {
    return (): Promise<BlogInterface[]> => {
        return axios({
            url: "http://localhost:2345/comment.php",
            method:"get",
        })
        .then(res=>res.data)
        }
}
