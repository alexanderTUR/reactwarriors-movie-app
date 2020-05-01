import React from 'react'
import { Modal, ModalBody } from 'reactstrap'
import LoginForm from './Header/Login/LoginForm'
import Header from './Header/Header'
import MoviesPage from './pages/MoviesPage/MoviesPage'
import MoviePage from './pages/MoviePage/MoviePage'
import { BrowserRouter, Route } from 'react-router-dom'
import {
  onLogOut,
  toggleLoginModal,
  fetchFavoriteMovies,
  fetchWatchListMovies,
  fetchAuth,
} from '../redux/auth/auth.actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export const AppContext = React.createContext()

class App extends React.Component {
  componentDidMount() {
    const { session_id, fetchAuth } = this.props
    if (session_id) {
      fetchAuth(session_id)
    }
  }

  render() {
    const {
      user,
      session_id,
      isAuth,
      showLoginModal,
      fetchAuth,
      onLogOut,
      toggleLoginModal,
      favoriteMovies,
      watchlistMovies,
      fetchFavoriteMovies,
      fetchWatchListMovies,
    } = this.props
    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user,
            session_id,
            isAuth,
            showLoginModal,
            fetchAuth,
            onLogOut,
            toggleLoginModal,
            favoriteMovies,
            watchlistMovies,
            fetchFavoriteMovies,
            fetchWatchListMovies,
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
      onLogOut,
      toggleLoginModal,
      fetchFavoriteMovies,
      fetchWatchListMovies,
      fetchAuth,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
