import React from 'react'
import { withAuth } from '../../../hoc/withAuth'
import cx from 'classnames'
import CallApi from '../../../api/api'

class LoginForm extends React.Component {
  state = {
    username: '',
    password: '',
    repeatPassword: '',
    errors: {},
    submitting: false,
  }

  onChange = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        base: null,
        [name]: null,
      },
    }))
  }

  handleBlur = e => {
    const name = e.target.name
    const errors = this.validateFields()
    const error = errors[name]
    if (error) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [name]: error,
        },
      }))
    }
  }

  validateFields = () => {
    const errors = {}

    if (this.state.username === '') {
      errors.username = 'Обязательное поле'
    }

    if (this.state.password === '') {
      errors.password = 'Обязательное поле'
    }

    if (this.state.repeatPassword !== this.state.password) {
      errors.repeatPassword = 'Должен быть равен паролю'
    }
    return errors
  }

  onSubmit = () => {
    this.setState({
      submitting: true,
    })
    let session_id = null
    CallApi.get('/authentication/token/new')
      .then(data => {
        return CallApi.post('/authentication/token/validate_with_login', {
          body: {
            username: this.state.username,
            password: this.state.password,
            request_token: data.request_token,
          },
        })
      })
      .then(data => {
        return CallApi.post('/authentication/session/new', {
          body: {
            request_token: data.request_token,
          },
        })
      })
      .then(data => {
        session_id = data.session_id
        return this.props.authActions.fetchAuth(session_id)
      })
      .then(() => {
        this.setState({
          submitting: false,
        })
      })
      .catch(error => {
        console.log('error', error)
        this.setState({
          submitting: false,
          errors: {
            base: error.status_message,
          },
        })
      })
  }

  onLogin = e => {
    e.preventDefault()
    const errors = this.validateFields()
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }))
    } else {
      this.onSubmit()
    }
  }

  getClassForInput = key =>
    cx('form-control', {
      'form-control_invalid': this.state.errors[key],
    })

  render() {
    const {
      username,
      password,
      repeatPassword,
      errors,
      submitting,
    } = this.state

    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>
          <div className="form-group">
            <label htmlFor="username">Пользователь</label>
            <input
              type="text"
              className={this.getClassForInput('username')}
              id="username"
              placeholder="Пользователь"
              name="username"
              value={username}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              className={this.getClassForInput('password')}
              id="password"
              placeholder="Пароль"
              name="password"
              value={password}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="repeatPassword">Повторите пароль</label>
            <input
              type="password"
              className={this.getClassForInput('repeatPassword')}
              id="repeatPassword"
              placeholder="Повторите пароль"
              name="repeatPassword"
              value={repeatPassword}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.repeatPassword && (
              <div className="invalid-feedback">{errors.repeatPassword}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
            disabled={submitting}
          >
            Вход
          </button>
          {errors.base && (
            <div className="invalid-feedback text-center">{errors.base}</div>
          )}
        </form>
      </div>
    )
  }
}

export default withAuth(LoginForm)
