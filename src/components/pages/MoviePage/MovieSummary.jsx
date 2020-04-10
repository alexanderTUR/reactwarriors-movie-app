import React, { Component } from 'react'
import FavoriteButton from '../../Movies/FavoriteButton'
import WatchlistButton from '../../Movies/WatchlistButton'
import emptyImage from '../../../img/no-image.png'

class MovieSummary extends Component {
  render() {
    const { movie } = this.props
    const imagePath = movie.backdrop_path || movie.poster_path
    return (
      <div className="row mt-3">
        <div className="col-5">
          <img
            className="movie-image"
            src={
              imagePath
                ? `https://image.tmdb.org/t/p/w500${imagePath}`
                : emptyImage
            }
            alt={movie.title}
          />
        </div>
        <div className="col-7">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <div>
            <WatchlistButton id={movie.id} />
            <FavoriteButton id={movie.id} />
          </div>
        </div>
      </div>
    )
  }
}

export default MovieSummary
