export function ReduxTodoReducer(state, action){
    switch(action.type){
        case "ADD_TODO":
            return[
                ...state,
                {
                    ...action.payload,
                    completed:false
                }
            ];
        default:
            return state;
    }
}