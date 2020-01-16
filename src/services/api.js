import toast from 'wbui-m/lib/toast'
import axios from 'axios'
import { stringifyParams } from '@utils/url'
const API_BASE = process.env.VUE_APP_SECRET
const defaultConfig = {
  baseURL: API_BASE,
  timeout: 5000,
  paramsSerializer: function(params) {
    return stringifyParams(params)
  },
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
  transformRequest: [
    function(data) {
      return stringifyParams(data)
    },
  ],
}
const instanceCache = {}

function axiosInstanceFactory(url, config, disableNotification) {
  const options = Object.assign({}, defaultConfig, config)
  if (!options.params) {
    options.params = {}
  }
  if (typeof options.params.pretend === 'undefined' && window.$config && window.$config.env) {
    options.params.pretend = window.$config.env.pretend
  }
  if (!options.data) {
    options.data = {}
  }
  const instance = axios.create(options)

  function showError(msg) {
    if (!disableNotification) {
      toast({
        content: msg,
        duration: 1200,
      })
    }
  }

  instance.interceptors.request.use(
    function(config) {
      if (!process.env.VUE_APP_IS_E2E) {
        config.params.reqtime = Date.now()
      }
      return config
    },
    function(error) {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    response => {
      // status === 200
      if (response && response.data) {
        if (response.data.code === '100000' || response.data.code === '1000') {
          return response.data
        } else {
          // 因接口.msg暂不适合用户直接阅读，统一文案暂时不使用
          // let errorMsg = response.data.msg ? (response.msg + '，请重试') : '网络超时，请重试'
          showError('网络超时，请重试')
        }
      } else {
        showError('网络超时，请重试')
      }
      return Promise.reject(response)
    },
    error => {
      if (error.response && error.response.status === 500) {
        showError('网络超时，请重试')
      } else if (error.code === 'ECONNABORTED' || (error.response && error.response.status === 408)) {
        showError('网络超时，请重试')
      } else if (!error.status && !error.response) {
        showError('网络超时，请重试')
      } else {
        showError('网络超时，请重试')
      }
      return Promise.reject(error)
    }
  )

  return instance
}

/*
factory参数
@params {String, Array} url: 
  实例使用的url。会衔接在config.baseURL后。
  为数组时会用于生成fallback地址。
  注意，为数组时每次调用factory会生成新的实例，为字符串时如缓存内已有符合的实例则返回缓存实例
@params {Object} config：axios实例设置

实例方法参数
@params {String, Array} url: 
  调用时使用的url。会衔接在config.baseURL+实例url后。
  为数组时会与实例url一同用于生成fallback地址
@params {Object} config：axios config参数，
@params data: axios data参数
*/
function factory(url, config, disableNotification) {
  const axiosInstance = axiosInstanceFactory(url, config, disableNotification)
  const instances = [
    {
      instance: axiosInstance,
      remainingRetries: 1,
    },
  ]

  if (window.$config && window.$config.use_nodejs) {
    const patchInstance = axiosInstanceFactory(
      url,
      Object.assign({}, config, {
        headers: {
          common: {
            'Use-Nodejs': '1',
          },
        },
      }),
      true
    )

    instances.unshift({
      instance: patchInstance,
      remainingRetries: 2,
    })
  }

  const cacheId = stringifyParams({
    url: url,
    config: stringifyParams(config || {}),
    disableNotification: disableNotification,
  })
  if (!Array.isArray(url) && instanceCache[cacheId]) {
    return instanceCache[cacheId]
  }
  const baseUrl = url

  const wrapper = {
    instance: axiosInstance,
    instances,
    request(config) {
      return axiosInstance.request(config)
    },
    get(url, config) {
      return requestQueue(Array.from(instances), 'get', constructUrlArray(baseUrl, url), config)
    },
    delete(url, config) {
      return requestQueue(Array.from(instances), 'delete', constructUrlArray(baseUrl, url), config)
    },
    head(url, config) {
      return requestQueue(Array.from(instances), 'head', constructUrlArray(baseUrl, url), config)
    },
    options(url, config) {
      return requestQueue(Array.from(instances), 'options', constructUrlArray(baseUrl, url), config)
    },
    post(url, data, config) {
      return requestQueue(Array.from(instances), 'post', constructUrlArray(baseUrl, url), data, config)
    },
    put(url, data, config) {
      return requestQueue(Array.from(instances), 'put', constructUrlArray(baseUrl, url), data, config)
    },
    patch(url, data, config) {
      return requestQueue(Array.from(instances), 'patch', constructUrlArray(baseUrl, url), data, config)
    },
    getUri(config) {
      return axiosInstance.getUri(config)
    },
  }
  if (!Array.isArray(url)) {
    instanceCache[cacheId] = wrapper
  }
  return wrapper
}

function constructUrlArray(baseUrl, url) {
  if (!Array.isArray(baseUrl)) {
    baseUrl = [baseUrl]
  }
  const urlArray = []
  baseUrl.forEach(base => {
    if (Array.isArray(url)) {
      url.forEach(segment => {
        addUrl(urlArray, base, segment)
      })
    } else {
      addUrl(urlArray, base, url)
    }
  })
  return urlArray
}

function addUrl(array, base, url) {
  if (!url) {
    array.push(base)
    return
  }
  if (/^((https?):)?\/\//.test(url)) {
    array.push(url)
    return
  }
  if (url && url.indexOf('/') === 0) {
    array.push(base + url)
    return
  }
  array.push([base, url].join('/'))
}

function callUrlWithFallback(instance, method, urlArray, ...args) {
  if (!Array.isArray(urlArray)) {
    return instance[method](urlArray, ...args)
  }
  const url = urlArray.shift()
  return new Promise((resolve, reject) => {
    instance[method](url, ...args).then(
      (...res) => {
        resolve(...res)
      },
      (...error) => {
        if (urlArray.length) {
          resolve(callUrlWithFallback(instance, method, urlArray, ...args))
        } else {
          /* eslint-disable prefer-promise-reject-errors */
          reject(...error)
          /* eslint-enable prefer-promise-reject-errors */
        }
      }
    )
  })
}

function requestQueue(instances, method, urlArray, ...args) {
  if (!Array.isArray(instances)) {
    return requestQueue([instances], method, urlArray, ...args)
  }

  let { instance, remainingRetries } = instances.shift()
  remainingRetries -= 1

  return callUrlWithFallback(instance, method, Array.from(urlArray), ...args)
    .then(res => {
      // console.log('requestQueue res: ', remainingRetries, res)
      return res
    })
    .catch(error => {
      // console.log('requestQueue error: ', remainingRetries, error)
      if (remainingRetries > 0) {
        return requestQueue([{ instance, remainingRetries }, ...instances], method, urlArray, ...args)
      } else {
        if (instances.length === 0) {
          return Promise.reject(error)
        }
        return requestQueue(instances, method, urlArray, ...args)
      }
    })
}

const defaultApi = factory(null, defaultConfig)

export default defaultApi

export { defaultApi, factory }
