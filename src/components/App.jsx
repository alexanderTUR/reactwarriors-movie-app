import React from 'react'
import { Modal, ModalBody } from 'reactstrap'
import LoginForm from './Header/Login/LoginForm'
import Header from './Header/Header'
import CallApi from '../api/api'
import MoviesPage from './pages/MoviesPage/MoviesPage'
import MoviePage from './pages/MoviePage/MoviePage'
import { BrowserRouter, Route } from 'react-router-dom'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const AppContext = React.createContext()
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      watchlist: [],
      favorite: [],
      showModal: false,
    }
  }

  toggleModal = () => {
    this.setState(prewState => ({
      showModal: !prewState.showModal,
    }))
  }

  // updateUser = user => {
  //   this.setState({
  //     user,
  //   })
  // }

  // updateSessionId = session_id => {
  //   this.setState({
  //     session_id,
  //   })
  // }

  updateAuth = (user, session_id) => {
    this.setState({
      user,
      session_id,
    })
  }

  onLogOut = () => {
    cookies.remove('session_id')
    this.setState({
      session_id: null,
      user: null,
      watchlist: [],
      favorite: [],
      showModal: false,
      isAuth: false,
    })
  }

  getFavoriteMovies = (user, session_id) => {
    const queryStringParams = {
      session_id,
    }
    return CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: queryStringParams,
    }).then(response => {
      this.setState({
        favorite: response.results,
      })
    })
  }

  getWatchlistMovies = (user, session_id) => {
    const queryStringParams = {
      session_id,
    }
    return CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: queryStringParams,
    }).then(response => {
      this.setState({
        watchlist: response.results,
      })
    })
  }

  componentDidMount() {
    const { session_id } = this.props
    const queryStringParams = {
      session_id,
    }
    if (session_id) {
      this.setState({
        session_id,
      })
      CallApi.get('/account', {
        params: queryStringParams,
      }).then(user => {
        this.props.updateAuth(user, session_id)
      })
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.user === null && this.state.user) {
      this.getFavoriteMovies(this.state.user, this.state.session_id)
      this.getWatchlistMovies(this.state.user, this.state.session_id)
    }
  }

  render() {
    const { watchlist, favorite, showModal } = this.state
    const { user, session_id } = this.props.store.getState()
    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user,
            session_id,
            watchlist,
            favorite,
            showModal,
            updateUser: this.updateUser,
            updateSessionId: this.updateSessionId,
            onLogOut: this.onLogOut,
            getFavoriteMovies: this.getFavoriteMovies,
            getWatchlistMovies: this.getWatchlistMovies,
            toggleModal: this.toggleModal,
          }}
        >
          <div>
            <Header />
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
            {!user && (
              <Modal isOpen={showModal} toggle={this.toggleModal}>
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
