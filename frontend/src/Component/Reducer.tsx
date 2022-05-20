import React from "react";

export function Reducer(state, action){
    switch (action.type){
        case 'INCREMENT':
            return state + (action.payload || 1);
        case 'DECREMENT': 
        if(state <= 0 ) {
            return state
        }
        return state - (action.payload || 1);
        case 'RESET':
            return 0;
        default:
            return state;
    }
    
}

export function Increment(payload = 1) {
    return{
        type: 'INCREMENT',
        payload: payload
    }
}
export function Decrement(payload = 1) {
    return{
        type: 'DECREMENT',
        payload: payload
    }
}

export const Reset = {
    
        type: 'RESET'
    
}

export function Initializer(state){
    return( state.products );
}