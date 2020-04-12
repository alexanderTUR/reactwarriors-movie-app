import React, { Component } from 'react'
import CallApi from '../../../api/api'
import LoaderSpinner from '../../ui/Loader'
import MovieImage from '../../ui/MovieImage'
import { withRouter } from 'react-router-dom'

class MovieCredits extends Component {
  constructor() {
    super()

    this.state = {
      loading: true,
      credits: [],
    }
  }

  getCredits = movieId => {
    CallApi.get(`/movie/${movieId}/credits`).then(credits => {
      this.setState({
        credits,
        loading: false,
      })
    })
  }

  componentDidMount() {
    this.getCredits(this.props.match.params.id)
  }

  render() {
    const { cast } = this.state.credits
    return (
      <div className="tabs-content mt-5">
        {this.state.loading ? (
          <LoaderSpinner />
        ) : (
          <div className="row">
            {cast.length ? (
              cast.map(actor => {
                return (
                  <div key={actor.id} className="col-2 mb-3 actor-card">
                    <p>{actor.name}</p>
                    <MovieImage
                      className="actor-card__image"
                      src={actor.profile_path}
                      alt={actor.name}
                    />
                  </div>
                )
              })
            ) : (
              <div>Информация отсутствует</div>
            )}
          </div>
        )}
      </div>
    )
  }
}

const MovieCreditsWithRouter = withRouter(MovieCredits)
export default MovieCreditsWithRouter
