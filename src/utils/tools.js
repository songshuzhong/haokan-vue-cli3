const debounce = (fn, time = 500) => {
    console.log(time)
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

export {debounce}
