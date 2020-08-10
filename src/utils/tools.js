const debounce = (fn, time = 500) => {
  let timer
  return function() {
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
      clearTimeout(timer)
    }, time)
  }
}

const onExpressionEval = (expression, data) => {
  const fn = new Function('data', `with(data) { return !!(${expression}) }`)
  try {
    return fn.call(data, data)
  } catch (e) {
    return false
  }
}

export { debounce, onExpressionEval }
