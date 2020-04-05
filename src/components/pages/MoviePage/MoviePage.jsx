import React from 'react'
import CallApi from '../../../api/api'
import FavoriteButton from '../../Movies/FavoriteButton'
import WatchlistButton from '../../Movies/WatchlistButton'
import MovieTabs from './MovieTabs'
import emptyImage from '../../../img/no-image.png'
import Loader from 'react-loader-spinner'

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
    const movie = this.props.match.params
    const queryStringParams = {
      language: 'ru-RU',
    }
    CallApi.get(`/movie/${movie.id}`, {
      params: queryStringParams,
    }).then(movie => {
      this.setState({
        movie,
        loading: false,
      })
    })
  }

  render() {
    const { movie } = this.state
    const imagePath = movie.backdrop_path || movie.poster_path
    return (
      <div>
        {this.state.loading ? (
          <div className="container mt-5">
            <div className="page-loader-container">
              <Loader type="Puff" color="#157ffb" height={100} width={100} />
            </div>
          </div>
        ) : (
          <div className="container">
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
            <div className="row mt-5">
              <div className="col-12">
                <MovieTabs movie={movie} />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
