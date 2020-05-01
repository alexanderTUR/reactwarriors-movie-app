import CallApi from '../../api/api'

export const fetchAuth = session_id => dispatch => {
  const queryStringParams = {
    session_id,
  }
  dispatch({
    type: 'FETCH_REQUEST_AUTH',
  })
  CallApi.get('/account', {
    params: queryStringParams,
  })
    .then(user => {
      dispatch(updateAuth({ user, session_id }))
      dispatch(fetchFavoriteMovies({ user, session_id }))
      dispatch(fetchWatchListMovies({ user, session_id }))
    })
    .catch(error => {
      dispatch({
        type: 'FETCH_ERROR_AUTH',
        payload: error,
      })
    })
}

export const updateAuth = ({ user, session_id }) => {
  return {
    type: 'UPDATE_AUTH',
    payload: {
      user,
      session_id,
    },
  }
}

export const onLogOut = () => {
  return {
    type: 'LOGOUT',
  }
}

export const toggleLoginModal = () => {
  return {
    type: 'TOGGLE_LOGIN_MODAL',
  }
}

export const fetchFavoriteMovies = ({ user, session_id }) => dispatch => {
  const queryStringParams = {
    session_id,
  }
  dispatch({
    type: 'FETCH_REQUEST_FAVORITE_MOVIES',
  })
  return CallApi.get(`/account/${user.id}/favorite/movies`, {
    params: queryStringParams,
  })
    .then(data => {
      dispatch(updateFavoriteMovies(data.results))
    })
    .catch(error => {
      dispatch({
        type: 'FETCH_ERROR_FAVORITE_MOVIES',
        payload: error,
      })
    })
}

export const updateFavoriteMovies = movies => {
  return {
    type: 'UPDATE_FAVORITE_MOVIES',
    payload: movies,
  }
}

export const fetchWatchListMovies = ({ user, session_id }) => dispatch => {
  const queryStringParams = {
    session_id,
  }
  dispatch({
    type: 'FETCH_REQUEST_WATCHLIST_MOVIES',
  })
  return CallApi.get(`/account/${user.id}/watchlist/movies`, {
    params: queryStringParams,
  })
    .then(data => {
      dispatch(updateWatchListMovies(data.results))
    })
    .catch(error => {
      dispatch({
        type: 'FETCH_ERROR_WATCHLIST_MOVIES',
        payload: error,
      })
    })
}

export const updateWatchListMovies = movies => {
  return {
    type: 'UPDATE_WATCHLIST_MOVIES',
    payload: movies,
  }
}
