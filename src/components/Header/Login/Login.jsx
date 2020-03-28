import React from 'react'
import { Modal, ModalBody } from 'reactstrap'
import LoginForm from './LoginForm'
import AppContextHoc from '../../HOC/AppContextHOC'

class Login extends React.Component {
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

  componentDidMount() {
    const { session_id } = this.props
    if (!session_id) {
      this.setState({
        showModal: true,
      })
    }
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
            <LoginForm />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default AppContextHoc(Login)
