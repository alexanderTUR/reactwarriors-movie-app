import queryString from 'querystring'

export const API_URL = 'https://api.themoviedb.org/3'

export const API_KEY_3 = '87626db2a2acdeb2bf6c1833b09d09bc'

export const API_KEY_4 =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzYyNmRiMmEyYWNkZWIyYmY2YzE4MzNiMDlkMDliYyIsInN1YiI6IjVlNDg0ZGM3MmQ5Mzc1MDAxOWE2ZDcwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ANtodeXFifyfc9udIORU7AKkdViAUxx1AXr4FSZP5zU'

export const fetchApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        if (response.status < 400) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(data => {
        resolve(data)
      })
      .catch(response => {
        response.json().then(error => {
          reject(error)
        })
      })
  })
}

export default class CallApi {
  static get(url, options = {}) {
    const { params = {} } = options
    const queryStringParams = {
      api_key: API_KEY_3,
      language: 'ru-RU',
      ...params,
    }
    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        mode: 'cors',
        headers: {
          'Content-type': 'application/json',
        },
      }
    )
  }
  static post(url, options = {}) {
    const { params = {}, body = {} } = options
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params,
    }
    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )
  }
  static delete(url, options = {}) {
    const { params = {}, body = {} } = options
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params,
    }
    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )
  }
}
