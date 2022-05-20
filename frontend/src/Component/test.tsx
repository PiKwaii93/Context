import { createStore, applyMiddleware  } from 'redux';
import { combineReducers } from 'redux';



export default function Test() {
  function todos(state = [], action) {
    switch (action.type) {
      case 'ADD_TODO':
        return state.concat([action.text])
      default:
        return state
    }
  }
  
  const store = createStore(todos, ['Use Redux'])
  
  function haha(){
    store.dispatch({
      type: 'ADD_TODO',
      text: 'Read the docs'
    })
    console.log(store.getState())
  }
  // [ 'Use Redux', 'Read the docs' ]





  const store2 = createStore(todos, ['Use Redux'])

function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text
  }
}

store2.dispatch(addTodo('Read the docs'))
store2.dispatch(addTodo('Read about the middleware'))

//console.log(store2.getState())

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const meow = combineReducers({
  todos,
  counter
})

const store3 = createStore(meow)
// {
//   counter: 0,
//   todos: []
// }

store3.dispatch({
  type: 'ADD_TODO',
  text: 'Use Redux'
})

function bzzz(){
  store3.dispatch({
    type:"INCREMENT",
  })
  console.log(store3.getState())
}







  return(
    <div>
      <button onClick={bzzz}>bzzz</button>
      <button onClick={haha}>Test</button>
      {store.getState().map(todo => (
            <div>
                <h4>{todo}</h4>
            </div>
        ))}
    </div>
  )
}