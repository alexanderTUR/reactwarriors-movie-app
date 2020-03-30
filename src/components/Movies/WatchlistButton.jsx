import React from 'react'
import AppContextHoc from '../HOC/AppContextHOC'
import CallApi from '../../api/api'
import { Bookmark, BookmarkBorder } from '@material-ui/icons'

class WatchlistButton extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
    }
  }

  updateWatchlist = (movieId, isInWatchlist) => {
    const { session_id, user, toggleModal } = this.props
    if (!user) {
      toggleModal()
      return
    }
    const queryStringParams = {
      session_id,
    }
    this.setState({
      loading: true,
    })
    CallApi.post(`/account/${user.id}/watchlist`, {
      params: queryStringParams,
      body: {
        media_type: 'movie',
        media_id: movieId,
        watchlist: isInWatchlist,
      },
    })
      .then(() => {
        this.props.getWatchlistMovies(user, session_id)
      })
      .then(() => {
        this.setState({
          loading: false,
        })
      })
  }

  toggleActiveButton = () => {
    this.updateWatchlist(this.props.id, !this.isInWatchlist())
  }

  isInWatchlist = () =>
    this.props.watchlist.findIndex(movie => movie.id === this.props.id) !== -1

  render() {
    return (
      <button
        className="ui-btn ui-btn_watchlist"
        type="button"
        onClick={this.toggleActiveButton}
        disabled={this.state.loading}
      >
        {this.isInWatchlist() ? <Bookmark /> : <BookmarkBorder />}
      </button>
    )
  }
}

export default AppContextHoc(WatchlistButton)
