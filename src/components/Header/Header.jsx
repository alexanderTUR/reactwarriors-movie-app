import React from 'react'
import UserMenu from './UserMenu'
import { Link } from 'react-router-dom'
import { withAuth } from '../../hoc/withAuth'

class Header extends React.Component {
  render() {
    const { auth, authActions } = this.props
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
          </ul>
          {auth.isAuth ? (
            <UserMenu />
          ) : (
            <div className="ml-auto">
              <button
                type="button"
                className="btn btn-success"
                onClick={authActions.toggleLoginModal}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </nav>
    )
  }
}

export default withAuth(Header)
