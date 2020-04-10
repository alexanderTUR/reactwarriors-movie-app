import React from 'react'
import CallApi from '../../../api/api'
import MovieSummary from './MovieSummary'
import MovieNavigation from './MovieNavigation'
import LoaderSpinner from '../../ui/Loader'
import { Route, Switch } from 'react-router-dom'
import MovieDetail from './MovieDetail'
import MovieCredits from './MovieCredits'
import MovieVideos from './MovieVideos'

export default class MoviePage extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      movie: {},
      activeTab: 'MovieDetail',
    }
  }

  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}`).then(movie => {
      this.setState({
        movie,
        loading: false,
      })
    })
  }

  render() {
    const { movie } = this.state
    return (
      <div className="container mt-5">
        {this.state.loading ? (
          <LoaderSpinner />
        ) : (
          <>
            <MovieSummary movie={movie} />
            <div className="row mt-5">
              <div className="col-12">
                <MovieNavigation />
                <Switch>
                  <Route path="/movie/:id/details">
                    <MovieDetail movie={movie} />
                  </Route>
                  <Route path="/movie/:id/videos">
                    <MovieVideos />
                  </Route>
                  <Route path="/movie/:id/credits">
                    <MovieCredits />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
}
