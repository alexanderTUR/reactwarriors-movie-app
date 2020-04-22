import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './stylesheets/index.css'
import { createStore } from 'redux'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const actionCreatorUpdateAuth = payload => {
  return {
    type: 'UPDATE_AUTH',
    payload,
  }
}

const initialState = {
  user: null,
  session_id: cookies.get('session_id') || null,
}

const reducerApp = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_AUTH':
      cookies.set('session_id', action.payload.session_id, {
        path: '/',
        maxAge: 2592000,
      })
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
        isAuth: true,
      }
    default:
      return state
  }
}

const store = createStore(reducerApp)

store.subscribe(() => {
  console.log('Change', store.getState())
})

ReactDOM.render(<App store={store} />, document.getElementById('root'))
