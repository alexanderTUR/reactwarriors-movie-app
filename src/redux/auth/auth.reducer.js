import * as types from './auth.types'
import { cookies } from '../../utils/cookies'

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
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
        isAuth: true,
      }
    case types.LOGOUT:
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
    case types.UPDATE_FAVORITE_MOVIES:
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
