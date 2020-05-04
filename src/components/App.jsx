import React from 'react'
import { Modal, ModalBody } from 'reactstrap'
import LoginForm from './Header/Login/LoginForm'
import Header from './Header/Header'
import MoviesPage from './pages/MoviesPage/MoviesPage'
import MoviePage from './pages/MoviePage/MoviePage'
import { BrowserRouter, Route } from 'react-router-dom'
import { withAuth } from '../hoc/withAuth'

class App extends React.Component {
  componentDidMount() {
    const { auth, authActions } = this.props
    if (auth.session_id) {
      authActions.fetchAuth(auth.session_id)
    }
  }

  render() {
    const { auth, authActions } = this.props
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={MoviesPage} />
          <Route path="/movie/:id" component={MoviePage} />
          {!auth.isAuth && (
            <Modal
              isOpen={auth.showLoginModal}
              toggle={authActions.toggleLoginModal}
            >
              <ModalBody>
                <LoginForm />
              </ModalBody>
            </Modal>
          )}
        </div>
      </BrowserRouter>
    )
  }
}

export default withAuth(App)
