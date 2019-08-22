import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducer = (state, action) => {
  
  if(action.type === 'SET_MATCHES') {
    return {
      ...state,
      matches: action.payload
    };
  } else if(action.type === 'TOGGLE_LOGIN') {
    return {
      ...state,
      islogged: action.islogged
    }
  } else if(action.type === 'SET_USER') {
    return {
      ...state,
      user: action.payload
    }
  }
  return state;
} 

export default createStore(reducer, { matches: [], islogged: false, user:"" }, applyMiddleware( thunk));