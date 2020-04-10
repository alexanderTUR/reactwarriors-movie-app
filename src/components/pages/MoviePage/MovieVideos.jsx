import React, { Component } from 'react'
import CallApi from '../../../api/api'
import LoaderSpinner from '../../ui/Loader'
import { withRouter } from 'react-router-dom'

class MovieVideos extends Component {
  constructor() {
    super()

    this.state = {
      loading: true,
      videos: [],
    }
  }

  getVideos = movieId => {
    CallApi.get(`/movie/${movieId}/videos`).then(videos => {
      this.setState({
        videos: videos.results,
        loading: false,
      })
    })
  }

  componentDidMount() {
    this.getVideos(this.props.match.params.id)
  }

  render() {
    const { videos } = this.state

    return (
      <div className="tabs-content mt-5">
        {this.state.loading ? (
          <LoaderSpinner />
        ) : (
          <div className="row">
            {videos.length ? (
              videos.map(video => {
                // console.log(video.site)
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
              <div className="col-12 mb-3">Нет доступных видео материалов</div>
            )}
          </div>
        )}
      </div>
    )
  }
}

const MovieVideosWithRouter = withRouter(MovieVideos)

export default MovieVideosWithRouter
