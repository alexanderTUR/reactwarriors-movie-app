import React, { Component } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { NavLink as NavLinkRouter, withRouter } from 'react-router-dom'

class MovieNavigation extends Component {
  render() {
    const { id } = this.props.match.params
    return (
      <div>
        <Nav tabs className="movie-tabs-navigation">
          <NavItem>
            <NavLink tag={NavLinkRouter} to={`/movie/${id}/details`}>
              Детали
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={NavLinkRouter} to={`/movie/${id}/videos`}>
              Видео
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={NavLinkRouter} to={`/movie/${id}/credits`}>
              В ролях
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    )
  }
}

const MovieNavigationWithRouter = withRouter(MovieNavigation)

export default MovieNavigationWithRouter
