import React from 'react'
import Filters from './Filters/Filters'
import Header from './Header/Header'
import CallApi from '../api/api'
import Cookies from 'universal-cookie'
import MoviesList from './Movies/MoviesList'

const cookies = new Cookies()
export const AppContext = React.createContext()
export default class App extends React.Component {
  constructor() {
    super()

    this.initialState = {
      filters: {
        sort_by: 'popularity.desc',
        primary_release_year: '',
        with_genres: [],
      },
      page: 1,
      total_pages: null,
    }
    this.state = {
      ...this.initialState,
      user: null,
      session_id: cookies.get('session_id') || null,
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

  updateUser = user => {
    this.setState({
      user,
    })
  }

  updateSessionId = session_id => {
    cookies.set('session_id', session_id, { path: '/', maxAge: 2592000 })
    this.setState({
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
    })
  }

  getFavoriteMovies = (user, session_id) => {
    const queryStringParams = {
      session_id,
    }
    CallApi.get(`/account/${user.id}/favorite/movies`, {
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
    CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: queryStringParams,
    }).then(response => {
      this.setState({
        watchlist: response.results,
      })
    })
  }

  onChangeFilters = e => {
    const { name, value } = e.target
    this.updateFilters({ name, value })
  }

  updateFilters = ({ name, value }) => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value,
      },
    }))
  }

  onChangePage = page => {
    this.setState({
      page,
    })
  }

  onChangeTotalPage = total_pages => {
    this.setState({
      total_pages,
    })
  }

  onReset = () => {
    this.setState(this.initialState)
  }

  componentDidMount() {
    const { session_id } = this.state
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
        this.updateUser(user)
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
    const {
      filters,
      page,
      total_pages,
      user,
      session_id,
      watchlist,
      favorite,
      showModal,
    } = this.state
    return (
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
          <Header user={user} />
          <div className="container">
            <div className="row mt-4">
              <div className="col-4">
                <div className="card">
                  <div className="card-body">
                    <h3>Фильтры:</h3>
                    <Filters
                      page={page}
                      total_pages={total_pages}
                      filters={filters}
                      onChangeFilters={this.onChangeFilters}
                      onChangePage={this.onChangePage}
                      onReset={this.onReset}
                      updateFilters={this.updateFilters}
                    />
                  </div>
                </div>
              </div>
              <div className="col-8">
                <MoviesList
                  page={page}
                  total_pages={total_pages}
                  filters={filters}
                  onChangePage={this.onChangePage}
                  onChangeTotalPage={this.onChangeTotalPage}
                />
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    )
  }
}
