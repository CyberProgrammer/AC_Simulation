// Store -> Globalized state
// Action -> Describes what we want to do
// Reducer -> Describes the functions that will be called to perform an action
// Dispatch -> Execute the action to the reducer

import {createStore} from 'redux';

// Action
const increment = () => {
    return{
        type: 'INCREMENT',
    }
}

const decrement = () => {
    return{
        type: 'DECREMENT',
    }
}

// Reducer
const counter = (state = 0, action) => {
    switch (action.type){
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
    }
}

// Store
let store = createStore(counter);
store.subscribe(() => console.log(store.getState()));

// Dispatch
store.dispatch(increment());
store.dispatch(decrement());