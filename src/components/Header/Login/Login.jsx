import React from 'react'
import { Modal, ModalBody } from 'reactstrap'
import LoginForm from './LoginForm'
import AppContextHoc from '../../HOC/AppContextHOC'

class Login extends React.Component {
  render() {
    const { showModal, toggleModal } = this.props
    return (
      <div className="ml-auto">
        <button type="button" className="btn btn-success" onClick={toggleModal}>
          Login
        </button>
        <Modal isOpen={showModal} toggle={toggleModal}>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default AppContextHoc(Login)
