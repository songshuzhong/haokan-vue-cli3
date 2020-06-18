import axios from 'axios';

let customerId = getUrlParam('customer_id')

const defaultConfigs = {
    timeout: 10000,
    paramsSerializer: function (params) {
        // 附身参数
        if (typeof params['customer_id'] === 'undefined' && customerId) {
            params['customer_id'] = customerId
        }
        return qs.stringify(params)
    },
    headers: {
        post: {
            'Content-Type': 'application/json',
        }
    }
}

function setCustomerId(id) {
    customerId = id
}

function fetching(options = {}) {
    const mergedOptions = Object.assign({}, defaultConfigs, options);
    const instance = axios.create(mergedOptions);

    const actions = {
      get(url, config) {
        return fetchDispatch(instance, 'get', )
      }
    }
}

export {fetching};
