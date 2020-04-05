import React, { Component } from 'react'
import CallApi from '../../../api/api'
import Loader from 'react-loader-spinner'

class MovieVideos extends Component {
  constructor() {
    super()

    this.state = {
      loading: true,
      videos: [],
    }
  }

  getVideos = () => {
    const { movie } = this.props
    CallApi.get(`/movie/${movie.id}/videos`).then(videos => {
      this.setState({
        videos: videos.results,
        loading: false,
      })
    })
  }

  componentDidMount() {
    if (Object.keys(this.props.movie).length) {
      this.getVideos()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.movie !== prevProps.movie) {
      this.getVideos()
    }
  }

  render() {
    const { videos } = this.state
    return (
      <div className="tabs-content mt-5">
        {this.state.loading ? (
          <div className="page-loader-container">
            <Loader type="Puff" color="#157ffb" height={100} width={100} />
          </div>
        ) : (
          <div className="row">
            {videos.length ? (
              videos.map(video => {
                return (
                  <div key={video.id} className="col-12 mb-3 video-card">
                    <p>{video.name}</p>
                    <div className="video-card__video-container">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.key}`}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="video.name"
                      ></iframe>
                    </div>
                  </div>
                )
              })
            ) : (
              <div>Нет доступных видео материалов</div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default MovieVideos
