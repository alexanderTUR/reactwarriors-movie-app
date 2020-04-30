import React from 'react'
import { Modal, ModalBody } from 'reactstrap'
import LoginForm from './Header/Login/LoginForm'
import Header from './Header/Header'
import CallApi from '../api/api'
import MoviesPage from './pages/MoviesPage/MoviesPage'
import MoviePage from './pages/MoviePage/MoviePage'
import { BrowserRouter, Route } from 'react-router-dom'
import {
  updateAuth,
  onLogOut,
  toggleLoginModal,
  updateFavoriteMovies,
  updateWatchListMovies,
} from '../redux/auth/auth.actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export const AppContext = React.createContext()

class App extends React.Component {
  getFavoriteMovies = ({ user, session_id }) => {
    const queryStringParams = {
      session_id,
    }
    return CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: queryStringParams,
    }).then(data => {
      this.props.updateFavoriteMovies(data.results)
    })
  }

  getWatchlistMovies = ({ user, session_id }) => {
    const queryStringParams = {
      session_id,
    }
    return CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: queryStringParams,
    }).then(data => {
      this.props.updateWatchListMovies(data.results)
    })
  }

  componentDidMount() {
    const { session_id } = this.props
    const queryStringParams = {
      session_id,
    }
    if (session_id) {
      CallApi.get('/account', {
        params: queryStringParams,
      }).then(user => {
        this.props.updateAuth({ user, session_id })
        this.getFavoriteMovies({ user, session_id })
        this.getWatchlistMovies({ user, session_id })
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isAuth !== this.props.isAuth && this.props.isAuth) {
      this.getFavoriteMovies(this.props)
      this.getWatchlistMovies(this.props)
    }
  }

  render() {
    const {
      user,
      session_id,
      isAuth,
      showLoginModal,
      updateAuth,
      onLogOut,
      toggleLoginModal,
      favoriteMovies,
      watchlistMovies,
    } = this.props
    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user,
            session_id,
            isAuth,
            showLoginModal,
            updateAuth,
            onLogOut,
            toggleLoginModal,
            favoriteMovies,
            watchlistMovies,
            getFavoriteMovies: this.getFavoriteMovies,
            getWatchlistMovies: this.getWatchlistMovies,
          }}
        >
          <div>
            <Header />
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
            {!isAuth && (
              <Modal isOpen={showLoginModal} toggle={toggleLoginModal}>
                <ModalBody>
                  <LoginForm />
                </ModalBody>
              </Modal>
            )}
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    session_id: state.auth.session_id,
    isAuth: state.auth.isAuth,
    showLoginModal: state.auth.showLoginModal,
    favoriteMovies: state.auth.favoriteMovies,
    watchlistMovies: state.auth.watchlistMovies,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateAuth,
      onLogOut,
      toggleLoginModal,
      updateFavoriteMovies,
      updateWatchListMovies,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
