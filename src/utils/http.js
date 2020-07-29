function request(url, method = 'post', params, headers = {}, requestList) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    Object.keys(headers).forEach(head =>
      xhr.setRequestHeader(head, headers[head])
    )
    xhr.send(params)
    xhr.onload = e => {
      resolve({
        data: e.target.response,
      })
    }
    xhr.onerror = e => {
      reject({
        data: e,
      })
    }
  })
}

export { request }
