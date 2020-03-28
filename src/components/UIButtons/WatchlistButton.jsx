import React from 'react'
import AppContextHoc from '../HOC/AppContextHOC'
import { Bookmark, BookmarkBorder } from '@material-ui/icons'

class WatchlistButton extends React.Component {
  constructor() {
    super()
    this.state = {
      isActive: false,
    }
  }

  toggleActiveButton = () => {
    this.props.updateUsersMovieList(
      'watchlist',
      this.props.id,
      !this.state.isActive
    )
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }))
  }

  checkIsInWatchlist = () => {
    if (
      this.props.watchlist.find(elem => {
        return elem.id === this.props.id
      })
    ) {
      this.setState({
        isActive: true,
      })
    }
  }

  componentDidMount() {
    this.checkIsInWatchlist()
  }

  componentDidUpdate(prevProps) {
    if (this.props.watchlist.length !== prevProps.watchlist.length) {
      this.checkIsInWatchlist()
    }
  }

  render() {
    return (
      <button
        className="ui-btn ui-btn_watchlist"
        type="button"
        onClick={this.toggleActiveButton}
      >
        {this.state.isActive ? <Bookmark /> : <BookmarkBorder />}
      </button>
    )
  }
}

export default AppContextHoc(WatchlistButton)
