import React, { Component } from 'react'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import { withAuth } from '../../hoc/withAuth'
import CallApi from '../../api/api'

class UserMenu extends Component {
  state = {
    dropdownOpen: false,
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }))
  }

  handleLogOut = () => {
    const { auth, authActions } = this.props
    CallApi.delete('/authentication/session', {
      body: {
        session_id: auth.session_id,
      },
    }).then(() => {
      authActions.onLogOut()
    })
  }

  render() {
    const { auth } = this.props
    return (
      <div className="ml-auto">
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
          <DropdownToggle
            tag="div"
            onClick={this.toggleDropdown}
            data-toggle="dropdown"
            aria-expanded={this.state.dropdownOpen}
          >
            <img
              src={`https://secure.gravatar.com/avatar/${auth.user.avatar.gravatar.hash}.jpg?s=64`}
              alt="Avatar"
              onClick={this.toggleDropdown}
            />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={this.handleLogOut}>Выход</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }
}

export default withAuth(UserMenu)
