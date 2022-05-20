import { useNavigate } from "react-router-dom";

export function SearchForm() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let target = e.target.firstChild.value;
        navigate(target);

    }

    return(
        <form onSubmit={handleSubmit} >
            <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <span className="input-group-text border-0" id="search-addon">
            <i className="fas fa-search"></i>
            </span>
        </form>

    )

}