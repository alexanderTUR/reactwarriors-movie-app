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

  updateWatchlist = () => {
    const {
      session_id,
      user,
      isAuth,
      getWatchlistMovies,
      id,
      toggleLoginModal,
    } = this.props
    if (!isAuth) {
      toggleLoginModal()
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
        media_id: id,
        watchlist: !this.isInWatchlist(),
      },
    })
      .then(() => getWatchlistMovies({ user, session_id }))
      .then(() => {
        this.setState({
          loading: false,
        })
      })
  }

  toggleActiveButton = () => {
    this.updateWatchlist()
  }

  isInWatchlist = () =>
    this.props.watchlistMovies.findIndex(
      movie => movie.id === this.props.id
    ) !== -1

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
