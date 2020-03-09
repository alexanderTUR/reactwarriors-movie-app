import React from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody } from 'reactstrap'
import LoginForm from './LoginForm'

export default class Login extends React.Component {
  static propTypes = {
    updateUser: PropTypes.func.isRequired,
    updateSessionId: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      showModal: false,
    }
  }

  toggleModal = () => {
    this.setState(prewState => ({
      showModal: !prewState.showModal,
    }))
  }

  render() {
    return (
      <div className="ml-auto">
        <button
          type="button"
          className="btn btn-success"
          onClick={this.toggleModal}
        >
          Login
        </button>
        <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
          <ModalBody>
            <LoginForm
              updateUser={this.props.updateUser}
              updateSessionId={this.props.updateSessionId}
            />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}
