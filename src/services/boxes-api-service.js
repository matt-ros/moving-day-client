import TokenService from './token-service'
import config from '../config'

const BoxesApiService = {
  getBoxes() {
    return fetch(`${config.API_BASE_URL}/boxes`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  postBox(box) {
    return fetch(`${config.API_BASE_URL}/boxes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(box)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getBox(boxId) {
    return fetch(`${config.API_BASE_URL}/boxes/${boxId}`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  patchBox(boxId, updateFields) {
    return fetch(`${config.API_BASE_URL}/boxes/${boxId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(updateFields)
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.ok
    )
  },

  deleteBox(boxId) {
    return fetch(`${config.API_BASE_URL}/boxes/${boxId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.ok
      )
  }
}

export default BoxesApiService
