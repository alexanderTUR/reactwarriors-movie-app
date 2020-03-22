import React from 'react'
import Login from './Login/Login'
import UserMenu from './UserMenu'
import PropTypes from 'prop-types'

class Header extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  }

  render() {
    const { user } = this.props
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">{user ? <UserMenu /> : <Login />}</div>
      </nav>
    )
  }
}

export default Header
