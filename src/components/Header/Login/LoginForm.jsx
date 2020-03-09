import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { API_URL, API_KEY_3, fetchApi } from '../../../api/api'

export default class LoginForm extends React.Component {
  static propTypes = {
    updateUser: PropTypes.func.isRequired,
    updateSessionId: PropTypes.func.isRequired,
  }

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
    this.setState(prewState => ({
      [name]: value,
      errors: {
        ...prewState.errors,
        base: null,
        [name]: null,
      },
    }))
  }

  handleBlur = e => {
    const errors = this.validateFields(e.target.name)
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }))
    }
  }

  validateFields = field => {
    const errors = {}

    const validateUsername = () => {
      if (this.state.username === '') {
        errors.username = 'Обязательное поле'
      }
    }

    const validatePassword = () => {
      if (this.state.password === '') {
        errors.password = 'Обязательное поле'
      }
    }

    const validateRepeatPassword = () => {
      if (this.state.repeatPassword !== this.state.password) {
        errors.repeatPassword = 'Должен быть равен паролю'
      }
    }

    switch (field) {
      case 'submit':
        validateUsername()
        validatePassword()
        validateRepeatPassword()
        break
      case 'username':
        validateUsername()
        break
      case 'password':
        validatePassword()
        break
      case 'repeatPassword':
        validateRepeatPassword()
        break
      default:
        return null
    }

    return errors
  }

  onSubmit = async () => {
    this.setState({
      submitting: true,
    })

    try {
      const data = await fetchApi(
        `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
      )

      const result = await fetchApi(
        `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            request_token: data.request_token,
          }),
        }
      )

      const { session_id } = await fetchApi(
        `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            request_token: result.request_token,
          }),
        }
      )

      this.props.updateSessionId(session_id)

      const user = await fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      )
      this.props.updateUser(user)

      this.setState({
        submitting: false,
      })
    } catch (error) {
      this.setState({
        submitting: false,
        errors: {
          base: error.status_message,
        },
      })
    }

    // fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
    //   .then(data => {
    //     return fetchApi(
    //       `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
    //       {
    //         method: 'POST',
    //         mode: 'cors',
    //         headers: {
    //           'Content-type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           username: 'alextur',
    //           password: 'vedgyn-hygnoq-gyhmI1',
    //           request_token: data.request_token,
    //         }),
    //       }
    //     )
    //   })
    //   .then(data => {
    //     return fetchApi(
    //       `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
    //       {
    //         method: 'POST',
    //         mode: 'cors',
    //         headers: {
    //           'Content-type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           request_token: data.request_token,
    //         }),
    //       }
    //     )
    //   })
    //   .then(data => {
    //     console.log('session', data)
    //   })
    //   .catch(error => {
    //     console.log('error', error)
    //   })
    // fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     fetch(
    //       `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
    //       {
    //         method: 'POST',
    //         mode: 'cors',
    //         headers: {
    //           'Content-type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           username: this.state.username,
    //           password: this.state.password,
    //           request_token: data.request_token,
    //         }),
    //       }
    //     )
    //       .then(response => response.json())
    //       .then(data => {
    //         fetch(
    //           `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
    //           {
    //             method: 'POST',
    //             mode: 'cors',
    //             headers: {
    //               'Content-type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //               request_token: data.request_token,
    //             }),
    //           }
    //         )
    //           .then(response => response.json())
    //           .then(data => {
    //             console.log(data)
    //           })
    //       })
    //   })
  }

  onLogin = e => {
    e.preventDefault()
    const errors = this.validateFields('submit')

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
              className={cx('form-control', {
                'form-control_invalid': errors.username,
              })}
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
              className={cx('form-control', {
                'form-control_invalid': errors.password,
              })}
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
              className={cx('form-control', {
                'form-control_invalid': errors.repeatPassword,
              })}
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
