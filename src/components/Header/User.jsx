import React from 'react'
import PropTypes from 'prop-types'

export default class User extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {
    const { user } = this.props
    return (
      <div className="ml-auto">
        <img
          src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64`}
          alt="Avatar"
        />
      </div>
    )
  }
}
