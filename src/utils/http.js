function request(url, method = 'post', params, headers = {}, onProgress = e => e, requestList) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.upload.onprogress = onProgress
    xhr.responseType = 'json'
    xhr.open(method, url)
    Object.keys(headers).forEach(head =>
      xhr.setRequestHeader(head, headers[head])
    )
    xhr.send(params)
    xhr.onload = e => {
      if (requestList) {
        const xhrIndex = requestList.findIndex(item => item === xhr)
        requestList.splice(xhrIndex, 1)
      }
      resolve({
        data: e.target.response,
      })
    }
    xhr.onerror = e => {
      reject({
        data: e,
      })
    }
    requestList && requestList.push(xhr)
  })
}

export { request }
