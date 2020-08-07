import api from '@services/api'
import eventsHub from '@services/eventHub'

const categories = {}
let dynamicField = []
let eventBus

export default {
  registerEventHub(event) {
    eventBus = event

    return this
  },
  onEventEffect() {
    eventBus.on('field-change', (name, value) => {
      typeof this.infoSource === 'function' &&
      this.infoSource('CANCELED_DUE_TO_NEW_REQUEST')

      typeof this.apiSource === 'function' &&
      this.apiSource('CANCELED_DUE_TO_NEW_REQUEST')

      categories[name] = value
      !dynamicField.includes(name) && dynamicField.push(name)

      eventsHub.trigger('uvc-service:info', {
        isLoading: true,
      })

      eventsHub.trigger('uvc-service:api', {
        isLoading: true,
      })

      // uvc预估量
      api
        .superfansSilent()
        .post(
          '/target/uvc',
          {
            info: categories,
          },
          {
            cancelToken: new api.cancelToken(c => (this.apiSource = c)),
          }
        ).then(({result}) => {
          eventsHub.trigger('uvc-service:api', {
          data: result
        })
        }).catch(thrown => {
          if (api.isCancel(thrown)) {
            // console.log('Request canceled');
          }
        }).finally(() => {
          eventsHub.trigger('uvc-service:api', {
          isLoading: false,
        })
      })

      // uvc概览信息
      api
        .superfansSilent()
        .post(
          '/target/uvc/info',
          {
            'dynamic_field': dynamicField,
            info: categories,
          },
          {
            cancelToken: new api.cancelToken(c => (this.infoSource = c)),
          }
        )
        .then(({ result }) => {
          eventsHub.trigger('uvc-service:info', {
            data: result,
            categories,
          })
          dynamicField = []
        })
        .catch(thrown => {
          if (api.isCancel(thrown)) {
            // console.log('Request canceled');
          }
        }).finally(() => {
          eventsHub.trigger('uvc-service:info', {
          isLoading: false,
        })
      })
    })
  },
}
