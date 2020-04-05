import React, { Component } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { Route, Switch, NavLink as NavLinkRouter } from 'react-router-dom'
import MovieDetail from './MovieDetail'
import MovieCredits from './MovieCredits'
import MovieVideos from './MovieVideos'

class MovieTabs extends Component {
  constructor() {
    super()
    this.state = {
      activeTab: 'MovieDetail',
    }
  }

  toggleTabs = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }

  render() {
    const { movie } = this.props
    return (
      <div>
        <Nav tabs className="movie-tabs-navigation">
          <NavItem>
            <NavLink
              tag={NavLinkRouter}
              to={`/movie/${movie.id}/details`}
              onClick={() => {
                this.toggleTabs('MovieDetais')
              }}
            >
              Детали
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={NavLinkRouter}
              to={`/movie/${movie.id}/videos`}
              onClick={() => {
                this.toggleTabs('MovieVideos')
              }}
            >
              Видео
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={NavLinkRouter}
              to={`/movie/${movie.id}/credits`}
              onClick={() => {
                this.toggleTabs('MovieCredits')
              }}
            >
              В ролях
            </NavLink>
          </NavItem>
        </Nav>
        <Switch>
          <Route path="/movie/:id/details">
            <MovieDetail movie={movie} />
          </Route>
          <Route path="/movie/:id/videos">
            <MovieVideos movie={movie} />
          </Route>
          <Route path="/movie/:id/credits">
            <MovieCredits movie={movie} />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default MovieTabs
