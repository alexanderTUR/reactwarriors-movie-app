import React from 'react'
import UserMenu from './UserMenu'
import AppContextHoc from '../HOC/AppContextHOC'

class Header extends React.Component {
  render() {
    const { user, toggleModal } = this.props
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          {user ? (
            <UserMenu />
          ) : (
            <div className="ml-auto">
              <button
                type="button"
                className="btn btn-success"
                onClick={toggleModal}
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

export default AppContextHoc(Header)
