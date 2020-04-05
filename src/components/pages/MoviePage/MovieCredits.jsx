import React, { Component } from 'react'
import Loader from 'react-loader-spinner'
import emptyImage from '../../../img/no-image.png'
import CallApi from '../../../api/api'

class MovieCredits extends Component {
  constructor() {
    super()

    this.state = {
      loading: true,
      credits: [],
    }
  }

  getCredits = () => {
    const { movie } = this.props
    CallApi.get(`/movie/${movie.id}/credits`).then(credits => {
      this.setState({
        credits,
        loading: false,
      })
    })
  }

  componentDidMount() {
    if (Object.keys(this.props.movie).length) {
      this.getCredits()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.movie !== prevProps.movie) {
      this.getCredits()
    }
  }

  render() {
    const { cast } = this.state.credits
    return (
      <div className="tabs-content mt-5">
        {this.state.loading ? (
          <div className="page-loader-container">
            <Loader type="Puff" color="#157ffb" height={100} width={100} />
          </div>
        ) : (
          <div className="row">
            {cast.length ? (
              cast.map(actor => {
                return (
                  <div key={actor.id} className="col-2 mb-3 actor-card">
                    <p>{actor.name}</p>
                    <img
                      className="actor-card__image"
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                          : emptyImage
                      }
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

export default MovieCredits
