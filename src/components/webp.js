function canUseWebp() {
  const elem = document.createElement('canvas')
  if (!!(elem.getContext && elem.getContext('2d'))) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
  } else {
    return false
  }
}
function setImg(el, attr, originUrl, replace) {
  let webpUrl = originUrl
  if (replace && canUseWebp) {
    webpUrl = originUrl.replace(/\.\w{3,}$/gi, '.webp')

    onErrorLoadWebp(el, attr, webpUrl, originUrl)
  }
  if (attr === 'bg') {
    el.style.backgroundImage = `url(${webpUrl})`
  } else {
    el.setAttribute(attr, webpUrl)
  }
}
function onErrorLoadWebp(el, attr, webpUlr, originUrl) {
  let img = new Image()
  img.src = webpUlr
  img.onerror = function() {
    setImg(el, attr, originUrl)
    img = null
  }
}
function update(el, binding) {
  const attr = binding.arg || 'src'
  const value = binding.value

  if (value.indexOf('data:image') > -1) {
    setImg(el, attr, value)
  } else {
    setImg(el, attr, value, true)
  }
}

export default {
  install(Vue) {
    Vue.directive('webp', {
      inserted(el, binding) {
        update(el, binding)
      },
      componentUpdated(el, binding) {
        if (binding.value !== binding.oldValue) {
          update(el, binding)
        }
      },
    })
  },
}
