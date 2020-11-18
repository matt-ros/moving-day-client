import TokenService from './token-service'
import config from '../config'

const GetAllApiService = {
  getAll() {
    return fetch(`${config.API_BASE_URL}/getAll`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default GetAllApiService