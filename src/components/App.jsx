import React from 'react'
import Filters from './Filters/Filters'
import MoviesList from './Movies/MoviesList'
import Header from './Header/Header'
import { API_URL, API_KEY_3, fetchApi } from '../api/api'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

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
      session_id: null,
    }
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
    this.setState({
      ...this.initialState,
      filters: { ...this.initialState.filters },
    })
  }

  componentDidMount() {
    const session_id = cookies.get('session_id')
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then(user => {
        this.updateUser(user)
      })
    }
  }

  render() {
    const { filters, page, total_pages, user } = this.state
    return (
      <div>
        <Header
          user={user}
          updateUser={this.updateUser}
          updateSessionId={this.updateSessionId}
        />
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
    )
  }
}
