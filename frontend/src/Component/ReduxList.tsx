export default function ReduxList({localTodos}) {
    
    return(
        <div>
            {localTodos.map(todo => (
                <div>
                    <h4>{todo.text}</h4>
                    <p>Fait ? {todo.completed ? 'OUI' : 'NON'}</p>
                </div>
            ))}
        </div>
    )
}