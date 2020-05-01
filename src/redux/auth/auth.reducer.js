import * as types from './auth.types'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const initialState = {
  user: null,
  session_id: cookies.get('session_id') || null,
  isAuth: false,
  showLoginModal: false,
  favoriteMovies: [],
  watchlistMovies: [],
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_AUTH:
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
    case types.LOGOUT:
      cookies.remove('session_id')
      return {
        ...state,
        session_id: null,
        user: null,
        isAuth: false,
        showLoginModal: false,
        favoriteMovies: [],
        watchlistMovies: [],
      }
    case types.TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: !state.showLoginModal,
      }
    case 'UPDATE_FAVORITE_MOVIES':
      return {
        ...state,
        favoriteMovies: action.payload,
      }
    case types.UPDATE_WATCHLIST_MOVIES:
      return {
        ...state,
        watchlistMovies: action.payload,
      }
    default:
      return state
  }
}

export default authReducer
