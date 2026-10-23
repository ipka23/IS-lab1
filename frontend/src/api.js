const API_URL = '/lab1/api'

async function getErrorText(response) {
  try {
    const data = await response.json()
    if (data.message) {
      return data.message
    }
  } catch (e) {
  }
  return 'Ошибка ' + response.status
}

export async function apiGet(path) {
  const response = await fetch(API_URL + path)
  if (!response.ok) {
    throw new Error(await getErrorText(response))
  }
  return response.json()
}

export async function apiSend(method, path, body) {
  const options = { method: method, headers: {} }
  if (body !== undefined) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(body)
  }
  const response = await fetch(API_URL + path, options)
  if (!response.ok) {
    throw new Error(await getErrorText(response))
  }
  if (response.status === 204) {
    return null
  }
  return response.json()
}

export function getSocketUrl() {
  const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://'
  return protocol + window.location.host + '/lab1/ws/movies'
}
