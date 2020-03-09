import React from 'react'
import Login from './Login/Login'
import User from './User'
import PropTypes from 'prop-types'

class Header extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    updateUser: PropTypes.func.isRequired,
    updateSessionId: PropTypes.func.isRequired,
  }

  render() {
    const { user, updateUser, updateSessionId } = this.props
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          {user ? (
            <User user={user} />
          ) : (
            <Login updateUser={updateUser} updateSessionId={updateSessionId} />
          )}
        </div>
      </nav>
    )
  }
}

export default Header
