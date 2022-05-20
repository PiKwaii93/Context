import { ReduxTodos, ReduxTodoReducer, ReduxStore } from "./ReduxTodos";
import { useReducer } from "react";

export default function ReduxAppReducer() {

    const [localTodos, dispatchTodos] = useReducer(ReduxTodoReducer, ReduxTodos);


    const handleAddTodo = () => {

        dispatchTodos({
            type: 'ADD_TODO',
            payload: 
                {text: 'Nettoyer la salle de bain'}
        })
        console.log(localTodos);    
    }


    return(
        <div>
            <button onClick={handleAddTodo}>Ajouter un élément</button>
            <div>
                {localTodos.map(todo => (
                    <div>
                        <h4>{todo.text}</h4>
                        <p>Fait ? {todo.completed ? 'OUI' : 'NON'}</p>
                    </div>
                ))}
            </div>
        </div>
    )

}