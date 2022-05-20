import { useReducer } from "react";
import { Reducer } from "./Reducer";
import { Increment, Decrement, Reset, Initializer } from "./Reducer";

export default function ReducerApp(){
    
    const initialState = {products : 0};

    const [count, dispatch] = useReducer(Reducer, initialState, Initializer);

    

    return(
        <div>
            <h1>Compteur : {count}</h1>
            <button onClick={() => dispatch(Increment())}>J'ajoute des trucs</button>
            <button onClick={() => dispatch(Increment(5))}>J'ajoute 5</button>
            <button onClick={() => dispatch(Increment(10))}>J'ajoute 10</button>
            <button onClick={() => dispatch(Decrement())}>Je retire des trucs</button>
            <button onClick={() => dispatch(Reset)}>Je remets tout à zéro</button>
        </div>
    )
}

