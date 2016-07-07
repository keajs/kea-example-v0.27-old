const delay = (ms, val = true) => new Promise((resolve) => setTimeout(() => resolve(val), ms))

export default delay
